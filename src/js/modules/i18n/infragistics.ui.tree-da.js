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
	$.ig.locale.da = $.ig.locale.da || {};

	$.ig.locale.da.Tree = {
			    invalidArgumentType: 'Ugyldig argumenttype angivet.',
			    errorOnRequest: 'Der opstod en fejl under hentning af data: ',
			    noDataSourceUrl: 'IgTree-kontrol kræver angivning af en dataSourceUrl for at starte en anmodning om data til denne URL.',
			    incorrectPath: 'Der blev ikke fundet et knudepunkt på den angivne sti: ',
			    incorrectNodeObject: 'Det angivne argument er ikke et jQuery-knudepunktelement.',
			    setOptionError: 'Kørselsændringer er ikke tilladt for følgende tilstand: ',
			    moveTo: '<strong>Flyt til</strong> {0}',
			    moveBetween: '<strong>Flyt mellem</strong> {0} og {1}',
			    moveAfter: '<strong>Flyt efter</strong> {0}',
			    moveBefore: '<strong>Flyt inden</strong> {0}',
			    copyTo: '<strong>Kopier til</strong> {0}',
			    copyBetween: '<strong>Kopier mellem</strong> {0} og {1}',
			    copyAfter: '<strong>Kopiér efter</strong> {0}',
			    copyBefore: '<strong>Kopiér inden</strong> {0}',
			    and: 'og'
	}
		
	$.ig.Tree.locale = $.ig.Tree.locale || $.ig.locale.da.Tree;
	return $.ig.locale.da.Tree;
}));// REMOVE_FROM_COMBINED_FILES
