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
	$.ig.locale.da = $.ig.locale.da || {};
	$.ig.HtmlEditor = $.ig.HtmlEditor || {};
	
	$.ig.locale.da.HtmlEditor = {
		boldButtonTitle: 'Fremhævet',
		italicButtonTitle: 'Kursiv',
		underlineButtonTitle: 'Understrege',
		strikethroughButtonTitle: 'Gennemstregning',
		increaseFontSizeButtonTitle: 'Forøg skriftstørrelse',
		decreaseFontSizeButtonTitle: 'Reducer skriftstørrelse',
		alignTextLeftButtonTitle: 'Juster tekst til venstre',
		alignTextRightButtonTitle: 'Juster tekst til højre',
		alignTextCenterButtonTitle: 'Centrér',
		justifyButtonTitle: 'Justér',
		bulletsButtonTitle: 'Punkttegn',
		numberingButtonTitle: 'Nummerering',
		decreaseIndentButtonTitle: 'Reducer indrykning',
		increaseIndentButtonTitle: 'Forøg indrykning',
		insertPictureButtonTitle: 'Indsæt billede',
		fontColorButtonTitle: 'Skriftfarve',
		textHighlightButtonTitle: 'Farve på tekstfremhævning',
		insertLinkButtonTitle: 'Indsæt hyperlink',
		insertTableButtonTitle: 'Tabel',
		addRowButtonTitle: 'Tilføj række',
		removeRowButtonTitle: 'Fjern række',
		addColumnButtonTitle: 'Tilføj kolonne',
		removeColumnButtonTitle: 'Fjern kolonne',
		inserHRButtonTitle: 'Indsæt vandret streg',
		viewSourceButtonTitle: 'Se kilde',
		cutButtonTitle: 'Klip',
		copyButtonTitle: 'Kopi',
		pasteButtonTitle: 'Indsæt',
		undoButtonTitle: 'Fortryd',
		redoButtonTitle: 'Gentag igen',
		imageUrlDialogText: 'Billed URL:',
		imageAlternativeTextDialogText: 'Alternativ tekst:',
		imageWidthDialogText: 'Billedbredde:',
		imageHeihgtDialogText: 'Billedhøjde:',
		linkNavigateToUrlDialogText: 'Naviger til URL:',
		linkDisplayTextDialogText: 'Skærmtekst:',
		linkOpenInDialogText: 'Åben i:',
		linkTargetNewWindowDialogText: 'Nyt vindue',
		linkTargetSameWindowDialogText: 'Samme vindue',
		linkTargetParentWindowDialogText: 'Overordnet vindue',
		linkTargetTopmostWindowDialogText: 'Øverste vindue',
		applyButtonTitle: 'Anvend',
		cancelButtonTitle: 'Annuller',
		textToolbar: "værktøjslinje til tekstmanipulation",
		formattingToolbar: "værktøjslinje til tekstformatering",
		insertObjectToolbar: "værktøjslinje til indsættelse af objekter",
		copyPasteToolbar: "kopier/indsæt værktøjslinje",
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

$.ig.HtmlEditor.locale = $.ig.HtmlEditor.locale || $.ig.locale.da.HtmlEditor;
return $.ig.locale.da.HtmlEditor;
}));// REMOVE_FROM_COMBINED_FILES
