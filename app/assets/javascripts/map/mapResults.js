//This javascript is responsible for storing and displaying the bounding box of a particular 
//result on the screen when you hover over an individual result
//In addition, the code here will also set the bounding box of the map to be the results that are being viewed.
//Additionally, zooming in or zooming out will actually change the results that are being displayed to those
//that fit within the bounding box provided

var mapResults = {
    // Initial page setup
    onLoad: function() {
        this.initObjects();
        this.setupMap();
        this.bindEventListeners();
    },
    initObjects:function() {
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
        
        this.documentItems = $("div.document[docCounter]");
    },
    bindEventListeners:function() {
        
        $("div.document[docCounter]").hover( function() {

            mapResults.showResultBoundingBox($(this));
          }, function() {
          
            mapResults.hideResultBoundingBox($(this));
        });

        // on click, refresh search
        mapResults.map.on('click', function(e) {
        
          //get any other search terms and/or facets
          var searchTerms = window.location.search;
          
          //setup url
          if (searchTerms) {
            if (searchTerms.indexOf("spatialsort") >= 1) {
              searchTerms = searchTerms.slice(0,searchTerms.indexOf("spatialsort")-1);
            } 
          } else {
            searchTerms = "?search_field=all_fields&q=*"
          }

          //get the latlng of click
          var spatialRef = e.latlng.toString();
          spatialRef = spatialRef.replace("(","").replace(")","").replace(" ", "").replace("LatLng", "spatialsort=");

          //window.location = window.location.protocol + "//" + window.location.host + "/catalog?search_field=all_fields&q=*&" + spatialRef;
          window.location = window.location.protocol + "//" + window.location.host + "/catalog" + searchTerms + "&" + spatialRef;

        });
        
    },
    calculateMaximumBoundingBox:function() {
        //is document_counter for ALL documents? i.e. not just the ones being displayed
        //so 2nd page might have 15 out of 300 and 1st might have 2 out of 300, etc.
          var numberDocs = mapResults.docs.length;
          var i;

            //Calculates map bounding box and creates layer bbox
          for(i = 0; i < numberDocs; i++) {
              var doc = mapResults.docs[i];
            if (doc.solr_bbox){

               solr_sw_pt = doc.solr_sw_pt[0].split(", ");
               solr_ne_pt = doc.solr_ne_pt[0].split(", ");

              //mapResults.bBoxs[i] = L.polygon([[sw lat, sw lng], [ne lat, sw lng], [ne lat, ne lng], [sw lat, ne lng]]);  
              mapResults.bBoxs[i] = L.polygon([[Number(solr_sw_pt[0]), Number(solr_sw_pt[1])], [Number(solr_ne_pt[0]), 
                Number(solr_sw_pt[1])], [Number(solr_ne_pt[0]), Number(solr_ne_pt[1])], [Number(solr_sw_pt[0]), Number(solr_ne_pt[1])]]);
              
              if (mapResults.mapBbox.length == 0){
                mapResults.mapBbox = [[Number(solr_sw_pt[0]), Number(solr_sw_pt[1])], [Number(solr_ne_pt[0]), Number(solr_ne_pt[1])]];
              }else{
                if (doc.solr_sw_pt_0_d < mapResults.mapBbox[0][0]){
                    mapResults.mapBbox[0][0] = Number(solr_sw_pt[0]);
                }
                if (doc.solr_sw_pt_1_d < mapResults.mapBbox[0][1]){
                    mapResults.mapBbox[0][1] = Number(solr_sw_pt[1]);
                }
                if (doc.solr_ne_pt_0_d > mapResults.mapBbox[1][0]){
                    mapResults.mapBbox[1][0] = Number(solr_ne_pt[0]);
                }
                if (doc.solr_ne_pt_1_d > mapResults.mapBbox[1][1]){
                    mapResults.mapBbox[1][1] = Number(solr_ne_pt[1]);
                }
              }
            
            }
          }
    },
    //display a boundingBox for a single result
    showResultBoundingBox:function(el) {
        if(el.attr("docCounter") != null) {
            var docCounter = el.attr("docCounter");
             if (mapResults.bBoxs[docCounter]){
                    mapResults.bBoxs[docCounter].addTo(mapResults.map);
             }
        }
    },
    hideResultBoundingBox:function(el) {
        for(i in mapResults.map._layers) {
            if(mapResults.map._layers[i]._path !== undefined && i !== 0) {
                try {
                    mapResults.map.removeLayer(mapResults.map._layers[i]);
                }
                catch(e) {
                    console.log("problem with " + e + mapResults.map._layers[i]);
                }
            }
        }
    },
    //include this method because of the way the assets directory seems to be included
    //even when a particular javascript is not referenced
    doLoad: function() {
        var mapDiv = $("#map");
        if (mapDiv != null && mapDiv.hasClass("mapResults")) {
            return true;
        }
        return false;
    },
    serialiseObject:function(obj) {
        var pairs = [];
        for (var prop in obj) {
            if (!obj.hasOwnProperty(prop)) {
                continue;
            }
            pairs.push(prop + '=' + obj[prop]);
        }
        return pairs.join('&');
    },
    setupMap:function(){
        //baseLayers
        var baseLayers = {
            "Grayscale" : OpenStreetMap_BlackAndWhite,
            "Street Map": MapQuestOSM,
            "Topography": Esri_WorldTopoMap,
            "Satellite": Esri_WorldImagery,
            "Satellitte with Streets": mapquestHYB
        };

        //add baseLayers to map
        L.control.layers(baseLayers).addTo(mapResults.map);

        //add zoom control to map
        var zoomControl = L.control.zoom({
          position: "topleft"
        }).addTo(mapResults.map);

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
            outsideMapBoundsMsg: "You seem located outside the boundaries of the map"
          },
          locateOptions: {
            maxZoom: 18,
            watch: true,
            enableHighAccuracy: true,
            maximumAge: 10000,
            timeout: 10000
          }
        }).addTo(mapResults.map);

        //base bbox/zoom/pan level on search results
        mapResults.calculateMaximumBoundingBox();
          if(mapResults.mapBbox.length > 0) {
              mapResults.map.fitBounds(mapResults.mapBbox);
        }
        //add context layers and radio toggle 

    }
        
};


//load map when page loads
$(document).ready(function() {
  if(mapResults.doLoad()) {
      mapResults.onLoad();
  } 

  $('#map-container').sticky({
      topSpacing: 10, // Space between element and top of the viewport
      zIndex: 100, // z-index
      stopper: "footer" // Id, class, or number value
  });
    
});

