/*!@license
* Infragistics.Web.ClientUI Rating localization resources <build_number>
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

	$.ig.Rating = {};

	$.extend($.ig.Rating, {
		locale: {
			setOptionError: 'Стойността на следната опция не може да бъде променяна след инициализация: '
		}
	});

	$.ig.locale = $.ig.locale || {};
	$.ig.locale.bg = $.ig.locale.bg || {};
	$.ig.locale.bg.Rating = $.extend({}, $.ig.Rating.locale);
}));// REMOVE_FROM_COMBINED_FILES
