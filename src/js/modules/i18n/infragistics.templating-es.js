/*!@license
* Infragistics.Web.ClientUI templating localization resources <build_number>
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

	$.ig.Templating = {};

	$.extend($.ig.Templating, {
		locale: {
			undefinedArgument: 'Se ha producido un error al intentar recuperar las propiedades del origen de datos: '
		}
	});

	$.ig.locale = $.ig.locale || {};
	$.ig.locale.es = $.ig.locale.es || {};
	$.ig.locale.es.Templating = $.extend({}, $.ig.Templating.locale);
}));// REMOVE_FROM_COMBINED_FILES
