//bloodhound / typeahead arrays for regional context layers

//loop through each of these layers 
//county, dot, dec, climate division, watershed to create search arrays




/* Highlight search box text on click */
$("#searchbox").click(function () {
  $(this).select();
});

/* Typeahead search functionality */
$(document).one("ajaxStop", function () {
  $("#loading").hide();
  /* Fit map to boroughs bounds */
  /* broke this fitBounds ! */
  //map.fitBounds(county.getBounds());
/*  featureList = new List("features", {valueNames: ["feature-name"]});
  featureList.sort("feature-name", {order:"asc"});*/

  var countyBH = new Bloodhound({
    name: "county",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: ny_countySearch,
    limit: 10
  });

  var ny_dotBH = new Bloodhound({
    name: "ny_dot",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: ny_dotSearch,
    limit: 10
  });

  var ny_decBH = new Bloodhound({
    name: "ny_dec",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: ny_decSearch,
    limit: 10
  });

  var ny_clim_divBH = new Bloodhound({
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
  
  countyBH.initialize();
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
    name: "county",
    displayKey: "name",
    source: countyBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'>Counties</h4>"
    }
  }, {
    name: "ny_dot",
    displayKey: "name",
    source: ny_dotBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'>DOT Regions</h4>"
    }
  }, {
    name: "ny_dec",
    displayKey: "name",
    source: ny_decBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'>DEC Regions</h4>"
    }
  }, {
    name: "ny_clim_div",
    displayKey: "name",
    source: ny_clim_divBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'>Climate Divisions</h4>"
    }
  }, {
    name: "GeoNames",
    displayKey: "name",
    source: geonamesBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='/assets/img/globe.png' width='25' height='25'>&nbsp;Place Names</h4>"
    }
  }).on("typeahead:selected", function (obj, datum) {
    if (datum.source === "county") {
      if (!map.hasLayer(county)) {
        map.addLayer(county);
      }
      map.fitBounds(datum.bounds);    
    }

    if (datum.source === "ny_dot") {
      if (!map.hasLayer(ny_dot)) {
        map.addLayer(ny_dot);
      }
      map.fitBounds(datum.bounds);
    }

    if (datum.source === "ny_dec") {
      if (!map.hasLayer(ny_dec)) {
        map.addLayer(ny_dec);
      }
      map.fitBounds(datum.bounds);
    }

    if (datum.source === "ny_clim_div") {
      if (!map.hasLayer(ny_clim_div)) {
        map.addLayer(ny_clim_div);
      }
      map.fitBounds(datum.bounds);
    }

    if (datum.source === "GeoNames") {
      map.setView([datum.lat, datum.lng], 14);
    }
    if ($(".navbar-collapse").height() > 50) {
      $(".navbar-collapse").collapse("hide");
    }
  }).on("typeahead:opened", function () {
    $(".navbar-collapse.in").css("max-height", $(document).height() - $(".navbar-header").height());
    $(".navbar-collapse.in").css("height", $(document).height() - $(".navbar-header").height());
  }).on("typeahead:closed", function () {
    $(".navbar-collapse.in").css("max-height", "");
    $(".navbar-collapse.in").css("height", "");
  });
  $(".twitter-typeahead").css("position", "static");
  $(".twitter-typeahead").css("display", "block");
});