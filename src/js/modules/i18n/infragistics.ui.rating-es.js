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
			setOptionError: 'Los cambios en el tiempo de ejecución no están permitidos para la siguiente opción: '
		}
	});

	$.ig.locale = $.ig.locale || {};
	$.ig.locale.es = $.ig.locale.es|| {};
	$.ig.locale.es.Rating = $.extend({}, $.ig.Rating.locale);
}));// REMOVE_FROM_COMBINED_FILES
