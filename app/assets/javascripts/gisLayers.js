var gisLayers = {
	 onLoad: function() {
		 	this.initData();
	        this.initObjects();
	        this.bindEventListeners();
	        this.loadRequests();
	    },
	    initData:function() {
	    	//little klunky but we will make sparqlQueryURI a global javascript variable ont he page
			//declared within the html itself
	    	this.sparqlQueryURI = sparqlQueryURI;
	    	//whether or not this is a special page
	    	this.isSpecialTypePage = false;
	    	if(typeof(page_special_type) != "undefined") {
	    		this.isSpecialTypePage = true;
	    		this.special_type = page_special_type;
	    	}
	    },
	    initObjects:function() {
	    	
	    	this.includeURLInfo = $("#includeURLInfo");
	    	this.addData = $("#addData");
	    	this.downloadURLInput = $("input#gisLayerSrc");
	    	
	    },
		bindEventListeners:function() {
			//There isn't really a binding here for specific events
			this.addData.click(function(e) {
				//Need to check whether options have been selected, i.e. error validation
				//Can have something that draws the GIS layer or displays it automatically
			});
			
		},
		loadRequests:function() {
			//Multiple types of query request might be possible
			this.makeQueryRequest();
		},
		makeQueryRequest:function() {
			//If this is the details page, multiple sparql query results might be possible
			//Will need way to distinguish between them
			
			if(this.isSpecialTypePage) {
				
				if(this.special_type =="gis_layer") {
					this.makeDownloadURLQuery();
					this.makeGISMappingQuery();
				}
				//for both data product and gis layer need access URL
			}
			
		},
		
		makeDownloadURLQuery:function() {
			var thisURL = "/proxy/data?sparqlquerytype=downloadurl&sparqlquery=" + gisLayers.sparqlQueryURI;
			$.getJSON(thisURL, function(results) {
						if(("results" in results) && ("bindings" in results["results"])) {
							var bindings = results["results"]["bindings"];
							//This is an array
							var len = bindings.length;
							//Expecting to only use one URL although there is no restriction against having multiple
							if((len > 0)
									&& ("url" in bindings[0])
									&& ("value" in bindings[0]["url"])) {
								url = bindings[0]["url"]["value"];
								gisLayers.downloadURLInput.val(url);
								
							}
						}
						//var displayHtml = gisLayers.generateDataProductDisplay(results);
						//gisLayers.includeURLInfo.append(displayHtml);
						
					
				});
		},
		makeGISMappingQuery:function() {
			var thisURL = "/proxy/data?sparqlquerytype=gismap&sparqlquery=" + gisLayers.sparqlQueryURI;
			$.getJSON(thisURL, function(results) {
						if(("results" in results) && ("bindings" in results["results"])) {
							var bindings = results["results"]["bindings"];
							//This is an array
							var len = bindings.length;
							//Expecting to only use one URL although there is no restriction against having multiple
							if(len > 0) {
									//There are multiple possible values that can occur here
									//There is a global hash called 
								gisLayers.setupGISLayer(bindings[0]);
								
							}
						}
						//var displayHtml = gisLayers.generateDataProductDisplay(results);
						//gisLayers.includeURLInfo.append(displayHtml);
						
					
				});
		},
		//this method will call whatever we need to make the map display this GIS layer
		setupGISLayer:function(resultBindings) {
			//First, get the values we need
			
		},
		getGISDataHash:function(resultBindings) {
			var gisHash = {"metadata":{}};
			if("title" in resultBindings) {
				gisHash["title"] = resultBindings["title"];
			}
			if("format" in resultBindings) {
				gisHash["format"] = resultBindings["format"];

			}
			if("layerGeometry" in resultBindings) {
				gisHash["geometry"] = resultBindings["layerGeometry"];

			}
			if("layerType" in resultBindings) {
				gisHash["type"] = resultBindings["layerType"];

			}
			if("layerDataProp" in resultBindings) {
				gisHash["metadata"]["dataProp"] = resultBindings["layerDataProp"];

			}
			
			
			
		},
		//return html stringn to add
		generateDisplay:function(jsonResult) {
			var htmlDisplay = "";
			if(jsonResult != null) {
				if("results" in jsonResult) {
					var results = jsonResult["results"];
					if("bindings" in results) {
						var bindingsArray = results["bindings"];
						var arrLen = bindingsArray.length;
						var i;
						for(i = 0; i < arrLen; i++) {
							var rObj = bindingsArray[i];
							if("url" in rObj) {
								var url = rObj["url"];
								var urlValue = url["value"];
								
							}
							if("linkLabel" in rObj) {
								var linkLabel = rObj["linkLabel"];
								var linkLabelValue = linkLabel["value"];
							}
							if(urlValue != null && urlValue != undefined
									&& linkLabelValue != null && linkLabelValue != undefined) {
								htmlDisplay +=  
									'<dt class="blacklight-URL">Link/URL</dt>' + 
		  		                '<dd class="blacklight-URL">' + 
		  		                '<a href="' + urlValue  + '">' + linkLabelValue + '</a>' + 
		  		                '</dd>';

							}
								
						}
					}
				}
			}
			return htmlDisplay;
		},
		processDataProductJSON:function(jsonResult) {
			var returnResult = {};
			//bindings is an array of objects
			//We are looking for categories of the variables
			//submission value, label, and typeLabel
			if(("results" in jsonResult) && ("bindings" in jsonResult["results"])) {
				var bindings = jsonResult["results"]["bindings"];
				var len = bindings.length;
				var i;
				for(i = 0; i < len; i++) {
					var binding = bindings[i];
					if(("submissionValue" in binding)
							&&
							("label" in binding)
							&& 
							("typeLabel" in binding)) {
						var typeLabel = binding["typeLabel"];
						if("value" in typeLabel) {
							var typeLabelValue = typeLabel["value"];
							if(! (typeLabelValue in returnResult)) {
								returnResult[typeLabelValue] = [];
							}
							returnResult[typeLabelValue].push(binding);
						}
					}
				}
			}
			return returnResult;
		}
		
		
		
};