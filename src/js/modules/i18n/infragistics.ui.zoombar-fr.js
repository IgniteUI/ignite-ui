/*!@license
* Infragistics.Web.ClientUI Zoombar localization resources <build_number>
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
	$.ig.Zoombar = $.ig.Zoombar || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.fr = $.ig.locale.fr || {};

	$.ig.locale.fr.Zoombar = {
			zoombarTargetNotSpecified: "igZoombar a besoin d'une cible valide à laquelle s'attacher.",
			zoombarTypeNotSupported: "Le type de widget auquel la barre de zoom tente de s'attacher n'est pas pris en charge.",
			zoombarProviderNotRecognized: "igZoombar n'a pas pu initialiser un fournisseur à partir de la classe spécifiée, ou alors la valeur transmise n'est pas une classe.",
			optionChangeNotSupported: "La modification de l'option suivante après la création de igZoombar n'est pas prise en charge :"
	}

	$.ig.Zoombar.locale = $.ig.Zoombar.locale || $.ig.locale.fr.Zoombar;
	return $.ig.locale.fr.Zoombar;
}));// REMOVE_FROM_COMBINED_FILES
