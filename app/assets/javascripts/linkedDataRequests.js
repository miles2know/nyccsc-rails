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
	    },
		bindEventListeners:function() {
			//There isn't really a binding here for specific events
		},
		loadRequests:function() {
			//Get linked data for each of the facet types
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
			});
		},
		makeLinkedDataRequest:function(thisURI, element) {
			//How to make this a local request
			var thisURL = "http://localhost:3000/proxy/data?linkeddata=" + thisURI;
			
		/*	$.ajax({
				type:"GET",
				url: thisURL
				})
				.done(function( data ) {
					//Sift for label
					alert("label!");
				});*/
			$.getJSON(thisURL, function(results) {
				var arrLen = results.length;
				var i;
				for(i = 0; i < arrLen; i++) {
					var result = results[i];
					if(result["@id"] != undefined && result["@id"] == thisURI) {
						var label = result["http://www.w3.org/2000/01/rdf-schema#label"];
						element.html(label[0]["@value"]);
						break;
					}
				}
				
				
				
			});
			/*
			  $.ajax({
		            url: thisURL,
		            type: 'GET', 
		            dataType: 'json',
		            context: $(this), // context for callback
		            complete: function(request, status) {
		               
		            
		                if (status === 'success') {
		                    //element.html("blah");
		                	//Array, with each hash with @id
		                	var arrayLen = 
		                 
		                } else {
		                    //alert(addConceptForm.errorTernNotRemoved);
		                }
		            }
		        });      */
		
		}
};


//Am doing it this way here but this may need to be changed based on
//how we want these particular scripts called from the page or particular view
$(document).ready(function() {
    linkedDataRequests.onLoad();
    //browseClassGroups.defaultClassGroup();
});