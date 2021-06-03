/*!@license
* Infragistics.Web.ClientUI Dialog localization resources <build_number>
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
	$.ig.locale.tr = $.ig.locale.tr || {};
	$.ig.Dialog = $.ig.Dialog || {};
	
	$.ig.locale.tr.Dialog = {
			closeButtonTitle: "Kapat",
			minimizeButtonTitle: "Simge Durumuna Küçült",
			maximizeButtonTitle: "Ekranı Kapla",
			pinButtonTitle: "Sabitle",
			unpinButtonTitle: "Sabitlemeyi Kaldır",
			restoreButtonTitle: "Geri Yükle",
			setOptionError: 'Aşağıdaki seçenek için çalışma zamanı değişikliklerine izin verilmez: '
	};

	$.ig.Dialog.locale = $.ig.Dialog.locale || $.ig.locale.tr.Dialog;
	return $.ig.locale.tr.Dialog;
}));// REMOVE_FROM_COMBINED_FILES
