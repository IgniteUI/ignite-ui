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
	$.ig.locale.it = $.ig.locale.it || {};
	$.ig.HtmlEditor = $.ig.HtmlEditor || {};
	
	$.ig.locale.it.HtmlEditor = {
		boldButtonTitle: 'Grassetto',
		italicButtonTitle: 'Corsivo',
		underlineButtonTitle: 'Sottolinea',
		strikethroughButtonTitle: 'Barrato',
		increaseFontSizeButtonTitle: 'Aumenta dimensione carattere',
		decreaseFontSizeButtonTitle: 'Riduci dimensione carattere',
		alignTextLeftButtonTitle: 'Allinea testo a sinistra',
		alignTextRightButtonTitle: 'Allinea testo a destra',
		alignTextCenterButtonTitle: 'Al centro',
		justifyButtonTitle: 'Giustifica',
		bulletsButtonTitle: 'Punti',
		numberingButtonTitle: 'Numerazione',
		decreaseIndentButtonTitle: 'Riduci rientro',
		increaseIndentButtonTitle: 'Aumenta rientro',
		insertPictureButtonTitle: 'Inserisci immagine',
		fontColorButtonTitle: 'Colore carattere',
		textHighlightButtonTitle: 'Colore evidenziazione testo',
		insertLinkButtonTitle: 'Inserisci collegamento ipertestuale',
		insertTableButtonTitle: 'Tabella',
		addRowButtonTitle: 'Aggiungi riga',
		removeRowButtonTitle: 'Rimuovi riga',
		addColumnButtonTitle: 'Aggiungi colonna',
		removeColumnButtonTitle: 'Rimuovi colonna',
		inserHRButtonTitle: 'Inserisci regola orizzontale',
		viewSourceButtonTitle: 'Visualizza sorgente',
		cutButtonTitle: 'Taglia',
		copyButtonTitle: 'Copia',
		pasteButtonTitle: 'Incolla',
		undoButtonTitle: 'Annulla',
		redoButtonTitle: 'Ripeti',
		imageUrlDialogText: 'URL immagine:',
		imageAlternativeTextDialogText: 'Testo alternativo:',
		imageWidthDialogText: 'Larghezza immagine:',
		imageHeihgtDialogText: 'Altezza immagine:',
		linkNavigateToUrlDialogText: 'Passa all\'URL:',
		linkDisplayTextDialogText: 'Visualizza testo:',
		linkOpenInDialogText: 'Apri in:',
		linkTargetNewWindowDialogText: 'Nuova finestra',
		linkTargetSameWindowDialogText: 'Stessa finestra',
		linkTargetParentWindowDialogText: 'Finestra principale',
		linkTargetTopmostWindowDialogText: 'Finestra più in alto',
		applyButtonTitle: 'Applica',
		cancelButtonTitle: 'Annulla',
		textToolbar: "barra degli strumenti di manipolazione del testo",
		formattingToolbar: "barra degli strumenti di formattazione del testo",
		insertObjectToolbar: "barra degli strumenti per l'inserimento di oggetti",
		copyPasteToolbar: "copia/incolla barra degli strumenti",
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
				{ text: "h1", value: "Titolo 1" },
				{ text: "h2", value: "Titolo 2" },
				{ text: "h3", value: "Titolo 3" },
				{ text: "h4", value: "Titolo 4" },
				{ text: "h5", value: "Titolo 5" },
				{ text: "h6", value: "Titolo 6" },
				{ text: "p", value: "Normal" }
			]
};

$.ig.HtmlEditor.locale = $.ig.HtmlEditor.locale || $.ig.locale.it.HtmlEditor;
return $.ig.locale.it.HtmlEditor;
}));// REMOVE_FROM_COMBINED_FILES
