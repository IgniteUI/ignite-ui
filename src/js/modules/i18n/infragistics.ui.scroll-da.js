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
		$.ig.locale.da = $.ig.locale.da || {};

	    $.ig.locale.da.Scroll = {
		        errorNoElementLink: 'Element, der linkes, findes ikke.',
		        errorNoScrollbarLink: 'Rullepanelelement, der linkes, findes ikke.'
		}

		$.ig.Scroll.locale = $.ig.Scroll.locale || $.ig.locale.da.Scroll;
		return $.ig.locale.da.Scroll;
}));// REMOVE_FROM_COMBINED_FILES
