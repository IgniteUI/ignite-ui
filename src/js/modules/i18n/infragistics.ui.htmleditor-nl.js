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
	$.ig.locale.nl = $.ig.locale.nl || {};
	$.ig.HtmlEditor = $.ig.HtmlEditor || {};
	
	$.ig.locale.nl.HtmlEditor = {
		boldButtonTitle: 'Vet',
		italicButtonTitle: 'Cursief',
		underlineButtonTitle: 'Onderstrepen',
		strikethroughButtonTitle: 'Doorhalen',
		increaseFontSizeButtonTitle: 'Lettergrootte vergroten',
		decreaseFontSizeButtonTitle: 'Lettergrootte verkleinen',
		alignTextLeftButtonTitle: 'Tekst links uitlijnen',
		alignTextRightButtonTitle: 'Tekst rechts uitlijnen',
		alignTextCenterButtonTitle: 'Midden',
		justifyButtonTitle: 'Uitvullen',
		bulletsButtonTitle: 'Opsommingstekens',
		numberingButtonTitle: 'Nummering',
		decreaseIndentButtonTitle: 'Inspringing verkleinen',
		increaseIndentButtonTitle: 'Inspringing vergroten',
		insertPictureButtonTitle: 'Afbeelding invoegen',
		fontColorButtonTitle: 'Tekstkleur',
		textHighlightButtonTitle: 'Tekstmarkeringskleur',
		insertLinkButtonTitle: 'Hyperlink invoegen',
		insertTableButtonTitle: 'Tabel',
		addRowButtonTitle: 'Rij toevoegen',
		removeRowButtonTitle: 'Rij verwijderen',
		addColumnButtonTitle: 'Kolom toevoegen',
		removeColumnButtonTitle: 'Kolom verwijderen',
		inserHRButtonTitle: 'Voeg een horizontale regel in',
		viewSourceButtonTitle: 'Bron bekijken',
		cutButtonTitle: 'Knippen',
		copyButtonTitle: 'Kopiëren',
		pasteButtonTitle: 'Plakken',
		undoButtonTitle: 'Ongedaan maken',
		redoButtonTitle: 'Opnieuw',
		imageUrlDialogText: 'Afbeeldings-URL:',
		imageAlternativeTextDialogText: 'Alternatieve tekst:',
		imageWidthDialogText: 'Breedte afbeelding:',
		imageHeihgtDialogText: 'Hoogte afbeelding:',
		linkNavigateToUrlDialogText: 'Naar URL gaan:',
		linkDisplayTextDialogText: 'Tekst weergeven:',
		linkOpenInDialogText: 'Openen in:',
		linkTargetNewWindowDialogText: 'Nieuw venster',
		linkTargetSameWindowDialogText: 'Hetzelfde venster',
		linkTargetParentWindowDialogText: 'Bovenliggend venster',
		linkTargetTopmostWindowDialogText: 'Bovenste venster',
		applyButtonTitle: 'Toepassen',
		cancelButtonTitle: 'Annuleren',
		textToolbar: "werkbalk voor tekstmanipulatie",
		formattingToolbar: "werkbalk voor tekstopmaak",
		insertObjectToolbar: "werkbalk voor het invoegen van objecten",
		copyPasteToolbar: "werkbalk kopiëren/plakken",
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
				{ text: "h1", value: "Kop 1" },
				{ text: "h2", value: "Kop 2" },
				{ text: "h3", value: "Kop 3" },
				{ text: "h4", value: "Kop 4" },
				{ text: "h5", value: "Kop 5" },
				{ text: "h6", value: "Kop 6" },
				{ text: "p", value: "Normaal" }
			]
};

$.ig.HtmlEditor.locale = $.ig.HtmlEditor.locale || $.ig.locale.nl.HtmlEditor;
return $.ig.locale.nl.HtmlEditor;
}));// REMOVE_FROM_COMBINED_FILES
