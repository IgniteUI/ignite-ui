/* Israel (Hebrew) +*/

/*global jQuery */
(function ($) {
    $.ig = $.ig || {};
    $.ig.regional = $.ig.regional || {};
	if ($.datepicker && $.datepicker.regional) {
	    $.datepicker.regional['he'] = {
			closeText: 'סגור',
			prevText: '&#x3C;הקודם',
			nextText: 'הבא&#x3E;',
			currentText: 'היום',
			monthNames: ['ינואר','פברואר','מרץ','אפריל','מאי','יוני',
			'יולי','אוגוסט','ספטמבר','אוקטובר','נובמבר','דצמבר'],
			monthNamesShort: ['ינו','פבר','מרץ','אפר','מאי','יוני',
			'יולי','אוג','ספט','אוק','נוב','דצמ'],
			dayNames: ['ראשון','שני','שלישי','רביעי','חמישי','שישי','שבת'],
			dayNamesShort: ['א\'','ב\'','ג\'','ד\'','ה\'','ו\'','שבת'],
			dayNamesMin: ['א\'','ב\'','ג\'','ד\'','ה\'','ו\'','שבת'],
			weekHeader: 'Wk',
			dateFormat: 'dd/mm/yy',
			firstDay: 0,
			isRTL: true,
			showMonthAfterYear: false,
			yearSuffix: ''
		};
    }
    $.ig.regional.he = {
	    monthNames: ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'],
	    monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
	    dayNames: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'],
	    dayNamesShort: ['א\'', 'ב\'', 'ג\'', 'ד\'', 'ה\'', 'ו\'', 'שבת'],
	    datePattern: 'dd/MM/yyyy',
	    dateLongPattern: 'dd. MMMM yyyy dddd',
	    dateTimePattern: 'dd/MM/yyyy HH:mm',
	    timePattern: 'HH:mm',
	    timeLongPattern: 'HH:mm:ss',
	    //
	    numericMaxDecimals: 2,
	    currencyPositivePattern: '$ n',
	    currencyNegativePattern: '$-n',
	    currencySymbol: 'KM'
    };
    if ($.ig.setRegionalDefault) {
	    $.ig.setRegionalDefault('he');
    }
})(jQuery);