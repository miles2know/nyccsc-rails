var map;

//Set up dummy layers for web services so that leaflet can keep track when the layers are clicked and the actual data is loaded
/*var nfhl = new L.GeoJSON(null,{});
var railroad = new L.GeoJSON(null,{});
var aadt = new L.GeoJSON(null,{});
var trout_streams = new L.GeoJSON(null,{});*/

//use jquery to control what happens on various click events
$(document).on("click", ".feature-row", function(e) {
  sidebarClick(parseInt($(this).attr('id')));
});

$("#about-btn").click(function() {
  $("#aboutModal").modal("show");
  return false;
});

$("#full-extent-btn").click(function() {
  map.fitBounds(ny_county.getBounds());
  return false;
});

$("#legend-btn").click(function() {
  $("#legendModal").modal("show");
  return false;
});

$("#login-btn").click(function() {
  $("#loginModal").modal("show");
  return false;
});

$("#list-btn").click(function() {
  $('#sidebar').toggle();
  map.invalidateSize();
  return false;
});

$("#doclist-btn").click(function() {
  $("#bottomrow").toggle(function() {
    $('#toprow').css('height', '100%');
    map.invalidateSize();
    return false;
    
    //$('#bottomrow').addClass("active");

    
  }, function() {
    $('#toprow').css('height', '50%');
    map.invalidateSize();
    return false;
    

  }
  );

});

$("#bottomrow-toggle-btn").click(function() {
  $("#bottomrow").toggle(function() {
    $('#bottomrow').addClass("active");
    $('#toprow').addClass("active");
  }, function() {
    $('#bottomrow').removeClass("active");
    $('#toprow').removeClass("active");
  }
  )
  map.invalidateSize();
  return false;
});

$("#nav-btn").click(function() {
  $(".navbar-collapse").collapse("toggle");
  return false;
});

$("#sidebar-toggle-btn").click(function() {
  $("#sidebar").toggle();
  map.invalidateSize();
  return false;
});

$("#sidebar-hide-btn").click(function() {
  $('#sidebar').hide();
  map.invalidateSize();
});



$("#bottomrow-hide-btn").click(function() {
  $('#bottomrow').hide();
  $('#toprow').css('height', '100%')
  //$('#bottomrow').css('height', '0%')
  map.invalidateSize();
  return false;

});

function sidebarClick(id) {
/*  map.addLayer(theaterLayer).addLayer(museumLayer);
  var layer = markerClusters.getLayer(id);
  markerClusters.zoomToShowLayer(layer, function() {
    map.setView([layer.getLatLng().lat, layer.getLatLng().lng], 17);
    layer.fire("click");
  });*/
  /* Hide sidebar and go to the map on small screens */
  if (document.body.clientWidth <= 767) {
    $("#sidebar").hide();
    map.invalidateSize();
  }
}



/* Overlay Layers */

map = L.map("map", {
  /*zoom: 10,
  center: [40.702222, -73.979378],*/
  layers: [topoESRI],
  zoomControl: false,
  attributionControl: false
});




/* function to toggle layers on and off */
function layerToggle(val) {  
    if(document.getElementById(val + "_toggle").checked)
      { map.addLayer(window[val]); }
    else  map.removeLayer(window[val]);
};

//filter layers by sector
function tocFilter(value) {
  $('.toc-layer').hide();
  $('.toc-layer[sector*="' + value + '"]').show();
};

//loads the information to construct the sidebar TOC
function getGISdata(e){
    bounds = map.getBounds();
    center = map.getCenter();
/*    url = "data/GISdataREST2json.php?lat1=" + bounds.getSouthWest().lat + "&lon1=" + bounds.getSouthWest().lng + "&lat2=" + bounds.getNorthEast().lat + "&lon2=" + bounds.getNorthEast().lng + "&midlon=" + center.lng + "&midlat=" + center.lat;*/
    url = "data/metadata.json";
    
    $.getJSON(url, function (data) {
        $("#gisdata").empty();
        $.each(data, function( index, value ) {
          //console.log(value.sectors)
          var content = "<div class='panel panel-default toc-layer' id='" + value.tablename + "_layer' sector='" + value.sectors + "_sector' style='opacity:" + value.opacity + ";' ><div class='panel-heading layer-heading'><div class='row clearfix'><label>&nbsp;<input type='checkbox' name='overlayLayers'  id='" + value.tablename + "_toggle' data-toggle='tooltip' data-placement='top' title='Add to  map' onclick=layerToggle('" + value.tablename + "')>&nbsp;</label><a class='panel-title' data-toggle='collapse' href='#panel-element-" + value.tablename + "'>" + value.name + "</a></div></div><div id='panel-element-" + value.tablename + "' class='panel-collapse collapse '><div class='panel-body'><div class='row clearfix'><div class='tabbable' id='tabs-101109'><ul class='nav nav-tabs'><li class='active'><a href='#panel-legend-" + value.tablename + "' data-toggle='tab'>Legend</a></li><li><a href='#panel-info-" + value.tablename + "' data-toggle='tab'>Info</a></li></ul><div class='tab-content'> <div class='tab-pane active' id='panel-legend-" + value.tablename + "'><div id='tools-" + value.tablename + "'></div><br>&nbsp;<img src='" + value.img_path + "'></div> <div class='tab-pane'id='panel-info-" + value.tablename + "'> <br><p><strong>Source: </strong><a target='_blank_' href='" + value.url_source + "'>" + value.source + "</a></p><p><strong>Last Updated: </strong>" + value.last_updated + "</p><p><strong>Description:</strong> " + value.description + "</p><p><strong>Native format:</strong> " + value.native_format + " </p><p><a target='_blank_' class='btn btn-default' href='" + value.url_download + "'><strong>Download from Source</strong></a></p><p><a target='_blank_' class='btn btn-default' href='" + value.url_metadata + "'><strong>Metadata Link </strong></a></p></div></div></div></div></div></div><script>$('#" + value.tablename + "_toggle').one('click',function(){$.getScript('assets/js/load/" + value.tablename + ".js');});</script>";

          $("#gisdata").append(content);
          
        })
    });
}

//makes TOC entries transparent when no features in map view
function getTransparency(e){
    bounds = map.getBounds();
    center = map.getCenter();
    url = "data/GISdataTransparencyREST2json.php?lat1=" + bounds.getSouthWest().lat + "&lon1=" + bounds.getSouthWest().lng + "&lat2=" + bounds.getNorthEast().lat + "&lon2=" + bounds.getNorthEast().lng + "&midlon=" + center.lng + "&midlat=" + center.lat;

    $.getJSON(url, function (data) {
        $.each(data, function( index, value ) {
            $('#' + value.tablename + '_layer').css('opacity',value.opacity)
        })
    });
}


var popup = L.popup();


// update GIS data list whenever the map is redrawn:
//map.on('moveend', getTransparency);
map.whenReady(getGISdata);

/* Attribution control */
function updateAttribution(e) {
  $.each(map._layers, function(index, layer) {
    if (layer.getAttribution) {
      $("#attribution").html((layer.getAttribution()));
    }
  });
}
map.on("layeradd", updateAttribution);
map.on("layerremove", updateAttribution);

var attributionControl = L.control({
  position: "bottomright"
});
attributionControl.onAdd = function (map) {
  var div = L.DomUtil.create("div", "leaflet-control-attribution");
  div.innerHTML = "<span class='hidden-xs'>Developed by <a href='http://frontierspatial.com'>frontierspatial.com</a> | </span><a href='#' target='_blank_' onclick='$(\"#attributionModal\").modal(\"show\"); return false;'>Attribution</a>";
  return div;
};
map.addControl(attributionControl);

var zoomControl = L.control.zoom({
  position: "topleft"
}).addTo(map);

/* GPS enabled geolocation control set to follow the user's location */
var locateControl = L.control.locate({
  position: "bottomright",
  drawCircle: true,
  follow: true,
  setView: true,
  keepCurrentZoomLevel: true,
  markerStyle: {
    weight: 1,
    opacity: 0.8,
    fillOpacity: 0.8
  },
  circleStyle: {
    weight: 1,
    clickable: false
  },
  icon: "icon-direction",
  metric: false,
  strings: {
    title: "My location",
    popup: "You are within {distance} {unit} from this point",
    outsideMapBoundsMsg: "You seem located outside the boundaries of the map"
  },
  locateOptions: {
    maxZoom: 18,
    watch: true,
    enableHighAccuracy: true,
    maximumAge: 10000,
    timeout: 10000
  }
}).addTo(map);

/* Larger screens get expanded layer control and visible sidebar */
if (document.body.clientWidth <= 767) {
  var isCollapsed = true;
} else {
  var isCollapsed = false;
}

var baseLayers = {
  "Terrain": topoESRI,
  "Street Map": mapquestOSM,
  "Imagery": mapquestHYB
};

var groupedOverlays = {
  "Boundaries": {
    "Counties": ny_county,
    "DOT Regions": ny_dot,
    "DEC Regions": ny_dec,
    "Climate Divisions": ny_clim_div
  }/*,
  "Reference": {
    "Boroughs": boroughs,
    "Subway Lines": subwayLines
  }*/
};

var layerControl = L.control.groupedLayers(baseLayers, groupedOverlays, {
  collapsed: isCollapsed
}).addTo(map);

L.control.scale().addTo(map);

/* Highlight search box text on click */
$("#searchbox").click(function () {
  $(this).select();
});

/* Typeahead search functionality */
$(document).one("ajaxStop", function () {
  $("#loading").hide();
  /* Fit map to boroughs bounds */
  map.fitBounds(ny_county.getBounds());
/*  featureList = new List("features", {valueNames: ["feature-name"]});
  featureList.sort("feature-name", {order:"asc"});*/

  var ny_countyBH = new Bloodhound({
    name: "ny_county",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: ny_countySearch,
    limit: 10
  });

  var ny_dotBH = new Bloodhound({
    name: "ny_dot",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: ny_dotSearch,
    limit: 10
  });

  var ny_decBH = new Bloodhound({
    name: "ny_dec",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: ny_decSearch,
    limit: 10
  });

  var ny_clim_divBH = new Bloodhound({
    name: "ny_clim_div",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: ny_clim_divSearch,
    limit: 10
  });

  var geonamesBH = new Bloodhound({
    name: "GeoNames",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    remote: {
      url: "http://api.geonames.org/searchJSON?username=frontierspatial&featureClass=P&maxRows=5&country=US&adminCode1=NY&name_startsWith=%QUERY",
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
  
  ny_countyBH.initialize();
  ny_dotBH.initialize();
  ny_decBH.initialize();
  ny_clim_divBH.initialize();
  geonamesBH.initialize();

  /* instantiate the typeahead UI */
  $("#searchbox").typeahead({
    minLength: 3,
    highlight: true,
    hint: false
  }, {
    name: "ny_county",
    displayKey: "name",
    source: ny_countyBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'>Counties</h4>"
    }
  }, {
    name: "ny_dot",
    displayKey: "name",
    source: ny_dotBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'>DOT Regions</h4>"
    }
  }, {
    name: "ny_dec",
    displayKey: "name",
    source: ny_decBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'>DEC Regions</h4>"
    }
  }, {
    name: "ny_clim_div",
    displayKey: "name",
    source: ny_clim_divBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'>Climate Divisions</h4>"
    }
  }, {
    name: "GeoNames",
    displayKey: "name",
    source: geonamesBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/globe.png' width='25' height='25'>&nbsp;Place Names</h4>"
    }
  }).on("typeahead:selected", function (obj, datum) {
    if (datum.source === "ny_county") {
      if (!map.hasLayer(ny_county)) {
        map.addLayer(ny_county);
      }
      map.fitBounds(datum.bounds);    
    }

    if (datum.source === "ny_dot") {
      if (!map.hasLayer(ny_dot)) {
        map.addLayer(ny_dot);
      }
      map.fitBounds(datum.bounds);
    }

    if (datum.source === "ny_dec") {
      if (!map.hasLayer(ny_dec)) {
        map.addLayer(ny_dec);
      }
      map.fitBounds(datum.bounds);
    }

    if (datum.source === "ny_clim_div") {
      if (!map.hasLayer(ny_clim_div)) {
        map.addLayer(ny_clim_div);
      }
      map.fitBounds(datum.bounds);
    }

    if (datum.source === "GeoNames") {
      map.setView([datum.lat, datum.lng], 14);
    }
    if ($(".navbar-collapse").height() > 50) {
      $(".navbar-collapse").collapse("hide");
    }
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
