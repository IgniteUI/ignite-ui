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
		define( [], factory );
	} else {
		return factory();
	}
}
(function () {
	$ = $ || {};
    $.ig = $.ig || {};
	$.ig.Splitter = $.ig.Splitter || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.es = $.ig.locale.es || {};

	 $.ig.locale.es.Splitter = {
		    errorPanels: 'El número de paneles no puede ser superior a dos.',
		    errorSettingOption: 'Error al ajustar la opción.'
	}
	
	$.ig.Splitter.locale = $.ig.Splitter.locale || $.ig.locale.es.Splitter;
	return $.ig.locale.es.Splitter;
}));// REMOVE_FROM_COMBINED_FILES
