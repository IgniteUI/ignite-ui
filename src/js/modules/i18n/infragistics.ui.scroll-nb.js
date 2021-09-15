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
		$.ig.locale.nb = $.ig.locale.nb || {};

	    $.ig.locale.nb.Scroll = {
		        errorNoElementLink: 'Element som blir koblet, eksisterer ikke.',
		        errorNoScrollbarLink: 'Rullefeltelementet som blir koblet, eksisterer ikke.'
		}

		$.ig.Scroll.locale = $.ig.Scroll.locale || $.ig.locale.nb.Scroll;
		return $.ig.locale.nb.Scroll;
}));// REMOVE_FROM_COMBINED_FILES
