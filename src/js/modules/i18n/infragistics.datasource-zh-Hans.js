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
	$.ig.locale['zh-Hans'] = $.ig.locale['zh-Hans'] || {};
	$.ig.DataSourceLocale = $.ig.DataSourceLocale || {};
	
	$.ig.locale['zh-Hans'].DataSourceLocale = {
			invalidDataSource: "提供的数据源无效。它恰好是一个标量。",
			unknownDataSource: "无法确定数据源类型。请指定是 JSON 还是 XML 数据。",
			errorParsingArrays: "解析数组数据并应用定义的数据模式时出现错误: ",
			errorParsingJson: "解析 JSON 数据并应用定义的数据模式时出现错误: ",
			errorParsingXml: "解析 XML 数据并应用定义的数据模式时出现错误: ",
			errorParsingHtmlTable: "从 HTML 表格提取数据并应用架构时出现错误: ",
			errorExpectedTbodyParameter: "期望将正文或表格作为参数。",
			errorTableWithIdNotFound: "未找到具有以下 ID 的 HTML 表格: ",
			errorParsingHtmlTableNoSchema: "解析表格 DOM 时出现错误: ",
			errorParsingJsonNoSchema: "解析/评估 JSON 字符串时出现错误: ",
			errorParsingXmlNoSchema: "解析 XML 字符串时出现错误: ",
			errorXmlSourceWithoutSchema: "提供的数据源是 xml 文档，但没有定义的数据模式 ($.IgDataSchema) ",
			errorUnrecognizedFilterCondition: " 无法识别已通过的筛选条件: ",
			errorRemoteRequest: "远程获取数据请求失败: ",
			errorSchemaMismatch: "输入的数据与模式不匹配，无法映射以下字段: ",
			errorSchemaFieldCountMismatch: "就字段数量而言，输入数据与模式不匹配。 ",
			errorUnrecognizedResponseType: "响应类型设置不正确，或无法自动检测。请设置 settings.responseDataType 和/或 settings.responseContentType。",
			hierarchicalTablesNotSupported: "HierarchicalSchema 不支持表格",
			cannotBuildTemplate: "无法构建 jQuery 模板。数据源中没有记录，也没有定义列。",
			unrecognizedCondition: "以下表达式中无法识别的筛选条件: ",
			fieldMismatch: "以下表达式包含无效字段或筛选条件: ",
			noSortingFields: "未指定任何字段。调用 sort() 时，您需要指定至少一个字段进行排序。",
			filteringNoSchema: "未指定架构/字段。您需要指定具有字段定义和类型的架构，以便能够筛选数据源。",
			noSaveChanges: "保存更改未成功。服务器未返回 Success 对象或返回 Success:false。",
			errorUnexpectedCustomFilterFunction: "为自定义筛选功能提供了一个意外值。需要函数或字符串。"
	};
	
	$.ig.DataSourceLocale.locale = $.ig.DataSourceLocale.locale || $.ig.locale['zh-Hans'].DataSourceLocale;
	return $.ig.locale['zh-Hans'].DataSourceLocale;
}));// REMOVE_FROM_COMBINED_FILES
