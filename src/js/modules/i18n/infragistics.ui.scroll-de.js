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
		define( [
			"jquery"
		], factory );
	} else {
		factory(jQuery);
	}
}
(function ($) {
    $.ig = $.ig || {};

	    $.ig.Scroll = {};

	    $.extend($.ig.Scroll, {
		    locale: {
		        errorNoElementLink: 'Ein Element, das verknüpft wird, ist nicht vorhanden.',
		        errorNoScrollbarLink: 'Ein Scrollbar-Element, das verknüpft wird, ist nicht vorhanden.'
		    }
	    });

		$.ig.locale = $.ig.locale || {};
		$.ig.locale.de = $.ig.locale.de || {};
		$.ig.locale.de.Scroll = $.extend({}, $.ig.Scroll.locale);
}));// REMOVE_FROM_COMBINED_FILES
