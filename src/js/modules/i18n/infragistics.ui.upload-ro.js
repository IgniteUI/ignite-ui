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
	$.ig.locale.ro = $.ig.locale.ro || {};

	$.ig.locale.ro.Upload = {
			    labelUploadButton: "Încarcă fișier",
			    labelAddButton: "Adăuga",
			    labelClearAllButton: "Ștergeți fișierele încărcate",
			    // M.H. 13 May 2011 - fix bug 75042
			    labelSummaryTemplate: "{0} din {1} încărcate",
			    labelSummaryProgressBarTemplate: "{0}/{1}",
			    labelShowDetails: "Arata detaliile",
			    labelHideDetails: "Ascunde detaliile",
			    labelSummaryProgressButtonCancel: "Anulare",
			    // M.H. 1 June 2011 Fix bug #77532
			    labelSummaryProgressButtonContinue: "Încărcare",
			    labelSummaryProgressButtonDone: "Terminat",
			    labelProgressBarFileNameContinue: "...",

			    //error messages
			    errorMessageFileSizeExceeded: "Dimensiunea maximă a fișierului a fost depășită.",
			    errorMessageGetFileStatus: "Nu s-a putut obține starea fișierului curent! Probabil că conexiunea a căzut.",
			    errorMessageCancelUpload: "Nu s-a putut trimite la server comanda pentru a anula încărcarea! Probabil că conexiunea a căzut.",
			    errorMessageNoSuchFile: "Fișierul pe care l-ați solicitat nu a putut fi găsit. Probabil că acest fișier este prea mare.",
			    errorMessageOther: "Există o eroare internă la încărcarea fișierului. Cod de eroare: {0}.",
			    errorMessageValidatingFileExtension: "Validarea extensiei de fișier nu a reușit.",
			    errorMessageAJAXRequestFileSize: "Eroare AJAX în timp ce încercați să obțineți dimensiunea fișierului.",
			    errorMessageMaxUploadedFiles: "Numărul maxim de încărcări de fișiere a fost depășit.",
			    errorMessageMaxSimultaneousFiles: "Valoarea maxSimultaneousFilesUploads este incorectă. Ar trebui să fie mai mare de 0 sau nul.",
			    errorMessageTryToRemoveNonExistingFile: "Încercați să eliminați fișierul inexistent cu codul {0}.",
			    errorMessageTryToStartNonExistingFile: "Încercați să porniți fișierul inexistent cu codul {0}.",
				errorMessageDropMultipleFilesWhenSingleModel: "Nu este permis să renunțați la mai mult de 1 fișier atunci când modul este unic",

			    // M.H. 12 May 2011 - fix bug 74763: add title to all buttons
			    // title attributes            
			    titleUploadFileButtonInit: "Încarcă fișier",
			    titleAddFileButton: "Adăuga",
			    titleCancelUploadButton: "Anulare",
			    // M.H. 1 June 2011 Fix bug #77532
			    titleSummaryProgressButtonContinue: "Încărcare",
			    titleClearUploaded: "Ștergeți fișierele încărcate",
			    titleShowDetailsButton: "Arata detaliile",
			    titleHideDetailsButton: "Ascunde detaliile",
			    titleSummaryProgressButtonCancel: "Anulare",
			    titleSummaryProgressButtonDone: "Terminat",
			    // M.H. 1 June 2011 Fix bug #77532
			    titleSingleUploadButtonContinue: "Încărcare",
			    titleClearAllButton: "Ștergeți fișierele încărcate"
	}
		
	$.ig.Upload.locale = $.ig.Upload.locale || $.ig.locale.ro.Upload;
	return $.ig.locale.ro.Upload;
}));// REMOVE_FROM_COMBINED_FILES
