/*!@license
* Infragistics.Web.ClientUI Validator localization resources <build_number>
*
* Copyright (c) 2011-<year> Infragistics Inc.
*
* http://www.infragistics.com/
*
*/

(function (factory) {
	if (typeof define === "function" && define.amd) {
		define( ["jquery"], factory );
	} else {
		return factory(jQuery);
	}
}
(function ($) {
	$.ig = $.ig || {};
	$.ig.Validator = $.ig.Validator || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.hu = $.ig.locale.hu || {};

	$.ig.locale.hu.Validator = {
		        defaultMessage: 'Ez a mező figyelmet igényel',
		        selectMessage: 'Ki kell választani egy értéket',
		        rangeSelectMessage: 'Legalább {0}, de legfeljebb {1} elemet kell kiválasztani',
		        minSelectMessage: 'Legalább {0} elemet kell kiválasztani',
		        maxSelectMessage: 'Legfeljebb {0} elemet lehet kiválasztani',
		        rangeLengthMessage: 'A bejegyzés hossza {0} és {1} karakter között lehet',
		        minLengthMessage: 'A bejegyzésnek legalább {0} karakter hosszúságúnak kell lennie',
		        maxLengthMessage: 'A bejegyzés legfeljebb {0} karakter hosszúságú lehet',
		        requiredMessage: 'Ez a mező kötelező',
		        patternMessage: 'A bejegyzés nem felel meg a szükséges sémának',
		        maskMessage: 'Minden kötelező adatot meg kell adni',
		        dateFieldsMessage: 'A dátum mező értékeit meg kell adni',
		        invalidDayMessage: 'Érvényes napot kell megadni',
		        dateMessage: 'Érvényes dátumot kell megadni',
		        numberMessage: 'Érvényes számot kell megadni',
		        rangeValueMessage: '{0} és {1} közötti értéket kell megadni',
		        minValueMessage: 'A megadott érték legalább {0} kell, hogy legyen',
		        maxValueMessage: 'A megadott érték legfeljebb {0} lehet',
		        emailMessage: 'Érvényes e-mail címet kell megadni',
		        creditCardMessage: 'Érvényes bankkártyaszámot kell megadni',
		        equalToMessage: 'A két érték nem egyezik',
		        optionalString: '(opcionális)'
	}
		
	$.ig.Validator.locale = $.ig.Validator.locale || $.ig.locale.hu.Validator;
	return $.ig.locale.hu.Validator;
}));// REMOVE_FROM_COMBINED_FILES
