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
			closeButtonTitle: "Schließen",
			minimizeButtonTitle: "Minimieren",
			maximizeButtonTitle: "Maximieren",
			pinButtonTitle: "Anheften",
			unpinButtonTitle: "Lösen",
			restoreButtonTitle: "Wiederherstellen",
			setOptionError: 'Laufzeit-Änderungen sind für die folgende Option nicht zugelassen: '
		}
	};
		
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.de = $.ig.locale.de || {};
	$.ig.locale.de.Dialog = $.extend({}, $.ig.Dialog.locale);
}));// REMOVE_FROM_COMBINED_FILES
