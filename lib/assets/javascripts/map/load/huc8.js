url="/data/basin.geojson";
$.getJSON(url, function (data) {
    huc8.addData(data);
});