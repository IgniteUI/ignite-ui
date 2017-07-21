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
    ig = $.ig || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.fr = $.ig.locale.fr || {};
	$.ig.Dialog = $.ig.Dialog || {};
	
	$.ig.locale.fr.Dialog = {
			closeButtonTitle: "Fermer",
			minimizeButtonTitle: "Minimiser",
			maximizeButtonTitle: "Maximiser",
			pinButtonTitle: "Punaiser",
			unpinButtonTitle: "Dépunaiser",
			restoreButtonTitle: "Restaurer",
			setOptionError: "Les modifications de temps d'exécution ne sont pas autorisées pour l'option suivante : "
	};
	
	$.ig.Dialog.locale = $.ig.Dialog.locale || $.ig.locale.fr.Dialog;
	return $.ig.locale.fr.Dialog;
}));// REMOVE_FROM_COMBINED_FILES
