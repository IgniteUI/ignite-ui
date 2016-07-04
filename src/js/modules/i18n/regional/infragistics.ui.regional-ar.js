﻿/* Arabic Egypt +*/

/*global jQuery */
(function ($) {
$.ig = $.ig || {};
$.ig.regional = $.ig.regional || {};
$.ig.regional.ar = {
	monthNames: ['كانون الثاني', 'شباط', 'آذار', 'نيسان', 'آذار', 'حزيران', 'تموز', 'آب', 'أيلول',	'تشرين الأول', 'تشرين الثاني', 'كانون الأول'],
	monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
	dayNames: ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'],
	dayNamesShort: ['سبت', 'أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة'],
	am: 'ص',
	pm: 'م',
	datePattern: 'dd/MM/yyyy',
	dateLongPattern: 'dd yyyy ,MMMM',
	dateTimePattern: 'dd/MM/yyyy hh:mm tt',
	timePattern: 'hh:mm tt',
	timeLongPattern: 'hh:mm:ss tt',
	//
	numericNegativePattern: 'n$-',
	numericMaxDecimals: 2,
	currencyPositivePattern: 'n $',
	currencyNegativePattern: 'n$-',
	currencySymbol: 'ج.م.',
	currencyMaxDecimals: 3,
	currencyMinDecimals: 3,
	percentPositivePattern: 'n $',
	percentNegativePattern: '-n $'
};
if ($.ig.setRegionalDefault) {
	$.ig.setRegionalDefault('ar');
}
})(jQuery);