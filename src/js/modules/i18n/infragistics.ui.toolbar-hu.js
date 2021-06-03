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
	$.ig.locale.hu = $.ig.locale.hu || {};

    $.ig.locale.hu.Toolbar = {
			collapseButtonTitle: '{0} összecsukása',
			expandButtonTitle: '{0} kibontása'
	}
		
	$.ig.Toolbar.locale = $.ig.Toolbar.locale || $.ig.locale.hu.Toolbar;
	return $.ig.locale.hu.Toolbar;
}));// REMOVE_FROM_COMBINED_FILES
