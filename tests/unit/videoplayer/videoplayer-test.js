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
// #Player1 and #Player2 with isAutoPlay and isMuted set to true
function createBasicPlayer(divId, isAutoPlay = false, isMuted = false){	

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
			autoplay: isAutoPlay,
			muted: isMuted,
			autohide: false
	});
}

// #Player3
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

// #Player4
function createBannersPlayer(divId){	
	
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
		title: 'Welcome to Green Field video...',
		muted: true,
		autohide: true,
		banners: [{
			imageUrl: 'http://www.portabellasgrille.com/menu/img/pizza.gif',
			link: 'http://mrpizza.bg/',
			times: [5, 20, 60],
			visible: false,
			closeBanner: true,
			animate: false,
			autohide: false,
			width: "350px",
			height: "40px"
		}]
	});
}

// #Player5
function createCommercialsPlayer(divId){	
	
	createFixtureDiv(divId)

	$('#' + divId).igVideoPlayerUnitTesting({
		sources: ["http://medias.jilion.com/sublimevideo/dartmoor.mov",
				  "http://medias.jilion.com/sublimevideo/dartmoor.mp4",
				  "http://medias.jilion.com/sublimevideo/dartmoor.webm",
				  "http://medias.jilion.com/sublimevideo/dartmoor.ogv"],
		width: 800,
		height: 340,
		fullscreen: false,
		browserControls:false,
		autoplay: false,
		title: 'Welcome to green grass...',
		muted: true,
		autohide: true,
		commercials: {
			embeddedCommercials: [
			{
				startTime: 20,
				endTime: 30,
				title: 'Some nice commercial.',
				link: 'http://www.neowin.net'
			},
			{
				startTime: 50,
				endTime: 60,
				link: 'http://www.winbeta.org'
			}],
			alwaysPlayCommercials: false, // Get or set whether the commercials will always play or not.
			showBookmarks: true, // Get or set whether to show commercial locations or not.
			adMessage: {
				animate: false, // Get or set whether to animate the showing of the ad message.
				autoHide: false, // Get or set whether the ad message will auto hide.
				hideDelay: 20000 // Get or set the ad message hide delay.
			}
		}
	});
}


// #Player13
function createBannersBookmarksPlayer(divId,){	

	createFixtureDiv(divId)

	$('#' + divId).igVideoPlayerUnitTesting({
		sources: ["http://medias.jilion.com/sublimevideo/dartmoor.mov",
				  "http://medias.jilion.com/sublimevideo/dartmoor.mp4",
				  "http://medias.jilion.com/sublimevideo/dartmoor.webm",
				  "http://medias.jilion.com/sublimevideo/dartmoor.ogv"
		],
		width: 800,
		height: 200,
		banners: [{
			imageUrl: 'http://www.portabellasgrille.com/menu/img/pizza.gif',
			link: 'http://mrpizza.bg/',
			times: [0, 5, 10],
			visible: true,
			closeBanner: true,
			animate: true,
			autohide: true,
			preload: true,
			width: "350px",
			height: "40px"
		}],
		bookmarks: [
			{
				title: 'mark',
				description: 'Here we see a nice green field.',
				time: 60
			}
		]
	});
}

QUnit.module("igVideoPlayer", {
	before: function () {setTimeout( 3000); },
	after: function () {},
	beforeEach: function () { },
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
	},
	checkElementClass(element,classs) {
		this.assert.ok(element.hasClass(classs), 'The element \"' + element[0].tagName + '\" does not contain the class:' + classs)		
	}
});

QUnit.test('title controls rendering test 16', function (assert) {
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

QUnit.test('title controls play test 17', function(assert) {
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

QUnit.test('options: volume test test 1', function(assert) {
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
QUnit.test('options test 2: autoplay test', function(assert) {
	assert.expect(0);
});
QUnit.test('browser controls test 3: play to position and verifies the slider position, current time, progress label value and format', function(assert) {
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
QUnit.test('options test: muted test 4', function(assert) {
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
QUnit.test('buffering check when video is loading that buffer progress is updated. test 5', function(assert) {
	assert.expect(1);
	createBasicPlayer('player1');
	var videoElem = $('#player1_video')[0];
	videoElem.bufferTo(videoElem.duration / 2);
	assert.equal($('#player1_ctrls_pb_progress')[0].style.width, '50%', "Half of movie should be buffered.");							
});
QUnit.test('API: play() test 6', function(assert) {
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
QUnit.test('API: pause() test 7', function(assert) {
	assert.expect(2);
	createBasicPlayer('player1');
	var videoElem = $('#player1_video')[0];
	$("#player1").igVideoPlayerUnitTesting("play");
	assert.ok(!videoElem.paused, 'Paused should be false.');
	$("#player1").igVideoPlayerUnitTesting("pause");
	assert.ok(videoElem.paused, 'Paused should be true.');			
});
QUnit.test('controls rendering test 8', function(assert) {
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

QUnit.test('missing sources test 9', function(assert) {
	assert.expect(0);

});

QUnit.test('play/pause button test 10', function(assert) {
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

QUnit.test('volume control mute on click test 11', function(assert) {
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

QUnit.test('volume control slider show on hover test 12', function(assert){
	assert.expect(1);
	createBasicPlayer('player1');
	var volumeControlButton = $('#player1_controls_volumeControl'),
	volumeSlider = $('#player1_controls_volumeSlider');
	volumeControlButton.trigger('mouseover');
	assert.ok(volumeSlider.css('display') !== 'none', 'Volume slider should be visible');
	volumeControlButton.trigger('mouseout');
});

QUnit.test('seeking test - move slider and check currentTime test 13', function(assert){
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

QUnit.test('seek tooltip - check tooltip value in some point. test 14', function(assert){
	assert.expect(0);
});

QUnit.test('play/pause on video element click test 15', function(assert) {
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

// QUnit.test('bookmarks rendering test 18', function(assert) {
// 	assert.expect(3);
// 	this.assert = assert;
// 	var done = assert.async();
// 	createBookmarksPlayer('player3');

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

QUnit.test('poster url test 19', function(assert) {
	assert.expect(1);
	createBasicPlayer('player1');
	assert.equal($("#player1").igVideoPlayerUnitTesting('option', 'posterUrl'), $('#player1_video')[0].poster);
});

QUnit.test('is big play shown on end test 20', function(assert) {
	assert.expect(1);
	createBasicPlayer('player2', true, true);
	var videoElem = $('#player2_video')[0];
	videoElem.playTo(260);
	assert.ok($('#player2_play').css('display') !== 'none', 'Big play should be visible on end.');
});

QUnit.test('is waiting shown on waiting test 21', function(assert) {
	assert.expect(2);
	createBasicPlayer('player2', true, true);
	var videoElem = $('#player2_video')[0];
	videoElem.playTo(10);
	videoElem.pause();
	videoElem.play();
	videoElem.waitForData();
	assert.ok($('#player2_waiting').css('display') !== 'none', 'Waiting indicator should be shown.');
	videoElem.stopWaitingForData();
	assert.ok($('#player2_waiting').css('display') == 'none', 'Waiting indicator should not be visible.');
	videoElem.pause();
});

QUnit.test('is waiting button rendering test 22', function(assert) {
	assert.expect(4);
	createBasicPlayer('player1');
	this.assert = assert;
	var waiting = $('#player1_waiting');
	assert.ok(waiting.length > 0, 'Big waiting button is not rendered.');
	this.checkClass(waiting, 'ui-igplayer-waiting');
	this.checkClass(waiting, 'ui-state-default');
	this.checkClass(waiting.children().first(), 'ui-igplayer-waiting-icon');

});

QUnit.test('is big play button rendering test 23', function(assert) {
	assert.expect(4);
	createBasicPlayer('player1');
	this.assert =  assert;
	var bigPlay = $('#player1_play');
	assert.ok(bigPlay.length > 0, 'Big waiting button is not rendered.');
	this.checkClass(bigPlay, 'ui-state-default');
	this.checkClass(bigPlay.children().first(), 'ui-igplayer-centerplaybutton-icon');
	$("#player1").data('igVideoPlayerUnitTesting').togglePlay();
	$("#player1").data('igVideoPlayerUnitTesting').togglePlay();
	this.checkClass(bigPlay, 'ui-igplayer-centerplaybutton-pause');	
});

QUnit.test('is seek tooltip rendering test 24', function(assert) {
	assert.expect(7);
	createBasicPlayer('player1');
	this.assert =  assert;
	
	var seekTooltip = $('#player1_seek_tooltip');
	assert.ok($("#player1").igVideoPlayerUnitTesting('option', 'showSeekTime'), 'Show seek tooltip should be true!');
	if ($("#player1").igVideoPlayerUnitTesting('option', 'showSeekTime')) {
		assert.ok(seekTooltip.length > 0, 'Big waiting button is not rendered.');
		this.checkClass(seekTooltip, 'ui-igplayer-seektooltip');
		this.checkClass(seekTooltip, 'ui-widget');
		this.checkClass(seekTooltip, 'ui-igpopover');
		this.checkClass(seekTooltip.children().first(), 'ui-widget-content');
		this.checkClass(seekTooltip.children().first().next(), 'ui-igpopover-arrow-bottom');
	}
});

QUnit.test('igVideoPlayer keyboard navigation between control buttons test 25', function(assert) {
	assert.expect(11);
	createBannersPlayer('player13');
	this.assert =  assert;

	var done = assert.async();
	function checkElementClass(element,classs) {
		assert.ok(element.hasClass(classs), 'The element \"' + element[0].tagName + '\" does not contain the class:' + classs)		
	}

	$("#player13").igVideoPlayerUnitTesting("play");
	this.checkElementClass($('#player13_ctrls_play_lbl'),'ui-icon-pause');

	$("#player13_ctrls_pb").trigger('mousemove');
	$("#player13_ctrls_pb").trigger('mouseout');

	var slider = $("#player13_ctrls_s").children(':first');
	this.checkElementClass(slider, 'ui-igslider-handle');
	
	$('#player13_ctrls_play_lbl').trigger('click');
	this.checkElementClass($('#player13_ctrls_play_lbl'),'ui-icon-play');		

	slider.trigger('mouseover');
	this.checkClass(slider, 'ui-state-hover');
	
	var homePos = slider.position().left,
		ev = jQuery.Event('keydown');		
		ev.keyCode = $.ui.keyCode.END;

	slider.focus();	
	slider.trigger(ev);

	setTimeout(function(){		

		var endPos = slider.position().left;
		assert.ok(homePos < endPos);			

		slider.trigger('click');

		ev = jQuery.Event('keydown');
		ev.keyCode = $.ui.keyCode.HOME;

		slider.trigger(ev);

		setTimeout(function(){

			var zeroPos = slider.position().left;
			assert.equal(zeroPos, homePos);	
			
			assert.ok($("#player13_ctrls_play_lbl").hasClass('ui-icon-play'), 'The element \"' + $("#player13_ctrls_play_lbl")[0].tagName + '\" does not contain the class:' + 'ui-icon-play');

			ev = jQuery.Event('keydown');
			ev.keyCode = $.ui.keyCode.SPACE;

			$("#player13_ctrls_play").focus();
			$("#player13_ctrls_play").trigger(ev);

			checkElementClass($("#player13_ctrls_play_lbl"), 'ui-icon-pause');

			$("#player13_ctrls_fs_btn_lbl").focus();
			$("#player13_ctrls_fs_btn_lbl").trigger('click');
			

			setTimeout(function(){

				checkElementClass($("#player13_ctrls_fs_btn_lbl"),'ui-icon-closethick');

				ev = jQuery.Event('keydown');
				ev.keyCode = $.ui.keyCode.ESCAPE;

				$("#player13_ctrls_fs_btn_lbl").trigger(ev);

				checkElementClass($("#player13_ctrls_fs_btn_lbl"),'ui-icon-arrow-4-diag');

				var counter = 0,
				bannerClick = jQuery.Event("click");
				$("#player13").one("click", function() {
					counter++;
				});

				$("#player13_banner_grid0").trigger('click');
				assert.equal(counter, 1);

				$("#player13_ctrls_vc_btn").focus();

				ev = jQuery.Event('keydown');
				ev.keyCode = $.ui.keyCode.TAB;
				$("#player13_ctrls_vc_btn").trigger(ev);

				var vs = $("#player13_ctrls_vs").children(':first'),
					vsPos = vs.position().top;

				ev = jQuery.Event('keydown');
				ev.keyCode = $.ui.keyCode.HOME;
				vs.trigger(ev);

				setTimeout(function(){
				
					//TO DO:
					// vsPosNew = vs.position().top;

					// assert.ok(vsPosNew > vsPos);

					// vs.focus();
					// ev = jQuery.Event('keydown');
					// ev.keyCode = $.ui.keyCode.TAB;
					// vs.trigger(ev);

					done();
				}, 500);
			}, 500);
		}, 900);
	},900);

});

QUnit.test('igVideoPlayer autohide test 26', function(assert) {
	assert.expect(3);	
	createBasicPlayer('player2', true, true);	
	this.assert = assert;

	$('#player2').igVideoPlayerUnitTesting('option', 'autohide', true);
	var video = $('#player2_video'),
		controls = $('#player2_ctrls').parent();
	video.trigger('mouseout');
	this.checkClass(controls, 'ui-igplayer-controls-hide');
	video.trigger('mouseover');
	assert.ok(!controls.hasClass('ui-igplayer-controls-hide'));
	video.trigger('mouseout');
	this.checkClass(controls, 'ui-igplayer-controls-hide');
	$('#player2').igVideoPlayerUnitTesting('option', 'autohide', false);
});

QUnit.test('destroy test 27', function(assert) {
	assert.expect(6);	
	createBasicPlayer('player1');	
	createBasicPlayer('player2', true, true);	
	createBookmarksPlayer('player3');
	createBannersPlayer('player4');
	createCommercialsPlayer('player5');

	var a = 0,
		click = jQuery.Event("click"),
		player1 = $('#player1');
	player1.bind('click', function () {
		a = 1;
	});
	player1.igVideoPlayerUnitTesting('destroy');
	player1.trigger(click);
	assert.ok(a === 1, 'Click event should still fire after, widget is destroyed!');
	assert.ok(player1.empty(), 'Player DIV should be empty!');

	$('#player2').igVideoPlayerUnitTesting('destroy');
	assert.ok($('#player2').empty(), 'Player DIV should be empty!');
	$('#player3').igVideoPlayerUnitTesting('destroy');
	assert.ok($('#player3').empty(), 'Player DIV should be empty!');
	$('#player4').igVideoPlayerUnitTesting('destroy');
	assert.ok($('#player4').empty(), 'Player DIV should be empty!');
	$('#player5').igVideoPlayerUnitTesting('destroy');
	assert.ok($('#player5').empty(), 'Player DIV should be empty!');
});

QUnit.test('Banner Rendering test 28', function(assert) {
	assert.expect(8);	
	createBannersPlayer('player4');
	this.assert = assert;
	
	var banner = $('#player4_banner_grid0'),
		close = $('#player4_banner_grid0_banner_close'),
		icon = $('span.ui-icon', close);
	assert.ok(banner !== null && banner !== undefined, 'banner should be defined.');
	assert.ok(close.length === 1, 'Banner should have close button.');
	this.checkClass(banner, 'ui-igplayer-banner');
	this.checkClass(close, 'ui-igbutton');
	this.checkClass(close, 'ui-button-icon-only');
	assert.ok(icon.length === 1, 'Banner should have close icon.');
	this.checkClass(icon, 'ui-icon-close');
	assert.ok($('img', banner).length === 1, 'Banner should have image rendered from template.');
});

QUnit.test('Banner Show/Close test 29', function(assert) {
	assert.expect(2);	
	createBannersPlayer('player4');

	$("#player4").data('igVideoPlayerUnitTesting').togglePlay();
	$("#player4").data('igVideoPlayerUnitTesting').togglePlay();
	var banner = $('#player4_banner_grid0'),
		close = $('#player4_banner_grid0_banner_close'),
		click = jQuery.Event("click"),
		videoElem = $('#player4_video')[0];
	videoElem.playTo(5);
	assert.ok(banner.is(':visible'), 'Banner should be visible.');
	click.button = 0;
	close.trigger(click);
	assert.ok(!banner.is(':visible'), 'Banner should not be visible.');
});

QUnit.test('Ad Message test 31', function(assert) {
	assert.expect(7);		
	createCommercialsPlayer('player5');
	this.assert = assert;
	
	var adMessage = $('#player5_ad_msg_c'),
		span = $('#player5_ad_msg'),
		closeButton = $('#player5_ad_msg_close');
	assert.ok(adMessage.length === 1, 'Ad message rendered');
	assert.ok(span.length === 1, 'Ad span message rendered');
	assert.ok(closeButton.length === 1, 'Ad message close rendered');
	this.checkClass(adMessage, 'ui-igplayer-ad-msg-container');
	this.checkClass(span, 'ui-igplayer-ad-msg');
	this.checkClass(closeButton, 'ui-igplayer-ad-msg-close');
	this.checkClass(closeButton, 'ui-igbutton');
});

QUnit.test('Embedded Commercials test 30', function(assert) {
	assert.expect(5);		
	createCommercialsPlayer('player5');

	$("#player5").data('igVideoPlayerUnitTesting').togglePlay();
	$("#player5").data('igVideoPlayerUnitTesting').togglePlay();
	var videoElem = $('#player5_video')[0],
		adMessage = $('#player5_ad_msg_c'),
		span = $('#player5_ad_msg');
	assert.ok(!adMessage.is(':visible'), 'Ad message should not be visible.');
	videoElem.playTo(19);
	assert.ok(!adMessage.is(':visible'), 'Ad message should not be visible.');
	videoElem.playTo(20);
	assert.ok(adMessage.is(':visible'), 'Ad message should be visible.');
	assert.equal(span.html(), 'Ad: Video will resume in 10 seconds.', 'Message mismatch:');
	videoElem.playTo(31);
	assert.ok(!adMessage.is(':visible'), 'Ad message should not be visible.');
});

QUnit.test('Ad Message Close test 32', function(assert) {
	assert.expect(3);		
	createCommercialsPlayer('player5');

	$("#player5").data('igVideoPlayerUnitTesting').togglePlay();
	$("#player5").data('igVideoPlayerUnitTesting').togglePlay();
	var videoElem = $('#player5_video')[0],
		click = jQuery.Event("click"),
		adMessage = $('#player5_ad_msg_c'),
		closeButton = $('#player5_ad_msg_close');
	assert.ok(!adMessage.is(':visible'), 'Ad message should not be visible.');
	videoElem.playTo(50);
	assert.ok(adMessage.is(':visible'), 'Ad message should be visible.');
	click.button = 0;
	closeButton.trigger(click);
	assert.ok(!adMessage.is(':visible'), 'Ad message should not be visible.');
});

QUnit.test('No Compatible video source test 34', function(assert) {
	assert.expect(3);
	this.assert = assert;

	createFixtureDiv('player7')

	$("#player7").igVideoPlayerUnitTesting({
		sources: [],
		width: 800,
		height: 340,
		browserControls:false,
		autoplay: false,
		autohide: false
	});

	var noCompatibleVideoSource = $('#player7_detectError');
	assert.equal(noCompatibleVideoSource.attr('title'), $.ig.VideoPlayer.locale.unsupportedVideoSource, 'The title should match the locale text.');
	this.checkClass(noCompatibleVideoSource, 'ui-igplayer-not-supported-video-source');
	assert.ok(noCompatibleVideoSource.is(':visible'), 'No compatible video source msg should be visible!');
});


