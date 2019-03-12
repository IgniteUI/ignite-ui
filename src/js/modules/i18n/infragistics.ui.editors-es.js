﻿/*!@license
* Infragistics.Web.ClientUI Editors localization resources <build_number>
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
		return factory(jQuery);
	}
}
(function ($) {
	$.ig = $.ig || {};
	$.ig.Editor = $.ig.Editor || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.es = $.ig.locale.es || {};

	$.ig.locale.es.Editor = {
			spinUpperTitle: 'Incrementar',
			spinLowerTitle: 'Reducir',
			buttonTitle: 'Mostrar lista',
			clearTitle: 'Borrar valor',
			ariaTextEditorFieldLabel: 'Editor de texto',
			ariaNumericEditorFieldLabel: 'Editor numérico',
			ariaCurrencyEditorFieldLabel: 'Editor de moneda',
			ariaPercentEditorFieldLabel: 'Editor de porcentaje',
			ariaMaskEditorFieldLabel: 'Editor de máscara',
			ariaDateEditorFieldLabel: 'Editor de fecha',
			ariaDatePickerFieldLabel: 'Selector de fecha',
			ariaTimePickerFieldLabel: 'Selector de hora',
			ariaSpinUpButton: 'Incrementar',
			ariaSpinDownButton: 'Reducir',
			ariaDropDownButton: 'Desplegar',
			ariaClearButton: 'Borrar',
			ariaCalendarButton: 'Calendario',
			datePickerButtonTitle: 'Mostrar calendario',
			updateModeUnsupportedValue: 'La opción updateMode admite dos valores posibles: "onChange" e "immediate"',
			updateModeNotSupported: 'La propiedad updateMode solo es compatible con el modo "onchange" para las extensiones igMaskEditor, igDateEditor y igDatePicker',
			renderErrMsg: "No se puede instalar un editor de base directamente. Inténtelo con un editor de texto, numérico, de fecha u otro editor.",
			multilineErrMsg: 'textArea requiere una configuración diferente. textMode debería ajustarse a "multiline".',
			targetNotSupported: "Este elemento de origen no se admite.",
			placeHolderNotSupported: "Su navegador no admite el atributo de campo de comodín.",
			allowedValuesMsg: "Elija un valor de la lista desplegable.",
			maxLengthErrMsg: "La entrada es demasiado larga y se ha acortado en {0} símbolos.",
			maxLengthWarningMsg: "La entrada ha llegado a la longitud máxima de {0} para este campo",
			minLengthErrMsg: "Deben introducirse al menos {0} caracteres.",
			maxValErrMsg: "La entrada ha alcanzado el valor máximo de {0} para este campo.",
			minValErrMsg: "La entrada ha alcanzado el valor mínimo de {0} para este campo.",
			maxValExceedRevertErrMsg: "La entrada ha superado el valor máximo de {0} y se ha vuelto a la anterior.",
			minValExceedRevertErrMsg: "La entrada es inferior al valor mínimo de {0} y ha vuelto al valor anterior",
			maxValExceedSetErrMsg: "La entrada ha superado el valor máximo de {0} y se ha ajustado al valor máximo.",
			minValExceedSetErrMsg: "La entrada es inferior al valor mínimo de {0} y se ha ajustado al valor mínimo.",
			maxValExceededWrappedAroundErrMsg: "La entrada ha superado el valor máximo de {0} y se ha ajustado al mínimo permitido.",
			minValExceededWrappedAroundErrMsg: "La entrada es inferior al valor mínimo de {0} y se ha ajustado en el valor máximo permitido",
			btnValueNotSupported: 'Se requiere un valor de botón diferente. Elija un valor entre "dropdown", "clear" y "spin".',
			scientificFormatErrMsg: 'Se requiere un scientificFormat diferente. Elija un valor entre "E", "e", "E+" y "e+".',
			spinDeltaIsOfTypeNumber: "Se requiere un tipo de spinDelta diferente. Debe introducirse un número positivo.",
			spinDeltaIsOfTypeNumberForPeriod: "Se requiere un tipo de spinDelta diferente para {0}. Debe introducirse un número positivo entre {1} y {2}.",
			spinDeltaIsOfTypeNumberOrObject: "Se requiere un tipo de spinDelta diferente. Debe introducirse un número positivo o un objeto que defina unos deltas de tiempo diferentes.",
			spinDeltaShouldBeInRange: "La opción spinDelta para {0} debe estar entre {1} y {2}",
			spinDeltaCouldntBeNegative: "La opción spinDelta no puede ser negativa. Debe introducirse un número positivo.",
			spinDeltaContainsExceedsMaxDecimals: "El número de fracciones máximo permitido para spinDelta está establecido en {0}. Cambie MaxDecimals o bien intente reducir su valor.",
			spinDeltaIncorrectFloatingPoint: 'Un punto flotante spinDelta requiere una configuración diferente. Configure dataMode del editor a "double" o "float" o configure spinDelta a un valor entero.',
			notEditableOptionByInit: "Esta opción no puede editarse tras la inicialización. Su valor debe establecerse durante la inicialización.",
			numericEditorNoSuchMethod: "El editor numérico no admite este método.",
			numericEditorNoSuchOption: "El editor numérico no es compatible con esta opción.",
			displayFactorIsOfTypeNumber: "displayFactor requiere un valor diferente. Su valor debe establecerse con un número entre 1 o 100.",
			displayFactorAllowedValue: "displayFactor requiere un valor diferente. Su valor debe establecerse con un número entre 1 o 100.",
			instantiateCheckBoxErrMsg: "igCheckboxEditor requiere un elemento diferente. Utilice los elementos INPUT, SPAN o DIV.",
			cannotParseNonBoolValue: "igCheckboxEditor requiere un valor diferente. Debe proporcionarse un valor booleano.",
			cannotSetNonBoolValue: "igCheckboxEditor requiere un valor diferente. Debe proporcionarse un valor booleano.",
			maskEditorNoSuchMethod: "El editor de máscaras no admite este método.",
			datePickerEditorNoSuchMethod: "El editor de fechas no admite este método.",
			datePickerNoSuchMethodDropDownContainer: "El editor de fechas no admite este método. En su lugar, utilice 'getCalendar' uno.",
			buttonTypeIsDropDownOnly: "Datepicker sólo admite valores de desplegar menú y de borrar para la opción buttonType.",
			dateEditorOffsetRange: "La opción displayTimeOffset debe estar entre -720 y 840, lo que representa el intervalo en minutos, según el UTC, de todas las zonas horarias desde el extremo oeste (-12:00) hasta el extremo este (+14:00).",
			cannotSetRuntime: "Esta opción no puede establecer un tiempo de ejecución",
			invalidDate: "Fecha no válida",
			maskMessage: 'Deben rellenarse todas las posiciones requeridas.',
			maskRevertMessage: 'Deben rellenarse todas las posiciones requeridas. Por eso el valor ha vuelto al último valor válido.',
			dateMessage: 'Debe introducirse una fecha válida',
			centuryThresholdValidValues: "La propiedad centuryThreshold debería estar entre 0 y 99.",
			noListItemsNoButton: "No se representa ningún botón desplegable o de control de número porque no hay elementos de lista.",
			decimalNumber: "Cuando dataMode es '{0}', la opción {1} puede aceptar valores numéricos entre 0 y {2}.",
			decimalSeparatorErrorMsg: "La opción decimalSeparator requiere un valor diferente. Su valor debe ser un carácter individual.",
			decimalSeparatorEqualsGroupSeparatorErrorMsg: "Las opciones groupSeparator y decimalSeparator no pueden tener valores iguales.",
			timePickerNoSuchMethod: "El selector de hora no admite este método."
	};

	$.ig.Editor.locale = $.ig.Editor.locale || $.ig.locale.es.Editor;
	return $.ig.locale.es.Editor;
}));// REMOVE_FROM_COMBINED_FILES
