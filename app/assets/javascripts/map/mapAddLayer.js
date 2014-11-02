
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
  color: 'white',
  opacity: 1,
  fillColor: 'gray',
  fillOpacity: 0.2
};
var hoverPolygonStyle = {
  fillOpacity: 1
};

//marker styles
//regular marker
var defaultMarkerStyle = {
  opacity: 1,
  fillColor: "#000000",
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



function addLayer (layerProp) {
  //lots of conditions here to determine what type of layer to add
  var layer, dataSource;

  //if (layerProp["proxy"]) {
  
  if (layerProp["gisData"].indexOf("frontierspatial") >= 1) {
    console.log('frontier');
    dataSource = "/proxy/data?q=data&frontier=y&querytype=" + layerProp["gisData"];
  } else {
    dataSource = layerProp["gisData"];
  }

  if (layerProp["format"] == "tiles") {
    
    layer = addESRIRemoteLayer(dataSource, layerProp["title"]);

  } else if (layerProp["format"] == "geojson" ) {
    //geometry conditions
    if (layerProp["geometry"] == "Polygon") {
      
      if (layerProp["type"] == "Color") {
        layer = addGeoJsonPolygon(dataSource, layerProp["title"], layerProp["metaData"]);
      } else {
        layer = addGeoJsonPolygon(dataSource, layerProp["title"]);
      }

    } else if (layerProp["geometry"] == "Point") {
      //cluster or simple points
      if (layerProp["type"] == "Cluster") {
        layer = addMarkerClusterGroup(dataSource, layerProp["title"], layerProp["metaData"]);
      } else {
        layer = addGeoJsonPoint(dataSource, layerProp["title"], layerProp["metaData"]);
      }
    } 

  } else if (layerProp["format"] == "topojson") {
    //geometry conditions
    
    layer = addTopoJsonPolygon(dataSource, layerProp["title"]);
    
  }

  return layer;

}



//*******************************************************************************//
//*******************************************************************************//
//*******************************************************************************//
//*************************** GeoJSON Polygon Layers ****************************//
//*******************************************************************************//
function addGeoJsonPolygon (dataSource, dataName, featureProp) {
  //console.log(featureProp);
  var newLayer = new L.GeoJSON(null, {
    style: function (feature) {
      //console.log(feature.properties["'" + featureProp.dataProp + "'"]);
      if (featureProp) {
        var customPolygonStyle = {
          clickable: true,
          weight: 2,
          color: 'white',
          opacity: 1,
          fill: true,
          fillOpacity: .8,
          fillColor : getColor(feature.properties[featureProp.dataProp], featureProp.colorHue, featureProp.intervals)
        }
        polygonStyle = customPolygonStyle;
      } else {
        polygonStyle = defaultPolygonStyle;
      }
      return polygonStyle;
    },
    onEachFeature: function (feature, layer) {

      //layer.setStyle (defaultPolygonStyle);

      if (feature.properties) {
        layer.bindPopup(getProperties(feature.properties)
          , popupOptions);
      }

      //need to capture individual polygon styles since they are dynamic
      //layer.on("mouseover", function(e) { layer.setStyle( hoverPolygonStyle ) });
      //layer.on("mouseout", function(e) { layer.setStyle( polygonStyle ) });

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
//**************************** GeoJSON Point  Layer *****************************//
//*******************************************************************************//
function addGeoJsonPoint (dataSource, dataName, featureProp) {

  var newLayer = new L.GeoJSON(null, {

    pointToLayer: function (feature, latlng) {
      //return L.marker(latlng,  defaultMarkerStyle);
      if (featureProp) {
        if (featureProp.icon == "Circle") {
          return L.circleMarker(latlng, {
            radius: 6,
            fillColor: getColor(feature.properties[featureProp.dataProp], featureProp.colorHue, featureProp.intervals),
            fillOpacity: 1,
            weight: 0,
            zIndex: 100
          });
        } else if (featureProp.icon == "Custom") {

          return L.marker(latlng, {
            icon: L.icon({
              iconUrl : featureProp.iconUrl
            })
          
          });
        } else { //standard marker
          return L.marker(latlng, {icon:faIcon});
        }
      }
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
//******************************** Cluster Points *******************************//
//*******************************************************************************//
function addMarkerClusterGroup (dataSource, dataName, featureProp) {
  
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
      if (featureProp) {
        if (featureProp.icon == "Circle") {
          return L.circleMarker(latlng, {
            radius: 6,
            fillColor: getColor(feature.properties[featureProp.dataProp], featureProp.colorHue, featureProp.intervals),
            fillOpacity: 1,
            weight: 0,
            zIndex: 100
          });
        } else if (featureProp.icon == "Custom") {

          return L.marker(latlng, {
            icon: L.icon({
              iconUrl : featureProp.iconUrl
            })
          
          });
        } else { //standard marker
          return L.marker(latlng, {icon:faIcon});
        }
      }
    },
    onEachFeature: function (feature, layer) {     

      if (feature.properties) {

        layer.bindPopup(getProperties(feature.properties)
          , popupOptions);
      }
  
    }
  
  });


  $.getJSON(dataSource, function (data) {
      newLayer.addData(data);
      newClusterLayer.addLayer(newLayer);
  });
  // $.getJSON(dataSource, function(data) {
  //   newLayer.addData(data);
  //   newClusterLayer.addLayer(newLayer);
  // });

  return newClusterLayer;

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
function addTopoJsonPolygon (dataSource, dataName) {

  var newLayer = new L.TopoJSON(null, {
      
    onEachFeature: function (feature, layer) {

      layer.setStyle (defaultPolygonStyle);

      if (feature.properties) {
        
            layer.bindPopup(
                "<strong>" + feature.id + "</strong> (" + dataName + ")",  popupOptions);
      }

      //layer.on("mouseover", function(e) { layer.setStyle( hoverPolygonStyle ) });
      //layer.on("mouseout", function(e) { layer.setStyle( defaultPolygonStyle ) });

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

