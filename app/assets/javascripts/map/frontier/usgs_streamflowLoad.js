$.getJSON("/data/usgs_streamflow.geojson", function(data) {     
          usgs_streamflow.addData(data);
});