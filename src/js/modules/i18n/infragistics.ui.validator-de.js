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
		define( [
			"jquery"
		], factory );
	} else {
		factory(jQuery);
	}
}
(function ($) {
    $.ig = $.ig || {};

    if (!$.ig.Validator) {
	    $.ig.Validator = {
		    locale: {
			    defaultMessage: 'Bitte korrigieren Sie dieses Feld',
			    selectMessage: 'Bitte wählen Sie einen Wert aus',
			    rangeSelectMessage: 'Bitte wählen Sie nicht mehr als {0} und nicht weniger als {1} Elemente',
			    minSelectMessage: 'Bitte wählen Sie mindestens {0} Elemente',
			    maxSelectMessage: 'Bitte wählen Sie nicht mehr als {0} Elemente',
			    rangeLengthMessage: 'Bitte geben Sie einen Wert zwischen {0} und {1} Zeichen ein',
			    minLengthMessage: 'Bitte geben Sie mindestens {0} Zeichen ein',
			    maxLengthMessage: 'Bitte geben Sie nicht mehr als {0} Zeichen ein',
			    requiredMessage: 'Dieses Feld ist erforderlich',
			    patternMessage: 'Eintrag entspricht nicht dem erforderlichen Muster',
			    maskMessage: 'Bitte füllen Sie alle erforderlichen Positionen aus',
			    dateFieldsMessage: 'Bitte geben Sie Werte in Datumsfelder ein',
			    invalidDayMessage: 'Ungültiger Tag des Monats Bitte geben Sie einen korrekten Tag ein',
			    dateMessage: 'Bitte geben Sie ein gültiges Datum ein',
			    numberMessage: 'Bitte geben Sie eine gültige Nummer ein',
                rangeValueMessage: 'Bitte geben Sie einen Wert zwischen {0} und {1} ein',
		        minValueMessage: 'Bitte geben Sie einen Wert größer oder gleich {0} ein',
		        maxValueMessage: 'Bitte geben Sie einen Wert kleiner oder gleich {0} ein',
		        emailMessage: 'Eine gültige E-Mail-Adresse sollte eingegeben werden',
				creditCardMessage: 'Eine gültige Zahlungskartennummer sollte eingegeben werden',
		        equalToMessage: 'Die zwei Werte stimmen nicht überein',
		        optionalString: '(optional)'
		    }
	    };
    }
}));// REMOVE_FROM_COMBINED_FILES
