/*!@license
* Infragistics.Web.ClientUI Combo localization resources <build_number>
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
	$.ig.Combo = $.ig.Combo || {};
	
	$.ig.locale.tr.Combo = {
			noMatchFoundText: 'Hiçbir sonuç bulunamadı',
			dropDownButtonTitle: 'Açılır menüyü göster',
			clearButtonTitle: 'Değeri temizle',
			placeHolder: 'seçin…',
			notSuported: 'İşlem desteklenmiyor.',
			errorNoSupportedTextsType: "Farklı bir filtreleme metni gereklidir. Bir dize veya dizelerden oluşan bir değer sağlayın.",
			errorUnrecognizedHighlightMatchesMode: "Farklı bir vurgu eşleşmeleri modu gereklidir. 'Multi', 'contains', 'beginWith', 'full' ve 'null' arasında bir değer seçin.",
			errorIncorrectGroupingKey: "Gruplama anahtarı doğru değil."
	};

	$.ig.Combo.locale = $.ig.Combo.locale || $.ig.locale.tr.Combo;
	return $.ig.locale.tr.Combo;
}));// REMOVE_FROM_COMBINED_FILES
