﻿/* English/UK +*/

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
	if ($.datepicker && $.datepicker.regional) {
	    $.datepicker.regional['en-GB'] = {
			closeText: 'Done',
			prevText: 'Prev',
			nextText: 'Next',
			currentText: 'Today',
			monthNames: ['January','February','March','April','May','June',
			'July','August','September','October','November','December'],
			monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
			'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
			dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
			dayNamesMin: ['Su','Mo','Tu','We','Th','Fr','Sa'],
			weekHeader: 'Wk',
			dateFormat: 'dd/mm/yy',
			firstDay: 1,
			isRTL: false,
			showMonthAfterYear: false,
			yearSuffix: ''
	    };
    }
    $.ig.regional['en-GB'] = {
	    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	    monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
	    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
	    dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	    datePattern: 'dd/MM/yyyy',
	    dateLongPattern: 'dd MMMM yyyy',
	    dateTimePattern: 'dd/MM/yyyy HH:mm',
	    timePattern: 'HH:mm',
	    timeLongPattern: 'HH:mm:ss',
		dateTitleFullPattern: 'dd MM yy',
		dateTitleMonthPattern: 'MM yy',
	    //
	    numericDecimalSeparator: '.',
	    numericGroupSeparator: ',',
	    numericMaxDecimals: 2,
	    currencyNegativePattern: '-$n',
	    currencySymbol: '£',
	    currencyDecimalSeparator: '.',
	    currencyGroupSeparator: ',',
	    percentPositivePattern: 'n $',
	    percentNegativePattern: '-n $',
	    percentDecimalSeparator: '.',
	    percentGroupSeparator: ','
    };
    if ($.ig.util && $.ig.util.changeGlobalRegional) {
	    $.ig.util.changeGlobalRegional('en-GB');
    }
}));// REMOVE_FROM_COMBINED_FILES
