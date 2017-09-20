/* Bulgaria +*/

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
	    $.datepicker.regional['bg'] = {
			closeText: 'затвори',
			prevText: '&#x3C;назад',
			nextText: 'напред&#x3E;',
			nextBigText: '&#x3E;&#x3E;',
			currentText: 'днес',
			monthNames: ['Януари','Февруари','Март','Април','Май','Юни',
			'Юли','Август','Септември','Октомври','Ноември','Декември'],
			monthNamesShort: ['Яну','Фев','Мар','Апр','Май','Юни',
			'Юли','Авг','Сеп','Окт','Нов','Дек'],
			dayNames: ['Неделя','Понеделник','Вторник','Сряда','Четвъртък','Петък','Събота'],
			dayNamesShort: ['Нед','Пон','Вто','Сря','Чет','Пет','Съб'],
			dayNamesMin: ['Не','По','Вт','Ср','Че','Пе','Съ'],
			weekHeader: 'Wk',
			dateFormat: 'dd.mm.yy',
			firstDay: 1,
			isRTL: false,
			showMonthAfterYear: false,
			yearSuffix: ''
	    };
    }
    $.ig.regional.bg = {
	    monthNames: ['Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни', 'Юли', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември'],
	    monthNamesShort: ['Яну', 'Фев', 'Мар', 'Апр', 'Май', 'Юни', 'Юли', 'Авг', 'Сеп', 'Окт', 'Нов', 'Дек'],
	    dayNames: ['Неделя', 'Понеделник', 'Вторник', 'Сряда', 'Четвъртък', 'Петък', 'Събота'],
	    dayNamesShort: ['Нед', 'Пон', 'Вто', 'Сря', 'Чет', 'Пет', 'Съб'],
	    dayNamesMin: ['Не', 'По', 'Вт', 'Ср', 'Че', 'Пе', 'Съ'],
	    datePattern: 'dd.MM.yyyy г.',
	    dateLongPattern: 'dd MMMM yyyy г.',
	    dateTimePattern: 'dd.MM.yyyy г. HH:mm',
	    timePattern: 'HH:mm',
	    timeLongPattern: 'HH:mm:ss',
	    //
	    numericNegativePattern: '-n$',
	    numericDecimalSeparator: ',',
	    numericGroupSeparator: ' ',
	    numericMaxDecimals: 2,
	    currencyPositivePattern: 'n $',
	    currencyNegativePattern: '-n $',
	    currencySymbol: 'лв',
	    currencyDecimalSeparator: ',',
	    currencyGroupSeparator: ' ',
	    percentPositivePattern: 'n $',
	    percentNegativePattern: '-n $',
	    percentDecimalSeparator: ',',
	    percentGroupSeparator: ' '
    };
    if ($.ig.setRegionalDefault) {
	    $.ig.setRegionalDefault('bg');
    }
}));// REMOVE_FROM_COMBINED_FILES
