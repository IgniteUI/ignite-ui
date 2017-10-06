/*!@license
* Infragistics.Web.ClientUI utilities localization resources <build_number>
*
* Copyright (c) 2011-<year> Infragistics Inc.
*
* http://www.infragistics.com/
*
*/

(function (factory) {
	if (typeof define === "function" && define.amd) {
		define( [], factory );
	} else {
		return factory();
	}
}
(function () {
	window.igRoot = window.igRoot || {};
	/* jshint ignore:start */
	if (window.$ !== undefined || typeof $ === "function") {
		window.igRoot = window.$ || $;
	}
	/* jshint ignore:end */

	window.igRoot.ig = window.igRoot.ig || { _isNamespace: true };
	window.$ig = window.$ig || window.igRoot.ig;

	var $ = igRoot; // REMOVE_FROM_COMBINED_FILES

	$ = $ || {};
	$.ig = $.ig || {};
	$.ig.util = $.ig.util || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.de = $.ig.locale.de || {};

	$.ig.locale.de.util = {
			    unsupportedBrowser: "Der aktuelle Browser unterstützt HTML5 Canvas Element nicht. <br/>Führen Sie ein Upgrade auf eine der folgenden Versionen durch:",
			    currentBrowser: "Aktueller Browser: {0}",
			    ie9: "Microsoft Internet Explorer V 9+",
			    chrome8: "Google Chrome V 8+",
			    firefox36: "Mozilla Firefox V 3.6+",
			    safari5: "Apple Safari V 5+",
			    opera11: "Opera V 11+",
			    ieDownload: "http://www.microsoft.com/windows/internet-explorer/default.aspx",
			    operaDownload: "http://www.opera.com/download/",
			    chromeDownload: "http://www.google.com/chrome",
			    firefoxDownload: "http://www.mozilla.com/",
			    safariDownload: "http://www.apple.com/safari/download/",
			    defaultSummaryMethodLabelMin: "Min = ",
			    defaultSummaryMethodLabelMax: "Max = ",
			    defaultSummaryMethodLabelSum: "Summe = ",
			    defaultSummaryMethodLabelAvg: "Mittelw. = ",
			    defaultSummaryMethodLabelCount: "Anzahl = "
	}

	$.ig.util.locale = $.ig.util.locale || $.ig.locale.de.util;
	return igRoot;
}));// REMOVE_FROM_COMBINED_FILES
