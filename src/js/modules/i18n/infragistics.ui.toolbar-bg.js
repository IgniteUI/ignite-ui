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
			collapseButtonTitle: 'Прибери',
			expandButtonTitle: 'Отвори'
		}

	});
	
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.bg = $.ig.locale.bg || {};
	$.ig.locale.bg.Toolbar = $.extend({}, $.ig.Toolbar.locale);
}));// REMOVE_FROM_COMBINED_FILES
