/*!@license
* Infragistics.Web.ClientUI data source localization resources <build_number>
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

    if (!$.ig.DataSourceLocale) {
	    $.ig.DataSourceLocale = {};

	    $.extend($.ig.DataSourceLocale, {

		    locale: {
			    invalidDataSource: "Подаденият източник на данни е невалиден.",
			    unknownDataSource: "Типът на източника на данни не може да бъде определен. Моля дефинирайте дали данните са в JSON или XML формат.",
			    errorParsingArrays: "Грешка при парсирането на масива от данни и при прилагането на дефинираната schema: ",
			    errorParsingJson: "Грешка при парсирането на JSON обекта от данни и при прилагането на дефинираната schema: ",
			    errorParsingXml: "Грешка при парсирането на XML обекта от данни и при прилагането на дефинираната schema: ",
			    errorParsingHtmlTable: "Грешка при извличането на данни от HTML таблицата и при прилагането на дефинираната schema: ",
			    errorExpectedTbodyParameter: "Очакваният параметър трябва да е от тип table или tbody.",
			    errorTableWithIdNotFound: "Не е намерена HTML таблица с ID: ",
			    errorParsingHtmlTableNoSchema: "Грешка при парсиране на табличния DOM: ",
			    errorParsingJsonNoSchema: "Грешка при парсиране на JSON string: ",
			    errorParsingXmlNoSchema: "Грешка при парсиране на XML string: ",
			    errorXmlSourceWithoutSchema: "Подаденият източник на данни е XML документ, но няма дефинирана schema за данните ($.IgDataSchema).",
			    errorUnrecognizedFilterCondition: "Неразпознато условие за филтриране: ",
			    errorRemoteRequest: "Неуспешно завършено външно поискване на данни: ",
			    errorSchemaMismatch: "Входните данни не отговарят на подадената schema; съответното поле не може да бъде попълнено успешно: ",
			    errorSchemaFieldCountMismatch: "Входните данни не отговарят на подадената схема като брой полета. ",
			    errorUnrecognizedResponseType: "Типът на доставените данни не е деклариран правилно или не е било възможно типът да бъде определен автоматично. Моля попълнете settings.responseDataType и/или settings.responseContentType.",
			    hierarchicalTablesNotSupported: "Таблици не се поддържат от HierarchicalSchema",
			    cannotBuildTemplate: "Шаблонът не може да бъде построен. Източника на данни няма записи и не са дефинирани колони.",
			    unrecognizedCondition: "Неразпознато условие за филтриране: ",
			    fieldMismatch: "Изразът съдържа невалидно поле или условие за филтриране: ",
			    noSortingFields: "Моля задайте поне едно поле при извикване на sort().",
			    filteringNoSchema: "Нямате зададени schema / fields. Нужно е да зададете schema с field дефиниция и типове, за да можете да филтрирате източника на данни.",
			    noSaveChanges: "Запазването на промените беше неуспешно. Сървърът не върна обект Success или върна Success:false.",
			    errorUnexpectedCustomFilterFunction: "Беше подадена неочаквана стойност за създадената от потребителя функция за филтриране Очаква се функция или низ."
		    }
	    });

    }
}));// REMOVE_FROM_COMBINED_FILES
