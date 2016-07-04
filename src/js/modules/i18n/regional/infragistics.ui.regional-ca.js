/* Catalan +*/

/*global jQuery */
(function ($) {
    $.ig = $.ig || {};
    $.ig.regional = $.ig.regional || {};
	if ($.datepicker && $.datepicker.regional) {
	    $.datepicker.regional['ca'] = {
			closeText: 'Tanca',
			prevText: 'Anterior',
			nextText: 'Següent',
			currentText: 'Avui',
			monthNames: ['gener','febrer','març','abril','maig','juny',
			'juliol','agost','setembre','octubre','novembre','desembre'],
			monthNamesShort: ['gen','feb','març','abr','maig','juny',
			'jul','ag','set','oct','nov','des'],
			dayNames: ['diumenge','dilluns','dimarts','dimecres','dijous','divendres','dissabte'],
			dayNamesShort: ['dg','dl','dt','dc','dj','dv','ds'],
			dayNamesMin: ['dg','dl','dt','dc','dj','dv','ds'],
			weekHeader: 'Set',
			dateFormat: 'dd/mm/yy',
			firstDay: 1,
			isRTL: false,
			showMonthAfterYear: false,
			yearSuffix: ''
	    };
    }	
    $.ig.regional.ca = {
	    monthNames: ['Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Agost', 'Setembre', 'Octubre', 'Novembre', 'Desembre'],
	    monthNamesShort: ['Gen', 'Feb', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Des'],
	    dayNames: ['Diumenge', 'Dilluns', 'Dimarts', 'Dimecres', 'Dijous', 'Divendres', 'Dissabte'],
	    dayNamesShort: ['Dug', 'Dln', 'Dmt', 'Dmc', 'Djs', 'Dvn', 'Dsb'],
	    datePattern: 'dd/MM/yyyy',
	    dateLongPattern: 'dddd, d / MMMM / yyyy',
	    dateTimePattern: 'dd/MM/yyyy HH:mm',
	    timePattern: 'HH:mm',
	    timeLongPattern: 'HH:mm:ss',
	    //
	    numericNegativePattern: '- n$',
	    numericDecimalSeparator: ',',
	    numericGroupSeparator: '.',
	    numericMaxDecimals: 2,
	    currencyPositivePattern: 'n $',
	    currencyNegativePattern: '-n $',
	    currencySymbol: '€',
	    currencyDecimalSeparator: ',',
	    currencyGroupSeparator: '.',
	    percentPositivePattern: 'n $',
	    percentNegativePattern: '-n $',
	    percentDecimalSeparator: ',',
	    percentGroupSeparator: '.'
    };
    if ($.ig.setRegionalDefault) {
	    $.ig.setRegionalDefault('ca');
    }
})(jQuery);