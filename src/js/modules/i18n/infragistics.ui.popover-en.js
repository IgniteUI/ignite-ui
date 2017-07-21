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
(function() {
	ig = $.ig || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.en = $.ig.locale.en || {};
	$.ig.Popover = $.ig.Popover || {};
	
	$.ig.locale.en.Popover = {
		popoverOptionChangeNotSupported: "Changing the following option after igPopover has been initialized is not supported:",
		popoverShowMethodWithoutTarget: "The target parameter of the show function is mandatory when the selectors option is used"
	};

$.ig.Popover.locale = $.ig.Popover.locale || $.ig.locale.en.Popover;
return $.ig.locale.en.Popover;
}));// REMOVE_FROM_COMBINED_FILES
