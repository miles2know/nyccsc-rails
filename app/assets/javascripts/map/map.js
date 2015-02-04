

function Map (baseLayers) {

  this.baseLayers = baseLayers;

  
  this.initObjects = function() {
    //this variable is setup in _document_list.html
    if(typeof docs != "undefined") {
        this.docs = docs;
    } else {
        this.docs = {};
    }
    this.bBoxs = new L.LayerGroup([]); 
    //this contains the maximum boudning box that will cover all the results
    this.mapBbox = [];

    /* initialize map */
    this.map = L.map("map", {
      layers: [OpenStreetMap_DE],
      center:[43.1393, -76],
      zoom: 6,
      minZoom: 5,
      maxZoom: 15,
      zoomControl: false,
      attributionControl: false
    });
    
    //this.documentItems = $("div.document[docCounter]");
  };
  this.setupMap = function(){

    //add baseLayers to map
    L.control.layers(this.baseLayers).addTo(this.map);

    //add zoom control to map
    var zoomControl = L.control.zoom({
      position: "topleft"
    }).addTo(this.map);

    //add my location control to map
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
        outsideMapBoundsMsg: "You appear to be located outside the boundaries of the map"
      },
      locateOptions: {
        maxZoom: 18,
        watch: true,
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 10000
      }
    }).addTo(this.map);

      //base bbox/zoom/pan level on search results
      // mapResults.calculateMaximumBoundingBox();
      //   if(mapResults.mapBbox.length > 0) {
      //       mapResults.map.fitBounds(mapResults.mapBbox);
      // }
      //add context layers and radio toggle 

  };
 
};

//load map when page loads
$(document).ready(function() {

  if ( $('#map') != null ) {
    console.log('#map is not null');
    var thisMap = new Map(baseLayers);
    thisMap ? (thisMap.initObjects(), thisMap.setupMap()) : console.log('error loading map');
    
    //var myMap = new mapResults.onLoad();
  }

  $('#map-container').sticky({
      topSpacing: 0, // Space between element and top of the viewport
      zIndex: 100, // z-index
      stopper: "footer" // Id, class, or number value
  });
  $('#search-params').sticky({
      topSpacing: 0, // Space between element and top of the viewport
      zIndex: 100, // z-index
      stopper: "footer" // Id, class, or number value
  });
    
});
