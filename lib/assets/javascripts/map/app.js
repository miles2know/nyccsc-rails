// Map Configuration 
var map = L.map("map", {
  layers: [topoESRI],
  zoomControl: false,
  attributionControl: false
});
var popup = L.popup();


//DOM elements/components
var full_extent_btn=$("#full-extent-btn");
var nav_btn=$("#nav-btn"); 
var sidebar_toggle_btn=$("#sidebar-btn"); 
var sidebar_hide_btn=$("#sidebar-hide-btn"); 
var typeahead_search=$("#searchbox"); 
var sidebar = $("#sidebar");
var gisdata = $("#gisdata");
var navbarcollapse = $(".navbar-collapse");
var twitter_typeahead=$(".twitter-typeahead");
var attribution=$("#attribution");
var loading=$("#loading");
var searchicon=$("#searchicon");

//Binding listeners
full_extent_btn.click(function() {
  map.fitBounds(ny_county.getBounds());
  return false;
});
nav_btn.click(function() {
  navbarcollapse.collapse("toggle");
  return false;
});
sidebar_toggle_btn.click(function() {
  sidebar.toggle();
  map.invalidateSize();
  return false;
});
sidebar_hide_btn.click(function() {
  sidebar.hide();
  map.invalidateSize();
});
typeahead_search.click(function () {
  $(this).select();
});


//Map bindings
map.whenReady(getGISdata);
map.on("layeradd", updateAttribution);
map.on("layerremove", updateAttribution);


//Map Functions
//toggle layers on and off 
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
    url = "/data/metadata.json";
    $.getJSON(url, function (data) {
        gisdata.empty();
        $.each(data, function(index, value) {
          //console.log(value.sectors)
          var content = "<div class='panel panel-default toc-layer' id='" + value.tablename + "_layer' sector='" + value.sectors + "_sector' style='opacity:" + value.opacity + ";' >"+
          "<div class='panel-heading layer-heading'>"+
          "<div class='row clearfix'><label>&nbsp;<input type='checkbox' name='overlayLayers'  id='" + value.tablename + "_toggle' data-toggle='tooltip' data-placement='top' title='Add to  map' onclick=layerToggle('" + value.tablename + "')>&nbsp;</label><a class='panel-title' data-toggle='collapse' href='#panel-element-" + value.tablename + "'>" + value.name + "</a></div></div><div id='panel-element-" + value.tablename + "' class='panel-collapse collapse '><div class='panel-body'><div class='row clearfix'><div class='tabbable' id='tabs-101109'><ul class='nav nav-tabs'><li class='active'><a href='#panel-legend-" + value.tablename + "' data-toggle='tab'>Legend</a></li><li><a href='#panel-info-" + value.tablename + "' data-toggle='tab'>Info</a></li></ul><div class='tab-content'> <div class='tab-pane active' id='panel-legend-" + value.tablename + "'><div id='tools-" + value.tablename + "'></div><br>&nbsp;<img src='" + value.img_path + "'></div> <div class='tab-pane'id='panel-info-" + value.tablename + "'> <br><p><strong>Source: </strong><a target='_blank_' href='" + value.url_source + "'>" + value.source + "</a></p><p><strong>Last Updated: </strong>" + value.last_updated + "</p><p><strong>Description:</strong> " + value.description + "</p><p><strong>Native format:</strong> " + value.native_format + " </p><p><a target='_blank_' class='btn btn-default' href='" + value.url_download + "'><strong>Download from Source</strong></a></p><p><a target='_blank_' class='btn btn-default' href='" + value.url_metadata + "'><strong>Metadata Link </strong></a></p></div></div></div></div></div></div><script>$('#" + value.tablename + "_toggle').one('click',function(){$.getScript('assets/js/load/" + value.tablename + ".js');});</script>";
          gisdata.append(content);          
        })
    });
}

//Map Controls
//Attribution
function updateAttribution(e) {
  $.each(map._layers, function(index, layer) {
    if (layer.getAttribution) {
      attribution.html((layer.getAttribution()));
    }
  });
}
var attributionControl = L.control({
  position: "bottomright"
});
attributionControl.onAdd = function (map) {
  var div = L.DomUtil.create("div", "leaflet-control-attribution");
  div.innerHTML = "<span class='hidden-xs'>Developed by <a href='http://frontierspatial.com'>frontierspatial.com</a> | </span><a href='#' target='_blank_' onclick='$(\"#attributionModal\").modal(\"show\"); return false;'>Attribution</a>";
  return div;
};
map.addControl(attributionControl);
//Zoom
var zoomControl = L.control.zoom({
  position: "topleft"
}).addTo(map);

//GPS enabled geolocation control set to follow the user's location */
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

//Layer Controls
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
  }
};
var layerControl = L.control.groupedLayers(baseLayers, groupedOverlays, {
  collapsed: isCollapsed
}).addTo(map);
L.control.scale().addTo(map);

//Typeahead search functionality
$(document).one("ajaxStop", function () {
  loading.hide();
  map.fitBounds(ny_county.getBounds());
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
          searchicon.removeClass("fa-search").addClass("fa-refresh fa-spin");
        },
        complete: function (jqXHR, status) {
          searchicon.removeClass("fa-refresh fa-spin").addClass("fa-search");
        }
      }
    },
    limit: 10
  });  
  geonamesBH.initialize();
  /* instantiate the typeahead UI */
  typeahead_search.typeahead({
    minLength: 3,
    highlight: true,
    hint: false
  }, {
    name: "GeoNames",
    displayKey: "name",
    source: geonamesBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/globe.png' width='25' height='25'>&nbsp;Place Names</h4>"
    }
  }).on("typeahead:selected", function (obj, datum) {
    if (datum.source === "GeoNames") {
      map.setView([datum.lat, datum.lng], 14);
    }
  });
  twitter_typeahead.css("position", "static");
  twitter_typeahead.css("display", "block");
});
