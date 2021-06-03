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
	$.ig.locale.da = $.ig.locale.da || {};

	    $.ig.locale.da.Splitter = {
		        errorPanels: 'Antallet af paneler skal ikke være mere end to.',
		        errorSettingOption: 'Fejlindstillingsmulighed.'
		}
		
		$.ig.Splitter.locale = $.ig.Splitter.locale || $.ig.locale.da.Splitter;
		return $.ig.locale.da.Splitter;
}));// REMOVE_FROM_COMBINED_FILES
