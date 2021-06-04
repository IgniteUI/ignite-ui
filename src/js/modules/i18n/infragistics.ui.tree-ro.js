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
	$.ig.locale.ro = $.ig.locale.ro || {};

	$.ig.locale.ro.Tree = {
			    invalidArgumentType: 'Tip de argument nevalid furnizat.',
			    errorOnRequest: 'A apărut o eroare la preluarea datelor: ',
			    noDataSourceUrl: 'Controlul igTree necesită un dataSourceUrl furnizat pentru a iniția o cerere de date către adresa URL respectivă.',
			    incorrectPath: 'Nu a fost găsit un nod la calea furnizată: ',
			    incorrectNodeObject: 'Argumentul furnizat nu este un element nod jQuery.',
			    setOptionError: 'Modificările în timpul rulării nu sunt permise pentru următoarea opțiune: ',
			    moveTo: '<strong>Mutați la</strong> {0}',
			    moveBetween: '<strong>Mutați între</strong> {0} și {1}',
			    moveAfter: '<strong>Mutați după</strong> {0}',
			    moveBefore: '<strong>Mutați înainte de</strong> {0}',
			    copyTo: '<strong>Copiați în</strong> {0}',
			    copyBetween: '<strong>Copiați între</strong> {0} și {1}',
			    copyAfter: '<strong>Copiază după</strong> {0}',
			    copyBefore: '<strong>Copiați înainte de</strong> {0}',
			    and: 'și'
	}
		
	$.ig.Tree.locale = $.ig.Tree.locale || $.ig.locale.ro.Tree;
	return $.ig.locale.ro.Tree;
}));// REMOVE_FROM_COMBINED_FILES
