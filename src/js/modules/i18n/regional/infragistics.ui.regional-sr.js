﻿/* Serbia (Cyrillic) +*/

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
	    $.datepicker.regional['sr'] = {
			closeText: 'Затвори',
			prevText: '&#x3C;',
			nextText: '&#x3E;',
			currentText: 'Данас',
			monthNames: ['Јануар','Фебруар','Март','Април','Мај','Јун',
			'Јул','Август','Септембар','Октобар','Новембар','Децембар'],
			monthNamesShort: ['Јан','Феб','Мар','Апр','Мај','Јун',
			'Јул','Авг','Сеп','Окт','Нов','Дец'],
			dayNames: ['Недеља','Понедељак','Уторак','Среда','Четвртак','Петак','Субота'],
			dayNamesShort: ['Нед','Пон','Уто','Сре','Чет','Пет','Суб'],
			dayNamesMin: ['Не','По','Ут','Ср','Че','Пе','Су'],
			weekHeader: 'Сед',
			dateFormat: 'dd.mm.yy',
			firstDay: 1,
			isRTL: false,
			showMonthAfterYear: false,
			yearSuffix: ''
		};
    }
    $.ig.regional.sr = {
	    monthNames: ['Јануар', 'Фебруар', 'Март', 'Април', 'Мај', 'Јун', 'Јул', 'Август', 'Септембар', 'Октобар', 'Новембар', 'Децембар'],
	    monthNamesShort: ['Јан', 'Феб', 'Мар', 'Апр', 'Мај', 'Јун', 'Јул', 'Авг', 'Сеп', 'Окт', 'Нов', 'Дец'],
	    dayNames: ['Недеља', 'Понедељак', 'Уторак', 'Среда', 'Четвртак', 'Петак', 'Субота'],
	    dayNamesShort: ['Нед', 'Пон', 'Уто', 'Сре', 'Чет', 'Пет', 'Суб'],
	    datePattern: 'd.M.yyyy',
	    dateLongPattern: 'd. MMMM yyyy',
	    dateTimePattern: 'd.M.yyyy H:mm',
	    timePattern: 'H:mm',
	    timeLongPattern: 'H:mm:ss',
	    //
	    numericNegativePattern: '-n$',
	    numericDecimalSeparator: ',',
	    numericGroupSeparator: '.',
	    numericMaxDecimals: 2,
	    currencyPositivePattern: 'n $',
	    currencyNegativePattern: '-n $',
	    currencySymbol: 'Дин.',
	    currencyDecimalSeparator: ',',
	    currencyGroupSeparator: '.',
	    percentDecimalSeparator: ',',
	    percentGroupSeparator: '.'
    };
    if ($.ig.setRegionalDefault) {
	    $.ig.setRegionalDefault('sr');
    }
}));// REMOVE_FROM_COMBINED_FILES
