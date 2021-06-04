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
	$.ig.locale.hu = $.ig.locale.hu || {};

	$.ig.locale.hu.Editor = {
		spinUpperTitle: 'Növelés',
		spinLowerTitle: 'Csökkentés',
		buttonTitle: 'Lista megjelenítése',
		clearTitle: 'Érték törlése',
		ariaTextEditorFieldLabel: 'Szöveges szerkesztő',
		ariaNumericEditorFieldLabel: 'Numerikus szerkesztő',
		ariaCurrencyEditorFieldLabel: 'Pénznemszerkesztő',
		ariaPercentEditorFieldLabel: 'Százalékos szerkesztő',
		ariaMaskEditorFieldLabel: 'Maszkszerkesztő',
		ariaDateEditorFieldLabel: 'Dátumszerkesztő',
		ariaDatePickerFieldLabel: 'Dátumválasztó',
		ariaTimePickerFieldLabel: "Időválasztó",
		ariaSpinUpButton: 'Felfelé léptetés',
		ariaSpinDownButton: 'Lefelé léptetés',
		ariaDropDownButton: 'Legördülő lista',
		ariaClearButton: 'Törlés',
		ariaCalendarButton: 'Naptár',
		datePickerButtonTitle: 'Naptár megjelenítése',
		updateModeUnsupportedValue: 'Az updateMode opció más konfigurációt igényel. Válasszon egy értéket a "onChange" és az "immediate" közül.',
		updateModeNotSupported: 'Az updateMode tulajdonság csak a "onchange" módot támogatja az igMaskEditor, igDateEditor és igDatePicker bővítmények esetében',
		renderErrMsg: "Az alap szerkesztőeszköz nem példányosítható közvetlenül. Próbáljon meg egy szöveges, numerikus, dátum- vagy más szerkesztőt használni.",
		multilineErrMsg: 'A textArea más konfigurációt igényel. A textMode értékét "multiline"-ra kell állítani.',
		targetNotSupported: "Ez a célelem nem támogatott.",
		placeHolderNotSupported: "A böngésző nem támogatja a helyőrző attribútumot.",
		allowedValuesMsg: "Válasszon egy értéket a legördülő listából",
		maxLengthErrMsg: "A bejegyzés túl hosszú, és {0} szimbólum hosszúságúra lett vágva",
		maxLengthWarningMsg: "A bejegyzés elérte a mező maximális hosszát ({0})",
		minLengthErrMsg: "Legalább {0} karaktert kell megadni",
		maxValErrMsg: "A bejegyzés elérte a mező maximumértékét ({0})",
		minValErrMsg: "A bejegyzés elérte a mező minimumértékét ({0})",
		maxValExceedRevertErrMsg: "A bejegyzés meghaladta a maximumértéket ({0}), és visszaállt az előzőre",
		minValExceedRevertErrMsg: "A bejegyzés kisebb volt, mint a minimumérték ({0}), és visszaállt az előzőre",
		maxValExceedSetErrMsg: "A bejegyzés meghaladta a maximumértéket ({0}), és a maximumértékre lett beállítva",
		minValExceedSetErrMsg: "A bejegyzés kisebb volt, mint a minimumérték ({0}), és a minimumértékre lett beállítva",
		maxValExceededWrappedAroundErrMsg: "A bejegyzés meghaladta a maximumértéket ({0}), és a minimálisan megengedett értékre lett beállítva",
		minValExceededWrappedAroundErrMsg: "A bejegyzés kisebb volt, mint a minimumérték ({0}), és a maximálisan megengedett értékre lett beállítva",
		btnValueNotSupported: 'Más gombértékre van szükség. Válasszon egy értéket a "dropdown", a "clear" és a "spin" közül.',
		scientificFormatErrMsg: 'Más scientificFormat opciót kell megadni. Válasszon egy értéket az "E", "e", "E+" és "e+" közül.',
		spinDeltaIsOfTypeNumber: "Pozitív számot kell megadni. Más típusú spinDelta opciót kell megadni.",
		spinDeltaIsOfTypeNumberForPeriod: "Más típusú spinDelta opciót kell megadni a következőhöz: {0}. Egy {1} és {2} közötti pozitív számot kell megadni.",
		spinDeltaIsOfTypeNumberOrObject: "Más típusú spinDelta opciót kell megadni. Pozitív számot vagy egy különböző időintervallumokat definiáló objektumot kell megadni.",
		spinDeltaShouldBeInRange: "A(z) {0} spinDelta opciójának {1} és {2} között kell lennie",
		spinDeltaCouldntBeNegative: "A spinDelta opció nem lehet negatív. Pozitív számot kell megadni.",
		spinDeltaContainsExceedsMaxDecimals: "A spinDelta maximálisan megengedett törtértékei {0} értékre lettek beállítva. Módosítsa a MaxDecimals értéket, vagy próbálja csökkenteni a számértéket.",
		spinDeltaIncorrectFloatingPoint: 'A lebegőpontos spinDelta opcióhoz más konfiguráció szükséges. Állítsa a szerkesztőhöz tartozó dataMode értékét "double" vagy "float" értékre, vagy állítsa a spinDelta értékét egész számra.',
		numericEditorNoSuchMethod: "A numerikus szerkesztő nem támogatja ezt a metódust.",
		numericEditorNoSuchOption: "A numerikus szerkesztő nem támogatja ezt az opciót.",
		displayFactorIsOfTypeNumber: "A displayFactor értékének más értéket kell megadni. Az értéknek 1-nek vagy 100-nak kell lennie.",
		displayFactorAllowedValue: "A displayFactor értékének más értéket kell megadni. Az értéknek 1-nek vagy 100-nak kell lennie.",
		instantiateCheckBoxErrMsg: "Az igCheckboxEditor értékének más elemet kell megadni. Használja az INPUT, SPAN vagy DIV elemet.",
		cannotParseNonBoolValue: "Az igCheckboxEditor értékének más értéket kell megadni. Logikai értéket fogad el.",
		cannotSetNonBoolValue: "Az igCheckboxEditor értékének más értéket kell megadni. Logikai értéket fogad el.",
		maskEditorNoSuchMethod: "A maszkszerkesztő nem támogatja ezt a metódust.",
		datePickerEditorNoSuchMethod: "A dátumszerkesztő nem támogatja ezt a metódust.",
		datePickerNoSuchMethodDropDownContainer: "A dátumszerkesztő nem támogatja ezt a metódust. Használja helyette a 'getCalendar' metódust.",
		buttonTypeIsDropDownOnly: "A Datepicker használatakor csak a legördülő lista és az értékek törlése engedélyezett a buttonType opció esetében.",
		dateEditorOffsetRange: "A displayTimeOffset opciónak -720 és 840 között kell lennie. Az érték percekben fejezi ki az összes időzóna időeltolódását az UTC időzónához képest a legnyugatibbtól (−12:00) és a legkeletibbig (+14:00).",
		setOptionError: 'A következő opció esetében nem engedélyezettek a futásidejű változtatások: ',
		invalidDate: "Érvénytelen dátum",
		maskMessage: 'Minden kötelező adatot meg kell adni',
		maskRevertMessage: 'Minden kötelező adatot meg kell adni, ezért az érték vissza lett állítva az utolsó érvényes értékre.',
		dateMessage: 'Érvényes dátumot kell megadni',
		centuryThresholdValidValues: "A centuryThreshold tulajdonság értékének 0 és 99 között kell lennie.",
		noListItemsNoButton: "Nem jeleníthető meg léptetőnyíl vagy legördülő gomb, mert nincsenek listaelemek.",
		decimalNumber: "Ha a dataMode értéke '{0}', akkor a(z) {1} opció csak 0 és {2} közötti számértékeket fogad el.",
		decimalSeparatorErrorMsg: "A decimalSeparator opcióhoz más értéket kell megadni. Az értéknek egyetlen karakternek kell lennie.",
		decimalSeparatorEqualsGroupSeparatorErrorMsg: "A groupSeparator és a decimalSeparator opciók nem vehetnek fel azonos értéket.",
		timePickerNoSuchMethod: "Az időválasztó nem támogatja ezt a metódust."
	};

	$.ig.Editor.locale = $.ig.Editor.locale || $.ig.locale.hu.Editor;
	return $.ig.locale.hu.Editor;
}));// REMOVE_FROM_COMBINED_FILES
