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

/*global jQuery,setTimeout,window,document,MSGesture*/
(function ($) {
	/* S.K. Fix for bug 212350: For IE11 and up msSetPointerCapture and msReleasePointerCapture are depricated. setPointerCapture and releasePointerCapture are supported from IE10 and up. */
	var setPointerCaptureFName = typeof Element.prototype.msSetPointerCapture === "function" ?
								"msSetPointerCapture" :
								"setPointerCapture",
	releasePointerCaptureFName = typeof Element.prototype.msReleasePointerCapture === "function" ?
									"msReleasePointerCapture" :
									"releasePointerCapture";

	$.widget("ui.igScroll", {
		options: {
			/* type="bool" Sets or gets if the scrollbars should be always visible (on all environments). Otherwise it will be the default behavior. Note: this option is only for the custom scrollbars set through the scrollbarType option. */
			alwaysVisible: false,
			/* type="custom|native|none" Sets or gets what type of scrollbars should be using the igScroll (on all environments).
				custom type="string" Custom scrollbars with custom ui and events.
				native type="string" Native scrollbars
				none type="string" No scrollbars should be visible */
			scrollbarType: "custom",
			/* type="bool" Sets or gets if igScroll can modify the DOM when it is initialized on certain element so that the content can be scrollable. */
			modifyDOM: true,
			/* type="number" Sets custom value for how high is actually the content. Useful when wanting to scroll and update the shown content manually. */
			scrollHeight: null,
			/* type="number" Sets custom value for what width is actually the content. Useful when wanting to scroll and update the shown content manually. */
			scrollWidth: null,
			/* type="number" Sets gets current vertical position of the content. */
			scrollTop: 0,
			/* type="number" Sets gets current horizontal position of the content. */
			scrollLeft: 0,
			/* type="number" Sets gets the step of the default scrolling behavior when using mouse wheel */
			wheelStep: 50,
			/* type="number" Sets gets the step of the default scrolling behavior when using any of the custom scrollbar arrows */
			smallIncrementStep: 40,
			/* type="number" Sets gets the step of the default scrolling behavior when using any of the custom scrollbar track areas. */
			bigIncrementStep: null,
			/* type="bool" Sets gets if smoother scrolling with small intertia should be used when using mouse wheel */
			smoothing: false,
			/* type="number" Sets or gets the modifier for how many pixels will be scrolled when using the mouse wheel once. This is used only for the smooth scrolling behavior. */
			smoothingStep: 1,
			/* type="number" Sets or gets the modifier for how long the scroll ‘animation’ lasts when using the mouse wheel once. This is used only for the smooth scrolling behavior. */
			smoothingDuration: 1,
			/* type="number" Sets gets the modifier for how much the inertia scrolls on mobile devices*/
			inertiaStep: 1,
			/* type="number" Sets gets the modifier for how long the inertia last on mobile devices*/
			inertiaDuration: 1,
			/* type="array" Sets gets elements that are linked to the main content horizontally. When the content is scrolled on X axis the linked elements scroll accordingly. */
			syncedElemsH: [],
			/* type="array" Sets gets elements that are linked to the main content vertically. When the content is scrolled on Y axis the linked elements scroll accordingly. */
			syncedElemsV: [],
			/* type="string" Sets gets html or jQuery element which is used for horizontal scrolling. */
			scrollbarH: null,
			/* type="string" Sets gets html or jQuery element which is used for vertical scrolling. */
			scrollbarV: null,
			/* type="bool" Sets gets if only the linked horizontal scrollbar should be used for horizontal scrolling. Note: The behavior when the linked scrollbar is scrolled in this case should be handled manually. */
			scrollOnlyHBar: false,
			/* type="bool" Sets gets if only the linked vertical scrollbar should be used for vertical scrolling. Note: The behavior when the linked scrollbar is scrolled in this case should be handled manually. */
			scrollOnlyVBar: false,
			/* type="string" Sets gets html or jQuery element to which the horizontal scrollbar will be appended to. */
			scrollbarHParent: null,
			/* type="string" Sets gets html or jQuery element to which the vertical scrollbar will be appended to. */
			scrollbarVParent: null
		},
		events: {
			/* cancel="false" Event which is raised after the scroller has been rendered fully
				Function takes arguments evt and args.
				Use evt.originalEvent (with validation for not null of evt) to obtain reference to event of browser.
				Use args.owner to obtain reference to igScroll.
			*/
			rendered: null,
			/* cancel="true" Event which is raised before scrolling or before each step when having inertia.
				Return false in order to cancel action.
				Function takes arguments evt and args.
				Use evt.originalEvent (with validation for not null of evt) to obtain reference to event of browser.
				Use args.owner to obtain reference to igScroll.
				Use args.smallIncrement to obtain if the content is scrolled by the arrows. 0 - none used, -1 - Arrow Up/Left, 1 - Arrow Down/Right.
				Use args.bigIncrement to obtain if the content is scrolled by the scrollbar track areas. 0 - none used, -1 - Scrolled Up/Left, 1 - Scrolled Down/Right.
				Use args.horizontal to obtain which axis is being used to scroll - horizontal(true) or vertical(false).
				Use args.stepX to obtain how much the content will be scrolled horizontally
				Use args.stepY to obtain how much the content will be scrolled vertically
			*/
			scrolling: null,
			/* cancel="false" Event which is raised after scrolling has stopped.
				Function takes arguments evt and args.
				Use evt.originalEvent (with validation for not null of evt) to obtain reference to event of browser.
				Use args.owner to obtain reference to igScroll.
				Use args.smallIncrement to obtain if the content is scrolled by the arrows. 0 - none used, -1 - Arrow Up/Left, 1 - Arrow Down/Right.
				Use args.bigIncrement to obtain if the content is scrolled by the scrollbar track areas. 0 - none used, -1 - Scrolled Up/Left, 1 - Scrolled Down/Right.
				Use args.horizontal to obtain which axis is being used to scroll - horizontal(true) or vertical(false).
			*/
			scrolled: null,
			/* cancel="false" Event which is raised when there is mouse click on the scrollbar's thumb drag.
				Function takes arguments evt and args.
				Use evt.originalEvent (with validation for not null of evt) to obtain reference to event of browser.
				Use args.owner to obtain reference to igScroll.
				Use args.horizontal to obtain which scrollbar thumb is being used - horizontal(true) or vertical(false).
			*/
			thumbDragStart: null,
			/* cancel="true" Event which is raised when the thumb drag is being moved.
				Return false in order to cancel action.
				Function takes arguments evt and args.
				Use evt.originalEvent (with validation for not null of evt) to obtain reference to event of browser.
				Use args.owner to obtain reference to igScroll.
				Use args.horizontal to obtain which scrollbar thumb is being used - horizontal(true) or vertical(false).
				Use args.stepX to obtain how much the content will be scrolled horizontally
				Use args.stepY to obtain how much the content will be scrolled vertically
			*/
			thumbDragMove: null,
			/* cancel="false" Event which is raised on mouse up from the scrollbar's thumb drag.
				Function takes arguments evt and args.
				Use evt.originalEvent (with validation for not null of evt) to obtain reference to event of browser.
				Use args.owner to obtain reference to igScroll.
				Use args.horizontal to obtain which scrollbar thumb is being used - horizontal(true) or vertical(false).
			*/
			thumbDragEnd: null
		},
		css: {
			/* Classes applied to the element the igScroll is instantiated on */
			scrollableElem: "igscroll-scrollable",
			/* Classes applied to the scroll content wrapper */
			scrollContent: "igscroll-content",
			/* Classes applied to the scroll container */
			scrollContainer: "igscroll-container",
			/* Classes applied to the outer element of the native vertical scrollbar */
			nativeVScrollOuter: "igscroll-vnative-outer",
			/* Classes applied to the inner element of the native vertical scrollbar */
			nativeVScrollInner: "igscroll-vnative-inner",
			/* Classes applied to the outer element of the native horizontal scrollbar */
			nativeHScrollOuter: "igscroll-hnative-outer",
			/* Classes applied to the inner element of the native horizontal scrollbar */
			nativeHScrollInner: "igscroll-hnative-inner",
			/* Classes applied to the container of the custom vertical scrollbar */
			verticalScrollContainer: "igscroll-vcontainer",
			/* Classes applied to the track of the custom vertical scrollbar */
			verticalScrollTrack: "igscroll-vtrack",
			/* Classes applied to the arrows of the custom vertical scrollbar */
			verticalScrollArrow: "igscroll-varrow",
			/* Classes applied to the Arrow Up of the custom vertical scrollbar */
			verticalScrollArrowUp: "igscroll-uparrow",
			/* Classes applied to the Arrow Up of the custom vertical scrollbar when it is active */
			verticalScrollArrowUpActive: "igscroll-uparrow-active",
			/* Classes applied to the Arrow Down of the custom vertical scrollbar */
			verticalScrollArrowDown: "igscroll-downarrow",
			/* Classes applied to the Arrow Down of the custom vertical scrollbar when it is active */
			verticalScrollArrowDownActive: "igscroll-downarrow-active",
			/* Classes applied to the thumb drag of the custom vertical scrollbar */
			verticalScrollThumbDrag: "igscroll-vdrag",
			/* Classes applied to the container of the custom horizontal scrollbar */
			horizontalScrollContainer: "igscroll-hcontainer",
			/* Classes applied to the track of the custom horizontal scrollbar  */
			horizontalScrollTrack: "igscroll-htrack",
			/* Classes applied to the arrows of the custom horizontal scrollbar */
			horizontalScrollArrow: "igscroll-harrow",
			/* Classes applied to the Arrow Left of the custom horizontal scrollbar */
			horizontalScrollArrowLeft: "igscroll-leftarrow",
			/* Classes applied to the Arrow Left of the custom horizontal scrollbar when it is active */
			horizontalScrollArrowLeftActive: "igscroll-leftarrow-active",
			/* Classes applied  to the Arrow Right of the custom horizontal scrollbar */
			horizontalScrollArrowRight: "igscroll-rightarrow",
			/* Classes applied to the Arrow Right of the custom horizontal scrollbar when it is active */
			horizontalScrollArrowRightActive: "igscroll-rightarrow-active",
			/* Classes applied to the thumb drag of the custom horizontal scrollbar */
			horizontalScrollThumbDrag: "igscroll-hdrag"
		},

		refresh: function () {
			//width specific
			this._elemWidth = this.element.width();
			this._contentWidth = this._content.width();
			this._percentInViewH = this._elemWidth / this._contentWidth;
			this._dragMaxX = this._elemWidth;
			this._isScrollableH = this._percentInViewH < 1;

			//height specific
			this._elemHeight = this.element.height();
			this._contentHeight = this._content.height();
			this._percentInViewV = this._elemHeight / this._contentHeight;
			this._dragMaxY = this._elemHeight;
			this._isScrollableV = this._percentInViewV < 1;

			if (this.options.modifyDOM) {
				this._container.css({
					"width": this._elemWidth + "px",
					"height": this._elemHeight + "px"
				});
			}

			this._refreshScrollbarsDrag();

			return this.element;
		},

		_create: function () {
			var elem = this.element;

			this._bMixedEnvironment = false;
			this._linkedHElems = [];
			this._linkedVElems = [];
			this._linkedHBar = null;
			this._linkedVBar = null;
			this._elemWidth = elem.width();
			this._elemHeight = elem.height();

			//IDs of the timeouts used for waiting until hiding, switching to simple scrollbars, touch inertia
			this._showScrollbarsAnimId = 0;
			this._hideScrollbarID = 0;
			this._toSimpleScrollbarID = 0;
			this._touchInertiaAnimID = 0;

			//Track if the mouse is inside the scroll container
			this._mOverContainer = false;
			this._mOverScrollbars = false;

			//Determines if the scroll event for the content is triggered when trying to sync it on a specific axis
			this._scrollFromSyncContentH = false;
			this._scrollFromSyncContentV = false;

			//Counter for how many animation for smooth wheel scrolling are present. When 0 we are no longer scrolling with wheel
			this._numSmoothAnimation = 0;

			if (this.options.modifyDOM) {
				elem.addClass(this.css.scrollableElem);
				this._content = $("<div id='" + this.element.attr("id") + "_content'/>")
					.addClass(this.css.scrollContent)
					.appendTo(elem)
					.append(elem.children());

				this._container = $("<div id='" + this.element.attr("id") + "_container'/>")
					.addClass(this.css.scrollContainer)
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

			this._contentHeight = this._content[ 0 ].scrollHeight;
			this._contentWidth = this._content[ 0 ].scrollWidth;
			this._percentInViewH = this._elemWidth / this._contentWidth;
			this._percentInViewV = this._elemHeight / this._contentHeight;
			this._dragMaxY = this._elemHeight;
			this._dragMaxX = this._elemWidth;

			//1 equals 100%
			this._isScrollableV = this._percentInViewV < 1;
			this._isScrollableH = this._percentInViewH < 1;

			/* Set initial options */
			this._initOptions(this.options);

			//Container Events specific variables
			this._startX = 0;
			this._startY = 0;
			this._touchStartX = 0;
			this._touchStartY = 0;
			this._moving = false;

			this.evts = {
				scroll: $.proxy(this._onScrollContainer, this),
				wheel: $.proxy(this._onWheelContainer, this),
				DOMMouseScroll: $.proxy(this._onWheelContainer, this),

				pointerdown: $.proxy(this._onPointerDownContainer, this),
				pointerup: $.proxy(this._onPointerUpContainer, this),
				MSPointerDown: $.proxy(this._onPointerDownContainer, this),
				MSGestureStart: $.proxy(this._onMSGestureStartContainer, this),
				MSGestureChange: $.proxy(this._onMSGestureChangeContainer, this),
				MSGestureEnd: $.proxy(this._onMSGestureEndContainer, this),

				touchstart: $.proxy(this._onTouchStartContainer, this),
				touchmove: $.proxy(this._onTouchMoveContainer, this),
				touchend: $.proxy(this._onTouchEndContainer, this),

				mouseenter: $.proxy(this._onMouseEnterContainer, this),
				mouseleave: $.proxy(this._onMouseLeaveContainer, this)
			};
			this._container.on(this.evts);

			this._createScrollBars();
			this._hideScrollBars(false);
			this._showScrollBars(true, true, true, 0.02);

			this._trigger("rendered", null, {
				owner: this
			});
		},

		_initOptions: function (scrollOptions) {
			if (scrollOptions) {
				if (typeof scrollOptions.syncedElemsH[ 0 ] !== "undefined") {
					this._linkElementsH(scrollOptions.syncedElemsH);
				}
				if (typeof scrollOptions.syncedElemsV[ 0 ] !== "undefined") {
					this._linkElementsV(scrollOptions.syncedElemsV);
				}
				if (scrollOptions.scrollbarH !== null) {
					this._bindHScrollbar(scrollOptions.scrollbarH);
				}
				if (scrollOptions.scrollbarV !== null) {
					this._bindVScrollbar(scrollOptions.scrollbarV);
				}
				if (scrollOptions.scrollHeight !== null) {
					this._setScrollHeight(scrollOptions.scrollHeight);
				}
				if (scrollOptions.scrollWidth !== null) {
					this._setScrollWidth(scrollOptions.scrollWidth);
				}
				/* Lastly change position to be sure that all elements are linked */
				if (scrollOptions.scrollTop !== 0) {
					this._scrollTop(scrollOptions.scrollTop, false);
				}
				if (scrollOptions.scrollLeft !== 0) {
					this._scrollLeft(scrollOptions.scrollLeft, false);
				}
			}
		},

		_setOption: function (key, value) {
			this._super(key, value);

			if (key === "alwaysVisible") {
				if (value === true) {
					this._showScrollBars();
				}
			}
			if (key === "scrollbarType") {
				this._removeScrollbars();

				if (value !== "none") {
					this._createScrollBars();
					this._scrollToXY(0, 0, true);
				}
			}
			if (key === "scrollTop") {
				this._scrollTop(value, true);
			}
			if (key === "scrollLeft") {
				this._scrollLeft(value, true);
			}
			if (key === "scrollHeight") {
				this._setScrollHeight(value);
				this._removeScrollbars();
				this._createScrollBars();
				this._scrollToXY(0, 0, true);
			}
			if (key === "scrollWidth") {
				this._setScrollWidth(value);
				this._removeScrollbars();
				this._createScrollBars();
				this._scrollToXY(0, 0, true);
			}
			if (key === "syncedElemsH") {
				this._linkElementsH(value);
			}
			if (key === "syncedElemsV") {
				this._linkElementsV(value);
			}
			if (key === "scrollbarH") {
				this._bindHScrollbar(value);
			}
			if (key === "scrollbarV") {
				this._bindVScrollbar(value);
			}
		},

		option: function (optionName, value) {
			if (optionName === "scrollTop" && value === undefined) {
				return this._scrollTop(null, true);
			}
			if (optionName === "scrollLeft" && value === undefined) {
				return this._scrollLeft(null, true);
			}

			this._super(optionName, value);
		},

		_getContentPositionX: function () {
			if ($.ig.util.isTouch && !this._bMixedEnvironment) {
				var posX = -this._getTransform3dValueX(this._content);

				return posX;
			} else {
				return this._container.scrollLeft();
			}
		},

		_getContentPositionY: function () {
			if ($.ig.util.isTouch && !this._bMixedEnvironment) {
				var posY = -this._getTransform3dValueY(this._content);

				return posY;
			} else {
				return this._container.scrollTop();
			}
		},

		_getTransform3dValueX: function (jqElem) {
			var matrix, values, posX;
			if (jqElem.css("-webkit-transform")) {
				matrix = jqElem.css("-webkit-transform");
				values = matrix ? matrix.match(/-?[\d\.]+/g) : undefined;
				posX = values ? Number(values[ 4 ]) : 0;
			} else if (jqElem.css("-moz-transform")) {
				matrix = jqElem.css("-moz-transform");
				values = matrix ? matrix.match(/-?[\d\.]+/g) : undefined;
				posX = values ? Number(values[ 4 ]) : 0;
			} else if (jqElem.css("-ms-transform")) {
				matrix = jqElem.css("-ms-transform");
				values = matrix ? matrix.match(/-?[\d\.]+/g) : undefined;
				posX = values ? Number(values[ 13 ]) : 0;
			}

			return posX;
		},

		_getTransform3dValueY: function (jqElem) {
			var matrix, values, posY;
			if (jqElem.css("-webkit-transform")) {
				matrix = jqElem.css("-webkit-transform");
				values = matrix ? matrix.match(/-?[\d\.]+/g) : undefined;
				posY = values ? Number(values[ 5 ]) : 0;
			} else if (jqElem.css("-moz-transform")) {
				matrix = jqElem.css("-moz-transform");
				values = matrix ? matrix.match(/-?[\d\.]+/g) : undefined;
				posY = values ? Number(values[ 5 ]) : 0;
			} else if (jqElem.css("-ms-transform")) {
				matrix = jqElem.css("-ms-transform");
				values = matrix ? matrix.match(/-?[\d\.]+/g) : undefined;
				posY = values ? Number(values[ 14 ]) : 0;
			}

			return posY;
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

		//Internal scrollLeft function that handles scrolling on the X axis
		_scrollLeft: function (val, triggerEvents) {
			/* Gets sets the position of the content horizontally.
				paramType="number" optional="true" new value for scrollLeft.
				returnType="number|object" Returns scrollLeft or reference to igScroll.
			*/
			if (val === "undefined" || val === null) {
				return this._getContentPositionX();
			}
			if ($.ig.util.isTouch && !this._bMixedEnvironment) {
				var posY = this._getContentPositionY();
				this._scrollTouchToXY(val, posY, triggerEvents);
			} else {
				this._scrollToX(val, triggerEvents);
			}

			if (triggerEvents) {
				//Trigger scrolled event
				var self = this;
				this._trigger("scrolled", null, {
					owner: self,
					smallIncrement: 0,
					bigIncrement: 0,
					horizontal: true
				});
			}

			return this;
		},

		//Internal scrollLTop function that handles scrolling on the Y axis
		_scrollTop: function (val, triggerEvents) {
			/* Gets sets the position of the content vertically.
				paramType="number" optional="true" new value for scrollTop.
				returnType="number|object" Returns scrollTop or reference to igScroll.
			*/
			if (val === "undefined" || val === null) {
				return this._getContentPositionY();
			}
			if ($.ig.util.isTouch && !this._bMixedEnvironment) {
				var posX = this._getContentPositionX();
				this._scrollTouchToXY(posX, val, triggerEvents);
			} else {
				this._scrollToY(val, triggerEvents);
			}

			if (triggerEvents) {
				//Trigger scrolled event
				var self = this;
				this._trigger("scrolled", null, {
					owner: self,
					smallIncrement: 0,
					bigIncrement: 0,
					horizontal: false
				});
			}

			return this;
		},

		_setScrollWidth: function (inWidth) {
			/* Do NOT refresh after calling this function!!! The custom width will be lost. */
			this._elemWidth = this._container.width();
			this._contentWidth = inWidth;
			this._percentInViewH = this._elemWidth / this._contentWidth;
			this._isScrollableH = this._percentInViewH < 1;

			if (this.options.modifyDOM) {
				this._content.css("width", inWidth + "px");
			}

			return this.element;
		},

		_setScrollHeight: function (inHeight) {
			/* Do NOT refresh after calling this function!!! The custom height will be lost. */
			this._elemHeight = this._container.innerHeight();
			this._contentHeight = inHeight;
			this._percentInViewV = this._elemHeight / this._contentHeight;
			this._isScrollableV = this._percentInViewV < 1;

			if (this.options.modifyDOM) {
				this._content.css("height", inHeight + "px");
			}

			return this.element;
		},

		_refreshScrollbarsDrag: function () {
			if (this.options.scrollbarType === "custom" && this._vBarTrack && this._vBarDrag) {
				this._vBarContainer.css("height", (this._elemHeight - 15) + "px");
				this._vDragHeight = this._elemHeight * ((this._elemHeight - 2 * 15) / this._contentHeight);
				this._vBarDrag.css("height", this._vDragHeight + "px");
				this._vBarTrack.css("height", this._elemHeight - (3 * 15) + "px");
			} else if (this.options.scrollbarType === "native" && this._vBarContainer) {
				this._vBarContainer.css("height", (this._elemHeight - 15) + "px");
			}

			if (this.options.scrollbarType === "custom" && this._hBarTrack && this._hBarDrag) {
				this._hBarContainer.css("width", (this._elemWidth - 15) + "px");
				this._hDragWidth = this._elemWidth * this._percentInViewH - 3 * 15;
				this._hBarDrag.css("width", this._hDragWidth + "px");
				this._hBarTrack.css("width", this._elemWidth - (3 * 15) + "px");
			} else if (this.options.scrollbarType === "native" && this._hBarContainer) {
				this._hBarContainer.css("width", (this._elemWidth - 15) + "px");
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
						throw "syncedElemsH: Element does not exists!";
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
						throw "syncedElemsV: Element does not exists!";
					}
				}
			}

			return this._linkedVElems;
		},

		_bindHScrollbar: function (inElement) {
			var self = this;

			if (inElement) {
				var elemObject = $(inElement);

				if (elemObject.length) {
					elemObject.on({
						scroll: function (e) {
							var ignoreSync = self._ignoreHScrollBarEvents;
							self._ignoreHScrollBarEvents = false;

							if (ignoreSync || self.options.scrollOnlyHBar) {
								return false;
							} else {
								//We set mixed environment because linked scrollbar can be used only under desktop and hybrid env.
								if (!self._bMixedEnvironment) {
									self._bMixedEnvironment = true;

									/* Make sure we are not scrolled using 3d transformation */
									self._switchFromTouchToMixed();
								}

								self._syncContentX(e.target, false);
								self._syncElemsX(e.target, false);
							}
						}
					});

					if (this._linkedHBar) {
						//make sure if there ware prviously linked another scrollbar to not scroll
						this._linkedHBar.off();
					}
					this._linkedHBar = elemObject;
				} else {
					throw "scrollbarH: Element does not exists!";
				}
			}

			return this._linkedHBar;
		},

		_bindVScrollbar: function (inElement) {
			var self = this;

			if (inElement) {
				var elemObject = $(inElement);

				if (elemObject.length) {
					elemObject.on({
						scroll: function (e) {
							var ignoreSync = self._ignoreVScrollBarEvents;
							self._ignoreVScrollBarEvents = false;

							/* Ignore if we already moved the content and ignore if scrolling via linded bar is custom handled */
							if (ignoreSync || self.options.scrollOnlyVBar) {
								return false;
							} else {
								//We set mixed environment because linked scrollbar can be used only under desktop and hybrid env.
								if (!self._bMixedEnvironment) {
									self._bMixedEnvironment = true;

									/* Make sure we are not scrolled using 3d transformation */
									self._switchFromTouchToMixed();
								}

								self._syncContentY(e.target, false);
								self._syncElemsY(e.target, false);
							}
						}

					});

					if (this._linkedVBar) {
						//make sure if there ware prviously linked another scrollbar to not scroll
						this._linkedVBar.off();
					}
					this._linkedVBar = elemObject;
				} else {
					throw "scrollbarV: Element does not exists!";
				}
			}

			return this._linkedVBar;
		},

		_clampAxisCoords: function(target, min, max) {
			if (target === undefined || target < min) {
				target = min;
			} else if (target > max) {
				target = max;
			}

			return target;
		},

		/** Scrolls content to on the X and Y axis using default scrollLeft and scrollTop.
		*	Should be used when sure it's desktop/hybrid environment.
		*	If not sure how to use, use the internal _scrollLeft. */
		_scrollToXY: function(destX, destY, triggerEvents) {
			var curPosX = this._getContentPositionX(),
				curPosY = this._getContentPositionY();
			destX = this._clampAxisCoords(destX, 0, this._contentWidth - this._dragMaxX);
			destY = this._clampAxisCoords(destY, 0, this._contentHeight - this._dragMaxY);

			if (triggerEvents) {
				//Trigger scrolling event
				var bNoCancel = this._trigger("scrolling", null, {
					owner: this,
					smallIncrement: 0,
					bigIncrement: 0,
					horizontal: null,
					stepX: destX - curPosX,
					stepY: destY - curPosY
				});
				if (!bNoCancel) {
					return;
				}
			}

			this._scrollToX(destX, false);
			this._scrollToY(destY, false);
		},

		/** Scrolls content to on the X axis using default scrollLeft.
		*	Should be used when sure it's desktop/hybrid environment.
		*	If not sure how to use, use the internal _scrollLeft. */
		_scrollToX: function (destX, triggerEvents) {
			if (!this._isScrollableH && !this.options.scrollOnlyHBar) {
				return;
			}

			var curPosX = this._getContentPositionX();
			destX = this._clampAxisCoords(destX, 0, this._contentWidth - this._dragMaxX);

			//We have another trigger for scrolling in case we want to scroll only on the X axis(horizontal) and not interrupt the Y(vertical) scroll position.
			if (triggerEvents) {
				//Trigger scrolling event
				var	bNoCancel = this._trigger("scrolling", null, {
					owner: this,
					smallIncrement: 0,
					bigIncrement: 0,
					horizontal: true,
					stepX: destX - curPosX,
					stepY: 0
				});
				if (!bNoCancel) {
					return;
				}
			}

			if (this.options.scrollOnlyHBar) {
				this._moveHBarX(destX);
			} else {
				this._container.scrollLeft(destX); //No need to check if destY < 0 or > of the content heigh. ScrollLeft handles that.
				this._syncElemsX(this._container[ 0 ], false);
				/*self._syncHBar(this._container[ 0 ], false);*/

				var curY = this._getContentPositionY();
				this._updateScrollBarsPos(destX, curY, true);
			}
		},

		/** Scrolls content to on the Y axis using default scrollTop.
		*	Should be used when sure it's desktop/hybrid environment.
		*	If not sure how to use, use the internal _scrollTop. */
		_scrollToY: function (destY, triggerEvents) {
			if (!this._isScrollableV && !this.options.scrollOnlyVBar) {
				return;
			}

			var curPosY = this._getContentPositionY();
			destY = this._clampAxisCoords(destY, 0, this._contentHeight - this._dragMaxY);

			//We have another trigger for scrolling in case we want to scroll only on the Y axis(vertical) and not interrupt the X(horizontal) scroll position.
			if (triggerEvents) {
				//Trigger scrolling event
				var	bNoCancel = this._trigger("scrolling", null, {
					owner: this,
					smallIncrement: 0,
					bigIncrement: 0,
					horizontal: false,
					stepX: 0,
					stepY: destY - curPosY
				});
				if (!bNoCancel) {
					return;
				}
			}

			if (this.options.scrollOnlyVBar) {
				this._moveVBarY(destY);
			} else {
				this._container.scrollTop(destY); //No need to check if destY < 0 or > of the content heigh. ScrollTop handles that.
				this._syncElemsY(this._container[ 0 ], false);
				/*this._syncVBar(this._container[ 0 ], false);*/

				var curX = this._getContentPositionX();
				this._updateScrollBarsPos(curX, destY, true);
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
					self._numSmoothAnimation -= 1;

					if (!self._numSmoothAnimation) {
						self._trigger("scrolled", null, {
							owner: self,
							smallIncrement: 0,
							bigIncrement: 0,
							horizontal: false
						});
					}

					return;
				}

				self._nextY += ((-3 * x * x + 3) * (deltaY > 0 ? 1 : -1) * 2) * smoothingStep;
				self._scrollToY(self._nextY, true);

				//continue the intertia
				x += 0.08 * (1 / smoothingDuration);
				animationId = requestAnimationFrame(inertiaStep);
			}

			//Start the inertia and continue it recursively
			self._numSmoothAnimation += 1;
			animationId = requestAnimationFrame(inertiaStep);
		},

		/** Switch from using 3d transformations to using scrollTop/scrollLeft */
		_switchFromTouchToMixed: function () {
			var startX = this._getTransform3dValueX(this._content),
				startY = this._getTransform3dValueY(this._content);

			/* Switch to using scrollTop and scrollLeft attributes instead of transform3d when we have mouse + touchscreen, because they will interfere with each othe r*/
			if (startX !== 0 || startY !== 0) {
				//Reset the transform3d position to 0.
				this._scrollTouchToXY(0, 0, false);

				//Go back to the scrolled position but using scrollTop and scrollLeft this time
				this._scrollToXY(-startX, -startY, false);
			}
		},

		/** Scroll content on the X and Y axis using 3d accelerated transformation. This makes scrolling on touch devices faster
		*	Should be used when sure it's mobile environment.
		*	If not sure how to use, use the internal _scrollTop and _scrollLeft. */
		_scrollTouchToXY: function (destX, destY, triggerEvents) {
			var bNoCancel,
				self = this,
				curPosX = this._getContentPositionX(),
				curPosY = this._getContentPositionY();

			destX = this._clampAxisCoords(destX, 0, this._contentWidth - this._dragMaxX);
			destY = this._clampAxisCoords(destY, 0, this._contentHeight - this._dragMaxY);

			if (triggerEvents) {
				bNoCancel = this._trigger("scrolling", null, {
					owner: self,
					smallIncrement: 0,
					bigIncrement: 0,
					horizontal: null,
					stepX: destX - curPosX,
					stepY: destY - curPosY
				});
				if (!bNoCancel) {
					return;
				}
			}

			//Only use vertical scroll specific
			if (this.options.scrollOnlyVBar) {
				this._content.css({
					"-webkit-transform": "translate3d(" + (-destX) + "px, 0px, 0px)" /* Chrome, Safari, Opera */
				});
				self._scrollToY(destY, false);

				/* Sync other elements */
				destY = this._getScrollbarVPoisition();
				self._updateScrollBarsPos(destX, destY);
				self._syncElemsX(this._content, true, -destX, true);
				/* self._syncHBar(this._content, true); */
				return;
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
			self._updateScrollBarsPos(destX, destY);

			//No need to sync these bars since they don't show on safari and we use custom ones.
			self._syncHBar(this._content, true);
			self._syncVBar(this._content, true);
		},

		/** Initialize main inertia based on the X and Y speeds. Used on touch devices. */
		_inertiaInit: function (speedX, speedY, bDefaultScroll) {
			var self = this,
				x = 0,
				stepModifer = this.options.inertiaStep,
				inertiaDuration = this.options.inertiaDuration;

			self._nextX = self._getContentPositionX();
			if (this.options.scrollOnlyVBar) {
				self._nextY = self._getScrollbarVPoisition();
			} else {
				self._nextY = self._getContentPositionY();
			}

			//Sets timeout until executing next movement iteration of the inertia
			function inertiaStep() {
				//If inertia is interupted we do not hide the bars here but on endtouch in case another inertia is initiated
				if (self._bStopInertia) {
					//we don't hide the scrollbars, because the inertia is interrupted by touch and we hide it on touchend then
					cancelAnimationFrame(self._touchInertiaAnimID);
					return;
				}

				if (x > 6) {
					self._hideScrollBars(true, true); //hide scrollbars when inertia ends naturally
					cancelAnimationFrame(self._touchInertiaAnimID);

					self._trigger("scrolled", null, {
						owner: self,
						smallIncrement: 0,
						bigIncrement: 0,
						horizontal: null
					});
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
					self._scrollToXY(self._nextX, self._nextY, true);
				} else {
					self._scrollTouchToXY(self._nextX, self._nextY, true);
				}

				self._touchInertiaAnimID = requestAnimationFrame(inertiaStep);
			}

			//Start inertia and continue it recursively
			this._touchInertiaAnimID = requestAnimationFrame(inertiaStep);
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
		_syncContentX: function (baseElem /*, useTransform */) {
			var self = this,
				destX;

			if (!baseElem) {
				return;
			}

			//if (useTransform) {
			//	destX = self._getContentPositionX();
			//	var destY = self._getContentPositionY();

			//	this._content.css({
			//		"-webkit-transform": "translate3d(" + destX + "px," + destY + "px, 0px)" /* Chrome, Safari, Opera */
			//	});

			//} else {
			destX = baseElem.scrollLeft;

			//this is to not affect the scrolling when clicking on track area of a linked scrollbarH
			self._scrollFromSyncContentH = true;
			this._container.scrollLeft(destX);

			//}
		},

		/** Syncs the main content element vertically */
		_syncContentY: function (baseElem /*, useTransform*/) {
			var self = this,
				destY;

			if (!baseElem) {
				return;
			}

			//if (useTransform) {
			//	var destX = self._getContentPositionX();
			//	destY = self._getContentPositionY();

			//	this._content.css({
			//		"-webkit-transform": "translate3d(" + destX + "px," + destY + "px, 0px)" /* Chrome, Safari, Opera */
			//	});

			//} else {
			destY = baseElem.scrollTop;

			//this is to not affect the scrolling when clicking on track area of a linked scrollbarV
			self._scrollFromSyncContentV = true;
			this._container.scrollTop(destY);

			//}
		},

		//Syncs elements that are linked on X axis
		_syncElemsX: function (baseElem, useTransform, inDestX, useDestination) {
			var destX, index;

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
				this._ignoreHScrollBarEvents = true;
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
			} else {
				destY = baseElem.scrollTop;
			}

			if (this._linkedVBar) {
				this._ignoreVScrollBarEvents = true;
				this._linkedVBar.scrollTop(destY);
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

		_onScrollContainer: function () {
			if (!this._bMixedEnvironment) {
				this._bMixedEnvironment = true;

				/* Make sure we are not scrolled using 3d transformation */
				this._switchFromTouchToMixed();
			}

			if (!this._scrollFromSyncContentV) {
				this._syncElemsY(this._container[ 0 ], false);

				if (!this.options.scrollOnlyVBar) {
					this._syncVBar(this._container[ 0 ], false);
				}
			} else {
				this._scrollFromSyncContentV = false;
			}

			if (!this._scrollFromSyncContentH) {
				this._syncElemsX(this._container[ 0 ], false);

				if (!this.options.scrollOnlyHBar) {
					this._syncHBar(this._container[ 0 ], false);
				}
			} else {
				this._scrollFromSyncContentH = false;
			}

			this._updateScrollBarsPos(this._container.scrollLeft(), this._container.scrollTop());

			return false;
		},

		_onWheelContainer: function (event) {
			var evt = event.originalEvent;
			this._bStopInertia = true;

			if (!this._bMixedEnvironment) {
				this._bMixedEnvironment = true;

				/* Make sure we are not scrolled using 3d transformation */
				this._switchFromTouchToMixed();
			}

			if (this.options.smoothing) {
				//Scroll with small inertia
				this._smoothWheelScrollY(evt.deltaY);
			} else {
				//Normal scroll
				if (this.options.scrollOnlyVBar) {
					this._startY = this._getScrollbarVPoisition();
				} else {
					this._startY = this._getContentPositionY();
				}

				var scrollStep = this.options.wheelStep;
				this._scrollToY(this._startY + (evt.deltaY > 0 ? 1 : -1) * scrollStep, true);

				//Trigger scrolled event
				this._trigger("scrolled", null, {
					owner: this,
					smallIncrement: 0,
					bigIncrement: 0,
					horizontal: false
				});
			}

			return false;
		},

		_onPointerDownContainer: function (event) {
			var evt = event.originalEvent;
			if (!evt || (evt.pointerType !== 2 && evt.pointerType !== "touch")) {
				return true;
			}

			//setPointerCaptureFName is the name of the function that is supported
			event.target[ setPointerCaptureFName ](this._pointer = evt.pointerId);

			//create gestureObject only one time to prevent overlapping during intertia
			if (!this._gestureObject) {
				this._gestureObject = new MSGesture();
				this._gestureObject.target = this._container[ 0 ];
			}
			this._gestureObject.addPointer(this._pointer);
		},

		_onPointerUpContainer: function (event) {
			if (!this._pointer) {
				return true;
			}
			/* releasePointerCaptureFName is the name of the function that is supported */
			event.target[ releasePointerCaptureFName ](this._pointer);

			delete this._pointer;
		},

		_onMSGestureStartContainer: function (event) {
			if (this.options.scrollOnlyVBar) {
				this._startX = this._getScrollbarHPoisition();
				this._startY = this._getScrollbarVPoisition();
			} else {
				this._startX = this._getContentPositionX();
				this._startY = this._getContentPositionY();
			}

			this._touchStartX = event.originalEvent.screenX;
			this._touchStartY = event.originalEvent.screenY;
			this._moving = true;
		},

		_onMSGestureChangeContainer: function (event) {
			var touchPos = event.originalEvent,
				destX = this._startX + this._touchStartX - touchPos.screenX,
				destY = this._startY + this._touchStartY - touchPos.screenY;

			this._scrollToXY(destX, destY, true);
			this._moving = true;
		},

		_onMSGestureEndContainer: function () {
			this._moving = false;
		},

		_onTouchStartContainer: function (event) {
			var touch = event.originalEvent.touches[ 0 ];

			if (this.options.scrollOnlyHBar) {
				this._startX = this._getScrollbarHPoisition();
			} else {
				this._startX = this._getContentPositionX();
			}
			if (this.options.scrollOnlyVBar) {
				this._startY = this._getScrollbarVPoisition();
			} else {
				this._startY = this._getContentPositionY();
			}

			this._touchStartX = touch.pageX;
			this._touchStartY = touch.pageY;

			this._bStopInertia = true; //stops any current ongoing inertia
			this._speedDecreasing = false;

			this._lastTouchEnd = new Date().getTime();
			this._lastTouchX = touch.pageX;
			this._lastTouchY = touch.pageY;
			this._savedSpeedsX = [];
			this._savedSpeedsY = [];

			this._showScrollBars(false, true);
		},

		_onTouchMoveContainer: function (event) {
			var touch = event.originalEvent.touches[ 0 ];
			var destX = this._startX + this._touchStartX - touch.pageX;
			var destY = this._startY + this._touchStartY - touch.pageY;

			/*Handle complex touchmoves when swipe stops but the toch doesn't end and then a swipe is initiated again */
			/***********************************************************/
			var speedSlopeX = this._getSpeedSlope(this._savedSpeedsX);
			var speedSlopeY = this._getSpeedSlope(this._savedSpeedsY);

			if (speedSlopeY > -0.1 || speedSlopeX > -0.1) {
				this._speedDecreasing = true;
			} else {
				this._speedDecreasing = false;
			}

			var timeFromLastTouch = (new Date().getTime()) - this._lastTouchEnd;
			if (timeFromLastTouch < 100) {
				var speedX = (this._lastTouchX - touch.pageX) / timeFromLastTouch;
				var speedY = (this._lastTouchY - touch.pageY) / timeFromLastTouch;

				//Save the last 5 speeds between two touchmoves on X axis
				if (this._savedSpeedsX.length < 5) {
					this._savedSpeedsX.push(speedX);
				} else {
					this._savedSpeedsX.shift();
					this._savedSpeedsX.push(speedX);
				}

				//Save the last 5 speeds between two touchmoves on Y axis
				if (this._savedSpeedsY.length < 5) {
					this._savedSpeedsY.push(speedY);
				} else {
					this._savedSpeedsY.shift();
					this._savedSpeedsY.push(speedY);
				}
			}
			this._lastTouchEnd = new Date().getTime();
			this._lastMovedX = this._lastTouchX - touch.pageX;
			this._lastMovedY = this._lastTouchY - touch.pageY;
			this._lastTouchX = touch.pageX;
			this._lastTouchY = touch.pageY;
			/***********************************************************/

			//Check if browser is Firefox
			if (navigator.userAgent.indexOf("Firefox") > -1 || this._bMixedEnvironment) {
				//Better performance on Firefox for Android
				this._scrollToXY(destX, destY, true);
			} else {
				this._scrollTouchToXY(destX, destY, true);
			}

			// return true if there was no movement so rest of the screen can scroll
			return this._startX === destX && this._startY === destY;
		},

		_onTouchEndContainer: function () {
			var speedX = 0;
			var speedY = 0;

			//savedSpeedsX and savedSpeedsY have same length
			for (var i = this._savedSpeedsX.length - 1; i >= 0; i--) {
				speedX += this._savedSpeedsX[ i ];
				speedY += this._savedSpeedsY[ i ];
			}
			speedX = speedX / this._savedSpeedsX.length;
			speedY = speedY / this._savedSpeedsY.length;

			//Use the lastMovedX and lastMovedY to determine if the swipe stops without lifting the finger so we don't start inertia
			if ((Math.abs(speedX) > 0.1 || Math.abs(speedY) > 0.1) &&
					(Math.abs(this._lastMovedX) > 2 || Math.abs(this._lastMovedY) > 2)) {
				this._bStopInertia = false;
				this._showScrollBars(false, true);
				this._inertiaInit(speedX, speedY, this._bMixedEnvironment);
			} else {
				this._hideScrollBars(true, true);

				//Trigger scrolled event
				this._trigger("scrolled", null, {
					owner: this,
					smallIncrement: 0,
					bigIncrement: 0,
					horizontal: null
				});
			}
		},

		_onMouseEnterContainer: function () {
			this._mOverContainer = true;

			cancelAnimationFrame(this._showScrollbarsAnimId);
			clearTimeout(this._hideScrollbarID);
			if (!this._toSimpleScrollbarID && !this._bMouseDownH && !this._bMouseDownV) {
				//We move the mouse inside the container but we weren't previously hovering the scrollbars (that's why we don't have _toSimpleScrollbarID for a timeout to switch to simple scrollbars).
				//So we instantly show simple scrollbars.
				this._showScrollBars(false, true);
			}
		},

		_onMouseLeaveContainer: function () {
			var self = this;

			this._mOverContainer = false;
			if (!this._bMouseDownV && !this._bMouseDownH) {
				//Hide scrollbars after 2 secs. We cencel the timeout if we enter scrollbars area.
				this._hideScrollbarID = setTimeout(function () {
					self._hideScrollBars(false);
				}, 2000);
			}
		},

		_createScrollBars: function () {
			if (this.options.scrollbarType === "none") {
				return;
			}

			if (this.options.scrollbarType === "native") {
				this._initNativeScrollbars();
			} else if (this.options.scrollbarType === "custom") {
				if (this._isScrollableV) {
					this._initCustomScrollBarV();
				}

				if (this._isScrollableH) {
					this._initCustomScrollBarH();
				}
			}
		},

		_initNativeScrollbars: function () {
			var css = this.css,
				bNativeDesktop = false;

			if (this._isScrollableV) {
				this._vBarContainer = $("<div id='" + this.element.attr("id") + "_vBar'></div>")
					.addClass(css.nativeVScrollOuter)
					.css("height", this._elemHeight - 15 + "px");

				this._vDragHeight = this._contentHeight;
				this._vBarDrag = $("<div id='" + this.element.attr("id") + "_vBar_inner'></div>")
					.addClass(css.nativeVScrollInner)
					.css("height", this._vDragHeight + "px");

				if (this.options.scrollbarVParent) {
					this._vBarContainer.append(this._vBarDrag).appendTo(this.options.scrollbarVParent);
				} else {
					this._vBarContainer.append(this._vBarDrag).appendTo(this._container[ 0 ].parentElement);
				}

				if ($.ig.util.getScrollHeight() > 0) {
					this._content
						.css("padding-bottom", $.ig.util.getScrollHeight() + "px");
					bNativeDesktop = true;
				}
				this._setOption("scrollbarV", this._vBarContainer);
			}

			if (this._isScrollableH) {
				this._hBarContainer = $("<div id='" + this.element.attr("id") + "_hBar'></div>")
					.addClass(css.nativeHScrollOuter)
					.css("width", this._elemWidth - 15 + "px");

				this._hDragWidth = this._contentWidth;
				this._hBarDrag = $("<div id='" + this.element.attr("id") + "_hBar_inner'></div>")
					.addClass(css.nativeHScrollInner)
					.css("width", this._hDragWidth + "px");

				if (this.options.scrollbarVParent) {
					this._hBarContainer.append(this._hBarDrag).appendTo(this.options.scrollbarVParent);
				} else {
					this._hBarContainer.append(this._hBarDrag).appendTo(this._container[ 0 ].parentElement);
				}

				if ($.ig.util.getScrollWidth() > 0) {
					bNativeDesktop = true;
					this._content
						.css("padding-right", $.ig.util.getScrollWidth() + "px");
				}
				this._setOption("scrollbarH", this._hBarContainer);
			}

			//Only for native scrollbars theere is filler on the bottom right angle between the scrollbars
			if (bNativeDesktop) {
				this._desktopFiller = $("<div id='" + this.element.attr("id") + "_scrollbarFiller'></div>")
					.addClass("igscroll-filler");
				this._desktopFiller.appendTo(this._container[ 0 ].parentElement);
			}
		},

		_removeScrollbars: function() {
			if (this._vBarContainer) {
				this._vBarContainer.remove();
			}

			if (this._hBarContainer) {
				this._hBarContainer.remove();
			}

			//In case we have native scrollbars and we have added padding. Only for native scrollbars theere is filler on the bottom right angle between the scrollbars
			if (this._desktopFiller) {
				this._desktopFiller.remove();
				this._content
					.css("padding-right", "0px")
					.css("padding-bottom", "0px");
			}
		},

		_initCustomScrollBarV: function () {
			var css = this.css;

			this._vBarContainer = $("<div id='" + this.element.attr("id") + "_vBar'></div>")
				.addClass(css.verticalScrollContainer)
				.css("height", this._elemHeight - 15 + "px");

			this._vBarArrowUp =	$("<div id='" +	this.element.attr("id") + "_vBar_arrowUp'></div>")
				.addClass(css.verticalScrollArrow)
				.addClass(css.verticalScrollArrowUp);

			this._vBarTrack = $("<div id='" + this.element.attr("id") + "_vBar_track'></div>")
				.addClass(css.verticalScrollTrack)
				.css("height", this._elemHeight - (3 * 15) + "px");

			this._vBarArrowDown = $("<div id='" + this.element.attr("id") +	"_vBar_arrowDown'></div>")
				.addClass(css.verticalScrollArrow)
				.addClass(css.verticalScrollArrowDown);

			this._vDragHeight = (this._elemHeight - 3 * 15) * this._percentInViewV;
			this._vBarDrag = $("<span id='" + this.element.attr("id") + "_vBar_drag'></span>")
				.addClass(css.verticalScrollThumbDrag)
				.css("height", this._vDragHeight + "px");

			if (this.options.scrollbarVParent) {
				this._vBarContainer
					.append(this._vBarArrowUp)
					.append(this._vBarTrack.append(this._vBarDrag))
					.append(this._vBarArrowDown)
					.appendTo(this.options.scrollbarVParent);
			} else {
				this._vBarContainer
					.append(this._vBarArrowUp)
					.append(this._vBarTrack.append(this._vBarDrag))
					.append(this._vBarArrowDown)
					.appendTo(this._container[ 0 ].parentElement);
			}

			this._bindCustomScrollBarV();
		},

		_bindCustomScrollBarV: function() {
			this._holdTimeoutID = 0;
			this._bMouseDownV = false; //Used to track if mouse is holded on any of the vertical scrollbar elements
			this._bUseArrowUp = false; //Used to distinquis which on which element left mouse if being hold
			this._bUseArrowDown = false; //Used to distinquis which on which element left mouse if being hold
			this._dragLastY = 0; //Determines the last position of the thumb drag for the horizontal scrollbar
			this._bUseVDrag = false; //Used to distinquis which on which element left mouse if being hold
			this._bUseVTrack = false; //Determines if the vertical track area is being used
			this._lastBigIncDirV = 0; //Used to determine the last direction of the scroll when using the scrollbar track area
			this._mTrackLastPosV = 0; //Last know position of the mouse when interacting with the vertical track area

			if (this._vBarArrowUp)  {
				this._vBarArrowUp.on({
					mousedown: $.proxy(this._onMouseDownArrowUp, this),
					mouseup: $.proxy(this._onMouseUpArrowUp, this),
					mouseover: $.proxy(this._onMouseOverArrowUp, this),

					mouseout: $.proxy(this._onMouseOutScrollbarArrow, this),
					touchstart: $.proxy(this._onTouchStartScrollbarElem, this)
				});
			}

			if (this._vBarArrowDown) {
				this._vBarArrowDown.on({
					mousedown: $.proxy(this._onMouseDownArrowDown, this),
					mouseup: $.proxy(this._onMouseUpArrowDown, this),
					mouseover: $.proxy(this._onMouseOverArrowDown, this),

					mouseout: $.proxy(this._onMouseOutScrollbarArrow, this),
					touchstart: $.proxy(this._onTouchStartScrollbarElem, this)
				});
			}

			if (this._vBarDrag) {
				this._vBarDrag.on({
					mousedown: $.proxy(this._onMouseDownVDrag, this),

					touchstart: $.proxy(this._onTouchStartScrollbarElem, this)
				});
			}

			if (this._vBarTrack) {
				this._vBarTrack.on({
					mousedown: $.proxy(this._onMouseDownVTrack, this),
					mousemove: $.proxy(this._onMouseMoveVTrack, this),
					mouseup: $.proxy(this._onMouseUpVTrack, this),
					mouseout: $.proxy(this._onMouseOutVTrack, this),

					touchstart: $.proxy(this._onTouchStartScrollbarElem, this)
				});
			}

			if (this._vBarContainer) {
				this._vBarContainer.on({
					wheel: $.proxy(this._onWheelContainer, this),
					mouseenter: $.proxy(this._onMouseEnterScrollbarElem, this),
					mouseleave: $.proxy(this._onMouseLeaveScrollbarElem, this)
				});
			}

			/* We bind it to the body to be able to detect while holding the Thumb Drag and moving out of the scrollbar area. It should still scroll while still holding and moving inside the window */
			$("body").on("mousemove", $.proxy(this._onMouseMoveVDrag, this));
			/* We bind it to the wondow to be able to determine while the user releases the mouse even when it is out of the browser window */
			$(window).on("mouseup", $.proxy(this._onMouseUpVScrollbar, this));
		},

		/** Used when one of the Arrow Up/Down or Vertical Track is being used by holding mouse button on them to constantly scroll on the Y axis */
		_scrollTimeoutY: function (step, bSmallIncement) {
			var	curPosY = this._getContentPositionY();
			if ((curPosY === 0 && step <= 0) ||
				(curPosY === this._contentHeight - this._dragMaxY && step >= 0)) {
				return;
			}

			var	bNoCancel,
				eventArgs = {
					owner: this,
					smallIncrement: 0,
					bigIncrement: 0,
					horizontal: false,
					stepX: 0,
					stepY: step
				};

			//Check if the increment is big or small and set the proper value in the eventArgs
			if (bSmallIncement) {
				/* set event vars */
				eventArgs.smallIncrement = Math.sign(step);
			} else {
				/* Check of the mouse is over the vertical thumb drag. This means it has reached the position of where the mouse is currently held (on the vertical track) and scrolling should stop. */
				var dragStartY = this._getTransform3dValueY(this._vBarDrag);
				if (this._mTrackLastPosV > dragStartY &&
					this._mTrackLastPosV < dragStartY + this._vDragHeight) {

					return;
				}

				/* set event vars */
				eventArgs.bigIncrement = Math.sign(step);
				this._lastBigIncDirV = Math.sign(step);
			}
			bNoCancel = this._trigger("scrolling", null, eventArgs);

			if (bNoCancel) {
				this._scrollTop(curPosY + step, false);

				var self = this;
				this._holdTimeoutID = setTimeout(function () {
					self._scrollTimeoutY(step, bSmallIncement);
				}, 50);
			}
		},

		_onMouseDownArrowUp: function () {
			var scrollStep = -this.options.smallIncrementStep,
				curPosY = this._getContentPositionY();
			if (curPosY === 0) {
				scrollStep = 0;
			}

			var	bNoCancel = this._trigger("scrolling", null, {
				owner: this,
				smallIncrement: -1,
				bigIncrement: 0,
				horizontal: false,
				stepX: 0,
				stepY: scrollStep
			});

			if (bNoCancel) {
				this._bMouseDownV = true;
				this._bUseArrowUp = true;
				this._vBarArrowUp.switchClass(this.css.verticalScrollArrowUp,
												this.css.verticalScrollArrowUpActive);

				this._scrollTop(curPosY + scrollStep, false);

				var self = this;
				this._holdTimeoutID = setTimeout(function () {
					self._scrollTimeoutY(scrollStep, true);
				}, 250);
			}

			return false;
		},

		_onMouseUpArrowUp: function() {
			this._bMouseDownV = false;
			this._bUseArrowUp = true; //We later set it to false with mouseup event of window
			this._vBarArrowUp.switchClass(this.css.verticalScrollArrowUpActive,
											this.css.verticalScrollArrowUp);
			clearTimeout(this._holdTimeoutID);
		},

		_onMouseOverArrowUp: function() {
			if (this._bMouseDownV && this._bUseArrowUp) {
				this._scrollTimeoutY(-40, true);
			}
		},

		_onMouseOutScrollbarArrow: function () {
			clearTimeout(this._holdTimeoutID);
		},

		_onMouseDownArrowDown: function () {
			var scrollStep = this.options.smallIncrementStep,
				curPosY = this._getContentPositionY();
			if (curPosY === this._contentHeight - this._dragMaxY) {
				scrollStep = 0;
			}

			var bNoCancel = this._trigger("scrolling", null, {
				owner: this,
				smallIncrement: 1,
				bigIncrement: 0,
				horizontal: false,
				stepX: 0,
				stepY: scrollStep
			});

			if (bNoCancel) {
				this._bMouseDownV = true;
				this._bUseArrowDown = true;
				this._vBarArrowDown.switchClass(this.css.verticalScrollArrowDown,
												this.css.verticalScrollArrowDownActive);

				this._scrollTop(curPosY + scrollStep, false);

				var self = this;
				this._holdTimeoutID = setTimeout(function () {
					self._scrollTimeoutY(scrollStep, true);
				}, 250);
			}

			return false;
		},

		_onMouseUpArrowDown: function() {
			this._bMouseDownV = false;
			this._bUseArrowDown = true; //We later set it to false with mouseup event of window
			this._vBarArrowDown.switchClass(this.css.verticalScrollArrowDownActive,
											this.css.verticalScrollArrowDown);
			clearTimeout(this._holdTimeoutID);
		},

		_onMouseOverArrowDown: function() {
			if (this._bMouseDownV && this._bUseArrowDown) {
				this._scrollTimeoutY(40, true);
			}
		},

		_onMouseDownVDrag: function (event) {
			this._bMouseDownV = true;
			this._dragLastY = event.pageY;
			this._bUseVDrag = true;
			this._bUseHDrag = false;

			this._trigger("thumbDragStart", null, {
				owner: this,
				horizontal: false
			});
		},

		_onMouseDownVTrack: function (event) {
			if (event.target.id === this._vBarDrag[ 0 ].id) {
				return false;
			}

			this._bUseVTrack = true;

			var	self = this,
				dragStartY = this._getTransform3dValueY(this._vBarDrag),
				curPosY = this._getContentPositionY(),
				scrollStep = this.options.bigIncrementStep === null ?
								this._elemHeight :
								this.options.bigIncrementStep,
				bNoCancel;

			this._mTrackLastPosV = event.offsetY;
			if (event.offsetY > dragStartY + this._vDragHeight) {
				/* Scroll down */
				this._lastBigIncDirV = 1;
				bNoCancel = this._trigger("scrolling", null, {
					owner: this,
					smallIncrement: 0,
					bigIncrement: 1,
					horizontal: false,
					stepX: 0,
					stepY: scrollStep
				});

				if (bNoCancel) {
					this._scrollTop(curPosY + scrollStep, false);
					this._holdTimeoutID = setTimeout(function () {
						self._scrollTimeoutY(scrollStep, false);
					}, 250);
				}
			} else if (event.offsetY < dragStartY) {
				/* Scroll up */
				this._lastBigIncDirV = -1;
				bNoCancel = this._trigger("scrolling", null, {
					owner: this,
					smallIncrement: 0,
					bigIncrement: -1,
					horizontal: false,
					stepX: 0,
					stepY: -scrollStep
				});

				if (bNoCancel) {
					this._scrollTop(curPosY - scrollStep, false);
					this._holdTimeoutID = setTimeout(function () {
						self._scrollTimeoutY(-scrollStep, false);
					}, 250);
				}
			}

			return false;
		},

		_onMouseMoveVTrack: function(event) {
			//Update the last know position of the mouse that is interacting with the vertical track area
			if (this._bUseVTrack) {
				this._mTrackLastPosV = event.offsetY;
			}
		},

		_onMouseUpVTrack: function() {
			clearTimeout(this._holdTimeoutID);

			if (this._bUseVTrack) {
				this._trigger("scrolled", null, {
					owner: this,
					smallIncrement: 0,
					bigIncrement: this._lastBigIncDirV,
					horizontal: false
				});
			}
			this._bUseVTrack = false;
		},

		_onMouseOutVTrack: function() {
			clearTimeout(this._holdTimeoutID);

			if (this._bUseVTrack) {
				this._trigger("scrolled", null, {
					owner: this,
					smallIncrement: 0,
					bigIncrement: this._lastBigIncDirV,
					horizontal: false
				});
			}
			this._bUseVTrack = false;
		},

		_onMouseMoveVDrag: function (event) {
			/* Ensures if we move the mouse of the bounds of the vertical scroll bar and we are still holding left mouse button that when we move the mouse up/down we will continue to scroll */
			if (!this._bMouseDownV || !this._bUseVDrag) {
				return true;
			}

			if (this._bUseVDrag) {
				var curPosY = this._getContentPositionY(),
					offset = event.pageY - this._dragLastY,
					nextPosY = curPosY + (offset * (this._contentHeight / (this._elemHeight - 3 * 17)));

				var bNoCancel = this._trigger("thumbDragMove", null, {
					owner: this,
					horizontal: false,
					stepX: 0,
					stepY: nextPosY - curPosY
				});

				if (bNoCancel) {
					//Move custom vertical scrollbar thumb drag
					this._scrollToY(nextPosY, true);
					this._dragLastY = event.pageY;
				}
			}
		},

		_onMouseUpVScrollbar: function () {
			var self = this;

			/* Ensures when the left mouse button is realeas that all properties are back to their default state */
			/* Works even if the mouse is out of the browser boundries and we release the left mouse button */
			if (this._bUseArrowUp) {
				this._bUseArrowUp = false;
				this._vBarArrowUp
					.switchClass(this.css.verticalScrollArrowUpActive, this.css.verticalScrollArrowUp);

				this._trigger("scrolled", null, {
					owner: this,
					smallIncrement: -1,
					bigIncrement: 0,
					horizontal: false
				});
			}
			if (this._bUseArrowDown) {
				this._bUseArrowDown = false;
				this._vBarArrowDown
					.switchClass(this.css.verticalScrollArrowDownActive, this.css.verticalScrollArrowDown);

				this._trigger("scrolled", null, {
					owner: this,
					smallIncrement: 1,
					bigIncrement: 0,
					horizontal: false
				});
			}

			//If the mouse was previously hold over an element an we release it.
			if (this._bMouseDownV && !this._mOverScrollbars && !this._mOverContainer) {
				/** Scenario:
				*	1. Click and hold a horizontal scrollbar element
				*	2. Move the mouse outside the scrollable container
				*	3. Release the mouse
				*
				*	We hide the scrollbar after 2 secs since the mouse is outside the scrollable content
				*/
				this._hideScrollbarID = setTimeout(function () {
					self._hideScrollBars(false);
				}, 2000);
			} else if (this._bMouseDownV && !this._mOverScrollbars && this._mOverContainer) {
				/** Scenario:
				*	1. Click and hold a horizontal scrollbar element
				*	2. Move the mouse inside the scrollable container
				*	3. Release the mouse
				*
				*	We don't hide the scrollbar this time but switch to simple after 2 secs
				*/
				this._toSimpleScrollbarID = setTimeout(function () {
					self._toSimpleScrollbar();
					self._toSimpleScrollbarID = 0;
				}, 2000);
			}
			this._bMouseDownV = false;

			if (this._bUseVDrag) {
				this._trigger("thumbDragEnd", null, {
					owner: this,
					horizontal: false
				});

				this._trigger("scrolled", null, {
					owner: this,
					smallIncrement: 0,
					bigIncrement: 0,
					horizontal: true
				});
			}
			this._bUseVDrag = false;
		},

		_initCustomScrollBarH: function () {
			var css = this.css;

			this._hBarContainer = $("<div id='" + this.element.attr("id") + "_hBar'></div>")
				.addClass(css.horizontalScrollContainer)
				.css("width", this._elemWidth + "px");

			this._hBarArrowLeft = $("<div id='" + this.element.attr("id") + "_hBar_arrowLeft'></div>")
				.addClass(css.horizontalScrollArrow)
				.addClass(css.horizontalScrollArrowLeft);

			this._hBarTrack = $("<div id='" + this.element.attr("id") + "_hBar_track'></div>")
				.addClass(css.horizontalScrollTrack)
				.css("width", this._elemWidth - (3 * 15) + "px");

			this._hBarArrowRight = $("<div id='" + this.element.attr("id") + "_hBar_arrowRight'></div>")
				.addClass(css.horizontalScrollArrow)
				.addClass(css.horizontalScrollArrowRight);

			this._hDragWidth = (this._elemWidth - 3 * 15) * this._percentInViewH;
			this._hBarDrag = $("<span id='" + this.element.attr("id") + "_hBar_drag'></span>")
				.addClass(css.horizontalScrollThumbDrag)
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
					.appendTo(this._container[ 0 ].parentElement);
			}

			this._bindCustomScrollBarH();
		},

		_bindCustomScrollBarH: function () {
			this._holdTimeoutID = 0;
			this._bMouseDownH = false;
			this._bUseArrowLeft = false; //Used to distinquis which on which element left mouse if being hold
			this._bUseArrowRight = false; //Used to distinquis which on which element left mouse if being hold
			this._bUseHDrag = false; //Used to distinquis which on which element left mouse if being hold
			this._dragLastX = 0; //Determines the last position of the thumb drag for the horizontal scrollbar
			this._bUseHTrack = false; //Determines if the horizontal track area is being used
			this._lastBigIncDirH = 0; //Used to determine the last direction of the scroll when using the horizontal track area
			this._mTrackLastPosH = 0; //Last know position of the mouse when interacting with the horizontal track area

			if (this._hBarArrowLeft) {
				this._hBarArrowLeft.on({
					mousedown: $.proxy(this._onMouseDownArrowLeft, this),
					mouseup: $.proxy(this._onMouseUpArrowLeft, this),
					mouseover: $.proxy(this._onMouseOverArrowLeft, this),

					mouseout: $.proxy(this._onMouseOutScrollbarArrow, this),
					touchstart: $.proxy(this._onTouchStartScrollbarElem, this)
				});
			}

			if (this._hBarArrowRight) {
				this._hBarArrowRight.on({
					mousedown: $.proxy(this._onMouseDownArrowRight, this),
					mouseup: $.proxy(this._onMouseUpArrowRight, this),
					mouseover: $.proxy(this._onMouseOverArrowRight, this),

					mouseout: $.proxy(this._onMouseOutScrollbarArrow, this),
					touchstart: $.proxy(this._onTouchStartScrollbarElem, this)
				});
			}

			if (this._hBarDrag) {
				this._hBarDrag.on({
					mousedown: $.proxy(this._onMouseDownHDrag, this),

					touchstart: $.proxy(this._onTouchStartScrollbarElem, this)
				});
			}

			if (this._hBarTrack) {
				this._hBarTrack.on({
					mousedown: $.proxy(this._onMouseDownHTrack, this),
					mousemove: $.proxy(this._onMouseMoveHTrack, this),
					mouseup: $.proxy(this._onMouseUpHTrack, this),
					mouseout: $.proxy(this._onMouseOutHTrack, this),

					touchstart: $.proxy(this._onTouchStartScrollbarElem, this)
				});
			}

			if (this._hBarContainer) {
				this._hBarContainer.on({
					wheel: $.proxy(this._onWheelContainer, this),
					mouseenter: $.proxy(this._onMouseEnterScrollbarElem, this),
					mouseleave: $.proxy(this._onMouseLeaveScrollbarElem, this)
				});
			}

			/* We bind it to the body to be able to detect while holding the Thumb Drag and moving out of the scrollbar area. It should still scroll while still holding and moving inside the window */
			$("body").on("mousemove", $.proxy(this._onMouseMoveHDrag, this));
			/* We bind it to the wondow to be able to determine while the user releases the mouse even when it is out of the browser window */
			$(window).on("mouseup", $.proxy(this._onMouseUpHScrollbar, this));
		},

		/** Used when one of the Arrow Left/Right or Horizontal Track is being used by holding mouse button on them to constantly scroll on the X axis */
		_scrollTimeoutX: function (step, bSmallIncement) {
			var curPosX = this._getContentPositionX();
			if ((curPosX === 0 && step <= 0) ||
				(curPosX === this._contentWidth - this._dragMaxX && step >= 0)) {
				return;
			}

			var	self = this,
				bNoCancel,
				eventArgs = {
					owner: self,
					smallIncrement: 0,
					bigIncrement: 0,
					horizontal: true,
					stepX: step,
					stepY: 0
				};

			//Check if the increment is big or small and set the proper value in the eventArgs
			if (bSmallIncement) {
				eventArgs.smallIncrement = Math.sign(step);
			} else {
				var dragStartX = this._getTransform3dValueX(this._hBarDrag);

				//Check if the mouse is over the horizontal thumb drag. This means it has reached the position of where the mouse is currently held (on the horizontal track) and scrolling should stop.
				if (this._mTrackLastPosH > dragStartX &&
					this._mTrackLastPosH < dragStartX + this._hDragWidth) {
					return;
				}

				eventArgs.bigIncrement = Math.sign(step);
				this._lastBigIncDirH = Math.sign(step);
			}
			bNoCancel = this._trigger("scrolling", null, eventArgs);

			if (bNoCancel) {
				//Scroll content
				var curPosY = this._getContentPositionX();
				this._scrollLeft(curPosY + step, false);

				this._holdTimeoutID = setTimeout(function () {
					self._scrollTimeoutX(step, bSmallIncement);
				}, 50);
			}
		},

		_onMouseDownArrowLeft: function () {
			var scrollStep = -this.options.smallIncrementStep,
				curPosX = this._getContentPositionX();

			if (curPosX === 0) {
				//We are at the top. Step should be 0
				scrollStep = 0;
			}

			var bNoCancel = this._trigger("scrolling", null, {
				owner: this,
				smallIncrement: -1,
				bigIncrement: 0,
				horizontal: true,
				stepX: scrollStep,
				stepY: 0
			});

			if (bNoCancel) {
				this._bMouseDownH = true;
				this._bUseArrowLeft = true;
				this._hBarArrowLeft
					.switchClass(this.css.horizontalScrollArrowLeft, this.css.horizontalScrollArrowLeftActive);

				this._scrollLeft(curPosX + scrollStep, false);

				var self = this;
				this._holdTimeoutID = setTimeout(function () {
					self._scrollTimeoutX(scrollStep, true);
				}, 250);
			}

			return false;
		},

		_onMouseUpArrowLeft: function () {
			this._bMouseDownH = false;
			this._bUseArrowLeft = false;
			this._hBarArrowLeft
				.switchClass(this.css.horizontalScrollArrowLeftActive, this.css.horizontalScrollArrowLeft);

			clearTimeout(this._holdTimeoutID);

			this._trigger("scrolled", null, {
				owner: this,
				smallIncrement: -1,
				bigIncrement: 0,
				horizontal: true
			});
		},

		_onMouseOverArrowLeft: function () {
			if (this._bMouseDownH && this._bUseArrowLeft) {
				this._scrollTimeoutX(-40, true);
			}
		},

		_onMouseDownArrowRight: function () {
			var scrollStep = this.options.smallIncrementStep,
				curPosX = this._getContentPositionX();

			if (curPosX === this._contentWidth - this._dragMaxX) {
				//We are at the bottom
				scrollStep = 0;
			}

			var bNoCancel = this._trigger("scrolling", null, {
				owner: this,
				smallIncrement: 1,
				bigIncrement: 0,
				horizontal: true,
				stepX: scrollStep,
				stepY: 0
			});

			if (bNoCancel) {
				this._bMouseDownH = true;
				this._bUseArrowRight = true;
				this._hBarArrowRight
					.switchClass(this.css.horizontalScrollArrowRight, this.css.horizontalScrollArrowRightActive);

				this._scrollLeft(curPosX + scrollStep, false);

				var self = this;
				this._holdTimeoutID = setTimeout(function () { self._scrollTimeoutX(scrollStep, true); }, 250);
			}

			return false;
		},

		_onMouseUpArrowRight: function () {
			this._bMouseDownH = false;
			this._bUseArrowRight = false;
			this._hBarArrowRight
				.switchClass(this.css.horizontalScrollArrowRightActive, this.css.horizontalScrollArrowRight);

			clearTimeout(this._holdTimeoutID);

			this._trigger("scrolled", null, {
				owner: this,
				smallIncrement: 1,
				bigIncrement: 0,
				horizontal: true
			});
		},

		_onMouseOverArrowRight: function () {
			if (this._bMouseDownH && this._bUseArrowRight) {
				this._scrollTimeoutX(40, true);
			}
		},

		_onMouseDownHDrag: function (event) {
			this._bMouseDownH = true;
			this._dragLastX = event.pageX;
			this._bUseVDrag = false;
			this._bUseHDrag = true;

			this._trigger("thumbDragStart", null, {
				owner: this,
				horizontal: true
			});
		},

		_onMouseDownHTrack: function (event) {
			if (event.target.id === this._hBarDrag[ 0 ].id) {
				return false;
			}

			this._bUseHTrack = true;

			var	self = this,
				dragStartX = this._getTransform3dValueX(this._hBarDrag),
				curPosX = this._getContentPositionX(),
				scrollStep = this.options.bigIncrementStep === null ?
								this._elemWidth :
								this.options.bigIncrementStep,
				bNoCancel;

			this._mTrackLastPosH = event.offsetX;
			if (event.offsetX > dragStartX + this._hDragWidth) {
				//Scroll right
				this._lastBigIncDirH = 1;
				bNoCancel = this._trigger("scrolling", null, {
					owner: this,
					smallIncrement: 0,
					bigIncrement: 1,
					horizontal: true,
					stepX: scrollStep,
					stepY: 0
				});

				if (bNoCancel) {
					this._scrollLeft(curPosX + scrollStep, false);
					this._holdTimeoutID = setTimeout(function () {
						self._scrollTimeoutX(scrollStep, false);
					}, 250);
				}
			} else if (event.offsetX < dragStartX) {
				//Scroll left
				this._lastBigIncDirH = -1;
				bNoCancel = this._trigger("scrolling", null, {
					owner: this,
					smallIncrement: 0,
					bigIncrement: -1,
					horizontal: true,
					stepX: -scrollStep,
					stepY: 0
				});

				if (bNoCancel) {
					this._scrollLeft(curPosX - scrollStep, false);
					this._holdTimeoutID = setTimeout(function () {
						self._scrollTimeoutX(-scrollStep, false);
					}, 250);
				}
			}

			return false;
		},

		_onMouseMoveHTrack: function (event) {
			//Update the last know position of the mouse that is interacting with the horizontal track area
			if (this._bUseVTrack) {
				this._mTrackLastPosH = event.offsetX;
			}
		},

		_onMouseUpHTrack: function () {
			clearTimeout(this._holdTimeoutID);

			if (this._bUseHTrack) {
				this._trigger("scrolled", null, {
					owner: this,
					smallIncrement: 0,
					bigIncrement: this._lastBigIncDirH,
					horizontal: true
				});
			}
			this._bUseHTrack = false;
		},

		_onMouseOutHTrack: function () {
			clearTimeout(this._holdTimeoutID);

			if (this._bUseHTrack) {
				this._trigger("scrolled", null, {
					owner: this,
					smallIncrement: 0,
					bigIncrement: this._lastBigIncDirH,
					horizontal: true
				});
			}
			this._bUseHTrack = false;
		},

		_onMouseMoveHDrag: function (evt) {
			/* Ensures if we move the mouse of the bounds of the horizontal scroll bar and we are still holding left mouse button that when we move the mouse left/right we will continue to scroll */
			if (!this._bMouseDownH || !this._bUseHDrag) {
				return true;
			}

			if (this._bUseHDrag) {
				var curPosX = this._getContentPositionX(),
					offset = evt.pageX - this._dragLastX,
					nextPostX = curPosX + (offset * (this._contentWidth / this._elemWidth));

				var bNoCancel = this._trigger("thumbDragMove", null, {
					owner: this,
					horizontal: true,
					stepX: nextPostX - curPosX,
					stepY: 0
				});

				if (bNoCancel) {
					//Move custom horizondal scrollbar thumb drag
					this._scrollToX(nextPostX, true);
					this._dragLastX = evt.pageX;
				}
			}
		},

		_onMouseUpHScrollbar: function () {
			var self = this;

			/* Ensures when the left mouse button is realeas that all properties are back to their default state */
			/* Works even if the mouse is out of the browser boundries and we release the left mouse button */
			if (this._bUseArrowLeft) {
				this._bUseArrowLeft = false;
				this._hBarArrowLeft
					.switchClass(this.css.horizontalScrollArrowLeftActive, this.css.horizontalScrollArrowLeft);

				this._trigger("scrolled", null, {
					owner: this,
					smallIncrement: -1,
					bigIncrement: 0,
					horizontal: true
				});
			}
			if (this._bUseArrowRight) {
				this._bUseArrowRight = false;
				this._hBarArrowRight
					.switchClass(this.css.horizontalScrollArrowRightActive, this.css.horizontalScrollArrowRight);

				this._trigger("scrolled", null, {
					owner: this,
					smallIncrement: 1,
					bigIncrement: 0,
					horizontal: true
				});
			}

			//If the mouse was previously hold over an element an we release it.
			if (this._bMouseDownH && !this._mOverScrollbars && !this._mOverContainer) {
				/** Scenario:
				*	1. Click and hold a horizontal scrollbar element
				*	2. Move the mouse outside the scrollable container
				*	3. Release the mouse
				*
				*	We hide the scrollbar after 2 secs since the mouse is outside the scrollable content
				*/
				this._hideScrollbarID = setTimeout(function () {
					self._hideScrollBars(false);
				}, 2000);
			} else if (this._bMouseDownH && !this._mOverScrollbars && this._mOverContainer) {
				/** Scenario:
				*	1. Click and hold a horizontal scrollbar element
				*	2. Move the mouse inside the scrollable container
				*	3. Release the mouse
				*
				*	We don't hide the scrollbar this time but switch to simple after 2 secs
				*/
				this._toSimpleScrollbarID = setTimeout(function () {
					self._toSimpleScrollbar();
					self._toSimpleScrollbarID = 0;
				}, 2000);
			}
			this._bMouseDownH = false;

			if (this._bUseHDrag) {
				this._trigger("thumbDragEnd", null, {
					owner: this,
					horizontal: true
				});

				this._trigger("scrolled", null, {
					owner: this,
					smallIncrement: 0,
					bigIncrement: 0,
					horizontal: true
				});
			}
			this._bUseHDrag = false;
		},

		/** Shows the mobile/touch scrollbars when they are hidden.
		*
		*	animate - true/false if hide the scrollbar slowly with animation and not momentarily
		*	bDragOnly - show only the drag button. Used when using simple scrollbars
		*/
		_showScrollBars: function (animate, bDragOnly, hideAfterShown, opacityStep) {
			if (this.options.scrollbarType !== "custom") {
				return;
			}

			var self = this,
				targetOpacty = 0.9,
				currentOpacity = 0;

			function showStep() {
				if (currentOpacity > targetOpacty) {
					/* end */
					if (hideAfterShown) {
						self._hideScrollBars(true, opacityStep);
					}

					self._touchBarsShown = true;
					cancelAnimationFrame(self._showScrollbarsAnimId);
					self._showScrollbarsAnimId = 0;
					return;
				}

				if (bDragOnly) {
					self._setSimpleScrollBarOpacity(currentOpacity);
				} else {
					self._setScrollBarsOpacity(currentOpacity);
				}
				currentOpacity += opacityStep ? opacityStep : 0.05;

				/* continue */
				self._showScrollbarsAnimId = requestAnimationFrame(showStep);
			}

			if (!animate) {
				if (bDragOnly) {
					self._setSimpleScrollBarOpacity(targetOpacty);
				} else {
					self._setScrollBarsOpacity(targetOpacty);
				}

				self._touchBarsShown = true;
			} else {
				this._showScrollbarsAnimId = requestAnimationFrame(showStep);
			}
		},

		_updateScrollBarsPos: function (destX, destY) {
			if (this.options.scrollbarType !== "custom") {
				return;
			}

			var self = this,
				animationID,
				calculatedDest;

			function updateCSS() {
				if (self._hBarDrag) {
					calculatedDest = destX * (self._elemWidth - 3 * 15) / self._contentWidth;

					self._hBarDrag
						.css("-webkit-transform", "translate3d(" + calculatedDest + "px, 0px, 0px)") /* Safari */
						.css("-moz-transform", "translate3d(" + calculatedDest + "px, 0px, 0px)") /* Firefox */
						.css("-ms-transform", "translate3d(" + calculatedDest + "px, 0px, 0px)"); /* IE */
				}
				if (self._vBarDrag) {
					calculatedDest = destY * (self._elemHeight - 3 * 15) / self._contentHeight;

					self._vBarDrag
						.css("-webkit-transform", "translate3d(0px, " + calculatedDest + "px, 0px)")
						.css("-moz-transform", "translate3d(0px, " + calculatedDest + "px, 0px)")
						.css("-ms-transform", "translate3d(0px, " + calculatedDest + "px, 0px)");
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
			if (this.options.scrollbarType !== "custom" ||
					this.options.alwaysVisible || (!this._vBarDrag && !this._hBarDrag)) {
				return;
			}

			var self = this,
				targetOpacty = 0,
				currentOpacity = this._vBarDrag ? this._vBarDrag.css("opacity") : this._hBarDrag.css("opacity"),
				animationId;

			if (currentOpacity === 0) {
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
				this._vBarDrag
					.css("opacity", newOpacity)
					.css("width", 5 + "px");
			}

			if (this._hBarDrag && this._percentInViewH < 1) {
				this._hBarDrag
					.css("height", 5 + "px")
					.css("top", 5 + "px")
					.css("opacity", newOpacity);
			}
		},

		/** Sets the desktop scrollbars opacity. */
		_setScrollBarsOpacity: function (newOpacity) {
			if (this._vBarDrag && (this._percentInViewV < 1)) {
				this._vBarDrag
					.css("width", 9 + "px")
					.css("opacity", newOpacity);
				this._vBarArrowUp.css("opacity", newOpacity);
				this._vBarArrowDown.css("opacity", newOpacity);
			}

			if (this._hBarDrag && this._percentInViewH < 1) {
				this._hBarDrag
					.css("height", 9 + "px")
					.css("top", 3 + "px")
					.css("opacity", newOpacity);
				this._hBarArrowLeft.css("opacity", newOpacity);
				this._hBarArrowRight.css("opacity", newOpacity);
			}
		},

		_toSimpleScrollbar: function () {
			if (this._vBarDrag && (this._percentInViewV < 1)) {
				this._vBarDrag
					.css("width", 5 + "px");
				this._vBarArrowUp.css("opacity", 0);
				this._vBarArrowDown.css("opacity", 0);
			}

			if (this._hBarDrag && this._percentInViewH < 1) {
				this._hBarDrag
					.css("height", 5 + "px")
					.css("top", 5 + "px");
				this._hBarArrowLeft.css("opacity", 0);
				this._hBarArrowRight.css("opacity", 0);
			}
		},

		_onMouseEnterScrollbarElem: function() {
			this._mOverScrollbars = true;

			//Cancels the hide scrollbars timeout
			clearTimeout(this._hideScrollbarID);

			//Cancel any timeout set to switch to simple scrollbar. Makes sure we don't switch to simple while we still hover over the scrollbars.
			clearTimeout(this._toSimpleScrollbarID);
			this._toSimpleScrollbarID = 0;

			this._showScrollBars(false);
		},

		_onMouseLeaveScrollbarElem: function () {
			var self = this;

			this._mOverScrollbars = false;
			if (!this._bMouseDownV && !this._bMouseDownH) {
				//Hide scrollbars after 2 secconds. This will be canceled if we go the scrollable content or any other element of the scrollbars by _hideScrollbarID
				this._hideScrollbarID = setTimeout(function () {
					self._hideScrollBars(false);
				}, 2000);

				//Switch to simple scrollbar (i.e. only drag bar showing with no arrows) after timeout of 2sec
				this._toSimpleScrollbarID = setTimeout(function () {
					self._toSimpleScrollbar();
					self._toSimpleScrollbarID = 0;
				}, 2000);
			}
		},

		/** Doesn't allow interacting with the scrollbars with touch actions */
		_onTouchStartScrollbarElem: function() {
			return false;
		},

		destroy: function () {
			cancelAnimationFrame(this._touchInertiaAnimID);
			cancelAnimationFrame(this._showScrollbarsAnimId);
			clearTimeout(this._hideScrollbarID);
			clearTimeout(this._toSimpleScrollbarID);

			if (this.evts) {
				this.element.off(this.evts);
				delete this.evts;

				if (this._hBarDrag) {
					this._hBarDrag.remove();
				}
				if (this._hBarContainer) {
					this._hBarContainer.remove();
				}
				if (this._vBarDrag) {

					this._vBarDrag.remove();
				}
				if (this._vBarContainer) {
					this._vBarContainer.remove();
				}
				$.Widget.prototype.destroy.apply(this, arguments);
			}
			return this;
		}
	});
	$.extend($.ui.igScroll, { version: "<build_number>" });
	$(document).on("igcontrolcreated", function (event, args) {
		/* M.H. 5 Feb 2014 Fix for bug #161906: Scrolling is not possible with virtualization and the grid rendered on button click on an iPad */
		var container = args.owner.scrollContainer();
		if (container.length === 0 && args.owner.container) {
			container = args.owner.container().find("[data-scroll]").eq(0);
		}
		container.igScroll({ modifyDOM: false });
	});
}(jQuery));
