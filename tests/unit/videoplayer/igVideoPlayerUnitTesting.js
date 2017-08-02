if (typeof (jQuery) === "undefined") {
    throw new Error("The Infragistics HTML5 Video Player requires jQuery to be loaded");
}

(function ($) {
    $.widget("ui.igVideoPlayerUnitTesting", $.ui.igVideoPlayer, {
		_createVideoElement: function (id) {
			var video = document.createElement('video');
			video.id = id;
			return $(video);
		}
	});
	//should extend the locale values of the video player, they are using the name of the widget now
	$.ig.locale.en.VideoPlayerUnitTesting = $.extend({}, $.ig.locale.en.VideoPlayer);
    $.extend($.ui.igVideoPlayerUnitTesting, {version: "1.0.0"});
}(jQuery));