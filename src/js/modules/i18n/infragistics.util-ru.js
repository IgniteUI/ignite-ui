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
	$ = $ || {};
    $.ig = $.ig || {};
	$.ig.util = $.ig.util || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.ru = $.ig.locale.ru || {};

	$.ig.locale.ru.util = {
			    unsupportedBrowser: "Ваш браузер не поддерживает HTML5 canvas элемент. <br/>Попробуйте воспользоваться следующими версиями браузеров:",
			    currentBrowser: "Ваш браузер: {0}",
			    ie9: "Microsoft Internet Explorer 9+",
			    chrome8: "Google Chrome 8+",
			    firefox36: "Mozilla Firefox 3.6+",
			    safari5: "Apple Safari 5+",
			    opera11: "Opera 11+",
			    ieDownload: "http://www.microsoft.com/windows/internet-explorer/default.aspx",
			    operaDownload: "http://www.opera.com/download/",
			    chromeDownload: "http://www.google.com/chrome",
			    firefoxDownload: "http://www.mozilla.com/",
			    safariDownload: "http://www.apple.com/safari/download/",
			    defaultSummaryMethodLabelMin: "Мин. = ",
			    defaultSummaryMethodLabelMax: "Макс. = ",
			    defaultSummaryMethodLabelSum: "Сумма = ",
			    defaultSummaryMethodLabelAvg: "Ср. = ",
			    defaultSummaryMethodLabelCount: "Кол-во = "
	}

	$.ig.util.locale = $.ig.util.locale || $.ig.locale.ru.util;
	return $.ig.locale.ru.util;
}));// REMOVE_FROM_COMBINED_FILES
