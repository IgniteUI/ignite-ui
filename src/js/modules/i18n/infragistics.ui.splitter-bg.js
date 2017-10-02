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
	$.ig.locale.bg = $.ig.locale.bg || {};
	
	   $.ig.locale.bg.Splitter = {
		        errorPanels: 'Броят на панелите не може да надвишава два.',
		        errorSettingOption: 'Грешка в настройката на опцията.'
		    }

		$.ig.Splitter.locale = $.ig.Splitter.locale || $.ig.locale.bg.Splitter;
		return $.ig.locale.bg.Splitter;
}));// REMOVE_FROM_COMBINED_FILES
