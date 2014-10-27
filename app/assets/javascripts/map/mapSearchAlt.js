//mapSearch.js
//for a geo-spatial search that's specifically related to context layers


function highlightFeature(featureId) {
  //mapResults.map.hasLayer(featureId).setStyle(hoverPolygonStyle);     
  //layers[featureId].setStyle( hoverPolygonStyle );
  //counties
}


/*
  Function: getUrlParameters
  Description: Get the value of URL parameters either from 
               current URL or static URL
  Author: Tirumal
  URL: www.code-tricks.com
*/
function getUrlParameters(parameter, staticURL, decode){
    
    var currLocation = (staticURL.length)? staticURL : window.location.search,
        returnBool = true;

    if (currLocation.indexOf("?") > -1) {

       parArr = currLocation.split("?")[1].split("&");
       

        for(var i = 0; i < parArr.length; i++){
            parr = parArr[i].split("=");
            if(parr[0] == parameter){
                return (decode) ? decodeURIComponent(parr[1]) : parr[1];
                returnBool = true;
            }else{
                returnBool = false;            
            }
        }
    }   
   
    if(!returnBool) return false;  
 }


function addContextLayers() {
    
  var custom = new Bloodhound({
    datumTokenizer: function(d) { return d.tokens; },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    remote: 'http://'+window.location.hostname+'/invoice/loadItemOption?query=%QUERY'
    //local: //searchArray 
    });

    custom.initialize();

    $('.typeahead_option_items').typeahead(null, {
          name: 'item_title[]',
          displayKey: 'invoice_item_option_title',
          source: custom.ttAdapter(),
          hint: (App.isRTL() ? false : true),
    }).on('typeahead:selected', function (obj, value) {
        console.log(value.invoice_item_option_title);
    });
}


//variables that are required include
//search array, bh object, 
//create search array 
//create bh object
//initialize bh object
//add to typeahead

 /* Highlight search box text on click */
$("#searchbox").click(function () {
  $(this).select();
});

/* Typeahead search functionality */
$(document).one("ajaxStop", function () {
  $("#loading").hide();
  /* Fit map to boroughs bounds */
  //map.fitBounds(ny_county.getBounds());
/*  featureList = new List("features", {valueNames: ["feature-name"]});
  featureList.sort("feature-name", {order:"asc"});*/

  ny_countyBH = new Bloodhound({
    name: "ny_county",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: ny_countySearch,
    limit: 10
  });

  ny_dotBH = new Bloodhound({
    name: "ny_dot",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: ny_dotSearch,
    limit: 10
  });

  ny_decBH = new Bloodhound({
    name: "ny_dec",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: ny_decSearch,
    limit: 10
  });

  ny_clim_divBH = new Bloodhound({
    name: "ny_clim_div",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: ny_clim_divSearch,
    limit: 10
  });

  var geonamesBH = new Bloodhound({
    name: "GeoNames",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    remote: {
      url: "http://api.geonames.org/searchJSON?username=frontierspatial&featureClass=P&maxRows=5&country=US&adminCode1=NY&name_startsWith=%QUERY",
      filter: function (data) {
        return $.map(data.geonames, function (result) {
          return {
            name: result.name + ", " + result.adminCode1,
            lat: result.lat,
            lng: result.lng,
            source: "GeoNames"
          };
        });
      },
      ajax: {
        beforeSend: function (jqXhr, settings) {
          settings.url += "&east=-71&west=-80&north=45&south=40";
          $("#searchicon").removeClass("fa-search").addClass("fa-refresh fa-spin");
        },
        complete: function (jqXHR, status) {
          $('#searchicon').removeClass("fa-refresh fa-spin").addClass("fa-search");
        }
      }
    },
    limit: 10
  });
  
  ny_countyBH.initialize();
  ny_dotBH.initialize();
  ny_decBH.initialize();
  ny_clim_divBH.initialize();
  geonamesBH.initialize();

  /* instantiate the typeahead UI */
  $("#searchbox").typeahead({
    minLength: 3,
    highlight: true,
    hint: false
  }, {
    name: "ny_county",
    displayKey: "name",
    source: ny_countyBH.ttAdapter(),
    templates: {
      header: "<h5 class='typeahead-header'>Counties</h5>"
    }
  }, {
    name: "ny_dot",
    displayKey: "name",
    source: ny_dotBH.ttAdapter(),
    templates: {
      header: "<h5 class='typeahead-header'>DOT Regions</h5>"
    }
  }, {
    name: "ny_dec",
    displayKey: "name",
    source: ny_decBH.ttAdapter(),
    templates: {
      header: "<h5 class='typeahead-header'>DEC Regions</h5>"
    }
  }, {
    name: "ny_clim_div",
    displayKey: "name",
    source: ny_clim_divBH.ttAdapter(),
    templates: {
      header: "<h5 class='typeahead-header'>Climate Divisions</h5>"
    }
  }, {
    name: "GeoNames",
    displayKey: "name",
    source: geonamesBH.ttAdapter(),
    templates: {
      header: "<h5 class='typeahead-header'><i class='fa fa-globe'></i>&nbsp;Place Names</h5>"
    }
  })//.on("typeahead:selected", function (obj, datum) {
  //   if (datum.source === "ny_county") {
  //     if (!map.hasLayer(ny_county)) {
  //       map.addLayer(ny_county);
  //     }
  //     map.fitBounds(datum.bounds);    
  //   }

  //   if (datum.source === "ny_dot") {
  //     if (!map.hasLayer(ny_dot)) {
  //       map.addLayer(ny_dot);
  //     }
  //     map.fitBounds(datum.bounds);
  //   }

  //   if (datum.source === "ny_dec") {
  //     if (!map.hasLayer(ny_dec)) {
  //       map.addLayer(ny_dec);
  //     }
  //     map.fitBounds(datum.bounds);
  //   }

  //   if (datum.source === "ny_clim_div") {
  //     if (!map.hasLayer(ny_clim_div)) {
  //       map.addLayer(ny_clim_div);
  //     }
  //     map.fitBounds(datum.bounds);
  //   }

  //   if (datum.source === "GeoNames") {
  //     map.setView([datum.lat, datum.lng], 14);
  //   }
    
  // })
});


