/*!@license
* Infragistics.Web.ClientUI Notifier localization resources <build_number>
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
	$.ig.Notifier = $.ig.Notifier || {};
	
	$.ig.locale.tr.Notifier = {
		successMsg: "Başarılı",
		errorMsg: "Hata",
		warningMsg: "Uyarı",
		infoMsg: "Bilgi",
		notSupportedState: "Desteklenmeyen bildirim durumu! Desteklenen 'success', 'info', 'warning', 'error' durumlarından birini kullanın",
		notSupportedMode: "Desteklenmeyen bildirim modu! Desteklenen 'auto', 'popover', 'inline' modlarından birini kullanın"
};

$.ig.Notifier.locale = $.ig.Notifier.locale || $.ig.locale.tr.Notifier;
return $.ig.locale.tr.Notifier;
}));// REMOVE_FROM_COMBINED_FILES
