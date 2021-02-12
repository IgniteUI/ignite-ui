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
	$.ig.locale['zh-Hans'] = $.ig.locale['zh-Hans'] || {};

	$.ig.locale['zh-Hans'].VideoPlayer = {
			    liveStream: "实时视频",
			    live: "实时",
			    paused: "已暂停",
			    playing: "正在播放",
			    play: '播放',
			    volume: "成交量",
			    unsupportedVideoSource: "当前视频源不包含您的浏览器支持的格式。",
			    missingVideoSource: "无兼容视频源。",
			    progressLabelLongFormat: "$currentTime$ / $duration$",
			    progressLabelShortFormat: "$currentTime$",
			    enterFullscreen: "进入全屏",
			    exitFullscreen: "退出全屏",
			    skipTo: "跳至",
			    unsupportedBrowser: "当前浏览器不支持 HTML5 视频。<br/>尝试升级至以下任何版本:",
			    currentBrowser: "当前浏览器: {0}",
			    ie9: "Microsoft Internet Explorer V 9+",
			    chrome8: "Google Chrome V 8+",
			    firefox36: "Mozilla Firefox V 3.6+",
			    safari5: "Apple Safari V 5+",
			    opera11: "Opera V 11+",
			    ieDownload: "http://www.microsoft.com/windows/internet-explorer/default.aspx",
			    operaDownload: "https://www.opera.com/zh-CN/download",
			    chromeDownload: "https://www.google.com/intl/zh-CN/chrome/",
			    firefoxDownload: "https://www.mozilla.org/zh-CN/firefox/",
			    safariDownload: "https://www.apple.com.cn/safari/",
			    buffering: '正在缓冲...',
			    adMessage: '广告: 视频将在 $duration$ 秒内继续播放。',
			    adMessageLong: '广告: 视频将在 $duration$ 内继续播放。',
			    adMessageNoDuration: '广告: 视频将在商业广告后继续播放。',
			    adNewWindowTip: '广告: 单击可在新窗口中打开广告内容。',
			    nonDivException: 'Infragistics HTML5 Video Player 只能在 DIV 标签上实例化。',
			    relatedVideos: '相关视频',
			    replayButton: '重播',
			    replayTooltip: '单击以重播上一个视频。',
				noCommercials: '浏览器控件不支持广告'
	}

	$.ig.VideoPlayer.locale = $.ig.VideoPlayer.locale || $.ig.locale['zh-Hans'].VideoPlayer;
	return $.ig.locale['zh-Hans'].VideoPlayer;
}));// REMOVE_FROM_COMBINED_FILES
