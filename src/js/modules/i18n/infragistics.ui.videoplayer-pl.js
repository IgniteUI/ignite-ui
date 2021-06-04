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
	$.ig.locale.pl = $.ig.locale.pl || {};

	$.ig.locale.pl.VideoPlayer = {
			    liveStream: "Wideo na żywo",
			    live: "Na żywo",
			    paused: "Wstrzymano",
			    playing: "Odtwarzanie",
			    play: 'Odtwórz',
			    volume: "Głośność",
			    unsupportedVideoSource: "Bieżące źródła wideo nie zawierają formatu obsługiwanego przez Twoją przeglądarkę.",
			    missingVideoSource: "Brak zgodnego źródła wideo.",
			    progressLabelLongFormat: "$currentTime$ / $duration$",
			    progressLabelShortFormat: "$currentTime$",
			    enterFullscreen: "Przełącz na pełny ekran",
			    exitFullscreen: "Zamknij tryb pełnoekranowy",
			    skipTo: "PRZEJDŹ DO",
			    unsupportedBrowser: "Obecna przeglądarka nie obsługuje wideo HTML5. <br/>Spróbuj uaktualnić do dowolnej z następujących wersji:",
			    currentBrowser: "Bieżąca przeglądarka: {0}",
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
			    buffering: 'Buforowanie...',
			    adMessage: 'Reklama: film zostanie wznowiony za $duration$ s.',
			    adMessageLong: 'Reklama: film zostanie wznowiony za $duration$.',
			    adMessageNoDuration: 'Reklama: film zostanie wznowiony po reklamie.',
			    adNewWindowTip: 'Reklama: kliknij, aby otworzyć treść reklamy w nowym oknie.',
			    nonDivException: 'Wystąpienie odtwarzacza wideo Infragistics HTML5 można utworzyć wyłącznie w elemencie DIV.',
			    relatedVideos: 'POWIĄZANE FILMY',
			    replayButton: 'Powtórz',
			    replayTooltip: 'Kliknij, aby odtworzyć ostatni film.',
				noCommercials: 'Elementy sterowania dostępne w przeglądarce nie obsługują reklam'
	}

	$.ig.VideoPlayer.locale = $.ig.VideoPlayer.locale || $.ig.locale.pl.VideoPlayer;
	return $.ig.locale.pl.VideoPlayer;
}));// REMOVE_FROM_COMBINED_FILES
