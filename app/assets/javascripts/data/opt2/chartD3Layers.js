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
    
    seq++;

  });

  //setup space for series 
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
  //var yMin;
  //var chart = {};

  d3.json( base_url + options.sourceData , function(data) {
    createChart(data);
  });

  //console.log(yMin);
  
  function createChart(data) {  

    //console.log(chartData);
      //re-map data array for plotting x/y coordinates
      //filters for region and converts year number to date object
    //d3.json( base_url + options.sourceData , function(data) {
      
      var filteredData = data.data.map(function(d) {
        return [ parseDate(d[0]), d[2][options.id] ]
      });
          
      //same svg, new chart grouping for each sub-grouping (data product)
      //to add to margin with each chart to have it layout further down the page
      var top = (chartCount === 0 ? config.margin.top : config.margin.top*(chartCount+1)+(config.height*chartCount));


      this.chart = svg.append("g")
          .attr("transform", "translate("+config.margin.left+","+top+")")
          .attr("height", config.height)
          .attr("class","chart")
          .attr("id", "chart-"+chartCount);

      //console.log(filteredData);
      var yMin = d3.min(filteredData, function(d) { return Number(d[1]); });
      var yMax = d3.max(filteredData, function(d) { return Number(d[1]); });
      
      //y-axis - variable - temperature, precipitation, etc. - establishes it's numeric values
      this.yScale = d3.scale.linear().range([config.height, 0]).domain([yMin - 5, yMax + 5]);

      //x-axis - time - establishes it's date/time data
      var d = new Date();
      this.xScale = d3.time.scale().range([0, config.width]).domain([d.setFullYear(1890), d.setFullYear(2015)]);

      var yS = this.yScale;
      var xS = this.xScale;

      //establish set range for y-axis for comparison between charts
      this.yAxis = d3.svg.axis()
        .scale(yS)
        .ticks(8)
        .orient("left");

      if (chartCount === 0) {
        
        this.xAxis = d3.svg.axis()
          .scale(xS)
          .ticks(6)
          .orient("top");

        //draw x-axis 
        this.chart.append("g")
            .attr("class", "x axis primary")
            .attr("transform", "translate(0,0)")
            .call(this.xAxis);

      } 
      
      // draw y-axis 
      this.chart.append("g")
          .attr("class", "y axis")
          .call(this.yAxis)
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
      this.dataPoints = this.chart.selectAll("circle")
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
        .x(function(d) { return xS(d[0]); })
        .y(function(d) { return yS(d[1]); });

      //draw interpolation line
      this.chart.append("path")
        .datum(filteredData)
        .attr("class","line")
        .attr("d",line);

      //return chart;  
   //}
  //}); //end json data function
  //console.log(this.chart);

  //return this.chart, this.yAxis;

     // Chart.showOnly = function(){
     //   console.log('showOnly');
     //   chart.select(".x.axis.primary").call(this.xAxis);
     // }
  }

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
      var b = xS.domain(brush.empty() ? xS.domain() : brush.extent());

      this.chart.showOnly(b);
      // for(var i = 0; i < chartCount; i++){

      //   //console.log(charts[i]);
      //   //charts[i].showOnly(b);
      // }
    }
  }
    

  Chart.prototype.showOnly = function(b){

    // focus.select(".x.axis").call(xAxis);
    //   mydots.selectAll(".dot")
    //     .attr("cx", xMap)
    //     .attr("cy", yMap);

      //this.xScale.domain(b);

      
      

    // chart.select("path").data([chartData]).attr("d", this.area);
    // chart.select(".x.axis.top").call(this.xAxisTop);
     this.chart.select(".x.axis.primary").call(this.xAxis);
  }



  

  
