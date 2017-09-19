/*!@license
* Infragistics.Web.ClientUI Validator localization resources <build_number>
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

    if (!$.ig.Validator) {
	    $.ig.Validator = {
		    locale: {
			    defaultMessage: 'Corrija este campo',
			    selectMessage: 'Seleccione un valor',
			    rangeSelectMessage: 'Seleccione un número de elementos entre {0} como máximo y {1} como mínimo',
			    minSelectMessage: 'Seleccione {0} elementos como mínimo',
			    maxSelectMessage: 'No seleccione más de {0} elementos',
			    rangeLengthMessage: 'Escriba un valor de entre {0} y {1} caracteres',
			    minLengthMessage: 'Escriba {0} caracteres como mínimo',
			    maxLengthMessage: 'No escriba más de {0} caracteres',
			    requiredMessage: 'Este campo es obligatorio',
			    patternMessage: 'La entrada no coincide con el patrón necesario.',
			    maskMessage: 'Rellene todas las posiciones obligatorias',
			    dateFieldsMessage: 'Rellene los campos de fecha',
			    invalidDayMessage: 'Día del mes no válido. Escriba el día correcto',
			    dateMessage: 'Escriba una fecha válida',
			    numberMessage: 'Escriba un número válido',
		        rangeValueMessage: 'Escriba un valor entre {0} y {1}',
		        minValueMessage: 'Escriba un valor mayor o igual a {0}',
		        maxValueMessage: 'Escriba un valor menor o igual a {0}',
		        emailMessage: 'Debe introducirse una dirección de correo electrónico válida.',
				creditCardMessage: 'Debe introducir un número de tarjeta de pago válido.',
		        equalToMessage: 'Los dos valores no coinciden',
		        optionalString: '(opcional)'
		    }
	    };
    }
}));// REMOVE_FROM_COMBINED_FILES
