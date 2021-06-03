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
	$.ig.locale.da = $.ig.locale.da || {};

	$.ig.locale.da.Upload = {
			    labelUploadButton: "Upload fil",
			    labelAddButton: "Tilføj",
			    labelClearAllButton: "Ryd Uploadet",
			    // M.H. 13 May 2011 - fix bug 75042
			    labelSummaryTemplate: "{0} af {1} uploadet",
			    labelSummaryProgressBarTemplate: "{0}/{1}",
			    labelShowDetails: "Vis detaljer",
			    labelHideDetails: "Skjul detaljer",
			    labelSummaryProgressButtonCancel: "Annuller",
			    // M.H. 1 June 2011 Fix bug #77532
			    labelSummaryProgressButtonContinue: "Upload",
			    labelSummaryProgressButtonDone: "Færdig",
			    labelProgressBarFileNameContinue: "...",

			    //error messages
			    errorMessageFileSizeExceeded: "Maks. filstørrelse overskredet.",
			    errorMessageGetFileStatus: "Kunne ikke få din aktuelle filstatus! Forbindelsen er sandsynligvis afbrudt.",
			    errorMessageCancelUpload: "Kunne ikke sende til serverkommandoen for at annullere upload! Forbindelsen er sandsynligvis afbrudt.",
			    errorMessageNoSuchFile: "Den ønskede fil kunne ikke findes. Denne fil er sandsynligvis for stor.",
			    errorMessageOther: "Der er intern fejl ved upload af fil. Fejlkode: {0}.",
			    errorMessageValidatingFileExtension: "Validering af filoverførsel mislykkedes.",
			    errorMessageAJAXRequestFileSize: "AJAX-fejl under forsøg på at få filstørrelse.",
			    errorMessageMaxUploadedFiles: "Maksimalt antal overførte filer er overskredet.",
			    errorMessageMaxSimultaneousFiles: "Værdien af maxSimultaneousFilesUploads er forkert. Det skal være mere end 0 eller null.",
			    errorMessageTryToRemoveNonExistingFile: "Du forsøger at fjerne ikke-eksisterende fil med id {0}.",
			    errorMessageTryToStartNonExistingFile: "Du forsøger at starte ikke-eksisterende fil med id {0}.",
				errorMessageDropMultipleFilesWhenSingleModel: "Det er ikke tilladt at slippe mere end 1 fil, når tilstanden er enkelt",

			    // M.H. 12 May 2011 - fix bug 74763: add title to all buttons
			    // title attributes            
			    titleUploadFileButtonInit: "Upload fil",
			    titleAddFileButton: "Tilføj",
			    titleCancelUploadButton: "Annuller",
			    // M.H. 1 June 2011 Fix bug #77532
			    titleSummaryProgressButtonContinue: "Upload",
			    titleClearUploaded: "Ryd Uploadet",
			    titleShowDetailsButton: "Vis detaljer",
			    titleHideDetailsButton: "Skjul detaljer",
			    titleSummaryProgressButtonCancel: "Annuller",
			    titleSummaryProgressButtonDone: "Færdig",
			    // M.H. 1 June 2011 Fix bug #77532
			    titleSingleUploadButtonContinue: "Upload",
			    titleClearAllButton: "Ryd Uploadet"
	}
		
	$.ig.Upload.locale = $.ig.Upload.locale || $.ig.locale.da.Upload;
	return $.ig.locale.da.Upload;
}));// REMOVE_FROM_COMBINED_FILES
