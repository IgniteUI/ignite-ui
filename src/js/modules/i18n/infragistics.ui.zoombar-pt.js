/*!@license
* Infragistics.Web.ClientUI Zoombar localization resources <build_number>
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
	$.ig.Zoombar = $.ig.Zoombar || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.pt = $.ig.locale.pt || {};

	$.ig.locale.pt.Zoombar = {
				zoombarTargetNotSpecified: "O igZoombar requer um destino válido para o qual ligar!",
				zoombarTypeNotSupported: "O tipo de widget ao qual a barra de zoom se está a tentar ligar não é suportado!",
				zoombarProviderNotRecognized: "O igZoombar não pôde inicializar um fornecedor a partir da classe especificada ou o valor passado não é uma classe.",
				optionChangeNotSupported: "Não é possível alterar a seguinte opção após a criação do igZoombar:"
	}

	$.ig.Zoombar.locale = $.ig.Zoombar.locale || $.ig.locale.pt.Zoombar;
	return $.ig.locale.pt.Zoombar;
}));// REMOVE_FROM_COMBINED_FILES
