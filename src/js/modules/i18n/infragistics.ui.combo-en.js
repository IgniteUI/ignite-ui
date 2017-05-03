/*!@license
* Infragistics.Web.ClientUI Combo localization resources <build_number>
*
* Copyright (c) 2011-<year> Infragistics Inc.
*
* http://www.infragistics.com/
*
*/

(function (factory) {
	if (typeof define === "function" && define.amd) {
		define( [
			"jquery"
		], factory );
	} else {
		factory(jQuery);
	}
}
(function ($) {
    $.ig = $.ig || {};

    if (!$.ig.Combo) {
	    $.ig.Combo = {
		    locale: {
		        noMatchFoundText: 'No matches found',
			    dropDownButtonTitle: 'Show drop-down',
			    clearButtonTitle: 'Clear value',
			    placeHolder: 'select...',
			    notSuported: 'Operation is not supported.',
			    errorNoSupportedTextsType: "A different filtering text is required. Provide a value that is either a string or an array of strings.",
			    errorUnrecognizedHighlightMatchesMode: "A different highlight matches mode is required. Choose a value between 'multi', 'contains', 'startsWith', 'full' and 'null'.",
		    	errorIncorrectGroupingKey: "Grouping key is not correct."
		    }
	    };
    }
}));// REMOVE_FROM_COMBINED_FILES
