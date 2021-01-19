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
		$.ig.locale.it = $.ig.locale.it || {};

	    $.ig.locale.it.Scroll = {
		        errorNoElementLink: 'Element that is being linked does not exists.',
		        errorNoScrollbarLink: 'Scrollbar element that is being linked does not exists.'
		}

		$.ig.Scroll.locale = $.ig.Scroll.locale || $.ig.locale.it.Scroll;
		return $.ig.locale.it.Scroll;
}));// REMOVE_FROM_COMBINED_FILES
