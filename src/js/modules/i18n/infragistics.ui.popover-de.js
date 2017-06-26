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
		define( [
			"jquery"
		], factory );
	} else {
		factory(jQuery);
	}
}
(function ($) {
$.ig = $.ig || {};

$.ig.Popover = {};

$.extend( $.ig.Popover, {
	locale: {
		popoverOptionChangeNotSupported: "Die Änderung der folgenden Option nach der Initialisierung von igPopover wird nicht unterstützt:",
		popoverShowMethodWithoutTarget: "Der Target-Parameter der Show-Funktion ist obligatorisch, wenn die Selectors-Option verwendet wird"
	}
});

$.ig.locale = $.ig.locale || {};
$.ig.locale.de = $.ig.locale.de || {};
$.ig.locale.de.Popover = $.extend({}, $.ig.Popover.locale);
}));// REMOVE_FROM_COMBINED_FILES
