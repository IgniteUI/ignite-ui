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
(function () {
	$ = $ || {};
    $.ig = $.ig || {};
	$.ig.Splitter = $.ig.Splitter || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.ja = $.ig.locale.ja || {};

	 $.ig.locale.ja.Splitter = {
		    errorPanels: 'パネルの最大数は 2 です。',
		    errorSettingOption: 'オプションの設定でエラーが発生しました。'
	}

	$.ig.Splitter.locale = $.ig.Splitter.locale || $.ig.locale.ja.Splitter;
	return $.ig.locale.ja.Splitter;
}));// REMOVE_FROM_COMBINED_FILES
