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
		factory(jQuery);
	}
}
(function ($) {
	$.ig = $.ig || {};
	$.ig.Toolbar = $.ig.Toolbar || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.en = $.ig.locale.en || {};

    $.ig.locale.en.Toolbar = {
			collapseButtonTitle: 'Collapse {0}',
			expandButtonTitle: 'Expand {0}'
	}
		
	$.ig.Toolbar.locale = $.ig.Toolbar.locale || $.ig.locale.en.Toolbar;
	return $.ig.locale.en.Toolbar;
}));// REMOVE_FROM_COMBINED_FILES
