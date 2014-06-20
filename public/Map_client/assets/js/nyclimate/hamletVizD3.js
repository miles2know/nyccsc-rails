function charttooltip(sel) {
  sel.on("mouseover", function(d) {
            d3.selectAll(".hamlet")
              .filter(function(v) {
                  return v.properties.hamlet === d.properties.hamlet;
              })
            .style("stroke-width", "2");

            d3.selectAll(".buffer")
              .filter(function(v) {
                  return v.properties.hamlet === d.properties.hamlet;
              })
            .style("fill-opacity",0.25)
            .style("fill", "black");
      })

      .on("mouseout", function(d) {
        d3.selectAll(".hamlet")
        .style("stroke-width", "1");

        d3.selectAll(".buffer")
        .style("fill-opacity",0.0)
      });
};

function maptooltip(sel) {
  sel.on("mouseover", function(d) {
        d3.select(this)
          .style("stroke-width", "2");
        
        d3.selectAll(".buffer")
          .filter(function(v) {
            return v.properties.hamlet === d.properties.hamlet;
          })
          .style("fill-opacity",0.25)
          .style("fill", "black");

        d3.selectAll(".bar")
          .filter(function(v) {
            return v.properties.hamlet === d.properties.hamlet;
          })
          .style("stroke", "red")
          .style("stroke-width", "3");
    
        maptooltipdiv
              .transition()
              .duration(200)
              .style("opacity", .8);
         maptooltipdiv
                 .html( "<strong>" + d.properties.hamlet + "</strong>"/*</br>Value: " + d.properties[value]*/ )
                .style("left", (d3.event.pageX) + "px")     
                .style("top", (d3.event.pageY - 28) + "px");
         })
     
     .on("mouseout", function(d) {
        d3.select(this)
          .style("stroke-width", "1");

        d3.selectAll(".buffer")
          .style("fill-opacity",0.0)

        d3.selectAll(".bar")
          .style("stroke", "peru")
          .style("stroke-width", "1");    
        
        maptooltipdiv.transition()
          .duration(500)
          .style("opacity", 0);
     });
}


function change() {
  

  // Copy-on-write since tweens are evaluated after a delay.
  var y0 = y.domain(json.features.sort(this.checked
      ? function(a, b) { return b.properties[value] - a.properties[value]; }
      : function(a, b) { return d3.ascending(a.properties.hamlet, b.properties.hamlet); })
      .map(function(d) { return d.properties.hamlet; }))
      .copy();

  var transition = svg.transition().duration(550),
      delay = function(d, i) { return i * 50; };

  transition.selectAll(".bar")
      .delay(delay)
      .attr("y", function(d) { return y0(d.properties.hamlet); });

  transition.select(".y.axis")
      .call(yAxis)
    .selectAll("g")
      .delay(delay);
}

// global variables to determine layout etc.
var maptooltipdiv = d3.select("body") //div for tooltips
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

var charttooltipdiv = d3.select("body") //div for tooltips
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

var margin = {top: 20, right: 20, bottom: 20, left: 120},
    width = 300 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    duration = 750;

var y = d3.scale.ordinal()
    .rangeRoundBands([0, height + margin.top ], 0);

var x = d3.scale.linear()
    .range([0, width]);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var xAxis = d3.svg.axis()
    .scale(x)
    .ticks(6)
    .orient("top");

//Define quantize scale to sort data values into buckets of color
var color = d3.scale.quantile()
        .domain([5.0, .0])
        .range(colorbrewer.YlOrRd[8]);

// draw charts and maps, driven by data

var json; // create the global variable to store the data 
var svg; // chart SVGs
var mapg;
var mapsvg;
var value = "percentpublic";
var sortTimeout;


d3.json("data/adkwebmap/hamlet_10miBuffers.geojson", function(error, result) {
  json = result;

  color.domain(d3.extent(json.features,
      function(d) { return d.properties[value]; }));


/////////////////////
///// CHART//////////
/////////////////////

  y.domain(json.features.map(function(d) { return d.properties.hamlet; }));
  x.domain(d3.extent(json.features,
      function(d) { return d.properties[value]; })).nice();

  svg = d3.select("#chart")
      .append("svg")
      .attr("class", "chart")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0,0)")
      .call(xAxis)
    .append("text")
      .attr("y", 30)
      .attr("x", width/2)
      .style("text-anchor", "middle")
      .style("color", "white")//.text("hamlet")
      ;
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

  svg.selectAll(".bar").data(json.features)
      .enter().append("rect")
      .attr("class", "bar")
      .style("stroke", "peru")
/*      .style("stroke", function(d) { 
          if (d.properties.fivetowns == 1) { return "steelblue"; }
          
          else { return "peru"; } 
      }) 
      //.style("stroke", "peru")
      .style("stroke-width",function(d) { 
          if (d.properties.fivetowns == 1) { return "2"; }
          
          else { return "1"; } 
      }) */
      .style("fill", function(d) {
          return color(d.properties[value]) || "#ccc";
      })
      .attr("y", function(d) { return y(d.properties.hamlet); })
      .attr("height", y.rangeBand())
      .attr("x", 0)
      .attr("width", function(d) { return x(d.properties[value]); })
      .call(charttooltip)
      ;

    d3.select("#sortcheck").on("change", change);

/*    sortTimeout = setTimeout(function() {
    d3.select("#sortcheck").property("checked", true).each(change);
  }, 3000);*/


/////////////////////
///// MAP////////////
/////////////////////

//Projections, bounds, geopaths, etc.

    mapsvg = d3.select(map.getPanes().overlayPane).append("svg"),
    mapg = mapsvg.append("g").attr("class", "leaflet-zoom-hide");


    function project(x) {
      var point = map.latLngToLayerPoint(new L.LatLng(x[1], x[0]));
      return [point.x, point.y];
    }
    var path = d3.geo.path().projection(project);

    var bounds = d3.geo.bounds(json),
        bottomLeft = project(bounds[0]),
        topRight = project(bounds[1]);

//Hamlet Buffers
    var feature = mapg.selectAll(".buffer")
        .data(json.features)
        .enter()
        .append("path")
        .attr("class", "buffer")
        .style("stroke-dasharray", ("3, 3"))//.attr("class", "flow")
        .style("stroke", "peru")
        
        .style("stroke-width",1)
        .style("stroke-opacity", 0.8)
        .style("fill-opacity",0.0)
        .attr("d", path);

//Hamlets, with color scaling

    var circles = mapg.selectAll(".hamlet")
    .data(json.features)
    .enter()
    .append("svg:circle")
    .attr("class","hamlet")
    .attr("cx", function(d){
        return path.centroid(d)[0];
    })
    .attr("cy", function(d){
        return  path.centroid(d)[1];
    })
    .attr("r", 10)
  .style("stroke-dasharray", ("3, 3"))//.attr("class", "flow")
        .style("stroke", "peru")
        
        .style("stroke-width",1)
        .style("fill-opacity",0.75)
        .style("fill", function(d) {
            return color(d.properties[value]) || "#ccc";
        })
        .attr("d", path)
        .call(maptooltip);


/*    var labels = mapg.selectAll("text")
    .data(json.features)
    .enter()
    .append("text")
    .text(function(d){
        return d.properties.hamlet;
    })
    .attr("x", function(d){
        return path.centroid(d)[0];
    })
    .attr("y", function(d){
        return  path.centroid(d)[1];
    })
    .attr("text-anchor","middle")
    .attr('font-size','6pt');*/

        map.on("viewreset", reset);
        reset();

        // Reposition the SVG to cover the features.
        function reset() {
          var bottomLeft = project(bounds[0]),
              topRight = project(bounds[1]);

        mapsvg .attr("width", topRight[0] - bottomLeft[0])
            .attr("height", bottomLeft[1] - topRight[1])
            .style("margin-left", bottomLeft[0] + "px")
            .style("margin-top", topRight[1] + "px");

        mapg   .attr("transform", "translate(" + -bottomLeft[0] + "," + -topRight[1] + ")");

        //feature.attr("d", path);
        circles.attr("cx", function(d){
          return path.centroid(d)[0];
      })
      .attr("cy", function(d){
          return  path.centroid(d)[1];
      });

      feature.attr("d", path)
/*        labels.attr("x", function(d){
          return path.centroid(d)[0];
      })
      .attr("y", function(d){
          return  path.centroid(d)[1];
      });*/
        }
      });





//update data from combobox onChange
function update(value) {
  d3.select("#sortcheck").property("checked", false)
  
  color.domain(d3.extent(json.features,
      function(d) { return d.properties[value]; }));

    y.domain(json.features.sort( function(a, b) { return d3.ascending(a.properties.hamlet, b.properties.hamlet); }));

    x.domain(d3.extent(json.features,
      function(d) { return d.properties[value]; })).nice();

    svg.selectAll(".bar").data(json.features)
      .transition().duration(duration)
      .style("fill", function(d) {
          return color(d.properties[value]) || "#ccc";
      })
      //.attr("x", function(d) { return x(d.properties[value]); })
      .attr("width", function(d) {
          return  x(d.properties[value]);
    });

  svg.select("g.x").transition().duration(duration).call(xAxis);

    mapg.selectAll("circle")
      .data(json.features)
      .call(maptooltip)
      .transition().duration(duration)
      .style("fill", function(d) {
          return color(d.properties[value]) || "#ccc";
    });
    

    d3.select("#sortcheck").on("change", change2);  
  
  function change2() {
  // Copy-on-write since tweens are evaluated after a delay.
  var y0 = y.domain(json.features.sort(this.checked
      ? function(a, b) { return b.properties[value] - a.properties[value]; }
      : function(a, b) { return d3.ascending(a.properties.hamlet, b.properties.hamlet); })
      .map(function(d) { return d.properties.hamlet; }))
      .copy();

  var transition = svg.transition().duration(750),
      delay = function(d, i) { return i * 50; };

  transition.selectAll(".bar")
      .delay(delay)
      .attr("y", function(d) { return y0(d.properties.hamlet); });

  transition.select(".y.axis")
      .call(yAxis)
    .selectAll("g")
      .delay(delay);
}
}


