//mapSearch.js
//specifically for a search that's related to a location on the map
var placesSearch=[];

// Highlight search box text on click
// $("#search").on('click', function () {

//     var searchTerms = getUrlParameters("q", "", true);
//     //from posted (window refreshed) so the following will no work
//     //var searchTerms = $('#q').value();
//     alert('search terms changed');
//     if ($.inArray(searchTerms, placesSearch)) {
//         console.log('found in array');
//     } else {
//         console.log('not found in array')
//     }
// });
 function highlightFeature(featureId) {
    //mapResults.map.hasLayer(featureId).setStyle(hoverPolygonStyle);     
    //layers[featureId].setStyle( hoverPolygonStyle );
    //counties
    
 }

 // function updateAreas (areas) {
 //      // only load once
 //      if (this.county.getLayers().length == 0) {
 //        var layer=this.county
 //        areas.forEach(function (v) {
 //          layer.addData(v)
 //        })
 //      }
 //      var layers = this.county.getLayers()
 //      areas.forEach(function (v,i) {
 //        if (v.selected) {
 //          layers[i].setStyle({fillOpacity:0.7})
 //        } else {
 //          layers[i].setStyle({fillOpacity: 0})
 //        }
 //      })
 //    },



function getUrlParameters(parameter, staticURL, decode){
    /*
    Function: getUrlParameters
    Description: Get the value of URL parameters either from 
                 current URL or static URL
    Author: Tirumal
    URL: www.code-tricks.com
    */
   
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

// Typeahead search functionality
// $(document).one("ajaxStop", function () {
// //map.fitBounds(decregion.getBounds());
//     $("#loading").hide();

// /*                var placeBH = new Bloodhound({
    //     name: "place",
    //     datumTokenizer: function (d) {
    //         return Bloodhound.tokenizers.whitespace(d.name);
    //     },
    //     queryTokenizer: Bloodhound.tokenizers.whitespace,
    //     local: placeSearch,
    //     limit: 10
    // });*/

    // var huc8BH = new Bloodhound({
    //     name: "huc8",
    //     datumTokenizer: function (d) {
    //         return Bloodhound.tokenizers.whitespace(d.name);
    //     },
    //     queryTokenizer: Bloodhound.tokenizers.whitespace,
    //     local: huc8Search,
    //     limit: 10
    // });

    // var clim_divBH = new Bloodhound({
    //     name: "clim_div",
    //     datumTokenizer: function (d) {
    //         return Bloodhound.tokenizers.whitespace(d.name);
    //     },
    //     queryTokenizer: Bloodhound.tokenizers.whitespace,
    //     local: clim_divSearch,
    //     limit: 10
    // });

    // var decregionBH = new Bloodhound({
    //     name: "decregion",
    //     datumTokenizer: function (d) {
    //         return Bloodhound.tokenizers.whitespace(d.name);
    //     },
    //     queryTokenizer: Bloodhound.tokenizers.whitespace,
    //     local: decregionSearch,
    //     limit: 10
    // });
    // var geonamesBH = new Bloodhound({
    //         name: "GeoNames",
    //         datumTokenizer: function (d) {
    //             return Bloodhound.tokenizers.whitespace(d.name);
    //         },
    //         queryTokenizer: Bloodhound.tokenizers.whitespace,
    //         remote: {
    //             url: "http://api.geonames.org/searchJSON?username=bootleaf&featureClass=P&maxRows=5&countryCode=US&name_startsWith=%QUERY",
    //             filter: function (data) {
    //                 return $.map(data.geonames, function (result) {
    //                     return {
    //                         name: result.name + ", " + result.adminCode1,
    //                         lat: result.lat,
    //                         lng: result.lng,
    //                         source: "GeoNames"
    //                     };
    //                 });
    //             },
    //             ajax: {
    //                 beforeSend: function (jqXhr, settings) {
    //                     settings.url += "&east=-71&west=-80&north=45&south=40";
    //                     $("#searchicon").removeClass("fa-search").addClass("fa-refresh fa-spin");
    //                 },
    //                 complete: function (jqXHR, status) {
    //                     $('#searchicon').removeClass("fa-refresh fa-spin").addClass("fa-search");
    //                 }
    //             }
    //         },
    //         limit: 10
    //     });


    // huc8BH.initialize();
    // decregionBH.initialize();
    // clim_divBH.initialize();
    // geonamesBH.initialize();

    // // instantiate the typeahead UI
    // $("#searchbox").typeahead({
    //     minLength: 3,
    //     highlight: true,
    //     hint: false
    // },  {
    //     name: "huc8",
    //     displayKey: "name",
    //     source: huc8BH.ttAdapter(),
    //     templates: {
    //         header: "<h4 class='typeahead-header'>Watershed</h4>"
    //     }
    // }, {
    //     name: "clim_div",
    //     displayKey: "name",
    //     source: clim_divBH.ttAdapter(),
    //     templates: {
    //         header: "<h4 class='typeahead-header'>Climate Division</h4>"
    //     }
    // }, {
    //     name: "decregion",
    //     displayKey: "name",
    //     source: decregionBH.ttAdapter(),
    //     templates: {
    //         header: "<h4 class='typeahead-header'>DEC Region</h4>"
    //     }
    // }, {
    //     name: "GeoNames",
    //     displayKey: "name",
    //     source: geonamesBH.ttAdapter(),
    //     templates: {
    //         header: "<h4 class='typeahead-header'><img src='assets/img/globe.png' width='25' height='25'>&nbsp;GeoNames</h4>"
    //     }
    // }).on("typeahead:selected", function (obj, datum) {
    //     if (datum.source === "place") {
    //         map.setView([datum.lat, datum.lng], 15);
    //     };
    //     if (datum.source === "huc8") {
    //         map.setView([datum.lat, datum.lng], 15);
    //     };
    //      if (datum.source === "clim_div") {
    //         map.setView([datum.lat, datum.lng], 17);
    //     };
    //    if (datum.source === "decregion") {
    //         if (!map.hasLayer(decregion)) {
    //             map.addLayer(decregion);
    //         };
    //         map.setView([datum.lat, datum.lng], 15);
    //         if (map._layers[datum.id]) {
    //             map._layers[datum.id].fire("click");
    //         };
    //     };
    //     if (datum.source === "GeoNames") {
    //         map.setView([datum.lat, datum.lng], 14);
    //     };
    //     if ($(".navbar-collapse").height() > 50) {
    //         $(".navbar-collapse").collapse("hide");
    //     };
    // }).on("typeahead:opened", function () {
    //     $(".navbar-collapse.in").css("max-height", $(document).height() - $(".navbar-header").height());
    //     $(".navbar-collapse.in").css("height", $(document).height() - $(".navbar-header").height());
    // }).on("typeahead:closed", function () {
    //     $(".navbar-collapse.in").css("max-height", "");
    //     $(".navbar-collapse.in").css("height", "");
    // });
    // $(".twitter-typeahead").css("position", "static");
    // $(".twitter-typeahead").css("display", "block");
//});

