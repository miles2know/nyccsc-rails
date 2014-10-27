//chartAddD3Layer.js

//global container and svg canvas for charts 
var $container = $('.chart-container'),
    svg = d3.select('.chart-container').append("svg"),
    charts = [];

var margin = {top: 40, right: 40, bottom: 40, left: 80};
var config = {
    margin: margin,
    width: $container.width() - margin.left - margin.right,
    height: 200 - margin.top - margin.bottom 
  }; 

function formatNumber (number) {
  return parseFloat(Math.round(number * 100) / 100).toFixed(2);
}

function clearCharts(chart) {

  //console.log('clear charts');

  if (chart) { //clear selected chart only, not implemented yet

  } else { //otherwise clear all 
    //d3.select("g.parent").selectAll("*").remove();
    d3.selectAll("svg").remove();
  }

}


function addChartSeriesByRegion() {
  //add data for each sub-grouping by data product
  //each data.product is a separate g (chart) here
  var title = $("#county option:selected").text();
  var seq = 0;

  $.each(data.products, function(key, val){
    
    var options = {
      dataProduct: val.title, //val.short - also short title available
      sourceData: val.url,
      yLabel: val.ylabel,
      valueFormat: val.valueFormat,
      id: $("#county").val()
    }; // options

    charts.push( new Chart (
      seq,
      options
    ) );
    
    console.log(charts[seq]);
    seq++;

  });


  //setup space for series 
  //hardcoded for 2 charts - 1 chart to display max, min and mean temp, and 1 chart to display precip
  var height = config.margin.top*(seq+1)+(config.height*seq)+config.margin.bottom;
  
  svg.attr("width", config.width + config.margin.left + config.margin.right)
   .attr("height", height);
   
  //chart title 
  svg.append("text")
   .attr("x", "20px")
   .attr("y", "20px")
    //.style({"text-anchor": "middle"})
   .text(title);

  height = height - config.margin.bottom;

  BrushChart(seq,height);

}

var Chart = function (chartCount,options) {

  //date functions
  var parseDate = d3.time.format("%Y").parse,
      formatDate = d3.time.format("%Y");
  var yMin;
  //var chart = {};

  d3.json( base_url + options.sourceData , function(data) {
    createChart(data);
  });

  var chart = svg.append("g");
  var xScale = d3.time.scale();
  var yScale = d3.scale.linear();
  var xAxis = d3.svg.axis();
  var yAxis = d3.svg.axis();
  var dataPoints = chart.selectAll("circle");


  //console.log(yMin);
  
  function createChart(data) {  

    var color = "#333";
    
    if (options.dataProduct.indexOf("Temp") > -1) {
      if (options.dataProduct.indexOf("Min") > -1) {
        color = "#0f0"; //green
      } else if (options.dataProduct.indexOf("Max") > -1) {
        color = "#f00"; //red
      } else if (options.dataProduct.indexOf("Ave") > -1 ) {
        color = "#ff0"; //yellow
      } 
    } else if (options.dataProduct.indexOf("Precip") > -1) {
      color = "#00f"; //blue
    } 

      
    var filteredData = data.data.map(function(d) {
      return [ parseDate(d[0]), d[2][options.id] ]
    });
        
    //same svg, new chart grouping for each sub-grouping (data product)
    //to add to margin with each chart to have it layout further down the page
    var top = (chartCount === 0 ? config.margin.top : config.margin.top*(chartCount+1)+(config.height*chartCount));

    chart.attr("transform", "translate("+config.margin.left+","+top+")")
        .attr("height", config.height)
        .attr("class","chart")
        .attr("id", "chart-"+chartCount);

    //console.log(filteredData);
    var yMin = d3.min(filteredData, function(d) { return Number(d[1]); });
    var yMax = d3.max(filteredData, function(d) { return Number(d[1]); });
    
    //y-axis - variable - temperature, precipitation, etc. - establishes it's numeric values
    yScale.range([config.height, 0]).domain([yMin - 5, yMax + 5]);

    //x-axis - time - establishes it's date/time data
    var d = new Date();
    xScale.range([0, config.width]).domain([d.setFullYear(1890), d.setFullYear(2015)]);

    // var yS = this.yScale;
    // var xS = this.xScale;

    //establish set range for y-axis for comparison between charts
    yAxis
      .scale(yScale)
      .ticks(8)
      .orient("left");

    if (chartCount === 0) {
      
      xAxis
        .scale(xScale)
        .ticks(6)
        .orient("top");

      //draw x-axis 
      chart.append("g")
          .attr("class", "x axis primary")
          .attr("transform", "translate(0,0)")
          .call(xAxis);

    } 

    chart.append("text")
     .attr("x", "20px")
     .attr("y", "20px")
      //.style({"text-anchor": "middle"})
     .text(options.dataProduct);
     
    
    // draw y-axis 
    chart.append("g")
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
    dataPoints
       .data(filteredData)
       .enter()
       .append("circle")
        .attr("cx", function(d) { return xScale(d[0]); })
        .attr("cy", function(d) { return yScale(d[1]); })
        .attr("r", "4px")
        .attr("class", "data-point")
        //.attr("data-legend",function(d) { return title})
        .style("fill", color)
        .style("opacity", .3)
        .on("mouseover", function(d) {
            tooltip.transition()
                 .duration(200)
                 .style("opacity", 1.0);
            tooltip.html("Year: " + formatDate(d[0]) + "<br/> " + options.yLabel + ": " + formatNumber(d[1],2) )
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
      .x(function(d) { return xScale(d[0]); })
      .y(function(d) { return yScale(d[1]); });

    //draw interpolation line
    chart.append("path")
      .datum(filteredData)
      .attr("class","line")
      .attr("d",line)
      .attr("stroke", color)
      .style('fill', color)
      .style('opacity', .2);

    
    //console.log(chart);

    showOnly = function(b){
      console.log('showOnly');
      //chart.select(".x.axis.primary").call(this.xAxis);
    }
  }

  return chart;
  

}

  function BrushChart (chartCount, top) {
    // /* Let's create the context brush that will 
   //     let us zoom and pan the chart */
   //x-axis - time - establishes it's date/time data

    var width = config.width,
        height = 30,
        left = config.margin.left;
        //top = config.height * 6;

    var d = new Date();
    var xS = d3.time.scale().range([0, width]).domain([d.setFullYear(1890), d.setFullYear(2015)]);
    
    var xAxis = d3.svg.axis()
        .scale(xS)
        .tickSize(height)
        .tickPadding(-10)
        .orient("bottom");

    //shading effect for entire brush chart
    var area = d3.svg.area()
        .interpolate("monotone")
        .x(function(d) { return contextXScale(d.date); })
        .y0(height)  
        .y1(0);

    var brush = d3.svg.brush()
        .x(xS)
        .on("brush", brushed);

    var context = svg.append("g")
        .attr("class","context")
        .attr("transform", "translate(" + left + "," + top+ ")");
    
    context.append("g")
        .attr("class", "x axis top")
        .attr("transform", "translate(0,0)")
        .call(xAxis)
                      
    context.append("g")
        .attr("class", "x brush")
        .call(brush)
        .selectAll("rect")
          .attr("y", 0)
          .attr("height", height);
    
    context.append("text")
        .attr("class","instructions")
        .attr("transform", "translate(0," + (height + 30) + ")")
        .text('Click and drag above to zoom / pan the data');
    
    function brushed() {

      /* this will return a date range to pass into the chart object */
      var b = brush.empty() ? xS.domain() : brush.extent();
      for(var i = 0; i < 3; i++){
        charts[i].showOnly(b);
      }
    }
  }
    

  // Chart.prototype.showOnly = function(b){

  //   console.log('showOnly triggered');
  //   // focus.select(".x.axis").call(xAxis);
  //   //   mydots.selectAll(".dot")
  //   //     .attr("cx", xMap)
  //   //     .attr("cy", yMap);

  //     //this.xScale.domain(b);      

  //   // chart.select("path").data([chartData]).attr("d", this.area);
  //   // chart.select(".x.axis.top").call(this.xAxisTop);
  //   //this.chart.select(".x.axis.primary").call(this.xAxis);
  // }



  

  
