/*!@license
* Infragistics.Web.ClientUI templating localization resources <build_number>
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
		factory();
	}
}
(function () {
	$ = $ || {};
	$.ig = $.ig || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.fr = $.ig.locale.fr || {};
	$.ig.Templating = $.ig.Templating || {};
	
	$.ig.locale.fr.Templating = {
			undefinedArgument: "Une erreur s'est produite pendant la récupération de la propriété de la source de données : "
	};

	$.ig.Templating.locale = $.ig.Templating.locale || $.ig.locale.fr.Templating;
	return $.ig.locale.fr.Templating;
}));// REMOVE_FROM_COMBINED_FILES
