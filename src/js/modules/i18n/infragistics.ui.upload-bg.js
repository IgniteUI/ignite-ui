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
			    labelUploadButton: "Качи файл",
			    labelAddButton: "Прибави",
			    labelClearAllButton: "Изчисти качените",
			    // M.H. 13 May 2011 - fix bug 75042
			    labelSummaryTemplate: "{0} от {1} качени",
			    labelSummaryProgressBarTemplate: "{0}/{1}",
			    labelShowDetails: "Покажи детайлите",
			    labelHideDetails: "Скрий детайлите",
			    labelSummaryProgressButtonCancel: "Отказ",
			    // M.H. 1 June 2011 Fix bug #77532
			    labelSummaryProgressButtonContinue: "Качи",
			    labelSummaryProgressButtonDone: "Готово",
			    labelProgressBarFileNameContinue: "...",

			    //error messages
			    errorMessageFileSizeExceeded: "Максималната големина на файла е надхвърлена.",
			    errorMessageGetFileStatus: "Състоянието на файла не може да бъде взето! Вероятно е връзката да е прекъснала.",
			    errorMessageCancelUpload: "Командата за отмяна на качването е неуспешно изпратена! Вероятно е връзката да е прекъснала.",
			    errorMessageNoSuchFile: "Файлът не може да бъде намерен. Вероятно файлът е твърде голям.",
			    errorMessageOther: "Грешка при качването на файла. Код на грешката: {0}.",
			    errorMessageValidatingFileExtension: "Неуспешно валидиране на разширението на файла.",
			    errorMessageAJAXRequestFileSize: "Грешка в AJAX заявката при опит да се вземе големината на файла.",
			    errorMessageMaxUploadedFiles: "Надхвърлен е максималният брой на качените файлове.",
			    errorMessageMaxSimultaneousFiles: "Стойността на опцията maxSimultaneousFilesUploads е невалидна. Трябва да е по-голяма от 0 или null.",
			    errorMessageTryToRemoveNonExistingFile: "Опитвате премахване на несъществуващ файл с id {0}.",
			    errorMessageTryToStartNonExistingFile: "Опитвате стартиране на качване на несъществуващ файл с id {0}.",
			    errorMessageDropMultipleFilesWhenSingleModel: "Не е позволено пускането на повече от 1 файл когато режимът е single",

			    // M.H. 12 May 2011 - fix bug 74763: add title to all buttons
			    // title attributes            
			    titleUploadFileButtonInit: "Качи файл",
			    titleAddFileButton: "Прибави",
			    titleCancelUploadButton: "Отказ",
			    // M.H. 1 June 2011 Fix bug #77532
			    titleSummaryProgressButtonContinue: "Качи",
			    titleClearUploaded: "Изчисти качените",
			    titleShowDetailsButton: "Покажи детайлите",
			    titleHideDetailsButton: "Скрий детайлите",
			    titleSummaryProgressButtonCancel: "Отказ",
			    titleSummaryProgressButtonDone: "Готово",
			    // M.H. 1 June 2011 Fix bug #77532
			    titleSingleUploadButtonContinue: "Качи",
			    titleClearAllButton: "Изчисти качените"
		    }
	    });

    }
}));// REMOVE_FROM_COMBINED_FILES
