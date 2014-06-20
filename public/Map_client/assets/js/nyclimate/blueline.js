///////////UMPs


var blueline = new L.GeoJSON(null, {
    style: {
                clickable: false,
                weight: 2,
                color: 'blue',
                opacity: 1,
                fill: true,
                fillOpacity: 0.0

    },

    onEachFeature: function (feature, layer) {
        

        if (feature.properties) {
            
/*            layer.bindPopup(
                "<strong>" + feature.properties.name + " " + feature.properties.class +
                "<i></br>" + feature.properties.ump_url + "</i>",  {
                closeButton: false
            });*/
        }

    }
});

$.getJSON("data/adkwebmap/blueline.geojson", function (data) {
    blueline.addData(data);
});