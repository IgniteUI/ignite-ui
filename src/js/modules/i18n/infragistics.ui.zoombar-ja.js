/*!@license
* Infragistics.Web.ClientUI Zoombar localization resources <build_number>
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
	$.ig.Zoombar = $.ig.Zoombar || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.ja = $.ig.locale.ja || {};

	$.ig.locale.ja.Zoombar = {
			zoombarTargetNotSpecified: "igZoombar を有効なターゲットにアタッチする必要があります。",
			zoombarTypeNotSupported: "ズームバーにアタッチするウィジェット タイプはサポートされません。",
			zoombarProviderNotRecognized: "igZoombar が指定したクラスからプロバイダーを初期化できなかったか、渡された値がクラスではありません。",
			optionChangeNotSupported: "igZoombar が作成された後のこのオプションの変更はサポートされません:"
	}

	$.ig.Zoombar.locale = $.ig.Zoombar.locale || $.ig.locale.ja.Zoombar;
	return $.ig.locale.ja.Zoombar;
}));// REMOVE_FROM_COMBINED_FILES
