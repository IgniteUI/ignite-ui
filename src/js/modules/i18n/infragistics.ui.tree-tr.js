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
	$.ig.locale.tr = $.ig.locale.tr || {};

	$.ig.locale.tr.Tree = {
			    invalidArgumentType: 'Geçersiz bağımsız değişken türü sağlandı.',
			    errorOnRequest: 'Veriler alınırken bir hata oluştu: ',
			    noDataSourceUrl: 'İgTree kontrolü, söz konusu URL\'ye veri talebi başlatmak için sağlanan bir dataSourceUrl gerektirir.',
			    incorrectPath: 'Sağlanan yolda bir düğüm bulunamadı: ',
			    incorrectNodeObject: 'Sağlanan bağımsız değişken bir jQuery düğüm öğesi değil.',
			    setOptionError: 'Aşağıdaki seçenek için çalışma zamanı değişikliklerine izin verilmez: ',
			    moveTo: '{0} konumuna <strong>taşı</strong>',
			    moveBetween: '{0} ve {1} <strong>arasında taşı</strong>',
			    moveAfter: '{0} <strong>sonrasına taşı</strong>',
			    moveBefore: '{0} <strong>öncesine taşı</strong>',
			    copyTo: '{0} konumuna <strong>kopyala</strong>',
			    copyBetween: '{0} ve {1} <strong>arasına kopyala</strong>',
			    copyAfter: '{0} <strong>sonrasına kopyala</strong>',
			    copyBefore: '{0} tarihinden <strong>öncesine kopyala</strong>',
			    and: 've'
	}
		
	$.ig.Tree.locale = $.ig.Tree.locale || $.ig.locale.tr.Tree;
	return $.ig.locale.tr.Tree;
}));// REMOVE_FROM_COMBINED_FILES
