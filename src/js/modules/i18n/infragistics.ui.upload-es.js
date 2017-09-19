/*!@license
* Infragistics.Web.ClientUI Upload localization resources <build_number>
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

    if (!$.ig.Upload) {
	    $.ig.Upload = {};

	    $.extend($.ig.Upload, {

		    locale: {
			    labelUploadButton: "Cargar archivo",
			    labelAddButton: "Agregar",
			    labelClearAllButton: "Borrar cargados",
			    // M.H. 13 May 2011 - fix bug 75042
			    labelSummaryTemplate: "{0} de {1} cargados",
			    labelSummaryProgressBarTemplate: "{0}/{1}",
			    labelShowDetails: "Mostrar detalles",
			    labelHideDetails: "Ocultar detalles",
			    labelSummaryProgressButtonCancel: "Cancelar",
			    // M.H. 1 June 2011 Fix bug #77532
			    labelSummaryProgressButtonContinue: "Cargar",
			    labelSummaryProgressButtonDone: "Terminado",
			    labelProgressBarFileNameContinue: "...",

			    //error messages
			    errorMessageFileSizeExceeded: "Se ha excedido el tamaño máximo de archivo.",
			    errorMessageGetFileStatus: "¡Imposible obtener el estado de archivo actual! Probablemente se ha cortado la conexión.",
			    errorMessageCancelUpload: "¡Imposible enviar comando al servidor para cancelar la carga! Probablemente se ha cortado la conexión.",
			    errorMessageNoSuchFile: "No se ha encontrado el archivo que ha solicitado. Probablemente el archivo es demasiado grande.",
			    errorMessageOther: "Error interno al cargar el archivo. Código de error: {0}.",
			    errorMessageValidatingFileExtension: "Error en la validación de extensión del archivo.",
			    errorMessageAJAXRequestFileSize: "Error de AJAX al intentar obtener el tamaño del archivo.",
			    errorMessageMaxUploadedFiles: "Se ha superado el número máximo de archivos que pueden cargarse.",
			    errorMessageMaxSimultaneousFiles: "El valor de maxSimultaneousFilesUploads es incorrecto. Debe ser superior a 0 o nulo.",
			    errorMessageTryToRemoveNonExistingFile: "Está intentando eliminar un archivo no existente con el Id. {0}.",
			    errorMessageTryToStartNonExistingFile: "Está intentando ejecutar un archivo no existente con el Id. {0}.",
			    errorMessageDropMultipleFilesWhenSingleModel: "No se permite soltar más de 1 archivo en el modo único",

			    // M.H. 12 May 2011 - fix bug 74763: add title to all buttons
			    // title attributes            
			    titleUploadFileButtonInit: "Cargar archivo",
			    titleAddFileButton: "Agregar",
			    titleCancelUploadButton: "Cancelar",
			    // M.H. 1 June 2011 Fix bug #77532
			    titleSummaryProgressButtonContinue: "Cargar",
			    titleClearUploaded: "Borrar cargados",
			    titleShowDetailsButton: "Mostrar detalles",
			    titleHideDetailsButton: "Ocultar detalles",
			    titleSummaryProgressButtonCancel: "Cancelar",
			    titleSummaryProgressButtonDone: "Terminado",
			    // M.H. 1 June 2011 Fix bug #77532
			    titleSingleUploadButtonContinue: "Cargar",
			    titleClearAllButton: "Borrar cargados"
		    }
	    });

    }
}));// REMOVE_FROM_COMBINED_FILES
