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
	$.ig.locale.tr = $.ig.locale.tr || {};

	$.ig.locale.tr.VideoPlayer = {
			    liveStream: "Canlı video",
			    live: "Canlı",
			    paused: "Duraklatıldı",
			    playing: "Oynatılıyor",
			    play: 'Oynat',
			    volume: "Ses",
			    unsupportedVideoSource: "Mevcut video kaynakları, tarayıcınız tarafından desteklenen bir format içermiyor.",
			    missingVideoSource: "Uyumlu video kaynağı yok.",
			    progressLabelLongFormat: "$currentTime$ / $duration$",
			    progressLabelShortFormat: "$currentTime$",
			    enterFullscreen: "Tam Ekrana Git",
			    exitFullscreen: "Tam Ekrandan Çık",
			    skipTo: "GEÇ",
			    unsupportedBrowser: "Mevcut tarayıcı HTML5 videoyu desteklemiyor. <br/>Aşağıdaki sürümlerden herhangi birine yükseltmeyi deneyin:",
			    currentBrowser: "Mevcut tarayıcı: {0}",
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
			    buffering: 'Arabelleğe alınıyor...',
			    adMessage: 'Reklam: Video, $duration$ saniye içinde devam edecek.',
			    adMessageLong: 'Reklam: Video, $duration$ içinde devam edecek.',
			    adMessageNoDuration: 'Reklam: Video, reklamdan sonra devam edecek.',
			    adNewWindowTip: 'Reklam: Reklam içeriğini yeni bir pencerede açmak için tıklayın.',
			    nonDivException: 'Infragistics HTML5 Video Oynatıcı yalnızca bir DIV etiketinde örneklenebilir.',
			    relatedVideos: 'İLGİLİ VİDEOLAR',
			    replayButton: 'Tekrar oynat',
			    replayTooltip: 'Son videoyu tekrar oynatmak için tıklayın.',
				noCommercials: 'Tarayıcı kontrolleri reklamları desteklemiyor'
	}

	$.ig.VideoPlayer.locale = $.ig.VideoPlayer.locale || $.ig.locale.tr.VideoPlayer;
	return $.ig.locale.tr.VideoPlayer;
}));// REMOVE_FROM_COMBINED_FILES
