/*!@license Infragistics.Web.Loader <build_number>
*
* Copyright (c) 2011-<year> Infragistics Inc.
*
* http://www.infragistics.com/
*
*/

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

// jscs:disable
$.ig.loaderClass.locale.descriptions = {
	sparklineDescription: "Component used for displaying line graph that illustrates a single trend.",
	dialogDescription: "Component that displays customizable dialog window.",
	editorsDescription: "A set of components that allow editing of different types of values.",
	ratingDescription: "Component that allows rating items from a given range.",
	treeDescription: "A graphical control that is used to present a hierarchical view of information.",
	notifierDescription: "Component that offers informative feedback about system state.",
	validatorDescription: "Component that offers validation options for variety of page elements.",
	videoPlayerDescription: "Component that displays HTML 5 videos.",
	templatingDescription: "A JavaScript library used to apply a content template to HTML elements.",
	gridDescription: "Component used for displaying tabular data.",
	gridColumnMovingDescription: "Allows moving columns to change their order.",
	dataSourceDescription: "Component used for binding to various kinds of data.",
	olapFlatDataSourceDescription: "Component used for binding to flat data and transforming it into multi-dimensional data.",
	olapXmlaDataSourceDescription: "Component used for binding to a multi-dimensional data from a SSAS server.",
	gridAppendRowsOnDemandDescription: "Appends the rows on demand.",
	gridCellMergingDescription: "Combines cells with the same values.",
	gridColumnFixingDescription: "Allows pinning the columns on the left/right of the grid.",
	gridFeatureChooserDescription: "Provides menu-like interface to grid columns when multiple features are enabled.",
	gridFilteringDescription: "Allows filtering the data based on a given criteria.",
	gridSharedDescription: "Grid shared code that contains commonly used widgets for the grid.",
	gridGroupByDescription: "Allows grouping rows of data by common column values.",
	gridHidingDescription: "Allows hiding/showing columns.",
	gridMultiColumnHeadersDescription: "Allows header grouping.",
	gridPagingDescription: "Allows the grid to render a limited number of rows per page.",
	gridResizingDescription: "Allows resizing of the grid columns.",
	gridResponsiveDescription: "Allows adoption of the grid size to the devices’ screen.",
	gridSelectionDescription: "Allows selecting rows or cells in the grid.",
	gridRowSelectorsDescription: "Renders a row selector column that allows managing row selection.",
	gridSortingDescription: "Allows sorting the column data in ascending or descending order.",
	gridSummariesDescription: "Allows showing summary data for each column.",
	gridTooltipsDescription: "Allows showing tooltips for grid cells.",
	gridUpdatingDescription: "Allows editing, deleting and adding records in the grid.",
	hierarchicalGridDescription: "Component used for displaying hierarchical tabular data.",
	treeGridDescription: "Component used for displaying hierarchical tabular data in a tree like structure.",
	treeGridColumnFixingDescription: "Allows pinning the columns on the left/right of the grid.",
	treeGridColumnMovingDescription: "Allows moving columns to change their order.",
	treeGridFilteringDescription: "Allows filtering the data based on a given criteria.",
	treeGridHidingDescription: "Allows hiding/showing columns.",
	treeGridMultiColumnHeadersDescription: "Allows header grouping.",
	treeGridPagingDescription: "Allows the grid to render a limited number of rows per page.",
	treeGridResizingDescription: "Allows you to resize the grid columns.",
	treeGridSelectionDescription: "Allows selecting rows or cells in the grid.",
	treeGridRowSelectorsDescription: "Renders a row selector column that allows managing row selection.",
	treeGridSortingDescription: "Allows sorting the column data in ascending or descending order.",
	treeGridTooltipsDescription: "Allows showing tooltips for grid cells.",
	treeGridUpdatingDescription: "Allows editing, deleting and adding records in the grid.",
	pivotDataSelectorDescription: "Component that enables users to select data slices when data is being visualized in a PivotGrid.",
	pivotGridDescription: "Component used for displaying data in a pivot table.",
	pivotSharedDescription: "Shared Pivot Grid code.",
	pivotViewDescription: "Component that combines a Pivot Grid and a Pivot Data Selector separated with a splitter.",
	scrollDescription: "Component that enables support for custom fluid scrolling functionality on all devices.",
	uploadDescription: "Component for uploading files for ASP.NET and ASP.NET MVC.",
	comboDescription: "Combo box that offers auto-complete, auto-suggest, and rich editing capabilities.",
	qrCodeBarcodeDescription: "The QRCodeBarcode control generates QR (Quick Response) barcode images.",
	splitButtonDescription: "Drop down button that provides a default and secondary action/commands.",
	colorPickerDescription: "Component that provides color selection from a grid layout.",
	colorPickerSplitButtonDescription: "Drop down button which default action is to select a color and the secondary action is to open the igColorPicker.",
	layoutManagerDescription: "Component that enables easily applying different layouts to a page.",
	tileManagerDescription: "The TileManager is a layout control for rendering and arranging data into tiles.",
	splitterDescription: "Component that divides the space into two panels, separated by a splitter bar to allow resizing.",
	toolbarDescription: "Component that groups buttons visually together into a single toolbar.",
	toolbarButtonDescription: "Component that defines a button and manages its state.",
	excelDescription: "The Excel Library is used to create, load and modify Excel workbooks through an object model.",
	excelFunctionsDescription: "Provides the custom functions used to solve formulas in the Excel library.",
	excelLoadSaveXlsDescription: "Allows the Excel library to load and save .xls files - the Excel 97- Excel 2003 Binary file format (BIFF8).",
	excelLoadSaveXltDescription: "Allows the Excel library to load and save .xlt files - the Excel 97- Excel 2003 Binary file format (BIFF8) for an Excel template.",
	excelLoadSaveXlsxDescription: "Allows the Excel library to load and save .xlsx files - the default Office Excel 2007 (and later) XML-based file format.",
	excelLoadSaveXlsmDescription: "Allows the Excel library to load and save .xlsm files - the Office Excel 2007 (and later) XML-based and macro-enabled file format.",
	excelLoadSaveXltxDescription: "Allows the Excel library to load and save .xltx files - the Office Excel 2007 (and later) XML-based file format for an Excel template.",
	excelLoadSaveXltmDescription: "Allows the Excel library to load and save .xltm files - the Office Excel 2007 (and later) XML-based and macro-enabled file format for an Excel template.",
	spreadsheetDescription: "Component used to visualize and modify worksheets of a Workbook from the Excel library.",
	gridExcelExporterDescription: "Component that allows instant exporting of the igGrid, igHierarchicalGrid or igTreeGrid data into an Excel Worksheet",
	categoryChartDescription: "Component that renders categorized data into a canvas on the page.",
	dataChartDescription: "Component that provides extremely rich functionality to create and render various types of charts in an HTML 5 canvas",
	pieChartDescription: "Component to create a pie chart with features like tooltips, legends, managing slices.",
	financialDescription: "Contains the financial series for the igDataChart.",
	doughnutChartDescription: "Component to create a doughnut chart that displays multiple sets of data around a common center.",
	funnelChartDescription: "Component to create a funnel chart that displays values associated with different categories in a conic shape.",
	linearGaugeDescription: "Component that visualizes data in the form of a linear gauge enriched with scales, tick marks and needles.",
	radialGaugeDescription: "Component that visualizes data in the form of a circular gauge enriched with scales, tick marks and needles.",
	radialMenuDescription: "Component that visualizes a context menu presenting its items in a circular arrangement around a center button.",
	bulletGraphDescription: "Component that visualizes data in the form of a linear bullet graph, enriched with scale and tick marks to represent progress.",
	htmlEditorDescription: "Component to provide a text editor for creating and formatting online content though standard HTML editing capabilities.",
	themeDescription: "Stylesheet containing the style rules for the corresponding theme.",
	regionalDescription: "This component contains regional settings.",
	utilDescription: "Contains util functions that extend the jQuery namespace.",
	sharedDescription: "Containes shared localization resources.",
	reportViewerDescription: "This component is designed to render NetAdvantage Reporting Reports within web applications.",
	popoverDescription: "The igPopover control displays contextual information over elements in a user interface.",
	chartLegendDescription: "The igChartLegend displays the name of a series or its elements represented in chart plot area.",
	annotationDescription: "Component that provides displaying annotations over the chart like tooltips, highlight layers, crosshair, etc.",
	extendedFinancialDescription: "Contains the extended financial indicators for the Finance type chart series.",
	polarDescription: "Contains the polar series for the igDataChart.",
	radialDescription: "Contains the radial series to display category data evenly across a full circle.",
	rangeCategoryDescription: "Contains the range category series, used to depict the spread between two values.",
	scatterDescription: "Contains the scatter series used to depict individual points in orthogonal (Cartesian) coordinate system.",
	categoryDescription: "Contains the category series that allow data for separate distinct category axis values to be plotted.",
	stackedDescription: "Containes the stacked series used to visualize categorized data in stacked segments.",
	verticalDescription: "Contains the column series that vsualizes categorized data with vertical columns.",
	dateTimeAxisDescription: "Allows for configuring DateTimeAxis.",
	overviewPlusDetailPaneDescription: "Component that display an OverviewPlusDetailPane over the igDataChart plot area.",
	zoombarDescription: "The igZoombar control provides zooming functionality to range-based controls.",
	mapDescription: "The igMap visualize various kinds of maps based on the HTML5 canvas element and performs all rendering on the client-side.",
	schedulerDescription: "Component that provides scheduling solution for presenting and managing time periods and associated activities."
};

// jscs:enable
$.ig.dependencies = [
	{
		widget: "theme",
		scripts: [  ],
		internal: true,
		css: [ "$path$/themes/$theme$/infragistics.theme.css" ],
		description: $.ig.loaderClass.locale.descriptions.themeDescription
	},
	{
		widget: "regional",
		scripts: [  ],
		css: [  ],
		internal: true,
		regional: [ "$localePath$/regional/infragistics.ui.regional-$regional$.js" ],
		description: $.ig.loaderClass.locale.descriptions.regionalDescription
	},
	{
		widget: "igUtil",
		priority: true,
		scripts: [ "$path$/modules/infragistics.util.js",
		"$path$/modules/infragistics.util.jquery.js",
		"$path$/modules/infragistics.util.jquerydeferred.js" ],
		locale: [ "$localePath$/infragistics.util-$locale$.js" ],
		group: $.ig.loaderClass.locale.miscGroup,
		css: [  ],
		description: $.ig.loaderClass.locale.descriptions.utilDescription
	},
	{
		widget: "igDataSource",
		dependency: [ { name: "igUtil" } ],
		priority: true,
		scripts: [ "$path$/modules/infragistics.datasource.js" ],
		locale: [ "$localePath$/infragistics.datasource-$locale$.js" ],
		group: $.ig.loaderClass.locale.frameworkGroup,
		css: [  ],
		description: $.ig.loaderClass.locale.descriptions.dataSourceDescription
	},
	{
		widget: "igOlapXmlaDataSource",
		dependency: [ { name: "igUtil" } ],
		scripts: [ "$path$/modules/infragistics.olapxmladatasource.js" ],
		group: $.ig.loaderClass.locale.frameworkGroup,
		css: [  ],
		description: $.ig.loaderClass.locale.descriptions.olapXmlaDataSourceDescription
	},
	{
		widget: "igOlapFlatDataSource",
		dependency: [ { name: "igUtil" } ],
		scripts: [ "$path$/modules/infragistics.olapflatdatasource.js" ],
		group: $.ig.loaderClass.locale.frameworkGroup,
		css: [  ],
		description: $.ig.loaderClass.locale.descriptions.olapFlatDataSourceDescription
	},
	{
		widget: "igTemplating",
		dependency: [ { name: "igUtil" } ],
		scripts: [ "$path$/modules/infragistics.templating.js" ],
		locale: [ "$localePath$/infragistics.templating-$locale$.js" ],
		group: $.ig.loaderClass.locale.miscGroup,
		css: [  ],
		description: $.ig.loaderClass.locale.descriptions.templatingDescription
	},
	{
		widget: "igScroll",
		dependency: [ { name: "igUtil" } ],
		scripts: [ "$path$/modules/infragistics.ui.scroll.js" ],
		locale: [ "$localePath$/infragistics.ui.scroll-$locale$.js" ],
		group: $.ig.loaderClass.locale.miscGroup,
		css: [ "$path$/structure/modules/infragistics.ui.scroll.css" ],
		description: $.ig.loaderClass.locale.descriptions.scrollDescription
	},
	{
		widget: "igShared",
		dependency: [ { name: "igUtil" } ],
		scripts: [ "$path$/modules/infragistics.ui.shared.js" ],
		locale: [ "$localePath$/infragistics.shared-$locale$.js" ],
		group: $.ig.loaderClass.locale.miscGroup,
		css: [ "$path$/structure/modules/infragistics.ui.shared.css" ],
		description: $.ig.loaderClass.locale.descriptions.sharedDescription
	},
/* /// Data Visualization /// */
	{
		widget: "_ig_ext_core",
		dependency: [ { name: "igUtil" } ],
		group: $.ig.loaderClass.locale.dvGroup,
		internal: true,
		scripts: [ "$path$/modules/infragistics.ext_core.js" ]
	},
	{
		widget: "_ig_ext_collections",
		group: $.ig.loaderClass.locale.dvGroup,
		dependency: [ { name: "_ig_ext_core" } ],
		internal: true,
		scripts: [ "$path$/modules/infragistics.ext_collections.js" ]
	},
	{
		widget: "_ig_ext_collections_extended",
		group: $.ig.loaderClass.locale.dvGroup,
		dependency: [ { name: "_ig_ext_collections" } ],
		internal: true,
		scripts: [ "$path$/modules/infragistics.ext_collectionsextended.js" ]
	},
	{
		widget: "_ig_ext_text",
		group: $.ig.loaderClass.locale.dvGroup,
		dependency: [ { name: "_ig_ext_core" } ],
		internal: true,
		scripts: [ "$path$/modules/infragistics.ext_text.js" ]
	},
	{
		widget: "_ig_ext_io",
		group: $.ig.loaderClass.locale.dvGroup,
		dependency: [ { name: "_ig_ext_text" } ],
		internal: true,
		scripts: [ "$path$/modules/infragistics.ext_io.js" ]
	},
	{
		widget: "_ig_ext_threading",
		group: $.ig.loaderClass.locale.dvGroup,
		dependency: [ { name: "_ig_ext_core" } ],
		internal: true,
		scripts: [ "$path$/modules/infragistics.ext_threading.js" ]
	},
	{
		widget: "_ig_ext_ui",
		group: $.ig.loaderClass.locale.dvGroup,
		dependency: [ { name: "_ig_ext_collections" } ],
		internal: true,
		scripts: [ "$path$/modules/infragistics.ext_ui.js" ]
	},
	{
		widget: "_ig_ext_web",
		group: $.ig.loaderClass.locale.dvGroup,
		dependency: [ { name: "_ig_ext_io" }, { name: "_ig_ext_threading" } ],
		internal: true,
		scripts: [ "$path$/modules/infragistics.ext_web.js" ]
	},
	{
		widget: "_ig_dv_core",
		group: $.ig.loaderClass.locale.dvGroup,
		dependency: [ { name: "_ig_ext_ui" } ],
		internal: true,
		scripts: [ "$path$/modules/infragistics.dv_core.js" ]
	},
	{
		widget: "_ig_dv_jquerydom",
		group: $.ig.loaderClass.locale.dvGroup,
		dependency: [ { name: "_ig_dv_core" } ],
		internal: true,
		scripts: [ "$path$/modules/infragistics.dv_jquerydom.js" ]
	},
	{
		widget: "_ig_dv_geo",
		group: $.ig.loaderClass.locale.dvGroup,
		dependency: [ { name: "_ig_ext_io" }, { name: "_ig_ext_ui" }, { name: "_ig_dv_core" } ],
		internal: true,
		scripts: [ "$path$/modules/infragistics.dv_geo.js" ]
	},
	{
		widget: "_ig_dv_geometry",
		group: $.ig.loaderClass.locale.dvGroup,
		dependency: [ { name: "_ig_dv_core" } ],
		internal: true,
		scripts: [ "$path$/modules/infragistics.dv_geometry.js" ]
	},
	{
		widget: "_ig_dv_opd",
		group: $.ig.loaderClass.locale.dvGroup,
		dependency: [ { name: "_ig_dv_core" } ],
		internal: true,
		scripts: [ "$path$/modules/infragistics.dv_opd.js" ]
	},
	{
		widget: "_ig_legend",
		priority: true,
		group: $.ig.loaderClass.locale.dvGroup,
		dependency: [ { name: "_ig_ext_ui" }, { name: "_ig_dv_core" } ],
		internal: true,
		scripts: [ "$path$/modules/infragistics.legend.js" ]
	},
	{
		widget: "_ig_datachart_core",
		priority: true,
		group: $.ig.loaderClass.locale.dvGroup,
		dependency: [ { name: "_ig_dv_geometry" } ],
		internal: true,
		scripts: [ "$path$/modules/infragistics.datachart_core.js" ]
	},
	{
		widget: "_ig_datachart_categorycore",
		priority: true,
		group: $.ig.loaderClass.locale.dvGroup,
		dependency: [ { name: "_ig_datachart_core" } ],
		internal: true,
		scripts: [ "$path$/modules/infragistics.datachart_categorycore.js" ]
	},
	{
		widget: "_ig_dv_commonwidget",
		dependency: [ { name: "_ig_datachart_core" }, { name: "_ig_dv_jquerydom" } ],
		scripts: [ "$path$/modules/infragistics.dvcommonwidget.js" ],
		group: $.ig.loaderClass.locale.dvGroup,
		internal: true,
		locale: [ "$localePath$/infragistics.dvcommonwidget-$locale$.js" ]
	},
	{
		widget: "_ig_dv_extendedaxes",
		group: $.ig.loaderClass.locale.dvGroup,
		dependency: [ { name: "_ig_datachart_categorycore" }],
		internal: true,
		scripts: [ "$path$/modules/infragistics.datachart_extendedaxes.js" ]
	},
	{
		widget: "_ig_dv_datasource",
		group: $.ig.loaderClass.locale.dvGroup,
		dependency: [ { name: "_ig_dv_core" }],
		internal: true,
		scripts: [ "$path$/modules/infragistics.dv_datasource.js" ]
	},
	{
		widget: "_ig_dv_dataseriesadapter",
		group: $.ig.loaderClass.locale.dvGroup,
		dependency: [ { name: "_ig_dv_datasource" }],
		internal: true,
		scripts: [ "$path$/modules/infragistics.dv_dataseriesadapter.js" ]
	},

	{
		widget: "igChartLegend",
		group: $.ig.loaderClass.locale.dvGroup,
		dependency: [ { name: "_ig_legend" }, { name: "_ig_dv_commonwidget" } ],
		scripts: [ "$path$/modules/infragistics.ui.chartlegend.js" ],
		description: $.ig.loaderClass.locale.descriptions.chartLegendDescription
	},
	{
		widget: "igDateTimeAxis",
		group: $.ig.loaderClass.locale.dvGroup,
		dependency: [ { name: "_ig_dv_extendedaxes" } ],
		scripts: [],
		description: $.ig.loaderClass.locale.descriptions.dateTimeAxisDescription
	},
	{
		widget: "igOverviewPlusDetailPane",
		group: $.ig.loaderClass.locale.dvGroup,
		dependency: [ { name: "_ig_dv_core" } ],
		scripts: [ "$path$/modules/infragistics.dv_opd.js" ],
		description: $.ig.loaderClass.locale.descriptions.overviewPlusDetailPaneDescription
	},

	{
		widget: "igDataChart",
		dependency: [ { name: "_ig_datachart_core" }, { name: "_ig_dv_commonwidget" },
					{ name: "igTemplating" }, { name: "igDataSource" } ],
		scripts: [ "$path$/modules/infragistics.ui.chart.js" ],
		group: $.ig.loaderClass.locale.dvGroup,
		css: [
			"$path$/structure/modules/infragistics.ui.html5.css",
			"$path$/structure/modules/infragistics.ui.shared.css",
			"$path$/structure/modules/infragistics.ui.chart.css"
			],
		description: $.ig.loaderClass.locale.descriptions.dataChartDescription
	},
	{
		widget: "Category",
		parentWidget: "igDataChart",
		dependency: [ { name: "_ig_datachart_categorycore" }, { name: "igDataChart" } ],
		group: $.ig.loaderClass.locale.dvGroup,
		scripts: [ "$path$/modules/infragistics.datachart_category.js" ],
		description: $.ig.loaderClass.locale.descriptions.categoryDescription
	},
	{
		widget: "RangeCategory",
		parentWidget: "igDataChart",
		dependency: [ { name: "_ig_datachart_categorycore" }, { name: "igDataChart" } ],
		group: $.ig.loaderClass.locale.dvGroup,
		scripts: [ "$path$/modules/infragistics.datachart_rangecategory.js" ],
		description: $.ig.loaderClass.locale.descriptions.rangeCategoryDescription
	},
	{
		widget: "VerticalCategory",
		parentWidget: "igDataChart",
		dependency: [ { name: "_ig_datachart_categorycore" }, { name: "igDataChart" } ],
		group: $.ig.loaderClass.locale.dvGroup,
		scripts: [ "$path$/modules/infragistics.datachart_verticalcategory.js" ],
		description: $.ig.loaderClass.locale.descriptions.verticalDescription
	},
	{
		widget: "Financial",
		parentWidget: "igDataChart",
		dependency: [ { name: "_ig_datachart_categorycore" }, { name: "igDataChart" } ],
		group: $.ig.loaderClass.locale.dvGroup,
		scripts: [ "$path$/modules/infragistics.datachart_financial.js" ],
		description: $.ig.loaderClass.locale.descriptions.financialDescription
	},
	{
		widget: "ExtendedFinancial",
		parentWidget: "igDataChart",
		dependency: [ { name: "Financial" } ],
		group: $.ig.loaderClass.locale.dvGroup,
		scripts: [ "$path$/modules/infragistics.datachart_extendedfinancial.js" ],
		description: $.ig.loaderClass.locale.descriptions.extendedFinancialDescription
	},
	{
		widget: "Polar",
		parentWidget: "igDataChart",
		dependency: [ { name: "_ig_dv_extendedaxes" }, { name: "igDataChart" } ],
		group: $.ig.loaderClass.locale.dvGroup,
		scripts: [ "$path$/modules/infragistics.datachart_polar.js" ],
		description: $.ig.loaderClass.locale.descriptions.polarDescription
	},
	{
		widget: "Radial",
		parentWidget: "igDataChart",
		dependency: [ { name: "_ig_dv_extendedaxes" }, { name: "igDataChart" } ],
		group: $.ig.loaderClass.locale.dvGroup,
		scripts: [ "$path$/modules/infragistics.datachart_radial.js" ],
		description: $.ig.loaderClass.locale.descriptions.radialDescription
	},
	{
		widget: "Scatter",
		parentWidget: "igDataChart",
		dependency: [ { name: "igDataChart" } ],
		group: $.ig.loaderClass.locale.dvGroup,
		scripts: [ "$path$/modules/infragistics.datachart_scatter.js" ],
		description: $.ig.loaderClass.locale.descriptions.scatterDescription
	},
	{
		widget: "Stacked",
		parentWidget: "igDataChart",
		dependency: [ { name: "Category" }, { name: "VerticalCategory" } ],
		group: $.ig.loaderClass.locale.dvGroup,
		scripts: [ "$path$/modules/infragistics.datachart_stacked.js" ],
		description: $.ig.loaderClass.locale.descriptions.stackedDescription
	},
	{
		widget: "Annotation",
		parentWidget: "igDataChart",
		dependency: [ { name: "igDataChart" } ],
		group: $.ig.loaderClass.locale.dvGroup,
		scripts: [ "$path$/modules/infragistics.datachart_annotation.js" ],
		description: $.ig.loaderClass.locale.descriptions.annotationDescription
	},
	{
		widget: "igDataChart.*",
		dependency: [ { name: "Category" },
					{ name: "RangeCategory" },
					{ name: "VerticalCategory" },
					{ name: "Financial" },
					{ name: "ExtendedFinancial" },
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
			],
		description: $.ig.loaderClass.locale.descriptions.pieChartDescription
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
		locale: [ "$localePath$/infragistics.ui.doughnutchart-$locale$.js" ],
		description: $.ig.loaderClass.locale.descriptions.doughnutChartDescription
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
		css: [ "$path$/structure/modules/infragistics.ui.chart.css" ],
		description: $.ig.loaderClass.locale.descriptions.funnelChartDescription
	},

	{
		widget: "_ig_dv_simple_core",
		priority: true,
		group: $.ig.loaderClass.locale.dvGroup,
		internal: true,
		scripts: [ "$path$/modules/infragistics.dv.simple.core.js" ]
	},
	{
		widget: "_ig_simple_datachart_core",
		dependency: [ { name: "igUtil" }, { name: "igTemplating" },
					{ name: "igDataSource" }, { name: "_ig_dv_jquerydom" }
		],
		scripts: [ "$path$/modules/infragistics.ui.basechart.js" ],
		group: $.ig.loaderClass.locale.dvGroup,
		internal: true,
		css: [
			"$path$/structure/modules/infragistics.ui.html5.css",
			"$path$/structure/modules/infragistics.ui.shared.css"
			]
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
		css: [ "$path$/structure/modules/infragistics.ui.sparkline.css" ],
		description: $.ig.loaderClass.locale.descriptions.sparklineDescription
	},

	{
		widget: "igRadialGauge",
		dependency: [ { name: "_ig_dv_geometry" }, { name: "_ig_dv_jquerydom" } ],
		scripts: [
			"$path$/modules/infragistics.radialgauge.js",
			"$path$/modules/infragistics.ui.radialgauge.js"
			],
		group: $.ig.loaderClass.locale.dvGroup,
		css: [ "$path$/structure/modules/infragistics.ui.radialgauge.css" ],
		description: $.ig.loaderClass.locale.descriptions.radialGaugeDescription
	},

	{
		widget: "igLinearGauge",
		dependency: [ { name: "_ig_dv_geometry" }, { name: "_ig_dv_jquerydom" } ],
		scripts: [
			"$path$/modules/infragistics.lineargauge.js",
			"$path$/modules/infragistics.ui.lineargauge.js"
			],
		group: $.ig.loaderClass.locale.dvGroup,
		description: $.ig.loaderClass.locale.descriptions.linearGaugeDescription
	},

	{
		widget: "igBulletGraph",
		dependency: [ { name: "_ig_dv_geometry" } ],
		scripts: [
			"$path$/modules/infragistics.ui.bulletgraph.js",
			"$path$/modules/infragistics.bulletgraph.js"
			],
		group: $.ig.loaderClass.locale.dvGroup,
		css: [ "$path$/structure/modules/infragistics.ui.bulletgraph.css" ],
		description: $.ig.loaderClass.locale.descriptions.bulletGraphDescription
	},

	{
		widget: "igCategoryChart",
		dependency: [ { name: "_ig_dv_dataseriesadapter" }, { name: "_ig_datachart_categorycore" },
					{ name: "_ig_dv_commonwidget" }, { name: "_ig_simple_datachart_core" } ],
		group: $.ig.loaderClass.locale.dvGroup,
		scripts: [
			"$path$/modules/infragistics.datachart_category.js",
			"$path$/modules/infragistics.categorychart.js",
			"$path$/modules/infragistics.ui.categorychart.js"
			],
		css: [
			"$path$/structure/modules/infragistics.ui.chart.css",
			"$path$/structure/modules/infragistics.ui.categorychart.css"
			],
		description: $.ig.loaderClass.locale.descriptions.categoryChartDescription
	},
/* /// End Data Visualization /// */

	{
		widget: "igRadialMenu",
		dependency: [
			{ name: "igUtil" },
			{ name: "_ig_dv_core" },
			{ name: "_ig_dv_jquerydom" }
			],
		scripts: [
			"$path$/modules/infragistics.radialmenu_core.js",
			"$path$/modules/infragistics.ui.radialmenu.js"
			],
		group: $.ig.loaderClass.locale.interactionsGroup,
		css: [ "$path$/structure/modules/infragistics.ui.radialmenu.css" ],
		description: $.ig.loaderClass.locale.descriptions.radialMenuDescription
	},

	{
		widget: "igQRCodeBarcode",
		dependency: [
			{ name: "igUtil" },
			{ name: "_ig_dv_simple_core" },
			{ name: "_ig_dv_jquerydom" }
			],
		scripts: [
			"$path$/modules/infragistics.barcode_qrcodebarcode.js",
			"$path$/modules/infragistics.ui.barcode.js"
			],
		locale: [ "$localePath$/infragistics.ui.barcode-$locale$.js" ],
		group: $.ig.loaderClass.locale.dvGroup,
		description: $.ig.loaderClass.locale.descriptions.qrCodeBarcodeDescription
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
			],
		description: $.ig.loaderClass.locale.descriptions.comboDescription
	},
	{
		widget: "igDialog",
		dependency: [ { name: "igUtil" } ],
		scripts: [ "$path$/modules/infragistics.ui.dialog.js" ],
		locale: [ "$localePath$/infragistics.ui.dialog-$locale$.js" ],
		group: $.ig.loaderClass.locale.layoutGroup,
		css: [ "$path$/structure/modules/infragistics.ui.dialog.css" ],
		description: $.ig.loaderClass.locale.descriptions.dialogDescription
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
			],
		description: $.ig.loaderClass.locale.descriptions.editorsDescription
	},
	{
		widget: "igZoombar",
		dependency: [ { name: "igUtil" }, { name: "igShared" } ],
		scripts: [ "$path$/modules/infragistics.ui.zoombar.js" ],
		locale: [ "$localePath$/infragistics.ui.zoombar-$locale$.js" ],
		css: [
			"$path$/structure/modules/infragistics.ui.shared.css",
			"$path$/structure/modules/infragistics.ui.zoombar.css"
			],
		description: $.ig.loaderClass.locale.descriptions.zoombarDescription
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
		css: [ "$path$/structure/modules/infragistics.ui.grid.css" ],
		description: $.ig.loaderClass.locale.descriptions.gridDescription
	},
	{
		widget: "ColumnMoving",
		parentWidget: "igGrid,igHierarchicalGrid",
		dependency: [
			{ name: "igGrid" },
			{ name: "FeatureChooser" },
			{ name: "igTree" }
			],
		description: $.ig.loaderClass.locale.descriptions.gridColumnMovingDescription,
		scripts: [ "$path$/modules/infragistics.ui.grid.columnmoving.js" ],
		css: [  ]
	},
	{
		widget: "Responsive",
		parentWidget: "igGrid,igHierarchicalGrid",
		dependency: [ { name: "igGrid" } ],
		scripts: [ "$path$/modules/infragistics.ui.grid.responsive.js" ],
		css: [  ],
		description: $.ig.loaderClass.locale.descriptions.gridResponsiveDescription
	},
	{
		widget: "GridShared",
		parentWidget: "igGrid,igHierarchicalGrid,igTreeGrid,igPivotGrid",
		dependency: [
			{ name: "igUtil" },
			{ name: "igGrid" }
			],
		scripts: [ "$path$/modules/infragistics.ui.grid.shared.js" ],
		css: [  ],
		description: $.ig.loaderClass.locale.descriptions.gridSharedDescription
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
		css: [  ],
		description: $.ig.loaderClass.locale.descriptions.gridFeatureChooserDescription
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
		css: [  ],
		description: $.ig.loaderClass.locale.descriptions.gridFilteringDescription
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
		css: [  ],
		description: $.ig.loaderClass.locale.descriptions.gridGroupByDescription
	},
	{
		widget: "Hiding",
		parentWidget: "igGrid,igHierarchicalGrid",
		dependency: [
			{ name: "igGrid" },
			{ name: "FeatureChooser" }
			],
		scripts: [ "$path$/modules/infragistics.ui.grid.hiding.js" ],
		css: [  ],
		description: $.ig.loaderClass.locale.descriptions.gridHidingDescription
	},
	{
		widget: "CellMerging",
		parentWidget: "igGrid,igHierarchicalGrid",
		dependency: [ { name: "igGrid" } ],
		scripts: [ "$path$/modules/infragistics.ui.grid.cellmerging.js" ],
		css: [  ],
		description: $.ig.loaderClass.locale.descriptions.gridCellMergingDescription
	},
	{
		widget: "Paging",
		parentWidget: "igGrid,igHierarchicalGrid",
		dependency: [
			{ name: "igGrid" },
			{ name: "igEditors" }
			],
		scripts: [ "$path$/modules/infragistics.ui.grid.paging.js" ],
		css: [  ],
		description: $.ig.loaderClass.locale.descriptions.gridPagingDescription
	},
	{
		widget: "Resizing",
		parentWidget: "igGrid,igHierarchicalGrid",
		dependency: [
			{ name: "igGrid" },
			{ name: "FeatureChooser" }
			],
		scripts: [ "$path$/modules/infragistics.ui.grid.resizing.js" ],
		css: [  ],
		description: $.ig.loaderClass.locale.descriptions.gridResizingDescription
	},
	{
		widget: "RowSelectors",
		parentWidget: "igGrid,igHierarchicalGrid",
		dependency: [ { name: "igGrid" } ],
		scripts: [ "$path$/modules/infragistics.ui.grid.rowselectors.js" ],
		css: [  ],
		description: $.ig.loaderClass.locale.descriptions.gridRowSelectorsDescription
	},
	{
		widget: "Selection",
		parentWidget: "igGrid,igHierarchicalGrid",
		dependency: [ { name: "igGrid" } ],
		scripts: [ "$path$/modules/infragistics.ui.grid.selection.js" ],
		css: [  ],
		description: $.ig.loaderClass.locale.descriptions.gridSelectionDescription
	},
	{
		widget: "Sorting",
		parentWidget: "igGrid,igHierarchicalGrid",
		dependency: [ { name: "igGrid" }, { name: "FeatureChooser" } ],
		scripts: [ "$path$/modules/infragistics.ui.grid.sorting.js" ],
		css: [  ],
		description: $.ig.loaderClass.locale.descriptions.gridSortingDescription
	},
	{
		widget: "Summaries",
		parentWidget: "igGrid,igHierarchicalGrid",
		dependency: [
			{ name: "igGrid" },
			{ name: "FeatureChooser" }
			],
		scripts: [ "$path$/modules/infragistics.ui.grid.summaries.js" ],
		css: [  ],
		description: $.ig.loaderClass.locale.descriptions.gridSummariesDescription
	},
	{
		widget: "MultiColumnHeaders",
		parentWidget: "igGrid,igHierarchicalGrid",
		dependency: [ { name: "igGrid" } ],
		scripts: [ "$path$/modules/infragistics.ui.grid.multicolumnheaders.js" ],
		css: [  ],
		description: $.ig.loaderClass.locale.descriptions.gridMultiColumnHeadersDescription
	},
	{
		widget: "Tooltips",
		parentWidget: "igGrid,igHierarchicalGrid",
		dependency: [
			{ name: "igGrid" },
			{ name: "igPopover" }
			],
		scripts: [ "$path$/modules/infragistics.ui.grid.tooltips.js" ],
		css: [  ],
		description: $.ig.loaderClass.locale.descriptions.gridTooltipsDescription
	},
	{
		widget: "ColumnFixing",
		parentWidget: "igGrid",
		dependency: [ { name: "igGrid" } ],
		scripts: [ "$path$/modules/infragistics.ui.grid.columnfixing.js" ],
		css: [  ],
		description: $.ig.loaderClass.locale.descriptions.gridColumnFixingDescription
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
		css: [  ],
		description: $.ig.loaderClass.locale.descriptions.gridUpdatingDescription
	},
	{
		widget: "AppendRowsOnDemand",
		parentWidget: "igGrid",
		dependency: [ { name: "igGrid" } ],
		scripts: [ "$path$/modules/infragistics.ui.grid.appendrowsondemand.js" ],
		css: [  ],
		description: $.ig.loaderClass.locale.descriptions.gridAppendRowsOnDemandDescription
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
		css: [  ],
		description: $.ig.loaderClass.locale.descriptions.hierarchicalGridDescription
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
			{ name: "igCombo" },
			{ name: "igEditors" },
			{ name: "igToolbarButton" },
			{ name: "igToolbar" }
			],
		scripts: [ "$path$/modules/infragistics.ui.htmleditor.js" ],
		locale: [ "$localePath$/infragistics.ui.htmleditor-$locale$.js" ],
		group: $.ig.loaderClass.locale.editorsGroup,
		css: [ "$path$/structure/modules/infragistics.ui.htmleditor.css" ],
		description: $.ig.loaderClass.locale.descriptions.htmlEditorDescription
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
			],
		description: $.ig.loaderClass.locale.descriptions.mapDescription
	},
/*/ end igMap /// */

	{
		widget: "igPivotShared",
		dependency: [ { name: "igScroll" }, { name: "igTree" } ],
		scripts: [ "$path$/modules/infragistics.ui.pivot.shared.js" ],
		locale: [ "$localePath$/infragistics.ui.pivot.shared-$locale$.js" ],
		group: $.ig.loaderClass.locale.pivotGroup,
		css: [ "$path$/structure/modules/infragistics.ui.pivot.css" ],
		description: $.ig.loaderClass.locale.descriptions.pivotSharedDescription
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
		css: [  ],
		description: $.ig.loaderClass.locale.descriptions.pivotGridDescription
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
		css: [  ],
		description: $.ig.loaderClass.locale.descriptions.pivotDataSelectorDescription
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
		css: [  ],
		description: $.ig.loaderClass.locale.descriptions.pivotViewDescription
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
			],
		description: $.ig.loaderClass.locale.descriptions.ratingDescription
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
		css: [ "$path$/structure/modules/infragistics.ui.reportviewer.css" ],
		description: $.ig.loaderClass.locale.descriptions.reportViewerDescription
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
		css: [ "$path$/structure/modules/infragistics.ui.tree.css" ],
		description: $.ig.loaderClass.locale.descriptions.treeDescription
	},
	{
		widget: "igPopover",
		dependency: [ { name: "igUtil" } ],
		scripts: [ "$path$/modules/infragistics.ui.popover.js" ],
		locale: [ "$localePath$/infragistics.ui.popover-$locale$.js" ],
		css: [ "$path$/structure/modules/infragistics.ui.popover.css" ],
		description: $.ig.loaderClass.locale.descriptions.popoverDescription
	},
	{
		widget: "igNotifier",
		dependency: [ { name: "igPopover" } ],
		scripts: [ "$path$/modules/infragistics.ui.notifier.js" ],
		locale: [ "$localePath$/infragistics.ui.notifier-$locale$.js" ],
		css: [ "$path$/structure/modules/infragistics.ui.notifier.css" ],
		description: $.ig.loaderClass.locale.descriptions.notifierDescription
	},
	{
		widget: "igSplitButton",
		dependency: [ { name: "igToolbarButton" } ],
		scripts: [ "$path$/modules/infragistics.ui.splitbutton.js" ],
		locale: [  ],
		css: [ "$path$/structure/modules/infragistics.ui.splitbutton.css" ],
		description: $.ig.loaderClass.locale.descriptions.splitButtonDescription
	},
	{
		widget: "igColorPicker",
		dependency: [  ],
		scripts: [ "$path$/modules/infragistics.ui.colorpicker.js" ],
		locale: [  ],
		css: [ "$path$/structure/modules/infragistics.ui.colorpicker.css" ],
		description: $.ig.loaderClass.locale.descriptions.colorPickerDescription
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
		css: [  ],
		description: $.ig.loaderClass.locale.descriptions.colorPickerSplitButtonDescription
	},
	{
		widget: "igLayoutManager",
		dependency: [ { name: "igUtil" } ],
		scripts: [ "$path$/modules/infragistics.ui.layoutmanager.js" ],
		group: $.ig.loaderClass.locale.layoutGroup,
		css: [ "$path$/structure/modules/infragistics.ui.layout.css" ],
		description: $.ig.loaderClass.locale.descriptions.layoutManagerDescription
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
		css: [ "$path$/structure/modules/infragistics.ui.tilemanager.css" ],
		description: $.ig.loaderClass.locale.descriptions.tileManagerDescription
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
		css: [ "$path$/structure/modules/infragistics.ui.upload.css" ],
		description: $.ig.loaderClass.locale.descriptions.uploadDescription
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
			],
		description: $.ig.loaderClass.locale.descriptions.validatorDescription
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
			"$path$/structure/modules/infragistics.ui.html5.css",
			"$path$/structure/modules/infragistics.ui.videoplayer.css"
			],
		description: $.ig.loaderClass.locale.descriptions.videoPlayerDescription
	},
	{
		widget: "igSplitter",
		dependency: [ { name: "igUtil" } ],
		scripts: [ "$path$/modules/infragistics.ui.splitter.js" ],
		locale: [ "$localePath$/infragistics.ui.splitter-$locale$.js" ],
		group: $.ig.loaderClass.locale.layoutGroup,
		css: [ "$path$/structure/modules/infragistics.ui.splitter.css" ],
		description: $.ig.loaderClass.locale.descriptions.splitterDescription
	},
	{
		widget: "igToolbarButton",
		dependency: [
			{ name: "igUtil" },
			{ name: "igShared" }
			],
		scripts: [ "$path$/modules/infragistics.ui.toolbarbutton.js" ],
		locale: [  ],
		css: [ "$path$/structure/modules/infragistics.ui.toolbarbutton.css" ],
		description: $.ig.loaderClass.locale.descriptions.toolbarButtonDescription
	},
	{
		widget: "igToolbar",
		dependency: [
			{ name: "igUtil" },
			{ name: "igToolbarButton" }
			],
		scripts: [ "$path$/modules/infragistics.ui.toolbar.js" ],
		locale: [ "$localePath$/infragistics.ui.toolbar-$locale$.js" ],
		css: [ "$path$/structure/modules/infragistics.ui.toolbar.css" ],
		description: $.ig.loaderClass.locale.descriptions.toolbarDescription
	},
/*/ igTreeGrid /// */
	{
		widget: "igTreeGrid",
		dependency: [ { name: "igGrid" } ],
		scripts: [ "$path$/modules/infragistics.ui.treegrid.js" ],
		locale: [ "$localePath$/infragistics.ui.treegrid-$locale$.js" ],
		group: $.ig.loaderClass.locale.gridGroup,
		css: [ "$path$/structure/modules/infragistics.ui.treegrid.css" ],
		description: $.ig.loaderClass.locale.descriptions.treeGridDescription
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
		scripts: [ "$path$/modules/infragistics.ui.treegrid.filtering.js" ],
		description: $.ig.loaderClass.locale.descriptions.treeGridFilteringDescription
	},
	{
		widget: "Hiding",
		parentWidget: "igTreeGrid",
		dependency: [
			{ name: "igTreeGrid" },
			{ name: "Hiding", parentWidget: "igGrid,igHierarchicalGrid" }
			],
		scripts: [ "$path$/modules/infragistics.ui.treegrid.hiding.js" ],
		description:  $.ig.loaderClass.locale.descriptions.treeGridHidingDescription
	},
	{
		widget: "Updating",
		parentWidget: "igTreeGrid",
		dependency: [
			{ name: "igTreeGrid" },
			{ name: "Updating", parentWidget: "igGrid,igHierarchicalGrid" }
			],
		scripts: [ "$path$/modules/infragistics.ui.treegrid.updating.js" ],
		description: $.ig.loaderClass.locale.descriptions.treeGridUpdatingDescription
	},
	{
		widget: "Paging",
		parentWidget: "igTreeGrid",
		dependency: [
			{ name: "igTreeGrid" },
			{ name: "Paging", parentWidget: "igGrid,igHierarchicalGrid" }
			],
		scripts: [ "$path$/modules/infragistics.ui.treegrid.paging.js" ],
		description: $.ig.loaderClass.locale.descriptions.treeGridPagingDescription
	},
	{
		widget: "Resizing",
		parentWidget: "igTreeGrid",
		dependency: [
			{ name: "igTreeGrid" },
			{ name: "Resizing", parentWidget: "igGrid,igHierarchicalGrid" }
			],
		scripts: [ "$path$/modules/infragistics.ui.treegrid.resizing.js" ],
		description: $.ig.loaderClass.locale.descriptions.treeGridResizingDescription
	},
	{
		widget: "Selection",
		parentWidget: "igTreeGrid",
		dependency: [
			{ name: "igTreeGrid" },
			{ name: "Selection", parentWidget: "igGrid,igHierarchicalGrid" }
			],
		scripts: [ "$path$/modules/infragistics.ui.treegrid.selection.js" ],
		description: $.ig.loaderClass.locale.descriptions.treeGridSelectionDescription
	},
	{
		widget: "RowSelectors",
		parentWidget: "igTreeGrid",
		dependency: [
			{ name: "igTreeGrid" },
			{ name: "RowSelectors", parentWidget: "igGrid,igHierarchicalGrid" }
			],
		scripts: [ "$path$/modules/infragistics.ui.treegrid.rowselectors.js" ],
		description: $.ig.loaderClass.locale.descriptions.treeGridRowSelectorsDescription
	},
	{
		widget: "Sorting",
		parentWidget: "igTreeGrid",
		dependency: [
			{ name: "igTreeGrid" },
			{ name: "Sorting", parentWidget: "igGrid,igHierarchicalGrid" }
			],
		scripts: [ "$path$/modules/infragistics.ui.treegrid.sorting.js" ],
		description: $.ig.loaderClass.locale.descriptions.treeGridSortingDescription
	},
	{
		widget: "MultiColumnHeaders",
		parentWidget: "igTreeGrid",
		dependency: [
			{ name: "igTreeGrid" },
			{ name: "MultiColumnHeaders", parentWidget: "igGrid,igHierarchicalGrid" }
			],
		scripts: [ "$path$/modules/infragistics.ui.treegrid.multicolumnheaders.js" ],
		description: $.ig.loaderClass.locale.descriptions.treeGridMultiColumnHeadersDescription
	},
	{
		widget: "Tooltips",
		parentWidget: "igTreeGrid",
		dependency: [
			{ name: "igTreeGrid" },
			{ name: "Tooltips", parentWidget: "igGrid,igHierarchicalGrid" }
			],
		scripts: [ "$path$/modules/infragistics.ui.treegrid.tooltips.js" ],
		description: $.ig.loaderClass.locale.descriptions.treeGridTooltipsDescription
	},
	{
		widget: "ColumnFixing",
		parentWidget: "igTreeGrid",
		dependency: [
			{ name: "igTreeGrid" },
			{ name: "ColumnFixing", parentWidget: "igGrid" }
			],
		scripts: [ "$path$/modules/infragistics.ui.treegrid.columnfixing.js" ],
		description: $.ig.loaderClass.locale.descriptions.treeGridColumnFixingDescription
	},
	{
		widget: "ColumnMoving",
		parentWidget: "igTreeGrid",
		dependency: [
			{ name: "igTreeGrid" },
			{ name: "ColumnMoving", parentWidget: "igGrid,igHierarchicalGrid" }
			],
		scripts: [ "$path$/modules/infragistics.ui.treegrid.columnmoving.js" ],
		description: $.ig.loaderClass.locale.descriptions.treeGridColumnMovingDescription
	},
/*/ end igTreeGrid Features/// */
/*/ start igExcel/// */
	{
		widget: "igExcel",
		dependency: [
			{ name: "_ig_documents_core_core" },
			{ name: "_ig_ext_collections_extended" }
		],
		scripts: [ "$path$/modules/infragistics.excel_core.js" ],
		locale: [ "$localePath$/infragistics.excel_core-$locale$.js" ],
		description: $.ig.loaderClass.locale.descriptions.excelDescription
	},
	{
		widget: "Functions",
		parentWidget: "igExcel",
		dependency: [ { name: "igExcel" } ],
		scripts: [ "$path$/modules/infragistics.excel_functions.js" ],
		description: $.ig.loaderClass.locale.descriptions.excelFunctionsDescription
	},
	{
		widget: "_ig_xml",
		dependency: [
			{ name: "igUtil" },
			{ name: "_ig_ext_core" },
			{ name: "_ig_ext_collections" },
			{ name: "_ig_ext_io" },
			{ name: "_ig_ext_text" },
			{ name: "_ig_ext_web" }
		],
		group: $.ig.loaderClass.locale.miscGroup,
		internal: true,
		scripts: [ "$path$/modules/infragistics.xml.js" ]
	},
	{
		widget: "_ig_documents_core_core",
		dependency: [
			{ name: "igUtil" },
			{ name: "_ig_ext_core" },
			{ name: "_ig_ext_collections" },
			{ name: "_ig_ext_text" },
			{ name: "_ig_ext_io" },
			{ name: "_ig_ext_ui" }
		],
		priority: true,
		group: $.ig.loaderClass.locale.miscGroup,
		internal: true,
		scripts: [ "$path$/modules/infragistics.documents.core_core.js" ],
		locale: [ "$localePath$/infragistics.documents.core_core-$locale$.js" ]
	},
	{
		widget: "_ig_documents_core_openxml",
		dependency: [
			{ name: "_ig_documents_core_core" },
			{ name: "_ig_ext_collections_extended" },
			{ name: "_ig_xml" }
		],
		group: $.ig.loaderClass.locale.miscGroup,
		internal: true,
		scripts: [ "$path$/modules/infragistics.documents.core_openxml.js" ]
	},
	{
		widget: "_ig_excel_openxml",
		dependency: [
			{ name: "igExcel" },
			{ name: "_ig_documents_core_openxml" }
		],
		group: $.ig.loaderClass.locale.miscGroup,
		scripts: [ "$path$/modules/infragistics.excel_serialization_openxml.js" ],
		internal: true
	},
	{
		widget: "_ig_excel_biff8",
		dependency: [ { name: "igExcel" } ],
		group: $.ig.loaderClass.locale.miscGroup,
		scripts: [ "$path$/modules/infragistics.excel_serialization_biff8.js" ],
		internal: true
	},
	{
		widget: "LoadSaveXls",
		parentWidget: "igExcel",
		dependency: [ { name: "_ig_excel_biff8" } ],
		description: $.ig.loaderClass.locale.descriptions.excelLoadSaveXlsDescription
	},
	{
		widget: "LoadSaveXlt",
		parentWidget: "igExcel",
		dependency: [ { name: "_ig_excel_biff8" } ],
		description: $.ig.loaderClass.locale.descriptions.excelLoadSaveXltDescription
	},
	{
		widget: "LoadSaveXlsx",
		parentWidget: "igExcel",
		dependency: [ { name: "_ig_excel_openxml" } ],
		description: $.ig.loaderClass.locale.descriptions.excelLoadSaveXlsxDescription
	},
	{
		widget: "LoadSaveXlsm",
		parentWidget: "igExcel",
		dependency: [ { name: "_ig_excel_openxml" } ],
		description: $.ig.loaderClass.locale.descriptions.excelLoadSaveXlsmDescription
	},
	{
		widget: "LoadSaveXltm",
		parentWidget: "igExcel",
		dependency: [ { name: "_ig_excel_openxml" } ],
		description: $.ig.loaderClass.locale.descriptions.excelLoadSaveXltmDescription
	},
	{
		widget: "LoadSaveXltx",
		parentWidget: "igExcel",
		dependency: [ { name: "_ig_excel_openxml" } ],
		description: $.ig.loaderClass.locale.descriptions.excelLoadSaveXltxDescription
	},
	{
		widget: "igExcel.*",
		dependency: [
			{ name: "Functions" },
			{ name: "LoadSaveXls" },
			{ name: "LoadSaveXlt" },
			{ name: "LoadSaveXlsx" },
			{ name: "LoadSaveXlsm" },
			{ name: "LoadSaveXltm" },
			{ name: "LoadSaveXltx" }
		]
	},
/*/ end igExcel /// */
/*/ start igSpreadsheet/// */
	{
		widget: "_ig_undo",
		dependency: [
			{ name: "igUtil" },
			{ name: "_ig_ext_core" },
			{ name: "_ig_ext_collections" }
		],
		group: $.ig.loaderClass.locale.miscGroup,
		internal: true,
		scripts: [ "$path$/modules/infragistics.undo.js" ],
		locale: [ "$localePath$/infragistics.undo-$locale$.js" ]
	},
	{
		widget: "igSpreadsheet",
		dependency: [
			{ name: "igUtil" },
			{ name: "_ig_ext_core" },
			{ name: "_ig_ext_collections" },
			{ name: "_ig_ext_collections_extended" },
			{ name: "_ig_xml" },
			{ name: "_ig_ext_ui" },
			{ name: "_ig_ext_io" },
			{ name: "_ig_ext_web" },
			{ name: "_ig_dv_core" },
			{ name: "_ig_dv_jquerydom" },
			{ name: "_ig_documents_core_openxml" },
			{ name: "igExcel" },
			{ name: "Functions", parentWidget: "igExcel" },
			{ name: "igCombo" },
			{ name: "_ig_undo" }
		],
		group: $.ig.loaderClass.locale.gridGroup,
		scripts: [
			"$path$/modules/infragistics.spreadsheet.js",
			"$path$/modules/infragistics.ui.spreadsheet.js"
		],
		locale: [ "$localePath$/infragistics.spreadsheet-$locale$.js" ],
		css: [ "$path$/structure/modules/infragistics.ui.spreadsheet.css" ],
		description: $.ig.loaderClass.locale.descriptions.spreadsheetDescription
	},
/*/ end igSpreadsheet /// */
/*/ start igScheduler/// */
    {
        widget: "igScheduler",
        dependency: [
            { name: "igUtil" },
            { name: "_ig_ext_core" },
            { name: "_ig_ext_collections" },
            { name: "_ig_ext_collections_extended" },
            { name: "_ig_ext_ui" },
            { name: "_ig_ext_text" },
            { name: "_ig_ext_io" },
            { name: "_ig_ext_threading" },
            { name: "_ig_ext_web" },
            { name: "igScroll" },
            { name: "_ig_dv_core" },
            { name: "_ig_dv_jquerydom" },
            { name: "igDataSource" },
            { name: "igShared" },
            { name: "igCombo" },
            { name: "igEditors" }
        ],
        scripts: [
            "$path$/modules/infragistics.scheduler.core.js",
            "$path$/modules/infragistics.ui.scheduler.core.js",
            "$path$/modules/infragistics.ui.scheduler.js"
        ],
        locale: [
            "$localePath$/infragistics.scheduler.core-$locale$.js",
            "$localePath$/infragistics.ui.scheduler-$locale$.js"
        ],
        group: $.ig.loaderClass.locale.dvGroup,
        css: [
            "$path$/structure/modules/infragistics.ui.shared.css",
            "$path$/structure/modules/infragistics.ui.scheduler.css"
            ],
        description: $.ig.loaderClass.locale.descriptions.schedulerDescription
    },
/*/ end igScheduler /// */
/*/ start igGridExcelExporter/// */
	{
		widget: "igGridExcelExporter",
		dependency: [ { name: "igExcel" }, { name: "LoadSaveXlsx" }],
		scripts: [ "$path$/modules/infragistics.gridexcelexporter.js" ],
		description: $.ig.loaderClass.locale.descriptions.gridExcelExporterDescription
	}
/*/ end igGridExcelExporter /// */

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
			if (!this._readyHeld) {
				$.holdReady(true);
				this._readyHeld = true;
			}

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
		if (this._readyHeld) {
			$.holdReady(false);
			delete this._readyHeld;
		}
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
