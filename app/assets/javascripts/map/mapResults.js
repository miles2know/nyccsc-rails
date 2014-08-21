//This javascript is responsible for storing and displaying the bounding box of a particular 
//result on the screen when you hover over an individual result
//In addition, the code here will also set the bounding box of the map to be the results that are being viewed.
//Additionally, zooming in or zooming out will actually change the results that are being displayed to those
//that fit within the bounding box provided


var mapResults = {
    // Initial page setup
    onLoad: function() {
        this.initializeMap();
        //this.setupMap();
        this.bindEventListeners();
        
    },
    initializeMap:function() {

        //establish base layers
        var baseLayers = {
            "Grayscale" : OpenStreetMap_BlackAndWhite,
            /*"Street Map" : Esri_WorldStreetMap,*/
            "Topography": Esri_WorldTopoMap,
            "Satellite": Esri_WorldImagery
        };
    	
        //create map
    	this.map = L.map('map', {
            center:[43.1393, -76],
            zoom: 6,
            layers: [OpenStreetMap_BlackAndWhite]
        });

        // add initial layer to map  
        //mapResults.map.addBaseLayer(OpenStreetMap_BlackAndWhite);
        L.control.layers(baseLayers).addTo(mapResults.map);

        // load svg canvas for d3 layers
        var svg = d3.select(mapResults.map.getPanes().overlayPane).append("svg");

        //loop through possible overlays and add active layer
        for (var i = 0; i < contextOverlays.length; i++) {
          //console.log(contextOverlays[i].data_source);
          if (contextOverlays[i].active) {
            addPolygonLayerToMap(mapResults.map,contextOverlays[i].data_source, 
               contextOverlays[i].data_name, 
               contextOverlays[i].active);
          }
          addOverlayButton(contextOverlays[i].data_name, contextOverlays[i].active);
        }
        
        
    },
    bindEventListeners:function() {

        // can detect map changes - search results change functionality    
        // mapResults.map.on('moveend dragend zoomend', function (e) { 

        //     var bounds = mapResults.map.getBounds();
        //     //NOT DONE:  change map data points based on change in map bounding box 
        //     //also need to pass this information to solr (along with other parameters to change search results)
        //     //hardcoded to a specific layer for now
        //     console.log('boundingBox change:: SW:' + bounds.getSouthWest() + 'NE:' + bounds.getNorthEast() ); 
            
        //     var url = "proxy/data?q=data&querytype=streamGage2geojson&" 
        //       + "lat1=" + bounds.getSouthWest().lat + "&lon1=" + bounds.getSouthWest().lng 
        //       + "&lat2=" + bounds.getNorthEast().lat + "&lon2=" + bounds.getNorthEast().lng;

        //     var layer = 'Streamflow Gauge';
        //     if (mapResults.map.hasLayer(layer)) {
        //         mapResults.map.removeLayer(layer)
        //     }    
        //     mapResults.map.addLayer(addGeoJsonPoint( url, 'Streamflow Gauge' ) );
        // });
        
        //eventually this will come from vivo 
      $("#add-overlay").click(function(e) {
        e.preventDefault();

        $(this).toggleClass('active');

        if ($(this).hasClass('active')) {
            addPointsLayerToMap(mapResults.map, "data/streamGage.geojson", "Streamflow Gauge", true);
            $(this).html("Remove It!");
            
        } else {
            d3.selectAll("g.Streamflow").remove();
            $(this).html("Map It!");
        }

      }); //end add-overlay listener

      $(".overlay-tabs li a").click(function(e) {
        e.preventDefault();
        
        //capture which button was clicked
        var activeLayer = $(this);
        
        //remove active class on all 
        $(".overlay-tabs li").removeClass("active");
        d3.selectAll("g.context-overlay").remove();

        //loop through possible overlays 
        $( ".overlay-tabs li a" ).each(function( i ) {

          if ($(this).attr("id") == activeLayer.attr("id")) {
            $(this).parent().addClass("active");

            for (var i = 0; i < contextOverlays.length; i++) {
              //console.log(contextOverlays[i].data_source);
              if ($(this).attr("id") == contextOverlays[i].data_name.replace(/\s+/g, '')) {
                addPolygonLayerToMap(mapResults.map,contextOverlays[i].data_source, 
                   contextOverlays[i].data_name, 
                   true);
              }
            }
          }

        }); //loop overlays

      }); //end .overlay-tabs listener

    },
    verifyReady: function() {
        var mapDiv = $("#map");
        if (mapDiv != null && mapDiv.hasClass("mapResults")) {
            return true;
        }
        return false;
        console.log('dom not ready');
        //error condition 
    }
        
    // NOT USED AT THIS TIME
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

