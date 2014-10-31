var getGISLayerInfo = {
	   //Pass this a callback function that will actually draw the layers
		//where the callback function expects a hash of properties
		makeGISMappingQuery:function(gisLayerURI, drawLayerCallback) {
			var thisURL = "/proxy/data?sparqlquerytype=gismap&sparqlquery=" + gisLayerURI;
			$.getJSON(thisURL, function(results) {
						if(("results" in results) && ("bindings" in results["results"])) {
							var bindings = results["results"]["bindings"];
							//This is an array
							var len = bindings.length;
							//Expecting to only use one URL although there is no restriction against having multiple
							if(len > 0) {
									//There are multiple possible values that can occur here
									//There is a global hash called 
								getGISLayerInfo.setupGISLayer(gisLayerURI, bindings[0], drawLayerCallback);
								
							}
						}
						//var displayHtml = getGISLayerInfo.generateDataProductDisplay(results);
						//getGISLayerInfo.includeURLInfo.append(displayHtml);
						
					
				});
		},
		//this method will call whatever we need to make the map display this GIS layer
		setupGISLayer:function(gisLayerURI, resultBindings, drawLayerCallback) {
			//First, get the values we need
			var gisLayerInfo = getGISLayerInfo.getGISDataHash(resultBindings);
			console.log(gisLayerInfo);
			//Any call to map magic would ha
			drawLayerCallback(gisLayerURI, gisLayerInfo);
			
		},
		getGISDataHash:function(resultBindings) {
			var gisHash = {"metaData":{}};
			var fieldMapping = {
					"title": "title",
					"url": "gisData",
					"format": "format",
					"layerGeometry": "geometry",
					"layerType": "type",
					"layerDataProp": "metaData.dataProp",
					"layerIconType": "metaData.icon",
					"layerRangeIntervals": "metaData.intervals",
					"colorHue": "metaData.colorHue",
					"iconImageURL": "metaData.iconUrl",
					"iconClusterImageURL": "metaData.icon_cluster",
					"legendImageURL": "metaData.legend"
						
			};
			
			for(var resultField in fieldMapping) {
				if(getGISLayerInfo.resultHasField(resultBindings, resultField)) {
					var mappedFieldName = fieldMapping[resultField];
					var fieldValue = resultBindings[resultField]["value"];
					//if there is a dot, it's in the other array
					if(mappedFieldName.indexOf(".") > -1) {
						var fieldPortions = mappedFieldName.split(".");
						//Also check if interval
						if(mappedFieldName == "metaData.intervals") {
							//will have to change field value somehow to array
							//TODO: Add validation that this is in fact an array, etc. 
							fieldValue = JSON.parse(fieldValue);
						}
						if(fieldPortions.length > 1) {
							gisHash[fieldPortions[0]][fieldPortions[1]] = fieldValue;
						}
					} else {
						gisHash[mappedFieldName] = fieldValue;
					}
				}
			}
			return gisHash;
		
			
			
			
		},
		resultHasField:function(resultBindings, fieldName) {
			
			return ((fieldName in resultBindings) && ("value" in resultBindings[fieldName])); 
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