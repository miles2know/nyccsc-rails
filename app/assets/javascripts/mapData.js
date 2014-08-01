//mapData.js
//GeoJSON Layers/Overlays

//not using the following variables, arrays yet
//var map, huc8Search=[], clim_divSearch=[], decregionSearch=[], countySearch=[];


///*******************************************************************************//
//*******************************************************************************//
//*******************************************************************************//
//*************** styles for layers *********************************************//
//*******************************************************************************//
//polygon styles
//used with leaflet variation, not D3
// var defaultPolygonStyle = {
//   clickable: true,
//   weight: 2,
//   color: 'green',
//   opacity: 1,
//   fill: true,
//   fillOpacity: 0
// };
// var hoverPolygonStyle = {
//   fillOpacity: 0.6
// };

// //marker styles
// var defaultMarkerStyle = {
//     radius: 8,
//     fillColor: "#ff7800",
//     color: "#000",
//     weight: 1,
//     opacity: 1,
//     fillOpacity: 0.8
// };
// var hoverMarkerStyle = {
//   fillOpacity: 1
// }

// var popupOptions = {
//   maxWidth: 200
// }

//*******************************************************************************//
//*******************************************************************************//
//*******************************************************************************//
//**************** Additional GeoJSON Layers ************************************//
//*******************************************************************************//

//the efficiency here can be further increased... need to simply add a way
//to determine what type of geometry object it is: 
//Point
//MultiPoint 
//LineString
//MultiLineString
//Polygon
//MultiPolygon
//GeometryCollection

// function projectPoint(x, y) {
//   var point = map.latLngToLayerPoint(new L.LatLng(y, x));
//   this.stream.point(point.x, point.y);
// }

//leaflet native way 
// function addGeoJsonPolygon (data_source, data_name) {

//     var newLayer = new L.GeoJSON(null, {
      
//       onEachFeature: function (feature, layer) {
//         layer.setStyle (defaultPolygonStyle);

//         if (feature.properties) {
//           layer.bindPopup(data_name + ': <strong>' + feature.properties.name + '</strong>', popupOptions);
//         }

//         layer.on("mouseover", function(e) { layer.setStyle( hoverPolygonStyle ) });
//         layer.on("mouseout", function(e) { layer.setStyle( defaultPolygonStyle ) });

//         //layer._leaflet_id = feature.properties.countyfp;

//         //build array/list to be referenced from search
//         placesSearch.push({
//           name: layer.feature.properties.name,
//           id: layer.feature.properties.countyfp,
//           lat: layer.feature.geometry.coordinates[1],
//           lng: layer.feature.geometry.coordinates[0]
//         })

//         // placesSearch.forEach(function (v) {
//         //   if (feature == v) {
//         //     v.selected = !v.selected; 
//         //   } else {
//         //     if (!add) v.selected = false;
//         //   }
//         // }

//       }
    
//     });

//   $.getJSON(data_source, function (data) {
//       newLayer.addData(data);
//   });


//   return newLayer;
  
// }

//leaflet native way
// function addGeoJsonPoint (data_source, data_name) {

//   var newLayer = new L.GeoJSON(null, {

//     pointToLayer: function (feature, latlng) {
//       return L.circleMarker(latlng,  defaultMarkerStyle);
//     },
//     onEachFeature: function (feature, layer) {
//       if (feature.properties) {
//         layer.bindPopup(data_name + ": <strong>" + feature.properties.name + "</strong>"
//           + "</br>Updated: " + feature.properties.time + " "+ feature.properties.date 
//           + "</br>Stage: " + feature.properties.stage 
//           + "</br><a href='" + feature.properties.url + "' target='_blank_'>Link</a>", popupOptions);
//       }
//     }
//   });

//   $.getJSON(data_source, function (data) {
//       newLayer.addData(data);
//   });

//   return newLayer;
// }


//using D3 for mapping overlays
function addPolygonLayerToMap (map, data_source, data_name, active) {
        
  //tooltip for mouseover effect
  var tooltip = d3.select("body").append("div")   
    .attr("class", "tooltip");

  //overlay 
  //leaflet-zoom-hide works during transitions

  var svg = d3.select("svg"),
      g = svg.append("g").attr("class", "leaflet-zoom-hide " + data_name)
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
            //console.log(d.properties.name); 
            //capture feature name and pass to Blacklight form - search criteria
            //document.getElementById("q").value = document.getElementById("q").value + " " + d.properties.name;
            document.getElementById("q").value = d.properties.name;
            document.getElementsByTagName('form')[0].submit();

          });

    map.on("viewreset", reset);
    reset();


    // Reposition the SVG to cover the features.
    function reset() {

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

//dynamically add toggle buttons for context layers
function addOverlayButton(data_name, active) {
  var classes = "btn-overlay";
  if (active) {classes = classes + " active";}

  var button = "<li><a class='"+classes+"' id='"+data_name+"' href='#'>" +
        data_name.toUpperCase() + "</a></li> ";
  $( button ).appendTo( $( ".toggle-overlays ul" ) );
}


//map it - points layer!
function addPointsLayerToMap (data_source, data_name, active) {
  
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
    
    mapResults.map.on("viewreset", reset);
    reset();

    function reset() {

      var bounds = mapResults.map.getBounds(),
        topLeft = mapResults.map.latLngToLayerPoint(bounds.getNorthWest()),
        bottomRight = mapResults.map.latLngToLayerPoint(bounds.getSouthEast());

      svg .attr("width", bottomRight.x - topLeft.x)
          .attr("height", bottomRight.y - topLeft.y)
          .style("left", topLeft.x + "px")
          .style("top", topLeft.y + "px");
      

      g .attr("transform", "translate(" + -topLeft.x + "," + -topLeft.y + ")");

      //plot points on map
      feature.attr("transform", 
      function(d) { 
        return "translate("+ 
          mapResults.map.latLngToLayerPoint(d.LatLng).x + "," +
          mapResults.map.latLngToLayerPoint(d.LatLng).y + ")";
        }
      )
    }

    if(active) { g.style("opacity", "1"); }  

  })  
}




