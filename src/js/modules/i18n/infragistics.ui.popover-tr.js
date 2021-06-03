/*!@license
* Infragistics.Web.ClientUI Popover localization resources <build_number>
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
	$.ig.locale.tr = $.ig.locale.tr || {};
	$.ig.Popover = $.ig.Popover || {};
	
	$.ig.locale.tr.Popover = {
		popoverOptionChangeNotSupported: "igPopover başlatıldıktan sonra aşağıdaki seçeneğin değiştirilmesi desteklenmez:",
		popoverShowMethodWithoutTarget: "Seçiciler seçeneği kullanıldığında, göster işlevinin hedef parametresi zorunludur"
	};

$.ig.Popover.locale = $.ig.Popover.locale || $.ig.locale.tr.Popover;
return $.ig.locale.tr.Popover;
}));// REMOVE_FROM_COMBINED_FILES
