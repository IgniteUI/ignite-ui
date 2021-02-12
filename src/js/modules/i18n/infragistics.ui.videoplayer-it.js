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
	$.ig.locale.it = $.ig.locale.it || {};

	$.ig.locale.it.VideoPlayer = {
			    liveStream: "Video live",
			    live: "Live",
			    paused: "In pausa",
			    playing: "In riproduzione",
			    play: 'Riproduci',
			    volume: "Volume",
			    unsupportedVideoSource: "Le origini video correnti non contengono un formato supportato dal browser.",
			    missingVideoSource: "Nessuna sorgente video compatibile.",
			    progressLabelLongFormat: "$currentTime$ / $duration$",
			    progressLabelShortFormat: "$currentTime$",
			    enterFullscreen: "Passa a schermo intero",
			    exitFullscreen: "Esci da schermo intero",
			    skipTo: "SALTA A",
			    unsupportedBrowser: "Il browser corrente non supporta i video HTML5. <br/>Prova a eseguire l'upgrade a una delle seguenti versioni:",
			    currentBrowser: "Browser corrente: {0}",
			    ie9: "Microsoft Internet Explorer V 9+",
			    chrome8: "Google Chrome V 8+",
			    firefox36: "Mozilla Firefox V 3.6+",
			    safari5: "Apple Safari V 5+",
			    opera11: "Opera V 11+",
			    ieDownload: "http://www.microsoft.com/windows/internet-explorer/default.aspx",
			    operaDownload: "https://www.opera.com/it/download",
			    chromeDownload: "https://www.google.com/intl/it/chrome/",
			    firefoxDownload: "https://www.mozilla.org/it/firefox/",
			    safariDownload: "https://www.apple.com/it/safari/",
			    buffering: 'Buffering...',
			    adMessage: 'Annuncio: il video riprenderà tra $duration$ secondi.',
			    adMessageLong: 'Annuncio: il video riprenderà tra $duration$.',
			    adMessageNoDuration: 'Annuncio: il video riprenderà dopo la pubblicità.',
			    adNewWindowTip: 'Annuncio: fare clic per aprire il contenuto dell\'annuncio in una nuova finestra.',
			    nonDivException: 'Infragistics HTML5 Video Player può essere istanziato solo su un tag DIV.',
			    relatedVideos: 'VIDEO CORRELATI',
			    replayButton: 'Riproduci',
			    replayTooltip: 'Fare clic per riprodurre l\'ultimo video.',
				noCommercials: 'I controlli del browser non supportano gli annunci pubblicitari'
	}

	$.ig.VideoPlayer.locale = $.ig.VideoPlayer.locale || $.ig.locale.it.VideoPlayer;
	return $.ig.locale.it.VideoPlayer;
}));// REMOVE_FROM_COMBINED_FILES
