/*!@license
* Infragistics.Web.ClientUI Splitter localization resources <build_number>
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
	$.ig.Splitter = $.ig.Splitter || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.hu = $.ig.locale.hu || {};

	    $.ig.locale.hu.Splitter = {
		        errorPanels: 'A panelek száma nem lehet nagyobb, mint kettő.',
		        errorSettingOption: 'Hiba az opció beállításakor.'
		}
		
		$.ig.Splitter.locale = $.ig.Splitter.locale || $.ig.locale.hu.Splitter;
		return $.ig.locale.hu.Splitter;
}));// REMOVE_FROM_COMBINED_FILES
