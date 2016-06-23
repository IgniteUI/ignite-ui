﻿/* Denmark +*/

/*global jQuery */
(function ($) {
    $.ig = $.ig || {};
    $.ig.regional = $.ig.regional || {};
	if ($.datepicker && $.datepicker.regional) {
	    $.datepicker.regional['da'] = {
			closeText: 'Luk',
			prevText: '&#x3C;Forrige',
			nextText: 'Næste&#x3E;',
			currentText: 'Idag',
			monthNames: ['Januar','Februar','Marts','April','Maj','Juni',
			'Juli','August','September','Oktober','November','December'],
			monthNamesShort: ['Jan','Feb','Mar','Apr','Maj','Jun',
			'Jul','Aug','Sep','Okt','Nov','Dec'],
			dayNames: ['Søndag','Mandag','Tirsdag','Onsdag','Torsdag','Fredag','Lørdag'],
			dayNamesShort: ['Søn','Man','Tir','Ons','Tor','Fre','Lør'],
			dayNamesMin: ['Sø','Ma','Ti','On','To','Fr','Lø'],
			weekHeader: 'Uge',
			dateFormat: 'dd-mm-yy',
			firstDay: 1,
			isRTL: false,
			showMonthAfterYear: false,
			yearSuffix: ''
	    };
    }	
    $.ig.regional.da = {
	    monthNames: ['Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'December'],
	    monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
	    dayNames: ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag'],
	    dayNamesShort: ['Søn', 'Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør'],
	    datePattern: 'dd-MM-yyyy',
	    dateLongPattern: 'd. MMMM yyyy',
	    dateTimePattern: 'dd-MM-yyyy HH:mm',
	    timePattern: 'HH:mm',
	    timeLongPattern: 'HH:mm:ss',
	    //
	    numericDecimalSeparator: ',',
	    numericGroupSeparator: '.',
	    numericMaxDecimals: 2,
	    currencyPositivePattern: '$ n',
	    currencyNegativePattern: '$ -n',
	    currencySymbol: 'kr',
	    currencyDecimalSeparator: ',',
	    currencyGroupSeparator: '.',
	    percentPositivePattern: 'n $',
	    percentNegativePattern: '-n $',
	    percentDecimalSeparator: ',',
	    percentGroupSeparator: '.'
    };
    if ($.ig.setRegionalDefault) {
	    $.ig.setRegionalDefault('da');
    }
})(jQuery);