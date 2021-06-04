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
	$.ig.locale.sv = $.ig.locale.sv || {};

    $.ig.locale.sv.Toolbar = {
			collapseButtonTitle: 'Dölj {0}',
			expandButtonTitle: 'Expandera {0}'
	}
		
	$.ig.Toolbar.locale = $.ig.Toolbar.locale || $.ig.locale.sv.Toolbar;
	return $.ig.locale.sv.Toolbar;
}));// REMOVE_FROM_COMBINED_FILES
