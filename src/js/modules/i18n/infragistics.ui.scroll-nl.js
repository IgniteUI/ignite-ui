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
		$.ig.locale.nl = $.ig.locale.nl || {};

	    $.ig.locale.nl.Scroll = {
		        errorNoElementLink: 'Element dat wordt gekoppeld, bestaat niet.',
		        errorNoScrollbarLink: 'Schuifbalkelement dat wordt gekoppeld, bestaat niet.'
		}

		$.ig.Scroll.locale = $.ig.Scroll.locale || $.ig.locale.nl.Scroll;
		return $.ig.locale.nl.Scroll;
}));// REMOVE_FROM_COMBINED_FILES
