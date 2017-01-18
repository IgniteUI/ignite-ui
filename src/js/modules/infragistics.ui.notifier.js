/*!@license
* Infragistics.Web.ClientUI jQuery Notifier <build_number>
*
* Copyright (c) 2013-<year> Infragistics Inc.
*
* http://www.infragistics.com/
*
* Depends on:
*  jquery-1.9.1.js
*  jquery.ui.core.js
*  jquery.ui.widget.js
*	infragistics.util.js
*  infragistics.util.jquery.js
*  infragistics.ui.popover.js
*/

(function (factory) {
	if (typeof define === "function" && define.amd) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"jquery-ui",
			"./infragistics.util",
			"./infragistics.util.jquery",
			"./infragistics.ui.popover"
		], factory );
	} else {

		// Browser globals
		factory(jQuery);
	}
}
(function ($) {
	$.widget("ui.igNotifier", $.ui.igPopover, {
		css: {
			/* classes applied to the main popover container */
			baseClasses: "ui-widget ui-igpopover ui-ignotify",
			/* class applied to the inner notification container */
			contentInner: "ui-ignotify-content",
			/* class applied to the main container for inline notifications */
			inline: "ui-ignotify-inline",
			/* class applied to the inner icon container SPAN */
			iconContainer: "ui-ignotify-icon-container",
			/* classes applied to the main popover container and target with information state */
			infoState: "ui-ignotify-info",
			/* jQuery UI Icon class for information state */
			infoIcon: "ui-icon ui-icon-info",
			/* classes applied to the main popover container and target with success state */
			successState: "ui-ignotify-success",
			/* jQuery UI Icon class for success state */
			successIcon: "ui-icon ui-icon-circle-check",
			/* classes applied to the main popover container and target with warning state */
			warningState: "ui-ignotify-warn",
			/* jQuery UI Icon class for success state */
			warningIcon: "ui-icon ui-icon-alert",
			/* classes applied to the main popover container and target with error state */
			errorState: "ui-ignotify-error",
			/* jQuery UI Icon class for error state */
			errorIcon: "ui-icon ui-icon-circle-close"
		},
		options: {
			/* type="success|info|warning|error" Gets/Sets the current state of the igNotifier messages. State controls what CSS classes are applied to the messages and target and has interactions with other options as well.
				```
				//Initialize
				$(".selector").igNotifier({
					state: "success"
				});

				//Get
				var state = $(".selector").igNotifier("option", "state");

				//Set
				$(".selector").igNotifier("option", "state", "success");
				```
				success type="string" Messages and target CSS have success styles applied.
				info type="string" Messages have info applied. Target is unaffected.
				warning type="string" Messages and target CSS have warning styles applied.
				error type="string" Messages and target CSS have error styles applied.
			*/
			state: "info",
			/* type="success|info|warning|error" Controls the level of notifications shown by automatic and manual messages using the [notify](ui.ignotifier#methods:notify) method. Use [show](ui.ignotifier#methods:show) to ignore the level.
				```
				//Initialize
				$(".selector").igNotifier({
					notifyLevel: "error"
				});

				//Get
				var notifyLevel = $(".selector").igNotifier("option", "notifyLevel");

				//Set
				$(".selector").igNotifier("option", "notifyLevel", "info");
				```
				success type="string" Show all types of messages
				info type="string" Show everything from info level messages up
				warning type="string" Show everything from warning level messages up
				error type="string" Show only error messages
			*/
			notifyLevel: "success",
			/* type="string|object" Controls where the popover DOM should be attached to (only applies to popovers).
				```
				//Initialize
                $('.selector').igNotifier({
                  appendTo: "body"
                });

                //Get
                var appendTo = $(".selector").igNotifier("option", "appendTo");
				```
				string type="string" A valid jQuery selector for the element
				object type="object" A reference to the parent jQuery object
			*/
			appendTo: "body",
			/* type="auto|popover|inline" Controls the positioning mode of messages. Setting a mode will override the default behavior which is auto.
				Note: Inline element uses a block container as is always placed after the target.
				```
				//Initialize
				$(".selector").igNotifier({
					mode: "inline"
				});

				//Get
				var mode = $(".selector").igNotifier("option", "mode");

				//Set
				$(".selector").igNotifier("option", "mode", "popover");
				```
				auto type="string" Uses popover for info and warning messages and inline for errors and success.
				popover type="string" Displays messages in a configurable popover.
				inline type="string" Displays messages in a simplified notification text under the target.
			*/
			mode: "auto",
			/* type="bool" Allows setting the respective state CSS on the target element (used to apply border color by default)
				```
				//Initialize
				$('.selector').igNotifier({
					allowCSSOnTarget: true
				});

                //Get
                var allowCSSOnTarget = $(".selector").igNotifier("option", "allowCSSOnTarget");

                //Set
                $(".selector").igNotifier("option", "allowCSSOnTarget", false);
				```
			*/
			allowCSSOnTarget: true,
			/* type="object" A set of default messages for each state
				```
				//Initialize
				$(".selector").igNotifier({
					messages: {
						success:"Well done!",
						info: "Info about the input status.",
						warning: "Warning",
						error: "Error"
					}
				});

				//Get
				var messages = $(".selector").igNotifier("option", "messages");

				//Set
				$(".selector").igNotifier("option", "messages", {success: "Well done!"});
				```
			*/
			messages: {
				/*```
				//Initialize
				$(".selector").igNotifier({
					messages: {
						success:"Well done!"
					}
				});

				//Get
				var messages = $(".selector").igNotifier("option", "messages");

				//Set
				$(".selector").igNotifier("option", "messages", {success: "Well done!"});
				```*/
				success: "Success",
				/*```
				//Initialize
				$(".selector").igNotifier({
					messages: {
						info: "Info"
					}
				});

				//Get
				var messages = $(".selector").igNotifier("option", "messages");

				//Set
				$(".selector").igNotifier("option", "messages", {info: "Info"});
				```*/
				info: "",
				/*```
				//Initialize
				$(".selector").igNotifier({
					messages: {
						warning: "Warning"
					}
				});

				//Get
				var messages = $(".selector").igNotifier("option", "messages");

				//Set
				$(".selector").igNotifier("option", "messages", {warning: "Warning"});
				```*/
				warning: "Warning",
				/*```
				//Initialize
				$(".selector").igNotifier({
					messages: {
						error: "Error"
					}
				});

				//Get
				var messages = $(".selector").igNotifier("option", "messages");

				//Set
				$(".selector").igNotifier("option", "messages", {error: "Something went wrong!"});
				```*/
				error:  "Error"
			},
			/* type="bool" Allows rendering a span with the respective state CSS to display jQuery UI framework icons
				```
				//Initialize
				$('.selector').igNotifier({
					showIcon: true

				//Get
				var showIcon = $(".selector").igNotifier("option", "showIcon");

				//Set
				$(".selector").igNotifier("option", "showIcon", true);
				```
			*/
			showIcon: false,
			/* type="string|function" Gets/Sets the content for the popover container. Templated with parameters by default: {0} - icon container class, {1} - the icon class and {2} - message text.
				```
				//Initialize
                    // string content for the popover container
                    $(".selector").igNotifier({
                        contentTemplate:"<img src='http://www.infragistics.com/assets/images/logo.png' title='IG logo' /> {1}"
                    });

                    //Get
                    var contentFunction = $(".selector").igNotifier("option", "contentTemplate");

                    // Set
                    // Accepts setting the value only if string type is passed
                    $(".selector").igNotifier("option", "contentTemplate", "<img src='http://www.infragistics.com/assets/images/logo.png' title='IG logo' /> {1}");
				```
				string type="string" String content of the popover container
				function type="function" Function which is a callback that should return the content. Use the 'this' value to access the target DOM element and passed argument for state value. Result can also include the same template parametes.
			*/
			contentTemplate: "<span class='{0}'><span class='{1}'></span></span>{2}",
			/* type="object" sets the content for the popover header
				```
				//Initialize
				$(".selector").igNotifier({
					headerTemplate: {
						closeButton: false
					}
				});

				//Get
				var headerTemplate = $(".selector").igNotifier("option", "headerTemplate");
				```
			*/
			headerTemplate: {
			/* type="bool" controls whether the popover renders a functional close button
				```
				//Initialize
				$(".selector").igNotifier({
					headerTemplate: {
						closeButton : false,
						title : null
					}
				});

				//Get
				var title = $(".selector").igNotifier("option", "headerTemplate");
				```
			*/
			closeButton: true,
			/* type="string" sets the content for the popover header.
				```
				//Initialize
				$(".selector").igNotifier({
					headerTemplate: {
						closeButton : false,
						title : null
					}
				});

				//Get
				var title = $(".selector").igNotifier("option", "headerTemplate");
				```
			*/
			title: null
			},
			/* type="mouseenter|click|focus|manual" Sets the event on which the notification will be shown. Predefined values are "mouseenter", "click" and "focus"
				```
				//Initialize
				$(".selector").igNotifier({
						showOn: "focus"
				});

				//Get
				var showOn = $(".selector").igNotifier("option", "showOn");
				```
				mouseenter type="string" The popover is shown on mouse enter in the target element
				click type="string" The popover is shown on click on the target element
				focus type="string" The popover is shown on focusing the target element
				manual type="string" The popover is shown manually
			*/
			showOn: "manual",
			/* type="bool" Controls whether the popover will close on blur or not. This option has effect only when the corresponding [showOn](ui.ignotifier#options:showOn) is set (manual by default)
				```
				//Initialize
                $('.selector').igNotifier({
                  closeOnBlur: true
                });

                //Get
                var closeOnBlur = $(".selector").igNotifier("option", "closeOnBlur");

                //Set
                $(".selector").igNotifier("option", "closeOnBlur", true);
				```
			*/
			closeOnBlur: false,
			/* type="number" Gets/Sets the time in milliseconds the notification fades in and out when showing/hiding
				```
				//Initialize
                $('.selector').igNotifier({
                  animationDuration: 300
                });

                //Get
                var animationDuration = $(".selector").igNotifier("option", "animationDuration");

                //Set
                $(".selector").igNotifier("option", "animationDuration", 300);
				```
			*/
			animationDuration: 250,
			/* Gets/Sets the distance in pixels a notification popover slides outwards as it's shown.
				```
				//Initialize
				$('.selector').igNotifier({
					animationSlideDistance: 5

				//Get
				var animationSlideDistance = $(".selector").igNotifier("option", "animationSlideDistance");

				//Set
				$(".selector").igNotifier("option", "animationSlideDistance", 5);
				```
			*/
			animationSlideDistance: 5,
			/* type="string" @Ignored@ Selectors indicating which items should show popovers. */
			selectors: null
		},
		/* States that appear as inline in auto mode */
		inlineStates: [ "success", "error" ],
		_create: function () {
			$.ui.igPopover.prototype._create.apply(this, arguments);

			// D.P. Override position prio to top > bottom
			this._priorityDir = [ "top", "left", "right", "bottom" ];
			this._arrowDir = [ "bottom", "right", "left", "top" ];

			this._states = [ "success", "info", "warning", "error" ];
			this._modes = [ "auto", "popover", "inline" ];
			this._currentText = this.options.messages[ this.options.state ];
		},
		_createWidget: function (options/*, element*/) {
			// ensure localized defaults
			var messageDefaults = {
				success: $.ig.Notifier && $.ig.Notifier.locale ? $.ig.Notifier.locale.successMsg : "Success",
				info: "",
				warning: $.ig.Notifier && $.ig.Notifier.locale ? $.ig.Notifier.locale.warningMsg : "Warning",
				error: $.ig.Notifier && $.ig.Notifier.locale ? $.ig.Notifier.locale.errorMsg : "Error"
			};
			this.options.messages = $.extend(messageDefaults, (options && options.messages) || {});
			$.ui.igPopover.prototype._createWidget.apply(this, arguments);
		},
		_setState: function (value, message/*, fireEvents*/) {
			if ($.inArray(value, this._states) === -1) {
				throw ($.ig.Notifier.locale.notSupportedState);
			}

			//TODO:
			/*var args, noCancel, val = this.getContent(), self = this, contentFunc;
			args = {
				newState: value,
				oldState: this._previousState,
				element: trg,
				content: val,
				popover: this.popover,
				owner: this
			};
			noCancel = this._trigger(this.events.stateChanging, this, args);
			if (noCancel === true) {*/
			if (message !== undefined) {
				// must be able to handle text change without state
				this._currentText = message;
			}
			if (this.options.state !== value) {
				this._currentText = message !== undefined ? this._currentText : this.options.messages[ value ];
				this._previousState = this.options.state;
				this.options.state = value;
				if (this._visible) {
					// refresh target if visible (oherwise managed in open/close)
					this._setTargetState();
				}
				if (this._isInline(value) !== this._isInline(this._previousState)) {
					// force mode switch + rerender
					this._setMode(this.options.mode, true);
					return;
				}
			}
			this.popover
				.removeClass(this.css[ this._previousState + "State" ])
				.addClass(this.css[ this.options.state + "State" ]);
			this._setNewContent(this._getTemplate());
			/*
				this._trigger(this.events.stateChanged, this, args);
			}*/
		},
		_setTargetState: function (clean) {
			this._target
				.removeClass(this.css[ this._previousState + "State" ])
				.removeClass(this.css[ this.options.state + "State" ]);
			if (this.options.allowCSSOnTarget && !clean) {
				this._target
				   .addClass(this.css[ this.options.state + "State" ]);
			}
		},
		_setOption: function (key, value) {
			switch (key) {
				case "state":
					this._setState(value);
					if (this._visible && !this._isInline()) {
						this._positionPopover(this._target);
						this._slide();
					}
					break;
				case "mode":
					if (typeof value === "string") {
						this._setMode(value);
					}
					break;
				case "contentTemplate":
					if (typeof value === "string") {
						this.options.contentTemplate = value;
						this._setNewContent(this._getTemplate());
					}
					break;
				case "messages":
					if (typeof value === "object") {
						this.options.messages = $.extend(this.options.messages, value);
						this._currentText = this.options.messages[ this.options.state ];
						this._setNewContent(this._getTemplate());
						if (this._visible && !this._isInline()) {
							this._positionPopover(this._target);
							this._slide();
						}
					}
					break;
				case "allowCSSOnTarget":
					if (typeof value === "boolean") {
						this.options.allowCSSOnTarget = value;
						if (this._visible) {
							this._setTargetState(!value);
						}
					}
					break;
				case "showIcon":
					this.options.showIcon = value;
					if (this._visible) {
						this._setNewContent(this._getTemplate());
					}
					break;
				default:
					$.ui.igPopover.prototype._setOption.apply(this, arguments);
			}
		},
		_setMode: function (value, force) {
			if ($.inArray(value, this._modes) === -1) {
				throw ($.ig.Notifier.locale.notSupportedMode);
			}
			if (this.options.mode !== value || force) {
				// cleanup current popover
				this.popover.remove();
				delete this.arrow;
				this.options.mode = value;
				this._renderPopover();
				if (this._visible) {
					// partial open:
					if (!this._isInline()) {
						this._positionPopover(this._target);
					}
					this.popover.show();
					this._slide();
				}
			}
		},
		_isInline: function (state) {
			var target = state || this.options.state;
			if (this.options.mode === "inline") {
				return true;
			} else {
				return this.options.mode === "auto" && $.inArray(target, this.inlineStates) > -1;
			}
		},
		notify: function (state, message) {
			/* Triggers a notification with a certain state and optional message. The [notifyLevel](ui.ignotifier#options:notifyLevel) option determines if the notification will be displayed.
				```
				$( ".selector" ).igNotifier( "notify", "success", "Well Done");
				```
			  paramType="success|info|warning|error" optional="false" The state to show notification for.
			  paramType="string" optional="true" Optional message to show, overrides defaults.
		   */
			if ($.inArray(state, this._states) >= $.inArray(this.options.notifyLevel, this._states)) {
				// skip notify with same state/message if already visible
				if (!this._visible || this.options.state !== state || this._currentText !== message) {
					this._setState(state, message);
					this.show();
				}
			} else {
				this.hide();
				this._setState(state, message);
			}
		},
		isVisible: function () {
			/* Returns true if the notification is currently visible
				```
				var isVisible = $( ".selector" ).igNotifier( "isVisible" );
				```
			*/
			return this._visible;
		},
		_renderPopover: function () {
			if (this._isInline()) {
				this.popover = $("<div></div>").addClass(this.css.baseClasses).addClass(this.css.inline);
				this.contentInner = $("<div></div>").appendTo(this.popover);
				this.popover.insertAfter(this._target);
				this._attachEventsToTarget();
			} else {
				$.ui.igPopover.prototype._renderPopover.apply(this, arguments);
			}

			this._setState(this.options.state);
			this.contentInner.addClass(this.css.contentInner);
		},
		_openPopover: function (/*trg, skipEvents*/) {
			var initialState = this._visible;

			// D.P. 20th Jun 2016 Bug 220794: igNotifier is not positioned correctly on simultaneous shows
			if (this.popover.is(":animated")) {
				this.popover.stop(true);
			}

			// force false flag to check if _super really showed content
			this._visible = false;
			$.ui.igPopover.prototype._openPopover.apply(this, arguments);
			if (this._visible) {
				var change = this._visible !== initialState;

				// extra animation must be called outside of _positionPopover after _openPopover base animation cancels
				this._slide(!change);
				if (change) {
					// set target CSS when showing
					this._setTargetState();
				}
			} else {
				// restore flag if show was canceled:
				this._visible = initialState;
			}
		},
		_slide: function (quick) {
			if (!this.options.animationSlideDistance || !this.oDir || this._isInline()) {
				return;
			}

			//simultaneous slide animation,
			var slideAnimation;
			switch (this.oDir) {
				case "top":
					slideAnimation = { "top": "-=" + this.options.animationSlideDistance + "px" };
					break;
				case "bottom":
					slideAnimation = { "top": "+=" + this.options.animationSlideDistance + "px" };
					break;
				case "left":
					slideAnimation = { "left": "-=" + this.options.animationSlideDistance + "px" };
					break;
				case "right":
					slideAnimation = { "left": "+=" + this.options.animationSlideDistance + "px" };
					break;
			}
			this.popover.animate(slideAnimation, {
				queue: false,
				duration: quick ? 0 : this.options.animationDuration
			});
		},
		_resizeHandler: function (event) {
			if (this._visible && this._currentTarget) {
				this._positionPopover(this._currentTarget);

				// keep slide distance and animate when called by direction set
				this._slide(event);
			}
		},
		_attachEventsToTarget: function () {
			if (this.options.showOn !== "manual") {
				$.ui.igPopover.prototype._attachEventsToTarget.apply(this, arguments);
			}
		},
		_closePopover: function (/*skipEvents*/) {
			var initialState = this._visible;
			$.ui.igPopover.prototype._closePopover.apply(this, arguments);
			if (!this._visible && this._visible !== initialState) {
				// clean target CSS when hiding
				this._setTargetState(true);
			}
		},
		_positionPopover: function (/*trg*/) {
			if (!this._isInline()) {
				$.ui.igPopover.prototype._positionPopover.apply(this, arguments);
			}
		},
		_getTemplate: function () {
			var currContent = this.options.contentTemplate;
			if (typeof currContent === "function" && this._target) {
				currContent = this._getContentTemplate(this._target[ 0 ]);
			}
			return currContent;
		},
		_getContentTemplate: function (target) {
			var template = "";
			if (target) {
				template = this.options.contentTemplate.call(target, this.options.state);
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
			newContent = newContent.replace(/\{0\}/g, this.css.iconContainer)
				.replace(/\{1\}/g, this.options.showIcon ? this.css[ this.options.state + "Icon" ] : "")
				.replace(/\{2\}/g, this._currentText);
			this.contentInner.html(newContent);
		},
		destroy: function () {
			/* Destroys the widget.
				```
				$( ".selector" ).igNotifier( "destroy" );
				```
			*/
			this._setTargetState(true);
			$.ui.igPopover.prototype.destroy.apply(this, arguments);
			return this;
		}
	});
	$.extend($.ui.igNotifier, { version: "<build_number>" });
	return $.ui.igNotifier;// REMOVE_FROM_COMBINED_FILES
}));// REMOVE_FROM_COMBINED_FILES
