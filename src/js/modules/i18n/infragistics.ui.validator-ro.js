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
	$.ig.locale.ro = $.ig.locale.ro || {};

	$.ig.locale.ro.Validator = {
		        defaultMessage: 'Acest câmp are nevoie de atenție',
		        selectMessage: 'Ar trebui selectată o valoare',
		        rangeSelectMessage: 'Trebuie selectate cel puțin {0}, dar nu mai mult de {1} articole',
		        minSelectMessage: 'Trebuie selectate cel puțin {0} articole',
		        maxSelectMessage: 'Nu trebuie selectate mai mult de {0} articole',
		        rangeLengthMessage: 'Intrarea trebuie să aibă între {0} și {1} caractere',
		        minLengthMessage: 'Intrarea trebuie să aibă cel puțin {0} caractere',
		        maxLengthMessage: 'Intrarea nu trebuie să aibă mai mult de {0} caractere',
		        requiredMessage: 'Acest câmp este obligatoriu',
		        patternMessage: 'Intrarea nu se potrivește cu modelul cerut',
		        maskMessage: 'Toate posturile necesare ar trebui să fie ocupate',
		        dateFieldsMessage: 'Valorile câmpului de dată trebuie introduse',
		        invalidDayMessage: 'Trebuie introdusă o zi validă a lunii',
		        dateMessage: 'Ar trebui introdusă o dată validă',
		        numberMessage: 'Ar trebui introdus un număr valid',
		        rangeValueMessage: 'Ar trebui introdusă o valoare între {0} și {1}',
		        minValueMessage: 'Trebuie introdusă o valoare de cel puțin {0}',
		        maxValueMessage: 'Trebuie introdusă o valoare de maximum {0}',
		        emailMessage: 'Ar trebui introdusă o adresă de e-mail validă',
		        creditCardMessage: 'Trebuie introdus un număr de card de plată valid',
		        equalToMessage: 'Cele două valori nu se potrivesc',
		        optionalString: '(opțional)'
	}
		
	$.ig.Validator.locale = $.ig.Validator.locale || $.ig.locale.ro.Validator;
	return $.ig.locale.ro.Validator;
}));// REMOVE_FROM_COMBINED_FILES
