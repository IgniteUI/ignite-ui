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
		define( ["jquery"], factory );
	} else {
		return factory(jQuery);
	}
}
(function ($) {
	$.ig = $.ig || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale['zh-Hant'] = $.ig.locale['zh-Hant'] || {};
	$.ig.DataSourceLocale = $.ig.DataSourceLocale || {};
	
	$.ig.locale['zh-Hant'].DataSourceLocale = {
			invalidDataSource: "提供的資料來源無效。它恰好是一個標量。",
			unknownDataSource: "無法確定資料來源類型。請指定是 JSON 或 XML 資料。",
			errorParsingArrays: "解析陣列資料並套用已定義的資料架構時出錯: ",
			errorParsingJson: "解析 JSON 資料並套用已定義的資料架構時出現錯誤: ",
			errorParsingXml: "解析 XML 資料並套用已定義的資料架構時出錯: ",
			errorParsingHtmlTable: "從 HTML 表格提取資料並套用架構時出現錯誤: ",
			errorExpectedTbodyParameter: "預期將 tbody 或表格作為參數。",
			errorTableWithIdNotFound: "未找到具有以下 ID 的 HTML 表格: ",
			errorParsingHtmlTableNoSchema: "解析表格 DOM 時出現錯誤: ",
			errorParsingJsonNoSchema: "解析/評估 JSON 字串時出現錯誤: ",
			errorParsingXmlNoSchema: "解析 XML 字串時出現錯誤: ",
			errorXmlSourceWithoutSchema: "提供的資料來源為 xml 文件，但沒有定義的資料架構 ($.IgDataSchema) ",
			errorUnrecognizedFilterCondition: " 無法識別已通過的篩選條件: ",
			errorRemoteRequest: "遠端擷取資料的請求失敗: ",
			errorSchemaMismatch: "輸入資料與架構不符，無法對應以下欄位: ",
			errorSchemaFieldCountMismatch: "就欄位數量而言，輸入資料與架構不符。 ",
			errorUnrecognizedResponseType: "響應類型未正確設定，或無法自動檢測。請設定 settings.responseDataType 和/或 settings.responseContentType。",
			hierarchicalTablesNotSupported: "HierarchicalSchema 不支援表格",
			cannotBuildTemplate: "無法建立 jQuery 範本。資料來源中沒有記錄，也沒有定義列。",
			unrecognizedCondition: "以下表達式中無法識別的過濾條件: ",
			fieldMismatch: "以下表達式包含無效欄位或篩選條件: ",
			noSortingFields: "沒有指定欄位。調用 sort() 時，您需要指定至少一個要排序的欄位。",
			filteringNoSchema: "沒有指定架構/欄位。您需要指定具有欄位定義和類型的架構，以便能夠過濾資料來源。",
			noSaveChanges: "儲存更改未成功。伺服器未傳回 Success 物件或傳回 Success:false。",
			errorUnexpectedCustomFilterFunction: "為自訂篩選功能提供了意外的值。需要一個函數或字串。"
	};
	
	$.ig.DataSourceLocale.locale = $.ig.DataSourceLocale.locale || $.ig.locale['zh-Hant'].DataSourceLocale;
	return $.ig.locale['zh-Hant'].DataSourceLocale;
}));// REMOVE_FROM_COMBINED_FILES
