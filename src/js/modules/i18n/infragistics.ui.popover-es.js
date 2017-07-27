/*!@license
* Infragistics.Web.ClientUI Popover localization resources <build_number>
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
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.es = $.ig.locale.es || {};
	$.ig.Popover = $.ig.Popover || {};
	
	$.ig.locale.es.Popover = {
		popoverOptionChangeNotSupported: "No se admite el cambio de la siguiente opción después de inicializar igPopover:",
		popoverShowMethodWithoutTarget: "El parámetro target de la función show es obligatorio cuando se utiliza la opción selectors"
	};

$.ig.Popover.locale = $.ig.Popover.locale || $.ig.locale.es.Popover;
}));// REMOVE_FROM_COMBINED_FILES
