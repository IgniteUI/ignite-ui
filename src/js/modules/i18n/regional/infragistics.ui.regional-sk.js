/* Slovakia +*/

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
	    $.datepicker.regional['sk'] = {
			closeText: 'Zavrieť',
			prevText: '&#x3C;Predchádzajúci',
			nextText: 'Nasledujúci&#x3E;',
			currentText: 'Dnes',
			monthNames: ['január','február','marec','apríl','máj','jún',
			'júl','august','september','október','november','december'],
			monthNamesShort: ['Jan','Feb','Mar','Apr','Máj','Jún',
			'Júl','Aug','Sep','Okt','Nov','Dec'],
			dayNames: ['nedeľa','pondelok','utorok','streda','štvrtok','piatok','sobota'],
			dayNamesShort: ['Ned','Pon','Uto','Str','Štv','Pia','Sob'],
			dayNamesMin: ['Ne','Po','Ut','St','Št','Pia','So'],
			weekHeader: 'Ty',
			dateFormat: 'dd.mm.yy',
			firstDay: 1,
			isRTL: false,
			showMonthAfterYear: false,
			yearSuffix: ''
		};
    }
    $.ig.regional.sk = {
	    monthNames: ['Január', 'Február', 'Marec', 'Apríl', 'Máj', 'Jún', 'Júl', 'August', 'September', 'Október', 'November', 'December'],
	    monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'Máj', 'Jún', 'Júl', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
	    dayNames: ['Nedel\'a', 'Pondelok', 'Utorok', 'Streda', 'Štvrtok', 'Piatok', 'Sobota'],
	    dayNamesShort: ['Ned', 'Pon', 'Uto', 'Str', 'Štv', 'Pia', 'Sob'],
	    datePattern: 'd. M. yyyy',
	    dateLongPattern: 'd. MMMM yyyy',
	    dateTimePattern: 'd. M. yyyy HH:mm',
	    timePattern: 'HH:mm',
	    timeLongPattern: 'HH:mm:ss',
	    //
	    numericNegativePattern: '-n$',
	    numericDecimalSeparator: ',',
	    numericGroupSeparator: ' ',
	    numericMaxDecimals: 2,
	    currencyPositivePattern: 'n $',
	    currencyNegativePattern: '-n $',
	    currencySymbol: '€',
	    currencyDecimalSeparator: ',',
	    currencyGroupSeparator: ' ',
	    percentDecimalSeparator: ',',
	    percentGroupSeparator: ' '
    };
    if ($.ig.setRegionalDefault) {
	    $.ig.setRegionalDefault('sk');
    }
}));// REMOVE_FROM_COMBINED_FILES
