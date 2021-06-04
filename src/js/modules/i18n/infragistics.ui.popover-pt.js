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
		define( ["jquery"], factory );
	} else {
		return factory(jQuery);
	}
}
(function ($) {
	$.ig = $.ig || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.pt = $.ig.locale.pt || {};
	$.ig.Popover = $.ig.Popover || {};
	
	$.ig.locale.pt.Popover = {
		popoverOptionChangeNotSupported: "Não é possível alterar a seguinte opção após a inicialização do igPopover:",
		popoverShowMethodWithoutTarget: "O parâmetro alvo da função mostrar é obrigatório quando a opção seletores é usada"
	};

$.ig.Popover.locale = $.ig.Popover.locale || $.ig.locale.pt.Popover;
return $.ig.locale.pt.Popover;
}));// REMOVE_FROM_COMBINED_FILES
