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
		$.ig.locale.de = $.ig.locale.de || {};

	    $.ig.locale.de.Scroll = {
		        errorNoElementLink: 'Ein Element, das verknüpft wird, ist nicht vorhanden.',
		        errorNoScrollbarLink: 'Ein Scrollbar-Element, das verknüpft wird, ist nicht vorhanden.'
		}

		$.ig.Scroll.locale = $.ig.Scroll.locale || $.ig.locale.de.Scroll;
		return $.ig.locale.de.Scroll;
}));// REMOVE_FROM_COMBINED_FILES
