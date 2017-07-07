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
		define( [], factory );
	} else {
		return factory();
	}
}
(function ($) {
    $ = $ || {};
    $.ig = $.ig || {};
	$.ig.Splitter = $.ig.Splitter || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.en = $.ig.locale.en || {};

	    $.ig.locale.en.Splitter = {
		        errorPanels: 'The number of panels have to be no more than two.',
		        errorSettingOption: 'Error setting option.'
		}
		
		$.ig.Splitter.locale = $.ig.Splitter.locale || $.ig.locale.en.Splitter;
		return $.ig.locale.en.Splitter;
}));// REMOVE_FROM_COMBINED_FILES
