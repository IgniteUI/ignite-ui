/*!@license
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
	$.ig.locale.pl = $.ig.locale.pl || {};
	$.ig.HtmlEditor = $.ig.HtmlEditor || {};
	
	$.ig.locale.pl.HtmlEditor = {
		boldButtonTitle: 'Pogrubienie',
		italicButtonTitle: 'Kursywa',
		underlineButtonTitle: 'Podkreślenie',
		strikethroughButtonTitle: 'Przekreślenie',
		increaseFontSizeButtonTitle: 'Zwiększ rozmiar czcionki',
		decreaseFontSizeButtonTitle: 'Zmniejsz rozmiar czcionki',
		alignTextLeftButtonTitle: 'Wyrównaj tekst do lewej',
		alignTextRightButtonTitle: 'Wyrównaj tekst do prawej',
		alignTextCenterButtonTitle: 'Środek',
		justifyButtonTitle: 'Wyjustuj',
		bulletsButtonTitle: 'Punktory',
		numberingButtonTitle: 'Numerowanie',
		decreaseIndentButtonTitle: 'Zmniejsz wcięcie',
		increaseIndentButtonTitle: 'Zwiększ wcięcie',
		insertPictureButtonTitle: 'Wstaw obraz',
		fontColorButtonTitle: 'Kolor czcionki',
		textHighlightButtonTitle: 'Kolor wyróżnienia tekstu',
		insertLinkButtonTitle: 'Wstaw hiperłącze',
		insertTableButtonTitle: 'Tabela',
		addRowButtonTitle: 'Dodaj wiersz',
		removeRowButtonTitle: 'Usuń wiersz',
		addColumnButtonTitle: 'Dodaj kolumnę',
		removeColumnButtonTitle: 'Usuń kolumnę',
		inserHRButtonTitle: 'Wstaw regułę poziomą',
		viewSourceButtonTitle: 'Pokaż źródło',
		cutButtonTitle: 'Wytnij',
		copyButtonTitle: 'Kopiuj',
		pasteButtonTitle: 'Wklej',
		undoButtonTitle: 'Cofnij',
		redoButtonTitle: 'Ponów',
		imageUrlDialogText: 'Adres URL obrazu:',
		imageAlternativeTextDialogText: 'Tekst alternatywny:',
		imageWidthDialogText: 'Szerokość obrazu:',
		imageHeihgtDialogText: 'Wysokość obrazu:',
		linkNavigateToUrlDialogText: 'Przejdź do adresu URL:',
		linkDisplayTextDialogText: 'Wyświetl tekst:',
		linkOpenInDialogText: 'Otwórz w:',
		linkTargetNewWindowDialogText: 'Nowe okno',
		linkTargetSameWindowDialogText: 'To samo okno',
		linkTargetParentWindowDialogText: 'Okno nadrzędne',
		linkTargetTopmostWindowDialogText: 'Okno najwyższe',
		applyButtonTitle: 'Zastosuj',
		cancelButtonTitle: 'Anuluj',
		textToolbar: "pasek narzędzi edytowania tekstu",
		formattingToolbar: "pasek narzędzi formatowania tekstu",
		insertObjectToolbar: "pasek narzędzi wstawiania obiektów",
		copyPasteToolbar: "pasek narzędzi kopiowania/wklejania",
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
				{ text: "h1", value: "Heading 1" },
				{ text: "h2", value: "Heading 2" },
				{ text: "h3", value: "Heading 3" },
				{ text: "h4", value: "Heading 4" },
				{ text: "h5", value: "Heading 5" },
				{ text: "h6", value: "Heading 6" },
				{ text: "p", value: "Normal" }
			]
};

$.ig.HtmlEditor.locale = $.ig.HtmlEditor.locale || $.ig.locale.pl.HtmlEditor;
return $.ig.locale.pl.HtmlEditor;
}));// REMOVE_FROM_COMBINED_FILES
