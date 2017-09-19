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
			boldButtonTitle: 'Negrita',
			italicButtonTitle: 'Cursiva',
			underlineButtonTitle: 'Subrayado',
			strikethroughButtonTitle: 'Tachado',
			increaseFontSizeButtonTitle: 'Aumentar tamaño de fuente',
			decreaseFontSizeButtonTitle: 'Disminuir tamaño de fuente',
			alignTextLeftButtonTitle: 'Alinear texto a la izquierda',
			alignTextRightButtonTitle: 'Alinear texto a la derecha',
			alignTextCenterButtonTitle: 'Centrar',
			justifyButtonTitle: 'Justificar',
			bulletsButtonTitle: 'Viñetas',
			numberingButtonTitle: 'Numeración',
			decreaseIndentButtonTitle: 'Disminuir sangría',
			increaseIndentButtonTitle: 'Aumentar sangría',
			insertPictureButtonTitle: 'Insertar imagen',
			fontColorButtonTitle: 'Color de fuente',
			textHighlightButtonTitle: 'Color de resaltado de texto',
			insertLinkButtonTitle: 'Insertar hipervínculo',
			insertTableButtonTitle: 'Tabla',
			addRowButtonTitle: 'Agregar fila',
			removeRowButtonTitle: 'Quitar fila',
			addColumnButtonTitle: 'Agregar columna',
			removeColumnButtonTitle: 'Quitar columna',
			inserHRButtonTitle: 'Insertar regla horizontal',
			viewSourceButtonTitle: 'Mostrar origen',
			cutButtonTitle: 'Cortar',
			copyButtonTitle: 'Copiar',
			pasteButtonTitle: 'Pegar',
			undoButtonTitle: 'Deshacer',
			redoButtonTitle: 'Rehacer',
			imageUrlDialogText: 'Dirección URL de la imagen:',
			imageAlternativeTextDialogText: 'Texto alternativo:',
			imageWidthDialogText: 'Ancho de la imagen:',
			imageHeihgtDialogText: 'Alto de la imagen:',
			linkNavigateToUrlDialogText: 'Navegar a la dirección URL:',
			linkDisplayTextDialogText: 'Mostrar texto:',
			linkOpenInDialogText: 'Abrir en:',
			linkTargetNewWindowDialogText: 'Nueva ventana',
			linkTargetSameWindowDialogText: 'Misma ventana',
			linkTargetParentWindowDialogText: 'Ventana primaria',
			linkTargetTopmostWindowDialogText: 'Ventana de nivel superior',
			applyButtonTitle: 'Aplicar',
			cancelButtonTitle: 'Cancelar',
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
					{ text: "h1", value: "Encabezado 1" },
					{ text: "h2", value: "Encabezado 2" },
					{ text: "h3", value: "Encabezado 3" },
					{ text: "h4", value: "Encabezado 4" },
					{ text: "h5", value: "Encabezado 5" },
					{ text: "h6", value: "Encabezado 6" },
                    { text: "p", value: "Normal" }
				]
		}

	});
}
}));// REMOVE_FROM_COMBINED_FILES
