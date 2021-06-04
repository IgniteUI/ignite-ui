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
	$.ig.locale.da = $.ig.locale.da || {};

	$.ig.locale.da.VideoPlayer = {
			    liveStream: "Live video",
			    live: "Direkte",
			    paused: "Pauset",
			    playing: "Spiller",
			    play: 'Spil',
			    volume: "Volumen",
			    unsupportedVideoSource: "Formatet på de aktuelle videokilder understøttes ikke af browseren.",
			    missingVideoSource: "Ingen kompatibel videokilde.",
			    progressLabelLongFormat: "$currentTime$ / $duration$",
			    progressLabelShortFormat: "$currentTime$",
			    enterFullscreen: "Gå til fuldskærm",
			    exitFullscreen: "Afslut fuldskærm",
			    skipTo: "SKIP TIL",
			    unsupportedBrowser: "Den aktuelle browser understøtter ikke HTML5-video. <br/>Prøv at opgradere til en af følgende versioner:",
			    currentBrowser: "Nuværende browser: {0}",
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
			    buffering: 'Buffering...',
			    adMessage: 'Annonce: Videoen genoptages om $varighed$ sekunder.',
			    adMessageLong: 'Annonce: Videoen genoptages om $varighed$.',
			    adMessageNoDuration: 'Annonce: Videoen genoptages efter reklamen.',
			    adNewWindowTip: 'Annonce: Klik for at åbne annonceindhold i et nyt vindue.',
			    nonDivException: 'Infragistics HTML5 Video Player kan kun instantieres på et DIV-tag.',
			    relatedVideos: 'LIGNENDE VIDEOER',
			    replayButton: 'Afspil igen',
			    replayTooltip: 'Klik for at afspille den sidste video.',
				noCommercials: 'Browser-kontroller understøtter ikke reklamer'
	}

	$.ig.VideoPlayer.locale = $.ig.VideoPlayer.locale || $.ig.locale.da.VideoPlayer;
	return $.ig.locale.da.VideoPlayer;
}));// REMOVE_FROM_COMBINED_FILES
