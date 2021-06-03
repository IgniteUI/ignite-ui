﻿/*!@license
* Infragistics.Web.ClientUI HTML Editor localization resources <build_number>
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
	$.ig.HtmlEditor = $.ig.HtmlEditor || {};
	
	$.ig.locale.tr.HtmlEditor = {
		boldButtonTitle: 'Kalın',
		italicButtonTitle: 'İtalik',
		underlineButtonTitle: 'Altı çizili',
		strikethroughButtonTitle: 'Üstü çizili',
		increaseFontSizeButtonTitle: 'Yazı Tipi Boyutunu Artır',
		decreaseFontSizeButtonTitle: 'Yazı Tipi Boyutunu Azalt',
		alignTextLeftButtonTitle: 'Metni Sola Hizala',
		alignTextRightButtonTitle: 'Metni Sağa Hizala',
		alignTextCenterButtonTitle: 'Ortala',
		justifyButtonTitle: 'Yasla',
		bulletsButtonTitle: 'Madde İmleri',
		numberingButtonTitle: 'Numaralama',
		decreaseIndentButtonTitle: 'Girintiyi Azalt',
		increaseIndentButtonTitle: 'Girintiyi Artır',
		insertPictureButtonTitle: 'Resim Ekle',
		fontColorButtonTitle: 'Yazı Tipi Rengi',
		textHighlightButtonTitle: 'Metin Vurgu Rengi',
		insertLinkButtonTitle: 'Köprü Ekle',
		insertTableButtonTitle: 'Tablo',
		addRowButtonTitle: 'Satır Ekle',
		removeRowButtonTitle: 'Satırı Kaldır',
		addColumnButtonTitle: 'Sütun Ekle',
		removeColumnButtonTitle: 'Sütunu Kaldır',
		inserHRButtonTitle: 'Yatay Kural Ekle',
		viewSourceButtonTitle: 'Kaynağı Görüntüle',
		cutButtonTitle: 'Kes',
		copyButtonTitle: 'Kopyala',
		pasteButtonTitle: 'Yapıştır',
		undoButtonTitle: 'Geri Al',
		redoButtonTitle: 'Yinele',
		imageUrlDialogText: 'Resim URL\'si:',
		imageAlternativeTextDialogText: 'Alternatif Metin:',
		imageWidthDialogText: 'Resim Genişliği:',
		imageHeihgtDialogText: 'Resim Yüksekliği:',
		linkNavigateToUrlDialogText: 'URL\'ye gidin:',
		linkDisplayTextDialogText: 'Ekran Metni:',
		linkOpenInDialogText: 'Şurada Aç:',
		linkTargetNewWindowDialogText: 'Yeni Pencere',
		linkTargetSameWindowDialogText: 'Aynı Pencere',
		linkTargetParentWindowDialogText: 'Üst Pencere',
		linkTargetTopmostWindowDialogText: 'En Üstteki Pencere',
		applyButtonTitle: 'Uygula',
		cancelButtonTitle: 'İptal',
		textToolbar: "metin işleme araç çubuğu",
		formattingToolbar: "metin biçimlendirme araç çubuğu",
		insertObjectToolbar: "nesne ekleme araç çubuğu",
		copyPasteToolbar: "kopyala/yapıştır araç çubuğu",
		fontNames: {
			win: [
					{ text: "Times New Roman", value: "Times New Roman" },
					{ text: "Arial", value: "Arial" },
					{ text: "Arial Black", value: "Arial Black" },
					{ text: "Helvetica", value: "Helvetica" },
					{ text: "Comic Sans MS", value: "Comic Sans MS" },
					{ text: "Courier New", value: "Courier New" },
					{ text: "Georgia", value: "Georgia" },
					{ text: "Impact", value: "Impact" },
					{ text: "Lucida Console", value: "Lucida Console" },
					{ text: "Lucida Sans Unicode", value: "Lucida Sans Unicode" },
					{ text: "Palatino Linotype", value: "Palatino Linotype" },
					{ text: "Tahoma", value: "Tahoma" },
					{ text: "Trebuchet MS", value: "Trebuchet MS" },
					{ text: "Verdana", value: "Verdana" },
					{ text: "Symbol", value: "Symbol" },
					{ text: "Webdings", value: "Webdings" },
					{ text: "Wingdings", value: "Wingdings" },
					{ text: "MS Sans Serif", value: "MS Sans Serif" },
					{ text: "MS Serif", value: "MS Serif" }
				],
			mac: [
					{ text: "Times New Roman", value: "Times New Roman" },
					{ text: "Arial", value: "Arial" },
					{ text: "Arial Black", value: "Arial Black" },
					{ text: "Helvetica", value: "Helvetica" },
					{ text: "Comic Sans MS", value: "Comic Sans MS" },
					{ text: "Courier New", value: "Courier New" },
					{ text: "Georgia", value: "Georgia" },
					{ text: "Impact", value: "Impact" },
					{ text: "Monaco", value: "Monaco" },
					{ text: "Lucida Grande", value: "Lucida Grande" },
					{ text: "Book Antiqua", value: "Book Antiqua" },
					{ text: "Geneva", value: "Geneva" },
					{ text: "Trebuchet MS", value: "Trebuchet" },
					{ text: "Verdana", value: "Verdana" },
					{ text: "Symbol", value: "Symbol" },
					{ text: "Webdings", value: "Webdings" },
					{ text: "Zapf Dingbats", value: "Zapf Dingbats" },
					{ text: "New York", value: "New York" }
				]
		},
		fontSizes: [
			{ text: "1", value: "7.5 pt"},
			{ text: "2", value: "10 pt"},
			{ text: "3", value: "12 pt"},
			{ text: "4", value: "13.5 pt"},
			{ text: "5", value: "18 pt"},
			{ text: "6", value: "24 pt"},
			{ text: "7", value: "36 pt"}
		],
		formatsList: [
				{ text: "h1", value: "Başlık 1" },
				{ text: "h2", value: "Başlık 2" },
				{ text: "h3", value: "Başlık 3" },
				{ text: "h4", value: "Başlık 4" },
				{ text: "h5", value: "Başlık 5" },
				{ text: "h6", value: "Başlık 6" },
				{ text: "p", value: "Normal" }
			]
};

$.ig.HtmlEditor.locale = $.ig.HtmlEditor.locale || $.ig.locale.tr.HtmlEditor;
return $.ig.locale.tr.HtmlEditor;
}));// REMOVE_FROM_COMBINED_FILES
