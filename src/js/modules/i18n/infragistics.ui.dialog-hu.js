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
	$.ig.locale.hu = $.ig.locale.hu || {};
	$.ig.Dialog = $.ig.Dialog || {};
	
	$.ig.locale.hu.Dialog = {
			closeButtonTitle: "Bezárás",
			minimizeButtonTitle: "Kis méret",
			maximizeButtonTitle: "Teljes méret",
			pinButtonTitle: "Rögzítés",
			unpinButtonTitle: "Rögzítés feloldása",
			restoreButtonTitle: "Visszaállítás",
			setOptionError: 'A következő opció esetében nem engedélyezettek a futásidejű változtatások: '
	};

	$.ig.Dialog.locale = $.ig.Dialog.locale || $.ig.locale.hu.Dialog;
	return $.ig.locale.hu.Dialog;
}));// REMOVE_FROM_COMBINED_FILES
