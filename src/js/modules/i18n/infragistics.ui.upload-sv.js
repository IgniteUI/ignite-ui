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
	$.ig.locale.sv = $.ig.locale.sv || {};

	$.ig.locale.sv.Upload = {
			    labelUploadButton: "Ladda upp fil",
			    labelAddButton: "Lägg till",
			    labelClearAllButton: "Rensa uppladdat",
			    // M.H. 13 May 2011 - fix bug 75042
			    labelSummaryTemplate: "{0} av {1} har laddats upp",
			    labelSummaryProgressBarTemplate: "{0}/{1}",
			    labelShowDetails: "Visa detaljer",
			    labelHideDetails: "Dölj detaljer",
			    labelSummaryProgressButtonCancel: "Avbryt",
			    // M.H. 1 June 2011 Fix bug #77532
			    labelSummaryProgressButtonContinue: "Ladda upp",
			    labelSummaryProgressButtonDone: "Gjort",
			    labelProgressBarFileNameContinue: "...",

			    //error messages
			    errorMessageFileSizeExceeded: "Maximal filstorlek har överskridits.",
			    errorMessageGetFileStatus: "Det gick inte att få din nuvarande filstatus! Förmodligen har anslutningen avbrutits.",
			    errorMessageCancelUpload: "Det gick inte att skicka order till serverkommandot om att avbryta uppladdningen! Förmodligen har anslutningen avbrutits.",
			    errorMessageNoSuchFile: "Filen du begärde kunde inte hittas. Förmodligen är den här filen för stor.",
			    errorMessageOther: "Ett internt fel har uppstått vid uppladdningen av filen. Felkod: {0}.",
			    errorMessageValidatingFileExtension: "Valideringen av filtillägget misslyckades.",
			    errorMessageAJAXRequestFileSize: "AJAX-fel vid försök att få filstorlek.",
			    errorMessageMaxUploadedFiles: "Maximalt antal överförda filer har överskridits.",
			    errorMessageMaxSimultaneousFiles: "Värdet på maxSimultaneousFilesUploads är felaktigt. Det borde vara mer än 0 eller null.",
			    errorMessageTryToRemoveNonExistingFile: "Du försökte ta bort icke-befintlig fil med id {0}.",
			    errorMessageTryToStartNonExistingFile: "Du försökte starta icke-befintlig fil med id {0}.",
				errorMessageDropMultipleFilesWhenSingleModel: "Det är inte tillåtet att släppa mer än en fil när läget är i single-läge",

			    // M.H. 12 May 2011 - fix bug 74763: add title to all buttons
			    // title attributes            
			    titleUploadFileButtonInit: "Ladda upp fil",
			    titleAddFileButton: "Lägg till",
			    titleCancelUploadButton: "Avbryt",
			    // M.H. 1 June 2011 Fix bug #77532
			    titleSummaryProgressButtonContinue: "Ladda upp",
			    titleClearUploaded: "Rensa uppladdat",
			    titleShowDetailsButton: "Visa detaljer",
			    titleHideDetailsButton: "Dölj detaljer",
			    titleSummaryProgressButtonCancel: "Avbryt",
			    titleSummaryProgressButtonDone: "Gjort",
			    // M.H. 1 June 2011 Fix bug #77532
			    titleSingleUploadButtonContinue: "Ladda upp",
			    titleClearAllButton: "Rensa uppladdat"
	}
		
	$.ig.Upload.locale = $.ig.Upload.locale || $.ig.locale.sv.Upload;
	return $.ig.locale.sv.Upload;
}));// REMOVE_FROM_COMBINED_FILES
