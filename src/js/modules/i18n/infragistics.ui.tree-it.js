/*!@license
* Infragistics.Web.ClientUI Tree localization resources <build_number>
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
	$.ig.Tree = $.ig.Tree || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.it = $.ig.locale.it || {};

	$.ig.locale.it.Tree = {
			    invalidArgumentType: 'Tipo di argomento non valido fornito.',
			    errorOnRequest: 'Si è verificato un errore durante il recupero dei dati: ',
			    noDataSourceUrl: 'Il controllo igTree richiede un dataSourceUrl fornito per avviare una richiesta di dati a tale URL.',
			    incorrectPath: 'Impossibile trovare un nodo nel percorso fornito: ',
			    incorrectNodeObject: 'L\'argomento fornito non è un elemento nodo jQuery.',
			    setOptionError: 'Le modifiche di runtime non sono consentite per la seguente opzione: ',
			    moveTo: '<strong>Sposta in</strong> {0}',
			    moveBetween: '<strong>Sposta tra</strong> {0} e {1}',
			    moveAfter: '<strong>Sposta dopo</strong> {0}',
			    moveBefore: '<strong>Sposta prima di</strong> {0}',
			    copyTo: '<strong>Copia in</strong> {0}',
			    copyBetween: '<strong>Copia tra</strong> {0} e {1}',
			    copyAfter: '<strong>Copia dopo</strong> {0}',
			    copyBefore: '<strong>Copia prima di </strong> {0}',
			    and: 'e'
	}
		
	$.ig.Tree.locale = $.ig.Tree.locale || $.ig.locale.it.Tree;
	return $.ig.locale.it.Tree;
}));// REMOVE_FROM_COMBINED_FILES
