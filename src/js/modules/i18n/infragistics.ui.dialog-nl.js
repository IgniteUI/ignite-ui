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
	$.ig.locale.nl = $.ig.locale.nl || {};
	$.ig.Dialog = $.ig.Dialog || {};
	
	$.ig.locale.nl.Dialog = {
			closeButtonTitle: "Sluiten",
			minimizeButtonTitle: "Minimaliseren",
			maximizeButtonTitle: "Maximaliseren",
			pinButtonTitle: "Vastmaken",
			unpinButtonTitle: "Losmaken",
			restoreButtonTitle: "Herstellen",
			setOptionError: 'Runtime-wijzigingen zijn niet toegestaan voor de volgende optie: '
	};

	$.ig.Dialog.locale = $.ig.Dialog.locale || $.ig.locale.nl.Dialog;
	return $.ig.locale.nl.Dialog;
}));// REMOVE_FROM_COMBINED_FILES
