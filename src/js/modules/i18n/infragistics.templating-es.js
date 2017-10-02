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
		define( ["jquery"], factory );
	} else {
		factory(jQuery);
	}
}
(function ($) {
	$.ig = $.ig || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.es = $.ig.locale.es || {};
	$.ig.Templating = $.ig.Templating || {};
	
	$.ig.locale.es.Templating = {
			undefinedArgument: 'Se ha producido un error al intentar recuperar las propiedades del origen de datos: '
	};

	$.ig.Templating.locale = $.ig.Templating.locale || $.ig.locale.es.Templating;
	return $.ig.locale.es.Templating;
}));// REMOVE_FROM_COMBINED_FILES
