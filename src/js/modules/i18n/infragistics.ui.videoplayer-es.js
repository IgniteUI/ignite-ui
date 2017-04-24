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
			    liveStream: "Vídeo en directo",
			    live: "Directo",
			    paused: "Pausado",
			    playing: "Reproduciendo",
			    play: 'Reproducir',
			    volume: "Volumen",
			    unsupportedVideoSource: "Los orígenes de vídeo actuales no contienen un formato compatible con su explorador.",
			    missingVideoSource: "No hay orígenes de vídeo compatibles.",
			    progressLabelLongFormat: "$currentTime$ / $duration$",
			    progressLabelShortFormat: "$currentTime$",
			    enterFullscreen: "Mostrar en pantalla completa",
			    exitFullscreen: "Salir de pantalla completa",
			    skipTo: "SALTAR A",
			    unsupportedBrowser: "El explorador actual no admite vídeo HTML5. <br/>Intente actualizar a una de las siguientes versiones:",
			    currentBrowser: "Explorador actual: {0}",
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
			    buffering: 'Almacenando en búfer...',
			    adMessage: 'Anuncio: El vídeo se reanudará en $duration$ segundos.',
			    adMessageLong: 'Anuncio: El vídeo se reanudará en $duration$.',
			    adMessageNoDuration: 'Anuncio: El vídeo se reanudará después de la publicidad.',
			    adNewWindowTip: 'Anuncio: Haga clic para abrir el contenido del anuncio en una ventana nueva.',
			    nonDivException: 'El Reproductor de vídeo Infragistics HTML5 solo puede instanciarse en una etiqueta DIV.',
			    relatedVideos: 'VÍDEOS RELACIONADOS',
			    replayButton: 'Volver a reproducir',
			    replayTooltip: 'Haga clic para volver a reproducir el último vídeo.'
		    }
	    });

    }
}));// REMOVE_FROM_COMBINED_FILES
