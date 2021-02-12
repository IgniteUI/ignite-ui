/*!@license
* Infragistics.Web.ClientUI Rating localization resources <build_number>
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
	$.ig.Rating = $.ig.Rating || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale['zh-Hant'] = $.ig.locale['zh-Hant'] || {};
	
	$.ig.locale['zh-Hant'].Rating = {
			setOptionError: '以下選項不允許執行階段變更: '
	}
	
	$.ig.Rating.locale = $.ig.Rating.locale || $.ig.locale['zh-Hant'].Rating;
	return $.ig.locale['zh-Hant'].Rating;
}));// REMOVE_FROM_COMBINED_FILES
