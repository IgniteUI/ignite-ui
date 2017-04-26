/* Azerbaijan, Latin +*/

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
	    $.datepicker.regional['az'] = {
			closeText: 'Bağla',
			prevText: '&#x3C;Geri',
			nextText: 'İrəli&#x3E;',
			currentText: 'Bugün',
			monthNames: ['Yanvar','Fevral','Mart','Aprel','May','İyun',
			'İyul','Avqust','Sentyabr','Oktyabr','Noyabr','Dekabr'],
			monthNamesShort: ['Yan','Fev','Mar','Apr','May','İyun',
			'İyul','Avq','Sen','Okt','Noy','Dek'],
			dayNames: ['Bazar','Bazar ertəsi','Çərşənbə axşamı','Çərşənbə','Cümə axşamı','Cümə','Şənbə'],
			dayNamesShort: ['B','Be','Ça','Ç','Ca','C','Ş'],
			dayNamesMin: ['B','B','Ç','С','Ç','C','Ş'],
			weekHeader: 'Hf',
			dateFormat: 'dd.mm.yy',
			firstDay: 1,
			isRTL: false,
			showMonthAfterYear: false,
			yearSuffix: ''
	    };
    }	
    $.ig.regional.az = {
	    monthNames: ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun', 'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'],
	    monthNamesShort: ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'İyun', 'İyul', 'Avq', 'Sen', 'Okt', 'Noy', 'Dek'],
	    dayNames: ['Bazar', 'Bazar ertəsi', 'Çərşənbə axşamı', 'Çərşənbə', 'Cümə axşamı', 'Cümə', 'Şənbə'],
	    dayNamesShort: ['B', 'Be', 'Ça', 'Ç', 'Ca', 'C', 'Ş'],
	    datePattern: 'dd.MM.yyyy',
	    dateLongPattern: 'd MMMM yyyy',
	    dateTimePattern: 'dd.MM.yyyy HH:mm',
	    timePattern: 'HH:mm',
	    timeLongPattern: 'HH:mm:ss',
	    //
	    numericDecimalSeparator: ',',
	    numericGroupSeparator: ' ',
	    numericMaxDecimals: 2,
	    currencyPositivePattern: 'n $',
	    currencyNegativePattern: '-n $',
	    currencySymbol: 'man.',
	    currencyDecimalSeparator: ',',
	    currencyGroupSeparator: ' ',
	    percentDecimalSeparator: ',',
	    percentGroupSeparator: ' '
    };
    if ($.ig.setRegionalDefault) {
	    $.ig.setRegionalDefault('az');
    }
}));// REMOVE_FROM_COMBINED_FILES
