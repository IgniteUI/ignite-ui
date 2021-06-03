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
		define( ["jquery"], factory );
	} else {
		return factory(jQuery);
	}
}
(function ($) {
	$.ig = $.ig || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.pl = $.ig.locale.pl || {};
	$.ig.Notifier = $.ig.Notifier || {};
	
	$.ig.locale.pl.Notifier = {
		successMsg: "Powodzenie",
		errorMsg: "Błąd",
		warningMsg: "Ostrzeżenie",
		infoMsg: "Informacja",
		notSupportedState: "Nieobsługiwany stan powiadomienia! Użyj jednego z obsługiwanych stanów: 'success', 'info', 'warning', 'error'",
		notSupportedMode: "Nieobsługiwany tryb powiadamiania! Użyj jednego z obsługiwanych trybów: 'auto', 'popover', 'inline'"
};

$.ig.Notifier.locale = $.ig.Notifier.locale || $.ig.locale.pl.Notifier;
return $.ig.locale.pl.Notifier;
}));// REMOVE_FROM_COMBINED_FILES
