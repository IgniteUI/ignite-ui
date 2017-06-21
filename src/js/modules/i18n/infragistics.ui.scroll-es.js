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
		        errorNoElementLink: 'El elemento que se está vinculando no existe.',
		        errorNoScrollbarLink: 'El elemento de la barra de desplazamiento que se está vinculando no existe.'
		    }
	    });

		$.ig.locale = $.ig.locale || {};
		$.ig.locale.es = $.ig.locale.bg || {};
		$.ig.locale.es.Scroll = $.extend({}, $.ig.Scroll.locale);
}));// REMOVE_FROM_COMBINED_FILES
