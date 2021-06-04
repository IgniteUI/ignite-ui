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
	$.ig.locale.tr = $.ig.locale.tr || {};

	$.ig.locale.tr.Zoombar = {
				zoombarTargetNotSpecified: "igZoombar, bağlanmak için geçerli bir hedef gerektirir!",
				zoombarTypeNotSupported: "Zoombar'ın eklemeye çalıştığı widget türü desteklenmiyor!",
				zoombarProviderNotRecognized: "igZoombar, belirtilen sınıftan bir sağlayıcıyı başlatamadı veya aktarılan değer bir sınıf değil.",
				optionChangeNotSupported: "İgZoombar oluşturulduktan sonra aşağıdaki seçeneğin değiştirilmesi desteklenmez:"
	}

	$.ig.Zoombar.locale = $.ig.Zoombar.locale || $.ig.locale.tr.Zoombar;
	return $.ig.locale.tr.Zoombar;
}));// REMOVE_FROM_COMBINED_FILES
