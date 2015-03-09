/**
** This page will handle setting up the javascript for 'special types' i.e. data products or gis layers
* that involve a different type of interactivity
**/


//Assume that gis layers and data products already exist
$(document).ready(function() {
	//Check special type and load the correct content handler
	if(typeof(page_special_type) != "undefined") {
		if(page_special_type == "gis_layer" && typeof(gisLayers) != "undefined") {
			gisLayers.onLoad();
		} else if(page_special_type == "data_product" && typeof(dataProductResults) != "undefined") {
			// dataProductResults.onLoad();
		}
	}
});