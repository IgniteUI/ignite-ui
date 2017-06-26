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
		define( [
			"jquery"
		], factory );
	} else {
		factory(jQuery);
	}
}
(function ($) {
    $.ig = $.ig || {};

	    $.ig.Scroll = {};

	    $.extend($.ig.Scroll, {
		    locale: {
		        errorNoElementLink: 'Связанный элемент не найден.',
		        errorNoScrollbarLink: 'Связанный элемент "полоса прокрутки" не найден.'
		    }
	    });

		$.ig.locale = $.ig.locale || {};
		$.ig.locale.ru = $.ig.locale.ru || {};
		$.ig.locale.ru.Scroll = $.extend({}, $.ig.Scroll.locale);
}));// REMOVE_FROM_COMBINED_FILES
