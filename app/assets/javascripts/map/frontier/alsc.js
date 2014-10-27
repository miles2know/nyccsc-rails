//alsc
var alsc = new L.MarkerClusterGroup({
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: true,
    zoomToBoundsOnClick: true,
    disableClusteringAtZoom: 11//,
    // iconCreateFunction: function (cluster) {
    //     return new L.DivIcon({
    //         html: cluster.getChildCount(),
    //         className: 'alscCluster',
    //         iconSize: new L.Point(40, 48)
    //     });
    // }
});


var alscInput = new L.GeoJSON(null, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            // icon: L.icon({
            //     iconUrl: '/assets/img/alsc.png',
            //     iconSize: [18, 21],
            //     iconAnchor: [12, 28],
            //     popupAnchor: [0, -25]
            // }),
            title: feature.properties.name
        });
    },
    onEachFeature: function (feature, layer) {

                //console.log(feature.geometry.coordinates[0][0])
                layer.bindPopup("<strong>" + feature.properties.name + "</strong><br>" + "Average pH:" + feature.properties.avgph +"<br>" + feature.properties.fishsurveydate + " Fish Survey:<br><i>" + feature.properties.specieslist  + "</i><br><a href='#' onclick='map.setView([" + feature.geometry.coordinates[1] + "," + feature.geometry.coordinates[0] + "], 15);'>Zoom to feature</a>" ,  {
                    closeButton: true

        })
/*        alscSearch.push({
            name: layer.feature.properties.name,
            source: "alsc",
            id: L.stamp(layer),
            lat: layer.feature.geometry.coordinates[1],
            lng: layer.feature.geometry.coordinates[0]
        });*/
    }
});

/*$.getJSON("data/alsc.geojson", function(data) {     
    //allPoints.addData(data);

          alscInput.addData(data);
          alsc.addLayer(alscInput);

});*/