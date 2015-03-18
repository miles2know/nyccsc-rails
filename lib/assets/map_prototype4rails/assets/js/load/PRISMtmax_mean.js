//PRISMtmax_slope = L.imageOverlay('data/PRISMtmax_slope/frame0.png', [[40.395,-80.06],[47.395,-66.979]],{opacity:0.5});
/* function for PRISM slider   */
$( "#tools-PRISMtmax_mean" ).append('<div><label for="amount-PRISMtmax_mean">Mean Max. Temp. (Monthly):</label><input type="text" id="amount-PRISMtmax_mean" readonly style="border:0; color:#f6931f; font-weight:bold;"></div><div id="slider-PRISMtmax_mean"></div>' );

$(function() {
    $( "#slider-PRISMtmax_mean" ).slider({
      value:1,
      min: 1,
      max: 12,
      step: 1,
      slide: function( event, ui ) {
        $( "#amount-PRISMtmax_mean" ).val( "Month " + ui.value );
	   
	    map.removeLayer(PRISMtmax_mean);
	    PRISMtmax_mean = new L.TileLayer.WMS("http://beierlab.net:8081/thredds/wms/monthly/Prism/PRISMComputedDataAllMonths_1980to2009.nc?service=WMS", {
		  version:'1.3.0',
		  layers: 'tmax_mean',
		  COLORSCALERANGE:'-10,30',
		  //SRS:'ESPG:4326',
		  //CRS:'CRS:84',
		  format:'image/png',
		  styles:'BOXFILL/rainbow',
		  TIME:'2009-' + ui.value  + '-01T00:00:00.000Z',
		  transparent: true,
		  opacity: .75,
		  zIndex: 100
		});  

	    /*PRISMtmax_slope = L.imageOverlay('data/PRISMtmax_slope/frame' +  ($( "#slider" ).slider( "value" )) + '.png', [[40.395,-80.06],[47.395,-66.979]],{opacity:0.5});*/
	    map.addLayer(PRISMtmax_mean);      


      }
    });
    $( "#amount-PRISMtmax_mean" ).val( "month " + $( "#slider-PRISMtmax_mean" ).slider( "value" ) );

  });



