url="/data/subwayLines.geojson";
$.getJSON(url, function (data) {
  subwayLines.addData(data);
});