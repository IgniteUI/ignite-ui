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
		return factory(jQuery);
	}
}
(function ($) {
		$ = $ || {};
		$.ig = $.ig || {};
		$.ig.Scroll = $.ig.Scroll || {};
		$.ig.locale = $.ig.locale || {};
		$.ig.locale.ja = $.ig.locale.ja || {};

	    $.ig.locale.ja.Scroll = {
		        errorNoElementLink: 'リンクされている要素が存在しません。',
		        errorNoScrollbarLink: 'リンクされているスクロールバー要素が存在しません。'
		    }
			
		$.ig.Scroll.locale = $.ig.Scroll.locale || $.ig.locale.ja.Scroll;
		return $.ig.locale.ja.Scroll;
}));// REMOVE_FROM_COMBINED_FILES
