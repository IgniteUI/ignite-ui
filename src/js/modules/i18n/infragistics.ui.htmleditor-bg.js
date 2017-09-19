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
			boldButtonTitle: 'Получер',
			italicButtonTitle: 'Курсив',
			underlineButtonTitle: 'Подчертано',
			strikethroughButtonTitle: 'Зачеркнат',
			increaseFontSizeButtonTitle: 'Увеличи размера на шрифта',
			decreaseFontSizeButtonTitle: 'Намали размера на шрифта',
			alignTextLeftButtonTitle: 'Подравняване на текст отляво',
			alignTextRightButtonTitle: 'Подравняване на текст отдясно',
			alignTextCenterButtonTitle: 'Центрирано',
			justifyButtonTitle: 'Двустранно подравняване',
			bulletsButtonTitle: 'Водещи символи',
			numberingButtonTitle: 'Номериране',
			decreaseIndentButtonTitle: 'Намали отстъпа',
			increaseIndentButtonTitle: 'Увеличи отстъпа',
			insertPictureButtonTitle: 'Вмъкване на картина',
			fontColorButtonTitle: 'Цвят на шрифт',
			textHighlightButtonTitle: 'Цвят на осветяване на текст',
			insertLinkButtonTitle: 'Вмъкване на хипервръзка',
			insertTableButtonTitle: 'Таблица',
			addRowButtonTitle: 'Прибави ред',
			removeRowButtonTitle: 'Премахни ред',
			addColumnButtonTitle: 'Прибави колона',
			removeColumnButtonTitle: 'Премахни колона',
			inserHRButtonTitle: 'Insert Horizontal Rule',
			viewSourceButtonTitle: 'Покажи сорс кода',
			cutButtonTitle: 'Изрежи',
			copyButtonTitle: 'Копирай',
			pasteButtonTitle: 'Постави',
			undoButtonTitle: 'Undo',
			redoButtonTitle: 'Redo',
			imageUrlDialogText: 'URL на картината:',
			imageAlternativeTextDialogText: 'Алтернативен текст:',
			imageWidthDialogText: 'Широчина на изображението:',
			imageHeihgtDialogText: 'Височина на изображението:',
			linkNavigateToUrlDialogText: 'Навигирай към URL:',
			linkDisplayTextDialogText: 'Текст:',
			linkOpenInDialogText: 'Отвори във:',
			linkTargetNewWindowDialogText: 'Нов прозорец',
			linkTargetSameWindowDialogText: 'Съшият прозорец',
			linkTargetParentWindowDialogText: 'Майчиният прозорец',
			linkTargetTopmostWindowDialogText: 'Най-горният прозорец',
			applyButtonTitle: 'Изпълни',
			cancelButtonTitle: 'Отказ',
			defaultToolbars: {
			    textToolbar: "лентата с инструменти за манипулация на текст",
			    formattingToolbar: "лентата с инструменти за форматиране на текст",
			    insertObjectToolbar: "лентата с инструменти за вмъкване на обекти",
			    copyPasteToolbar: "лентата с инструменти за копиране/поставяне"
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
					{ text: "h1", value: "Заглавие 1" },
					{ text: "h2", value: "Заглавие 2" },
					{ text: "h3", value: "Заглавие 3" },
					{ text: "h4", value: "Заглавие 4" },
					{ text: "h5", value: "Заглавие 5" },
					{ text: "h6", value: "Заглавие 6" },
                    { text: "p", value: "Нормално" }
				]
		}

	});
}
}));// REMOVE_FROM_COMBINED_FILES
