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
		define( [
			"jquery"
		], factory );
	} else {
		return factory(jQuery);
	}
}
(function ($) {
	$ = $ || {};
    $.ig = $.ig || {};
	$.ig.Toolbar = $.ig.Toolbar || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.bg = $.ig.locale.bg || {};

	$.ig.locale.bg.Toolbar = {
			collapseButtonTitle: 'Прибери {0}',
			expandButtonTitle: 'Отвори {0}'
	}
	
	$.ig.Toolbar.locale = $.ig.Toolbar.locale || $.ig.locale.bg.Toolbar;
	return $.ig.locale.bg.Toolbar;
}));// REMOVE_FROM_COMBINED_FILES
