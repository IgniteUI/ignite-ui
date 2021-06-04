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
	$.ig.locale.pt = $.ig.locale.pt || {};

	$.ig.locale.pt.VideoPlayer = {
			    liveStream: "Vídeo ao vivo",
			    live: "Ao vivo",
			    paused: "Pausado",
			    playing: "A reproduzir",
			    play: 'Reproduzir',
			    volume: "Volume",
			    unsupportedVideoSource: "As fontes de vídeo atuais não contêm um formato suportado pelo seu navegador.",
			    missingVideoSource: "Nenhuma fonte de vídeo compatível.",
			    progressLabelLongFormat: "$currentTime$ / $duration$",
			    progressLabelShortFormat: "$currentTime$",
			    enterFullscreen: "Ir para ecrã inteiro",
			    exitFullscreen: "Sair do ecrã inteiro",
			    skipTo: "SALTAR PARA",
			    unsupportedBrowser: "O navegador atual não suporta vídeo HTML5. <br/>Tente atualizar para qualquer uma das seguintes versões:",
			    currentBrowser: "Navegador atual: {0}",
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
			    buffering: 'A colocar em memória intermédia...',
			    adMessage: 'Anúncio: o vídeo será retomado em $duration$ segundos.',
			    adMessageLong: 'Anúncio: o vídeo será retomado em $duration$.',
			    adMessageNoDuration: 'Anúncio: o vídeo será retomado após o anúncio.',
			    adNewWindowTip: 'Anúncio: clique para abrir o conteúdo do anúncio numa nova janela.',
			    nonDivException: 'O Infragistics HTML5 Video Player só pode ser instanciado numa etiqueta DIV.',
			    relatedVideos: 'VÍDEOS RELACIONADOS',
			    replayButton: 'Repetir',
			    replayTooltip: 'Clique para reproduzir o último vídeo.',
				noCommercials: 'Os controlos do navegador não suportam publicidade'
	}

	$.ig.VideoPlayer.locale = $.ig.VideoPlayer.locale || $.ig.locale.pt.VideoPlayer;
	return $.ig.locale.pt.VideoPlayer;
}));// REMOVE_FROM_COMBINED_FILES
