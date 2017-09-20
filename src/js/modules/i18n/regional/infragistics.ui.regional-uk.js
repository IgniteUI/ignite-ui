/* Ukraine +*/

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
	    $.datepicker.regional['uk'] = {
			closeText: 'Закрити',
			prevText: '&#x3C;',
			nextText: '&#x3E;',
			currentText: 'Сьогодні',
			monthNames: ['Січень','Лютий','Березень','Квітень','Травень','Червень',
			'Липень','Серпень','Вересень','Жовтень','Листопад','Грудень'],
			monthNamesShort: ['Січ','Лют','Бер','Кві','Тра','Чер',
			'Лип','Сер','Вер','Жов','Лис','Гру'],
			dayNames: ['неділя','понеділок','вівторок','середа','четвер','п’ятниця','субота'],
			dayNamesShort: ['нед','пнд','вів','срд','чтв','птн','сбт'],
			dayNamesMin: ['Нд','Пн','Вт','Ср','Чт','Пт','Сб'],
			weekHeader: 'Тиж',
			dateFormat: 'dd/mm/yy',
			firstDay: 1,
			isRTL: false,
			showMonthAfterYear: false,
			yearSuffix: ''
		};
    }
    $.ig.regional.uk = {
	    monthNames: ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'],
	    monthNamesShort: ['Січ', 'Лют', 'Бер', 'Кві', 'Тра', 'Чер', 'Лип', 'Сер', 'Вер', 'Жов', 'Лис', 'Гру'],
	    dayNames: ['неділя', 'понеділок', 'вівторок', 'середа', 'четвер', 'п’ятниця', 'субота'],
	    dayNamesShort: ['нед', 'пнд', 'вів', 'срд', 'чтв', 'птн', 'сбт'],
	    datePattern: 'dd.MM.yyyy',
	    dateLongPattern: 'd MMMM yyyy р.',
	    dateTimePattern: 'dd.MM.yyyy H:mm',
	    timePattern: 'H:mm',
	    timeLongPattern: 'H:mm:ss',
	    //
	    numericNegativePattern: '-n$',
	    numericDecimalSeparator: ',',
	    numericGroupSeparator: ' ',
	    numericMaxDecimals: 2,
	    currencyPositivePattern: 'n $',
	    currencyNegativePattern: '-n $',
	    currencySymbol: 'грн.',
	    currencyDecimalSeparator: ',',
	    currencyGroupSeparator: ' ',
	    percentDecimalSeparator: ',',
	    percentGroupSeparator: ' '
    };
    if ($.ig.setRegionalDefault) {
	    $.ig.setRegionalDefault('uk');
    }
}));// REMOVE_FROM_COMBINED_FILES
