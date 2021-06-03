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
	$.ig.locale.da = $.ig.locale.da || {};
	$.ig.Notifier = $.ig.Notifier || {};
	
	$.ig.locale.da.Notifier = {
		successMsg: "Succes",
		errorMsg: "Fejl",
		warningMsg: "Advarsel",
		infoMsg: "Information",
		notSupportedState: "Ikke understøttet underretningstilstand! Brug en af de understøttede tilstande 'success', 'info', 'warning', 'error'",
		notSupportedMode: "Ikke understøttet underretningstilstand! Brug en af de understøttede tilstande 'auto', 'popover', 'inline'"
};

$.ig.Notifier.locale = $.ig.Notifier.locale || $.ig.locale.da.Notifier;
return $.ig.locale.da.Notifier;
}));// REMOVE_FROM_COMBINED_FILES
