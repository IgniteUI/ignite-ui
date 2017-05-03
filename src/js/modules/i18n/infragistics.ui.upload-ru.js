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
			    labelUploadButton: "Загрузить файл",
			    labelAddButton: "Добавить",
			    labelClearAllButton: "Очистить загруженные",
			    // M.H. 13 May 2011 - fix bug 75042
			    labelSummaryTemplate: "Загружено {0} из {1}",
			    labelSummaryProgressBarTemplate: "{0}/{1}",
			    labelShowDetails: "Показать подробнее",
			    labelHideDetails: "Скрыть подробности",
			    labelSummaryProgressButtonCancel: "Отмена",
			    // M.H. 1 June 2011 Fix bug #77532
			    labelSummaryProgressButtonContinue: "Загрузить",
			    labelSummaryProgressButtonDone: "Готово",
			    labelProgressBarFileNameContinue: "...",

			    //error messages
			    errorMessageFileSizeExceeded: "Файл превышает разрешенный размер.",
			    errorMessageGetFileStatus: "Невозможно получить текущий статус загрузки! Возможна потеря соединения.",
			    errorMessageCancelUpload: "Невозможно отправить команду на отмену загрузки! Возможна потеря соединения.",
			    errorMessageNoSuchFile: "Указанный файл не найден. Возможно файл слишком большой.",
			    errorMessageOther: "Произошла внутренняя ошибка при загрузке. Код ошибки: {0}.",
			    errorMessageValidatingFileExtension: "Файлы с таким расширением не поддерживаются.",
			    errorMessageAJAXRequestFileSize: "Ошибка удаленного запроса размера файла.",
			    errorMessageMaxUploadedFiles: "Превышено разрешенное количество файлов для загрузки.",
			    errorMessageMaxSimultaneousFiles: "Недопустимое значение опции maxSimultaneousFilesUploads - должно быть больше 0 и не null.",
			    errorMessageTryToRemoveNonExistingFile: "Попытка удаления несуществующего файла {0}.",
			    errorMessageTryToStartNonExistingFile: "Попытка загрузки несуществующего файла {0}.",
			    errorMessageDropMultipleFilesWhenSingleModel: "В режиме одного файла не допускается перетаскивание более 1 файла",

			    // M.H. 12 May 2011 - fix bug 74763: add title to all buttons
			    // title attributes            
			    titleUploadFileButtonInit: "Загрузить файл",
			    titleAddFileButton: "Добавить",
			    titleCancelUploadButton: "Отмена",
			    // M.H. 1 June 2011 Fix bug #77532
			    titleSummaryProgressButtonContinue: "Загрузить",
			    titleClearUploaded: "Очистить загруженные",
			    titleShowDetailsButton: "Показать подробнее",
			    titleHideDetailsButton: "Скрыть подробности",
			    titleSummaryProgressButtonCancel: "Отмена",
			    titleSummaryProgressButtonDone: "Готово",
			    // M.H. 1 June 2011 Fix bug #77532
			    titleSingleUploadButtonContinue: "Загрузить",
			    titleClearAllButton: "Очистить загруженные"
		    }
	    });

    }
}));// REMOVE_FROM_COMBINED_FILES
