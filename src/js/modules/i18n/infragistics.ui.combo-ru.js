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
		define( [
			"jquery"
		], factory );
	} else {
		factory(jQuery);
	}
}
(function ($) {
    $.ig = $.ig || {};

    if (!$.ig.Combo) {
	    $.ig.Combo = {
		    locale: {
		        noMatchFoundText: 'Результатов нет',
		        dropDownButtonTitle: 'Показать список',
		        clearButtonTitle: 'Очистить значение',
		        placeHolder: 'выбрать...',
		        notSuported: 'Операция не поддерживается.',
		        errorNoSupportedTextsType: "Требуется другой текст для фильтрации. Укажите либо текстовую строку, либо набор текстовых строк.",
		        errorUnrecognizedHighlightMatchesMode: 'Требуется другой режим выделения совпадений. Выберите значение из "multi", "contains", "startsWith", "full" и "null".',
		        errorIncorrectGroupingKey: "Неправильный ключ группирования."
		    }
	    };
    }
}));// REMOVE_FROM_COMBINED_FILES
