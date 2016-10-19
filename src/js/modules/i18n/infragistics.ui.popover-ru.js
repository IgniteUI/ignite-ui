/*!@license
* Infragistics.Web.ClientUI Popover localization resources <build_number>
*
* Copyright (c) 2011-<year> Infragistics Inc.
*
* http://www.infragistics.com/
*
*/

(function ($) {
$.ig = $.ig || {};

if (!$.ig.Popover) {
	$.ig.Popover = {};

	$.extend( $.ig.Popover, {
		locale: {
			popoverOptionChangeNotSupported: "Изменение этой опции невозможно после инициализации igPopover:",
			popoverShowMethodWithoutTarget: "Параметр target функции show обязателен, когда используется опция selectors"
		}
	});

}
})(jQuery);
