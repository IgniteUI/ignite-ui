﻿/*!@license
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
	$.ig.locale.da = $.ig.locale.da || {};
	$.ig.Dialog = $.ig.Dialog || {};
	
	$.ig.locale.da.Dialog = {
			closeButtonTitle: "Close",
			minimizeButtonTitle: "Minimize",
			maximizeButtonTitle: "Maximize",
			pinButtonTitle: "Pin",
			unpinButtonTitle: "Unpin",
			restoreButtonTitle: "Restore",
			setOptionError: 'Runtime changes are not allowed for the following option: '
	};

	$.ig.Dialog.locale = $.ig.Dialog.locale || $.ig.locale.da.Dialog;
	return $.ig.locale.da.Dialog;
}));// REMOVE_FROM_COMBINED_FILES
