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
		define( [
			"jquery"
		], factory );
	} else {
		factory(jQuery);
	}
}
(function ($) {
    $.ig = $.ig || {};

    if (!$.ig.Tree) {
	    $.ig.Tree = {};

	    $.extend($.ig.Tree, {
		    locale: {
			    invalidArgumentType: '提供された引数のタイプは無効です。',
			    errorOnRequest: 'データを取得するときにエラーが発生しました: ',
			    noDataSourceUrl: 'igTree コントロールは、その URL にデータの要求を送信するために dataSourceUrl を提供する必要があります。',
			    incorrectPath: '指定したパスにノードが見つかりませんでした: ',
			    incorrectNodeObject: '指定した引数は jQuery ノード要素ではありません。',
			    setOptionError: '次のオプションはランタイムで変更できません: ',
			    moveTo: '{0} <strong>へ移動</strong>',
			    moveBetween: '{0} および {1} <strong>の間へ移動</strong>',
			    moveAfter: '{0} <strong>の後へ移動</strong>',
			    moveBefore: '{0} <strong>の前へ移動</strong>',
			    copyTo: '{0} <strong>へコピー</strong>',
			    copyBetween: '{0} および {1} <strong>の間へコピー</strong>',
			    copyAfter: '{0} <strong>の後へコピー</strong>',
			    copyBefore: '{0} <strong>の前へコピー</strong>',
			    and: 'および'
		    }
	    });

    }
}));// REMOVE_FROM_COMBINED_FILES
