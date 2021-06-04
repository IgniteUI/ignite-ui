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
	$.ig.locale.tr = $.ig.locale.tr || {};

	    $.ig.locale.tr.Splitter = {
		        errorPanels: 'Panel sayısı ikiden fazla olmamalıdır.',
		        errorSettingOption: 'Hata ayar seçeneği.'
		}
		
		$.ig.Splitter.locale = $.ig.Splitter.locale || $.ig.locale.tr.Splitter;
		return $.ig.locale.tr.Splitter;
}));// REMOVE_FROM_COMBINED_FILES
