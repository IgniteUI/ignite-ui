/*!@license
* Infragistics.Web.ClientUI Popover localization resources <build_number>
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
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.ru = $.ig.locale.ru || {};
	$.ig.Popover = $.ig.Popover || {};
	
	$.ig.locale.ru.Popover = {
		popoverOptionChangeNotSupported: "Изменение этой опции невозможно после инициализации igPopover:",
		popoverShowMethodWithoutTarget: "Параметр target функции show обязателен, когда используется опция selectors"
	};

$.ig.Popover.locale = $.ig.Popover.locale || $.ig.locale.ru.Popover;
return $.ig.locale.ru.Popover;
}));// REMOVE_FROM_COMBINED_FILES
