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
	$.ig.locale['zh-Hant'] = $.ig.locale['zh-Hant'] || {};
	$.ig.Templating = $.ig.Templating || {};
	
	$.ig.locale['zh-Hant'].Templating = {
			undefinedArgument: '嘗試擷取資料來源屬性時出錯: '
	};

	$.ig.Templating.locale = $.ig.Templating.locale || $.ig.locale['zh-Hant'].Templating;
	return $.ig.locale['zh-Hant'].Templating;
}));// REMOVE_FROM_COMBINED_FILES
