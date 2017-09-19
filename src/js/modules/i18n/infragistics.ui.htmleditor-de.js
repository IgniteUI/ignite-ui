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
		define( [
			"jquery"
		], factory );
	} else {
		factory(jQuery);
	}
}
(function ($) {
$.ig = $.ig || {};

if (!$.ig.HtmlEditor) {
	$.ig.HtmlEditor = {};

	$.extend($.ig.HtmlEditor, {

		locale: {
			boldButtonTitle: 'Fett',
			italicButtonTitle: 'Kursiv',
			underlineButtonTitle: 'Unterstrichen',
			strikethroughButtonTitle: 'Durchgestrichen',
			increaseFontSizeButtonTitle: 'Schriftart vergrößern',
			decreaseFontSizeButtonTitle: 'Schriftart verkleinern',
			alignTextLeftButtonTitle: 'Text linksbündig ausrichten',
			alignTextRightButtonTitle: 'Text rechtsbündig ausrichten',
			alignTextCenterButtonTitle: 'Zentrieren',
			justifyButtonTitle: 'Ausrichten',
			bulletsButtonTitle: 'Aufzählungszeichen',
			numberingButtonTitle: 'Nummerierung',
			decreaseIndentButtonTitle: 'Einzug verkleinern',
			increaseIndentButtonTitle: 'Einzug vergrößern',
			insertPictureButtonTitle: 'Bild einfügen',
			fontColorButtonTitle: 'Schriftfarbe',
			textHighlightButtonTitle: 'Texthervorhebungsfarbe',
			insertLinkButtonTitle: 'Hyperlink einfügen',
			insertTableButtonTitle: 'Tabelle',
			addRowButtonTitle: 'Zeile hinzufügen',
			removeRowButtonTitle: 'Zeile entfernen',
			addColumnButtonTitle: 'Spalte hinzufügen',
			removeColumnButtonTitle: 'Spalte entfernen',
			inserHRButtonTitle: 'Horizontale Linie einfügen',
			viewSourceButtonTitle: 'Quelle anzeigen',
			cutButtonTitle: 'Ausschneiden',
			copyButtonTitle: 'Kopieren',
			pasteButtonTitle: 'Einfügen',
			undoButtonTitle: 'Rückgängig',
			redoButtonTitle: 'Wiederholen',
			imageUrlDialogText: 'Bild-URL:',
			imageAlternativeTextDialogText: 'Alternativer Text:',
			imageWidthDialogText: 'Bildbreite:',
			imageHeihgtDialogText: 'Bildhöhe:',
			linkNavigateToUrlDialogText: 'Zu URL navigieren:',
			linkDisplayTextDialogText: 'Text anzeigen:',
			linkOpenInDialogText: 'Öffnen in:',
			linkTargetNewWindowDialogText: 'Neues Fenster',
			linkTargetSameWindowDialogText: 'Gleiches Fenster',
			linkTargetParentWindowDialogText: 'Übergeordnetes Fenster',
			linkTargetTopmostWindowDialogText: 'Fenster im Vordergrund',
			applyButtonTitle: 'Übernehmen',
			cancelButtonTitle: 'Abbrechen',
			defaultToolbars: {
			    textToolbar: "text manipulation toolbar",
			    formattingToolbar: "text formatting toolbar",
			    insertObjectToolbar: "objects insertion toolbar",
			    copyPasteToolbar: "copy/paste toolbar"
			},
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
				{ text: "1", value: "7.5 pt" },
				{ text: "2", value: "10 pt" },
				{ text: "3", value: "12 pt" },
				{ text: "4", value: "13.5 pt" },
				{ text: "5", value: "18 pt" },
				{ text: "6", value: "24 pt" },
				{ text: "7", value: "36 pt" }
			],
			formatsList: [
					{ text: "h1", value: "Überschrift 1" },
					{ text: "h2", value: "Überschrift 2" },
					{ text: "h3", value: "Überschrift 3" },
					{ text: "h4", value: "Überschrift 4" },
					{ text: "h5", value: "Überschrift 5" },
					{ text: "h6", value: "Überschrift 6" },
                    { text: "p", value: "Normal" }
				]
		}

	});
}
}));// REMOVE_FROM_COMBINED_FILES
