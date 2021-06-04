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
	$.ig.locale.hu = $.ig.locale.hu || {};
	$.ig.Popover = $.ig.Popover || {};
	
	$.ig.locale.hu.Popover = {
		popoverOptionChangeNotSupported: "A következő opciónak az igPopover inicializálása után történő módosítása nem támogatott:",
		popoverShowMethodWithoutTarget: "A show funkció célparaméterét kötelező megadni a selectors opció használatakor"
	};

$.ig.Popover.locale = $.ig.Popover.locale || $.ig.locale.hu.Popover;
return $.ig.locale.hu.Popover;
}));// REMOVE_FROM_COMBINED_FILES
