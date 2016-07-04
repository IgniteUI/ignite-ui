/* South Africa +*/

/*global jQuery */
(function ($) {
    $.ig = $.ig || {};
    $.ig.regional = $.ig.regional || {};
	if ($.datepicker && $.datepicker.regional) {
	    $.datepicker.regional['af'] = {
			closeText: 'Selekteer',
			prevText: 'Vorige',
			nextText: 'Volgende',
			currentText: 'Vandag',
			monthNames: ['Januarie','Februarie','Maart','April','Mei','Junie',
			'Julie','Augustus','September','Oktober','November','Desember'],
			monthNamesShort: ['Jan', 'Feb', 'Mrt', 'Apr', 'Mei', 'Jun',
			'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'],
			dayNames: ['Sondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrydag', 'Saterdag'],
			dayNamesShort: ['Son', 'Maa', 'Din', 'Woe', 'Don', 'Vry', 'Sat'],
			dayNamesMin: ['So','Ma','Di','Wo','Do','Vr','Sa'],
			weekHeader: 'Wk',
			dateFormat: 'dd/mm/yy',
			firstDay: 1,
			isRTL: false,
			showMonthAfterYear: false,
			yearSuffix: ''
	    };
    }	
    $.ig.regional.af = {
	    monthNames: ['Januarie', 'Februarie', 'Maart', 'April', 'Mei', 'Junie', 'Julie', 'Augustus', 'September', 'Oktober', 'November', 'Desember'],
	    monthNamesShort: ['Jan', 'Feb', 'Mrt', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'],
	    dayNames: ['Sondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrydag', 'Saterdag'],
	    dayNamesShort: ['Son', 'Maa', 'Din', 'Woe', 'Don', 'Vry', 'Sat'],
	    pm: 'nm',
	    datePattern: 'yyyy/MM/dd',
	    dateLongPattern: 'dd MMMM yyyy',
	    dateTimePattern: 'yyyy/MM/dd hh:mm tt',
	    timePattern: 'hh:mm tt',
	    timeLongPattern: 'hh:mm:ss tt',
	    //
	    numericMaxDecimals: 2,
	    currencyPositivePattern: '$ n',
	    currencyNegativePattern: '$-n',
	    currencySymbol: 'R'
    };
    if ($.ig.setRegionalDefault) {
	    $.ig.setRegionalDefault('af');
    }
})(jQuery);