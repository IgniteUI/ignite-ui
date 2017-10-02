/*!@license
* Infragistics.Web.ClientUI templating localization resources <build_number>
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
	$.ig.Templating = $.ig.Templating || {};
	
	$.ig.locale.ru.Templating = {
			undefinedArgument: 'Произошла ошибка при извлечении значения поля из источника данных: '
	};
	
	$.ig.Templating.locale = $.ig.Templating.locale || $.ig.locale.ru.Templating;
	return $.ig.locale.ru.Templating;
}));// REMOVE_FROM_COMBINED_FILES
