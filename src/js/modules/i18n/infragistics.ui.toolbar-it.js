/*!@license
* Infragistics.Web.ClientUI Toolbar localization resources <build_number>
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
	$.ig.Toolbar = $.ig.Toolbar || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.it = $.ig.locale.it || {};

    $.ig.locale.it.Toolbar = {
			collapseButtonTitle: 'Comprimi {0}',
			expandButtonTitle: 'Espandi {0}'
	}
		
	$.ig.Toolbar.locale = $.ig.Toolbar.locale || $.ig.locale.it.Toolbar;
	return $.ig.locale.it.Toolbar;
}));// REMOVE_FROM_COMBINED_FILES
