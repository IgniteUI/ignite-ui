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
	$.ig.locale.cs = $.ig.locale.cs || {};

	    $.ig.locale.cs.Splitter = {
		        errorPanels: 'The number of panels have to be no more than two.',
		        errorSettingOption: 'Error setting option.'
		}
		
		$.ig.Splitter.locale = $.ig.Splitter.locale || $.ig.locale.cs.Splitter;
		return $.ig.locale.cs.Splitter;
}));// REMOVE_FROM_COMBINED_FILES
