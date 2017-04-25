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
			    liveStream: "Vidéo en direct",
			    live: "En direct",
			    paused: "Pause",
			    playing: "Lecture en cours",
			    play: 'Lecture',
			    volume: "Volume",
			    unsupportedVideoSource: "Les sources de la vidéo actuelles ne contiennent pas un format pris en charge par votre navigateur.",
			    missingVideoSource: "Source vidéo incompatible.",
			    progressLabelLongFormat: "$currentTime$ / $duration$",
			    progressLabelShortFormat: "$currentTime$",
			    enterFullscreen: "Plein écran",
			    exitFullscreen: "Quitter plein écran",
			    skipTo: "PASSER A",
			    unsupportedBrowser: "Le navigateur actuel ne prend pas en charge les vidéos HTML5. <br/>Essayez la mise à niveau vers l'une des versions suivantes :",
			    currentBrowser: "Navigateur actuel : {0}",
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
			    buffering: 'Mise en mémoire tampon...',
			    adMessage: 'Publicité : La vidéo reprendra dans $duration$ secondes.',
			    adMessageLong: 'Publicité : La vidéo reprendra dans $duration$.',
			    adMessageNoDuration: 'Publicité : La vidéo reprendra après la publicité.',
			    adNewWindowTip: 'Publicité : Cliquez pour ouvrir le contenu de la publicité dans une nouvelle fenêtre.',
			    nonDivException: 'Le lecteur vidéo Infragistics HTML5 peut uniquement être instancié sur une balise DIV.',
			    relatedVideos: 'VIDÉOS RELIÉES',
			    replayButton: 'Rejouer',
			    replayTooltip: 'Cliquer pour rejouer la dernière vidéo.'
		    }
	    });

    }
}));// REMOVE_FROM_COMBINED_FILES
