/* Lithuania +*/

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
	    $.datepicker.regional['lt'] = {
			closeText: 'Uždaryti',
			prevText: '&#x3C;Atgal',
			nextText: 'Pirmyn&#x3E;',
			currentText: 'Šiandien',
			monthNames: ['Sausis','Vasaris','Kovas','Balandis','Gegužė','Birželis',
			'Liepa','Rugpjūtis','Rugsėjis','Spalis','Lapkritis','Gruodis'],
			monthNamesShort: ['Sau','Vas','Kov','Bal','Geg','Bir',
			'Lie','Rugp','Rugs','Spa','Lap','Gru'],
			dayNames: ['sekmadienis','pirmadienis','antradienis','trečiadienis','ketvirtadienis','penktadienis','šeštadienis'],
			dayNamesShort: ['sek','pir','ant','tre','ket','pen','šeš'],
			dayNamesMin: ['Se','Pr','An','Tr','Ke','Pe','Še'],
			weekHeader: 'SAV',
			dateFormat: 'yy-mm-dd',
			firstDay: 1,
			isRTL: false,
			showMonthAfterYear: true,
			yearSuffix: ''
		};
    }
    $.ig.regional.lt = {
	    monthNames: ['Sausis', 'Vasaris', 'Kovas', 'Balandis', 'Gegužė', 'Birželis', 'Liepa', 'Rugpjūtis', 'Rugsėjis', 'Spalis', 'Lapkritis', 'Gruodis'],
	    monthNamesShort: ['Sau', 'Vas', 'Kov', 'Bal', 'Geg', 'Bir', 'Lie', 'Rugp', 'Rugs', 'Spa', 'Lap', 'Gru'],
	    dayNames: ['sekmadienis', 'pirmadienis', 'antradienis', 'trečiadienis', 'ketvirtadienis', 'penktadienis', 'šeštadienis'],
	    dayNamesShort: ['sek', 'pir', 'ant', 'tre', 'ket', 'pen', 'šeš'],
	    datePattern: 'yyyy.MM.dd',
	    dateLongPattern: 'yyyy \\m. MMMM d \\d.',
	    dateTimePattern: 'yyyy.MM.dd HH:mm',
	    timePattern: 'HH:mm',
	    timeLongPattern: 'HH:mm:ss',
	    //
	    numericNegativePattern: '-n$',
	    numericDecimalSeparator: ',',
	    numericGroupSeparator: '.',
	    numericMaxDecimals: 2,
	    currencyPositivePattern: 'n $',
	    currencyNegativePattern: '-n $',
	    currencySymbol: 'Lt',
	    currencyDecimalSeparator: ',',
	    currencyGroupSeparator: '.',
	    percentDecimalSeparator: ',',
	    percentGroupSeparator: '.'
    };
    if ($.ig.setRegionalDefault) {
	    $.ig.setRegionalDefault('lt');
    }
}));// REMOVE_FROM_COMBINED_FILES
