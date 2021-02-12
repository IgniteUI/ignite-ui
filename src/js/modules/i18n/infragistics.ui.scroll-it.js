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
		define( ["jquery"], factory );
	} else {
		return factory(jQuery);
	}
}
(function ($) {
	$.ig = $.ig || {};
		$.ig.Scroll = $.ig.Scroll || {};
		$.ig.locale = $.ig.locale || {};
		$.ig.locale.it = $.ig.locale.it || {};

	    $.ig.locale.it.Scroll = {
		        errorNoElementLink: 'L\'elemento da collegare non esiste.',
		        errorNoScrollbarLink: 'L\'elemento della barra di scorrimento da collegare non esiste.'
		}

		$.ig.Scroll.locale = $.ig.Scroll.locale || $.ig.locale.it.Scroll;
		return $.ig.locale.it.Scroll;
}));// REMOVE_FROM_COMBINED_FILES
