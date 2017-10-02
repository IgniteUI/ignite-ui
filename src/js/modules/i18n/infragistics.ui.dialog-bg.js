/*!@license
* Infragistics.Web.ClientUI Dialog localization resources <build_number>
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
		factory(jQuery);
	}
}
(function ($) {
	$.ig = $.ig || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.bg = $.ig.locale.bg || {};
	$.ig.Dialog = $.ig.Dialog || {};
	
	$.ig.locale.bg.Dialog = {
			closeButtonTitle: "Затвори",
			minimizeButtonTitle: "Минимизирай",
			maximizeButtonTitle: "Максимизирай",
			pinButtonTitle: "Закачи",
			unpinButtonTitle: "Откачи",
			restoreButtonTitle: "Възстанови",
			setOptionError: 'Тази опцията не може да бъде настроена по време на изпълнение.'
	};

	$.ig.Dialog.locale = $.ig.Dialog.locale || $.ig.locale.bg.Dialog;
	return $.ig.locale.bg.Dialog;
}));// REMOVE_FROM_COMBINED_FILES
