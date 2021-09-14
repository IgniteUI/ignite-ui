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
	$.ig.locale['nb-NO'] = $.ig.locale['nb-NO'] || {};

	$.ig.locale['nb-NO'].Editor = {
		spinUpperTitle: 'Økning',
		spinLowerTitle: 'Nedgang',
		buttonTitle: 'Vis liste',
		clearTitle: 'Klar verdi',
		ariaTextEditorFieldLabel: 'Tekstredigerer',
		ariaNumericEditorFieldLabel: 'Numerisk redaktør',
		ariaCurrencyEditorFieldLabel: 'Valutaredaktør',
		ariaPercentEditorFieldLabel: 'Prosentredaktør',
		ariaMaskEditorFieldLabel: 'Maskeditor',
		ariaDateEditorFieldLabel: 'Datoredigerer',
		ariaDatePickerFieldLabel: 'Datovelger',
		ariaTimePickerFieldLabel: "Klokkeslettvelger",
		ariaSpinUpButton: 'Spinn opp',
		ariaSpinDownButton: 'Spinne ned',
		ariaDropDownButton: 'Fall ned',
		ariaClearButton: 'Klar',
		ariaCalendarButton: 'Kalender',
		datePickerButtonTitle: 'Vis kalender',
		updateModeUnsupportedValue: 'updateMode krever en annen konfigurasjon. Velg en verdi mellom "onChange" og "immediate".',
		updateModeNotSupported: 'updateMode-egenskapen støtter bare "onchange"-modus for igMaskEditor, igDateEditor og igDatePicker-utvidelser',
		renderErrMsg: "En basisredaktør kan ikke instantieres direkte. Prøv med en tekst, numerisk, dato eller annen redaktør.",
		multilineErrMsg: 'textArea krever en annen konfigurasjon. TextMode bør settes til "multiline".',
		targetNotSupported: "Dette målelementet støttes ikke.",
		placeHolderNotSupported: "Plassholderattributtet støttes ikke av nettleseren din.",
		allowedValuesMsg: "Velg en verdi fra rullegardinlisten",
		maxLengthErrMsg: "Oppføringen er for lang og er trimmet til {0} symboler",
		maxLengthWarningMsg: "Oppføringen nådde maksimal lengde på {0} for dette feltet",
		minLengthErrMsg: "Du må skrive inn minst {0} tegn",
		maxValErrMsg: "Oppføringen nådde maksimumsverdien på {0} for dette feltet",
		minValErrMsg: "Oppføringen nådde minimumsverdien på {0} for dette feltet",
		maxValExceedRevertErrMsg: "Oppføringen overskred den maksimale verdien på {0} og ble tilbakestilt til forrige",
		minValExceedRevertErrMsg: "Oppføringen var mindre enn minimumsverdien på {0} og ble tilbakestilt til forrige",
		maxValExceedSetErrMsg: "Oppføringen overskred maksimalverdien på {0} og ble angitt til maksimumsverdien",
		minValExceedSetErrMsg: "Oppføringen var mindre enn minimumsverdien på {0} og ble satt til minimumsverdien",
		maxValExceededWrappedAroundErrMsg: "Oppføringen overskred den maksimale verdien på {0} og ble satt til den minste tillatte verdien",
		minValExceededWrappedAroundErrMsg: "Oppføringen var mindre enn minimumsverdien på {0} og var satt til den høyeste tillatte verdien",
		btnValueNotSupported: 'En annen knappverdi kreves. Velg en verdi mellom "dropdown", "clear" og "spin".',
		scientificFormatErrMsg: 'En annen vitenskapelig format kreves. Velg en verdi mellom "E", "e", "E+" og "e+".',
		spinDeltaIsOfTypeNumber: "En annen type spinDelta er nødvendig. Et positivt tall bør angis.",
		spinDeltaIsOfTypeNumberForPeriod: "En annen type spinDelta kreves for {0}. Du må angi et positivt tall mellom {1} og {2}",
		spinDeltaIsOfTypeNumberOrObject: "En annen type spinDelta er nødvendig. Et positivt tall eller et objekt, som definerer forskjellige tidsperiode-deltaer, bør angis.",
		spinDeltaShouldBeInRange: "SpinnDelta-alternativet for {0} bør være mellom {1} og {2}",
		spinDeltaCouldntBeNegative: "Alternativet spinDelta kan ikke være negativt. Et positivt tall bør angis.",
		spinDeltaContainsExceedsMaxDecimals: "Maksimalt tillatte fraksjoner for spinDelta er satt til {0}. Enten endre MaxDecimals eller prøv å krympe verdien din.",
		spinDeltaIncorrectFloatingPoint: 'Et flytende punkt spinDelta krever en annen konfigurasjon. Sett dataMode for editoren til enten "double" eller "float" eller sett spinDelta til heltall.',
		numericEditorNoSuchMethod: "Den numeriske editoren støtter ikke denne metoden.",
		numericEditorNoSuchOption: "Den numeriske editoren støtter ikke dette alternativet.",
		displayFactorIsOfTypeNumber: "displayFactor krever en annen verdi. Verdien bør settes til 1 eller 100 som et tall.",
		displayFactorAllowedValue: "displayFactor krever en annen verdi. Verdien bør settes til 1 eller 100 som et tall.",
		instantiateCheckBoxErrMsg: "igCheckboxEditor krever et annet element. Bruk INPUT, SPAN eller DIV element.",
		cannotParseNonBoolValue: "igCheckboxEditor krever en annen verdi. En boolsk verdi bør oppgis.",
		cannotSetNonBoolValue: "igCheckboxEditor krever en annen verdi. En boolsk verdi bør oppgis.",
		maskEditorNoSuchMethod: "Maskeredigereren støtter ikke denne metoden.",
		datePickerEditorNoSuchMethod: "Datoredigereren støtter ikke denne metoden.",
		datePickerNoSuchMethodDropDownContainer: "Datoredigereren støtter ikke denne metoden. Bruk 'getCalendar' en i stedet.",
		buttonTypeIsDropDownOnly: "Datepicker tillater bare rullegardinmenyen og klare verdier for buttonType-alternativet.",
		dateEditorOffsetRange: "DisplayTimeOffset-alternativet bør være mellom -720 og 840, som representerer forskyvningen i minutter, i henhold til UTC, for alle tidssonene fra den vestligste (-12:00) til den østligste (+14:00).",
		setOptionError: 'Kjøretidsendringer er ikke tillatt for følgende alternativ: ',
		invalidDate: "Ugyldig dato",
		maskMessage: 'Alle nødvendige stillinger bør fylles ut',
		maskRevertMessage: 'Alle nødvendige posisjoner skal fylles ut, derfor ble verdien tilbakeført til den siste gyldige.',
		dateMessage: 'En gyldig dato bør angis',
		centuryThresholdValidValues: "terskeleiendommen skal være mellom 0 og 99.",
		noListItemsNoButton: "Ingen spinn- eller rullegardinknapp blir gjengitt fordi det ikke er noen listeelementer.",
		decimalNumber: "Når dataMode er '{0}', kan alternativet {1} godta numeriske verdier mellom 0 og {2}.",
		decimalSeparatorErrorMsg: "Alternativet decimalSeparator krever en annen verdi. Verdien skal være et enkelt tegn.",
		decimalSeparatorEqualsGroupSeparatorErrorMsg: "GroupSeparator og decimalSeparator-alternativene kan ikke ha like verdier.",
		timePickerNoSuchMethod: "Tidsvelgeren støtter ikke denne metoden."
	};

	$.ig.Editor.locale = $.ig.Editor.locale || $.ig.locale['nb-NO'].Editor;
	return $.ig.locale['nb-NO'].Editor;
}));// REMOVE_FROM_COMBINED_FILES
