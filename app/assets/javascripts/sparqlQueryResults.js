var sparqlQueryResults = {
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
	    },
		bindEventListeners:function() {
			//There isn't really a binding here for specific events
		},
		loadRequests:function() {
			//Multiple types of query request might be possible
			this.makeQueryRequest();
		},
		makeQueryRequest:function() {
			//If this is the details page, multiple sparql query results might be possible
			//Will need way to distinguish between them
			this.makeLinkQueryRequest();
			if(this.isSpecialTypePage) {
				if(this.special_type == "data_product") {
					//If data product, then need to make a data product query
					//To get variables and other information
					this.makeDataProductQueryRequest();
				}
				if(this.special_type =="data_product" || this.special_type =="gis_layer") {
					this.makeAccessURLQuery();
				}
				//for both data product and gis layer need access URL
			}
			
		},
		makeLinkQueryRequest:function() {
			
			var thisURL = "/proxy/data?sparqlquerytype=link&sparqlquery=" + sparqlQueryResults.sparqlQueryURI;
			
			
			$.getJSON(thisURL, function(results) {
				
						var displayHtml = sparqlQueryResults.generateDisplay(results);
						sparqlQueryResults.includeURLInfo.append(displayHtml);
						
					
				});
		
		},
		makeDataProductQueryRequest:function() {
			var thisURL = "/proxy/data?sparqlquerytype=dataproduct&sparqlquery=" + sparqlQueryResults.sparqlQueryURI;
			$.getJSON(thisURL, function(results) {
				
						var displayHtml = sparqlQueryResults.generateDataProductDisplay(results);
						//sparqlQueryResults.includeURLInfo.append(displayHtml);
						
					
				});
		},
		makeAccessURLQuery:function() {
			var thisURL = "/proxy/data?sparqlquerytype=accessurl&sparqlquery=" + sparqlQueryResults.sparqlQueryURI;
			$.getJSON(thisURL, function(results) {
				
						//var displayHtml = sparqlQueryResults.generateDataProductDisplay(results);
						//sparqlQueryResults.includeURLInfo.append(displayHtml);
						
					
				});
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
		generateDataProductDisplay:function(jsonResult) {
			return "data product";
		}
};


//Am doing it this way here but this may need to be changed based on
//how we want these particular scripts called from the page or particular view
$(document).ready(function() {
	
    sparqlQueryResults.onLoad();
});