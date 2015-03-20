url="/data/ny_dot.topojson";
$.getJSON(url, function (data) {
    ny_dot.addData(data);
});
