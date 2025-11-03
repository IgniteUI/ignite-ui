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
	$.ig.locale.sv = $.ig.locale.sv || {};
	$.ig.Templating = $.ig.Templating || {};
	
	$.ig.locale.sv.Templating = {
			undefinedArgument: 'Ett fel har inträffat vid försök att hämta egenskapen för datakällan: ',
			noAdvancedTemplating: 'Den avancerade mallmotorn är inte inläst för att hantera {{if}} eller {{each}}. Inkludera modulen "infragistics.templating.advanced.js" för att använda avancerade mallfunktioner.'
	};

	$.ig.Templating.locale = $.ig.Templating.locale || $.ig.locale.sv.Templating;
	return $.ig.locale.sv.Templating;
}));// REMOVE_FROM_COMBINED_FILES
