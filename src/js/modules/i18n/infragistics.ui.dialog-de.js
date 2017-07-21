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
	$.ig.locale.de = $.ig.locale.de || {};
	$.ig.Dialog = $.ig.Dialog || {};
	
	$.ig.locale.de.Dialog = {
			closeButtonTitle: "Schließen",
			minimizeButtonTitle: "Minimieren",
			maximizeButtonTitle: "Maximieren",
			pinButtonTitle: "Anheften",
			unpinButtonTitle: "Lösen",
			restoreButtonTitle: "Wiederherstellen",
			setOptionError: 'Laufzeit-Änderungen sind für die folgende Option nicht zugelassen: '
	};
		
	$.ig.Dialog.locale = $.ig.Dialog.locale || $.ig.locale.de.Dialog;
	return $.ig.locale.de.Dialog;
}));// REMOVE_FROM_COMBINED_FILES
