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
var defaultPolygonStyle = {
  clickable: true,
  weight: 2,
  color: 'green',
  opacity: 1,
  fill: true,
  fillOpacity: 0
};
var hoverPolygonStyle = {
  fillOpacity: 0.6
};

//marker styles
var defaultMarkerStyle = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};
var hoverMarkerStyle = {
  fillOpacity: 1
}

var popupOptions = {
  maxWidth: 200
}

//*******************************************************************************//
//*******************************************************************************//
//*******************************************************************************//
//**************** Additional GeoJSON Layers ************************************//
//*******************************************************************************//
function addGeoJsonArea (data_source, data_name) {

    var newLayer = new L.GeoJSON(null, {
      
      onEachFeature: function (feature, layer) {
        layer.setStyle (defaultPolygonStyle);

        if (feature.properties) {
          layer.bindPopup(data_name + ': <strong>' + feature.properties.name + '</strong>', popupOptions);
        }

        layer.on("mouseover", function(e) { layer.setStyle( hoverPolygonStyle ) });
        layer.on("mouseout", function(e) { layer.setStyle( defaultPolygonStyle ) });
      }
    
    });

  //TODO: add proxy_controller ajax call here
  $.getJSON(data_source, function (data) {
      newLayer.addData(data);
  });

  return newLayer;
  
}


function addGeoJsonMarker (data_source, data_name) {

  var newLayer = new L.GeoJSON(null, {

    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng,  defaultMarkerStyle);
    },
    onEachFeature: function (feature, layer) {
      if (feature.properties) {
        layer.bindPopup(data_name + ": <strong>" + feature.properties.name + "</strong>"
          + "</br>Updated: " + feature.properties.time + " "+ feature.properties.date 
          + "</br>Stage: " + feature.properties.stage 
          + "</br><a href='" + feature.properties.url + "' target='_blank_'>Link</a>", popupOptions);
      }
    }
  });

  $.getJSON(data_source, function (data) {
      newLayer.addData(data);
  });

  return newLayer;
}

// function refreshGeoJsonLayer(data_source, data_name, mapBB_SWCorner, mapBB_NECorner){
//     //var bounds = map.getBounds();
//     //map.removeLayer(gage)

    
    

//     var newLayer = new L.GeoJSON(null, {

//       pointToLayer: function (feature, latlng) {
//         return L.circleMarker(latlng,  defaultMarkerStyle);
//       },
//       onEachFeature: function (feature, layer) {
//         if (feature.properties) {
//           layer.bindPopup(data_name + ": <strong>" + feature.properties.name + "</strong>"
//             + "</br>Updated: " + feature.properties.time + " "+ feature.properties.date 
//             + "</br>Stage: " + feature.properties.stage 
//             + "</br><a href='" + feature.properties.url + "' target='_blank_'>Link</a>", popupOptions);
//         }
//       }
//     });

//     $.getJSON(url, function (data) {
//         newLayer.addData(data);

//         $(".mapDocView").empty();
//         $(".mapDocView").append("<ul></ul>")
//         $.each(data.features, function( index, value ) {
//           //console.log(value.properties.name);
//           $(".mapDocView ul").append("<li>" + value.properties.name + "</li>" );
//         })

//     });

//     return newLayer;
// }





