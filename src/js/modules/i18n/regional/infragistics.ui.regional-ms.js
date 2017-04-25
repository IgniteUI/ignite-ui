/* Malaysia +*/

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
	    $.datepicker.regional['ms'] = {
			closeText: 'Tutup',
			prevText: '&#x3C;Sebelum',
			nextText: 'Selepas&#x3E;',
			currentText: 'hari ini',
			monthNames: ['Januari','Februari','Mac','April','Mei','Jun',
			'Julai','Ogos','September','Oktober','November','Disember'],
			monthNamesShort: ['Jan','Feb','Mac','Apr','Mei','Jun',
			'Jul','Ogo','Sep','Okt','Nov','Dis'],
			dayNames: ['Ahad','Isnin','Selasa','Rabu','Khamis','Jumaat','Sabtu'],
			dayNamesShort: ['Aha','Isn','Sel','Rab','kha','Jum','Sab'],
			dayNamesMin: ['Ah','Is','Se','Ra','Kh','Ju','Sa'],
			weekHeader: 'Mg',
			dateFormat: 'dd/mm/yy',
			firstDay: 0,
			isRTL: false,
			showMonthAfterYear: false,
			yearSuffix: ''
		};
    }
    $.ig.regional.ms = {
	    monthNames: ['Januari', 'Februari', 'Mac', 'April', 'Mei', 'Jun', 'Julai', 'Ogos', 'September', 'Oktober', 'November', 'Disember'],
	    monthNamesShort: ['Jan', 'Feb', 'Mac', 'Apr', 'Mei', 'Jun', 'Jul', 'Ogo', 'Sep', 'Okt', 'Nov', 'Dis'],
	    dayNames: ['Ahad', 'Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat', 'Sabtu'],
	    dayNamesShort: ['Aha', 'Isn', 'Sel', 'Rab', 'kha', 'Jum', 'Sab'],
	    datePattern: 'dd/MM/yyyy',
	    dateLongPattern: 'dd MMMM yyyy',
	    dateTimePattern: 'dd/MM/yyyy HH:mm',
	    timePattern: 'HH:mm',
	    timeLongPattern: 'HH:mm:ss',
	    //
	    numericDecimalSeparator: ',',
	    numericGroupSeparator: '.',
	    numericMaxDecimals: 2,
	    currencySymbol: 'R',
	    currencyDecimalSeparator: ',',
	    currencyGroupSeparator: '.',
	    currencyMaxDecimals: 0,
	    currencyMinDecimals: 0,
	    percentPositivePattern: 'n $',
	    percentNegativePattern: '-n $',
	    percentDecimalSeparator: ',',
	    percentGroupSeparator: '.'
    };
    if ($.ig.setRegionalDefault) {
    	$.ig.setRegionalDefault('ms');
    }
}));// REMOVE_FROM_COMBINED_FILES
