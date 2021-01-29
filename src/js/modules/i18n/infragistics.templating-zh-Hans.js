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
	$.ig.locale['zh-Hans'] = $.ig.locale['zh-Hans'] || {};
	$.ig.Templating = $.ig.Templating || {};
	
	$.ig.locale['zh-Hans'].Templating = {
			undefinedArgument: '尝试检索数据源属性时出现错误: '
	};

	$.ig.Templating.locale = $.ig.Templating.locale || $.ig.locale['zh-Hans'].Templating;
	return $.ig.locale['zh-Hans'].Templating;
}));// REMOVE_FROM_COMBINED_FILES
