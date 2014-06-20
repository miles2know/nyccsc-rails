
//Update this to whatever works on the server or find a way to configure this (i.e. URL is sent back from the server to client side)
var solrSearchUrl = "http://climate-dev.library.cornell.edu/test_proxy_controller/hello?q=";
var map, huc8Search=[], clim_divSearch=[], decregionSearch=[], countySearch=[];




var decregion = new L.GeoJSON(null, {
    style: {
                clickable: true,
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

$.getJSON("data/nyclimate/decregions.geojson", function (data) {
    decregion.addData(data);
});

var huc8 = new L.GeoJSON(null, {
    style: {
                clickable: true,
                weight: 2,
                color: 'orange',
                opacity: 1,
                fill: true,
                fillOpacity: 0.2

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

$.getJSON("data/nyclimate/basin.geojson", function (data) {
    huc8.addData(data);
});

var clim_div = new L.GeoJSON(null, {
    style: {
                clickable: true,
                weight: 2,
                color: 'purple',
                opacity: 1,
                fill: true,
                fillOpacity: 0.2

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

$.getJSON("data/nyclimate/clim_div.geojson", function (data) {
    clim_div.addData(data);
});

var county = new L.GeoJSON(null, {
    style: {
                clickable: true,
                weight: 2,
                color: 'black',
                opacity: 1,
                fill: true,
                fillOpacity: 0

    },

    onEachFeature: function (feature, layer) {
        

        if (feature.properties) {
        	var countyname= feature.properties.countyname;
        	var gnis = feature.properties.county_gnis;
        	var dec_region = feature.properties.dec_region;
        	
        	layer.on("click", 
        		function (event) {
        			var content =   "<table class='table table-striped table-bordered table-condensed'>"+
				    "<tr><th>County</th>" + 
				    "<td>" + countyname + " <br/> " + 
				    "GNIS: " + gnis + ", DEC:" + dec_region + 
				"</td></tr>";
				var searchUrl = solrSearchUrl + countyname;
				var lat = event.latlng.lat;
				var lng = event.latlng.lng;
				var latLngArray = [];
				latLngArray.push(lat);
				latLngArray.push(lng);
				$.ajax({
					dataType: "json",
					url: searchUrl,
					success: function(d) {
					    if(d.response && d.response.numFound) {
					    		var numFound = d.response.numFound;
					    		var docs = d.response.docs;
							content += "<tr><th>" + numFound + " Search Results</th><td><ul>";
							//Show few results with more results available as link
							var maxDisplayPopup = 4;
							var totalDisplay = (numFound <= maxDisplayPopup) ? numFound: maxDisplayPopup;
							var i;
							for(i = 0; i < totalDisplay; i++) {
								//need to check what to do if only one nameRaw, does it still return as array?
								content += "<li>" + docs[i].nameRaw[0] + "</li>";
							} 
							content += "</ul> <a href='#'>See full search results</a></td>";
							
							
					    } else {
							content += "<tr><td> No Search Results</td>";

					    }
						content+= "</table>";
				  		var popup = L.popup()
				      				.setLatLng(latLngArray)
				      				.setContent(content)
				      				.openOn(map);
					}
				});
       		});
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

$.getJSON("data/nyclimate/countyDEC.geojson", function (data) {
    county.addData(data);
});

var hudson = new L.GeoJSON(null, {
    style: {
                clickable: true,
                weight: 2,
                color: 'firebrick',
                opacity: 1,
                fill: true,
                fillOpacity: 0

    },

    onEachFeature: function (feature, layer) {
        

        if (feature.properties) {
            
           var content =   "<table class='table table-striped table-bordered table-condensed'>"+
                                "<tr><th>County</th><td>" + feature.properties.name_county + "</td></tr>"+
                                "<tr><th>Watershed</th><td>" + feature.properties.huc8 + "</td></tr>"+
                                "<tr><th>Climate Division</th><td>" + feature.properties.clim_div + "</td></tr>"+
                                "<tr><th>DEC Region</th><td>" + feature.properties.dec_region + "</td></tr>"+
                            "<table>";
            if (document.body.clientWidth <= 767) {
                layer.on({
                    click: function(e) {
                        $("#feature-title").html(feature.properties.name_county);
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
                hudson.resetStyle(e.target);
            }
        });

    }
});

$.getJSON("data/nyclimate/hudson.geojson", function (data) {
    hudson.addData(data);
});

/////topojson
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
/*
var citytown = new L.GeoJSON(null, {
    style: {
                clickable: true,
                weight: 2,
                color: 'black',
                opacity: 1,
                fill: false,
                fillOpacity: 0.2

    },

    onEachFeature: function (feature, layer) {
        

        if (feature.properties) {
            
            layer.bindPopup(
                "<strong>" + feature.properties.name_citytown + "</strong>" ,  {
                closeButton: false
            });
        }
    }
});

$.getJSON("data/nyclimate/cityTownTopo.07.json", function (data) {
    citytown.addData(data);
});*/


map = L.map("map", {
    zoom: 6,
    center: [43.92, -74.],minZoom: 6,
    maxZoom: 17,
    layers: [mapquestOSM, county ]

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
    "Hudson Join-GeoJSON": hudson,
    "Hudson Join-Geoserver": hudsonWMS

    
};

var layerControl = L.control.layers(baseLayers, overlays, {
    collapsed: isCollapsed
}).addTo(map);


L.control.locate().addTo(map);

var sidebar = L.control.sidebar("sidebar", {
    closeButton: true,
    position: "left"
}).addTo(map);

// Highlight search box text on click
            $("#searchbox").click(function () {
                $(this).select();
            });

            // Typeahead search functionality
         $(document).one("ajaxStop", function () {
            map.fitBounds(decregion.getBounds());
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

