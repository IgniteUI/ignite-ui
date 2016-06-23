(function ($) {
	$.extend({ 
		createMockVideo: function (options) {
			var div = document.createElement('DIV'), isIE;
			
			div._createTimeRange = function (startArray, endArray) {
				return {
					_bufferedStart: startArray,
					_bufferedEnd: endArray,
					length: startArray.length,
					start: function (index) {
						return this._bufferedStart[index];
					},
					end: function (index) {
						return this._bufferedEnd[index];
					}
				};
			};
			div.autoplay = false;
			div.autobuffer= false;
			div.buffered = div._createTimeRange([0], [0]); // array of TimeRanges
			div.controls = true;
			div.currentSrc = '';
			div.currentTime = 0;
			div.defaultPlaybackRate = 1;
			div.duration = NaN;
			div.ended = false;
			div.paused = true;
			div.error = null;
			div.loop = false;
			div.muted = false;
			div.networkState = 0;
			isIE = window.navigator.userAgent.indexOf("MSIE") > -1 || !!window.navigator.userAgent.match(/trident/i);
			if (!isIE) {
				div.readyState = 0;
			}
			div.playbackRate = 1;
			div.played = div._createTimeRange([0], [0]); // array of TimeRanges
			div.poster = '';
			div.seekable = div._createTimeRange([0], [0]); // array of TimeRanges
			div.seeking = false;
			div.src = '';
			/* startTime = 0; */
			div.videoHeight = 0;
			div.videoWidth = 0;
			div.volume = 0.5; // between 0 and 1
			
			// private members
			div._videoLoaded = false;
			div._paused = false;
			div._connectionSpeed = 1;
			div._playing = false;
			div._waiting = false;
			
			if (!options || (options && !options.oldBrowser)) {
				div.canPlayType = function (val) {
					var canPlay = '';
					if (val === 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"' ||
					    val === 'video/ogg; codecs="theora, vorbis"' ||
					    val === 'video/webm; codecs="vp8, vorbis"') {
						canPlay = 'maybe';
					}
					return canPlay;
				};
			}

			div.load = function () {
				this.duration = 260;
				this.seekable = div._createTimeRange([0], [260])
				this._buffer();
				this._videoLoaded = true;
			};
			
			div._srcTimer = function () {
				var srcAttr = this.getAttribute('src');
				if (srcAttr !== this.src) {
					this.src = srcAttr;
				}

				if (this.src !== this.currentSrc) {
					this.currentSrc = this.src;
					this.load();
					if (this.autoplay) {
						this.play();
					}
				}
				setTimeout($.proxy(this._srcTimer, this), 500);
			};
			
			div._buffer = function () {
				var startArr = this.buffered._bufferedStart,
					endArr = this.buffered._bufferedEnd;

				startArr.push(endArr[endArr.length - 1]);
				endArr.push(startArr[startArr.length - 1] + (10 * this._connectionSpeed));

				this.buffered = this._createTimeRange(startArr, endArr);
				$(this).trigger('progress', { buffered: this.buffered });

				if (endArr[endArr.length - 1] <= this.duration) {
					setTimeout($.proxy(this._buffer, this), 500 * this._connectionSpeed);
				}
			};
			
			div.bufferTo = function (toVal) {
				this._videoLoaded = true;
				
				var startArr = this.buffered._bufferedStart,
					endArr = this.buffered._bufferedEnd;

				startArr.push(endArr[endArr.length - 1]);
				endArr.push(parseInt(toVal, 10));

				this.buffered = this._createTimeRange(startArr, endArr);
				$(this).trigger('progress', { buffered: this.buffered });
			};

			div.pause = function () {
				if (!this._paused && !this.paused) {
					this._paused = true;
					this.paused = true;
					$(this).trigger('pause');
				}
			};
			
			div.play = function () {
				if (!this._videoLoaded) {
					this.load();
				}
				
				if (!this._paused) {
					this.currentTime = 0;
				}

				this._paused = false;
				this.paused = false;
				this._play();
			};
			
			div.playTo = function (time) {
				if (!this._videoLoaded) {
					this.load();
				}
				this._paused = false;
				this.paused = false;
				this.currentTime = time;
				$(this).trigger('timeupdate', { currentTime: this.currentTime });
				
				if (this.currentTime === this.duration) {
					this.ended = true;
					this.paused = true;
					$(this).trigger('ended', { ended: true });
				}
				this._paused = true;
				this.paused = true;
			};

			div._play = function () {
				if (this._paused)
					return;
				
				if(!this._waiting) {					
					this.currentTime = this.currentTime + 1;
					if (this.currentTime % 5 === 0) {
						this.style.backgroundColor = "green";
					} else if(this.currentTime % 5 === 1) {
						this.style.backgroundColor = "blue";
					} else if(this.currentTime % 5 === 2) {
						this.style.backgroundColor = "yellow";
					} else if(this.currentTime % 5 === 3) {
						this.style.backgroundColor = "red";
					} else if(this.currentTime % 5 === 4) {
						this.style.backgroundColor = "white";
					}
					$(this).trigger('playing');
					$(this).trigger('timeupdate', { currentTime: this.currentTime });
					
					if (this.currentTime >= this.duration) {
						this.ended = true;
						this.paused = true;
						$(this).trigger('ended', { ended: true });
						if (this.loop) {
							this.play();
						}
					} else {
						setTimeout($.proxy(this._play, this), 1000);
					}
				} else {
					// we are waiting for data
					$(this).trigger('waiting');
					setTimeout($.proxy(this._play, this), 1000);
				}
			};
			
			div.waitForData = function () {
				this._waiting = true;
				$(this).trigger('waiting');
			};
			
			div.stopWaitingForData = function () {
				this._waiting = false;
				$(this).trigger('playing');
			};
			
			div._srcTimer();

			return div;
		}
	});
}(jQuery));