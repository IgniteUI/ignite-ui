(function ($) {
    $.widget("ui.igVideoPlayerUnitTesting", $.ui.igVideoPlayer, {
		_createVideoElement: function (id) {
			var video = $.createMockVideo(document.mockOptions);
			video.id = id;
			return $(video);
		}
	});
	//should extend the locale values of the video player, they are using the name of the widget now
	$.ig.locale.en.VideoPlayerUnitTesting = $.extend({}, $.ig.locale.en.VideoPlayer);
    $.extend($.ui.igVideoPlayerUnitTesting, {version: "1.0.0"});
}(jQuery));

function createFixtureDiv(divId){
	$.ig.TestUtil.appendToFixture('<div id=' + divId + '/>');
}

function createBasicPlayer(divId){	

	createFixtureDiv(divId)

	$('#' + divId).igVideoPlayerUnitTesting({
			sources: ["http://medias.jilion.com/sublimevideo/dartmoor.mov",
					  "http://medias.jilion.com/sublimevideo/dartmoor.mp4",
					  "http://medias.jilion.com/sublimevideo/dartmoor.webm",
					  "http://medias.jilion.com/sublimevideo/dartmoor.ogv"
			],
			width: 800,
			height: 340,
			posterUrl: 'http://sublimevideo.net/demo/dartmoor.jpg?1290104465',
			fullscreen: false,
			browserControls:false,
			autoplay: false,
			muted: false,
			autohide: false
	});
}

function createAutoplayPlayer(divId){	
	
	createFixtureDiv(divId)

	$('#' + divId).igVideoPlayerUnitTesting({
			sources: ["http://medias.jilion.com/sublimevideo/dartmoor.mov",
					  "http://medias.jilion.com/sublimevideo/dartmoor.mp4",
					  "http://medias.jilion.com/sublimevideo/dartmoor.webm",
					  "http://medias.jilion.com/sublimevideo/dartmoor.ogv"
			],
			width: 800,
			height: 340,
			posterUrl: 'http://sublimevideo.net/demo/dartmoor.jpg?1290104465',
			fullscreen: false,
			browserControls:false,
			autoplay: true,
			muted: true,
			autohide: false
	});
}

function createBookmarksPlayer(divId){	
	
	createFixtureDiv(divId)

	$('#' + divId).igVideoPlayerUnitTesting({
			sources: ["http://medias.jilion.com/sublimevideo/dartmoor.mov",
					  "http://medias.jilion.com/sublimevideo/dartmoor.mp4",
					  "http://medias.jilion.com/sublimevideo/dartmoor.webm",
					  "http://medias.jilion.com/sublimevideo/dartmoor.ogv"
			],
			width: 800,
			height: 340,
			posterUrl: 'http://sublimevideo.net/demo/dartmoor.jpg?1290104465',
			fullscreen: false,
			browserControls:false,
			autoplay: false,
			muted: true,
			autohide: false,
			allowbookmarks: true,
			bookmarks: [
				{
					title: 'mark1',
					description: 'Here we see a nice green field.',
					time: 120
				},
				{
					title: 'mark2',
					description: 'Here we see a nice green field.',
					time: 20,
					disabled: true
				},
				{
					title: 'mark3',
					description: 'Here we see a nice green field.',
					time: 60
				}
			]
		});
}

QUnit.module("igVideoPlayer", {
	before: function () {setTimeout( 3000); },
	after: function () {},
	beforeEach: function () {},
	afterEach: function () {},		
	checkClass: function (button, classs) {
		this.assert.ok(button.hasClass(classs), 'The button with id: ' + button[0].id + ' does not contain the class: ' + classs)
	},
	checkButton: function (button) {
		this.checkClass(button, 'ui-widget');
		this.checkClass(button, 'ui-state-default');
		this.checkClass(button, 'ui-corner-all');
		this.checkClass(button, 'ui-igbutton');
		this.assert.ok(button.attr('role') === 'button', 'The button with id: ' + button[0].id + ' does not contain the attr role: button');
		this.assert.ok(button.attr('href') === '#', 'The button with id: ' + button[0].id + ' does not contain the attr href: #');
	}
});

QUnit.test('title controls rendering', function (assert) {
	assert.expect(15);
	this.assert = assert;
	createBasicPlayer('player1');
	var done = assert.async();

	var controls = $('#player1_title_ctrls');
	assert.ok(controls.length > 0, "Title controls are not rendered!");
	this.checkClass(controls, 'ui-igplayer-controls');
	this.checkClass(controls, 'ui-igplayer-grid');
	this.checkClass(controls, 'ui-igplayer-title-controls');
	var playButton = $('#player1_title_ctrls_play'),
		spanPlay = playButton.children().first(),
		spanTime = playButton.children().first().next();
	this.checkClass(playButton, 'ui-igplayer-playbutton');
	this.checkClass(playButton, 'ui-igplayer-playback-with-time');
	this.checkClass(playButton, 'ui-state-default');
	this.checkClass(playButton, 'ui-corner-all');
	this.checkClass(playButton, 'ui-priority-primary');

	this.checkClass(spanPlay, 'ui-icon');
	this.checkClass(spanPlay, 'ui-icon-play');
	this.checkClass(spanPlay, 'ui-igplayer-playbutton-icon');
	assert.equal(spanPlay.attr('title'), $.ig.VideoPlayer.locale.play, "Should have title!");

	this.checkClass(spanTime, 'ui-igplayer-playbutton-text');
	
	setTimeout(function() {
		assert.equal(spanTime.attr('title'), '4:20', "Should have title!");
		done();		
	  }, 300);
});

QUnit.test('igVideoPlayer title controls play', function(assert) {
	assert.expect(3);
	createBasicPlayer('player1');
	var playButton = $('#player1_title_ctrls_play'),
		video = $('#player1_video'),
		click = jQuery.Event("click");
	click.button = 0;
	playButton.trigger(click); // should play.
	assert.ok(!video[0].paused, 'Video should be playing.');
	assert.ok($('#player1_title_ctrls').length === 0, 'Title controls shoud be destroyed.');
	video.trigger(click); // should pause.
	assert.ok(video[0].paused, 'Video should be paused.');	
});

QUnit.test('igVideoPlayer options: volume test', function(assert) {
	assert.expect(2);
	createBasicPlayer('player1');
	var volume = $("#player1").igVideoPlayerUnitTesting('option', 'volume');
	var videoVolume = $("#player1_video")[0].volume;
	assert.equal(volume, videoVolume, "Volume should be equal to video elem volume.");
	$("#player1").igVideoPlayerUnitTesting('option', 'volume', 0.2);
	var volume2 = $("#player1").igVideoPlayerUnitTesting('option', 'volume');
	var videoVolume2 = $("#player1_video")[0].volume;
	assert.equal(volume2, videoVolume2.toFixed(1), "Volume should be equal to video elem volume.");
	$("#player1").igVideoPlayerUnitTesting('option', 'volume', volume);					
});
QUnit.test('igVideoPlayer options test 2: autoplay test', function(assert) {
	assert.expect(0);
});
QUnit.test('igVideoPlayer browser controls test 3: play to position and verifies the slider position, current time, progress label value and format', function(assert) {
	assert.expect(2);
	createBasicPlayer('player1');
	$("#player1").data('igVideoPlayerUnitTesting').togglePlay();
	$("#player1").data('igVideoPlayerUnitTesting').togglePlay();
	var videoElem = $('#player1_video')[0];
	videoElem.playTo(100);
	//check progress label should be
	assert.equal($('#player1_ctrls_pl').html(), '1:40 / 4:20', "Progress label has incorrect value"); // 100 sec of total 260 sec.
	// check slider handle moved to right spot:
	var left = $("#player1_ctrls_s").children().first()[0].style.left;
	assert.equal(left, ((videoElem.currentTime / videoElem.duration).toFixed(2) * 100) + '%');				
});
QUnit.test('igVideoPlayer options: muted test', function(assert) {
	assert.expect(2);
	createBasicPlayer('player1');
	var muted = $("#player1").igVideoPlayerUnitTesting('option', 'muted');
	var videoMuted = $("#player1_video")[0].muted;
	assert.equal(muted, videoMuted, "Muted should be equal to video elem muted.");
	$("#player1").igVideoPlayerUnitTesting('option', 'muted', !muted);
	var muted2 = $("#player1").igVideoPlayerUnitTesting('option', 'muted');
	var videoMuted2 = $("#player1_video")[0].muted;
	assert.equal(muted2, videoMuted2, "Muted should be equal to video elem muted.");
	$("#player1").igVideoPlayerUnitTesting('option', 'muted', muted);				
});
QUnit.test('igVideoPlayer buffering check when video is loading that buffer progress is updated.', function(assert) {
	assert.expect(1);
	createBasicPlayer('player1');
	var videoElem = $('#player1_video')[0];
	videoElem.bufferTo(videoElem.duration / 2);
	assert.equal($('#player1_ctrls_pb_progress')[0].style.width, '50%', "Half of movie should be buffered.");							
});
QUnit.test('igVideoPlayer API: play() test', function(assert) {
	assert.expect(3);
	createBasicPlayer('player1');
	var pass = false;
	$('#player1_video').one('timeupdate', function() {
		pass = true;
	});
	$("#player1").igVideoPlayerUnitTesting("play");
	assert.ok(!$('#player1_video')[0].paused, 'Paused should be false.');
	$("#player1").igVideoPlayerUnitTesting("pause");
	assert.ok($('#player1_video')[0].paused, 'Paused should be true.');
	assert.ok(pass);
});
QUnit.test('igVideoPlayer API: pause() test', function(assert) {
	assert.expect(2);
	createBasicPlayer('player1');
	var videoElem = $('#player1_video')[0];
	$("#player1").igVideoPlayerUnitTesting("play");
	assert.ok(!videoElem.paused, 'Paused should be false.');
	$("#player1").igVideoPlayerUnitTesting("pause");
	assert.ok(videoElem.paused, 'Paused should be true.');			
});
QUnit.test('igVideoPlayer controls rendering test 8', function(assert) {
	assert.expect(50);
	this.assert = assert;
	createBasicPlayer('player1');

	assert.ok(!$("#player1").igVideoPlayerUnitTesting('option', 'browserControls'), "Player controls are turned off.");
	assert.ok($('#player1_ctrls').length > 0, "Controls are not rendered!");
	assert.ok($('#player1_ctrls_play').length > 0, "Play button control is not rendered!");
	assert.ok($('#player1_ctrls_s').length > 0, "Progress slider control is not rendered!");
	assert.ok($('#player1_ctrls_pb').length > 0, "Progress bar control is not rendered!");
	assert.ok($('#player1_ctrls_pl').length > 0, "Progress label control is not rendered!");
	assert.ok($('#player1_ctrls_vc_btn').length > 0, "Volume controls button control is not rendered!");
	assert.ok($('#player1_ctrls_vs').length > 0, "Volume slider control is not rendered!");
	assert.ok($('#player1_ctrls_fs_btn').length > 0, "Fullscreen button control is not rendered!");

	var controls = $('#player1_ctrls');
	this.checkClass(controls, 'ui-igplayer-controls');
	this.checkClass(controls, 'ui-igplayer-grid');

	// checks for play button:
	var playButton = $('#player1_ctrls_play');
	this.checkButton(playButton);
	this.checkClass(playButton, 'ui-igplayer-playbutton');

	// checks for volume control button:
	var volumeControlButton = $('#player1_ctrls_vc_btn');
	this.checkButton(volumeControlButton);
	this.checkClass(volumeControlButton, 'ui-igplayer-volumecontrol');

	// checks for full screen button:
	var fullScreenButton = $('#player1_ctrls_fs_btn');
	this.checkButton(fullScreenButton);
	this.checkClass(fullScreenButton, 'ui-igplayer-fullscreen-button');

	this.checkClass($('#player1_ctrls_pl'), 'ui-igplayer-progresslabel');
	// check volume slider classes: ui-igplayer-volumeslider ui-igslider-vertical ui-igslider ui-widget ui-widget-content ui-corner-all
	var volumeSlider = $('#player1_ctrls_vs');
	this.checkClass(volumeSlider, 'ui-igplayer-volumeslider');
	this.checkClass(volumeSlider, 'ui-igslider-vertical');
	this.checkClass(volumeSlider, 'ui-igslider');
	this.checkClass(volumeSlider, 'ui-widget');
	this.checkClass(volumeSlider, 'ui-widget-content');
	this.checkClass(volumeSlider, 'ui-corner-all');

	// check progress slider classes: ui-igplayer-progressbar ui-corner-all ui-igslider-horizontal ui-igslider ui-widget ui-widget-content
	var progressSlider = $('#player1_ctrls_s');
	this.checkClass(progressSlider, 'ui-igplayer-progressbar');
	this.checkClass(progressSlider, 'ui-igslider-horizontal');
	this.checkClass(progressSlider, 'ui-igslider');
	this.checkClass(progressSlider, 'ui-widget');
	this.checkClass(progressSlider, 'ui-widget-content');
	this.checkClass(progressSlider, 'ui-corner-all');

	// check progress bar classes: ui-igplayer-progressbuffer ui-igprogressbar-horizontal ui-igprogressbar ui-widget ui-widget-content ui-corner-all
	var progressBar = $('#player1_ctrls_pb');
	//checkClass(progressBar, 'ui-igplayer-progressbuffer'); no such class yet
	this.checkClass(progressBar, 'ui-igprogressbar-horizontal');
	this.checkClass(progressBar, 'ui-igprogressbar');
	this.checkClass(progressBar, 'ui-widget');
	this.checkClass(progressBar, 'ui-widget-content');
	this.checkClass(progressBar, 'ui-corner-all');					
});

QUnit.test('igVideoPlayer missing sources', function(assert) {
	assert.expect(0);

});

QUnit.test('igVideoPlayer play/pause button', function(assert) {
	assert.expect(5);
	this.assert = assert;
	createBasicPlayer('player1');
	var playButton = $('#player1_ctrls_play');
	var playIcon = playButton.children().first();
	this.checkClass(playIcon, 'ui-icon');
	this.checkClass(playIcon, 'ui-igplayer-playbutton-icon');
	this.checkClass(playIcon, 'ui-icon-play');
	$("#player1").igVideoPlayerUnitTesting("play");
	this.checkClass(playIcon, 'ui-icon-pause');
	$("#player1").igVideoPlayerUnitTesting("pause");
	this.checkClass(playIcon, 'ui-icon-play');
});

QUnit.test('igVideoPlayer volume control mute on click', function(assert) {
	assert.expect(5);
	this.assert = assert;
	createBasicPlayer('player1');
	var volumeControlButton = $('#player1_ctrls_vc_btn');
	var volumeIcon = volumeControlButton.children().first();
	this.checkClass(volumeIcon, 'ui-icon');
	this.checkClass(volumeIcon, 'ui-igbutton-icon');
	this.checkClass(volumeIcon, $("#player1").igVideoPlayerUnitTesting("option", 'muted') ? 'ui-icon-volume-off' : 'ui-icon-volume-on');
	volumeControlButton.click();
	this.checkClass(volumeIcon, 'ui-icon');
	this.checkClass(volumeIcon, $("#player1").igVideoPlayerUnitTesting("option", 'muted') ? 'ui-icon-volume-off' : 'ui-icon-volume-on');
});

QUnit.test('igVideoPlayer volume control slider show on hover', function(assert){
	assert.expect(1);
	createBasicPlayer('player1');
	var volumeControlButton = $('#player1_controls_volumeControl'),
	volumeSlider = $('#player1_controls_volumeSlider');
	volumeControlButton.trigger('mouseover');
	assert.ok(volumeSlider.css('display') !== 'none', 'Volume slider should be visible');
	volumeControlButton.trigger('mouseout');
});

QUnit.test('igVideoPlayer seeking test - move slider and check currentTime', function(assert){
	assert.expect(0);	
	createBasicPlayer('player1');
	// TODO!
	var handle = $('.ui-igslider-handle', $('#player1_ctrls_s')),
		videoElem = $('#player1_video')[0],
		currentTime = videoElem.currentTime,
		mousemove = jQuery.Event("mousemove");
	mousemove.pageX = handle.offset().left + 20;
	mousemove.button = 0;
	handle.trigger('mousedown');
	handle.trigger(mousemove);
	handle.trigger('mouseup');
	// TODO: ok(currentTime < videoElem.currentTime, 'Video has been seeked forward.');
});

QUnit.test('igVideoPlayer seek tooltip - check tooltip value in some point.', function(assert){
	assert.expect(0);
});

QUnit.test('igVideoPlayer play/pause on video element click', function(assert) {
	assert.expect(7);
	this.assert = assert;
	createBasicPlayer('player1');
	var video = $('#player1_video'),
		playButton = $('#player1_ctrls_play'),
		playIcon = playButton.children().first(),
		click = jQuery.Event("click");
	this.checkClass(playIcon, 'ui-icon');
	this.checkClass(playIcon, 'ui-igplayer-playbutton-icon');
	this.checkClass(playIcon, 'ui-icon-play');
	click.button = 0;
	video.trigger(click); // should play.
	assert.ok(!video[0].paused, 'Video should be playing.');
	this.checkClass(playIcon, 'ui-icon-pause');
	video.trigger(click); // should pause.
	assert.ok(video[0].paused, 'Video should be paused.');
	this.checkClass(playIcon, 'ui-icon-play');
});

// QUnit.test('igVideoPlayer bookmarks rendering', function(assert) {
// 	assert.expect(3);
// 	this.assert = assert;
// 	var done = assert.async();
// 	createBasicPlayer('player3');

// 	var playButton = $('#player3_title_ctrls_play'),
// 		video = $('#player3_video'),
// 		click = jQuery.Event("click"),
// 		slider = $('#player3_ctrls_s');
// 	click.button = 0;
// 	// setup third player to start playing so that bookmarks are rendered
// 	playButton.trigger(click); // should play.
// 	video.trigger(click); // should pause.
// 	// start bookmarks test

// 	var bookmarksObjects = $('#player3').igVideoPlayerUnitTesting('option', 'bookmarks');
// 	var bookmarkElems = $('.ui-igslider-bookmark', slider);
// 	var disabledBookmarkElems = $('.ui-igslider-bookmark-disabled', slider);
// 	assert.equal(bookmarkElems.length + disabledBookmarkElems.length, bookmarksObjects.length, 'The number of bookmarks rendered should be equal to the json array number.');

// 	bookmarkElems.each(function (i) {
// 		this.checkClass($(this), 'ui-igslider-bookmark');
// 		this.checkClass($(this), 'ui-state-default');

// 		var bkElem = $(bookmarkElems[i]);
// 		var bk = bookmarksObjects[bkElem.data('index.ui-igslider-bookmark')];
// 		assert.equal(bkElem[0].style.left, ((bk.time / video[0].duration).toFixed(2) * 100) + '%', 'Bookmark is not properly positioned.');
// 	});

// 	disabledBookmarkElems.each(function (i) {
// 		this.checkClass($(this), 'ui-igslider-bookmark-disabled');

// 		var bkElem = $(bookmarkElems[i]);
// 		var bk = bookmarksObjects[bkElem.data('index.ui-igslider-bookmark')];
// 		assert.equal(bkElem[0].style.left, ((bk.time / video[0].duration).toFixed(2) * 100) + '%', 'Bookmark is not properly positioned.');
// 	});

// 	var bookmarkArea = $('#player3_bookmarks');
// 	assert.ok(bookmarkArea.length > 0, 'Bookmarks area should be rendered!');
// 	this.checkClass(bookmarkArea, 'ui-igplayer-bookmark-container');
// 	this.checkClass(bookmarkArea.children().first(), 'ui-igplayer-bookmark-header');
// 	this.checkClass(bookmarkArea.children().first().next(), 'ui-igplayer-bookmark-list');

// 	var bookmarkAreaLis = $('li', bookmarkArea.children().first().next());
// 	bookmarkAreaLis.each(function (i) {
// 		var li = $(this),
// 			timeSpan = li.children().first(),
// 			titleSpan = li.children().first().next();
// 		this.checkClass(timeSpan, 'ui-igplayer-bookmark-item-time');
// 		assert.equal(titleSpan.attr('title'), titleSpan.html());
// 		assert.equal(titleSpan.html(), bookmarksObjects[li.data('bookmark-index')].title);
// 		/* equal(timeSpan.html(),  $('#player3').data("igVideoPlayerUnitTesting").prototype._toTimeString(bookmarksObjects[li.data('bookmark-index')].value)); */
// 		this.checkClass(titleSpan, 'ui-igplayer-bookmark-item-title');
// 	});
// });

QUnit.test('igVideoPlayer poster url', function(assert) {
	assert.expect(1);
	createBasicPlayer('player1');
	assert.equal($("#player1").igVideoPlayerUnitTesting('option', 'posterUrl'), $('#player1_video')[0].poster);
});

QUnit.test('igVideoPlayer is big play shown on end', function(assert) {
	assert.expect(1);
	createBasicPlayer('player2');
	var videoElem = $('#player2_video')[0];
	videoElem.playTo(260);
	assert.ok($('#player2_play').css('display') !== 'none', 'Big play should be visible on end.');
});