//page_chartAddD3Layer.js
/*
 * This code is being used for the display document page or show page for a particular data product
 */

function formatNumber(number) {
	return parseFloat(Math.round(number * 100) / 100).toFixed(2);
}

// element which will display results, configuration for chart, id element for
// the chart element, chart title, county fips code, URL for data product
// content
// Label to put on y axis, format of value, start year, end year, color of line
function updateChart(data, resultsElementId, config, chartId, title, region,
		yLabel, valueFormat, startYear, endYear, color) {

	console.log(yLabel + '|' + yLabel.indexOf("Temp"));

	// var zoom = d3.behavior.zoom()
	// .scaleExtent([1, 10])
	// .on("zoom", zoomed);

	var parseDate = d3.time.format("%Y").parse, formatDate = d3.time
			.format("%Y");

	// //x-axis - time - establishes it's date/time data
	var x = d3.time.scale().range([ 0, Number(config.w - 50) ]);

	// //y-axis - variable - temperature, precipitation, etc. - establishes it's
	// numeric values
	var y0 = d3.scale.linear().range([ config.h, 0 ]);
	var y1 = d3.scale.linear().range([ config.h, 0 ]);

	// filter for year
	// using number here instead of date object
	var filteredData = data.data
			.filter(function(d) {
				return (Number(d[0]) >= Number(startYear) && Number(d[0]) <= Number(endYear));
			});

	// re-map data array for plotting x/y coordinates
	// filters for region and converts year number to date object
	filteredData = filteredData.map(function(d) {
		return [ parseDate(d[0]), d[2][region] ]
	});

	// create summary line
	var line = d3.svg.line()
	// .defined(function (d,i) {
	// if (i<5) return false
	// d[2][region] = d3.mean(data.data.slice(i-5,i).map(function (x) {return
	// x[1]} ))
	// return true
	// })
	.interpolate("bundle").x(function(d) {
		return x(d[0]);
	}).y(function(d) {
		return yLabel.indexOf("Temp") > -1 ? y0(d[1]) : y1(d[1]);
	});

	// establish set range for y-axis for comparison between charts
	var d = new Date();
	x.domain([ d.setFullYear(1890), d.setFullYear(2015) ]);
	y0.domain([ 25, 65 ]);
	y1.domain([ 20, 60 ]);

	// get chart
	
	var svg = d3.select("#" + chartId)
	// var svg = config.svg
	.append("g").attr("transform",
			"translate(" + config.m.left + "," + config.m.top + ")");
	console.log("results element id " + resultsElementId);
	// add the tooltip area to the webpage
	var tooltip = d3.select("#" + resultsElementId).append("div").attr("class", "tooltip")
			.style("opacity", 0);

	// console.log(cData);

	// draw scatterplot
	var circles = svg.selectAll("circle").data(filteredData).enter().append(
			"circle").attr("cx", function(d) {
		return x(d[0]);
	}).attr("cy", function(d) {
		return yLabel.indexOf("Temp") > -1 ? y0(d[1]) : y1(d[1]);
	}).attr("r", "4px").attr("class", "data-point").attr("data-legend",
			function(d) {
				return title
			}).style("fill", color).style("opacity", .6).on(
			"mouseover",
			function(d) {
				tooltip.transition().duration(200).style("opacity", 1.0);
				tooltip.html(
						"Year: " + formatDate(d[0]) + "<br/> " + yLabel + ": "
								+ formatNumber(d[1], 2)).style("left",
						d3.select(this).attr("cx") + "px").style("top",
						(d3.event.pageY - 250) + "px");

			}).on("mouseout", function(d) {
		tooltip.transition().duration(500).style("opacity", 0);
	});

	// draw interpolation line
	svg.append("path").datum(filteredData).attr("class", "line")
			.attr("d", line);

	var legend = svg.append("g").attr("class", "legend")
	// .attr("transform","translate(" + w-200 + ",10)")
	.attr("transform", "translate(" + 320 + ",10)").style("font-size", "12px")
			.call(d3.legend)

} // end addData()

function clearCharts(chartId) {

var chartElement = $("#chartId");
	  if (chartElement != null) { //Some chart exists
	    d3.selectAll("svg").remove();
	  }

}

