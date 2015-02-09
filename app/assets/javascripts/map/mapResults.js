
var mapResults = {};

//extend base map for search purposes
var SearchMap = function() {
  Map.apply(this,arguments);
 //this variable is setup in _document_list.html
  if(typeof docs != "undefined") {
      this.docs = docs;
  } else {
      this.docs = {};
  }
  //what is this used for exactly?
  this.bBoxs = new L.LayerGroup([]); 
  //this contains the maximum boudning box that covers all results
  this.mapBbox = [];
};


SearchMap.prototype = new Map();
SearchMap.prototype.constructor = SearchMap;

showResultBoundingBox = function(map,el) {

  console.log(map);
  if(el.attr("docCounter") != null) {
    var docCounter = el.attr("docCounter");
    if (map.bBoxs[docCounter]){
      try {
        map.bBoxs[docCounter].addTo(map);
      } catch(e) {
        console.log("Error: " + e.message)
      }
    }
  }
};

hideResultBoundingBox = function(map,el) {
  for(i in map._layers) {
    if(map._layers[i]._path !== undefined && i !== 0) {
      try {
        map.removeLayer(map._layers[i]);
      }
      catch(e) {
        console.log("Error: " + e.message); // + this.map._layers[i]);
      }
    }
  }
};

SearchMap.prototype.bindEventListeners = function() {
  
  //hover over document/individual, and show bbox/georef on map      
  $("div.document[docCounter]").hover( function() {
      showResultBoundingBox(this,$(this));
    }, function() {
      hideResultBoundingBox(this,$(this));
  });
  
  //move map, and redo search results
  this.map.on('moveend', function(e) {

    if ($('input#map-search').is(':checked')) {
      
      //get any other search terms and/or facets
      var searchTerms = window.location.search;
      
      //setup url
      if (searchTerms) {
        if (searchTerms.indexOf("bbox") >= 1) {
          searchTerms = searchTerms.slice(0,searchTerms.indexOf("bbox")-1);
        } 
      } else {
        searchTerms = "?search_field=all_fields&q=*"
      }

      //get the latlng of click
      //var spatialRef = e.latlng.toString();
      //spatialRef = spatialRef.replace("(","").replace(")","").replace(" ", "").replace("LatLng", "spatialsort=");
      var spatialRef = "bbox=";
      var bounds = this.getBounds();
      //W S E N, i.e. bottom left and top right => x1,y1,x2,y2 => lon1, lat1, lon2, lat2
      var southWest = bounds.getSouthWest();
      var northEast = bounds.getNorthEast();
      spatialRef += southWest.lng + "," + southWest.lat + "," + northEast.lng + "," + northEast.lat;
      //window.location = window.location.protocol + "//" + window.location.host + "/catalog?search_field=all_fields&q=*&" + spatialRef;
      window.location = window.location.protocol + "//" + window.location.host + "/catalog" + searchTerms + "&" + spatialRef;

    }

  });
    
};

SearchMap.prototype.calculateMaximumBoundingBox = function() {
//is document_counter for ALL documents? i.e. not just the ones being displayed
//so 2nd page might have 15 out of 300 and 1st might have 2 out of 300, etc.
  var numberDocs = this.docs.length;

    //Calculates map bounding box and creates layer bbox
  for(var i = 0; i < numberDocs; i++) {
      var doc = this.docs[i];
    if (doc.solr_bbox){

       solr_sw_pt = doc.solr_sw_pt[0].split(", ");
       solr_ne_pt = doc.solr_ne_pt[0].split(", ");

      //this.bBoxs[i] = L.polygon([[sw lat, sw lng], [ne lat, sw lng], [ne lat, ne lng], [sw lat, ne lng]]);  
      this.bBoxs[i] = L.polygon([[Number(solr_sw_pt[0]), Number(solr_sw_pt[1])], [Number(solr_ne_pt[0]), 
        Number(solr_sw_pt[1])], [Number(solr_ne_pt[0]), Number(solr_ne_pt[1])], [Number(solr_sw_pt[0]), Number(solr_ne_pt[1])]]);
      
      if (this.mapBbox.length == 0){
        this.mapBbox = [[Number(solr_sw_pt[0]), Number(solr_sw_pt[1])], [Number(solr_ne_pt[0]), Number(solr_ne_pt[1])]];
      }else{
        if (doc.solr_sw_pt_0_d < this.mapBbox[0][0]){
            this.mapBbox[0][0] = Number(solr_sw_pt[0]);
        }
        if (doc.solr_sw_pt_1_d < this.mapBbox[0][1]){
            this.mapBbox[0][1] = Number(solr_sw_pt[1]);
        }
        if (doc.solr_ne_pt_0_d > this.mapBbox[1][0]){
            this.mapBbox[1][0] = Number(solr_ne_pt[0]);
        }
        if (doc.solr_ne_pt_1_d > this.mapBbox[1][1]){
            this.mapBbox[1][1] = Number(solr_ne_pt[1]);
        }
      }
    
    }
  }
};

//load map when page loads
$(document).ready(function() {

  if ( $('#map') != null ) {

    mapResults = new SearchMap(baseLayers);
    mapResults.init();
    mapResults.setup();
    mapResults.bindEventListeners();

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
