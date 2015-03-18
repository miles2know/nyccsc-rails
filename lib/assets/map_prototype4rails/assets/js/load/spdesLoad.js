$.getJSON("data/spdes.geojson", function(data) {     
    //allPoints.addData(data);

          spdesInput.addData(data);
          spdes.addLayer(spdesInput);

});