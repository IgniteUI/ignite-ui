﻿/*!@license
* Infragistics.Web.ClientUI common utilities localization resources <build_number>
*
* Copyright (c) 2011-<year> Infragistics Inc.
*
* http://www.infragistics.com/
*
*/

(function (factory) {
	if (typeof define === "function" && define.amd) {
		define( [
			"jquery"
		], factory );
	} else {
		factory(jQuery);
	}
}
(function ($) {
    $.ig = $.ig || {};

    if (!$.ig.util) {
	    $.ig.util = {};

	    $.extend($.ig.util, {

		    locale: {
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
	    });

    }
}));// REMOVE_FROM_COMBINED_FILES
