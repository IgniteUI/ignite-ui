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
		factory(jQuery);
	}
}
(function ($) {
	$.ig = $.ig || {};
	$.ig.VideoPlayer = $.ig.VideoPlayer || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.ru = $.ig.locale.ru || {};

	$.ig.locale.ru.VideoPlayer = {
			    liveStream: "Прямой эфир",
			    live: "Вживую",
			    paused: "Пауза",
			    playing: "Воспроизведение",
			    play: 'Воспроизводить',
			    volume: "Уровень звука",
			    unsupportedVideoSource: "В исходных видеоклипах отсутствует клип в формате, поддерживаемом вашим браузером.",
			    missingVideoSource: "Исходный видеоклип неопределен.",
			    progressLabelLongFormat: "$currentTime$ / $duration$",
			    progressLabelShortFormat: "$currentTime$",
			    enterFullscreen: "На весь экран",
			    exitFullscreen: "Вернуться в браузер",
			    skipTo: "ПРОПУСТИТЬ ДО",
			    unsupportedBrowser: "Ваш браузер не поддерживает HTML5 video. <br/>Попробуйте воспользоваться следующими версиями браузеров:",
			    currentBrowser: "Ваш браузер: {0}",
			    ie9: "Microsoft Internet Explorer 9+",
			    chrome8: "Google Chrome 8+",
			    firefox36: "Mozilla Firefox 3.6+",
			    safari5: "Apple Safari 5+",
			    opera11: "Opera 11+",
			    ieDownload: "http://www.microsoft.com/windows/internet-explorer/default.aspx",
			    operaDownload: "http://www.opera.com/download/",
			    chromeDownload: "http://www.google.com/chrome",
			    firefoxDownload: "http://www.mozilla.com/",
			    safariDownload: "http://www.apple.com/safari/download/",
			    buffering: 'Буферизация...',
			    adMessage: 'Реклама: Видео возобновиться через $duration$ секунд.',
			    adMessageLong: 'Реклама: Видео возобновиться через $duration$.',
			    adMessageNoDuration: 'Реклама: Видео возобновиться после рекламы.',
			    adNewWindowTip: 'Реклама: Щелкните, чтобы открыть в новом окне браузера.',
			    nonDivException: 'Infragistics HTML5 Video Player может быть определен только через DIV элемент.',
			    relatedVideos: 'ПОХОЖИЕ КЛИПЫ',
			    replayButton: 'Еще раз',
			    replayTooltip: 'Щелкнить чтобы посмотреть еще раз.',
				noCommercials: 'Элементы управления браузером не поддерживают рекламу'
	}

	$.ig.VideoPlayer.locale = $.ig.VideoPlayer.locale || $.ig.locale.ru.VideoPlayer;
	return $.ig.locale.ru.VideoPlayer;
}));// REMOVE_FROM_COMBINED_FILES
