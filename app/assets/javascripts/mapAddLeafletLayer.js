
//GeoJSON Layers/Overlays


///*******************************************************************************//
//*******************************************************************************//
//*******************************************************************************//
//*************** styles for layers *********************************************//
//*******************************************************************************//
//polygon styles
//used with leaflet variation, not D3
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

//the efficiency here can be further increased... need to simply add a way
//to determine what type of geometry object it is: 
//Point
//MultiPoint 
//LineString
//MultiLineString
//Polygon
//MultiPolygon
//GeometryCollection


//*******************************************************************************//
//*******************************************************************************//
//*******************************************************************************//
//**************** Additional GeoJSON Polygon Layers ****************************//
//*******************************************************************************//

function addGeoJsonPolygon (data_source, data_name) {

    var newLayer = new L.GeoJSON(null, {
      
      onEachFeature: function (feature, layer) {
        layer.setStyle (defaultPolygonStyle);

        if (feature.properties) {
          layer.bindPopup(data_name + ': <strong>' + feature.properties.name + '</strong>', popupOptions);
        }

        layer.on("mouseover", function(e) { layer.setStyle( hoverPolygonStyle ) });
        layer.on("mouseout", function(e) { layer.setStyle( defaultPolygonStyle ) });

        //layer._leaflet_id = feature.properties.countyfp;

        //build array/list to be referenced from search
        placesSearch.push({
          name: layer.feature.properties.name,
          id: layer.feature.properties.countyfp,
          lat: layer.feature.geometry.coordinates[1],
          lng: layer.feature.geometry.coordinates[0]
        })

        // placesSearch.forEach(function (v) {
        //   if (feature == v) {
        //     v.selected = !v.selected; 
        //   } else {
        //     if (!add) v.selected = false;
        //   }
        // }

      }
    
    });

  $.getJSON(data_source, function (data) {
      newLayer.addData(data);
  });


  return newLayer;
  
}

//*******************************************************************************//
//*******************************************************************************//
//*******************************************************************************//
//**************** Additional GeoJSON Point Layers ******************************//
//*******************************************************************************//
function addGeoJsonPoint (data_source, data_name) {

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