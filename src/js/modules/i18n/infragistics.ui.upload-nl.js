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
	$.ig.locale.nl = $.ig.locale.nl || {};

	$.ig.locale.nl.Upload = {
			    labelUploadButton: "Bestand uploaden",
			    labelAddButton: "Toevoegen",
			    labelClearAllButton: "Geüpload wissen",
			    // M.H. 13 May 2011 - fix bug 75042
			    labelSummaryTemplate: "{0} van {1} geüpload",
			    labelSummaryProgressBarTemplate: "{0}/{1}",
			    labelShowDetails: "Details weergeven",
			    labelHideDetails: "Details verbergen",
			    labelSummaryProgressButtonCancel: "Annuleren",
			    // M.H. 1 June 2011 Fix bug #77532
			    labelSummaryProgressButtonContinue: "Uploaden",
			    labelSummaryProgressButtonDone: "Klaar",
			    labelProgressBarFileNameContinue: "...",

			    //error messages
			    errorMessageFileSizeExceeded: "Maximale bestandsgrootte overschreden.",
			    errorMessageGetFileStatus: "Kon uw huidige bestandsstatus niet ophalen! Waarschijnlijk is de verbinding verbroken.",
			    errorMessageCancelUpload: "Kan niet verzenden naar serveropdracht om upload te annuleren! Waarschijnlijk is de verbinding verbroken.",
			    errorMessageNoSuchFile: "Het opgevraagde bestand kan niet worden gevonden. Dit bestand is waarschijnlijk te groot.",
			    errorMessageOther: "Er is een interne fout opgetreden bij het uploaden van het bestand. Foutcode: {0}.",
			    errorMessageValidatingFileExtension: "Validatie van bestandsextensie is mislukt.",
			    errorMessageAJAXRequestFileSize: "AJAX-fout bij het ophalen van de bestandsgrootte.",
			    errorMessageMaxUploadedFiles: "Het maximale aantal uploadbestanden is overschreden.",
			    errorMessageMaxSimultaneousFiles: "Waarde van maxSimultaneousFilesUploads is onjuist. Het moet meer dan 0 of nul zijn.",
			    errorMessageTryToRemoveNonExistingFile: "U probeert een niet-bestaand bestand met ID {0} te verwijderen.",
			    errorMessageTryToStartNonExistingFile: "U probeert een niet-bestaand bestand met ID {0} te starten.",
				errorMessageDropMultipleFilesWhenSingleModel: "Het is niet toegestaan om meer dan 1 bestanden te verwijderen als de modus enkelvoudig is",

			    // M.H. 12 May 2011 - fix bug 74763: add title to all buttons
			    // title attributes            
			    titleUploadFileButtonInit: "Bestand uploaden",
			    titleAddFileButton: "Toevoegen",
			    titleCancelUploadButton: "Annuleren",
			    // M.H. 1 June 2011 Fix bug #77532
			    titleSummaryProgressButtonContinue: "Uploaden",
			    titleClearUploaded: "Geüpload wissen",
			    titleShowDetailsButton: "Details weergeven",
			    titleHideDetailsButton: "Details verbergen",
			    titleSummaryProgressButtonCancel: "Annuleren",
			    titleSummaryProgressButtonDone: "Klaar",
			    // M.H. 1 June 2011 Fix bug #77532
			    titleSingleUploadButtonContinue: "Uploaden",
			    titleClearAllButton: "Geüpload wissen"
	}
		
	$.ig.Upload.locale = $.ig.Upload.locale || $.ig.locale.nl.Upload;
	return $.ig.locale.nl.Upload;
}));// REMOVE_FROM_COMBINED_FILES
