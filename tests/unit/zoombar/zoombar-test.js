var zoombarTestsSetup = {
	basicOpts: {
		width: "500px",
		height: "200px",
		horizontalZoomable: true,
		verticalZoomable: false,
		windowResponse: "immediate"
	},
	genericOpts: $.extend(true, {}, this.basicOpts, {
		axes: [
			{ name: "xAxis", type: "categoryX", label: "Label"},
			{ name: "yAxis", type: "numericY" }
		],
		series: [{
			name: "series3",
			title: "Mazda",
			type: "area",
			xAxis: "xAxis",
			yAxis: "yAxis",
			valueMemberPath: "Value3",
			showTooltip: false
		}],
	}),
	barOpts: $.extend(true, {}, this.basicOpts, {
		axes: [
			{ name: "yAxis", type: "categoryY", label: "Label" },
			{ name: "xAxis", type: "numericX" }
		],
		series: [{
			name: "series1",
			title: "Test Series",
			type: "bar",
			xAxis: "xAxis",
			yAxis: "yAxis",
			valueMemberPath: "Value1",
			markerType: "circle",
			showTooltip: true,
			isHighlightingEnabled: true,
			trendLineType: "linearFit",
			trendLineBrush: "red"
		}]
	}),
	rangeOpts: $.extend(true, {}, this.basicOpts, {
		axes: [
			{ name: "xAxis", type: "categoryX", label: "Label" },
			{ name: "yAxis", type: "numericY" }
		],
		series: [{
			name: "series1",
			type: "rangeArea",
			xAxis: "xAxis",
			yAxis: "yAxis",
			lowMemberPath: "Value1",
			highMemberPath: "Value2"
		}]
	}),
	scatterOpts: $.extend(true, {}, this.basicOpts, {
		axes: [
			{ name: "xAxis", type: "numericX" },
			{ name: "yAxis", type: "numericY" }
		],
		series: [{
			name: "series1",
			type: "scatter",
			xAxis: "xAxis",
			yAxis: "yAxis",
			xMemberPath: "Value2",
			yMemberPath: "Value1",
			markerType: "circle",
		}]	
	}),
	finOpts: $.extend(true, {}, this.basicOpts, {
		axes: [{
			name: "xAxis",
			type: "categoryX",
			label: "DateString",
			labelVisibility: "collapsed"
		},
		{
			name: "yAxis",
			type: "numericY",
			labelVisibility: "collapsed"
		}],
		series: [{
			name: "series1",
			title: "Price Series",
			type: "financial",
			xAxis: "xAxis",
			yAxis: "yAxis",
			openMemberPath: "Open",
			highMemberPath: "High",
			lowMemberPath: "Low",
			closeMemberPath: "Close",
			showTooltip: true,
			thickness: 2,
			trendLineBrush: "rgba(68, 172, 214, .8)",
			trendLineThickness: 5,
			trendLineType: "exponentialAverage",
			negativeBrush: "rgba(198, 45, 54, .8)",
			displayType: "ohlc"
		}]
	}),
	chartId: "tchart",
	zoombarId: "tzoombar",
	dataSourceSize: 10,
	id: function (name) {
		return "#" + name;
	},
	chart: function () {
		return $(this.id(this.chartId));
	},
	zoombar: function () {
		return $(this.id(this.zoombarId));
	},
	generateBasicDataSource: function () {
		var i;
		this.data = [];
		for (i = 0; i < this.dataSourceSize; i++) {
			this.data.push({
				Label: i.toString(), 
				Value1: Math.round(Math.random() * 100),
				Value2: Math.round(Math.random() * 100),
				Value3: Math.round(Math.random() * 100)
			});
		}
		this.finData = [
			{ "Index": 0, "Open": 1000, "High": 1025.25, "Low": 970.25, "Close": 1025, "Volume": 1982.25, "Date": "\/Date(1262408400000)\/", "DateString": "1/2/2010", "Category": null, "Change": 25, "ChangePerCent": 2.5 }, { "Index": 1, "Open": 1025, "High": 1062.25, "Low": 1006.25, "Close": 1057, "Volume": 1981.5, "Date": "\/Date(1262494800000)\/", "DateString": "1/3/2010", "Category": null, "Change": 32, "ChangePerCent": 3.1219512195121952 }, { "Index": 2, "Open": 1057, "High": 1078.5, "Low": 1019, "Close": 1058, "Volume": 1963.25, "Date": "\/Date(1262581200000)\/", "DateString": "1/4/2010", "Category": null, "Change": 1, "ChangePerCent": 0.0946073793755913 }, { "Index": 3, "Open": 1058, "High": 1079.75, "Low": 1027.5, "Close": 1072, "Volume": 1986.25, "Date": "\/Date(1262667600000)\/", "DateString": "1/5/2010", "Category": null, "Change": 14, "ChangePerCent": 1.3232514177693762 }, { "Index": 4, "Open": 1072, "High": 1098, "Low": 1048, "Close": 1056, "Volume": 1972, "Date": "\/Date(1262754000000)\/", "DateString": "1/6/2010", "Category": null, "Change": -16, "ChangePerCent": -1.4925373134328357 }, { "Index": 5, "Open": 1056, "High": 1072.5, "Low": 1026.75, "Close": 1043, "Volume": 1969, "Date": "\/Date(1262840400000)\/", "DateString": "1/7/2010", "Category": null, "Change": -13, "ChangePerCent": -1.231060606060606 }, { "Index": 6, "Open": 1043, "High": 1062.5, "Low": 1024.25, "Close": 1029, "Volume": 1956.75, "Date": "\/Date(1262926800000)\/", "DateString": "1/8/2010", "Category": null, "Change": -14, "ChangePerCent": -1.3422818791946309 }, { "Index": 7, "Open": 1029, "High": 1063.5, "Low": 999.5, "Close": 1011, "Volume": 1967, "Date": "\/Date(1263013200000)\/", "DateString": "1/9/2010", "Category": null, "Change": -18, "ChangePerCent": -1.749271137026239 }, { "Index": 8, "Open": 1011, "High": 1037.75, "Low": 996, "Close": 1027, "Volume": 1995, "Date": "\/Date(1263099600000)\/", "DateString": "1/10/2010", "Category": null, "Change": 16, "ChangePerCent": 1.5825914935707219 }, { "Index": 9, "Open": 1027, "High": 1062, "Low": 997, "Close": 1026, "Volume": 1969.75, "Date": "\/Date(1263186000000)\/", "DateString": "1/11/2010", "Category": null, "Change": -1, "ChangePerCent": -0.097370983446932818 }, { "Index": 10, "Open": 1026, "High": 1041.5, "Low": 998.5, "Close": 1006, "Volume": 1958.25, "Date": "\/Date(1263272400000)\/", "DateString": "1/12/2010", "Category": null, "Change": -20, "ChangePerCent": -1.9493177387914229 }, { "Index": 11, "Open": 1006, "High": 1035.25, "Low": 978.5, "Close": 1018, "Volume": 1947.75, "Date": "\/Date(1263358800000)\/", "DateString": "1/13/2010", "Category": null, "Change": 12, "ChangePerCent": 1.1928429423459244 }, { "Index": 12, "Open": 1018, "High": 1035.75, "Low": 990, "Close": 1020, "Volume": 1946, "Date": "\/Date(1263445200000)\/", "DateString": "1/14/2010", "Category": null, "Change": 2, "ChangePerCent": 0.19646365422396855 }, { "Index": 13, "Open": 1020, "High": 1050, "Low": 1003.25, "Close": 1049, "Volume": 1940.5, "Date": "\/Date(1263531600000)\/", "DateString": "1/15/2010", "Category": null, "Change": 29, "ChangePerCent": 2.8431372549019609 }, { "Index": 14, "Open": 1049, "High": 1062.75, "Low": 1027.5, "Close": 1034, "Volume": 1953.25, "Date": "\/Date(1263618000000)\/", "DateString": "1/16/2010", "Category": null, "Change": -15, "ChangePerCent": -1.4299332697807436 }, { "Index": 15, "Open": 1034, "High": 1054.5, "Low": 1011.75, "Close": 1022, "Volume": 1926.25, "Date": "\/Date(1263704400000)\/", "DateString": "1/17/2010", "Category": null, "Change": -12, "ChangePerCent": -1.1605415860735011 }, { "Index": 16, "Open": 1022, "High": 1046, "Low": 994.25, "Close": 1021, "Volume": 1956.25, "Date": "\/Date(1263790800000)\/", "DateString": "1/18/2010", "Category": null, "Change": -1, "ChangePerCent": -0.097847358121330719 }, { "Index": 17, "Open": 1021, "High": 1056.25, "Low": 982.75, "Close": 1001, "Volume": 1955.25, "Date": "\/Date(1263877200000)\/", "DateString": "1/19/2010", "Category": null, "Change": -20, "ChangePerCent": -1.9588638589618024 }, { "Index": 18, "Open": 1001, "High": 1017, "Low": 979, "Close": 1014, "Volume": 1976.25, "Date": "\/Date(1263963600000)\/", "DateString": "1/20/2010", "Category": null, "Change": 13, "ChangePerCent": 1.2987012987012987 }, { "Index": 19, "Open": 1014, "High": 1037.75, "Low": 982.25, "Close": 1008, "Volume": 1966.25, "Date": "\/Date(1264050000000)\/", "DateString": "1/21/2010", "Category": null, "Change": -6, "ChangePerCent": -0.591715976331361 }, { "Index": 20, "Open": 1008, "High": 1021, "Low": 983.5, "Close": 984, "Volume": 1949.75, "Date": "\/Date(1264136400000)\/", "DateString": "1/22/2010", "Category": null, "Change": -24, "ChangePerCent": -2.3809523809523809 }, { "Index": 21, "Open": 984, "High": 1018.75, "Low": 949.5, "Close": 994, "Volume": 1921.25, "Date": "\/Date(1264222800000)\/", "DateString": "1/23/2010", "Category": null, "Change": 10, "ChangePerCent": 1.0162601626016259 }, { "Index": 22, "Open": 994, "High": 1018, "Low": 970.75, "Close": 971, "Volume": 1948.5, "Date": "\/Date(1264309200000)\/", "DateString": "1/24/2010", "Category": null, "Change": -23, "ChangePerCent": -2.3138832997987926 }, { "Index": 23, "Open": 971, "High": 998.25, "Low": 948.5, "Close": 981, "Volume": 1946.75, "Date": "\/Date(1264395600000)\/", "DateString": "1/25/2010", "Category": null, "Change": 10, "ChangePerCent": 1.0298661174047374 }, { "Index": 24, "Open": 981, "High": 995.5, "Low": 947, "Close": 991, "Volume": 1930.5, "Date": "\/Date(1264482000000)\/", "DateString": "1/26/2010", "Category": null, "Change": 10, "ChangePerCent": 1.019367991845056 }, { "Index": 25, "Open": 991, "High": 1024, "Low": 962, "Close": 970, "Volume": 1905, "Date": "\/Date(1264568400000)\/", "DateString": "1/27/2010", "Category": null, "Change": -21, "ChangePerCent": -2.119071644803229 }, { "Index": 26, "Open": 970, "High": 990.75, "Low": 942.5, "Close": 977, "Volume": 1903.5, "Date": "\/Date(1264654800000)\/", "DateString": "1/28/2010", "Category": null, "Change": 7, "ChangePerCent": 0.72164948453608246 }, { "Index": 27, "Open": 977, "High": 993, "Low": 947.5, "Close": 992, "Volume": 1899.75, "Date": "\/Date(1264741200000)\/", "DateString": "1/29/2010", "Category": null, "Change": 15, "ChangePerCent": 1.5353121801432956 }, { "Index": 28, "Open": 992, "High": 1009.5, "Low": 960.5, "Close": 979, "Volume": 1889.25, "Date": "\/Date(1264827600000)\/", "DateString": "1/30/2010", "Category": null, "Change": -13, "ChangePerCent": -1.310483870967742 }, { "Index": 29, "Open": 979, "High": 1011.75, "Low": 956.5, "Close": 994, "Volume": 1896.75, "Date": "\/Date(1264914000000)\/", "DateString": "1/31/2010", "Category": null, "Change": 15, "ChangePerCent": 1.5321756894790604 }, { "Index": 30, "Open": 994, "High": 1027.25, "Low": 967.25, "Close": 972, "Volume": 1875.5, "Date": "\/Date(1265000400000)\/", "DateString": "2/1/2010", "Category": null, "Change": -22, "ChangePerCent": -2.2132796780684103 }, { "Index": 31, "Open": 972, "High": 992.75, "Low": 953, "Close": 958, "Volume": 1860.25, "Date": "\/Date(1265086800000)\/", "DateString": "2/2/2010", "Category": null, "Change": -14, "ChangePerCent": -1.440329218106996 }, { "Index": 32, "Open": 958, "High": 994, "Low": 933, "Close": 972, "Volume": 1876.5, "Date": "\/Date(1265173200000)\/", "DateString": "2/3/2010", "Category": null, "Change": 14, "ChangePerCent": 1.4613778705636742 }, { "Index": 33, "Open": 972, "High": 981, "Low": 947.75, "Close": 970, "Volume": 1885.5, "Date": "\/Date(1265259600000)\/", "DateString": "2/4/2010", "Category": null, "Change": -2, "ChangePerCent": -0.205761316872428 }, { "Index": 34, "Open": 970, "High": 1005.5, "Low": 948.75, "Close": 955, "Volume": 1886.25, "Date": "\/Date(1265346000000)\/", "DateString": "2/5/2010", "Category": null, "Change": -15, "ChangePerCent": -1.5463917525773196 }, { "Index": 35, "Open": 955, "High": 984, "Low": 932, "Close": 958, "Volume": 1895.25, "Date": "\/Date(1265432400000)\/", "DateString": "2/6/2010", "Category": null, "Change": 3, "ChangePerCent": 0.31413612565445026 }, { "Index": 36, "Open": 958, "High": 972.25, "Low": 918.5, "Close": 967, "Volume": 1901.25, "Date": "\/Date(1265518800000)\/", "DateString": "2/7/2010", "Category": null, "Change": 9, "ChangePerCent": 0.93945720250521914 }, { "Index": 37, "Open": 967, "High": 992, "Low": 937.5, "Close": 960, "Volume": 1889.75, "Date": "\/Date(1265605200000)\/", "DateString": "2/8/2010", "Category": null, "Change": -7, "ChangePerCent": -0.72388831437435364 }, { "Index": 38, "Open": 960, "High": 981.25, "Low": 935.25, "Close": 941, "Volume": 1866, "Date": "\/Date(1265691600000)\/", "DateString": "2/9/2010", "Category": null, "Change": -19, "ChangePerCent": -1.9791666666666665 }, { "Index": 39, "Open": 941, "High": 974.5, "Low": 913.25, "Close": 916, "Volume": 1866, "Date": "\/Date(1265778000000)\/", "DateString": "2/10/2010", "Category": null, "Change": -25, "ChangePerCent": -2.6567481402763016 }, { "Index": 40, "Open": 916, "High": 933.5, "Low": 899, "Close": 904, "Volume": 1874.5, "Date": "\/Date(1265864400000)\/", "DateString": "2/11/2010", "Category": null, "Change": -12, "ChangePerCent": -1.3100436681222707 }, { "Index": 41, "Open": 904, "High": 928.5, "Low": 886.75, "Close": 901, "Volume": 1873.75, "Date": "\/Date(1265950800000)\/", "DateString": "2/12/2010", "Category": null, "Change": -3, "ChangePerCent": -0.33185840707964603 }, { "Index": 42, "Open": 901, "High": 942.5, "Low": 874, "Close": 916, "Volume": 1857.25, "Date": "\/Date(1266037200000)\/", "DateString": "2/13/2010", "Category": null, "Change": 15, "ChangePerCent": 1.6648168701442843 }, { "Index": 43, "Open": 916, "High": 929.75, "Low": 887.25, "Close": 894, "Volume": 1880.75, "Date": "\/Date(1266123600000)\/", "DateString": "2/14/2010", "Category": null, "Change": -22, "ChangePerCent": -2.4017467248908297 }, { "Index": 44, "Open": 894, "High": 908.5, "Low": 866.75, "Close": 869, "Volume": 1868.75, "Date": "\/Date(1266210000000)\/", "DateString": "2/15/2010", "Category": null, "Change": -25, "ChangePerCent": -2.796420581655481 }, { "Index": 45, "Open": 869, "High": 898.75, "Low": 846.25, "Close": 894, "Volume": 1884, "Date": "\/Date(1266296400000)\/", "DateString": "2/16/2010", "Category": null, "Change": 25, "ChangePerCent": 2.8768699654775602 }, { "Index": 46, "Open": 894, "High": 922.5, "Low": 871.25, "Close": 904, "Volume": 1898.5, "Date": "\/Date(1266382800000)\/", "DateString": "2/17/2010", "Category": null, "Change": 10, "ChangePerCent": 1.1185682326621924 }, { "Index": 47, "Open": 904, "High": 921, "Low": 879.25, "Close": 893, "Volume": 1873, "Date": "\/Date(1266469200000)\/", "DateString": "2/18/2010", "Category": null, "Change": -11, "ChangePerCent": -1.2168141592920354 }, { "Index": 48, "Open": 893, "High": 917.5, "Low": 855, "Close": 882, "Volume": 1885.5, "Date": "\/Date(1266555600000)\/", "DateString": "2/19/2010", "Category": null, "Change": -11, "ChangePerCent": -1.2318029115341544 }, { "Index": 49, "Open": 882, "High": 913, "Low": 864.25, "Close": 886, "Volume": 1872, "Date": "\/Date(1266642000000)\/", "DateString": "2/20/2010", "Category": null, "Change": 4, "ChangePerCent": 0.45351473922902497 }
		];
		this.genDataSource = new $.ig.DataSource({ dataSource: this.data });
		this.genericOpts.dataSource = this.genDataSource;
		this.barOpts.dataSource = this.genDataSource;
		this.rangeOpts.dataSource = this.genDataSource;
		this.scatterOpts.dataSource = this.genDataSource;
		this.finOpts.series[0].dataSource = this.finData;
		this.finOpts.axes[0].dataSource = this.finData;
	},
	beforeEach: function() {
		$("body").append($("<div></div>").attr("id", this.chartId).addClass("testclass"));;
		$("body").append($("<div></div>").attr("id", this.zoombarId));
	},
	afterEach: function() {
		this.chart().remove();
		this.zoombar().remove();
	}
};

zoombarTestsSetup.generateBasicDataSource();
QUnit.module("igZoombar", zoombarTestsSetup);

// Rendering tests
var testId_11 = "igZoombar test 1.1: init/destroy tests for area chart";
var testId_12 = "igZoombar test 1.2: init/destroy tests for column chart";
var testId_13 = "igZoombar test 1.3: init/destroy tests for line chart";
var testId_14 = "igZoombar test 1.4: init/destroy tests for spline area chart";
var testId_15 = "igZoombar test 1.5: init/destroy tests for spline chart";
var testId_16 = "igZoombar test 1.6: init/destroy tests for step area chart";
var testId_17 = "igZoombar test 1.7: init/destroy tests for step line chart";
var testId_18 = "igZoombar test 1.8: init/destroy tests for waterfall chart";
var testId_19 = "igZoombar test 1.9: init/destroy tests for bar chart";
var testId_110 = "igZoombar test 1.10: init/destroy tests for range area chart";
var testId_111 = "igZoombar test 1.11: init/destroy tests for range column chart";
var testId_112 = "igZoombar test 1.12: init/destroy tests for scatter chart";
var testId_113 = "igZoombar test 1.13: init/destroy tests for scatter line chart";
var testId_114 = "igZoombar test 1.14: init/destroy tests for scatter spline chart";
var testId_115 = "igZoombar test 1.15: init/destroy tests for bubble chart";
var testId_116 = "igZoombar test 1.16: init/destroy tests for financial ohlc chart";
var testId_117 = "igZoombar test 1.17: init tests for financial candlestick chart";
// API tests
var testId_21 = "igZoombar test 2.1: properties tests";
var testId_22 = "igZoombar test 2.2: public api tests";
var testId_23 = "igZoombar test 2.3: custom provider tests";
// Bug automation
var bugTest_1 = "igZoombar bug automation test 1: Zoom operation with the same zoom params shouldn't be processed";

QUnit.test(testId_11, function (assert) {
	var cloneOpts, done,
		chart = this.chart(),
		zoombar = this.zoombar();
	assert.expect(13);
	chart.igDataChart(this.genericOpts);
	zoombar.igZoombar({ target: chart });
	assert.notEqual(typeof chart.data("igDataChart"), "undefined", "chart initialization assert");
	assert.notEqual(typeof zoombar.data("igZoombar"), "undefined", "zoombar initialization assert");
	cloneOpts = zoombar.igZoombar("clone").data("igDataChart").options;
	assert.strictEqual(cloneOpts.gridMode, "none", "clone chart gridMode option assert");
	assert.strictEqual(cloneOpts.isSurfaceInteractionDisabled, false, "clone chart isSurfaceInteractionDisabled option assert");
	assert.strictEqual(cloneOpts.horizontalZoomable, false, "clone chart horizontalZoomable option assert");
	assert.strictEqual(cloneOpts.verticalZoomable, false, "clone chart verticalZoomable option assert");
	assert.strictEqual(cloneOpts.crosshairVisibility, "hidden", "clone chart crosshairVisibility option assert");
	assert.strictEqual(cloneOpts.series[0].showTooltip, false, "clone chart series tooltip assert");
	assert.strictEqual(cloneOpts.series[0].thickness, 1, "clone chart series thickness assert");
	assert.strictEqual(cloneOpts.axes[0].labelVisibility, "collapsed", "clone chart axes x labelVisibility assert");
	assert.strictEqual(cloneOpts.axes[1].labelVisibility, "collapsed", "clone chart axes y labelVisibility assert");
	done = assert.async();
	$.ig.TestUtil.wait(500).then(function () {
		chart.igDataChart("destroy");
		zoombar.igZoombar("destroy");
		assert.strictEqual(typeof chart.data("igDataChart"), "undefined", "chart destroyed assert");
		assert.strictEqual(typeof zoombar.data("igZoombar"), "undefined", "zoombar destroyed assert");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});
QUnit.test(testId_12, function (assert) {
	var cloneOpts, done,
		chart = this.chart(),
		zoombar = this.zoombar();
	assert.expect(13);
	this.genericOpts.series[0].type = "column";
	chart.igDataChart(this.genericOpts);
	zoombar.igZoombar({ target: chart });
	assert.notEqual(typeof chart.data("igDataChart"), "undefined", "chart initialization assert");
	assert.notEqual(typeof zoombar.data("igZoombar"), "undefined", "zoombar initialization assert");
	cloneOpts = zoombar.igZoombar("clone").data("igDataChart").options;
	assert.strictEqual(cloneOpts.gridMode, "none", "clone chart gridMode option assert");
	assert.strictEqual(cloneOpts.isSurfaceInteractionDisabled, false, "clone chart isSurfaceInteractionDisabled option assert");
	assert.strictEqual(cloneOpts.horizontalZoomable, false, "clone chart horizontalZoomable option assert");
	assert.strictEqual(cloneOpts.verticalZoomable, false, "clone chart verticalZoomable option assert");
	assert.strictEqual(cloneOpts.crosshairVisibility, "hidden", "clone chart crosshairVisibility option assert");
	assert.strictEqual(cloneOpts.series[0].showTooltip, false, "clone chart series tooltip assert");
	assert.strictEqual(cloneOpts.series[0].thickness, 1, "clone chart series thickness assert");
	assert.strictEqual(cloneOpts.axes[0].labelVisibility, "collapsed", "clone chart axes x labelVisibility assert");
	assert.strictEqual(cloneOpts.axes[1].labelVisibility, "collapsed", "clone chart axes y labelVisibility assert");
	done = assert.async();
	$.ig.TestUtil.wait(500).then(function () {
		chart.igDataChart("destroy");
		zoombar.igZoombar("destroy");
		assert.strictEqual(typeof chart.data("igDataChart"), "undefined", "chart destroyed assert");
		assert.strictEqual(typeof zoombar.data("igZoombar"), "undefined", "zoombar destroyed assert");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});
QUnit.test(testId_13, function (assert) {
	var cloneOpts, done,
		chart = this.chart(),
		zoombar = this.zoombar();
	assert.expect(13);
	this.genericOpts.series[0].type = "line";
	chart.igDataChart(this.genericOpts);
	zoombar.igZoombar({ target: chart });
	assert.notEqual(typeof chart.data("igDataChart"), "undefined", "chart initialization assert");
	assert.notEqual(typeof zoombar.data("igZoombar"), "undefined", "zoombar initialization assert");
	cloneOpts = zoombar.igZoombar("clone").data("igDataChart").options;
	assert.strictEqual(cloneOpts.gridMode, "none", "clone chart gridMode option assert");
	assert.strictEqual(cloneOpts.isSurfaceInteractionDisabled, false, "clone chart isSurfaceInteractionDisabled option assert");
	assert.strictEqual(cloneOpts.horizontalZoomable, false, "clone chart horizontalZoomable option assert");
	assert.strictEqual(cloneOpts.verticalZoomable, false, "clone chart verticalZoomable option assert");
	assert.strictEqual(cloneOpts.crosshairVisibility, "hidden", "clone chart crosshairVisibility option assert");
	assert.strictEqual(cloneOpts.series[0].showTooltip, false, "clone chart series tooltip assert");
	assert.strictEqual(cloneOpts.series[0].thickness, 1, "clone chart series thickness assert");
	assert.strictEqual(cloneOpts.axes[0].labelVisibility, "collapsed", "clone chart axes x labelVisibility assert");
	assert.strictEqual(cloneOpts.axes[1].labelVisibility, "collapsed", "clone chart axes y labelVisibility assert");
	done = assert.async();
	$.ig.TestUtil.wait(500).then(function () {
		chart.igDataChart("destroy");
		zoombar.igZoombar("destroy");
		assert.strictEqual(typeof chart.data("igDataChart"), "undefined", "chart destroyed assert");
		assert.strictEqual(typeof zoombar.data("igZoombar"), "undefined", "zoombar destroyed assert");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});
QUnit.test(testId_14, function (assert) {
	var cloneOpts, done,
		chart = this.chart(),
		zoombar = this.zoombar();
	assert.expect(13);
	this.genericOpts.series[0].type = "splineArea";
	chart.igDataChart(this.genericOpts);
	zoombar.igZoombar({ target: chart });
	assert.notEqual(typeof chart.data("igDataChart"), "undefined", "chart initialization assert");
	assert.notEqual(typeof zoombar.data("igZoombar"), "undefined", "zoombar initialization assert");
	cloneOpts = zoombar.igZoombar("clone").data("igDataChart").options;
	assert.strictEqual(cloneOpts.gridMode, "none", "clone chart gridMode option assert");
	assert.strictEqual(cloneOpts.isSurfaceInteractionDisabled, false, "clone chart isSurfaceInteractionDisabled option assert");
	assert.strictEqual(cloneOpts.horizontalZoomable, false, "clone chart horizontalZoomable option assert");
	assert.strictEqual(cloneOpts.verticalZoomable, false, "clone chart verticalZoomable option assert");
	assert.strictEqual(cloneOpts.crosshairVisibility, "hidden", "clone chart crosshairVisibility option assert");
	assert.strictEqual(cloneOpts.series[0].showTooltip, false, "clone chart series tooltip assert");
	assert.strictEqual(cloneOpts.series[0].thickness, 1, "clone chart series thickness assert");
	assert.strictEqual(cloneOpts.axes[0].labelVisibility, "collapsed", "clone chart axes x labelVisibility assert");
	assert.strictEqual(cloneOpts.axes[1].labelVisibility, "collapsed", "clone chart axes y labelVisibility assert");
	done = assert.async();
	$.ig.TestUtil.wait(500).then(function () {
		chart.igDataChart("destroy");
		zoombar.igZoombar("destroy");
		assert.strictEqual(typeof chart.data("igDataChart"), "undefined", "chart destroyed assert");
		assert.strictEqual(typeof zoombar.data("igZoombar"), "undefined", "zoombar destroyed assert");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});
QUnit.test(testId_15, function (assert) {
	var cloneOpts, done,
		chart = this.chart(),
		zoombar = this.zoombar();
	assert.expect(13);
	this.genericOpts.series[0].type = "spline";
	chart.igDataChart(this.genericOpts);
	zoombar.igZoombar({ target: chart });
	assert.notEqual(typeof chart.data("igDataChart"), "undefined", "chart initialization assert");
	assert.notEqual(typeof zoombar.data("igZoombar"), "undefined", "zoombar initialization assert");
	cloneOpts = zoombar.igZoombar("clone").data("igDataChart").options;
	assert.strictEqual(cloneOpts.gridMode, "none", "clone chart gridMode option assert");
	assert.strictEqual(cloneOpts.isSurfaceInteractionDisabled, false, "clone chart isSurfaceInteractionDisabled option assert");
	assert.strictEqual(cloneOpts.horizontalZoomable, false, "clone chart horizontalZoomable option assert");
	assert.strictEqual(cloneOpts.verticalZoomable, false, "clone chart verticalZoomable option assert");
	assert.strictEqual(cloneOpts.crosshairVisibility, "hidden", "clone chart crosshairVisibility option assert");
	assert.strictEqual(cloneOpts.series[0].showTooltip, false, "clone chart series tooltip assert");
	assert.strictEqual(cloneOpts.series[0].thickness, 1, "clone chart series thickness assert");
	assert.strictEqual(cloneOpts.axes[0].labelVisibility, "collapsed", "clone chart axes x labelVisibility assert");
	assert.strictEqual(cloneOpts.axes[1].labelVisibility, "collapsed", "clone chart axes y labelVisibility assert");
	done = assert.async();
	$.ig.TestUtil.wait(500).then(function () {
		chart.igDataChart("destroy");
		zoombar.igZoombar("destroy");
		assert.strictEqual(typeof chart.data("igDataChart"), "undefined", "chart destroyed assert");
		assert.strictEqual(typeof zoombar.data("igZoombar"), "undefined", "zoombar destroyed assert");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});
QUnit.test(testId_16, function (assert) {
	var cloneOpts, done,
		chart = this.chart(),
		zoombar = this.zoombar();
	assert.expect(13);
	this.genericOpts.series[0].type = "stepArea";
	chart.igDataChart(this.genericOpts);
	zoombar.igZoombar({ target: chart });
	assert.notEqual(typeof chart.data("igDataChart"), "undefined", "chart initialization assert");
	assert.notEqual(typeof zoombar.data("igZoombar"), "undefined", "zoombar initialization assert");
	cloneOpts = zoombar.igZoombar("clone").data("igDataChart").options;
	assert.strictEqual(cloneOpts.gridMode, "none", "clone chart gridMode option assert");
	assert.strictEqual(cloneOpts.isSurfaceInteractionDisabled, false, "clone chart isSurfaceInteractionDisabled option assert");
	assert.strictEqual(cloneOpts.horizontalZoomable, false, "clone chart horizontalZoomable option assert");
	assert.strictEqual(cloneOpts.verticalZoomable, false, "clone chart verticalZoomable option assert");
	assert.strictEqual(cloneOpts.crosshairVisibility, "hidden", "clone chart crosshairVisibility option assert");
	assert.strictEqual(cloneOpts.series[0].showTooltip, false, "clone chart series tooltip assert");
	assert.strictEqual(cloneOpts.series[0].thickness, 1, "clone chart series thickness assert");
	assert.strictEqual(cloneOpts.axes[0].labelVisibility, "collapsed", "clone chart axes x labelVisibility assert");
	assert.strictEqual(cloneOpts.axes[1].labelVisibility, "collapsed", "clone chart axes y labelVisibility assert");
	done = assert.async();
	$.ig.TestUtil.wait(500).then(function () {
		chart.igDataChart("destroy");
		zoombar.igZoombar("destroy");
		assert.strictEqual(typeof chart.data("igDataChart"), "undefined", "chart destroyed assert");
		assert.strictEqual(typeof zoombar.data("igZoombar"), "undefined", "zoombar destroyed assert");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});
QUnit.test(testId_17, function (assert) {
	var cloneOpts, done,
		chart = this.chart(),
		zoombar = this.zoombar();
	assert.expect(13);
	this.genericOpts.series[0].type = "stepLine";
	chart.igDataChart(this.genericOpts);
	zoombar.igZoombar({ target: chart });
	assert.notEqual(typeof chart.data("igDataChart"), "undefined", "chart initialization assert");
	assert.notEqual(typeof zoombar.data("igZoombar"), "undefined", "zoombar initialization assert");
	cloneOpts = zoombar.igZoombar("clone").data("igDataChart").options;
	assert.strictEqual(cloneOpts.gridMode, "none", "clone chart gridMode option assert");
	assert.strictEqual(cloneOpts.isSurfaceInteractionDisabled, false, "clone chart isSurfaceInteractionDisabled option assert");
	assert.strictEqual(cloneOpts.horizontalZoomable, false, "clone chart horizontalZoomable option assert");
	assert.strictEqual(cloneOpts.verticalZoomable, false, "clone chart verticalZoomable option assert");
	assert.strictEqual(cloneOpts.crosshairVisibility, "hidden", "clone chart crosshairVisibility option assert");
	assert.strictEqual(cloneOpts.series[0].showTooltip, false, "clone chart series tooltip assert");
	assert.strictEqual(cloneOpts.series[0].thickness, 1, "clone chart series thickness assert");
	assert.strictEqual(cloneOpts.axes[0].labelVisibility, "collapsed", "clone chart axes x labelVisibility assert");
	assert.strictEqual(cloneOpts.axes[1].labelVisibility, "collapsed", "clone chart axes y labelVisibility assert");
	done = assert.async();
	$.ig.TestUtil.wait(500).then(function () {
		chart.igDataChart("destroy");
		zoombar.igZoombar("destroy");
		assert.strictEqual(typeof chart.data("igDataChart"), "undefined", "chart destroyed assert");
		assert.strictEqual(typeof zoombar.data("igZoombar"), "undefined", "zoombar destroyed assert");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});
QUnit.test(testId_18, function (assert) {
	var cloneOpts, done,
		chart = this.chart(),
		zoombar = this.zoombar();
	assert.expect(13);
	this.genericOpts.series[0].type = "waterfall";
	chart.igDataChart(this.genericOpts);
	zoombar.igZoombar({ target: chart });
	assert.notEqual(typeof chart.data("igDataChart"), "undefined", "chart initialization assert");
	assert.notEqual(typeof zoombar.data("igZoombar"), "undefined", "zoombar initialization assert");
	cloneOpts = zoombar.igZoombar("clone").data("igDataChart").options;
	assert.strictEqual(cloneOpts.gridMode, "none", "clone chart gridMode option assert");
	assert.strictEqual(cloneOpts.isSurfaceInteractionDisabled, false, "clone chart isSurfaceInteractionDisabled option assert");
	assert.strictEqual(cloneOpts.horizontalZoomable, false, "clone chart horizontalZoomable option assert");
	assert.strictEqual(cloneOpts.verticalZoomable, false, "clone chart verticalZoomable option assert");
	assert.strictEqual(cloneOpts.crosshairVisibility, "hidden", "clone chart crosshairVisibility option assert");
	assert.strictEqual(cloneOpts.series[0].showTooltip, false, "clone chart series tooltip assert");
	assert.strictEqual(cloneOpts.series[0].thickness, 1, "clone chart series thickness assert");
	assert.strictEqual(cloneOpts.axes[0].labelVisibility, "collapsed", "clone chart axes x labelVisibility assert");
	assert.strictEqual(cloneOpts.axes[1].labelVisibility, "collapsed", "clone chart axes y labelVisibility assert");
	done = assert.async();
	$.ig.TestUtil.wait(500).then(function () {
		chart.igDataChart("destroy");
		zoombar.igZoombar("destroy");
		assert.strictEqual(typeof chart.data("igDataChart"), "undefined", "chart destroyed assert");
		assert.strictEqual(typeof zoombar.data("igZoombar"), "undefined", "zoombar destroyed assert");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});
QUnit.test(testId_19, function (assert) {
	var cloneOpts, done,
		chart = this.chart(),
		zoombar = this.zoombar();
	assert.expect(13);
	chart.igDataChart(this.barOpts);
	zoombar.igZoombar({ target: chart });
	assert.notEqual(typeof chart.data("igDataChart"), "undefined", "chart initialization assert");
	assert.notEqual(typeof zoombar.data("igZoombar"), "undefined", "zoombar initialization assert");
	cloneOpts = zoombar.igZoombar("clone").data("igDataChart").options;
	assert.strictEqual(cloneOpts.gridMode, "none", "clone chart gridMode option assert");
	assert.strictEqual(cloneOpts.isSurfaceInteractionDisabled, false, "clone chart isSurfaceInteractionDisabled option assert");
	assert.strictEqual(cloneOpts.horizontalZoomable, false, "clone chart horizontalZoomable option assert");
	assert.strictEqual(cloneOpts.verticalZoomable, false, "clone chart verticalZoomable option assert");
	assert.strictEqual(cloneOpts.crosshairVisibility, "hidden", "clone chart crosshairVisibility option assert");
	assert.strictEqual(cloneOpts.series[0].showTooltip, false, "clone chart series tooltip assert");
	assert.strictEqual(cloneOpts.series[0].thickness, 1, "clone chart series thickness assert");
	assert.strictEqual(cloneOpts.axes[0].labelVisibility, "collapsed", "clone chart axes x labelVisibility assert");
	assert.strictEqual(cloneOpts.axes[1].labelVisibility, "collapsed", "clone chart axes y labelVisibility assert");
	done = assert.async();
	$.ig.TestUtil.wait(500).then(function () {
		chart.igDataChart("destroy");
		zoombar.igZoombar("destroy");
		assert.strictEqual(typeof chart.data("igDataChart"), "undefined", "chart destroyed assert");
		assert.strictEqual(typeof zoombar.data("igZoombar"), "undefined", "zoombar destroyed assert");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});
QUnit.test(testId_110, function (assert) {
	var cloneOpts, done,
		chart = this.chart(),
		zoombar = this.zoombar();
	assert.expect(13);
	chart.igDataChart(this.rangeOpts);
	zoombar.igZoombar({ target: chart });
	assert.notEqual(typeof chart.data("igDataChart"), "undefined", "chart initialization assert");
	assert.notEqual(typeof zoombar.data("igZoombar"), "undefined", "zoombar initialization assert");
	cloneOpts = zoombar.igZoombar("clone").data("igDataChart").options;
	assert.strictEqual(cloneOpts.gridMode, "none", "clone chart gridMode option assert");
	assert.strictEqual(cloneOpts.isSurfaceInteractionDisabled, false, "clone chart isSurfaceInteractionDisabled option assert");
	assert.strictEqual(cloneOpts.horizontalZoomable, false, "clone chart horizontalZoomable option assert");
	assert.strictEqual(cloneOpts.verticalZoomable, false, "clone chart verticalZoomable option assert");
	assert.strictEqual(cloneOpts.crosshairVisibility, "hidden", "clone chart crosshairVisibility option assert");
	assert.strictEqual(cloneOpts.series[0].showTooltip, false, "clone chart series tooltip assert");
	assert.strictEqual(cloneOpts.series[0].thickness, 1, "clone chart series thickness assert");
	assert.strictEqual(cloneOpts.axes[0].labelVisibility, "collapsed", "clone chart axes x labelVisibility assert");
	assert.strictEqual(cloneOpts.axes[1].labelVisibility, "collapsed", "clone chart axes y labelVisibility assert");
	done = assert.async();
	$.ig.TestUtil.wait(500).then(function () {
		chart.igDataChart("destroy");
		zoombar.igZoombar("destroy");
		assert.strictEqual(typeof chart.data("igDataChart"), "undefined", "chart destroyed assert");
		assert.strictEqual(typeof zoombar.data("igZoombar"), "undefined", "zoombar destroyed assert");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});
QUnit.test(testId_111, function (assert) {
	var cloneOpts, done,
		chart = this.chart(),
		zoombar = this.zoombar();
	assert.expect(13);
	this.rangeOpts.series[0].type = "rangeColumn";
	chart.igDataChart(this.rangeOpts);
	zoombar.igZoombar({ target: chart });
	assert.notEqual(typeof chart.data("igDataChart"), "undefined", "chart initialization assert");
	assert.notEqual(typeof zoombar.data("igZoombar"), "undefined", "zoombar initialization assert");
	cloneOpts = zoombar.igZoombar("clone").data("igDataChart").options;
	assert.strictEqual(cloneOpts.gridMode, "none", "clone chart gridMode option assert");
	assert.strictEqual(cloneOpts.isSurfaceInteractionDisabled, false, "clone chart isSurfaceInteractionDisabled option assert");
	assert.strictEqual(cloneOpts.horizontalZoomable, false, "clone chart horizontalZoomable option assert");
	assert.strictEqual(cloneOpts.verticalZoomable, false, "clone chart verticalZoomable option assert");
	assert.strictEqual(cloneOpts.crosshairVisibility, "hidden", "clone chart crosshairVisibility option assert");
	assert.strictEqual(cloneOpts.series[0].showTooltip, false, "clone chart series tooltip assert");
	assert.strictEqual(cloneOpts.series[0].thickness, 1, "clone chart series thickness assert");
	assert.strictEqual(cloneOpts.axes[0].labelVisibility, "collapsed", "clone chart axes x labelVisibility assert");
	assert.strictEqual(cloneOpts.axes[1].labelVisibility, "collapsed", "clone chart axes y labelVisibility assert");
	done = assert.async();
	$.ig.TestUtil.wait(500).then(function () {
		chart.igDataChart("destroy");
		zoombar.igZoombar("destroy");
		assert.strictEqual(typeof chart.data("igDataChart"), "undefined", "chart destroyed assert");
		assert.strictEqual(typeof zoombar.data("igZoombar"), "undefined", "zoombar destroyed assert");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});
QUnit.test(testId_112, function (assert) {
	var cloneOpts, done,
		chart = this.chart(),
		zoombar = this.zoombar();
	assert.expect(13);
	chart.igDataChart(this.scatterOpts);
	zoombar.igZoombar({ target: chart });
	assert.notEqual(typeof chart.data("igDataChart"), "undefined", "chart initialization assert");
	assert.notEqual(typeof zoombar.data("igZoombar"), "undefined", "zoombar initialization assert");
	cloneOpts = zoombar.igZoombar("clone").data("igDataChart").options;
	assert.strictEqual(cloneOpts.gridMode, "none", "clone chart gridMode option assert");
	assert.strictEqual(cloneOpts.isSurfaceInteractionDisabled, false, "clone chart isSurfaceInteractionDisabled option assert");
	assert.strictEqual(cloneOpts.horizontalZoomable, false, "clone chart horizontalZoomable option assert");
	assert.strictEqual(cloneOpts.verticalZoomable, false, "clone chart verticalZoomable option assert");
	assert.strictEqual(cloneOpts.crosshairVisibility, "hidden", "clone chart crosshairVisibility option assert");
	assert.strictEqual(cloneOpts.series[0].showTooltip, false, "clone chart series tooltip assert");
	assert.strictEqual(cloneOpts.series[0].thickness, 1, "clone chart series thickness assert");
	assert.strictEqual(cloneOpts.axes[0].labelVisibility, "collapsed", "clone chart axes x labelVisibility assert");
	assert.strictEqual(cloneOpts.axes[1].labelVisibility, "collapsed", "clone chart axes y labelVisibility assert");
	done = assert.async();
	$.ig.TestUtil.wait(500).then(function () {
		chart.igDataChart("destroy");
		zoombar.igZoombar("destroy");
		assert.strictEqual(typeof chart.data("igDataChart"), "undefined", "chart destroyed assert");
		assert.strictEqual(typeof zoombar.data("igZoombar"), "undefined", "zoombar destroyed assert");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});
QUnit.test(testId_113, function (assert) {
	var cloneOpts, done,
		chart = this.chart(),
		zoombar = this.zoombar();
	assert.expect(13);
	this.scatterOpts.series[0].type = "scatterLine";
	chart.igDataChart(this.scatterOpts);
	zoombar.igZoombar({ target: chart });
	assert.notEqual(typeof chart.data("igDataChart"), "undefined", "chart initialization assert");
	assert.notEqual(typeof zoombar.data("igZoombar"), "undefined", "zoombar initialization assert");
	cloneOpts = zoombar.igZoombar("clone").data("igDataChart").options;
	assert.strictEqual(cloneOpts.gridMode, "none", "clone chart gridMode option assert");
	assert.strictEqual(cloneOpts.isSurfaceInteractionDisabled, false, "clone chart isSurfaceInteractionDisabled option assert");
	assert.strictEqual(cloneOpts.horizontalZoomable, false, "clone chart horizontalZoomable option assert");
	assert.strictEqual(cloneOpts.verticalZoomable, false, "clone chart verticalZoomable option assert");
	assert.strictEqual(cloneOpts.crosshairVisibility, "hidden", "clone chart crosshairVisibility option assert");
	assert.strictEqual(cloneOpts.series[0].showTooltip, false, "clone chart series tooltip assert");
	assert.strictEqual(cloneOpts.series[0].thickness, 1, "clone chart series thickness assert");
	assert.strictEqual(cloneOpts.axes[0].labelVisibility, "collapsed", "clone chart axes x labelVisibility assert");
	assert.strictEqual(cloneOpts.axes[1].labelVisibility, "collapsed", "clone chart axes y labelVisibility assert");
	done = assert.async();
	$.ig.TestUtil.wait(500).then(function () {
		chart.igDataChart("destroy");
		zoombar.igZoombar("destroy");
		assert.strictEqual(typeof chart.data("igDataChart"), "undefined", "chart destroyed assert");
		assert.strictEqual(typeof zoombar.data("igZoombar"), "undefined", "zoombar destroyed assert");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});
QUnit.test(testId_114, function (assert) {
	var cloneOpts, done,
		chart = this.chart(),
		zoombar = this.zoombar();
	assert.expect(13);
	this.scatterOpts.series[0].type = "scatterSpline";
	chart.igDataChart(this.scatterOpts);
	zoombar.igZoombar({ target: chart });
	assert.notEqual(typeof chart.data("igDataChart"), "undefined", "chart initialization assert");
	assert.notEqual(typeof zoombar.data("igZoombar"), "undefined", "zoombar initialization assert");
	cloneOpts = zoombar.igZoombar("clone").data("igDataChart").options;
	assert.strictEqual(cloneOpts.gridMode, "none", "clone chart gridMode option assert");
	assert.strictEqual(cloneOpts.isSurfaceInteractionDisabled, false, "clone chart isSurfaceInteractionDisabled option assert");
	assert.strictEqual(cloneOpts.horizontalZoomable, false, "clone chart horizontalZoomable option assert");
	assert.strictEqual(cloneOpts.verticalZoomable, false, "clone chart verticalZoomable option assert");
	assert.strictEqual(cloneOpts.crosshairVisibility, "hidden", "clone chart crosshairVisibility option assert");
	assert.strictEqual(cloneOpts.series[0].showTooltip, false, "clone chart series tooltip assert");
	assert.strictEqual(cloneOpts.series[0].thickness, 1, "clone chart series thickness assert");
	assert.strictEqual(cloneOpts.axes[0].labelVisibility, "collapsed", "clone chart axes x labelVisibility assert");
	assert.strictEqual(cloneOpts.axes[1].labelVisibility, "collapsed", "clone chart axes y labelVisibility assert");
	done = assert.async();
	$.ig.TestUtil.wait(500).then(function () {
		chart.igDataChart("destroy");
		zoombar.igZoombar("destroy");
		assert.strictEqual(typeof chart.data("igDataChart"), "undefined", "chart destroyed assert");
		assert.strictEqual(typeof zoombar.data("igZoombar"), "undefined", "zoombar destroyed assert");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});
QUnit.test(testId_115, function (assert) {
	var cloneOpts, bubbleOpts = {}, done,
		chart = this.chart(),
		zoombar = this.zoombar();
	assert.expect(13);
	$.extend(true, bubbleOpts, this.scatterOpts, { 
		series: [{
			type: "bubble",
			radiusMemberPath: "Value2",
			fillMemberPath: "Value3",
			labelMemberPath: "Value2",
			markerType: "circle",
			fillScale: {
				type: "value",
				brushes: ["red", "blue"],
				minimumValue: 0,
				maximumValue: 20
			}
		}]
	});
	chart.igDataChart(bubbleOpts);
	zoombar.igZoombar({ target: chart });
	assert.notEqual(typeof chart.data("igDataChart"), "undefined", "chart initialization assert");
	assert.notEqual(typeof zoombar.data("igZoombar"), "undefined", "zoombar initialization assert");
	cloneOpts = zoombar.igZoombar("clone").data("igDataChart").options;
	assert.strictEqual(cloneOpts.gridMode, "none", "clone chart gridMode option assert");
	assert.strictEqual(cloneOpts.isSurfaceInteractionDisabled, false, "clone chart isSurfaceInteractionDisabled option assert");
	assert.strictEqual(cloneOpts.horizontalZoomable, false, "clone chart horizontalZoomable option assert");
	assert.strictEqual(cloneOpts.verticalZoomable, false, "clone chart verticalZoomable option assert");
	assert.strictEqual(cloneOpts.crosshairVisibility, "hidden", "clone chart crosshairVisibility option assert");
	assert.strictEqual(cloneOpts.series[0].showTooltip, false, "clone chart series tooltip assert");
	assert.strictEqual(cloneOpts.series[0].thickness, 1, "clone chart series thickness assert");
	assert.strictEqual(cloneOpts.axes[0].labelVisibility, "collapsed", "clone chart axes x labelVisibility assert");
	assert.strictEqual(cloneOpts.axes[1].labelVisibility, "collapsed", "clone chart axes y labelVisibility assert");
	done = assert.async();
	$.ig.TestUtil.wait(500).then(function () {
		chart.igDataChart("destroy");
		zoombar.igZoombar("destroy");
		assert.strictEqual(typeof chart.data("igDataChart"), "undefined", "chart destroyed assert");
		assert.strictEqual(typeof zoombar.data("igZoombar"), "undefined", "zoombar destroyed assert");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});
QUnit.test(testId_116, function (assert) {
	var cloneOpts, done,
		chart = this.chart(),
		zoombar = this.zoombar();
	assert.expect(13);
	chart.igDataChart(this.finOpts);
	zoombar.igZoombar({ target: chart });
	assert.notEqual(typeof chart.data("igDataChart"), "undefined", "chart initialization assert");
	assert.notEqual(typeof zoombar.data("igZoombar"), "undefined", "zoombar initialization assert");
	cloneOpts = zoombar.igZoombar("clone").data("igDataChart").options;
	assert.strictEqual(cloneOpts.gridMode, "none", "clone chart gridMode option assert");
	assert.strictEqual(cloneOpts.isSurfaceInteractionDisabled, false, "clone chart isSurfaceInteractionDisabled option assert");
	assert.strictEqual(cloneOpts.horizontalZoomable, false, "clone chart horizontalZoomable option assert");
	assert.strictEqual(cloneOpts.verticalZoomable, false, "clone chart verticalZoomable option assert");
	assert.strictEqual(cloneOpts.crosshairVisibility, "hidden", "clone chart crosshairVisibility option assert");
	assert.strictEqual(cloneOpts.series[0].showTooltip, false, "clone chart series tooltip assert");
	assert.strictEqual(cloneOpts.series[0].thickness, 1, "clone chart series thickness assert");
	assert.strictEqual(cloneOpts.axes[0].labelVisibility, "collapsed", "clone chart axes x labelVisibility assert");
	assert.strictEqual(cloneOpts.axes[1].labelVisibility, "collapsed", "clone chart axes y labelVisibility assert");
	done = assert.async();
	$.ig.TestUtil.wait(500).then(function () {
		chart.igDataChart("destroy");
		zoombar.igZoombar("destroy");
		assert.strictEqual(typeof chart.data("igDataChart"), "undefined", "chart destroyed assert");
		assert.strictEqual(typeof zoombar.data("igZoombar"), "undefined", "zoombar destroyed assert");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});
QUnit.test(testId_117, function (assert) {
	var cloneOpts, finOptsClone = $.extend(true, {}, this.finOpts), done,
		chart = this.chart(),
		zoombar = this.zoombar();
	assert.expect(11);
	finOptsClone.series[0].dataSource = this.finData;
	finOptsClone.axes[0].dataSource = this.finData;
	finOptsClone.series[0].displayType = "candleStick";
	chart.igDataChart(finOptsClone);
	zoombar.igZoombar({ target: chart });
	assert.notEqual(typeof chart.data("igDataChart"), "undefined", "chart initialization assert");
	assert.notEqual(typeof zoombar.data("igZoombar"), "undefined", "zoombar initialization assert");
	cloneOpts = zoombar.igZoombar("clone").data("igDataChart").options;
	assert.strictEqual(cloneOpts.gridMode, "none", "clone chart gridMode option assert");
	assert.strictEqual(cloneOpts.isSurfaceInteractionDisabled, false, "clone chart isSurfaceInteractionDisabled option assert");
	assert.strictEqual(cloneOpts.horizontalZoomable, false, "clone chart horizontalZoomable option assert");
	assert.strictEqual(cloneOpts.verticalZoomable, false, "clone chart verticalZoomable option assert");
	assert.strictEqual(cloneOpts.crosshairVisibility, "hidden", "clone chart crosshairVisibility option assert");
	assert.strictEqual(cloneOpts.series[0].showTooltip, false, "clone chart series tooltip assert");
	assert.strictEqual(cloneOpts.series[0].thickness, 1, "clone chart series thickness assert");
	assert.strictEqual(cloneOpts.axes[0].labelVisibility, "collapsed", "clone chart axes x labelVisibility assert");
	assert.strictEqual(cloneOpts.axes[1].labelVisibility, "collapsed", "clone chart axes y labelVisibility assert");
	done = assert.async();
	$.ig.TestUtil.wait(500).then(function () {
		chart.igDataChart("destroy");
		zoombar.igZoombar("destroy");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});
QUnit.test(testId_21, function (assert) {
	var cloneOpts, finOptsClone = $.extend(true, {}, this.finOpts), done,
		chart = this.chart(),
		zoombar = this.zoombar();
	assert.expect(20);
	chart.igDataChart(finOptsClone);
	zoombar.igZoombar({
		provider: $.ig.ZoombarProviderDataChart,
		providerCreated: function (evt, ui) {
			ui.provider.targetObject($(".testclass").data("igDataChart"));
		},
		target: ".testclass",
		clone: "none",
		width: "600px",
		height: "300px"
	});
	assert.notEqual(typeof chart.data("igDataChart"), "undefined", "chart initialization assert");
	assert.notEqual(typeof zoombar.data("igZoombar"), "undefined", "zoombar initialization assert");
	assert.strictEqual(typeof zoombar.igZoombar("clone").data("igDataChart"), "undefined", "clone none should not create a clone assert");
	assert.strictEqual(typeof zoombar.data("igZoombar")._provider.settings.targetObject, "object", "zoombar should still create a provider assert");
	assert.strictEqual(zoombar.outerWidth(), 600, "zoombar assings proper width assert");
	assert.strictEqual(zoombar.outerHeight(), 300, "zoombar assings proper height assert");
	done = assert.async();
	$.ig.TestUtil.wait(500).then(function () {
		zoombar.igZoombar("destroy");
		zoombar.igZoombar({
			target: ".testclass",
			zoomWindowMoveDistance: 20,
			defaultZoomWindow: {
				left: 40,
				width: 20
			},
			zoomWindowMinWidth: 10,
			windowPanDuration: 0
		});
		assert.notEqual(typeof chart.data("igDataChart"), "undefined", "chart initialization assert");
		assert.notEqual(typeof zoombar.data("igZoombar"), "undefined", "zoombar initialization assert");
		assert.strictEqual(typeof zoombar.igZoombar("clone").data("igDataChart"), "object", "clone none should not create a clone assert");
		assert.strictEqual(typeof zoombar.data("igZoombar")._provider.settings.targetObject, "object", "zoombar should still create a provider assert");
		assert.strictEqual(zoombar.outerWidth(), 500, "zoombar assings proper width assert");
		assert.strictEqual(zoombar.outerHeight(), 70, "zoombar assings proper height assert");
		assert.strictEqual(zoombar.data("igZoombar")._cw.left.toFixed(2), "0.40", "zoombar assings proper left for window assert");
		assert.strictEqual(zoombar.data("igZoombar")._cw.width.toFixed(2), "0.20", "zoombar assings proper width for window assert");
		assert.strictEqual(chart.data("igDataChart")._chart.windowRect().s.toFixed(2), "0.40", "zoombar assings proper left to chart assert");
		assert.strictEqual(chart.data("igDataChart")._chart.windowRect().r.toFixed(2), "0.20", "zoombar assings proper width to chart assert");
		// test zoomWindowMoveDistance
		$("#tzoombar_zoombar_buttons_right").children().first().trigger("click");
		assert.strictEqual(zoombar.data("igZoombar")._cw.left.toFixed(2), "0.60", "zoombar assings proper left for window assert");
		assert.strictEqual(zoombar.data("igZoombar")._cw.width.toFixed(2), "0.20", "zoombar assings proper width for window assert");
		assert.strictEqual(chart.data("igDataChart")._chart.windowRect().s.toFixed(2), "0.60", "zoombar assings proper left to chart assert");
		assert.strictEqual(chart.data("igDataChart")._chart.windowRect().r.toFixed(2), "0.20", "zoombar assings proper width to chart assert");
		chart.igDataChart("destroy");
		zoombar.igZoombar("destroy");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
	// test zoomWindowMinWidth
	/* trigger for the current jquery version doesn't work - commenting until we update
	var event = jQuery.Event("mousewheel");
	event.originalEvent = { mouseWheel: 1320 };
	$(".ui-igzoombar-mask").trigger(event);
	assert.strictEqual(zoombar.data("igZoombar")._cw.width.toFixed(2), "0.10", "zoombar does not let the width to be lowered below the minimum assert");
	assert.strictEqual(chart.data("igDataChart")._chart.windowRect().__width.toFixed(2), "0.10", "zoombar does not let the width of the chart to be lowered below the minimum assert");
	*/
});
QUnit.test(testId_22, function (assert) {
	var cloneOpts, finOptsClone = $.extend(true, {}, this.finOpts), done,
		chart = this.chart(),
		zoombar = this.zoombar();
	assert.expect(8);
	chart.igDataChart(finOptsClone);
	zoombar.igZoombar({
		target: ".testclass",
		zoomWindowMoveDistance: 20,
		defaultZoomWindow: {
			left: 40,
			width: 20
		},
		zoomWindowMinWidth: 10,
		windowPanDuration: 0
	});
	zoombar.igZoombar("zoom", 10, 50);
	assert.strictEqual(zoombar.data("igZoombar")._cw.left.toFixed(2), "0.10", "zoom method assings proper left for window assert");
	assert.strictEqual(zoombar.data("igZoombar")._cw.width.toFixed(2), "0.50", "zoom method assings proper width for window assert");
	assert.strictEqual(chart.data("igDataChart")._chart.windowRect().s.toFixed(2), "0.10", "zoom method assings proper left to chart assert");
	assert.strictEqual(chart.data("igDataChart")._chart.windowRect().r.toFixed(2), "0.50", "zoom method assings proper width to chart assert");
	zoombar.igZoombar("zoom", -100, 200);
	assert.strictEqual(zoombar.data("igZoombar")._cw.left.toFixed(2), "0.00", "zoom method assings proper left for window assert");
	assert.strictEqual(zoombar.data("igZoombar")._cw.width.toFixed(2), "1.00", "zoom method assings proper width for window assert");
	assert.strictEqual(chart.data("igDataChart")._chart.windowRect().s.toFixed(2), "0.00", "zoom method assings proper left to chart assert");
	assert.strictEqual(chart.data("igDataChart")._chart.windowRect().r.toFixed(2), "1.00", "zoom method assings proper width to chart assert");
	done = assert.async();
	$.ig.TestUtil.wait(500).then(function () {
		chart.igDataChart("destroy");
		zoombar.igZoombar("destroy");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});
QUnit.test(testId_23, function (assert) {
	var cloneOpts, finOptsClone = $.extend(true, {}, this.finOpts), done,
		chart = this.chart(),
		zoombar = this.zoombar();
	assert.expect(6);
	chart.igDataChart(finOptsClone);
	ZoombarProviderDataChartCustom = $.ig.ZoombarProviderDataChart.extend({});
	zoombar.igZoombar({
		provider: ZoombarProviderDataChartCustom,
		providerCreated: function (evt, ui) {
			ui.provider.targetObject($(".testclass").data("igDataChart"));
		},
		target: ".testclass",
		clone: "none",
		width: "600px",
		height: "300px"
	});
	assert.notEqual(typeof chart.data("igDataChart"), "undefined", "chart initialization assert");
	assert.notEqual(typeof zoombar.data("igZoombar"), "undefined", "zoombar initialization assert");
	assert.strictEqual(typeof zoombar.igZoombar("clone").data("igDataChart"), "undefined", "clone none should not create a clone assert");
	assert.strictEqual(typeof zoombar.data("igZoombar")._provider.settings.targetObject, "object", "zoombar should still create a provider assert");
	assert.strictEqual(zoombar.outerWidth(), 600, "zoombar assings proper width assert");
	assert.strictEqual(zoombar.outerHeight(), 300, "zoombar assings proper height assert");
	done = assert.async();
	$.ig.TestUtil.wait(500).then(function () {
		chart.igDataChart("destroy");
		zoombar.igZoombar("destroy");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});
// test for issue #454
QUnit.test(bugTest_1, function (assert) {
	var cloneOpts, zi, done,
		chart = this.chart(),
		zoombar = this.zoombar();
	assert.expect(1);
	this.genericOpts.series[0].type = "line";
	chart.igDataChart(this.genericOpts);
	zoombar.igZoombar({
		target: chart,
		zoomChanging: function () {
			assert.ok(true, "zoomChanging fires due to a change in zoom")
		}
	});
	done = assert.async();
	$.ig.TestUtil.wait(500).then(function () {
		zi = zoombar.data("igZoombar");
		// first should be processed
		zi._zoom(0.6, 0.2, true, true);
		// second shouldn't - only one event handling should be detected
		zi._zoom(zi._cw.left, zi._cw.width, true, true);
		chart.igDataChart("destroy");
		zoombar.igZoombar("destroy");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});