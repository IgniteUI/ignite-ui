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
		define( [], factory );
	} else {
		return factory();
	}
}
(function ($) {
		$ = $ || {};
		$.ig = $.ig || {};
		$.ig.Scroll = $.ig.Scroll || {};
		$.ig.locale = $.ig.locale || {};
		$.ig.locale.fr = $.ig.locale.fr || {};

	    $.ig.locale.fr.Scroll = {
		        errorNoElementLink: "L'élément en cours de liaison n'existe pas.",
		        errorNoScrollbarLink: "L'élément de la barre de défilement en cours de liaison n'existe pas."
		    }

		$.ig.Scroll.locale = $.ig.Scroll.locale || $.ig.locale.fr.Scroll;
		return $.ig.locale.fr.Scroll;
}));// REMOVE_FROM_COMBINED_FILES
