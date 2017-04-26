/* Latvia +*/

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
	    $.datepicker.regional['lv'] = {
			closeText: 'Aizvērt',
			prevText: 'Iepr.',
			nextText: 'Nāk.',
			currentText: 'Šodien',
			monthNames: ['Janvāris','Februāris','Marts','Aprīlis','Maijs','Jūnijs',
			'Jūlijs','Augusts','Septembris','Oktobris','Novembris','Decembris'],
			monthNamesShort: ['Jan','Feb','Mar','Apr','Mai','Jūn',
			'Jūl','Aug','Sep','Okt','Nov','Dec'],
			dayNames: ['svētdiena','pirmdiena','otrdiena','trešdiena','ceturtdiena','piektdiena','sestdiena'],
			dayNamesShort: ['svt','prm','otr','tre','ctr','pkt','sst'],
			dayNamesMin: ['Sv','Pr','Ot','Tr','Ct','Pk','Ss'],
			weekHeader: 'Ned.',
			dateFormat: 'dd.mm.yy',
			firstDay: 1,
			isRTL: false,
			showMonthAfterYear: false,
			yearSuffix: ''
		};
    }
    $.ig.regional.lv = {
	    monthNames: ['Janvāris', 'Februāris', 'Marts', 'Aprīlis', 'Maijs', 'Jūnijs', 'Jūlijs', 'Augusts', 'Septembris', 'Oktobris', 'Novembris', 'Decembris'],
	    monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jūn', 'Jūl', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
	    dayNames: ['svētdiena', 'pirmdiena', 'otrdiena', 'trešdiena', 'ceturtdiena', 'piektdiena', 'sestdiena'],
	    dayNamesShort: ['svt', 'prm', 'otr', 'tre', 'ctr', 'pkt', 'sst'],
	    datePattern: 'yyyy.MM.dd',
	    dateLongPattern: 'dddd, yyyy. g\\a\\d\\a d. MMMM',
	    dateTimePattern: 'yyyy.MM.dd HH:mm',
	    timePattern: 'HH:mm',
	    timeLongPattern: 'HH:mm:ss',
	    //
	    numericDecimalSeparator: ',',
	    numericGroupSeparator: ' ',
	    numericMaxDecimals: 2,
	    currencyPositivePattern: 'n $',
	    currencyNegativePattern: '-n $',
	    currencySymbol: 'Ls',
	    currencyDecimalSeparator: ',',
	    currencyGroupSeparator: ' ',
	    percentDecimalSeparator: ',',
	    percentGroupSeparator: ' '
    };
    if ($.ig.setRegionalDefault) {
	    $.ig.setRegionalDefault('lv');
    }
}));// REMOVE_FROM_COMBINED_FILES
