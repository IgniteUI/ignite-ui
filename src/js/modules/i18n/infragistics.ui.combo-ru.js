/*!@license
* Infragistics.Web.ClientUI Combo localization resources <build_number>
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
		factory(jQuery);
	}
}
(function ($) {
	$.ig = $.ig || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.ru = $.ig.locale.ru || {};
	$.ig.Combo = $.ig.Combo || {};
	
	$.ig.locale.ru.Combo = {
			noMatchFoundText: 'Результатов нет',
			dropDownButtonTitle: 'Показать список',
			clearButtonTitle: 'Очистить значение',
			placeHolder: 'выбрать...',
			notSuported: 'Операция не поддерживается.',
			errorNoSupportedTextsType: "Требуется другой текст для фильтрации. Укажите либо текстовую строку, либо набор текстовых строк.",
			errorUnrecognizedHighlightMatchesMode: 'Требуется другой режим выделения совпадений. Выберите значение из "multi", "contains", "startsWith", "full" и "null".',
			errorIncorrectGroupingKey: "Неправильный ключ группирования."
	};
	
    $.ig.Combo.locale = $.ig.Combo.locale || $.ig.locale.ru.Combo;
	return $.ig.locale.ru.Combo;
}));// REMOVE_FROM_COMBINED_FILES
