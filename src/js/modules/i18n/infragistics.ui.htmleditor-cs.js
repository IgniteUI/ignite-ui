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
	$.ig.locale.cs = $.ig.locale.cs || {};
	$.ig.HtmlEditor = $.ig.HtmlEditor || {};
	
	$.ig.locale.cs.HtmlEditor = {
		boldButtonTitle: 'Tučně',
		italicButtonTitle: 'Kurzíva',
		underlineButtonTitle: 'Zdůraznit',
		strikethroughButtonTitle: 'Přeškrtnutí',
		increaseFontSizeButtonTitle: 'Zvětšete velikost písma',
		decreaseFontSizeButtonTitle: 'Zmenšit velikost písma',
		alignTextLeftButtonTitle: 'Zarovnat text doleva',
		alignTextRightButtonTitle: 'Zarovnejte text správně',
		alignTextCenterButtonTitle: 'Centrum',
		justifyButtonTitle: 'Ospravedlnit',
		bulletsButtonTitle: 'Kulky',
		numberingButtonTitle: 'Číslování',
		decreaseIndentButtonTitle: 'Zmenšit odsazení',
		increaseIndentButtonTitle: 'Zvětšit odsazení',
		insertPictureButtonTitle: 'Vložit obrázek',
		fontColorButtonTitle: 'Barva fontu',
		textHighlightButtonTitle: 'Barva zvýraznění textu',
		insertLinkButtonTitle: 'Vložte hypertextový odkaz',
		insertTableButtonTitle: 'Stůl',
		addRowButtonTitle: 'Přidat řádek',
		removeRowButtonTitle: 'Odebrat řádek',
		addColumnButtonTitle: 'Přidat sloupec',
		removeColumnButtonTitle: 'Odebrat sloupec',
		inserHRButtonTitle: 'Vložte vodorovné pravidlo',
		viewSourceButtonTitle: 'Zobrazit zdroj',
		cutButtonTitle: 'Střih',
		copyButtonTitle: 'Kopírovat',
		pasteButtonTitle: 'Vložit',
		undoButtonTitle: 'Vrátit',
		redoButtonTitle: 'Předělat',
		imageUrlDialogText: 'URL obrázku:',
		imageAlternativeTextDialogText: 'Alternativní text:',
		imageWidthDialogText: 'Šířka obrázku:',
		imageHeihgtDialogText: 'Výška obrázku:',
		linkNavigateToUrlDialogText: 'Přejít na URL:',
		linkDisplayTextDialogText: 'Zobrazit text:',
		linkOpenInDialogText: 'Otevři to:',
		linkTargetNewWindowDialogText: 'Nové okno',
		linkTargetSameWindowDialogText: 'Stejné okno',
		linkTargetParentWindowDialogText: 'Rodičovské okno',
		linkTargetTopmostWindowDialogText: 'Horní okno',
		applyButtonTitle: 'Aplikovat',
		cancelButtonTitle: 'zrušení',
		textToolbar: "panel nástrojů pro manipulaci s textem",
		formattingToolbar: "panel nástrojů pro formátování textu",
		insertObjectToolbar: "panel nástrojů pro vkládání objektů",
		copyPasteToolbar: "panel nástrojů kopírování / vkládání",
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
};

$.ig.HtmlEditor.locale = $.ig.HtmlEditor.locale || $.ig.locale.cs.HtmlEditor;
return $.ig.locale.cs.HtmlEditor;
}));// REMOVE_FROM_COMBINED_FILES
