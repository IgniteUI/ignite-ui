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
	$.ig.locale.pt = $.ig.locale.pt || {};
	$.ig.DataSourceLocale = $.ig.DataSourceLocale || {};
	
	$.ig.locale.pt.DataSourceLocale = {
			invalidDataSource: "A fonte de dados fornecida é inválida. Por acaso é um escalar.",
			unknownDataSource: "Não é possível determinar o tipo de fonte de dados. Especifique se são dados JSON ou XML.",
			errorParsingArrays: "Ocorreu um erro ao analisar os dados da matriz e ao aplicar o esquema de dados definido: ",
			errorParsingJson: "Ocorreu um erro ao analisar os dados JSON e ao aplicar o esquema de dados definido: ",
			errorParsingXml: "Ocorreu um erro ao analisar os dados XML e ao aplicar o esquema de dados definido: ",
			errorParsingHtmlTable: "Ocorreu um erro ao extrair os dados da Tabela HTML e ao aplicar o esquema: ",
			errorExpectedTbodyParameter: "Esperava-se um tbody ou uma tabela como parâmetro.",
			errorTableWithIdNotFound: "A tabela HTML com o seguinte ID não foi encontrada: ",
			errorParsingHtmlTableNoSchema: "Ocorreu um erro ao analisar o DOM da tabela: ",
			errorParsingJsonNoSchema: "Ocorreu um erro ao analisar/avaliar a cadeia JSON: ",
			errorParsingXmlNoSchema: "Ocorreu um erro ao analisar a cadeia XML: ",
			errorXmlSourceWithoutSchema: "A origem de dados fornecida é um documento xml, mas não existe esquema de dados definido ($.IgDataSchema) ",
			errorUnrecognizedFilterCondition: " A condição de filtro aprovada não foi reconhecida: ",
			errorRemoteRequest: "O pedido remoto para obter dados falhou: ",
			errorSchemaMismatch: "Os dados de entrada não correspondem ao esquema, não foi possível mapear o seguinte campo: ",
			errorSchemaFieldCountMismatch: "Os dados de entrada não correspondem ao esquema em termos de número de campos. ",
			errorUnrecognizedResponseType: "O tipo de resposta não foi definido corretamente ou não foi possível detetá-lo automaticamente. Defina settings.responseDataType e/ou settings.responseContentType.",
			hierarchicalTablesNotSupported: "As tabelas não são suportadas para HierarchicalSchema",
			cannotBuildTemplate: "O modelo jQuery não pôde ser construído. Não há registos presentes na fonte de dados nem colunas definidas.",
			unrecognizedCondition: "Condição de filtragem não reconhecida na seguinte expressão: ",
			fieldMismatch: "A expressão a seguir contém um campo inválido ou uma condição de filtragem: ",
			noSortingFields: "Não há campos especificados. É necessário especificar pelo menos um campo para ordenar, ao chamar sort().",
			filteringNoSchema: "Não há esquema/campos especificados. É necessário especificar um esquema com definições e tipos de campos para poder filtrar a origem de dados.",
			noSaveChanges: "Guardar Alterações não foi bem sucedido. O servidor não devolveu o objeto Sucess ou devolveu Success:false.",
			errorUnexpectedCustomFilterFunction: "Foi fornecido um valor inesperado para uma função de filtragem personalizada. Uma função ou sequência é esperada."
	};
	
	$.ig.DataSourceLocale.locale = $.ig.DataSourceLocale.locale || $.ig.locale.pt.DataSourceLocale;
	return $.ig.locale.pt.DataSourceLocale;
}));// REMOVE_FROM_COMBINED_FILES
