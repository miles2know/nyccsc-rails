//PRISMtmax_slope = L.imageOverlay('data/PRISMtmax_slope/frame0.png', [[40.395,-80.06],[47.395,-66.979]],{opacity:0.5});
/* function for PRISM slider   */
$( "#tools-PRISMtmax_slope" ).append('<div><label for="amount-PRISMtmax_slope">Mean Max. Temp. Trend (Monthly):</label><input type="text" id="amount-PRISMtmax_slope" readonly style="border:0; color:#f6931f; font-weight:bold;"></div><div id="slider-PRISMtmax_slope"></div>' );

$(function() {
    $( "#slider-PRISMtmax_slope" ).slider({
      value:1,
      min: 1,
      max: 12,
      step: 1,
      slide: function( event, ui ) {
        $( "#amount-PRISMtmax_slope" ).val( "month " + ui.value );
	    map.removeLayer(PRISMtmax_slope);
	    PRISMtmax_slope = new L.TileLayer.WMS("http://beierlab.net:8081/thredds/wms/monthly/Prism/PRISMComputedDataAllMonths_1980to2009.nc?service=WMS", {
		  version:'1.3.0',
		  layers: 'tmax_slope',
		  COLORSCALERANGE:'-0.2,0.24',
		  //SRS:'ESPG:4326',
		  //CRS:'CRS:84',
		  format:'image/png',
		  styles:'BOXFILL/redblue',
		  TIME:'2009-' +  ui.value + '-01T00:00:00.000Z',
		  transparent: true,
		  opacity: .75,
		  zIndex: 100
		});  

	    /*PRISMtmax_slope = L.imageOverlay('data/PRISMtmax_slope/frame' +  ($( "#slider" ).slider( "value" )) + '.png', [[40.395,-80.06],[47.395,-66.979]],{opacity:0.5});*/
	    map.addLayer(PRISMtmax_slope);      


      }
    });
    $( "#amount-PRISMtmax_slope" ).val( "month " + $( "#slider-PRISMtmax_slope" ).slider( "value" ) );

  });



