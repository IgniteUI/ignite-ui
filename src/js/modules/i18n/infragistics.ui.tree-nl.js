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
	$.ig.locale.nl = $.ig.locale.nl || {};

	$.ig.locale.nl.Tree = {
			    invalidArgumentType: 'Ongeldig argumenttype opgegeven.',
			    errorOnRequest: 'Er is een fout opgetreden bij het ophalen van gegevens: ',
			    noDataSourceUrl: 'Het igTree-besturingselement vereist een dataSourceUrl om een verzoek om gegevens naar die URL te initiëren.',
			    incorrectPath: 'Er is geen knooppunt gevonden op het opgegeven pad: ',
			    incorrectNodeObject: 'Het opgegeven argument is geen jQuery-knooppuntelement.',
			    setOptionError: 'Runtime-wijzigingen zijn niet toegestaan voor de volgende optie: ',
			    moveTo: '<strong>Verplaatsen naar</strong> {0}',
			    moveBetween: '<strong>Schakelen tussen</strong> {0} en {1}',
			    moveAfter: '<strong>Verplaatsen na</strong> {0}',
			    moveBefore: '<strong>Verplaatsen vóór</strong> {0}',
			    copyTo: '<strong>Kopiëren naar</strong> {0}',
			    copyBetween: '<strong>Kopiëren tussen</strong> {0} en {1}',
			    copyAfter: '<strong>Kopiëren na</strong> {0}',
			    copyBefore: '<strong>Kopiëren vóór</strong> {0}',
			    and: 'en'
	}
		
	$.ig.Tree.locale = $.ig.Tree.locale || $.ig.locale.nl.Tree;
	return $.ig.locale.nl.Tree;
}));// REMOVE_FROM_COMBINED_FILES
