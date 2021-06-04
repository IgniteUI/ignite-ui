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
	$.ig.locale.ro = $.ig.locale.ro || {};

	$.ig.locale.ro.Editor = {
		spinUpperTitle: 'Creştere',
		spinLowerTitle: 'Descreștere',
		buttonTitle: 'Afișați lista',
		clearTitle: 'Ștergeți valoarea',
		ariaTextEditorFieldLabel: 'Editor de text',
		ariaNumericEditorFieldLabel: 'Editor numeric',
		ariaCurrencyEditorFieldLabel: 'Editor valutar',
		ariaPercentEditorFieldLabel: 'Procent Editor',
		ariaMaskEditorFieldLabel: 'Editor de măști',
		ariaDateEditorFieldLabel: 'Editor de date',
		ariaDatePickerFieldLabel: 'Data Picker',
		ariaTimePickerFieldLabel: "Selector de timp",
		ariaSpinUpButton: 'Mărire rotație',
		ariaSpinDownButton: 'Încetinire rotație',
		ariaDropDownButton: 'Scapă jos',
		ariaClearButton: 'Șterge',
		ariaCalendarButton: 'Calendar',
		datePickerButtonTitle: 'Afișați calendarul',
		updateModeUnsupportedValue: 'updateMode necesită o configurație diferită. Alegeți o valoare între "onChange" și "immediate".',
		updateModeNotSupported: 'Proprietatea updateMode acceptă doar modul "onchange" pentru extensiile igMaskEditor, igDateEditor și igDatePicker',
		renderErrMsg: "Un editor de bază nu poate fi instanțiat direct. Încercați cu un text, numeric, dată sau alt editor.",
		multilineErrMsg: 'textArea necesită o configurație diferită. TextMode ar trebui setat la "multiline".',
		targetNotSupported: "Acest element țintă nu este acceptat.",
		placeHolderNotSupported: "Atributul substituent nu este acceptat de browserul dvs.",
		allowedValuesMsg: "Alegeți o valoare din lista derulantă",
		maxLengthErrMsg: "Intrarea este prea lungă și a fost tăiată cu simboluri {0}",
		maxLengthWarningMsg: "Intrarea a atins lungimea maximă de {0} pentru acest câmp",
		minLengthErrMsg: "Trebuie introduse cel puțin {0} caractere",
		maxValErrMsg: "Intrarea a atins valoarea maximă de {0} pentru acest câmp",
		minValErrMsg: "Intrarea a atins valoarea minimă de {0} pentru acest câmp",
		maxValExceedRevertErrMsg: "Intrarea a depășit valoarea maximă de {0} și a fost revenită la cea anterioară",
		minValExceedRevertErrMsg: "Intrarea a fost mai mică decât valoarea minimă de {0} și a fost revenită la cea anterioară",
		maxValExceedSetErrMsg: "Intrarea a depășit valoarea maximă de {0} și a fost setată la valoarea maximă",
		minValExceedSetErrMsg: "Intrarea a fost mai mică decât valoarea minimă {0} și a fost setată la valoarea minimă",
		maxValExceededWrappedAroundErrMsg: "Intrarea a depășit valoarea maximă de {0} și a fost setată la valoarea minimă permisă",
		minValExceededWrappedAroundErrMsg: "Intrarea a fost mai mică decât valoarea minimă {0} și a fost setată la valoarea maximă permisă",
		btnValueNotSupported: 'Este necesară o altă valoare a butonului. Alegeți o valoare între "dropdown", "clear" și "spin".',
		scientificFormatErrMsg: 'Este necesar un alt format științific. Alegeți o valoare între "E", "e", "E+" și "e+".',
		spinDeltaIsOfTypeNumber: "Este necesar un alt tip de spinDelta. Trebuie introdus un număr pozitiv.",
		spinDeltaIsOfTypeNumberForPeriod: "Pentru {0} este necesar un alt tip de spinDelta. Ar trebui introdus un număr pozitiv între {1} și {2}.",
		spinDeltaIsOfTypeNumberOrObject: "Este necesar un alt tip de spinDelta. Ar trebui introdus un număr pozitiv sau un obiect, care definește diferite delte ale perioadei de timp.",
		spinDeltaShouldBeInRange: "Opțiunea spinDelta pentru {0} ar trebui să fie între {1} și {2}",
		spinDeltaCouldntBeNegative: "Opțiunea spinDelta nu poate fi negativă. Trebuie introdus un număr pozitiv.",
		spinDeltaContainsExceedsMaxDecimals: "Fracțiile maxime permise pentru spinDelta sunt setate la {0}. Fie modificați MaxDecimals, fie încercați să vă micșorați valoarea.",
		spinDeltaIncorrectFloatingPoint: 'Un spinDelta în virgulă mobilă necesită o configurație diferită. Setați dataMode a editorului la "dublu" sau "plutitor" sau setați spinDelta la întreg.',
		numericEditorNoSuchMethod: "Editorul numeric nu acceptă această metodă.",
		numericEditorNoSuchOption: "Editorul numeric nu acceptă această opțiune.",
		displayFactorIsOfTypeNumber: "displayFactor necesită o valoare diferită. Valoarea acestuia trebuie setată la 1 sau 100 ca număr.",
		displayFactorAllowedValue: "displayFactor necesită o valoare diferită. Valoarea acestuia trebuie setată la 1 sau 100 ca număr.",
		instantiateCheckBoxErrMsg: "igCheckboxEditor necesită un alt element. Utilizați elementele INPUT, SPAN sau DIV.",
		cannotParseNonBoolValue: "igCheckboxEditor necesită o valoare diferită. Ar trebui furnizată o valoare booleană.",
		cannotSetNonBoolValue: "igCheckboxEditor necesită o valoare diferită. Ar trebui furnizată o valoare booleană.",
		maskEditorNoSuchMethod: "Editorul de mască nu acceptă această metodă.",
		datePickerEditorNoSuchMethod: "Editorul de date nu acceptă această metodă.",
		datePickerNoSuchMethodDropDownContainer: "Editorul de date nu acceptă această metodă. Folosiți unul 'getCalendar'.",
		buttonTypeIsDropDownOnly: "Datepicker permite doar derularea și ștergerea valorilor pentru opțiunea buttonType.",
		dateEditorOffsetRange: "Opțiunea displayTimeOffset ar trebui să fie cuprinsă între -720 și 840, ceea ce reprezintă compensarea în minute, conform UTC, a tuturor fusurilor orare de la cel mai vestic (−12: 00) la cel mai estic (+14: 00).",
		setOptionError: 'Modificările în timpul rulării nu sunt permise pentru următoarea opțiune: ',
		invalidDate: "Data nevalidă",
		maskMessage: 'Toate posturile necesare ar trebui să fie ocupate',
		maskRevertMessage: 'Toate posturile necesare ar trebui să fie ocupate, de aceea valoarea a fost readusă la ultima validă.',
		dateMessage: 'Ar trebui introdusă o dată validă',
		centuryThresholdValidValues: "secolul Proprietatea prag trebuie să fie între 0 și 99.",
		noListItemsNoButton: "Nu este redat niciun buton rotativ sau drop-down, deoarece nu există elemente de listă.",
		decimalNumber: "Când dataMode este '{0}', opțiunea {1} poate accepta valori numerice între 0 și {2}.",
		decimalSeparatorErrorMsg: "Opțiunea decimalSeparator necesită o valoare diferită. Valoarea sa ar trebui să fie un singur caracter.",
		decimalSeparatorEqualsGroupSeparatorErrorMsg: "Opțiunile groupSeparator și decimalSeparator nu pot avea valori egale.",
		timePickerNoSuchMethod: "Selectorul de timp nu acceptă această metodă."
	};

	$.ig.Editor.locale = $.ig.Editor.locale || $.ig.locale.ro.Editor;
	return $.ig.locale.ro.Editor;
}));// REMOVE_FROM_COMBINED_FILES
