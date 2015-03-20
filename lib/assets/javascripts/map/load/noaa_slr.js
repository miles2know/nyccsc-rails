/* NOAA SLR Controls   */
$( "#tools-noaa_slr" ).empty();
map.removeLayer(noaa_slr);
//Create divs for combobox, legend and slider
$( "#tools-noaa_slr" ).append('<div><form action="#"><fieldset></div><div><select name="layer" id="layer" style="width:200px;"><option value="slr" selected="selected">Sea Level Rise</option><option value="conf">Confidence</option></select></div><div id="noaa-slr-legend"></div><div><label for="amount-noaa_slr"></label><input type="text" id="amount-noaa_slr" readonly style="border:0; color:#f6931f; font-weight:bold;"></div><div id="slider-noaa_slr"></div>' );

//set initial values for variables
var amt=0;
var layer='slr';
redrawLayer(amt,layer);
$("#amount-noaa_slr" ).val("0 ft. above MHHW"  );
$("#noaa-slr-legend").append('<img src="assets/img/noaa_slrLegend.jpg">');

//redraw map on slider change
$(function() {
  $( "#slider-noaa_slr" ).slider({
    value:0,
    min: 0,
    max: 6,
    step: 1,
    slide: function( event, ui ) {
      $( "#amount-noaa_slr" ).val( ui.value + " ft. above MHHW"  );   
      amt = ui.value;
      map.removeLayer(noaa_slr);
      redrawLayer(amt,layer); 
    }
  });
});

//redraw map on combobox change
$(function() {
  $( "#layer" ).selectmenu({
    change: function(event, data) {      
      map.removeLayer(noaa_slr);
      layer = data.item.value;
      $("#noaa-slr-legend").empty();
      $("#noaa-slr-legend").append('<img src="assets/img/noaa_' + layer + 'Legend.jpg">');
      redrawLayer(amt,layer) 
    }
  });
});


function redrawLayer(amt,layer) {
      //console.log('amt:',amt,' layer',layer)
      noaa_slr =  L.esri.dynamicMapLayer("http://maps2.coast.noaa.gov/arcgis/rest/services/dc_slr/" + layer + "_" + amt + "ft/MapServer", {
      opacity: 1,
      zIndex:-100,
      clickable: false,
      attribution: 'NOAA Sea Level Rise Viewer'
      });

      map.addLayer(noaa_slr);  
      noaa_slr.bringToBack();
};

