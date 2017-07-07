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
		$.ig.locale.en = $.ig.locale.en || {};

	    $.ig.locale.en.Scroll = {
		        errorNoElementLink: 'Element that is being linked does not exists.',
		        errorNoScrollbarLink: 'Scrollbar element that is being linked does not exists.'
		}

		$.ig.Scroll.locale = $.ig.Scroll.locale || $.ig.locale.en.Scroll;
		return $.ig.locale.en.Scroll;
}));// REMOVE_FROM_COMBINED_FILES
