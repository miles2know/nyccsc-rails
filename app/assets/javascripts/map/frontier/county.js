var countySearch=[];

var county = new L.TopoJSON(null, {
    style: {
            clickable: true,
            weight: 2,
            color: 'black',
            opacity: 1,
            fill: true,
            fillOpacity: 0
    },
            

    onEachFeature: function (feature, layer) {
        countySearch.push({
            name: layer.feature.id + " County",
            source: "county",
            id: L.stamp(layer),
            bounds: layer.getBounds(),
            lat: layer.getBounds().getSouthWest().lat,
            lng: layer.getBounds().getSouthWest().lng,
            bounds: layer.getBounds()
        });

        if (feature.properties) {
        
            layer.bindPopup(
                "<strong>" + feature.id + " County</strong>" ,  {
                closeButton: false
            });
        }
/*        layer.on({
            mouseover: function(e) {
                var layer = e.target;
                layer.setStyle({
                    weight: 3,
                    color: "#00FFFF",
                    opacity: 1
                });
                if (!L.Browser.ie && !L.Browser.opera) {
                    layer.bringToFront();
                }
            },
            mouseout: function(e) {
                county.resetStyle(e.target);
            }
        });*/

    }
});

$.getJSON("/data/ny_counties_tiger.topojson", function (data) {
    county.addData(data);
});
