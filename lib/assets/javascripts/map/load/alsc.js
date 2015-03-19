$.getJSON("/data/alsc.geojson", function(data) {     
          alscInput.addData(data);         
          alsc.addLayer(alscInput);
});