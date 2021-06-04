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
	$.ig.locale.cs = $.ig.locale.cs || {};

	$.ig.locale.cs.Tree = {
			    invalidArgumentType: 'Byl zadán neplatný typ argumentu.',
			    errorOnRequest: 'Při načítání dat došlo k chybě: ',
			    noDataSourceUrl: 'Ovládací prvek igTree vyžaduje poskytnutý dataSourceUrl, aby bylo možné zahájit požadavek na data na danou adresu URL.',
			    incorrectPath: 'Na zadané cestě nebyl nalezen uzel: ',
			    incorrectNodeObject: 'Zadaný argument není prvkem uzlu jQuery.',
			    setOptionError: 'Změny za běhu nejsou povoleny pro následující možnost: ',
			    moveTo: '<strong>Přesunout do</strong> {0}',
			    moveBetween: '<strong>Přesun mezi</strong> {0} a {1}',
			    moveAfter: '<strong>Přesunout po</strong> {0}',
			    moveBefore: '<strong>Přesunout před</strong> {0}',
			    copyTo: '<strong>Zkopírovat do</strong> {0}',
			    copyBetween: '<strong>Kopírovat mezi</strong> {0} a {1}',
			    copyAfter: '<strong>Kopírovat po</strong> {0}',
			    copyBefore: '<strong>Kopírovat před</strong> {0}',
			    and: 'a'
	}
		
	$.ig.Tree.locale = $.ig.Tree.locale || $.ig.locale.cs.Tree;
	return $.ig.locale.cs.Tree;
}));// REMOVE_FROM_COMBINED_FILES
