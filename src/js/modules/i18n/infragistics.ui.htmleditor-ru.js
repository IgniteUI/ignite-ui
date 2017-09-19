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
			boldButtonTitle: 'Жирность',
			italicButtonTitle: 'Наклон',
			underlineButtonTitle: 'Подчеркивание',
			strikethroughButtonTitle: 'Зачеркивание',
			increaseFontSizeButtonTitle: 'Увеличить размер шрифта',
			decreaseFontSizeButtonTitle: 'Уменьшить размер шрифта',
			alignTextLeftButtonTitle: 'Выравнить влево',
			alignTextRightButtonTitle: 'Выравнить вправо',
			alignTextCenterButtonTitle: 'Выравнить по центру',
			justifyButtonTitle: 'Распределить',
			bulletsButtonTitle: 'Пункты',
			numberingButtonTitle: 'Нумеровка',
			decreaseIndentButtonTitle: 'Уменьшить отступ',
			increaseIndentButtonTitle: 'Увеличить отступ',
			insertPictureButtonTitle: 'Вставить картинку',
			fontColorButtonTitle: 'Цвет букв',
			textHighlightButtonTitle: 'Цвет отметки',
			insertLinkButtonTitle: 'Вставить ссылку',
			insertTableButtonTitle: 'Таблица',
			addRowButtonTitle: 'Добавить ряд',
			removeRowButtonTitle: 'Удалить ряд',
			addColumnButtonTitle: 'Добавить колонку',
			removeColumnButtonTitle: 'Удалить колонку',
			inserHRButtonTitle: 'Вставить разделитель',
			viewSourceButtonTitle: 'Показать HTML',
			cutButtonTitle: 'Вырезать',
			copyButtonTitle: 'Копировать',
			pasteButtonTitle: 'Вставить',
			undoButtonTitle: 'Отменить изменения',
			redoButtonTitle: 'Вернуть изменения',
			imageUrlDialogText: 'URL картинки:',
			imageAlternativeTextDialogText: 'Дополнительный текст:',
			imageWidthDialogText: 'Ширина картинки:',
			imageHeihgtDialogText: 'Высота картинки:',
			linkNavigateToUrlDialogText: 'URL адрес:',
			linkDisplayTextDialogText: 'Текст ссылки:',
			linkOpenInDialogText: 'Назначение:',
			linkTargetNewWindowDialogText: 'Новое окно',
			linkTargetSameWindowDialogText: 'Текущее окно',
			linkTargetParentWindowDialogText: 'Родительское окно',
			linkTargetTopmostWindowDialogText: 'Верхнее окно',
			applyButtonTitle: 'Применить',
			cancelButtonTitle: 'Отмена',
			defaultToolbars: {
			    textToolbar: "Панель инструментов для работы с текстом",
			    formattingToolbar: "Панель инструментов для форматирования текста",
			    insertObjectToolbar: "Панель инструментов для добавления объектов",
			    copyPasteToolbar: "Панель инструментов для копирования и вставки"
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
					{ text: "h1", value: "Заголовок 1" },
					{ text: "h2", value: "Заголовок 2" },
					{ text: "h3", value: "Заголовок 3" },
					{ text: "h4", value: "Заголовок 4" },
					{ text: "h5", value: "Заголовок 5" },
					{ text: "h6", value: "Заголовок 6" },
                    { text: "p", value: "Обычный" }
				]
		}

	});
}
}));// REMOVE_FROM_COMBINED_FILES
