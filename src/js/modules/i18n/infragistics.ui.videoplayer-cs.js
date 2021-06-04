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
	$.ig.locale.cs = $.ig.locale.cs || {};

	$.ig.locale.cs.VideoPlayer = {
			    liveStream: "Živé video",
			    live: "Žít",
			    paused: "Pozastaveno",
			    playing: "Hraní",
			    play: 'Hrát si',
			    volume: "Objem",
			    unsupportedVideoSource: "Aktuální zdroje videa neobsahují formát podporovaný vaším prohlížečem.",
			    missingVideoSource: "Žádný kompatibilní zdroj videa.",
			    progressLabelLongFormat: "$currentTime$ / $duration$",
			    progressLabelShortFormat: "$currentTime$",
			    enterFullscreen: "Přejít na celou obrazovku",
			    exitFullscreen: "Ukončit celou obrazovku",
			    skipTo: "PŘESKOČIT DO",
			    unsupportedBrowser: "Aktuální prohlížeč nepodporuje video ve formátu HTML5. <br/>Zkuste upgradovat na některou z následujících verzí:",
			    currentBrowser: "Aktuální prohlížeč: {0}",
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
			    buffering: 'Ukládání do vyrovnávací paměti ...',
			    adMessage: 'Reklama: Video bude pokračovat za $ trvání $ s.',
			    adMessageLong: 'Reklama: Video bude pokračovat v $ trvání $.',
			    adMessageNoDuration: 'Reklama: Video se obnoví po reklamě.',
			    adNewWindowTip: 'Reklama: Kliknutím otevřete obsah reklamy v novém okně.',
			    nonDivException: 'Instalaci videopřehrávače Infragistics HTML5 lze provést pouze na značce DIV.',
			    relatedVideos: 'SOUVISEJÍCÍ VIDEA',
			    replayButton: 'Přehrát',
			    replayTooltip: 'Kliknutím přehrajete poslední video.',
				noCommercials: 'Ovládací prvky prohlížeče nepodporují reklamy'
	}

	$.ig.VideoPlayer.locale = $.ig.VideoPlayer.locale || $.ig.locale.cs.VideoPlayer;
	return $.ig.locale.cs.VideoPlayer;
}));// REMOVE_FROM_COMBINED_FILES
