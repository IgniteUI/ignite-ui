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
		define( [
			"jquery"
		], factory );
	} else {
		factory(jQuery);
	}
}
(function ($) {
    $.ig = $.ig || {};

    if (!$.ig.Upload) {
	    $.ig.Upload = {};

	    $.extend($.ig.Upload, {

		    locale: {
			    labelUploadButton: "Datei hochladen",
			    labelAddButton: "Hinzufügen",
			    labelClearAllButton: "Hochgeladene löschen",
			    // M.H. 13 May 2011 - fix bug 75042
			    labelSummaryTemplate: "{0} von {1} hochgeladenen",
			    labelSummaryProgressBarTemplate: "{0}/{1}",
			    labelShowDetails: "Details anzeigen",
			    labelHideDetails: "Details ausblenden",
			    labelSummaryProgressButtonCancel: "Abbrechen",
			    // M.H. 1 June 2011 Fix bug #77532
			    labelSummaryProgressButtonContinue: "Hochladen",
			    labelSummaryProgressButtonDone: "Fertig",
			    labelProgressBarFileNameContinue: "...",

			    //error messages
			    errorMessageFileSizeExceeded: "Max. Dateigröße überschritten",
			    errorMessageGetFileStatus: "Ihr aktueller Dateistatus konnte nicht erfasst werden! Wahrscheinlich ist Verbindung abgebrochen.",
			    errorMessageCancelUpload: "Befehl zum Abbrechen des Upload-Vorgangs konnte nicht an Server gesendet werden! Wahrscheinlich ist Verbindung abgebrochen.",
			    errorMessageNoSuchFile: "Die angeforderte Datei konnte nicht gefunden werden. Wahrscheinlich ist diese Datei zu groß.",
			    errorMessageOther: "Beim Hochladen der Datei ist ein interner Fehler aufgetreten. Fehlercode: {0}.",
			    errorMessageValidatingFileExtension: "Überprüfung der Datenerweiterung ist fehlgeschlagen.",
			    errorMessageAJAXRequestFileSize: "Beim Erfassen der Dateigröße ist ein AJAX-Fehler aufgetreten.",
			    errorMessageMaxUploadedFiles: "Die maximale Anzahl von hochladbaren Dateien wurde überschritten.",
			    errorMessageMaxSimultaneousFiles: "Der Wert von maxSimultaneousFilesUploads ist falsch. Er muss mehr als 0 oder Null lauten.",
			    errorMessageTryToRemoveNonExistingFile: "Sie versuchen, eine nicht vorhandene Datei mit ID {0} zu entfernen.",
			    errorMessageTryToStartNonExistingFile: "Sie versuchen, eine nicht vorhandene Datei mit ID {0} zu starten.",
			    errorMessageDropMultipleFilesWhenSingleModel: "Es ist nicht erlaubt, im Einfachmodus mehr als 1 Datei abzulegen",

			    // M.H. 12 May 2011 - fix bug 74763: add title to all buttons
			    // title attributes            
			    titleUploadFileButtonInit: "Datei hochladen",
			    titleAddFileButton: "Hinzufügen",
			    titleCancelUploadButton: "Abbrechen",
			    // M.H. 1 June 2011 Fix bug #77532
			    titleSummaryProgressButtonContinue: "Hochladen",
			    titleClearUploaded: "Hochgeladene löschen",
			    titleShowDetailsButton: "Details anzeigen",
			    titleHideDetailsButton: "Details ausblenden",
			    titleSummaryProgressButtonCancel: "Abbrechen",
			    titleSummaryProgressButtonDone: "Fertig",
			    // M.H. 1 June 2011 Fix bug #77532
			    titleSingleUploadButtonContinue: "Hochladen",
			    titleClearAllButton: "Hochgeladene löschen"
		    }
	    });

    }
}));// REMOVE_FROM_COMBINED_FILES
