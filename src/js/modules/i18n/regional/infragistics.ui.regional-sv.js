﻿/* Sweden +*/

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
	    $.datepicker.regional['sv'] = {
			closeText: 'Stäng',
			prevText: '&#xAB;Förra',
			nextText: 'Nästa&#xBB;',
			currentText: 'Idag',
			monthNames: ['Januari','Februari','Mars','April','Maj','Juni',
			'Juli','Augusti','September','Oktober','November','December'],
			monthNamesShort: ['Jan','Feb','Mar','Apr','Maj','Jun',
			'Jul','Aug','Sep','Okt','Nov','Dec'],
			dayNamesShort: ['Sön','Mån','Tis','Ons','Tor','Fre','Lör'],
			dayNames: ['Söndag','Måndag','Tisdag','Onsdag','Torsdag','Fredag','Lördag'],
			dayNamesMin: ['Sö','Må','Ti','On','To','Fr','Lö'],
			weekHeader: 'Ve',
			dateFormat: 'yy-mm-dd',
			firstDay: 1,
			isRTL: false,
			showMonthAfterYear: false,
			yearSuffix: ''
		};
    }
    $.ig.regional.sv = {
	    monthNames: ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'],
	    monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
	    dayNamesShort: ['Sön', 'Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör'],
	    dayNames: ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'],
	    datePattern: 'yyyy-MM-dd',
	    dateLongPattern: 'dddd d MMMM yyyy',
	    dateTimePattern: 'yyyy-MM-dd HH:mm',
	    timePattern: 'HH:mm',
	    timeLongPattern: 'HH:mm:ss',
	    //
	    numericNegativePattern: '-n$',
	    numericDecimalSeparator: ',',
	    numericGroupSeparator: ' ',
	    numericMaxDecimals: 2,
	    currencyPositivePattern: 'n $',
	    currencyNegativePattern: '-n $',
	    currencySymbol: 'kr',
	    currencyDecimalSeparator: ',',
	    currencyGroupSeparator: ' ',
	    percentDecimalSeparator: ',',
	    percentGroupSeparator: ' '
    };
    if ($.ig.setRegionalDefault) {
	    $.ig.setRegionalDefault('sv');
    }
}));// REMOVE_FROM_COMBINED_FILES
