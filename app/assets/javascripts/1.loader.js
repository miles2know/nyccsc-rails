webpackJsonp([1],{

/***/ 14:
/*!*******************************************************************!*\
  !*** ./~/react-hot-loader!./~/babel-loader!./src/docJS/n12089.js ***!
  \*******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("/Users/noon/js/rails-fixture/node_modules/react-hot-loader/node_modules/react-hot-api/modules/index.js"), RootInstanceProvider = require("/Users/noon/js/rails-fixture/node_modules/react-hot-loader/RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } (function () {
	
	"use strict";
	
	var React = __webpack_require__(/*! react */ 1);
	var Immutable = __webpack_require__(/*! immutable */ 4);
	var d3 = __webpack_require__(/*! d3 */ 2);
	var request = __webpack_require__(/*! superagent */ 6);
	var _require = __webpack_require__(/*! react-d3-components */ 3);
	
	var ScatterPlot = _require.ScatterPlot;
	var LinePlot = _require.LinePlot;
	
	var s1 = __webpack_require__(/*! ../hcnstns.json */ 115).features.map(function (f) {
	  return [f.id, f.properties];
	});
	
	var stns = new Immutable.OrderedMap(s1);
	var seasons = new Immutable.OrderedMap([["ANN", "Annual"], ["MAM", "Spring"], ["JJA", "Summer"], ["SON", "Fall"], ["DJF", "Winter"], ["Jan", "January"], ["Feb", "February"], ["Mar", "March"], ["Apr", "April"], ["May", "May"], ["Jun", "June"], ["Jul", "July"], ["Aug", "August"], ["Sep", "September"], ["Oct", "October"], ["Nov", "November"], ["Dec", "December"]]);
	
	var n12089Component = React.createClass({
	  displayName: "n12089Component",
	
	  propTypes: {
	    init: React.PropTypes.object
	  },
	
	  currentState: function currentState() {
	    return this.state.params.toJS();
	  },
	
	  defaultParams: Immutable.fromJS({
	    sid: "USH00300042",
	    element: "maxt",
	    season: "DJF" }),
	
	  getInitialState: function getInitialState() {
	    return {
	      params: this.defaultParams,
	      results: null,
	      labels: Immutable.Map({
	        title: "Average Maximum Temperature",
	        stnName: "ALBANY INTL AP"
	      }),
	      stations: stns
	    };
	  },
	
	  componentDidMount: function componentDidMount() {
	    this.makeRequest(this.state.params);
	  },
	
	  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState, nextContext) {
	    var state = this.state;
	    if (state.params !== nextState.params) {
	      this.makeRequest(nextState.params);
	      return true;
	    }
	    if (state.params === nextState.params && state.labels === nextState.labels && state.results === nextState.results && state.stations === nextState.stations) {
	      return false;
	    }return true;
	  },
	
	  makeRequest: function makeRequest(params) {
	    var _this = this;
	
	    var sid = params.get("sid"),
	        season = params.get("season"),
	        stn = stns.get(sid),
	        elemLabel = undefined,
	        reqParams = { edate: "por", sid: stn.ghcn },
	        p = ({
	      ANN: [{ interval: [1], duration: 1, reduce: "mean" }, [1900]],
	      MAM: [{ interval: [1, 0], duration: 3, reduce: "mean" }, [1900, 5]],
	      JJA: [{ interval: [1, 0], duration: 3, reduce: "mean" }, [1900, 8]],
	      SON: [{ interval: [1, 0], duration: 3, reduce: "mean" }, [1900, 11]],
	      DJF: [{ interval: [1, 0], duration: 3, reduce: "mean" }, [1900, 2]],
	      Jan: [{ interval: [1, 0], duration: 1, reduce: "mean" }, [1900, 1]],
	      Feb: [{ interval: [1, 0], duration: 1, reduce: "mean" }, [1900, 2]],
	      Mar: [{ interval: [1, 0], duration: 1, reduce: "mean" }, [1900, 3]],
	      Apr: [{ interval: [1, 0], duration: 1, reduce: "mean" }, [1900, 4]],
	      May: [{ interval: [1, 0], duration: 1, reduce: "mean" }, [1900, 5]],
	      Jun: [{ interval: [1, 0], duration: 1, reduce: "mean" }, [1900, 6]],
	      Jul: [{ interval: [1, 0], duration: 1, reduce: "mean" }, [1900, 7]],
	      Aug: [{ interval: [1, 0], duration: 1, reduce: "mean" }, [1900, 8]],
	      Sep: [{ interval: [1, 0], duration: 1, reduce: "mean" }, [1900, 9]],
	      Oct: [{ interval: [1, 0], duration: 1, reduce: "mean" }, [1900, 10]],
	      Nov: [{ interval: [1, 0], duration: 1, reduce: "mean" }, [1900, 11]],
	      Dec: [{ interval: [1, 0], duration: 1, reduce: "mean" }, [1900, 12]] })[season];
	    var elem = p[0];
	    switch (params.get("element")) {
	      case "maxt":
	        elem.vX = 1;elem.vN = 0;
	        elemLabel = seasons.get(season) + " Average Daily Maximum Temperature";
	        break;
	      case "mint":
	        elem.vX = 2;elem.vN = 0;
	        elemLabel = seasons.get(season) + " Average Daily Minimum Temperature";
	        break;
	      case "avgt":
	        elem.vX = 43;elem.vN = 0;
	        elemLabel = seasons.get(season) + " Average Daily Temperature";
	        break;
	      default:
	    }
	    reqParams.elems = [elem];
	    reqParams.sdate = p[1];
	    request.post("http://data.rcc-acis.org/StnData").send(reqParams).accept("json").end(function (res) {
	      _this.setState({
	        params: params,
	        results: res.body,
	        labels: Immutable.Map({
	          title: elemLabel,
	          stnName: stn.name })
	      });
	    });
	  },
	
	  handleStation: function handleStation(sid) {
	    var p = this.state.params;
	    if (sid == p.get("sid")) {
	      return;
	    }var n = p.set("sid", sid);
	    this.setState({ params: n });
	  },
	
	  handleElement: function handleElement(elem) {
	    var p = this.state.params;
	    if (elem == p.get("element")) {
	      return;
	    }var n = p.set("element", elem);
	    this.setState({ params: n });
	  },
	
	  handleSeason: function handleSeason(season) {
	    var p = this.state.params;
	    if (season == p.get("season")) {
	      return;
	    }var n = p.set("season", season);
	    this.setState({ params: n });
	  },
	
	  render: function render() {
	    var _this = this;
	
	    var labels = this.state.labels;
	    var stns = [];
	    this.state.stations.forEach(function (stn, sid) {
	      var name = stn.name;
	      stns.push(React.createElement(
	        "option",
	        { key: sid, value: sid },
	        stn.name
	      ));
	    });
	
	    var sOptions = [];
	    seasons.forEach(function (v, k) {
	      sOptions.push(React.createElement(
	        "option",
	        { key: k, value: k },
	        v
	      ));
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
	              { style: { border: "none" } },
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
	                    return _this.handleStation(e.target.value);
	                  }
	                },
	                stns
	              )
	            ),
	            React.createElement(
	              "fieldset",
	              { style: { border: "none" } },
	              React.createElement(
	                "label",
	                null,
	                "Element: "
	              ),
	              React.createElement(
	                "select",
	                {
	                  value: this.state.params.get("element"),
	                  onChange: function (e) {
	                    return _this.handleElement(e.target.value);
	                  }
	                },
	                React.createElement(
	                  "option",
	                  { key: "maxt", value: "maxt" },
	                  "Maximum Temperature"
	                ),
	                React.createElement(
	                  "option",
	                  { key: "mint", value: "mint" },
	                  "Minimum Temperature"
	                ),
	                React.createElement(
	                  "option",
	                  { key: "avgt", value: "avgt" },
	                  "Average Temperature"
	                )
	              )
	            ),
	            React.createElement(
	              "fieldset",
	              { style: { border: "none" } },
	              React.createElement(
	                "label",
	                null,
	                "Season: "
	              ),
	              React.createElement(
	                "select",
	                {
	                  value: this.state.params.get("season"),
	                  onChange: function (e) {
	                    return _this.handleSeason(e.target.value);
	                  }
	                },
	                sOptions
	              )
	            )
	          )
	        ),
	        React.createElement(
	          "div",
	          { className: "col-lg-offset-1 col-lg-8 col-md-offset-1 col-md-8" },
	          React.createElement(StnChart, {
	            elemName: labels.get("title"),
	            stnName: labels.get("stnName"),
	            data: this.state.results
	          })
	        )
	      )
	    );
	  }
	});
	
	var StnChart = React.createClass({
	  displayName: "StnChart",
	
	  propTypes: {
	    elemName: React.PropTypes.string,
	    stnName: React.PropTypes.string,
	    data: React.PropTypes.object
	  },
	
	  render: function render() {
	    if (this.props.data) {
	      var xAccessor = function (row) {
	        return new Date(row[0]);
	      },
	          yAccessor = function (row) {
	        return +row[1];
	      },
	          data = [{ label: "MinT", values: this.props.data.data.filter(function (d) {
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
	
	      return React.createElement(
	        "div",
	        null,
	        React.createElement(
	          "h3",
	          { style: { textAlign: "center" } },
	          this.props.elemName
	        ),
	        React.createElement(
	          "h4",
	          { style: { textAlign: "center" } },
	          this.props.stnName
	        ),
	        chart
	      );
	    } else {
	      return React.createElement("div", null);
	    }
	  }
	});
	
	module.exports = function (el, opts) {
	  var rx = React.createElement(n12089Component, { init: {} });
	  var rc = React.render(rx, el);
	  return rc.currentState;
	};
	
	/* REACT HOT LOADER */ })(); if (false) { (function () { module.hot.dispose(function (data) { data.makeHot = module.makeHot; }); if (module.exports && module.makeHot) { var makeExportsHot = require("/Users/noon/js/rails-fixture/node_modules/react-hot-loader/makeExportsHot.js"), foundReactClasses = false; if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "n12089.js" + ": " + err.message); } }); } } })(); }

/***/ },

/***/ 115:
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

/***/ }

});
//# sourceMappingURL=1.loader.js.map