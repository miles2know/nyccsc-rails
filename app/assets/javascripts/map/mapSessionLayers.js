//context overlay options
//stored as session variables - or - part of it anyway

var sessionLayers =  
[
    {
        id : 'alsc',
        title : 'Adirondack Lakes Survey Corp',
        format : 'geojson',
        geometry : "Point",
        type : "Cluster",
        proxy : true,
        gisData : "alsc2geojson",
        metaData : {
          icon : "Marker",
          icon_cluster : "Default",
          colorHue : "Bl"
        }
    },
    {
        id : 'historicdeclarations_ny',
        title : 'FEMA Historic Declared Emergencies',
        format : 'geojson',
        geometry : "Polygon",
        type: "Color",
        proxy : true,
        gisData : "historicdeclarations_ny2geojson",
        metaData : { 
          icon : "N/A",
          dataProp : "total1964_2013",
          measure : "Declared Emergencies fr. 1964-2013",
          intervals : [0, 1, [2,4], [5,9], [10,14], [15,19], 20],
          colorHue : "YlOrRd"
        }
    },
    {
        id : 'nfhl',
        title : 'FEMA Flood Hazards',
        format : 'tiles', //geometry, type, icon n/a
        proxy : false,
        gisData : "http://www.hazards.fema.gov/gis/nfhl/rest/services/public/NFHL/MapServer",
        metaData : {
          legend : "/img/nfhlLegend.png"
        }
    },
    {
        id : 'spdes',
        title : 'Waste Treatment Plants',
        format : 'geojson',
        geometry : "Point",
        type: "Cluster",
        proxy : true,
        gisData : "spdes2geojson",
        metaData : {
          icon : "Custom",
          iconUrl : "/img/sewer-pipe.png",
          icon_cluster : "/img/sewer-pipe.png",
          legend : "/img/sewer-pipe.png"
        }
    },
    {
        id : 'usgs_streamflow',
        title : 'USGS Stream Gages',
        format : 'geojson',
        geometry : "Point",
        type : "Color",
        proxy : true,
        gisData : "usgs_streamflow2geojson",
        metaData : {
          icon : "Circle",
          dataProp : "class",
          measure : "Class",
          intervals : [1,[2,4],5,[6,8],9],
          colorHue : "Spectral"
        }
    },
];
