/* Hungary +*/

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
	    $.datepicker.regional['hu'] = {
			closeText: 'bezár',
			prevText: 'vissza',
			nextText: 'előre',
			currentText: 'ma',
			monthNames: ['Január', 'Február', 'Március', 'Április', 'Május', 'Június',
			'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'],
			monthNamesShort: ['Jan', 'Feb', 'Már', 'Ápr', 'Máj', 'Jún',
			'Júl', 'Aug', 'Szep', 'Okt', 'Nov', 'Dec'],
			dayNames: ['Vasárnap', 'Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat'],
			dayNamesShort: ['Vas', 'Hét', 'Ked', 'Sze', 'Csü', 'Pén', 'Szo'],
			dayNamesMin: ['V', 'H', 'K', 'Sze', 'Cs', 'P', 'Szo'],
			weekHeader: 'Hét',
			dateFormat: 'yy.mm.dd.',
			firstDay: 1,
			isRTL: false,
			showMonthAfterYear: true,
			yearSuffix: ''
		};
    }
    $.ig.regional.hu = {
	    monthNames: ['Január', 'Február', 'Március', 'Április', 'Május', 'Június', 'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'],
	    monthNamesShort: ['Jan', 'Feb', 'Már', 'Ápr', 'Máj', 'Jún', 'Júl', 'Aug', 'Szep', 'Okt', 'Nov', 'Dec'],
	    dayNames: ['Vasárnap', 'Hétfö', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat'],
	    dayNamesShort: ['Vas', 'Hét', 'Ked', 'Sze', 'Csü', 'Pén', 'Szo'],
	    am: 'de',
	    pm: 'du',
	    datePattern: 'yyyy. MM. dd.',
	    dateLongPattern: 'yyyy. MMMM. dd.',
	    dateTimePattern: 'yyyy. MM. dd. HH:mm',
	    timePattern: 'HH:mm',
	    timeLongPattern: 'HH:mm:ss',
	    //
	    numericNegativePattern: '-n$',
	    numericDecimalSeparator: ',',
	    numericGroupSeparator: ' ',
	    numericMaxDecimals: 2,
	    currencyPositivePattern: 'n $',
	    currencyNegativePattern: '-n $',
	    currencySymbol: 'Ft',
	    currencyDecimalSeparator: ',',
	    currencyGroupSeparator: ' ',
	    percentDecimalSeparator: ',',
	    percentGroupSeparator: ' '
    };
    if ($.ig.setRegionalDefault) {
	    $.ig.setRegionalDefault('hu');
    }
}));// REMOVE_FROM_COMBINED_FILES
