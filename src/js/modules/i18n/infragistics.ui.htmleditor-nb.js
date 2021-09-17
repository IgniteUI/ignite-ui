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
	$.ig.locale.nb = $.ig.locale.nb || {};
	$.ig.HtmlEditor = $.ig.HtmlEditor || {};
	
	$.ig.locale.nb.HtmlEditor = {
		boldButtonTitle: 'Bold',
		italicButtonTitle: 'Kursiv',
		underlineButtonTitle: 'Understrek',
		strikethroughButtonTitle: 'Gjennomstrømning',
		increaseFontSizeButtonTitle: 'Øk skriftstørrelsen',
		decreaseFontSizeButtonTitle: 'Reduser skriftstørrelsen',
		alignTextLeftButtonTitle: 'Juster teksten til venstre',
		alignTextRightButtonTitle: 'Juster teksten til høyre',
		alignTextCenterButtonTitle: 'Senter',
		justifyButtonTitle: 'Rettferdiggjøre',
		bulletsButtonTitle: 'Kuler',
		numberingButtonTitle: 'Nummerering',
		decreaseIndentButtonTitle: 'Reduser innrykk',
		increaseIndentButtonTitle: 'Øk innrykk',
		insertPictureButtonTitle: 'Sett inn bilde',
		fontColorButtonTitle: 'Skriftfarge',
		textHighlightButtonTitle: 'Tekst uthev farge',
		insertLinkButtonTitle: 'Sett inn hyperkobling',
		insertTableButtonTitle: 'Bord',
		addRowButtonTitle: 'Legg til rad',
		removeRowButtonTitle: 'Fjern rad',
		addColumnButtonTitle: 'Legg til kolonne',
		removeColumnButtonTitle: 'Fjern kolonne',
		inserHRButtonTitle: 'Sett inn horisontal regel',
		viewSourceButtonTitle: 'Se kilde',
		cutButtonTitle: 'Skjære',
		copyButtonTitle: 'Kopiere',
		pasteButtonTitle: 'Lim inn',
		undoButtonTitle: 'Angre',
		redoButtonTitle: 'Gjøre om',
		imageUrlDialogText: 'Bilde-URL:',
		imageAlternativeTextDialogText: 'Alternativ tekst:',
		imageWidthDialogText: 'Bildebredde:',
		imageHeihgtDialogText: 'Bildehøyde:',
		linkNavigateToUrlDialogText: 'Naviger til URL:',
		linkDisplayTextDialogText: 'Displaytekst:',
		linkOpenInDialogText: 'Åpne i:',
		linkTargetNewWindowDialogText: 'Nytt vindu',
		linkTargetSameWindowDialogText: 'Samme vindu',
		linkTargetParentWindowDialogText: 'Foreldervindu',
		linkTargetTopmostWindowDialogText: 'Øverste vindu',
		applyButtonTitle: 'Søke om',
		cancelButtonTitle: 'Avbryt',
		textToolbar: "verktøylinje for tekstmanipulering",
		formattingToolbar: "verktøylinje for tekstformatering",
		insertObjectToolbar: "verktøylinje for innsetting av objekter",
		copyPasteToolbar: "kopier/lim inn verktøylinjen",
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
				{ text: "h1", value: "Overskrift 1" },
				{ text: "h2", value: "Overskrift 2" },
				{ text: "h3", value: "Overskrift 3" },
				{ text: "h4", value: "Overskrift 4" },
				{ text: "h5", value: "Overskrift 5" },
				{ text: "h6", value: "Overskrift 6" },
				{ text: "p", value: "Normal" }
			]
};

$.ig.HtmlEditor.locale = $.ig.HtmlEditor.locale || $.ig.locale.nb.HtmlEditor;
return $.ig.locale.nb.HtmlEditor;
}));// REMOVE_FROM_COMBINED_FILES
