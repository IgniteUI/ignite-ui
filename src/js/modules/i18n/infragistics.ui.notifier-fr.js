/*!@license
* Infragistics.Web.ClientUI Notifier localization resources <build_number>
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
(function($) {
	$.ig = $.ig || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.fr = $.ig.locale.fr || {};
	$.ig.Notifier = $.ig.Notifier || {};
	
	$.ig.locale.fr.Notifier = {
		successMsg: "Réussite",
		errorMsg: "Erreur",
		warningMsg: "Avertissement",
		infoMsg: "Information",
		notSupportedState: "État de notification non pris en charge ! Utilisez un des états pris en charge 'success', 'info', 'warning', 'error'",
		notSupportedMode: "Mode de notification non pris en charge ! Utilisez un des modes pris en charge 'auto', 'popover', 'inline'"
};

$.ig.Notifier.locale = $.ig.Notifier.locale || $.ig.locale.fr.Notifier;
}));// REMOVE_FROM_COMBINED_FILES
