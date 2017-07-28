/*!@license
* Infragistics.Web.ClientUI Dialog localization resources <build_number>
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
		factory();
	}
}
(function () {
	$ = $ || {};
	$.ig = $.ig || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.es = $.ig.locale.es || {};
	$.ig.Dialog = $.ig.Dialog || {};
	
	$.ig.locale.es.Dialog = {
			closeButtonTitle: "Cerrar",
			minimizeButtonTitle: "Minimizar",
			maximizeButtonTitle: "Maximizar",
			pinButtonTitle: "Anclar",
			unpinButtonTitle: "Desanclar",
			restoreButtonTitle: "Restaurar",
			setOptionError: 'Los cambios en el tiempo de ejecución no están permitidos para la siguiente opción: '
	};

	$.ig.Dialog.locale = $.ig.Dialog.locale || $.ig.locale.es.Dialog;
	return $.ig.locale.es.Dialog;
}));// REMOVE_FROM_COMBINED_FILES
