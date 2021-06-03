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
	$.ig.locale.cs = $.ig.locale.cs || {};
	$.ig.Dialog = $.ig.Dialog || {};
	
	$.ig.locale.cs.Dialog = {
			closeButtonTitle: "Zavřít",
			minimizeButtonTitle: "Minimalizovat",
			maximizeButtonTitle: "Maximalizovat",
			pinButtonTitle: "Kolík",
			unpinButtonTitle: "Odepnout",
			restoreButtonTitle: "Obnovit",
			setOptionError: 'Změny za běhu nejsou povoleny pro následující možnost: '
	};

	$.ig.Dialog.locale = $.ig.Dialog.locale || $.ig.locale.cs.Dialog;
	return $.ig.locale.cs.Dialog;
}));// REMOVE_FROM_COMBINED_FILES
