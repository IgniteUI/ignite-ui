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
	$.ig.locale.tr = $.ig.locale.tr || {};

    $.ig.locale.tr.Toolbar = {
			collapseButtonTitle: '{0} daralt',
			expandButtonTitle: '{0} genişlet'
	}
		
	$.ig.Toolbar.locale = $.ig.Toolbar.locale || $.ig.locale.tr.Toolbar;
	return $.ig.locale.tr.Toolbar;
}));// REMOVE_FROM_COMBINED_FILES
