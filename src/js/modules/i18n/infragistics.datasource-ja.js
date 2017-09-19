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
			    invalidDataSource: "指定したデータ ソースは無効です。スカラーです。",
			    unknownDataSource: "データ ソース型を決定できません。JSON または XML データであるかどうかを指定してください。",
			    errorParsingArrays: "配列データを解析して定義したデータ スキーマを適用したときにエラーが発生しました。 ",
			    errorParsingJson: "JSON データを解析して定義したデータ スキーマを適用したときにエラーが発生しました。 ",
			    errorParsingXml: "XML データを解析して定義したデータ スキーマを適用したときにエラーが発生しました。 ",
			    errorParsingHtmlTable: "HTML テーブルからデータを展開してスキーマを適用したときにエラーが発生しました。 ",
			    errorExpectedTbodyParameter: "パラメーターは tbody または table である必要があります。",
			    errorTableWithIdNotFound: "この ID を持つ HTML テーブルが見つかりませんでした:  ",
			    errorParsingHtmlTableNoSchema: "テーブルの DOM の分析でエラーが発生しました:  ",
			    errorParsingJsonNoSchema: "JSON 文字列の分析または評価でエラーが発生しました: ",
			    errorParsingXmlNoSchema: "XML 文字列の分析でエラーが発生しました: ",
			    errorXmlSourceWithoutSchema: "指定したデータ ソースは XML ドキュメントですが、データ スキーマ ($.IgDataSchema) が定義されていません。 ",
			    errorUnrecognizedFilterCondition: "渡されたフィルター条件は無効です。 ",
			    errorRemoteRequest: "データを取得するリモート要求に失敗しました。 ",
			    errorSchemaMismatch: "入力データがスキーマと一致しません。このフィールドをマップできませんでした:  ",
			    errorSchemaFieldCountMismatch: "入力のデータがスキーマと一致しません。フィールド数が無効です。 ",
			    errorUnrecognizedResponseType: "応答型が正しく設定されなかったか、自動的に検出できませんでした。settings.responseDataType または settings.responseContentType を設定してください。",
			    hierarchicalTablesNotSupported: "HierarchicalSchema でテーブルをサポートしません。",
			    cannotBuildTemplate: "jQuery テンプレートをビルドできませんでした。データ ソースでレコードがないし、列が定義されていません。",
			    unrecognizedCondition: "この式で無効なフィルター条件があります:  ",
			    fieldMismatch: "この式で無効なフィールドまたはフィルター条件があります:  ",
			    noSortingFields: "フィールドが指定されていません。sort() を呼び出すときに、並べ替えるフィールドを 1 つ以上を指定する必要があります。",
			    filteringNoSchema: "スキーマまたはフィールドが指定されていません。データ ソースをフィルターするには、フィールド定義および型を含むスキーマを指定する必要があります。",
			    noSaveChanges: "変更の保存に失敗しました。サーバーが Success オブジェクトを返さなかったか Success:false を返しました。",
			    errorUnexpectedCustomFilterFunction: "カスタム フィルター関数で予期しない値が提供されました。関数または文字列が必要です。"
		    }
	    });

    }
}));// REMOVE_FROM_COMBINED_FILES
