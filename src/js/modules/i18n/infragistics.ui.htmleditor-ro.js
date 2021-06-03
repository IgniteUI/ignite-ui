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
	$.ig.locale.ro = $.ig.locale.ro || {};
	$.ig.HtmlEditor = $.ig.HtmlEditor || {};
	
	$.ig.locale.ro.HtmlEditor = {
		boldButtonTitle: 'Îngroșat',
		italicButtonTitle: 'Cursiv',
		underlineButtonTitle: 'Subliniați',
		strikethroughButtonTitle: 'Strikethrough',
		increaseFontSizeButtonTitle: 'Măriți dimensiunea fontului',
		decreaseFontSizeButtonTitle: 'Reduceți dimensiunea fontului',
		alignTextLeftButtonTitle: 'Aliniați textul la stânga',
		alignTextRightButtonTitle: 'Aliniați textul la dreapta',
		alignTextCenterButtonTitle: 'Centru',
		justifyButtonTitle: 'Aliniere stânga-dreapta',
		bulletsButtonTitle: 'Puncte',
		numberingButtonTitle: 'Numerotare',
		decreaseIndentButtonTitle: 'Reduceți indentarea',
		increaseIndentButtonTitle: 'Măriți indentarea',
		insertPictureButtonTitle: 'Introduceți imaginea',
		fontColorButtonTitle: 'Culoarea fontului',
		textHighlightButtonTitle: 'Culoare evidențiere text',
		insertLinkButtonTitle: 'Introduceți hiperlink',
		insertTableButtonTitle: 'Tabel',
		addRowButtonTitle: 'Adăugați rând',
		removeRowButtonTitle: 'Eliminați rândul',
		addColumnButtonTitle: 'Adăugați o coloană',
		removeColumnButtonTitle: 'Eliminați coloana',
		inserHRButtonTitle: 'Introduceți linie orizontală',
		viewSourceButtonTitle: 'Vizualizare sursă',
		cutButtonTitle: 'Taie',
		copyButtonTitle: 'Copiază',
		pasteButtonTitle: 'Lipește',
		undoButtonTitle: 'Anulează',
		redoButtonTitle: 'Refacere',
		imageUrlDialogText: 'URL imagine:',
		imageAlternativeTextDialogText: 'Text alternativ:',
		imageWidthDialogText: 'Lățimea imaginii:',
		imageHeihgtDialogText: 'Înălțimea imaginii:',
		linkNavigateToUrlDialogText: 'Navigați la URL:',
		linkDisplayTextDialogText: 'Afișare text:',
		linkOpenInDialogText: 'Deschide în:',
		linkTargetNewWindowDialogText: 'Fereastră nouă',
		linkTargetSameWindowDialogText: 'Aceeași fereastră',
		linkTargetParentWindowDialogText: 'Fereastra părinte',
		linkTargetTopmostWindowDialogText: 'Fereastra de sus',
		applyButtonTitle: 'Aplica',
		cancelButtonTitle: 'Anulare',
		textToolbar: "bara de instrumente de manipulare a textului",
		formattingToolbar: "bara de instrumente de formatare a textului",
		insertObjectToolbar: "bara de instrumente pentru inserarea obiectelor",
		copyPasteToolbar: "bara de instrumente copiere / lipire",
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

$.ig.HtmlEditor.locale = $.ig.HtmlEditor.locale || $.ig.locale.ro.HtmlEditor;
return $.ig.locale.ro.HtmlEditor;
}));// REMOVE_FROM_COMBINED_FILES
