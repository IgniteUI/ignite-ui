﻿/* Japan +*/

/*global jQuery */
(function ($) {
$.ig = $.ig || {};
$.ig.regional = $.ig.regional || {};
if ($.datepicker && $.datepicker.regional) {
	$.datepicker.regional.ja = {
		closeText: '閉じる',
		prevText: '&#x3c;前',
		nextText: '次&#x3e;',
		currentText: '今日',
		monthNames: ['1月','2月','3月','4月','5月','6月',
		'7月','8月','9月','10月','11月','12月'],
		monthNamesShort: ['1月','2月','3月','4月','5月','6月',
		'7月','8月','9月','10月','11月','12月'],
		dayNames: ['日曜日','月曜日','火曜日','水曜日','木曜日','金曜日','土曜日'],
		dayNamesShort: ['日','月','火','水','木','金','土'],
		dayNamesMin: ['日','月','火','水','木','金','土'],
		weekHeader: '週',
		dateFormat: 'yy/mm/dd',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: true,
		yearSuffix: '年'
	};
}
$.ig.regional.ja = {
	monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
	monthNamesShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
	dayNames: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
	dayNamesShort: ['日', '月', '火', '水', '木', '金', '土'],
	am: '午前',
	pm: '午後',
	datePattern: 'yyyy/MM/dd',
	dateLongPattern: 'yyyy年M月d日',
	dateTimePattern: 'yyyy/MM/dd HH:mm',
	timePattern: 'HH:mm',
	timeLongPattern: 'HH:mm:ss',
	//
	numericMaxDecimals: 2,
	currencyNegativePattern: '-$n',
	currencySymbol: '¥',
	currencyMaxDecimals: 0,
	currencyMinDecimals: 0
};
if ($.ig.setRegionalDefault) {
	$.ig.setRegionalDefault('ja');
}
})(jQuery);