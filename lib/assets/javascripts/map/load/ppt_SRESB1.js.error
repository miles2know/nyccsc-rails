//ppt_SRESB1 = L.imageOverlay('data/ppt_SRESB1/frame0.png', [[40.395,-80.06],[47.395,-66.979]],{opacity:0.5});
/* function for PRISM slider   */
/*$( "#panel-legend-ppt_SRESB1" ).append('<div><label for="amount-ppt_SRESB1">Mean Max. Temp. Trend (Monthly):</label><input type="text" id="amount-ppt_SRESB1" readonly style="border:0; color:#f6931f; font-weight:bold;"></div><div id="slider-ppt_SRESB1"></div>' );*/


$( "#tools-ppt_SRESB1" ).append('<div><form action="#"><fieldset><label for="speed">Time Frame  </label ></div><div><select name="speed" id="speed" style="width:200px;"><option value="near_2039" selected="selected">Near (2020-2039)</option><option value="mid_2059">Mid (2040-2059)</option><option value="end_2099">End (2080-2099)</option></select></div>');

$(function() {
  $( "#speed" ).selectmenu({
       change: function(event, data) {
        var split = data.item.value.split("_");
		var timeframe = split[0];
		var date = split[1];
        //console.log(v1,' ',v2)
        var url = "http://tds.gisclimatechange.ucar.edu/thredds/wms/products/files/ppt_SRESB1_" + timeframe + "_seasonal_down_anomaly.nc?service=WMS";
        var time= date + "-02-15T00:00:00Z"; 
        //console.log(data)
        map.removeLayer(ppt_SRESB1);
	    ppt_SRESB1 = new L.TileLayer.WMS(url, {
		  version:'1.3.0',
		  layers: 'ppt',
		  COLORSCALERANGE:'-10,30',
		  //SRS:'ESPG:4326',
		  //CRS:'CRS:84',
		  format:'image/png',
		  styles:'BOXFILL/ppt',
		  TIME:time,
		  transparent: true,
		  opacity: .75,
		  zIndex: 100
		});  

	    map.addLayer(ppt_SRESB1);    
       }
     });
});

/*$(function() {
    $( "#slider-ppt_SRESB1" ).slider({
      value:1,
      min: 1,
      max: 12,
      step: 1,
      slide: function( event, ui ) {
        $( "#amount-ppt_SRESB1" ).val( "month " + ui.value );
	    map.removeLayer(ppt_SRESB1);
	    ppt_SRESB1 = new L.TileLayer.WMS("http://tds.gisclimatechange.ucar.edu/thredds/wms/products/files/ppt_SRESB1_near_seasonal_down_anomaly.nc?service=WMS", {
		  version:'1.3.0',
		  layers: 'ppt',
		  COLORSCALERANGE:'-20,20',
		  //SRS:'ESPG:4326',
		  //CRS:'CRS:84',
		  format:'image/png',
		  styles:'BOXFILL/ppt',
		  TIME:'2039-' + ui.value + '-15T00:00:00Z',
		  transparent: true,
		  opacity: .75,
		  zIndex: 100
		});  

	    map.addLayer(ppt_SRESB1);      


      }
    });
    $( "#amount-ppt_SRESB1" ).val( "month " + $( "#slider-ppt_SRESB1" ).slider( "value" ) );

  });*/



