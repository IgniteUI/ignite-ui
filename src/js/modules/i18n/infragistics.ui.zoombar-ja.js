/*!@license
* Infragistics.Web.ClientUI Zoombar localization resources <build_number>
*
* Copyright (c) 2011-<year> Infragistics Inc.
*
* http://www.infragistics.com/
*
*/

/*global jQuery */
(function ($) {
$.ig = $.ig || {};

if (!$.ig.Zoombar) {
	$.ig.Zoombar = {};

	$.extend($.ig.Zoombar, {

	    locale: {
	        zoombarTargetNotSpecified: "igZoombar を有効なターゲットにアタッチする必要があります。",
		    zoombarTypeNotSupported: "ズームバーにアタッチするウィジェット タイプはサポートされません。",
			zoombarProviderNotRecognized: "igZoombar が指定したプロバイダーを認識できませんでした。カスタム プロバイダーを使用する場合、$.ig 名前空間で既存のクラス名を渡すか、そのクラスのインスタンスを渡してください。",
		    optionChangeNotSupported: "igZoombar が作成された後のこのオプションの変更はサポートされません:"
		}
	});

}
})(jQuery);