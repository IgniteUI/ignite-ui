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
	$.ig.locale.nl = $.ig.locale.nl || {};

	$.ig.locale.nl.Validator = {
		        defaultMessage: 'Dit veld moet worden bekeken',
		        selectMessage: 'Er moet een waarde worden geselecteerd',
		        rangeSelectMessage: 'Er moeten ten minste {0} maar niet meer dan {1} items worden geselecteerd',
		        minSelectMessage: 'Er moeten ten minste {0} item(s) worden geselecteerd',
		        maxSelectMessage: 'Er mogen niet meer dan {0} item(s) worden geselecteerd',
		        rangeLengthMessage: 'De invoer moet tussen {0} en {1} tekens lang zijn',
		        minLengthMessage: 'Invoer moet minimaal {0} teken(s) lang zijn',
		        maxLengthMessage: 'Invoer mag niet meer dan {0} teken(s) lang zijn',
		        requiredMessage: 'Dit veld is verplicht',
		        patternMessage: 'Invoer komt niet overeen met het vereiste patroon',
		        maskMessage: 'Alle vereiste posities moeten worden ingevuld',
		        dateFieldsMessage: 'Datumveldwaarden moeten worden ingevoerd',
		        invalidDayMessage: 'Er moet een geldige dag van de maand worden ingevoerd',
		        dateMessage: 'Er moet een geldige datum worden ingevoerd',
		        numberMessage: 'Er moet een geldig getal worden ingevoerd',
		        rangeValueMessage: 'Er moet een waarde tussen {0} en {1} worden ingevoerd',
		        minValueMessage: 'Er moet een waarde van minimaal {0} worden ingevoerd',
		        maxValueMessage: 'Er moet een waarde van niet meer dan {0} worden ingevoerd',
		        emailMessage: 'Er moet een geldig e-mailadres worden ingevoerd',
		        creditCardMessage: 'Er moet een geldig creditcardnummer worden ingevoerd',
		        equalToMessage: 'De twee waarden komen niet overeen',
		        optionalString: '(optioneel)'
	}
		
	$.ig.Validator.locale = $.ig.Validator.locale || $.ig.locale.nl.Validator;
	return $.ig.locale.nl.Validator;
}));// REMOVE_FROM_COMBINED_FILES
