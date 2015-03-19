//IMAGE OVERLAYS

/*var PRISMtmax_slope = L.imageOverlay('data/PRISMtmax_slope/frame0.png', [[40.395,-80.06],[47.395,-66.979]],{opacity:0.5});*/
var PRISMtmax_slope = new L.TileLayer.WMS("http://beierlab.net:8081/thredds/wms/monthly/Prism/PRISMComputedDataAllMonths_1980to2009.nc?service=WMS", {
  version:'1.3.0',
  layers: 'tmax_slope',
  COLORSCALERANGE:'-0.2,0.24',
  //SRS:'ESPG:4326',
  //CRS:'CRS:84',
  format:'image/png',
  styles:'BOXFILL/redblue',
  TIME:'2009-1-01T00:00:00.000Z',
  transparent: true,
  opacity: .75,
  zIndex: 100
}); 

var PRISMtmax_mean = new L.TileLayer.WMS("http://beierlab.net:8081/thredds/wms/monthly/Prism/PRISMComputedDataAllMonths_1980to2009.nc?service=WMS", {
  version:'1.3.0',
  layers: 'tmax_mean',
  COLORSCALERANGE:'-10,30',
  //SRS:'ESPG:4326',
  //CRS:'CRS:84',
  format:'image/png',
  styles:'BOXFILL/rainbow',
  TIME:'2009-1-01T00:00:00.000Z',
  transparent: true,
  opacity: .75,
  zIndex: 100
});  

var ppt_SRESB1 = new L.TileLayer.WMS("http://tds.gisclimatechange.ucar.edu/thredds/wms/products/files/ppt_SRESB1_near_seasonal_down_anomaly.nc?service=WMS", {
  version:'1.3.0',
  layers: 'ppt',
  COLORSCALERANGE:'-10,30',
  //SRS:'ESPG:4326',
  //CRS:'CRS:84',
  format:'image/png',
  styles:'BOXFILL/ppt',
  TIME:'2039-02-15T00:00:00Z',
  transparent: true,
  opacity: .75,
  zIndex: 100
});  

http://tds.gisclimatechange.ucar.edu/thredds/wms/products/files/ppt_SRESB1_near_seasonal_down_anomaly.nc?service=WMS&version=1.3.0&request=GetMap&Layers=ppt&bbox=-125.5,24,-66,50&SRS=ESPG:4326&CRS=CRS:84&COLORSCALERANGE=-100,55&width=850&height=500&styles=BOXFILL/rainbow&format=image/png&TIME=2039-02-15T00:00:00Z


// TILE Layers
/* Basemap Layers */
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
var mapquestHYB = L.layerGroup([L.tileLayer("http://{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg", {
  maxZoom: 18,
  subdomains: ["oatile1", "oatile2", "oatile3", "oatile4"]
}), L.tileLayer("http://{s}.mqcdn.com/tiles/1.0.0/hyb/{z}/{x}/{y}.png", {
  maxZoom: 19,
  subdomains: ["oatile1", "oatile2", "oatile3", "oatile4"],
  attribution: 'Labels courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">. Map data (c) <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> contributors, CC-BY-SA. Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency'
})]);


var topoESRI = new L.TileLayer("http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}.png", {
    maxZoom: 19,
    attribution: 'Basemap Courtesy of <a href="http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer" target="_blank">ESRI</a>'
  });


var nysdop = new L.TileLayer("http://www.orthos.dhses.ny.gov/ArcGIS/rest/services/2009/MapServer/tile/{z}/{y}/{x}.png", {
    maxZoom: 19,
    attribution: 'Imagery courtesy of <a href="http://www.orthos.dhses.ny.gov/" target="_blank">NYS DHSES</a>'
});



///WMS LAYERS
var aadt_2012 = new L.TileLayer.WMS("http://frontierspatial.com:8080/geoserver/nyccsc/wms", {
  layers: 'nyccsc:aadt_2012',
  format: 'image/png',
  transparent: true,
  opacity: 1,
  zIndex: 100
}); 

var nfhl =  L.esri.dynamicMapLayer("http://www.hazards.fema.gov/gis/nfhl/rest/services/public/NFHL/MapServer", {
opacity: 0.50,
zIndex:-100,
clickable: false,
attribution: 'USGS National Gap Analysis Program'
});

var noaa_slr =  L.esri.dynamicMapLayer("http://maps2.coast.noaa.gov/arcgis/rest/services/dc_slr/slr_0ft/MapServer", {
opacity: 0.50,
zIndex:-100,
clickable: false,
attribution: 'NOAA Sea Level Rise (SLR)'
});

var railroad = new L.TileLayer.WMS("http://frontierspatial.com:8080/geoserver/nyccsc/wms", {
  layers: 'nyccsc:railroad',
  format: 'image/png',
  transparent: true,
  opacity: 1,
  zIndex: 100
});  

var trout_streams = new L.TileLayer.WMS("http://frontierspatial.com:8080/geoserver/nyccsc/wms", {
  layers: 'nyccsc:trout_streams',
  format: 'image/png',
  transparent: true,
  opacity: 1,
  zIndex: 100
});  






////VECTOR LAYERS

//BOUNDARY Layers
//COUNTIES
var ny_countySearch=[];

var ny_county = new L.TopoJSON(null, {
    style: {
            clickable: true,
            weight: 2,
            color: 'black',
            opacity: 1,
            fill: true,
            fillOpacity: 0
    },
            

    onEachFeature: function (feature, layer) {
        ny_countySearch.push({
            name: layer.feature.id + " County",
            source: "ny_county",
            id: L.stamp(layer),
            bounds: layer.getBounds(),
            lat: layer.getBounds().getSouthWest().lat,
            lng: layer.getBounds().getSouthWest().lng,
            bounds: layer.getBounds()
        });

        if (feature.properties) {
        
            layer.bindPopup(
                "<strong>" + feature.id + " County</strong>" ,  {
                closeButton: false
            });
        }
/*        layer.on({
            mouseover: function(e) {
                var layer = e.target;
                layer.setStyle({
                    weight: 3,
                    color: "#00FFFF",
                    opacity: 1
                });
                if (!L.Browser.ie && !L.Browser.opera) {
                    layer.bringToFront();
                }
            },
            mouseout: function(e) {
                ny_county.resetStyle(e.target);
            }
        });*/

    }
});

$.getJSON("data/ny_county.topojson", function (data) {
    ny_county.addData(data);
});

//DEC REGIONS
var ny_decSearch=[];

var ny_dec = new L.TopoJSON(null, {
    style: {
            clickable: true,
            weight: 2,
            color: 'darkgreen',
            opacity: 1,
            fill: true,
            fillOpacity: 0
    },
            

    onEachFeature: function (feature, layer) {
        ny_decSearch.push({
            name: "DEC Region " + layer.feature.id,
            source: "ny_dec", 
            id: L.stamp(layer),
            bounds: layer.getBounds(),
            lat: layer.getBounds().getSouthWest().lat,
            lng: layer.getBounds().getSouthWest().lng,
            bounds: layer.getBounds()
        });

        if (feature.properties) {
        
            layer.bindPopup(
                "<strong>DEC Region " + feature.id + "</strong>" ,  {
                closeButton: false
            });
        }
/*        layer.on({
            mouseover: function(e) {
                var layer = e.target;
                layer.setStyle({
                    weight: 3,
                    color: "#00FFFF",
                    opacity: 1
                });
                if (!L.Browser.ie && !L.Browser.opera) {
                    layer.bringToFront();
                }
            },
            mouseout: function(e) {
                dot.resetStyle(e.target);
            }
        });*/

    }
});

$.getJSON("data/ny_dec.topojson", function (data) {
    ny_dec.addData(data);
});


//DOT REGIONS
var ny_dotSearch=[];

var ny_dot = new L.TopoJSON(null, {
    style: {
            clickable: true,
            weight: 2,
            color: 'brown',
            opacity: 1,
            fill: true,
            fillOpacity: 0
    },
            

    onEachFeature: function (feature, layer) {
        ny_dotSearch.push({
            name: "DOT Region " + layer.feature.id,
            source: "ny_dot", 
            id: L.stamp(layer),
            bounds: layer.getBounds(),
            lat: layer.getBounds().getSouthWest().lat,
            lng: layer.getBounds().getSouthWest().lng,
            bounds: layer.getBounds()
        });

        if (feature.properties) {
        
            layer.bindPopup(
                "<strong>DOT Region " + feature.id + "</strong>" ,  {
                closeButton: false
            });
        }
/*        layer.on({
            mouseover: function(e) {
                var layer = e.target;
                layer.setStyle({
                    weight: 3,
                    color: "#00FFFF",
                    opacity: 1
                });
                if (!L.Browser.ie && !L.Browser.opera) {
                    layer.bringToFront();
                }
            },
            mouseout: function(e) {
                dot.resetStyle(e.target);
            }
        });*/

    }
});

$.getJSON("data/ny_dot.topojson", function (data) {
    ny_dot.addData(data);
});


/////CLIMATE DIVISIONS
var ny_clim_divSearch=[];

var ny_clim_div = new L.TopoJSON(null, {
    style: {
            clickable: true,
            weight: 2,
            color: 'red',
            opacity: 1,
            fill: true,
            fillOpacity: 0
    },
            

    onEachFeature: function (feature, layer) {
        ny_clim_divSearch.push({
            name: layer.feature.id,
            source: "ny_clim_div", 
            id: L.stamp(layer),
            bounds: layer.getBounds(),
            lat: layer.getBounds().getSouthWest().lat,
            lng: layer.getBounds().getSouthWest().lng,
            bounds: layer.getBounds()
        });

        if (feature.properties) {
        
            layer.bindPopup(
                "<strong>Climate Region: " + feature.id + "</strong>" ,  {
                closeButton: false
            });
        }
/*        layer.on({
            mouseover: function(e) {
                var layer = e.target;
                layer.setStyle({
                    weight: 3,
                    color: "#00FFFF",
                    opacity: 1
                });
                if (!L.Browser.ie && !L.Browser.opera) {
                    layer.bringToFront();
                }
            },
            mouseout: function(e) {
                dot.resetStyle(e.target);
            }
        });*/

    }
});

//HUC8 WATERSHEDS
var huc8 = new L.GeoJSON(null, {
    style: {
                clickable: true,
                weight: 2,
                color: 'orange',
                opacity: 1,
                fill: true,
                fillOpacity: 0

    },

    onEachFeature: function (feature, layer) {
        

        if (feature.properties) {
            
            layer.bindPopup(
                "<strong>" + feature.properties.name + " River Watershed </strong> </br>HUC Code: " + feature.properties.huc8,  {
                closeButton: false
            });
        }
        huc8Search.push({
            name: layer.feature.properties.name,
            source: "huc8",
            id: L.stamp(layer),
            bounds: layer.getBounds()
        });

    }
});

//OTHER VECTOR LAYERS
//ALSC
var alsc = new L.MarkerClusterGroup({
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: true,
    disableClusteringAtZoom: 11,
    iconCreateFunction: function (cluster) {
        return new L.DivIcon({
            html: cluster.getChildCount(),
            className: 'alscCluster',
            iconSize: new L.Point(40, 48)
        });
    }
});


var alscInput = new L.GeoJSON(null, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: L.icon({
                iconUrl: 'assets/img/alsc.png',
                iconSize: [18, 21],
                iconAnchor: [12, 28],
                popupAnchor: [0, -25]
            }),
            title: feature.properties.name
        });
    },
    onEachFeature: function (feature, layer) {

                //console.log(feature.geometry.coordinates[0][0])
                layer.bindPopup("<strong>" + feature.properties.name + "</strong><br>" + "Average pH:" + feature.properties.avgph +"<br>" + feature.properties.fishsurveydate + " Fish Survey:<br><i>" + feature.properties.specieslist  + "</i><br><a href='#' onclick='map.setView([" + feature.geometry.coordinates[1] + "," + feature.geometry.coordinates[0] + "], 15);'>Zoom to feature</a>" ,  {
                    closeButton: false

        })
/*        alscSearch.push({
            name: layer.feature.properties.name,
            source: "alsc",
            id: L.stamp(layer),
            lat: layer.feature.geometry.coordinates[1],
            lng: layer.feature.geometry.coordinates[0]
        });*/
    }
});


function getColor(d) {
    return d > 100 ? '#800026' :
           d > 20  ? '#BD0026' :
           d > 15  ? '#E31A1C' :
           d > 10  ? '#FC4E2A' :
           d > 5   ? '#FD8D3C' :
           d > 2   ? '#FEB24C' :
           d > 1   ? '#FED976' :
                      '#FFEDA0';
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.total1964_2013),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}



var historicdeclarations_ny = new L.GeoJSON(null, {
    style: function (feature) {
      return {
        fillColor: getColor(feature.properties.total1964_2013),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
      };
    },
    onEachFeature: function (feature, layer) {
        if (feature.properties) {
            var content =  "<b>FEMA Declared Emergencies <br>"+ feature.properties.name + " County</b></br><table class='table table-striped table-bordered table-condensed'>"+
                                "<tr><th>Type</th><th>1964-2000</th><th>2000-2013</th><th>Total</th></tr>"+
                                "<tr><td>Flood</td><td>" + feature.properties.flood1964_2000 + "</td><td>" + feature.properties.flood2000_2013 + "</td><td>" + feature.properties.flood1964_2013 + "</td></tr>"+
                                "<tr><td>Storm</td><td>" + feature.properties.storm1964_2000 + "</td><td>" + feature.properties.storm2000_2013 + "</td><td>" + feature.properties.storm1964_2013 + "</td></tr>"+
                                "<tr><td>Snow</td><td>" + feature.properties.snow1964_2000 + "</td><td>" + feature.properties.snow2000_2013 + "</td><td>" + feature.properties.snow1964_2013 + "</td></tr>"+
                                "<tr><td>All</td><td>" + feature.properties.total1964_2000 + "</td><td>" + feature.properties.total2000_2013 + "</td><td>" + feature.properties.total1964_2013 + "</td></tr>"+
                            "<table>";

            if (document.body.clientWidth <= 767) {
                layer.on({
                    click: function(e) {
                        $("#feature-title").html(feature.properties.NAME);
                        $("#feature-info").html(content);
                        $("#featureModal").modal("show");
                    }
                });

            } else {
                layer.bindPopup(content, {
                    maxWidth: "auto",
                    closeButton: false
                });
            };
            /*            layer.bindPopup("<b>" + feature.properties.name + " County</br>Declared Emergencies <br></b><table class='table table-striped table-bordered table-condensed'>
                                    <tr><th>Type</th><th>1964-2000</th><th>2000-2013</th><th>Total 1964-2013</th></tr></table>" + feature.properties.total1964_2013, {
               closeButton: false
            });*/
        }
    }
});

//SPDES
var spdes = new L.MarkerClusterGroup({
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: true,
    disableClusteringAtZoom: 11,
    iconCreateFunction: function (cluster) {
        return new L.DivIcon({
            html: cluster.getChildCount(),
            className: 'spdesCluster',
            iconSize: new L.Point(45, 45)
        });
    }
});


var spdesInput = new L.GeoJSON(null, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: L.icon({
                iconUrl: 'assets/img/sewer-pipe.png',
                iconSize: [18, 21],
                iconAnchor: [12, 28],
                popupAnchor: [0, -25]
            }),
            title: feature.properties.name
        });
    },
    onEachFeature: function (feature, layer) {

                //console.log(feature.geometry.coordinates[0][0])
                layer.bindPopup(feature.properties.name + "<br><a href='#' onclick='map.setView([" + feature.geometry.coordinates[1] + "," + feature.geometry.coordinates[0] + "], 15);'>Zoom to feature</a>" ,  {
                    closeButton: false

        })
/*        spdesSearch.push({
            name: layer.feature.properties.name,
            source: "spdes",
            id: L.stamp(layer),
            lat: layer.feature.geometry.coordinates[1],
            lng: layer.feature.geometry.coordinates[0]
        });*/
    }
});

//NYC Subway Lines
var subwayLinesSearch=[];

var subwayLines = L.geoJson(null, {
  style: function (feature) {
    if (feature.properties.route_id === "1" || feature.properties.route_id === "2" || feature.properties.route_id === "3") {
      return {
        color: "#ff3135",
        weight: 3,
        opacity: 1
      };
    }
    if (feature.properties.route_id === "4" || feature.properties.route_id === "5" || feature.properties.route_id === "6") {
      return {
        color: "#009b2e",
        weight: 3,
        opacity: 1
      };
    }
    if (feature.properties.route_id === "7") {
      return {
        color: "#ce06cb",
        weight: 3,
        opacity: 1
      };
    }
    if (feature.properties.route_id === "A" || feature.properties.route_id === "C" || feature.properties.route_id === "E" || feature.properties.route_id === "SI" || feature.properties.route_id === "H") {
      return {
        color: "#fd9a00",
        weight: 3,
        opacity: 1
      };
    }
    if (feature.properties.route_id === "Air") {
      return {
        color: "#ffff00",
        weight: 3,
        opacity: 1
      };
    }
    if (feature.properties.route_id === "B" || feature.properties.route_id === "D" || feature.properties.route_id === "F" || feature.properties.route_id === "M") {
      return {
        color: "#ffff00",
        weight: 3,
        opacity: 1
      };
    }
    if (feature.properties.route_id === "G") {
      return {
        color: "#9ace00",
        weight: 3,
        opacity: 1
      };
    }
    if (feature.properties.route_id === "FS" || feature.properties.route_id === "GS") {
      return {
        color: "#6e6e6e",
        weight: 3,
        opacity: 1
      };
    }
    if (feature.properties.route_id === "J" || feature.properties.route_id === "Z") {
      return {
        color: "#976900",
        weight: 3,
        opacity: 1
      };
    }
    if (feature.properties.route_id === "L") {
      return {
        color: "#969696",
        weight: 3,
        opacity: 1
      };
    }
    if (feature.properties.route_id === "N" || feature.properties.route_id === "Q" || feature.properties.route_id === "R") {
      return {
        color: "#ffff00",
        weight: 3,
        opacity: 1
      };
    }
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Division</th><td>" + feature.properties.Division + "</td></tr>" + "<tr><th>Line</th><td>" + feature.properties.Line + "</td></tr>" + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.Line);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight.clearLayers().addLayer(L.circleMarker([e.latlng.lat, e.latlng.lng], {
            stroke: false,
            fillColor: "#00FFFF",
            fillOpacity: 0.7,
            radius: 10
          }));
        }
      });
    }
    layer.on({
      mouseover: function (e) {
        var layer = e.target;
        layer.setStyle({
          weight: 3,
          color: "#00FFFF",
          opacity: 1
        });
        if (!L.Browser.ie && !L.Browser.opera) {
          layer.bringToFront();
        }
      },
      mouseout: function (e) {
        subwayLines.resetStyle(e.target);
      }
    });
    subwayLinesSearch.push({
            name: layer.feature.id,
            source: "subwayLines", 
            id: L.stamp(layer),
            bounds: layer.getBounds(),
            lat: layer.getBounds().getSouthWest().lat,
            lng: layer.getBounds().getSouthWest().lng,
            bounds: layer.getBounds()
        });
  }
});



//USGS STREAM GAGES
function getGageColors(d) {
            return d == 0 ? '#FFFFFF' :
                   d == 1 ? '#FF0000' :
                   d == 2 ? '#B12121' :
                   d == 3 ? '#B12121' :
                   d == 4 ? '#FFA400' :
                   d == 5 ? '#00FF00' :
                   d == 6 ? '#40DFD0' :
                   d == 7 ? '#0000FF' :
                   d == 8 ? '#000' :
                           '#FFEDA0' ;
        }


// gage
usgs_streamflow = new L.GeoJSON(null, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng,  {
            title: feature.properties.name,
            //circleradius
            radius: 4,
            //fill
            fillColor: getGageColors(feature.properties.class),
            fillOpacity: 0.8,
            //border
            color: "black",
            weight: 1,
            opacity: 1,
            zIndex:100
            });
    },
    onEachFeature: function (feature, layer) {
        if (feature.properties) {
            layer.bindPopup("<b>" + feature.properties.name + "</b></br>Updated: " + feature.properties.date + " @ "+ feature.properties.time + "</br>Stage: " + feature.properties.stage + "</br>Discharge: " + feature.properties.discharge +  "</br><a href='" + feature.properties.url + "' target='_blank_'>Link</a>", {
               closeButton: false
            });
        }
    }
});