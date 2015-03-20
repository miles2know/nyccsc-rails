webpackJsonp([0],{

/***/ 0:
/*!******************!*\
  !*** multi main ***!
  \******************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(/*! ./src/loader */4);


/***/ },

/***/ 4:
/*!***********************!*\
  !*** ./src/loader.js ***!
  \***********************/
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("/Users/noon/js/rails-fixture/node_modules/react-hot-loader/node_modules/react-hot-api/modules/index.js"), RootInstanceProvider = require("/Users/noon/js/rails-fixture/node_modules/react-hot-loader/RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }); })(); } (function () {
	
	"use strict";
	
	var React = __webpack_require__(/*! react */ 1);
	var definedExt = {
	  n12089: "n12089"
	};
	var uri = document.baseURI.split("/");
	var docId = uri[uri.length - 1];
	
	if (definedExt[docId]) {
	  var jsExt = __webpack_require__(/*! ./docJS */ 7)("./" + definedExt[docId]);
	  var rx = React.createElement(jsExt, { doc: {} });
	  React.render(rx, document.getElementById("document-extension"));
	}

	/* REACT HOT LOADER */ })(); if (false) { (function () { module.hot.dispose(function (data) { data.makeHot = module.makeHot; }); if (module.exports && module.makeHot) { var makeExportsHot = require("/Users/noon/js/rails-fixture/node_modules/react-hot-loader/makeExportsHot.js"), foundReactClasses = false; if (makeExportsHot(module)) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "loader.js" + ": " + err.message); } }); } } })(); }

/***/ },

/***/ 7:
/*!****************************!*\
  !*** ./src/docJS ^\.\/.*$ ***!
  \****************************/
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./n12089": 8,
		"./n12089.js": 8
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 7;


/***/ },

/***/ 8:
/*!*****************************!*\
  !*** ./src/docJS/n12089.js ***!
  \*****************************/
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("/Users/noon/js/rails-fixture/node_modules/react-hot-loader/node_modules/react-hot-api/modules/index.js"), RootInstanceProvider = require("/Users/noon/js/rails-fixture/node_modules/react-hot-loader/RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }); })(); } (function () {
	
	"use strict";
	
	var React = __webpack_require__(/*! react */ 1);
	var Immutable = __webpack_require__(/*! immutable */ 2);
	var d3 = __webpack_require__(/*! d3 */ 3);
	var request = __webpack_require__(/*! superagent */ 5);
	var _require = __webpack_require__(/*! react-d3-components */ 94);
	
	var ScatterPlot = _require.ScatterPlot;
	var LinePlot = _require.LinePlot;
	
	// var hcnstns = require('../hcnstns.json');
	var stns = __webpack_require__(/*! ../hcnstns.json */ 95).features.map(function (f) {
	  return f.properties;
	});
	
	var n12089Component = React.createClass({
	  displayName: "n12089Component",
	
	  propTypes: {
	    doc: React.PropTypes.object.isRequired
	  },
	
	  defaultParams: Immutable.fromJS({
	    sid: "USW00014735",
	    elems: [{ vX: 1, vN: 0, interval: [1, 0], duration: 3, reduce: "mean" }],
	    sdate: [1900, 2],
	    edate: "por"
	  }),
	
	  getInitialState: function getInitialState() {
	    // console.log('getInitialState')
	    return {
	      params: this.defaultParams,
	      results: null,
	      labels: Immutable.Map({
	        title: "Average Maximum Temperature",
	        stnName: "ALBANY INTL AP"
	      }),
	      stations: Immutable.List(stns)
	    };
	  },
	
	  componentDidMount: function componentDidMount() {
	    this.makeRequest(this.state.params.toJS());
	  },
	
	  componentDidUpdate: function componentDidUpdate(prevProps, prevState, prevContext) {},
	
	  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState, nextContext) {
	    var state = this.state;
	    if (state.params !== nextState.params) {
	      this.makeRequest(nextState.params.toJS());
	      return true;
	    }
	    if (state.params === nextState.params && state.labels === nextState.labels && state.results === nextState.results && state.stations === nextState.stations) {
	      return false;
	    }return true;
	  },
	
	  componentWillUnmount: function componentWillUnmount() {
	    React.unmountComponentAtNode(document.getElementById("chart"));
	  },
	
	  makeRequest: function makeRequest(params) {
	    var _this = this;
	
	    request.post("http://data.rcc-acis.org/StnData").send(params).accept("json").end(function (res) {
	      // console.log("StnData response");
	      _this.setState({ results: res.body });
	    });
	  },
	
	  renderChart: function renderChart() {
	    if (this.state.results) {
	      var xAccessor = function (row) {
	        return new Date(row[0]);
	      },
	          yAccessor = function (row) {
	        return +row[1];
	      },
	          data = [{ label: "MinT", values: this.state.results.data.filter(function (d) {
	          return d[1] != "M";
	        }) }];
	
	      var toolTip = function (x, y) {
	        return "" + x.getFullYear() + ": " + y + "°";
	      };
	
	      var chart = React.createElement(ScatterPlot, {
	        data: data,
	        width: 600,
	        height: 400,
	        margin: { top: 10, bottom: 50, left: 50, right: 10 },
	        x: xAccessor,
	        // xAxis={{label:"Year"}}
	        y: yAccessor,
	        // yAxis={{label:"Temperature"}}
	        tooltipHtml: toolTip
	      });
	
	      var labels = this.state.labels;
	      var panel = React.createElement(
	        "div",
	        null,
	        React.createElement(
	          "h3",
	          { style: { textAlign: "center" } },
	          labels.get("title")
	        ),
	        React.createElement(
	          "h4",
	          { style: { textAlign: "center" } },
	          labels.get("stnName")
	        ),
	        chart
	      );
	
	      // React.render(panel, document.getElementById("chart"));
	      return panel;
	    }
	  },
	
	  handleStation: function handleStation(sid, name) {
	    var p = this.state.params,
	        l = this.state.labels;
	    if (sid == p.get("sid")) {
	      return;
	    }var n = p.set("sid", sid);
	    this.setState({ params: n, labels: l.set("stnName", name) });
	  },
	
	  render: function render() {
	    var _this = this;
	
	    var stns = this.state.stations.map(function (stn) {
	      return React.createElement(
	        "option",
	        { key: stn.ghcn, value: stn.ghcn },
	        stn.name
	      );
	    });
	
	    return React.createElement(
	      "div",
	      null,
	      React.createElement(
	        "div",
	        { className: "row vertical-offset-md" },
	        React.createElement(
	          "div",
	          { className: "col-lg-3 col-md-3" },
	          React.createElement(
	            "div",
	            { className: "row" },
	            React.createElement(
	              "fieldset",
	              { style: { display: "inline" } },
	              React.createElement(
	                "label",
	                null,
	                "Station: "
	              ),
	              React.createElement(
	                "select",
	                {
	                  value: this.state.params.get("sid"),
	                  onChange: function (e) {
	                    return _this.handleStation(e.target.value, e.target.selectedOptions[0].innerText);
	                  }
	                },
	                stns.toJS()
	              )
	            )
	          )
	        ),
	        React.createElement(
	          "div",
	          { className: "col-lg-offset-1 col-lg-8 col-md-offset-1 col-md-8" },
	          this.renderChart()
	        )
	      )
	    );
	  }
	});
	
	console.log("loading n12089");
	
	module.exports = n12089Component;
	
	// this.renderChart();

	/* REACT HOT LOADER */ })(); if (false) { (function () { module.hot.dispose(function (data) { data.makeHot = module.makeHot; }); if (module.exports && module.makeHot) { var makeExportsHot = require("/Users/noon/js/rails-fixture/node_modules/react-hot-loader/makeExportsHot.js"), foundReactClasses = false; if (makeExportsHot(module)) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "n12089.js" + ": " + err.message); } }); } } })(); }

/***/ },

/***/ 94:
/*!********************************************!*\
  !*** ./~/react-d3-components/lib/index.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var BarChart = __webpack_require__(/*! ./BarChart */ 141);
	var PieChart = __webpack_require__(/*! ./PieChart */ 142);
	var ScatterPlot = __webpack_require__(/*! ./ScatterPlot */ 143);
	var LineChart = __webpack_require__(/*! ./LineChart */ 144);
	var AreaChart = __webpack_require__(/*! ./AreaChart */ 145);
	
	module.exports = {
	    BarChart: BarChart,
	    PieChart: PieChart,
	    ScatterPlot: ScatterPlot,
	    LineChart: LineChart,
	    AreaChart: AreaChart
	};

/***/ },

/***/ 95:
/*!**************************!*\
  !*** ./src/hcnstns.json ***!
  \**************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
		"type": "FeatureCollection",
		"features": [
			{
				"geometry": {
					"type": "Point",
					"coordinates": [
						-77.2344,
						42.1014
					]
				},
				"type": "Feature",
				"properties": {
					"state": "NY",
					"hcn": "USH00300023",
					"name": "ADDISON",
					"elev": 999,
					"ghcn": "USC00300023"
				},
				"id": "USH00300023"
			},
			{
				"geometry": {
					"type": "Point",
					"coordinates": [
						-73.8092,
						42.7431
					]
				},
				"type": "Feature",
				"properties": {
					"state": "NY",
					"hcn": "USH00300042",
					"name": "ALBANY INTL AP",
					"elev": 275,
					"ghcn": "USW00014735"
				},
				"id": "USH00300042"
			},
			{
				"geometry": {
					"type": "Point",
					"coordinates": [
						-77.785,
						42.2614
					]
				},
				"type": "Feature",
				"properties": {
					"state": "NY",
					"hcn": "USH00300085",
					"name": "ALFRED",
					"elev": 1770,
					"ghcn": "USC00300085"
				},
				"id": "USH00300085"
			},
			{
				"geometry": {
					"type": "Point",
					"coordinates": [
						-78.75,
						42.1003
					]
				},
				"type": "Feature",
				"properties": {
					"state": "NY",
					"hcn": "USH00300093",
					"name": "ALLEGANY SP",
					"elev": 1500,
					"ghcn": "USC00300093"
				},
				"id": "USH00300093"
			},
			{
				"geometry": {
					"type": "Point",
					"coordinates": [
						-77.9889,
						42.3017
					]
				},
				"type": "Feature",
				"properties": {
					"state": "NY",
					"hcn": "USH00300183",
					"name": "ANGELICA",
					"elev": 1445,
					"ghcn": "USC00300183"
				},
				"id": "USH00300183"
			},
			{
				"geometry": {
					"type": "Point",
					"coordinates": [
						-76.5447,
						42.9328
					]
				},
				"type": "Feature",
				"properties": {
					"state": "NY",
					"hcn": "USH00300321",
					"name": "AUBURN",
					"elev": 770,
					"ghcn": "USC00300321"
				},
				"id": "USH00300321"
			},
			{
				"geometry": {
					"type": "Point",
					"coordinates": [
						-78.1692,
						43.0303
					]
				},
				"type": "Feature",
				"properties": {
					"state": "NY",
					"hcn": "USH00300443",
					"name": "BATAVIA",
					"elev": 913,
					"ghcn": "USC00300443"
				},
				"id": "USH00300443"
			},
			{
				"geometry": {
					"type": "Point",
					"coordinates": [
						-75.98,
						42.2067
					]
				},
				"type": "Feature",
				"properties": {
					"state": "NY",
					"hcn": "USH00300687",
					"name": "BINGHAMTON GREATER AP",
					"elev": 1595,
					"ghcn": "USW00004725"
				},
				"id": "USH00300687"
			},
			{
				"geometry": {
					"type": "Point",
					"coordinates": [
						-72.3067,
						40.9464
					]
				},
				"type": "Feature",
				"properties": {
					"state": "NY",
					"hcn": "USH00300889",
					"name": "BRIDGEHAMPTON",
					"elev": 60,
					"ghcn": "USC00300889"
				},
				"id": "USH00300889"
			},
			{
				"geometry": {
					"type": "Point",
					"coordinates": [
						-77.9333,
						43.2
					]
				},
				"type": "Feature",
				"properties": {
					"state": "NY",
					"hcn": "USH00300937",
					"name": "BROCKPORT",
					"elev": 535,
					"ghcn": "USC00300937"
				},
				"id": "USH00300937"
			},
			{
				"geometry": {
					"type": "Point",
					"coordinates": [
						-78.7358,
						42.9408
					]
				},
				"type": "Feature",
				"properties": {
					"state": "NY",
					"hcn": "USH00301012",
					"name": "BUFFALO NIAGARA INTL",
					"elev": 705,
					"ghcn": "USW00014733"
				},
				"id": "USH00301012"
			},
			{
				"geometry": {
					"type": "Point",
					"coordinates": [
						-75.1097,
						44.5772
					]
				},
				"type": "Feature",
				"properties": {
					"state": "NY",
					"hcn": "USH00301185",
					"name": "CANTON 4 SE",
					"elev": 448,
					"ghcn": "USW00014743"
				},
				"id": "USH00301185"
			},
			{
				"geometry": {
					"type": "Point",
					"coordinates": [
						-73.3953,
						44.8786
					]
				},
				"type": "Feature",
				"properties": {
					"state": "NY",
					"hcn": "USH00301401",
					"name": "CHAZY",
					"elev": 157,
					"ghcn": "USC00301401"
				},
				"id": "USH00301401"
			},
			{
				"geometry": {
					"type": "Point",
					"coordinates": [
						-74.9267,
						42.7167
					]
				},
				"type": "Feature",
				"properties": {
					"state": "NY",
					"hcn": "USH00301752",
					"name": "COOPERSTOWN",
					"elev": 1257,
					"ghcn": "USC00301752"
				},
				"id": "USH00301752"
			},
			{
				"geometry": {
					"type": "Point",
					"coordinates": [
						-76.1833,
						42.6
					]
				},
				"type": "Feature",
				"properties": {
					"state": "NY",
					"hcn": "USH00301799",
					"name": "CORTLAND",
					"elev": 1129,
					"ghcn": "USC00301799"
				},
				"id": "USH00301799"
			},
			{
				"geometry": {
					"type": "Point",
					"coordinates": [
						-73.7206,
						44.7192
					]
				},
				"type": "Feature",
				"properties": {
					"state": "NY",
					"hcn": "USH00301966",
					"name": "DANNEMORA",
					"elev": 1340,
					"ghcn": "USC00301966"
				},
				"id": "USH00301966"
			},
			{
				"geometry": {
					"type": "Point",
					"coordinates": [
						-77.7175,
						42.5656
					]
				},
				"type": "Feature",
				"properties": {
					"state": "NY",
					"hcn": "USH00301974",
					"name": "DANSVILLE",
					"elev": 660,
					"ghcn": "USC00301974"
				},
				"id": "USH00301974"
			},
			{
				"geometry": {
					"type": "Point",
					"coordinates": [
						-75.4264,
						42.0628
					]
				},
				"type": "Feature",
				"properties": {
					"state": "NY",
					"hcn": "USH00302060",
					"name": "DEPOSIT",
					"elev": 1000,
					"ghcn": "USC00302060"
				},
				"id": "USH00302060"
			},
			{
				"geometry": {
					"type": "Point",
					"coordinates": [
						-73.8344,
						41.0072
					]
				},
				"type": "Feature",
				"properties": {
					"state": "NY",
					"hcn": "USH00302129",
					"name": "DOBBS FERRY ARDSLEY",
					"elev": 200,
					"ghcn": "USC00302129"
				},
				"id": "USH00302129"
			},
			{
				"geometry": {
					"type": "Point",
					"coordinates": [
						-76.8358,
						42.0997
					]
				},
				"type": "Feature",
				"properties": {
					"state": "NY",
					"hcn": "USH00302610",
					"name": "ELMIRA",
					"elev": 947,
					"ghcn": "USC00302610"
				},
				"id": "USH00302610"
			},
			{
				"geometry": {
					"type": "Point",
					"coordinates": [
						-79.312,
						42.4497
					]
				},
				"type": "Feature",
				"properties": {
					"state": "NY",
					"hcn": "USH00303033",
					"name": "FREDONIA",
					"elev": 760,
					"ghcn": "USC00303033"
				},
				"id": "USH00303033"
			},
			{
				"geometry": {
					"type": "Point",
					"coordinates": [
						-77.0308,
						42.8767
					]
				},
				"type": "Feature",
				"properties": {
					"state": "NY",
					"hcn": "USH00303184",
					"name": "GENEVA RSCH FARM",
					"elev": 718,
					"ghcn": "USC00303184"
				},
				"id": "USH00303184"
			},
			{
				"geometry": {
					"type": "Point",
					"coordinates": [
						-73.9333,
						41.5167
					]
				},
				"type": "Feature",
				"properties": {
					"state": "NY",
					"hcn": "USH00303259",
					"name": "GLENHAM",
					"elev": 275,
					"ghcn": "USC00303259"
				},
				"id": "USH00303259"
			},
			{
				"geometry": {
					"type": "Point",
					"coordinates": [
						-74.3592,
						43.0492
					]
				},
				"type": "Feature",
				"properties": {
					"state": "NY",
					"hcn": "USH00303319",
					"name": "GLOVERSVILLE",
					"elev": 810,
					"ghcn": "USC00303319"
				},
				"id": "USH00303319"
			},
			{
				"geometry": {
					"type": "Point",
					"coordinates": [
						-77.6083,
						42.7747
					]
				},
				"type": "Feature",
				"properties": {
					"state": "NY",
					"hcn": "USH00303773",
					"name": "HEMLOCK",
					"elev": 902,
					"ghcn": "USC00303773"
				},
				"id": "USH00303773"
			},
			{
				"geometry": {
					"type": "Point",
					"coordinates": [
						-74.2692,
						43.755
					]
				},
				"type": "Feature",
				"properties": {
					"state": "NY",
					"hcn": "USH00304102",
					"name": "INDIAN LAKE 2SW",
					"elev": 1660,
					"ghcn": "USC00304102"
				},
				"id": "USH00304102"
			},
			{
				"geometry": {
					"type": "Point",
					"coordinates": [
						-76.4489,
						42.4489
					]
				},
				"type": "Feature",
				"properties": {
					"state": "NY",
					"hcn": "USH00304174",
					"name": "ITHACA CORNELL UNIV",
					"elev": 960,
					"ghcn": "USC00304174"
				},
				"id": "USH00304174"
			},
			{
				"geometry": {
					"type": "Point",
					"coordinates": [
						-73.9847,
						44.2444
					]
				},
				"type": "Feature",
				"properties": {
					"state": "NY",
					"hcn": "USH00304555",
					"name": "LAKE PLACID 2 S",
					"elev": 1940,
					"ghcn": "USC00304555"
				},
				"id": "USH00304555"
			},
			{
				"geometry": {
					"type": "Point",
					"coordinates": [
						-74.6692,
						44.7583
					]
				},
				"type": "Feature",
				"properties": {
					"state": "NY",
					"hcn": "USH00304647",
					"name": "LAWRENCEVILLE 3 SW",
					"elev": 466,
					"ghcn": "USC00304647"
				},
				"id": "USH00304647"
			},
			{
				"geometry": {
					"type": "Point",
					"coordinates": [
						-74.8686,
						43.0603
					]
				},
				"type": "Feature",
				"properties": {
					"state": "NY",
					"hcn": "USH00304791",
					"name": "LITTLE FALLS CITY RSVR",
					"elev": 900,
					"ghcn": "USC00304791"
				},
				"id": "USH00304791"
			},
			{
				"geometry": {
					"type": "Point",
					"coordinates": [
						-74.8667,
						43.0333
					]
				},
				"type": "Feature",
				"properties": {
					"state": "NY",
					"hcn": "USH00304796",
					"name": "LITTLE FALLS MILL ST",
					"elev": 360,
					"ghcn": "USC00304796"
				},
				"id": "USH00304796"
			},
			{
				"geometry": {
					"type": "Point",
					"coordinates": [
						-78.6814,
						43.1392
					]
				},
				"type": "Feature",
				"properties": {
					"state": "NY",
					"hcn": "USH00304844",
					"name": "LOCKPORT 3 S",
					"elev": 605,
					"ghcn": "USC00304844"
				},
				"id": "USH00304844"
			},
			{
				"geometry": {
					"type": "Point",
					"coordinates": [
						-75.4817,
						43.7975
					]
				},
				"type": "Feature",
				"properties": {
					"state": "NY",
					"hcn": "USH00304912",
					"name": "LOWVILLE",
					"elev": 860,
					"ghcn": "USC00304912"
				},
				"id": "USH00304912"
			},
			{
				"geometry": {
					"type": "Point",
					"coordinates": [
						-74.3081,
						44.8419
					]
				},
				"type": "Feature",
				"properties": {
					"state": "NY",
					"hcn": "USH00304996",
					"name": "MALONE",
					"elev": 880,
					"ghcn": "USC00304996"
				},
				"id": "USH00304996"
			},
			{
				"geometry": {
					"type": "Point",
					"coordinates": [
						-75.0106,
						42.4694
					]
				},
				"type": "Feature",
				"properties": {
					"state": "NY",
					"hcn": "USH00305113",
					"name": "MARYLAND 9 SW",
					"elev": 1225,
					"ghcn": "USC00305113"
				},
				"id": "USH00305113"
			},
			{
				"geometry": {
					"type": "Point",
					"coordinates": [
						-74.155,
						41.7681
					]
				},
				"type": "Feature",
				"properties": {
					"state": "NY",
					"hcn": "USH00305426",
					"name": "MOHONK LAKE",
					"elev": 1245,
					"ghcn": "USC00305426"
				},
				"id": "USH00305426"
			},
			{
				"geometry": {
					"type": "Point",
					"coordinates": [
						-75.7264,
						42.8417
					]
				},
				"type": "Feature",
				"properties": {
					"state": "NY",
					"hcn": "USH00305512",
					"name": "MORRISVILLE 6 SW",
					"elev": 1300,
					"ghcn": "USC00305512"
				},
				"id": "USH00305512"
			},
			{
				"geometry": {
					"type": "Point",
					"coordinates": [
						-73.9692,
						40.7789
					]
				},
				"type": "Feature",
				"properties": {
					"state": "NY",
					"hcn": "USH00305801",
					"name": "NY CITY CNTRL PARK",
					"elev": 130,
					"ghcn": "USW00094728"
				},
				"id": "USH00305801"
			},
			{
				"geometry": {
					"type": "Point",
					"coordinates": [
						-75.5197,
						42.5117
					]
				},
				"type": "Feature",
				"properties": {
					"state": "NY",
					"hcn": "USH00306085",
					"name": "NORWICH",
					"elev": 989,
					"ghcn": "USC00306085"
				},
				"id": "USH00306085"
			},
			{
				"geometry": {
					"type": "Point",
					"coordinates": [
						-75.4442,
						44.7281
					]
				},
				"type": "Feature",
				"properties": {
					"state": "NY",
					"hcn": "USH00306164",
					"name": "OGDENSBURG 4 NE",
					"elev": 280,
					"ghcn": "USC00306164"
				},
				"id": "USH00306164"
			},
			{
				"geometry": {
					"type": "Point",
					"coordinates": [
						-76.4933,
						43.4622
					]
				},
				"type": "Feature",
				"properties": {
					"state": "NY",
					"hcn": "USH00306314",
					"name": "OSWEGO EAST",
					"elev": 350,
					"ghcn": "USC00306314"
				},
				"id": "USH00306314"
			},
			{
				"geometry": {
					"type": "Point",
					"coordinates": [
						-74.6847,
						41.38
					]
				},
				"type": "Feature",
				"properties": {
					"state": "NY",
					"hcn": "USH00306774",
					"name": "PORT JERVIS",
					"elev": 470,
					"ghcn": "USC00306774"
				},
				"id": "USH00306774"
			},
			{
				"geometry": {
					"type": "Point",
					"coordinates": [
						-73.91,
						41.5997
					]
				},
				"type": "Feature",
				"properties": {
					"state": "NY",
					"hcn": "USH00306820",
					"name": "POUGHKEEPSIE",
					"elev": 170,
					"ghcn": "USc00306820"
				},
				"id": "USH00306820"
			},
			{
				"geometry": {
					"type": "Point",
					"coordinates": [
						-77.6767,
						43.1167
					]
				},
				"type": "Feature",
				"properties": {
					"state": "NY",
					"hcn": "USH00307167",
					"name": "ROCHESTER INTL AP",
					"elev": 533,
					"ghcn": "USW00014768"
				},
				"id": "USH00307167"
			},
			{
				"geometry": {
					"type": "Point",
					"coordinates": [
						-73.8167,
						43.0331
					]
				},
				"type": "Feature",
				"properties": {
					"state": "NY",
					"hcn": "USH00307484",
					"name": "SARATOGA SPRINGS 4 SW",
					"elev": 310,
					"ghcn": "USC00307484"
				},
				"id": "USH00307484"
			},
			{
				"geometry": {
					"type": "Point",
					"coordinates": [
						-73.1047,
						40.9586
					]
				},
				"type": "Feature",
				"properties": {
					"state": "NY",
					"hcn": "USH00307633",
					"name": "SETAUKET STRONG",
					"elev": 40,
					"ghcn": "USC00307633"
				},
				"id": "USH00307633"
			},
			{
				"geometry": {
					"type": "Point",
					"coordinates": [
						-73.8325,
						42.6925
					]
				},
				"type": "Feature",
				"properties": {
					"state": "NY",
					"hcn": "USH00308248",
					"name": "STILLWATER RSVR",
					"elev": 1690,
					"ghcn": "USC00308248"
				},
				"id": "USH00308248"
			},
			{
				"geometry": {
					"type": "Point",
					"coordinates": [
						-76.1033,
						43.1092
					]
				},
				"type": "Feature",
				"properties": {
					"state": "NY",
					"hcn": "USH00308383",
					"name": "SYRACUSE WSO AP",
					"elev": 410,
					"ghcn": "USW00014771"
				},
				"id": "USH00308383"
			},
			{
				"geometry": {
					"type": "Point",
					"coordinates": [
						-73.6831,
						42.75
					]
				},
				"type": "Feature",
				"properties": {
					"state": "NY",
					"hcn": "USH00308600",
					"name": "TROY L&D",
					"elev": 24,
					"ghcn": "USC00308600"
				},
				"id": "USH00308600"
			},
			{
				"geometry": {
					"type": "Point",
					"coordinates": [
						-74.4383,
						44.2308
					]
				},
				"type": "Feature",
				"properties": {
					"state": "NY",
					"hcn": "USH00308631",
					"name": "TUPPER LAKE SUNMOUNT",
					"elev": 1680,
					"ghcn": "USC00308631"
				},
				"id": "USH00308631"
			},
			{
				"geometry": {
					"type": "Point",
					"coordinates": [
						-75.3839,
						43.145
					]
				},
				"type": "Feature",
				"properties": {
					"state": "NY",
					"hcn": "USH00308737",
					"name": "UTICA FAA AP",
					"elev": 711,
					"ghcn": "USW00094794"
				},
				"id": "USH00308737"
			},
			{
				"geometry": {
					"type": "Point",
					"coordinates": [
						-74.1628,
						41.5514
					]
				},
				"type": "Feature",
				"properties": {
					"state": "NY",
					"hcn": "USH00308906",
					"name": "WALDEN 1 ESE",
					"elev": 380,
					"ghcn": "USC00308906"
				},
				"id": "USH00308906"
			},
			{
				"geometry": {
					"type": "Point",
					"coordinates": [
						-78.51,
						42.7411
					]
				},
				"type": "Feature",
				"properties": {
					"state": "NY",
					"hcn": "USH00308910",
					"name": "WALES",
					"elev": 1090,
					"ghcn": "USC00308910"
				},
				"id": "USH00308910"
			},
			{
				"geometry": {
					"type": "Point",
					"coordinates": [
						-74.9003,
						44.1481
					]
				},
				"type": "Feature",
				"properties": {
					"state": "NY",
					"hcn": "USH00308944",
					"name": "WANAKENA RNGR SCHOOL",
					"elev": 1510,
					"ghcn": "USC00308944"
				},
				"id": "USH00308944"
			},
			{
				"geometry": {
					"type": "Point",
					"coordinates": [
						-75.8753,
						43.9761
					]
				},
				"type": "Feature",
				"properties": {
					"state": "NY",
					"hcn": "USH00309000",
					"name": "WATERTOWN",
					"elev": 497,
					"ghcn": "USC00309000"
				},
				"id": "USH00309000"
			},
			{
				"geometry": {
					"type": "Point",
					"coordinates": [
						-73.9608,
						41.3906
					]
				},
				"type": "Feature",
				"properties": {
					"state": "NY",
					"hcn": "USH00309292",
					"name": "WEST POINT",
					"elev": 320,
					"ghcn": "USC00309292"
				},
				"id": "USH00309292"
			},
			{
				"geometry": {
					"type": "Point",
					"coordinates": [
						-73.7975,
						41.2664
					]
				},
				"type": "Feature",
				"properties": {
					"state": "NY",
					"hcn": "USH00309670",
					"name": "YORKTOWN HEIGHTS 1 W",
					"elev": 670,
					"ghcn": "USC00309670"
				},
				"id": "USH00309670"
			}
		]
	}

/***/ },

/***/ 141:
/*!***********************************************!*\
  !*** ./~/react-d3-components/lib/BarChart.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var React = __webpack_require__(/*! ./ReactProvider */ 157);
	var d3 = __webpack_require__(/*! ./D3Provider */ 158);
	
	var Chart = __webpack_require__(/*! ./Chart */ 159);
	var Axis = __webpack_require__(/*! ./Axis */ 160);
	var Bar = __webpack_require__(/*! ./Bar */ 161);
	var Tooltip = __webpack_require__(/*! ./Tooltip */ 162);
	
	var DefaultPropsMixin = __webpack_require__(/*! ./DefaultPropsMixin */ 163);
	var HeightWidthMixin = __webpack_require__(/*! ./HeightWidthMixin */ 164);
	var ArrayifyMixin = __webpack_require__(/*! ./ArrayifyMixin */ 165);
	var StackAccessorMixin = __webpack_require__(/*! ./StackAccessorMixin */ 166);
	var StackDataMixin = __webpack_require__(/*! ./StackDataMixin */ 167);
	var DefaultScalesMixin = __webpack_require__(/*! ./DefaultScalesMixin */ 168);
	var TooltipMixin = __webpack_require__(/*! ./TooltipMixin */ 169);
	
	var DataSet = React.createClass({
		displayName: "DataSet",
	
		propTypes: {
			data: React.PropTypes.array.isRequired,
			xScale: React.PropTypes.func.isRequired,
			yScale: React.PropTypes.func.isRequired,
			colorScale: React.PropTypes.func.isRequired,
			values: React.PropTypes.func.isRequired,
			label: React.PropTypes.func.isRequired,
			x: React.PropTypes.func.isRequired,
			y: React.PropTypes.func.isRequired,
			y0: React.PropTypes.func.isRequired
		},
	
		render: function render() {
			var _props = this.props;
			var data = _props.data;
			var xScale = _props.xScale;
			var yScale = _props.yScale;
			var colorScale = _props.colorScale;
			var values = _props.values;
			var label = _props.label;
			var x = _props.x;
			var y = _props.y;
			var y0 = _props.y0;
			var onMouseEnter = _props.onMouseEnter;
			var onMouseLeave = _props.onMouseLeave;
	
			var bars = data.map(function (stack) {
				return values(stack).map(function (e) {
					return React.createElement(Bar, {
						width: xScale.rangeBand(),
						height: yScale(yScale.domain()[0]) - yScale(y(e)),
						x: xScale(x(e)),
						y: yScale(y0(e) + y(e)),
						fill: colorScale(label(stack)),
						data: e,
						onMouseEnter: onMouseEnter,
						onMouseLeave: onMouseLeave
					});
				});
			});
	
			return React.createElement(
				"g",
				null,
				bars
			);
		}
	});
	
	var BarChart = React.createClass({
		displayName: "BarChart",
	
		mixins: [DefaultPropsMixin, HeightWidthMixin, ArrayifyMixin, StackAccessorMixin, StackDataMixin, DefaultScalesMixin, TooltipMixin],
	
		getDefaultProps: function getDefaultProps() {
			return {};
		},
	
		_tooltipHtml: function _tooltipHtml(d, position) {
			return this.props.tooltipHtml(this.props.x(d), this.props.y0(d), this.props.y(d));
		},
	
		render: function render() {
			var _props = this.props;
			var height = _props.height;
			var width = _props.width;
			var margin = _props.margin;
			var colorScale = _props.colorScale;
			var values = _props.values;
			var label = _props.label;
			var y = _props.y;
			var y0 = _props.y0;
			var x = _props.x;
			var xAxis = _props.xAxis;
			var yAxis = _props.yAxis;
			var data = this._data;
			var innerWidth = this._innerWidth;
			var innerHeight = this._innerHeight;
			var xScale = this._xScale;
			var yScale = this._yScale;
	
			return React.createElement(
				"div",
				null,
				React.createElement(
					Chart,
					{ height: height, width: width, margin: margin },
					React.createElement(DataSet, {
						data: data,
						xScale: xScale,
						yScale: yScale,
						colorScale: colorScale,
						values: values,
						label: label,
						y: y,
						y0: y0,
						x: x,
						onMouseEnter: this.onMouseEnter,
						onMouseLeave: this.onMouseLeave
					}),
					React.createElement(Axis, _extends({
						className: "x axis",
						orientation: "bottom",
						scale: xScale,
						height: innerHeight,
						width: innerWidth
					}, xAxis)),
					React.createElement(Axis, _extends({
						className: "y axis",
						orientation: "left",
						scale: yScale,
						height: innerHeight,
						width: innerWidth
					}, yAxis))
				),
				React.createElement(Tooltip, {
					hidden: this.state.tooltip.hidden,
					top: this.state.tooltip.top,
					left: this.state.tooltip.left,
					html: this.state.tooltip.html })
			);
		}
	});
	
	module.exports = BarChart;

/***/ },

/***/ 142:
/*!***********************************************!*\
  !*** ./~/react-d3-components/lib/PieChart.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var React = __webpack_require__(/*! ./ReactProvider */ 157);
	var d3 = __webpack_require__(/*! ./D3Provider */ 158);
	
	var Chart = __webpack_require__(/*! ./Chart */ 159);
	var Tooltip = __webpack_require__(/*! ./Tooltip */ 162);
	
	var DefaultPropsMixin = __webpack_require__(/*! ./DefaultPropsMixin */ 163);
	var HeightWidthMixin = __webpack_require__(/*! ./HeightWidthMixin */ 164);
	var AccessorMixin = __webpack_require__(/*! ./AccessorMixin */ 170);
	var TooltipMixin = __webpack_require__(/*! ./TooltipMixin */ 169);
	
	var Wedge = React.createClass({
		displayName: "Wedge",
	
		propTypes: {
			d: React.PropTypes.string.isRequired,
			fill: React.PropTypes.string.isRequired
		},
	
		render: function render() {
			var _props = this.props;
			var fill = _props.fill;
			var d = _props.d;
			var data = _props.data;
			var onMouseEnter = _props.onMouseEnter;
			var onMouseLeave = _props.onMouseLeave;
	
			return React.createElement("path", {
				fill: fill,
				d: d,
				onMouseMove: function (evt) {
					onMouseEnter(evt, data);
				},
				onMouseLeave: function (evt) {
					onMouseLeave(evt);
				}
			});
		}
	});
	
	var DataSet = React.createClass({
		displayName: "DataSet",
	
		propTypes: {
			pie: React.PropTypes.array.isRequired,
			arc: React.PropTypes.func.isRequired,
			outerArc: React.PropTypes.func.isRequired,
			colorScale: React.PropTypes.func.isRequired,
			radius: React.PropTypes.number.isRequired,
			strokeWidth: React.PropTypes.number,
			stroke: React.PropTypes.string,
			fill: React.PropTypes.string,
			opacity: React.PropTypes.number,
			x: React.PropTypes.func.isRequired
		},
	
		getDefaultProps: function getDefaultProps() {
			return {
				strokeWidth: 2,
				stroke: "#000",
				fill: "none",
				opacity: 0.3
			};
		},
	
		render: function render() {
			var _props = this.props;
			var pie = _props.pie;
			var arc = _props.arc;
			var outerArc = _props.outerArc;
			var colorScale = _props.colorScale;
			var radius = _props.radius;
			var strokeWidth = _props.strokeWidth;
			var stroke = _props.stroke;
			var fill = _props.fill;
			var opacity = _props.opacity;
			var x = _props.x;
			var onMouseEnter = _props.onMouseEnter;
			var onMouseLeave = _props.onMouseLeave;
	
			var wedges = pie.map(function (e) {
				function midAngle(d) {
					return d.startAngle + (d.endAngle - d.startAngle) / 2;
				}
	
				var d = arc(e);
	
				var labelPos = outerArc.centroid(e);
				labelPos[0] = radius * (midAngle(e) < Math.PI ? 1 : -1);
	
				var textAnchor = midAngle(e) < Math.PI ? "start" : "end";
	
				var linePos = outerArc.centroid(e);
				linePos[0] = radius * 0.95 * (midAngle(e) < Math.PI ? 1 : -1);
	
				return React.createElement(
					"g",
					{ className: "arc" },
					React.createElement(Wedge, {
						data: e.data,
						fill: colorScale(x(e.data)),
						d: d,
						onMouseEnter: onMouseEnter,
						onMouseLeave: onMouseLeave
					}),
					React.createElement("polyline", {
						opacity: opacity,
						strokeWidth: strokeWidth,
						stroke: stroke,
						fill: fill,
						points: [arc.centroid(e), outerArc.centroid(e), linePos]
					}),
					React.createElement(
						"text",
						{
							dy: ".35em",
							x: labelPos[0],
							y: labelPos[1],
							textAnchor: textAnchor },
						x(e.data)
					)
				);
			});
	
			return React.createElement(
				"g",
				null,
				wedges
			);
		}
	});
	
	var PieChart = React.createClass({
		displayName: "PieChart",
	
		mixins: [DefaultPropsMixin, HeightWidthMixin, AccessorMixin, TooltipMixin],
	
		propTypes: {
			innerRadius: React.PropTypes.number,
			outerRadius: React.PropTypes.number,
			labelRadius: React.PropTypes.number,
			padRadius: React.PropTypes.string,
			cornerRadius: React.PropTypes.number
		},
	
		getDefaultProps: function getDefaultProps() {
			return {
				innerRadius: null,
				outerRadius: null,
				labelRadius: null,
				padRadius: "auto",
				cornerRadius: 0
			};
		},
	
		_tooltipHtml: function _tooltipHtml(d, position) {
			return this.props.tooltipHtml(this.props.x(d), this.props.y(d));
		},
	
		render: function render() {
			var _props = this.props;
			var data = _props.data;
			var width = _props.width;
			var height = _props.height;
			var margin = _props.margin;
			var colorScale = _props.colorScale;
			var innerRadius = _props.innerRadius;
			var outerRadius = _props.outerRadius;
			var labelRadius = _props.labelRadius;
			var padRadius = _props.padRadius;
			var cornerRadius = _props.cornerRadius;
			var x = _props.x;
			var y = _props.y;
			var values = _props.values;
			var innerWidth = this._innerWidth;
			var innerHeight = this._innerHeight;
	
			var pie = d3.layout.pie().value(function (e) {
				return y(e);
			});
	
			var radius = Math.min(innerWidth, innerHeight) / 2;
			if (!innerRadius) {
				innerRadius = radius * 0.8;
			}
	
			if (!outerRadius) {
				outerRadius = radius * 0.4;
			}
	
			if (!labelRadius) {
				labelRadius = radius * 0.9;
			}
	
			var arc = d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius).padRadius(padRadius).cornerRadius(cornerRadius);
	
			var outerArc = d3.svg.arc().innerRadius(labelRadius).outerRadius(labelRadius);
	
			var pieData = pie(values(data));
	
			var translation = "translate(" + innerWidth / 2 + ", " + innerHeight / 2 + ")";
			return React.createElement(
				"div",
				null,
				React.createElement(
					Chart,
					{ height: height, width: width, margin: margin },
					React.createElement(
						"g",
						{ transform: translation },
						React.createElement(DataSet, {
							width: innerWidth,
							height: innerHeight,
							colorScale: colorScale,
							pie: pieData,
							arc: arc,
							outerArc: outerArc,
							radius: radius,
							x: x,
							onMouseEnter: this.onMouseEnter,
							onMouseLeave: this.onMouseLeave
						})
					)
				),
				React.createElement(Tooltip, {
					hidden: this.state.tooltip.hidden,
					top: this.state.tooltip.top,
					left: this.state.tooltip.left,
					html: this.state.tooltip.html })
			);
		}
	});
	
	module.exports = PieChart;

/***/ },

/***/ 143:
/*!**************************************************!*\
  !*** ./~/react-d3-components/lib/ScatterPlot.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var React = __webpack_require__(/*! ./ReactProvider */ 157);
	var d3 = __webpack_require__(/*! ./D3Provider */ 158);
	
	var Chart = __webpack_require__(/*! ./Chart */ 159);
	var Axis = __webpack_require__(/*! ./Axis */ 160);
	var Tooltip = __webpack_require__(/*! ./Tooltip */ 162);
	
	var DefaultPropsMixin = __webpack_require__(/*! ./DefaultPropsMixin */ 163);
	var HeightWidthMixin = __webpack_require__(/*! ./HeightWidthMixin */ 164);
	var ArrayifyMixin = __webpack_require__(/*! ./ArrayifyMixin */ 165);
	var AccessorMixin = __webpack_require__(/*! ./AccessorMixin */ 170);
	var DefaultScalesMixin = __webpack_require__(/*! ./DefaultScalesMixin */ 168);
	var TooltipMixin = __webpack_require__(/*! ./TooltipMixin */ 169);
	
	var DataSet = React.createClass({
		displayName: "DataSet",
	
		propTypes: {
			data: React.PropTypes.array.isRequired,
			symbol: React.PropTypes.func.isRequired,
			xScale: React.PropTypes.func.isRequired,
			yScale: React.PropTypes.func.isRequired,
			colorScale: React.PropTypes.func.isRequired,
			onMouseEnter: React.PropTypes.func,
			onMouseLeave: React.PropTypes.func
		},
	
		render: function render() {
			var _props = this.props;
			var data = _props.data;
			var symbol = _props.symbol;
			var xScale = _props.xScale;
			var yScale = _props.yScale;
			var colorScale = _props.colorScale;
			var values = _props.values;
			var x = _props.x;
			var y = _props.y;
			var onMouseEnter = _props.onMouseEnter;
			var onMouseLeave = _props.onMouseLeave;
	
			var circles = data.map(function (stack) {
				return values(stack).map(function (e) {
					var translate = "translate(" + xScale(x(e)) + ", " + yScale(y(e)) + ")";
					return React.createElement("path", {
						className: "dot",
						d: symbol(),
						transform: translate,
						fill: colorScale(stack.label),
						onMouseOver: function (evt) {
							onMouseEnter(evt, e);
						},
						onMouseLeave: function (evt) {
							onMouseLeave(evt);
						}
					});
				});
			});
	
			return React.createElement(
				"g",
				null,
				circles
			);
		}
	});
	
	var ScatterPlot = React.createClass({
		displayName: "ScatterPlot",
	
		mixins: [DefaultPropsMixin, HeightWidthMixin, ArrayifyMixin, AccessorMixin, DefaultScalesMixin, TooltipMixin],
	
		propTypes: {
			rScale: React.PropTypes.func,
			shape: React.PropTypes.string
		},
	
		getDefaultProps: function getDefaultProps() {
			return {
				rScale: null,
				shape: "circle"
			};
		},
	
		_tooltipHtml: function _tooltipHtml(d, position) {
			return this.props.tooltipHtml(this.props.x(d), this.props.y(d));
		},
	
		render: function render() {
			var _props = this.props;
			var height = _props.height;
			var width = _props.width;
			var margin = _props.margin;
			var colorScale = _props.colorScale;
			var rScale = _props.rScale;
			var shape = _props.shape;
			var values = _props.values;
			var x = _props.x;
			var y = _props.y;
			var xAxis = _props.xAxis;
			var yAxis = _props.yAxis;
			var data = this._data;
			var innerWidth = this._innerWidth;
			var innerHeight = this._innerHeight;
			var xScale = this._xScale;
			var yScale = this._yScale;
			var xIntercept = this._xIntercept;
			var yIntercept = this._yIntercept;
	
			var symbol = d3.svg.symbol().type(shape);
	
			if (rScale) {
				symbol = symbol.size(rScale);
			}
	
			return React.createElement(
				"div",
				null,
				React.createElement(
					Chart,
					{ height: height, width: width, margin: margin },
					React.createElement(Axis, _extends({
						className: "x axis",
						orientation: "bottom",
						scale: xScale,
						height: innerHeight,
						width: innerWidth,
						zero: yIntercept
					}, xAxis)),
					React.createElement(Axis, _extends({
						className: "y axis",
						orientation: "left",
						scale: yScale,
						height: innerHeight,
						width: innerWidth,
						zero: xIntercept
					}, yAxis)),
					React.createElement(DataSet, {
						data: data,
						xScale: xScale,
						yScale: yScale,
						colorScale: colorScale,
						symbol: symbol,
						values: values,
						x: x,
						y: y,
						onMouseEnter: this.onMouseEnter,
						onMouseLeave: this.onMouseLeave
					})
				),
				React.createElement(Tooltip, {
					hidden: this.state.tooltip.hidden,
					top: this.state.tooltip.top,
					left: this.state.tooltip.left,
					html: this.state.tooltip.html })
			);
		}
	});
	
	module.exports = ScatterPlot;

/***/ },

/***/ 144:
/*!************************************************!*\
  !*** ./~/react-d3-components/lib/LineChart.js ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var React = __webpack_require__(/*! ./ReactProvider */ 157);
	var d3 = __webpack_require__(/*! ./D3Provider */ 158);
	
	var Chart = __webpack_require__(/*! ./Chart */ 159);
	var Axis = __webpack_require__(/*! ./Axis */ 160);
	var Path = __webpack_require__(/*! ./Path */ 171);
	var Tooltip = __webpack_require__(/*! ./Tooltip */ 162);
	
	var DefaultPropsMixin = __webpack_require__(/*! ./DefaultPropsMixin */ 163);
	var HeightWidthMixin = __webpack_require__(/*! ./HeightWidthMixin */ 164);
	var ArrayifyMixin = __webpack_require__(/*! ./ArrayifyMixin */ 165);
	var AccessorMixin = __webpack_require__(/*! ./AccessorMixin */ 170);
	var DefaultScalesMixin = __webpack_require__(/*! ./DefaultScalesMixin */ 168);
	var TooltipMixin = __webpack_require__(/*! ./TooltipMixin */ 169);
	
	var DataSet = React.createClass({
		displayName: "DataSet",
	
		propTypes: {
			data: React.PropTypes.array.isRequired,
			line: React.PropTypes.func.isRequired,
			colorScale: React.PropTypes.func.isRequired
		},
	
		render: function render() {
			var _props = this.props;
			var width = _props.width;
			var height = _props.height;
			var data = _props.data;
			var line = _props.line;
			var strokeWidth = _props.strokeWidth;
			var colorScale = _props.colorScale;
			var values = _props.values;
			var label = _props.label;
			var onMouseEnter = _props.onMouseEnter;
			var onMouseLeave = _props.onMouseLeave;
	
			var lines = data.map(function (stack) {
				return React.createElement(Path, {
					className: "line",
					d: line(values(stack)),
					stroke: colorScale(label(stack)),
					data: values(stack),
					onMouseEnter: onMouseEnter,
					onMouseLeave: onMouseLeave
				});
			});
	
			/*
	   The <rect> below is needed in case we want to show the tooltip no matter where on the chart the mouse is.
	   Not sure if this should be used.
	   */
			/*
	  <rect width={width} height={height} fill={"none"} stroke={"none"} style={{pointerEvents: "all"}}
	  	onMouseMove={ evt => { onMouseEnter(evt, data); } }
	  	onMouseLeave={  evt => { onMouseLeave(evt); } }
	  		/>
	   */
			return React.createElement(
				"g",
				null,
				lines
			);
		}
	});
	
	var LineChart = React.createClass({
		displayName: "LineChart",
	
		mixins: [DefaultPropsMixin, HeightWidthMixin, ArrayifyMixin, AccessorMixin, DefaultScalesMixin, TooltipMixin],
	
		propTypes: {
			interpolate: React.PropTypes.string
		},
	
		getDefaultProps: function getDefaultProps() {
			return {
				interpolate: "linear"
			};
		},
	
		/*
	  The code below supports finding the data values for the line closest to the mouse cursor.
	  Since it gets all events from the Rect overlaying the Chart the tooltip gets shown everywhere.
	  For now I don't want to use this method.
	  */
		/*
	  tooltipHtml: (d, position, xScale, yScale) => {
	  let xValueCursor = xScale.invert(position[0]);
	  let yValueCursor = yScale.invert(position[1]);
	 	 let xBisector = d3.bisector(e => { return e.x; }).left;
	  let valuesAtX = d.map(stack => {
	  let idx = xBisector(stack.values, xValueCursor);
	  return stack.values[idx];
	  });
	 	 valuesAtX.sort((a, b) => { return a.y - b.y; });
	 	 let yBisector = d3.bisector(e => { return e.y; }).left;
	  let yIndex = yBisector(valuesAtX, yValueCursor);
	 	 let yValue = valuesAtX[yIndex == valuesAtX.length ? yIndex - 1 : yIndex].y;
	 	 return `Value: ${yValue}`;
	  }
	  */
		_tooltipHtml: function _tooltipHtml(data, position) {
			var _props = this.props;
			var x = _props.x;
			var y0 = _props.y0;
			var y = _props.y;
			var values = _props.values;
			var label = _props.label;
			var xScale = this._xScale;
			var yScale = this._yScale;
	
			var xValueCursor = xScale.invert(position[0]);
			var yValueCursor = yScale.invert(position[1]);
	
			var xBisector = d3.bisector(function (e) {
				return x(e);
			}).left;
			var xIndex = xBisector(data, xScale.invert(position[0]));
	
			var indexRight = xIndex == data.length ? xIndex - 1 : xIndex;
			var valueRight = x(data[indexRight]);
	
			var indexLeft = xIndex == 0 ? xIndex : xIndex - 1;
			var valueLeft = x(data[indexLeft]);
	
			var index = undefined;
			if (Math.abs(xValueCursor - valueRight) < Math.abs(xValueCursor - valueLeft)) {
				index = indexRight;
			} else {
				index = indexLeft;
			}
	
			var yValue = y(data[index]);
			var cursorValue = d3.round(yScale.invert(position[1]), 2);
	
			return this.props.tooltipHtml(yValue, cursorValue);
		},
	
		render: function render() {
			var _props = this.props;
			var height = _props.height;
			var width = _props.width;
			var margin = _props.margin;
			var colorScale = _props.colorScale;
			var interpolate = _props.interpolate;
			var strokeWidth = _props.strokeWidth;
			var stroke = _props.stroke;
			var values = _props.values;
			var label = _props.label;
			var x = _props.x;
			var y = _props.y;
			var xAxis = _props.xAxis;
			var yAxis = _props.yAxis;
			var data = this._data;
			var innerWidth = this._innerWidth;
			var innerHeight = this._innerHeight;
			var xScale = this._xScale;
			var yScale = this._yScale;
			var xIntercept = this._xIntercept;
			var yIntercept = this._yIntercept;
	
			var line = d3.svg.line().x(function (e) {
				return xScale(x(e));
			}).y(function (e) {
				return yScale(y(e));
			}).interpolate(interpolate);
	
			return React.createElement(
				"div",
				null,
				React.createElement(
					Chart,
					{ height: height, width: width, margin: margin },
					React.createElement(DataSet, {
						height: innerHeight,
						width: innerWidth,
						data: data,
						line: line,
						strokeWidth: strokeWidth,
						stroke: stroke,
						colorScale: colorScale,
						values: values,
						label: label,
						onMouseEnter: this.onMouseEnter,
						onMouseLeave: this.onMouseLeave
					}),
					React.createElement(Axis, _extends({
						className: "x axis",
						orientation: "bottom",
						scale: xScale,
						height: innerHeight,
						width: innerWidth,
						zero: yIntercept
					}, xAxis)),
					React.createElement(Axis, _extends({
						className: "y axis",
						orientation: "left",
						scale: yScale,
						height: innerHeight,
						width: innerWidth,
						zero: xIntercept
					}, yAxis))
				),
				React.createElement(Tooltip, {
					hidden: this.state.tooltip.hidden,
					top: this.state.tooltip.top,
					left: this.state.tooltip.left,
					html: this.state.tooltip.html })
			);
		}
	});
	
	module.exports = LineChart;

/***/ },

/***/ 145:
/*!************************************************!*\
  !*** ./~/react-d3-components/lib/AreaChart.js ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var React = __webpack_require__(/*! ./ReactProvider */ 157);
	var d3 = __webpack_require__(/*! ./D3Provider */ 158);
	
	var Chart = __webpack_require__(/*! ./Chart */ 159);
	var Axis = __webpack_require__(/*! ./Axis */ 160);
	var Path = __webpack_require__(/*! ./Path */ 171);
	var Tooltip = __webpack_require__(/*! ./Tooltip */ 162);
	
	var DefaultPropsMixin = __webpack_require__(/*! ./DefaultPropsMixin */ 163);
	var HeightWidthMixin = __webpack_require__(/*! ./HeightWidthMixin */ 164);
	var ArrayifyMixin = __webpack_require__(/*! ./ArrayifyMixin */ 165);
	var StackAccessorMixin = __webpack_require__(/*! ./StackAccessorMixin */ 166);
	var StackDataMixin = __webpack_require__(/*! ./StackDataMixin */ 167);
	var DefaultScalesMixin = __webpack_require__(/*! ./DefaultScalesMixin */ 168);
	var TooltipMixin = __webpack_require__(/*! ./TooltipMixin */ 169);
	
	var DataSet = React.createClass({
		displayName: "DataSet",
	
		propTypes: {
			data: React.PropTypes.array.isRequired,
			area: React.PropTypes.func.isRequired,
			line: React.PropTypes.func.isRequired,
			colorScale: React.PropTypes.func.isRequired,
			stroke: React.PropTypes.func.isRequired
		},
	
		render: function render() {
			var _props = this.props;
			var data = _props.data;
			var area = _props.area;
			var line = _props.line;
			var colorScale = _props.colorScale;
			var stroke = _props.stroke;
			var values = _props.values;
			var label = _props.label;
			var onMouseEnter = _props.onMouseEnter;
			var onMouseLeave = _props.onMouseLeave;
	
			var areas = data.map(function (stack) {
				return React.createElement(Path, {
					className: "area",
					stroke: "none",
					fill: colorScale(label(stack)),
					d: area(values(stack)),
					onMouseEnter: onMouseEnter,
					onMouseLeave: onMouseLeave,
					data: data
				});
			});
	
			var lines = data.map(function (stack) {
				return React.createElement(Path, {
					className: "line",
					d: line(values(stack)),
					stroke: stroke(label(stack))
				});
			});
	
			return React.createElement(
				"g",
				null,
				areas
			);
		}
	});
	
	var AreaChart = React.createClass({
		displayName: "AreaChart",
	
		mixins: [DefaultPropsMixin, HeightWidthMixin, ArrayifyMixin, StackAccessorMixin, StackDataMixin, DefaultScalesMixin, TooltipMixin],
	
		propTypes: {
			interpolate: React.PropTypes.string,
			stroke: React.PropTypes.func
		},
	
		getDefaultProps: function getDefaultProps() {
			return {
				interpolate: "linear",
				stroke: d3.scale.category20()
			};
		},
	
		_tooltipHtml: function _tooltipHtml(d, position) {
			var _props = this.props;
			var x = _props.x;
			var y0 = _props.y0;
			var y = _props.y;
			var values = _props.values;
			var label = _props.label;
			var xScale = this._xScale;
			var yScale = this._yScale;
	
			var xValueCursor = xScale.invert(position[0]);
	
			var xBisector = d3.bisector(function (e) {
				return x(e);
			}).right;
			var xIndex = xBisector(values(d[0]), xScale.invert(position[0]));
			xIndex = xIndex == values(d[0]).length ? xIndex - 1 : xIndex;
	
			var xIndexRight = xIndex == values(d[0]).length ? xIndex - 1 : xIndex;
			var xValueRight = x(values(d[0])[xIndexRight]);
	
			var xIndexLeft = xIndex == 0 ? xIndex : xIndex - 1;
			var xValueLeft = x(values(d[0])[xIndexLeft]);
	
			if (Math.abs(xValueCursor - xValueRight) < Math.abs(xValueCursor - xValueLeft)) {
				xIndex = xIndexRight;
			} else {
				xIndex = xIndexLeft;
			}
	
			var yValueCursor = yScale.invert(position[1]);
	
			var yBisector = d3.bisector(function (e) {
				return y0(values(e)[xIndex]) + y(values(e)[xIndex]);
			}).left;
			var yIndex = yBisector(d, yValueCursor);
			yIndex = yIndex == d.length ? yIndex - 1 : yIndex;
	
			var yValue = y(values(d[yIndex])[xIndex]);
			var yValueCumulative = y0(values(d[d.length - 1])[xIndex]) + y(values(d[d.length - 1])[xIndex]);
	
			return this.props.tooltipHtml(yValue, yValueCumulative);
		},
	
		render: function render() {
			var _props = this.props;
			var height = _props.height;
			var width = _props.width;
			var margin = _props.margin;
			var colorScale = _props.colorScale;
			var interpolate = _props.interpolate;
			var stroke = _props.stroke;
			var offset = _props.offset;
			var values = _props.values;
			var label = _props.label;
			var x = _props.x;
			var y = _props.y;
			var y0 = _props.y0;
			var xAxis = _props.xAxis;
			var yAxis = _props.yAxis;
			var data = this._data;
			var innerWidth = this._innerWidth;
			var innerHeight = this._innerHeight;
			var xScale = this._xScale;
			var yScale = this._yScale;
			var xIntercept = this._xIntercept;
			var yIntercept = this._yIntercept;
	
			var line = d3.svg.line().x(function (e) {
				return xScale(x(e));
			}).y(function (e) {
				return yScale(y0(e) + y(e));
			}).interpolate(interpolate);
	
			var area = d3.svg.area().x(function (e) {
				return xScale(x(e));
			}).y0(function (e) {
				return yScale(yScale.domain()[0] + y0(e));
			}).y1(function (e) {
				return yScale(y0(e) + y(e));
			}).interpolate(interpolate);
	
			return React.createElement(
				"div",
				null,
				React.createElement(
					Chart,
					{ height: height, width: width, margin: margin },
					React.createElement(DataSet, {
						data: data,
						line: line,
						area: area,
						colorScale: colorScale,
						stroke: stroke,
						label: label,
						values: values,
						onMouseEnter: this.onMouseEnter,
						onMouseLeave: this.onMouseLeave
					}),
					React.createElement(Axis, _extends({
						className: "x axis",
						orientation: "bottom",
						scale: xScale,
						height: innerHeight,
						width: innerWidth
					}, xAxis)),
					React.createElement(Axis, _extends({
						className: "y axis",
						orientation: "left",
						scale: yScale,
						height: innerHeight,
						width: innerWidth
					}, yAxis))
				),
				React.createElement(Tooltip, {
					hidden: this.state.tooltip.hidden,
					top: this.state.tooltip.top,
					left: this.state.tooltip.left,
					html: this.state.tooltip.html })
			);
		}
	});
	
	module.exports = AreaChart;

/***/ },

/***/ 157:
/*!****************************************************!*\
  !*** ./~/react-d3-components/lib/ReactProvider.js ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var React = window.React || __webpack_require__(/*! react */ 1);
	
	module.exports = React;

/***/ },

/***/ 158:
/*!*************************************************!*\
  !*** ./~/react-d3-components/lib/D3Provider.js ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var d3 = window.d3 || __webpack_require__(/*! d3 */ 3);
	
	module.exports = d3;

/***/ },

/***/ 159:
/*!********************************************!*\
  !*** ./~/react-d3-components/lib/Chart.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var React = __webpack_require__(/*! ./ReactProvider */ 157);
	
	var Chart = React.createClass({
		displayName: "Chart",
	
		propTypes: {
			height: React.PropTypes.number.isRequired,
			width: React.PropTypes.number.isRequired,
			margin: React.PropTypes.shape({
				top: React.PropTypes.number,
				bottom: React.PropTypes.number,
				left: React.PropTypes.number,
				right: React.PropTypes.number
			}).isRequired
		},
	
		render: function render() {
			var _props = this.props;
			var width = _props.width;
			var height = _props.height;
			var margin = _props.margin;
			var children = _props.children;
	
			return React.createElement(
				"svg",
				{ ref: "svg", width: width, height: height },
				React.createElement(
					"g",
					{ transform: "translate(" + margin.left + ", " + margin.top + ")" },
					children
				)
			);
		}
	});
	
	module.exports = Chart;

/***/ },

/***/ 160:
/*!*******************************************!*\
  !*** ./~/react-d3-components/lib/Axis.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var React = __webpack_require__(/*! ./ReactProvider */ 157);
	var d3 = __webpack_require__(/*! ./D3Provider */ 158);
	
	var Axis = React.createClass({
		displayName: "Axis",
	
		propTypes: {
			tickArguments: React.PropTypes.array,
			tickValues: React.PropTypes.array,
			tickFormat: React.PropTypes.func,
			innerTickSize: React.PropTypes.number,
			tickPadding: React.PropTypes.number,
			outerTickSize: React.PropTypes.number,
			scale: React.PropTypes.func.isRequired,
			className: React.PropTypes.string,
			zero: React.PropTypes.number,
			orientation: React.PropTypes.oneOf(["top", "bottom", "left", "right"]).isRequired,
			label: React.PropTypes.string
		},
	
		getDefaultProps: function getDefaultProps() {
			return {
				tickArguments: [10],
				tickValues: null,
				tickFormat: function (x) {
					return x;
				},
				innerTickSize: 6,
				tickPadding: 3,
				outerTickSize: 6,
				className: "axis",
				zero: 0,
				label: ""
			};
		},
	
		_getTranslateString: function _getTranslateString() {
			var _props = this.props;
			var orientation = _props.orientation;
			var height = _props.height;
			var width = _props.width;
			var zero = _props.zero;
	
			if (orientation === "top") {
				return "translate(0, " + zero + ")";
			} else if (orientation === "bottom") {
				return "translate(0, " + (zero == 0 ? height : zero) + ")";
			} else if (orientation === "left") {
				return "translate(" + zero + ", 0)";
			} else if (orientation === "right") {
				return "translate(" + (zero == 0 ? width : zero) + ", 0)";
			} else {
				return "";
			}
		},
	
		render: function render() {
			var _props = this.props;
			var height = _props.height;
			var width = _props.width;
			var tickArguments = _props.tickArguments;
			var tickValues = _props.tickValues;
			var tickFormat = _props.tickFormat;
			var innerTickSize = _props.innerTickSize;
			var tickPadding = _props.tickPadding;
			var outerTickSize = _props.outerTickSize;
			var scale = _props.scale;
			var orientation = _props.orientation;
			var className = _props.className;
			var zero = _props.zero;
			var label = _props.label;
	
			var ticks = tickValues == null ? scale.ticks ? scale.ticks.apply(scale, tickArguments) : scale.domain() : tickValues;
	
			if (scale.tickFormat) {
				tickFormat = scale.tickFormat.apply(scale, tickArguments);
			}
	
			// TODO: is there a cleaner way? removes the 0 tick if axes are crossing
			if (zero != height && zero != width && zero != 0) {
				ticks = ticks.filter(function (element, index, array) {
					return element == 0 ? false : true;
				});
			}
	
			var tickSpacing = Math.max(innerTickSize, 0) + tickPadding;
	
			var sign = orientation === "top" || orientation === "left" ? -1 : 1;
	
			var range = this._d3_scaleRange(scale);
	
			var activeScale = scale.rangeBand ? function (e) {
				return scale(e) + scale.rangeBand() / 2;
			} : scale;
	
			var transform = undefined,
			    x = undefined,
			    y = undefined,
			    x2 = undefined,
			    y2 = undefined,
			    dy = undefined,
			    textAnchor = undefined,
			    d = undefined,
			    labelElement = undefined;
			if (orientation === "bottom" || orientation === "top") {
				transform = "translate({}, 0)";
				x = 0;
				y = sign * tickSpacing;
				x2 = 0;
				y2 = sign * innerTickSize;
				dy = sign < 0 ? "0em" : ".71em";
				textAnchor = "middle";
				d = "M" + range[0] + ", " + sign * outerTickSize + "V0H" + range[1] + "V" + sign * outerTickSize;
	
				labelElement = React.createElement(
					"text",
					{ className: "" + className + " label", textAnchor: "end", x: width, y: -6 },
					label
				);
			} else {
				transform = "translate(0, {})";
				x = sign * tickSpacing;
				y = 0;
				x2 = sign * innerTickSize;
				y2 = 0;
				dy = ".32em";
				textAnchor = sign < 0 ? "end" : "start";
				d = "M" + sign * outerTickSize + ", " + range[0] + "H0V" + range[1] + "H" + sign * outerTickSize;
	
				labelElement = React.createElement(
					"text",
					{ className: "" + className + " label", textAnchor: "end", y: 6, dy: ".75em", transform: "rotate(-90)" },
					label
				);
			}
	
			var tickElements = ticks.map(function (tick) {
				var position = activeScale(tick);
				var translate = transform.replace("{}", position);
				return React.createElement(
					"g",
					{ className: "tick", transform: translate },
					React.createElement("line", { x2: x2, y2: y2, stroke: "#aaa" }),
					React.createElement(
						"text",
						{ x: x, y: y, dy: dy, textAnchor: textAnchor },
						tickFormat(tick)
					)
				);
			});
	
			var pathElement = React.createElement("path", { className: "domain", d: d, fill: "none", stroke: "#aaa" });
	
			return React.createElement(
				"g",
				{ ref: "axis", className: className, transform: this._getTranslateString(), style: { shapeRendering: "crispEdges" } },
				tickElements,
				pathElement,
				labelElement
			);
		},
	
		_d3_scaleExtent: function _d3_scaleExtent(domain) {
			var start = domain[0],
			    stop = domain[domain.length - 1];
			return start < stop ? [start, stop] : [stop, start];
		},
	
		_d3_scaleRange: function _d3_scaleRange(scale) {
			return scale.rangeExtent ? scale.rangeExtent() : this._d3_scaleExtent(scale.range());
		}
	});
	
	module.exports = Axis;

/***/ },

/***/ 161:
/*!******************************************!*\
  !*** ./~/react-d3-components/lib/Bar.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var React = __webpack_require__(/*! ./ReactProvider */ 157);
	var d3 = __webpack_require__(/*! ./D3Provider */ 158);
	
	var Bar = React.createClass({
		displayName: "Bar",
	
		propTypes: {
			width: React.PropTypes.number.isRequired,
			height: React.PropTypes.number.isRequired,
			x: React.PropTypes.number.isRequired,
			y: React.PropTypes.number.isRequired,
			fill: React.PropTypes.string.isRequired,
			data: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.object]).isRequired,
			onMouseEnter: React.PropTypes.func,
			onMouseLeave: React.PropTypes.func
		},
	
		render: function render() {
			var _props = this.props;
			var x = _props.x;
			var y = _props.y;
			var width = _props.width;
			var height = _props.height;
			var fill = _props.fill;
			var data = _props.data;
			var onMouseEnter = _props.onMouseEnter;
			var onMouseLeave = _props.onMouseLeave;
	
			return React.createElement("rect", {
				className: "bar",
				x: x,
				y: y,
				width: width,
				height: height,
				fill: fill,
				onMouseMove: function (e) {
					onMouseEnter(e, data);
				},
				onMouseLeave: function (e) {
					onMouseLeave(e);
				}
			});
		}
	});
	
	module.exports = Bar;

/***/ },

/***/ 162:
/*!**********************************************!*\
  !*** ./~/react-d3-components/lib/Tooltip.js ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var React = __webpack_require__(/*! ./ReactProvider */ 157);
	var d3 = __webpack_require__(/*! ./D3Provider */ 158);
	
	var Tooltip = React.createClass({
		displayName: "Tooltip",
	
		propTypes: {
			top: React.PropTypes.number.isRequired,
			left: React.PropTypes.number.isRequired,
			html: React.PropTypes.string
		},
	
		getDefaultProps: function getDefaultProps() {
			return {
				top: 150,
				left: 100,
				html: ""
			};
		},
	
		render: function render() {
			var _props = this.props;
			var top = _props.top;
			var left = _props.left;
			var hidden = _props.hidden;
			var html = _props.html;
	
			var style = {
				display: hidden ? "none" : "flex",
				position: "absolute",
				top: top,
				left: left
			};
	
			return React.createElement(
				"div",
				{ className: "tooltip", style: style },
				html
			);
		}
	});
	
	module.exports = Tooltip;

/***/ },

/***/ 163:
/*!********************************************************!*\
  !*** ./~/react-d3-components/lib/DefaultPropsMixin.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var React = __webpack_require__(/*! ./ReactProvider */ 157);
	var d3 = __webpack_require__(/*! ./D3Provider */ 158);
	
	var DefaultPropsMixin = {
		propTypes: {
			data: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]).isRequired,
			height: React.PropTypes.number.isRequired,
			width: React.PropTypes.number.isRequired,
			margin: React.PropTypes.shape({
				top: React.PropTypes.number,
				bottom: React.PropTypes.number,
				left: React.PropTypes.number,
				right: React.PropTypes.number
			}),
			xScale: React.PropTypes.func,
			yScale: React.PropTypes.func,
			colorScale: React.PropTypes.func
		},
	
		getDefaultProps: function getDefaultProps() {
			return {
				margin: { top: 0, bottom: 0, left: 0, right: 0 },
				xScale: null,
				yScale: null,
				colorScale: d3.scale.category20()
			};
		}
	};
	
	module.exports = DefaultPropsMixin;

/***/ },

/***/ 164:
/*!*******************************************************!*\
  !*** ./~/react-d3-components/lib/HeightWidthMixin.js ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var HeightWidthMixin = {
		componentWillMount: function componentWillMount() {
			this._calculateInner(this.props);
		},
	
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			this._calculateInner(nextProps);
		},
	
		_calculateInner: function _calculateInner(props) {
			var _props = this.props;
			var height = _props.height;
			var width = _props.width;
			var margin = _props.margin;
	
			this._innerHeight = height - margin.top - margin.bottom;
			this._innerWidth = width - margin.left - margin.right;
		}
	};
	
	module.exports = HeightWidthMixin;

/***/ },

/***/ 165:
/*!****************************************************!*\
  !*** ./~/react-d3-components/lib/ArrayifyMixin.js ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var ArrayifyMixin = {
		componentWillMount: function componentWillMount() {
			this._arrayify(this.props);
		},
	
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			this._arrayify(nextProps);
		},
	
		_arrayify: function _arrayify(props) {
			if (!Array.isArray(props.data)) {
				this._data = [props.data];
			} else {
				this._data = props.data;
			}
		}
	};
	
	module.exports = ArrayifyMixin;

/***/ },

/***/ 166:
/*!*********************************************************!*\
  !*** ./~/react-d3-components/lib/StackAccessorMixin.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var React = __webpack_require__(/*! ./ReactProvider */ 157);
	
	var StackAccessorMixin = {
		propTypes: {
			label: React.PropTypes.func,
			values: React.PropTypes.func,
			x: React.PropTypes.func,
			y: React.PropTypes.func,
			y0: React.PropTypes.func
		},
	
		getDefaultProps: function getDefaultProps() {
			return {
				label: function (stack) {
					return stack.label;
				},
				values: function (stack) {
					return stack.values;
				},
				x: function (e) {
					return e.x;
				},
				y: function (e) {
					return e.y;
				},
				y0: function (e) {
					return e.y0;
				}
			};
		}
	};
	
	module.exports = StackAccessorMixin;

/***/ },

/***/ 167:
/*!*****************************************************!*\
  !*** ./~/react-d3-components/lib/StackDataMixin.js ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var React = __webpack_require__(/*! ./ReactProvider */ 157);
	var d3 = __webpack_require__(/*! ./D3Provider */ 158);
	
	var StackDataMixin = {
		propTypes: {
			offset: React.PropTypes.string
		},
	
		getDefaultProps: function getDefaultProps() {
			return {
				offset: "zero",
				order: "default"
			};
		},
	
		componentWillMount: function componentWillMount() {
			this._stackData(this.props);
		},
	
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			this._stackData(nextProps);
		},
	
		_stackData: function _stackData(props) {
			var _props = this.props;
			var offset = _props.offset;
			var order = _props.order;
			var x = _props.x;
			var y = _props.y;
			var values = _props.values;
	
			var stack = d3.layout.stack().offset(offset).order(order).x(x).y(y).values(values);
	
			this._data = stack(this._data);
		}
	};
	
	module.exports = StackDataMixin;

/***/ },

/***/ 168:
/*!*********************************************************!*\
  !*** ./~/react-d3-components/lib/DefaultScalesMixin.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };
	
	var React = __webpack_require__(/*! ./ReactProvider */ 157);
	var d3 = __webpack_require__(/*! ./D3Provider */ 158);
	
	var DefaultScalesMixin = {
		propTypes: {
			barPadding: React.PropTypes.number
		},
	
		getDefaultProps: function getDefaultProps() {
			return {
				barPadding: 0.5
			};
		},
	
		componentWillMount: function componentWillMount() {
			this._makeScales(this.props);
		},
	
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			this._makeScales(nextProps);
		},
	
		_makeScales: function _makeScales(props) {
			var xScale = props.xScale;
			var xIntercept = props.xIntercept;
			var yScale = props.yScale;
			var yIntercept = props.yIntercept;
	
			if (!xScale) {
				var _ref = this._makeXScale();
	
				var _ref2 = _slicedToArray(_ref, 2);
	
				this._xScale = _ref2[0];
				this._xIntercept = _ref2[1];
			} else {
				var _ref3 = [xScale, xIntercept];
	
				var _ref32 = _slicedToArray(_ref3, 2);
	
				this._xScale = _ref32[0];
				this._xIntercept = _ref32[1];
			}
	
			if (!this.props.yScale) {
				var _ref4 = this._makeYScale();
	
				var _ref42 = _slicedToArray(_ref4, 2);
	
				this._yScale = _ref42[0];
				this._yIntercept = _ref42[1];
			} else {
				var _ref5 = [yScale, yIntercept];
	
				var _ref52 = _slicedToArray(_ref5, 2);
	
				this._yScale = _ref52[0];
				this._yIntercept = _ref52[1];
			}
		},
	
		_makeXScale: function _makeXScale() {
			var _props = this.props;
			var x = _props.x;
			var values = _props.values;
	
			var data = this._data;
			var datum = x(values(data[0])[0]);
	
			if (Object.prototype.toString.call(datum) == "[object Date]") {
				return this._makeDateXScale();
			} else if (isFinite(datum)) {
				return this._makeLinearXScale();
			} else {
				return this._makeOrdinalXScale();
			}
		},
	
		_makeDateXScale: function _makeDateXScale() {
			var _props = this.props;
			var x = _props.x;
			var values = _props.values;
			var data = this._data;
			var innerWidth = this._innerWidth;
	
			var extents = d3.extent(Array.prototype.concat.apply([], data.map(function (stack) {
				return values(stack).map(function (e) {
					return x(e);
				});
			})));
			var scale = d3.time.scale().domain(extents).range([0, innerWidth]);
			var zero = extents[0];
			var xIntercept = scale(zero);
	
			return [scale, xIntercept];
		},
	
		_makeLinearXScale: function _makeLinearXScale() {
			var _props = this.props;
			var x = _props.x;
			var values = _props.values;
			var data = this._data;
			var innerWidth = this._innerWidth;
	
			var extents = d3.extent(Array.prototype.concat.apply([], data.map(function (stack) {
				return values(stack).map(function (e) {
					return x(e);
				});
			})));
	
			var scale = d3.scale.linear().domain(extents).range([0, innerWidth]);
	
			var zero = d3.max([0, scale.domain()[0]]);
			var xIntercept = scale(zero);
	
			return [scale, xIntercept];
		},
	
		_makeOrdinalXScale: function _makeOrdinalXScale() {
			var _props = this.props;
			var x = _props.x;
			var values = _props.values;
			var barPadding = _props.barPadding;
			var data = this._data;
			var innerWidth = this._innerWidth;
	
			var scale = d3.scale.ordinal().domain(values(data[0]).map(function (e) {
				return x(e);
			})).rangeRoundBands([0, innerWidth], barPadding);
	
			return [scale, 0];
		},
	
		_makeYScale: function _makeYScale() {
			var _props = this.props;
			var y = _props.y;
			var values = _props.values;
	
			var data = this._data;
	
			if (isFinite(y(values(data[0])[0]))) {
				return this._makeLinearYScale();
			} else {
				return this._makeOrdinalYScale();
			}
		},
	
		_makeLinearYScale: function _makeLinearYScale() {
			var _props = this.props;
			var y = _props.y;
			var y0 = _props.y0;
			var values = _props.values;
			var data = this._data;
			var innerHeight = this._innerHeight;
	
			var extents = d3.extent(Array.prototype.concat.apply([], data.map(function (stack) {
				return values(stack).map(function (e) {
					return y0(e) + y(e);
				});
			})));
	
			// extents = [d3.min([0, extents[0]]), extents[1]];
	
			var scale = d3.scale.linear().domain(extents).range([innerHeight, 0]);
	
			var zero = d3.max([0, scale.domain()[0]]);
			var yIntercept = scale(zero);
	
			return [scale, yIntercept];
		},
	
		_makeOrdinalYScale: function _makeOrdinalYScale() {
			return [null, 0];
		}
	};
	
	module.exports = DefaultScalesMixin;

/***/ },

/***/ 169:
/*!***************************************************!*\
  !*** ./~/react-d3-components/lib/TooltipMixin.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var React = __webpack_require__(/*! ./ReactProvider */ 157);
	var d3 = __webpack_require__(/*! ./D3Provider */ 158);
	
	var TooltipMixin = {
		propTypes: {
			tooltipHtml: React.PropTypes.func
		},
	
		getInitialState: function getInitialState() {
			return {
				tooltip: {
					hidden: true
				}
			};
		},
	
		getDefaultProps: function getDefaultProps() {
			return {
				tooltipOffset: { top: -20, left: 15 },
				tooltipHtml: null
			};
		},
	
		componentDidMount: function componentDidMount() {
			this._svg_node = this.getDOMNode().getElementsByTagName("svg")[0];
		},
	
		onMouseEnter: function onMouseEnter(e, data) {
			if (!this.props.tooltipHtml) {
				return;
			}
	
			var _props = this.props;
			var margin = _props.margin;
			var xScale = _props.xScale;
			var yScale = _props.yScale;
			var tooltipHtml = _props.tooltipHtml;
	
			var svg = this._svg_node;
			var position = undefined;
			if (svg.createSVGPoint) {
				var point = svg.createSVGPoint();
				point.x = e.clientX, point.y = e.clientY;
				point = point.matrixTransform(svg.getScreenCTM().inverse());
				position = [point.x - margin.left, point.y - margin.top];
			} else {
				var rect = svg.getBoundingClientRect();
				position = [e.clientX - rect.left - svg.clientLeft - margin.left, e.clientY - rect.top - svg.clientTop - margin.top];
			}
	
			this.setState({
				tooltip: {
					top: e.pageY + this.props.tooltipOffset.top,
					left: e.pageX + this.props.tooltipOffset.left,
					hidden: false,
					html: this._tooltipHtml(data, position)
				}
			});
		},
	
		onMouseLeave: function onMouseLeave(e) {
			if (!this.props.tooltipHtml) {
				return;
			}
	
			this.setState({
				tooltip: {
					hidden: true
				}
			});
		}
	};
	
	module.exports = TooltipMixin;

/***/ },

/***/ 170:
/*!****************************************************!*\
  !*** ./~/react-d3-components/lib/AccessorMixin.js ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var React = __webpack_require__(/*! ./ReactProvider */ 157);
	
	var AccessorMixin = {
		propTypes: {
			label: React.PropTypes.func,
			values: React.PropTypes.func,
			x: React.PropTypes.func,
			y: React.PropTypes.func,
			y0: React.PropTypes.func
		},
	
		getDefaultProps: function getDefaultProps() {
			return {
				label: function (stack) {
					return stack.label;
				},
				values: function (stack) {
					return stack.values;
				},
				x: function (e) {
					return e.x;
				},
				y: function (e) {
					return e.y;
				},
				y0: function (e) {
					return 0;
				}
			};
		}
	};
	
	module.exports = AccessorMixin;

/***/ },

/***/ 171:
/*!*******************************************!*\
  !*** ./~/react-d3-components/lib/Path.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var React = __webpack_require__(/*! ./ReactProvider */ 157);
	var d3 = __webpack_require__(/*! ./D3Provider */ 158);
	
	var Path = React.createClass({
		displayName: "Path",
	
		propTypes: {
			className: React.PropTypes.string,
			stroke: React.PropTypes.string.isRequired,
			fill: React.PropTypes.string,
			d: React.PropTypes.string.isRequired,
			data: React.PropTypes.array.isRequired
		},
	
		getDefaultProps: function getDefaultProps() {
			return {
				className: "path",
				fill: "none"
			};
		},
	
		render: function render() {
			var _props = this.props;
			var className = _props.className;
			var stroke = _props.stroke;
			var fill = _props.fill;
			var d = _props.d;
			var data = _props.data;
			var onMouseEnter = _props.onMouseEnter;
			var onMouseLeave = _props.onMouseLeave;
	
			return React.createElement("path", {
				className: className,
				strokeWidth: "2",
				stroke: stroke,
				fill: fill,
				d: d,
				onMouseMove: function (evt) {
					onMouseEnter(evt, data);
				},
				onMouseLeave: function (evt) {
					onMouseLeave(evt);
				}
			});
		}
	});
	
	module.exports = Path;

/***/ }

});
//# sourceMappingURL=loader.js.map