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
	$.ig.locale.hu = $.ig.locale.hu || {};

	$.ig.locale.hu.Upload = {
			    labelUploadButton: "Fájlfeltöltés",
			    labelAddButton: "Hozzáadás",
			    labelClearAllButton: "Feltöltöttek törlése",
			    // M.H. 13 May 2011 - fix bug 75042
			    labelSummaryTemplate: "{0}/{1} feltöltve",
			    labelSummaryProgressBarTemplate: "{0}/{1}",
			    labelShowDetails: "Részletek mutatása",
			    labelHideDetails: "Részletek elrejtése",
			    labelSummaryProgressButtonCancel: "Mégse",
			    // M.H. 1 June 2011 Fix bug #77532
			    labelSummaryProgressButtonContinue: "Feltöltés",
			    labelSummaryProgressButtonDone: "Kész",
			    labelProgressBarFileNameContinue: "...",

			    //error messages
			    errorMessageFileSizeExceeded: "A maximális fájlméret túl lett lépve.",
			    errorMessageGetFileStatus: "Nem sikerült lekérni a fájl jelenlegi állapotát! Nem sikerült lekérni a fájl jelenlegi állapotát!",
			    errorMessageCancelUpload: "Nem sikerült elküldeni a szervernek a parancsot a feltöltés megszakítására! Nem sikerült lekérni a fájl jelenlegi állapotát!",
			    errorMessageNoSuchFile: "A kért fájl nem található. Valószínűleg túl nagy a fájl.",
			    errorMessageOther: "Belső hiba történt a fájl feltöltésekor. Hibakód: {0}.",
			    errorMessageValidatingFileExtension: "A fájlkiterjesztés ellenőrzése nem sikerült.",
			    errorMessageAJAXRequestFileSize: "AJAX hiba a fájlméret lekérésekor.",
			    errorMessageMaxUploadedFiles: "Túllépte a feltölthető fájlok maximális számát.",
			    errorMessageMaxSimultaneousFiles: "A maxSimultaneousFilesUploads értéke helytelen. 0-nál nagyobbnak vagy nullértékűnek kell lennie.",
			    errorMessageTryToRemoveNonExistingFile: "Egy nem létező fájlt próbált eltávolítani a következő azonosítóval: {0}.",
			    errorMessageTryToStartNonExistingFile: "Egy nem létező fájlt próbált elindítani a következő azonosítóval: {0}.",
				errorMessageDropMultipleFilesWhenSingleModel: "Single módban nem engedélyezhető egynél több fájl eltávolítása",

			    // M.H. 12 May 2011 - fix bug 74763: add title to all buttons
			    // title attributes            
			    titleUploadFileButtonInit: "Fájlfeltöltés",
			    titleAddFileButton: "Hozzáadás",
			    titleCancelUploadButton: "Mégse",
			    // M.H. 1 June 2011 Fix bug #77532
			    titleSummaryProgressButtonContinue: "Feltöltés",
			    titleClearUploaded: "Feltöltöttek törlése",
			    titleShowDetailsButton: "Részletek mutatása",
			    titleHideDetailsButton: "Részletek elrejtése",
			    titleSummaryProgressButtonCancel: "Mégse",
			    titleSummaryProgressButtonDone: "Kész",
			    // M.H. 1 June 2011 Fix bug #77532
			    titleSingleUploadButtonContinue: "Feltöltés",
			    titleClearAllButton: "Feltöltöttek törlése"
	}
		
	$.ig.Upload.locale = $.ig.Upload.locale || $.ig.locale.hu.Upload;
	return $.ig.locale.hu.Upload;
}));// REMOVE_FROM_COMBINED_FILES
