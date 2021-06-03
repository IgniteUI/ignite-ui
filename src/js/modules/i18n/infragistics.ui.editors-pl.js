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
	$.ig.locale.pl = $.ig.locale.pl || {};

	$.ig.locale.pl.Editor = {
		spinUpperTitle: 'Zwiększ',
		spinLowerTitle: 'Zmniejsz',
		buttonTitle: 'Pokaż listę',
		clearTitle: 'Wyczyść wartość',
		ariaTextEditorFieldLabel: 'Edytor tekstów',
		ariaNumericEditorFieldLabel: 'Edytor liczb',
		ariaCurrencyEditorFieldLabel: 'Edytor walut',
		ariaPercentEditorFieldLabel: 'Edytor procentów',
		ariaMaskEditorFieldLabel: 'Edytor masek',
		ariaDateEditorFieldLabel: 'Edytor dat',
		ariaDatePickerFieldLabel: 'Selektor daty',
		ariaTimePickerFieldLabel: "Selektor godziny",
		ariaSpinUpButton: 'Zakręć w górę',
		ariaSpinDownButton: 'Zakręć w dół',
		ariaDropDownButton: 'Lista rozwijana',
		ariaClearButton: 'Wyczyść',
		ariaCalendarButton: 'Kalendarz',
		datePickerButtonTitle: 'Pokaż kalendarz',
		updateModeUnsupportedValue: 'Właściwość updateMode wymaga innej konfiguracji. Wybierz wartość "onChange" lub "immediate".',
		updateModeNotSupported: 'W przypadku rozszerzeń igMaskEditor, igDateEditor i igDatePicker właściwość updateMode obsługuje wyłącznie tryb "onchange".',
		renderErrMsg: "Nie można bezpośrednio utworzyć wystąpienia edytora podstawowego. Spróbuj użyć edytora tekstu, liczb, daty lub innego edytora.",
		multilineErrMsg: 'Właściwość textArea wymaga innej konfiguracji. Właściwość TextMode należy ustawić na "multiline".',
		targetNotSupported: "Ten element docelowy nie jest obsługiwany.",
		placeHolderNotSupported: "Atrybut symbolu zastępczego nie jest obsługiwany przez Twoją przeglądarkę.",
		allowedValuesMsg: "Wybierz wartość z listy rozwijanej",
		maxLengthErrMsg: "Wpis jest za długi i został przycięty do {0} symboli",
		maxLengthWarningMsg: "Wpis osiągnął maksymalną długość ({0}) tego pola",
		minLengthErrMsg: "Należy wprowadzić co najmniej {0} znaków(-i)",
		maxValErrMsg: "Wpis osiągnął maksymalną wartość ({0}) tego pola",
		minValErrMsg: "Wpis osiągnął minimalną wartość ({0}) tego pola",
		maxValExceedRevertErrMsg: "Wpis przekroczył maksymalną wartość ({0}) i został przywrócony do poprzedniego",
		minValExceedRevertErrMsg: "Wpis był mniejszy niż minimalna wartość ({0}) i został przywrócony do poprzedniego",
		maxValExceedSetErrMsg: "Wpis przekroczył maksymalną wartość ({0}) i został ustawiony na wartość maksymalną",
		minValExceedSetErrMsg: "Wpis był mniejszy niż minimalna wartość ({0}) i został ustawiony na wartość minimalną",
		maxValExceededWrappedAroundErrMsg: "Wpis przekroczył maksymalną wartość ({0}) i został ustawiony na minimalną dozwoloną wartość",
		minValExceededWrappedAroundErrMsg: "Wpis był mniejszy niż minimalna wartość ({0}) i został ustawiony na maksymalną dozwoloną wartość",
		btnValueNotSupported: 'Wymagana jest inna wartość przycisku. Wybierz wartość "dropdown", "clear" lub "spin".',
		scientificFormatErrMsg: 'Wymagana jest inna wartość scientificFormat. Wybierz wartość "E", "e", "E+" lub "e+".',
		spinDeltaIsOfTypeNumber: "Wymagany jest inny typ spinDelta. Należy wprowadzić liczbę dodatnią.",
		spinDeltaIsOfTypeNumberForPeriod: "W przypadku {0} wymagany jest inny typ spinDelta. Należy wprowadzić liczbę dodatnią z przedziału od {1} do {2}",
		spinDeltaIsOfTypeNumberOrObject: "Wymagany jest inny typ spinDelta. Należy podać liczbę dodatnią lub obiekt definiujący różne przyrosty przedziałów czasowych.",
		spinDeltaShouldBeInRange: "Opcja spinDelta dla {0} powinna mieć wartość z przedziału od {1} do {2}",
		spinDeltaCouldntBeNegative: "Opcja spinDelta nie może być ujemna. Należy wprowadzić liczbę dodatnią.",
		spinDeltaContainsExceedsMaxDecimals: "Maksymalne dozwolone ułamki dla spinDelta są ustawione na {0}. Zmień wartość MaxDecimals lub spróbuj zmniejszyć podaną wartość.",
		spinDeltaIncorrectFloatingPoint: 'Zmiennoprzecinkowa wartość spinDelta wymaga innej konfiguracji. Ustaw właściwość dataMode edytora na "double" lub "float" albo ustaw właściwość spinDelta na "integer".',
		numericEditorNoSuchMethod: "Edytor liczb nie obsługuje tej metody.",
		numericEditorNoSuchOption: "Edytor liczb nie obsługuje tej opcji.",
		displayFactorIsOfTypeNumber: "Właściwość displayFactor wymaga innej wartości. Powinna to być liczba 1 lub 100.",
		displayFactorAllowedValue: "Właściwość displayFactor wymaga innej wartości. Powinna to być liczba 1 lub 100.",
		instantiateCheckBoxErrMsg: "Edytor igCheckboxEditor wymaga innego elementu. Użyj elementu INPUT, SPAN lub DIV.",
		cannotParseNonBoolValue: "Edytor igCheckboxEditor wymaga innej wartości. Należy podać wartość logiczną.",
		cannotSetNonBoolValue: "Edytor igCheckboxEditor wymaga innej wartości. Należy podać wartość logiczną.",
		maskEditorNoSuchMethod: "Edytor masek nie obsługuje tej metody.",
		datePickerEditorNoSuchMethod: "Edytor dat nie obsługuje tej metody.",
		datePickerNoSuchMethodDropDownContainer: "Edytor dat nie obsługuje tej metody. Zamiast tego użyj metody 'getCalendar'.",
		buttonTypeIsDropDownOnly: "Selektor dat umożliwia wyłącznie rozwijanie i czyszczenie wartości dla opcji buttonType.",
		dateEditorOffsetRange: "Opcja displayTimeOffset powinna mieć wartość z przedziału od –720 do 840, co stanowi przesunięcie w minutach, zgodnie z czasem UTC, i dotyczy wszystkich stref czasowych od wysuniętych najbardziej na zachód (–12:00) do wysuniętych najbardziej na wschód (+14:00).",
		setOptionError: 'Zmiany w trakcie wykonywania są niedozwolone w przypadku następującej opcji: ',
		invalidDate: "Nieprawidłowa data",
		maskMessage: 'Wszystkie wymagane pozycje powinny być wypełnione',
		maskRevertMessage: 'Wszystkie wymagane pozycje powinny być wypełnione, dlatego wartość została przywrócona do ostatniej prawidłowej wartości.',
		dateMessage: 'Należy wprowadzić prawidłową datę',
		centuryThresholdValidValues: "Właściwość centuryThreshold powinna być z przedziału od 0 do 99.",
		noListItemsNoButton: "Żaden przycisk obracania ani rozwijania nie jest renderowany, ponieważ nie ma elementów listy.",
		decimalNumber: "Gdy parametr dataMode ma wartość '{0}', opcja {1} może akceptować wartości liczbowe z przedziału od 0 do {2}.",
		decimalSeparatorErrorMsg: "Opcja decimalSeparator wymaga innej wartości. Wartość powinna być pojedynczym znakiem.",
		decimalSeparatorEqualsGroupSeparatorErrorMsg: "Opcje groupSeparator i decimalSeparator nie mogą mieć równych wartości.",
		timePickerNoSuchMethod: "Selektor czasu nie obsługuje tej metody."
	};

	$.ig.Editor.locale = $.ig.Editor.locale || $.ig.locale.pl.Editor;
	return $.ig.locale.pl.Editor;
}));// REMOVE_FROM_COMBINED_FILES
