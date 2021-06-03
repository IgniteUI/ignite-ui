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
	$.ig.locale.tr = $.ig.locale.tr || {};
	$.ig.DataSourceLocale = $.ig.DataSourceLocale || {};
	
	$.ig.locale.tr.DataSourceLocale = {
			invalidDataSource: "Sağlanan veri kaynağı geçersiz. Bu bir skalerdir.",
			unknownDataSource: "Veri kaynağı türü belirlenemiyor. Lütfen bunun JSON veya XML verisi olduğunu belirtin.",
			errorParsingArrays: "Dizi verilerini ayrıştırırken ve tanımlanan veri şemasını uygularken bir hata oluştu: ",
			errorParsingJson: "JSON verilerini ayrıştırırken ve tanımlanan veri şemasını uygularken bir hata oluştu: ",
			errorParsingXml: "XML verilerini ayrıştırırken ve tanımlanan veri şemasını uygularken bir hata oluştu: ",
			errorParsingHtmlTable: "HTML Tablosundan veri çıkarılırken ve şema uygulanırken bir hata oluştu: ",
			errorExpectedTbodyParameter: "Parametre olarak bir cisim veya tablo bekleniyordu.",
			errorTableWithIdNotFound: "Aşağıdaki kimliğe sahip HTML Tablosu bulunamadı: ",
			errorParsingHtmlTableNoSchema: "Tablo DOM'u ayrıştırılırken bir hata oluştu: ",
			errorParsingJsonNoSchema: "JSON dizesi ayrıştırılırken/değerlendirilirken bir hata oluştu: ",
			errorParsingXmlNoSchema: "XML dizesi ayrıştırılırken bir hata oluştu: ",
			errorXmlSourceWithoutSchema: "Sağlanan veri kaynağı bir xml belgesidir, ancak tanımlanmış veri şeması yoktur ($ .IgDataSchema) ",
			errorUnrecognizedFilterCondition: " Geçilen filtre koşulu tanınmadı: ",
			errorRemoteRequest: "Uzaktan veri alma isteği başarısız oldu: ",
			errorSchemaMismatch: "Giriş verileri şemayla eşleşmiyor, aşağıdaki alan eşlenemedi: ",
			errorSchemaFieldCountMismatch: "Giriş verileri, alan sayısı açısından şemayla eşleşmiyor. ",
			errorUnrecognizedResponseType: "Yanıt türü ya doğru ayarlanmadı ya da otomatik olarak algılanması mümkün değildi. Lütfen settings.responseDataType ve/veya settings.responseContentType'ı ayarlayın.",
			hierarchicalTablesNotSupported: "Tablolar, HierarchicalSchema için desteklenmez",
			cannotBuildTemplate: "JQuery şablonu oluşturulamadı. Veri kaynağında kayıt yok ve tanımlanmış sütun yok.",
			unrecognizedCondition: "Aşağıdaki ifadede tanınmayan filtreleme koşulu: ",
			fieldMismatch: "Aşağıdaki ifade, geçersiz bir alan veya filtreleme koşulu içeriyor: ",
			noSortingFields: "Belirtilen alan yok. Sort() çağrılırken sıralama için en az bir alan belirtmeniz gerekir.",
			filteringNoSchema: "Şema/alan belirtilmedi. Veri kaynağına filtre uygulayabilmek için alan tanımları ve türleri içeren bir şema belirtmeniz gerekir.",
			noSaveChanges: "Değişiklikleri kaydetme başarılı olmadı. Sunucu Success nesnesini vermedi veya Success:false öğesini verdi.",
			errorUnexpectedCustomFilterFunction: "Özel bir filtreleme işlevi için beklenmeyen bir değer sağlandı. Bir işlev veya dize bekleniyor."
	};
	
	$.ig.DataSourceLocale.locale = $.ig.DataSourceLocale.locale || $.ig.locale.tr.DataSourceLocale;
	return $.ig.locale.tr.DataSourceLocale;
}));// REMOVE_FROM_COMBINED_FILES
