/*
* Infragistics.Web.ClientUI common utilities localization resources <build_number>
*
* Copyright (c) 2011-<year> Infragistics Inc.
*
* http://www.infragistics.com/
*
*/

(function (factory) {
	if (typeof define === "function" && define.amd) {
		define( ["jquery"], factory );
	} else {
		return factory(jQuery);
	}
}
(function ($) {
	$.ig = $.ig || {};
	$.ig.util = $.ig.util || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.bg = $.ig.locale.bg || {};

	$.ig.locale.bg.util = {
			    unsupportedBrowser: "Браузърът ви не поддържа HTML5 canvas елемент. <br/>Моля обновете до някоя от следните версии:",
			    currentBrowser: "Вашият браузър: {0}",
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
			    defaultSummaryMethodLabelMin: "Минимум = ",
			    defaultSummaryMethodLabelMax: "Максимум = ",
			    defaultSummaryMethodLabelSum: "Сума = ",
			    defaultSummaryMethodLabelAvg: "Осреднено = ",
			    defaultSummaryMethodLabelCount: "Брой = "
	}

	$.ig.util.locale = $.ig.util.locale || $.ig.locale.bg.util;
	return $.ig.locale.bg.util;
}));// REMOVE_FROM_COMBINED_FILES
