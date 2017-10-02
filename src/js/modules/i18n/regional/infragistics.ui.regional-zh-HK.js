﻿/* China (Hong Kong SAR, PRC) +*/

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
	    $.datepicker.regional['zh-HK'] = {
			closeText: '關閉',
			prevText: '&#x3C;上月',
			nextText: '下月&#x3E;',
			currentText: '今天',
			monthNames: ['一月','二月','三月','四月','五月','六月',
			'七月','八月','九月','十月','十一月','十二月'],
			monthNamesShort: ['一月','二月','三月','四月','五月','六月',
			'七月','八月','九月','十月','十一月','十二月'],
			dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
			dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],
			dayNamesMin: ['日','一','二','三','四','五','六'],
			weekHeader: '周',
			dateFormat: 'dd-mm-yy',
			firstDay: 0,
			isRTL: false,
			showMonthAfterYear: true,
			yearSuffix: '年'
		};
    }	
    $.ig.regional['zh-HK'] = {
	    datePattern: 'd/M/yyyy',
	    dateLongPattern: 'dddd, d MMMM, yyyy',
	    dateTimePattern: 'd/M/yyyy H:mm',
	    timePattern: 'H:mm',
	    timeLongPattern: 'H:mm:ss',
		dateTitleFullPattern: 'dd MM yy',
		dateTitleMonthPattern: 'MM yy',
	    //
	    numericMaxDecimals: 2,
	    currencySymbol: 'HK$'
    };
    if ($.ig.util && $.ig.util.changeGlobalRegional) {
	    $.ig.util.changeGlobalRegional('zh-HK');
    }
}));// REMOVE_FROM_COMBINED_FILES
