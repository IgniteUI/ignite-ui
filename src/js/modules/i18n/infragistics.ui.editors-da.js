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
	$.ig.locale.da = $.ig.locale.da || {};

	$.ig.locale.da.Editor = {
		spinUpperTitle: 'Forøgelse',
		spinLowerTitle: 'Formindskelse',
		buttonTitle: 'Vis liste',
		clearTitle: 'Ryd værdi',
		ariaTextEditorFieldLabel: 'Teksteditor',
		ariaNumericEditorFieldLabel: 'Numerisk editor',
		ariaCurrencyEditorFieldLabel: 'Valuta Editor',
		ariaPercentEditorFieldLabel: 'Procent Editor',
		ariaMaskEditorFieldLabel: 'Maskeditor',
		ariaDateEditorFieldLabel: 'Dato Editor',
		ariaDatePickerFieldLabel: 'Datovælger',
		ariaTimePickerFieldLabel: "Tidsvælger",
		ariaSpinUpButton: 'Spin op',
		ariaSpinDownButton: 'Spin ned',
		ariaDropDownButton: 'Drop ned',
		ariaClearButton: 'Ryd',
		ariaCalendarButton: 'Kalender',
		datePickerButtonTitle: 'Vis kalender',
		updateModeUnsupportedValue: 'updateMode kræver en anden konfiguration. Vælg en værdi mellem "onChange" og "immediate".',
		updateModeNotSupported: 'updateMode egenskab understøtter kun "onchange" -tilstand for igMaskEditor, igDateEditor og igDatePicker-udvidelser',
		renderErrMsg: "En basiseditor kan ikke instantieres direkte. Prøv med en tekst, en numerisk, en dato eller en anden editor.",
		multilineErrMsg: 'textArea kræver en anden konfiguration. TextMode skal indstilles til "multiline".',
		targetNotSupported: "Dette målelement understøttes ikke.",
		placeHolderNotSupported: "Variabel-egenskaben understøttes ikke af browseren.",
		allowedValuesMsg: "Vælg en værdi fra rullelisten",
		maxLengthErrMsg: "Indtastningen er for lang og blev trimmet til {0} symboler",
		maxLengthWarningMsg: "Indtastning nåede den maksimale længde på {0} for dette felt",
		minLengthErrMsg: "Mindst {0} tegn skal indtastes",
		maxValErrMsg: "Indtastning nåede den maksimale værdi på {0} for dette felt",
		minValErrMsg: "Indtastning nåede minimumsværdien på {0} for dette felt",
		maxValExceedRevertErrMsg: "Indtastningen overskred den maksimale værdi på {0} og blev tilbageført til den forrige",
		minValExceedRevertErrMsg: "Indtastningen var mindre end minimumsværdien på {0} og blev tilbageført til den forrige",
		maxValExceedSetErrMsg: "Indtastningen overskred den maksimale værdi på {0} og blev indstillet til den maksimale værdi",
		minValExceedSetErrMsg: "Indtastning var mindre end minimumsværdien på {0} og blev indstillet til minimumsværdien",
		maxValExceededWrappedAroundErrMsg: "Indtastningen overskred den maksimale værdi på {0} og blev indstillet til den mindst tilladte værdi",
		minValExceededWrappedAroundErrMsg: "Indtastningen var mindre end minimumsværdien på {0} og blev indstillet til den maksimalt tilladte værdi",
		btnValueNotSupported: 'En anden tastværdi er påkrævet. Vælg en værdi mellem "dropdown", "clear" og "spin".',
		scientificFormatErrMsg: 'Et andet scientificFormat er påkrævet. Vælg en værdi mellem "E", "e", "E+" og "e+".',
		spinDeltaIsOfTypeNumber: "En anden type spinDelta er påkrævet. Der skal indtastes et positivt tal.",
		spinDeltaIsOfTypeNumberForPeriod: "En anden type spinDelta er påkrævet for {0}. Der skal indtastes et positivt tal mellem {1} og {2}",
		spinDeltaIsOfTypeNumberOrObject: "En anden type spinDelta er påkrævet. Der skal indtastes et positivt tal eller et objekt, der angiver forskellige tidsintervaller.",
		spinDeltaShouldBeInRange: "SpinDelta-indstillingen for {0} skal være mellem {1} og {2}",
		spinDeltaCouldntBeNegative: "SpinDelta-indstillingen kan ikke være negativ. Der skal indtastes et positivt tal.",
		spinDeltaContainsExceedsMaxDecimals: "Maksimalt antal tilladte brøker for spinDelta er indstillet til {0}. Du kan enten ændre MaxDecimals eller prøve at formindske din værdi.",
		spinDeltaIncorrectFloatingPoint: 'Et floating point spinDelta kræver en anden konfiguration.Indstil editorens datamodus til enten "double" eller "float", eller indstil spinDelta til heltal.',
		numericEditorNoSuchMethod: "Den numeriske editor understøtter ikke denne metode.",
		numericEditorNoSuchOption: "Den numeriske editor understøtter ikke denne indstilling.",
		displayFactorIsOfTypeNumber: "displayFactor kræver en anden værdi. Dens værdi skal indstilles til 1 eller 100 som et tal.",
		displayFactorAllowedValue: "displayFactor kræver en anden værdi. Dens værdi skal indstilles til 1 eller 100 som et tal.",
		instantiateCheckBoxErrMsg: "igCheckboxEditor kræver et andet element. Brug elementet INPUT, SPAN eller DIV.",
		cannotParseNonBoolValue: "igCheckboxEditor kræver en anden værdi. Der skal angives en boolsk værdi.",
		cannotSetNonBoolValue: "igCheckboxEditor kræver en anden værdi. Der skal angives en boolsk værdi.",
		maskEditorNoSuchMethod: "Maskeeditoren understøtter ikke denne metode.",
		datePickerEditorNoSuchMethod: "Dato-editoren understøtter ikke denne metode.",
		datePickerNoSuchMethodDropDownContainer: "Dato-editoren understøtter ikke denne metode. Brug 'getCalendar' i stedet.",
		buttonTypeIsDropDownOnly: "Datovælger tillader kun dropdown og ryd værdier for buttonType-indstillingen.",
		dateEditorOffsetRange: "DisplayTimeOffset-indstillingen skal være mellem -720 og 840, hvilket repræsenterer forskydningen i minutter ifølge UTC af alle tidszoner fra den vestligste (−12:00) til den østligste (+14:00).",
		setOptionError: 'Kørselsændringer er ikke tilladt for følgende indstilling: ',
		invalidDate: "Ugyldig dato",
		maskMessage: 'Alle krævede positioner skal udfyldes',
		maskRevertMessage: 'Alle krævede positioner skal udfyldes, hvorfor værdien blev tilbageført til den sidst gyldige position.',
		dateMessage: 'En gyldig dato skal angives',
		centuryThresholdValidValues: "centuryThreshold-egenskaben skal være mellem 0 og 99.",
		noListItemsNoButton: "Der gengives ingen spin- eller dropdown-tast, fordi der ikke er nogen listeelementer.",
		decimalNumber: "Når dataMode er '{0}', kan indstillingen {1} acceptere numeriske værdier mellem 0 og {2}.",
		decimalSeparatorErrorMsg: "Indstillingen decimalSeparator kræver en anden værdi. Dens værdi skal være et enkelt tegn.",
		decimalSeparatorEqualsGroupSeparatorErrorMsg: "GroupSeparator- og decimalSeparator-indstillingerne kan ikke have samme værdier.",
		timePickerNoSuchMethod: "Tidsvælgeren understøtter ikke denne metode."
	};

	$.ig.Editor.locale = $.ig.Editor.locale || $.ig.locale.da.Editor;
	return $.ig.locale.da.Editor;
}));// REMOVE_FROM_COMBINED_FILES
