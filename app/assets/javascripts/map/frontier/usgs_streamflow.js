
function getGageColors(d) {
            return d == 0 ? '#FFFFFF' :
                   d == 1 ? '#FF0000' :
                   d == 2 ? '#B12121' :
                   d == 3 ? '#B12121' :
                   d == 4 ? '#FFA400' :
                   d == 5 ? '#00FF00' :
                   d == 6 ? '#40DFD0' :
                   d == 7 ? '#0000FF' :
                   d == 8 ? '#000' :
                           '#FFEDA0' ;
        }


// gage
var usgs_streamflow = new L.GeoJSON(null, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng,  {
          title: feature.properties.name,
          radius: 6,
          fillColor: getGageColors(feature.properties.class),
          fillOpacity: 0.8,
          color: getGageColors(feature.properties.class),
          weight: 1,
          opacity: 1,
          zIndex:100
      });
    },
    onEachFeature: function (feature, layer) {
        if (feature.properties) {
            layer.bindPopup("<b>" + feature.properties.name + "</b></br>Updated: " + feature.properties.date + " @ "+ feature.properties.time + "</br>Stage: " + feature.properties.stage + "</br>Discharge: " + feature.properties.discharge +  "</br><a href='" + feature.properties.url + "' target='_blank_'>Link</a>", {
               closeButton: true
            });
        }
        // layer.on("mouseover", function(e) { layer.setStyle( fillOpacity: 1 ) });
        // layer.on("mouseout", function(e) { layer.setStyle( fillOpacity: 0.8) });
/*        gagesearch.push({
            name: layer.feature.properties.NAME,
            source: "place",
            id: L.stamp(layer),
            lat: layer.feature.geometry.coordinates[1],
            lng: layer.feature.geometry.coordinates[0]
        });*/
    }
});
/*
$.getJSON("data/usgs_streamflow.geojson", function(data) {     
          usgs_streamflow.addData(data);
});*/