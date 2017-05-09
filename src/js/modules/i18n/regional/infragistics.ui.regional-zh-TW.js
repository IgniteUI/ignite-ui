﻿﻿/* China (Taiwan) */

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
	    $.datepicker.regional['zh-TW'] = {
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
			dateFormat: 'yy/mm/dd',
			firstDay: 1,
			isRTL: false,
			showMonthAfterYear: true,
			yearSuffix: '年'
		};
    }	
    $.ig.regional['zh-TW'] = {
	    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
	    monthNamesShort: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
	    dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
	    dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
	    am: '上午',
	    pm: '下午',
	    datePattern: 'yyyy/M/d',
	    dateLongPattern: 'yyyy年M月d日',
	    dateTimePattern: 'yyyy/M/d tt hh:mm',
	    timePattern: 'tt hh:mm',
	    timeLongPattern: 'tt hh:mm:ss',
		dateTitleFullPattern: 'yy MM dd',
		dateTitleMonthPattern: 'yy MM',
	    //
	    numericMaxDecimals: 2,
	    currencyNegativePattern: '-$n',
	    currencySymbol: 'NT$'
    };
    if ($.ig.setRegionalDefault) {
	    $.ig.setRegionalDefault('zh-TW');
    }
}));// REMOVE_FROM_COMBINED_FILES
