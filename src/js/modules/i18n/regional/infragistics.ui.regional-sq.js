﻿/* Albania +*/

/*global jQuery */
(function ($) {
    $.ig = $.ig || {};
    $.ig.regional = $.ig.regional || {};
	if ($.datepicker && $.datepicker.regional) {
	    $.datepicker.regional['sq'] = {
			closeText: 'mbylle',
			prevText: '&#x3C;mbrapa',
			nextText: 'Përpara&#x3E;',
			currentText: 'sot',
			monthNames: ['Janar','Shkurt','Mars','Prill','Maj','Qershor',
			'Korrik','Gusht','Shtator','Tetor','Nëntor','Dhjetor'],
			monthNamesShort: ['Jan','Shk','Mar','Pri','Maj','Qer',
			'Kor','Gus','Sht','Tet','Nën','Dhj'],
			dayNames: ['E Diel','E Hënë','E Martë','E Mërkurë','E Enjte','E Premte','E Shtune'],
			dayNamesShort: ['Di','Hë','Ma','Më','En','Pr','Sh'],
			dayNamesMin: ['Di','Hë','Ma','Më','En','Pr','Sh'],
			weekHeader: 'Ja',
			dateFormat: 'dd.mm.yy',
			firstDay: 1,
			isRTL: false,
			showMonthAfterYear: false,
			yearSuffix: ''
		};
    }
    $.ig.regional.sq = {
	    monthNames: ['Janar', 'Shkurt', 'Mars', 'Prill', 'Maj', 'Qershor', 'Korrik', 'Gusht', 'Shtator', 'Tetor', 'Nëntor', 'Dhjetor'],
	    monthNamesShort: ['Jan', 'Shk', 'Mar', 'Pri', 'Maj', 'Qer', 'Kor', 'Gus', 'Sht', 'Tet', 'Nën', 'Dhj'],
	    dayNames: ['E Diel', 'E Hënë', 'E Martë', 'E Mërkurë', 'E Enjte', 'E Premte', 'E Shtune'],
	    dayNamesShort: ['Di', 'Hë', 'Ma', 'Më', 'En', 'Pr', 'Sh'],
	    am: 'PD',
	    pm: 'MD',
	    datePattern: 'yyyy-MM-dd',
	    dateLongPattern: 'd. MMMM yyyy',
	    dateTimePattern: 'yyyy-MM-dd h:mm.tt',
	    timePattern: 'h:mm.tt',
	    timeLongPattern: 'h:mm:ss.tt',
	    //
	    numericNegativePattern: '-n$',
	    numericDecimalSeparator: ',',
	    numericGroupSeparator: '.',
	    numericMaxDecimals: 2,
	    currencyPositivePattern: 'n$',
	    currencyNegativePattern: '-n$',
	    currencySymbol: 'Lek',
	    currencyDecimalSeparator: ',',
	    currencyGroupSeparator: '.',
	    percentPositivePattern: 'n $',
	    percentNegativePattern: '-n $',
	    percentDecimalSeparator: ',',
	    percentGroupSeparator: '.'
    };
    if ($.ig.setRegionalDefault) {
	    $.ig.setRegionalDefault('sq');
    }
})(jQuery);