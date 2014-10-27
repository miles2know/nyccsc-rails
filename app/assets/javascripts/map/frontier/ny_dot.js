var ny_dotSearch=[];

var ny_dot = new L.TopoJSON(null, {
    style: {
            clickable: true,
            weight: 2,
            color: 'brown',
            opacity: 1,
            fill: true,
            fillOpacity: 0
    },
            

    onEachFeature: function (feature, layer) {
        ny_dotSearch.push({
            name: "DOT Region " + layer.feature.id,
            source: "ny_dot", 
            id: L.stamp(layer),
            bounds: layer.getBounds(),
            lat: layer.getBounds().getSouthWest().lat,
            lng: layer.getBounds().getSouthWest().lng,
            bounds: layer.getBounds()
        });

        if (feature.properties) {
        
            layer.bindPopup(
                "<strong>DOT Region " + feature.id + "</strong>" ,  {
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
                dot.resetStyle(e.target);
            }
        });*/

    }
});

$.getJSON("/data/ny_dot.topojson", function (data) {
    ny_dot.addData(data);
});
