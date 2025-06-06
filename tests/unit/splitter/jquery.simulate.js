/*
 * jquery.simulate - simulate browser mouse and keyboard events
 * http://jqueryui.com
 *
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

;(function( $ ) {

var rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|contextmenu)|click/;

$.fn.simulate = function( type, options ) {
	return this.each(function() {
		new $.simulate( this, type, options );
	});
};

$.simulate = function( elem, type, options ) {
	var method = $.camelCase( "simulate-" + type );

	this.target = elem;
	this.options = options;

	if ( this[ method ] ) {
		this[ method ]();
	} else {
		this.simulateEvent( elem, type, options );
	}
};

$.extend( $.simulate.prototype, {
	simulateEvent: function( elem, type, options ) {
		var event = this.createEvent( type, options );
		this.dispatchEvent( elem, type, event, options );
	},

	createEvent: function( type, options ) {
		if ( rkeyEvent.test( type ) ) {
			return this.keyEvent( type, options );
		}

		if ( rmouseEvent.test( type ) ) {
			return this.mouseEvent( type, options );
		}
	},

	mouseEvent: function( type, options ) {
		var event, eventDoc, doc, body;
		options = $.extend({
			bubbles: true,
			cancelable: (type !== "mousemove"),
			view: window,
			detail: 0,
			screenX: 0,
			screenY: 0,
			// TODO: default clientX/Y to a position within the target element
			clientX: 1,
			clientY: 1,
			ctrlKey: false,
			altKey: false,
			shiftKey: false,
			metaKey: false,
			button: 0,
			relatedTarget: undefined
		}, options );

		if ( document.createEvent ) {
			event = document.createEvent( "MouseEvents" );
			event.initMouseEvent( type, options.bubbles, options.cancelable,
				options.view, options.detail,
				options.screenX, options.screenY, options.clientX, options.clientY,
				options.ctrlKey, options.altKey, options.shiftKey, options.metaKey,
				options.button, options.relatedTarget || document.body.parentNode );

			// IE 9+ creates events with pageX and pageY set to 0.
			// Trying to modify the properties throws an error,
			// so we define getters to return the correct values.
			if ( event.pageX === 0 && event.pageY === 0 && Object.defineProperty ) {
				eventDoc = event.relatedTarget.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				Object.defineProperty( event, "pageX", {
					get: function() {
						return options.clientX +
							( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
							( doc && doc.clientLeft || body && body.clientLeft || 0 );
					}
				});
				Object.defineProperty( event, "pageY", {
					get: function() {
						return options.clientY +
							( doc && doc.scrollTop || body && body.scrollTop || 0 ) -
							( doc && doc.clientTop || body && body.clientTop || 0 );
					}
				});
			}
		} else if ( document.createEventObject ) {
			event = document.createEventObject();
			$.extend( event, options );
			// TODO: what is this mapping for?
			event.button = { 0:1, 1:4, 2:2 }[ event.button ] || event.button;
		}

		return event;
	},

	keyEvent: function( type, options ) {
		var event;
		options = $.extend({
			bubbles: true,
			cancelable: true,
			view: window,
			ctrlKey: false,
			altKey: false,
			shiftKey: false,
			metaKey: false,
			keyCode: 0,
			charCode: undefined
		}, options );

		if ( document.createEvent ) {
			try {
				event = document.createEvent( "KeyEvents" );
				event.initKeyEvent( type, options.bubbles, options.cancelable, options.view,
					options.ctrlKey, options.altKey, options.shiftKey, options.metaKey,
					options.keyCode, options.charCode );
			// TODO: what is this supporting?
			} catch( err ) {
				event = document.createEvent( "Events" );
				event.initEvent( type, options.bubbles, options.cancelable );
				$.extend( event, {
					view: options.view,
					ctrlKey: options.ctrlKey,
					altKey: options.altKey,
					shiftKey: options.shiftKey,
					metaKey: options.metaKey,
					keyCode: options.keyCode,
					charCode: options.charCode
				});
			}
		} else if ( document.createEventObject ) {
			event = document.createEventObject();
			$.extend( event, options );
		}

		// TODO: can we hook into core's logic?
		if ( $.ui.ie || (({}).toString.call( window.opera ) === "[object Opera]") ) {
			// TODO: is charCode ever <0 ? Can we just use charCode || keyCode?
			event.keyCode = (options.charCode > 0) ? options.charCode : options.keyCode;
			event.charCode = undefined;
		}

		return event;
	},

	// TODO: does this need type? Can't we just check event.type?
	dispatchEvent: function( elem, type, event ) {
		if ( elem.dispatchEvent ) {
			elem.dispatchEvent( event );
		} else if ( elem.fireEvent ) {
			elem.fireEvent( "on" + type, event );
		}
	},

	simulateFocus: function() {
		var focusinEvent,
			triggered = false,
			element = $( this.target );

		function trigger() {
			triggered = true;
		}

		element.on( "focus", trigger );
		element[ 0 ].trigger("focus");

		if ( !triggered ) {
			focusinEvent = $.Event( "focusin" );
			focusinEvent.preventDefault();
			element.trigger( focusinEvent );
			element.triggerHandler( "focus" );
		}
		element.off( "focus", trigger );
	},

	simulateBlur: function() {
		var focusoutEvent,
			triggered = false,
			element = $( this.target );

		function trigger() {
			triggered = true;
		}

		element.on( "blur", trigger );
		element[ 0 ].blur();

		// blur events are async in IE
		setTimeout(function() {
			// IE won't let the blur occur if the window is inactive
			if ( element[ 0 ].ownerDocument.activeElement === element[ 0 ] ) {
				element[ 0 ].ownerDocument.body.trigger("focus");
			}

			// Firefox won't trigger events if the window is inactive
			// IE doesn't trigger events if we had to manually focus the body
			if ( !triggered ) {
				focusoutEvent = $.Event( "focusout" );
				focusoutEvent.preventDefault();
				element.trigger( focusoutEvent );
				element.triggerHandler( "blur" );
			}
			element.off( "blur", trigger );
		}, 1 );
	}
});



/** complex events **/

function findCenter( elem ) {
	var offset,
		document = $( elem.ownerDocument );
	elem = $( elem );
	offset = elem.igOffset();

	return {
		x: offset.left + elem.outerWidth() / 2 - document.scrollLeft(),
		y: offset.top + elem.outerHeight() / 2 - document.scrollTop()
	};
}

$.extend( $.simulate.prototype, {
	simulateDrag: function() {
		var target = this.target,
			options = this.options,
			center = findCenter( target ),
			x = Math.floor( center.x ),
			y = Math.floor( center.y ),
			dx = options.dx || 0,
			dy = options.dy || 0,
			checkAfterMouseDown = options.checkAfterMouseDown || null,
			checkAfterMouseMove = options.checkAfterMouseMove || null,
			checkAfterMouseUp = options.checkAfterMouseUp || null,
			checkAfterClick = options.checkAfterClick || null,
			coord = { clientX: x, clientY: y },
			self = this;

		$(target).mouseenter();
		this.simulateEvent( target, "mousedown", coord );
		if(checkAfterMouseDown && typeof checkAfterMouseDown === 'function') {
			checkAfterMouseDown(target);
		}
		coord = { clientX: x + 3, clientY: y + 3 };
		self.simulateEvent( target, "mousemove", coord );
		if(checkAfterMouseMove && typeof checkAfterMouseMove === 'function') {
			checkAfterMouseMove(target);
		}
		coord = { clientX: x + dx, clientY: y + dy };
		self.simulateEvent( target, "mousemove", coord );
		if(checkAfterMouseMove && typeof checkAfterMouseMove === 'function') {
			checkAfterMouseMove(target);
		}
		self.simulateEvent( target, "mouseup", coord );
		if(checkAfterMouseUp && typeof checkAfterMouseUp === 'function') {
			checkAfterMouseUp(target);
		}
		$(target).mouseleave();
		self.simulateEvent( target, "click", coord );
		if(checkAfterClick && typeof checkAfterClick === 'function') {
			checkAfterClick(target);
		}
	}
});

})( jQuery );