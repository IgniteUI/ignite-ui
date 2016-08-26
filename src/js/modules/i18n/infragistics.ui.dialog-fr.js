/*!@license
* Infragistics.Web.ClientUI Dialog localization resources <build_number>
*
* Copyright (c) 2011-<year> Infragistics Inc.
*
* http://www.infragistics.com/
*
*/

/*global jQuery */
(function (factory) {
	if (typeof define === "function" && define.amd) {
		define( ["jquery"], factory );
	} else {
		factory(jQuery);
	}
}(function ($) {
    $.ig = $.ig || {};

    if (!$.ig.Dialog) {
	    $.ig.Dialog = {
		    locale: {
			    closeButtonTitle: "Fermer",
			    minimizeButtonTitle: "Minimiser",
			    maximizeButtonTitle: "Maximiser",
			    pinButtonTitle: "Punaiser",
			    unpinButtonTitle: "Dépunaiser",
			    restoreButtonTitle: "Restaurer"
		    }
	    };
    }
}));