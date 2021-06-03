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
	$.ig.locale.nl = $.ig.locale.nl || {};

	$.ig.locale.nl.VideoPlayer = {
			    liveStream: "Live video",
			    live: "Live",
			    paused: "Gepauzeerd",
			    playing: "Spelen",
			    play: 'Spelen',
			    volume: "Volume",
			    unsupportedVideoSource: "De huidige videobronnen bevatten geen indeling die door uw browser wordt ondersteund.",
			    missingVideoSource: "Geen compatibele videobron.",
			    progressLabelLongFormat: "$currentTime$ / $duration$",
			    progressLabelShortFormat: "$currentTime$",
			    enterFullscreen: "Volledig scherm",
			    exitFullscreen: "Volledig scherm afsluiten",
			    skipTo: "GA NAAR",
			    unsupportedBrowser: "De huidige browser ondersteunt geen HTML5-video. <br/>Probeer te upgraden naar een van de volgende versies:",
			    currentBrowser: "Huidige browser: {0}",
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
			    buffering: 'Bufferen ...',
			    adMessage: 'Advertentie: video wordt over $ duration $ seconden hervat.',
			    adMessageLong: 'Advertentie: video wordt hervat in $ duration $.',
			    adMessageNoDuration: 'Advertentie: video wordt hervat na de reclame.',
			    adNewWindowTip: 'Advertentie: klik om advertentie-inhoud in een nieuw venster te openen.',
			    nonDivException: 'De Infragistics HTML5-videospeler kan alleen worden geïnstantieerd op een DIV-tag.',
			    relatedVideos: 'VERWANTE VIDEO'S',
			    replayButton: 'Opnieuw afspelen',
			    replayTooltip: 'Klik om de laatste video af te spelen.',
				noCommercials: 'Browserbediening ondersteunt geen reclame'
	}

	$.ig.VideoPlayer.locale = $.ig.VideoPlayer.locale || $.ig.locale.nl.VideoPlayer;
	return $.ig.locale.nl.VideoPlayer;
}));// REMOVE_FROM_COMBINED_FILES
