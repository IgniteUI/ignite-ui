/*!@license
* Infragistics.Web.ClientUI Video Player localization resources <build_number>
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

    if (!$.ig.VideoPlayer) {
	    $.ig.VideoPlayer = {};

	    $.extend($.ig.VideoPlayer, {

		    locale: {
			    liveStream: "ライブ ビデオ",
			    live: "ライブ",
			    paused: "一時停止",
			    playing: "再生している",
			    play: '再生',
			    volume: "音量",
			    unsupportedVideoSource: "現在のビデオ ソースにはブラウザーでサポートされる書式が含まれていません。",
			    missingVideoSource: "互換性のあるビデオ ソースがありません。",
			    progressLabelLongFormat: "$currentTime$ / $duration$",
			    progressLabelShortFormat: "$currentTime$",
			    enterFullscreen: "全画面表示の開始",
			    exitFullscreen: "全画面表示の終了",
			    skipTo: "指定の位置に移動",
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
			    buffering: '読み込んでいます',
			    adMessage: '広告: ビデオは $duration$ 秒後に再開します。', // Use also $timeString$ for MM:SS format.
			    adMessageLong: '広告: ビデオは $duration$ 後に再開します。',
			    adMessageNoDuration: '広告: ビデオはコマーシャルの後に再開します。',
			    adNewWindowTip: '広告: クリックすると、広告コンテンツを新しいウィンドウで開きます。',
			    nonDivException: 'Infragistics HTML5 ビデオ プレーヤーは DIV タグのみにインスタンス化できます。',
			    relatedVideos: '関連ビデオ',
			    replayButton: '再生',
			    replayTooltip: 'クリックすると、前回再生したビデオを再生します'
		    }
	    });

    }
}));// REMOVE_FROM_COMBINED_FILES
