//This javascript is responsible for storing and displaying the bounding box of a particular 
//result on the screen when you hover over an individual result
//In addition, the code here will also set the bounding box of the map to be the results that are being viewed.
//Additionally, zooming in or zooming out will actually change the results that are being displayed to those
//that fit within the bounding box provided


// got errors with this, but this might be obsolete if everything is based on collapsible panels instead
// Larger screens get expanded layer control
// if (document.body.clientWidth <= 768) {
//     var isCollapsed = true
// } else {
//     var isCollapsed = false
// };


var mapResults = {
    // Initial page setup
    onLoad: function() {
        this.initializeMap();
        //this.setupMap();
        this.bindEventListeners();
        
    },
    initializeMap:function() {
    	
    	//this contains the maximum boudning box that will cover all the results
    	this.map = L.map('map').setView([43.1393, -76], 7);
        
        //base Layers
        //mapquest topagraphical
        var mapquestOSM = L.tileLayer("http://{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png", {
            maxZoom: 19,
            subdomains: ["otile1", "otile2", "otile3", "otile4"],
            attribution: 'Tiles courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">. Map data (c) <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> contributors, CC-BY-SA.'
        });

        //mapquest sattelite or imagery with labels
        var mapquestHYB = L.layerGroup([L.tileLayer("http://{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg", {
            maxZoom: 19,
            subdomains: ["oatile1", "oatile2", "oatile3", "oatile4"]

        }), L.tileLayer("http://{s}.mqcdn.com/tiles/1.0.0/hyb/{z}/{x}/{y}.png", {
            maxZoom: 19,
            subdomains: ["oatile1", "oatile2", "oatile3", "oatile4"],
            attribution: 'Tiles and labels courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">. Map data (c) <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> contributors. '
        })]);


        //TODO: verify that these are the best layers to use... I've seen modern looking maps that contains less detail, but are easier to read data
        var baseLayers = {
            "Terrain": mapquestOSM,
            "Satellite": mapquestHYB
        };


        // region layers for context
        // var regionLayers = {
        //     "Counties":addGeoJsonLayer("polygon", "data/ny_counties_tiger.geojson", "County"),
        //     "Watersheds": addGeoJsonLayer("polygon", "data/basin.geojson", "Watershed"),
        //     "DEC Regions": addGeoJsonLayer("polygon", "data/decregions.geojson", " DEC"),
        //     "Climate Regions": addGeoJsonLayer("polygon", "data/clim_div.geojson", "Climate")//,
        //     //"USGS Stream Gauges": gauge
        // };

        // using Leaflet Plugin L.groupedlayercontrol to allow subgroups of controls 
        // TODO: need to make these radio button options instead of checkboxes'
        // also decide what layers for context to display
        // also change data sources to solr documents
        var groupedOverlays = {
            "Reference": {
                "Counties": addGeoJsonArea("data/ny_counties_tiger.geojson", "County"),
                "Watersheds": addGeoJsonArea("data/basin.geojson", "Watershed"),
                "DEC Regions": addGeoJsonArea("data/decregions.geojson", "DEC Region"),
                "Climate Regions": addGeoJsonArea("data/clim_div.geojson", "Climate")//,
            },
            "Points of Interest": {
                //"USGS Streamflow Gauges": addGeoJsonMarker("data/streamGage.geojson", "Streamflow Gauge")//,
            }
        }
    	
        // add initial layer to map  
        mapResults.map.addLayer(mapquestOSM);

        // setting up initial map controls 
        //L.control.layers(baseLayers, regionLayers).addTo(mapResults.map);
        
        // setting up initial map controls using Leaflet Plugin L.groupedlayercontrol
        mapResults.LayersControl = L.control.groupedLayers(baseLayers, groupedOverlays).addTo(mapResults.map);

    },
    bindEventListeners:function() {

        mapResults.map.on('moveend dragend zoomend', function (e) { 

            var bounds = mapResults.map.getBounds();
            //NOT DONE:  change map data points based on change in map bounding box 
            //also need to pass this information to solr (along with other parameters to change search results)
            //hardcoded to a specific layer for now
            console.log('boundingBox change:: SW:' + bounds.getSouthWest() + 'NE:' + bounds.getNorthEast() ); 
            
            var url = "proxy/data?q=data&querytype=streamGage2geojson&" 
              + "lat1=" + bounds.getSouthWest().lat + "&lon1=" + bounds.getSouthWest().lng 
              + "&lat2=" + bounds.getNorthEast().lat + "&lon2=" + bounds.getNorthEast().lng;

            var layer = 'Streamflow Gauge';
            if (mapResults.map.hasLayer(layer)) {
                mapResults.map.removeLayer(layer)
            }    
            mapResults.map.addLayer(addGeoJsonMarker( url, 'Streamflow Gauge' ) );
        });

        //add new overlays to map - "map it!" functionality
        $('#new-overlay').on('click', function (e) {
            e.preventDefault();
            
            //mapResults.map.addLayer(addGeoJsonMarker( url, 'Streamflow Gauge' ) );
            var newLayer = addGeoJsonMarker('data/streamGage.geojson', 'Streamflow Gauge');
            mapResults.LayersControl.addOverlay(newLayer, 'Streamflow Gauges', 'Points of Interest');
            mapResults.map.addLayer(newLayer);

        });
    	
    },
    verifyReady: function() {
        var mapDiv = $("#map");
        if (mapDiv != null && mapDiv.hasClass("mapResults")) {
            return true;
        }
        return false;
        //error condition 
    }
        
    // NOT USED YET
    // refreshSearchResults:function() {
    //     getGages(); 

    // },
    // calculateMaximumBoundingBox:function() {
    // 	//is document_counter for ALL documents? i.e. not just the ones being displayed
    // 	//so 2nd page might have 15 out of 300 and 1st might have 2 out of 300, etc.
    // 	  var numberDocs = mapResults.docs.length;
    // 	  var i;
    // 	    //Calculates map bounding box and creates layer bbox
    // 	  for(i = 0; i < numberDocs; i++) {
    // 		  var doc = mapResults.docs[i];
    // 	    if (doc.solr_bbox){
    // 	      mapResults.bBoxs[i] = L.polygon([[doc.solr_sw_pt_0_d, doc.solr_sw_pt_1_d], [doc.solr_ne_pt_0_d, doc.solr_sw_pt_1_d], [doc.solr_ne_pt_0_d, doc.solr_ne_pt_1_d], [doc.solr_sw_pt_0_d, doc.solr_ne_pt_1_d]]);
    	      
    // 	      if (mapResults.mapBbox.length == 0){
    // 	        mapResults.mapBbox = [[doc.solr_sw_pt_0_d, doc.solr_sw_pt_1_d], [doc.solr_ne_pt_0_d, doc.solr_ne_pt_1_d]];
    // 	      }else{
    // 	        if (doc.solr_sw_pt_0_d < mapResults.mapBbox[0][0]){
    // 	        	mapResults.mapBbox[0][0] = doc.solr_sw_pt_0_d;
    // 	        }
    // 	        if (doc.solr_sw_pt_1_d < mapResults.mapBbox[0][1]){
    // 	        	mapResults.mapBbox[0][1] = doc.solr_sw_pt_1_d;
    // 	        }
    // 	        if (doc.solr_ne_pt_0_d > mapResults.mapBbox[1][0]){
    // 	        	mapResults.mapBbox[1][0] = doc.solr_ne_pt_0_d;
    // 	        }
    // 	        if (doc.solr_ne_pt_1_d > mapResults.mapBbox[1][1]){
    // 	        	mapResults.mapBbox[1][1] = doc.solr_ne_pt_1_d;
    // 	        }
    // 	      }
    // 	    }
    // 	  }
    // },
    
    //display a boundingBox for a single result
    // showResultBoundingBox:function(el) {
    // 	if(el.attr("docCounter") != null) {
    // 		var docCounter = el.attr("docCounter");
    // 		 if (mapResults.bBoxs[docCounter]){
    // 			    mapResults.bBoxs[docCounter].addTo(mapResults.map);
    // 		 }
    // 	}
    // },
    // hideResultBoundingBox:function(el) {
    // 	for(i in mapResults.map._layers) {
    //         if(mapResults.map._layers[i]._path !== undefined && i !== 0) {
    //             try {
    //                 mapResults.map.removeLayer(mapResults.map._layers[i]);
    //             }
    //             catch(e) {
    //                 console.log("problem with " + e + mapResults.map._layers[i]);
    //             }
    //         }
    //     }
    // },
    //include this method because of the way the assets directory seems to be included
    //even when a particular javascript is not referenced
    
};

