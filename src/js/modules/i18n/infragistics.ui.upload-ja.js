/*!@license
* Infragistics.Web.ClientUI Upload localization resources <build_number>
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

    if (!$.ig.Upload) {
	    $.ig.Upload = {};

	    $.extend($.ig.Upload, {

		    locale: {
			    labelUploadButton: "ファイルのアップロード",
			    labelAddButton: "追加",
			    labelClearAllButton: "すべてクリア",
			    labelSummaryTemplate: "{0} / {1} ファイルがアップロードされました",
			    labelSummaryProgressBarTemplate: "{0} / {1}",
			    labelShowDetails: "詳細の表示",
			    labelHideDetails: "詳細の非表示",
			    labelSummaryProgressButtonCancel: "キャンセル",
			    labelSummaryProgressButtonContinue: "アップロード",
			    labelSummaryProgressButtonDone: "完了",
			    labelProgressBarFileNameContinue: "...",

			    //error messages
			    errorMessageFileSizeExceeded: "最大ファイル サイズを超えています。",
			    errorMessageGetFileStatus: "現在のファイルの状態を取得できませんでした。接続されていない可能性があります。",
			    errorMessageCancelUpload: "サーバーにアップロードをキャンセルするコマンドを送信できませんでした。接続されていない可能性があります。",
			    errorMessageNoSuchFile: "要求されたファイルが見つかりませんでした。ファイル サイズが大きすぎる可能性があります。",
			    errorMessageOther: "ファイルのアップロードで内部エラーが発生しました。エラー コード : {0}。",
			    errorMessageValidatingFileExtension: "ファイル拡張子の検証が失敗しました。",
			    errorMessageAJAXRequestFileSize: "ファイル サイズの取得中に AJAX エラーが発生しました。",
			    errorMessageMaxUploadedFiles: "アップロードするファイルの最大数を超えました。",
			    errorMessageMaxSimultaneousFiles: "maxSimultaneousFilesUploads の値は無効です。0 より大きい値または null 値に設定する必要があります。",
			    errorMessageTryToRemoveNonExistingFile: "削除する ID {0} のファイルが存在しません。",
			    errorMessageTryToStartNonExistingFile: "開始する ID {0} のファイルが存在しません。",
			    errorMessageDropMultipleFilesWhenSingleModel: "mode が single の場合、2 ファイル以上のドロップは許可されません。",

			    // title attributes
			    titleUploadFileButtonInit: "ファイルのアップロード",
			    titleAddFileButton: "追加",
			    titleCancelUploadButton: "キャンセル",
			    titleSummaryProgressButtonContinue: "アップロード",
			    titleClearUploaded: "すべてクリア",
			    titleShowDetailsButton: "詳細の表示",
			    titleHideDetailsButton: "詳細の非表示",
			    titleSummaryProgressButtonCancel: "キャンセル",
			    titleSummaryProgressButtonDone: "完了",
			    titleSingleUploadButtonContinue: "アップロード",
			    titleClearAllButton: "すべてクリア"
		    }
	    });

    }
}));// REMOVE_FROM_COMBINED_FILES
