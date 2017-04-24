﻿/* Thailand +*/

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
	    $.datepicker.regional['th'] = {
			closeText: 'ปิด',
			prevText: '&#xAB;&#xA0;ย้อน',
			nextText: 'ถัดไป&#xA0;&#xBB;',
			currentText: 'วันนี้',
			monthNames: ['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน',
			'กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'],
			monthNamesShort: ['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.',
			'ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'],
			dayNames: ['อาทิตย์','จันทร์','อังคาร','พุธ','พฤหัสบดี','ศุกร์','เสาร์'],
			dayNamesShort: ['อา.','จ.','อ.','พ.','พฤ.','ศ.','ส.'],
			dayNamesMin: ['อา.','จ.','อ.','พ.','พฤ.','ศ.','ส.'],
			weekHeader: 'Wk',
			dateFormat: 'dd/mm/yy',
			firstDay: 0,
			isRTL: false,
			showMonthAfterYear: false,
			yearSuffix: ''
		};
    }
    $.ig.regional.th = {
	    monthNames: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฏาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'],
	    monthNamesShort: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'],
	    dayNames: ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'],
	    dayNamesShort: ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'],
	    datePattern: 'd/M/yyyy',
	    dateLongPattern: 'd MMMM yyyy',
	    dateTimePattern: 'd/M/yyyy H:mm',
	    timePattern: 'H:mm',
	    timeLongPattern: 'H:mm:ss',
	    //
	    numericMaxDecimals: 2,
	    currencyNegativePattern: '-$n',
	    currencySymbol: '฿',
	    percentPositivePattern: 'n $',
	    percentNegativePattern: '-n $'
    };
    if ($.ig.setRegionalDefault) {
	    $.ig.setRegionalDefault('th');
    }
}));// REMOVE_FROM_COMBINED_FILES
