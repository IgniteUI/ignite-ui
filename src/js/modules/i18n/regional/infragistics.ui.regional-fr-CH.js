﻿/* Switzerland, French +*/

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
	    $.datepicker.regional['fr-CH'] = {
			closeText: 'Fermer',
			prevText: '&#x3C;Préc',
			nextText: 'Suiv&#x3E;',
			currentText: 'Courant',
			monthNames: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin',
			'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
			monthNamesShort: ['janv.', 'févr.', 'mars', 'avril', 'mai', 'juin',
			'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'],
			dayNames: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
			dayNamesShort: ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'],
			dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
			weekHeader: 'Sm',
			dateFormat: 'dd.mm.yy',
			firstDay: 1,
			isRTL: false,
			showMonthAfterYear: false,
			yearSuffix: ''
		};
    }
    $.ig.regional['fr-CH'] = {
	    monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
	    monthNamesShort: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
	    dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
	    dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
	    datePattern: 'dd.MM.yyyy',
	    dateLongPattern: 'dddd, d. MMMM yyyy',
	    dateTimePattern: 'dd.MM.yyyy HH:mm',
	    timePattern: 'HH:mm',
	    timeLongPattern: 'HH:mm:ss',
	    //
	    numericDecimalSeparator: ',',
	    numericGroupSeparator: "'",
	    numericMaxDecimals: 2,
	    currencyPositivePattern: '$ n',
	    currencyNegativePattern: '$-n',
	    currencySymbol: 'SFr.',
	    currencyDecimalSeparator: ',',
	    currencyGroupSeparator: "'",
	    percentPositivePattern: 'n $',
	    percentNegativePattern: '-n $',
	    percentDecimalSeparator: ',',
	    percentGroupSeparator: "'"
    };
    if ($.ig.setRegionalDefault) {
	    $.ig.setRegionalDefault('fr-CH');
    }
}));// REMOVE_FROM_COMBINED_FILES
