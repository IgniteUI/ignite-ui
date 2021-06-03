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
	$.ig.locale.hu = $.ig.locale.hu || {};

	$.ig.locale.hu.Tree = {
			    invalidArgumentType: 'Érvénytelen paramétertípus lett megadva.',
			    errorOnRequest: 'Hiba történt az adatok lekérése közben: ',
			    noDataSourceUrl: 'Az igTree vezérléshez egy dataSourceUrl szükséges, hogy az adott URL-re adatkérést kezdeményezhessen.',
			    incorrectPath: 'A megadott elérési útvonalon nem található csomópont: ',
			    incorrectNodeObject: 'A megadott paraméter nem jQuery csomópontelem.',
			    setOptionError: 'A következő opció esetében nem engedélyezettek a futásidejű változtatások: ',
			    moveTo: '<strong>Áthelyezés ide:</strong> {0}',
			    moveBetween: '<strong>Áthelyezés</strong> {0} és {1} közé',
			    moveAfter: '<strong>Áthelyezés</strong> {0} után',
			    moveBefore: '<strong>Áthelyezés</strong> {0} elé',
			    copyTo: '<strong>Másolás ide:</strong> {0}',
			    copyBetween: '<strong>Másolás</strong> {0} és {1} közé',
			    copyAfter: '<strong>Másolás</strong> {0} után',
			    copyBefore: '<strong>Másolás</strong> {0} elé',
			    and: 'és'
	}
		
	$.ig.Tree.locale = $.ig.Tree.locale || $.ig.locale.hu.Tree;
	return $.ig.locale.hu.Tree;
}));// REMOVE_FROM_COMBINED_FILES
