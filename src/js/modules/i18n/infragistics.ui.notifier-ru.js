/*!@license
* Infragistics.Web.ClientUI Notifier localization resources <build_number>
*
* Copyright (c) 2011-<year> Infragistics Inc.
*
* http://www.infragistics.com/
*
*/

(function($) {
$.ig = $.ig || {};

if (!$.ig.Notifier) {
	$.ig.Notifier = {};

	$.extend($.ig.Notifier, {
		locale: {
		    successMsg: "Успешно",
		    errorMsg: "Ошибка",
		    warningMsg: "Предупреждение",
		    notSupportedState: "Not supported notification state! Use one of the supported states 'success', 'info', 'warning', 'error'",
		    notSupportedMode: "Not supported notification mode! Use one of the supported modes 'auto', 'popover', 'inline'"
		}
	});

}
})(jQuery);
