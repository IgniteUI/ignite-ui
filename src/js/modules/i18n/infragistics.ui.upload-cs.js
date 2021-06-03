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
	$.ig.locale.cs = $.ig.locale.cs || {};

	$.ig.locale.cs.Upload = {
			    labelUploadButton: "Nahrát soubor",
			    labelAddButton: "Přidat",
			    labelClearAllButton: "Vymazat nahrané",
			    // M.H. 13 May 2011 - fix bug 75042
			    labelSummaryTemplate: "Nahráno: {0} z {1}",
			    labelSummaryProgressBarTemplate: "{0}/{1}",
			    labelShowDetails: "Ukázat detaily",
			    labelHideDetails: "Skrýt detaily",
			    labelSummaryProgressButtonCancel: "Zrušení",
			    // M.H. 1 June 2011 Fix bug #77532
			    labelSummaryProgressButtonContinue: "Nahrát",
			    labelSummaryProgressButtonDone: "Hotovo",
			    labelProgressBarFileNameContinue: "...",

			    //error messages
			    errorMessageFileSizeExceeded: "Byla překročena maximální velikost souboru.",
			    errorMessageGetFileStatus: "Nelze zjistit aktuální stav souboru! Pravděpodobně spojení přerušeno.",
			    errorMessageCancelUpload: "Nelze odeslat příkaz na server a zrušit nahrávání! Pravděpodobně spojení přerušeno.",
			    errorMessageNoSuchFile: "Požadovaný soubor nebyl nalezen. Pravděpodobně je tento soubor příliš velký.",
			    errorMessageOther: "Při nahrávání souboru došlo k vnitřní chybě. Kód chyby: {0}.",
			    errorMessageValidatingFileExtension: "Ověření přípony souboru se nezdařilo.",
			    errorMessageAJAXRequestFileSize: "Chyba AJAX při pokusu o získání velikosti souboru.",
			    errorMessageMaxUploadedFiles: "Byl překročen maximální počet nahrávaných souborů.",
			    errorMessageMaxSimultaneousFiles: "Hodnota maxSimallelousFilesUploads je nesprávná. Mělo by to být více než 0 nebo null.",
			    errorMessageTryToRemoveNonExistingFile: "Snažíte se odstranit neexistující soubor s ID {0}.",
			    errorMessageTryToStartNonExistingFile: "Snažíte se spustit neexistující soubor s ID {0}.",
				errorMessageDropMultipleFilesWhenSingleModel: "Je-li režim jediný, není povoleno přetažení více než 1 souboru",

			    // M.H. 12 May 2011 - fix bug 74763: add title to all buttons
			    // title attributes            
			    titleUploadFileButtonInit: "Nahrát soubor",
			    titleAddFileButton: "Přidat",
			    titleCancelUploadButton: "Zrušení",
			    // M.H. 1 June 2011 Fix bug #77532
			    titleSummaryProgressButtonContinue: "Nahrát",
			    titleClearUploaded: "Vymazat nahrané",
			    titleShowDetailsButton: "Ukázat detaily",
			    titleHideDetailsButton: "Skrýt detaily",
			    titleSummaryProgressButtonCancel: "Zrušení",
			    titleSummaryProgressButtonDone: "Hotovo",
			    // M.H. 1 June 2011 Fix bug #77532
			    titleSingleUploadButtonContinue: "Nahrát",
			    titleClearAllButton: "Vymazat nahrané"
	}
		
	$.ig.Upload.locale = $.ig.Upload.locale || $.ig.locale.cs.Upload;
	return $.ig.locale.cs.Upload;
}));// REMOVE_FROM_COMBINED_FILES
