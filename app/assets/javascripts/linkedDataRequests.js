var linkedDataRequests = {
	 onLoad: function() {
	        this.initObjects();
	        this.bindEventListeners();
	        this.loadRequests();
	    },
	    initObjects:function() {
	    	//Get type acet elements
	    	this.facettype = $("#facet-type");
	    	this.facettype_label = $("#facet-type a.facet_select");
	    	this.facettype_selected_label = $("#facet-type span.facet-label span.selected");
	    	//Get all the index type fields if they exist
	    	this.index_types = $("div.document dd.blacklight-mostspecifictypeuris");
	    	//Index results
	    	this.indexresults = $("div.document dl.document-metadata");
	    	
	    },
		bindEventListeners:function() {
			//There isn't really a binding here for specific events
		},
		loadRequests:function() {
			//Get linked data for each of the facet types
			/*
			this.facettype_label.each(function(){
				//Call linked data and get label
				//$(this)
				//Shoudl get text of the a tag which is the URI we want
				var thisURI = $(this).text();
				//alert(thisURI);
				linkedDataRequests.makeLinkedDataRequest(thisURI, $(this));
			});
			this.facettype_selected_label.each(function(){
				var thisURI = $(this).text();
				//alert(thisURI);
				linkedDataRequests.makeLinkedDataRequest(thisURI, $(this));
			});*/
			this.indexresults.each(
					function(){
						var thisURI = $(this).attr("uri");
						//alert(thisURI);
						linkedDataRequests.makeLinkedDataRequest(thisURI, $(this));
					});
		},
		makeLinkedDataRequest:function(thisURI, element) {
			//How to make this a local request
			var thisURL = "/proxy/data?linkeddata=" + thisURI;
			
		
			$.getJSON(thisURL, function(results) {
				var arrLen = results.length;
				var i;
				for(i = 0; i < arrLen; i++) {
					var result = results[i];
					var displayHtml = "";
					if(result["@id"] != undefined && result["@id"] == thisURI) {
						//This is the element we want to get the information about
						/*var label = result["http://www.w3.org/2000/01/rdf-schema#label"];
						element.html(label[0]["@value"]);*/
						var displayHtml = linkedDataRequests.generateIndexDisplay(result);
						element.append(displayHtml);
						break;
					}
				}
				
				
				
			});
		
		},
		//return html stringn to add
		generateIndexDisplay:function(jsonResult) {
			var htmlDisplay = "";
			for (var key in jsonResult) {
				  if (jsonResult.hasOwnProperty(key)) {
					  if(key in linkedDataRequests.propertyLabelsHash) {
						  var jsonValue = linkedDataRequests.getJSONValue(jsonResult[key]);
						  var displayJsonValue= jsonValue;
						  if(jsonValue.length > 300) {
							  displayJsonValue = jsonValue.substring(0, 299) + "...";
						  }
						  var displayPropertyName = linkedDataRequests.propertyLabelsHash[key];
						  htmlDisplay += '<dt class="blacklight-' + key + '">' + displayPropertyName + '</dt>';
						  htmlDisplay += '<dd class="blacklight-' + key + '">' + displayJsonValue + '</dd>';
					  }
				  }
				}
			return htmlDisplay;
		},
		getJSONValue:function(jsonResult) {
			var returnValue = jsonResult;
			if (jQuery.type(jsonResult) == "array"){
				var arrayLen = jsonResult.length;
				var i;
				for(i = 0; i <= arrayLen; i++) {
					thisResult = jsonResult[i];
					if(jQuery.type(thisResult) == "string") {
						returnValue = thisResult;
						break;
					} else if(jQuery.type(thisResult) == "object") {
						//Check if hash ha @value key
						if("@value" in thisResult) {
							returnValue = thisResult["@value"];
						}
					}
				}
			}
			else if (jQuery.type(jsonResult) == "object"){
				
			}
			return returnValue;
				
		},
		propertyLabelsHash: {
			
		      "http://vivoweb.org/ontology/core#overview": "Overview",
		      //"http://www.w3.org/2000/01/rdf-schema#label" : "Label",
		      "http://purl.org/ontology/bibo/abstract" : "Abstract",
		      "http://vivoweb.org/ontology/core#freetextKeyword ": "Keywords"
		   
		}
};


//Am doing it this way here but this may need to be changed based on
//how we want these particular scripts called from the page or particular view
$(document).ready(function() {
    linkedDataRequests.onLoad();
});