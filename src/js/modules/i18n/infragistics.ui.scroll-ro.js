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
		$.ig.locale.ro = $.ig.locale.ro || {};

	    $.ig.locale.ro.Scroll = {
		        errorNoElementLink: 'Elementul care este legat nu există.',
		        errorNoScrollbarLink: 'Elementul barei de derulare care este conectat nu există.'
		}

		$.ig.Scroll.locale = $.ig.Scroll.locale || $.ig.locale.ro.Scroll;
		return $.ig.locale.ro.Scroll;
}));// REMOVE_FROM_COMBINED_FILES
