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
			popoverOptionChangeNotSupported: "Промяната на следната опция след инициализация на igPopover не се поддържа:",
			popoverShowMethodWithoutTarget: "Целевият параметър на функцията show е задължителен, когато се използва опцията за селектори."
		}
	});

}
})(jQuery);
