/*!@license
* Infragistics.Web.ClientUI templating localization resources <build_number>
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
	$.ig.locale = $.ig.locale || {};
	$.ig.locale['zh-tw'] = $.ig.locale['zh-tw'] || {};
	$.ig.Templating = $.ig.Templating || {};
	
	$.ig.locale['zh-tw'].Templating = {
			undefinedArgument: '嘗試擷取資料來源屬性時出錯: '
	};

	$.ig.Templating.locale = $.ig.Templating.locale || $.ig.locale['zh-tw'].Templating;
	return $.ig.locale['zh-tw'].Templating;
}));// REMOVE_FROM_COMBINED_FILES
