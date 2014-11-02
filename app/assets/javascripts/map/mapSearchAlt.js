

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
          $("#searchicon i").removeClass("fa-search").addClass("fa-refresh fa-spin");
        },
        complete: function (jqXHR, status) {
          $('#searchicon i').removeClass("fa-refresh fa-spin").addClass("fa-search");
        }
      }
    },
    limit: 10
  });
  
  geonamesBH.initialize();

  /* instantiate the typeahead UI */
  $("#searchbox").typeahead({
    minLength: 3,
    highlight: true,
    hint: false
  }, {
    name: "GeoNames",
    displayKey: "name",
    source: geonamesBH.ttAdapter(),
    templates: {
      header: "<h5 class='typeahead-header'><i class='fa fa-globe'></i>&nbsp;Place Names</h5>"
    }
  }).on("typeahead:selected", function (obj, datum) {
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

     if (datum.source === "GeoNames") {
      map.setView([datum.lat, datum.lng], 14);
     }
    
  })
});


