var layerSearch=[],ny_countySearch=[],ny_dotSearch=[],ny_decSearch=[],ny_clim_divSearch=[],ny_watershedSearch=[]; 
var layerBH, ny_countyBH, ny_dotBH, ny_decBH, ny_clim_divBH, ny_watershedBH; 
var ny_county, ny_dot, ny_dec, ny_clim_div, ny_watershed;

//context overlay options
//once things are migrated to fully dynamic, this can be removed
var contextOverlays =  
[
    {
        data_id : ny_county,
        data_name : "Counties",
        data_source : "/data/ny_counties_tiger.geojson",
        data_array : ny_countySearch,
        active : true
    },
    {
        data_id : ny_watershed,
        data_name : "Watersheds",
        data_source : "/data/basin.geojson",
        data_array : ny_watershedSearch,
        active : false
    },
    {
        data_id : ny_dec,
        data_name : "DEC Regions",
        data_source : "/data/ny_dec.geojson",
        data_array : ny_decSearch,
        active : false
    }//,
    // {
    //     data_id : ny_dot,
    //     data_name : "DOT Regions",
    //     data_source : "/data/ny_dot.geojson",
    //     data_array : ny_dotSearch,
    //     active : false
    // },
    // {
    //     data_id : ny_clim_div,
    //     data_name : "Climate Divisions",
    //     data_source : "/data/ny_clim_div.geojson",
    //     data_array : ny_clim_divSearch,
    //     active : false
    // }
];

var contextLayers =  
[
    {
        id : 'ny_county',
        title : "Counties",
        format : 'topojson',
        geometry : 'Polygon',
        proxy : false,
        gisData : "/data/ny_counties_tiger.topojson",
        searchData : ny_countySearch,
        active : true
    },
    {
        id : 'ny_watershed',
        title : "Watersheds",
        format : 'geojson',
        geometry : 'Polygon',
        proxy : false,
        gisData : "/data/basin.geojson",
        searchData : ny_watershedSearch,
        active : false
    },
    {
        id : 'ny_dec',
        title : "DEC Regions",
        format : 'topojson',
        geometry : 'Polygon',
        proxy : false,
        gisData : "/data/ny_dec.topojson",
        searchData : ny_decSearch,
        active : false
    },
    {
        id : 'ny_dot',
        title : "DOT Regions",
        format : 'topojson',
        geometry : 'Polygon',
        proxy : false,
        gisData : "/data/ny_dot.topojson",
        searchData : ny_dotSearch,
        active : false
    },
    {
        id : 'ny_clim_div',
        title : "Climate Divisions",
        format : 'topojson',
        geometry : 'Polygon',
        proxy : false,
        gisData : "/data/ny_clim_div.topojson",
        searchData : ny_clim_divSearch,
        active : false
    }
];


//various base layer options
//some of these came from http://leaflet-extras.github.io/leaflet-providers/preview/
var OpenStreetMap_DE = L.tileLayer('http://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
});

var OpenStreetMap_Mapnik = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
});

var OpenStreetMap_BlackAndWhite = L.tileLayer('http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
});

var OpenStreetMap_HOT = L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
});

var Esri_WorldStreetMap = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
});

var Esri_WorldTopoMap = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
});

var Esri_WorldImagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

var Stamen_Terrain = L.tileLayer('http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
  subdomains: 'abcd',
  minZoom: 4,
  maxZoom: 18
});

var MapQuestOSM = L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpeg', {
  attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
  subdomains: '1234'
});

//mapquest sattelite or imagery with labels
var mapquestHYB = L.layerGroup([L.tileLayer("http://{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg", {
    maxZoom: 19,
    subdomains: ["oatile1", "oatile2", "oatile3", "oatile4"]

}), L.tileLayer("http://{s}.mqcdn.com/tiles/1.0.0/hyb/{z}/{x}/{y}.png", {
    maxZoom: 19,
    subdomains: ["oatile1", "oatile2", "oatile3", "oatile4"],
    attribution: 'Tiles and labels courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">. Map data (c) <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> contributors. '
})]);
