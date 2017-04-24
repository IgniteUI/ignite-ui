/*!@license
* Infragistics.Web.ClientUI Combo localization resources <build_number>
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

    if (!$.ig.Combo) {
	    $.ig.Combo = {
		    locale: {
		        noMatchFoundText: 'No hay resultados',
		        dropDownButtonTitle: 'Mostrar lista desplegable',
		        clearButtonTitle: 'Borrar valor',
		        placeHolder: 'seleccionar...',
		        notSuported: 'Esta operación no se admite.',
		        errorNoSupportedTextsType: "Se requiere un texto de filtrado diferente. Proporcione un valor que sea o una cadena o una matriz de cadenas.",
			    errorUnrecognizedHighlightMatchesMode: 'Se requiere un modo de resaltado de coincidencias diferente. Elija un valor entre "multi", "contains", "startsWith", "full" y "null".',
			    errorIncorrectGroupingKey: "La clave de agrupamiento no es correcta."
		    }
	    };
    }
}));// REMOVE_FROM_COMBINED_FILES
