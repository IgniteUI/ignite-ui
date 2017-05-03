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
			    liveStream: "Live video",
			    live: "Live",
			    paused: "Paused",
			    playing: "Playing",
			    play: 'Play',
			    volume: "Volume",
			    unsupportedVideoSource: "The current video sources does not contain a format that is supported by your browser.",
			    missingVideoSource: "No compatible video source.",
			    progressLabelLongFormat: "$currentTime$ / $duration$",
			    progressLabelShortFormat: "$currentTime$",
			    enterFullscreen: "Go Fullscreen",
			    exitFullscreen: "Exit Fullscreen",
			    skipTo: "SKIP TO",
			    unsupportedBrowser: "The current browser does not support HTML5 video. <br/>Try upgrading to any of the following versions:",
			    currentBrowser: "Current browser: {0}",
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
			    buffering: 'Buffering...',
			    adMessage: 'Ad: Video will resume in $duration$ seconds.',
			    adMessageLong: 'Ad: Video will resume in $duration$.',
			    adMessageNoDuration: 'Ad: Video will resume after the commercial.',
			    adNewWindowTip: 'Ad: Click to open ad content in a new window.',
			    nonDivException: 'The Infragistics HTML5 Video Player can be instantiated only on a DIV tag.',
			    relatedVideos: 'RELATED VIDEOS',
			    replayButton: 'Replay',
			    replayTooltip: 'Click to replay last video.'
		    }
	    });

    }
}));// REMOVE_FROM_COMBINED_FILES
