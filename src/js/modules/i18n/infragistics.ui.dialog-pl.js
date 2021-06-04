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
	$.ig.locale.pl = $.ig.locale.pl || {};
	$.ig.Dialog = $.ig.Dialog || {};
	
	$.ig.locale.pl.Dialog = {
			closeButtonTitle: "Zamknij",
			minimizeButtonTitle: "Zminimalizuj",
			maximizeButtonTitle: "Zmaksymalizuj",
			pinButtonTitle: "Przypnij",
			unpinButtonTitle: "Odepnij",
			restoreButtonTitle: "Przywróć",
			setOptionError: 'Zmiany w trakcie wykonywania są niedozwolone w przypadku następującej opcji: '
	};

	$.ig.Dialog.locale = $.ig.Dialog.locale || $.ig.locale.pl.Dialog;
	return $.ig.locale.pl.Dialog;
}));// REMOVE_FROM_COMBINED_FILES
