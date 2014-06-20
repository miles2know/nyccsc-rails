// TILE Layers
var topo = new L.TileLayer("http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}.png", {
    maxZoom: 19,
    attribution: 'Basemap Courtesy of <a href="http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer" target="_blank">ESRI</a>'
  });

var mapquestOSM = L.tileLayer("http://{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png", {
    maxZoom: 19,
    subdomains: ["otile1", "otile2", "otile3", "otile4"],
    attribution: 'Tiles courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">. Map data (c) <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> contributors, CC-BY-SA.'
});
var mapquestOAM = L.tileLayer("http://{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg", {
    maxZoom: 18,
    subdomains: ["oatile1", "oatile2", "oatile3", "oatile4"],
    attribution: 'Tiles courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a>. Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency'
});

var nysdop = new L.TileLayer("http://www.orthos.dhses.ny.gov/ArcGIS/rest/services/2009/MapServer/tile/{z}/{y}/{x}.png", {
    maxZoom: 19,
    attribution: 'Imagery courtesy of <a href="http://www.orthos.dhses.ny.gov/" target="_blank">NYS DHSES</a>'
});

var mapquestHYB = L.layerGroup([L.tileLayer("http://{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg", {
    maxZoom: 18,
    subdomains: ["oatile1", "oatile2", "oatile3", "oatile4"]
}), L.tileLayer("http://{s}.mqcdn.com/tiles/1.0.0/hyb/{z}/{x}/{y}.png", {
    maxZoom: 19,
    subdomains: ["oatile1", "oatile2", "oatile3", "oatile4"],
    attribution: 'Labels courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">. Map data (c) <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> contributors. '
})]);

// WMSOverlay Layers
////SNOWMOBILE TRAILS

var adksnowmobile = new L.TileLayer.WMS("http://frontierspatial.com:8080/geoserver/adk/wms", {
  layers: 'adk:adksnowmobiletrails',
  format: 'image/png',
  transparent: true,

});
var nysnowmobile = new L.TileLayer.WMS("http://frontierspatial.com:8080/geoserver/longlake/wms", {
  layers: 'longlake:nyminusllsnowmb',
  format: 'image/png',
  transparent: true,

});


var hudsonWMS = new L.TileLayer.WMS("http://forestecoservices.net:8080/geoserver/nyclimate/wms", {
  layers: 'nyclimate:hudson_join',
  format: 'image/png',
  transparent: true,

});

var llsnowmobile = new L.TileLayer.WMS("http://frontierspatial.com:8080/geoserver/longlake/wms", {
  layers: 'longlake:llsnowmobile',
  format: 'image/png',
  transparent: true,

});

var slt = new L.TileLayer.WMS("http://frontierspatial.com:8080/geoserver/adk/wms", {
  layers: 'adk:slt',
  format: 'image/png',
  transparent: true,

});

var ARGISblueline = new L.TileLayer.WMS("http://aprgis.org:8080/geoserver/argis/wms", {
  layers: 'argis:blueline',
  format: 'image/png',
  transparent: true,

});

var publicLand = new L.TileLayer.WMS("http://aprgis.org:8080/geoserver/argis/wms", {
  layers: 'argis:publicland',
  format: 'image/png',
  transparent: true,

});

