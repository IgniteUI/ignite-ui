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
		define( [], factory );
	} else {
		factory();
	}
}
(function() {
	ig = $.ig || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.de = $.ig.locale.de || {};
	$.ig.Notifier = $.ig.Notifier || {};
	
	$.ig.locale.de.Notifier = {
		successMsg: "Erfolgreich",
		errorMsg: "Fehler",
		warningMsg: "Warnung",
		infoMsg: "Informationen",
		notSupportedState: "Benachrichtigungsstatus wird nicht unterstützt! Verwenden Sie einen der unterstützten Status 'success', 'info', 'warning', 'error'",
		notSupportedMode: "Benachrichtigungsmodus wird nicht unterstützt! Verwenden Sie einen der unterstützten Modi 'auto', 'popover', 'inline'"
};

$.ig.Notifier.locale = $.ig.Notifier.locale || $.ig.locale.de.Notifier;
return $.ig.locale.de.Notifier;
}));// REMOVE_FROM_COMBINED_FILES
