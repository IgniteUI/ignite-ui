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
	$.ig.locale.sv = $.ig.locale.sv || {};
	$.ig.Dialog = $.ig.Dialog || {};
	
	$.ig.locale.sv.Dialog = {
			closeButtonTitle: "Stäng",
			minimizeButtonTitle: "Minimera",
			maximizeButtonTitle: "Maximera",
			pinButtonTitle: "Nåla",
			unpinButtonTitle: "Lossa",
			restoreButtonTitle: "Återställ",
			setOptionError: 'Runtime-ändringar är inte tillåtna för följande alternativ: '
	};

	$.ig.Dialog.locale = $.ig.Dialog.locale || $.ig.locale.sv.Dialog;
	return $.ig.locale.sv.Dialog;
}));// REMOVE_FROM_COMBINED_FILES
