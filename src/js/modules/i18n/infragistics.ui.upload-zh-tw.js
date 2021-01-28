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
		define( ["jquery"], factory );
	} else {
		return factory(jQuery);
	}
}
(function ($) {
	$.ig = $.ig || {};
	$.ig.Upload = $.ig.Upload || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale['zh-tw'] = $.ig.locale['zh-tw'] || {};

	$.ig.locale['zh-tw'].Upload = {
			    labelUploadButton: "上載檔案",
			    labelAddButton: "新增",
			    labelClearAllButton: "清除已上傳",
			    // M.H. 13 May 2011 - fix bug 75042
			    labelSummaryTemplate: "已上傳 {1} 中的 {0}",
			    labelSummaryProgressBarTemplate: "{0}/{1}",
			    labelShowDetails: "顯示詳細資訊",
			    labelHideDetails: "隱藏詳細資料",
			    labelSummaryProgressButtonCancel: "取消",
			    // M.H. 1 June 2011 Fix bug #77532
			    labelSummaryProgressButtonContinue: "上傳",
			    labelSummaryProgressButtonDone: "完成",
			    labelProgressBarFileNameContinue: "...",

			    //error messages
			    errorMessageFileSizeExceeded: "超出最大檔案大小。",
			    errorMessageGetFileStatus: "無法求取您的當前檔案狀態！可能是連線中斷。",
			    errorMessageCancelUpload: "無法發送至伺服器指令以取消上傳！可能是連線中斷。",
			    errorMessageNoSuchFile: "找不到您要求的檔案。可能是這個檔案太大。",
			    errorMessageOther: "上傳檔案有內部錯誤。錯誤代碼: {0}。",
			    errorMessageValidatingFileExtension: "文件擴展名驗證失敗。",
			    errorMessageAJAXRequestFileSize: "嘗試求取檔案大小時出現 AJAX 錯誤。",
			    errorMessageMaxUploadedFiles: "已超過上傳檔案的最大數量。",
			    errorMessageMaxSimultaneousFiles: "maxSimultaneousFilesUploads 的值不正確。它應大於 0 或為空值。",
			    errorMessageTryToRemoveNonExistingFile: "您正在嘗試移除 id 為 {0} 的不存在的檔案。",
			    errorMessageTryToStartNonExistingFile: "您正在嘗試啟動 id 為 {0} 的不存在的檔案。",
				errorMessageDropMultipleFilesWhenSingleModel: "單一模式下，最多只能刪除 1 個檔案",

			    // M.H. 12 May 2011 - fix bug 74763: add title to all buttons
			    // title attributes            
			    titleUploadFileButtonInit: "上載檔案",
			    titleAddFileButton: "新增",
			    titleCancelUploadButton: "取消",
			    // M.H. 1 June 2011 Fix bug #77532
			    titleSummaryProgressButtonContinue: "上傳",
			    titleClearUploaded: "清除已上傳",
			    titleShowDetailsButton: "顯示詳細資訊",
			    titleHideDetailsButton: "隱藏詳細資料",
			    titleSummaryProgressButtonCancel: "取消",
			    titleSummaryProgressButtonDone: "完成",
			    // M.H. 1 June 2011 Fix bug #77532
			    titleSingleUploadButtonContinue: "上傳",
			    titleClearAllButton: "清除已上傳"
	}
		
	$.ig.Upload.locale = $.ig.Upload.locale || $.ig.locale['zh-tw'].Upload;
	return $.ig.locale['zh-tw'].Upload;
}));// REMOVE_FROM_COMBINED_FILES
