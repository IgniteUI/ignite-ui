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
	$.ig.locale.hu = $.ig.locale.hu || {};

	$.ig.locale.hu.VideoPlayer = {
			    liveStream: "Élő videó",
			    live: "Élő",
			    paused: "Szüneteltetve",
			    playing: "Lejátszás",
			    play: 'Lejátszás',
			    volume: "Hangerő",
			    unsupportedVideoSource: "Az aktuális videóforrás nem érhető el olyan formátumban, amelyet a böngésző támogat.",
			    missingVideoSource: "Nincs kompatibilis videóforrás.",
			    progressLabelLongFormat: "$currentTime$ / $duration$",
			    progressLabelShortFormat: "$currentTime$",
			    enterFullscreen: "Váltás teljes képernyőre",
			    exitFullscreen: "Kilépés a teljes képernyőből",
			    skipTo: "UGRÁS",
			    unsupportedBrowser: "A jelenleg használt böngésző nem támogatja a HTML5 formátumú videókat. <br/>Próbáljon meg frissíteni a következő verziók egyikére:",
			    currentBrowser: "Jelenlegi böngésző: {0}",
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
			    buffering: 'Pufferelés...',
			    adMessage: 'Hirdetés: A videó $duration$ másodperc múlva folytatódik.',
			    adMessageLong: 'Hirdetés: A videó $duration$ múlva folytatódik.',
			    adMessageNoDuration: 'Hirdetés: A videó a reklám után folytatódik.',
			    adNewWindowTip: 'Hirdetés: Kattintson ide a hirdetési tartalom új ablakban történő megnyitásához.',
			    nonDivException: 'Az Infragistics HTML5 Video Player lejátszó csak DIV címkén példányosítható.',
			    relatedVideos: 'KAPCSOLÓDÓ VIDEÓK',
			    replayButton: 'Lejátszás újra',
			    replayTooltip: 'Kattintson ide az utoljára megtekintett videó újbóli lejátszásához.',
				noCommercials: 'A böngészővezérlők nem támogatják a reklámokat'
	}

	$.ig.VideoPlayer.locale = $.ig.VideoPlayer.locale || $.ig.locale.hu.VideoPlayer;
	return $.ig.locale.hu.VideoPlayer;
}));// REMOVE_FROM_COMBINED_FILES
