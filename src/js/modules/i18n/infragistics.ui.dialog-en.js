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

    if (!$.ig.Dialog) {
	    $.ig.Dialog = {
		    locale: {
			    closeButtonTitle: "Close",
			    minimizeButtonTitle: "Minimize",
			    maximizeButtonTitle: "Maximize",
			    pinButtonTitle: "Pin",
			    unpinButtonTitle: "Unpin",
			    restoreButtonTitle: "Restore",
				setOptionError: 'Runtime changes are not allowed for the following option: '
		    }
	    };
    }
}));// REMOVE_FROM_COMBINED_FILES
