'use strict';

var map, huc8Search=[], clim_divSearch=[], decregionSearch=[], countySearch=[];
var countyCoordinates = {};//fp is key
function setupMap() {



// TILE Layers
var topo = new L.TileLayer("http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}.png", {
    maxZoom: 19,
    attribution: 'Basemap Courtesy of <a href="http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer" target="_blank">ESRI</a>'
  });

var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        var osmAttrib='Map data &copy; OpenStreetMap contributors';
        var osm = new L.TileLayer(osmUrl, {minZoom: 5, maxZoom: 18, attribution: osmAttrib});


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

// WMS Overlay Layers




//GeoJSON Overlays
var decregion = new L.GeoJSON(null, {
    style: {
                clickable: false,
                weight: 3,
                color: 'green',
                opacity: 1,
                fill: true,
                fillOpacity: 0

    },

    onEachFeature: function (feature, layer) {
        

        if (feature.properties) {
            
            layer.bindPopup(
                "<strong>DEC&nbsp;" + feature.properties.name + "</strong> ",  {
                closeButton: false
            });
        }

        decregionSearch.push({
            name: layer.feature.properties.name,
            source: "decregion",
            id: L.stamp(layer),
            lat: layer.feature.geometry.coordinates[1],
            lng: layer.feature.geometry.coordinates[0]
        });

    }
});

$.getJSON("data/decregions.geojson", function (data) {
    decregion.addData(data);
});

var huc8 = new L.GeoJSON(null, {
    style: {
                clickable: false,
                weight: 2,
                color: 'orange',
                opacity: 1,
                fill: true,
                fillOpacity: 0

    },

    onEachFeature: function (feature, layer) {
        

        if (feature.properties) {
            
            layer.bindPopup(
                "<strong>" + feature.properties.name + "</strong> </br>HUC Code: " + feature.properties.huc8,  {
                closeButton: false
            });
        }
        huc8Search.push({
            name: layer.feature.properties.name,
            source: "huc8",
            id: L.stamp(layer),
            lat: layer.feature.geometry.coordinates[1],
            lng: layer.feature.geometry.coordinates[0]
        });

    }
});

$.getJSON("data/basin.geojson", function (data) {
    huc8.addData(data);
});

var clim_div = new L.GeoJSON(null, {
    style: {
                clickable: false,
                weight: 2,
                color: 'purple',
                opacity: 1,
                fill: true,
                fillOpacity: 0

    },

    onEachFeature: function (feature, layer) {
        

        if (feature.properties) {
            
            layer.bindPopup(
                "<strong>" + feature.properties.name + "</strong>" ,  {
                closeButton: false
            });
        }

        clim_divSearch.push({
            name: layer.feature.properties.name,
            source: "clim_div",
            id: L.stamp(layer),
            lat: layer.feature.geometry.coordinates[1],
            lng: layer.feature.geometry.coordinates[0]
        });

    }
});

$.getJSON("data/clim_div.geojson", function (data) {
    clim_div.addData(data);
});

var county = new L.GeoJSON(null, {
    style: {
                clickable: false,
                weight: 2,
                color: 'black',
                opacity: 1,
                fill: true,
                fillOpacity: 0,
                title: name +" County"

    },

    onEachFeature: function (feature, layer) {
        

        if (feature.properties) {
            
           var content =   feature.properties.countyname + " County";
            if (document.body.clientWidth <= 767) {
                layer.on({
                    click: function(e) {
                        $("#feature-title").html(feature.properties.name);
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
        }
        layer.on({
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
                county.resetStyle(e.target);
            }
        });

    }
});

$.getJSON("data/ny_counties_tiger.geojson", function (data) {
    county.addData(data);
    //Make a hash of this data to be accessed later - specifically with regards to coordinates for counties
    //Getting bounding box info from json now
    //processCountyData(data);
});

// gage
var gage = new L.GeoJSON(null, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng,  {
            title: feature.properties.name,
            //circleradius
            radius: 3,
            //fill
            fillColor: "orange",
            fillOpacity: 0.8,
            //border
            color: "black",
            weight: 3,
            opacity: 1
            });
    },
    onEachFeature: function (feature, layer) {
        if (feature.properties) {
            layer.bindPopup("<b>" + feature.properties.name + "</b></br>Updated: " + feature.properties.time + " "+ feature.properties.date + "</br>Stage: " + feature.properties.stage + "</br><a href='" + feature.properties.url + "' target='_blank_'>Link</a>", {
               closeButton: false
            });
        }
/*        gagesearch.push({
            name: layer.feature.properties.NAME,
            source: "place",
            id: L.stamp(layer),
            lat: layer.feature.geometry.coordinates[1],
            lng: layer.feature.geometry.coordinates[0]
        });*/
    }
});

map = L.map("map", {
    zoom: 8,
    center: [43.92, -74.],minZoom: 6,
    maxZoom: 17,
    layers: [mapquestOSM ]

});


// Larger screens get expanded layer control
if (document.body.clientWidth <= 767) {
    var isCollapsed = true;
} else {
    var isCollapsed = false;
};

var baseLayers = {
    "Terrain": mapquestOSM,
    "Imagery": mapquestHYB,
    "Imagery, no labels": mapquestOAM
};

var overlays = {
    "Counties":county,
    "DEC Regions": decregion,
    "HUC8 Watersheds": huc8,
    "Climate Divisions": clim_div,
    "USGS Stream Gages": gage

    
};

var layerControl = L.control.layers(baseLayers, overlays, {
    collapsed: isCollapsed
}).addTo(map);


L.control.locate().addTo(map);

function getWstations(e){
    var bounds = map.getBounds();
    //map.removeLayer(gage)
    var url = "http://data.rcc-acis.org/StnMeta?bbox=" + bounds.getSouthWest().lng + "," + bounds.getSouthWest().lat + "," + bounds.getNorthEast().lng + "," + bounds.getNorthEast().lat +"&meta=name,ll";

    $.getJSON(url, function (data) {
        //gage.addData(data);
        //console.log("stationdata",data)
        $("#wstation-list").empty();
        $("#wstation-list").append("<tr><th>Station</th><th>Lat</th><th>Lon</th></tr>")
        $.each(data.meta, function( index, value ) {
          //console.log(value.name);
          $("#wstation-list").append("<tr><td>" + value.name + "</td><td>" + value.ll[0] + "</td><td>" + value.ll[1] +"</td></tr>" );
        })
    });

    //gage.addTo(map);
}


function getGages(e){
    var bounds = map.getBounds();
    map.removeLayer(gage)
    var url = "proxy/data?q=data&querytype=streamGage2geojson&lat1=" + bounds.getSouthWest().lat + "&lon1=" + bounds.getSouthWest().lng + "&lat2=" + bounds.getNorthEast().lat + "&lon2=" + bounds.getNorthEast().lng;

    $.getJSON(url, function (data) {
        //console.log("gagedata",data)
        gage.addData(data);
        $("#gage-list").empty();
        $.each(data.features, function( index, value ) {
          //console.log(value.properties.name);
          $("#gage-list").append("<tr><td>" + value.properties.name + "</td></tr>" );
        })
    });

    gage.addTo(map);
}

function getCounties(e){
    var bounds = map.getBounds();
    var center = map.getCenter();
    //map.removeLayer(gage)
    var url = "proxy/data?q=data&querytype=countyREST2json&lat1=" + bounds.getSouthWest().lat + "&lon1=" + bounds.getSouthWest().lng + "&lat2=" + bounds.getNorthEast().lat + "&lon2=" + bounds.getNorthEast().lng + "&midlon=" + center.lng + "&midlat=" + center.lat;

    $.getJSON(url, function (data) {
    //console.log('counties in boundingbox',data)
    $("#county-list").empty();
        $("#county-list").append("<tr><th>County</th><th>Map Center</th><th>% Bbox</th></tr>")
        $.each(data, function( index, value ) {
          //console.log(value.properties.name);
          $("#county-list").append("<tr><td>" + value.name +  "</td><td>" + value.distance2mapcenter + "</td><td>" +value.percentbbox + "</td></tr>");
        })
    });
}

var popup = L.popup();



function getClickList(e){
    
    var point = e.latlng;
    //map.removeLayer(gage)
    var url = "proxy/data?q=data&querytype=clickList2json&lon=" + point.lng + "&lat=" + point.lat;

    //Updating the look and feel here so that it is more in line with what we want the user to see
    //The end user probably won't care about 'polygons'
    //ids are count_fp, huc8, clim_div, decregion
    $.getJSON(url, function (data) {
    	var countyName = data[0].county_name;
    	var countyfp = data[0].county_fp;
    	
    	//We are ASSUMING that the county data structure is setup but we need to come up with a cleaner separation here
    	var clickUrl = "";
    	var countyInfo = processBoundingBox(data[0].county_bbox);
    	if(countyInfo != null) {
    		//Need bounding box in order to create the URL
    		var params = "spatialrange=[" + countyInfo.minY + "," + countyInfo.minX + " TO " + countyInfo.maxY + "," + countyInfo.maxX + "]";
    		clickUrl = "/?q=*&search_fields=all_fields&" + params;
    	}
    	
    	
    	var htmlToDisplay = "<strong><b>" + data[0].county_name + " County</b></strong><br/><br/><table class='table table-striped table-bordered table-condensed'> "+
        	"<tr><td>" + data[0].huc8_name + " Watershed</td></tr>"+
        	"<tr><td>" + data[0].clim_div_name + " Climate Division</td></tr>"+
        	"<tr><td>DEC " + data[0].decregion_name + "</td></tr>"+
        	"<table><br/><a href='" + clickUrl + "'>Filter results by " + countyName + " County</a>";
    	
    	
        popup
            
            .setLatLng(point)
            .setContent(htmlToDisplay)
            .openOn(map);
    });

    //gage.addTo(map);
}

// update the map pins whenever the map is redrawn:
map.on('moveend', getGages);
map.whenReady(getGages);

map.on('moveend', getWstations);
map.whenReady(getWstations);

// update the county stats whenever the map is redrawn:
map.on('moveend', getCounties);
map.whenReady(getCounties);

// find polygons whenever the map is clicked.
map.on('click', getClickList);


//These make the mini map go.
var osm2 = new L.TileLayer(osmUrl, {minZoom: 1, maxZoom: 6, attribution: osmAttrib });
var miniMap = new L.Control.MiniMap(osm2, { height: 100, width: 100,  toggleDisplay: true }).addTo(map);



// Highlight search box text on click
            $("#searchbox").click(function () {
                $(this).select();
            });

            // Typeahead search functionality
         $(document).one("ajaxStop", function () {
            //map.fitBounds(decregion.getBounds());
                $("#loading").hide();
   
/*                var placeBH = new Bloodhound({
                    name: "place",
                    datumTokenizer: function (d) {
                        return Bloodhound.tokenizers.whitespace(d.name);
                    },
                    queryTokenizer: Bloodhound.tokenizers.whitespace,
                    local: placeSearch,
                    limit: 10
                });*/

                var huc8BH = new Bloodhound({
                    name: "huc8",
                    datumTokenizer: function (d) {
                        return Bloodhound.tokenizers.whitespace(d.name);
                    },
                    queryTokenizer: Bloodhound.tokenizers.whitespace,
                    local: huc8Search,
                    limit: 10
                });

                var clim_divBH = new Bloodhound({
                    name: "clim_div",
                    datumTokenizer: function (d) {
                        return Bloodhound.tokenizers.whitespace(d.name);
                    },
                    queryTokenizer: Bloodhound.tokenizers.whitespace,
                    local: clim_divSearch,
                    limit: 10
                });

                var decregionBH = new Bloodhound({
                    name: "decregion",
                    datumTokenizer: function (d) {
                        return Bloodhound.tokenizers.whitespace(d.name);
                    },
                    queryTokenizer: Bloodhound.tokenizers.whitespace,
                    local: decregionSearch,
                    limit: 10
                });
                var geonamesBH = new Bloodhound({
                        name: "GeoNames",
                        datumTokenizer: function (d) {
                            return Bloodhound.tokenizers.whitespace(d.name);
                        },
                        queryTokenizer: Bloodhound.tokenizers.whitespace,
                        remote: {
                            url: "http://api.geonames.org/searchJSON?username=bootleaf&featureClass=P&maxRows=5&countryCode=US&name_startsWith=%QUERY",
                            filter: function (data) {
                                return $.map(data.geonames, function (result) {
                                    return {
                                        name: result.name + ", " + result.adminCode1,
                                        lat: result.lat,
                                        lng: result.lng,
                                        source: "GeoNames"
                                    };
                                });
                            },
                            ajax: {
                                beforeSend: function (jqXhr, settings) {
                                    settings.url += "&east=-71&west=-80&north=45&south=40";
                                    $("#searchicon").removeClass("fa-search").addClass("fa-refresh fa-spin");
                                },
                                complete: function (jqXHR, status) {
                                    $('#searchicon').removeClass("fa-refresh fa-spin").addClass("fa-search");
                                }
                            }
                        },
                        limit: 10
                    });


                huc8BH.initialize();
                decregionBH.initialize();
                clim_divBH.initialize();
                geonamesBH.initialize();

                // instantiate the typeahead UI
                $("#searchbox").typeahead({
                    minLength: 3,
                    highlight: true,
                    hint: false
                },  {
                    name: "huc8",
                    displayKey: "name",
                    source: huc8BH.ttAdapter(),
                    templates: {
                        header: "<h4 class='typeahead-header'>Watershed</h4>"
                    }
                }, {
                    name: "clim_div",
                    displayKey: "name",
                    source: clim_divBH.ttAdapter(),
                    templates: {
                        header: "<h4 class='typeahead-header'>Climate Division</h4>"
                    }
                }, {
                    name: "decregion",
                    displayKey: "name",
                    source: decregionBH.ttAdapter(),
                    templates: {
                        header: "<h4 class='typeahead-header'>DEC Region</h4>"
                    }
                }, {
                    name: "GeoNames",
                    displayKey: "name",
                    source: geonamesBH.ttAdapter(),
                    templates: {
                        header: "<h4 class='typeahead-header'><img src='assets/img/globe.png' width='25' height='25'>&nbsp;GeoNames</h4>"
                    }
                }).on("typeahead:selected", function (obj, datum) {
                    if (datum.source === "place") {
                        map.setView([datum.lat, datum.lng], 15);
                    };
                    if (datum.source === "huc8") {
                        map.setView([datum.lat, datum.lng], 15);
                    };
                     if (datum.source === "clim_div") {
                        map.setView([datum.lat, datum.lng], 17);
                    };
                   if (datum.source === "decregion") {
                        if (!map.hasLayer(decregion)) {
                            map.addLayer(decregion);
                        };
                        map.setView([datum.lat, datum.lng], 15);
                        if (map._layers[datum.id]) {
                            map._layers[datum.id].fire("click");
                        };
                    };
                    if (datum.source === "GeoNames") {
                        map.setView([datum.lat, datum.lng], 14);
                    };
                    if ($(".navbar-collapse").height() > 50) {
                        $(".navbar-collapse").collapse("hide");
                    };
                }).on("typeahead:opened", function () {
                    $(".navbar-collapse.in").css("max-height", $(document).height() - $(".navbar-header").height());
                    $(".navbar-collapse.in").css("height", $(document).height() - $(".navbar-header").height());
                }).on("typeahead:closed", function () {
                    $(".navbar-collapse.in").css("max-height", "");
                    $(".navbar-collapse.in").css("height", "");
                });
                $(".twitter-typeahead").css("position", "static");
                $(".twitter-typeahead").css("display", "block");
            });


 
 
        
}

function setupGeoJSONOverlays() {
//GeoJSON Overlays
var decregion = new L.GeoJSON(null, {
    style: {
                clickable: false,
                weight: 3,
                color: 'green',
                opacity: 1,
                fill: true,
                fillOpacity: 0

    },

    onEachFeature: function (feature, layer) {
        

        if (feature.properties) {
            
            layer.bindPopup(
                "<strong>DEC&nbsp;" + feature.properties.name + "</strong> ",  {
                closeButton: false
            });
        }

        decregionSearch.push({
            name: layer.feature.properties.name,
            source: "decregion",
            id: L.stamp(layer),
            lat: layer.feature.geometry.coordinates[1],
            lng: layer.feature.geometry.coordinates[0]
        });

    }
});

$.getJSON("data/decregions.geojson", function (data) {
    decregion.addData(data);
});

var huc8 = new L.GeoJSON(null, {
    style: {
                clickable: false,
                weight: 2,
                color: 'orange',
                opacity: 1,
                fill: true,
                fillOpacity: 0

    },

    onEachFeature: function (feature, layer) {
        

        if (feature.properties) {
            
            layer.bindPopup(
                "<strong>" + feature.properties.name + "</strong> </br>HUC Code: " + feature.properties.huc8,  {
                closeButton: false
            });
        }
        huc8Search.push({
            name: layer.feature.properties.name,
            source: "huc8",
            id: L.stamp(layer),
            lat: layer.feature.geometry.coordinates[1],
            lng: layer.feature.geometry.coordinates[0]
        });

    }
});

$.getJSON("data/basin.geojson", function (data) {
    huc8.addData(data);
});

var clim_div = new L.GeoJSON(null, {
    style: {
                clickable: false,
                weight: 2,
                color: 'purple',
                opacity: 1,
                fill: true,
                fillOpacity: 0

    },

    onEachFeature: function (feature, layer) {
        

        if (feature.properties) {
            
            layer.bindPopup(
                "<strong>" + feature.properties.name + "</strong>" ,  {
                closeButton: false
            });
        }

        clim_divSearch.push({
            name: layer.feature.properties.name,
            source: "clim_div",
            id: L.stamp(layer),
            lat: layer.feature.geometry.coordinates[1],
            lng: layer.feature.geometry.coordinates[0]
        });

    }
});

$.getJSON("data/clim_div.geojson", function (data) {
    clim_div.addData(data);
});

var county = new L.GeoJSON(null, {
    style: {
                clickable: false,
                weight: 2,
                color: 'black',
                opacity: 1,
                fill: true,
                fillOpacity: 0,
                title: name +" County"

    },

    onEachFeature: function (feature, layer) {
        

        if (feature.properties) {
            
           var content =   feature.properties.countyname + " County";
            if (document.body.clientWidth <= 767) {
                layer.on({
                    click: function(e) {
                        $("#feature-title").html(feature.properties.name);
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
        }
        layer.on({
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
                county.resetStyle(e.target);
            }
        });

    }
});

$.getJSON("data/ny_counties_tiger.geojson", function (data) {
    county.addData(data);
});

// gage
var gage = new L.GeoJSON(null, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng,  {
            title: feature.properties.name,
            //circleradius
            radius: 3,
            //fill
            fillColor: "orange",
            fillOpacity: 0.8,
            //border
            color: "black",
            weight: 3,
            opacity: 1
            });
    },
    onEachFeature: function (feature, layer) {
        if (feature.properties) {
            layer.bindPopup("<b>" + feature.properties.name + "</b></br>Updated: " + feature.properties.time + " "+ feature.properties.date + "</br>Stage: " + feature.properties.stage + "</br><a href='" + feature.properties.url + "' target='_blank_'>Link</a>", {
               closeButton: false
            });
        }
/*        gagesearch.push({
            name: layer.feature.properties.NAME,
            source: "place",
            id: L.stamp(layer),
            lat: layer.feature.geometry.coordinates[1],
            lng: layer.feature.geometry.coordinates[0]
        });*/
    }
});

}

function putLayersOnMap() {
map = L.map("map", {
    zoom: 8,
    center: [43.92, -74.],minZoom: 6,
    maxZoom: 17,
    layers: [mapquestOSM ]

});
}

//Returns true if map setup is to be called
function doSetupMap() {
var mapElement = $("#map");
if(mapElement != null && mapElement.attr("page") != null) {
              return true;
}
         return false;
}


//Method to process county data
function processCountyData(data) {
	var features = data.features; //this is an array
	$.each(features, function(key, value){
		var countyfp = value.properties.countyfp;
		var coordinates = value.geometry.coordinates[0][0];
		//This should be an array of longitude, latitude points
		//Go through and find minX, maxX, minY, maxY
		var firstPoint = coordinates[0];
		var minX  = firstPoint[0];
		var maxX = minX;
		var minY = firstPoint[1];
		var maxY = minY;
		
		var len = coordinates.length;
		var i;
		for(i = 1; i < len; i++) {
			var point = coordinates[i];
			var x = point[0];
			var y = point[1];
			if(x < minX)
				minX = x;
			if(y < minY)
				minY = y;
			if(x > maxX)
				maxX = x;
			if(y > maxY )
				maxY = y;
		}
		
		//Now utilize this and put in the countyCoordinates
		//minX=min longitude, minY = min latitude
		countyCoordinates[countyfp] = {'minX':minX,'maxX':maxX,'minY':minY,'maxY':maxY};
	})

}

//Process bounding box info returned from click list json
function processBoundingBox(boundingBoxString) {
	var bboxCoords = {};
	//String is in format long1 lat1 long2 lat2
	//Split string into 
	var coords = $.trim(boundingBoxString).split(" ");
	if(coords.length == 4) {
		//There should be 4 here
		bboxCoords["minX"] = coords[0];
		bboxCoords["minY"] = coords[1];
		bboxCoords["maxX"] = coords[2];
		bboxCoords["maxY"] = coords[3];
	} else {
		//There is an error and we should return nothing
	}
	return bboxCoords;
}

//Setup map on doc ready
$(document).ready(function(){
//Set up MAP if a particular element is on the page
//Since everything in the assets folder appears to be loaded, even if not explicitly included
//this code should prevent home.js from being loaded when it is not needed
       if (doSetupMap()) 
       {
        setupMap();
  //setupGeoJSONOverlays();
  //Including this leads to an error about the map
  //Try putting the entire thing into the method and see what happens
  //putLayersOnMap();
      }
});

