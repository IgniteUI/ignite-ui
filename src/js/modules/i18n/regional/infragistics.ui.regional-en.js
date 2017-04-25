/* English, US */

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
    $.ig.regional = $.ig.regional || {};
    $.ig.regional['en-US'] = {
	    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	    monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
	    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
	    dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	    am: 'AM',
	    pm: 'PM',
	    datePattern: 'M/d/yyyy',
	    dateLongPattern: 'dddd, MMMM dd, yyyy',
	    dateTimePattern: 'M/d/yyyy h:mm tt',
	    timePattern: 'h:mm tt',
	    timeLongPattern: 'h:mm:ss tt',
	    negativeSign: '-',
	    numericNegativePattern: '-$n',
	    numericDecimalSeparator: '.',
	    numericGroupSeparator: ',',
	    numericGroups: [3],
	    numericMaxDecimals: 2,
	    numericMinDecimals: 0,
	    currencyPositivePattern: '$n',
	    currencyNegativePattern: '-$n',
	    currencySymbol: '$',
	    currencyDecimalSeparator: '.',
	    currencyGroupSeparator: ',',
	    currencyGroups: [3],
	    currencyMaxDecimals: 2,
	    currencyMinDecimals: 2,
	    percentPositivePattern: 'n$',
	    percentNegativePattern: '-n$',
	    percentSymbol: '%',
	    percentDecimalSeparator: '.',
	    percentGroupSeparator: ',',
	    percentGroups: [3],
	    percentDisplayFactor: 100,
	    percentMaxDecimals: 2,
	    percentMinDecimals: 2
    };
    if ($.ig.setRegionalDefault) {
	    $.ig.setRegionalDefault('en-US');
    }
}));// REMOVE_FROM_COMBINED_FILES
