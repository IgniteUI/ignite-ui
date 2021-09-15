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
	$.ig.locale.nb = $.ig.locale.nb || {};

	$.ig.locale.nb.VideoPlayer = {
			    liveStream: "Live video",
			    live: "Bo",
			    paused: "Pauset",
			    playing: "Spiller",
			    play: 'Spille',
			    volume: "Volum",
			    unsupportedVideoSource: "De nåværende videokildene inneholder ikke et format som støttes av nettleseren din.",
			    missingVideoSource: "Ingen kompatibel videokilde.",
			    progressLabelLongFormat: "$currentTime$ / $duration$",
			    progressLabelShortFormat: "$currentTime$",
			    enterFullscreen: "Gå i fullskjerm",
			    exitFullscreen: "Avslutt fullskjerm",
			    skipTo: "HOPP TIL",
			    unsupportedBrowser: "Den nåværende nettleseren støtter ikke HTML5-video. <br/>Prøv å oppgradere til en av følgende versjoner:",
			    currentBrowser: "Nåværende nettleser: {0}",
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
			    buffering: 'Bufrer...',
			    adMessage: 'Annonse: Videoen gjenopptas om $duration$ sekunder.',
			    adMessageLong: 'Annonse: Videoen gjenopptas om $duration$.',
			    adMessageNoDuration: 'Annonse: Videoen gjenopptas etter reklamen.',
			    adNewWindowTip: 'Annonse: Klikk for å åpne annonseinnhold i et nytt vindu.',
			    nonDivException: 'Infragistics HTML5 Video Player kan bare instantieres på en DIV-tag.',
			    relatedVideos: 'RELATERTE VIDEOER',
			    replayButton: 'Spill på nytt',
			    replayTooltip: 'Klikk for å spille av siste video.',
				noCommercials: 'Nettleserkontroller støtter ikke reklame'
	}

	$.ig.VideoPlayer.locale = $.ig.VideoPlayer.locale || $.ig.locale.nb.VideoPlayer;
	return $.ig.locale.nb.VideoPlayer;
}));// REMOVE_FROM_COMBINED_FILES
