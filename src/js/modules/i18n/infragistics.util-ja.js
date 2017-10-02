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
		define( ["jquery"], factory );
	} else {
		return factory(jQuery);
	}
}
(function ($) {
	$.ig = $.ig || {};
	$.ig.util = $.ig.util || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.ja = $.ig.locale.ja || {};

	$.ig.locale.ja.util = {
			    unsupportedBrowser: "現在のブラウザーは HTML5 ビデオをサポートしません。<br/>以下のバージョンにアップグレードしてください。",
			    currentBrowser: "現在のブラウザー: {0}",
			    ie9: "Microsoft Internet Explorer 9+",
			    chrome8: "Google Chrome 8+",
			    firefox36: "Mozilla Firefox 3.6+",
			    safari5: "Apple Safari 5+",
			    opera11: "Opera 11+",
			    ieDownload: "http://www.microsoft.com/japan/windows/internet-explorer/default.aspx",
			    operaDownload: "http://www.opera.com/download/",
			    chromeDownload: "http://www.google.co.jp/chrome/intl/ja/landing_ff.html?hl=ja",
			    firefoxDownload: "http://www.mozilla.com/",
			    safariDownload: "http://www.apple.com/jp/safari/download/",
			    defaultSummaryMethodLabelMin: "最小値 = ",
			    defaultSummaryMethodLabelMax: "最大値 = ",
			    defaultSummaryMethodLabelSum: "合計 = ",
			    defaultSummaryMethodLabelAvg: "平均 = ",
			    defaultSummaryMethodLabelCount: "数値の個数 = "
	}

	$.ig.util.locale = $.ig.util.locale || $.ig.locale.ja.util;
	return $.ig.locale.ja.util;
}));// REMOVE_FROM_COMBINED_FILES
