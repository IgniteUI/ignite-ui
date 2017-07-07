/*!@license
* Infragistics.Web.ClientUI Rating localization resources <build_number>
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
	$.ig.Rating = $.ig.Rating || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.fr = $.ig.locale.fr || {};


	$.ig.locale.fr.Rating = {
			setOptionError: "Les modifications de temps d'exécution ne sont pas autorisées pour l'option suivante : "
	}
	
	$.ig.Rating.locale = $.ig.Rating.locale || $.ig.locale.fr.Rating;
	return $.ig.locale.fr.Rating;
}));// REMOVE_FROM_COMBINED_FILES
