
//GeoJSON Layers/Overlays


///*******************************************************************************//
//*******************************************************************************//
//*******************************************************************************//
//*********************** Default Styles for GIS layers *************************//
//*******************************************************************************//
//polygon styles
var defaultPolygonStyle = {
  clickable: true,
  weight: 2,
  color: 'gray',
  opacity: 1,
  fill: true,
  fillOpacity: 0
};
var hoverPolygonStyle = {
  fillOpacity: 0.2
};

//marker styles
//regular marker
var defaultMarkerStyle = {
  opacity: 1,
  fillColor: "#ff7800",
  fillOpacity: 0.8
};
var hoverCircleMarkerStyle = {
  fillOpacity: 1
}

//circle as marker
var defaultCircleMarkerStyle = {
  radius: 8,
  fillColor: "#ff7800",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8
};
var hoverCircleMarkerStyle = {
  fillOpacity: 1
}

//marker with maki-marker (typical map location - food, train, etc.) 
var defaultIcon = L.MakiMarkers.icon({icon: "circle", color: "#000", size: "m"});
//marker with font-awesome 
var faIcon = L.divIcon({
  // class name that we can refer to in css
  className: 'fa-icon',
  html: '<i class="fa fa-map-marker fa-2x"></i>',
  iconSize: [20, 20] });

var popupOptions = {
  maxWidth: 200,
  maxHeight: 400
}




function getColor(d, hue, intervals) {
  console.log('getColor function');
  //references sets of colors from colorbrewer.js file downloaded from colorbrewer2.org 
  // intervalsLength = intervals.length;
  // colors = colorbrewer[hue][intervalsLength];
  // console.log('colors ' + colors);
  
  // var color = "#ffffff";
  // for (var i = 0; i < intervalsLength; i++) {
  //   color = (d <= intervals[i] ? colors[i] : color); 
  // }
  // console.log('color for d ' + color);
  // return color;
}



//*******************************************************************************//
//*******************************************************************************//
//*******************************************************************************//
//*************************** GeoJSON Polygon Layers ****************************//
//*******************************************************************************//
function addGeoJsonPolygon (dataSource, dataName, styleProp) {

  var newLayer = new L.GeoJSON(null, {
    style: function (feature) {
      return defaultPolygonStyle;
    },
    onEachFeature: function (feature, layer) {

      //layer.setStyle (defaultPolygonStyle);

      if (feature.properties) {
        layer.bindPopup(getProperties(feature.properties)
          , popupOptions);
      }

      layer.on("mouseover", function(e) { layer.setStyle( hoverPolygonStyle ) });
      layer.on("mouseout", function(e) { layer.setStyle( defaultPolygonStyle ) });

    }
  
  });

  $.getJSON(dataSource, function (data) {
      newLayer.addData(data);
      //newLayer.addLegend();
  });

  return newLayer; 
}


//*******************************************************************************//
//*******************************************************************************//
//*******************************************************************************//
//******************************** Cluster Points *******************************//
//*******************************************************************************//
function addMarkerClusterGroup (dataSource, dataName, customIcon) {
  
  //cluster of points
  var newClusterLayer = new L.MarkerClusterGroup({
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: true,
      zoomToBoundsOnClick: true,
      disableClusteringAtZoom: 11
  });

  //individual points
  var newLayer = new L.GeoJSON(null, {
    pointToLayer: function (feature, latlng) {
      return L.marker(latlng, {icon:faIcon});
      //return L.marker(latlng,  defaultMarkerStyle);
    },
    onEachFeature: function (feature, layer) {     

      if (feature.properties) {

        layer.bindPopup(getProperties(feature.properties)
          , popupOptions);
      }
  
    }
  
  });

  $.getJSON(dataSource, function(data) {
    newLayer.addData(data);
    newClusterLayer.addLayer(newLayer);
  });

  return newClusterLayer;

}


//*******************************************************************************//
//*******************************************************************************//
//*******************************************************************************//
//**************************** GeoJSON Point  Layer *****************************//
//*******************************************************************************//
function addGeoJsonPoint (dataSource, dataName) {

  var newLayer = new L.GeoJSON(null, {

    pointToLayer: function (feature, latlng) {
      //return L.marker(latlng,  defaultMarkerStyle);
      return L.marker(latlng, {icon:defaultIcon});
    },
    onEachFeature: function (feature, layer) {
      //need to add a key/value generic listing of properties here
      if (feature.properties) {

        layer.bindPopup(getProperties(feature.properties)
          , popupOptions);

      }
    }
  });

  $.getJSON(dataSource, function (data) {
      newLayer.addData(data);
  });

  return newLayer;
}

//*******************************************************************************//
//*******************************************************************************//
//*******************************************************************************//
//******************************** ESRI Tile Layer ******************************//
//*******************************************************************************//
function addESRIRemoteLayer(dataSource, dataName) {
  var newLayer =  L.esri.dynamicMapLayer(dataSource, {
    opacity: 0.50,
    zIndex:-100,
    clickable: false,
    attribution: dataName 
  });
  //not sure how to handle this dynamically??
  newLayer.bringToBack();

  return newLayer;
}

//*******************************************************************************//
//*******************************************************************************//
//*******************************************************************************//
//******************************** Shapefile Layer ******************************//
//*******************************************************************************//
//requires leaflet.shapefile plugin
function addShapeFileLayer(dataSource, dataName) {
  var newLayer = new L.Shapefile('congress.zip',{

    onEachFeature:function(feature, layer) {
      if (feature.properties) {
        layer.bindPopup(Object.keys(feature.properties).map(function(k){
          return k + ": " + feature.properties[k] ;
        }).join("<br />"), popupOptions);
      }
    }
  });
  
  return newLayer;  

}


//*******************************************************************************//
//*******************************************************************************//
//*******************************************************************************//
//************************** TopoJSON Polygon Layers ****************************//
//*******************************************************************************//
function addTopoJsonPolygon (dataSource, dataName, layerSearch) {

  var newLayer = new L.TopoJSON(null, {
      
    onEachFeature: function (feature, layer) {

      if (layerSearch) {

        layerSearch.push({
            name: dataName + " " + layer.feature.id,
            source: dataSource, 
            id: L.stamp(layer),
            bounds: layer.getBounds(),
            lat: layer.getBounds().getSouthWest().lat,
            lng: layer.getBounds().getSouthWest().lng,
        });

      }

      layer.setStyle (defaultPolygonStyle);

      if (feature.properties) {
        layer.bindPopup(getProperties(feature.properties)
          , popupOptions);
      }

      layer.on("mouseover", function(e) { layer.setStyle( hoverPolygonStyle ) });
      layer.on("mouseout", function(e) { layer.setStyle( defaultPolygonStyle ) });

    }
  
  });

  $.getJSON(dataSource, function (data) {
      newLayer.addData(data);
      //newLayer.addLegend();
  });

  return newLayer;

}

//*******************************************************************************//
//*******************************************************************************//
//*******************************************************************************//
//********************************* Properties **********************************//
//*******************************************************************************//
function getProperties (properties) {
  var content = '';
  for (var key in properties){
    
    //console.log(key + ' = ' + properties[key]);
    content = content + '<strong>' + key + '</strong>: ' + properties[key] + '<br>';
  }
  
  return content;
}

//*******************************************************************************//
//*******************************************************************************//
//*******************************************************************************//
//******************************** TopoJSON Helper ******************************//
//*******************************************************************************//
L.TopoJSON = L.GeoJSON.extend({
  addData: function(jsonData) {    
    if (jsonData.type === "Topology") {
      for (key in jsonData.objects) {
        geojson = topojson.feature(jsonData, jsonData.objects[key]);
        L.GeoJSON.prototype.addData.call(this, geojson);
      }
    }    
    else {
      L.GeoJSON.prototype.addData.call(this, jsonData);
    }
  }  
});


//*******************************************************************************//
//*******************************************************************************//
//*******************************************************************************//
//************************** GeoJSON Polygon Context Layers *********************//
//*******************************************************************************//
function addGeoJsonPolygon (dataSource, dataName, layerSearch) {

  var newLayer = new L.GeoJSON(null, {
    
    onEachFeature: function (feature, layer, layerSearch) {

      //for context layers only... 
      //better approach is to create a geojsonpolygon object and extend it for context
      if (layerSearch) {
        
        //push to typeahead search array
        layerSearch.push({
            name: layer.feature.properties.name,
            source: dataSource, 
            id: L.stamp(layer),
            //id: layer.feature.properties.countyfp,
            lat: layer.feature.geometry.coordinates[1],
            lng: layer.feature.geometry.coordinates[0]
        });
      } 

      layer.setStyle (defaultPolygonStyle);

      if (feature.properties) {
        layer.bindPopup(getProperties(feature.properties)
          , popupOptions);
      }

      layer.on("mouseover", function(e) { layer.setStyle( hoverPolygonStyle ) });
      layer.on("mouseout", function(e) { layer.setStyle( defaultPolygonStyle ) });

      //layer._leaflet_id = feature.properties.countyfp;
      //console.log(layerSearch);
    }
  
  });

  $.getJSON(dataSource, function (data) {
      newLayer.addData(data);
      //newLayer.addLegend();
  });

  console.log(layerSearch);

  return newLayer; 
}