var dataProductResults = {
	onLoad : function() {
		this.initData();
		this.initObjects();
		this.bindEventListeners();
		this.loadRequests();
	},
	initData : function() {
		// little klunky but we will make sparqlQueryURI a global javascript
		// variable ont he page
		// declared within the html itself
		this.sparqlQueryURI = sparqlQueryURI;
		// whether or not this is a special page
		this.isSpecialTypePage = false;
		if (typeof (page_special_type) != "undefined") {
			this.isSpecialTypePage = true;
			this.special_type = page_special_type;
		}
	},
	initObjects : function() {

		this.includeURLInfo = $("#includeURLInfo");
		this.addData = $("#addData");
		this.downloadURLInput = $("input#dataProductSrc");

		this.initDatePicker();
	},
	bindEventListeners : function() {
		// There isn't really a binding here for specific events
		this.addData.click(function(e) {
			// Need to check whether options have been selected, i.e. error
			// validation
			dataProductResults.drawChart(e);
		});

	},
	loadRequests : function() {
		// Multiple types of query request might be possible
		this.makeQueryRequest();
	},
	makeQueryRequest : function() {
		
		if (this.isSpecialTypePage) {
			if (this.special_type == "data_product") {
				this.makeDataProductQueryRequest();
				this.makeDownloadURLQuery();
			}
			// for both data product and gis layer need download URL
		}

	},
	makeDataProductQueryRequest : function() {
		var thisURL = "/proxy/data?sparqlquerytype=dataproduct&sparqlquery="
				+ dataProductResults.sparqlQueryURI;
		$.getJSON(thisURL, function(results) {

			// if error, then need to display error message
			dataProductResults.generateDataProductDisplay(results);

		});
	},
	makeDownloadURLQuery : function() {
		var thisURL = "/proxy/data?sparqlquerytype=downloadurl&sparqlquery="
				+ dataProductResults.sparqlQueryURI;
		$.getJSON(thisURL, function(results) {
			if (("results" in results) && ("bindings" in results["results"])) {
				var bindings = results["results"]["bindings"];
				// This is an array
				var len = bindings.length;
				// Expecting to only use one URL although there is no
				// restriction against having multiple
				if ((len > 0) && ("url" in bindings[0])
						&& ("value" in bindings[0]["url"])) {
					url = bindings[0]["url"]["value"];
					dataProductResults.downloadURLInput.val(url);

				}
			}
			// var displayHtml =
			// dataProductResults.generateDataProductDisplay(results);
			// dataProductResults.includeURLInfo.append(displayHtml);

		});
	},
	// return html stringn to add
	generateDisplay : function(jsonResult) {
		var htmlDisplay = "";
		if (jsonResult != null) {
			if ("results" in jsonResult) {
				var results = jsonResult["results"];
				if ("bindings" in results) {
					var bindingsArray = results["bindings"];
					var arrLen = bindingsArray.length;
					var i;
					for (i = 0; i < arrLen; i++) {
						var rObj = bindingsArray[i];
						if ("url" in rObj) {
							var url = rObj["url"];
							var urlValue = url["value"];

						}
						if ("linkLabel" in rObj) {
							var linkLabel = rObj["linkLabel"];
							var linkLabelValue = linkLabel["value"];
						}
						if (urlValue != null && urlValue != undefined
								&& linkLabelValue != null
								&& linkLabelValue != undefined) {
							htmlDisplay += '<dt class="blacklight-URL">Link/URL</dt>'
									+ '<dd class="blacklight-URL">'
									+ '<a href="'
									+ urlValue
									+ '">'
									+ linkLabelValue + '</a>' + '</dd>';

						}

					}
				}
			}
		}
		return htmlDisplay;
	},
	generateDataProductDisplay : function(jsonResult) {
		var dataProductSelect = $("select#data-product");
		var dataProductHtml = "";

		var processedJSON = dataProductResults
				.processDataProductJSON(jsonResult);
		// We call them data products but it is referred to as "calcuations"
		// for keys
		for ( var productType in processedJSON) {
			if (productType == "Calculation") {
				var products = processedJSON[productType];
				var i, len = products.length;
				if (len > 0) {

					for (i = 0; i < len; i++) {
						var product = products[i];
						var submissionValue = product["submissionValue"];
						var label = product["label"];
						if (("value" in submissionValue) && ("value" in label)) {
							dataProductHtml += "<option value='"
									+ submissionValue["value"] + "'>"
									+ label["value"] + "</option>";
						}
					}
					// Add data products
					dataProductSelect.append(dataProductHtml);
				}

			}
		}

		return dataProductHtml;
	},
	processDataProductJSON : function(jsonResult) {
		var returnResult = {};
		// bindings is an array of objects
		// We are looking for categories of the variables
		// submission value, label, and typeLabel
		if (("results" in jsonResult) && ("bindings" in jsonResult["results"])) {
			var bindings = jsonResult["results"]["bindings"];
			var len = bindings.length;
			var i;
			for (i = 0; i < len; i++) {
				var binding = bindings[i];
				if (("submissionValue" in binding) && ("label" in binding)
						&& ("typeLabel" in binding)) {
					var typeLabel = binding["typeLabel"];
					if ("value" in typeLabel) {
						var typeLabelValue = typeLabel["value"];
						if (!(typeLabelValue in returnResult)) {
							returnResult[typeLabelValue] = [];
						}
						returnResult[typeLabelValue].push(binding);
					}
				}
			}
		}
		return returnResult;
	},
	// The above file should be broken out into type specific portions
	initDatePicker : function() {
		// settings for date picker
		$('.input-daterange').datepicker({
			format : "yyyy",
			// startView: 1,
			minViewMode : 2, // year only
			startDate : "-119y", // 1895
			endDate : "y"
		});
	},

	drawChart : function(e) {
		var chartId = "chart0";
		e.preventDefault();
		canvas.onLoad(chartId);
		// canvas.initializeAxes();

		// retrieve config - in case we allow it to be defined by user?
		var config = {
			w : canvas.width(),
			h : canvas.height(),
			m : {
				top : canvas.margin().top,
				bottom : canvas.margin().bottom,
				left : canvas.margin().left,
				right : canvas.margin().right
			}
		};
		// console.log("config exists");
		// console.log(config);
		var url = dataProductResults.downloadURLInput.val();
		if (url != "") {
			// Go ahead and make this call if the url exists,
			var startYear = $("#startDate").val();
			var endYear = $("#endDate").val();
			var region = $("#county").val();
			// the label will change
			var yLabel = "Temp (°F)";
			var valueFormat = "5.1f";
			var color = $("#data-color").val();
			var dataProduct = $("#data-product").val();
			var productParams = {
				"state" : "ny",
				"sdate" : startYear,
				"edate" : endYear,
				"grid" : 21,
				"elems" : [ {
					"name" : dataProduct,
					"area_reduce" : "state_mean"
				}, {
					"name" : dataProduct,
					"area_reduce" : "county_mean"
				} ]
			};
			//winter minumum temperature
			//elem: mly_mint, monthly minimum temperature, interval: 1,0 annual, 
			//duration: 3 for 3 months, start time: 1895, end feb 2014
			//1895-2 to 214-5
			//Mean of 3 values: seasonal average minimum temperature
			//

			// Make ajax request
			// $.getJSON(url, productParams, function(results) {
			$.ajax(url, {
				type : 'POST',
				data : {
					'params' : JSON.stringify(productParams)
				},
				crossDamain : true,
				success : function(results) {
					if (results != null) {

						// updateChart (data, resultsElementId, config, chartId,
						// title, region, yLabel, valueFormat, startYear,
						// endYear, color) {

						updateChart(results, "results", config, chartId,
								"Chart", region, yLabel, valueFormat,
								startYear, endYear, color);
					}
				}
			// error: postError
			});

		} else {
			// this is an error condition here or one that denotes we can't draw
			// this product at all
		}

	}

};