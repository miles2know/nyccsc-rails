//spdes
var spdes = new L.MarkerClusterGroup({
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: true,
    disableClusteringAtZoom: 11,
    iconCreateFunction: function (cluster) {
        return new L.DivIcon({
            html: cluster.getChildCount(),
            className: 'spdesCluster',
            iconSize: new L.Point(45, 45)
        });
    }
});


var spdesInput = new L.GeoJSON(null, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: L.icon({
                iconUrl: '/assets/img/sewer-pipe.png',
                iconSize: [18, 21],
                iconAnchor: [12, 28],
                popupAnchor: [0, -25]
            }),
            title: feature.properties.name
        });
    },
    onEachFeature: function (feature, layer) {

                //console.log(feature.geometry.coordinates[0][0])
                layer.bindPopup(feature.properties.name + "<br><a href='#' onclick='map.setView([" + feature.geometry.coordinates[1] + "," + feature.geometry.coordinates[0] + "], 15);'>Zoom to feature</a>" ,  {
                    closeButton: true

        })
/*        spdesSearch.push({
            name: layer.feature.properties.name,
            source: "spdes",
            id: L.stamp(layer),
            lat: layer.feature.geometry.coordinates[1],
            lng: layer.feature.geometry.coordinates[0]
        });*/
    }
});

/*$.getJSON("data/spdes.geojson", function(data) {     
    //allPoints.addData(data);

          spdesInput.addData(data);
          spdes.addLayer(spdesInput);

});*/