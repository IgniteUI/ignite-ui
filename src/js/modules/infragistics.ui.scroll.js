/*!@license
* Infragistics.Web.ClientUI Scroll <build_number>
*
* Copyright (c) 2011-<year> Infragistics Inc.
*
* http://www.infragistics.com/
*
* Depends on:
* jquery-1.4.4.js
* jquery.ui.core.js
* jquery.ui.widget.js
* infragistics.util.js
*/

/*global jQuery,setTimeout,window,document,Modernizr,MSGesture*/
(function ($) {
	var _attr = "data-scroll",
	_aNull = function (val) {
		return val === null || val === undefined || (typeof val === "number" && isNaN(val));
	}, _valid = function (elem) {
		return (elem && elem[ 0 ].parentNode) ? elem : null;
	}, _remove = function (elem) {
		if (_valid(elem)) {
			elem.remove();
		}
	}, _find = function (notMobile) {
		setTimeout(function () {
			if (!$.ig.util.isModernizrAvailable || $.ig.util.isTouch) {
				$("body").find("[" + _attr + "]").each(function () {
					var elem = $(this), scroll = elem.data("igScroll");
					if ((!scroll || !scroll.evts) && !elem.data("igScroll") && !elem.data("scrollview")) {
						elem.igScroll({ _find: true });
					}
				});
			}
		}, notMobile === true ? 1000 : 100);
	},
	lastTime = 0,
	prefixes = [ "ms", "moz", "webkit", "o" ];

	/** Start requestAnimationFrame and cancelAnimationFrame polyfill **/
	for (var x = 0; x < prefixes.length && (!window.requestAnimationFrame || !window.cancelAnimationFrame); ++x) {
		window.requestAnimationFrame = window[ prefixes[ x ] + "RequestAnimationFrame" ];
		window.cancelAnimationFrame = window[ prefixes[ x ] + "CancelAnimationFrame" ] ||
										window[ prefixes[ x ] + "CancelRequestAnimationFrame" ];
	}

	if (!window.requestAnimationFrame) {
		window.requestAnimationFrame = function (callback, element) {
			var currTime = Date.now();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function () { callback(currTime + timeToCall); },
				timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};
	}

	if (!window.cancelAnimationFrame) {
		window.cancelAnimationFrame = function (id) {
			clearTimeout(id);
		};
	}
	/** End polyfill **/

	/* S.K. Fix for bug 212350: For IE11 and up msSetPointerCapture and msReleasePointerCapture are depricated. setPointerCapture and releasePointerCapture are supported from IE10 and up. */
	var setPointerCaptureFName = typeof Element.prototype.msSetPointerCapture === "function" ?
								"msSetPointerCapture" :
								"setPointerCapture",
	releasePointerCaptureFName = typeof Element.prototype.msReleasePointerCapture === "function" ?
									"msReleasePointerCapture" :
									"releasePointerCapture";

	$.widget("ui.igScroll", {
		options: {
			/* type="bool" Sets or gets if the scrollbars should be always visible (on all environments). Otherwise it will be the default behavior. */
			alwaysVisibleBars: null,
			/* type="bool" Sets or gets if the scrollbars should be hidden (on all environments). Otherwise it will be the default behavior. */
			useNative: null,
			/* type="bool" Sets or gets if igScroll can modify the DOM when it is initialized on certain element so that the content can be scrollable. */
			modifyDOM: null,
			/* type="number" Sets custom value for how high is actually the content. Useful when wanting to scroll and update the shown content manually. */
			scrollHeight: null,
			/* type="number" Sets custom value for what width is actually the content. Useful when wanting to scroll and update the shown content manually. */
			scrollWidth: null,
			/* type="number" Sets gets the step of the default scrolling behavtiour when using mouse wheel */
			wheelStep: null,
			/* type="bool" Sets gets if smoother scrolling with small intertia should be used when using mouse wheel */
			smoothing: null,
			/* type="number" Sets gets the modifier for how much the inertia scrolls on mobile devices*/
			smoothingStep: null,
			/* type="number" Sets gets the modifier for how long the inertia last on mobile devices*/
			smoothingDuration: null,
			/* type="array" Sets gets elements that are linked to the main content horizontally. When the content is scrolled on X axis the linked elements scroll accordingly. */
			syncedElemsH: [],
			/* type="array" Sets gets elements that are linked to the main content vertically. When the content is scrolled on Y axis the linked elements scroll accordingly. */
			syncedElemsV: [],
			/* type="string" Sets gets html or jQuery element which is used for horizontal scrolling. */
			scrollbarH: null,
			/* type="string" Sets gets html or jQuery element which is used for vertical scrolling. */
			scrollbarV: null,
			/* type="bool" Sets gets if only the linked horizontal scrollbar should be used for horizontal scrolling. Note: The behaviour when the linked scrollbar is scrolled in this case should be handled manually. */
			scrollOnlyHBar: null,
			/* type="bool" Sets gets if only the linked vertical scrollbar should be used for vertical scrolling. Note: The behaviour when the linked scrollbar is scrolled in this case should be handled manually. */
			scrollOnlyVBar: null,
			/* type="string" Sets gets html or jQuery element to which the horizontal scrollbar will be appended to. */
			scrollbarHParent: null,
			/* type="string" Sets gets html or jQuery element to which the vertical scrollbar will be appended to. */
			scrollbarVParent: null
		},
		events: {
			/* cancel="false" Event which is raised after the scroller has been rendered fully
			*/
			rendered: null,
			/* cancel="true" Event which is raised before scrolling.
				Return false in order to cancel action.
				Function takes arguments evt and ui.
				Note: while inertia, the evt parameter is not available.
				Use evt.originalEvent (with validation for not null of evt) to obtain reference to event of browser.
				Use ui.owner to obtain reference to igScroll.
				Use ui.deltaX to obtain increment/decrement of horizontal scroller. That member can be modified and igScoll will use that new custom value.
				Use ui.deltaY to obtain increment/decrement of vertical scroller. That member can be modified and igScoll will use that new custom value.
			*/
			scrolling: null,
			/* cancel="false" Event which is raised after scrolling.
				Function takes arguments evt and ui.
				Note: while inertia, the evt parameter is not available.
				Use evt.originalEvent (with validation for not null of evt) to obtain reference to event of browser.
				Use ui.owner to obtain reference to igScroll.
				Use ui.deltaX to obtain increment/decrement of horizontal scroller.
				Use ui.deltaY to obtain increment/decrement of vertical scroller.
			*/
			scrolled: null,
			/* cancel="false" Event which is raised when there is mouse click on the scrollbar's thumb drag.

			*/
			thumbDragStart: null,
			/* cancel="true" Event which is raised when the thumb drag is being moved.

			*/
			thumbDragMove: null,
			/* cancel="false" Event which is raised on mouse up from the scrollbar's thumb drag.

			*/
			thumbDragEnd: null
		},
		scrollLeft: function (val) {
			/* Gets sets the position of the content horizontally.
				paramType="number" optional="true" new value for scrollLeft.
				returnType="number|object" Returns scrollLeft or reference to igScroll.
			*/
			if (_aNull(val)) {
				return this._getContentPositionX();
			}
			if (Modernizr.touch) {
				this._scrollTouchToXY(val, 0);
			} else {
				this._scrollToX(val);
			}
			return this;
		},
		scrollTop: function (val) {
			/* Gets sets the position of the content vertically.
				paramType="number" optional="true" new value for scrollTop.
				returnType="number|object" Returns scrollTop or reference to igScroll.
			*/
			if (_aNull(val)) {
				return this._getContentPositionY();
			}
			if (Modernizr.touch) {
				this._scrollTouchToXY(0, val);
			} else {
				this._scrollToY(val);
			}

			return this;
		},
		refresh: function() {
			//width specific
			this._elemWidth = this._container.width();
			this._contentWidth = this._content.width();
			this._percentInViewH = this._elemWidth / this._contentWidth;
			this._dragMaxX = this._elemWidth;
			this._isScrollableH = this._percentInViewH < 1;

			//height specific
			this._elemHeight = this._container.innerHeight();
			this._contentHeight = this._content.height();
			this._percentInViewV = this._elemHeight / this._contentHeight;
			this._dragMaxY = this._elemHeight;
			this._isScrollableV = this._percentInViewV < 1;

			this._refreshScrollbarsDrag();

			return this._container;
		},
		_setOption: function (key, value) {
			this._super(key, value);

			if (key === "alwaysVisibleBars") {
				if (value === true) {
					this._showScrollBars();
				}
			}
			if (key === "useNative") {
				if (value === true) {
					this._removeScrollbarH();
					this._removeScrollbarV();
				} else if (value === false) {
					this._createScrollBars();
				}
			}
			if (key === "scrollHeight") {
				this._setScrollHeight(value);
			}
			if (key === "scrollWidth") {
				this._setScrollWidth(value);
			}
			if (key === "syncedElemsH") {
				this._linkElementsH(value);
			}
			if (key === "syncedElemsV") {
				this._linkElementsV(value);
			}
		},
		_setOptions: function (options) {
			var self = this;

			$.each(options, function (key, value) {
				self._setOption(key, value);
			});
		},

		_create: function () {
			var key,
				self = this,
				defaultOptions,
				scrollOptions = this.options,
				elem = this.element;

			this._bMixedEnvironment = false;
			this._linkedHElems = [];
			this._linkedVElems = [];
			this._linkedHBar = null;
			this._linkedVBar = null;
			this._elemWidth = elem.width();
			this._elemHeight = elem.height();

			//IDs of the timeouts used for waiting until hiding or switching to simple scrollbars
			this._hideScrollbarID = 0;
			this._toSimpleScrollbarID = 0;

			//Track if the mouse is inside the scroll container
			this._mOverContainer = false;
			this._mOverScrollbars = false;

			if (this.options.modifyDOM) {
				var contentWidth = elem[ 0 ].scrollWidth;
				elem.addClass("igscroll-scrollable");
				this._content = $("<div id='content' class='igscroll-content'/>")
					.appendTo(elem)
					.append(elem.children());
				//if (!Modernizr.touch) {
				//	this._content
				//		.css("padding-right", 17 + "px")
				//		.css("padding-bottom", 17 + "px");
				//}

				this._container = $("<div id='container' class='igscroll-container' />")
					.css({
						"width": this._elemWidth + "px",
						"height": this._elemHeight + "px"
					})
					.insertBefore(this._content)
					.append(this._content);
				this._container.data("containerName", "scrollContainer");
			} else {
				this._container = elem;
				this._content = $(elem.children()[ 0 ]);
			}
			/* Set initial options */
			defaultOptions = $.ui.igScroll.defaults;
			for (key in defaultOptions) {
				if (defaultOptions.hasOwnProperty(key) && scrollOptions[ key ] === null) {
					scrollOptions[ key ] = defaultOptions[ key ];
				}
			}
			self._initOptions(scrollOptions);

			this._contentHeight = this._content[ 0 ].scrollHeight;
			this._contentWidth = this._content[ 0 ].scrollWidth;
			this._percentInViewH = this._elemWidth / this._contentWidth;
			this._percentInViewV = this._elemHeight / this._contentHeight;
			this._dragMaxY = this._elemHeight;
			this._dragMaxX = this._elemWidth;

			//1 equals 100%
			this._isScrollableV = this._percentInViewV < 1;
			this._isScrollableH = this._percentInViewH < 1;

			//Events specific variables
			var startX, startY,
					touchStartX,
					touchStartY,
					moving = false;

			self.evts = {
				scroll: function () {
					if (!$.ig.util.isTouch) {
						self._syncElemsX(self._container[ 0 ], false);

						//self._syncHBar(self._container[ 0 ], false);

						if (!self.options.scrollOnlyVBar) {
							//self._syncVBar(self._container[ 0 ], false);
						}

						self._updateScrollBars(self._container.scrollLeft(), self._container.scrollTop());
					}

					return false;
				},
				wheel: function (e) {
					var evt = e.originalEvent;
					self._bStopInertia = true;
					self._bMixedEnvironment = true;

					var matrix = self._content.css("-webkit-transform");
					var values = matrix ? matrix.match(/-?[\d\.]+/g) : undefined;
					startX = values ? Number(values[ 4 ]) : 0;
					startY = values ? Number(values[ 5 ]) : 0;

					//Switch to using scrollTop and scrollLeft attributes instead of transform3d when we have mouse + touchscreen, because they will interfere with each other
					if (startX !== 0 || startY !== 0) {
						//Reset the transform3d position to 0.
						self._scrollTouchToXY(0, 0);

						//Go back to the scrolled position but using scrollTop and scrollLeft this time
						//console.log(startX + " " + startY);
						self._scrollToX(-startX);
						self._scrollToY(-startY);
					}

					if (self.options.smoothing) {
						//Scroll with small inertia
						self._smoothWheelScrollY(evt.deltaY);
					} else {
						//Normal scroll
						if (self.options.scrollOnlyVBar) {
							startY = self._getScrollbarVPoisition();
						} else {
							startY = self._getContentPositionY();
						}

						var scrollStep = self.options.wheelStep;
						self._scrollToY(startY + (evt.deltaY > 0 ? 1 : -1) * scrollStep);
					}

					return false;
				},
				pointerdown: function (e) {
					var evt = e.originalEvent;

					if (!evt || (evt.pointerType !== 2 && evt.pointerType !== "touch")) {
						return;
					}

					//setPointerCaptureFName is the name of the function that is supported
					e.target[ setPointerCaptureFName ](self._pointer = evt.pointerId);

					//create gestureObject only one time to prevent overlapping during intertia
					if (!this._gestureObject) {
						this._gestureObject = new MSGesture();
						this._gestureObject.target = self._container[ 0 ];
					}
					this._gestureObject.addPointer(self._pointer);
				},
				MSGestureStart: function (e) {
					if (self.options.scrollOnlyVBar) {
						startX = self._getScrollbarHPoisition();
						startY = self._getScrollbarVPoisition();
					} else {
						startX = self._getContentPositionX();
						startY = self._getContentPositionY();
					}

					touchStartX = e.originalEvent.screenX;
					touchStartY = e.originalEvent.screenY;
					moving = true;
				},
				MSGestureChange: function (e) {
					if (!moving) {
						return;
					}

					var touchPos = e.originalEvent;
					self._scrollToX(startX + touchStartX - touchPos.screenX);
					self._scrollToY(startY + touchStartY - touchPos.screenY);
				},
				MSGestureEnd: function () {
					moving = false;
				},
				touchstart: function (e) {
					var touch = e.originalEvent.touches[ 0 ];
					startX = self._getContentPositionX();
					if (self.options.scrollOnlyVBar) {
						startY = self._getScrollbarVPoisition();
					} else {
						startY = self._getContentPositionY();
					}

					touchStartX = touch.pageX;
					touchStartY = touch.pageY;
					moving = true;

					self._bStopInertia = true; //stops any current ongoing inertia
					self._speedDecreasing = false;

					self._lastTouchEnd = new Date().getTime();
					self._lastTouchX = touch.pageX;
					self._lastTouchY = touch.pageY;
					self._savedSpeedsX = [];
					self._savedSpeedsY = [];

					self._trigger("started", {});
					self._showScrollBars(false, true);
				},
				touchmove: function (e) {
					var touch = e.originalEvent.touches[ 0 ];
					var destX = startX + touchStartX - touch.pageX;
					var destY = startY + touchStartY - touch.pageY;
					//console.log("Touch: " + (touchStartY - touch.pageY) + " " + startY);

					/*Handle complex touchmoves when swipe stops but the toch doesn't end and then a swipe is initiated again */
					/***********************************************************/
					var speedSlopeX = self._getSpeedSlope(self._savedSpeedsX);
					var speedSlopeY = self._getSpeedSlope(self._savedSpeedsY);

					if (speedSlopeY > -0.1 || speedSlopeX > -0.1) {
						self._speedDecreasing = true;
					} else {
						self._speedDecreasing = false;
					}

					var timeFromLastTouch = (new Date().getTime()) - self._lastTouchEnd;
					if (timeFromLastTouch < 100) {
						var speedX = (self._lastTouchX - touch.pageX) / timeFromLastTouch;
						var speedY = (self._lastTouchY - touch.pageY) / timeFromLastTouch;

						//Save the last 5 speeds between two touchmoves on X axis
						if (self._savedSpeedsX.length < 5) {
							self._savedSpeedsX.push(speedX);
						} else {
							self._savedSpeedsX.shift();
							self._savedSpeedsX.push(speedX);
						}

						//Save the last 5 speeds between two touchmoves on Y axis
						if (self._savedSpeedsY.length < 5) {
							self._savedSpeedsY.push(speedY);
						} else {
							self._savedSpeedsY.shift();
							self._savedSpeedsY.push(speedY);
						}
					}
					self._lastTouchEnd = new Date().getTime();
					self._lastMovedX = self._lastTouchX - touch.pageX;
					self._lastMovedY = self._lastTouchY - touch.pageY;
					self._lastTouchX = touch.pageX;
					self._lastTouchY = touch.pageY;
					/***********************************************************/

					//Check if browser is Firefox
					if (navigator.userAgent.indexOf("Firefox") > -1 || self._bMixedEnvironment) {
						//Better performance on Firefox for Android
						self._scrollToX(destX);
						self._scrollToY(destY);
					} else {
						//console.log("Dests: " + destX + " " + destY);
						self._scrollTouchToXY(destX, destY);
					}

					// return true if there was no movement so rest of the screen can scroll
					return startX === destX && startY === destY;
				},
				touchend: function () {
					var speedX = 0;
					var speedY = 0;

					//savedSpeedsX and savedSpeedsY have same length
					for (var i = self._savedSpeedsX.length - 1; i >= 0; i--) {
						speedX += self._savedSpeedsX[ i ];
						speedY += self._savedSpeedsY[ i ];
					}
					speedX = speedX / self._savedSpeedsX.length;
					speedY = speedY / self._savedSpeedsY.length;

					//Use the lastMovedX and lastMovedY to determine if the swipe stops without lifting the finger so we don't start inertia
					if ((Math.abs(speedX) > 0.1 || Math.abs(speedY) > 0.1) &&
							(Math.abs(self._lastMovedX) > 2 || Math.abs(self._lastMovedY) > 2)) {
						self._bStopInertia = false;
						self._showScrollBars(false, true);
						self._inertiaInit(speedX, speedY, self._bMixedEnvironment);
						moving = true;
					} else {
						self._hideScrollBars(true, true);
					}

					moving = false;
				},

				mouseenter: function () {
					self._mOverContainer = true;

					clearTimeout(self._hideScrollbarID);
					if (!self._toSimpleScrollbarID && !self._bMouseDownH && !self._bMouseDownV) {
						//We move the mouse inside the container but we weren't previously hovering the scrollbars (that's why we don't have _toSimpleScrollbarID for a timeout to switch to simple scrollbars).
						//So we instantly show simple scrollbars.
						self._showScrollBars(false, true);
					}
				},

				mouseleave: function () {
					self._mOverContainer = false;

					if(!self._bMouseDownH && !self._bMouseDownV) {
						//Hide scrollbars after 2 secs. We cencel the timeout if we enter scrollbars area.
						self._hideScrollbarID = setTimeout(function () {
							self._hideScrollBars(false);
						}, 2000)
					}
				}
			};
			(this._container).bind(self.evts);

			(this._container).bind({
				DOMMouseScroll: self.evts.wheel,
				MSPointerDown: self.evts.pointerdown
			});

			if ($("#grid1_scroll").length) {
				this.options.scrollbarHParent = $("#grid1_scroll");
				this.options.scrollbarVParent = $("#grid1_scroll");
			}

			this._createScrollBars();
			this._hideScrollBars(false);
			//this._showScrollBars(true, true, 0.01);

			this._trigger("rendered", {});
		},

		_getContentPositionX: function () {
			if (Modernizr.touch && !this._bMixedEnvironment) {
				var transform3d = this._content.css("-webkit-transform");
				var values = transform3d ? transform3d.match(/-?[\d\.]+/g) : undefined;
				var posX = values ? -Number(values[ 4 ]) : 0;

				return posX;
			} else {
				return this._container.scrollLeft();
			}
		},

		_getContentPositionY: function () {
			if (Modernizr.touch && !this._bMixedEnvironment) {
				var transform3d = this._content.css("-webkit-transform");
				var values = transform3d ? transform3d.match(/-?[\d\.]+/g) : undefined;
				var posY = values ? -Number(values[ 5 ]) : 0;

				return posY;
			} else {
				return this._container.scrollTop();
			}
		},

		_getScrollbarVPoisition: function() {
			if (this._linkedVBar) {
				return this._linkedVBar.scrollTop();
			} else {
				return this._getContentPositionY();
			}
		},

		_getScrollbarHPoisition: function () {
			if (this._linkedHBar) {
				return this._linkedHBar.scrollLeft();
			} else {
				return this._getContentPositionX();
			}
		},

		_initOptions: function (scrollOptions) {
			if (scrollOptions) {
				if (typeof scrollOptions.syncedElemsH !== "undefined") {
					this._linkElementsH(scrollOptions.syncedElemsH);
				}

				if (typeof scrollOptions.syncedElemsV !== "undefined") {
					this._linkElementsV(scrollOptions.syncedElemsV);
				}

				if (typeof scrollOptions.scrollbarH !== "undefined") {
					this.linkHScrollbar(scrollOptions.scrollbarH);
				}

				if (typeof scrollOptions.scrollbarV !== "undefined") {
					this.linkVScrollbar(scrollOptions.scrollbarV);
				}

				if (scrollOptions.scrollbarHParent) {
					var parentObject = $(scrollOptions.scrollbarHParent);

					if (parentObject.length) {
						this._HBarParent = parentObject;
					}
				}

				if (scrollOptions.scrollbarVParent) {
					var parentObject = $(scrollOptions.scrollbarVParent);

					if (parentObject.length) {
						this._VBarParent = parentObject;
					}
				}
			}
		},

		_setScrollWidth: function (inWidth) {
			/* Do NOT refresh after calling this function!!! The custom width will be lost. */
			this._elemWidth = this._container.width();
			this._contentWidth = inWidth;
			this._percentInViewH = this._elemWidth / this._contentWidth;
			this._isScrollableH = this._percentInViewH < 1;

			return this.element;
		},
		_setScrollHeight: function (inHeight) {
			/* Do NOT refresh after calling this function!!! The custom height will be lost. */
			this._elemHeight = this._container.innerHeight();
			this._contentHeight = inHeight;
			this._percentInViewV = this._elemHeight / this._contentHeight;
			this._isScrollableV = this._percentInViewV < 1;

			return this.element;
		},
		_refreshScrollbarsDrag: function () {
			if (!this.options.useNative && this._vBarDrag && this._hBarDrag) {
				var vDragHeight = this._elemHeight * this._percentInViewV;
				this._vBarDrag.css("height", vDragHeight + "px");

				var hDragWidth = this._container.width() * this._container.width() / this._content.width();
				this._hBarDrag.css("width", hDragWidth + "px");
			}
		},
		_linkElementsH: function (inElements) {
			this._linkedHElems = [];
			if (inElements) {
				for (var index in inElements) {
					var elemObject = $(inElements[ index ]);

					if (elemObject.length) {
						this._linkedHElems.push(elemObject);
					} else {
						console.log("Element does not exists");
					}
				}
			}

			return this._linkedHElems;
		},
		_linkElementsV: function (inElements) {
			this._linkedVElems = [];
			if (inElements) {
				for (var index in inElements) {
					var elemObject = $(inElements[ index ]);

					if (elemObject.length) {
						this._linkedVElems.push(elemObject);
					} else {
						console.log("Element does not exists");
					}
				}
			}

			return this._linkedVElems;
		},
		linkHScrollbar: function (inElement) {
			var self = this;

			if (inElement) {
				var elemObject = $(inElement);

				if (elemObject.length) {
					elemObject.bind({
						scroll: function (e) {
							var ignoreSync = self._ignoreHScrollBarEvents;
							self._ignoreHScrollBarEvents = false;

							if (ignoreSync || self.options.scrollOnlyHBar) {
								return false;
							} else {
								self._syncContentX(e.target, false);
								self._syncElemsX(e.target, false);
							}
						}
					});

					this._linkedHBar = elemObject;
				} else {
					console.log("Element does not exists");
				}
			}

			return this._linkedHBar;
		},
		linkVScrollbar: function (inElement) {
			var self = this;

			if (inElement) {
				var elemObject = $(inElement);

				if (elemObject.length) {
					elemObject.bind({
						scroll: function (e) {
							var ignoreSync = self._ignoreVScrollBarEvents;
							self._ignoreVScrollBarEvents = false;

							/* Ignore if we already moved the content and ignore if scrolling via linded bar is custom handled */
							if (ignoreSync || self.options.scrollOnlyVBar) {
								return false;
							} else {
								self._syncContentY(e.target, false);
								self._syncElemsY(e.target, false);
							}
						}

					});
					this._linkedVBar = elemObject;
				} else {
					console.log("Element does not exists");
				}
			}

			return this._linkedVBar;
		},

		_createScrollBars: function () {
			var self = this;

			if (this.options.useNative) {
				return;
			}

			if (this._isScrollableV) {
				this._initDesktopScrollBarV();
			}

			if (this._isScrollableH) {
				this._initDesktopScrollBarH();
			}
		},

		_initDesktopScrollBarV: function() {
			this._vBarContainer = $("<div id='" + this.element.attr("id") + "_vBar' class='igscroll-vcontainer'></div>")
				.css("height", this._elemHeight - 15 + "px");

			this._vBarArrowUp = $("<div id='" + this.element.attr("id") + "_vBar_arrowUp' class='igscroll-varrow igscroll-uparrow'></div>");
			this._vBarTrack = $("<div id='" + this.element.attr("id") + "_vBar_track' class='igscroll-vtrack'></div>")
				.css("height", this._elemHeight - (3 * 15) + "px");
			this._vBarArrowDown = $("<div id='" + this.element.attr("id") + "_vBar_arrowDown' class='igscroll-varrow igscroll-downarrow'></div>");

			this._vDragHeight = this._elemHeight * ((this._elemHeight - 2 * 15) / this._contentHeight);
			this._vBarDrag = $("<span id='" + this.element.attr("id") + "_vBar_drag' class='igscroll-vdrag'></span>")
				.css("height", this._vDragHeight + "px");
			
			if (this.options.scrollbarVParent) {
				this._vBarContainer.append(this._vBarArrowUp).append(this._vBarTrack.append(this._vBarDrag)).append(this._vBarArrowDown).appendTo(this.options.scrollbarVParent);
			} else {
				this._vBarContainer.append(this._vBarArrowUp).append(this._vBarTrack.append(this._vBarDrag)).append(this._vBarArrowDown).appendTo(this._container[0].parentElement);
			}

			this._bindDescktopScrollBarV();
		},
		
		_bindDescktopScrollBarV: function() {
			var self = this;
			this._holdTimeoutID = 0;
			var startX, startY,
				touchStartX,
				touchStartY,
				moving = false;

			this._bMouseDownV = false; //Used to track if mouse is holded on any of the vertical scrollbar elements
			this._bUseArrowUp = false; //Used to distinquis which on which element left mouse if being hold
			this._bUseArrowDown = false; //Used to distinquis which on which element left mouse if being hold
			this._bUseArrowLeft = false; //Used to distinquis which on which element left mouse if being hold
			this._bUseArrowRight = false; //Used to distinquis which on which element left mouse if being hold
			this._dragLastX = 0;
			this._dragLastY = 0;
			this._bUseVDrag = false; //Used to distinquis which on which element left mouse if being hold
			this._bUseHDrag = false; //Used to distinquis which on which element left mouse if being hold

			var commonEvts = {
				mouseenter: function () {
					self._mOverScrollbars = true;

					//Cancels the hide scrollbars timeout
					clearTimeout(self._hideScrollbarID);

					//Cancel any timeout set to switch to simple scrollbar. Makes sure we don't switch to simple while we still hover over the scrollbars.
					clearTimeout(self._toSimpleScrollbarID);
					self._toSimpleScrollbarID = 0;

					self._showScrollBars(false);
				},

				mouseleave: function () {
					self._mOverScrollbars = false;

					if (!self._bMouseDownV) {
						//Hide scrollbars after 2 secconds. This will be canceled if we go the scrollable content or any other element of the scrollbars by _hideScrollbarID
						self._hideScrollbarID = setTimeout(function () {
							self._hideScrollBars(false);
						}, 2000)

						//Switch to simple scrollbar (i.e. only drag bar showing with no arrows) after timeout of 2sec
						self._toSimpleScrollbarID = setTimeout(function () {
							self._toSimpleScrollbar();
							self._toSimpleScrollbarID = 0;
						}, 2000);
					}
				},

				touchstart: function () {
					return false;
				}
			};

			function scrollTimeoutY(step) {
				var curPosY = self._getContentPositionY();
				self._scrollToY(curPosY + step);

				self._holdTimeoutID = setTimeout(function () { scrollTimeoutY(step) }, 50);
			}

			if (this._vBarArrowUp)  {
				this._vBarArrowUp.bind({
					mousedown: function () {
						self._bMouseDownV = true;
						self._bUseArrowUp = true;
						self._vBarArrowUp.switchClass("igscroll-uparrow", "igscroll-uparrow-active");

						var curPosY = self._getContentPositionY();
						self._scrollToY(curPosY - 40);
						self._holdTimeoutID = setTimeout(function () { scrollTimeoutY(-40) }, 250);

						return false;
					},

					mouseup: function () {
						self._bMouseDownV = false;
						self._bUseArrowUp = false;
						self._vBarArrowUp.switchClass("igscroll-uparrow-active", "igscroll-uparrow");
						clearTimeout(self._holdTimeoutID);
					},

					mouseover: function () {
						if (self._bMouseDownV && self._bUseArrowUp) {
							scrollTimeoutY(-40);
						}
					},

					touchstart: commonEvts.touchstart,
					mouseout: commonEvts.clearHold,
					mouseenter: commonEvts.mouseenter,
					mouseleave: commonEvts.mouseleave
				});
			}

			if (this._vBarArrowDown) {
				this._vBarArrowDown.bind({
					mousedown: function () {
						self._bMouseDownV = true;
						self._bUseArrowDown = true;
						self._vBarArrowDown.switchClass("igscroll-downarrow", "igscroll-downarrow-active");

						var curPosY = self._getContentPositionY();
						self._scrollToY(curPosY + 40);
						self._holdTimeoutID = setTimeout(function () { scrollTimeoutY(40) }, 250);

						return false;
					},

					mouseup: function () {
						self._bMouseDownV = false;
						self._bUseArrowDown = true;
						self._vBarArrowDown.switchClass("igscroll-downarrow-active", "igscroll-downarrow");
						clearTimeout(self._holdTimeoutID);
					},

					mouseover: function () {
						if (self._bMouseDownV && self._bUseArrowDown) {
							scrollTimeoutY(40);
						}
					},

					touchstart: commonEvts.touchstart,
					mouseout: commonEvts.clearHold,
					mouseenter: commonEvts.mouseenter,
					mouseleave: commonEvts.mouseleave
				});
			}

			if (this._vBarDrag) {
				this._vBarDrag.bind({
					mousedown: function(evt) {
						self._bMouseDownV = true;
						self._dragLastY = evt.pageY;
						self._bUseVDrag = true;
						self._bUseHDrag = false;
					},

					touchstart: commonEvts.touchstart,
				});
			}

			if (this._vBarTrack) {
				this._vBarTrack.bind({
					mousedown: function (evt) {
						if (evt.target.id == self._vBarDrag[0].id) {
							return false;
						}

						var matrix = self._vBarDrag.css("-webkit-transform"),
							values = matrix ? matrix.match(/-?[\d\.]+/g) : undefined,
							dragStartY = values ? Number(values[ 5 ]) : 0;

						var curPosY = self._getContentPositionY(),
							scrollStep = self._contentHeight * self._percentInViewV;

						if (evt.offsetY > dragStartY + self._vDragHeight) {
							/* Scroll down */
							self._scrollToY(curPosY + scrollStep);
							self._holdTimeoutID = setTimeout(function () { scrollTimeoutY(scrollStep) }, 250);
						} else if (evt.offsetY < dragStartY) {
							/* Scroll up */
							self._scrollToY(curPosY - scrollStep);
							self._holdTimeoutID = setTimeout(function () { scrollTimeoutY(-scrollStep) }, 250);
						}

						return false;
					},

					touchstart: commonEvts.touchstart,
					mouseup: commonEvts.clearHold,
					mouseout: commonEvts.clearHold,
					mouseenter: commonEvts.mouseenter,
					mouseleave: commonEvts.mouseleave
				});
			}

			if (this._vBarContainer) {
				this._vBarContainer.bind({
					wheel: self.evts.wheel
				});
			}

			$("body").on("mousemove", function (evt) {
				/* Ensures if we move the mouse of the bounds of the vertical scroll bar and we are still holding left mouse button that when we move the mouse up/down we will continue to scroll */
				if (!self._bMouseDownV || !self._bUseVDrag) {
					return;
				}
				var offset;

				if (self._bUseVDrag) {
					var curPosY = self._getContentPositionY();
					offset = evt.pageY - self._dragLastY;
					var nextPosY = curPosY + (offset * (self._contentHeight / (self._elemHeight - 3 * 17)));
					
					self._scrollToY(nextPosY);
					self._dragLastY = evt.pageY;
				}

				return false;
			});

			$(window).mouseup(function () {
				/* Ensures when the left mouse button is realeas that all properties are back to their default state */
				/* Works even if the mouse is out of the browser boundries and we release the left mouse button */
				if (self._bUseArrowUp) {
					self._bUseArrowUp = false;
					self._vBarArrowUp.switchClass("igscroll-uparrow-active", "igscroll-uparrow");
				}
				if (self._bUseArrowDown) {
					self._bUseArrowDown = false;
					self._vBarArrowDown.switchClass("igscroll-downarrow-active", "igscroll-downarrow");
				}

				//If the mouse was previously hold over an element an we release it.
				if (self._bMouseDownV && !self._mOverScrollbars && !self._mOverContainer) {
					/** Scenario: 
					*	1. Click and hold a horizontal scrollbar element
					*	2. Move the mouse outside the scrollable container
					*	3. Release the mouse
					*
					*	We hide the scrollbar after 2 secs since the mouse is outside the scrollable content
					*/
					self._hideScrollbarID = setTimeout(function () {
						self._hideScrollBars(false);
					}, 2000)

				} else if (self._bMouseDownV && !self._mOverScrollbars && self._mOverContainer) {
					/** Scenario: 
					*	1. Click and hold a horizontal scrollbar element
					*	2. Move the mouse inside the scrollable container
					*	3. Release the mouse
					*
					*	We don't hide the scrollbar this time but switch to simple after 2 secs
					*/
					self._toSimpleScrollbarID = setTimeout(function () {
						self._toSimpleScrollbar();
						self._toSimpleScrollbarID = 0;
					}, 2000);
				}
				self._bMouseDownV = false;
				self._bUseVDrag = false;

				return false;
			});
		},

		_initDesktopScrollBarH: function () {
			this._hBarContainer = $("<div id='" + this.element.attr("id") + "_hBar' class='igscroll-hcontainer'></div>")
				.css("width", this._elemWidth + "px");

			this._hBarArrowLeft = $("<div id='" + this.element.attr("id") + "_hBar_arrowLeft' class='igscroll-harrow igscroll-leftarrow'></div>");
			this._hBarTrack = $("<div id='" + this.element.attr("id") + "_hBar_track' class='igscroll-htrack'></div>")
				.css("width", this._elemWidth - (3 * 15) + "px");
			this._hBarArrowRight = $("<div id='" + this.element.attr("id") + "_hBar_arrowRight' class='igscroll-harrow igscroll-rightarrow'></div>");

			this._hDragWidth = this._elemWidth * this._percentInViewH - 3 * 15;
			this._hBarDrag = $("<span id='" + this.element.attr("id") + "_hBar_drag' class='igscroll-hdrag'></span>")
				.css("width", this._hDragWidth + "px");

			if (this.options.scrollbarHParent) {
				this._hBarContainer
					.append(this._hBarArrowLeft)
					.append(this._hBarTrack.append(this._hBarDrag))
					.append(this._hBarArrowRight)
					.appendTo(this.options.scrollbarHParent);
			} else {
				this._hBarContainer
					.append(this._hBarArrowLeft)
					.append(this._hBarTrack.append(this._hBarDrag))
					.append(this._hBarArrowRight)
					.appendTo(this._container[0].parentElement);
			}

			this._bindDescktopScrollBarH();
		},

		_bindDescktopScrollBarH: function() {
			var self = this;

			this._holdTimeoutID = 0;
			this._bMouseDownH = false;
			this._bTouchEnd = false;

			var commonEvts = {
				mouseenter: function () {
					self._mOverScrollbars = true;

					//Cancels the hide scrollbars timeout
					clearTimeout(self._hideScrollbarID);

					//Cancel any timeout set to switch to simple scrollbar. Makes sure we don't switch to simple while we still hover over the scrollbars.
					clearTimeout(self._toSimpleScrollbarID);
					self._toSimpleScrollbarID = 0;

					self._showScrollBars(false);
				},

				mouseleave: function () {
					self._mOverScrollbars = false;

					if (!self._bMouseDownH) {
						//Hide scrollbars after 2 secconds. This will be canceled if we go the scrollable content or any other element of the scrollbars by _hideScrollbarID
						self._hideScrollbarID = setTimeout(function () {
							self._hideScrollBars(false);
						}, 2000)

						//Switch to simple scrollbar (i.e. only drag bar showing with no arrows) after timeout of 2sec
						self._toSimpleScrollbarID = setTimeout(function () {
							self._toSimpleScrollbar();
							self._toSimpleScrollbarID = 0;
						}, 2000);
					}
				},

				touchstart: function () {
					return false;
				}
			};

			function scrollTimeoutX(step) {
				var curPosY = self._getContentPositionX();
				self._scrollToX(curPosY + step);

				self._holdTimeoutID = setTimeout(function () { scrollTimeoutX(step); }, 50);
			}

			if (this._hBarArrowLeft) {
				this._hBarArrowLeft.bind({
					mousedown: function () {
						self._bMouseDownH = true;
						self._bUseArrowLeft = true;
						self._hBarArrowLeft.switchClass("igscroll-leftarrow", "igscroll-leftarrow-active");

						var curPosX = self._getContentPositionX();
						self._scrollToX(curPosX - 40);
						self._holdTimeoutID = setTimeout(function () { scrollTimeoutX(-40); }, 250);

						return false;
					},

					mouseup: function () {
						self._bMouseDownH = false;
						self._bUseArrowLeft = false;
						self._hBarArrowLeft.switchClass("igscroll-leftarrow-active", "igscroll-leftarrow");

						clearTimeout(self._holdTimeoutID);
					},

					mouseover: function () {
						if (self._bMouseDownH && self._bUseArrowLeft) {
							scrollTimeoutX(-40);
						}
					},

					mouseout: function () {
						clearTimeout(self._holdTimeoutID);
					},

					touchstart: commonEvts.touchstart,
					mouseenter: commonEvts.mouseenter,
					mouseleave: commonEvts.mouseleave
				});
			}

			if (this._hBarArrowRight) {
				this._hBarArrowRight.bind({
					mousedown: function () {
						if (self._bTouchEnd) {
							self._bTouchEnd = false;
							return;
						}

						self._bMouseDownH = true;
						self._bUseArrowRight = true;
						self._hBarArrowRight.switchClass("igscroll-rightarrow", "igscroll-rightarrow-active");

						var curPosX = self._getContentPositionX();
						self._scrollToX(curPosX + 40);
						self._holdTimeoutID = setTimeout(function () { scrollTimeoutX(40); }, 250);

						return false;
					},

					mouseup: function () {
						self._bMouseDownH = false;
						self._bUseArrowRight = false;
						self._hBarArrowRight.switchClass("igscroll-rightarrow-active", "igscroll-rightarrow");

						clearTimeout(self._holdTimeoutID);
					},

					mouseover: function () {
						if (self._bMouseDownH && self._bUseArrowRight) {
							scrollTimeoutX(40);
						}
					},

					mouseout: function () {
						clearTimeout(self._holdTimeoutID);
					},


					touchstart: commonEvts.touchstart,
					mouseenter: commonEvts.mouseenter,
					mouseleave: commonEvts.mouseleave
				});
			}

			if (this._hBarDrag) {
				this._hBarDrag.bind({
					mousedown: function (evt) {
						self._bMouseDownH = true;
						self._dragLastX = evt.pageX;
						self._bUseVDrag = false;
						self._bUseHDrag = true;
					},

					touchstart: commonEvts.touchstart
				});
			}

			if (this._hBarTrack) {
				this._hBarTrack.bind({
					mousedown: function (evt) {
						if (evt.target.id == self._hBarDrag[ 0 ].id) {
							return false;
						}

						var matrix = self._hBarDrag.css("-webkit-transform"),
							values = matrix ? matrix.match(/-?[\d\.]+/g) : undefined,
							dragStartX = values ? Number(values[ 4 ]) : 0;

						var curPosX = self._getContentPositionX(),
							scrollStep = self._contentWidth * self._percentInViewH;

						if (evt.offsetX > dragStartX + self._hDragWidth) {
							//scroll right
							self._scrollToX(curPosX + scrollStep);
							self._holdTimeoutID = setTimeout(function () { scrollTimeoutX(scrollStep); }, 250);
						} else if (evt.offsetX < dragStartX) {
							//scroll left
							self._scrollToX(curPosX - scrollStep);
							self._holdTimeoutID = setTimeout(function () { scrollTimeoutX(-scrollStep); }, 250);
						}

						return false;
					},

					mouseup: function () {
						clearTimeout(self._holdTimeoutID);
					},

					mouseout: function () {
						clearTimeout(self._holdTimeoutID);
					},

					touchstart: commonEvts.touchstart,
					mouseenter: commonEvts.mouseenter,
					mouseleave: commonEvts.mouseleave,
				});
			}

			if (this._hBarContainer) {
				this._hBarContainer.bind({
					wheel: self.evts.wheel
				});
			}

			$("body").on("mousemove", function (evt) {
				/* Ensures if we move the mouse of the bounds of the horizontal scroll bar and we are still holding left mouse button that when we move the mouse left/right we will continue to scroll */
				if (!self._bMouseDownH || !self._bUseHDrag) {
					return;
				}
				var offset;

				if (self._bUseHDrag) {
					var curPosX = self._getContentPositionX();
					offset = evt.pageX - self._dragLastX;

					self._scrollToX(curPosX + (offset * (self._contentWidth / self._elemWidth)));
					self._dragLastX = evt.pageX;
				}

				return false;
			});

			$(window).mouseup(function () {
				/* Ensures when the left mouse button is realeas that all properties are back to their default state */
				/* Works even if the mouse is out of the browser boundries and we release the left mouse button */
				if (self._bUseArrowLeft) {
					self._bUseArrowLeft = false;
					self._hBarArrowLeft.switchClass("igscroll-leftarrow-active", "igscroll-leftarrow");
				}
				if (self._bUseArrowRight) {
					self._bUseArrowRight = false;
					self._hBarArrowRight.switchClass("igscroll-rightarrow-active", "igscroll-rightarrow");
				}

				//If the mouse was previously hold over an element an we release it.
				if (self._bMouseDownH && !self._mOverScrollbars && !self._mOverContainer) {
					/** Scenario: 
					*	1. Click and hold a horizontal scrollbar element
					*	2. Move the mouse outside the scrollable container
					*	3. Release the mouse
					*
					*	We hide the scrollbar after 2 secs since the mouse is outside the scrollable content
					*/
					self._hideScrollbarID = setTimeout(function () {
						self._hideScrollBars(false);
					}, 2000)
				} else if (self._bMouseDownH && !self._mOverScrollbars && self._mOverContainer) {
					/** Scenario: 
					*	1. Click and hold a horizontal scrollbar element
					*	2. Move the mouse inside the scrollable container
					*	3. Release the mouse
					*
					*	We don't hide the scrollbar this time but switch to simple after 2 secs
					*/
					self._toSimpleScrollbarID = setTimeout(function () {
						self._toSimpleScrollbar();
						self._toSimpleScrollbarID = 0;
					}, 2000);
				}
				self._bMouseDownH = false;
				self._bUseHDrag = false;

				return false;
			});
		},

		_removeScrollbarV: function () {
			_remove(this._vBarContainer);
		},

		_removeScrollbarH: function() {
			_remove(this._hBarContainer);
		},

		/** Shows the mobile/touch scrollbars when they are hidden.
		*
		*	animate - true/false if hide the scrollbar slowly with animation and not momentarily
		*	bDragOnly - show only the drag button. Used when using simple scrollbars
		*/
		_showScrollBars: function (animate, bDragOnly, hideAfterShown, opacityStep) {
			var self = this,
				targetOpacty = 0.9,
				currentOpacity = 0,
				animationId;

			function showStep() {
				if (currentOpacity > targetOpacty) {
					/* end */
					if (hideAfterShown) {
						self._hideScrollBars(true, opacityStep);
					}

					self._touchBarsShown = true;
					cancelAnimationFrame(animationId);
					return;
				}

				if (bDragOnly) {
					self._setSimpleScrollBarOpacity(currentOpacity);
				} else {
					self._setScrollBarsOpacity(currentOpacity);
				}				
				currentOpacity += opacityStep ? opacityStep : 0.05;

				/* continue */
				animationId = requestAnimationFrame(showStep);
			}

			if (!animate) {
				if (bDragOnly) {
					self._setSimpleScrollBarOpacity(targetOpacty);
				} else {
					self._setScrollBarsOpacity(targetOpacty);
				}

				self._touchBarsShown = true;
			} else {
				animationId = requestAnimationFrame(showStep);
			}
		},

		_updateScrollBars: function (destX, destY, noTransform) {
			var self = this,
				animationID;

			function updateCSS() {
				if (self._hBarDrag) {
					self._hBarDrag
						.css("-webkit-transform", "translate3d(" + destX * self._percentInViewH + "px, 0px, 0px)") /* Safari */
						.css("-moz-transform", "translate3d(" + destX * self._percentInViewH + "px, 0px, 0px)") /* Mozilla */
						.css("-ms-transform", "translate3d(" + destX * self._percentInViewH + "px, 0px, 0px)") /* IE */
						.css("-o-transform", "translate3d(" + destX * self._percentInViewH + "px, 0px, 0px)") /* Opera */
						.css("transform", "translate3d(" + destX * self._percentInViewH + "px, 0px, 0px)"); /* Other */
				}
				if (self._vBarDrag) {
					var calculatedDest = 0;
					if (Modernizr.touch) {
						calculatedDest = destY * self._percentInViewV;
					} else {
						calculatedDest = destY * (self._elemHeight - 3 * 15) / self._contentHeight;
					}

					self._vBarDrag
						.css("-webkit-transform", "translate3d(0px, " + calculatedDest + "px, 0px)")
						.css("-moz-transform", "translate3d(0px, " + calculatedDest + "px, 0px)")
						.css("-ms-transform", "translate3d(0px, " + calculatedDest + "px, 0px)")
						.css("-o-transform", "translate3d(0px, " + calculatedDest + "px, 0px)")
						.css("transform", "translate3d(0px, " + calculatedDest + "px, 0px)");
				}
			}

			/* calculate the css style before the next frame so we don't slow down the scrolling */
			animationID = requestAnimationFrame(updateCSS);
		},

		/** Hides the mobile/touch scrollbars.
		*
		*	animate - true/false if hide the scrollbar slowly with animation and not momentarily
		*	waitForBarsToShow - makes sure to wait wiht the hiding in the case where the scrollbars are in a proccess of showing and are not fully shown
		*	bDragOnly - hide only the drag button. Used when using simple scrollbars
		*/
		_hideScrollBars: function (animate, bDragOnly, opacityStep) {
			var self = this,
				targetOpacty = 0,
				currentOpacity = this._vBarDrag ? this._vBarDrag.css("opacity") : 0,
				animationId;

			if (this.options.alwaysVisibleBars || currentOpacity <= 0) {
				return;
			}

			function fadeStep() {
				if (currentOpacity < targetOpacty) {
					/* end */
					self._setScrollBarsOpacity(currentOpacity);
					self._touchBarsShown = false;
					cancelAnimationFrame(animationId);
					return;
				}

				if (bDragOnly) {
					self._setSimpleScrollBarOpacity(currentOpacity);
				} else {
					self._setScrollBarsOpacity(currentOpacity);
				}
				currentOpacity -= opacityStep ? opacityStep : 0.05;

				/* continue */
				animationId = requestAnimationFrame(fadeStep);
			}

			if (!animate) {
				if (bDragOnly) {
					self._setSimpleScrollBarOpacity(targetOpacty);
				} else {
					self._setScrollBarsOpacity(targetOpacty);
				}

				self._touchBarsShown = false;
			} else {
				animationId = requestAnimationFrame(fadeStep);
			}
		},

		_setSimpleScrollBarOpacity: function (newOpacity) {
			if (this._vBarDrag && (this._percentInViewV < 1)) {
				this._vBarDrag.css("opacity", newOpacity);
			} else if (this._vBarDrag && this._percentInViewV >= 1) {
				this._vBarDrag.css("opacity", 0);
			}

			if (this._hBarDrag && this._percentInViewH < 1) {
				this._hBarDrag
					.css("height", 5 + "px")
					.css("top", 5 + "px")
					.css("opacity", newOpacity);
			} else if (this._hBarDrag && this._percentInViewH >= 1) {
				this._hBarDrag.css("opacity", 0);
			}
		},

		/** Sets the mobile scrollbars opacity. */
		_setScrollBarsOpacity: function (newOpacity) {
			if (this._vBarDrag && (this._percentInViewV < 1)) {
				this._vBarDrag.css("opacity", newOpacity);
				this._vBarArrowUp.css("opacity", newOpacity);
				this._vBarArrowDown.css("opacity", newOpacity);
			} else if (this._vBarDrag && this._percentInViewV >= 1) {
				this._vBarDrag.css("opacity", 0);
				this._vBarArrowUp.css("opacity", 0);
				this._vBarArrowDown.css("opacity", 0);
			}

			if (this._hBarDrag && this._percentInViewH < 1) {
				this._hBarDrag
					.css("height", 9 + "px")
					.css("top", 3 + "px")
					.css("opacity", newOpacity);
				this._hBarArrowLeft.css("opacity", newOpacity);
				this._hBarArrowRight.css("opacity", newOpacity);
			} else if (this._hBarDrag && this._percentInViewH >= 1) {
				this._hBarDrag.css("opacity", 0);
				this._hBarArrowLeft.css("opacity", 0);
				this._hBarArrowRight.css("opacity", 0);
			}
		},


		_toSimpleScrollbar: function () {
			if (this._vBarDrag && (this._percentInViewV < 1)) {
				this._vBarArrowUp.css("opacity", 0);
				this._vBarArrowDown.css("opacity", 0);
			} else if (this._vBarDrag && this._percentInViewV >= 1) {
				this._vBarDrag.css("opacity", 0);
				this._vBarArrowUp.css("opacity", 0);
				this._vBarArrowDown.css("opacity", 0);
			}

			if (this._hBarDrag && this._percentInViewH < 1) {
				this._hBarDrag
					.css("height", 5 + "px")
					.css("top", 5 + "px");
				this._hBarArrowLeft.css("opacity", 0);
				this._hBarArrowRight.css("opacity", 0);
			} else if (this._hBarDrag && this._percentInViewH >= 1) {
				this._hBarDrag.css("opacity", 0);
				this._vBarArrowUp.css("opacity", 0);
				this._vBarArrowDown.css("opacity", 0);
			}
		},

		/** Scrolls content to on the X axis using scrollLeft */
		_scrollToX: function (destX) {
			if (!this._isScrollableH && !this.options.scrollOnlyHBar) {
				return;
			}

			if (this.options.scrollOnlyHBar) {
				this._moveHBarX(destX);
			} else {
				if (destX === undefined || destX < 0) {
					destX = 0;
				} else if (destX > this._contentWidth - this._dragMaxX) {
					destX = this._contentWidth - this._dragMaxX;
				}

				this._container.scrollLeft(destX); //No need to check if destY < 0 or > of the content heigh. ScrollLeft handles that.
				this._syncElemsX(this._container[ 0 ], false);
				//self._syncHBar(this._container[ 0 ], false);

				var curY = this._getContentPositionY();
				this._updateScrollBars(destX, curY, true);
			}
		},

		/** Scrolls content to on the Y axis using scrollTop */
		_scrollToY: function (destY) {
			if (!this._isScrollableV && !this.options.scrollOnlyVBar) {
				return;
			}

			if (this.options.scrollOnlyVBar) {
				this._moveVBarY(destY);
			} else {
				if (destY === undefined || destY < 0) {
					destY = 0;
				} else if (destY > this._contentHeight - this._dragMaxY) {
					destY = this._contentHeight - this._dragMaxY;
				}

				this._container.scrollTop(destY); //No need to check if destY < 0 or > of the content heigh. ScrollTop handles that.
				this._syncElemsY(this._container[ 0 ], false);
				//this._syncVBar(this._container[ 0 ], false);

				var curX = this._getContentPositionX();
				this._updateScrollBars(curX, destY, true);
			}
		},

		/** Scroll with predefined inertia that start slowly, speeds up and then slows down again */
		_smoothWheelScrollY: function (deltaY) {
			var self = this,
				smoothingStep = this.options.smoothingStep,
				smoothingDuration = this.options.smoothingDuration,
				animationId;

			//We use the formula for parabola y = -3*x*x + 3 to simulate smooth inertia that slows down
			var x = -1;
			if (this.options.scrollOnlyVBar) {
				self._nextY = this._getScrollbarVPoisition();
			} else {
				self._nextY = this._getContentPositionY();
			}

			function inertiaStep() {
				if (x > 1) {
					cancelAnimationFrame(animationId);
					return;
				}
				self._nextY += ((-3 * x * x + 3) * (deltaY > 0 ? 1 : -1) * 2) * smoothingStep;
				self._scrollToY(self._nextY);

				//continue the intertia
				x += 0.08 * (1 / smoothingDuration);
				animationId = requestAnimationFrame(inertiaStep);
			}

			//Start the inertia and continue it recursively
			animationId = requestAnimationFrame(inertiaStep);
		},

		/** Scroll content on the X and Y axis using 3d accelerated transformation. This makes scrolling on touch devices faster */
		_scrollTouchToXY: function (destX, destY) {
			var self = this;

			if (destX === undefined || destX < 0) {
				destX = 0;
			} else if (destX > this._contentWidth - this._dragMaxX) {
				destX = this._contentWidth - this._dragMaxX;
			}

			//Only use vertical scroll specific
			if (this.options.scrollOnlyVBar) {
				this._content.css({
					"-webkit-transform": "translate3d(" + (-destX) + "px, 0px, 0px)" /* Chrome, Safari, Opera */
				});
				self._scrollToY(destY);

				/* Sync other elements */
				destY = this._getScrollbarVPoisition();
				self._updateScrollBars(destX, destY);
				self._syncElemsX(this._content, true, -destX, true);
				/* self._syncHBar(this._content, true); */
				return;
			}

			if (destY === undefined || destY < 0) {
				destY = 0;
			} else if (destY > this._contentHeight - this._dragMaxY) {
				destY = this._contentHeight - this._dragMaxY;
			}

			var distanceLeftX = -destX;
			var distanceTopY = -destY;

			if (!this.options.scrollOnlyVBar) {
				this._content.css({
					"-webkit-transform": "translate3d(" + distanceLeftX + "px," + distanceTopY + "px, 0px)" /* Chrome, Safari, Opera */
				});
			}

			/* Sync other elements */
			self._syncElemsX(this._content, true);
			self._syncElemsY(this._content, true);
			self._updateScrollBars(destX, destY);

			//No need to sync these bars since they don't show on safari and we use custom ones.
			//self._syncHBar(this._content, true);
			self._syncVBar(this._content, true);
		},

		/** Initialize main inertia based on the X and Y speeds. Used on touch devices. */
		_inertiaInit: function (speedX, speedY, bDefaultScroll) {
			var self = this,
				x = 0,
				stepModifer = this.options.smoothingStep,
				inertiaDuration = this.options.smoothingDuration,
				animationID;

			self._nextX = self._getContentPositionX();
			if (this.options.scrollOnlyVBar) {
				self._nextY = self._getScrollbarVPoisition();
			} else {
				self._nextY = self._getContentPositionY();
			}

			//Sets timeout until executing next movement iteration of the inertia
			function inertiaStep(time) {
				//If inertia is interupted we do not hide the bars here but on endtouch in case another inertia is initiated
				if (self._bStopInertia) {
					//we don't hide the scrollbars, because the inertia is interrupted by touch and we hide it on touchend then
					cancelAnimationFrame(animationID);
					return;
				}

				if (x > 6) {
					self._hideScrollBars(true, true); //hide scrollbars when inertia ends naturally
					cancelAnimationFrame(animationID);
					return;
				}

				if (Math.abs(speedX) > Math.abs(speedY)) {
					x += 0.05 / (1 * inertiaDuration);
				} else {
					x += 0.05 / (1 * inertiaDuration);
				}

				if (x <= 1) {
					//We use constant quation to determine the offset without speed falloff befor x reaches 1
					self._nextX += 1 * speedX * 15 * stepModifer;
					self._nextY += 1 * speedY * 15 * stepModifer;
				} else {
					//We use the quation "y = 2 / (x + 0.55) - 0.3" to determine the offset
					self._nextX += Math.abs(2 / (x + 0.55) - 0.3) * speedX * 15 * stepModifer;
					self._nextY += Math.abs(2 / (x + 0.55) - 0.3) * speedY * 15 * stepModifer;
				}

				//If we have mixed environment we use the default behaviour. i.e. touchscreen + mouse
				if (bDefaultScroll) {
					self._scrollToX(self._nextX);
					self._scrollToY(self._nextY);
				} else {
					self._scrollTouchToXY(self._nextX, self._nextY);
				}

				animationID = requestAnimationFrame(inertiaStep);
			}

			//Start inertia and continue it recursively
			animationID = requestAnimationFrame(inertiaStep);
		},

		/** Get the speed slope angle for the last 5 recorded speeds.
		*	This is used to determine if speed is decreasing(slope angle < 0) or increasing(slope angle > 0) based on those last speeds
		*	The technique used here is the same used in calculating trendlines.
		*/
		_getSpeedSlope: function (inLastFiveSpeeds) {
			/** slope < 0 means that there is increase in speed and can start inertia */
			if (inLastFiveSpeeds.length === 0) {
				/*no movement*/
				return 1;
			}
			if (inLastFiveSpeeds.length < 5) {
				/* too quick movement */
				return -1;
			}

			/** We try to represent the 5 recorded speeds as points on a coordinate system and then calculate the slope similar to a trendline
			*	Since we only have one value per record, we will represent the values for (x,y) like: (1, speed1), (2, speed2) ,(3, speed3), (4, speed4), (5, speed5)
			*
			*	Vars:
			*	sumXY - sum of the
			*	sumX - sum of all X coordinates
			*	sumY - sum of all Y coordinates
			*	sumXX - numPoints * (pointX[0]^2 + pointX[1]^2 + pointX[2]^2 + pointX[3]^2 + pointX[4]^2 + pointX[5]^2)
			*/
			var numPoints = inLastFiveSpeeds.length,
				sumXY = 0, sumX = 0, sumY = 0, sumXX = 0;

			for (var pointIndex = 0; pointIndex < numPoints ; pointIndex++) {
				/* pointX - The x coordinate for the [pointIndex] speed */
				/* pointY - The y coordinate for the [pointIndex] speed */
				var pointX = pointIndex,
					pointY = Math.abs(inLastFiveSpeeds[ pointIndex ]);

				sumXY += pointX * pointY;
				sumX += pointX;
				sumY += pointY;
				sumXX += pointX * pointX;
			}

			var slopeAngle = (numPoints * sumXY - sumX * sumY) / (numPoints * sumXX - sumX * sumX);

			return slopeAngle;
		},

		/** Syncs the main content element horizontally */
		_syncContentX: function (baseElem, useTransform) {
			var self = this,
				destX, destY;

			if (!baseElem) {
				return;
			}

			if (useTransform) {
				destX = self._getContentPositionX();
				destY = self._getContentPositionY();

				this._content.css({
					"-webkit-transform": "translate3d(" + destX + "px," + destY + "px, 0px)" /* Chrome, Safari, Opera */
				});

			} else {
				destX = baseElem.scrollLeft;

				this._container.scrollLeft(destX);
			}
		},

		/** Syncs the main content element vertically */
		_syncContentY: function (baseElem, useTransform) {
			var self = this,
				destX, destY;

			if (!baseElem) {
				return;
			}

			if (useTransform) {
				destX = self._getContentPositionX();
				destY = self._getContentPositionY();

				this._content.css({
					"-webkit-transform": "translate3d(" + destX + "px," + destY + "px, 0px)" /* Chrome, Safari, Opera */
				});

			} else {
				destY = baseElem.scrollTop;

				this._container.scrollTop(destY);
			}
		},

		//Syncs elements that are linked on X axis
		_syncElemsX: function (baseElem, useTransform, inDestX, useDestination) {
			var self = this,
				destX, index;

			if (!baseElem && !useDestination) {
				return;
			}

			if (useTransform) {
				if (!useDestination) {
					var matrix = this._content.css("-webkit-transform");
					var values = matrix ? matrix.match(/-?[\d\.]+/g) : undefined;
					destX = values ? Number(values[ 4 ]) : -this._getContentPositionX();
				} else {
					destX = inDestX;
				}

				if (this._linkedHElems.length > 0) {
					for (index in this._linkedHElems) {
						this._linkedHElems[ index ].css({
							"-webkit-transform": "translate3d(" + destX + "px,0px, 0px)"
						});
					}
				}
			} else {
				destX = baseElem.scrollLeft;

				if (this._linkedHElems.length > 0) {
					for (index in this._linkedHElems) {
						if (this._linkedHElems[ index ][ 0 ]) {
							this._linkedHElems[ index ][ 0 ].parentElement.scrollLeft = destX;
						}

					}
				}
			}
		},

		//Syncs elements that are linked on Y axis
		_syncElemsY: function (baseElem, useTransform, inDestY, useDestination) {
			var destY, index;

			if (!baseElem && !useDestination) {
				return;
			}

			if (useTransform) {
				if (!useDestination) {
					var matrix = this._content.css("-webkit-transform");
					var values = matrix ? matrix.match(/-?[\d\.]+/g) : undefined;
					destY = values ? Number(values[ 5 ]) : -this._getContentPositionY();
				} else {
					destY = inDestY;
				}

				if (this._linkedVElems.length > 0) {
					for (index in this._linkedVElems) {
						//get the current X position
						var matrixElem = this._linkedVElems[ index ].css("-webkit-transform");
						var valuesElem = matrixElem ? matrixElem.match(/-?[\d\.]+/g) : undefined;
						var destX = valuesElem ? Number(valuesElem[ 4 ]) : -this._getContentPositionX();

						this._linkedVElems[ index ].css({
							"-webkit-transform": "translate3d(" + destX + "px," + destY + "px, 0px)"
						});
					}
				}
			} else {
				destY = baseElem.scrollTop;

				if (this._linkedVElems.length > 0) {
					for (index in this._linkedVElems) {
						if (this._linkedVElems[ index ][ 0 ]) {
							this._linkedVElems[ index ][ 0 ].parentElement.scrollTop = destY;
						}

					}
				}
			}
		},

		//Syncs horizontal bars that are linked on the X axis
		_syncHBar: function (baseElem, useTransform) {
			if (!baseElem) {
				return;
			}

			var destX;
			if (useTransform) {
				destX = this._getContentPositionX();
			} else {
				destX = baseElem.scrollLeft;
			}

			if (this._linkedHBar) {
				self._ignoreHScrollBarEvents = true;
				this._linkedHBar.scrollLeft(destX);
			}
		},

		//Syncs vertical bars that are linked on the Y axis
		_syncVBar: function (baseElem, useTransform) {
			if (!baseElem) {
				return;
			}

			var destY;
			if (useTransform) {
				destY = this._getContentPositionY();
				var calculatedDestY = 0;
				if (Modernizr.touch) {
					calculatedDestY = destY * this._percentInViewV;
				} else {
					calculatedDestY = destY * (this._elemHeight - 3 * 17) / this._contentHeight;
				}

				if (this.options.scrollbarV) {
					this.options.scrollbarV.css({
						"-webkit-transform": "translate3d(0px," + calculatedDestY + "px, 0px)"
					});
				}
			} else {
				destY = baseElem.scrollTop;
				if (this.options.scrollbarV) {
					self._ignoreVScrollBarEvents = true;
					this.options.scrollbarV.scrollTop(destY);
				}
			}
		},

		_moveHBarX: function (destX) {
			if (this._linkedHBar) {
				this._linkedHBar.scrollLeft(destX);
			}
		},

		_moveVBarY: function (destY) {
			if (this._linkedVBar) {
				this._linkedVBar.scrollTop(destY);
			}
		},

		// clear timers
		_clear: function () {
			if (this.timer) {
				clearTimeout(this.timer);
				delete this.timer;
			}
		},
		destroy: function () {
			if (this.evts) {
				this.element.unbind(this.evts);
				delete this.evts;
				_remove(this._hBarDrag);
				_remove(this._hBarContainer);
				_remove(this._vBarDrag);
				_remove(this._vBarContainer);
				$.Widget.prototype.destroy.apply(this, arguments);
			}
			return this;
		}
	});
	$.extend($.ui.igScroll, { version: "<build_number>" });
	/* options which can be customized globally for all instances of igScroll. */
	$.ui.igScroll.defaults = {
		alwaysVisibleBars: false,
		useNative: false,
		modifyDOM: false,
		scrollHeight: 0,
		scrollWidth: 0,
		wheelStep: 50,
		smoothing: false,
		smoothingStep: 1,
		smoothingDuration: 1,
		syncedElemsH: [],
		syncedElemsV: [],
		scrollbarH: null,
		scrollbarV: null,
		scrollOnlyVBar: false,
		scrollOnlyHBar: false,
		scrollbarHParent: null,
		scrollbarVParent: null
	};
	try {
		$(":jqmData(role='page')").live("pageshow", _find);
	} catch (ex) {
		_find(true);
		$(document).bind("igcontrolcreated", function (event, args) {
			/* M.H. 5 Feb 2014 Fix for bug #161906: Scrolling is not possible with virtualization and the grid rendered on button click on an iPad */
			var container = args.owner.scrollContainer();
			if (container.length === 0 && args.owner.container) {
				container = args.owner.container().find("[data-scroll]").eq(0);
			}
			container.igScroll({ });
		});
	}
}(jQuery));
