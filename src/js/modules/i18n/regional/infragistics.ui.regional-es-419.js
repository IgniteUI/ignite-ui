/* Latin America, Spain +*/

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
		$.datepicker.regional['es-419'] = {
			closeText: 'Cerrar',
			prevText: '&#x3C;Ant',
			nextText: 'Sig&#x3E;',
			currentText: 'Hoy',
			monthNames: ['enero','febrero','marzo','abril','mayo','junio', 'julio','agosto','septiembre','octubre','noviembre','diciembre'],
			monthNamesShort: ['ene','feb','mar','abr','may','jun', 'jul', 'ago','sep','oct','nov','dic'],
			dayNames: ['domingo','lunes','martes','miércoles','jueves','viernes','sábado'],
			dayNamesShort: ['dom','lun','mar','mié','jue','vie','sáb'],
			dayNamesMin: ['D','L','M','X','J','V','S'],
			weekHeader: 'Sm',
			dateFormat: 'dd/MM/yy',
			firstDay: 1,
			isRTL: false,
			showMonthAfterYear: false,
			yearSuffix: ''
		};
	}
	$.ig.regional['es-419'] = {
		monthNames: ['enero','febrero','marzo','abril','mayo','junio', 'julio','agosto','septiembre','octubre','noviembre','diciembre'],
		monthNamesShort: ['ene','feb','mar','abr','may','jun', 'jul', 'ago','sep','oct','nov','dic'],
		dayNames: ['domingo','lunes','martes','miércoles','jueves','viernes','sábado'],
		dayNamesShort: ['dom','lun','mar','mié','jue','vie','sáb'],
		datePattern: 'dd/MM/yy',
		dateLongPattern: 'dddd, d \\de MMMM \\de yyyy',
		dateTimePattern: 'dd/MM/yyyy HH:mm',
		timePattern: 'HH:mm',
		timeLongPattern: 'HH:mm:ss',
		am: 'a.m.',
		pm: 'p.m.',
		numericNegativePattern: '-n',
		numericDecimalSeparator: '.',
		numericGroupSeparator: ',',
		numericMaxDecimals: 2,
		currencyPositivePattern: '$n',
		currencyNegativePattern: '-$n',
		currencySymbol: 'US$',
		currencyDecimalSeparator: '.',
		currencyGroupSeparator: ',',
		percentPositivePattern: 'n %',
		percentNegativePattern: '-n %',
		percentDecimalSeparator: '.',
		percentGroupSeparator: ','
	};
	if ($.ig.setRegionalDefault) {
		$.ig.setRegionalDefault('es-419');
	}
}));// REMOVE_FROM_COMBINED_FILES
