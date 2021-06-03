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
	$.ig.locale.hu = $.ig.locale.hu || {};
	$.ig.HtmlEditor = $.ig.HtmlEditor || {};
	
	$.ig.locale.hu.HtmlEditor = {
		boldButtonTitle: 'Félkövér',
		italicButtonTitle: 'Dőlt',
		underlineButtonTitle: 'Aláhúzás',
		strikethroughButtonTitle: 'Áthúzás',
		increaseFontSizeButtonTitle: 'Betűméret növelése',
		decreaseFontSizeButtonTitle: 'Betűméret csökkentéses',
		alignTextLeftButtonTitle: 'Szöveg balra igazítása',
		alignTextRightButtonTitle: 'Szöveg jobbra igazítása',
		alignTextCenterButtonTitle: 'Középre',
		justifyButtonTitle: 'Sorkizárt',
		bulletsButtonTitle: 'Felsorolás',
		numberingButtonTitle: 'Számozás',
		decreaseIndentButtonTitle: 'Behúzás csökkentése',
		increaseIndentButtonTitle: 'Behúzás növelése',
		insertPictureButtonTitle: 'Kép beszúrása',
		fontColorButtonTitle: 'Betűszín',
		textHighlightButtonTitle: 'Szövegkiemelés színe',
		insertLinkButtonTitle: 'Hiperhivatkozás beszúrása',
		insertTableButtonTitle: 'Táblázat',
		addRowButtonTitle: 'Sor hozzáadása',
		removeRowButtonTitle: 'Sor törlése',
		addColumnButtonTitle: 'Oszlop hozzáadása',
		removeColumnButtonTitle: 'Oszlop törlése',
		inserHRButtonTitle: 'Vízszintes térelválasztó beszúrása',
		viewSourceButtonTitle: 'Forrás megtekintése',
		cutButtonTitle: 'Kivágás',
		copyButtonTitle: 'Másolás',
		pasteButtonTitle: 'Beillesztés',
		undoButtonTitle: 'Visszavonás',
		redoButtonTitle: 'Visszaállítás',
		imageUrlDialogText: 'Kép URL-je:',
		imageAlternativeTextDialogText: 'Alternatív szöveg:',
		imageWidthDialogText: 'Kép szélessége:',
		imageHeihgtDialogText: 'Kép magassága:',
		linkNavigateToUrlDialogText: 'Ugrás URL-re:',
		linkDisplayTextDialogText: 'Megjelenített szöveg:',
		linkOpenInDialogText: 'Megnyitás ebben:',
		linkTargetNewWindowDialogText: 'Új ablak',
		linkTargetSameWindowDialogText: 'Ugyanaz az ablak',
		linkTargetParentWindowDialogText: 'Szülőablak',
		linkTargetTopmostWindowDialogText: 'Legfelső ablak',
		applyButtonTitle: 'Alkalmaz',
		cancelButtonTitle: 'Mégse',
		textToolbar: "szövegszerkesztő eszköztár",
		formattingToolbar: "szövegformázó eszköztár",
		insertObjectToolbar: "objektumbeszúrási eszköztár",
		copyPasteToolbar: "másolás/beillesztés eszköztár",
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
				{ text: "h1", value: "Címsor 1" },
				{ text: "h2", value: "Címsor 2" },
				{ text: "h3", value: "Címsor 3" },
				{ text: "h4", value: "Címsor 4" },
				{ text: "h5", value: "Címsor 5" },
				{ text: "h6", value: "Címsor 6" },
				{ text: "p", value: "Normál" }
			]
};

$.ig.HtmlEditor.locale = $.ig.HtmlEditor.locale || $.ig.locale.hu.HtmlEditor;
return $.ig.locale.hu.HtmlEditor;
}));// REMOVE_FROM_COMBINED_FILES
