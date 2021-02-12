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
	$.ig.locale.it = $.ig.locale.it || {};

	$.ig.locale.it.Validator = {
		        defaultMessage: 'Questo campo richiede attenzione',
		        selectMessage: 'È necessario selezionare un valore',
		        rangeSelectMessage: 'È necessario selezionare almeno {0} ma non più di {1} elementi',
		        minSelectMessage: 'È necessario selezionare almeno {0} elementi',
		        maxSelectMessage: 'Non selezionare più di {0} elementi',
		        rangeLengthMessage: 'La voce deve contenere da {0} a {1} caratteri',
		        minLengthMessage: 'La voce deve contenere almeno {0} caratteri',
		        maxLengthMessage: 'La voce non deve contenere più di {0} caratteri',
		        requiredMessage: 'Questo campo è obbligatorio',
		        patternMessage: 'La voce non corrisponde al modello richiesto',
		        maskMessage: 'Tutte le posizioni richieste devono essere riempite',
		        dateFieldsMessage: 'I valori del campo data devono essere immessi',
		        invalidDayMessage: 'È necessario immettere un giorno del mese valido',
		        dateMessage: 'È necessario immettere una data valida',
		        numberMessage: 'È necessario immettere un numero valido',
		        rangeValueMessage: 'È necessario immettere un valore compreso tra {0} e {1}',
		        minValueMessage: 'È necessario immettere un valore di almeno {0}',
		        maxValueMessage: 'È necessario immettere un valore non superiore a {0}',
		        emailMessage: 'È necessario inserire un indirizzo e-mail valido',
		        creditCardMessage: 'È necessario inserire un numero di carta di pagamento valido',
		        equalToMessage: 'I due valori non corrispondono',
		        optionalString: '(facoltativo)'
	}
		
	$.ig.Validator.locale = $.ig.Validator.locale || $.ig.locale.it.Validator;
	return $.ig.locale.it.Validator;
}));// REMOVE_FROM_COMBINED_FILES
