//chartAddD3Layer.js

var base_url = "/data/"

//global container and svg canvas for charts 
var $container = $('.chart-container'),
    svg = d3.select('.chart-container').append("svg");

var margin = {top: 40, right: 40, bottom: 40, left: 80};
var config = {
    margin: margin,
    width: $container.width() - margin.left - margin.right,
    height: 200 - margin.top - margin.bottom 
  }; 

var title = 'Cattaraugus';
var id = 36009;

var options = {
    dataProduct: "Annual Mean Maximum Temperature",
    short: "Annual Max Temperature",
    sourceData: "prism_yly_maxt_ny_cnty.json",
    comp: "temp-plot",
    ylabel: "Temp (°F)",
    valueFormat: "5.1f"
  }; // options

//date functions
var parseDate = d3.time.format("%Y").parse,
    formatDate = d3.time.format("%Y");

var x = d3.time.scale().range([0, config.width]),
    x2 = d3.time.scale().range([0, width]),
    y = d3.scale.linear().range([height, 0]),
    y2 = d3.scale.linear().range([height2, 0]);

var xAxis = d3.svg.axis().scale(x).orient("bottom"),
    xAxis2 = d3.svg.axis().scale(x2).orient("bottom"),
    yAxis = d3.svg.axis().scale(y).orient("left");

var brush = d3.svg.brush()
    .x(x2)
    .on("brush", brush);



svg.attr("width", config.width + config.margin.left + config.margin.right)
    .attr("height", config.height*2);
   
//chart title 
svg.append("text")
  .attr("x", "20px")
  .attr("y", "20px")
  //.style({"text-anchor": "middle"})
  .text(title);

var focus = svg.append("g")
  .attr("transform", "translate("+config.margin.left+","+config.margin.top+")")
  .attr("height", config.height)
  .attr("class","chart");

//x-axis - time - establishes it's date/time data
var d = new Date();
var xScale = d3.time.scale().range([0, config.width]).domain([d.setFullYear(1890), d.setFullYear(2015)]);


var xS = xScale; //focus
var xS2 = xScale; //context

var xAxis = d3.svg.axis()  //focus
    .scale(xS)
    .ticks(6)
    .orient("top");

var xAxis2 = d3.svg.axis()  //context
    .scale(xS2)
    .ticks(6)
    .tickSize(10)
    .tickPadding(20)
    .orient("bottom");

//y-axis - variable - temperature, precipitation, etc. - establishes it's numeric values
var yS = d3.scale.linear().range([config.height, 0]).domain([45, 70]);  //focus
var yS2 = d3.scale.linear().range([10, 0]).domain([45, 70]);  //context


//establish set range for y-axis for comparison between charts
var yAxis = d3.svg.axis()
  .scale(yS)
  .ticks(8)
  .orient("left");

var brush = d3.svg.brush()
    .x(xS2)
    .on("brush", brushed);

var context = svg.append("g")
    .attr("class","context")
    .attr("transform", "translate(" + config.margin.left + "," + (config.margin.top + config.height) + ")");




d3.json( base_url + options.sourceData , function(data) {

  var filteredData = data.data.map(function(d) {
    return [ parseDate(d[0]), d[2][id] ]
  });

  var area = d3.svg.area()
    .interpolate("monotone")
    .x(function(d) { return xS2(d[0]); })
    .y0(10)  
    .y1(function(d) { return yS2(d[1]); });

  //context chart  
  context.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0,0)")
    .call(xAxis2)
                    
  context.append("g")
    .attr("class", "x brush")
    .call(brush)
    .selectAll("rect")
      .attr("y", 0)
      .attr("height", 30);

  context.append("text")
    .attr("class","instructions")
    .attr("transform", "translate(0," + (30*2) + ")")
    .text('Click and drag above to zoom / pan the data');
        
  //console.log(filteredData);
  // var yMin = d3.min(filteredData, function(d) { return Number(d[1]); });
  // var yMax = d3.max(filteredData, function(d) { return Number(d[1]); });

  

  //draw x-axis 
  focus.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0,0)")
      .call(xAxis);

  // draw y-axis 
  focus.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", "-50px")
      .attr("x",-config.height/2)
      .style("text-anchor", "middle")
      .text(options.yLabel);

  // add the tooltip area to the webpage
  var tooltip = d3.select('.chart-container').append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

  //draw scatterplot 
  var dataPoints = focus.selectAll("circle")
     .data(filteredData)
     .enter()
     .append("circle")
      .attr("cx", function(d) { return xS(d[0]); })
      .attr("cy", function(d) { return yS(d[1]); })
      .attr("r", "4px")
      .attr("class", "data-point")
      //.attr("data-legend",function(d) { return title})
      .style("fill", "#00f")
      .style("opacity", .6)
      .on("mouseover", function(d) {
          tooltip.transition()
               .duration(200)
               .style("opacity", 1.0);
          tooltip.html("Year: " + formatDate(d[0]) + "<br/> Temp : " + formatNumber(d[1],2) )
                .style("left", d3.select(this).attr("cx") + "px")
                .style("top", (d3.event.pageY - 200) + "px");
               
      })
      .on("mouseout", function(d) {
          tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      });

   //create summary line
  var line = d3.svg.line()
    // .defined(function (d,i) {
    //   if (i<5) return false
    //   d[2][region] = d3.mean(data.data.slice(i-5,i).map(function (x) {return x[1]} ))
    //   return true
    // })
    .interpolate("basis")
    .x(function(d) { return xS(d[0]); })
    .y(function(d) { return yS(d[1]); });

  //draw interpolation line
  // focus.append("path")
  //   .datum(filteredData)
  //   .attr("class","line")
  //   .attr("d",line);

});
  
function brush() {
  x.domain(brush.empty() ? x2.domain() : brush.extent());
  focus.select("path").attr("d", area);
  focus.select(".x.axis").call(xAxis);
  circlegroup.selectAll(".dot").attr("cx",function(d){ return x(format.parse(d3.keys(d)[0]));}).attr("cy", function(d){ return y(d3.values(d)[0]);});
}

function brushed() {
  
  xS.domain(brush.empty() ? xS2.domain() : brush.extent());
  //focus.select(".data-point").attr("d", circle);
  //focus.select(".area").attr("d", area);
  focus.selectAll(".data-point")
    .attr("cx", function(d) { return xS(d[0]); })
    .attr("cy", function(d) { return yS(d[1]); });
  focus.select(".x.axis").call(xAxis);
}

function formatNumber (number) {
  return parseFloat(Math.round(number * 100) / 100).toFixed(2);
}
    
