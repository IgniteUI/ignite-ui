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
	$.ig.locale.nb = $.ig.locale.nb || {};

	    $.ig.locale.nb.Splitter = {
		        errorPanels: 'Antall paneler må ikke være mer enn to.',
		        errorSettingOption: 'Feil ved innstilling.'
		}
		
		$.ig.Splitter.locale = $.ig.Splitter.locale || $.ig.locale.nb.Splitter;
		return $.ig.locale.nb.Splitter;
}));// REMOVE_FROM_COMBINED_FILES
