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
			boldButtonTitle: 'Bold',
			italicButtonTitle: 'Italic',
			underlineButtonTitle: 'Underline',
			strikethroughButtonTitle: 'Strikethrough',
			increaseFontSizeButtonTitle: 'Increase Font Size',
			decreaseFontSizeButtonTitle: 'Decrease Font Size',
			alignTextLeftButtonTitle: 'Align Text Left',
			alignTextRightButtonTitle: 'Align Text Right',
			alignTextCenterButtonTitle: 'Center',
			justifyButtonTitle: 'Justify',
			bulletsButtonTitle: 'Bullets',
			numberingButtonTitle: 'Numbering',
			decreaseIndentButtonTitle: 'Decrease Indent',
			increaseIndentButtonTitle: 'Increase Indent',
			insertPictureButtonTitle: 'Insert Picture',
			fontColorButtonTitle: 'Font Color',
			textHighlightButtonTitle: 'Text Highlight Color',
			insertLinkButtonTitle: 'Insert Hyperlink',
			insertTableButtonTitle: 'Table',
			addRowButtonTitle: 'Add Row',
			removeRowButtonTitle: 'Remove Row',
			addColumnButtonTitle: 'Add Column',
			removeColumnButtonTitle: 'Remove Column',
			inserHRButtonTitle: 'Insert Horizontal Rule',
			viewSourceButtonTitle: 'View Source',
			cutButtonTitle: 'Cut',
			copyButtonTitle: 'Copy',
			pasteButtonTitle: 'Paste',
			undoButtonTitle: 'Undo',
			redoButtonTitle: 'Redo',
			imageUrlDialogText: 'Image URL:',
			imageAlternativeTextDialogText: 'Alternative Text:',
			imageWidthDialogText: 'Image Width:',
			imageHeihgtDialogText: 'Image Height:',
			linkNavigateToUrlDialogText: 'Navigate to URL:',
			linkDisplayTextDialogText: 'Display Text:',
			linkOpenInDialogText: 'Open In:',
			linkTargetNewWindowDialogText: 'New Window',
			linkTargetSameWindowDialogText: 'Same Window',
			linkTargetParentWindowDialogText: 'Parent Window',
			linkTargetTopmostWindowDialogText: 'Topmost Window',
			applyButtonTitle: 'Apply',
			cancelButtonTitle: 'Cancel',
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
		}

	});
}
}));// REMOVE_FROM_COMBINED_FILES
