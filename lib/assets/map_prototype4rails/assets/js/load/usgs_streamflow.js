$.getJSON("http://frontierspatial.com/data/usgs_streamflow2geojson.php?callback=?", function(data) {     
          usgs_streamflow.addData(data);
});