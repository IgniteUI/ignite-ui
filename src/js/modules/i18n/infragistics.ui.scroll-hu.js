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
		$.ig.locale.hu = $.ig.locale.hu || {};

	    $.ig.locale.hu.Scroll = {
		        errorNoElementLink: 'Összekapcsolt elem nem létezik.',
		        errorNoScrollbarLink: 'Az összekapcsolt görgetősáv-elem nem létezik.'
		}

		$.ig.Scroll.locale = $.ig.Scroll.locale || $.ig.locale.hu.Scroll;
		return $.ig.locale.hu.Scroll;
}));// REMOVE_FROM_COMBINED_FILES
