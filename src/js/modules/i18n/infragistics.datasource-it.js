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
	$.ig.locale.it = $.ig.locale.it || {};
	$.ig.DataSourceLocale = $.ig.DataSourceLocale || {};
	
	$.ig.locale.it.DataSourceLocale = {
			invalidDataSource: "L'origine dati fornita non è valida. Risulta essere casualmente uno scalare.",
			unknownDataSource: "Impossibile determinare il tipo di origine dati. Specificare se si tratta di dati JSON o XML.",
			errorParsingArrays: "Si è verificato un errore durante l'analisi dei dati dell'array e l'applicazione dello schema dati definito: ",
			errorParsingJson: "Si è verificato un errore durante l'analisi dei dati JSON e l'applicazione dello schema dati definito: ",
			errorParsingXml: "Si è verificato un errore durante l'analisi dei dati XML e l'applicazione dello schema dati definito: ",
			errorParsingHtmlTable: "Si è verificato un errore durante l'estrazione dei dati dalla tabella HTML e l'applicazione dello schema: ",
			errorExpectedTbodyParameter: "Previsto un tbody o una tabella come parametro.",
			errorTableWithIdNotFound: "Impossibile trovare la tabella HTML con il seguente ID: ",
			errorParsingHtmlTableNoSchema: "Si è verificato un errore durante l'analisi del DOM tabella: ",
			errorParsingJsonNoSchema: "Errore durante l'analisi / valutazione della stringa JSON: ",
			errorParsingXmlNoSchema: "Si è verificato un errore durante l'analisi della stringa XML: ",
			errorXmlSourceWithoutSchema: "L'origine dati fornita è un documento XML, ma non esiste uno schema dati definito ($.IgDataSchema) ",
			errorUnrecognizedFilterCondition: " La condizione di filtro passata non è stata riconosciuta: ",
			errorRemoteRequest: "La richiesta remota di recupero dei dati non è riuscita: ",
			errorSchemaMismatch: "I dati di input non corrispondono allo schema, il seguente campo non può essere mappato: ",
			errorSchemaFieldCountMismatch: "I dati di input non corrispondono allo schema in termini di numero di campi. ",
			errorUnrecognizedResponseType: "Il tipo di risposta non è stato impostato correttamente o non è stato possibile rilevarlo automaticamente. Impostare settings.responseDataType e / o settings.responseContentType.",
			hierarchicalTablesNotSupported: "Le tabelle non sono supportate per HierarchicalSchema",
			cannotBuildTemplate: "Impossibile creare il modello jQuery. Non sono presenti record nell'origine dati e non sono state definite colonne.",
			unrecognizedCondition: "Condizione di filtro non riconosciuta nell'espressione seguente: ",
			fieldMismatch: "L'espressione seguente contiene un campo o una condizione di filtro non validi: ",
			noSortingFields: "Non ci sono campi specificati. È necessario specificare almeno un campo in base al quale ordinare, quando si chiama sort().",
			filteringNoSchema: "Non sono stati specificati schemi / campi. È necessario specificare uno schema con definizioni e tipi di campi per poter filtrare l'origine dati.",
			noSaveChanges: "Salvataggio delle modifiche non riuscito. Il server non ha restituito l'oggetto Success o ha restituito Success: false.",
			errorUnexpectedCustomFilterFunction: "È stato fornito un valore imprevisto per una funzione di filtro personalizzata. È prevista una funzione o una stringa."
	};
	
	$.ig.DataSourceLocale.locale = $.ig.DataSourceLocale.locale || $.ig.locale.it.DataSourceLocale;
	return $.ig.locale.it.DataSourceLocale;
}));// REMOVE_FROM_COMBINED_FILES
