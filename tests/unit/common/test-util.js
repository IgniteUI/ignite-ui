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
		}
		
	});
	
}(jQuery));