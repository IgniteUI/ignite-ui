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
		define( [
			"jquery"
		], factory );
	} else {
		factory(jQuery);
	}
}
(function ($) {
	$.ig = $.ig || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.ja = $.ig.locale.ja || {};
	$.ig.Templating = $.ig.Templating || {};
	
	$.ig.locale.ja.Templating = {
			undefinedArgument: 'データ ソース プロパティを取得する際にエラーが発生しました: '
	};

	$.ig.Templating.locale = $.ig.Templating.locale || $.ig.locale.ja.Templating;
}));// REMOVE_FROM_COMBINED_FILES
