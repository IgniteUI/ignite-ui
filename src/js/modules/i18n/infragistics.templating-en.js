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
		define( ["jquery"], factory );
	} else {
		return factory(jQuery);
	}
}
(function ($) {
	$.ig = $.ig || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.en = $.ig.locale.en || {};
	$.ig.Templating = $.ig.Templating || {};
	
	$.ig.locale.en.Templating = {
		undefinedArgument: 'An error has occurred while trying to retrieve data source property: ',
		noAdvancedTemplating: 'The advanced templating engine is not loaded in order to handle {{if}} or {{each}}. Please include the "infragistics.templating.advanced.js" module in order to use advanced templating features.'
	};

	$.ig.Templating.locale = $.ig.Templating.locale || $.ig.locale.en.Templating;
	return $.ig.locale.en.Templating;
}));// REMOVE_FROM_COMBINED_FILES
