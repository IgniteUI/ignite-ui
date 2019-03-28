(function ($) {
	$.ig = $.ig || {};
	$.ig.TestUtil = $.ig.TestUtil || {};

	$.extend($.ig.TestUtil, {

		// Use: $.ig.TestUtil.checkClass(elementToCheck, classToCheckFor)
		checkClass: function (element, cls) {
			if (QUnit && typeof (QUnit.ok) === 'function') {
				QUnit.ok(element.hasClass(cls), 'The control with id: ' + element[0].id + ' does not contain the class: ' + cls);
			} else if (QUnit && QUnit.assert && typeof(QUnit.assert.ok) === 'function') {
				QUnit.assert.ok(element.hasClass(cls), 'The control with id: ' + element[0].id + ' does not contain the class: ' + cls);
			} else {
				return element.hasClass(cls);
			}
		},

		// Use: $.ig.TestUtil.getAbsolutePosition(elementToCheck)
		getAbsolutePosition: function (element) {
			var position = {
				X: 0,
				Y: 0
			};
			var cElement = element;

			while (cElement !== null) {
				position.X += cElement.offsetLeft;
				position.Y += cElement.offsetTop;

				cElement = cElement.offsetParent;
			}

			return position;
		},

		// Use: $.ig.TestUtil.boolParse(param) : returns false with empty parameter
		boolParse: function (result) {
			return !!result && result !== 'false';
		},

		/// Input interactions

		/**
		 * Performs a paste on an input
		 * @param input The HTMLInput element to paste into
		 * @param newVal The text to paste in (at cursor position or over selection if focused)
		 */
		paste: function (input, newVal) {
			// create a mouse click event
			var event = document.createEvent('Event'),
				start = input.selectionStart,
				end = input.selectionEnd;
			event.initEvent('paste', true, true);
			event.target = input;
			event.srcElement = input;

			// since ClipboardEvent constructor is not supported yet http://caniuse.com/#feat=clipboardData
			// Also can't modify the event object in phantom, use IE's version
			window.clipboardData = {
				getData: function (param) {
					param = param.toLowerCase();
					if (param === 'text/plain' || param === 'text') {
						return newVal;
					}
				}
			};

			// NB! paste event is fired *before* any changes are applied to the DOM
			input.dispatchEvent(event);

			if (!event.defaultPrevented) {
				// set value and cursor
				oldVal = $(input).val();
				prefix = oldVal.substring(0, start);
				sufix = oldVal.substring(end, oldVal.length);
				$(input).val(prefix + newVal + sufix);

				input.setSelectionRange(end + newVal.length, end + newVal.length);
			}

			// cleanup
			delete window.clipboardData;
		},

		drop: function (input, newVal, focus) {
			var ev = jQuery.Event("drop"),
				$input = $(input),
				startPos = $input[0].selectionStart,
				focus = focus !== undefined ? focus : true;
			ev.originalEvent = {
				dataTransfer: {
					getData: function (param) {
						param = param.toLowerCase();
						if (param === 'text/plain' || param === 'text') {
							return newVal;
						}
					}
				}
			};
			$input.trigger(ev);

			if (!ev.isDefaultPrevented()) {
				var newValue = $input.val();
				newValue = newValue.slice(0, startPos) + newVal + newValue.slice(startPos);
				if (focus) {
					$input.focus();
				}
				$input.val(newValue);
				$input[0].selectionStart = startPos;
				$input[0].selectionEnd = startPos + newVal.length;
			}
		},

		/**
		 * Returns a new Promise that resoles after a set period of time
		 * @param {number} ms Amount of ms to wait
		 */
		wait: function (ms) {
			if (typeof Promise !== "undefined") {
				return new Promise(function (resolve) {
					setTimeout(resolve, ms)
				});
			} else {
				// TODO: Only for Phantom, remove
				var dfd = jQuery.Deferred();
				dfd["catch"] = dfd.fail;
				setTimeout(function () {
					dfd.resolve();
				}, ms);
				return dfd;
			}
		},

		/**
		 * Performs a series of `keyInteraction` for each character in a string. No delay(!) between events.
		 * @param {string} characters
		 * @param {object} target jQuery object target
		 * @param {string} special Used for combinations to set true on the event - "altKey", "ctrlKey", "shiftKey"
		 */
		type: function (characters, target) {
			if (characters) {
				var char, chars = characters.split('');
				for (var i = 0; i < chars.length; i++) {
					char = chars[i];
					this.keyInteraction(char.charCodeAt(0), target);
				}
			}
		},

		/**
		 * Triggers key interaction sequence on an element. If the key can produce a char it will replace the current selection.
		 * @param {string} key Key/Char code to use for the events (TODO - update)
		 * @param {object} target jQuery object target
		 * @param {string} special Used for combinations to set true on the event - "altKey", "ctrlKey", "shiftKey"
		 */
		keyInteraction: function (key, target, special) {
			// could use an update in the future - https://www.w3.org/TR/DOM-Level-3-Events/#keypress-event-order
			var char, startPos, endPos, newPos, textInput, prevented = false;
			char = (key > 31 &&
				(key < 37) || key > 40) //arrows
				?
				String.fromCharCode(key) : "";
			if (special && char) {
				char = special === "shiftKey" ? char.toUpperCase() : "";
				key = char.charCodeAt(0);
			}

			char = (key === 13 && target.is("textarea")) ? "\n" : char;

			// Cancelling down/press should skip their default actions only without breaking the event chain.
			if (this.keyDownChar(key, target, special)) {
				prevented = true;
			}
			if (this.keyPressChar(key, target, special)) {
				prevented = true;
			}
			try {
				textInput = target[0]["selectionEnd"] !== undefined && target[0]["selectionEnd"] !== null;
			} catch (error) {
				/* Phantom throws when trying to check for selectionEnd instead of returning null on checkbox */
				textInput = false;
			}
			if (!prevented && textInput && char ) {
				endPos = target[0].selectionEnd;
				startPos = target[0].selectionStart;
				target[0].value =
					target[0].value.substring(0, startPos) +
					char +
					target[0].value.substring(endPos);
				if (startPos !== endPos) {
					// replaced selection, cursor goes to start + char
					newPos = startPos + 1;
				} else {
					//typing move the cursor +1
					newPos = endPos + 1;
				}
				target[0].selectionStart = target[0].selectionEnd = newPos;
			}
			this.keyUpChar(key, target, special);
		},
		keyDownChar: function (key, target, special) {
			var evt = $.Event("keydown");
			evt.keyCode = key;
			evt.charCode = key;
			evt.which = key;
			evt.originalEvent = {
				preventDefault: $.noop,
				stopPropagation: $.noop
			};
			if (special) {
				evt[special] = true;
				evt.originalEvent[special] = true;
			}
			target.trigger(evt);
			return evt.isDefaultPrevented();
		},
		keyPressChar: function (key, target, special) {
			var evt = $.Event("keypress");
			evt.keyCode = key;
			evt.charCode = key;
			evt.which = key;
			if (special) {
				evt[special] = true;
			}
			target.trigger(evt);
			return evt.isDefaultPrevented();
		},
		keyUpChar: function (key, target, special) {
			var evt = $.Event("keyup");
			evt.keyCode = key;
			evt.charCode = key;
			evt.which = key;
			if (special) {
				evt[special] = true;
			}
			target.trigger(evt);
		},
		/**
		 * Triggers a mouse event on an element
		 * @param target Can be DOM or jQuery
		 * @param type The mouse event type by name
		 * @param params Optional object with value accepted by mouseEventInit. Defaults: main button, cancellable
		 * @returns False if canceled (inverted)
		 */
		mouseEvent: function (target, type, params) {
			var evt, ctrlKey, altKey, shiftKey, metaKey;
			if (target instanceof $) {
				target = target[0];
			}
			params = $.extend({
				"button": 0,
				"bubbles": true,
				"cancelable": true
			}, params);

			//evt = new MouseEvent(type, params);
			// No DOM4 MouseEvent in PhantomJS yet :\
			ctrlKey = params.ctrlKey? params.ctrlKey : false;
			altKey = params.altKey? params.altKey : false;
			shiftKey = params.shiftKey? params.shiftKey : false;
			metaKey = params.metaKey? params.metaKey : false;
			evt = document.createEvent('MouseEvent');
			evt.initMouseEvent(type, params.bubbles, params.cancelable, window, 1, 0, 0, null, null, ctrlKey, altKey, shiftKey, metaKey, params.button, null);

			return !target.dispatchEvent(evt);
		},
		/**
		 * Triggers a click event on an element
		 * @param target Can be DOM or jQuery
		 * @param params Optional object with value accepted by mouseEventInit.
		 */
		click: function (target, params) {
			if (this.mouseEvent(target, "mousedown", params)) {
				this.mouseEvent(target, "mouseup", params);
				this.mouseEvent(target, "click", params);
			}
		},
		/**
		 * Creates html element with provided options and adds it to qunit-fixture element
		 * @param {string} element Html element, e.g. "<div></div>"
		 * @param {object} options Optional object with value accepted by $(element, options) function
		 * @returns Created element wrapped in jQuery object
		 */
		appendToFixture: function (element, options) {
			var $qunitFixture = $('#qunit-fixture');
			return $(element, options).appendTo($qunitFixture);
		}
	});

	// patch ":focus" pseudo for PhantomJS
	$.expr[':'].focus = function (elem) {
		return elem === document.activeElement;
	};
	//must be called once:
	$(document).is(":focus");
}(jQuery));