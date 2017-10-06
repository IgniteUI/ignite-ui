﻿/*!@license
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
	$.ig.locale.en = $.ig.locale.en || {};

	$.ig.locale.en.Tree = {
			    invalidArgumentType: 'Invalid argument type provided.',
			    errorOnRequest: 'An error has occurred while retrieving data: ',
			    noDataSourceUrl: 'The igTree control requires a dataSourceUrl provided in order to initiate a request for data to that URL.',
			    incorrectPath: 'A node was not found at the provided path: ',
			    incorrectNodeObject: 'The provided argument is not a jQuery node element.',
			    setOptionError: 'Runtime changes are not allowed for the following option: ',
			    moveTo: '<strong>Move to</strong> {0}',
			    moveBetween: '<strong>Move between</strong> {0} and {1}',
			    moveAfter: '<strong>Move after</strong> {0}',
			    moveBefore: '<strong>Move before</strong> {0}',
			    copyTo: '<strong>Copy to</strong> {0}',
			    copyBetween: '<strong>Copy between</strong> {0} and {1}',
			    copyAfter: '<strong>Copy after</strong> {0}',
			    copyBefore: '<strong>Copy before</strong> {0}',
			    and: 'and'
	}
		
	$.ig.Tree.locale = $.ig.Tree.locale || $.ig.locale.en.Tree;
	return $.ig.locale.en.Tree;
}));// REMOVE_FROM_COMBINED_FILES
