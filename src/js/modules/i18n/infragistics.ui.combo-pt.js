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
		define( ["jquery"], factory );
	} else {
		return factory(jQuery);
	}
}
(function ($) {
	$.ig = $.ig || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.pt = $.ig.locale.pt || {};
	$.ig.Combo = $.ig.Combo || {};
	
	$.ig.locale.pt.Combo = {
			noMatchFoundText: 'Nenhuma correspondência encontrada',
			dropDownButtonTitle: 'Mostrar lista pendente',
			clearButtonTitle: 'Limpar valor',
			placeHolder: 'selecionar...',
			notSuported: 'A operação não é suportada.',
			errorNoSupportedTextsType: "É necessário um texto de filtragem diferente. Forneça um valor que seja uma cadeia ou uma matriz de cadeias.",
			errorUnrecognizedHighlightMatchesMode: "É necessário um modo de correspondências de realce diferente. Escolha um valor entre 'multi', 'contains', 'startsWith', 'full' e 'null'.",
			errorIncorrectGroupingKey: "A chave de agrupamento não está correta."
	};

	$.ig.Combo.locale = $.ig.Combo.locale || $.ig.locale.pt.Combo;
	return $.ig.locale.pt.Combo;
}));// REMOVE_FROM_COMBINED_FILES
