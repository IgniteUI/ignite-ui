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
		define( ["jquery"], factory );
	} else {
		return factory(jQuery);
	}
}
(function ($) {
	$.ig = $.ig || {};
	$.ig.Upload = $.ig.Upload || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.pt = $.ig.locale.pt || {};

	$.ig.locale.pt.Upload = {
			    labelUploadButton: "Carregar ficheiro",
			    labelAddButton: "Adicionar",
			    labelClearAllButton: "Limpar carregamento",
			    // M.H. 13 May 2011 - fix bug 75042
			    labelSummaryTemplate: "{0} de {1} carregou",
			    labelSummaryProgressBarTemplate: "{0}/{1}",
			    labelShowDetails: "Mostrar detalhes",
			    labelHideDetails: "Ocultar detalhes",
			    labelSummaryProgressButtonCancel: "Cancelar",
			    // M.H. 1 June 2011 Fix bug #77532
			    labelSummaryProgressButtonContinue: "Carregar",
			    labelSummaryProgressButtonDone: "Concluído",
			    labelProgressBarFileNameContinue: "...",

			    //error messages
			    errorMessageFileSizeExceeded: "Tamanho máximo do ficheiro excedido.",
			    errorMessageGetFileStatus: "Não foi possível obter o estado atual do ficheiro! Provavelmente a ligação caiu.",
			    errorMessageCancelUpload: "Não foi possível enviar ao comando do servidor para cancelar o carregamento! Provavelmente a ligação caiu.",
			    errorMessageNoSuchFile: "Não foi possível encontrar o ficheiro que solicitou. Provavelmente este ficheiro é demasiado grande.",
			    errorMessageOther: "Ocorreu um erro interno ao carregar o ficheiro. Código do erro: {0}.",
			    errorMessageValidatingFileExtension: "Falha na validação da extensão do ficheiro.",
			    errorMessageAJAXRequestFileSize: "Erro AJAX ao tentar obter o tamanho do ficheiro.",
			    errorMessageMaxUploadedFiles: "Contagem máxima de ficheiros carregados excedida.",
			    errorMessageMaxSimultaneousFiles: "O valor de máx.DeCarregamentosDeFicheirosSimultâneos está incorreto. Deve ser maior que 0 ou nulo.",
			    errorMessageTryToRemoveNonExistingFile: "Está a tentar remover um ficheiro inexistente com o ID {0}.",
			    errorMessageTryToStartNonExistingFile: "Está a tentar iniciar um ficheiro inexistente com o ID {0}.",
				errorMessageDropMultipleFilesWhenSingleModel: "Não é permitido largar mais de 1 ficheiro quando o modo é único",

			    // M.H. 12 May 2011 - fix bug 74763: add title to all buttons
			    // title attributes            
			    titleUploadFileButtonInit: "Carregar ficheiro",
			    titleAddFileButton: "Adicionar",
			    titleCancelUploadButton: "Cancelar",
			    // M.H. 1 June 2011 Fix bug #77532
			    titleSummaryProgressButtonContinue: "Carregar",
			    titleClearUploaded: "Limpar carregamento",
			    titleShowDetailsButton: "Mostrar detalhes",
			    titleHideDetailsButton: "Ocultar detalhes",
			    titleSummaryProgressButtonCancel: "Cancelar",
			    titleSummaryProgressButtonDone: "Concluído",
			    // M.H. 1 June 2011 Fix bug #77532
			    titleSingleUploadButtonContinue: "Carregar",
			    titleClearAllButton: "Limpar carregamento"
	}
		
	$.ig.Upload.locale = $.ig.Upload.locale || $.ig.locale.pt.Upload;
	return $.ig.locale.pt.Upload;
}));// REMOVE_FROM_COMBINED_FILES
