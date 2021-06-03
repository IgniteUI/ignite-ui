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
		define( ["jquery"], factory );
	} else {
		return factory(jQuery);
	}
}
(function ($) {
	$.ig = $.ig || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.pt = $.ig.locale.pt || {};
	$.ig.Dialog = $.ig.Dialog || {};
	
	$.ig.locale.pt.Dialog = {
			closeButtonTitle: "Fechar",
			minimizeButtonTitle: "Minimizar",
			maximizeButtonTitle: "Maximizar",
			pinButtonTitle: "Fixar",
			unpinButtonTitle: "Desafixar",
			restoreButtonTitle: "Restaurar",
			setOptionError: 'As alterações ao tempo de execução não são permitidas para a seguinte opção: '
	};

	$.ig.Dialog.locale = $.ig.Dialog.locale || $.ig.locale.pt.Dialog;
	return $.ig.locale.pt.Dialog;
}));// REMOVE_FROM_COMBINED_FILES
