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
			    liveStream: "Видео на живо",
			    live: "На живо",
			    paused: "Паузирано",
			    playing: "В прогрес",
			    play: 'Пусни',
			    volume: "Сила на звука",
			    unsupportedVideoSource: "Подадените видео източници не съдържат формат поддържан от вашия браузър.",
			    missingVideoSource: "Липсват видео източници.",
			    progressLabelLongFormat: "$currentTime$ / $duration$",
			    progressLabelShortFormat: "$currentTime$",
			    enterFullscreen: "Цял екран",
			    exitFullscreen: "Излез от цял екран",
			    skipTo: "Отиди до",
			    unsupportedBrowser: "Вашият браузър не поддържа HTML5 видео. <br/>Моля обновете до някоя от следните версии:",
			    currentBrowser: "Вашият браузър: {0}",
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
			    buffering: 'Буфериране...',
			    adMessage: 'Реклама: Видеото ще продължи след $duration$ секунди.',
			    adMessageLong: 'Реклама: Видеото ще продължи след $duration$.',
			    adMessageNoDuration: 'Реклама: Видеото ще продължи след рекламите.',
			    adNewWindowTip: 'Реклама: Натиснете тук, за да отворите съдържанието в нов прозорец.',
			    nonDivException: 'Infragistics HTML5 Video Player може да бъде инстанциран само на DIV елемент.',
			    relatedVideos: 'Подобни видея',
			    replayButton: 'Започни отначало',
			    replayTooltip: 'Натиснете тук, за да пуснете видеото отначало.'
		    }
	    });

    }
}));// REMOVE_FROM_COMBINED_FILES
