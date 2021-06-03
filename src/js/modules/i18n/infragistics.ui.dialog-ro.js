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
	$.ig.locale.ro = $.ig.locale.ro || {};
	$.ig.Dialog = $.ig.Dialog || {};
	
	$.ig.locale.ro.Dialog = {
			closeButtonTitle: "Închide",
			minimizeButtonTitle: "Minimizează",
			maximizeButtonTitle: "Maximizează",
			pinButtonTitle: "Fixați",
			unpinButtonTitle: "Anulați fixarea",
			restoreButtonTitle: "Restabili",
			setOptionError: 'Modificările în timpul rulării nu sunt permise pentru următoarea opțiune: '
	};

	$.ig.Dialog.locale = $.ig.Dialog.locale || $.ig.locale.ro.Dialog;
	return $.ig.locale.ro.Dialog;
}));// REMOVE_FROM_COMBINED_FILES
