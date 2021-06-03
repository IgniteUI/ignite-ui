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
	$.ig.locale.sv = $.ig.locale.sv || {};

	$.ig.locale.sv.Tree = {
			    invalidArgumentType: 'Ogiltig argumenttyp tillhandahålls.',
			    errorOnRequest: 'Ett fel har inträffat vid hämtning av data: ',
			    noDataSourceUrl: 'IgTree-kontrollen kräver en dataSourceUrl tillhandahållen för att initiera en begäran om data till den URL: n.',
			    incorrectPath: 'En nod hittades inte vid den angivna sökvägen: ',
			    incorrectNodeObject: 'Argumentet som tillhandahålls är inte ett jQuery-nodelement.',
			    setOptionError: 'Runtime-ändringar är inte tillåtna för följande alternativ: ',
			    moveTo: '<strong>Flytta till</strong> {0}',
			    moveBetween: '<strong>Flytta mellan</strong> {0} och {1}',
			    moveAfter: '<strong>Flytta efter</strong> {0}',
			    moveBefore: '<strong>Flytta före</strong> {0}',
			    copyTo: '<strong>Kopiera till</strong> {0}',
			    copyBetween: '<strong>Kopiera mellan</strong> {0} och {1}',
			    copyAfter: '<strong>Kopiera efter</strong> {0}',
			    copyBefore: '<strong>Kopiera före</strong> {0}',
			    and: 'och'
	}
		
	$.ig.Tree.locale = $.ig.Tree.locale || $.ig.locale.sv.Tree;
	return $.ig.locale.sv.Tree;
}));// REMOVE_FROM_COMBINED_FILES
