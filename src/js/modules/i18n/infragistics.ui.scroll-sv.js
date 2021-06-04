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
		$.ig.locale.sv = $.ig.locale.sv || {};

	    $.ig.locale.sv.Scroll = {
		        errorNoElementLink: 'Elementet som länkas finns inte.',
		        errorNoScrollbarLink: 'Scrollbar-element som länkas finns inte.'
		}

		$.ig.Scroll.locale = $.ig.Scroll.locale || $.ig.locale.sv.Scroll;
		return $.ig.locale.sv.Scroll;
}));// REMOVE_FROM_COMBINED_FILES
