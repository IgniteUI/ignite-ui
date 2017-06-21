/*!@license
* Infragistics.Web.ClientUI Splitter localization resources <build_number>
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

	$.ig.Splitter = {};

	$.extend($.ig.Splitter, {
		locale: {
		    errorPanels: 'El número de paneles no puede ser superior a dos.',
		    errorSettingOption: 'Error al ajustar la opción.'
		}
	});

		$.ig.locale = $.ig.locale || {};
		$.ig.locale.es = $.ig.locale.es || {};
		$.ig.locale.es.Splitter = $.extend({}, $.ig.Splitter.locale);
}));// REMOVE_FROM_COMBINED_FILES
