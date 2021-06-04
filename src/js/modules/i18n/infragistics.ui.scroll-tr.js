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
		$.ig.locale.tr = $.ig.locale.tr || {};

	    $.ig.locale.tr.Scroll = {
		        errorNoElementLink: 'Bağlanan öğe mevcut değil.',
		        errorNoScrollbarLink: 'Bağlanan kaydırma çubuğu öğesi mevcut değil.'
		}

		$.ig.Scroll.locale = $.ig.Scroll.locale || $.ig.locale.tr.Scroll;
		return $.ig.locale.tr.Scroll;
}));// REMOVE_FROM_COMBINED_FILES
