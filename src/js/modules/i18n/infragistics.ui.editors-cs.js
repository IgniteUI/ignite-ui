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
	$.ig.locale.cs = $.ig.locale.cs || {};

	$.ig.locale.cs.Editor = {
		spinUpperTitle: 'Přírůstek',
		spinLowerTitle: 'Snížení',
		buttonTitle: 'Zobrazit seznam',
		clearTitle: 'Vymazat hodnotu',
		ariaTextEditorFieldLabel: 'Textový editor',
		ariaNumericEditorFieldLabel: 'Numerický editor',
		ariaCurrencyEditorFieldLabel: 'Editor měn',
		ariaPercentEditorFieldLabel: 'Editor procent',
		ariaMaskEditorFieldLabel: 'Editor masek',
		ariaDateEditorFieldLabel: 'Editor data',
		ariaDatePickerFieldLabel: 'Výběr data',
		ariaTimePickerFieldLabel: "Výběr času",
		ariaSpinUpButton: 'Roztočte se',
		ariaSpinDownButton: 'Otočte se dolů',
		ariaDropDownButton: 'Rozbalit',
		ariaClearButton: 'Průhledná',
		ariaCalendarButton: 'Kalendář',
		datePickerButtonTitle: 'Zobrazit kalendář',
		updateModeUnsupportedValue: 'updateMode vyžaduje jinou konfiguraci. Vyberte hodnotu mezi "onChange" a "immediate".',
		updateModeNotSupported: 'vlastnost updateMode podporuje pouze režim "onchange" pro rozšíření igMaskEditor, igDateEditor a igDatePicker',
		renderErrMsg: "Základní editor nelze vytvořit instanci přímo. Vyzkoušejte textový, číselný, datový nebo jiný editor.",
		multilineErrMsg: 'textArea vyžaduje jinou konfiguraci. Textový režim by měl být nastaven na "multiline".',
		targetNotSupported: "Tento cílový prvek není podporován.",
		placeHolderNotSupported: "Váš prohlížeč nepodporuje atribut placeholder.",
		allowedValuesMsg: "Vyberte hodnotu z rozevíracího seznamu",
		maxLengthErrMsg: "Záznam je příliš dlouhý a byl oříznut na {0} symbolů",
		maxLengthWarningMsg: "Záznam dosáhl maximální délky {0} pro toto pole",
		minLengthErrMsg: "Je třeba zadat alespoň {0} znaků",
		maxValErrMsg: "Záznam dosáhl maximální hodnoty {0} pro toto pole",
		minValErrMsg: "Záznam pro toto pole dosáhl minimální hodnoty {0}",
		maxValExceedRevertErrMsg: "Záznam překročil maximální hodnotu {0} a byl vrácen na předchozí",
		minValExceedRevertErrMsg: "Položka byla menší než minimální hodnota {0} a byla vrácena na předchozí",
		maxValExceedSetErrMsg: "Záznam překročil maximální hodnotu {0} a byl nastaven na maximální hodnotu",
		minValExceedSetErrMsg: "Položka byla menší než minimální hodnota {0} a byla nastavena na minimální hodnotu",
		maxValExceededWrappedAroundErrMsg: "Záznam překročil maximální hodnotu {0} a byl nastaven na minimální povolenou hodnotu",
		minValExceededWrappedAroundErrMsg: "Položka byla menší než minimální hodnota {0} a byla nastavena na maximální povolenou hodnotu",
		btnValueNotSupported: 'Je požadována jiná hodnota tlačítka. Vyberte hodnotu mezi "rozevíracím seznamem", "vymazáním" a "roztočením".',
		scientificFormatErrMsg: 'Je vyžadován jiný vědecký formát. Vyberte hodnotu mezi "E", "e", "E+" a "e+".',
		spinDeltaIsOfTypeNumber: "Je třeba zadat kladné číslo. Je vyžadován jiný typ spinDelta.",
		spinDeltaIsOfTypeNumberForPeriod: "Pro {0} je vyžadován jiný typ spinDelta. Mělo by být zadáno kladné číslo mezi {1} a {2}.",
		spinDeltaIsOfTypeNumberOrObject: "Je vyžadován jiný typ spinDelta. Mělo by být zadáno kladné číslo nebo objekt, který definuje různé delty časového období.",
		spinDeltaShouldBeInRange: "Možnost spinDelta pro {0} by měla být mezi {1} a {2}",
		spinDeltaCouldntBeNegative: "Možnost spinDelta nemůže být záporná. Je třeba zadat kladné číslo.",
		spinDeltaContainsExceedsMaxDecimals: "Buď změňte MaxDecimals, nebo zkuste zmenšit svoji hodnotu. Maximální povolené zlomky pro spinDelta jsou nastaveny na {0}.",
		spinDeltaIncorrectFloatingPoint: 'Plovoucí desetinná čárka spinDelta vyžaduje jinou konfiguraci. Nastavte datový režim editoru na "double" nebo "float" nebo nastavte spinDelta na celé číslo.',
		numericEditorNoSuchMethod: "Numerický editor tuto metodu nepodporuje.",
		numericEditorNoSuchOption: "Numerický editor tuto možnost nepodporuje.",
		displayFactorIsOfTypeNumber: "displayFactor vyžaduje jinou hodnotu. Jeho hodnota by měla být nastavena na 1 nebo 100 jako číslo.",
		displayFactorAllowedValue: "displayFactor vyžaduje jinou hodnotu. Jeho hodnota by měla být nastavena na 1 nebo 100 jako číslo.",
		instantiateCheckBoxErrMsg: "igCheckboxEditor vyžaduje jiný prvek. Použijte prvek INPUT, SPAN nebo DIV.",
		cannotParseNonBoolValue: "igCheckboxEditor vyžaduje jinou hodnotu. Měla by být uvedena logická hodnota.",
		cannotSetNonBoolValue: "igCheckboxEditor vyžaduje jinou hodnotu. Měla by být uvedena logická hodnota.",
		maskEditorNoSuchMethod: "Editor masek tuto metodu nepodporuje.",
		datePickerEditorNoSuchMethod: "Editor data tuto metodu nepodporuje.",
		datePickerNoSuchMethodDropDownContainer: "Editor data tuto metodu nepodporuje. Místo toho použijte 'getCalendar'.",
		buttonTypeIsDropDownOnly: "Datepicker umožňuje pouze rozevírací a vymazat hodnoty pro možnost buttonType.",
		dateEditorOffsetRange: "Možnost displayTimeOffset by měla být mezi -720 a 840, což představuje posun podle minut, podle UTC, všech časových pásem od nejzápadnějšího (−12:00) do nejvýchodnějšího (+14:00).",
		setOptionError: 'Změny za běhu nejsou povoleny pro následující možnost: ',
		invalidDate: "Neplatné datum",
		maskMessage: 'Měly by být vyplněny všechny požadované pozice',
		maskRevertMessage: 'Měly by být vyplněny všechny požadované pozice, proto byla hodnota vrácena na poslední platnou.',
		dateMessage: 'Je třeba zadat platné datum',
		centuryThresholdValidValues: "CenturyThreshold vlastnost by měla být mezi 0 a 99.",
		noListItemsNoButton: "Žádné otočení nebo rozevírací tlačítko není vykresleno, protože zde nejsou žádné položky seznamu.",
		decimalNumber: "Když je datový režim '{0}', může možnost {1} přijímat číselné hodnoty mezi 0 a {2}.",
		decimalSeparatorErrorMsg: "Možnost decimalSeparator vyžaduje jinou hodnotu. Jeho hodnota by měla být jeden znak.",
		decimalSeparatorEqualsGroupSeparatorErrorMsg: "Možnosti groupSeparator a decimalSeparator nemohou mít stejné hodnoty.",
		timePickerNoSuchMethod: "Nástroj pro výběr času tuto metodu nepodporuje."
	};

	$.ig.Editor.locale = $.ig.Editor.locale || $.ig.locale.cs.Editor;
	return $.ig.locale.cs.Editor;
}));// REMOVE_FROM_COMBINED_FILES
