/* Iceland +*/

/*global jQuery */
(function ($) {
    $.ig = $.ig || {};
    $.ig.regional = $.ig.regional || {};
	if ($.datepicker && $.datepicker.regional) {
	    $.datepicker.regional['is'] = {
			closeText: 'Loka',
			prevText: '&#x3C; Fyrri',
			nextText: 'Næsti &#x3E;',
			currentText: 'Í dag',
			monthNames: ['Janúar','Febrúar','Mars','Apríl','Maí','Júní',
			'Júlí','Ágúst','September','Október','Nóvember','Desember'],
			monthNamesShort: ['Jan','Feb','Mar','Apr','Maí','Jún',
			'Júl','Ágú','Sep','Okt','Nóv','Des'],
			dayNames: ['Sunnudagur','Mánudagur','Þriðjudagur','Miðvikudagur','Fimmtudagur','Föstudagur','Laugardagur'],
			dayNamesShort: ['Sun','Mán','Þri','Mið','Fim','Fös','Lau'],
			dayNamesMin: ['Su','Má','Þr','Mi','Fi','Fö','La'],
			weekHeader: 'Vika',
			dateFormat: 'dd.mm.yy',
			firstDay: 0,
			isRTL: false,
			showMonthAfterYear: false,
			yearSuffix: ''
		};
    }
    $.ig.regional.is = {
	    monthNames: ['Janúar', 'Febrúar', 'Mars', 'Apríl', 'Maé', 'Júní', 'Júlí', 'Ágúst', 'September', 'Október', 'Nóvember', 'Desember'],
	    monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'Maí', 'Jún', 'Júl', 'Ágú', 'Sep', 'Okt', 'Nóv', 'Des'],
	    dayNames: ['Sunnudagur', 'Mánudagur', 'Þriðjudagur', 'Miðvikudagur', 'Fimmtudagur', 'Föstudagur', 'Laugardagur'],
	    dayNamesShort: ['Sun', 'Mán', 'Þri', 'Mið', 'Fim', 'Fös', 'Lau'],
	    datePattern: 'd.M.yyyy',
	    dateLongPattern: 'd. MMMM yyyy',
	    dateTimePattern: 'd.M.yyyy HH:mm',
	    timePattern: 'HH:mm',
	    timeLongPattern: 'HH:mm:ss',
	    //
	    numericNegativePattern: '-n$',
	    numericDecimalSeparator: ',',
	    numericGroupSeparator: '.',
	    numericMaxDecimals: 2,
	    currencyPositivePattern: 'n $',
	    currencyNegativePattern: '-n $',
	    currencySymbol: 'kr.',
	    currencyDecimalSeparator: ',',
	    currencyGroupSeparator: '.',
	    percentDecimalSeparator: ',',
	    percentGroupSeparator: '.'
    };
    if ($.ig.setRegionalDefault) {
	    $.ig.setRegionalDefault('is');
    }
})(jQuery);