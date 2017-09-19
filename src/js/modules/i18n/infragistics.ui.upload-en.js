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
			    labelUploadButton: "Upload File",
			    labelAddButton: "Add",
			    labelClearAllButton: "Clear Uploaded",
			    // M.H. 13 May 2011 - fix bug 75042
			    labelSummaryTemplate: "{0} of {1} uploaded",
			    labelSummaryProgressBarTemplate: "{0}/{1}",
			    labelShowDetails: "Show Details",
			    labelHideDetails: "Hide Details",
			    labelSummaryProgressButtonCancel: "Cancel",
			    // M.H. 1 June 2011 Fix bug #77532
			    labelSummaryProgressButtonContinue: "Upload",
			    labelSummaryProgressButtonDone: "Done",
			    labelProgressBarFileNameContinue: "...",

			    //error messages
			    errorMessageFileSizeExceeded: "Max file size exceeded.",
			    errorMessageGetFileStatus: "Could not get your current file status! Probably connection dropped.",
			    errorMessageCancelUpload: "Could not send to server command to cancel upload! Probably connection dropped.",
			    errorMessageNoSuchFile: "The file you requested could not be found. Probably this file is too big.",
			    errorMessageOther: "There is internal error uploading file. Error code: {0}.",
			    errorMessageValidatingFileExtension: "File extension validation failed.",
			    errorMessageAJAXRequestFileSize: "AJAX error while trying to get file size.",
			    errorMessageMaxUploadedFiles: "Maximum count of uploading files exceeded.",
			    errorMessageMaxSimultaneousFiles: "Value of maxSimultaneousFilesUploads is incorrect. It should be more than 0 or null.",
			    errorMessageTryToRemoveNonExistingFile: "You are trying to remove non-existing file with id {0}.",
			    errorMessageTryToStartNonExistingFile: "You are trying to start non-existing file with id {0}.",
				errorMessageDropMultipleFilesWhenSingleModel: "It is not allowed to drop more than 1 file when mode is single",

			    // M.H. 12 May 2011 - fix bug 74763: add title to all buttons
			    // title attributes            
			    titleUploadFileButtonInit: "Upload File",
			    titleAddFileButton: "Add",
			    titleCancelUploadButton: "Cancel",
			    // M.H. 1 June 2011 Fix bug #77532
			    titleSummaryProgressButtonContinue: "Upload",
			    titleClearUploaded: "Clear Uploaded",
			    titleShowDetailsButton: "Show Details",
			    titleHideDetailsButton: "Hide Details",
			    titleSummaryProgressButtonCancel: "Cancel",
			    titleSummaryProgressButtonDone: "Done",
			    // M.H. 1 June 2011 Fix bug #77532
			    titleSingleUploadButtonContinue: "Upload",
			    titleClearAllButton: "Clear Uploaded"
		    }
	    });

    }
}));// REMOVE_FROM_COMBINED_FILES
