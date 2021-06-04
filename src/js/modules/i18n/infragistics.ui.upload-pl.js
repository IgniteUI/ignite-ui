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
	$.ig.locale.pl = $.ig.locale.pl || {};

	$.ig.locale.pl.Upload = {
			    labelUploadButton: "Przekaż plik",
			    labelAddButton: "Dodaj",
			    labelClearAllButton: "Wyczyść przekazane",
			    // M.H. 13 May 2011 - fix bug 75042
			    labelSummaryTemplate: "Przekazano {0} z {1}",
			    labelSummaryProgressBarTemplate: "{0}/{1}",
			    labelShowDetails: "Pokaż szczegóły",
			    labelHideDetails: "Ukryj szczegóły",
			    labelSummaryProgressButtonCancel: "Anuluj",
			    // M.H. 1 June 2011 Fix bug #77532
			    labelSummaryProgressButtonContinue: "Przekaż",
			    labelSummaryProgressButtonDone: "Gotowe",
			    labelProgressBarFileNameContinue: "...",

			    //error messages
			    errorMessageFileSizeExceeded: "Przekroczono maksymalny rozmiar pliku.",
			    errorMessageGetFileStatus: "Nie udało się uzyskać bieżącego stanu pliku! Prawdopodobnie połączenie zostało zerwane.",
			    errorMessageCancelUpload: "Nie można wysłać do serwera polecenia anulowania przekazywania! Prawdopodobnie połączenie zostało zerwane.",
			    errorMessageNoSuchFile: "Nie można znaleźć żądanego pliku. Prawdopodobnie ten plik jest za duży.",
			    errorMessageOther: "Wystąpił błąd wewnętrzny podczas przekazywania pliku. Kod błędu: {0}.",
			    errorMessageValidatingFileExtension: "Weryfikacja rozszerzenia pliku nie powiodła się.",
			    errorMessageAJAXRequestFileSize: "Błąd AJAX podczas próby uzyskania rozmiaru pliku.",
			    errorMessageMaxUploadedFiles: "Przekroczono maksymalną liczbę przekazywanych plików.",
			    errorMessageMaxSimultaneousFiles: "Wartość maxSimultaneousFilesUploads jest nieprawidłowa. Powinna być większa niż 0 lub równa zero.",
			    errorMessageTryToRemoveNonExistingFile: "Próbujesz usunąć nieistniejący plik o identyfikatorze {0}.",
			    errorMessageTryToStartNonExistingFile: "Próbujesz uruchomić nieistniejący plik o identyfikatorze {0}.",
				errorMessageDropMultipleFilesWhenSingleModel: "W trybie pojedynczym upuszczenie więcej niż 1 pliku jest niedozwolone",

			    // M.H. 12 May 2011 - fix bug 74763: add title to all buttons
			    // title attributes            
			    titleUploadFileButtonInit: "Przekaż plik",
			    titleAddFileButton: "Dodaj",
			    titleCancelUploadButton: "Anuluj",
			    // M.H. 1 June 2011 Fix bug #77532
			    titleSummaryProgressButtonContinue: "Przekaż",
			    titleClearUploaded: "Wyczyść przekazane",
			    titleShowDetailsButton: "Pokaż szczegóły",
			    titleHideDetailsButton: "Ukryj szczegóły",
			    titleSummaryProgressButtonCancel: "Anuluj",
			    titleSummaryProgressButtonDone: "Gotowe",
			    // M.H. 1 June 2011 Fix bug #77532
			    titleSingleUploadButtonContinue: "Przekaż",
			    titleClearAllButton: "Wyczyść przekazane"
	}
		
	$.ig.Upload.locale = $.ig.Upload.locale || $.ig.locale.pl.Upload;
	return $.ig.locale.pl.Upload;
}));// REMOVE_FROM_COMBINED_FILES
