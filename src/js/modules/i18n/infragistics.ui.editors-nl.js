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
	$.ig.locale.nl = $.ig.locale.nl || {};

	$.ig.locale.nl.Editor = {
		spinUpperTitle: 'Toename',
		spinLowerTitle: 'Afname',
		buttonTitle: 'Lijst weergeven',
		clearTitle: 'Waarde wissen',
		ariaTextEditorFieldLabel: 'Teksteditor',
		ariaNumericEditorFieldLabel: 'Numerieke editor',
		ariaCurrencyEditorFieldLabel: 'Valuta-editor',
		ariaPercentEditorFieldLabel: 'Percentage-editor',
		ariaMaskEditorFieldLabel: 'Maskereditor',
		ariaDateEditorFieldLabel: 'Datumeditor',
		ariaDatePickerFieldLabel: 'Datumkiezer',
		ariaTimePickerFieldLabel: "Tijdkiezer",
		ariaSpinUpButton: 'Ronddraaien',
		ariaSpinDownButton: 'Omlaag draaien',
		ariaDropDownButton: 'Vervolgkeuzelijst',
		ariaClearButton: 'Wissen',
		ariaCalendarButton: 'Kalender',
		datePickerButtonTitle: 'Kalender weergeven',
		updateModeUnsupportedValue: 'updateMode vereist een andere configuratie. Kies een waarde tussen "onChange" en "onmiddellijk".',
		updateModeNotSupported: 'De eigenschap updateMode ondersteunt alleen de modus "onchange" voor de extensies igMaskEditor, igDateEditor en igDatePicker',
		renderErrMsg: "Een basiseditor kan niet rechtstreeks worden geïnstantieerd. Probeer het met een tekst-, numerieke, datum- of andere editor.",
		multilineErrMsg: 'textArea vereist een andere configuratie. De textMode moet worden ingesteld op "multiline".',
		targetNotSupported: "Dit doelelement wordt niet ondersteund.",
		placeHolderNotSupported: "Het kenmerk placeholder wordt niet ondersteund door uw browser.",
		allowedValuesMsg: "Kies een waarde in de vervolgkeuzelijst",
		maxLengthErrMsg: "Invoer is te lang en is ingekort tot {0} symbolen",
		maxLengthWarningMsg: "Invoer heeft de maximale lengte van {0} voor dit veld bereikt",
		minLengthErrMsg: "Er moeten minimaal {0} tekens worden ingevoerd",
		maxValErrMsg: "Invoer bereikte de maximale waarde van {0} voor dit veld",
		minValErrMsg: "De invoer heeft de minimumwaarde van {0} voor dit veld bereikt",
		maxValExceedRevertErrMsg: "Invoer overschreed de maximumwaarde van {0} en werd teruggezet naar de vorige",
		minValExceedRevertErrMsg: "Invoer was lager dan de minimumwaarde van {0} en werd teruggezet naar de vorige",
		maxValExceedSetErrMsg: "Invoer overschreed de maximumwaarde van {0} en werd ingesteld op de maximumwaarde",
		minValExceedSetErrMsg: "Invoer was lager dan de minimumwaarde van {0} en was ingesteld op de minimumwaarde",
		maxValExceededWrappedAroundErrMsg: "Invoer overschreed de maximale waarde van {0} en werd ingesteld op de minimaal toegestane waarde",
		minValExceededWrappedAroundErrMsg: "Invoer was lager dan de minimumwaarde van {0} en is ingesteld op de maximaal toegestane waarde",
		btnValueNotSupported: 'Een andere knopwaarde is vereist. Kies een waarde tussen "dropdown", "clear" en "spin".',
		scientificFormatErrMsg: 'Een ander wetenschappelijk formaat is vereist. Kies een waarde tussen "E", "e", "E+" en "e+".',
		spinDeltaIsOfTypeNumber: "Een ander type spinDelta is vereist. Er moet een positief getal worden ingevoerd.",
		spinDeltaIsOfTypeNumberForPeriod: "Een ander type spinDelta is vereist voor de {0}. Er moet een positief getal tussen {1} en {2} worden ingevoerd.",
		spinDeltaIsOfTypeNumberOrObject: "Een ander type spinDelta is vereist. Een positief getal of een object dat verschillende delta's voor de tijdsperiode definieert, moet worden ingevoerd.",
		spinDeltaShouldBeInRange: "De spinDelta-optie voor {0} moet tussen {1} en {2} liggen",
		spinDeltaCouldntBeNegative: "De optie spinDelta mag niet negatief zijn. Er moet een positief getal worden ingevoerd.",
		spinDeltaContainsExceedsMaxDecimals: "Maximaal toegestane breuken voor spinDelta zijn ingesteld op {0}. Wijzig MaxDecimals of probeer uw waarde te verkleinen.",
		spinDeltaIncorrectFloatingPoint: 'Een spinDelta met drijvende komma vereist een andere configuratie. Stel de dataMode van de editor in op "double" of "float" of zet spinDelta op integer.',
		numericEditorNoSuchMethod: "De numerieke editor ondersteunt deze methode niet.",
		numericEditorNoSuchOption: "De numerieke editor ondersteunt deze optie niet.",
		displayFactorIsOfTypeNumber: "displayFactor vereist een andere waarde. De waarde moet als getal op 1 of 100 worden ingesteld.",
		displayFactorAllowedValue: "displayFactor vereist een andere waarde. De waarde moet als getal op 1 of 100 worden ingesteld.",
		instantiateCheckBoxErrMsg: "igCheckboxEditor vereist een ander element. Gebruik het INPUT-, SPAN- of DIV-element.",
		cannotParseNonBoolValue: "igCheckboxEditor vereist een andere waarde. Er moet een booleaanse waarde worden opgegeven.",
		cannotSetNonBoolValue: "igCheckboxEditor vereist een andere waarde. Er moet een booleaanse waarde worden opgegeven.",
		maskEditorNoSuchMethod: "De maskereditor ondersteunt deze methode niet.",
		datePickerEditorNoSuchMethod: "De datumeditor ondersteunt deze methode niet.",
		datePickerNoSuchMethodDropDownContainer: "De datumeditor ondersteunt deze methode niet. Gebruik in plaats daarvan 'getCalendar'.",
		buttonTypeIsDropDownOnly: "Datepicker staat alleen dropdown en wis waarden toe voor de optie buttonType.",
		dateEditorOffsetRange: "De optie displayTimeOffset moet tussen -720 en 840 liggen, wat volgens de UTC de verschuiving in minuten vertegenwoordigt van alle tijdzones van de meest westelijke (−12: 00) tot de meest oostelijke (+14: 00).",
		setOptionError: 'Runtime-wijzigingen zijn niet toegestaan voor de volgende optie: ',
		invalidDate: "Ongeldige datum",
		maskMessage: 'Alle vereiste posities moeten worden ingevuld',
		maskRevertMessage: 'Alle vereiste posities moeten worden ingevuld, daarom is de waarde teruggezet naar de laatste geldige.',
		dateMessage: 'Er moet een geldige datum worden ingevoerd',
		centuryThresholdValidValues: "De eigenschap centuryThreshold moet tussen 0 en 99 liggen.",
		noListItemsNoButton: "Er wordt geen spin- of vervolgkeuzeknop weergegeven omdat er geen lijstitems zijn.",
		decimalNumber: "Als dataMode '{0}' is, accepteert de optie {1} numerieke waarden tussen 0 en {2}.",
		decimalSeparatorErrorMsg: "Voor de optie decimalSeparator is een andere waarde vereist. De waarde moet één teken zijn.",
		decimalSeparatorEqualsGroupSeparatorErrorMsg: "De opties groupSeparator en decimalSeparator kunnen geen gelijke waarden hebben.",
		timePickerNoSuchMethod: "De tijdkiezer ondersteunt deze methode niet."
	};

	$.ig.Editor.locale = $.ig.Editor.locale || $.ig.locale.nl.Editor;
	return $.ig.locale.nl.Editor;
}));// REMOVE_FROM_COMBINED_FILES
