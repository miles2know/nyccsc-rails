// Add D3 Layers

//dynamically add toggle buttons for context layers
function addOverlayButton(data_name, active) {

  var classes = "";
  if (active) {classes = "active"}

  var button = "<li class='"+classes+"'><a class='btn-overlay "+classes+"' id='"+data_name.replace(/\s+/g, '')+"' href='#'>" +
        data_name + "</a></li> ";
  $( button ).appendTo( $( "ul.overlay-tabs" ) );
}


//using D3 for mapping overlays
function addPolygonLayerToMap (map, data_source, data_name, active) {
        
  //tooltip for mouseover effect
  var tooltip = d3.select("body").append("div")   
    .attr("class", "tooltip");

  //overlay 
  //leaflet-zoom-hide works during transitions

  var svg = d3.select("svg"),
      g = svg.append("g").attr("class", "leaflet-zoom-hide context-overlay " + data_name)
                         .style("opacity", 0); 

  //get data and map points/regions    
  d3.json(data_source, function(collection) {
    var transform = d3.geo.transform({point: projectPoint}),
        path = d3.geo.path().projection(transform);
    
          
    var feature = g.selectAll("path")
        .data(collection.features, function(d,i) { return d+i; } )
        .enter().append("path")
        .attr("class", "area")
        .attr("id", function(d,i) {return d.properties.countyfp})
        .attr("title", function(d,i) {return d.properties.name.toLowerCase()})
        //.attr("d", path)
        //mouseover effect with tooltip
        .on("mouseover", function(d) {      
            tooltip.transition()        
              .duration(200)      
              .style("opacity", .9);      
            tooltip.html(d.properties.name)  
              .style("left", (d3.event.pageX) + "px")     
              .style("top", (d3.event.pageY - 28) + "px");    
          })
        //mouseout effect                   
        .on("mouseout", function(d) {       
            tooltip.transition()        
              .duration(500)      
              .style("opacity", 0);   
          })
        //on click, set new query parameters and send to blacklight
        .on("click", function(d) { 
        	//console.log("d3 mouse is ");
        	//console.log(d3.mouse(this));
        	//console.log("d is ");
        	//console.log(d);
        	//d3.event is a global variable used to refer to the actual event
        	//and map.mouseEventToLatLng is a leaflet function that will convert
        	//the coordinates for the current event into lat and long
        	var latlng = map.mouseEventToLatLng(d3.event);
        	
            //capture feature name and pass to Blacklight form - search criteria
            //document.getElementById("q").value = document.getElementById("q").value + " " + d.properties.name;
            
        	 //Code below was being utilized to submit search form with name of county
        	 //document.getElementById("q").value = d.properties.name;
            //document.getElementsByTagName('form')[0].submit();
        	
        	//Changing the URL here but may want to 
        	var spatialSortString = "spatialsort=" + latlng.lat + "," + latlng.lng;
        	console.log("Spatial sort " + spatialSortString);
        	window.location = window.location.protocol + "//" + window.location.host + "/catalog?search_field=all_fields&q=*&" + spatialSortString;
          });


    map.on("moveend", reset);
    reset();

    // Reposition the SVG to cover the features.
    function reset() {

      //console.log('reset called')

      // var bounds = path.bounds(collection),
      //   topLeft = bounds[0],
      //   bottomRight = bounds[1];

      // svg .attr("width", bottomRight[0] - topLeft[0])
      //     .attr("height", bottomRight[1] - topLeft[1])
      //     .style("left", topLeft[0] + "px")
      //     .style("top", topLeft[1] + "px");

      // g   .attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");  
      var bounds = map.getBounds(),
        topLeft = map.latLngToLayerPoint(bounds.getNorthWest()),
        bottomRight = map.latLngToLayerPoint(bounds.getSouthEast());

      svg .attr("width", bottomRight.x - topLeft.x)
          .attr("height", bottomRight.y - topLeft.y)
          .style("left", topLeft.x + "px")
          .style("top", topLeft.y + "px");
      

      g .attr("transform", "translate(" + -topLeft.x + "," + -topLeft.y + ")");

      //plot path on map
      feature.attr("d", path);
    }

    // Use Leaflet to implement a D3 geometric transformation.
    function projectPoint(x, y) {
      var point = map.latLngToLayerPoint(new L.LatLng(y, x));
      this.stream.point(point.x, point.y);
    }

    if(active) { g.style("opacity", "1"); } 

  }); //end d3.json 

}


//map it - points layer!
function addPointsLayerToMap (map, data_source, data_name, active) {
  
  //tooltip for mouseover effect
  var tooltip = d3.select("body").append("div")   
    .attr("class", "tooltip");

  // We simply pick up the SVG from the map object 
  //if(d3.select("svg")) {
  var svg = d3.select("svg"),
      g = svg.append("g").attr("class", "leaflet-zoom-hide " + data_name)
                         .style("opacity", 0); 

   
  d3.json(data_source, function(collection) {
    /* Add a LatLng object to each item in the dataset */
    collection.features.forEach(function(d) {
      d.LatLng = new L.LatLng(d.geometry.coordinates[1],
                  d.geometry.coordinates[0])
    })
    

    var feature = g.selectAll("circle")
      .data(collection.features, function(d,i) { return d+i; } )
      .enter().append("circle")
      .attr("class", "point")
      .attr("r", 10)
      .on("mouseover", function(d) {  
        var prop = d.properties;
        var html = "<table>";
        for (var key in prop) {
          if (prop.hasOwnProperty(key)) {

            html = html + "<tr><td class='right'>" + key + ": </td><td class='left'>" + prop[key] + "</td></tr>";
          }
        }
        html = html + "</table>";
        tooltip.transition()        
          .duration(200)      
          .style("opacity", .9);      
        tooltip.html(html)  
          .style("left", (d3.event.pageX) + "px")     
          .style("top", (d3.event.pageY) + "px");    
      })
      //mouseout effect                   
      .on("mouseout", function(d) {       
        tooltip.transition()        
          .duration(500)      
          .style("opacity", 0);   
      });
    
    map.on("moveend", reset);
    reset();

    function reset() {

      // var bounds = path.bounds(collection),
      //   topLeft = bounds[0],
      //   bottomRight = bounds[1];

      // svg .attr("width", bottomRight[0] - topLeft[0])
      //     .attr("height", bottomRight[1] - topLeft[1])
      //     .style("left", topLeft[0] + "px")
      //     .style("top", topLeft[1] + "px");

      // g   .attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");  

      var bounds = map.getBounds(),
        topLeft = map.latLngToLayerPoint(bounds.getNorthWest()),
        bottomRight = map.latLngToLayerPoint(bounds.getSouthEast());

      svg .attr("width", bottomRight.x - topLeft.x)
          .attr("height", bottomRight.y - topLeft.y)
          .style("left", topLeft.x + "px")
          .style("top", topLeft.y + "px");
      

      g .attr("transform", "translate(" + -topLeft.x + "," + -topLeft.y + ")");

      //plot points on map
      feature.attr("transform", 
      function(d) { 
        return "translate("+ 
          map.latLngToLayerPoint(d.LatLng).x + "," +
          map.latLngToLayerPoint(d.LatLng).y + ")";
        }
      )
    }

    if(active) { g.style("opacity", "1"); }  

  })  
}




