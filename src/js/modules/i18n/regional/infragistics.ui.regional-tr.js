/* Turkey +*/

/*global jQuery */
(function ($) {
    $.ig = $.ig || {};
    $.ig.regional = $.ig.regional || {};
	if ($.datepicker && $.datepicker.regional) {
	    $.datepicker.regional['tr'] = {
			closeText: 'kapat',
			prevText: '&#x3C;geri',
			nextText: 'ileri&#x3e',
			currentText: 'bugün',
			monthNames: ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran',
			'Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'],
			monthNamesShort: ['Oca','Şub','Mar','Nis','May','Haz',
			'Tem','Ağu','Eyl','Eki','Kas','Ara'],
			dayNames: ['Pazar','Pazartesi','Salı','Çarşamba','Perşembe','Cuma','Cumartesi'],
			dayNamesShort: ['Pz','Pt','Sa','Ça','Pe','Cu','Ct'],
			dayNamesMin: ['Pz','Pt','Sa','Ça','Pe','Cu','Ct'],
			weekHeader: 'Hf',
			dateFormat: 'dd.mm.yy',
			firstDay: 1,
			isRTL: false,
			showMonthAfterYear: false,
			yearSuffix: ''
		};
    }
    $.ig.regional.tr = {
	    monthNames: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
	    monthNamesShort: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
	    dayNames: ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'],
	    dayNamesShort: ['Pz', 'Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct'],
	    datePattern: 'dd.MM.yyyy',
	    dateLongPattern: 'dd MMMM yyyy dddd',
	    dateTimePattern: 'dd.MM.yyyy HH:mm',
	    timePattern: 'HH:mm',
	    timeLongPattern: 'HH:mm:ss',
	    //
	    numericNegativePattern: '-n$',
	    numericDecimalSeparator: ',',
	    numericGroupSeparator: '.',
	    numericMaxDecimals: 2,
	    currencyPositivePattern: 'n $',
	    currencyNegativePattern: '-n $',
	    currencySymbol: 'TL',
	    currencyDecimalSeparator: ',',
	    currencyGroupSeparator: '.',
	    percentPositivePattern: '$n',
	    percentNegativePattern: '-$n',
	    percentDecimalSeparator: ',',
	    percentGroupSeparator: '.'
    };
    if ($.ig.setRegionalDefault) {
	    $.ig.setRegionalDefault('tr');
    }
})(jQuery);