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
	$.ig.locale['zh-Hans'] = $.ig.locale['zh-Hans'] || {};

	$.ig.locale['zh-Hans'].Upload = {
			    labelUploadButton: "上传文件",
			    labelAddButton: "添加",
			    labelClearAllButton: "清除已上传",
			    // M.H. 13 May 2011 - fix bug 75042
			    labelSummaryTemplate: "{1} 中的 {0} 个已上传",
			    labelSummaryProgressBarTemplate: "{0}/{1}",
			    labelShowDetails: "显示详细信息",
			    labelHideDetails: "隐藏详细信息",
			    labelSummaryProgressButtonCancel: "取消",
			    // M.H. 1 June 2011 Fix bug #77532
			    labelSummaryProgressButtonContinue: "上传",
			    labelSummaryProgressButtonDone: "完成",
			    labelProgressBarFileNameContinue: "...",

			    //error messages
			    errorMessageFileSizeExceeded: "超出最大文件大小。",
			    errorMessageGetFileStatus: "无法获取您的当前文件状态！连接可能已断开。",
			    errorMessageCancelUpload: "无法发送至服务器命令以取消上传！连接可能已断开。",
			    errorMessageNoSuchFile: "找不到您请求的文件。该文件可能太大。",
			    errorMessageOther: "上传文件时出现内部错误。错误代码: {0}。",
			    errorMessageValidatingFileExtension: "文件扩展名验证失败。",
			    errorMessageAJAXRequestFileSize: "尝试获取文件大小时出现 AJAX 错误。",
			    errorMessageMaxUploadedFiles: "已超过上传文件的最大数量。",
			    errorMessageMaxSimultaneousFiles: "maxSimultaneousFilesUploads 的值不正确。它应大于 0 或为空值。",
			    errorMessageTryToRemoveNonExistingFile: "您正在尝试删除 ID 为 {0} 的不存在的文件。",
			    errorMessageTryToStartNonExistingFile: "您正在尝试启动 ID 为 {0} 的不存在的文件。",
				errorMessageDropMultipleFilesWhenSingleModel: "模式为单模式时，不允许删除超过 1 个文件",

			    // M.H. 12 May 2011 - fix bug 74763: add title to all buttons
			    // title attributes            
			    titleUploadFileButtonInit: "上传文件",
			    titleAddFileButton: "添加",
			    titleCancelUploadButton: "取消",
			    // M.H. 1 June 2011 Fix bug #77532
			    titleSummaryProgressButtonContinue: "上传",
			    titleClearUploaded: "清除已上传",
			    titleShowDetailsButton: "显示详细信息",
			    titleHideDetailsButton: "隐藏详细信息",
			    titleSummaryProgressButtonCancel: "取消",
			    titleSummaryProgressButtonDone: "完成",
			    // M.H. 1 June 2011 Fix bug #77532
			    titleSingleUploadButtonContinue: "上传",
			    titleClearAllButton: "清除已上传"
	}
		
	$.ig.Upload.locale = $.ig.Upload.locale || $.ig.locale['zh-Hans'].Upload;
	return $.ig.locale['zh-Hans'].Upload;
}));// REMOVE_FROM_COMBINED_FILES
