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

	if (!$.ig.Templating) {
		$.ig.Templating = {};

		$.extend($.ig.Templating, {
			locale: {
				undefinedArgument: 'Se ha producido un error al intentar recuperar las propiedades del origen de datos: '
			}
		});
	}
}));// REMOVE_FROM_COMBINED_FILES
