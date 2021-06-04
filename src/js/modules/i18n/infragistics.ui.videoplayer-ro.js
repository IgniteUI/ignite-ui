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
	$.ig.locale.ro = $.ig.locale.ro || {};

	$.ig.locale.ro.VideoPlayer = {
			    liveStream: "Videoclip live",
			    live: "Live",
			    paused: "Întrerupt",
			    playing: "Redare",
			    play: 'Redare',
			    volume: "Volum",
			    unsupportedVideoSource: "Sursele video actuale nu conțin un format acceptat de browserul dvs.",
			    missingVideoSource: "Nicio sursă video compatibilă.",
			    progressLabelLongFormat: "$currentTime$ / $duration$",
			    progressLabelShortFormat: "$currentTime$",
			    enterFullscreen: "Accesați ecran complet",
			    exitFullscreen: "Ieșiți pe ecran complet",
			    skipTo: "SARI LA",
			    unsupportedBrowser: "Browserul actual nu acceptă videoclipuri HTML5.<br/> Încercați să faceți upgrade la oricare dintre următoarele versiuni:",
			    currentBrowser: "Browser curent: {0}",
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
			    buffering: 'Se încarcă…',
			    adMessage: 'Anunț: videoclipul va fi reluat în $ durata $ secunde.',
			    adMessageLong: 'Anunț: videoclipul va fi reluat în $ durata $.',
			    adMessageNoDuration: 'Anunț: videoclipul va fi reluat după reclamă.',
			    adNewWindowTip: 'Anunț: faceți clic pentru a deschide conținutul anunțului într-o fereastră nouă.',
			    nonDivException: 'Infragistics HTML5 Video Player poate fi instanțiat numai pe o etichetă DIV.',
			    relatedVideos: 'VIDEOCLIPURI SIMILARE',
			    replayButton: 'Reluare',
			    replayTooltip: 'Faceți clic pentru a reda ultimul videoclip.',
				noCommercials: 'Controalele browserului nu acceptă reclame'
	}

	$.ig.VideoPlayer.locale = $.ig.VideoPlayer.locale || $.ig.locale.ro.VideoPlayer;
	return $.ig.locale.ro.VideoPlayer;
}));// REMOVE_FROM_COMBINED_FILES
