/*!@license
* Infragistics.Web.ClientUI Validator localization resources <build_number>
*
* Copyright (c) 2011-<year> Infragistics Inc.
*
* http://www.infragistics.com/
*
*/

(function (factory) {
	if (typeof define === "function" && define.amd) {
		define( [
			"jquery"
		], factory );
	} else {
		factory(jQuery);
	}
}
(function ($) {
    $.ig = $.ig || {};

    if (!$.ig.Validator) {
	    $.ig.Validator = {
		    locale: {
		        defaultMessage: 'This field needs attention',
		        selectMessage: 'A value should be selected',
		        rangeSelectMessage: 'At least {0} but no more than {1} items should be selected',
		        minSelectMessage: 'At least {0} item(s) should be selected',
		        maxSelectMessage: 'No more than {0} item(s) should be selected',
		        rangeLengthMessage: 'Entry should be between {0} and {1} characters long',
		        minLengthMessage: 'Entry should be at least {0} character(s) long',
		        maxLengthMessage: 'Entry should be no more than {0} character(s) long',
		        requiredMessage: 'This field is required',
		        patternMessage: 'Entry does not match the required pattern',
		        maskMessage: 'All required positions should be filled',
		        dateFieldsMessage: 'Date field values should be entered',
		        invalidDayMessage: 'A valid day of the month should be entered',
		        dateMessage: 'A valid date should be entered',
		        numberMessage: 'A valid number should be entered',
		        rangeValueMessage: 'A value between {0} and {1} should be entered',
		        minValueMessage: 'A value of at least {0} should be entered',
		        maxValueMessage: 'A value no more than {0} should be entered',
		        emailMessage: 'A valid email address should be entered',
		        creditCardMessage: 'A valid payment card number should be entered',
		        equalToMessage: 'The two values do not match',
		        optionalString: '(optional)'
		    }
	    };
    }
}));// REMOVE_FROM_COMBINED_FILES
