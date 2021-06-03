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
	$.ig.locale.sv = $.ig.locale.sv || {};

	$.ig.locale.sv.VideoPlayer = {
			    liveStream: "Live video",
			    live: "Live",
			    paused: "Pausad",
			    playing: "Spelar",
			    play: 'Spela',
			    volume: "Volym",
			    unsupportedVideoSource: "De aktuella videokällorna innehåller inte ett format som stöds av din webbläsare.",
			    missingVideoSource: "Ingen kompatibel videokälla.",
			    progressLabelLongFormat: "$currentTime$ / $duration$",
			    progressLabelShortFormat: "$currentTime$",
			    enterFullscreen: "Gå till helskärm",
			    exitFullscreen: "Avsluta helskärm",
			    skipTo: "HOPPA ÖVER TILL",
			    unsupportedBrowser: "Den aktuella webbläsaren stöder inte HTML5-video. <br/>Försök att uppgradera till någon av följande versioner:",
			    currentBrowser: "Aktuell webbläsare: {0}",
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
			    buffering: 'Buffring ...',
			    adMessage: 'Annons: Video återupptas om $duration$ sekunder.',
			    adMessageLong: 'Annons: Video återupptas om $duration$.',
			    adMessageNoDuration: 'Annons: Video återupptas efter reklam.',
			    adNewWindowTip: 'Annons: Klicka för att öppna annonsinnehåll i ett nytt fönster.',
			    nonDivException: 'Infragistics HTML5-videospelaren kan endast initieras på en DIV-tagg.',
			    relatedVideos: 'RELATERADE VIDEOKLIPP',
			    replayButton: 'Spela om',
			    replayTooltip: 'Klicka för att spela upp den senaste videon.',
				noCommercials: 'Webbläsarkontroller stöder inte reklam'
	}

	$.ig.VideoPlayer.locale = $.ig.VideoPlayer.locale || $.ig.locale.sv.VideoPlayer;
	return $.ig.locale.sv.VideoPlayer;
}));// REMOVE_FROM_COMBINED_FILES
