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
	$.ig.locale.pt = $.ig.locale.pt || {};
	$.ig.HtmlEditor = $.ig.HtmlEditor || {};
	
	$.ig.locale.pt.HtmlEditor = {
		boldButtonTitle: 'Negrito',
		italicButtonTitle: 'Itálico',
		underlineButtonTitle: 'Sublinhar',
		strikethroughButtonTitle: 'Rasurado',
		increaseFontSizeButtonTitle: 'Aumentar tamanho do tipo de letra',
		decreaseFontSizeButtonTitle: 'Diminuir tamanho do tipo de letra',
		alignTextLeftButtonTitle: 'Alinhar texto à esquerda',
		alignTextRightButtonTitle: 'Alinhar texto à direita',
		alignTextCenterButtonTitle: 'Centro',
		justifyButtonTitle: 'Justificar',
		bulletsButtonTitle: 'Marcas de lista',
		numberingButtonTitle: 'Numeração',
		decreaseIndentButtonTitle: 'Diminuir avanço',
		increaseIndentButtonTitle: 'Aumentar avanço',
		insertPictureButtonTitle: 'Inserir imagem',
		fontColorButtonTitle: 'Cor do tipo de letra',
		textHighlightButtonTitle: 'Cor de realce do texto',
		insertLinkButtonTitle: 'Inserir hiperligação',
		insertTableButtonTitle: 'Tabela',
		addRowButtonTitle: 'Adicionar linha',
		removeRowButtonTitle: 'Remover linha',
		addColumnButtonTitle: 'Adicionar coluna',
		removeColumnButtonTitle: 'Remover coluna',
		inserHRButtonTitle: 'Inserir regra horizontal',
		viewSourceButtonTitle: 'Ver origem',
		cutButtonTitle: 'Cortar',
		copyButtonTitle: 'Copiar',
		pasteButtonTitle: 'Colar',
		undoButtonTitle: 'Desfazer',
		redoButtonTitle: 'Refazer',
		imageUrlDialogText: 'URL da imagem:',
		imageAlternativeTextDialogText: 'Texto alternativo:',
		imageWidthDialogText: 'Largura da imagem:',
		imageHeihgtDialogText: 'Altura da imagem:',
		linkNavigateToUrlDialogText: 'Navegue para o URL:',
		linkDisplayTextDialogText: 'Exibir texto:',
		linkOpenInDialogText: 'Abrir em:',
		linkTargetNewWindowDialogText: 'Nova janela',
		linkTargetSameWindowDialogText: 'Mesma janela',
		linkTargetParentWindowDialogText: 'Janela principal',
		linkTargetTopmostWindowDialogText: 'Janela superior',
		applyButtonTitle: 'Aplicar',
		cancelButtonTitle: 'Cancelar',
		textToolbar: "barra de ferramentas de manipulação de texto",
		formattingToolbar: "barra de ferramentas de formatação de texto",
		insertObjectToolbar: "barra de ferramentas de inserção de objetos",
		copyPasteToolbar: "copiar/colar barra de ferramentas",
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
				{ text: "h1", value: "Cabeçalho 1" },
				{ text: "h2", value: "Cabeçalho 2" },
				{ text: "h3", value: "Cabeçalho 3" },
				{ text: "h4", value: "Cabeçalho 4" },
				{ text: "h5", value: "Cabeçalho 5" },
				{ text: "h6", value: "Cabeçalho 6" },
				{ text: "p", value: "Normal" }
			]
};

$.ig.HtmlEditor.locale = $.ig.HtmlEditor.locale || $.ig.locale.pt.HtmlEditor;
return $.ig.locale.pt.HtmlEditor;
}));// REMOVE_FROM_COMBINED_FILES
