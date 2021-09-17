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
	$.ig.locale.nb = $.ig.locale.nb || {};

	$.ig.locale.nb.Upload = {
			    labelUploadButton: "Last opp fil",
			    labelAddButton: "Legge til",
			    labelClearAllButton: "Slett Lastet opp",
			    // M.H. 13 May 2011 - fix bug 75042
			    labelSummaryTemplate: "{0} av {1} lastet opp",
			    labelSummaryProgressBarTemplate: "{0}/{1}",
			    labelShowDetails: "Vis detaljer",
			    labelHideDetails: "Skjul detaljer",
			    labelSummaryProgressButtonCancel: "Avbryt",
			    // M.H. 1 June 2011 Fix bug #77532
			    labelSummaryProgressButtonContinue: "Laste opp",
			    labelSummaryProgressButtonDone: "Ferdig",
			    labelProgressBarFileNameContinue: "...",

			    //error messages
			    errorMessageFileSizeExceeded: "Maksimal filstørrelse overskredet.",
			    errorMessageGetFileStatus: "Kunne ikke få din nåværende filstatus! Sannsynligvis har forbindelsen falt.",
			    errorMessageCancelUpload: "Kunne ikke sende til serverkommandoen for å avbryte opplastingen! Sannsynligvis har forbindelsen falt.",
			    errorMessageNoSuchFile: "Filen du ba om ble ikke funnet. Sannsynligvis er denne filen for stor.",
			    errorMessageOther: "Det oppstod en intern feil ved opplasting av fil. Feilkode: {0}.",
			    errorMessageValidatingFileExtension: "Validering av filtillegg mislyktes.",
			    errorMessageAJAXRequestFileSize: "AJAX-feil under forsøk på å få filstørrelse.",
			    errorMessageMaxUploadedFiles: "Maksimalt antall opplastede filer er overskredet.",
			    errorMessageMaxSimultaneousFiles: "Verdien av maxSimultaneousFilesUploads er feil. Det bør være mer enn 0 eller null.",
			    errorMessageTryToRemoveNonExistingFile: "Du prøver å fjerne ikke-eksisterende fil med ID {0}.",
			    errorMessageTryToStartNonExistingFile: "Du prøver å starte ikke-eksisterende fil med ID {0}.",
				errorMessageDropMultipleFilesWhenSingleModel: "Det er ikke tillatt å slippe mer enn 1 fil når modusen er singel",

			    // M.H. 12 May 2011 - fix bug 74763: add title to all buttons
			    // title attributes            
			    titleUploadFileButtonInit: "Last opp fil",
			    titleAddFileButton: "Legge til",
			    titleCancelUploadButton: "Avbryt",
			    // M.H. 1 June 2011 Fix bug #77532
			    titleSummaryProgressButtonContinue: "Laste opp",
			    titleClearUploaded: "Slett Lastet opp",
			    titleShowDetailsButton: "Vis detaljer",
			    titleHideDetailsButton: "Skjul detaljer",
			    titleSummaryProgressButtonCancel: "Avbryt",
			    titleSummaryProgressButtonDone: "Ferdig",
			    // M.H. 1 June 2011 Fix bug #77532
			    titleSingleUploadButtonContinue: "Laste opp",
			    titleClearAllButton: "Slett Lastet opp"
	}
		
	$.ig.Upload.locale = $.ig.Upload.locale || $.ig.locale.nb.Upload;
	return $.ig.locale.nb.Upload;
}));// REMOVE_FROM_COMBINED_FILES
