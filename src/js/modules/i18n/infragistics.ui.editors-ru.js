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
		define( [
			"jquery"
		], factory );
	} else {
		factory(jQuery);
	}
}
(function ($) {
    $.ig = $.ig || {};

    if (!$.ig.Editor) {
	    $.ig.Editor = {
		    locale: {
			    spinUpperTitle: 'Увеличение',
			    spinLowerTitle: 'Уменьшение',
			    buttonTitle: 'Показать список',
			    clearTitle: 'Удалить значение',
			    ariaTextEditorFieldLabel: 'Текстовый редактор',
			    ariaNumericEditorFieldLabel: 'Редактор чисел',
			    ariaCurrencyEditorFieldLabel: 'Редактор валюты',
			    ariaPercentEditorFieldLabel: 'Редактор процентов',
			    ariaMaskEditorFieldLabel: 'Редактор маски',
			    ariaDateEditorFieldLabel: 'Редактор даты',
			    ariaDatePickerFieldLabel: 'Элемент выбора даты',
			    ariaSpinUpButton: 'Выбор большего значения',
			    ariaSpinDownButton: 'Выбор меньшего значения',
			    ariaDropDownButton: 'Раскрытие списка',
			    ariaClearButton: 'Очистить',
			    ariaCalendarButton: 'Календарь',
			    datePickerButtonTitle: 'Показать календарь',
			    updateModeUnsupportedValue: 'Опция updateMode поддерживает два возможных значения - "onChange" и "immediate"',
			    updateModeNotSupported: 'Для расширений igMaskEditor, igDateEditor и igDatePicker свойство updateMode поддерживает только режим "onchange"',
			    renderErrMsg: "В данный момент невозможно создать экземпляр основного редактора. Попробуйте текстовый, числовой редактор, редактор дат или другой редактор.",
			    multilineErrMsg: 'Требуется другая конфигурация textArea. Для textMode следует задать значение "multiline".',
			    targetNotSupported: "Данный элемент не поддерживается.",
			    placeHolderNotSupported: "Атрибут заполнителя не поддерживается вашим браузером.",
			    allowedValuesMsg: "Выберите значение из раскрывающегося списка",
			    maxLengthErrMsg: "Введенные данные превышают допустимую длину и были сокращены до {0} символов",
			    maxLengthWarningMsg: "Запись достигла максимальной длины {0} для этого поля",
			    minLengthErrMsg: "Следует ввести, по меньшей мере, {0} символов",
			    maxValErrMsg: "Введенные данные достигли максимального значения {0} для этого поля",
			    minValErrMsg: "Введенные данные достигли минимального значения {0} для этого поля",
			    maxValExceedRevertErrMsg: "Введенные данные превысили максимальное значение {0}, было восстановлено предыдущее значение",
			    minValExceedRevertErrMsg: "Введенное значение было меньше минимального значения {0}, поэтому было возвращено предыдущее значение",
			    maxValExceedSetErrMsg: "Введенные данные превысили максимальное значение {0}, было установлено максимальное значение",
			    minValExceedSetErrMsg: "Введенное значение было меньше минимального значения {0}, было установлено минимальное значение",
			    maxValExceededWrappedAroundErrMsg: "Введенные данные превысили максимальное значение {0}, было установлено минимально допустимое значение",
			    minValExceededWrappedAroundErrMsg: "Введенное значение было меньше минимального значения {0}, поэтому было установлено максимальное допустимое значение",
			    btnValueNotSupported: 'Требуется задать другое значение кнопки. Выберите значение из "dropdown", "clear" и "spin".',
			    scientificFormatErrMsg: 'Требуется другой scientificFormat. Выберите значение из "E", "e", "E+" и "e+".',
			    spinDeltaIsOfTypeNumber: "Требуется другой тип spinDelta. Следует ввести положительное число.",
			    spinDeltaCouldntBeNegative: "Параметр spinDelta не может принимать отрицательное значение. Следует ввести положительное число.",
			    spinDeltaContainsExceedsMaxDecimals: "Максимально допустимая дробная часть для spinDelta установлена в {0}. Измените значение параметра MaxDecimals или попробуйте сократить число.",
			    spinDeltaIncorrectFloatingPoint: 'Требуется другая конфигурация для работы с плавающей запятой spinDelta. Установите для свойства dataMode редактора значение "double" или "float" либо установите целое значение для свойства spinDelta.',
			    notEditableOptionByInit: "Нельзя редактировать этот параметр после инициализации. Это значение следует задать в процессе инициализации.",
			    numericEditorNoSuchMethod: "Этот способ не поддерживается числовым редактором.",
			    numericEditorNoSuchOption: "Эта опция не поддерживается редактором чисел.",
			    displayFactorIsOfTypeNumber: "Требуется другое значение параметра displayFactor. Для этого параметра следует задать численное значение от 1 до 100.",
			    displayFactorAllowedValue: "Требуется другое значение параметра displayFactor. Для этого параметра следует задать численное значение от 1 до 100.",
			    instantiateCheckBoxErrMsg: "Требуется другой элемент параметра igCheckboxEditor. Используйте элементы INPUT, SPAN или DIV.",
			    cannotParseNonBoolValue: "Требуется другое значение параметра igCheckboxEditor. Следует указать логическое значение параметра.",
			    cannotSetNonBoolValue: "Требуется другое значение параметра igCheckboxEditor. Следует указать логическое значение параметра.",
			    maskEditorNoSuchMethod: "Этот способ не поддерживается редактором маски.",
			    datePickerEditorNoSuchMethod: "Этот способ не поддерживается редактором дат.",
			    datePickerNoSuchMethodDropDownContainer: "Этот метод не поддерживается редактором даты. Используйте взамен 'getCalendar'.",
			    buttonTypeIsDropDownOnly: "Элемент выбора даты позволяет устанавливать значение параметра buttonType только dropdown и clear.",
				dateEditorOffsetRange: "Значение параметра displayTimeOffset должно находиться в диапазоне от -720 до 840, что представляет смещение в минутах всех часовых поясов от самого западного (-12:00) до самого восточного (+14:00) согласно универсальному глобальному времени.",
				cannotSetRuntime: "Этот параметр не может быть задан во время выполнения программы",
			    invalidDate: "Неверная дата",
			    maskMessage: 'Следует заполнить все обязательные поля',
			    maskRevertMessage: 'Все обязательные поля должны быть заполнены, поэтому было восстановлено последнее правильное значение.',
				dateMessage: 'Следует ввести правильную дату',
			    centuryThresholdValidValues: "Свойство centuryThreshold должно находиться в диапазоне от 0 до 99.",
			    noListItemsNoButton: "Счетчик или кнопка раскрытия списка не отображаются вследствие отсутствия элементов списка.",
				decimalNumber: "Если свойство dataMode имеет значение '{0}', параметр {1} может принимать числовые значения от 0 до {2}.",
				decimalSeparatorErrorMsg: "Для параметра decimalSeparator требуется другое значение. Это значение должно быть одиночным символом.",
				decimalSeparatorEqualsGroupSeparatorErrorMsg: "Значения параметров groupSeparator и decimalSeparator не могут быть одинаковыми."
		    }
	    };
    }
}));// REMOVE_FROM_COMBINED_FILES
