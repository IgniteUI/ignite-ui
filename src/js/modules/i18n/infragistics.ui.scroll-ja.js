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
		        errorNoElementLink: 'リンクされている要素が存在しません。',
		        errorNoScrollbarLink: 'リンクされているスクロールバー要素が存在しません。'
		    }
	    });

		$.ig.locale = $.ig.locale || {};
		$.ig.locale.ja = $.ig.locale.ja || {};
		$.ig.locale.ja.Scroll = $.extend({}, $.ig.Scroll.locale);
}));// REMOVE_FROM_COMBINED_FILES
