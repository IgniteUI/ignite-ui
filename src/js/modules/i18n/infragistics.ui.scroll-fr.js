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
		        errorNoElementLink: "L'élément en cours de liaison n'existe pas.",
		        errorNoScrollbarLink: "L'élément de la barre de défilement en cours de liaison n'existe pas."
		    }
	    });

		$.ig.locale = $.ig.locale || {};
		$.ig.locale.fr = $.ig.locale.fr || {};
		$.ig.locale.fr.Scroll = $.extend({}, $.ig.Scroll.locale);
}));// REMOVE_FROM_COMBINED_FILES
