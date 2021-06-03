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
	$.ig.locale.sv = $.ig.locale.sv || {};
	$.ig.HtmlEditor = $.ig.HtmlEditor || {};
	
	$.ig.locale.sv.HtmlEditor = {
		boldButtonTitle: 'Djärv',
		italicButtonTitle: 'Kursiv',
		underlineButtonTitle: 'Understrykning',
		strikethroughButtonTitle: 'Genomstruken',
		increaseFontSizeButtonTitle: 'Öka teckensnittsstorleken',
		decreaseFontSizeButtonTitle: 'Minska teckensnittsstorleken',
		alignTextLeftButtonTitle: 'Justera text till vänster',
		alignTextRightButtonTitle: 'Justera text till höger',
		alignTextCenterButtonTitle: 'Centrum',
		justifyButtonTitle: 'Rättfärdiga',
		bulletsButtonTitle: 'Punkter',
		numberingButtonTitle: 'Numrering',
		decreaseIndentButtonTitle: 'Minska indraget',
		increaseIndentButtonTitle: 'Öka indraget',
		insertPictureButtonTitle: 'Infoga bild',
		fontColorButtonTitle: 'Teckensnittsfärg',
		textHighlightButtonTitle: 'Textmarkeringsfärg',
		insertLinkButtonTitle: 'Infoga hyperlänk',
		insertTableButtonTitle: 'Tabell',
		addRowButtonTitle: 'Lägg till rad',
		removeRowButtonTitle: 'Ta bort rad',
		addColumnButtonTitle: 'Lägg till kolumn',
		removeColumnButtonTitle: 'Ta bort kolumnen',
		inserHRButtonTitle: 'Infoga horisontell regel',
		viewSourceButtonTitle: 'Visa källa',
		cutButtonTitle: 'Skär',
		copyButtonTitle: 'Kopiera',
		pasteButtonTitle: 'Klistra',
		undoButtonTitle: 'Ångra',
		redoButtonTitle: 'Gör om',
		imageUrlDialogText: 'Bild URL:',
		imageAlternativeTextDialogText: 'Alternativ text:',
		imageWidthDialogText: 'Bildbredd:',
		imageHeihgtDialogText: 'Bildhöjd:',
		linkNavigateToUrlDialogText: 'Navigera till URL:',
		linkDisplayTextDialogText: 'Displaytext:',
		linkOpenInDialogText: 'Öppna i:',
		linkTargetNewWindowDialogText: 'Nytt fönster',
		linkTargetSameWindowDialogText: 'Samma fönster',
		linkTargetParentWindowDialogText: 'Föräldrafönster',
		linkTargetTopmostWindowDialogText: 'Fönster överst',
		applyButtonTitle: 'Tillämpa',
		cancelButtonTitle: 'Avbryt',
		textToolbar: "verktygsfält för textmanipulering",
		formattingToolbar: "verktygsfält för textformatering",
		insertObjectToolbar: "verktygsfält för insättning av objekt",
		copyPasteToolbar: "kopiera/klistra in verktygsfält",
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
				{ text: "h1", value: "Rubrik 1" },
				{ text: "h2", value: "Rubrik 2" },
				{ text: "h3", value: "Rubrik 3" },
				{ text: "h4", value: "Rubrik 4" },
				{ text: "h5", value: "Rubrik 5" },
				{ text: "h6", value: "Rubrik 6" },
				{ text: "p", value: "Normal" }
			]
};

$.ig.HtmlEditor.locale = $.ig.HtmlEditor.locale || $.ig.locale.sv.HtmlEditor;
return $.ig.locale.sv.HtmlEditor;
}));// REMOVE_FROM_COMBINED_FILES
