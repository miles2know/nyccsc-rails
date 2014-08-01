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
//var counties = addGeoJsonPolygon("data/ny_counties_tiger.geojson", "County");
var contextOverlays =  
    [
        {
            data_name : "counties",
            data_source : "data/ny_counties_tiger.geojson",
            active : true
        },
        {
            data_name : "watersheds",
            data_source : "data/basin.geojson",
            active : false
        },
        {
            data_name : "dec-regions",
            data_source : "data/decregions.geojson",
            active : false
        },
        {
            data_name : "climate-divisions",
            data_source : "data/clim_div.geojson",
            active : false
        }
    ];

var mapResults = {
    // Initial page setup
    onLoad: function() {
        this.initializeMap();
        //this.setupMap();
        this.bindEventListeners();
        
    },
    initializeMap:function() {
    	
    	this.map = L.map('map').setView([43.1393, -76], 7);
    
      //mapResults.map.on('click', function(e) {e.preventDefault(); });        
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

        // add initial layer to map  
        mapResults.map.addLayer(mapquestOSM);
        L.control.layers(baseLayers).addTo(mapResults.map);

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

      
        // var groupedOverlays = {
        //     "Reference": {
        //         "Counties": counties,
        //         "Watersheds": addGeoJsonPolygon("data/basin.geojson", "Watershed"),
        //         "DEC Regions": addGeoJsonPolygon("data/decregions.geojson", "DECRegion"),
        //         "Climate Regions": addGeoJsonPolygon("data/clim_div.geojson", "Climate")//,
        //     },
        //     "Points of Interest": {
        //         //"USGS Streamflow Gauges": addGeoJsonPoint("data/streamGage.geojson", "Streamflow Gauge")//,
        //     }
        // }
    
        // setting up initial map controls 
        //L.control.layers(baseLayers, regionLayers).addTo(mapResults.map);
        
        // setting up initial map controls using Leaflet Plugin L.groupedlayercontrol
        //mapResults.LayersControl = L.control.groupedLayers(baseLayers, groupedOverlays).addTo(mapResults.map);
        //mapResults.map.addLayer(counties);
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

        //add new overlays to map - "map it!" functionality
        // $('#new-overlay').on('click', function (e) {
        //     e.preventDefault();
            
        //     //hardcoded overlay at this point... will be integrated from search results
        //     //mapResults.map.addLayer(addGeoJsonPoint( url, 'Streamflow Gauge' ) );
        //     var newLayer = addGeoJsonPoint('data/streamGage.geojson', 'Streamflow Gauge');
        //     mapResults.LayersControl.addOverlay(newLayer, 'Streamflow Gauges', 'Points of Interest');
        //     mapResults.map.addLayer(newLayer);

        // });\

        $("#new-overlay").click(function(e) {
          e.preventDefault();

          addPointsLayerToMap("data/streamGage.geojson", "Streamflow Gauge", true);

        }); //end new-overlay map it function

        $(".btn-overlay").click(function(e) {
          e.preventDefault();
          //capture which button was clicked
          var activeLayer = $(this);
          
          //remove active class on all 
          $(".btn-overlay").removeClass("active");
          d3.selectAll("g").remove();

          //loop through possible overlays 
          $( ".btn-overlay" ).each(function( i ) {

            if ($(this).attr("id") == activeLayer.attr("id")) {
              $(this).addClass("active");

              for (var i = 0; i < contextOverlays.length; i++) {
                //console.log(contextOverlays[i].data_source);
                if ($(this).attr("id") == contextOverlays[i].data_name) {
                  addPolygonLayerToMap(mapResults.map,contextOverlays[i].data_source, 
                     contextOverlays[i].data_name, 
                     true);
                }
              }
            }

          }); //loop overlays

        }); //end btn-overlay toggle listener

    	
    },
    verifyReady: function() {
        var mapDiv = $("#map");
        if (mapDiv != null && mapDiv.hasClass("mapResults")) {
            return true;
        }
        return false;
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

