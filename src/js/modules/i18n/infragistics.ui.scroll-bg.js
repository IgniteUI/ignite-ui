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
		        errorNoElementLink: 'Елементът, който бива свързван, не съществува.',
		        errorNoScrollbarLink: 'Елементът плъзгач, който бива свързван, не съществува.'
		    }
	    });
		
		$.ig.locale = $.ig.locale || {};
		$.ig.locale.bg = $.ig.locale.bg || {};
		$.ig.locale.bg.Scroll = $.extend({}, $.ig.Scroll.locale);
}));// REMOVE_FROM_COMBINED_FILES
