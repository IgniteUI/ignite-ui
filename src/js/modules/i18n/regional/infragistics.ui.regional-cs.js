/* Czech +*/

/*global jQuery */
(function ($) {
    $.ig = $.ig || {};
    $.ig.regional = $.ig.regional || {};
	if ($.datepicker && $.datepicker.regional) {
	    $.datepicker.regional['cs'] = {
			closeText: 'Zavřít',
			prevText: '&#x3C;Dříve',
			nextText: 'Později&#x3E;',
			currentText: 'Nyní',
			monthNames: ['leden','únor','březen','duben','květen','červen',
			'červenec','srpen','září','říjen','listopad','prosinec'],
			monthNamesShort: ['led','úno','bře','dub','kvě','čer',
			'čvc','srp','zář','říj','lis','pro'],
			dayNames: ['neděle', 'pondělí', 'úterý', 'středa', 'čtvrtek', 'pátek', 'sobota'],
			dayNamesShort: ['ne', 'po', 'út', 'st', 'čt', 'pá', 'so'],
			dayNamesMin: ['ne','po','út','st','čt','pá','so'],
			weekHeader: 'Týd',
			dateFormat: 'dd.mm.yy',
			firstDay: 1,
			isRTL: false,
			showMonthAfterYear: false,
			yearSuffix: ''
	    };
    }	
    $.ig.regional.cs = {
	    monthNames: ['leden', 'únor', 'březen', 'duben', 'květen', 'červen', 'červenec', 'srpen', 'září', 'říjen', 'listopad', 'prosinec'],
	    monthNamesShort: ['led', 'úno', 'bře', 'dub', 'kvě', 'čer', 'čvc', 'srp', 'zář', 'říj', 'lis', 'pro'],
	    dayNames: ['neděle', 'pondělí', 'úterý', 'středa', 'čtvrtek', 'pátek', 'sobota'],
	    dayNamesShort: ['ne', 'po', 'út', 'st', 'čt', 'pá', 'so'],
	    am: 'do',
	    pm: 'od',
	    datePattern: 'd.M.yyyy',
	    dateLongPattern: 'd. MMMM yyyy',
	    dateTimePattern: 'd.M.yyyy HH:mm',
	    timePattern: 'HH:mm',
	    timeLongPattern: 'HH:mm:ss',
	    //
	    numericNegativePattern: '-n$',
	    numericDecimalSeparator: ',',
	    numericGroupSeparator: ' ',
	    numericMaxDecimals: 2,
	    currencyPositivePattern: 'n $',
	    currencyNegativePattern: '-n $',
	    currencySymbol: 'Kč',
	    currencyDecimalSeparator: ',',
	    currencyGroupSeparator: ' ',
	    percentDecimalSeparator: ',',
	    percentGroupSeparator: ' '
    };
    if ($.ig.setRegionalDefault) {
	    $.ig.setRegionalDefault('cs');
    }
})(jQuery);