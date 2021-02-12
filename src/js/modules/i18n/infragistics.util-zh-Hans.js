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
	$.ig.locale['zh-Hans'] = $.ig.locale['zh-Hans'] || {};

	$.ig.locale['zh-Hans'].util = {
			    unsupportedBrowser: "当前浏览器不支持 HTML5 canvas 元素。<br/>尝试升级至以下任何版本:",
			    currentBrowser: "当前浏览器: {0}",
			    ie9: "Microsoft Internet Explorer V 9+",
			    chrome8: "Google Chrome V 8+",
			    firefox36: "Mozilla Firefox V 3.6+",
			    safari5: "Apple Safari V 5+",
			    opera11: "Opera V 11+",
			    ieDownload: "http://www.microsoft.com/windows/internet-explorer/default.aspx",
			    operaDownload: "https://www.opera.com/zh-cn/download",
			    chromeDownload: "https://www.google.com/intl/zh-CN/chrome/",
			    firefoxDownload: "https://www.mozilla.org/zh-CN/firefox/",
			    safariDownload: "https://www.apple.com.cn/safari/",
			    defaultSummaryMethodLabelMin: "最小值 = ",
			    defaultSummaryMethodLabelMax: "最大值 = ",
			    defaultSummaryMethodLabelSum: "合计 = ",
			    defaultSummaryMethodLabelAvg: "平均 = ",
			    defaultSummaryMethodLabelCount: "计数 = "
	}
	
	$.ig.util.locale = $.ig.util.locale || $.ig.locale['zh-Hans'].util;
	return igRoot;
}));// REMOVE_FROM_COMBINED_FILES
