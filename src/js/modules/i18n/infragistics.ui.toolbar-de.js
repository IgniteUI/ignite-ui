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
	$.ig.locale.de = $.ig.locale.de || {};

	$.ig.locale.de.Toolbar = {
			collapseButtonTitle: 'Reduzieren {0}',
			expandButtonTitle: 'Erweitern {0}'
	}
	
	$.ig.Toolbar.locale = $.ig.Toolbar.locale || $.ig.locale.de.Toolbar;
	return $.ig.locale.de.Toolbar;
}));// REMOVE_FROM_COMBINED_FILES
