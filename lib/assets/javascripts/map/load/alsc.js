url="data/alsc.geojson";
$.getJSON(url, function(data) {     
          alscInput.addData(data);         
          alsc.addLayer(alscInput);
});