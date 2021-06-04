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
	$.ig.locale.hu = $.ig.locale.hu || {};
	$.ig.Notifier = $.ig.Notifier || {};
	
	$.ig.locale.hu.Notifier = {
		successMsg: "Sikeres",
		errorMsg: "Hiba",
		warningMsg: "Figyelmeztetés",
		infoMsg: "Információ",
		notSupportedState: "Nem támogatott értesítési állapot! Használja a támogatott állapotok egyikét (success', 'info', 'warning', 'error')",
		notSupportedMode: "Nem támogatott értesítési mód! Használja a támogatott módok egyikét ('auto', 'popover', 'inline')"
};

$.ig.Notifier.locale = $.ig.Notifier.locale || $.ig.locale.hu.Notifier;
return $.ig.locale.hu.Notifier;
}));// REMOVE_FROM_COMBINED_FILES
