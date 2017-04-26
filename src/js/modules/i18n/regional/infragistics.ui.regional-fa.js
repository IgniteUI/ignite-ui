/* Iran (Farsi) +*/

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
	    $.datepicker.regional['fa'] = {
			closeText: 'بستن',
			prevText: '&#x3C;قبلی',
			nextText: 'بعدی&#x3E;',
			currentText: 'امروز',
			monthNames: [
				'فروردين',
				'ارديبهشت',
				'خرداد',
				'تير',
				'مرداد',
				'شهريور',
				'مهر',
				'آبان',
				'آذر',
				'دی',
				'بهمن',
				'اسفند'
			],
			monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'],
			dayNames: [
				'يکشنبه',
				'دوشنبه',
				'سه‌شنبه',
				'چهارشنبه',
				'پنجشنبه',
				'جمعه',
				'شنبه'
			],
			dayNamesShort: [
				'ی',
				'د',
				'س',
				'چ',
				'پ',
				'ج',
				'ش'
			],
			dayNamesMin: [
				'ی',
				'د',
				'س',
				'چ',
				'پ',
				'ج',
				'ش'
			],
			weekHeader: 'هف',
			dateFormat: 'yy/mm/dd',
			firstDay: 6,
			isRTL: true,
			showMonthAfterYear: false,
			yearSuffix: ''
		};
    }
    $.ig.regional.fa = {
	    monthNames: ['فروردين', 'ارديبهشت', 'خرداد', 'تير', 'مرداد', 'شهريور', 'مهر', 'آبان', 'آذر', 'دي', 'بهمن', 'اسفند'],
	    monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
	    dayNames: ['يکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه'],
	    dayNamesShort: ['ي', 'د', 'س', 'چ', 'پ', 'ج', 'ش'],
	    am: 'ظق',
	    pm: 'ظب',
	    datePattern: 'MM/dd/yyyy',
	    dateLongPattern: 'yyyy ,dd MMMM dddd',
	    dateTimePattern: 'MM/dd/yyyy hh:mm tt',
	    timePattern: 'hh:mm tt',
	    timeLongPattern: 'hh:mm:ss tt',
	    //
	    numericNegativePattern: 'n$-',
	    numericMaxDecimals: 2,
	    currencyPositivePattern: 'n $',
	    currencyNegativePattern: 'n$-',
	    currencySymbol: 'ريال',
	    currencyDecimalSeparator: '/',
	    percentPositivePattern: 'n $',
	    percentNegativePattern: '-n $'
    };
    if ($.ig.setRegionalDefault) {
	    $.ig.setRegionalDefault('fa');
    }
}));// REMOVE_FROM_COMBINED_FILES
