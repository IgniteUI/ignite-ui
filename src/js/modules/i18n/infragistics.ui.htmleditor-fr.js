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
			boldButtonTitle: 'Gras',
			italicButtonTitle: 'Italique',
			underlineButtonTitle: 'Souligné',
			strikethroughButtonTitle: 'Barré',
			increaseFontSizeButtonTitle: 'Agrandir la police',
			decreaseFontSizeButtonTitle: 'Réduire la police',
			alignTextLeftButtonTitle: 'Aligner le texte à gauche',
			alignTextRightButtonTitle: 'Aligner le texte à droite',
			alignTextCenterButtonTitle: 'Centrer',
			justifyButtonTitle: 'Justifier',
			bulletsButtonTitle: 'Puces',
			numberingButtonTitle: 'Numérotation',
			decreaseIndentButtonTitle: 'Diminuer le retrait',
			increaseIndentButtonTitle: 'Augmenter le retrait',
			insertPictureButtonTitle: 'Insérer une image',
			fontColorButtonTitle: 'Couleur de police',
			textHighlightButtonTitle: 'Couleur de surbrillance du texte',
			insertLinkButtonTitle: 'Insérer un lien hypertexte',
			insertTableButtonTitle: 'Tableau',
			addRowButtonTitle: 'Ajouter une ligne',
			removeRowButtonTitle: 'Supprimer une ligne',
			addColumnButtonTitle: 'Ajouter une colonne',
			removeColumnButtonTitle: 'Supprimer une colonne',
			inserHRButtonTitle: 'Insérer une règle horizontale',
			viewSourceButtonTitle: 'Afficher la source',
			cutButtonTitle: 'Couper',
			copyButtonTitle: 'Copier',
			pasteButtonTitle: 'Coller',
			undoButtonTitle: 'Annuler',
			redoButtonTitle: 'Rétablir',
			imageUrlDialogText: 'URL image :',
			imageAlternativeTextDialogText: 'Texte alternatif :',
			imageWidthDialogText: "Largeur de l'image :",
			imageHeihgtDialogText: "Hauteur de l'image :",
			linkNavigateToUrlDialogText: "Naviguer vers l'URL :",
			linkDisplayTextDialogText: 'Afficher le texte :',
			linkOpenInDialogText: 'Ouvrir dans :',
			linkTargetNewWindowDialogText: 'Nouvelle fenêtre',
			linkTargetSameWindowDialogText: 'Même fenêtre',
			linkTargetParentWindowDialogText: 'Fenêtre parent',
			linkTargetTopmostWindowDialogText: 'Fenêtre supérieure',
			applyButtonTitle: 'Appliquer',
			cancelButtonTitle: 'Annuler',
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
					{ text: "h1", value: "En-tête 1" },
					{ text: "h2", value: "En-tête 2" },
					{ text: "h3", value: "En-tête 3" },
					{ text: "h4", value: "En-tête 4" },
					{ text: "h5", value: "En-tête 5" },
					{ text: "h6", value: "En-tête 6" },
                    { text: "p", value: "Normal" }
				]
		}

	});
}
}));// REMOVE_FROM_COMBINED_FILES
