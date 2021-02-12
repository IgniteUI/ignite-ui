/*!@license
* Infragistics.Web.ClientUI Editors localization resources <build_number>
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
	$.ig.Editor = $.ig.Editor || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.it = $.ig.locale.it || {};

	$.ig.locale.it.Editor = {
		spinUpperTitle: 'Incremento',
		spinLowerTitle: 'Decremento',
		buttonTitle: 'Mostra elenco',
		clearTitle: 'Cancella valore',
		ariaTextEditorFieldLabel: 'Editor di testo',
		ariaNumericEditorFieldLabel: 'Editor numerico',
		ariaCurrencyEditorFieldLabel: 'Editor valuta',
		ariaPercentEditorFieldLabel: 'Editor delle percentuali',
		ariaMaskEditorFieldLabel: 'Editor maschera',
		ariaDateEditorFieldLabel: 'Editor data',
		ariaDatePickerFieldLabel: 'Selezione data',
		ariaTimePickerFieldLabel: "Selettore orario",
		ariaSpinUpButton: 'Ruota verso l\'alto',
		ariaSpinDownButton: 'Ruota verso il basso',
		ariaDropDownButton: 'A discesa',
		ariaClearButton: 'Cancella',
		ariaCalendarButton: 'Calendario',
		datePickerButtonTitle: 'Mostra calendario',
		updateModeUnsupportedValue: 'updateMode richiede una configurazione diversa. Scegliere un valore tra "onChange" e "immediate".',
		updateModeNotSupported: 'La proprietà updateMode supporta solo la modalità "onchange" per le estensioni igMaskEditor, igDateEditor e igDatePicker',
		renderErrMsg: "Un editor di base non può essere istanziato direttamente. Prova con un editor di testo, numerico, di data o di altro tipo.",
		multilineErrMsg: 'textArea richiede una configurazione diversa. textMode deve essere impostato su "multiline".',
		targetNotSupported: "Questo elemento target non è supportato.",
		placeHolderNotSupported: "L'attributo segnaposto non è supportato dal browser.",
		allowedValuesMsg: "Seleziona un valore dall'elenco a discesa",
		maxLengthErrMsg: "La voce è troppo lunga ed è stata ritagliata con i simboli {0}",
		maxLengthWarningMsg: "La voce ha raggiunto la lunghezza massima di {0} per questo campo",
		minLengthErrMsg: "È necessario immettere almeno {0} caratteri",
		maxValErrMsg: "La voce ha raggiunto il valore massimo di {0} per questo campo",
		minValErrMsg: "La voce ha raggiunto il valore minimo di {0} per questo campo",
		maxValExceedRevertErrMsg: "La voce ha superato il valore massimo di {0} ed è stata ripristinata a quella precedente",
		minValExceedRevertErrMsg: "La voce era inferiore al valore minimo di {0} ed è stata ripristinata a quella precedente",
		maxValExceedSetErrMsg: "La voce ha superato il valore massimo di {0} ed è stata impostata sul valore massimo",
		minValExceedSetErrMsg: "La voce era inferiore al valore minimo di {0} ed era impostata sul valore minimo",
		maxValExceededWrappedAroundErrMsg: "La voce ha superato il valore massimo di {0} ed è stata impostata sul valore minimo consentito",
		minValExceededWrappedAroundErrMsg: "La voce era inferiore al valore minimo di {0} ed era impostata sul valore massimo consentito",
		btnValueNotSupported: 'È richiesto un valore pulsante diverso. Scegliere un valore tra "dropdown", "clear" e "spin".',
		scientificFormatErrMsg: 'È necessario un formato scientifico diverso. Scegliere un valore tra "E", "e", "E+" e "e+".',
		spinDeltaIsOfTypeNumber: "È richiesto un diverso tipo di spinDelta. È necessario immettere un numero positivo.",
		spinDeltaIsOfTypeNumberForPeriod: "Per {0} è necessario un diverso tipo di spinDelta. È necessario immettere un numero positivo compreso tra {1} e {2}.",
		spinDeltaIsOfTypeNumberOrObject: "È richiesto un diverso tipo di spinDelta. È necessario immettere un numero positivo o un oggetto che definisce delta di periodi di tempo diversi.",
		spinDeltaShouldBeInRange: "L'opzione spinDelta per {0} deve essere compresa tra {1} e {2}",
		spinDeltaCouldntBeNegative: "L'opzione spinDelta non può essere negativa. È necessario immettere un numero positivo.",
		spinDeltaContainsExceedsMaxDecimals: "Le frazioni massime consentite per spinDelta sono impostate su {0}. Modificare MaxDecimals o provare a ridurre il valore.",
		spinDeltaIncorrectFloatingPoint: 'Una spinDelta in virgola mobile richiede una configurazione diversa. Imposta dataMode dell\'editor su "double" o "float" o imposta spinDelta su intero.',
		numericEditorNoSuchMethod: "L'editor numerico non supporta questo metodo.",
		numericEditorNoSuchOption: "L'editor numerico non supporta questa opzione.",
		displayFactorIsOfTypeNumber: "displayFactor richiede un valore diverso. Il valore deve essere impostato su 1 o 100 come numero.",
		displayFactorAllowedValue: "displayFactor richiede un valore diverso. Il valore deve essere impostato su 1 o 100 come numero.",
		instantiateCheckBoxErrMsg: "igCheckboxEditor richiede un elemento diverso. Utilizzare l'elemento INPUT, SPAN o DIV.",
		cannotParseNonBoolValue: "igCheckboxEditor richiede un valore diverso. È necessario fornire un valore booleano.",
		cannotSetNonBoolValue: "igCheckboxEditor richiede un valore diverso. È necessario fornire un valore booleano.",
		maskEditorNoSuchMethod: "L'editor di maschere non supporta questo metodo.",
		datePickerEditorNoSuchMethod: "L'editor della data non supporta questo metodo.",
		datePickerNoSuchMethodDropDownContainer: "L'editor della data non supporta questo metodo. Utilizzare invece 'getCalendar'.",
		buttonTypeIsDropDownOnly: "Datepicker consente solo il menu a discesa e cancella i valori per l'opzione buttonType.",
		dateEditorOffsetRange: "L'opzione displayTimeOffset deve essere compresa tra -720 e 840, che rappresenta l'offset in minuti, in base all'ora UTC, di tutti i fusi orari dal più occidentale (−12:00) al più orientale (+14:00).",
		setOptionError: 'Le modifiche di runtime non sono consentite per la seguente opzione: ',
		invalidDate: "Data non valida",
		maskMessage: 'Tutte le posizioni richieste devono essere riempite',
		maskRevertMessage: 'Tutte le posizioni richieste devono essere riempite, ecco perché il valore è stato ripristinato all\'ultima valida.',
		dateMessage: 'È necessario immettere una data valida',
		centuryThresholdValidValues: "La proprietà centuryThreshold deve essere compresa tra 0 e 99.",
		noListItemsNoButton: "Non si visualizza nessun rendering per nessun pulsante di rotazione o a discesa in quanto non sono presenti voci di elenco.",
		decimalNumber: "Quando dataMode è '{0}', l'opzione {1} può accettare valori numerici compresi tra 0 e {2}.",
		decimalSeparatorErrorMsg: "L'opzione decimalSeparator richiede un valore diverso. Il valore deve essere un singolo carattere.",
		decimalSeparatorEqualsGroupSeparatorErrorMsg: "Le opzioni groupSeparator e decimalSeparator non possono avere valori uguali.",
		timePickerNoSuchMethod: "Il selettore del tempo non supporta questo metodo. "
	};

	$.ig.Editor.locale = $.ig.Editor.locale || $.ig.locale.it.Editor;
	return $.ig.locale.it.Editor;
}));// REMOVE_FROM_COMBINED_FILES
