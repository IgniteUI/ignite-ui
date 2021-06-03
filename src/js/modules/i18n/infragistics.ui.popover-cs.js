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
	$.ig.locale.cs = $.ig.locale.cs || {};
	$.ig.Popover = $.ig.Popover || {};
	
	$.ig.locale.cs.Popover = {
		popoverOptionChangeNotSupported: "Changing the following option after igPopover has been initialized is not supported:",
		popoverShowMethodWithoutTarget: "The target parameter of the show function is mandatory when the selectors option is used"
	};

$.ig.Popover.locale = $.ig.Popover.locale || $.ig.locale.cs.Popover;
return $.ig.locale.cs.Popover;
}));// REMOVE_FROM_COMBINED_FILES
