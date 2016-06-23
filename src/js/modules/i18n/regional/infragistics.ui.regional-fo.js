﻿/* Faroe +*/

/*global jQuery */
(function ($) {
    $.ig = $.ig || {};
    $.ig.regional = $.ig.regional || {};
	if ($.datepicker && $.datepicker.regional) {
	    $.datepicker.regional['fo'] = {
			closeText: 'Lat aftur',
			prevText: '&#x3C;Fyrra',
			nextText: 'Næsta&#x3E;',
			currentText: 'Í dag',
			monthNames: ['Januar','Februar','Mars','Apríl','Mei','Juni',
			'Juli','August','September','Oktober','November','Desember'],
			monthNamesShort: ['Jan','Feb','Mar','Apr','Mei','Jun',
			'Jul','Aug','Sep','Okt','Nov','Des'],
			dayNames: ['Sunnudagur','Mánadagur','Týsdagur','Mikudagur','Hósdagur','Fríggjadagur','Leyardagur'],
			dayNamesShort: ['Sun','Mán','Týs','Mik','Hós','Frí','Ley'],
			dayNamesMin: ['Su','Má','Tý','Mi','Hó','Fr','Le'],
			weekHeader: 'Vk',
			dateFormat: 'dd-mm-yy',
			firstDay: 1,
			isRTL: false,
			showMonthAfterYear: false,
			yearSuffix: ''
		};
    }	
    $.ig.regional.fo = {
	    monthNames: ['Januar', 'Februar', 'Mars', 'Apríl', 'Mei', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'],
	    monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'],
	    dayNames: ['Sunnudagur', 'Mánadagur', 'Týsdagur', 'Mikudagur', 'Hósdagur', 'Fríggjadagur', 'Leyardagur'],
	    dayNamesShort: ['Sun', 'Mán', 'Týs', 'Mik', 'Hós', 'Frí', 'Ley'],
	    datePattern: 'dd-MM-yyyy',
	    dateLongPattern: 'd. MMMM yyyy',
	    dateTimePattern: 'dd-MM-yyyy HH.mm',
	    timePattern: 'HH.mm',
	    timeLongPattern: 'HH.mm.ss',
	    //
	    numericDecimalSeparator: ',',
	    numericGroupSeparator: '.',
	    numericMaxDecimals: 2,
	    currencyPositivePattern: '$ n',
	    currencyNegativePattern: '$ -n',
	    currencySymbol: 'kr',
	    currencyDecimalSeparator: ',',
	    currencyGroupSeparator: '.',
	    percentDecimalSeparator: ',',
	    percentGroupSeparator: '.'
    };
    if ($.ig.setRegionalDefault) {
	    $.ig.setRegionalDefault('fo');
    }
})(jQuery);