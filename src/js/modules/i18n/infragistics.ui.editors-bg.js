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
	$.ig.locale.bg = $.ig.locale.bg || {};

	$.ig.locale.bg.Editor = {
		spinUpperTitle: 'Инкрементирай',
		spinLowerTitle: 'Декрементирай',
		buttonTitle: 'Покажи списъка',
		clearTitle: 'Изчисти стойността',
		ariaTextEditorFieldLabel: 'Текстов редактор',
		ariaNumericEditorFieldLabel: 'Числов редактор',
		ariaCurrencyEditorFieldLabel: 'Редактор на валута',
		ariaPercentEditorFieldLabel: 'Редактор на проценти',
		ariaMaskEditorFieldLabel: 'Редактор на маски',
		ariaDateEditorFieldLabel: 'Редактор на дати',
		ariaDatePickerFieldLabel: 'Извличане на дата',
		ariaTimePickerFieldLabel: 'Time Picker',
		ariaSpinUpButton: 'Завъртане нагоре',
		ariaSpinDownButton: 'Завъртане надолу',
		ariaDropDownButton: 'Падащо меню',
		ariaClearButton: 'Изчистване',
		ariaCalendarButton: 'Календар',
		datePickerButtonTitle: 'Покажи календара',
		updateModeUnsupportedValue: 'Опцията updateMode поддържа две възможни стойности - "onChange" и "immediate"',
		updateModeNotSupported: 'Свойството updateMode поддържа само свойството "onchange" на igMaskEditor, igDateEditor и раширенията igDatePicker.',
		renderErrMsg: "Базовият редактор не може да бъде инстанцииран веднага. Опитайте с текстов, числов, едитор на дни или друг едитор.",
		multilineErrMsg: 'textArea изисква различна конфигурация. textMode трябва да бъде зададен като "multiline".',
		targetNotSupported: "Този целеви елемент не е поддържан.",
		placeHolderNotSupported: "Този елемент контейнер не е поддържан от Вашия браузър.",
		allowedValuesMsg: "Изберете стойност от падащото меню",
		maxLengthErrMsg: "Входните данни са твърде дълги, за това бяха съкратени до {0} символа.",
		maxLengthWarningMsg: "Входните данни за това поле достигнаха максимум дължината от {0}.",
		minLengthErrMsg: "Трябва да бъдат въведени поне {0} знака.",
		maxValErrMsg: "Входните данни достигнаха максималната стойност от {0} за това поле.",
		minValErrMsg: "Входните данни достигнаха минималната стойност от {0} за това поле.",
		maxValExceedRevertErrMsg: "Входните данни надхвърлиха максималната стойност от {0} и бяха върнат към предишната им стойност.",
		minValExceedRevertErrMsg: "Входните данни бяха по-малки от минималната стойност от {0} и бяха върнати към предишната им стойност.",
		maxValExceedSetErrMsg: "Входните данни надхвърлиха максималната стойност от {0} и бяха върнати към максималната стойност.",
		minValExceedSetErrMsg: "Входните данни данни бяха по-малки минималната стойност от {0} и бяха върнати към минималната стойност.",
		maxValExceededWrappedAroundErrMsg: "Входните данни надхвърлиха максималната стойност от {0} и бяха върнати към най-ниската им позволена такава.",
		minValExceededWrappedAroundErrMsg: "Входните данни бяха по-малки от минималната стойност от {0} и бяха върнати към предишната им стойност.",
		btnValueNotSupported: 'Необходима е различна стойност на бутона. Изберете една от следните стойности: "dropdown", "clear" или "spin".',
		scientificFormatErrMsg: 'Необходим е различен scientificFormat. Изберете една от следните стойности: "E", "e", "E+" или "e+".',
		spinDeltaIsOfTypeNumber: "Необходим е различен тип на spinDelta. Трябва да бъде въведено положително число.",
		spinDeltaIsOfTypeNumberForPeriod: "За {0} е необходим е различен тип на spinDelta. Трябва да бъде въведено положително число между {1} и {2}.",
		spinDeltaIsOfTypeNumberOrObject: "Необходим е различен тип на spinDelta. Трябва да бъде въведено положително число число или обект, който дефинира различни делта времеви периоди.",
		spinDeltaShouldBeInRange: "spinDelta опцията за {0} трябва да бъде между {1} и {2}",
		spinDeltaCouldntBeNegative: "Опцията spinDelta не може да бъде негативна. Трябва да бъде въведено положително число.",
		spinDeltaContainsExceedsMaxDecimals: "Максимъмът позволени части на spinDelta е {0}. Променете MaxDecimals или намалете стойността.",
		spinDeltaIncorrectFloatingPoint: 'spinDelta с плаваща запетая изисква различна конфигурация. Настройте dataMode на редактора, на "double" или "float", или  настройте spinDelta на integer.',
		notEditableOptionByInit: "Тази опция не може да бъде променяна след инициализиране. Стойността ѝ да бъде настроена по време на инициализацията.",
		numericEditorNoSuchMethod: "Числовият едитор не поддържа този метод.",
		numericEditorNoSuchOption: "Числовият редактор не поддържа тази опция.",
		displayFactorIsOfTypeNumber: "displayFactor изисква различна стойност. Стойността му трябва да бъде 1 или 100. ",
		displayFactorAllowedValue: "displayFactor изисква различна стойност. Стойността му трябва да бъде 1 или 100. ",
		instantiateCheckBoxErrMsg: "igCheckboxEditor изисква различен елемент. Използвайте  INPUT, SPAN или DIV елемент.",
		cannotParseNonBoolValue: "igCheckboxEditor изисква различен елемент. Трябва да бъде подадена булева стойност.",
		cannotSetNonBoolValue: "igCheckboxEditor изисква различен елемент. Трябва да бъде подадена булева стойност.",
		maskEditorNoSuchMethod: "Редакторът на маски не поддържа този метод.",
		datePickerEditorNoSuchMethod: "Редакторът на дати не поддържа този метод.",
		datePickerNoSuchMethodDropDownContainer: "Редакторът на дати не поддържа този метод. Вместо него използвайте 'getCalendar'.",
		buttonTypeIsDropDownOnly: "Datepicker позволява само dropdown и чисти стойности за опцията buttonType.",
		dateEditorOffsetRange: "Опцията displayTimeOffset трябва да бъде между -720 и 840, тя показва изместването в минути според UTC на всички часови зони от най-западната (-12:00) до най-източната (+14:00).",
		cannotSetRuntime: "Тази опцията не може да бъде настроена по време на изпълнение.",
		invalidDate: "Невалидна дата",
		maskMessage: 'Всички задължителни позиции трябва да бъдат попълнени.',
		maskRevertMessage: 'Всички задължителни позиции трябва да бъдат попълнени, заради което стойността беше върната към последната валидна',
		dateMessage: 'Трябва да бъде въведена валидна дата.',
		centuryThresholdValidValues: "Свойството centuryThreshold трябва да е между 0 и 99.",
		noListItemsNoButton: "Брояча или падащия бутон са рендирани понеже няма listitems.",
		decimalNumber: "Когато dataMode е '{0}’ опция {1} може да приема числови стойности в интервала 0 - {2}.",
		decimalSeparatorErrorMsg: "Опцията decimalSeparator изисква различна стойност. Стойността трябва да бъде единичен символ.",
		decimalSeparatorEqualsGroupSeparatorErrorMsg: "Опциите groupSeparator и decimalSeparator не могат да имат еднакви стойности.",
		timePickerNoSuchMethod: "The time picker does not support this method."
	};

	$.ig.Editor.locale = $.ig.Editor.locale || $.ig.locale.bg.Editor;
	return $.ig.locale.bg.Editor;
}));// REMOVE_FROM_COMBINED_FILES
