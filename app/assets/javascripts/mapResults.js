//This javascript is responsible for storing and displaying the bounding box of a particular 
//result on the screen when you hover over an individual result
//In addition, the code here will also set the bounding box of the map to be the results that are being viewed.
//Additionally, zooming in or zooming out will actually change the results that are being displayed to those
//that fit within the bounding box provided

var mapResults = {
    // Initial page setup
    onLoad: function() {
        this.initObjects();
        this.bindEventListeners();
        this.setupMap();
       
    },
    initObjects:function() {
    	//this variable is setup in _map.html.erb
    	if(docs) {
    		this.docs = docs;
    	} else {
    		//this is an error condition
    	}
    	this.bBoxs = new L.LayerGroup([]); 
    	//this contains the maximum boudning box that will cover all the results
    	this.mapBbox = [];
    	this.map = L.map('map').setView([0,0],1);
    	this.documentItems = $("div.document[docCounter]");
    },
    bindEventListeners:function() {
    	$("div.document[docCounter]").hover( function() {
    		
        		
        	
    			mapResults.showResultBoundingBox($(this));
    	}, function() {
    		mapResults.hideResultBoundingBox($(this));
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
    	      mapResults.bBoxs[i] = L.polygon([[doc.solr_sw_pt_0_d, doc.solr_sw_pt_1_d], [doc.solr_ne_pt_0_d, doc.solr_sw_pt_1_d], [doc.solr_ne_pt_0_d, doc.solr_ne_pt_1_d], [doc.solr_sw_pt_0_d, doc.solr_ne_pt_1_d]]);
    	      
    	      if (mapResults.mapBbox.length == 0){
    	        mapResults.mapBbox = [[doc.solr_sw_pt_0_d, doc.solr_sw_pt_1_d], [doc.solr_ne_pt_0_d, doc.solr_ne_pt_1_d]];
    	      }else{
    	        if (doc.solr_sw_pt_0_d < mapResults.mapBbox[0][0]){
    	        	mapResults.mapBbox[0][0] = doc.solr_sw_pt_0_d;
    	        }
    	        if (doc.solr_sw_pt_1_d < mapResults.mapBbox[0][1]){
    	        	mapResults.mapBbox[0][1] = doc.solr_sw_pt_1_d;
    	        }
    	        if (doc.solr_ne_pt_0_d > mapResults.mapBbox[1][0]){
    	        	mapResults.mapBbox[1][0] = doc.solr_ne_pt_0_d;
    	        }
    	        if (doc.solr_ne_pt_1_d > mapResults.mapBbox[1][1]){
    	        	mapResults.mapBbox[1][1] = doc.solr_ne_pt_1_d;
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
    	 
    	  
    	  var basemap = L.tileLayer('http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}.png', {
    	    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    	    maxZoom: 18
    	  }).addTo(mapResults.map);
    	  mapResults.calculateMaximumBoundingBox();
    	  if(mapResults.mapBbox.length > 0) {
    		  mapResults.map.fitBounds(mapResults.mapBbox);
    	  }
    	}
    
    	//Now limit map to the maximum bounding box
    	
};

$(document).ready(function() {
	if(mapResults.doLoad()) {
		mapResults.onLoad();
	}
});