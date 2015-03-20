url="/data/ny_clim_div.topojson";
$.getJSON(url, function (data) {
    ny_clim_div.addData(data);
});
