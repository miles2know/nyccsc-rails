//chartD3.js

var canvas = (function() {

  var $container = $('.chart-container');
  
  var m = {top: 40, right: 20, bottom: 40, left: 80},
    w = $container.width() - m.left - m.right,
    h = 280 - m.top - m.bottom;

  
  var parseDate = d3.time.format("%Y").parse;
  // // generate generic/empty chart
  return {

    onLoad: function(seq) {
      this.initializeCanvas(seq);
      this.initializeAxes(seq);
    },

    initializeCanvas: function(seq) {

      //add new div for new canvas
      //$container.append('<div class="chart" id="chart-'+seq+'"></div>');
      //var el = '#chart-'+seq;
      //console.log(el);

      //main canvas for drawing chart
      var svg = d3.select('.chart-container').append("svg");

      svg.attr("width", w + m.left + m.right)
         .attr("height", h + m.top + m.bottom)
         .attr("class","chart")
         .attr("id","chart-"+seq)
         //.attr('preserveAspectRatio','xMinYMin')
         //.append("g")
         //  .attr("transform", "translate(" + m.left + "," + m.top + ")");

      //chart title 
      svg.append("text")
          .attr("x", "20px")
          .attr("y", "20px")
          //.style({"text-anchor": "middle"})
          .text('Canvas ' + seq);
      
    },

    initializeAxes: function(seq) {
      //var canvas = this;
      var svg = d3.select("#chart-"+seq)
        .append("g")
        .attr("transform", "translate(" + m.left + "," + m.top + ")");

      console.log('initializeAxes');

      // //x-axis - time - establishes it's date/time data
      var x = d3.time.scale().range([0, Number(w-50)]);

      // //y-axis - variable - temperature, precipitation, etc. - establishes it's numeric values
      var y0 = d3.scale.linear().range([h, 0]);
      var y1 = d3.scale.linear().range([h, 0]);

      // var xMin = d3.min(filteredData, function(d) { return (d[0]); });
      // var xMax = d3.max(filteredData, function(d) { return (d[0]); });
      // var yMin = d3.min(filteredData, function(d) { return Number(d[1]); });
      // var yMax = d3.max(filteredData, function(d) { return Number(d[1]); });

      //x.domain([xMin - 10, xMax]);
      //y.domain([yMin - 5, yMax + 5]);

      //preset instead of dynamic

      var d = new Date();
      x.domain([d.setFullYear(1890), d.setFullYear(2015)]);
      y0.domain([25, 65]);
      y1.domain([20, 60]);

      var xAxis = d3.svg.axis()
        .scale(x)
        .ticks(6)
        .orient("bottom");

      var yAxis0 = d3.svg.axis()
        .scale(y0)
        .ticks(8)
        .orient("left");

      var yAxis1 = d3.svg.axis()
        .scale(y1)
        .ticks(8)
        .orient("right");


      //var svg = this.svg;

      //draw x-axis 
      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + h + ")")
          .call(xAxis);

      //draw y-axis - temperature (0)
      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis0)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", "-50px")
          .attr("x",-h/2)
          .style("fill", "#0f0")
          .style("text-anchor", "middle")
          .text('Temperature');

       //draw y-axis - precipitation (1)
      svg.append("g")
          .attr("class", "y axis")
          .attr("transform", "translate(" + Number(w-50) + " ,0)")   
          .call(yAxis1)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", "+50px")
          .attr("x",-h/2)
          .style("fill", "#00f")
          .style("text-anchor", "middle")
          .text('Precipitation');
    },

  //return {

    margin: function() {
      return m;
    },

    width: function() {
      return w;
    },

    height: function() {
      return h;
    }

  };

})();

// //not sure about this function yet.. thinking it might be nice to completely separate chart, axes, and data points
// var axes = (function() {

//   initializeAxes: function() {
//       //var canvas = this;

//       // //x-axis - time - establishes it's date/time data
//       var x = d3.time.scale().range([0, w]);

//       // //y-axis - variable - temperature, precipitation, etc. - establishes it's numeric values
//       var y = d3.scale.linear().range([h, 0]);

//       // var xMin = d3.min(filteredData, function(d) { return (d[0]); });
//       // var xMax = d3.max(filteredData, function(d) { return (d[0]); });
//       // var yMin = d3.min(filteredData, function(d) { return Number(d[1]); });
//       // var yMax = d3.max(filteredData, function(d) { return Number(d[1]); });

//       //x.domain([xMin - 10, xMax]);
//       //y.domain([yMin - 5, yMax + 5]);

//       //preset instead of dynamic
//       x.domain([, 2014])
//       y.domain([25, 65]);

//       var xAxis = d3.svg.axis()
//         .scale(x)
//         .ticks(6)
//         .orient("bottom");

//       var yAxis = d3.svg.axis()
//         .scale(y)
//         .ticks(8)
//         .orient("left");


//       // var svg = this.svg;

//       //draw x-axis 
//       svg.append("g")
//           .attr("class", "x axis")
//           .attr("transform", "translate(0," + h + ")")
//           .call(xAxis);

//       //draw y-axis 
//       svg.append("g")
//           .attr("class", "y axis")
//           .call(yAxis)
//         .append("text")
//           .attr("transform", "rotate(-90)")
//           .attr("y", "-50px")
//           .attr("x",-h/2)
//           .style("text-anchor", "middle")
//           .text('y-axis');
//     };

// })();