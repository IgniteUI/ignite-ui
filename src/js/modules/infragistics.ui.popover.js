/*!@license
 * Infragistics.Web.ClientUI jQuery Popover <build_number>
 *
 * Copyright (c) 2013-<year> Infragistics Inc.
 *
 * http://www.infragistics.com/
 *
 * Depends on:
 *  jquery-1.9.1.js
 *  jquery.ui.core.js
 *  jquery.ui.widget.js
 *  infragistics.util.js
 */

/*global define, jQuery, HTMLElement */
(function (factory) {
	if (typeof define === "function" && define.amd) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"jquery-ui",
			"./infragistics.util",
			"./i18n/infragistics.ui.popover-en"
		], factory );
	} else {

		// Browser globals
		factory(jQuery);
	}
}
(function ($) {
	$.widget("ui.igPopover", {
		css: {
			/* classes applied to the main popover container */
			baseClasses: "ui-widget ui-igpopover",
			/* classes applied to the popover arrow (like ui-igpopover-arrow-top, ui-igpopover-arrow-left, etc)*/
			arrowBaseClass: "ui-igpopover-arrow ui-igpopover-arrow-",
			/* classes applied to the close button */
			closeButtonClass: "ui-icon ui-icon-closethick ui-igpopover-close-button",
			/* classes applied to the title container(if title is defined in options) */
			titleClass: "ui-igpopover-title"
		},
		options: {
			/* type="bool" controls whether the popover will close on blur or not */
			closeOnBlur: true,
			/* type="auto|left|right|top|bottom" controls the direction in which the control shows relative to the target element
				auto type="string" lets the control show on the side where enough space is available with the following priority top > bottom > right > left
				left type="string" shows popover on the left side of the target element
				right type="string" shows popover on the right side of the target element
				top type="string" shows popover on the top of the target element
				bottom type="string" shows popover on the bottom of the target element
			*/
			direction: "auto",
			/* type="auto|balanced|start|end" controls the position of the popover according to the target element in case the popover is larger than the target on the side we want to position, if the popover is smaller it should always be in the middle of the visible area
				auto type="string" lets the control choose a position depending on available space with the following priority balanced > end > start
				balanced type="string" the popover is positioned at the middle of the target element
				start type="string" the popover is positioned at the beginning of the target element
				end type="string" the popover is positioned at the end of the target element
			*/
			position: "auto",
			/* type="number|string" defines width for the popover. leave null for auto.
				number The width can be set as a number.
				string The width can be set in pixels (px).
			*/
			width: null,
			/* type="number|string" defines height for the popover. leave null for auto
				number The height can be set as a number.
				string The height can be set in pixels (px).
			*/
			height: null,
			/* type="number|string" defines width the popover won't go under the value even if no specific one is set.
				number The minWidth can be set as a number.
				string The minWidth can be set in pixels (px).
			*/
			minWidth: 60,
			/* type="number|string" defines width the popover won't exceed even if no specific one is set.
				number The maxWidth can be set as a number.
				string The maxWidth can be set in pixels (px).
			*/
			maxWidth: 200,
			/* type="number|string" defines height the popover won't exceed even if no specific one is set.
				number The max height can be set as a number.
				string The max height can be set in pixels (px).
			*/
			maxHeight: 200,
			/* type="number" sets the time popover fades in and out when showing/hiding */
			animationDuration: 150,
			/* type="string|function" sets the content for the popover container. If left null the content will be get from the target.
				string type="string" String content of the popover container
				function type="function" Function which is a callback that should return the content. Use the 'this' value to access the target DOM element.
			*/
			contentTemplate: null,
			/* type="string" Selectors indicating which items should show popovers. The predefined value is [title]. Customize if you're using something other then the title attribute for the popover content, or if you need a different selector for event delegation. When changing this option, you likely need to also change the contentTemplate option
			*/
			selectors: null,
			/* type="object" sets the content for the popover header */
			headerTemplate: {
				/* type="bool" controls whether the popover renders a functional close button */
				closeButton: false,
				/* type="string" sets the content for the popover header */
				title: null
			},
			/* type="mouseenter|click|focus" sets the event on which the popover will be shown. Predefined values are "mouseenter", "click" and "focus"
				mouseenter   type="string" the popover is shown on mouse enter in the target element
				click        type="string" the popover is shown on click on the target element
				focus        type="string" the popover is shown on focusing the target element
			*/
			showOn: "mouseenter",
			/* type="object" sets the containment for the popover. Accepts a jQuery object */
			containment: null,
			/* type="string|object" Controls where the popover DOM should be attached to.
				string type="string" A valid jQuery selector for the element
				object type="object" A reference to the parent jQuery object
			*/
			appendTo: "body"
		},
		events: {
			/* cancel="true" Event fired before popover is shown.
			Function takes arguments evt and ui.
			Use ui.element to get the element the popover will show for.
			Use ui.content to get or set the content to be shown as a string.
			Use ui.popover to get the popover element showing.
			Use ui.owner to get reference to the igPopover widget
			*/
			showing: "showing",
			/* Event fired after popover is shown.
			Function takes arguments evt and ui.
			Use ui.element to get the element the popover showed for.
			Use ui.content to get the content that was shown as a string.
			Use ui.popover to get the popover element shown.
			Use ui.owner to get reference to the igPopover widget
			*/
			shown: "shown",
			/* cancel="true" Event fired before popover is hidden.
			Function takes arguments evt and ui.
			Use ui.element to get the element the popover will hide for.
			Use ui.content to get the current content displayed in the popover as a string.
			Use ui.popover to get the popover element hiding.
			Use ui.owner to get reference to the igPopover widget
			*/
			hiding: "hiding",
			/* Event fired after popover is hidden.
			Function takes arguments evt and ui.
			Use ui.element to get the element the popover is hidden for.
			Use ui.content to get the content displayed in the popover as a string.
			Use ui.popover to get the popover element hidden.
			Use ui.owner to get reference to the igPopover widget
			*/
			hidden: "hidden"
		},
		_create: function () {
			// T.G. 24 Jan 2014 Fix for bug 161249 - Target option is not obligatory because the user expects it to be the element on which the popover is initialized
			this._target = ( this.options.selectors === null ||
				this.options.selectors === undefined ) ?
				this.element :
				null;
			this._priorityDir = [ "bottom", "top", "right", "left" ];
			this._arrowDir = [ "top", "bottom", "left", "right" ];
			this._positions = [ "balanced", "start", "end" ];
			this._directionIndex = -1;
			this._positionIndex = -1;
			this._forced = this.options.direction !== "auto" && this.options.position !== "auto";
			this._visible = false;
			$( window ).on( "resize.popover", $.proxy( this._resizeHandler, this ) );
		},
		_createWidget: function (options, element) {
			$.Widget.prototype._createWidget.apply(this, arguments);
			this.element = $(element);
			if (element && element.nodeType !== undefined) {
				this._renderPopover();
			}
			if (this.options.direction !== "auto" || this.options.position !== "auto") {
				this._getPrioritiesIndex();
			}
		},
		_setOption: function (key, value) {
			switch (key) {
				case "direction":
					this.options.direction = value;
					if (this.options.direction !== "auto") {
						this._getPrioritiesIndex();
					}
					this._forced = this.options.direction !== "auto" && this.options.position !== "auto";
					this._resizeHandler();
					break;
				case "position":
					this.options.position = value;
					if (this.options.position !== "auto") {
						this._getPrioritiesIndex();
					}
					this._forced = this.options.direction !== "auto" && this.options.position !== "auto";
					break;
				case "contentTemplate":
					if (typeof value === "string") {
						this.options.contentTemplate = value;
					}
					break;
				case "animationDuration":
					if (typeof value === "number") {
						this.options.animationDuration = value;
					}
					break;
				case "containment":
					if (value instanceof jQuery) {
						this.options.containment = value;
					}
					break;
				case "closeOnBlur":
					this.options.closeOnBlur = value;
					break;
				case "headerTemplate":
				case "selectors":
				case "width":
				case "height":
				case "maxWidth":
				case "maxHeight":
				case "minWidth":
				case "showOn":
					throw new Error($.ig.Popover.locale.popoverOptionChangeNotSupported + " " + key);
				default:
					$.Widget.prototype._setOption.apply(this, arguments);
			}
		},
		destroy: function () {
			/* Destroys the popover widget.*/
			this._detachEventsFromTarget();
			$(window).off("resize.popover", this._resizeHandler);
			this.popover.remove();
			$.Widget.prototype.destroy.call(this);
			return this;
		},
		id: function () {
			/* returns the ID of the element the popover is attached to
				returnType="string"
			*/
			return this.element[ 0 ].id;
		},
		container: function () {
			/* returns the container for the popover contents
				returnType="object"
			*/
			return this.contentInner;
		},
		show: function (trg, content) {
			/* shows the popover for the specified target
				paramType="dom" optional="true" The element to show popover for.
				paramType="string" optional="true" The string to set for the popover to show.
			*/
			var target = trg || this._target;
			if (content) {
				this._setNewContent(content);
			}
			/*T.G. 23 Jan 2014 Fix for bug 162111 - An error is thrown when calling igPopover.show method when the igPopover.selectors is set*/
			if (target === null) {
				throw new Error($.ig.Popover.locale.popoverShowMethodWithoutTarget);
			}
			this._openPopover(target, true);
		},
		hide: function () {
			/* hides the popover for the specified target */
			this._closePopover(true);
		},
		getContent: function () {
			/* gets the currently set content for the popover container
				returnType="string" The popover content.
			*/
			return this.contentInner.html();
		},
		setContent: function (newCnt) {
			/* sets the content for the popover container
				paramType="string" The popover content to set.
			*/
			if (typeof newCnt === "string") {
				this._setNewContent(newCnt);
			}
		},
		target: function () {
			/* gets the popover current target
				returnType="object" The current target.
			*/
			if (this._currentTarget) {
				return this._currentTarget;
			}
			return null;
		},
		getCoordinates: function () {
			/* gets the current coordinates of the popover
				returnType="object" The popover coordinates in pixels.
			*/
			var currPosition = { left: 0, top: 0 };
			currPosition.left = this.popover.css("left");
			currPosition.top = this.popover.css("top");
			return currPosition;
		},
		setCoordinates: function (pos) {
			/* set the currently coordinates of the popover
				paramType="object" The popover coordinates in pixels.
			*/
			this.popover.css({
				"top": pos.top,
				"left": pos.left
			});
		},
		_renderPopover: function () {
			this.popover = $("<div></div>").addClass(this.css.baseClasses);
			/* D.P. Only assign ID if it's available */
			if (this.id()) {
				this.popover.attr("id", this.id() + "_popover");
			}
			/* T.G 12 Dec 2013 Fix 159000 - Arrow is separated from the inner frame */
			if (this.options.direction !== "auto") {
				this._getPrioritiesIndex();
				this.arrow = $("<div></div>")
					.addClass(this.css.arrowBaseClass + this._arrowDir[ this._directionIndex ])
					.appendTo(this.popover);
				if (this.id()) {
					this.arrow.attr("id", this.id() + "_popover_arrow");
			}
			}
			this.popover.appendTo(this.options.appendTo);
			this._attachEventsToTarget();
			this._createContentDiv();
		},
		_createContentDiv: function () {
			var cnt, currContent, rightMargin, isTouchDeviceWithIE = this._isTouchDevice() && $.ig.util.isIE;
			cnt = $("<div></div>")
				.css("position", "relative")
				.css("max-width", this.options.maxWidth)
				.css("max-height", this.options.maxHeight)
				.css("min-width", this.options.minWidth)
				.css("width", isTouchDeviceWithIE ? "auto" : (this.options.width || "auto"))
				.css("height", isTouchDeviceWithIE ? "auto" : (this.options.height || "auto"))
				.addClass("ui-widget-content ui-corner-all")
				.appendTo(this.popover);
			if (this.id()) {
				cnt.attr("id", this.id() + "_popover_contentFrame");
			}
			if (this.options.headerTemplate !== null) {
				if (this.options.headerTemplate.closeButton) {
					var closeBtn = $("<div></div>")
						.addClass(this.css.closeButtonClass)
						.bind("click.popover", $.proxy(this._closeBtnClick, this))
						.appendTo(cnt);
					if (this.id()) {
						closeBtn.attr("id", this.id() + "_popover_closeBtn");
				}
				}
				if (this.options.headerTemplate.title !== null) {
					var title = $("<div></div>")
						.addClass(this.css.titleClass)
						.html(this.options.headerTemplate.title)
						.appendTo(cnt);
					if (this.id()) {
						title.attr("id", this.id() + "_popover_title");
				}
			}
			}
			/* if there is a single target and a content set, the inner html is set to depend on them */
			currContent = this.options.contentTemplate;
			if ((typeof currContent === "string" || !currContent) && this._target) {
				/* the content is with priority over the title in case when target is set */
				currContent = this.options.contentTemplate || this._target[ 0 ].title || "";
			} else if (this.options.selectors !== null && !this._target && !currContent) {
				/* if no target and content are set, and the selectors is set than the title of the element will be displayed */
				this.options.contentTemplate = function () { return $(this).attr("title"); };
			} else if (typeof currContent === "function" && this._target) {
				currContent = this._getContentTemplate(this._target[ 0 ]);
			}
			rightMargin = ( this.options.headerTemplate.closeButton &&
				( this.options.headerTemplate.title === null ||
				this.options.headerTemplate.title === "" ) ) ?
				$( ".ui-icon" ).width() :
				null;
			this.contentInner = $("<div></div>")
				.css("position", "relative")
				.css("margin-right", rightMargin)
				.html(currContent)
				.appendTo(cnt);
			if (this.id()) {
				this.contentInner.attr("id", this.id() + "_popover_contentInner");
			}
			$("<div></div>")
			  .css("clear", "both")
			  .appendTo(cnt);
		},
		_updateArrowDiv: function (nDir, idx, trg) {
			var conDiv = this.contentInner.parent(),
				dims;
			if (!this.arrow) {
				/* T.G 12 Dec 2013 Fix 159000 - Arrow is separated from the inner frame */
				this.arrow = $("<div></div>")
					.addClass(this.css.arrowBaseClass + this._arrowDir[ idx ])
					.appendTo(this.popover);
				if (this.id()) {
					this.arrow.attr("id", this.id() + "_popover_arrow");
				}
			} else {
				this.arrow
					.removeClass("ui-igpopover-arrow-left " +
						"ui-igpopover-arrow-right " +
						"ui-igpopover-arrow-bottom " +
						"ui-igpopover-arrow-top")
					.addClass(this.css.arrowBaseClass + this._arrowDir[ idx ]);
			}
			dims = this._getHiddenElementsDimensions([ this.arrow, conDiv ], trg);
			/* Arrow should be positioned according to target, not according to content div. */
			/* T.G 12 Dec 2013 Fix 159000 - Arrow is separated from the inner frame */
			switch (nDir) {
				case "top":
					conDiv.css({
						"left": "",
						"top": dims[ 0 ].height * -1,
						"float": ""
					});
					this.arrow.css({
						"left": "",
						"top": "",
						"float": ""
					});
					break;
				case "bottom":
					conDiv.css({
						"left": "",
						"top": dims[ 0 ].height,
						"float": ""
					});
					this.arrow.css({
						"left": "",
						"top": "",
						"float": ""
					});
					break;
				case "left":
					conDiv.css({
						"left": dims[ 0 ].width * -1,
						"top": "",
						"float": "left"
					});
					this.arrow.css({
						"left": "",
						"top": "",
						"float": "left"
					});
					break;
				case "right":
					conDiv.css({
						"left": dims[ 0 ].width,
						"top": "",
						"float": "left"
					});
					this.arrow.css({
						"left": "",
						"top": "",
						"float": "left"
					});
					break;
			}
			this.oDir = nDir;
		},
		_targetMouseLeave: function () {
			this._hoveredTarget = null;
			if (this.options.closeOnBlur === true) {
				this._closePopover();
			}
		},
		_targetMouseMove: function (trg) {
			var self = this;
			/* if target is set , it is with higher priority than the selectors */
			if (this._target) {
				this._openPopover($(this._target));
			} else {
				/* T.G. Bug 150520 - (fix) set timeout for the mouseenter event */
				/* T.G  15.10.2013 Bug 154985 - Popover doesn't hide when the group of elements are shown fast */
				/* T.P. & M.H. Bug 154985 Previous fix has regressed the case when target element has no id. */
				$(trg.currentTarget).addClass("is-hover");
				setTimeout(function () {
					if (self._hoveredTarget === trg.currentTarget) {
						self._openPopover($(trg.currentTarget));
						$(trg.currentTarget).removeClass("is-hover");
					}
				}, self.options.animationDuration);
				this._hoveredTarget = trg.currentTarget;
			}
		},
		_targetClick: function (trg) {
			var t = this._target || trg.currentTarget;
			if ($(t).data("onFocus") && this.container().is(":visible")) {
				this._closePopover();
				$(t).data("onFocus", false);
			} else {
				this._openPopover($(t));
				$(t).focus();
				$(t).data("onFocus", true);
			}
		},
		_targetBlur: function (trg) {
			var t = this._target || trg.currentTarget,
				self = this;
			setTimeout(function () {
				if ($(t).data("onFocus")) {
					/* T.G. 24 Jan 2014, Bug 162268 - Clicking elements in the popover closes it. */
					if (self.options.closeOnBlur === true) {
						self._closePopover();
						$(t).data("onFocus", false);
					}
				}/* else {
					$(t).focus();
				}*/
			}, 10);
		},
		_focusin: function (trg) {
			var t = this._target || trg.currentTarget;
			this._openPopover($(t));
		},
		_focusout: function () {
			if (this.options.closeOnBlur === true) {
			this._closePopover();
			}
		},
		_closeBtnClick: function (event) {
			this._closePopover();
			event.stopPropagation();
		},
		_resizeHandler: function () {
			if (this._visible && this._currentTarget) {
				this._positionPopover(this._currentTarget);
			}
		},
		_attachEventsToTarget: function () {
			var self = this, t = this._target,
				showEvt, hideEvt, targetShowEvt, targetHideEvt;
			if (this.options.showOn && this.options.showOn.match(/click|focus|mouseenter/)) {
				switch (this.options.showOn) {
					case "click":
						showEvt = "click.popover";
						hideEvt = "blur.popover";
						targetShowEvt = self._targetClick;
						targetHideEvt = self._targetBlur;
						break;
					case "focus":
						showEvt = "focusin.popover";
						hideEvt = "focusout.popover";
						targetShowEvt = self._focusin;
						targetHideEvt = self._focusout;
						break;
					case "mouseenter":
						showEvt = "mouseenter.popover";
						hideEvt = "mouseleave.popover";
						targetShowEvt = self._targetMouseMove;
						targetHideEvt = self._targetMouseLeave;
						break;
				}
			}
			/* K.D. July 18th, 2012 Bug #117374 The HTMLElement object is natively not defined in IE <= 8
			Abstain from referring to "natively" defined objects as we're not sure in what cases they would
			actually be undefined. Add to check if is jQuery object */
			/* D.K. checking the node type of the element as an alternative of "instanceof HTMLElement" for IE8
			nodeType === 1 represents an elements */
			if ( t && ( ( window.HTMLElement !== undefined &&
				( t instanceof HTMLElement || t instanceof jQuery ) && showEvt ) ||
				(typeof t[ 0 ] === "object") && (t[ 0 ].nodeType === 1) &&
				( typeof t[ 0 ].style === "object" ) &&
				( typeof t[ 0 ].ownerDocument === "object" ) ) ) {
				$(t).unbind(showEvt).bind(showEvt, $.proxy(targetShowEvt, this));
				$(t).unbind(hideEvt).bind(hideEvt, $.proxy(targetHideEvt, this));
			} else if (this.options.selectors && showEvt) {
				this.element.find(self.options.selectors).addBack().each(function () {
					var target = $(this)[ 0 ];
					/* verify that no popover should be shown for the original div */
					if (target === self.element[ 0 ]) {
						return;
					}
					$(target).unbind(showEvt).bind(showEvt, $.proxy(targetShowEvt, self));
					$(target).unbind(hideEvt).bind(hideEvt, $.proxy(targetHideEvt, self));
				});
			}
		},
		_detachEventsFromTarget: function () {
			/* T.G Sep 23th, 2013 Bug #152943 destroy of igPopover */
			var t = this._target, self = this;
			/* K.D. July 18th, 2012 Bug #117374 The HTMLElement object is natively not defined in IE <= 8
			Abstain from referring to "natively" defined objects as we're not sure in what cases they would
			actually be undefined. Add to check if is jQuery object*/
			/* D.K. checking the node type of the element as an alternative of "instanceof HTMLElement" for IE8
			nodeType === 1 represents an elements */
			if ( t && ( ( window.HTMLElement !== undefined &&
				( t instanceof HTMLElement || t instanceof jQuery ) ) ||
				(typeof t[ 0 ] === "object") && (t[ 0 ].nodeType === 1) &&
				( typeof t[ 0 ].style === "object" ) &&
				( typeof t[ 0 ].ownerDocument === "object" ) ) ) {
				$(t).unbind(".popover");
			} else if (this.options.selectors) {
				this.element.find(self.options.selectors).addBack().each(function () {
					var target = $(this);
					$(target).unbind(".popover");
				});
			}
		},
		_positionPopover: function (trg) {
			var i = 0, fn, fnRes;
			if (this.options.direction === "auto") {
				do {
					this._updateArrowDiv(this._priorityDir[ i ], i, trg);
					fn = "_" + this._priorityDir[ i ] + "Position";
					fnRes = this[ fn ](trg);
					i++;
				} while (fnRes === false && i < this._priorityDir.length);
				if (fnRes === false) {
					/* "Couldn't find space anywhere. Please exceed screen dimensions" */
					return;
				}
			} else {
				this._updateArrowDiv(this.options.direction, this._directionIndex, trg);
				fn = "_" + this.options.direction + "Position";
				if (!this[ fn ](trg)) {
					/* && (this.options.selectors || !this._target) */
					/* trying to find a place on the screen if there is no space to show with the position set */
					this._forced = true;
					do {
						this._updateArrowDiv(this._priorityDir[ i ], i, trg);
						fn = "_" + this._priorityDir[ i ] + "Position";
						fnRes = this[ fn ](trg);
						i++;
					} while (fnRes === false && i < this._priorityDir.length);
					return;
				}
			}
		},
		_findProperPosition: function (dir, x, trg) {
			var fnRes, y, cDim, cPos, win = $(window),
				trgFDim, wScroll, boundary, countainmentBoundary, leftOffset,
				$containment, oParent = trg.offsetParent(), useParentOffset = false,
				rightOffset = $.ig.util.offset(trg).left + trg.outerWidth(),
				parentRightOffset = $.ig.util.offset(oParent).left + oParent.outerWidth();
			if (dir === "left") {
				cPos = "left";
				cDim = "outerWidth";
				wScroll = win.scrollLeft();
			} else {
				cPos = "top";
				cDim = "outerHeight";
				wScroll = win.scrollTop();
			}
			boundary = wScroll + (cDim === "outerWidth" ?
				win.width() : win.height());
			$containment = this.options.containment;
			if (this.options.containment) {
				countainmentBoundary = $.ig.util.offset($containment)[ cPos ];
				if (cDim === "outerWidth") {
					countainmentBoundary = countainmentBoundary + $containment.outerWidth();
				} else {
					countainmentBoundary = countainmentBoundary + $containment.outerHeight();
				}
				if (boundary > countainmentBoundary) {
					boundary = countainmentBoundary;
				}
			}
			/* target element is not fully visible on the screen along the axis we need */
			if ($.ig.util.offset(trg)[ cPos ] + trg[ cDim ]() > boundary) {
				/* we use a redux value to not create the popover outside the screen borders */
				trgFDim = boundary - $.ig.util.offset(trg)[ cPos ];
			} else if ( cPos === "left" &&
					$.ig.util.offset( trg )[ cPos ] < $.ig.util.offset( oParent )[ cPos ] &&
					rightOffset > parentRightOffset ) {
				/* Fix for bug #189918 - Tooltip does not show at the correct position after some of the columns are fixed
				both sides of the target are not visible, take parent dimensions */
				trgFDim = oParent[ cDim ]();
				useParentOffset = true;
			} else if ( cPos === "left" &&
					$.ig.util.offset( trg )[ cPos ] < parentRightOffset &&
					rightOffset > parentRightOffset ) {
				/* Fix for bug #186400 - When only small part of the column is shown and style visibility is popover the tooltip does not show visible part of the cell
				Change calculation for target final dimensions when target is partially visible
				only right side is not visible */
				trgFDim = parentRightOffset - $.ig.util.offset(trg)[ cPos ];
			} else if ( cPos === "left" &&
					$.ig.util.offset( trg )[ cPos ] < $.ig.util.offset( oParent )[ cPos ] &&
					$.ig.util.offset( oParent )[ cPos ] < rightOffset ) {
				/* only left side is not visible */
				trgFDim = rightOffset - $.ig.util.offset(oParent)[ cPos ];
				useParentOffset = true;
			} else {
				trgFDim = trg[ cDim ]();
			}
			if (trgFDim > this.popover[ cDim ]()) {
				/* if the popover is smaller on the side we want to position
				it should always get in the middle of the visible area */
				leftOffset = useParentOffset ?
					$.ig.util.offset(oParent)[ cPos ] :
					$.ig.util.offset(trg)[ cPos ];
				y = leftOffset + trgFDim / 2 - this.popover[ cDim ]() / 2;
				fnRes = dir === "left" ?
					this._checkCollision(x, y, trg) :
					this._checkCollision(y, x, trg);
			} else {
				fnRes = this.
					_cyclePossiblePositions(trg, dir, cPos, cDim, trgFDim, useParentOffset, x);
			}
			/* if the popover did't fit, try position it using as borders the whole page */
			if (fnRes === false && !this.options.containment) {
				fnRes = this.
					_cyclePossiblePositions(trg, dir, cPos, cDim, trgFDim, useParentOffset, x, true);
			}

			if (fnRes === true) {
				this._adjustArrowPosition(trg, dir, cPos, cDim, trgFDim, useParentOffset);
			}
			return fnRes;
		},
		_cyclePossiblePositions: function (
				trg, dir, cPos, cDim, trgFDim, useParentOffset, x, useDocument) {
			var i = 0, y, tPos, fnRes;
				/* rotate between possible positions until the popover fits or it's clear it won't fit */
				if (this.options.position === "auto") {
					do {
						tPos = this._positions[ i ];
						y = this._getCounterPosition(trg, trgFDim, tPos, cPos, cDim, useParentOffset);
					fnRes = dir === "left" ?
						this._checkCollision(x, y, trg, useDocument) :
						this._checkCollision(y, x, trg, useDocument);
					} while (fnRes === false && ++i < this._positions.length);
				} else {
					y = this._getCounterPosition(trg, trgFDim, this.options.position, cPos, cDim, useParentOffset);
				fnRes = dir === "left" ?
					this._checkCollision(x, y, trg, useDocument) :
					this._checkCollision(y, x, trg, useDocument);
			}
			return fnRes;
		},
		_getCounterPosition: function (trg, trgFDim, tPos, cPos, cDim, useParentOffset) {
			var y,
				offset = useParentOffset ?
					$.ig.util.offset(trg.offsetParent())[ cPos ] :
					$.ig.util.offset(trg)[ cPos ];
			switch (tPos) {
				case "balanced":
					y = offset + trgFDim / 2 - this.popover[ cDim ]() / 2;
					break;
				case "start":
					y = offset;
					break;
				case "end":
					y = offset - this.popover[ cDim ]() + trgFDim;
					break;
			}
			return y;
		},
		_topPosition: function (trg) {
			var top = $.ig.util.offset(trg).top - this.popover.outerHeight(),
				parentTop = $.ig.util.offset(trg.offsetParent()).top - this.popover.outerHeight();
			/* Fix for bug 185813 - Popover tooltip appears on the bottom of the cell even if the bottom part is hidden because of the grid's height.
			If there are scrollbars offsetParent of the target should be smaller than the actual target */
			if (top < parentTop) {
				top = parentTop;
			}
			/* finds are proper left position for the popover if one exists */
			return this._findProperPosition("left", top, trg);
		},
		_bottomPosition: function (trg) {
			var bottom = $.ig.util.offset(trg).top + trg.outerHeight(),
			parentBottom = $.ig.util.offset(trg.offsetParent()).top + trg.offsetParent().outerHeight();
			/*Fix for bug 185813 - Popover tooltip appears on the bottom of the cell even if the bottom part is hidden because of the grid's height.
			If there are scrollbars offsetParent of the target should be smaller than the actual target */
			if (bottom > parentBottom) {
				bottom = parentBottom;
			}
			return this._findProperPosition("left", bottom, trg);
		},
		_leftPosition: function (trg) {
			var left = $.ig.util.offset(trg).left - this.popover.outerWidth(),
				parentLeft = $.ig.util.offset(trg.offsetParent()).left - this.popover.outerWidth();
			if (left < parentLeft) {
				left = parentLeft;
			}
			return this._findProperPosition("top", left, trg);
		},
		_rightPosition: function (trg) {
			var right = $.ig.util.offset(trg).left + trg.outerWidth(),
				parentRight = $.ig.util.offset(trg.offsetParent()).right + trg.outerWidth();
			if (right > parentRight) {
				right = parentRight;
			}
			return this._findProperPosition("top", right, trg);
		},
		_checkCollision: function (top, left, trg, useDocument) {
			var tfullw = this.popover.outerWidth(),
				tfullh = this.popover.outerHeight(),
				win = $(window), wh, ww, os,
				$containment, rightBoundary, bottomBoundary, leftBoundary, topBoundary;
			ww = win.width() + win.scrollLeft();
			wh = win.height() + win.scrollTop();
			/* M.H. 26 Sep 2013 Fix for bug #151629: The feature chooser for the last column is not rendered correctly on a mobile device. */
			rightBoundary = ww;
			bottomBoundary = wh;
			leftBoundary = win.scrollLeft();
			topBoundary = win.scrollTop();
			$containment = this.options.containment;
			if (this.options.containment) {
				if (leftBoundary < $.ig.util.offset($containment).left) {
					leftBoundary = $.ig.util.offset($containment).left;
				}
				if ($.ig.util.offset($containment).left + $containment.outerWidth() < rightBoundary) {
					rightBoundary = $.ig.util.offset($containment).left + $containment.outerWidth();
				}
				if (bottomBoundary > $.ig.util.offset($containment).top + $containment.outerHeight()) {
					bottomBoundary = $.ig.util.offset($containment).top + $containment.outerHeight();
				}
				if (topBoundary < $.ig.util.offset($containment).top) {
					topBoundary = $.ig.util.offset($containment).top;
				}
			}
			if (useDocument) {
				leftBoundary = 0;
				rightBoundary = $(document).width();
				bottomBoundary = $(document).height();
				topBoundary = 0;
			}
			if (left < leftBoundary) {
				if (this.oDir === "left") {
					return false;
				}
				left = leftBoundary;
			}
			/*D.K. 7 Apr 2015 Fix for bug #190611: When direction is right and mouse over the last column popover is shown to the cell on the left
			When the direction is right, don't recalculate 'left', show it even if it is in the invisible area */
			if ($.ig.util.offset(trg).left + (tfullw / 2) > rightBoundary &&
					this.options.direction !== "right") {
				left = rightBoundary - tfullw;
			}
			if ((($.ig.util.offset(trg).top + tfullh + this.arrow.height() > bottomBoundary) &&
					(this.oDir === "bottom")) ||
					(($.ig.util.offset(trg).top - tfullh - this.arrow.height() < topBoundary) &&
					(this.oDir === "top"))) {
				if (this.options.selectors) {
					return false;
				}
			}
			if (left < leftBoundary ||
					left + tfullw > rightBoundary ||
					top < topBoundary ||
					top + tfullh > bottomBoundary) {
				/*D.K. 16 Dec 2014 Fix 186350 - Popover tooltip appears below the grid even when there's not enough space on the page
				if it is forced we can ignore collisions, otherwise they should be taken into account */
				if (this._forced === false) {
					/*  T.G. 29 Jan 2014 Fix 162164- When the element is relative in scrollable container the popover does not change its position when you scroll the container. */
					return false;
				}
				/* T.G. 7 Mar 2014 Fix 162110 - The popover does not change its position if there is no room on the left or right.*/
				/* return false; */
			}
			if (!$(this.options.appendTo).is("body") && this._target) {
				os = $.ig.util.getRelativeOffset(this.popover);
				top = top - os.top;
				left = left - os.left;
			}
			this.popover.css({
				"top": top,
				"left": left
			});
			return true;
		},
		_getPrioritiesIndex: function () {
			var i;
			if (this.options.direction !== "auto") {
				for (i = 0; i < this._priorityDir.length; i++) {
					if (this.options.direction === this._priorityDir[ i ]) {
						this._directionIndex = i;
						break;
					}
				}
			}
			if (this.options.position !== "auto") {
				for (i = 0; i < this._positions.length; i++) {
					if (this.options.position === this._positions[ i ]) {
						this._positionIndex = i;
						break;
					}
				}
			}
		},
		_openPopover: function (trg, skipEvents) {
			var args, noCancel, val = this.getContent(), self = this;
			args = {
				element: trg,
				content: val,
				popover: this.popover,
				owner: this
			};
			$(this.popover).data("isAnimating", true);
			noCancel = skipEvents || this._trigger(this.events.showing, this, args);
			if (noCancel === true) {
				self._restoreOriginalTitle(self._currentTarget);
				if (args.content !== val) {
					this._setNewContent(args.content);
				} else if (typeof this.options.contentTemplate === "function") {
					args.content = this._getContentTemplate(trg[ 0 ]);
					this._setNewContent(args.content || "");
				}
				this._positionPopover(trg);
				this._currentTarget = trg;
				$(this.popover).data("isAnimating", false);
				this.popover.stop(true, true).fadeIn(this.options.animationDuration, function () {
					self.popover.css("display", "block");
					if (!skipEvents) {
						self._trigger(self.events.shown, self, args);
					}
				});
				this._visible = true;
				this._removeOriginalTitle(trg);
			}
		},
		_closePopover: function (skipEvents) {
			var args, noCancel, self = this;
			args = {
				element: this._currentTarget,
				content: this.getContent(),
				popover: this.popover,
				owner: this
			};
			$(this.popover).data("isAnimating", true);
			noCancel = skipEvents || this._trigger(this.events.hiding, this, args);
			if (noCancel === true) {
				$(this.popover).data("isAnimating", false);
				this.popover.stop(true, true).fadeOut(this.options.animationDuration, function () {
					self.popover.css("display", "none");
					if (!skipEvents) {
						self._trigger(self.events.hidden, self, args);
					}
				});
				this._visible = false;
			}
		},
		_mouseenter: function (e) {
			this._removeOriginalTitle($(e._currentTarget));
		},
		_removeOriginalTitle: function (element) {
			while (element.length && !element.is("body")) {
				/* if we have a title, clear it to prevent the native tooltip */
				if (element.attr("title")) {
					element.data("popover-title", element.attr("title"));
					element.attr("title", "");
				}
				element = element.parent();
			}
		},
		_restoreOriginalTitle: function (element) {
			if (element && element.data("popover-title")) {
				element.attr("title", element.data("popover-title"));
				element.removeData("popover-title");
			}
		},
		_adjustArrowPosition: function (trg, dir, cPos, cDim, trgFDim, useParentOffset) {
			var offset = { left: 0, top: 0 }, left,
				leftOffset = useParentOffset ?
					$.ig.util.offset(trg.offsetParent())[ cPos ] :
					$.ig.util.offset(trg)[ cPos ];
			if (!$(this.options.appendTo).is("body") && this._target) {
				offset = $.ig.util.getRelativeOffset(this.popover);
			}
			if (dir === "top") {
				this.arrow.css({
					"top": ($.ig.util.offset(trg)[ cPos ] - parseInt(this.popover.css(cPos), 10) - offset.top) +
							(trgFDim / 2) -
							(this.arrow.height() / 2)
				});
			} else {
				/* if (trgFDim < this.popover[ cDim ]()) { */
				/* T.G., 28 Jan 2014, Fix bug 162181 - The arrow does not stay in the containment element when the container is scrolled. */
				left = (leftOffset - parseInt(this.popover.css(cPos), 10) - offset.left) + (trgFDim / 2);
				left = (left < parseInt(this.arrow.css("border-left-width"), 10)) ?
					parseInt(this.arrow.css("border-left-width"), 10) :
					left;
				this.arrow.css({
					/* T.G., 18 June 2014, Fix bug 158915 - If igGrid is scrolled on the right the popover tooltip is misaligned and the arrow is not positioned correctly */
					/* T.G., 18 June 2014, Fix bug 166644 - The arrow and the container are displayed separately when the target is larger than the browser window and scroll is available */
					"left": left
				});
				/*}*/
			}
		},
		_getHiddenElementsDimensions: function (elArr, trg) {
			var dim = [], i, elem;
			/* when don't have containment it popover should be positioned where it's target is,
			this is done mainly for the scenarios with horizontal scrollbar */
			if (this.options.containment === null) {
				this.popover.css("left", trg.position().left);
				this.popover.css("top", trg.position().top);
			}
			if (!this._visible) {
				this.popover.show();
			}
			for (i = 0; i < elArr.length; i++) {
				elem = elArr[ i ];
				dim.push({
					width: elem.outerWidth(),
					height: elem.outerHeight()
				});
			}
			if (!this._visible) {
				this.popover.hide();
			}
			return dim;
		},
		_getContentTemplate: function (target) {
			var template = "";
			if (target) {
				template = this.options.contentTemplate.call(target);
			}
			return template;
		},
		_setNewContent: function (nc) {
			var newContent = nc;
			if (nc instanceof jQuery) {
				newContent = nc.html();
			} else if (typeof nc === "object") {
				newContent = nc.innerHTML;
			}
			this.contentInner.html(newContent);
		},
		_isTouchDevice: function () {
			 return (("ontouchstart" in window) ||
				(navigator.MaxTouchPoints > 0) ||
				(navigator.msMaxTouchPoints > 0));
		}
	});
	/* support: jQuery <1.8 */
	if (!$.fn.addBack) {
		$.fn.addBack = function (selector) {
			return this.add((selector === null || selector === undefined) ?
				this.prevObject : this.prevObject.filter(selector)
			);
		};
	}
	$.extend($.ui.igPopover, {
		version: "<build_number>"
	});
	return $.ui.igPopover;// REMOVE_FROM_COMBINED_FILES
}));// REMOVE_FROM_COMBINED_FILES
