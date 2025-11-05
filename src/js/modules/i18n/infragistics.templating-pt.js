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
		return factory(jQuery);
	}
}
(function ($) {
	$.ig = $.ig || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.pt = $.ig.locale.pt || {};
	$.ig.Templating = $.ig.Templating || {};
	
	$.ig.locale.pt.Templating = {
			undefinedArgument: 'Ocorreu um erro ao tentar recuperar a propriedade da origem de dados: ',
			noAdvancedTemplating: 'O motor de modelos avançado não está carregado para processar {{if}} ou {{each}}. Inclua o módulo "infragistics.templating.advanced.js" para utilizar funcionalidades avançadas de modelação.'
	};

	$.ig.Templating.locale = $.ig.Templating.locale || $.ig.locale.pt.Templating;
	return $.ig.locale.pt.Templating;
}));// REMOVE_FROM_COMBINED_FILES
