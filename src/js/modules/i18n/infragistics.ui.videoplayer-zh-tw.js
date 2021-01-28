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
		define( ["jquery"], factory );
	} else {
		return factory(jQuery);
	}
}
(function ($) {
	$.ig = $.ig || {};
	$.ig.VideoPlayer = $.ig.VideoPlayer || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale['zh-tw'] = $.ig.locale['zh-tw'] || {};

	$.ig.locale['zh-tw'].VideoPlayer = {
			    liveStream: "實況視訊",
			    live: "直播",
			    paused: "已暫停",
			    playing: "正在播放",
			    play: '播放',
			    volume: "成交量",
			    unsupportedVideoSource: "當前視訊來源不包含您的瀏覽器支援的格式。",
			    missingVideoSource: "無相容的視訊來源。",
			    progressLabelLongFormat: "$currentTime$ / $duration$",
			    progressLabelShortFormat: "$currentTime$",
			    enterFullscreen: "進入全螢幕",
			    exitFullscreen: "退出全螢幕",
			    skipTo: "跳至",
			    unsupportedBrowser: "當前瀏覽器不支援 HTML5 視訊。<br/>嘗試升級至以下任何版本:",
			    currentBrowser: "當前瀏覽器: {0}",
			    ie9: "Microsoft Internet Explorer V 9+",
			    chrome8: "Google Chrome V 8+",
			    firefox36: "Mozilla Firefox V 3.6+",
			    safari5: "Apple Safari V 5+",
			    opera11: "Opera V 11+",
			    ieDownload: "http://www.microsoft.com/windows/internet-explorer/default.aspx",
			    operaDownload: "http://www.opera.com/download/",
			    chromeDownload: "https://www.google.com/intl/zh-TW/chrome/",
			    firefoxDownload: "https://www.mozilla.org/zh-TW/firefox/",
			    safariDownload: "https://www.apple.com/tw/safari/",
			    buffering: '正在緩衝...',
			    adMessage: '廣告:視訊將在 $duration$ 秒內恢復播放。',
			    adMessageLong: '廣告:視訊將在 $duration$ 後恢復播放。',
			    adMessageNoDuration: '廣告:視訊將在廣告投放後恢復播放。',
			    adNewWindowTip: '廣告:點選可在新窗口中打開廣告內容。',
			    nonDivException: '僅可在 DIV 標籤上實例化 Infragistics HTML5 視訊播放器。',
			    relatedVideos: '相關影片',
			    replayButton: '重新播放',
			    replayTooltip: '點選以重播上一個視訊。',
				noCommercials: '瀏覽器控件不支援廣告的'
	}

	$.ig.VideoPlayer.locale = $.ig.VideoPlayer.locale || $.ig.locale['zh-tw'].VideoPlayer;
	return $.ig.locale['zh-tw'].VideoPlayer;
}));// REMOVE_FROM_COMBINED_FILES
