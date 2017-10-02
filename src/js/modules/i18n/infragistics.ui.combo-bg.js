﻿/*!@license
* Infragistics.Web.ClientUI Combo localization resources <build_number>
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
	$.ig.locale.bg = $.ig.locale.bg || {};
	$.ig.Combo = $.ig.Combo || {};
	
	$.ig.locale.bg.Combo = {
			noMatchFoundText: 'Няма намерени резултати',
			dropDownButtonTitle: 'Покажи падащото меню',
			clearButtonTitle: 'Изчисти стойността',
			placeHolder: 'изберете...',
			notSuported: 'Операцията не се поддържа.',
			errorNoSupportedTextsType: "Необходим е различен филтър текст. Подайте стойност, която е или низ или масив от низове.",
			errorUnrecognizedHighlightMatchesMode: 'Необходим е друг highlight matches режим.  Изберете стойност измежду "multi", "contains", "startsWith", "full" и "null".',
			errorIncorrectGroupingKey: "Ключът за групиране не е правилен."
	};
	
	$.ig.Combo.locale = $.ig.Combo.locale || $.ig.locale.bg.Combo;
	return $.ig.locale.bg.Combo;
}));// REMOVE_FROM_COMBINED_FILES
