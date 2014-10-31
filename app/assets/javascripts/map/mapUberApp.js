/**
 * This is a hard-coded array that maps ids in a PostGres database to the URIs in the system.
 * Ideally, we should not have to hardcode or store this in this file, but we are doing so for now.
 */

/**
 * Actual Map code
 */
var map, bounds, center;


//preload custom/selected layers
function loadSelectedLayers() {
  
  var selected, content = "";

  //start with selected layers (bookmarks) returned by blacklight app
  $("#maps-selected span").each( function(index){

    //TODO: this will be handled differently moving forward
    //needs to be cleaned up and the sidebar should probably be built using ruby
    selected = $(this).attr("id");
    //build sidebar and load layers (hidden) 
    
    
    //Get the GIS layer info and pass in the callback function addSelectedLayer below
    getGISLayerInfo.makeGISMappingQuery(selected, index, addSelectedLayer);
            /*
    for (var i = 0; i < customLayers.length; i++) {
      layerProperties = customLayers[i];

      if (layerProperties["uri"] && layerProperties["uri"] == selected) {
        window[layerProperties["id"]] = addLayer(layerProperties);

        content = content + renderPanel(layerProperties);
      }

    }  */
  });
  

}

function addSelectedLayer(selected, index, layerProperties) {
	//We need a unique identifier for the layer that is NOT the URI as that does not appear
	//to work correctly, perhaps due to slashes?
	//TODO: find a better mechanism for the id - if possible, some version of the URI
	var id = "layer_" + index;
	
	layerProperties["id"] = id;
	window[id] = addLayer(layerProperties);
	content = renderPanel(layerProperties);
    $("#map-selected-layers").append(content);
}

/* initialize map */
map = L.map("map", {
  layers: [OpenStreetMap_BlackAndWhite],
  center:[43.1393, -76],
  zoom: 6,
  minZoom: 5,
  maxZoom: 15,
  zoomControl: false,
  attributionControl: false
});

function toggleRadioLayer(collection,layer) {

  var layersCollection = window[collection];
  // if (layer == 'all' && $('input#'+layer).is(':checkbox')) {
  //   $('input#'+layer+':checked').length) {
  //   console.log('checked all');
  // } else {
  //   console.log('checked all');
  // }
  for (var i = 0; i < layersCollection.length; i++) {
    layerProperties = layersCollection[i];

    if (layer === layerProperties.id) {
      map.addLayer(window[layer]);
    } else {  
      
      if (map.hasLayer(window[layerProperties.id])) {
        map.removeLayer(window[layerProperties.id]);
      }
      
    }

  } 
  
}

function toggleLayer(layer) {
  
  if ($('input#'+layer+':checked').length) {
    map.addLayer(window[layer]);
  } else {  
    map.removeLayer(window[layer]);
  }
}

//preload context layers
function loadContextLayers() {
  
  var layerProperties, content = "";
  
  for (var i = 0; i < contextLayers.length; i++) {
    layerProperties = contextLayers[i];
    //add layer
    window[layerProperties.id] = addLayer(layerProperties);
    //build ui to toggle layer on/off
    content = content + "<div class='radio'>"
      + "<label><input type='radio' name='contextLayers' id='" + layerProperties.id + "' onChange=toggleRadioLayer('contextLayers','" + layerProperties.id + "')>" + layerProperties.title + "</label>"
      + "</div>";

  }  

  $("#context-layers").append(content);

}

//preload custom/selected layers
function loadCustomLayers(layers) {
  //loop through session variable to build sidebar and load layers (hidden) 
  var customLayers = sessionLayers;
  var layerProperties;
  
  for (var i = 0; i < customLayers.length; i++) {
    layerProperties = customLayers[i];

    window[layerProperties["id"]] = addLayer(layerProperties);
    
  }  
  buildSidebar();

}

function createLegend(icon, hue, intervals) {

  var intervalsLength = intervals.length;
  var colors = colorbrewer[hue][intervalsLength];
  var cssClass = (icon == "Circle" ? "legend circle" : "legend");
  var range;

  var content = "<p>&nbsp;</p><table>"

  for (var i = 0; i < intervalsLength; i++) {

    if($.isArray(intervals[i])) {
      range = intervals[i][0] + " - " + intervals[i][1];
    } else {
      range = intervals[i];
    }

    content = content + "<tr>"
        + "<td><span class='" + cssClass + "' style='background-color:" + colors[i] + ";'></td>"
        + "<td>" + range + "</td>"
        + "</tr>"; 
  }
  content = content + "<tr><td><span class='" + cssClass + "' style='border:1px solid #ccc;background-color:#fff;'<td><td>N/A or No Data</td></tr>";
  content = content + "</table>";

  //console.log(content);
  return content;
}

function getColor(d, hue, intervals) {
  //references sets of colors from colorbrewer.js file downloaded from colorbrewer2.org 
  var intervalsLength = intervals.length;
  var colors = colorbrewer[hue][intervalsLength];
  var color = "#ffffff"; //baseline

  if (d != null && d != "") { 
    //console.log('first#:' + intervals[0] + 'last#'+intervals[intervalsLength]);
    if (intervals[0] < intervals[intervalsLength-1]) { //counting up
      //if (d >20){console.log(d);}
      for (var i = 0; i < intervalsLength; i++) {
        if($.isArray(intervals[i])) {
          color = (d >= intervals[i][0] && d <= intervals[i][1] ? colors[i] : color)
        } else {
          color = (d >= intervals[i] ? colors[i] : color); 
        } 
      }
    } else { //counting down
      for (var i = intervalsLength-1; i >= 0; i--) {
        //color = (d <= intervals[i] ? colors[i] : color); 
      }
    }
  } 
  return color;
}

/* Builds Sidebar Legend and Layer Toggle */
// right now this is getting metadata about the layers from two sources - a data file (sessionlayers) and this call to Steve's server
// should be combined, but need to decide what's being pulled from VIVO and what's being pulled from PostGres?
function buildSidebar(e){
    
    //figure out what options should be available based on bounding box
    bounds = map.getBounds();
    center = map.getCenter();

    url = "/proxy/data?q=data&querytype=GISdataREST2json&lat1=" + bounds.getSouthWest().lat + "&lon1=" + bounds.getSouthWest().lng + "&lat2=" + bounds.getNorthEast().lat + "&lon2=" + bounds.getNorthEast().lng + "&midlon=" + center.lng + "&midlat=" + center.lat;
    
    //loop through data returned by frontier spatial postgris?
    $.getJSON(url, function (data) {
        
        $("#map-selected-layers").empty();

        $.each(data, function( index, value ) {
          
          //find matching layer in data file
          var customLayers = sessionLayers;
          var legend; 

          for (var i = 0; i < customLayers.length; i++) {
            layerProperties = customLayers[i];
            
            if (layerProperties.id == value.tablename) {
              if (layerProperties.metaData.legend) {
                legend = "<p>&nbsp;</p><img src='/assets" + layerProperties.metaData.legend + "'>";
              } else if (layerProperties.type == "Color") {
                legend = createLegend(layerProperties.metaData.icon, layerProperties.metaData.colorHue, layerProperties.metaData.intervals);
              } else {
                legend = "<p>&nbsp;</p><i class='fa fa-map-marker fa-2x'></i>"
              }  
            }
            
          }  

          var content = ""
          + "<div class='panel panel-default toc-layer' id='" + value.tablename + "_layer' sector='" + value.sectors + "_sector' style='opacity:" + value.opacity + ";' >"
            + "<div class='collapse-toggle panel-heading' data-target='#map-layer-" + value.tablename + "' data-toggle='collapse'>"
              
                + "<input type='checkbox' name='overlayLayers'  id='" + value.tablename + "' onClick=toggleLayer('" + value.tablename + "')>"
                + "&nbsp;<a class='panel-title' data-toggle='collapse' href='#panel-element-" + value.tablename + "'>" + value.name + "</a>"
              
            + "</div>"
            + "<div id='panel-element-" + value.tablename + "' class='panel-collapse collapse in '>"
              + "<div class='panel-body'>"
                
                  + "<div class='tabbable'>"
                    + "<ul class='nav nav-tabs'>"
                      + "<li class='active'><a href='#panel-legend-" + value.tablename + "' data-toggle='tab'>Legend</a></li>"
                      + "<li><a href='#panel-info-" + value.tablename + "' data-toggle='tab'>Info</a></li>"
                    + "</ul>"
                    + "<div class='tab-content'>"
                    + "<div class='tab-pane active' id='panel-legend-" + value.tablename + "'>"
                      + legend
                    + "</div>"
                    + "<div class='tab-pane' id='panel-info-" + value.tablename + "'>"
                      + "<p>&nbsp;</p>"
                      + "<p><strong>Source: </strong><a target='_blank_' href='" + value.url_source + "'>" + value.source + "</a></p>"
                      + "<p><strong>Last Updated: </strong>" + value.last_updated + "</p>"
                      + "<p><strong>Description:</strong> " + value.description + "</p>"
                      + "<p><strong>Native format:</strong> " + value.native_format + " </p>"
                      + "<p><a target='_blank_' href='" + value.url_download + "'><i class='fa fa-download'></i> Download Data</a></p>"
                      + "<p><a target='_blank_' href='" + value.url_metadata + "'><i class='fa fa-file-o'></i> Metadata</a></p>"
                    + "</div>" //.tab-pane
                  + "</div>" //.tabbable
                
              + "</div>" //.panel-body
            + "</div>" //.panel-element
          + "</div>" //.panel
        
        
          $("#map-selected-layers").append(content);
          
        });
    });
}

function renderPanel(properties){
        
  var legend;
  var layerProperties = properties;


  if (layerProperties.metaData.legend) {
    legend = "<p>&nbsp;</p><img src='/assets" + layerProperties.metaData.legend + "'>";
  } else if (layerProperties.type == "Color") {
    legend = createLegend(layerProperties.metaData.icon, layerProperties.metaData.colorHue, layerProperties.metaData.intervals);
  } else {
    legend = "<p>&nbsp;</p><i class='fa fa-map-marker fa-2x'></i>"
  }  


  var content = ""
  + "<div class='panel panel-default toc-layer' id='" + layerProperties.id + "_layer'>"
    + "<div class='collapse-toggle panel-heading' data-target='#map-layer-" + layerProperties.id + "' data-toggle='collapse'>"
      
        + "<input type='checkbox' name='overlayLayers'  id='" + layerProperties.id + "' onClick=toggleLayer('" + layerProperties.id + "');>"
        + "&nbsp;<a class='panel-title' data-toggle='collapse' href='#panel-element-" + layerProperties.id + "'>" + layerProperties.title + "</a>"
      
    + "</div>"
    + "<div id='panel-element-" + layerProperties.id + "' class='panel-collapse collapse in '>"
      + "<div class='panel-body'>"
        
          + "<div class='tabbable'>"
            + "<ul class='nav nav-tabs'>"
              + "<li class='active'><a href='#panel-legend-" + layerProperties.id + "' data-toggle='tab'>Legend</a></li>"
              + "<li><a href='#panel-info-" + layerProperties.id + "' data-toggle='tab'>Info</a></li>"
            + "</ul>"
            + "<div class='tab-content'>"
            + "<div class='tab-pane active' id='panel-legend-" + layerProperties.id + "'>"
              + legend
            + "</div>"
            + "<div class='tab-pane' id='panel-info-" + layerProperties.id + "'>"
              + "<p>&nbsp;</p>"
              + "<p><strong>Source: </strong><a target='_blank_' href='#'>Insert Source</a></p>"
              + "<p><strong>Last Updated: </strong>Insert last_updated </p>"
              + "<p><strong>Description:</strong>Insert value.description </p>"
              + "<p><strong>Native format:</strong>Insert value.native_format </p>"
              + "<p><a target='_blank_' href='#'><i class='fa fa-download'></i> Download Data</a></p>"
              + "<p><a target='_blank_' href='#'><i class='fa fa-file-o'></i> Metadata</a></p>"
              + "</div>" //.tab-content
            + "</div>" //.tab-pane
          + "</div>" //.tabbable
          
          + "<p>Remove MapIt</p>"
      + "</div>" //.panel-body
    + "</div>" //#panel-element
  + "</div>" //.panel        
      
  return content;
}

//turns sidebar options on/off using transparency on panel
//could take this one step further and disable checkbox??
function getTransparency(e){
    bounds = map.getBounds();
    center = map.getCenter();
    
    url = "/proxy/data?q=data&querytype=GISdataTransparencyREST2json&lat1=" + bounds.getSouthWest().lat + "&lon1=" + bounds.getSouthWest().lng + "&lat2=" + bounds.getNorthEast().lat + "&lon2=" + bounds.getNorthEast().lng + "&midlon=" + center.lng + "&midlat=" + center.lat;
    //url = "/proxy/data?q=data&querytype=GISdataTransparencyREST2json&lat1=39.67337039176558&lon1=-85.93505859374999&lat2=45.767522962149876&lon2=-65.58837890625&midlon=-75.77004050000001&midlat=42.788207687920305";

    $.getJSON(url, function (data) {
        $.each(data, function( index, value ) {
            $('#' + value.tablename + '_layer').css('opacity',value.opacity)
        })
    });
}


//This is a built-in map to things with ids


var popup = L.popup();


function loadLayers () {
  loadContextLayers();
  loadSelectedLayers();
  getTransparency();
}

map.on('moveend', getTransparency);
map.whenReady(loadLayers);

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
  div.innerHTML = "<span class='hidden-xs'>Developed by <a href='http://frontierspatial.com'>frontierspatial.com</a> | </span><a href='#' target='_blank_' onClick='$(\"#attributionModal\").modal(\"show\"); return false;'>Attribution</a>";
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



var baseLayers = {
  "Grayscale" : OpenStreetMap_BlackAndWhite,
  "Street Map": MapQuestOSM,
  "Topography": Esri_WorldTopoMap,
  "Satellite": Esri_WorldImagery,
  "Satellitte with Streets": mapquestHYB
};


L.control.layers(baseLayers).addTo(map);



