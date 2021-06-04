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
		$.ig.locale.pl = $.ig.locale.pl || {};

	    $.ig.locale.pl.Scroll = {
		        errorNoElementLink: 'Łączony element nie istnieje.',
		        errorNoScrollbarLink: 'Łączony element paska przewijania nie istnieje.'
		}

		$.ig.Scroll.locale = $.ig.Scroll.locale || $.ig.locale.pl.Scroll;
		return $.ig.locale.pl.Scroll;
}));// REMOVE_FROM_COMBINED_FILES
