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
	$.ig.locale.nl = $.ig.locale.nl || {};

    $.ig.locale.nl.Toolbar = {
			collapseButtonTitle: '{0} samenvouwen',
			expandButtonTitle: '{0} uitvouwen'
	}
		
	$.ig.Toolbar.locale = $.ig.Toolbar.locale || $.ig.locale.nl.Toolbar;
	return $.ig.locale.nl.Toolbar;
}));// REMOVE_FROM_COMBINED_FILES
