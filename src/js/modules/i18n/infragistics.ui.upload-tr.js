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
	$.ig.locale.tr = $.ig.locale.tr || {};

	$.ig.locale.tr.Upload = {
			    labelUploadButton: "Dosya yükleme",
			    labelAddButton: "Ekle",
			    labelClearAllButton: "Yüklenenleri Temizle",
			    // M.H. 13 May 2011 - fix bug 75042
			    labelSummaryTemplate: "{0}/{1} yüklendi",
			    labelSummaryProgressBarTemplate: "{0}/{1}",
			    labelShowDetails: "Detayları Göster",
			    labelHideDetails: "Detayları Gizle",
			    labelSummaryProgressButtonCancel: "İptal",
			    // M.H. 1 June 2011 Fix bug #77532
			    labelSummaryProgressButtonContinue: "Yükle",
			    labelSummaryProgressButtonDone: "Bitti",
			    labelProgressBarFileNameContinue: "...",

			    //error messages
			    errorMessageFileSizeExceeded: "Maksimum dosya boyutu aşıldı.",
			    errorMessageGetFileStatus: "Mevcut dosya durumunuz alınamadı! Muhtemelen bağlantı kesildi.",
			    errorMessageCancelUpload: "Yüklemeyi iptal etmek için sunucuya komut gönderilemedi! Muhtemelen bağlantı kesildi.",
			    errorMessageNoSuchFile: "İstediğiniz dosya bulunamadı. Muhtemelen bu dosya çok büyük.",
			    errorMessageOther: "Dosya yüklenirken dahili hata oluştu. Hata kodu: {0}.",
			    errorMessageValidatingFileExtension: "Dosya uzantısı doğrulaması başarısız oldu.",
			    errorMessageAJAXRequestFileSize: "Dosya boyutunu almaya çalışırken AJAX hatası.",
			    errorMessageMaxUploadedFiles: "Maksimum yükleme dosyası sayısı aşıldı.",
			    errorMessageMaxSimultaneousFiles: "MaxSimultaneousFilesUploads değeri yanlış. 0'dan büyük veya boş olmalıdır.",
			    errorMessageTryToRemoveNonExistingFile: "{0} kimliğine sahip olmayan bir dosyayı kaldırmaya çalışıyorsunuz.",
			    errorMessageTryToStartNonExistingFile: "Mevcut olmayan dosyayı {0} kimliğiyle başlatmaya çalışıyorsunuz.",
				errorMessageDropMultipleFilesWhenSingleModel: "Mod tek olduğunda 1'den fazla dosya düşürmeye izin verilmez",

			    // M.H. 12 May 2011 - fix bug 74763: add title to all buttons
			    // title attributes            
			    titleUploadFileButtonInit: "Dosya yükleme",
			    titleAddFileButton: "Ekle",
			    titleCancelUploadButton: "İptal",
			    // M.H. 1 June 2011 Fix bug #77532
			    titleSummaryProgressButtonContinue: "Yükle",
			    titleClearUploaded: "Yüklenenleri Temizle",
			    titleShowDetailsButton: "Detayları Göster",
			    titleHideDetailsButton: "Detayları Gizle",
			    titleSummaryProgressButtonCancel: "İptal",
			    titleSummaryProgressButtonDone: "Bitti",
			    // M.H. 1 June 2011 Fix bug #77532
			    titleSingleUploadButtonContinue: "Yükle",
			    titleClearAllButton: "Yüklenenleri Temizle"
	}
		
	$.ig.Upload.locale = $.ig.Upload.locale || $.ig.locale.tr.Upload;
	return $.ig.locale.tr.Upload;
}));// REMOVE_FROM_COMBINED_FILES
