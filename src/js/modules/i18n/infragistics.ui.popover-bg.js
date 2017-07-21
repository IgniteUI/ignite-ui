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
		define( [], factory );
	} else {
		factory();
	}
}
(function () {
	ig = $.ig || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.bg = $.ig.locale.bg || {};
	$.ig.Popover = $.ig.Popover || {};
	
	$.ig.locale.bg.Popover = {
		popoverOptionChangeNotSupported: "Промяната на следната опция след инициализация на igPopover не се поддържа:",
		popoverShowMethodWithoutTarget: "Целевият параметър на функцията show е задължителен, когато се използва опцията за селектори."
	};

$.ig.Popover.locale = $.ig.Popover.locale || $.ig.locale.bg.Popover;
return $.ig.locale.bg.Popover;
}));// REMOVE_FROM_COMBINED_FILES
