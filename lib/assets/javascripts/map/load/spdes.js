url="/data/spdes.geojson";
$.getJSON(url, function(data) {     
  spdesInput.addData(data);
  spdes.addLayer(spdesInput);
});