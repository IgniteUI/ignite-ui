﻿/* Serbia (Latin) +*/

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
	    $.datepicker.regional['sr-SR'] = {
			closeText: 'Zatvori',
			prevText: '&#x3C;',
			nextText: '&#x3E;',
			currentText: 'Danas',
			monthNames: ['Januar','Februar','Mart','April','Maj','Jun',
			'Jul','Avgust','Septembar','Oktobar','Novembar','Decembar'],
			monthNamesShort: ['Jan','Feb','Mar','Apr','Maj','Jun',
			'Jul','Avg','Sep','Okt','Nov','Dec'],
			dayNames: ['Nedelja','Ponedeljak','Utorak','Sreda','Četvrtak','Petak','Subota'],
			dayNamesShort: ['Ned','Pon','Uto','Sre','Čet','Pet','Sub'],
			dayNamesMin: ['Ne','Po','Ut','Sr','Če','Pe','Su'],
			weekHeader: 'Sed',
			dateFormat: 'dd.mm.yy',
			firstDay: 1,
			isRTL: false,
			showMonthAfterYear: false,
			yearSuffix: ''
		};
    }
    $.ig.regional['sr-SR'] = {
	    monthNames: ['Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun', 'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'],
	    monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Avg', 'Sep', 'Okt', 'Nov', 'Dec'],
	    dayNames: ['Nedelja', 'Ponedeljak', 'Utorak', 'Sreda', 'Četvrtak', 'Petak', 'Subota'],
	    dayNamesShort: ['Ned', 'Pon', 'Uto', 'Sre', 'Čet', 'Pet', 'Sub'],
	    datePattern: 'd.M.yyyy',
	    dateLongPattern: 'd. MMMM yyyy',
	    dateTimePattern: 'd.M.yyyy H:mm',
	    timePattern: 'H:mm',
	    timeLongPattern: 'H:mm:ss',
	    //
	    numericNegativePattern: '-n$',
	    numericDecimalSeparator: ',',
	    numericGroupSeparator: '.',
	    numericMaxDecimals: 2,
	    currencyPositivePattern: 'n $',
	    currencyNegativePattern: '-n $',
	    currencySymbol: 'Din.',
	    currencyDecimalSeparator: ',',
	    currencyGroupSeparator: '.',
	    percentDecimalSeparator: ',',
	    percentGroupSeparator: '.'
    };
    if ($.ig.setRegionalDefault) {
	    $.ig.setRegionalDefault('sr-SR');
    }
}));// REMOVE_FROM_COMBINED_FILES
