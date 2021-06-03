/*!@license
* Infragistics.Web.ClientUI Scroll localization resources <build_number>
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
		$.ig.Scroll = $.ig.Scroll || {};
		$.ig.locale = $.ig.locale || {};
		$.ig.locale.pt = $.ig.locale.pt || {};

	    $.ig.locale.pt.Scroll = {
		        errorNoElementLink: 'Element that is being linked does not exists.',
		        errorNoScrollbarLink: 'Scrollbar element that is being linked does not exists.'
		}

		$.ig.Scroll.locale = $.ig.Scroll.locale || $.ig.locale.pt.Scroll;
		return $.ig.locale.pt.Scroll;
}));// REMOVE_FROM_COMBINED_FILES
