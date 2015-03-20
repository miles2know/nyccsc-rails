url="/data/historicdeclarations_ny.geojson";
$.getJSON(url, function (data) {
    historicdeclarations_ny.addData(data);
});