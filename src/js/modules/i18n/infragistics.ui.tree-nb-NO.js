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
	$.ig.locale['nb-NO'] = $.ig.locale['nb-NO'] || {};

	$.ig.locale['nb-NO'].Tree = {
			    invalidArgumentType: 'Ugyldig argumenttype er oppgitt.',
			    errorOnRequest: 'Det har oppstått en feil under henting av data: ',
			    noDataSourceUrl: 'IgTree-kontrollen krever en dataSourceUrl for å starte en forespørsel om data til denne URL-adressen.',
			    incorrectPath: 'Det ble ikke funnet en node på den angitte banen: ',
			    incorrectNodeObject: 'Det oppgitte argumentet er ikke et jQuery-nodelement.',
			    setOptionError: 'Kjøretidsendringer er ikke tillatt for følgende alternativ: ',
			    moveTo: '<strong>Flytt til</strong> {0}',
			    moveBetween: '<strong>Flytt mellom</strong> {0} og {1}',
			    moveAfter: '<strong>Flytt etter</strong> {0}',
			    moveBefore: '<strong>Flytt før</strong> {0}',
			    copyTo: '<strong>Kopier til</strong> {0}',
			    copyBetween: '<strong>Kopier mellom</strong> {0} og {1}',
			    copyAfter: '<strong>Kopier etter</strong> {0}',
			    copyBefore: '<strong>Kopier før</strong> {0}',
			    and: 'og'
	}
		
	$.ig.Tree.locale = $.ig.Tree.locale || $.ig.locale['nb-NO'].Tree;
	return $.ig.locale['nb-NO'].Tree;
}));// REMOVE_FROM_COMBINED_FILES
