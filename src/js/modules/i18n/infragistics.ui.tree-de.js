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
		define( [], factory );
	} else {
		return factory();
	}
}
(function () {
    $ = $ || {};
    $.ig = $.ig || {};
	$.ig.Tree = $.ig.Tree || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.de = $.ig.locale.de || {};

	$.ig.locale.de.Tree = {
			    invalidArgumentType: 'Ungültiger Argumenttyp angegeben.',
			    errorOnRequest: 'Beim Abrufen von Daten ist ein Fehler aufgetreten: ',
			    noDataSourceUrl: 'Für die igTree Steuerung muss eine dataSourceUrl angegeben werden, um eine Anforderung für Daten an diese URL zu initiieren.',
			    incorrectPath: 'Am angegebenen Pfad wurde kein Knoten gefunden: ',
			    incorrectNodeObject: 'Das angegebene Argument ist kein jQuery Knotenelement.',
			    setOptionError: 'Laufzeit-Änderungen sind für die folgende Option nicht zugelassen: ',
			    moveTo: '<strong>Verschieben nach</strong> {0}',
			    moveBetween: '<strong>Verschieben zwischen</strong> {0} und {1}',
			    moveAfter: '<strong>Verschieben nach</strong> {0}',
			    moveBefore: '<strong>Verschieben vor</strong> {0}',
			    copyTo: '<strong>Kopieren nach</strong> {0}',
			    copyBetween: '<strong>Kopieren zwischen</strong> {0} und {1}',
			    copyAfter: '<strong>Kopieren nach</strong> {0}',
			    copyBefore: '<strong>Kopieren vor</strong> {0}',
			    and: 'und'
	}

    $.ig.Tree.locale = $.ig.Tree.locale || $.ig.locale.de.Tree;
	return $.ig.locale.de.Tree;
}));// REMOVE_FROM_COMBINED_FILES
