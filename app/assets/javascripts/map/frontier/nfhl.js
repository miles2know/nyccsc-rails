//Bring in FEMA NFHL WMS layer

/*var nfhl = new L.TileLayer.WMS(
    
    "https://hazards.fema.gov/gis/nfhl/services/public/NFHLWMS/MapServer/WMSServer",
    {layers: '4',
    opacity:0.25,
	zIndex:3}
  );*/

var nfhl =  L.esri.dynamicMapLayer("http://www.hazards.fema.gov/gis/nfhl/rest/services/public/NFHL/MapServer", {
opacity: 0.50,
zIndex:-100,
clickable: false,
attribution: 'USGS National Gap Analysis Program'
});

nfhl.bringToBack();
/*var fema100 =  L.esri.dynamicMapLayer("http://maps3.arcgisonline.com/ArcGIS/rest/services/A-16/FEMA_100-Year_Flood_Zones_in_the_USA/MapServer", {
opacity: 0.50,
zIndex:0,
attribution: 'USGS National Gap Analysis Program'
});*/



// Custom vector layer showing parts of NY not included in NFHL
/*var nfhl_not_covered = new L.GeoJSON(null, {
    style: {
                clickable: false,
                weight: 0,
                color: 'black',
                opacity: 1,
                fill: true,
                fillOpacity: 0.15

    }
});

$.getJSON("data/nfhl_not_covered.geojson", function (data) {
    nfhl_not_covered.addData(data);
});

var nfhlLayerGroup = L.layerGroup([nfhl,nfhl_not_covered])*/