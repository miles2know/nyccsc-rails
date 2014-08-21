var sparqlQueryResults = {
	 onLoad: function() {
	        this.initObjects();
	        this.bindEventListeners();
	        this.loadRequests();
	    },
	    initObjects:function() {
	    	this.includeURLInfo = $("#includeURLInfo");
	    },
		bindEventListeners:function() {
			//There isn't really a binding here for specific events
		},
		loadRequests:function() {
			this.makeQueryRequest();
		},
		makeQueryRequest:function() {
			//little klunky but we will make sparqlQueryURI a global javascript variable ont he page
			//declared within the html itself
			var thisURL = "/proxy/data?sparqlquery=" + sparqlQueryURI;
			
			
			$.getJSON(thisURL, function(results) {
				
						var displayHtml = sparqlQueryResults.generateDisplay(results);
						sparqlQueryResults.includeURLInfo.append(displayHtml);
						
					
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
		}
};


//Am doing it this way here but this may need to be changed based on
//how we want these particular scripts called from the page or particular view
$(document).ready(function() {
	
    sparqlQueryResults.onLoad();
});