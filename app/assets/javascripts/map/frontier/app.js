var map;

/* Trigger Events */
// removed all - didn't see any added functionality with these?



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


/* Layer List for Sidebar */
function layerToggle(val) {  
  //var url= "assets/js/" + val + ".js";
  console.log(window[val]);
  if(document.getElementById(val + "_toggle").checked) { 
    //$.getScript("assets/js/" + val + "Load.js");
    map.addLayer(window[val]);
  } else {
    map.removeLayer(window[val]);
  }
}


/* Builds Sidebar Legend and Layer Toggle */
function getGISdata(e){
    bounds = map.getBounds();
    center = map.getCenter();

    //url = "/proxy/data?q=data&querytype=GISdataREST2json&lat1=" + bounds.getSouthWest().lat + "&lon1=" + bounds.getSouthWest().lng + "&lat2=" + bounds.getNorthEast().lat + "&lon2=" + bounds.getNorthEast().lng + "&midlon=" + center.lng + "&midlat=" + center.lat;
    url = '/proxy/data?q=data&querytype=GISdataREST2json&lat1=39.67337039176558&lon1=-85.93505859374999&lat2=45.767522962149876&lon2=-65.58837890625&midlon=-75.77004050000001&midlat=42.788207687920305'
    
    $.getJSON(url, function (data) {
        $("#map-selected-layers").empty();
        $.each(data, function( index, value ) {

          var content = ""
          + "<div class='panel panel-default toc-layer' id='" + value.tablename + "_layer' sector='" + value.sectors + "_sector' style='opacity:" + value.opacity + ";' >"
            + "<div class='collapse-toggle panel-heading' data-target='#map-layer-" + value.tablename + "' data-toggle='collapse'>"
              
                + "<input type='checkbox' name='overlayLayers'  id='" + value.tablename + "_toggle' data-toggle='tooltip' data-placement='top' title='Add to  map' onclick=layerToggle('" + value.tablename + "')>"
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
                      + "<p>&nbsp;</p><img src='/" + value.img_path + "'>"
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
        
          + "<script>$('#" + value.tablename + "_toggle').one('click',function(){$.getScript('/assets/map/frontier/" + value.tablename + "Load.js');});</script>";

          $("#map-selected-layers").append(content);
          
        })
    });
}


function getTransparency(e){
    bounds = map.getBounds();
    center = map.getCenter();
    
    //url = "/proxy/data?q=data&querytype=GISdataTransparencyREST2json&lat1=" + bounds.getSouthWest().lat + "&lon1=" + bounds.getSouthWest().lng + "&lat2=" + bounds.getNorthEast().lat + "&lon2=" + bounds.getNorthEast().lng + "&midlon=" + center.lng + "&midlat=" + center.lat;

    url = "/proxy/data?q=data&querytype=GISdataTransparencyREST2json&lat1=39.67337039176558&lon1=-85.93505859374999&lat2=45.767522962149876&lon2=-65.58837890625&midlon=-75.77004050000001&midlat=42.788207687920305";

    $.getJSON(url, function (data) {
        $.each(data, function( index, value ) {
            $('#' + value.tablename + '_layer').css('opacity',value.opacity)
        })
    });
}


var popup = L.popup();


// update GIS data list whenever the map is redrawn:
map.on('moveend', getTransparency);
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



var baseLayers = {
  "Grayscale" : OpenStreetMap_BlackAndWhite,
  "Street Map": MapQuestOSM,
  "Topography": Esri_WorldTopoMap,
  "Satellite": Esri_WorldImagery,
  "Satellitte with Streets": mapquestHYB
};


L.control.layers(baseLayers).addTo(map);



