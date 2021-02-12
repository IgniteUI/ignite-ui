/*!@license
* Infragistics.Web.ClientUI common utilities localization resources <build_number>
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
	$.ig.locale.it = $.ig.locale.it || {};

	$.ig.locale.it.util = {
			    unsupportedBrowser: "Il browser corrente non supporta l'elemento canvas HTML5. <br/>Prova a eseguire l'upgrade a una delle seguenti versioni:",
			    currentBrowser: "Browser corrente: {0}",
			    ie9: "Microsoft Internet Explorer V 9+",
			    chrome8: "Google Chrome V 8+",
			    firefox36: "Mozilla Firefox V 3.6+",
			    safari5: "Apple Safari V 5+",
			    opera11: "Opera V 11+",
			    ieDownload: "http://www.microsoft.com/windows/internet-explorer/default.aspx",
			    operaDownload: "https://www.opera.com/it/download",
			    chromeDownload: "https://www.google.com/intl/it/chrome/",
			    firefoxDownload: "https://www.mozilla.org/it/firefox/",
			    safariDownload: "https://www.apple.com/it/safari/",
			    defaultSummaryMethodLabelMin: "Min = ",
			    defaultSummaryMethodLabelMax: "Max = ",
			    defaultSummaryMethodLabelSum: "Sum = ",
			    defaultSummaryMethodLabelAvg: "Avg = ",
			    defaultSummaryMethodLabelCount: "Count = "
	}
	
	$.ig.util.locale = $.ig.util.locale || $.ig.locale.it.util;
	return igRoot;
}));// REMOVE_FROM_COMBINED_FILES
