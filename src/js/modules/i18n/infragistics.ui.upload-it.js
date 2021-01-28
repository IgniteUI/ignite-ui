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
	$.ig.locale.it = $.ig.locale.it || {};

	$.ig.locale.it.Upload = {
			    labelUploadButton: "Carica file",
			    labelAddButton: "Aggiungi",
			    labelClearAllButton: "Cancella caricato",
			    // M.H. 13 May 2011 - fix bug 75042
			    labelSummaryTemplate: "{0} di {1} caricati",
			    labelSummaryProgressBarTemplate: "{0}/{1}",
			    labelShowDetails: "Mostra dettagli",
			    labelHideDetails: "Nascondi dettagli",
			    labelSummaryProgressButtonCancel: "Annulla",
			    // M.H. 1 June 2011 Fix bug #77532
			    labelSummaryProgressButtonContinue: "Carica",
			    labelSummaryProgressButtonDone: "Fine",
			    labelProgressBarFileNameContinue: "...",

			    //error messages
			    errorMessageFileSizeExceeded: "Dimensione massima del file superata.",
			    errorMessageGetFileStatus: "Impossibile ottenere lo stato del file corrente! Probabilmente la connessione è caduta.",
			    errorMessageCancelUpload: "Impossibile inviare il comando al server per annullare il caricamento! Probabilmente la connessione è caduta.",
			    errorMessageNoSuchFile: "Impossibile trovare il file richiesto. Probabilmente questo file è troppo grande.",
			    errorMessageOther: "Errore interno durante il caricamento del file. Codice errore: {0}.",
			    errorMessageValidatingFileExtension: "Convalida dell'estensione del file non riuscita.",
			    errorMessageAJAXRequestFileSize: "Errore AJAX durante il tentativo di ottenere le dimensioni del file.",
			    errorMessageMaxUploadedFiles: "Superato il numero massimo di file caricati.",
			    errorMessageMaxSimultaneousFiles: "Il valore di maxSimultaneousFilesUploads non è corretto. Dovrebbe essere maggiore di 0 o null.",
			    errorMessageTryToRemoveNonExistingFile: "Si sta tentando di rimuovere il file inesistente con id {0}.",
			    errorMessageTryToStartNonExistingFile: "Si sta tentando di avviare un file inesistente con id {0}.",
				errorMessageDropMultipleFilesWhenSingleModel: "Non è consentito eliminare più di 1 file quando la modalità è singola",

			    // M.H. 12 May 2011 - fix bug 74763: add title to all buttons
			    // title attributes            
			    titleUploadFileButtonInit: "Carica file",
			    titleAddFileButton: "Aggiungi",
			    titleCancelUploadButton: "Annulla",
			    // M.H. 1 June 2011 Fix bug #77532
			    titleSummaryProgressButtonContinue: "Carica",
			    titleClearUploaded: "Cancella caricato",
			    titleShowDetailsButton: "Mostra dettagli",
			    titleHideDetailsButton: "Nascondi dettagli",
			    titleSummaryProgressButtonCancel: "Annulla",
			    titleSummaryProgressButtonDone: "Fine",
			    // M.H. 1 June 2011 Fix bug #77532
			    titleSingleUploadButtonContinue: "Carica",
			    titleClearAllButton: "Cancella caricato"
	}
		
	$.ig.Upload.locale = $.ig.Upload.locale || $.ig.locale.it.Upload;
	return $.ig.locale.it.Upload;
}));// REMOVE_FROM_COMBINED_FILES
