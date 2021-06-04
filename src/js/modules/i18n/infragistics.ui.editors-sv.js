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
	$.ig.locale.sv = $.ig.locale.sv || {};

	$.ig.locale.sv.Editor = {
		spinUpperTitle: 'Ökning',
		spinLowerTitle: 'Minskning',
		buttonTitle: 'Visa lista',
		clearTitle: 'Rensa värde',
		ariaTextEditorFieldLabel: 'Textredigerare',
		ariaNumericEditorFieldLabel: 'Numerisk redigerare',
		ariaCurrencyEditorFieldLabel: 'Valuta-redigerare',
		ariaPercentEditorFieldLabel: 'Procent-redigerare',
		ariaMaskEditorFieldLabel: 'Mask-redigerare',
		ariaDateEditorFieldLabel: 'Datum-redigerare',
		ariaDatePickerFieldLabel: 'Datumväljare',
		ariaTimePickerFieldLabel: "Tidsväljare",
		ariaSpinUpButton: 'Snurra upp',
		ariaSpinDownButton: 'Snurra ner',
		ariaDropDownButton: 'Fäll ner',
		ariaClearButton: 'Rensa',
		ariaCalendarButton: 'Kalender',
		datePickerButtonTitle: 'Visa kalender',
		updateModeUnsupportedValue: 'updateMode kräver en annan konfiguration. Välj ett värde mellan "onChange" och "immediate".',
		updateModeNotSupported: 'egenskapen updateMode stöder endast "onchange" -läget för tilläggen igMaskEditor, igDateEditor och igDatePicker',
		renderErrMsg: "En basredigerare kan inte startas direkt. Försök med en text-, numerisk, datum- eller annan redigerare.",
		multilineErrMsg: 'textArea kräver en annan konfiguration. textMode borde ställas in på "multiline".',
		targetNotSupported: "Detta målelement stöds inte.",
		placeHolderNotSupported: "Platshållarattributet stöds inte av din webbläsare.",
		allowedValuesMsg: "Välj ett värde från listrutan",
		maxLengthErrMsg: "Inmatningen är för lång och har trimmats till {0} symboler",
		maxLengthWarningMsg: "Inmatningen nådde den maximala längden på {0} för det här fältet",
		minLengthErrMsg: "Minst {0} tecken måste anges",
		maxValErrMsg: "Inmatningen nådde det maximala värdet på {0} för det här fältet",
		minValErrMsg: "Inmatningen nådde det lägsta värdet på {0} för det här fältet",
		maxValExceedRevertErrMsg: "Inmatningen överskred det maximala värdet på {0} och återställdes till det tidigare",
		minValExceedRevertErrMsg: "Inmatningen var mindre än minimivärdet {0} och återställdes till den tidigare",
		maxValExceedSetErrMsg: "Inmatningen översteg det maximala värdet på {0} och sattes till det maximala värdet",
		minValExceedSetErrMsg: "Inmatningen var mindre än minimivärdet på {0} och sattes till minimivärdet",
		maxValExceededWrappedAroundErrMsg: "Ingången överskred det maximala värdet på {0} och sattes till det lägsta tillåtna värdet",
		minValExceededWrappedAroundErrMsg: "Inmatningen var mindre än minimivärdet {0} och sattes till det högsta tillåtna värdet",
		btnValueNotSupported: 'Ett annat knappvärde krävs. Välj ett värde mellan "dropdown", "clear" och "spin".',
		scientificFormatErrMsg: 'Ett annat scientificFormat krävs. Välj ett värde mellan "E", "e", "E+" och "e+".',
		spinDeltaIsOfTypeNumber: "En annan typ av spinDelta krävs. Ett positivt tal borde anges.",
		spinDeltaIsOfTypeNumberForPeriod: "En annan typ av spinDelta krävs för {0}. Ett positivt tal mellan {1} och {2} borde anges.",
		spinDeltaIsOfTypeNumberOrObject: "En annan typ av spinDelta krävs. Ett positivt tal eller ett objekt, som definierar olika tidsperiodsdeltan, borde anges.",
		spinDeltaShouldBeInRange: "Alternativet spinDelta för {0} borde vara mellan {1} och {2}",
		spinDeltaCouldntBeNegative: "Alternativet spinDelta kan inte vara negativt. Ett positivt tal borde anges.",
		spinDeltaContainsExceedsMaxDecimals: "Maximalt tillåtna fraktioner för spinDelta är inställda på {0}. Ändra antingen på MaxDecimals eller försök att krympa ditt värde.",
		spinDeltaIncorrectFloatingPoint: 'En spinDelta-flytpunkt kräver en annan konfiguration. Ställ antingen in dataMode för redigeraren till "double" eller "float", eller ange spinDelta som ett heltal.',
		numericEditorNoSuchMethod: "Den numeriska redigeraren stöder inte denna metod.",
		numericEditorNoSuchOption: "Den numeriska redigeraren stöder inte detta alternativ.",
		displayFactorIsOfTypeNumber: "displayFactor kräver ett annat värde. Dess värde borde ställas in på 1 eller 100 i form av ett tal.",
		displayFactorAllowedValue: "displayFactor kräver ett annat värde. Dess värde borde ställas in på 1 eller 100 i form av ett tal.",
		instantiateCheckBoxErrMsg: "igCheckboxEditor kräver ett annat element. Använd INPUT, SPAN eller DIV-element.",
		cannotParseNonBoolValue: "igCheckboxEditor kräver ett annat värde. Ett booleskt värde bör anges.",
		cannotSetNonBoolValue: "igCheckboxEditor kräver ett annat värde. Ett booleskt värde bör anges.",
		maskEditorNoSuchMethod: "Maskredigeraren stöder inte den här metoden.",
		datePickerEditorNoSuchMethod: "Datumredigeraren stöder inte den här metoden.",
		datePickerNoSuchMethodDropDownContainer: "Datumredigeraren stöder inte den här metoden. Använd 'getCalendar' istället.",
		buttonTypeIsDropDownOnly: "Datepicker tillåter endast rullgardinsmeny och rensa värden för alternativet buttonType.",
		dateEditorOffsetRange: "DisplayTimeOffset-alternativet bör vara mellan -720 och 840, vilket representerar förskjutningen i minuter, enligt UTC, av alla tidszoner från den västligaste (−12:00) till den östligaste (+14:00).",
		setOptionError: 'Runtime-ändringar är inte tillåtna för följande alternativ: ',
		invalidDate: "Ogiltigt datum",
		maskMessage: 'Alla obligatoriska positioner måste fyllas',
		maskRevertMessage: 'Alla obligatoriska positioner måste fyllas, därför återställdes värdet till det sista giltiga.',
		dateMessage: 'Ett giltigt datum borde anges',
		centuryThresholdValidValues: "tröskelvärde ska ligga mellan 0 och 99.",
		noListItemsNoButton: "Ingen snurr eller rullgardinsmeny återges eftersom det inte finns några listobjekt.",
		decimalNumber: "När dataMode är '{0}' kan alternativet {1} acceptera numeriska värden mellan 0 och {2}.",
		decimalSeparatorErrorMsg: "Alternativet decimalSeparator kräver ett annat värde. Dess värde bör vara en enda karaktär.",
		decimalSeparatorEqualsGroupSeparatorErrorMsg: "GroupSeparator- och decimalSeparator-alternativen kan inte ha lika värden.",
		timePickerNoSuchMethod: "Tidsväljaren stöder inte denna metod."
	};

	$.ig.Editor.locale = $.ig.Editor.locale || $.ig.locale.sv.Editor;
	return $.ig.locale.sv.Editor;
}));// REMOVE_FROM_COMBINED_FILES
