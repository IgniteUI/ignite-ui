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
	$.ig.locale.nb = $.ig.locale.nb || {};

	$.ig.locale.nb.Validator = {
		        defaultMessage: 'Dette feltet trenger oppmerksomhet',
		        selectMessage: 'En verdi bør velges',
		        rangeSelectMessage: 'Du må velge minst {0} men ikke mer enn {1} elementer',
		        minSelectMessage: 'Minst {0} element(er) bør velges',
		        maxSelectMessage: 'Du må ikke velge mer enn {0} element(er)',
		        rangeLengthMessage: 'Oppføringen skal være mellom {0} og {1} tegn lang',
		        minLengthMessage: 'Oppføringen skal være minst {0} tegn(er) lang',
		        maxLengthMessage: 'Oppføringen må ikke være mer enn {0} tegn(er) lang',
		        requiredMessage: 'Dette feltet er obligatorisk',
		        patternMessage: 'Oppføringen samsvarer ikke med det nødvendige mønsteret',
		        maskMessage: 'Alle nødvendige stillinger bør fylles ut',
		        dateFieldsMessage: 'Datofeltverdier bør angis',
		        invalidDayMessage: 'Du må angi en gyldig dag i måneden',
		        dateMessage: 'En gyldig dato bør angis',
		        numberMessage: 'Du må angi et gyldig nummer',
		        rangeValueMessage: 'En verdi mellom {0} og {1} bør angis',
		        minValueMessage: 'Du må angi en verdi på minst {0}',
		        maxValueMessage: 'Du må angi en verdi som ikke er mer enn {0}',
		        emailMessage: 'Du må angi en gyldig e-postadresse',
		        creditCardMessage: 'Du må angi et gyldig betalingskortnummer',
		        equalToMessage: 'De to verdiene stemmer ikke overens',
		        optionalString: '(valgfri)'
	}
		
	$.ig.Validator.locale = $.ig.Validator.locale || $.ig.locale.nb.Validator;
	return $.ig.locale.nb.Validator;
}));// REMOVE_FROM_COMBINED_FILES
