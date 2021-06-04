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
	$.ig.locale.sv = $.ig.locale.sv || {};

	    $.ig.locale.sv.Splitter = {
		        errorPanels: 'Antalet paneler måste vara högst två.',
		        errorSettingOption: 'Felinställningsalternativ.'
		}
		
		$.ig.Splitter.locale = $.ig.Splitter.locale || $.ig.locale.sv.Splitter;
		return $.ig.locale.sv.Splitter;
}));// REMOVE_FROM_COMBINED_FILES
