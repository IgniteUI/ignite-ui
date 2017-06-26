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
		define( [
			"jquery"
		], factory );
	} else {
		factory(jQuery);
	}
}
(function ($) {
    $.ig = $.ig || {};

	    $.ig.Splitter = {};

	    $.extend($.ig.Splitter, {
		    locale: {
		        errorPanels: 'The number of panels have to be no more than two.',
		        errorSettingOption: 'Error setting option.'
		    }
	    });
		
		$.ig.locale = $.ig.locale || {};
		$.ig.locale.en = $.ig.locale.en || {};
		$.ig.locale.en.Splitter = $.extend({}, $.ig.Splitter.locale);
}));// REMOVE_FROM_COMBINED_FILES
