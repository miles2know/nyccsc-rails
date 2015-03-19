//PRISMtmax_slope = L.imageOverlay('data/PRISMtmax_slope/frame0.png', [[40.395,-80.06],[47.395,-66.979]],{opacity:0.5});
/* function for PRISM slider   */
$( "#panel-legend-PRISMtmax_slope" ).append('<div><label for="amount">Regression Slope (Monthly):</label><input type="text" id="amount" readonly style="border:0; color:#f6931f; font-weight:bold;"></div><div id="slider"></div>' );

$(function() {
    $( "#slider" ).slider({
      value:1,
      min: 1,
      max: 12,
      step: 1,
      slide: function( event, ui ) {
        $( "#amount" ).val( "month " + ui.value );
		    map.removeLayer(PRISMtmax_slope);
		    PRISMtmax_slope = L.imageOverlay('data/PRISMtmax_slope/frame' +  ($( "#slider" ).slider( "value" )) + '.png', [[40.395,-80.06],[47.395,-66.979]],{opacity:0.5});
		    map.addLayer(PRISMtmax_slope);      


      }
    });
    $( "#amount" ).val( "month " + $( "#slider" ).slider( "value" ) );

  });



