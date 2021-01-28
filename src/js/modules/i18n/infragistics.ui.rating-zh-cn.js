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
	$.ig.locale['zh-cn'] = $.ig.locale['zh-cn'] || {};
	
	$.ig.locale['zh-cn'].Rating = {
			setOptionError: '以下选项不允许运行时更改: '
	}
	
	$.ig.Rating.locale = $.ig.Rating.locale || $.ig.locale['zh-cn'].Rating;
	return $.ig.locale['zh-cn'].Rating;
}));// REMOVE_FROM_COMBINED_FILES
