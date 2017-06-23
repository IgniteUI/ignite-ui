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
		define( [
			"jquery"
		], factory );
	} else {
		factory(jQuery);
	}
}
(function ($) {
    $.ig = $.ig || {};

	$.ig.Dialog = {
		locale: {
			closeButtonTitle: "Затвори",
			minimizeButtonTitle: "Минимизирай",
			maximizeButtonTitle: "Максимизирай",
			pinButtonTitle: "Закачи",
			unpinButtonTitle: "Откачи",
			restoreButtonTitle: "Възстанови",
			setOptionError: 'Тази опцията не може да бъде настроена по време на изпълнение.'
		}
	};

	$.ig.locale = $.ig.locale || {};
	$.ig.locale.bg = $.ig.locale.bg || {};
	$.ig.locale.bg.Dialog = $.extend({}, $.ig.Dialog.locale);
}));// REMOVE_FROM_COMBINED_FILES
