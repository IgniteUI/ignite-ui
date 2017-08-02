﻿/*!@license
* Infragistics.Web.ClientUI Toolbar localization resources <build_number>
*
* Copyright (c) 2011-<year> Infragistics Inc.
*
* http://www.infragistics.com/
*
*/

(function (factory) {
	if (typeof define === "function" && define.amd) {
		define( [], factory );
	} else {
		return factory();
	}
}
(function () {
	$ = $ || {};
    $.ig = $.ig || {};
	$.ig.Toolbar = $.ig.Toolbar || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.fr = $.ig.locale.fr || {};

	$.ig.locale.fr.Toolbar = {
			collapseButtonTitle: 'Réduire {0}',
			expandButtonTitle: 'Etendre {0}'
	}
	
	$.ig.Toolbar.locale = $.ig.Toolbar.locale || $.ig.locale.fr.Toolbar;
	return $.ig.locale.fr.Toolbar;
}));// REMOVE_FROM_COMBINED_FILES
