var vivoDataRequests = {
	//sparqlquery bindings
	vivoBindings : ["downloadURL", "accessURL", "abstract", "overview"],
	//methods
	onLoad : function() {
		this.initObjects();
		this.bindEventListeners();
		this.loadRequests();
	},
	initObjects : function() {
		// Get type acet elements
		this.facettype = $("#facet-type");
		this.facettype_label = $("#facet-type a.facet_select");
		this.facettype_selected_label = $("#facet-type span.facet-label span.selected");
		// Get all the index type fields if they exist
		this.index_types = $("div.document dd.blacklight-mostspecifictypeuris");
		// Index results
		this.indexresults = $("div.document dl.document-metadata");

	},
	bindEventListeners : function() {
		// There isn't really a binding here for specific events
	},
	loadRequests : function() {
		// Get linked data for each of the facet types
		/*
		 * this.facettype_label.each(function(){ //Call linked data and get
		 * label //$(this) //Shoudl get text of the a tag which is the URI we
		 * want var thisURI = $(this).text(); //alert(thisURI);
		 * vivoDataRequests.makeLinkedDataRequest(thisURI, $(this)); });
		 * this.facettype_selected_label.each(function(){ var thisURI =
		 * $(this).text(); //alert(thisURI);
		 * vivoDataRequests.makeLinkedDataRequest(thisURI, $(this)); });
		 */
		this.indexresults.each(function() {
			var thisURI = $(this).attr("uri");
			// alert(thisURI);
			vivoDataRequests.makeDataRequest(thisURI, $(this));
		});
	},
	makeDataRequest : function(thisURI, element) {
		// How to make this a local request
		var thisURL = "/proxy/data?sparqlquerytype=renderbasicinfo&sparqlquery="
				+ thisURI;

		$.getJSON(thisURL,
				function(results) {
					if (results && ("results" in results) && ("bindings" in results["results"])) {
						var bindings = results["results"]["bindings"];
						var displayHtml = vivoDataRequests.generateSearchResultDisplay(bindings);
				element.prepend(displayHtml);
						

					}

				});

	},
	//what if there is more than one URL?
	generateSearchResultDisplay:function(bindings) {
		var len = bindings.length;
		var html = "";
		var binding;
		var i;
		for(i = 0; i < len; i++) {
			binding = bindings[i];
			//Use this if download or Access url are not available
			//This is because the regular URL is a superclass 
			//TODO: Update sparql query correctly
			if((! ("downloadURL" in binding)) && (! ("accessURL" in binding)) && 
					("standardLink" in binding) && ("value" in binding["standardLink"])) {
				//Check if label exists
				var standardLinkLabel = null;
				if(("standardLinkLabel" in binding) && ("value" in binding["standardLinkLabel"]))  {
					standardLinkLabel = binding["standardLinkLabel"]["value"];
				}
				html += vivoDataRequests.generateStandardURLDisplay(binding["standardLink"]["value"], standardLinkLabel);
			}
			if(("downloadURL" in binding) && ("value" in binding["downloadURL"])) {
				var downloadURLLabel = null;
				if(("downloadURLLabel" in binding) && ("value" in binding["downloadURLLabel"]))  {
					downloadURLLabel = binding["downloadURLLabel"]["value"];
				}
				html += vivoDataRequests.generateDownloadURLDisplay(binding["downloadURL"]["value"], downloadURLLabel);
			}
			if(("accessURL" in binding) && ("value" in binding["accessURL"])) {
				var accessURLLabel = null;
				if(("accessURLLabel" in binding) && ("value" in binding["accessURLLabel"]))  {
					accessURLLabel = binding["accessURLLabel"]["value"];
				}
				html += vivoDataRequests.generateAccessURLDisplay(binding["accessURL"]["value"], accessURLLabel);
			}
			//We only want to show the abstract once, not multiple times
			// if((i == len - 1) && ("abstract" in binding) && ("value" in binding["abstract"])) {
			// 	html += vivoDataRequests.generateAbstractDisplay(binding["abstract"]["value"]);
			// }
		}
		return html;
		
	},
	generateStandardURLDisplay:function(standardURL, label) {
		var URLLabel = vivoDataRequests.generateLabelForLink("Link", label);
		var link = "<a class='btn btn-default btn-sm' href='" + standardURL + "'><i class='fa fa-link'></i> "+ URLLabel + "</a>";
		//var standardLink =  vivoDataRequests.generateURLForDisplay(standardURL, URLLabel);
		return vivoDataRequests.generateIndexHTMLForField("standardURL", "&nbsp;", link);
	},
	generateAccessURLDisplay:function(accessURL, label) {
		var URLLabel = vivoDataRequests.generateLabelForLink("Website", label);
		var link = "<a class='btn btn-default btn-sm' href='" + accessURL + "'><i class='fa fa-external-link'></i> "+ URLLabel + "</a>";
		//var accessLink =  vivoDataRequests.generateURLForDisplay(accessURL, URLLabel);
		return vivoDataRequests.generateIndexHTMLForField("accessURL", "&nbsp;", link);
	},
	generateDownloadURLDisplay:function(downloadURL, label) {
		var URLLabel = vivoDataRequests.generateLabelForLink("Download", label);
		var link = "<a class='btn btn-default btn-sm' href='" + downloadURL + "'><i class='fa fa-download'></i> "+ URLLabel + "</a>";
		//var downloadLink =  vivoDataRequests.generateURLForDisplay(downloadURL, URLLabel);
		return vivoDataRequests.generateIndexHTMLForField("downloadURL", "&nbsp;", link);
	},
	generateLabelForLink:function(defaultLabel, label) {
		return (label == null || label == "") ? defaultLabel : label;
	},
	//return the actual string 
	generateURLForDisplay:function(URL, label) {
		return "<a href='" + URL + "'>" + label + "</a>";
	},
	generateAbstractDisplay:function(abstractText) {
		var displayAbstractText = abstractText;
		if (abstractText.length > 150) {
			displayAbstractText = abstractText.substring(0, 149) + " ...";
		}
		return vivoDataRequests.generateIndexHTMLForField("abstract", "Abstract:", displayAbstractText);
	},
	generateOverviewDisplay:function(overview) {
		return vivoDataRequests.generateIndexHTMLForField("overview", "Overview:", overview);
	},
	generateIndexHTMLForField:function(key, displayPropertyName, displayValue) {
		var htmlDisplay = '<dt class="blacklight-' + key + '">'
		+ displayPropertyName + '</dt>';
		htmlDisplay += '<dd class="blacklight-' + key + '">'
		+ displayValue + '</dd>';
		return htmlDisplay;

	},
	// Older linked data request, going with sparql query instead since
	// retrieving multiple elements
	/*
	 * makeLinkedDataRequest:function(thisURI, element) { //How to make this a
	 * local request var thisURL = "/proxy/data?linkeddata=" + thisURI;
	 * 
	 * 
	 * $.getJSON(thisURL, function(results) { var arrLen = results.length; var
	 * i; for(i = 0; i < arrLen; i++) { var result = results[i]; var displayHtml =
	 * ""; if(result["@id"] != undefined && result["@id"] == thisURI) { //This
	 * is the element we want to get the information about
	 * 
	 * var displayHtml = vivoDataRequests.generateIndexDisplay(result);
	 * element.append(displayHtml); break; } }
	 * 
	 * 
	 * 
	 * });
	 *  },
	 */
	// return html stringn to add
	generateIndexDisplay : function(jsonResult) {
		var htmlDisplay = "";
		for ( var key in jsonResult) {
			if (jsonResult.hasOwnProperty(key)) {
				if (key in vivoDataRequests.propertyLabelsHash) {
					var jsonValue = vivoDataRequests
							.getJSONValue(jsonResult[key]);
					var displayJsonValue = jsonValue;
					if (jsonValue.length > 300) {
						displayJsonValue = jsonValue.substring(0, 299) + "...";
					}
					var displayPropertyName = vivoDataRequests.propertyLabelsHash[key];
					htmlDisplay += '<dt class="blacklight-' + key + '">'
							+ displayPropertyName + '</dt>';
					htmlDisplay += '<dd class="blacklight-' + key + '">'
							+ displayJsonValue + '</dd>';
				}
			}
		}
		return htmlDisplay;
	},
	getJSONValue : function(jsonResult) {
		var returnValue = jsonResult;
		if (jQuery.type(jsonResult) == "array") {
			var arrayLen = jsonResult.length;
			var i;
			for (i = 0; i <= arrayLen; i++) {
				thisResult = jsonResult[i];
				if (jQuery.type(thisResult) == "string") {
					returnValue = thisResult;
					break;
				} else if (jQuery.type(thisResult) == "object") {
					// Check if hash ha @value key
					if ("@value" in thisResult) {
						returnValue = thisResult["@value"];
					}
				}
			}
		} else if (jQuery.type(jsonResult) == "object") {

		}
		return returnValue;

	},
	propertyLabelsHash : {

		"http://vivoweb.org/ontology/core#overview" : "Overview",
		// "http://www.w3.org/2000/01/rdf-schema#label" : "Label",
		"http://purl.org/ontology/bibo/abstract" : "Abstract",
		"http://vivoweb.org/ontology/core#freetextKeyword " : "Keywords"

	}
};

// Am doing it this way here but this may need to be changed based on
// how we want these particular scripts called from the page or particular view
$(document).ready(function() {
	vivoDataRequests.onLoad();
});