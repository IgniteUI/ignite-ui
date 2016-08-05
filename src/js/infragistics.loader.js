/*!@license Infragistics.Web.Loader <build_number>
*
* Copyright (c) 2011-<year> Infragistics Inc.
*
* http://www.infragistics.com/
*
*/

/*global jQuery*/
if (typeof jQuery !== "function") {
	throw new Error("jQuery is undefined");
}

(function ($) {
$.ig = $.ig || {};

$.ig.loaderClass = $.ig.loaderClass || {};

$.ig.loaderClass.locale = {
	dvGroup: "Data Visualization",
	editorsGroup: "Editors",
	frameworkGroup: "Framework",
	gridGroup: "Grid",
	layoutGroup: "Layout",
	interactionsGroup: "Interactions",
	pivotGroup: "Olap Pivot",
	miscGroup: "Miscellaneous"
};

$.ig.dependencies = [
	{
		widget: "theme",
		scripts: [  ],
		internal: true,
		css: [ "$path$/themes/$theme$/infragistics.theme.css" ]
	},
	{
		widget: "regional",
		scripts: [  ],
		css: [  ],
		internal: true,
		regional: [ "$localePath$/regional/infragistics.ui.regional-$regional$.js" ]
	},
	{
		widget: "igDataSource",
		dependency: [ { name: "igUtil" } ],
		priority: true,
		scripts: [ "$path$/modules/infragistics.datasource.js" ],
		locale: [ "$localePath$/infragistics.datasource-$locale$.js" ],
		group: $.ig.loaderClass.locale.frameworkGroup,
		css: [  ]
	},
	{
		widget: "igOlapXmlaDataSource",
		dependency: [ { name: "igUtil" } ],
		scripts: [ "$path$/modules/infragistics.olapxmladatasource.js" ],
		group: $.ig.loaderClass.locale.frameworkGroup,
		css: [  ]
	},
	{
		widget: "igOlapFlatDataSource",
		dependency: [ { name: "igUtil" } ],
		scripts: [ "$path$/modules/infragistics.olapflatdatasource.js" ],
		group: $.ig.loaderClass.locale.frameworkGroup,
		css: [  ]
	},
	{
		widget: "igTemplating",
		dependency: [ { name: "igUtil" } ],
		scripts: [ "$path$/modules/infragistics.templating.js" ],
		locale: [ "$localePath$/infragistics.templating-$locale$.js" ],
		group: $.ig.loaderClass.locale.miscGroup,
		css: [  ]
	},

/* /// Data Visualization /// */
	{
		widget: "_ig_ext_core",
		dependency: [ { name: "igUtil" } ],
		group: $.ig.loaderClass.locale.dvGroup,
		scripts: [ "$path$/modules/infragistics.ext_core.js" ]
	},
	{
		widget: "_ig_ext_collections",
		group: $.ig.loaderClass.locale.dvGroup,
		dependency: [ { name: "_ig_ext_core" } ],
		scripts: [ "$path$/modules/infragistics.ext_collections.js" ]
	},
	{
		widget: "_ig_ext_collections_extended",
		group: $.ig.loaderClass.locale.dvGroup,
		dependency: [ { name: "_ig_ext_collections" } ],
		scripts: [ "$path$/modules/infragistics.ext_collectionsextended.js" ]
	},
	{
		widget: "_ig_ext_text",
		group: $.ig.loaderClass.locale.dvGroup,
		dependency: [ { name: "_ig_ext_core" } ],
		scripts: [ "$path$/modules/infragistics.ext_text.js" ]
	},
	{
		widget: "_ig_ext_io",
		group: $.ig.loaderClass.locale.dvGroup,
		dependency: [ { name: "_ig_ext_text" } ],
		scripts: [ "$path$/modules/infragistics.ext_io.js" ]
	},
	{
		widget: "_ig_ext_threading",
		group: $.ig.loaderClass.locale.dvGroup,
		dependency: [ { name: "_ig_ext_core" } ],
		scripts: [ "$path$/modules/infragistics.ext_threading.js" ]
	},
	{
		widget: "_ig_ext_ui",
		group: $.ig.loaderClass.locale.dvGroup,
		dependency: [ { name: "_ig_ext_collections" } ],
		scripts: [ "$path$/modules/infragistics.ext_ui.js" ]
	},
	{
		widget: "_ig_ext_web",
		group: $.ig.loaderClass.locale.dvGroup,
		dependency: [ { name: "_ig_ext_io" }, { name: "_ig_ext_threading" } ],
		scripts: [ "$path$/modules/infragistics.ext_web.js" ]
	},
	{
		widget: "_ig_dv_core",
		group: $.ig.loaderClass.locale.dvGroup,
		dependency: [ { name: "_ig_ext_ui" } ],
		scripts: [ "$path$/modules/infragistics.dv_core.js" ]
	},
	{
		widget: "_ig_dv_geo",
		group: $.ig.loaderClass.locale.dvGroup,
		dependency: [ { name: "_ig_ext_io" }, { name: "_ig_ext_ui" }, { name: "_ig_dv_core" } ],
		scripts: [ "$path$/modules/infragistics.dv_geo.js" ]
	},
	{
		widget: "_ig_dv_geometry",
		group: $.ig.loaderClass.locale.dvGroup,
		dependency: [ { name: "_ig_dv_core" } ],
		scripts: [ "$path$/modules/infragistics.dv_geometry.js" ]
	},
	{
		widget: "_ig_dv_opd",
		group: $.ig.loaderClass.locale.dvGroup,
		dependency: [ { name: "_ig_dv_core" } ],
		scripts: [ "$path$/modules/infragistics.dv_opd.js" ]
	},
	{
		widget: "_ig_legend",
		priority: true,
		group: $.ig.loaderClass.locale.dvGroup,
		dependency: [ { name: "_ig_ext_ui" }, { name: "_ig_dv_core" } ],
		scripts: [ "$path$/modules/infragistics.legend.js" ]
	},
	{
		widget: "_ig_datachart_core",
		priority: true,
		group: $.ig.loaderClass.locale.dvGroup,
		dependency: [ { name: "_ig_dv_geometry" } ],
		scripts: [ "$path$/modules/infragistics.datachart_core.js" ]
	},
	{
		widget: "_ig_datachart_categorycore",
		priority: true,
		group: $.ig.loaderClass.locale.dvGroup,
		dependency: [ { name: "_ig_datachart_core" } ],
		scripts: [ "$path$/modules/infragistics.datachart_categorycore.js" ]
	},
	{
		widget: "_ig_dv_commonwidget",
		dependency: [ { name: "_ig_datachart_core" } ],
		scripts: [ "$path$/modules/infragistics.dvcommonwidget.js" ],
		group: $.ig.loaderClass.locale.dvGroup,
		locale: [ "$localePath$/infragistics.dvcommonwidget-$locale$.js" ]
	},
	{
		widget: "_ig_dv_extendedaxes",
		group: $.ig.loaderClass.locale.dvGroup,
		dependency: [ { name: "_ig_datachart_categorycore" }],
		scripts: [ "$path$/modules/infragistics.datachart_extendedaxes.js" ]
	},

	{
		widget: "igChartLegend",
		group: $.ig.loaderClass.locale.dvGroup,
		dependency: [ { name: "_ig_legend" }, { name: "_ig_dv_commonwidget" } ],
		scripts: [ "$path$/modules/infragistics.ui.chartlegend.js" ]
	},
	{
		widget: "igDateTimeAxis",
		group: $.ig.loaderClass.locale.dvGroup,
		dependency: [ { name: "_ig_dv_extendedaxes" } ],
		scripts: []
	},
	{
		widget: "igOPDPane",
		group: $.ig.loaderClass.locale.dvGroup,
		dependency: [ { name: "_ig_dv_core" } ],
		scripts: [ "$path$/modules/infragistics.dv_opd.js" ]
	},

	{
		widget: "igDataChart",
		dependency: [ { name: "_ig_datachart_core" }, { name: "_ig_dv_commonwidget" },
					{ name: "igTemplating" }, { name: "igDataSource" } ],
		scripts: [ "$path$/modules/infragistics.ui.chart.js" ],
		group: $.ig.loaderClass.locale.dvGroup,
		css: [
			"$path$/structure/modules/infragistics.ui.shared.css",
			"$path$/structure/modules/infragistics.ui.chart.css",
			"$path$/structure/modules/infragistics.ui.html5.css"
			]
	},
	{
		widget: "Category",
		parentWidget: "igDataChart",
		dependency: [ { name: "_ig_datachart_categorycore" }, { name: "igDataChart" } ],
		group: $.ig.loaderClass.locale.dvGroup,
		scripts: [ "$path$/modules/infragistics.datachart_category.js" ]
	},
	{
		widget: "RangeCategory",
		parentWidget: "igDataChart",
		dependency: [ { name: "_ig_datachart_categorycore" }, { name: "igDataChart" } ],
		group: $.ig.loaderClass.locale.dvGroup,
		scripts: [ "$path$/modules/infragistics.datachart_rangecategory.js" ]
	},
	{
		widget: "VerticalCategory",
		parentWidget: "igDataChart",
		dependency: [ { name: "_ig_datachart_categorycore" }, { name: "igDataChart" } ],
		group: $.ig.loaderClass.locale.dvGroup,
		scripts: [ "$path$/modules/infragistics.datachart_verticalcategory.js" ]
	},
	{
		widget: "Financial",
		parentWidget: "igDataChart",
		dependency: [ { name: "_ig_datachart_categorycore" }, { name: "igDataChart" } ],
		group: $.ig.loaderClass.locale.dvGroup,
		scripts: [ "$path$/modules/infragistics.datachart_financial.js" ]
	},
	{
		widget: "ExtendedFinancial",
		parentWidget: "igDataChart",
		dependency: [ { name: "Financial" } ],
		group: $.ig.loaderClass.locale.dvGroup,
		scripts: [ "$path$/modules/infragistics.datachart_extendedfinancial.js" ]
	},
	{
		widget: "Polar",
		parentWidget: "igDataChart",
		dependency: [ { name: "_ig_dv_extendedaxes" }, { name: "igDataChart" } ],
		group: $.ig.loaderClass.locale.dvGroup,
		scripts: [ "$path$/modules/infragistics.datachart_polar.js" ]
	},
	{
		widget: "Radial",
		parentWidget: "igDataChart",
		dependency: [ { name: "_ig_dv_extendedaxes" }, { name: "igDataChart" } ],
		group: $.ig.loaderClass.locale.dvGroup,
		scripts: [ "$path$/modules/infragistics.datachart_radial.js" ]
	},
	{
		widget: "Scatter",
		parentWidget: "igDataChart",
		dependency: [ { name: "igDataChart" } ],
		group: $.ig.loaderClass.locale.dvGroup,
		scripts: [ "$path$/modules/infragistics.datachart_scatter.js" ]
	},
	{
		widget: "Stacked",
		parentWidget: "igDataChart",
		dependency: [ { name: "Category" } ],
		group: $.ig.loaderClass.locale.dvGroup,
		scripts: [ "$path$/modules/infragistics.datachart_stacked.js" ]
	},
	{
		widget: "Annotation",
		parentWidget: "igDataChart",
		dependency: [ { name: "igDataChart" } ],
		group: $.ig.loaderClass.locale.dvGroup,
		scripts: [ "$path$/modules/infragistics.datachart_annotation.js" ]
	},
	{
		widget: "igDataChart.*",
		dependency: [ { name: "Category" },
					{ name: "RangeCategory" },
					{ name: "VerticalCategory" },
					{ name: "Financial" },
					{ name: "Polar" },
					{ name: "Radial" },
					{ name: "Scatter" },
					{ name: "Stacked" },
					{ name: "Annotation" } ]
	},

	{
		widget: "igPieChart",
		dependency: [ { name: "igDataChart" } ],
		group: $.ig.loaderClass.locale.dvGroup,
		scripts: [
			"$path$/modules/infragistics.piechart.js"
			]
	},

	{
		widget: "igDoughnutChart",
		dependency: [ { name: "igPieChart" } ],
		group: $.ig.loaderClass.locale.dvGroup,
		scripts: [
			"$path$/modules/infragistics.doughnutchart.js",
			"$path$/modules/infragistics.ui.basechart.js",
			"$path$/modules/infragistics.ui.doughnutchart.js"
			],
		locale: [ "$localePath$/infragistics.ui.doughnutchart-$locale$.js" ]
	},

	{
		widget: "igFunnelChart",
		dependency: [ { name: "_ig_dv_geometry" }, { name: "_ig_dv_commonwidget" },
					{ name: "igTemplating" }, { name: "igDataSource" } ],
		scripts: [
			"$path$/modules/infragistics.funnelchart.js",
			"$path$/modules/infragistics.ui.basechart.js",
			"$path$/modules/infragistics.ui.funnelchart.js"
			],
		group: $.ig.loaderClass.locale.dvGroup,
		css: [ "$path$/structure/modules/infragistics.ui.chart.css" ]
	},

	{
		widget: "_ig_dv_simple_core",
		priority: true,
		group: $.ig.loaderClass.locale.dvGroup,
		scripts: [ "$path$/modules/infragistics.dv.simple.core.js" ]
	},
	{
		widget: "_ig_simple_datachart_core",
		dependency: [ { name: "igUtil" }, { name: "igTemplating" }, { name: "igDataSource" } ],
		scripts: [ "$path$/modules/infragistics.ui.basechart.js" ],
		group: $.ig.loaderClass.locale.dvGroup,
		css: [ "$path$/structure/modules/infragistics.ui.shared.css",
			"$path$/structure/modules/infragistics.ui.html5.css" ]
	},

	{
		widget: "igSparkline",
		dependency: [ { name: "_ig_dv_geometry" }, { name: "_ig_dv_simple_core" },
					{ name: "_ig_simple_datachart_core" } ],
		scripts: [
			"$path$/modules/infragistics.chart_sparkline.js",
			"$path$/modules/infragistics.ui.sparkline.js"
			],
		group: $.ig.loaderClass.locale.dvGroup,
		css: [ "$path$/structure/modules/infragistics.ui.sparkline.css" ]
	},

	{
		widget: "igRadialGauge",
		dependency: [ { name: "_ig_dv_geometry" } ],
		scripts: [
			"$path$/modules/infragistics.radialgauge.js",
			"$path$/modules/infragistics.ui.radialgauge.js"
			],
		group: $.ig.loaderClass.locale.dvGroup,
		css: [ "$path$/structure/modules/infragistics.ui.radialgauge.css" ]
	},

	{
		widget: "igBulletGraph",
		dependency: [ { name: "_ig_dv_geometry" } ],
		scripts: [
			"$path$/modules/infragistics.bulletgraph.js",
			"$path$/modules/infragistics.ui.bulletgraph.js"
			],
		group: $.ig.loaderClass.locale.dvGroup,
		css: [ "$path$/structure/modules/infragistics.ui.bulletgraph.css" ]
	},

	{
		widget: "igLinearGauge",
		dependency: [ { name: "_ig_dv_geometry" } ],
		scripts: [
			"$path$/modules/infragistics.lineargauge.js",
			"$path$/modules/infragistics.ui.lineargauge.js"
			],
		group: $.ig.loaderClass.locale.dvGroup
		/*css: [ "$path$/structure/modules/infragistics.ui.lineargauge.css" ] */
	},

	{
		widget: "igRadialGauge",
		dependency: [ { name: "_ig_dv_geometry" } ],
		scripts: [
			"$path$/modules/infragistics.ui.radialgauge.js",
			"$path$/modules/infragistics.gauge_radialgauge.js"
			],
		group: $.ig.loaderClass.locale.dvGroup,
		css: [ "$path$/structure/modules/infragistics.ui.radialgauge.css" ]
	},

	{
		widget: "igBulletGraph",
		dependency: [ { name: "_ig_dv_geometry" } ],
		scripts: [
			"$path$/modules/infragistics.ui.bulletgraph.js",
			"$path$/modules/infragistics.gauge_bulletgraph.js"
			],
		group: $.ig.loaderClass.locale.dvGroup,
		css: [ "$path$/structure/modules/infragistics.ui.bulletgraph.css" ]
	},

	{
		widget: "igLinearGauge",
		dependency: [
			{ name: "_ig_dv_geometry" }
			],
		scripts: [
			"$path$/modules/infragistics.ui.lineargauge.js",
			"$path$/modules/infragistics.gauge_lineargauge.js"
			],
		group: $.ig.loaderClass.locale.dvGroup
		/*css: [ "$path$/structure/modules/infragistics.ui.lineargauge.css" ] */
	},
/* /// End Data Visualization /// */

	{
		widget: "igRadialMenu",
		dependency: [
			{ name: "igUtil" },
			{ name: "_ig_dv_simple_core" }
			],
		scripts: [
			"$path$/modules/infragistics.radialmenu_core.js",
			"$path$/modules/infragistics.ui.radialmenu.js"
			],
		group: $.ig.loaderClass.locale.interactionsGroup,
		css: [ "$path$/structure/modules/infragistics.ui.radialmenu.css" ]
	},

	{
		widget: "igQRCodeBarcode",
		dependency: [
			{ name: "igUtil" },
			{ name: "_ig_dv_simple_core" }
			],
		scripts: [
			"$path$/modules/infragistics.barcode_qrcodebarcode.js",
			"$path$/modules/infragistics.ui.barcode.js"
			],
		locale: [ "$localePath$/infragistics.ui.barcode-$locale$.js" ],
		group: $.ig.loaderClass.locale.dvGroup
		/*css: [ "$path$/structure/modules/infragistics.ui.barcode.css" ] */
	},
	{
		widget: "igQRCodeBarcode.*",
		dependency: [ { name: "igQRCodeBarcode" } ],
		scripts: [ "$path$/modules/encoding/infragistics.encoding.js" ]
	},
	{
		widget: "Big5",
		parentWidget: "igQRCodeBarcode",
		dependency: [ { name: "igQRCodeBarcode" } ],
		group: $.ig.loaderClass.locale.dvGroup,
		scripts: [
			"$path$/modules/encoding/infragistics.encoding.core.js",
			"$path$/modules/encoding/infragistics.encoding_big5.js"
			]
	},
	{
		widget: "CP437",
		parentWidget: "igQRCodeBarcode",
		dependency: [ { name: "igQRCodeBarcode" } ],
		group: $.ig.loaderClass.locale.dvGroup,
		scripts: [
			"$path$/modules/encoding/infragistics.encoding.core.js",
			"$path$/modules/encoding/infragistics.encoding_cp437.js"
			]
	},
	{
		widget: "GB2312",
		parentWidget: "igQRCodeBarcode",
		dependency: [ { name: "igQRCodeBarcode" } ],
		group: $.ig.loaderClass.locale.dvGroup,
		scripts: [
			"$path$/modules/encoding/infragistics.encoding.core.js",
			"$path$/modules/encoding/infragistics.encoding_gb2312.js"
			]
	},
	{
		widget: "ISO646-US",
		parentWidget: "igQRCodeBarcode",
		dependency: [ { name: "igQRCodeBarcode" } ],
		group: $.ig.loaderClass.locale.dvGroup,
		scripts: [
			"$path$/modules/encoding/infragistics.encoding.core.js",
			"$path$/modules/encoding/infragistics.encoding_iso646-us.js"
			]
	},
	{
		widget: "ISO-8859-1",
		parentWidget: "igQRCodeBarcode",
		dependency: [ { name: "igQRCodeBarcode" } ],
		group: $.ig.loaderClass.locale.dvGroup,
		scripts: [
			"$path$/modules/encoding/infragistics.encoding.core.js",
			"$path$/modules/encoding/infragistics.encoding_iso-8859-1.js"
			]
	},
	{
		widget: "ISO-8859-2",
		parentWidget: "igQRCodeBarcode",
		dependency: [ { name: "igQRCodeBarcode" } ],
		group: $.ig.loaderClass.locale.dvGroup,
		scripts: [
			"$path$/modules/encoding/infragistics.encoding.core.js",
			"$path$/modules/encoding/infragistics.encoding_iso-8859-2.js"
			]
	},
	{
		widget: "ISO-8859-3",
		parentWidget: "igQRCodeBarcode",
		dependency: [ { name: "igQRCodeBarcode" } ],
		group: $.ig.loaderClass.locale.dvGroup,
		scripts: [
			"$path$/modules/encoding/infragistics.encoding.core.js",
			"$path$/modules/encoding/infragistics.encoding_iso-8859-3.js"
			]
	},
	{
		widget: "ISO-8859-4",
		parentWidget: "igQRCodeBarcode",
		dependency: [ { name: "igQRCodeBarcode" } ],
		group: $.ig.loaderClass.locale.dvGroup,
		scripts: [
			"$path$/modules/encoding/infragistics.encoding.core.js",
			"$path$/modules/encoding/infragistics.encoding_iso-8859-4.js"
			]
	},
	{
		widget: "ISO-8859-5",
		parentWidget: "igQRCodeBarcode",
		dependency: [ { name: "igQRCodeBarcode" } ],
		group: $.ig.loaderClass.locale.dvGroup,
		scripts: [
			"$path$/modules/encoding/infragistics.encoding.core.js",
			"$path$/modules/encoding/infragistics.encoding_iso-8859-5.js"
			]
	},
	{
		widget: "ISO-8859-6",
		parentWidget: "igQRCodeBarcode",
		dependency: [ { name: "igQRCodeBarcode" } ],
		group: $.ig.loaderClass.locale.dvGroup,
		scripts: [
			"$path$/modules/encoding/infragistics.encoding.core.js",
			"$path$/modules/encoding/infragistics.encoding_iso-8859-6.js"
			]
	},
	{
		widget: "ISO-8859-7",
		parentWidget: "igQRCodeBarcode",
		dependency: [ { name: "igQRCodeBarcode" } ],
		group: $.ig.loaderClass.locale.dvGroup,
		scripts: [
			"$path$/modules/encoding/infragistics.encoding.core.js",
			"$path$/modules/encoding/infragistics.encoding_iso-8859-7.js"
			]
	},
	{
		widget: "ISO-8859-8",
		parentWidget: "igQRCodeBarcode",
		dependency: [ { name: "igQRCodeBarcode" } ],
		group: $.ig.loaderClass.locale.dvGroup,
		scripts: [
			"$path$/modules/encoding/infragistics.encoding.core.js",
			"$path$/modules/encoding/infragistics.encoding_iso-8859-8.js"
			]
	},
	{
		widget: "ISO-8859-9",
		parentWidget: "igQRCodeBarcode",
		dependency: [ { name: "igQRCodeBarcode" } ],
		group: $.ig.loaderClass.locale.dvGroup,
		scripts: [
			"$path$/modules/encoding/infragistics.encoding.core.js",
			"$path$/modules/encoding/infragistics.encoding_iso-8859-9.js"
			]
	},
	{
		widget: "ISO-8859-11",
		parentWidget: "igQRCodeBarcode",
		dependency: [ { name: "igQRCodeBarcode" } ],
		group: $.ig.loaderClass.locale.dvGroup,
		scripts: [
			"$path$/modules/encoding/infragistics.encoding.core.js",
			"$path$/modules/encoding/infragistics.encoding_iso-8859-11.js"
			]
	},
	{
		widget: "ISO-8859-13",
		parentWidget: "igQRCodeBarcode",
		dependency: [ { name: "igQRCodeBarcode" } ],
		group: $.ig.loaderClass.locale.dvGroup,
		scripts: [
			"$path$/modules/encoding/infragistics.encoding.core.js",
			"$path$/modules/encoding/infragistics.encoding_iso-8859-13.js"
			]
	},
	{
		widget: "ISO-8859-15",
		parentWidget: "igQRCodeBarcode",
		dependency: [ { name: "igQRCodeBarcode" } ],
		group: $.ig.loaderClass.locale.dvGroup,
		scripts: [
			"$path$/modules/encoding/infragistics.encoding.core.js",
			"$path$/modules/encoding/infragistics.encoding_iso-8859-15.js"
			]
	},
	{
		widget: "KSC5601",
		parentWidget: "igQRCodeBarcode",
		dependency: [ { name: "igQRCodeBarcode" } ],
		group: $.ig.loaderClass.locale.dvGroup,
		scripts: [
			"$path$/modules/encoding/infragistics.encoding.core.js",
			"$path$/modules/encoding/infragistics.encoding_ksc5601.js"
			]
	},
	{
		widget: "Shift_JIS",
		parentWidget: "igQRCodeBarcode",
		dependency: [ { name: "igQRCodeBarcode" } ],
		group: $.ig.loaderClass.locale.dvGroup,
		scripts: [
			"$path$/modules/encoding/infragistics.encoding.core.js",
			"$path$/modules/encoding/infragistics.encoding_shift_jis.js"
			]
	},
	{
		widget: "Windows-1250",
		parentWidget: "igQRCodeBarcode",
		dependency: [ { name: "igQRCodeBarcode" } ],
		group: $.ig.loaderClass.locale.dvGroup,
		scripts: [
			"$path$/modules/encoding/infragistics.encoding.core.js",
			"$path$/modules/encoding/infragistics.encoding_windows-1250.js"
			]
	},
	{
		widget: "Windows-1251",
		parentWidget: "igQRCodeBarcode",
		dependency: [ { name: "igQRCodeBarcode" } ],
		group: $.ig.loaderClass.locale.dvGroup,
		scripts: [
			"$path$/modules/encoding/infragistics.encoding.core.js",
			"$path$/modules/encoding/infragistics.encoding_windows-1251.js"
			]
	},
	{
		widget: "Windows-1252",
		parentWidget: "igQRCodeBarcode",
		dependency: [ { name: "igQRCodeBarcode" } ],
		group: $.ig.loaderClass.locale.dvGroup,
		scripts: [
			"$path$/modules/encoding/infragistics.encoding.core.js",
			"$path$/modules/encoding/infragistics.encoding_windows-1252.js"
			]
	},
	{
		widget: "Windows-1256",
		parentWidget: "igQRCodeBarcode",
		dependency: [ { name: "igQRCodeBarcode" } ],
		group: $.ig.loaderClass.locale.dvGroup,
		scripts: [
			"$path$/modules/encoding/infragistics.encoding.core.js",
			"$path$/modules/encoding/infragistics.encoding_windows-1256.js"
			]
	},

	{
		widget: "igCombo",
		dependency: [
			{ name: "igUtil" },
			{ name: "igDataSource" },
			{ name: "igTemplating" },
			{ name: "igScroll" },
			{ name: "igValidator" }
			],
		scripts: [ "$path$/modules/infragistics.ui.combo.js" ],
		locale: [ "$localePath$/infragistics.ui.combo-$locale$.js" ],
		group: $.ig.loaderClass.locale.editorsGroup,
		css: [
			"$path$/structure/modules/infragistics.ui.shared.css",
			"$path$/structure/modules/infragistics.ui.combo.css"
			]
	},
	{
		widget: "igDialog",
		dependency: [ { name: "igUtil" } ],
		scripts: [ "$path$/modules/infragistics.ui.dialog.js" ],
		locale: [ "$localePath$/infragistics.ui.dialog-$locale$.js" ],
		group: $.ig.loaderClass.locale.layoutGroup,
		css: [ "$path$/structure/modules/infragistics.ui.dialog.css" ]
	},
	{
		widget: "igEditors",
		dependency: [
			{ name: "igUtil" },
			{ name: "regional" },
			{ name: "igScroll" },
			{ name: "igValidator" }
			],
		scripts: [ "$path$/modules/infragistics.ui.editors.js" ],
		locale: [ "$localePath$/infragistics.ui.editors-$locale$.js" ],
		group: $.ig.loaderClass.locale.editorsGroup,
		css: [
			"$path$/structure/modules/infragistics.ui.shared.css",
			"$path$/structure/modules/infragistics.ui.editors.css"
			]
	},
	{
		widget: "igZoombar",
		dependency: [ { name: "igUtil" }, { name: "igShared" } ],
		scripts: [ "$path$/modules/infragistics.ui.zoombar.js" ],
		locale: [ "$localePath$/infragistics.ui.zoombar-$locale$.js" ],
		css: [
			"$path$/structure/modules/infragistics.ui.shared.css",
			"$path$/structure/modules/infragistics.ui.zoombar.css"
			]
	},

/*/ igGrid /// */
	{
		widget: "igGrid",
		dependency: [
			{ name: "igUtil" },
			{ name: "regional" },
			{ name: "igDataSource" },
			{ name: "igTemplating" },
			{ name: "igShared" },
			{ name: "igScroll" }
			],
		scripts: [ "$path$/modules/infragistics.ui.grid.framework.js" ],
		locale: [ "$localePath$/infragistics.ui.grid-$locale$.js" ],
		group: $.ig.loaderClass.locale.gridGroup,
		css: [ "$path$/structure/modules/infragistics.ui.grid.css" ]
	},
	{
		widget: "ColumnMoving",
		parentWidget: "igGrid,igHierarchicalGrid",
		dependency: [
			{ name: "igGrid" },
			{ name: "FeatureChooser" },
			{ name: "igTree" }
			],
		scripts: [ "$path$/modules/infragistics.ui.grid.columnmoving.js" ],
		css: [  ]
	},
	{
		widget: "Responsive",
		parentWidget: "igGrid,igHierarchicalGrid",
		dependency: [ { name: "igGrid" } ],
		scripts: [ "$path$/modules/infragistics.ui.grid.responsive.js" ],
		css: [  ]
	},
	{
		widget: "GridShared",
		parentWidget: "igGrid,igHierarchicalGrid,igTreeGrid,igPivotGrid",
		dependency: [
			{ name: "igUtil" },
			{ name: "igGrid" }
			],
		scripts: [ "$path$/modules/infragistics.ui.grid.shared.js" ],
		css: [  ]
	},
	{
		widget: "FeatureChooser",
		parentWidget: "igGrid,igHierarchicalGrid",
		dependency: [
			{ name: "igGrid" },
			{ name: "GridShared" },
			{ name: "igPopover" }
			],
		scripts: [ "$path$/modules/infragistics.ui.grid.featurechooser.js" ],
		css: [  ]
	},
	{
		widget: "Filtering",
		parentWidget: "igGrid,igHierarchicalGrid",
		dependency: [
			{ name: "igGrid" },
			{ name: "igEditors" },
			{ name: "FeatureChooser" }
			],
		scripts: [ "$path$/modules/infragistics.ui.grid.filtering.js" ],
		css: [  ]
	},
	{
		widget: "GroupBy",
		parentWidget: "igGrid,igHierarchicalGrid",
		dependency: [
			{ name: "igGrid" },
			{ name: "FeatureChooser" },
			{ name: "igTree" }
			],
		scripts: [ "$path$/modules/infragistics.ui.grid.groupby.js" ],
		css: [  ]
	},
	{
		widget: "Hiding",
		parentWidget: "igGrid,igHierarchicalGrid",
		dependency: [
			{ name: "igGrid" },
			{ name: "FeatureChooser" }
			],
		scripts: [ "$path$/modules/infragistics.ui.grid.hiding.js" ],
		css: [  ]
	},
	{
		widget: "CellMerging",
		parentWidget: "igGrid,igHierarchicalGrid",
		dependency: [ { name: "igGrid" } ],
		scripts: [ "$path$/modules/infragistics.ui.grid.cellmerging.js" ],
		css: [  ]
	},
	{
		widget: "Paging",
		parentWidget: "igGrid,igHierarchicalGrid",
		dependency: [
			{ name: "igGrid" },
			{ name: "igEditors" }
			],
		scripts: [ "$path$/modules/infragistics.ui.grid.paging.js" ],
		css: [  ]
	},
	{
		widget: "Resizing",
		parentWidget: "igGrid,igHierarchicalGrid",
		dependency: [
			{ name: "igGrid" },
			{ name: "FeatureChooser" }
			],
		scripts: [ "$path$/modules/infragistics.ui.grid.resizing.js" ],
		css: [  ]
	},
	{
		widget: "RowSelectors",
		parentWidget: "igGrid,igHierarchicalGrid",
		dependency: [ { name: "igGrid" } ],
		scripts: [ "$path$/modules/infragistics.ui.grid.rowselectors.js" ],
		css: [  ]
	},
	{
		widget: "Selection",
		parentWidget: "igGrid,igHierarchicalGrid",
		dependency: [ { name: "igGrid" } ],
		scripts: [ "$path$/modules/infragistics.ui.grid.selection.js" ],
		css: [  ]
	},
	{
		widget: "Sorting",
		parentWidget: "igGrid,igHierarchicalGrid",
		dependency: [ { name: "igGrid" }, { name: "FeatureChooser" } ],
		scripts: [ "$path$/modules/infragistics.ui.grid.sorting.js" ],
		css: [  ]
	},
	{
		widget: "Summaries",
		parentWidget: "igGrid,igHierarchicalGrid",
		dependency: [
			{ name: "igGrid" },
			{ name: "FeatureChooser" }
			],
		scripts: [ "$path$/modules/infragistics.ui.grid.summaries.js" ],
		css: [  ]
	},
	{
		widget: "MultiColumnHeaders",
		parentWidget: "igGrid,igHierarchicalGrid",
		dependency: [ { name: "igGrid" } ],
		scripts: [ "$path$/modules/infragistics.ui.grid.multicolumnheaders.js" ],
		css: [  ]
	},
	{
		widget: "Tooltips",
		parentWidget: "igGrid,igHierarchicalGrid",
		dependency: [
			{ name: "igGrid" },
			{ name: "igPopover" }
			],
		scripts: [ "$path$/modules/infragistics.ui.grid.tooltips.js" ],
		css: [  ]
	},
	{
		widget: "ColumnFixing",
		parentWidget: "igGrid",
		dependency: [ { name: "igGrid" } ],
		scripts: [ "$path$/modules/infragistics.ui.grid.columnfixing.js" ],
		css: [  ]
	},
	{
		widget: "Updating",
		parentWidget: "igGrid,igHierarchicalGrid",
		dependency: [
			{ name: "igGrid" },
			{ name: "igEditors" },
			{ name: "igValidator" },
			{ name: "GridShared" }
			],
		scripts: [ "$path$/modules/infragistics.ui.grid.updating.js" ],
		css: [  ]
	},
	{
		widget: "AppendRowsOnDemand",
		parentWidget: "igGrid",
		dependency: [ { name: "igGrid" } ],
		scripts: [ "$path$/modules/infragistics.ui.grid.appendrowsondemand.js" ],
		css: [  ]
	},
	{
		widget: "igGrid.*",
		dependency: [ { name: "FeatureChooser" },
					{ name: "Filtering" },
					{ name: "GroupBy" },
					{ name: "Hiding" },
					{ name: "CellMerging" },
					{ name: "Paging" },
					{ name: "Resizing" },
					{ name: "RowSelectors" },
					{ name: "Selection" },
					{ name: "Sorting" },
					{ name: "Summaries" },
					{ name: "Tooltips" },
					{ name: "ColumnFixing" },
					{ name: "MultiColumnHeaders" },
					{ name: "ColumnMoving" },
					{ name: "Updating" },
					{ name: "Responsive" },
					{ name: "AppendRowsOnDemand" } ],
		scripts: [  ],
		css: [  ]
	},
/*/ end igGrid /// */

/*/ igHierarchicalGrid /// */
	{
		widget: "igHierarchicalGrid",
		dependency: [ { name: "igGrid" } ],
		scripts: [ "$path$/modules/infragistics.ui.grid.hierarchical.js" ],
		group: $.ig.loaderClass.locale.gridGroup,
		css: [  ]
	},
	{
		widget: "igHierarchicalGrid.*",
		dependency: [ { name: "igHierarchicalGrid" },
					{ name: "FeatureChooser" },
					{ name: "Filtering" },
					{ name: "GroupBy" },
					{ name: "Hiding" },
					{ name: "CellMerging" },
					{ name: "Paging" },
					{ name: "Resizing" },
					{ name: "RowSelectors" },
					{ name: "Selection" },
					{ name: "Sorting" },
					{ name: "Summaries" },
					{ name: "MultiColumnHeaders" },
					{ name: "ColumnMoving" },
					{ name: "Tooltips" },
					{ name: "Updating" },
					{ name: "Responsive" } ],
		scripts: [  ],
		css: [  ]
	},
/*/ end igHierarchicalGrid /// */

	{
		widget: "igHtmlEditor",
		dependency: [
			{ name: "igUtil" },
			{ name: "igPopover" },
			{ name: "igSplitButton" },
			{ name: "igColorPicker" },
			{ name: "igColorPickerSplitButton" },
			{ name: "igCombo" }, { name: "igEditors" },
			{ name: "igToolbarButton" },
			{ name: "igToolbar" }
			],
		scripts: [ "$path$/modules/infragistics.ui.htmleditor.js" ],
		locale: [ "$localePath$/infragistics.ui.htmleditor-$locale$.js" ],
		group: $.ig.loaderClass.locale.editorsGroup,
		css: [ "$path$/structure/modules/infragistics.ui.htmleditor.css" ]
	},

/*/ igMap /// */
	{
		widget: "igMap",
		dependency: [
			{ name: "_ig_ext_collections" },
			{ name: "_ig_ext_web" },
			{ name: "_ig_dv_geo" },
			{ name: "Scatter" }
			],
		scripts: [ "$path$/modules/infragistics.geographicmap_core.js",
					"$path$/modules/infragistics.ui.map.js" ],
		group: $.ig.loaderClass.locale.dvGroup,
		css: [
			"$path$/structure/modules/infragistics.ui.shared.css",
			"$path$/structure/modules/infragistics.ui.map.css"
			]
	},
/*/ end igMap /// */

	{
		widget: "igPivotShared",
		dependency: [ { name: "igScroll" }, { name: "igTree" } ],
		scripts: [ "$path$/modules/infragistics.ui.pivot.shared.js" ],
		locale: [ "$localePath$/infragistics.ui.pivot.shared-$locale$.js" ],
		group: $.ig.loaderClass.locale.pivotGroup,
		css: [ "$path$/structure/modules/infragistics.ui.pivot.css" ]
	},

	{
		widget: "igPivotGrid",
		dependency: [
			{ name: "igPivotShared" },
			{ name: "MultiColumnHeaders" }
			],
		scripts: [ "$path$/modules/infragistics.ui.pivotgrid.js" ],
		locale: [ "$localePath$/infragistics.ui.pivotgrid-$locale$.js" ],
		group: $.ig.loaderClass.locale.pivotGroup,
		css: [  ]
	},

	{
		widget: "igPivotDataSelector",
		dependency: [
			{ name: "igPivotShared" },
			{ name: "igCombo" },
			{ name: "igTree" }
			],
		scripts: [ "$path$/modules/infragistics.ui.pivotdataselector.js" ],
		locale: [ "$localePath$/infragistics.ui.pivotdataselector-$locale$.js" ],
		group: $.ig.loaderClass.locale.pivotGroup,
		css: [  ]
	},

	{
		widget: "igPivotView",
		dependency: [
			{ name: "igSplitter" },
			{ name: "igPivotGrid" },
			{ name: "igPivotDataSelector" }
			],
		scripts: [ "$path$/modules/infragistics.ui.pivotview.js" ],
		locale: [  ],
		group: $.ig.loaderClass.locale.pivotGroup,
		css: [  ]
	},

	{
		widget: "igRating",
		/* I.K. March 6th, 2013 Bug #135150 The rating now depends on util */
		/* as of jQuery 1.9 because browser specific checks are now in util */
		dependency: [ { name: "igUtil" } ],
		scripts: [ "$path$/modules/infragistics.ui.rating.js" ],
		locale: [ "$localePath$/infragistics.ui.rating-$locale$.js" ],
		group: $.ig.loaderClass.locale.editorsGroup,
		css: [
			"$path$/structure/modules/infragistics.ui.shared.css",
			"$path$/structure/modules/infragistics.ui.rating.css"
			]
	},

	{
		widget: "igReportViewer",
		dependency: [
			{ name: "Category" },
			{ name: "Financial" }
			],
		scripts: [ "$path$/modules/infragistics.ui.reportviewer.js" ],
		locale: [ "$localePath$/infragistics.ui.reportviewer-$locale$.js" ],
		group: $.ig.loaderClass.locale.miscGroup,
		css: [ "$path$/structure/modules/infragistics.ui.reportviewer.css" ]
	},

	{
		widget: "igScroll",
		dependency: [ { name: "igUtil" } ],
		scripts: [ "$path$/modules/infragistics.ui.scroll.js" ],
		group: $.ig.loaderClass.locale.miscGroup,
		css: [  ]
	},
	{
		widget: "igShared",
		dependency: [ { name: "igUtil" } ],
		scripts: [ "$path$/modules/infragistics.ui.shared.js" ],
		locale: [ "$localePath$/infragistics.shared-$locale$.js" ],
		group: $.ig.loaderClass.locale.miscGroup,
		css: [ "$path$/structure/modules/infragistics.ui.shared.css" ]
	},
	{
		widget: "igTree",
		dependency: [
			{ name: "igUtil" },
			{ name: "igShared" },
			{ name: "igTemplating" },
			{ name: "igDataSource" }
			],
		scripts: [ "$path$/modules/infragistics.ui.tree.js" ],
		locale: [ "$localePath$/infragistics.ui.tree-$locale$.js" ],
		group: $.ig.loaderClass.locale.interactionsGroup,
		css: [ "$path$/structure/modules/infragistics.ui.tree.css" ]
	},
	{
		widget: "igPopover",
		dependency: [ { name: "igUtil" } ],
		scripts: [ "$path$/modules/infragistics.ui.popover.js" ],
		locale: [ "$localePath$/infragistics.ui.popover-$locale$.js" ],
		css: [ "$path$/structure/modules/infragistics.ui.popover.css" ]
	},
	{
		widget: "igNotifier",
		dependency: [ { name: "igPopover" } ],
		scripts: [ "$path$/modules/infragistics.ui.notifier.js" ],
		locale: [ "$localePath$/infragistics.ui.notifier-$locale$.js" ],
		css: [ "$path$/structure/modules/infragistics.ui.notifier.css" ]
	},
	{
		widget: "igSplitButton",
		dependency: [ { name: "igToolbarButton" } ],
		scripts: [ "$path$/modules/infragistics.ui.splitbutton.js" ],
		locale: [  ],
		css: [ "$path$/structure/modules/infragistics.ui.splitbutton.css" ]
	},
	{
		widget: "igColorPicker",
		dependency: [  ],
		scripts: [ "$path$/modules/infragistics.ui.colorpicker.js" ],
		locale: [  ],
		css: [ "$path$/structure/modules/infragistics.ui.colorpicker.css" ]
	},
	{
		widget: "igColorPickerSplitButton",
		dependency: [
			{ name: "igPopover" },
			{ name: "igColorPicker" },
			{ name: "igSplitButton" }
			],
		scripts: [ "$path$/modules/infragistics.ui.colorpickersplitbutton.js" ],
		locale: [  ],
		css: [  ]
	},
	{
		widget: "igLayoutManager",
		dependency: [ { name: "igUtil" } ],
		scripts: [ "$path$/modules/infragistics.ui.layoutmanager.js" ],
		group: $.ig.loaderClass.locale.layoutGroup,
		css: [ "$path$/structure/modules/infragistics.ui.layout.css" ]
	},
	{
		widget: "igTileManager",
		dependency: [
			{ name: "igDataSource" },
			{ name: "igTemplating" },
			{ name: "igLayoutManager" },
			{ name: "igSplitter" }
			],
		scripts: [ "$path$/modules/infragistics.ui.tilemanager.js" ],
		locale: [ "$localePath$/infragistics.ui.tilemanager-$locale$.js" ],
		group: $.ig.loaderClass.locale.layoutGroup,
		css: [ "$path$/structure/modules/infragistics.ui.tilemanager.css" ]
	},
	{
		widget: "igUpload",
		dependency: [
			{ name: "igUtil" },
			{ name: "igShared" }
			],
		scripts: [ "$path$/modules/infragistics.ui.upload.js" ],
		locale: [ "$localePath$/infragistics.ui.upload-$locale$.js" ],
		group: $.ig.loaderClass.locale.interactionsGroup,
		css: [ "$path$/structure/modules/infragistics.ui.upload.css" ]
	},
	{
		widget: "igUtil",
		priority: true,
		scripts: [ "$path$/modules/infragistics.util.js" ],
		locale: [ "$localePath$/infragistics.util-$locale$.js" ],
		group: $.ig.loaderClass.locale.miscGroup,
		css: [  ]
	},
	{
		widget: "igValidator",
		dependency: [ { name: "igUtil" }, { name: "igNotifier" } ],
		scripts: [ "$path$/modules/infragistics.ui.validator.js" ],
		locale: [ "$localePath$/infragistics.ui.validator-$locale$.js" ],
		group: $.ig.loaderClass.locale.miscGroup,
		css: [
			"$path$/structure/modules/infragistics.ui.shared.css",
			"$path$/structure/modules/infragistics.ui.validator.css"
			]
	},
	{
		widget: "igVideoPlayer",
		dependency: [
			{ name: "igUtil" },
			{ name: "igShared" }
			],
		scripts: [ "$path$/modules/infragistics.ui.videoplayer.js" ],
		locale: [ "$localePath$/infragistics.ui.videoplayer-$locale$.js" ],
		group: $.ig.loaderClass.locale.interactionsGroup,
		css: [
			"$path$/structure/modules/infragistics.ui.videoplayer.css",
			"$path$/structure/modules/infragistics.ui.html5.css"
			]
	},
	{
		widget: "igSplitter",
		dependency: [ { name: "igUtil" } ],
		scripts: [ "$path$/modules/infragistics.ui.splitter.js" ],
		locale: [ "$localePath$/infragistics.ui.splitter-$locale$.js" ],
		group: $.ig.loaderClass.locale.layoutGroup,
		css: [ "$path$/structure/modules/infragistics.ui.splitter.css" ]
	},
	{
		widget: "igToolbarButton",
		dependency: [
			{ name: "igUtil" },
			{ name: "igShared" }
			],
		scripts: [ "$path$/modules/infragistics.ui.toolbarbutton.js" ],
		locale: [  ],
		css: [ "$path$/structure/modules/infragistics.ui.toolbarbutton.css" ]
	},
	{
		widget: "igToolbar",
		dependency: [
			{ name: "igUtil" },
			{ name: "igToolbarButton" }
			],
		scripts: [ "$path$/modules/infragistics.ui.toolbar.js" ],
		locale: [ "$localePath$/infragistics.ui.toolbar-$locale$.js" ],
		css: [ "$path$/structure/modules/infragistics.ui.toolbar.css" ]
	},
/*/ igTreeGrid /// */
	{
		widget: "igTreeGrid",
		dependency: [ { name: "igGrid" } ],
		scripts: [ "$path$/modules/infragistics.ui.treegrid.js" ],
		locale: [ "$localePath$/infragistics.ui.treegrid-$locale$.js" ],
		group: $.ig.loaderClass.locale.gridGroup,
		css: [ "$path$/structure/modules/infragistics.ui.treegrid.css" ]
	},
	{
		widget: "igTreeGrid.*",
		parentWidget: "igTreeGrid",
		dependency: [ { name: "igTreeGrid" },
					{ name: "FeatureChooser" },
					{ name: "Filtering", parentWidget: "igTreeGrid" },
					{ name: "Hiding", parentWidget: "igTreeGrid" },
					{ name: "Paging", parentWidget: "igTreeGrid" },
					{ name: "Resizing", parentWidget: "igTreeGrid" },
					{ name: "Selection", parentWidget: "igTreeGrid" },
					{ name: "RowSelectors", parentWidget: "igTreeGrid" },
					{ name: "Sorting", parentWidget: "igTreeGrid" },
					{ name: "MultiColumnHeaders", parentWidget: "igTreeGrid" },
					{ name: "Tooltips", parentWidget: "igTreeGrid" },
					{ name: "Updating", parentWidget: "igTreeGrid" },
					{ name: "ColumnFixing", parentWidget: "igTreeGrid" },
					{ name: "ColumnMoving", parentWidget: "igTreeGrid" } ],
		scripts: [  ],
		css: [  ]
	},
/*/ end igTreeGrid /// */
/*/ igTreeGrid Features /// */
	{
		widget: "Filtering",
		parentWidget: "igTreeGrid",
		dependency: [
			{ name: "igTreeGrid" },
			{ name: "Filtering", parentWidget: "igGrid,igHierarchicalGrid" } ],
		scripts: [ "$path$/modules/infragistics.ui.treegrid.filtering.js" ]
	},
	{
		widget: "Hiding",
		parentWidget: "igTreeGrid",
		dependency: [
			{ name: "igTreeGrid" },
			{ name: "Hiding", parentWidget: "igGrid,igHierarchicalGrid" }
			],
		scripts: [ "$path$/modules/infragistics.ui.treegrid.hiding.js" ]
	},
	{
		widget: "Updating",
		parentWidget: "igTreeGrid",
		dependency: [
			{ name: "igTreeGrid" },
			{ name: "Updating", parentWidget: "igGrid,igHierarchicalGrid" }
			],
		scripts: [ "$path$/modules/infragistics.ui.treegrid.updating.js" ]
	},
	{
		widget: "Paging",
		parentWidget: "igTreeGrid",
		dependency: [
			{ name: "igTreeGrid" },
			{ name: "Paging", parentWidget: "igGrid,igHierarchicalGrid" }
			],
		scripts: [ "$path$/modules/infragistics.ui.treegrid.paging.js" ]
	},
	{
		widget: "Resizing",
		parentWidget: "igTreeGrid",
		dependency: [
			{ name: "igTreeGrid" },
			{ name: "Resizing", parentWidget: "igGrid,igHierarchicalGrid" }
			],
		scripts: [ "$path$/modules/infragistics.ui.treegrid.resizing.js" ]
	},
	{
		widget: "Selection",
		parentWidget: "igTreeGrid",
		dependency: [
			{ name: "igTreeGrid" },
			{ name: "Selection", parentWidget: "igGrid,igHierarchicalGrid" }
			],
		scripts: [ "$path$/modules/infragistics.ui.treegrid.selection.js" ]
	},
	{
		widget: "RowSelectors",
		parentWidget: "igTreeGrid",
		dependency: [
			{ name: "igTreeGrid" },
			{ name: "RowSelectors", parentWidget: "igGrid,igHierarchicalGrid" }
			],
		scripts: [ "$path$/modules/infragistics.ui.treegrid.rowselectors.js" ]
	},
	{
		widget: "Sorting",
		parentWidget: "igTreeGrid",
		dependency: [
			{ name: "igTreeGrid" },
			{ name: "Sorting", parentWidget: "igGrid,igHierarchicalGrid" }
			],
		scripts: [ "$path$/modules/infragistics.ui.treegrid.sorting.js" ]
	},
	{
		widget: "MultiColumnHeaders",
		parentWidget: "igTreeGrid",
		dependency: [
			{ name: "igTreeGrid" },
			{ name: "MultiColumnHeaders", parentWidget: "igGrid,igHierarchicalGrid" }
			],
		scripts: [ "$path$/modules/infragistics.ui.treegrid.multicolumnheaders.js" ]
	},
	{
		widget: "Tooltips",
		parentWidget: "igTreeGrid",
		dependency: [
			{ name: "igTreeGrid" },
			{ name: "Tooltips", parentWidget: "igGrid,igHierarchicalGrid" }
			],
		scripts: [ "$path$/modules/infragistics.ui.treegrid.tooltips.js" ]
	},
	{
		widget: "ColumnFixing",
		parentWidget: "igTreeGrid",
		dependency: [
			{ name: "igTreeGrid" },
			{ name: "ColumnFixing", parentWidget: "igGrid" }
			],
		scripts: [ "$path$/modules/infragistics.ui.treegrid.columnfixing.js" ]
	},
	{
		widget: "ColumnMoving",
		parentWidget: "igTreeGrid",
		dependency: [
			{ name: "igTreeGrid" },
			{ name: "ColumnMoving", parentWidget: "igGrid,igHierarchicalGrid" }
			],
		scripts: [ "$path$/modules/infragistics.ui.treegrid.columnmoving.js" ]
	},
/*/ end igTreeGrid Features/// */
/*/ start igExcel/// */
	{
		widget: "igExcel",
		dependency: [ { name: "igUtil" } ],
		scripts: [
			"$path$/modules/infragistics.documents.core.js",
			"$path$/modules/infragistics.excel.js"
			],
		css: [  ]
	},
/*/ end igExcel /// */
/*/ start igExcel/// */
	{
		widget: "igGridExcelExporter",
		dependency: [ { name: "igExcel" } ],
		scripts: [ "$path$/modules/infragistics.gridexcelexporter.js" ],
		css: [  ]
	}
/*/ end igExcel /// */

 ];

$.ig.theme = "infragistics";

$.extend($.ig, {
	/* pluginName="loader" */
	loader: function (param1, param2, param3) {
		/* Static object that can be used similarly to document ready statement in jQuery.
		The callback will not be invoked until the document is ready.
		Accepts three parameters all of which are optional and can be passed in in any order:
		paramType="object" optional="true" Initialization object. Described in loaderClass settings.
		paramType="string" optional="true" Comma separated list of resources to load.
		paramType="function" optional="true" Callback function to be called when all resources are loaded and ready to be used.
		returns="object" type="$.ig.loaderClass" Returns an instance of the loader class implementation.

		Examples:
		1.	Initialize and be notified all through the passed in options:

		$.ig.loader({
			scriptPath: "../../../Source/ClientUI/js/",
			cssPath: "../../../Source/ClientUI/css/",
			resources: "igGrid.*,igTree",
			ready: function () {} });


		2.	Initialize separately, be notified later

		$.ig.loader({
			scriptPath: "../../../Source/ClientUI/js/",
			cssPath: "../../../Source/ClientUI/css/",
			resources: "igGrid"});

		$.ig.loader(function () {
			// Create a couple of igGrids
			$("#grid1").igGrid({
				virtualization: false,
				autoGenerateColumns: true,
				...
			}
		}

		3.	Load resources on demand with separate initialization

		$.ig.loader({
			scriptPath: "../../../Source/ClientUI/js/",
			cssPath: "../../../Source/ClientUI/css/"
		});

		$.ig.loader("igGrid", function () {
			// Create a couple of igGrids
			$("#grid1").igGrid({
				virtualization: false,
				autoGenerateColumns: true,
				...
			}
		}

		4.	Use chained methods

		$.ig.loader().load("igGrid", function () {...}).load("igTree", function() {...});

		*/

		var options, callback, resources;

		function assignParameter(p) {
			if (typeof p === "object") {
				options = p;
			}
			if (typeof p === "function") {
				callback = p;
			}
			if (typeof p === "string") {
				resources = p;
			}
		}

		if (arguments.length > 0) {
			assignParameter(param1);
		}
		if (arguments.length > 1) {
			assignParameter(param2);
		}
		if (arguments.length > 2) {
			assignParameter(param3);
		}

		if (options) {
			if (resources) {
				options.resources = resources;
			}
			if (callback) {
				options.ready = callback;
			}
		}

		$.ig._loader = $.ig.loaderClass;
		$.ig._loader._init(options);

		if (!options) {
			$.ig._loader.load(resources, callback);
		}

		return $.ig._loader;
	}
});

$.extend($.ig.loaderClass, {
	/* pluginName="loaderClass" */
	/*
	Infragistics resources loader implemented as a class. Loads necessary resources for each widget based on the name of the widget.
	Loads Java Script and CSS files.
	*/

	////////////////////////////////// # PUBLIC API #/////////////////////////////////////////

	settings: {
		/* type="string" Comma separated list of resources to load. Ex: "igTree,igVideoPlayer,igGrid.Paging".
		Modular widgets, such as igGrid, allow linking features with a "." (dot). To load all modules of a widget use "*". Ex: "igGrid.*" */
		resources: null,
		/* type="string" Script path relative to the page that instantiates the loader. */
		scriptPath: "js",
		/* type="string" CSS path relative to the page that instantiates the loader. */
		cssPath: "css",
		/* type="string" Name of the theme. Must correspond to the CSS theme folder under cssPath. */
		theme: $.ig.theme,
		/* type="string" Folder name that contains localization resources. */
		localePath: "$path$/modules/i18n",
		/* type="boolean" Indicates whether the loader should automatically detect browser's locale. Defaults to false. */
		autoDetectLocale: false,
		/* type="string" Two letter code for current locale. Defaults to "en". */
		locale: null,
		/* type="string" Regional code. Can be two or five characters long ("en", "en-GB"). Defaults to "en". */
		regional: null,
		/* type="function" A function to call when all resources are loaded but before the "ready" notification is sent. */
		preinit: null,
		/* type="function" A function to call when all resources are loaded and ready to use. */
		ready: null
	},

	load: function (resources, callback, preinit) {
		/* Puts resources in the queue to be loaded. Optionally a call back function can be provided.
		paramType="string" Comma Comma separated list of resources to load. Ex: "igTree,igVideoPlayer,igGrid.Paging". Modular widgets, such as igGrid, allow linking features with a "." (dot).
		paramType="function" optional="true" Call back function to be called when all resources are loaded and ready to be used.
		paramType="function" optional="true" Call back function to be called when all resources are loaded but before the "ready" notification is sent.
		returns="object" type="$.ig.loaderClass" Returns this instance of the loader class implementation.
		*/

		if (!resources && (this._themeLoaded || !this.settings.theme)) {

			if (!callback && !preinit) {
				return this;
			}

			if (callback) {
				this._callbackArray.push(callback);
			}
			if (preinit) {
				this._preinitArray.push(preinit);
			}

			this._waitBatches(this._proxy(this, this._notifyLoaded, [  ]));
		} else {

			//~ Make jQuery to hold firing ready event until all of our resources are loaded
			$.holdReady(true);

			if (!this._themeLoaded && this.settings.theme) {
				this._themeLoaded = true;
				resources = "theme" + (resources ? "," + resources : "");
			}

			this.settings.ready = callback;
			var res = resources.split(","),
				loadBatch = {},
				i;

			loadBatch.callback = this._proxy(loadBatch, this._callback, [  ]);
			loadBatch._noWdgtLoaded = res.length;
			loadBatch.loader = this;
			loadBatch.ready = this._proxy(this, this._notifyLoaded, [  ]);

			if (callback) {
				this._callbackArray.push(callback);
			}
			if (preinit) {
				this._preinitArray.push(preinit);
			}
			this._loadBatches.push(loadBatch);

			for (i = 0; i < res.length; i++) {
				(new $.ig._loadWorkItem(this)).loadWidgetResources($.trim(res[ i ]), loadBatch.callback);
			}
		}
		return this;
	},

	preinit: function (callback) {
		/* Sets callback function to be called once all resources are loaded but before the notification about their readiness.
		paramType="function" Call back function to be called when all resources are loaded but before "ready" notification is invoked.
		returns="object" type="$.ig.loaderClass" Returns this instance of the loader class implementation.
		*/

		if (callback) {
			this._preinitArray.push(callback);
		}
		this._notifyLoaded();
		return this;
	},

	/*////////////////////////////////// # END PUBLIC API #///////////////////////////////////////// */

	_themeLoaded: false,
	_dataLog: "",
	_loadBatches: [  ],
	_resources: $.ig.dependencies,

	_init: function (options) {

		if (options) {
			var basePath = options.scriptPath,
				localePath = options.localePath,
				cssPath = options.cssPath,
				regional = options.regional,
				locale = options.locale,
				userLang;

			if (basePath && basePath.length > 0) {
				if (basePath.lastIndexOf("/") === basePath.length - 1) {
					basePath = basePath.slice(0, basePath.length - 1);
				}
				this.settings.scriptPath = basePath;
			}
			if (cssPath && cssPath.length > 0) {
				if (cssPath.lastIndexOf("/") === cssPath.length - 1) {
					cssPath = cssPath.slice(0, cssPath.length - 1);
				}
				this.settings.cssPath = cssPath;
			}
			if (localePath && localePath.length > 0) {
				if (localePath.lastIndexOf("/") === localePath.length - 1) {
					localePath = localePath.slice(0, localePath.length - 1);
				}
				this.settings.localePath = localePath;
			}
			if (options.theme !== undefined) {
				this.settings.theme = options.theme;
			}
			if (options.resources) {
				this.settings.resources = options.resources;
			}
			if (options.ready) {
				this.settings.ready = options.ready;
			}
			if (options.preinit) {
				this.settings.preinit = options.preinit;
			}
			if (options.autoDetectLocale !== undefined) {
				this.settings.autoDetectLocale = options.autoDetectLocale;
			}

			if (!locale && this.settings.autoDetectLocale) {
				userLang = (navigator.language || navigator.userLanguage);
				locale = userLang.split("-")[ 0 ];
				if (!regional) {
					regional = locale;
				}
			}

			if (locale === this._defaultLocale) {
				locale = "";
			}

			if (!locale && this._defaultLocale) {
				this.settings.locale = "";
			} else {
				if (locale) {
					this.settings.locale = locale;
				} else {
					this.settings.locale = "en";
				}
			}

			if (!regional) {
				regional = options.locale;
			}
			if (!regional && this._defaultLocale === "ja") {
				regional = "ja";
			}
			if (regional === "en") {
				regional = null;
			}
			this.settings.regional = regional;

			this._initializePaths("script");
			this._initializePaths("css");

			if (this.settings.resources) {
				this.load(this.settings.resources, this.settings.ready, this.settings.preinit);
			}
		}
	},

	_defaultLocale: "",

	_proxy: function (instance, method, args) {
		return function () {
			return method.apply(instance, args);
		};
	},

	_initializePaths: function (type) {
		var i,
			j,
			len = this._resources.length,
			path = (type === "script" ? this.settings.scriptPath : this.settings.cssPath),
			localePath = this.settings.localePath,
			theme = this.settings.theme,
			scriptData,
			useLocale = (type === "script" && this.settings.locale),
			useRegional = (type === "script" && this.settings.regional),
			localeScripts,
			regionalScripts;

		for (i = 0; i < len; i++) {
			scriptData = (type === "script" ? this._resources[ i ].scripts : this._resources[ i ].css);
			scriptData = scriptData || [  ];
			if (useLocale) {
				if (this._resources[ i ].locale) {
					localeScripts = this._resources[ i ].locale.slice(0);
					while (localeScripts.length > 0) {
						scriptData.unshift(localeScripts.pop().replace("$locale$", this.settings.locale));
					}
				}
			}
			if (useRegional) {
				if (this._resources[ i ].regional) {
					regionalScripts = this._resources[ i ].regional.slice(0);
					while (regionalScripts.length > 0) {
						scriptData.unshift(regionalScripts.pop().replace("$regional$", this.settings.regional));
					}
				}
			}
			for (j = 0; j < scriptData.length; j++) {
				scriptData[ j ] = scriptData[ j ].replace("$localePath$", localePath)
					.replace("$path$", path)
					.replace("$theme$", theme);
			}
		}
	},

	_log: function (data) {
		this._dataLog += (data.toString() + "<br/>");
	},

	log: function () {
		return this._dataLog;
	},

	/*_noWdgtLoaded: 0, */
	_callback: function () {
		this._noWdgtLoaded--;
		if (this._noWdgtLoaded <= 0) {
			this.loader._loadBatches.pop(this);
			if (this.ready) {
				this.ready();
			}
		}
	},

	_waitBatches: function (callback) {
		if (this._loadBatches.length === 0) {
			callback();
		} else {
			window.setTimeout(this._proxy(this, this._waitBatches, [ callback ]), 25);
		}
	},

	_preinitArray: [  ],
	_callbackArray: [  ],

	_notifyLoaded: function () {
		if (this._loadBatches.length > 0) {
			return;
		}

		var pre = this._preinitArray,
			call = this._callbackArray;
		if (this._preinitArray.length) {
			this._preinitArray = [  ];
		}
		if (this._callbackArray.length) {
			this._callbackArray = [  ];
		}

		if (this.settings.regional && typeof ($.ig.setRegionalDefault) === "function") {
			$.ig.setRegionalDefault(this.settings.regional);
		}

		while (pre.length > 0) {
			pre.shift()();
		}
		while (call.length > 0) {
			call.shift()();
		}

		//~ Allow firing jQuery ready event
		$.holdReady(false);
	},

	_findWidgetScriptData: function (widgetName, parentWidget) {
		var i,
			len = this._resources.length,
			scriptData;

		if (widgetName.length > 3 && widgetName.indexOf(".js") === widgetName.length - 3) {
			return {
				widget: widgetName,
				scripts: [ this.settings.scriptPath + "/" + widgetName ], css: [  ]
			};
		}
		if (widgetName.length > 4 && widgetName.indexOf(".css") === widgetName.length - 4) {
			return { widget: widgetName, scripts: [  ], css: [ this.settings.cssPath + "/" + widgetName ] };
		}

		for (i = 0; i < len; i++) {
			scriptData = this._resources[ i ];
			/*M.K. 2/17/2015 TFS #188964 :Update igLoader to work with the igTreeGrid scripts */
			/* Check if parentWidget exists. If not return the fist scriptData that matches the widget's name. */
			/* If it exists find the scriptData that matches the passes parentWidget. */
			if (scriptData.widget === widgetName &&
				((scriptData.parentWidget !== undefined && parentWidget !== undefined &&
				scriptData.parentWidget.indexOf(parentWidget) > -1) ||
				(parentWidget === undefined || parentWidget === widgetName))) {
				return scriptData;
			}
		}
		return null;
	}

});

$.ig._loadWorkItem = function (loader) {
	this._loader = loader;
	this._loadedCssDependencies = [  ];
	this._loadedScriptDependencies = [  ];
};

$.ig._loadWorkItem.prototype = {

	_loadingEntities: [  ],

	_inArray: function (elem, array) {
		var i, len = array && elem ? array.length : 0;
		for (i = 0; i < len; i++) {
			if (elem === array[ i ]) {
				return true;
			}
		}
		return false;
	},

	_loadDependency: function (scriptData, loadingEntity, type) {
		var j,
			len = scriptData.dependency ? scriptData.dependency.length : 0,
			name;
		for (j = 0; j < len; j++) {
			name = scriptData.dependency[ j ].name;
			if (!this._inArray(name, (type === "script" ?
				this._loadedScriptDependencies : this._loadedCssDependencies))) {
				if (scriptData.dependency[ j ].parentWidget) {
					this._loadFeatureItem(name, type, loadingEntity, scriptData.dependency[ j ].parentWidget);

				} else {
				this._loadFeatureItem(name, type, loadingEntity);
				}
				if (type === "script") {
					this._loadedScriptDependencies.push(name);
				} else {
					this._loadedCssDependencies.push(name);
				}
			}
		}
	},

	_loadFeatureItem: function (widgetName, type, loadingEntity, parentWidget) {
		var scriptData = this._loader._findWidgetScriptData(widgetName, parentWidget),
			i,
			res,
			len,
			item;
		if (!scriptData) {
			throw ("Resource '{0}' cannot be found. Please check that the resource name is correct.")
				.replace("{0}", widgetName);
		}
		res = (type === "script" ? scriptData.scripts : scriptData.css);
		res = res || [  ];
		len = res.length;

		this._loadDependency(scriptData, loadingEntity, type);

		for (i = 0; i < len; i++) {
			item = res[ i ];
			this._queueItem(item, loadingEntity, type, scriptData.priority);
		}
	},

	_loadFeatures: function (type, widgetName) {
		var features,
			i,
			len,
			parentWidget;
		if (widgetName.indexOf("*") === widgetName.length - 1 ||
			(widgetName.length > 3 && widgetName.indexOf(".js") === widgetName.length - 3) ||
			(widgetName.length > 4 && widgetName.indexOf(".css") === widgetName.length - 4)) {
			features = [ widgetName ];
		} else {
			features = widgetName.split(".");
		}
		len = features.length;
		if (widgetName.indexOf(".") > -1)
		{
			parentWidget = features[ 0 ];
		}
		for (i = 0; i < len; i++) {
			this._loadFeatureItem(features[ i ], type, widgetName, parentWidget);
		}
	},

	_loadAllFeatures: function (type) {
		var i, j,
			len = this._loader._resources.length, jlen = 0,
			scriptData,
			item,
			loadingEntity = "ALL",
			res;

		for (i = 0; i < len; i++) {
			scriptData = this._loader._resources[ i ];
			this._loadDependency(scriptData, loadingEntity, type);
			res = (type === "script" ? scriptData.scripts : scriptData.css);
			res = res || [  ];
			jlen = res.length;
			for (j = 0; j < jlen; j++) {
				item = res[ j ];
				this._queueItem(item, loadingEntity, type, scriptData.priority);
			}
		}
	},
	loadWidgetResources: function (widgetName, callback) {
		if (this._loadingEntities[ widgetName ] !== undefined) {
			this._loadingEntities[ widgetName ].call.push(callback);
		} else {
			this._loadingEntities[ widgetName ] = { name: widgetName, call: [ callback ], queue: [  ] };
		}
		this._loadFeatures("css", widgetName);
		this._loadFeatures("script", widgetName);
		this._loadMonitor();
	},

	loadWidgetCss: function (widgetName) {
		this._loadFeatures("css", widgetName);
	},

	loadWidgetScripts: function (widgetName) {
		this._loadFeatures("script", widgetName);
	},

	loadAllScripts: function () {
		this._loadAllFeatures("script");
	},

	loadAllCss: function () {
		this._loadAllFeatures("css");
	},

	loadAllResources: function (callback) {
		var loadingEntity = "ALL";
		this._loadingEntities[ loadingEntity ] = { name: loadingEntity, call: [ callback ], queue: [  ] };
		this._loadAllFeatures("css");
		this._loadAllFeatures("script");
		this._loadMonitor();
	},

	_queueItem: function (fileName, loadingEntity, itemType, itemPriority) {
		if (!this._loadingEntities[ loadingEntity ].queue[ fileName ]) {
			this._loadingEntities[ loadingEntity ].queue[ fileName ] = {
				type: itemType,
				loaded: false,
				priority: itemPriority
			};
			this._loader._log("Enqueue: " + fileName);
		}
	},

	_loadScript: function (fileName, loadingEntity) {
		var scriptLoad = this._loadingEntities[ loadingEntity ].queue[ fileName ],
			s,
			head,
			i,
			len,
			self = this,
			k,
			isIE10Plus = false;
		if (!this.isLoadedScript(fileName)) {
			scriptLoad.loading = true;
			s = document.createElement("script");
			head = document.documentElement;
			len = head.childNodes.length;

			s.type = "text/javascript";
			s.src = fileName;
			k = window.navigator.userAgent.indexOf("MSIE ");
			if (k >= 0) {
				isIE10Plus = parseInt(window.navigator.userAgent.substr(k + 4), 10) >= 10;
			}
			s.async = isIE10Plus;
			s.loadingEntity = loadingEntity;
			s.fileName = fileName;
			s.onreadystatechange = s.onload = function () {
				if (s.readyState === undefined || s.readyState === "complete" ||
					(!isIE10Plus && s.readyState === "loaded")) {
					scriptLoad.loading = false;
					self._scriptLoaded(this);
				}
			};

			if (head.nodeName !== "HEAD") {
				for (i = 0; i < len; i++) {
					if (head.childNodes[ i ].nodeName === "HEAD") {
						head = head.childNodes[ i ];
						break;
					}
				}
			}
			head.appendChild(s);
		} else {
			/* if the file was already loaded as a dependency of another module */
			if (!scriptLoad.loading) {
				scriptLoad.loaded = true;
				this._loadMonitor();
			}
		}
	},

	_loadCss: function (fileName, loadingEntity) {
		if (!this.isLoadedCss(fileName)) {
			var l = document.createElement("link"),
				head = document.documentElement,
				i,
				len = head.childNodes.length;
			l.type = "text/css";
			l.rel = "stylesheet";
			l.href = fileName;
			l.media = "screen";
			l.loadingEntity = loadingEntity;
			l.fileName = fileName;
			if (head.nodeName !== "HEAD") {
				for (i = 0; i < len; i++) {
					if (head.childNodes[ i ].nodeName === "HEAD") {
						head = head.childNodes[ i ];
						break;
					}
				}
			}
			head.appendChild(l);
		}
		this._loadingEntities[ loadingEntity ].queue[ fileName ].loaded = true;
		this._loadMonitor();
	},

	_scriptLoaded: function (scriptObj) {
		var rs = scriptObj.readyState,
			entity = this._loadingEntities[ scriptObj.loadingEntity ],
			item;
		if (entity) {
			item = entity.queue[ scriptObj.fileName ];
			if (item && !item.loaded && (!rs || /loaded|complete/.test(rs))) {
				item.loaded = true;
				this._loader._log("Loaded: " + scriptObj.fileName);
				this._loadMonitor();
			}
		}
	},

	_isLoadedHeadElem: function (src, type) {
		var head = document.documentElement,
			i,
			len = head.childNodes.length,
			elem,
			nodeSrc;

		if (head.nodeName !== "HEAD") {
			for (i = 0; i < len; i++) {
				if (head.childNodes[ i ].nodeName === "HEAD") {
					head = head.childNodes[ i ];
					break;
				}
			}
			len = head.childNodes.length;
		}

		for (i = 0; i < len; i++) {
			elem = head.childNodes[ i ];

			/* href for link tags and src for script tags */
			if (type === "LINK") {
				nodeSrc = elem.href;
			} else if (type === "SCRIPT") {
				nodeSrc = elem.src;
			}

			if (nodeSrc && elem.nodeName === type && nodeSrc.lastIndexOf(src) !== -1) {
				return true;
			}
		}
		return false;
	},

	isLoadedScript: function (src) {
		return (src && src.length > 0 ?
			this._isLoadedHeadElem(src.substring(src.lastIndexOf("/")), "SCRIPT") : false);
	},

	isLoadedCss: function (src) {
		return (src && src.length > 0 ?
			this._isLoadedHeadElem(src.substring(src.lastIndexOf("/")), "LINK") : false);
	},

	_loadMonitor: function () {
		var i, scriptName, entity, loaded, item, passed, priority, c;
		for (i in this._loadingEntities) {
			if (this._loadingEntities.hasOwnProperty(i)) {
				entity = this._loadingEntities[ i ];
				loaded = true;
				passed = false;
				priority = false;
				for (scriptName in entity.queue) {
					if (entity.queue.hasOwnProperty(scriptName)) {
						passed = true;
						item = entity.queue[ scriptName ];
						loaded = loaded && item.loaded;
						if (!loaded) {
							if (item.type === "script") {
								this._loadScript(scriptName, i);
							} else {
								this._loadCss(scriptName, i);
							}
							priority = item.priority;
							break;
						}
					}
				}

				if (loaded && passed && entity.call) {
					delete this._loadingEntities[ entity.name ];
					for (c = 0; c < entity.call.length; c++) {
						if (entity.call[ c ]) {
							entity.call[ c ]();
						}
					}
				} else if (passed && priority) {
					/* this ensures that the priority files are loaded before all others */
					break;
				}
			}
		}
	}
};
})(jQuery);
