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
			zoombarProviderNotRecognized: "igZoombar could not initialize a provider from the class specified or the value passed is not a class.",
			optionChangeNotSupported: "igZoombar が作成された後のこのオプションの変更はサポートされません:"
		}
	});

}
})(jQuery);