/* Norway +*/

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
	    $.datepicker.regional['no'] = {
			closeText: 'Lukk',
			prevText: '&#xAB;Forrige',
			nextText: 'Neste&#xBB;',
			currentText: 'I dag',
			monthNames: ['januar','februar','mars','april','mai','juni','juli','august','september','oktober','november','desember'],
			monthNamesShort: ['jan','feb','mar','apr','mai','jun','jul','aug','sep','okt','nov','des'],
			dayNamesShort: ['søn','man','tir','ons','tor','fre','lør'],
			dayNames: ['søndag','mandag','tirsdag','onsdag','torsdag','fredag','lørdag'],
			dayNamesMin: ['sø','ma','ti','on','to','fr','lø'],
			weekHeader: 'Uke',
			dateFormat: 'dd.mm.yy',
			firstDay: 1,
			isRTL: false,
			showMonthAfterYear: false,
			yearSuffix: ''
		};
    }
    $.ig.regional.no = {
	    monthNames: ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'],
	    monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'],
	    dayNamesShort: ['Søn', 'Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør'],
	    dayNames: ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag'],
	    datePattern: 'dd.MM.yyyy',
	    dateLongPattern: 'd. MMMM yyyy',
	    dateTimePattern: 'dd.MM.yyyy HH:mm',
	    timePattern: 'HH:mm',
	    timeLongPattern: 'HH:mm:ss',
	    //
	    numericDecimalSeparator: ',',
	    numericGroupSeparator: ' ',
	    numericMaxDecimals: 2,
	    currencyPositivePattern: '$ n',
	    currencyNegativePattern: '$ -n',
	    currencySymbol: 'kr',
	    currencyDecimalSeparator: ',',
	    currencyGroupSeparator: ' ',
	    percentPositivePattern: 'n $',
	    percentNegativePattern: '-n $',
	    percentDecimalSeparator: ',',
	    percentGroupSeparator: ' '
    };
    if ($.ig.setRegionalDefault) {
    	$.ig.setRegionalDefault('no');
    }
}));// REMOVE_FROM_COMBINED_FILES
