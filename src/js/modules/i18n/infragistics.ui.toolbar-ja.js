/*!@license
* Infragistics.Web.ClientUI Toolbar localization resources <build_number>
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

    $.ig.Toolbar = {};

    $.extend($.ig.Toolbar, {

		locale: {
			collapseButtonTitle: '縮小:',
			expandButtonTitle: '展開:'
		}

	});
	
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.ja = $.ig.locale.ja || {};
	$.ig.locale.ja.Toolbar = $.extend({}, $.ig.Toolbar.locale);
}));// REMOVE_FROM_COMBINED_FILES
