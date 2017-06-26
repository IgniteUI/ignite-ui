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
		    errorPanels: 'パネルの最大数は 2 です。',
		    errorSettingOption: 'オプションの設定でエラーが発生しました。'
		}
	});

		$.ig.locale = $.ig.locale || {};
		$.ig.locale.ja = $.ig.locale.ja || {};
		$.ig.locale.ja.Splitter = $.extend({}, $.ig.Splitter.locale);
}));// REMOVE_FROM_COMBINED_FILES
