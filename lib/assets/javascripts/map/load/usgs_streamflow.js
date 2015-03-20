url="http://frontierspatial.com/data/usgs_streamflow2geojson.php?callback=?";
$.getJSON(url, function(data) {     
          usgs_streamflow.addData(data);
});