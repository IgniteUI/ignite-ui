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
(function($) {
$.ig = $.ig || {};

$.ig.Popover = {};

$.extend( $.ig.Popover, {
	locale: {
		popoverOptionChangeNotSupported: "Changing the following option after igPopover has been initialized is not supported:",
		popoverShowMethodWithoutTarget: "The target parameter of the show function is mandatory when the selectors option is used"
	}
});

$.ig.locale = $.ig.locale || {};
$.ig.locale.en = $.ig.locale.en || {};
$.ig.locale.en.Popover = $.extend({}, $.ig.Popover.locale);
}));// REMOVE_FROM_COMBINED_FILES
