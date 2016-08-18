(function ($) {

	$.ig = $.ig || {};
	$.ig.TestUtil = $.ig.TestUtil || {};
	
	$.extend( $.ig.TestUtil, {
		
		// Use: $.ig.TestUtil.checkClass(elementToCheck, classToCheckFor)
		checkClass: function (element, cls) {
			if (typeof(ok) === 'function') {
				ok(element.hasClass(cls), 'The control with id: ' + element[0].id + ' does not contain the class: ' + cls);
			} else {
				return element.hasClass(cls);
			}
		},
		
		// Use: $.ig.TestUtil.getAbsolutePosition(elementToCheck)
		getAbsolutePosition: function (element) {
			var position = { X: 0, Y: 0 };
			var cElement = element;
			
			while (cElement !== null) {
				position.X += cElement.offsetLeft;
				position.Y += cElement.offsetTop;
				
				cElement = cElement.offsetParent;
			}
			
			return position;
		},
		
		// Use: $.ig.TestUtil.boolParse(param) : returns false with empty parameter
		boolParse: function(result) {
			return !!result && result !== 'false';
		},

		/// Input interactions
		
		/**
		 * Performs a paste on an input
		 * @param input The HTMLInput element to paste into
		 * @param newVal The text to paste in (at cursor position or over selection if focused)
		 */
		paste: 	function (input, newVal) {
			// create a mouse click event
			var event = document.createEvent('Event'),
				start = input.selectionStart,
				end = input.selectionEnd;
			event.initEvent('paste', true, true);
			event.target = input;
			event.srcElement = input;

			// NB! paste event is fired *before* any changes are applied to the DOM
			input.dispatchEvent(event);

			// set value and cursor
			oldVal = $(input).val();
			prefix = oldVal.substring(0, start);
			sufix = oldVal.substring(end, oldVal.length);
			$(input).val(prefix + newVal + sufix);

			input.setSelectionRange(end + newVal.length, end + newVal.length);
		}
	});
	
}(jQuery));