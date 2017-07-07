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
		$.ig.locale.es = $.ig.locale.es || {};

	   $.ig.locale.es.Scroll = {
		        errorNoElementLink: 'El elemento que se está vinculando no existe.',
		        errorNoScrollbarLink: 'El elemento de la barra de desplazamiento que se está vinculando no existe.'
		}

		$.ig.Scroll.locale = $.ig.Scroll.locale || $.ig.locale.es.Scroll;
		return $.ig.locale.es.Scroll;
}));// REMOVE_FROM_COMBINED_FILES
