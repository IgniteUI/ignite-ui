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
		define( [
			"jquery"
		], factory );
	} else {
		factory(jQuery);
	}
}
(function ($) {
    $.ig = $.ig || {};

	$.ig.Dialog = {
		locale: {
			closeButtonTitle: "Fermer",
			minimizeButtonTitle: "Minimiser",
			maximizeButtonTitle: "Maximiser",
			pinButtonTitle: "Punaiser",
			unpinButtonTitle: "Dépunaiser",
			restoreButtonTitle: "Restaurer",
			setOptionError: "Les modifications de temps d'exécution ne sont pas autorisées pour l'option suivante : "
		}
	};
	
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.fr = $.ig.locale.fr || {};
	$.ig.locale.fr.Dialog = $.extend({}, $.ig.Dialog.locale);
}));// REMOVE_FROM_COMBINED_FILES
