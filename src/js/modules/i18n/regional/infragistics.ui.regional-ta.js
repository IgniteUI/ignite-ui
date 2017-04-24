﻿/* India (Tamil) +*/

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
	    $.datepicker.regional['ta'] = {
			closeText: 'மூடு',
			prevText: 'முன்னையது',
			nextText: 'அடுத்தது',
			currentText: 'இன்று',
			monthNames: ['தை','மாசி','பங்குனி','சித்திரை','வைகாசி','ஆனி',
			'ஆடி','ஆவணி','புரட்டாசி','ஐப்பசி','கார்த்திகை','மார்கழி'],
			monthNamesShort: ['தை','மாசி','பங்','சித்','வைகா','ஆனி',
			'ஆடி','ஆவ','புர','ஐப்','கார்','மார்'],
			dayNames: ['ஞாயிற்றுக்கிழமை','திங்கட்கிழமை','செவ்வாய்க்கிழமை','புதன்கிழமை','வியாழக்கிழமை','வெள்ளிக்கிழமை','சனிக்கிழமை'],
			dayNamesShort: ['ஞாயிறு','திங்கள்','செவ்வாய்','புதன்','வியாழன்','வெள்ளி','சனி'],
			dayNamesMin: ['ஞா','தி','செ','பு','வி','வெ','ச'],
			weekHeader: 'Не',
			dateFormat: 'dd/mm/yy',
			firstDay: 1,
			isRTL: false,
			showMonthAfterYear: false,
			yearSuffix: ''
		};
    }
    $.ig.regional.ta = {
	    monthNames: ['தை', 'மாசி', 'பங்குனி', 'சித்திரை', 'வைகாசி', 'ஆனி', 'ஆடி', 'ஆவணி', 'புரட்டாசி', 'ஐப்பசி', 'கார்த்திகை', 'மார்கழி'],
	    monthNamesShort: ['தை', 'மாசி', 'பங்', 'சித்', 'வைகா', 'ஆனி', 'ஆடி', 'ஆவ', 'புர', 'ஐப்', 'கார்', 'மார்'],
	    dayNames: ['ஞாயிற்றுக்கிழமை', 'திங்கட்கிழமை', 'செவ்வாய்க்கிழமை', 'புதன்கிழமை', 'வியாழக்கிழமை', 'வெள்ளிக்கிழமை', 'சனிக்கிழமை'],
	    dayNamesShort: ['ஞாயிறு', 'திங்கள்', 'செவ்வாய்', 'புதன்', 'வியாழன்', 'வெள்ளி', 'சனி'],
	    am: 'கல',
	    pm: 'மல',
	    datePattern: 'dd-MM-yyyy',
	    dateLongPattern: 'dd MMMM yyyy',
	    dateTimePattern: 'dd-MM-yyyy HH:mm',
	    timePattern: 'HH:mm',
	    timeLongPattern: 'HH:mm:ss',
	    //
	    numericMaxDecimals: 2,
	    currencyPositivePattern: '$ n',
	    currencyNegativePattern: '$ -n',
	    currencySymbol: 'ரூ',
	    percentPositivePattern: 'n $',
	    percentNegativePattern: '-n $'
    };
    if ($.ig.setRegionalDefault) {
	    $.ig.setRegionalDefault('ta');
    }
}));// REMOVE_FROM_COMBINED_FILES
