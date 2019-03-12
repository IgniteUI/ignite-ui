﻿/*!@license
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
	$.ig.locale.de = $.ig.locale.de || {};

	$.ig.locale.de.Editor = {
		spinUpperTitle: 'Erhöhen',
		spinLowerTitle: 'Verringern',
		buttonTitle: 'Liste anzeigen',
		clearTitle: 'Wert löschen',
		ariaTextEditorFieldLabel: 'Text-Editor',
		ariaNumericEditorFieldLabel: 'Zahlen-Editor',
		ariaCurrencyEditorFieldLabel: 'Währungseditor',
		ariaPercentEditorFieldLabel: 'Prozent-Editor',
		ariaMaskEditorFieldLabel: 'Masken-Editor',
		ariaDateEditorFieldLabel: 'Daten-Editor',
		ariaDatePickerFieldLabel: 'Datumsauswahl',
		ariaTimePickerFieldLabel: 'Zeitauswahl',
		ariaSpinUpButton: 'Nach oben drehen',
		ariaSpinDownButton: 'Nach unten drehen',
		ariaDropDownButton: 'Aufklappen',
		ariaClearButton: 'Löschen',
		ariaCalendarButton: 'Kalender',
		datePickerButtonTitle: 'Kalender anzeigen',
		updateModeUnsupportedValue: 'Die Option updateMode unterstützt zwei mögliche Werte - "onChange" und "immediate"',
		updateModeNotSupported: 'updateMode-Eigenschaft unterstützt ausschließlich „onchange“-Modus für igMaskEditor-, igDateEditor- und igDatePicker-Erweiterungen',
		renderErrMsg: "Ein Basiseditor kann nicht direkt instantiiert werden. Mit einem Text-, Nummern-, Daten- oder anderen Editor versuchen.",
		multilineErrMsg: 'textArea erfordert eine andere Konfiguration. Der textMode sollte auf "multiline" eingestellt sein.',
		targetNotSupported: "Dieses Zielelement wird nicht unterstützt.",
		placeHolderNotSupported: "Das Platzhalterattribut wird von Ihrem Browser nicht unterstützt.",
		allowedValuesMsg: "Einen Wert von der Drop-Down-Liste wählen",
		maxLengthErrMsg: "Eintrag ist zu lang und wurde auf {0} Symbole reduziert",
		maxLengthWarningMsg: "Eintrag hat die maximal zulässige Zeichenlänge von {0} für dieses Feld erreicht",
		minLengthErrMsg: "Mindestens {0} Zeichen sollten eingegeben werden",
		maxValErrMsg: "Eintrag hat den maximalen Wert von {0} für dieses Feld erreicht",
		minValErrMsg: "Eintrag hat den minimalen Wert von {0} für dieses Feld erreicht",
		maxValExceedRevertErrMsg: "Eintrag hat den maximalen Wert von {0} überstiegen und wurde auf den vorherigen zurückgestellt",
		minValExceedRevertErrMsg: "Eintrag lag unter dem Mindestwert von {0} und wurde auf den vorherigen zurückgesetzt",
		maxValExceedSetErrMsg: "Eintrag hat den maximalen Wert von {0} überstiegen und wurde auf den maximalen Wert eingestellt",
		minValExceedSetErrMsg: "Eintrag lag unter dem Mindestwert von {0} überstiegen und wurde auf den minimalen Wert eingestellt",
		maxValExceededWrappedAroundErrMsg: "Eintrag hat den maximalen Wert von {0} überstiegen und wurde auf den minimal erlaubten eingestellt",
		minValExceededWrappedAroundErrMsg: "Eintrag lag unter dem Mindestwert von {0} und wurde auf den maximal zulässigen eingestellt",
		btnValueNotSupported: 'Ein anderer Schaltflächenwert ist erforderlich. Wert zwischen "dropdown", "clear" und "spin" wählen.',
		scientificFormatErrMsg: 'Ein anderes scientificFormat ist erforderlich. Wert zwischen "E", "e", "E+" und "e+" wählen.',
		spinDeltaIsOfTypeNumber: "Ein anderer Typ von spinDelta ist erforderlich. Eine positive Zahl sollte eingegeben werden.",
		spinDeltaIsOfTypeNumberForPeriod: "Ein anderer Typ von spinDelta ist für {0} erforderlich. Eine positive Zahl zwischen {1} und {2} sollte eingegeben werden.",
		spinDeltaIsOfTypeNumberOrObject: "Ein anderer Typ von spinDelta ist erforderlich. Eine positive Zahl oder ein Objekt, das verschiedene Zeitzonen-Deltas definiert, sollte festgelegt werden.",
		spinDeltaShouldBeInRange: "Die spinDelta-Option für {0} sollte zwischen {1} und {2} liegen",
		spinDeltaCouldntBeNegative: "Die spinDelta-Option kann nicht negativ sein. Eine positive Zahl sollte eingegeben werden.",
		spinDeltaContainsExceedsMaxDecimals: "Maximal erlaubte Bruchzahlen für spinDelta sind auf {0} festgelegt. Entweder MaxDecimals ändern oder versuchen, Ihren Wert zu verringern.",
		spinDeltaIncorrectFloatingPoint: 'Ein Gleitkomma-spinDelta erfordert eine andere Konfiguration. Stellen Sie den dataMode des Editors entweder auf „double“ oder „float“ oder stellen Sie spinDelta auf eine ganze Zahl.',
		notEditableOptionByInit: "Diese Option kann nach der Initialisierung nicht bearbeitet werden. Ihr Wert sollte während der Initialisierung festgelegt werden.",
		numericEditorNoSuchMethod: "Der Zahleneditor unterstützt diese Methode nicht.",
		numericEditorNoSuchOption: "Der Zahlen-Editor unterstützt diese Option nicht.",
		displayFactorIsOfTypeNumber: "displayFactor erfordert einen anderen Wert. Sein Wert sollte auf 1 oder 100 als Zahl festgelegt werden.",
		displayFactorAllowedValue: "displayFactor erfordert einen anderen Wert. Sein Wert sollte auf 1 oder 100 als Zahl festgelegt werden.",
		instantiateCheckBoxErrMsg: "igCheckboxEditor erfordert ein anderes Element. INPUT, SPAN oder DIV-Element benutzen.",
		cannotParseNonBoolValue: "igCheckboxEditor erfordert einen anderen Wert. Ein boolescher Wert sollte zur Verfügung stehen.",
		cannotSetNonBoolValue: "igCheckboxEditor erfordert einen anderen Wert. Ein boolescher Wert sollte zur Verfügung stehen.",
		maskEditorNoSuchMethod: "Der Masken-Editor unterstützt diese Methode nicht.",
		datePickerEditorNoSuchMethod: "Der Daten-Editor unterstützt diese Methode nicht.",
		datePickerNoSuchMethodDropDownContainer: "Der Daten-Editor unterstützt diese Methode nicht. Verwenden Sie stattdessen „getCalendar“.",
		buttonTypeIsDropDownOnly: "Der Datepicker erlaubt nur Dropdown und Wert löschen für die buttonType-Option.",
		dateEditorOffsetRange: "Die Option displayTimeOffset sollte zwischen -720 und 840 liegen, wodurch das Offset in Minuten angegeben wird. Es entspricht der UTC-Zeit aller Zeitzonen von Westen (-12:00) bis Osten (+14:00).",
		cannotSetRuntime: "Diese Option kann nicht zur Laufzeit festgelegt werden",
		invalidDate: "Ungültiges Datum",
		maskMessage: 'Alle erforderlichen Positionen sollten ausgefüllt werden',
		maskRevertMessage: 'Alle erforderlichen Positionen sollten ausgefüllt werden, weshalb der Wert auf den letzten gültigen zurückgestellt wurde.',
		dateMessage: 'Ein gültiges Datum sollte eingegeben werden',
		centuryThresholdValidValues: "centuryThreshold-Eigenschaft muss zwischen 0 und 99 liegen.",
		noListItemsNoButton: "Es wird keine Spin- oder Dropdown-Schaltfläche gerendert, da keine Listenelemente vorliegen.",
		decimalNumber: "Wenn der dataMode auf '{0}' eingestellt ist, kann die Option {1} Zahlenwerte zwischen 0 und {2} akzeptieren.",
		decimalSeparatorErrorMsg: "Die Option decimalSeparator erfordert einen anderen Wert. Der Wert sollte einstellig sein.",
		decimalSeparatorEqualsGroupSeparatorErrorMsg: "Die Optionen groupSeparator und decimalSeparator können nicht denselben Wert haben.",
		timePickerNoSuchMethod: "Die Zeitauswahl unterstützt diese Methode nicht."
	};

	$.ig.Editor.locale = $.ig.Editor.locale || $.ig.locale.de.Editor;
	return $.ig.locale.de.Editor;
}));// REMOVE_FROM_COMBINED_FILES
