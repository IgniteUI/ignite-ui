/*!@license
 * Infragistics.Web.ClientUI jQuery File Upload <build_number>
 *
 * Copyright (c) 2011-<year> Infragistics Inc.
 *
 * http://www.infragistics.com/
 *
 * Depends on:
 *  jquery-1.9.1.js
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	infragistics.util.js
 *  infragistics.util.jquery.js
 *  infragistics.ui.shared.js
 */

(function (factory) {
	if (typeof define === "function" && define.amd) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"jquery-ui",
			"./infragistics.util",
			"./infragistics.util.jquery",
			"./infragistics.ui.shared"
		], factory );
	} else {

		// Browser globals
		factory(jQuery);
	}
}
(function ($) {
	$.widget("ui.igBrowseButton", $.ui.igButton, {
		/* this class should be general for igBrowseButton - to work properly widget do not change it */
		_const: {
			filePickerWidth: "220px",
			filePickerHeight: "30px"
		},
		css: {
			"filePickerClass": "ui-igbrowsebutton-filepicker"
		},
		options: {
			autoselect: true,
			multipleFiles: false,
			/* M.H. 13 Feb 2014 Fix for bug #164347: Move input type="file" from document body to the upload container */
			container: null
		},
		_id: function (id) {
			return this.element[ 0 ].id + id;
		},
		_create: function () {
			var filepickerId = this._id("_fp"), self = this;

			$.extend($.ui.igBrowseButton.prototype.options, $.ui.igButton.prototype.options);
			$.extend($.ui.igBrowseButton.prototype.css, $.ui.igButton.prototype.css);
			/* $.extend($.ui.igBrowseButton.prototype, $.ui.igButton.prototype); */
			$.ui.igButton.prototype._create.apply(this);
			this._createFilePicker(filepickerId);
			this._attachBrowseButtonEvents();
			if (this.options.disabled === true) {
				this._enableFilePicker(true);
			} else {
				this.element.bind({
					/* M.H. 27 Jul 2011 - fix bug 77323 */
					click: function (e) {
						e.preventDefault();
					},
					drop: function (e) {
						var files = e.originalEvent.dataTransfer.files;
						e.stopPropagation();
						e.preventDefault();

						if (files === null || files === undefined) {
							/* TO DO throw error */
							return false;
						}
						if (!self._trigger("fileselect", e, { files: files, multiple: true })) {
							return;
						}
						return false;
					}
				});
			}
		},
		_createFilePicker: function (filepickerId) {
			/* M.H. 1 Nov. 2011 Fix for bug #83439 - when the control is in UpdatePanel filePicker is attached to body and on async postback it is not removed
			each time when it is added filepicker it should be checked whether such DOM element with this ID exist and if so - to remove it. */
			$("#" + filepickerId).remove();
			var multiple = "", container = this.options.container;
			if (this.options.multipleFiles === true) {
				multiple = ' multiple=""';
			}
			/* M.H. 13 Feb 2014 Fix for bug #164347: Move input type="file" from document body to the upload container */
			if (!container) {
				container = $(document.body);
			}
			this.filePicker = $('<input type="file" id="' + filepickerId + '"' + multiple + "/>")
								.appendTo(container);
			this.filePicker.css({
				"position": "absolute",
				"margin": "-5px 0 0 -175px",
				"padding": "0",
				"width": "1px",
				"height": "1px",
				"fontSize": "14px",
				"opacity": "0",
				"cursor": "pointer",
				"display": "block",
				/* M.H. 30 March 2012 Fix for bug #104044 */
				"zIndex":  "1000000",
				"filter": "alpha(opacity=0)"
			});
			/* M.H. 12 May 2011 - fix bug 74763 */
			this._setTitle(this.options.title);
		},
		_setTitle: function (title) {
			/* M.H. 12 May 2011 - fix bug 74763: add method which adds/remove attribute to file picker */
			var filePicker = $("#" + this._id("_fp"));

			if (title === false) {
				filePicker.removeAttr("title");
			} else {
				filePicker.attr("title", title);
			}
		},
		_attachBrowseButtonEvents: function () {
			var self = this;

			this.mouseMoveEvent = {
				mousemove: function (event) {
					self._mousemove(event);
				}
			};
			this._internalEvents = {
				mouseover: function (event) {
					/* M.H. 18 Mar 2013 Fix for bug #136457: "Upload File" button should be tapped twice to open the browse dialog in IE10 on Windows 8 touch device and it doesn"t work if the browser is zoomed. */
					self._mousemove(event);
					self._attachMouseMove(true);
				}
			};
			self.element.bind(this._internalEvents);
			/* attach onchange property to input type="file" element */
			self._filePickerBindChange();
		},
		/* event fired when autoselect option is true attach onchange event in input */
		_filePickerBindChange: function () {
			var self = this, filePath,
				filePicker = $("#" + this._id("_fp"));
			self.tempClicked = false;
			self._filePickerEvents = {
				change: function (event) {
					var files = null, multiple = false;

					filePath = self._fileFromPath(filePicker.val());
					if (filePicker[ 0 ].files) {
						files = filePicker[ 0 ].files;
						multiple = true;
					}
					/* M.H. 18 Mar 2013 Fix for bug #136457: "Upload File" button should be tapped twice to open the browse dialog in IE10 on Windows 8 touch device and it doesn"t work if the browser is zoomed. */
					self._mousemove(event);
					/* M.H. 17 Dec 2012 Fix for bug #129478 */
					if (!self._trigger("fileselect",
										event,
										{ filePath: filePath, files: files, multiple: multiple })) {
						return;
					}
				},
				click: function (event) {
					if (!self._trigger("click", event)) {
						/* M.H. 11 May 2011 - fix bug 74553 - allow to cancel file selecting */
						return false;
					}
				}
			};
			filePicker.bind(self._filePickerEvents);
		},
		attachFilePicker: function (e, isHidden) {
			var self = this, right, bottom, t, l, relativeOffset,
				fileUploadButton = self.element,
				filePicker = this.filePicker,
				offset = fileUploadButton.offset(),
				left = parseInt(offset.left, 10),
				top = parseInt(offset.top, 10),
				filePickerDOM = filePicker[ 0 ];
			right = parseInt(left + fileUploadButton[ 0 ].offsetWidth, 10);
			bottom = parseInt(top + fileUploadButton[ 0 ].offsetHeight, 10);
			/* $("#status2").text(e.pageX); */
			if (e.pageX >= left && e.pageX <= right &&
						e.pageY >= top && e.pageY <= bottom) {
				/* M.H. 13 Feb 2014 Fix for bug #164347: Move input type="file" from document body to the upload container */
				relativeOffset = $.ig.util.getRelativeOffset(filePicker);
				t = e.pageY;
				l = e.pageX;
				t -= relativeOffset.top;
				l -= relativeOffset.left;
				filePickerDOM.style.top = t + "px";
				filePickerDOM.style.left = l + "px";
				/* if (!self.isVisibleFilePicker) { */
				if (isHidden === true) {
					filePicker.css({
						width: "1px",
						height: "1px"
					});
				} else {
					self.isVisibleFilePicker = true;
					filePicker.css({
						width: self._const.filePickerWidth,
						height: self._const.filePickerHeight
					});
				}

				/*} */
				filePickerDOM.style.display = "block";
				/* filePickerDOM.style.visibility = "visible"; */
				/* we should call prototype mousein event because when moving cursor it has attached another DOM element and mousein is not called */
				self._onMouseOver(e);
			}
		},
		getFilePicker: function () {
			var filepickerId = this._id("_fp"),
				filePicker = $("#" + filepickerId);

			filePicker.attr("id", "").css({ "display": "none" });
			this._createFilePicker(filepickerId);
			this._filePickerBindChange();
			return filePicker;
		},
		_mousemove: function (e) {
			/* attach/dettach <input type="file"> to the cursor */
			var self = this, right, bottom, t, l,
				fileUploadButton = self.element,
				filePicker = this.filePicker,
				relativeOffset,
				/* L.A. 03 December 2012 - Fixing bug #115868
				The "choose file to upload" dialog window is not visible when the window is zoomed in on a touchscreen */
				left = $.ig.util.offset(fileUploadButton).left,
				top = $.ig.util.offset(fileUploadButton).top,
				filePickerDOM = filePicker[ 0 ];
			right = parseInt(left + fileUploadButton[ 0 ].offsetWidth, 10);
			bottom = parseInt(top + fileUploadButton[ 0 ].offsetHeight, 10);
			/* $("#status2").text(e.pageX); */
			if (e.pageX >= left && e.pageX <= right &&
						e.pageY >= top && e.pageY <= bottom) {
				/* M.H. 13 Feb 2014 Fix for bug #164347: Move input type="file" from document body to the upload container */
				relativeOffset = $.ig.util.getRelativeOffset(filePicker);
				t = e.pageY;
				l = e.pageX;
				t -= relativeOffset.top;
				l -= relativeOffset.left;
				filePickerDOM.style.top = t + "px";
				filePickerDOM.style.left = l + "px";
				if (!self.isVisibleFilePicker) {
					filePicker.css({
						width: self._const.filePickerWidth,
						height: self._const.filePickerHeight
					});
					self.isVisibleFilePicker = true;
				}
				filePickerDOM.style.display = "block";
				/* filePickerDOM.style.visibility = "visible"; */
				/* we should call prototype mousein event because when moving cursor it has attached another DOM element and mousein is not called */
				self._onMouseOver(e);
			} else {
				if (self.isVisibleFilePicker) {
					filePicker.css({
						width: "1px",
						height: "1px"
					});
					self.isVisibleFilePicker = false;
				}
				self._attachMouseMove(false);
				/* filePickerDOM.style.display = "none";
				filePickerDOM.style.visibility = "hidden"; */
				self._onMouseOut(e);
			}
		},
		_attachMouseMove: function (isToAttach) {
			if (isToAttach) {
				$(document).bind(this.mouseMoveEvent);
			} else {
				$(document).unbind(this.mouseMoveEvent);
			}
		},
		_setOption: function (key, value) {
			$.ui.igButton.prototype._setOption.apply(this, arguments);
			$.Widget.prototype._setOption.apply(this, arguments);

			switch (key) {
			case "disabled":
				this._enableFilePicker(value);
				$.ui.igButton.prototype._setOption.apply(this, arguments);
				break;
			/* M.H. 12 May 2011 - fix bug 74763 */
			case "title":
				this._setTitle(value);
				break;
			default:
				break;
			}
		},
		_enableFilePicker: function (isDisabled) {
			var filePicker = $("#" + this._id("_fp"));

			if (isDisabled === false) {
				this.isVisibleFilePicker = false;
				/* filePicker.removeAttr("disabled"); */
				this._attachMouseMove(true);
				/* IE9 fix - unbind mouse over event */
				this.element.bind(this._internalEvents).mouseover();
			} else {
				/*filePicker.attr("disabled", "true"); */
				this._attachMouseMove(false);
				filePicker.css({
					width: "1px",
					height: "1px"
				});
				this.element.unbind(this._internalEvents);
			}
		},
		destroy: function () {
			/*
				$(".selector").igUpload("destroy");
			*/
			this.element.unbind(this._internalEvents);
			this.element.unbind(this.mouseMoveEvent);
			$.Widget.prototype.destroy.apply(this, arguments);
			/* M.H. 10 May 2011 - fix bug 75039: remove unnecessary comment and unnecessary line of code */
			$.ui.igButton.prototype.destroy.apply(this);

			/* M.H. 12 May 2011 - fix bug 74966 */
			$("#" + this._id("_fp")).remove();
		},
		/*************** HELPER FUNCTION ********************/
		_fileFromPath: function (file) {
			return file.replace(/(\/|\\)$/, "");
		}
		/*************** //HELPER FUNCTION ********************/
	});
	$.extend($.ui.igBrowseButton, { version: "<build_number>" });

	$.widget("ui.igUpload", $.ui.igWidget, {
		_const: {
			fileNameLimit: 100,
			AjaxQueueName: "uploadrequestsqueue",
			debug: true,
			isProgressBarAnimationEnabled: true,
			isProgressBarRange: false,
			timeoutGetFileSize: 1000,
			status: {
				NotStarted: 0, // only used in Client UI
				Started: 1,
				Finished: 2,
				NoSuchFile: 3, // when client tries to request file information wiht key which does not exist in the server
				Canceled: 4 // only used in Client UI
			},
			/* M.H. 11 May 2011 - fix bug 74621: Add error codes for most common errors */
			errorCode: {
				MimeTypeValidation: 1,
				FileSizeExceeded: 2
			},
			clientSideErrorCode: {
				maxAllowedUploadingFiles: 1,
				extensionValidation: 2,
				startUpload: 3,
				ajaxErrorGetFileStatus: 4,
				ajaxErrorCancelUpload: 5,
				removeFileUpload: 6,
				ajaxErrorRequestFileSize: 7,
				checkCanUpload: 8,
				maxFileSizeExcceeded: 9,
				dropMultipleFilesWhenSingleMode: 10
			},
			fileStatusNoError: -1,
			progressUpdateInterval: 800,
			animateProgressBarInterval: 10,
			showHideDetailsAnimationTimeout: 500,
			doubleCheckRequestInterval: 1000,
			removeSingleUploadAnimationTimeout: 300,
			maxUploadFilesDefault: -1
		},
		/* M.H. 27 Jul 2011 - fix bug 77162 - set default file extension icons array */
		defaultFileExtensionIcons: [
			/* good practice is to set at the beginning of array default classes */
			{
				/* type="string" Array of string for file extensions
				```
					//Initialize
					$(".selector").igUpload({
						fileExtensionIcons: [
							{
								ext: ["gif", "jpg", "jpeg", "png", "bmp", "yuv", "tif", "thm", "psd"],
								css: "image-class",
								def: true
							},
							{
								ext: ["mp3", "wav", "mp4", "aac", "mid", "wma", "ra", "iff", "aif", "m3u", "mpa"],
								css: "audio-class",
								def: false
							}
						]
					});

					//Get
					var fileExtIconsExt = $(".selector").igUpload("option", "fileExtensionIcons")[0].ext;

					//Set
					var fileExtIcons = [
						{
							ext: ["gif", "jpg", "jpeg", "png", "bmp", "yuv", "tif", "thm", "psd"],
							css: "image-class",
							def: true
						},
						{
							ext: ["mp3", "wav", "mp4", "aac", "mid", "wma", "ra", "iff", "aif", "m3u", "mpa"],
							css: "audio-class",
							def: false
						}
					];
					$(".selector").igUpload("option", "fileExtensionIcons", "fileExtIcons");
				```
				*/
				ext: [],
				/* type="string" Css classes which sets icon.
				```
					//Initialize
					$(".selector").igUpload({
						fileExtensionIcons: [
							{
								ext: ["gif", "jpg", "jpeg", "png", "bmp", "yuv", "tif", "thm", "psd"],
								css: "image-class",
								def: true
							},
							{
								ext: ["mp3", "wav", "mp4", "aac", "mid", "wma", "ra", "iff", "aif", "m3u", "mpa"],
								css: "audio-class",
								def: false
							}
						]
					});

					//Get
					var fileExtIconsCSS = $(".selector").igUpload("option", "fileExtensionIcons")[0].css;

					//Set
					var fileExtIcons = [
						{
							ext: ["gif", "jpg", "jpeg", "png", "bmp", "yuv", "tif", "thm", "psd"],
							css: "image-class",
							def: true
						},
						{
							ext: ["mp3", "wav", "mp4", "aac", "mid", "wma", "ra", "iff", "aif", "m3u", "mpa"],
							css: "audio-class",
							def: false
						}
					];
					$(".selector").igUpload("option", "fileExtensionIcons", "fileExtIcons");
				```
				*/
				css: "ui-icon ui-icon-document " +
					 "ui-igupload-progressbar-icon " +
					 "ui-igupload-progressbar-icon-default",
				/* type="bool" Default icons when the file extension is not found. It is taken only the first item which have def set to true, other are ignored.
				```
					//Initialize
					$(".selector").igUpload({
						fileExtensionIcons: [
							{
								ext: ["gif", "jpg", "jpeg", "png", "bmp", "yuv", "tif", "thm", "psd"],
								css: "image-class",
								def: true
							},
							{
								ext: ["mp3", "wav", "mp4", "aac", "mid", "wma", "ra", "iff", "aif", "m3u", "mpa"],
								css: "audio-class",
								def: false
							}
						]
					});

					//Get
					var fileExtIcons = $(".selector").igUpload("option", "fileExtensionIcons")[0].def;

					//Set
					var fileExtIconsIsDef = [
						{
							ext: ["gif", "jpg", "jpeg", "png", "bmp", "yuv", "tif", "thm", "psd"],
							css: "image-class",
							def: true
						},
						{
							ext: ["mp3", "wav", "mp4", "aac", "mid", "wma", "ra", "iff", "aif", "m3u", "mpa"],
							css: "audio-class",
							def: false
						}
					];
					$(".selector").igUpload("option", "fileExtensionIcons", "fileExtIcons");
				```
				*/
				def: true
			},
			{
				ext: [ "exe", "app" ],
				css: "ui-icon ui-icon-gear ui-igupload-progressbar-icon ui-igupload-progressbar-icon-exe",
				def: false
			},
			{
				ext: [ "gif", "jpg", "jpeg", "png", "bmp", "yuv", "tif", "thm", "psd" ],
				css: "ui-icon ui-icon-image ui-igupload-progressbar-icon ui-igupload-progressbar-icon-images",
				def: false
			},
			{
				ext: [ "mp3", "wav", "mp4", "aac", "mid", "wma", "ra", "iff", "aif", "m3u", "mpa" ],
				css: "ui-icon ui-icon-volume-on " +
					 "ui-icon ui-icon-image " +
					 "ui-igupload-progressbar-icon " +
					 "ui-igupload-progressbar-icon-music",
				def: false
			},
			{
				ext: [ "doc", "docx", "xls", "xlsx", "txt", "ppt", "pptx", "pdf" ],
				css: "ui-icon ui-icon-document ui-igupload-progressbar-icon ui-igupload-progressbar-icon-docs",
				def: false
			},
			{
				ext: [ "3gp", "asf", "asx", "avi", "flv", "mov", "mp4", "mpg", "rm", "swf", "vob", "wmv" ],
				css: "ui-icon ui-icon-video ui-igupload-progressbar-icon ui-igupload-progressbar-icon-video",
				def: false
			}
		],
		css: {
			/*jscs:disable*/
			/* Helper classes */
			/* clear class */
			"clearClass": "ui-helper-clearfix",
			/* hide element */
			"hiddenClass": "ui-helper-hidden",
			/* // Helper classes */
			/* class for IE6 */
			"baseClassIE6": "ui-ie6",
			/* class for IE7 */
			"baseClassIE7": "ui-ie7",
			/* class for FF */
			"baseClassMoz": "ui-moz",
			/* class for Opera */
			"baseClassOpera": "ui-opera",
			/** M.H. 29 May 2011 - fix bug 80546: add class for webkit */
			/* class for Webkit powered browsers */
			"baseClassWebkit": "ui-webkit",
			/* class for startup browse button */
			"startupBrowseButtonClasses": "ui-igstartupbrowsebutton",
			/* css class for the container */
			"baseClass": "ui-widget ui-widget ui-widget-content ui-corner-all ui-igupload",
			/* css classes applied to main container in single/multiple mode */
			"baseMainContainerClass": "ui-igupload-basemaincontainer",
			/* css classes applied to main container when multiple file upload mode is selected */
			"multipleDialogClasses": "ui-iguploadmultiple",
			/* css classes applied to main container when multiple file upload mode is selected */
			"singleDialogClass": "ui-iguploadsingle",
			/* css classes applied on browse button - button in main container */
			"browseButtonClass": "ui-igupload-browsebutton",
			/*css classes applied to DOM element containing all file upload progress bars */
			"containerClass": "ui-igupload-container ui-widget-content",
			/* div containing separate individual file upload */
			"uploadProgressClass": "ui-igupload-uploadprogress",
			/* css class applied on div which contains add button, clear button and progress details of the files */
			"fileInfoMainContainer": "ui-igupload-fimaincontainer",
			/* css class container for each file */
			"progressContainer": "ui-helper-clearfix",
			/* css class applied on single progressbar */
			"progressBarUploadClass": "ui-igupload-progressbar-upload ui-igupload-progressbar-upload-single ui-helper-clearfix",
			/* css classes applied to file name DOM element in the summary progress bar */
			"progressBarFileNameClass": "ui-igupload-progressbar-filename",
			/* css classes applied to file size DOM element in the summary progress bar */
			"progressBarFileSizeClass": "ui-igupload-progressbar-filesize",
			/* css classes of the container of the filename DOM element and file size DOM element inside each of the progressbar */
			"progressBarInnerHTMLContainerClass": "ui-igupload-progressbar-container ui-helper-clearfix",
			/* css classes for container of the cancel/done button near the progress bar */
			"containerButtonCancelClass": "ui-container-button-cancel-class  ui-helper-clearfix",
			/* css classes applied to summary progressbar */
			"summaryProgressBarClass": "ui-igupload-summaryprogressbar",
			/* css classes applied to container of summary progress bar */
			"summaryProgressContainerClass": "ui-igupload-summaryprogresscontainer",
			/* css classes of label of the summary progress bar */
			"summaryProgressbarLabelClass": "ui-igupload-summaryprogress-label",
			/* css classes of container in summary progress area - contains label for summary progress and show/hide details button */
			"summaryInformationContainerClass": "ui-igupload-summaryinformation-container ui-helper-clearfix",
			/* css classes applied to DOM element showing status of summary progress */
			"summaryUploadedFilesLabelClass": "ui-igupload-summaryuploadedfiles-label",
			/* css classes of show/hide details button in summary progress area */
			"summaryShowHideDetailsButtonClass": "ui-igupload-showhidedetails-button",
			/* css classes which are set to the cancel button */
			"summaryButtonClass": "ui-igupload-summary-button",
			/* css classes set inside progress div */
			"summaryProgressBarInnerProgress": "ui-igupload-summaryprogres_summpbar_progress",
			/* css class for the second label in summary progress bar */
			"summaryProgressBarSecondaryLabel": "ui-igupload-summaryprogress-label ui-igupload-summaryprogress-secondary-label",
			/* Css class for container of each individual file - including progress bar, file info, cancel button, etc. */
			"containerFUS": "ui-widget-content ui-igupload-progress-container ui-corner-all ui-helper-clearfix"
			/*jscs:enable*/
		},
		options: {
			/* type="number|string|null" Get or set width of the main container of the file upload control. Main container contains all buttons, progressbar, etc.
			```
				//Initialize
				$(".selector").igUpload({
					width : 500
				});

				//Get
				var width = $(".selector").igUpload("option", "width");

				//Set
				$(".selector").igUpload("option", "width", 500);
			```
			*/
			width: "",
			/* type="number|string|null" Get or set height of the main container of the file upload control. Main container contains all buttons, progressbar, etc.
			```
				//Initialize
				$(".selector").igUpload({
					height : 300
				});

				//Get
				var height = $(".selector").igUpload("option", "height");

				//Set
				$(".selector").igUpload("option", "height", 300);
			```
			*/
			height: "",
			/* type="bool" Get or set whether the file start upload automatically when it is selected. Default is false.
			```
				//Initialize
				$(".selector").igUpload({
					autostartupload : true
				});

				//Get
				var autoStart = $(".selector").igUpload("option", "autostartupload");

				//Set
				$(".selector").igUpload("option", "autostartupload", true);
			```
			*/
			autostartupload: false,
			/* type="string" Get or set URL for uploading.
			```
				//Initialize
				$(".selector").igUpload({
					uploadUrl: "ig_fua34sf345sdf13sdf3454erdsf2345asd3425df5235d54df345.aspx",
				});

				//Get
				var fileExt = $(".selector").igUpload("option", "uploadUrl");

				//Set
				$(".selector").igUpload("option", "uploadUrl", "ig_fua34sf345sdf13sdf3454erdsf2345asd3425df5235d54df345.aspx");
			```
			*/
			uploadUrl: "ig_fua34sf345sdf13sdf3454erdsf2345asd3425df5235d54df345.aspx",
			/* type="string" Get or set URL of HTTPHandler to get information about file upload, current size and also to get commands
			```
				//Initialize
				$(".selector").igUpload({
					progressUrl : "IGUploadStatusHandler.ashx"
				});

				//Get
				var progressUrl = $(".selector").igUpload("option", "progressUrl");

				//Set
				$(".selector").igUpload("option", "progressUrl", "IGUploadStatusHandler.ashx");
			```
			*/
			progressUrl: "IGUploadStatusHandler.ashx",
			/* type="array" Get or set file allowed file extensions. When this array is empty - it is not made such validation. Example ["gif", "jpg", "bmp"].
			```
				//Initialize
				$(".selector").igUpload({
					allowedExtensions : ["xls","doc"]
				});

				//Get
				var extensions = $(".selector").igUpload("option", "allowedExtensions");

				//Set
				$(".selector").igUpload("option", "allowedExtensions", ["xls","doc"]);
			```
			*/
			allowedExtensions: [],
			/* type="bool" Get or set whether to show File Extension icon
			```
				//Initialize
				$(".selector").igUpload({
					showFileExtensionIcon : false
				});

				//Get
				var showIcon = $(".selector").igUpload("option", "showFileExtensionIcon");

				//Set
				$(".selector").igUpload("option", "showFileExtensionIcon", false);
			```
			*/
			showFileExtensionIcon: true,
			/* Get or set control specific CSS options. For example you can override specific control classes with custom ones.
			```
				//Initialize
				$(".selector").igUpload({
					css: {
						"uploadProgressClass": "customClass"
					}
				});

				//Get
				var css = $(".selector").igUpload("option", "css");

				//Set
				$(".selector").igUpload("option", "css", { "uploadProgressClass": "customClass" });

				<style type="text/css">
					.customHiddenClass { visibility: hidden; }
				</style>
			```
			*/
			css: null,
			/* M.H. 27 Jul 2011 - fix bug 77162 */
			/* Set icon css classes for specified file extension
			```
				//Initialize
				$(".selector").igUpload({
					fileExtensionIcons: [
						{
							ext: ["gif", "jpg", "jpeg", "png", "bmp", "yuv", "tif", "thm", "psd"],
							css: "image-class",
							def: true
						},
						{
							ext: ["mp3", "wav", "mp4", "aac", "mid", "wma", "ra", "iff", "aif", "m3u", "mpa"],
							css: "audio-class",
							def: false
						}
					]
				});

				//Get
				var fileExtIcons = $(".selector").igUpload("option", "fileExtensionIcons");

				//Set
				var fileExtIcons = [
					{
						ext: ["gif", "jpg", "jpeg", "png", "bmp", "yuv", "tif", "thm", "psd"],
						css: "image-class",
						def: true
					},
					{
						ext: ["mp3", "wav", "mp4", "aac", "mid", "wma", "ra", "iff", "aif", "m3u", "mpa"],
						css: "audio-class",
						def: false
					}
				];
				$(".selector").igUpload("option", "fileExtensionIcons", "fileExtIcons");
			```
			*/
			fileExtensionIcons: [
				/* good practice is to set at the beginning of array default classes */
				{
					/* type="array" Array of string for file extensions */
					ext: [],
					/* type="string" Css classes which sets icon. */
					css: "",
					/* type="bool" Default icons when the file extension is not found. It is taken only the first item which have def set to true, other are ignored. */
					def: false
				}
			],
			/* type="single|multiple" Get or set multiple or single file upload. In single upload it is possible to upload only one file at the same time.
			```
				//Initialize
				$(".selector").igUpload({
					mode : "multiple"
				});

				//Get
				var mode = $(".selector").igUpload("option", "mode");

				//Set
				$(".selector").igUpload("option", "mode", "multiple");
			```
			*/
			mode: "single",
			/* type="bool" Get or set a bool setting that allows user to select(for upload) more than 1 file from the browse dialog at once. HTML 5+ - it is supported by Chrome, MOzilla FF, Safar, Opera latest versions and IE10+
			```
				//Initialize
				$(".selector").igUpload({
					multipleFiles : true
				});

				//Get
				var multipleFiles = $(".selector").igUpload("option", "multipleFiles");
			```
			*/
			multipleFiles: false,
			/* type="number" Get or set the maximum number of allowed files to upload.
			```
				//Initialize
				$(".selector").igUpload({
					maxUploadedFiles : 10
				});

				//Get
				var maxUploads = $(".selector").igUpload("option", "maxUploadedFiles");

				//Set
				$(".selector").igUpload("option", "maxUploadedFiles", 10);
			```
			*/
			maxUploadedFiles: -1,
			/* type="number" Get or set count of files that could be uploaded at the same time.
			```
				//Initialize
				$(".selector").igUpload({
					maxSimultaneousFilesUploads : 5
				});

				//Get
				var maxUploads = $(".selector").igUpload("option", "maxSimultaneousFilesUploads");

				//Set
				$(".selector").igUpload("option", "maxSimultaneousFilesUploads", 5);
			```
			*/
			maxSimultaneousFilesUploads: 1, // Fix bug 77030 M.H. 27 May 2011
			/* type="bytes|kbytes|mbytes|gbytes|auto" Get or set file size metrics how to be shown files size.
			```
				//Initialize
				$(".selector").igUpload({
					fileSizeMetric : "mbytes"
				});

				//Get
				var sizeMetric = $(".selector").igUpload("option", "fileSizeMetric");

				//Set
				$(".selector").igUpload("option", "fileSizeMetric", "mbytes");
			```
			*/
			fileSizeMetric: "auto",
			/* multiUploadView: $.ig.Constants.Upload.MultipleViewLayout.Block, */
			/* type="string" UniqueId of the control - should not be changed by developer. Set from server-side wrapper.
			```
				//Initialize
				$(".selector").igUpload({
					controlId: "serverID1"
				});
			```
			*/
			controlId: "",
			/* type="number" The number of digits after the decimal point.
			```
				//Initialize
				$(".selector").igUpload({
					fileSizeDecimalDisplay : 4
				});

				//Get
				var decimalDisplay = $(".selector").igUpload("option", "fileSizeDecimalDisplay");

				//Set
				$(".selector").igUpload("option", "fileSizeDecimalDisplay", 4);
			```
			*/
			fileSizeDecimalDisplay: 2,
			/* type="int" Maximum size(in bytes) allowed for the file to be uploaded. If it is set to null or -1 there is no limitation otherwise if the size(of the selected file) exceeds this value it is not allowed to be uploaded. This option is used for validation only on client side and only if the browser supports HTML5 file API and share information about the file size */
			maxFileSize: null
		},
		events: {
			/* cancel="true" Defines the name of the file upload selecting event. Fired when browse button is pressed.
			Return false in order to cancel selecting file.
			eventArgument="evt" argType="event" jQuery event object.
			eventArgument="ui.owner" argType="object" Gets the igUpload widget object.
			```
				//Bind after initialization
				$(document).delegate(".selector", "iguploadfileselecting", function (evt, ui) {
					//return the triggered event
					evt;

					// the 'ui' object is empty, when 'fileSelecting' event is fired
					ui;
				});

				//Initialize
				$(".selector").igUpload({
					fileSelecting : function(evt, ui) {...}
				});
			```
			*/
			fileSelecting: "fileSelecting",
			/* Defines the name of the file upload selected event. Fired when file is selected from browse dialog.
			Return false in order to cancel uploading file.
			eventArgument="evt" argType="event" jQuery event object.
			eventArgument="ui.fileId" argType="number" Gets the unique identifier of the file.
			eventArgument="ui.filePath" argType="string" Gets the name of the uploaded file.
			eventArgument="ui.owner" argType="object" Gets the igUpload widget object.
			```
				//Bind after initialization
				$(document).delegate(".selector", "iguploadfileselected", function (evt, ui) {
					//return the triggered event
					evt;

					// A consecutive number for every file starting from 0. This useful for multiple upload scenarios, where you can use the ID to identify the different files.
					ui.fileID;

					// Name of the selected file
					ui.filePath;
				});

				//Initialize
				$(".selector").igUpload({
					fileSelected : function(evt, ui) {...}
				});
			```
			*/
			fileSelected: "fileSelected",
			/* cancel="true" Defines the name of the file uploading event. Fired every time when fileuploader get status for the upload.
			Return false in order to cancel uploading file.
			eventArgument="evt" argType="event" jQuery event object.
			eventArgument="ui.fileId" argType="number" Gets the unique identifier of the file.
			eventArgument="ui.filePath" argType="string" Gets the name of the uploaded file.
			eventArgument="ui.totalSize" argType="number" Gets the file size of the uploaded file.
			eventArgument="ui.uploadedBytes" argType="number" Gets the uploaded bytes.
			eventArgument="ui.fileStatus" argType="number" Gets the current file status.
			eventArgument="ui.fileInfo" argType="object" Gets reference to the fileInfo object - containing information for  fileName, fileSize, serverMessage(if returned from server side), etc.
			eventArgument="ui.owner" argType="object" Gets the igUpload widget object.
			```
				//Bind after initialization
				$(document).delegate(".selector", "iguploadfileuploading", function (evt, ui) {
					//return the triggered event
					evt;

					// A consecutive number for every file starting from 0. This useful for multiple upload scenarios, where you can use the ID to identify the different files.
					ui.fileID;

					// Name of the selected file
					ui.filePath;

					// Integer representing the status of the file. The value is determined by the server, where an enumeration that maps the integer value with the description of the status.
					ui.fileStatus;

					// Returns the file size sum of all selected files to upload. The metric is bytes.
					ui.totalSize;

					// Returns current amount of uploaded bytes when the fileUpload event is fired.
					ui.uploadedBytes;

					//Returns an object, which contains information for the file(file.name, file.size, file.type etc.) and the current status of the upload(uploadedBytes, status, serverMessage etc.).
					ui.fileInfo
				});

				//Initialize
				$(".selector").igUpload({
					fileUploading : function(evt, ui) {...}
				});
			```
			*/
			fileUploading: "fileUploading",
			/* Defines the name of the uploaded event. Fired when the file is uploaded
			eventArgument="evt" argType="event" jQuery event object.
			eventArgument="ui.fileId" argType="number" Gets the unique identifier of the file.
			eventArgument="ui.filePath" argType="string" Gets the name of the uploaded file.
			eventArgument="ui.totalSize" argType="number" Gets the file size of the uploaded file.
			eventArgument="ui.fileInfo" argType="object" Gets reference to the fileInfo object - containing information for  fileName, fileSize, serverMessage(if returned from server side), etc.
			eventArgument="ui.owner" argType="object" Gets the igUpload widget object.
			```
				//Bind after initialization
				$(document).delegate(".selector", "iguploadfileuploaded", function (evt, ui) {
					//return the triggered event
					evt;

					// A consecutive number for every file starting from 0. This useful for multiple upload scenarios, where you can use the ID to identify the different files.
					ui.fileID;

					// Name of the selected file
					ui.filePath;

					// Returns the file size sum of all selected files to upload. The metric is bytes.
					ui.totalSize;

					//Returns an object, which contains information for the file(file.name, file.size, file.type etc.) and the current status of the upload(uploadedBytes, status, serverMessage etc.).
					ui.fileInfo
				});

				//Initialize
				$(".selector").igUpload({
					fileUploaded : function(evt, ui) {...}
				});
			```
			*/
			fileUploaded: "fileUploaded",
			/* Defines the name of the file upload cancel event. Fired when the server responses that the file is canceled.
			eventArgument="evt" argType="event" jQuery event object.
			eventArgument="ui.fileId" argType="number" Gets the unique identifier of the file.
			eventArgument="ui.filePath" argType="string" Gets the name of the uploaded file.
			eventArgument="ui.totalSize" argType="number" Gets the file size of the uploaded file.
			eventArgument="ui.uploadedBytes" argType="number" Gets the uploaded bytes.
			eventArgument="ui.fileStatus" argType="number" Gets the current file status.
			eventArgument="ui.owner" argType="object" Gets the igUpload widget object.
			```
				//Bind after initialization
				$(document).delegate(".selector", "iguploadfileuploadaborted", function (evt, ui) {
					//return the triggered event
					evt;

					// A consecutive number for every file starting from 0. This useful for multiple upload scenarios, where you can use the ID to identify the different files.
					ui.fileID;

					// Name of the selected file
					ui.filePath;

					// Integer representing the status of the file. The value is determined by the server, where an enumeration that maps the integer value with the description of the status.
					ui.fileStatus;

					// Returns the file size sum of all selected files to upload. The metric is bytes.
					ui.totalSize;

					// Returns current amount of uploaded bytes when the fileUpload event is fired.
					ui.uploadedBytes;
				});

			//Initialize
			$(".selector").igUpload({
				fileUploadAborted : function(evt, ui) {...}
		});
			```
			*/
			fileUploadAborted: "fileUploadAborted",
			/* Defines the name of the cancel all button event click. Fired when cancel all button in summary is clicked. Fired only in multiple upload mode.
			eventArgument="evt" argType="event" jQuery event object.
			eventArgument="ui.owner" argType="object" Gets the igUpload widget object.
			```
				//Bind after initialization
				$(document).delegate(".selector", "iguploadcancelallclicked", function (evt, ui) {
					//return the triggered event
					evt;

					// the 'ui' object is empty, when 'cancelAllClicked' event is fired
					ui;
				});

				//Initialize
				$(".selector").igUpload({
					cancelAllClicked : function(evt, ui) {...}
				});
			```
			*/
			cancelAllClicked: "cancelAllClicked",
			/* Defines the name of the file upload error event. Fired when error is occurred.
			eventArgument="evt" argType="event" jQuery event object.
			eventArgument="ui.errorCode" argType="number" Gets the current errorCode.
			eventArgument="ui.fileId" argType="number" Gets the identifier of the file for which the event is fired(after that it can be used API function getFileInfo). NOTE: It is possible to be null in some cases: try to drop multiple files when mode is single , check maximum allowed uploading files fails or check for count of maximum allowed simultaneous files upload fails.
			eventArgument="ui.errorMessage" argType="string" Gets the detailed error description.
			eventArgument="ui.errorType" argType="string" Gets the error type - it could be clientside or serverside.
			eventArgument="ui.serverMessage" argType="string" Gets the specific server message returned by server - if errorType is serverside.
			eventArgument="ui.owner" argType="object" Gets the igUpload widget object.
			```
				//Bind after initialization
				$(document).delegate(".selector", "iguploadonerror", function (evt, ui) {
					//return the triggered event
					evt;

					// Integer that represents the error code.
					ui.errorCode;

					// Detailed error information.
					ui.errorMessage;

					// Type of error - the values can be either server-side or client-side.
					ui.errorType;

					// This is property is able to be set during the server event UploadStarting. If not set it’s an empty string. (You can use it to display custom error messages.)
					ui.serverMessage;
				});

				//Initialize
				$(".selector").igUpload({
					onError : function(evt, ui) {...}
				});
			```
			*/
			onError: "onError",
			/* cancel="true" It is fired when validating file extensions
			eventArgument="evt" argType="event" jQuery event object.
			eventArgument="ui.fileName" argType="string" Gets the full file name.
			eventArgument="ui.fileExtension" argType="string" Gets the file extension.
			eventArgument="ui.owner" argType="object" Gets the the igUpload widget object.
			```
				//Bind after initialization
				$(document).delegate(".selector", "iguploadfileextensionsvalidating", function (evt, ui) {
					//returns full file name
					ui.fileName;

					//returns file extension
					ui.fileExtension;

					//returns igUpload widget object
					ui.owner;
				});

				//Initialize
				$(".selector").igUpload({
					fileExtensionsValidating : function(evt, ui) {...}
				});
			```
			*/
			fileExtensionsValidating: "fileExtensionsValidating",
			/* It is fired when event onload(of XmlHttpRequest) is fired. This event will be fired only if the browser supports HTML5 file API
			eventArgument="evt" argType="event" jQuery event object.
			eventArgument="ui.fileId" argType="number" Gets the unique identifier of the file.
			eventArgument="ui.xhr" argType="object" Gets reference to the original XMLHttpRequest object.
			eventArgument="ui.fileInfo" argType="object" Gets reference to the fileInfo object - containing information for  fileName, fileSize, serverMessage(if returned from the server-side), etc.
			eventArgument="ui.owner" argType="object" Gets the igUpload widget object.
			```
				//Bind after initialization
				$(document).delegate(".selector", "iguploadoonxhrload", function (evt, ui) {
					//return the triggered event
					evt;

					//Returns the igUpload widget object.
					ui.owner

					// String that represents the unique identifier of the file.
					ui.fileId;

					// Returns an object, which contains information for the file(file.name, file.size, file.type etc.) and the current status of the upload(uploadedBytes, status, serverMessage etc.).
					ui.fileInfo;

					// Returns the original XMLHttpRequest object(if the browser supports HTML 5, otherwise this will return undefined).
					ui.xhr;
				});

				//Initialize
				$(".selector").igUpload({
					onXHRLoad : function(evt, ui) {...}
				});
			```
			*/
			onXHRLoad: "onXHRLoad",
			/* It is fired before submitting to the server the uploading file(and its additional data if any). It could be used to append additional data fields to the FormData object(if the browser supports HTML5 file API - like newest Chrome, Firefox, IE11+). If the browser does not support HTML5 file API(IE10 and older) it could be added these data fields(as hidden input fields) to the form. Use the public API function addDataFields.
			eventArgument="evt" argType="event" jQuery event object.
			eventArgument="ui.fileId" argType="number" Gets the unique identifier of the file.
			eventArgument="ui.fileInfo" argType="object" Gets reference to the fileInfo object - containing information for  fileName, fileSize, serverMessage(if returned from the server-side), etc.
			eventArgument="ui.xhr" argType="object" Gets reference to the original XMLHttpRequest object(if the browser supports HTML 5 file API - if not it is undefined).
			eventArgument="ui.formData" argType="object" Gets reference to FormData object(if the browser supports HTML5 file API) OR reference to jQuery representation of <form>.
			eventArgument="ui.owner" argType="object" Gets the igUpload widget object.
			```
				//Bind after initialization
				$(document).delegate(".selector", "iguploadonformdatasubmit", function (evt, ui) {
					//return the triggered event
					evt;

					//Returns the igUpload widget object.
					ui.owner

					// String that represents the unique identifier of the file.
					ui.fileId;

					// Returns an object, which contains information for the file(file.name, file.size, file.type etc.) and the current status of the upload(uploadedBytes, status, serverMessage etc.).
					ui.fileInfo;

					// Returns the original XMLHttpRequest object(if the browser supports HTML 5, otherwise this will return undefined).
					ui.xhr;

					// Returns the FormData object(if the browser supports HTML5) or a reference to the jQuery representation of <form>.
					ui.formData;
				});

				//Initialize
				$(".selector").igUpload({
					onFormDataSubmit : function(evt, ui) {...}
				});
			```
			*/
			onFormDataSubmit: "onFormDataSubmit"
		},
		summaryButtonModes: {
			cancel: 1,
			startupload: 2,
			done: 3
		},
		container: function () {
			// M.H. 25 Jul 2011 - fix bug 78056: add description about this function
			/*
			Return jquery object of fileupload container - html DOM element
			```
				$(".selector").igUpload("container");
			```
			*/
			/* M.H. 7 Feb 2014 Fix for bug #163735: WebIDE requires the outer element of igUpload to be with the same ID as the element(on which control is initialized) ID */
			if (this._isDivElement) {
				return this.element;
			}
			return $("#" + this.element[ 0 ].id + "_wrprinit");
		},
		widget: function () {
			/*
			Returns the current widget element
			```
				var upload = $(".selector").igUpload("widget");
			```
			*/
			return this.element;
		},
		_id: function (suffix, formNumber) {
			var id = this.element[ 0 ].id;

			if (formNumber !== undefined) {
				return id + "_" + formNumber + "_" + suffix;
			}
			return id + suffix;
		},
		_create: function () {
			/* create file upload element */
			var data = {
					formNumber: 0, //current form number - we use it to generate form ids
					iframe: { ids: [] },
					pendingQueueIDs: [], // maxSimultaneousFilesUploads feature - keep IDs
					uploadingIDs: [], // maxSimultaneousFilesUploads feature
					batch: [], // maxSimultaneousFilesUploads feature
					lastId: -1,

					//////////////////////////////////////////////////////////////
					filesInfo: [],// Format fileInfo: {path:"", key: "", sizeBytes: "", uploadedBytes: "", status: self._const.status.NotStarted, checksNoSuchFile: 0}
					countUploadingFiles: 0,
					countTotalFiles: 0,
					fileSizeUploaded: 0,
					fileSizeTotal: 0
			};
			this.css = $.extend({}, this.css, this.options.css);
			this.allCancelled = false;
			this.fileInfoData = data;
			this._renderStartupBrowseButton();
			this.container()
				.bind("drop", $.proxy(this._dropFiles, this))
				.width(this.options.width)
				.height(this.options.height);
			this._attachFakeIframe();
			/* M.H. 27 Jul 2011 - fix bug 77162 - analyze file extension icons array */
			this._analyzeFileExtensionIcons();
			/* M.H. 12 Dec 2012 Fix for bug #129351 */
			$(document).bind("dragenter." + this.element[ 0 ].id, $.proxy(this._docEnter, this));
			$(document).bind("dragover." + this.element[ 0 ].id, $.proxy(this._docOver, this));
			$(document).bind("dragleave." + this.element[ 0 ].id, $.proxy(this._docLeave, this));
		},
		_dropFiles: function (e) {
			var isInit = $("#" + this._id("_ibb")).is(":visible"),
				data = { files: e.originalEvent.dataTransfer.files, multiple: true };

			e.preventDefault();
			if (isInit) {
				this._initBrowserFileSelect(e, data);
			} else {
				this._onBrowseButtonFileSelected(e, false, data);
			}
			return false;
		},
		_docEnter: function (e) {
			e.preventDefault();
			return false;
		},
		_docOver: function (e) {
			e.preventDefault();
			return false;
		},
		_docLeave: function (e) {
			e.preventDefault();
			return false;
		},
		/* M.H. 27 Jul 2011 - fix bug 77162 */
		_analyzeFileExtensionIcons: function () {
			/*  analyze file extension icons array
				check extensions as each object in array has different and unique values for ext array
				This method is created because jQuery widget factory extends default array */
			var i, j,
				arrIconExtensions = this.options.fileExtensionIcons,
				lengthIconExtensions,
				defIconExtensions = $.extend(true, [], this.defaultFileExtensionIcons),
				lengthDefaultIconExtensions = defIconExtensions.length,
				resArr = [], isDefaultDefined = false;

			if (arrIconExtensions === undefined || arrIconExtensions === null) {
				/* M.H. 1 Aug 2011 - fix bug 83355 */
				this.options.fileExtensionIcons = defIconExtensions;
				return;
			}

			lengthIconExtensions = arrIconExtensions.length;
			if (lengthIconExtensions === 1 && arrIconExtensions[ 0 ].css === "") {
				this.options.fileExtensionIcons = defIconExtensions;
				return;
			}

			for (j = 0; j < lengthIconExtensions; j++) {
				for (i = 0; i < lengthDefaultIconExtensions; i++) {
					defIconExtensions[ i ].ext = this._removeCommonElementsInArrays(defIconExtensions[ i ].ext,
																					arrIconExtensions[ j ].ext);
				}
				/* M.H. 8 Nov. 2011 Fix for bug #77162 */
				if (arrIconExtensions[ j ].def === true) {
					isDefaultDefined = true;
				}

				resArr.push(arrIconExtensions[ j ]);
			}

			for (i = 0; i < lengthDefaultIconExtensions; i++) {
				/* M.H. 8 Nov. 2011 Fix for bug #77162 */
				if (defIconExtensions[ i ].ext.length > 0 ||
						(isDefaultDefined === false && defIconExtensions[ i ].def === true)) {
					resArr.push(defIconExtensions[ i ]);
				}
			}

			this.options.fileExtensionIcons = resArr;
		},
		_removeCommonElementsInArrays: function (arr1, arr2) {
			/* remove from arr1 all common elements with arr2 */
			return $.grep(arr1, function (n) {
				return $.inArray(n, arr2) === -1;
			});
		},
		_attachFakeIframe: function () {
			var idTempIframe = this._id("_tempIframe");

			/* fix bug with status toolbar in IE as adding blank iframe */
			if ($.ig.util.isIE7 || $.ig.util.isIE8 || $.ig.util.isIEQuircks) {
				$("#" + idTempIframe).remove();
				setTimeout($('<iframe src="javascript:false;" ' +
								'id="' + idTempIframe + '" ' +
								'style="display: none;"></iframe>').appendTo($("#" + this._id("_fu"))), 300);
			}
		},
		_renderStartupBrowseButton: function () {
			/* render the button at the startup */
			var self = this, attr, i,
				css = self.css,
				e = self.element,
				o = self.options,
				bbId = this._id("_ibb"),
				isMultipleFiles = (o.mode === "multiple" && o.multipleFiles),
				wrapperElementId = this._id("_wrprinit"),
				containerDiv,
				/* divElement = e,*/
				button;

			/* M.H. 7 Feb 2014 Fix for bug #163735: WebIDE requires the outer element of igUpload to be with the same ID as the element(on which control is initialized) ID */
			if (this.element.is("div")) {
				this._isDivElement = true;
				this.originalElement = e;
				containerDiv = e;
				this._initialAttributes = [];
				attr = this.element[ 0 ].attributes;
				for (i = 0; i < attr.length; i++) {
					if (attr[ i ].name !== "id") {
						this._initialAttributes.push({ name: attr[ i ].name, value: attr[ i ].value });
					}
				}
				this._initialHTML = this.element.html();
				this.element.empty();
			} else {
				this.originalElement = e;
				/* M.H. 10 May 2011 - fix bug 75039: remove unnecessary comment and unnecessary spacing */
				/* K.D. May 18, 2011 Bug #75049 The ID of the elements concatenates twice as this._id is called above in the definition of the variables */
				containerDiv = '<div id="' + wrapperElementId + '" class="ig-upload-container"></div>';
				e.wrap(containerDiv);
				e.hide();
				e  = $("#" + wrapperElementId);
			}
			/* we should re-initialize the id of browse button */
			bbId = this._id("_ibb");
			/* M.H. 10 May 2011 - fix bug 75039: remove unnecessary comment and unnecessary spacing */

			if ($.ig.util.isIE7) {
				e.addClass(css.baseClassIE7);
			} else if ($.ig.util.isOpera) {
				e.addClass(css.baseClassOpera);
			} else if ($.ig.util.isOpera) {
				e.addClass(css.baseClassMoz);
			} else if ($.ig.util.isOpera) {
				/* M.H. 29 May 2011 - fix bug 80546: add check for webkit browser */
				e.addClass(css.baseClassWebkit);
			}
			button = $("<button></button>")
						.appendTo(e)
						.attr("id", bbId)
						.addClass(css.startupBrowseButtonClasses);
			button.igBrowseButton({
				multipleFiles: isMultipleFiles,
				labelText: this._getLocaleValue("labelUploadButton"),
				/* M.H. 13 Feb 2014 Fix for bug #164347: Move input type="file" from document body to the upload container */
				container: this.container(),
				/* M.H. 12 May 2011 - fix bug 74763: add title to all buttons */
				/* Fix bug #76995 M.H. 25 May 2011 */
				title: this._getLocaleValue("titleUploadFileButtonInit"),
				fileselect: function (event, data) {
					self._initBrowserFileSelect(event, data);
				},
				/* M.H. 26 Jul 2011 - fix bug 82062 - set disabled of the init browse button */
				disabled: o.disabled,
				click: function (event) {
					/* M.H. 11 May 2011 - fix bug 74553 - allow to cancel file selecting */
					var isCancelEvent = false;
					if (self._trigger(self.events.fileSelecting, event, { owner: self }) === false) {
						isCancelEvent = true;
					}

					return !isCancelEvent;
				}
			});
		},
		_initBrowserFileSelect: function (event, data) {
			/* M.H. 17 Dec 2012 Fix for bug #129469 */
			var countFiles = 1, filePicker, o = this.options;

			/*if (data && data.files && data.files.length >= 1) {
				countFiles = data.files.length;
				tmpCountFiles = countFiles;
				for (i = 0; i < countFiles; i ++) {
					if (this._validateFileExtension(data.files[ i ].name, true) === false) {
						tmpCountFiles--;
						continue;
					}
				}
				countFiles = tmpCountFiles;
			} else { */
			if (!data || !data.files || data.files.length === 0) {
				filePicker = $("#" + this._id("_ibb_fp"));
				if (this._validateFileExtension(filePicker[ 0 ].value, true, null) === false) {
					return;
				}
			} else if (o.mode === "single" && data.files.length > 1) {
				/* M.H. 7 May 2015 Fix for bug 193628: Drag and drop files doesn't work
				do not allow to drag and drop more than 1 file when mode is single */
				this._setError(this._getLocaleValue("errorMessageDropMultipleFilesWhenSingleModel"),
								null,
								this._const.clientSideErrorCode.dropMultipleFilesWhenSingleMode,
								"clientside");
				return;
			}
			/* M.H. 17 Dec 2012 Fix for bug #129469 */
			if (this._checkMaxUploadingFilesCount(countFiles, true) === true) {
				$("#" + this._id("_ibb")).css({ "display": "none" });
				this._HTMLUpload();
				this._onBrowseButtonFileSelected(event, true, data);
			}
			/* $(this).remove();//fix for IE7 because when set css to be with display none the css is not updated*/
		},
		_HTMLUpload: function () {
			/* render html at the beginning for the main container  */
			var uploaderId = this._id("_fu"),
				baseMainContainerId = this._id("_bmncntr"),
				o = this.options,
				e = this.container(),
				self = this,
				css = self.css,
				fileContainerId = this._id("_fc"),
				browseButtonId = this._id("_bb"),
				clearAllButtonId = this._id("_clrabtn"),
				uploaderContainerId = this._id("_fi_main_cntnr"),
				clearAllButton,
				html = "";

			if (o.mode === "single") {
				html += '<div  class="' + css.singleDialogClass + '" id="$baseMainContainerId">';
				html += '   <div id="$uploaderId$" class="$baseMainContainerClass">';
				html += '		<div id="$fileContainerId$"></div>';
				html += '		<button id="$browseButtonId$" class="$browseButtonClass$"></button>';
				html += "	</div>";
				html += "</div>";
			} else if (o.mode === "multiple") {
				html =  '<div class="' + css.multipleDialogClasses + '" id="$baseMainContainerId">';
				html +=  '   <div  id="$uploaderId$" class="$baseMainContainerClass">';
				html += '		<div id="$uploaderFilesContainer" class="$fuMainContainerClass">';
				html += '			<button id="$browseButtonId$" class="$browseButtonClass$"></button>';
				html += '			<button id="$clearAllButtonId$"></button>';
				html += '			<div id="$fileContainerId$"></div>';
				html += "		</div>";
				html += "   </div>";
				html += "</div>";
			}
			html = html
					.replace("$uploaderId$", uploaderId)
					.replace("$browseButtonId$", browseButtonId)
					.replace("$baseMainContainerId", baseMainContainerId)
					.replace("$browseButtonClass$", css.browseButtonClass)
					.replace("$fileContainerId$", fileContainerId)
					.replace("$clearAllButtonId$", clearAllButtonId)
					.replace("$uploaderFilesContainer", uploaderContainerId)
					.replace("$fuMainContainerClass", css.fileInfoMainContainer)
					.replace("$baseMainContainerClass", css.baseMainContainerClass);

			$(html).appendTo(e).css({ width: o.width, height: o.height }).addClass(css.baseClass);
			/* Fix bug 77116 M.H. remove draggable feature */
			/* Draggable feature
			$("#" + baseMainContainerId).draggable({ cancel: "#" + uploaderContainerId}); */
			/* End of draggable feature */
			clearAllButton = $("#" + clearAllButtonId);
			if (clearAllButton.length > 0) {
				clearAllButton.igButton({
					/* M.H. 12 May 2011 - fix bug 74763: add title to all buttons */
					title: this._getLocaleValue("titleClearAllButton"),
					labelText: this._getLocaleValue("labelClearAllButton"),
					disabled: true,
					click: function (event) {
						event.preventDefault();
						self.clearAll();
					},
					css: {
						"buttonClasses": "ui-igbutton ui-igupload-button-clear-all",
						"buttonHoverClasses": "",
						"buttonActiveClasses": "", // when button is clicked
						"buttonFocusClasses": "", // when button get focus
						"buttonLabelClass": ""
					}
				});
			}

			$("#" + browseButtonId).igBrowseButton({
				multipleFiles: (o.mode === "multiple" && o.multipleFiles),
				labelText: this._getLocaleValue("labelAddButton"),
				/* M.H. 13 Feb 2014 Fix for bug #164347: Move input type="file" from document body to the upload container */
				container: this.container(),
				/* M.H. 12 May 2011 - fix bug 74763: add title to all buttons */
				title: this._getLocaleValue("titleAddFileButton"),
				/*icons: {primary: "ui-icon-plusthick"}*/
				fileselect: function (event, data) {
					self._onBrowseButtonFileSelected(event, false, data);
				},
				click: function (event) {
					/* M.H. 11 May 2011 - fix bug 74553 - allow to cancel file selecting */
					var isCancelEvent = false;

					if (self._trigger(self.events.fileSelecting, event, { owner: self }) === false) {
						isCancelEvent = true;
					}
					return !isCancelEvent;
				}
			});
			$("#" + fileContainerId).addClass(css.containerClass);
			if (o.mode === "multiple") {
				self._spbRenderInit();
			}
		},
		_disableBrowseButton: function (isToDisable) {
			$("#" + this._id("_bb")).igBrowseButton("option", "disabled", isToDisable);
			$("#" + this._id("_ibb")).igBrowseButton("option", "disabled", isToDisable);
		},
		_checkMaxUploadingFilesCount: function (count, callEvent) {
			if (count === null || count === undefined) {
				count = 1;
			}
			var o = this.options,
				allowUpload = true,
				totalFiles = this.fileInfoData.countTotalFiles + count;
			/*totalFiles= (beforeUpload === true)? totalFiles + 1: totalFiles;*/
			if (o.maxUploadedFiles !== this._const.maxUploadFilesDefault &&
				 o.maxUploadedFiles !== null && totalFiles > o.maxUploadedFiles) {
				allowUpload = false;
				/* M.H. 17 Dec 2012 Fix for bug #129469 */
				if (callEvent === true) {
					this._setError(this._getLocaleValue("errorMessageMaxUploadedFiles"),
						null,
						this._const.clientSideErrorCode.maxAllowedUploadingFiles, "clientside");
				}
			}

			return allowUpload;
		},
		_onBrowseButtonFileSelected: function (event, isInitBrowseButton, data) {
			/** Event handler when file is selected
			* event - event object of click
			* isInitBrowseButton - bool parameter indicates whether the method is called by browsebutton in main container or at the startup */
			var self = this, allFilesData = this.fileInfoData,
				o = self.options, fileData,
				countFiles = 1;

			if (data && data.files && data.files.length >= 1) {
				countFiles = data.files.length;
				/* if drag and drop more than 1 file trigger onError event when mode is single */
				if (o.mode === "single") {
					if (countFiles > 1) {
						/* || allFilesData.uploadingIDs.length > 1) */
						self._setError(this._getLocaleValue("errorMessageDropMultipleFilesWhenSingleModel"),
										null,
										self._const.clientSideErrorCode.dropMultipleFilesWhenSingleMode,
										"clientside");
						return;
					}
				}
			}
			/* check maximum allowed uploading files */
			if (self._checkMaxUploadingFilesCount(countFiles, true) === false) {
				/* M.H. 17 Dec 2012 Fix for bug #129478 */
				if (data.multiple === true) {
					return;
				}
				self._disableBrowseButton(true);
				return;
			}
			if (o.maxUploadedFiles !== null && o.maxUploadedFiles !== this._const.maxUploadFilesDefault &&
				 o.maxUploadedFiles === (allFilesData.countTotalFiles + countFiles)) {
				self._disableBrowseButton(true);
			}
			if (o.mode === "single") {
				/* check if previous file(if exists) is uploaded */
				if (allFilesData.iframe.ids.length === 0) {
					self._removeSingleUpload(allFilesData.lastId);
					/* when trying to drag and drop single file and mode is single(it is taken data) */
					fileData = allFilesData.files || data;
					if (self._attachIframe(event, isInitBrowseButton, fileData) === true) {
						self._disableBrowseButton(true);
					}
				}
			} else if (o.mode === "multiple") {
				/* attach Iframe */
				/* M.H. 2 June 2011 - fix bug 77157 */
				if (self._attachIframe(event, isInitBrowseButton, data) === false) {
					self._disableBrowseButton(false); // enable browse button if could not attach iframe - e.g. validation is not correct
				}
			}
		},
		clearAll: function () {
			/*
			Hide finished files
			```
				$(".selector").igUpload("clearAll");
			```
			*/
			var e = this.container(), arr = e.data("finishedIDs"), id, l;

			if (arr === undefined) {
				return;
			}
			l = arr.length;
			for (id = 0; id < l; id++) {
				this._removeSingleUpload(arr[ id ]);
			}

			arr = [];
			e.data("finishedIDs", arr);
			this._disableClearAllButton();
		},
		_enableClearAllButton: function () {
			$("#" + this._id("_clrabtn")).igButton({ disabled: false });
		},
		_disableClearAllButton: function () {
			$("#" + this._id("_clrabtn")).igButton("option", "disabled", true);
		},
		_attachIframe: function (event, isInitBrowseButton, data) {
			var res, files, filePicker,
				browse = $("#" + this._id("_bb"));

			if (data && data.files) {
				files = data.files;
			}
			if (isInitBrowseButton === true) {
				filePicker = $("#" + this._id("_ibb")).igBrowseButton("getFilePicker");
			} else {
				filePicker = browse.igBrowseButton("getFilePicker");
			}
			if (filePicker[ 0 ].files && (files === null || files === undefined)) {
				files = filePicker[ 0 ].files;
			}
			if (files && files.length >= 1) {
				res = this._uploadMultiple(files);
				filePicker.remove();
			} else {
				res = this._createForm(filePicker);
			}
			return res;
		},
		_uploadMultiple: function (files) {
			var	res, i,
				filesLength = files.length,
				data = this.fileInfoData,
				fileId = data.formNumber;

			for (i = 0; i < filesLength; i++) {
				res = this._html5createForm(files[ i ], i, fileId);
			}
			return res;
		},
		_html5upload: function (fileId) {
			var xhr = new XMLHttpRequest(),
				formData = new FormData(),
				o = this.options,
				self = this,
				fileInfo = this.fileInfoData.filesInfo[ fileId ],
				file = fileInfo.file,
				key = fileInfo.key,
				cid = o.controlId,
				upload = xhr.upload,
				uploadUrl = o.uploadUrl + "?key=" + key + "&cid=" + cid + "&multiple=true";
				/*start_time = new Date().getTime(),
				max_file_size = 1048576 * opts.maxfilesize; */
			xhr.open("POST", uploadUrl);
			xhr.withCredentials = "true";
			self._trigger(self.events.onFormDataSubmit,
						  null,
						  { formData: formData, fileId: fileId, fileInfo: fileInfo, xhr: xhr, owner: self });
			formData.append(this._id("_frm", fileId) + "_if", file);
			upload.addEventListener("progress", function (e) {
				self._html5progress(e, fileId);
			}, false);

			upload.addEventListener("error", function () {
				/*self._removeUploadSetError(fileId, "server side error", "error", "serverside", "");*/
				self._getFileStatus(fileId, true);
			}, false);

			this.fileInfoData.filesInfo[ fileId ].xhr = xhr;
			xhr.onload = function (e) {
				var responseText, response, error, msg;
				self._trigger(self.events.onXHRLoad,
								e,
								{ fileId: fileId, xhr: xhr, fileInfo: fileInfo, owner: self });
				if (xhr.status >= 200 && xhr.status <= 299) {
					responseText = xhr.responseText;
					/* parse XML response - if <error> is set then we should get <serverMessage>(if any) - if it is NOT set in the xml response make AJAX request */
					if (responseText) {
						/* M.H. 28 Apr 2016 Fix for bug 218717: After file uploaded successfully with ajax, the client can not receive JSON response data from the server. */
						response = self._stringToXmlObject(responseText);
						if (response) {
							error = parseInt(response.find("error").text(), 10);
							msg = response.find("serverMessage").text();
						} else {
							response = self._stringToJSONObject(responseText);
							if (response) {
								error = parseInt(response.error, 10);
								msg = response.serverMessage;
							}
						}
						fileInfo.serverMessage = msg;
						if (!isNaN(error)) {
							if (msg) {
								self._setFileStatus(fileId, true, { error: error, serverMessage: msg });
							} else {
								self._getFileStatus(fileId, true);
							}
							return;
						}
						self._html5progress(e, fileId, true);
					} else {
						self._html5progress(e, fileId, true);
					}
				} else {
					self._getFileStatus(fileId, true);
				}
			};
			xhr.send(formData);
		},
		_html5progress: function (e, formNumber, isFinish) {
			var self = this, singleFileData, data = {};

			if (e.lengthComputable || isFinish) {
				singleFileData = this.getFileInfo(formNumber);
				/* M.H. 15 May 2014 Fix for bug #170990: If file uploading was canceled on the way at client side and using Chrome, the canceled files except for the first canceled one persist to appear on the display. */
				if (singleFileData && singleFileData.innerStatus === self._const.status.Canceled) {
					return;
				}
				/* M.H. 31 Oct 2016 Fix for bug 226965: igUpload displays not a file size but a request size. */
				data.size = e.total || 0;
				data.bytesUploaded = e.loaded > singleFileData.sizeBytes ?
										singleFileData.sizeBytes : e.loaded || 0;
				if (isFinish) {
					data.total = data.bytesUploaded = singleFileData.sizeBytes;
					data.status = self._const.status.Finished;
				} else {
					data.status = self._const.status.Started;
				}
				self._setFileStatus(formNumber, true, data);
			} else {
				/*TODO throw an error*/
				self.cancelUpload(formNumber);
			}
		},
		addDataField: function (formData, field) {
			/* Append additional data field to formData(before submitting it to the server). Usually this function is used in the handler of the event onFormDataSubmit. If the browser supports HTML5 file API formData is instance of FormData, otherwise(like IE10 and older) formData is jQuery representation of the <form> that should be submitted to the server
			paramType="object" If the browser supports HTML5 file API formData is instance of FormData, otherwise(like IE10 and older) formData is jQuery representation of the <form> that should be submitted to the server
			paramType="object" Data field that should be appended to the formData. The object has 2 properties - value and name. If the browser supports HTML5 the data field is appended to the formData object. Otherwise it is appended as input hidden field to the <form>
			```
				$(".selector").igUpload("addDataField", ui.formData, { "name": "Parameter Name", "value": "Value" });
			```
			*/
			if (!field || $.type(field) !== "object") {
				return;
			}
			this.addDataFields(formData, [ field ]);
		},
		addDataFields: function (formData, fields) {
			/* Append additional data fields to formData(before submitting it to the server). Usually this function is used in the handler of the event onFormDataSubmit. If the browser supports HTML5 file API formData is instance of FormData, otherwise(like IE10 and older) formData is jQuery representation of the <form> that should be submitted to the server
			paramType="object" If the browser supports HTML5 file API formData is instance of FormData, otherwise(like IE10 and older) formData is jQuery representation of the <form> that should be submitted to the server
			paramType="array" Array of data fields that should be appended to the formData. Each data field is object with 2 properties - value and name. If the browser supports HTML5 these data fields are added to the formData. Otherwise each of these data field is appended as input hidden field to the <form>
			```
				$(".selector").igUpload("addDataFields", ui.formData, [{ "name": "Parameter Name 1", "value": "Value 1" }, { "name": "Parameter Name 2", "value": "Value 2" }]);
			```
			*/
			if (!formData || $.type(fields) !== "array" || !fields.length) {
				return;
			}
			var i, len = fields.length, f, isHTMLForm;
			isHTMLForm = formData.length && formData.is("form");
			if (!isHTMLForm) {
				if (!(formData instanceof FormData)) {
					return;
				}
			}
			for (i = 0; i < len; i++) {
				f = fields[ i ];
				if (!f.name || $.type(f.value) !== "string") {
					continue;
				}
				if (isHTMLForm) {
					$("<input />")
						.attr({
							type: "hidden",
							name: f.name,
							value: f.value
						})
						.appendTo(formData);
				} else {
					formData.append(f.name, f.value);
				}
			}
		},
		_html5createForm: function (fileInfo, ind, formNumber) {
			var self = this, o = self.options,
				/*fileInfo = $filePicker[ 0 ].files[ ind ],*/
				fileName = fileInfo.name,
				fileSize = fileInfo.size,
				data = this.fileInfoData,
				fileId = data.formNumber++,
				key = self._randomString(30),
				status = self._const.status.Started;
			if (self._validateFileExtension(fileInfo.name, true, formNumber) === false) {
				/* when validation failed it should be shown properly summary progress bar information */
				if (o.mode === "multiple") {
					self._spbRenderProgress();
				}
				/* M.H. Fix bug 77157 - when validation failed check count of max uploaded files is greater or equal than current files count - if so enable browse button */
				if (o.maxUploadedFiles !== null && o.maxUploadedFiles >= (data.countTotalFiles + 1)) {
					self._disableBrowseButton(false);
				}

				return false;
			}
			if (isNaN(fileSize)) {
				fileSize = 0;
			}
			/* _spb feature
			checksNoSuchFile - count of requests to the handler if it returns no such file status */
			data.filesInfo[ fileId ] = {
				path: fileName,
				key: key,
				sizeBytes: fileSize,
				uploadedBytes: 0,
				status: self._const.status.NotStarted,
				checksNoSuchFile: 0,
				innerStatus: self._const.status.NotStarted,
				multipleFiles: true,
				file: fileInfo,
				formNumber: formNumber
			};

			data.countTotalFiles++;
			self._spbRenderProgress();
			self._HTMLSingleUpload(fileId);
			this._saveFileSize(fileSize, fileId);
			if (o.autostartupload === true) {
				/* in multiple upload mode - if we can upload - check the number for maxSimultaneousFilesUploads */
				if (self._checkCanUpload() === true) {
					self.startUpload(fileId);
					/* M.H. 27 Jul 2011 - fix bug 77339 */
					/*self._addUploadingID(fileId);*/
				} else {
					self._addPendingId(fileId);
					status = self._const.status.NotStarted;
					/* if could not start upload because maxSimultaneousFilesUploads then get file size */
				}
			} else {
				/* M.H. 23 Jan 2013 Fix for bug #130729 */
				if (o.mode === "single") {
					self._showSingleUploadStartUpload(true, fileId);
				} else {
					/* autostartupload is false - then add to pending IDs */
					self._addIDBatch(fileId);
					status = self._const.status.NotStarted;
				}
			}

			data.iframe.ids[ data.iframe.ids.fileId ] = { id: fileId, status: status };
			if (o.mode === "multiple") {
				self._spbCheckModeButton();
			}
			self._trigger(self.events.fileSelected,
						  null,
						  { owner: self, fileId: fileId, filePath: self._getOnlyFileName(fileName) });
			return true;
		},
		_createForm: function (filePicker) {
			var self = this, o = self.options,
				data = this.fileInfoData,
				fileId = data.formNumber++,
				iframeId = this._id("_ifrm", fileId),
				formId = this._id("_frm", fileId),
				form,
				key = self._randomString(30),
				status = self._const.status.Started,
				cid = o.controlId,
				uploadUrl = o.uploadUrl + "?key=" + key + "&cid=" + cid;

			if (self._validateFileExtension(filePicker[ 0 ].value, true, fileId) === false) {
				/* we need to remove DOM element( <input type=file />) because we don't need of it anymore */
				filePicker.remove();
				/* when validation failed it should be shown properly summary progress bar information */
				if (o.mode === "multiple") {
					self._spbRenderProgress();
				}
				/* M.H. Fix bug 77157 - when validation failed check count of max uploaded files is greater or equal than current files count - if so enable browse button */
				if (o.maxUploadedFiles !== null && o.maxUploadedFiles >= (data.countTotalFiles + 1)) {
					self._disableBrowseButton(false);
				}

				return false;
			}
			/* _spb feature */
			/* checksNoSuchFile - count of requests to the handler if it returns no such file status */
			data.filesInfo[ fileId ] = {
				path: filePicker.val(),
				key: key,
				sizeBytes: 0,
				uploadedBytes: 0,
				status: self._const.status.NotStarted,
				checksNoSuchFile: 0,
				innerStatus: self._const.status.NotStarted
			};

			data.countTotalFiles++;
			self._spbRenderProgress();
			/* //end of _spb feature */

			/* DO NOT set id and name as attribute because in IE7 does not work properly - on start upload opens new browser */
			$('<iframe src="javascript:false;" id="' + iframeId + '" name="' + iframeId + '"></iframe>')
				.appendTo($(document.body))
				.css({ "display": "none" });
			form = $('<form method="post" enctype="multipart/form-data"></form>')
					.attr("id", formId).attr("target", iframeId)
					.attr("action", uploadUrl)
					.appendTo($(document.body));
			filePicker.attr("name", formId + "_if").attr("id", formId + "_if").appendTo(form);
			self._trigger(self.events.onFormDataSubmit,
						  null,
						  { formData: form, fileId: fileId, fileInfo: data.filesInfo[ fileId ], owner: self });
			self._HTMLSingleUpload(fileId);
			/*if (o.mode === "single") {
				self.startUpload(fileId);
						} else { */
			if (o.autostartupload === true) {
				/* in multiple upload mode - if we can upload - check the number for maxSimultaneousFilesUploads */
				if (self._checkCanUpload() === true) {
					self.startUpload(fileId);
					/* M.H. 27 Jul 2011 - fix bug 77339
					self._addUploadingID(fileId); */
				} else {
					self._addPendingId(fileId);
					status = self._const.status.NotStarted;
					/* if could not start upload because maxSimultaneousFilesUploads then get file size */
					self._getFileSize(fileId, key);
				}
			} else {
				if (o.mode === "single") {
					self._showSingleUploadStartUpload(true, fileId);
					self._getFileSize(fileId, key);
				} else {
					/* autostartupload is false - then add to pending IDs */
					self._addIDBatch(fileId);
					status = self._const.status.NotStarted;
					self._getFileSize(fileId, key);
				}
				/* _spb feature batch */
			}
			data.iframe.ids[ data.iframe.ids.fileId ] = { id: fileId, status: status };
			if (o.mode === "multiple") {
				self._spbCheckModeButton();
			}
			self._trigger(self.events.fileSelected,
						  event,
						  { owner: self, fileId: fileId, filePath: self._getOnlyFileName(filePicker.val()) });
			return true;
		},
		_showSingleUploadStartUpload: function () {
			/* check if exists such button
			*  if not exists add to markup */
			var self = this,
				o = self.options,
				startUploadButtonId = "_strtuplbtn",
				startUploadButton = $("#" + this._id(startUploadButtonId)),
				browseButton = $("#" + this._id("_bb"));

			if (startUploadButton.length === 0) {
				/* add the button to markup */
				$('<button id="' + self._id(startUploadButtonId) + '"></button>')
					.appendTo($("#" + self._id("_fu")))
					.igButton({
						labelText: this._getLocaleValue("labelSummaryProgressButtonContinue"),
						/* M.H. 12 May 2011 - fix bug 74763: add title to all buttons */
						title: this._getLocaleValue("titleSingleUploadButtonContinue"),
						click: function (e) {
							e.preventDefault();
							self.startUpload((self.fileInfoData.formNumber - 1), e);
							/* M.H. 27 Jul 2011 - fix bug 77339
							*  it should be called because bug 72252 */
							browseButton.igBrowseButton("attachFilePicker", e, true);
						}
					});
				startUploadButton = $("#" + this._id(startUploadButtonId));
			}
			browseButton.hide();
			startUploadButton.show();
		},
		_removeIframe: function (iframeNumber) {
			var self = this,
				data = this.fileInfoData,
				iframeId = this._id("_ifrm", iframeNumber),
				formId = this._id("_frm", iframeNumber),
				browseButton = $("#" + self._id("_bb"));

			$("#" + iframeId).remove();
			$("#" + formId).remove();
			data.iframe.ids = self._removeElementArrayById(data.iframe.ids, iframeNumber);
			if (self.options.mode === "single") {
				browseButton.igBrowseButton("option", "disabled", false);
				data.lastId = iframeNumber;
			}
			this._attachFakeIframe();
		},
		_HTMLSingleUpload: function (formNumber) {
			var self = this,
				o = this.options,
				css = self.css,
				fileContainerId = self._id("_fc"),
				fileUploadStatusId =  self._id("_fus", formNumber),
				singleProgressBarId =  self._id("_snglpbar", formNumber),
				iconId =  self._id("_icn", formNumber),
				cancelButtonId = self._id("_cbtn", formNumber),
				fileContainer = $("#" + fileContainerId),
				fileName = this.fileInfoData.filesInfo[ formNumber ].path,
				html,
				progressBarFileNameId = self._id("_pbrflnm", formNumber),
				progressBarFileSizeId = self._id("_pbrflsz", formNumber),
				progressBarFileName,
				singleProgressBar,
				iconClass = self._getFileExtensionIconPath(self._getFileExtension(fileName));// progressbar inner html

			html =	  '<div id="' + fileUploadStatusId + '">';
			html +=	 '	<div class="' + css.containerFUS + '">';
			html +=	 '		<div class="' + css.containerButtonCancelClass + '">';
			html +=	 '			<button id="' + cancelButtonId + '"></button>';
			html +=	 "		</div>";
			html +=	 '		<div class="' + css.progressContainer + '">';
			/* M.H. 8 Nov. 2011 Fix for bug #77166 */
			html += '			<div class="' + css.progressBarInnerHTMLContainerClass + '" ';
			html +=	 '			title="' + fileName + '">';
			html +=	 '				<span id="' + iconId + '" class="' + iconClass + '"></span>';
			html += '				<span class="' + css.progressBarFileNameClass + '" ';
			html +=	 '					id="' + progressBarFileNameId + '">';
			html +=	 "				</span>";
			html +=	 '				<span class="' + css.progressBarFileSizeClass + '" ';
			html +=	 '					id="' + progressBarFileSizeId + '">';
			html +=	 "				</span>";
			html +=	 "			</div>";
			html +=	 '			<div id="' + singleProgressBarId + '"';
			html +=	 '				class="' + css.progressBarUploadClass + '">';
			html +=	 "			</div>";
			html +=	 "		</div>";
			html +=	 "	</div>";
			html +=	 "</div>";

			$(html).appendTo(fileContainer);
			$("#" + fileUploadStatusId).addClass(css.uploadProgressClass + " " + css.clearClass);
			singleProgressBar = $("#" + singleProgressBarId);
			$("#" + cancelButtonId).igButton({
				onlyIcons: true,
				icons: { primary: "ui-icon-closethick" },
				/* M.H. 12 May 2011 - fix bug 74763: add title to all buttons */
				title: this._getLocaleValue("titleCancelUploadButton"),
				click: function (event) {
					/* M.H. 11 May 2011 - fix bug 75137 - prevent default */
					event.preventDefault();
					self.cancelUpload(formNumber);
					/* cancel upload and disable cancel button and change its style */
					$("#" + cancelButtonId).igButton("option", {
						"disabled": true,
						"icons": { primary: "ui-icon-check", secondary: null }
					});
				},
				css: {
					"buttonClasses": "ui-button ui-widget " +
									 "ui-state-default " +
									 "ui-corner-all " +
									 "ui-button-icon-only " +
									 "ui-igbutton " +
									 "ui-igupload-cancel-button",
					"buttonHoverClasses": "ui-state-hover",
					"buttonActiveClasses": "ui-state-active", // when button is clicked
					"buttonFocusClasses": "ui-state-focus", // when button get focus
					"buttonLabelClass": "ui-button-text",
					"buttonDisabledClass": "ui-state-disabled",
					"buttonPrimaryIconClass": "ui-button-icon-primary ui-icon",
					"buttonMainElementPrimaryIconClass": " ui-button-text-icon-primary",
					"buttonMainElementSecondaryIconClass": " ui-button-text-icon-secondary",
					"buttonSecondaryIconClass": "ui-button-icon-secondary ui-icon",
					"buttonIconsOnly": "ui-button-icons-only",
					"buttonIconOnly": "ui-button-icon-only",
					"buttonIcons": "ui-button-text-icons",
					"buttonTextOnlyClass": "ui-button-text-only"
				}
			});

			singleProgressBar.igProgressBar({
				animate: self._const.isProgressBarAnimationEnabled,
				animateTimeout: self._const.animateProgressBarInterval,
				range: self._const.isProgressBarRange,
				value: 0,
				queue: false
			});
			if (!o.showFileExtensionIcon) {
				$("#" + iconId).css("display", "none");
			}
			progressBarFileName = $("#" + progressBarFileNameId);
			fileName = self._getOnlyFileName(fileName);
			singleProgressBar.data("originalFileName", fileName);
			if (fileName.length > self._const.fileNameLimit) {
				fileName = fileName.substr(0, self._const.fileNameLimit);
			}
			progressBarFileName.text(self._formatFilePath(fileName));
			/* M.H. 10 May 2011 - fix bug 74272 */
			self._renderFileName(formNumber, 0, fileName);
		},
		/* M.H. 10 May 2011 - fix bug 74272: add method to render FileName properly in file upload info */
		_renderFileName: function (formNumber, fileSize, fn) {
			var self = this,
				o = self.options,
				fileName = fn,
				previousFileName = "",
				originalFileSize,
				progressBarFileName = $("#" + self._id("_pbrflnm", formNumber)),
				progressBarFileSize = $("#" + self._id("_pbrflsz", formNumber)),
				singleProgressBarWidth = $("#" + self._id("_snglpbar", formNumber)).width(),
				singleProgressBar = $("#" + self._id("_snglpbar", formNumber)),
				progressBarFileSizeWidth = progressBarFileSize.width();

			/* M.H. 22 Aug 2012 Fix for bug #119469 */
			if (progressBarFileName.length === 0) {
				return;
			}
			if (fileName === undefined || fileName === null) {
				fileName = singleProgressBar.data("fileName");
			}
			/* autotrim - check for the size */
			if (singleProgressBarWidth <= 0) {
				fileName = this._getLocaleValue("labelProgressBarFileNameContinue");
				progressBarFileName.text(fileName);
			} else {
				if (fileSize !== 0 && fileSize !== undefined && fileSize !== null) {
					originalFileSize = progressBarFileSize.text();
					progressBarFileSizeWidth = progressBarFileSize
												.text(self._formatFileSize(fileSize) + "/" + self._formatFileSize(fileSize))
												.width();
					progressBarFileSize.text(originalFileSize);
				}
				while (progressBarFileName.position().left +
						progressBarFileName.width() +
						progressBarFileSizeWidth >= singleProgressBarWidth &&
						(previousFileName !== fileName)) {
					previousFileName = fileName;
					fileName = fileName.substr(0, fileName.length / 2);
					if (previousFileName === fileName && fileName.length - 1 > 1) {
						fileName = fileName.substr(0, (fileName.length - 1) / 2);
					}
					progressBarFileName.text(fileName + this._getLocaleValue("labelProgressBarFileNameContinue"));
				}
				if (progressBarFileName.position().left +
					progressBarFileName.width() +
					progressBarFileSize.width() >= singleProgressBarWidth) {
					fileName = this._getLocaleValue("labelProgressBarFileNameContinue");
				}
			}
			singleProgressBar.data("fileName", fileName);
		},
		_removeSingleUpload: function (formNumber) {
			var self = this,
				fileUploadStatusId =  self._id("_fus", formNumber),
				fileUploadStatusTmpId = fileUploadStatusId + "_" + self._randomString(20);
			if (self.options.mode === "multiple") {
				$("#" + fileUploadStatusId).attr("id", fileUploadStatusTmpId);
				self._renderAnimatedRemovingUpload(fileUploadStatusTmpId);
			} else if (self.options.mode === "single") {
				$("#" + fileUploadStatusId).hide().remove();
				/*self._renderAnimatedRemovingUpload(fileUploadStatusId); */
			}
		},
		_renderAnimatedRemovingUpload: function (id) {
			$("#" + id).slideUp(this._const.removeSingleUploadAnimationTimeout, function () {
				$(this).remove();
			});
		},
		startUpload: function (formNumber) {
			/* Start uploading file as submitting form with the specified formNumber.
			 paramType="number" id of the upload form
			 ```
				$(".selector").igUpload("startUpload", 1);
			 ```
			 */
			var self = this, o = this.options,
				formId = self._id("_frm", formNumber),
				allFilesData = this.fileInfoData,
				fileInfo = allFilesData.filesInfo[ formNumber ],
				file, fileSize,
				isHTML5 = false;

			if (formNumber === null || fileInfo === null || fileInfo === undefined) {
				self._setError(this._getLocaleValue("errorMessageTryToStartNonExistingFile").replace("{0}", formNumber),
									formNumber,
									self._const.clientSideErrorCode.startUpload, "clientside");
				return;
			}
			/* M.H. 24 Mar 2015 Fix for bug 189976: Progress is not canceled at the time that the upload is canceled on the server when using IIS Express */
			file = fileInfo.file;
			if (file) {
				fileSize = file.size;
			}
			if ($.type(o.maxFileSize) === "number" &&
				$.type(fileSize) === "number" &&
				o.maxFileSize > -1 &&
				fileSize > o.maxFileSize) {
				self._removeUploadSetError(formNumber,
											this._getLocaleValue("errorMessageMaxFileSizeExceeded"),
											self._const.clientSideErrorCode.maxFileSizeExcceeded,
											"clientside");
				return false;
			}
			/* M.H. 10 May 2011 - fix bug 74258: check file is with status NotStarted */
			if (fileInfo.status !== self._const.status.NotStarted) {
				return;
			}
			isHTML5 = fileInfo.multipleFiles;
			if (isHTML5 !== true) {
				$("#" + formId).submit();
			} else {
				this._html5upload(formNumber);
			}
			/* M.H. 27 Jul 2011 - fix bug 77339 */
			self._addUploadingID(formNumber);
			self._removeIDBatch(formNumber);
			self._spbCheckModeButton();
			/* summary progress bar */
			fileInfo.status = self._const.status.Started;
			fileInfo.innerStatus = self._const.status.Started;
			self._spbRenderProgress();
			/* M.H. 27 Jul 2011 - fix bug 77339 */
			if (o.mode === "single") {
				$("#" + self._id("_strtuplbtn")).hide();
				$("#" + self._id("_bb")).igBrowseButton("option", "disabled", true).show();
			}
			if (isHTML5 === true) {
				return;
			}
			setTimeout(
				function () {
					self._getFileStatus(formNumber, true);
				},
				self._const.progressUpdateInterval
			);
		},
		_setFileStatus: function (formNumber, isNewFile, data) {
			if (!data) {
				return;
			}
			var self = this, o = self.options, eArgs,
				isFinishUpload = false,
				status = "", bytesUploaded = 0, fileSize = 0,
				singleFileData = this.getFileInfo(formNumber),
				allFilesData = this.fileInfoData,
				key = self._getKey(formNumber),
				fileName, error, isError,
				serverMessage = "";

			if (key === null || key  === undefined || !singleFileData) {
				return false;
			}
			fileName = singleFileData.path;
			bytesUploaded = parseInt(data.bytesUploaded, 10);
			status = parseInt(data.status, 10);
			/* M.H. 24 August 2015 Fix for bug 205053: WebUpload can not upload a file or shows the file size incorrectly when the file to be uploaded is 0 byte in size */
			if (singleFileData.file) {
				data.size = singleFileData.file.size;
			}
			fileSize = parseInt(data.size, 10);
			serverMessage = data.serverMessage;
			isFinishUpload = (status === self._const.status.Finished);
			error = parseInt(data.error, 10);
			isError = (!isNaN(error) && error !== self._const.fileStatusNoError);
			if (serverMessage) {
				singleFileData.serverMessage = serverMessage;
			}
			/* _spb feature */
			if (singleFileData.innerStatus === self._const.status.Canceled && isError) {
				self._setError(this._getLocaleValue("errorMessageOther").replace("{0}", error),
					formNumber,
					error, "serverside", serverMessage);
				return false;
			}

			if (isError === true && status !== self._const.status.NoSuchFile) {
				self._removeUploadSetError(formNumber,
											this._getLocaleValue("errorMessageOther").replace("{0}", error),
											error,
											"serverside",
											serverMessage);
				return false;
			}
			if (singleFileData !== null && singleFileData.status !== self._const.status.Canceled) {
				allFilesData.fileSizeUploaded -= singleFileData.uploadedBytes;

				if (singleFileData.sizeBytes === 0 || singleFileData.sizeBytes === null) {
					singleFileData.sizeBytes = fileSize;
					allFilesData.fileSizeTotal += fileSize;
				} else if (singleFileData.sizeBytes !== fileSize) {
					/* show in the right way file size when file size is taken first from getFileSize and then file is started
					*  it is used the value taken from server from getFileSize */
					fileSize = singleFileData.sizeBytes;
				}
				if (isFinishUpload) {
					allFilesData.countUploadingFiles++;
				}
				/* M.H. 7 Jan 2013 Fix for bug #129538 */
				if (bytesUploaded === 0 && singleFileData.uploadedBytes > 0) {
					bytesUploaded = singleFileData.uploadedBytes;
				}
				singleFileData.uploadedBytes = bytesUploaded;
				singleFileData.status = status;
				allFilesData.fileSizeUploaded += singleFileData.uploadedBytes;
				self._spbRenderProgress();
				/* M.H. 11 May 2011 - fix bug 74553: enable to cancel upload through event handler of fileUploading */
				eArgs = {
					fileId: formNumber,
					filePath: self._getOnlyFileName(fileName),
					totalSize: fileSize,
					uploadedBytes: bytesUploaded,
					fileStatus: status,
					fileInfo: singleFileData,
					owner: self
				};
				if (self._trigger(self.events.fileUploading, null, eArgs) === false) {
					self.cancelUpload(formNumber);
				}
			}
			/* // end of _spb feature */
			if (isFinishUpload || status === self._const.status.Started) {
				if (isFinishUpload) {
					/* SimultaneousFilesUploads feature */
					self._removeUploadingID(formNumber);
					if (o.mode === "multiple") {
						self._spbCheckModeButton();
						self._submitNextPendingId();
					}
				}
				self._renderStatus(formNumber, bytesUploaded, fileSize, isFinishUpload, singleFileData);
				if (!isFinishUpload) {
					return true;
				}
			} else if (status === self._const.status.NoSuchFile) {
				/* double check - if it is not found file with such key send again request to the server */
				if (singleFileData !== null && singleFileData !== undefined &&
						singleFileData.checksNoSuchFile === 0) {
					singleFileData.checksNoSuchFile++;
					return true;
				}
				self._removeUploadSetError(formNumber,
											this._getLocaleValue("errorMessageNoSuchFile"),
											"nosuchfilekeyid",
											"serverside",
											serverMessage);
			}
			return false;
		},
		_getFileStatus: function (formNumber, isNewFile) {
			var self = this, o = self.options,
				key = self._getKey(formNumber);

			if (key === null || key  === undefined) {
				return;
			}
			key = key.replace("-$#", "").replace("#$-", "");
			$.ajaxQueue("uploadrequestsqueue", {
				url: self._formatURL(o.progressUrl, $.param({ "key": key, "command": "status" })),
				dataType: "json",
				cache: false,
				success: function (data) {
					if (self._setFileStatus(formNumber, isNewFile, data) === true) {
						setTimeout(function () {
							self._getFileStatus(formNumber, false);
						}, self._const.progressUpdateInterval);
					}
				},
				error: function () {
					self._setError(this._getLocaleValue("errorMessageGetFileStatus"),
						formNumber,
						self._const.clientSideErrorCode.ajaxErrorGetFileStatus, "clientside");
					/* self._removeUploadSetError(formNumber, o.errorMessageGetFileStatus); */
				}
			});
		},
		_removeUploadSetError: function (formNumber, errorMessage, errorCode, errorType, serverMessage) {
			var self = this, o = this.options;

			self._removeIframe(formNumber);
			self._removeFileUpload(formNumber);
			self._setError(errorMessage, formNumber, errorCode, errorType, serverMessage);
			if (o.mode === "multiple") {
				self._spbCheckModeButton();
				self._submitNextPendingId();
			} else {
				$("#" + this._id("_strtuplbtn")).hide();
				$("#" + this._id("_bb"))
					.igBrowseButton("option", "disabled", false)
					.show();
			}
		},
		cancelUpload: function (formNumber) {
			/* Cancel upload for the specified file id
			 formNumber - id of the file to be canceled
			 paramType="number" id of the form which should be cancelled
			 ```
				$(".selector").igUpload("cancelUpload", 1);
			 ```
			 */
			var self = this, eArgs,
				o = self.options,
				singleProgressBarId =  self._id("_snglpbar", formNumber),
				singleProgressBar = $("#" + singleProgressBarId),
				filePicker = $("#" + self._id("_frm", formNumber) + "_if"),
				fileName = filePicker.val(),
				totalSize = 0,
				bytesUploaded = 0,
				key = this._getKey(formNumber),
				singleFileInfo = this.getFileInfo(formNumber);

			totalSize = singleProgressBar.data("totalSize");
			bytesUploaded = singleProgressBar.data("bytesUploaded");
			if (totalSize === undefined) {
				totalSize = 0;
			}
			if (bytesUploaded === undefined) {
				bytesUploaded = 0;
			}

			/*self._trigger(self.events.fileUploadCancelClick, null, {fileId: formNumber, filePath: self._getOnlyFileName(fileName), uploadedBytes: bytesUploaded, totalSize: totalSize});*/
			/* _spb feature */
			if (singleFileInfo !== null) {
				if (singleFileInfo.status === self._const.status.Started) {
					singleFileInfo.innerStatus = self._const.status.Canceled;
					if (singleFileInfo.multipleFiles === true) {
						if (singleFileInfo.xhr) {
							singleFileInfo.xhr.abort();
						}
						self._onCancelUpload(formNumber);
					} else {
						$.ajaxQueue("uploadrequestsqueue", {
							url: self._formatURL(o.progressUrl, $.param({ "key": key, "command": "cancel" })),
							dataType: "json",
							cache: false,
							success: function () {
								self._onCancelUpload(formNumber);
							},
							error: function () {
								self._setError(this._getLocaleValue("errorMessageCancelUpload"), formNumber,
									self._const.clientSideErrorCode.ajaxErrorCancelUpload, "clientside");
								self._removeFileUpload(formNumber);
							}
						});
					}
					/* end of _spb feature */
				} else if (singleFileInfo.status === self._const.status.NotStarted) {
					if (o.mode === "single") {
						$("#" + this._id("_strtuplbtn")).hide();
						$("#" + this._id("_bb")).igBrowseButton("option", "disabled", "false").show();
					}
					eArgs = {
						fileId: formNumber,
						filePath: self._getOnlyFileName(fileName),
						uploadedBytes: 0,
						totalSize: totalSize,
						status: self._const.status.NotStarted,
						owner: self
					};
					self._trigger(self.events.fileUploadAborted, null, eArgs);
					self._removeFileUpload(formNumber);
				}
				/* M.H. 27 Jul 2011 - fix bug77257: check whether to disable browse button when countTotalFiles is updated - remove check for disabling browse button */
			}
		},
		_onCancelUpload: function (formNumber) {
			var eArgs, self = this,
				o = self.options,
				continueButton = null,
				totalSize = 0,
				bytesUploaded = 0,
				allIds = null,
				singleFileInfo = this.getFileInfo(formNumber),
				fileName = singleFileInfo.path;

			if (o.autostartupload === false && o.mode === "multiple") {
				continueButton = $("#" + self._id("_spbtncncl"));
				allIds = continueButton.data("ids");
				allIds = self._removeElementFromArray(allIds, formNumber);
				continueButton.data("ids", allIds);
			}
			eArgs = {
				fileId: formNumber,
				filePath: self._getOnlyFileName(fileName),
				uploadedBytes: bytesUploaded,
				totalSize: totalSize,
				status: self._const.status.Canceled,
				owner: self
			};
			self._trigger(self.events.fileUploadAborted, null, eArgs);
			self._removeFileUpload(formNumber);
		},
		_removeFileUpload: function (formNumber) {
			var self = this,
				o = self.options,
				cancelButtonId = self._id("_cbtn", formNumber),
				singleProgressBarId =  self._id("_snglpbar", formNumber),
				singleProgressBar = $("#" + singleProgressBarId),
				totalSize = 0,
				bytesUploaded = 0,
				allFilesData = this.fileInfoData,
				singleFileInfo = this.getFileInfo(formNumber);

			if (singleFileInfo === null) {
				self._setError(this._getLocaleValue("errorMessageTryToRemoveNonExistingFile").replace("{0}", formNumber), formNumber,
					self._const.clientSideErrorCode.removeFileUpload, "clientside");
				return;
			}
			totalSize = singleProgressBar.data("totalSize");
			bytesUploaded = singleProgressBar.data("bytesUploaded");
			if (totalSize === undefined) {
				totalSize = 0;
			}
			if (bytesUploaded === undefined) {
				bytesUploaded = 0;
			}

			/* show summary progress */
			allFilesData.countTotalFiles--;
			/* if the file is started but not finished */
			singleFileInfo.status = self._const.status.Canceled;
			allFilesData.fileSizeUploaded -= singleFileInfo.uploadedBytes;

			allFilesData.fileSizeTotal -= singleFileInfo.sizeBytes;
			self._spbRenderProgress();
			/* maxSimultaneousFilesUploads feature */
			self._removeUploadingID(formNumber);
			if (o.mode === "multiple") {
				self._removePendingId(formNumber);
				self._removeIDBatch(formNumber);

				if (this.allCancelled === false) {
					self._submitNextPendingId();
				}
				self._spbCheckModeButton();
			}

			$("#" + cancelButtonId).remove();
			self._removeIframe(formNumber);
			self._removeSingleUpload(formNumber);

			/* M.H. 27 Jul 2011 - fix bug77257: check whether to disable browse button when countTotalFiles is updated */
			/* check maximum allowed uploading files */
			self._disableBrowseButton(!self._checkMaxUploadingFilesCount());
		},
		_getKey: function (formNumber) {
			var a = this.fileInfoData.filesInfo[ formNumber ];
			if (a !== null && a !== undefined) {
				return a.key;
			}
			return null;
		},
		_singleFileUploadFinished: function (formNumber) {
			var e = this.container(), self = this, arr;
			/* single file Cancel/Done button - from cancel - disable it and change its icon - to DONE */
			$("#" + self._id("_cbtn", formNumber))
				.igButton("option",
					{
						"disabled": true,
						"icons": { primary: "ui-icon-check", secondary: null }
					});
			self._removeIframe(formNumber);
			if (self.options.mode === "multiple") {
				self._enableClearAllButton();
				arr = e.data("finishedIDs");
				if (arr === undefined) {
					arr = [];
				}
				arr.push(formNumber);
				e.data("finishedIDs", arr);
			}
		},
		_renderStatus: function (formNumber, bytesUploaded, fileSize, isFinished, fileInfo) {
			var self = this, eArgs,
				originalFileName,
				statusLabel = $("#" + self._id("_pbrflsz", formNumber)),
				singleProgressBarId =  self._id("_snglpbar", formNumber),
				singleProgressBar = $("#" + singleProgressBarId),
				percentUploaded = 0,
				fileNameRendered;

			if (isFinished) {
				bytesUploaded = fileSize;
				self._singleFileUploadFinished(formNumber);
			}
			if (fileSize !== 0 && isNaN(bytesUploaded) === false && isNaN(fileSize) === false) {
				percentUploaded = (bytesUploaded / fileSize) * 100;
			} else if (isFinished) {// M.H. 24 August 2015 Fix for bug 205053: WebUpload can not upload a file or shows the file size incorrectly when the file to be uploaded is 0 byte in size
				percentUploaded = 100;
			}
			singleProgressBar.data("totalSize", fileSize);
			singleProgressBar.data("bytesUploaded", bytesUploaded);
			/* M.H. 10 May 2011 - fix bug 74272 */
			fileNameRendered = singleProgressBar.data("isFileNameRendered");
			/*fileName = singleProgressBar.data("fileName"); */
			originalFileName = singleProgressBar.data("originalFileName");
			singleProgressBar.igProgressBar("option", "value", percentUploaded);
			statusLabel.text(self._formatFileSize(bytesUploaded) + "/" + self._formatFileSize(fileSize)); // + " (" + percentUploaded.toFixed(3) + "%)"

			/* M.H. 10 May 2011 - fix bug 74272 */
			if (fileNameRendered !== true) {
				singleProgressBar.data("isFileNameRendered", true);
				self._renderFileName(formNumber, fileSize);
			}
			if (isFinished) {
				eArgs = {
					fileId: formNumber,
					filePath: originalFileName,
					totalSize: bytesUploaded,
					fileInfo: fileInfo,
					owner: self
				};
				self._trigger(self.events.fileUploaded, null, eArgs);
				if (self._checkMaxUploadingFilesCount() === false) {
					/* check maximum allowed uploading files */
					self._disableBrowseButton(true);
					return;
				}
			}
		},
		_formatURL: function (url, args) {
			/* check if url contains ? - if not add, else add */
			if (url.indexOf("?") === -1) {
				url += "?";
			}

			url += args;
			return url;
		},
		_showHideIcons: function (properties) {
			var files = this.fileInfoData.filesInfo, i;

			for (i in files) {
				if (files[ i ] !== undefined) {
					$("#" + this._id("_icn", i)).css(properties);
				}
			}
		},
		_setWidthHeightAllUploads: function (value, isHeight) {
			var files = this.fileInfoData.filesInfo,
				option = (isHeight ? "height" : "width"),
				i;

			for (i in files) {
				if (files[ i ] !== undefined) {
					$("#" + this._id("_snglpbar", i)).igProgressBar("option", option, value);
				}
			}
		},
		changeLocale: function () {
			var $button = $("#" + this._id("_ibb")),
				$sumarryProgressTmp = $("#upload_summplbl");
				self = this;
				this._super();

			if ($sumarryProgressTmp.length) {
				$sumarryProgressTmp.text(this._getLocaleValue("labelSummaryTemplate").replace("{0}", this.fileInfoData.countUploadingFiles).replace("{1}", this.fileInfoData.countTotalFiles));
			}
			if ($button.length) {
				$button.igBrowseButton("option", {
					labelText: this._getLocaleValue("labelUploadButton"),
					title: this._getLocaleValue("titleUploadFileButtonInit")
				});
			}
			$button = $("#" +this._id("_bb"));
			if ($button.length) {
				$button.igBrowseButton("option", {
					labelText: this._getLocaleValue("labelAddButton"),
					title: this._getLocaleValue("titleAddFileButton")
				});
			}
			$button = $("#" + this._id("_clrabtn"));
			if ($button.length) {
				$button.igButton("option", {
					title: this._getLocaleValue("titleClearAllButton"),
					labelText: this._getLocaleValue("labelClearAllButton"),
				});
			}
			$button = $("#" + this._id("_spbtncncl"));
			if ($button.length) {
				$button.igButton("option", {
					title: this._getLocaleValue("titleShowDetailsButton"),
					labelText: this._getLocaleValue("labelShowDetails"),
				});
			}
			$button = $("button[id$='cbtn']");
			if ($button.length) {
				$button.each(function() {
					$(this).igButton("option", {
						title: self._getLocaleValue("labelSummaryProgressButtonCancel")
					})
				})
			}
		},
		_setOption: function (key, value) {
			var originalMode = this.options.mode,
				originalAutoStartUpload = this.options.autostartupload;

			this._superApply(arguments);
			switch (key) {
			case "width":
				this.container().width(value);
				$("#" + this._id("_bmncntr")).width(value);
				/* Fix bug #75939 M.H. 27 May 2011 */
				this._reRenderFileSizeMetrics();

				/* Fix bug #77383 M.H. 27 Jul 2011 */
				this._reRenderFileNames();
				break;
			case "height":
				this.container().height(value);
				$("#" + this._id("_bmncntr")).height(value);
				break;
			case "labelSummaryProgressButtonDone":
				if (this.spbButtonMode === this.summaryButtonModes.done) {
					$("#" + this._id("_spbtncncl")).igButton("option", "labelText", value);
				}
				break;
			case "showFileExtensionIcon":
				this._showHideIcons({ "display": ((!value) ? "none" : "block") });
				break;
				/* M.H. 10 May 2011 - fix bug 74174: change fileSize Metric for all items that are displayed */
			case "fileSizeMetric":
				this._reRenderFileSizeMetrics();
				break;
				/* M.H. 10 May 2011 - fix bug 74172: change add in setOption case for fileSizeDecimalDisplay */
			case "fileSizeDecimalDisplay":
				this._reRenderFileSizeMetrics();
				break;
				/* M.H. 11 May 2011 - fix bug 74305: */
			case "maxUploadedFiles":
				this._disableBrowseButton(!this._checkMaxUploadingFilesCount());
				break;
				/* M.H. 11 May 2011 - fix bug 77331: add option for mode. When changing mode re-create widget(first destroy it) */
			case "mode":
				if (originalMode !== value) {
					/* M.H. 28 Jul 2011 - fix bug 77183 - remove html markup - it should not be used destroy method */
					this._destroyMarkup();
					this._create();
				}
				break;
				/* M.H. 26 Jul 2011 - fix bug 82062 - set disabled of the init browse button */
			case "disabled":
				this._disableBrowseButton(value);
				break;
				/* M.H. 9 Nov. 2011 - fix bug 77279 - when value is set to true then all pending files are submitted */
			case "autostartupload":
				if (value === true && value !== originalAutoStartUpload) {
					this._spbSubmitAllButton();
				}
				break;
			}
		},
		/* M.H. 10 May 2011 - fix bug 74174: change fileSize Metric for all items that are displayed, add method */
		_reRenderFileSizeMetrics: function () {
			var data = this.fileInfoData.filesInfo,
				l = data.length,
				i,
				/* M.H. 1 June 2011 Fix bug #77180 */
				bytesUploaded = 0,
				self = this,
				fileSize,
				statusLabel,
				singleProgressBar;

			for (i = 0; i < l; i++) {
				/* check if exist summary progress bar as DOM element */
				/* Fix bug #76775 M.H. 26 May 2011 */
				/* M.H. 1 June 2011 Fix bug #77180 */
				statusLabel = $("#" + self._id("_pbrflsz", i));
				if (statusLabel.length === 0) {
					continue;
				}
				fileSize = data[ i ].sizeBytes;
				bytesUploaded = data[ i ].uploadedBytes;
				singleProgressBar = $("#" + self._id("_snglpbar", i));
				/*if (fileSize !== 0 && isNaN(bytesUploaded) === false && isNaN(fileSize) === false) {
					percentUploaded = (bytesUploaded / fileSize) * 100;
				}
				fileName = singleProgressBar.data("fileName");
				originalFileName = singleProgressBar.data("originalFileName"); */
				statusLabel.text(self._formatFileSize(bytesUploaded) + "/" + self._formatFileSize(fileSize)); // + " (" + percentUploaded.toFixed(3) + "%)" */
				singleProgressBar.data("isFileNameRendered", true);
				self._renderFileName(i, fileSize);
				$("#" + self._id("_summpbrlbl_1")).width($("#" + this._id("_summpbar")).width());
			}
			this._spbRenderProgress();
		},
		_destroyMarkup: function () {
			/* M.H. 28 Jul 2011 - fix bug 77183 - set logic for removing html markup into separate function */
			/*
			Destroy the widget
			*/
			/* M.H. 12 May 2011 - fix bug 74966 */
			var i, attr, startupButton = $("#" + this._id("_ibb")),
				browseButton = $("#" + this._id("_bb")),
				baseMainContainer = $("#" + this._id("_bmncntr"));

			if (!this._isDivElement) {
				this.originalElement.show().unwrap();
			}
			/* M.H. 12 May 2011 - fix bug 74966 */
			startupButton.igBrowseButton("destroy");
			browseButton.igBrowseButton("destroy");

			startupButton.remove();
			baseMainContainer.remove();
			/*  this.container() = this.originalElement; */
			/* M.H. 7 Feb 2014 Fix for bug #163735: WebIDE requires the outer element of igUpload to be with the same ID as the element(on which control is initialized) ID */
			if (!this._isDivElement) {
				this.container().remove();
			} else {
				this.element.empty();
				attr = this.element[ 0 ].attributes;
				for (i = 0; i < attr.length; i++) {
					if (attr[ i ].name !== "id") {
						this.element.removeAttr(attr[ i ].name);
					}
				}
				for (i = 0; i < this._initialAttributes.length; i++) {
					if (this._initialAttributes[ i ].name !== "id") {
						this.element.attr(this._initialAttributes[ i ].name, this._initialAttributes[ i ].value);
					}
				}
				this.element.html(this._initialHTML);
			}
		},
		destroy: function () {
			/*
			 Destroy the widget
			*/
			/* M.H. 28 Jul 2011 - fix bug 77183 - set logic for removing html markup into separate function */
			this._destroyMarkup();
			$.Widget.prototype.destroy.apply(this, arguments);
		},
		/* Get file Size Before Start Upload */
		_getFileSize: function (formNumber, key) {
			/* adds iframe and submits form with specific query string and the server should return the size of fileupload
			*  this method is called only when option autostartupload = false */
			var self = this,
				o = this.options,
				formId =  this._id("_fszfrm", formNumber),
				filePicker = $("#" + self._id("_frm", formNumber) + "_if"),
				iframeId = this._id("_fszifrm", formNumber),
				form,
				url = self._formatURL(o.uploadUrl, $.param({ "key": key, "command": "fileSize" }));

			$('<iframe src="javascript:false;" id="' + iframeId + '" name="' + iframeId + '"></iframe>')
				.appendTo($(document.body))
				.css({ "display": "none" });
			$('<form method="post" id="' + formId +
				'" target="' + iframeId + '" enctype="multipart/form-data"></form>')
				.appendTo($(document.body))
				.css({ "display": "none" })
				.attr("action", url);
			form = $("#" + formId);
			filePicker.appendTo(form);
			form.submit();
			form.remove();

			$("#" + iframeId).ready(function () {
				setTimeout(function () {
					self._sendRequestFileSize(formNumber, key);
				}, self._const.timeoutGetFileSize);
			});

			filePicker.appendTo($("#" + self._id("_frm", formNumber)));
		},
		_removeGetFileSizeHTML: function (formNumber) {
			var iframeGetFileSize = $("#" + this._id("_fszifrm", formNumber)),
				formGetFileSize =  $("#" + this._id("_fszfrm", formNumber));

			iframeGetFileSize.remove();
			formGetFileSize.remove();
		},
		_sendRequestFileSize: function (formNumber, key) {
			/* called only in multiple upload mode when autostartupload is false */
			var self = this,
				o = this.options,
				singleFileData = this.getFileInfo(formNumber);

			/* check singleFileData is initialized - this means that it is sent request to server */
			if (singleFileData.sizeBytes !== 0) {
				return;
			}
			$.ajaxQueue("uploadrequestsqueue", {
				url: self._formatURL(o.progressUrl, $.param({ "key": key, "command": "fileSize" })),
				dataType: "json",
				cache: false,
				success: function (data) {
					var fileSize = parseInt(data.fileSize, 10);
					self._saveFileSize(fileSize, formNumber);
					self._removeGetFileSizeHTML(formNumber);
				},
				error: function () {
					self._setError(this._getLocaleValue("errorMessageAJAXRequestFileSize"),
						formNumber,
						self._const.clientSideErrorCode.ajaxErrorRequestFileSize, "clientside");
					self._removeGetFileSizeHTML(formNumber);
				}
			});
		},
		_saveFileSize: function (fileSize, formNumber) {
			var self = this,
				singleProgressBarId =  self._id("_snglpbar", formNumber),
				singleProgressBar = $("#" + singleProgressBarId),
				allFilesData = this.fileInfoData,
				singleFileData = this.getFileInfo(formNumber);

			if (isNaN(fileSize) === true) {
				return;
			}
			singleProgressBar.data("totalSize", fileSize);
			/* _spb feature */
			if (singleFileData !== null) {
				singleFileData.sizeBytes = fileSize;
				allFilesData.fileSizeTotal += fileSize;
				self._spbRenderProgress();
			}
			/* end of _spb feature */
			self._renderStatus(formNumber, 0, fileSize, false, singleFileData);
		},
		/* END OF Get file Size Before Start Upload */

		_onShowHideDetailsClick: function () {
			var self = this,
				fileContainer = $("#" + self._id("_fc")),
				marginTop = fileContainer.css("margin-top"),
				marginBottom = fileContainer.css("margin-bottom");

			/* Fix bug #73126 M.H. 27 May 2011 */
			if ($.ig.util.isIE7 || $.ig.util.isIEQuircks) {
				self._setShowHideDetailsButtonText(fileContainer.is(":hidden"));
				if (fileContainer.is(":hidden")) {
					fileContainer.show();
					/* M.H. 23 March 2012 Fix for bug #103089 */
					self._reRenderFileNames();
				} else {
					fileContainer.hide();
				}
				/* M.H. 26 March 2012 Fix for bug #103086 */
				self._setShowHideDetailsButtonText(fileContainer.is(":hidden"));
			} else {
				/* M.H. 11 May 2011 - fix bug 74559: When it is set height which is near the height of the whole widget - there is flicker effect because it is shown scrollbar
				*  Fix it as remove margin-top, bottom - if set */
				fileContainer.css({ "margin-top": 0, "margin-bottom": 0 });
				fileContainer.slideToggle(
					self._const.showHideDetailsAnimationTimeout,
					function () {
						/* M.H. 11 May 2011 - fix bug 74559: When it is set height which is near the height of the whole widget - there is flicker effect because it is shown scrollbar
						*  Fix it as remove margin-top, bottom - if set and when slideToggle finishes rollback original values */
						fileContainer.css({ "margin-top": marginTop, "margin-bottom": marginBottom });
						self._setShowHideDetailsButtonText(fileContainer.is(":hidden"));

						/* M.H. 27 Jul 2011 - fix bug 74266 - reRender FileNames when show details is clicked */
						if (fileContainer.is(":hidden") === false) {
							self._reRenderFileNames();
						}
					}
				);
			}
		},
		/* M.H. 27 Jul 2011 - fix bug 74266 - reRender FileNames */
		_reRenderFileNames: function () {
			var data = this.fileInfoData.filesInfo,
				l = data.length,
				i,
				originalFileName;

			for (i = 0; i < l; i++) {
				originalFileName = $("#" + this._id("_snglpbar", i)).data("originalFileName");
				/* first it should be set the original filename */
				$("#" + this._id("_pbrflnm", i)).text(originalFileName);
				this._renderFileName(i, 0, originalFileName);
			}
		},
		_setShowHideDetailsButtonText: function (isHidden) {
			var o = this.options,
				showHideDetailsButton = $("#" + this._id("_shdbtn"));

			if (isHidden) {
				showHideDetailsButton.text(this._getLocaleValue("labelShowDetails"));
				/* M.H. 12 May 2011 - fix bug 74763: add title to all buttons */
				showHideDetailsButton.attr({
					"data-localeid": "titleShowDetailsButton"
				});
			} else {
				showHideDetailsButton.text(this._getLocaleValue("labelHideDetails"));
				/* M.H. 12 May 2011 - fix bug 74763: add title to all buttons */
				showHideDetailsButton.attr({
					"data-localeid": "titleHideDetailsButton"
				});
			}
		},
		getFileInfoData: function () {
			/*
			Returns the information about uploading files - all files uploaded/uploading/pending
			returnType="object" Returns the information about uploading files
			```
				var fileInfo = $(".selector").igUpload("getFileInfoData");
			```
			*/
			return this.fileInfoData;
		},
		cancelAll: function () {
			/* Cancel all uploading and pending files
			```
				$(".selector").igUpload("cancelAll");
			```
			*/
			var i, data = this.fileInfoData,
				uploadingIDs = data.uploadingIDs,
				luploadingIDs = uploadingIDs.length,
				pendingIDs = data.pendingQueueIDs,
				lpendingIDs = pendingIDs.length,
				batch = data.batch,
				lbatch = batch.length;

			this.allCancelled = true;
			for (i = 0; i < luploadingIDs; i++) {
				if (uploadingIDs[ i ] !== undefined) {
					this.cancelUpload(uploadingIDs[ i ]);
				}
			}

			for (i = 0; i < lpendingIDs; i++) {
				if (pendingIDs[ i ] !== undefined) {
					this.cancelUpload(pendingIDs[ i ]);
				}
			}

			for (i = 0; i < lbatch; i++) {
				if (batch[ i ] !== undefined) {
					this.cancelUpload(batch[ i ]);
				}
			}

			uploadingIDs = [];
			pendingIDs = [];
			batch = [];
			$("#" + this._id("_spbtncncl")).data("ids", []);

			this.allCancelled = false;
		},
		_submitAllFormsUpload: function () {
			var self = this, i, id,
				idsToSubmit = this.fileInfoData.batch,
				l = idsToSubmit.length, pendingIDs = [];

			for (i = 0; i < l; i++) {
				id = idsToSubmit[ i ];
				if (self._checkCanUpload()) {
					/* M.H. 27 Jul 2011 - fix bug 77339 */
					/*self._addUploadingID(id); */
					self.startUpload(id);
					/*submittedIDs.push(id); */
				} else {
					self._addPendingId(id);
					pendingIDs.push(id);
				}
			}
			this.fileInfoData.batch = [];
			/*self._trigger(self.events.batchFileStartUpload, null, {submittedIDs: submittedIDs, pendingIDs: pendingIDs});*/
			/* we should clear ids array once we have submitted forms */
		},
		/* summaryProgressBar Initialization */
		_spbRenderInit: function () {
			var self = this, o = this.options,
				css = self.css,
				uploaderId = this._id("_fu"), labelSummaryButton = this._getLocaleValue("labelSummaryProgressButtonContinue"),
				summaryProgressContainerId = this._id("_spbcntr"),
				summaryProgressBarLabelId = this._id("_summpbrlbl"),
				summaryProgressBarId = this._id("_summpbar"),
				summaryProgressLabelId = this._id("_summplbl"),
				showHideDetailsId = this._id("_shdbtn"),
				summaryProgressButtonCancelId = this._id("_spbtncncl"),
				summaryProgressDetailsButtonId = this._id("_spdtlbtn"),
				summaryProgressBar,
				html = "",
				data,
				progressData = "progressData",
				/* M.H. 12 May 2011 - fix bug 74763: add title to all buttons */
				titleSummaryButton = this._getLocaleValue("titleSummaryProgressButtonContinue");

			html +=	 '<div id="$summaryProgressContainerId$">';
			html +=	 '	<div  class="' + css.summaryInformationContainerClass + '">';
			html += '		<span id="$summaryProgressLabelId$"  data-localeid="labelSummaryTemplate" ';
			html +=	 '			class="' + css.summaryUploadedFilesLabelClass + '"></span>';
			html += '		<a href="javascript:void(0);" id="$showHideDetailsId$" data-localeid="titleHideDetailsButton" ';
			html +=	 '			class="' + css.summaryShowHideDetailsButtonClass + '">$labelShowHideDetails$</a>';
			html +=	 "	</div>";
			html +=	 '	<div class="' + css.clearClass + '">';
			html +=	 '		<button id="$summaryProgressButtonCancelId$"></button>';
			html +=	 '		<div id="$summaryProgressBarId$"></div>';
			html +=	 "	</div>";
			html +=	 "</div>";
			html = html
					.replace("$summaryProgressContainerId$", summaryProgressContainerId)
					.replace("$summaryProgressLabelId$", summaryProgressLabelId)
					.replace("$summaryProgressDetailsButtonId$", summaryProgressDetailsButtonId)
					.replace("$summaryProgressBarId$", summaryProgressBarId)
					.replace("$showHideDetailsId$", showHideDetailsId)
					.replace("$labelShowHideDetails$", this._getLocaleValue("labelHideDetails"))
					.replace("$labelSummaryProgressButtonCancel$", this._getLocaleValue("labelSummaryProgressButtonCancel"))
					.replace("$summaryProgressButtonCancelId$", summaryProgressButtonCancelId);
			$(html).appendTo($("#" + uploaderId));

			/* data which keeps IDs of forms */
			data =	{
						IDs: {},
						CurrentUploadedFiles: 0,
						CurrentUploadedSize: 0,
						TotalFileSize: 0,
						TotalFiles: 0,
						UploadingFiles: 0
					};

			$("#" + summaryProgressContainerId)
				.data(progressData, data)
				.addClass(css.summaryProgressContainerClass + " " + css.clearClass);
			summaryProgressBar = $("#" + summaryProgressBarId);
			$('<span id="' + summaryProgressBarLabelId + '"></span>')
				.addClass(css.summaryProgressbarLabelClass)
				.appendTo(
					summaryProgressBar.igProgressBar({
						animate: self._const.isProgressBarAnimationEnabled,
						animateTimeout: self._const.animateProgressBarInterval,
						range: self._const.isProgressBarRange,
						value: 0,
						queue: false
					}).addClass(css.summaryProgressBarClass)
				);
			/* Add second span so when progress is over the label text to show specific color and those part of the labe to be in other color */
			$('<div id="' + summaryProgressBarLabelId + '_1"></div>')
				.width(summaryProgressBar.width())
				.addClass(css.summaryProgressBarSecondaryLabel)
				.appendTo($("#" + this._id("_summpbar_progress"))
				.addClass(css.summaryProgressBarInnerProgress));

			$("#" + showHideDetailsId).bind({
				click: function (event) {
					event.preventDefault();
					self._onShowHideDetailsClick();
				}
			});
			/* if autostartupload is false then bind onclick to submit all forms otherwise to cancel all upload forms */

			if (o.autostartupload) {
				labelSummaryButton = this._getLocaleValue("labelSummaryProgressButtonCancel");
				/* M.H. 12 May 2011 - fix bug 74763: add title to all buttons */
				titleSummaryButton = this._getLocaleValue("titleSummaryProgressButtonCancel");
				this.spbButtonMode = this.summaryButtonModes.cancel;
			}

			$("#" + summaryProgressButtonCancelId).igButton({
				labelText: labelSummaryButton,
				/* M.H. 12 May 2011 - fix bug 74763: add title to all buttons */
				title: titleSummaryButton,
				disabled: false,
				click: function (event) {
					event.preventDefault();
					self._spbOnClickButton(event);
				}
			}).addClass(css.summaryButtonClass);
		},
		_spbRenderProgress: function () {
			var o = this.options,
				summaryProgressBar = $("#" + this._id("_summpbar")),
				summaryProgressLabel = $("#" + this._id("_summplbl")),
				summaryProgressBarLabel = $("#" + this._id("_summpbrlbl")),
				summaryProgressBarLabel1 = $("#" + this._id("_summpbrlbl_1")),
				textSummaryProgressBarLabel = "",
				value = 0,
				data = this.fileInfoData,
				fileSizeTotal = data.fileSizeTotal,
				fileSizeUploaded = data.fileSizeUploaded;

			if (fileSizeTotal !== 0 && isNaN(fileSizeTotal) === false) {
				value = (fileSizeUploaded / fileSizeTotal) * 100;
			} else if (fileSizeTotal === 0) {
				value = 0;
			}

			if (data.countUploadingFiles === data.countTotalFiles) {
				if (data.countTotalFiles === 0) {
					value = 0;
				} else {
					value = 100;
				}
				/* M.H. 7 Jan 2013 Fix for bug #129538 */
				data.fileSizeUploaded = fileSizeTotal;
				fileSizeUploaded = fileSizeTotal;
			}
			summaryProgressBar.igProgressBar("option", "value", value);
			/* M.H. 13 May 2011 - fix bug 75042 */
			textSummaryProgressBarLabel = this._getLocaleValue("labelSummaryProgressBarTemplate").replace("{0}",
																					this._formatFileSize(fileSizeUploaded)).replace("{1}",
																					this._formatFileSize(fileSizeTotal)).replace("{2}",
																					value);
			summaryProgressLabel.html(this._getLocaleValue("labelSummaryTemplate").replace("{0}",
										data.countUploadingFiles).replace("{1}",
										data.countTotalFiles));
			summaryProgressBarLabel.text(textSummaryProgressBarLabel);
			summaryProgressBarLabel1.text(textSummaryProgressBarLabel);
		},
		_spbOnClickButton: function (event) {
			var modes = this.summaryButtonModes, m = this.spbButtonMode;
			event.preventDefault();
			if (m === modes.cancel) {
				this._trigger(this.events.cancelAllClicked, event, { owner: this });
				this.cancelAll();
			} else if (m === modes.startupload) {
				this._spbSubmitAllButton();
			}
		},
		_spbSubmitAllButton: function () {
			this._submitAllFormsUpload();
			/* then bind to button cancel action */
			this._spbCheckModeButton();
			/*this._spbSetCancelButton(); */
		},
		_spbCheckModeButton: function () {
			var allFilesData = this.fileInfoData;

			if (this.options.autostartupload) {
				if (allFilesData.pendingQueueIDs.length > 0 || allFilesData.uploadingIDs.length > 0) {
					this._spbSetCancelButton();
				} else {
					this._spbSetButtonDone();
				}
			} else {
				if (allFilesData.pendingQueueIDs.length === 0 && allFilesData.uploadingIDs.length === 0) {
					if (allFilesData.batch.length > 0) {
						this._spbSetContinueButton();
					} else {
						this._spbSetButtonDone();
					}
				} else {
					this._spbSetCancelButton();
				}
			}
		},
		/* Set different Modes for the Summary Button - Cancel, Done, Submit */
		_spbSetButtonDone: function () {
			/* submit all forms and enable cancel action */
			var o = this.options,
				button = $("#" + this._id("_spbtncncl"));
			this.spbButtonMode = this.summaryButtonModes.done;
			/* M.H. 12 May 2011 - fix bug 74763: add title to all buttons */
			button.igButton("option", {
				"labelText": this._getLocaleValue("labelSummaryProgressButtonDone"),
				"title": this._getLocaleValue("titleSummaryProgressButtonDone"),
				"disabled": true
			});
		},
		_spbSetContinueButton: function () {
			/* submit all forms and enable cancel action */
			var o = this.options,
				button = $("#" + this._id("_spbtncncl"));
			this.spbButtonMode = this.summaryButtonModes.startupload;
			button.igButton({
				/* M.H. 12 May 2011 - fix bug 74763: add title to all buttons */
				title: this._getLocaleValue("titleSummaryProgressButtonContinue"),
				labelText: this._getLocaleValue("labelSummaryProgressButtonContinue"),
				disabled: false
			});
		},
		_spbSetCancelButton: function () {
			/* enable button(for summary progress bar) and set its label/title */
			var cancelButton = $("#" + this._id("_spbtncncl"));

			this.spbButtonMode = this.summaryButtonModes.cancel;
			/* M.H. 12 May 2011 - fix bug 74763: add title to all buttons */
			cancelButton.igButton("option", {
				"labelText": this._getLocaleValue("labelSummaryProgressButtonCancel"),
				"title": this._getLocaleValue("titleSummaryProgressButtonCancel"),
				"disabled": false
			});
		},
		/* // End of Summary Functions */
		/*************** HELPER FUNCTION ********************/

		/**************** FILE INFO ********************/
		getFileInfo: function (fileIndex) {
			/*Returns the information about the file by specified file identifier. It could be file which is uploading/uploaded or uploading is not started. If there isn"t file with the specified file id returns null
			paramType="number" unique identifier of the file
			returnType="object" Returns the information about uploading files. The object contains these properties, path, key - unique id used in GET requests to get status from the server side, file - file object containing main info for the uploading file, formNumber, serverMessage- message returned by the server(optional), sizeBytes - total size, status, uploadedBytes, xhr(if the browser supports HTML5 file API)
			```
				var fileInfo = $(".selector").igUpload("getFileInfo", 0);
			```
			*/
			var fid = this.fileInfoData.filesInfo[ fileIndex ];
			if (fid === undefined || fid === null) {
				return null;
			}

			return fid;
		},
		/**************** // FILE INFO ********************/
		_formatFilePath: function (file) {
			var ind = file.lastIndexOf("/");

			file = file.replace(/(\/|\\)$/, "");
			if (ind === -1) {
				ind = file.lastIndexOf("\\");
			}
			return file.substring(ind + 1);
		},
		/* async Simultaneously upload */
		_checkCanUpload: function () {
			var o = this.options,
				data = this.fileInfoData,
				canUpload = true,
				maxSimultaneousFilesUploads = o.maxSimultaneousFilesUploads;

			if (o.mode === "multiple" && maxSimultaneousFilesUploads !== null &&
				data.uploadingIDs.length >= maxSimultaneousFilesUploads) {
				canUpload = false;
				if (maxSimultaneousFilesUploads <= 0) {
					this._setError(this._getLocaleValue("errorMessageMaxSimultaneousFiles"), null,
						this._const.clientSideErrorCode.checkCanUpload, "clientside");
				}
			}
			return canUpload;
		},
		_addPendingId: function (id) {
			this.fileInfoData.pendingQueueIDs.push(id);
		},
		_removePendingId: function (formNumber) {
			var pendingIDs = this.fileInfoData.pendingQueueIDs, id;

			if (formNumber !== undefined && formNumber !== null) {
				id = formNumber;
				this.fileInfoData.pendingQueueIDs = this._removeElementFromArray(pendingIDs, id);
			} else {
				id = pendingIDs.shift();
				if (id === undefined) {
					id = null;
				}
			}
			return id;
		},
		_addUploadingID: function (id) {
			this.fileInfoData.uploadingIDs.push(id);
		},
		_removeUploadingID: function (id) {
			this.fileInfoData.uploadingIDs = this._removeElementFromArray(this.fileInfoData.uploadingIDs,
																			id);
		},
		_addIDBatch: function (id) {
			this.fileInfoData.batch.push(id);
		},
		_removeIDBatch: function (id) {
			this.fileInfoData.batch = this._removeElementFromArray(this.fileInfoData.batch, id);
		},
		_submitNextPendingId: function () {
			var self = this, nextFormToSubmitId;

			if (self._checkCanUpload() === true) {
				nextFormToSubmitId = self._removePendingId();
				if (nextFormToSubmitId !== null) {
					/* M.H. 27 Jul 2011 - fix bug 77339 */
					/*self._addUploadingID(nextFormToSubmitId); */
					self.startUpload(nextFormToSubmitId);
				}
			}
		},
		/* End of async Simultaneously upload */
		_randomString: function (stringLength) {
			var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz",
				randomstring = "", i, rnum;
			for (i = 0; i < stringLength; i++) {
				rnum = Math.floor(Math.random() * chars.length);
				randomstring += chars.substring(rnum, rnum + 1);
			}
			return randomstring;
		},
		_cutFilePath: function (fileName, length) {
			var fileNameSize = fileName.length;
			if (fileNameSize <= length) {
				return fileName;
			}
		},
		_getOnlyFileName: function (fileName) {
			var delimeter = "";

			if (fileName === null || fileName === undefined) {
				return "";
			}

			if (fileName.indexOf("/") !== -1) {
				delimeter = "/";
			} else if (fileName.indexOf("\\") !== -1) {
				delimeter = "\\";
			}

			if (delimeter !== "") {
				fileName = fileName.substr(fileName.lastIndexOf(delimeter) + 1);
			}

			return fileName;
		},
		_getFileExtension: function (fileName) {
			return fileName.substring(fileName.lastIndexOf(".") + 1);
		},
		_validateFileExtension: function (fileName, callEvent, formNumber) {
			var ext = "", arrE = this.options.allowedExtensions, res, noCancel;
			/* if the array with extension is empty than validation always returns true */
			if (arrE.length === 0) {
				return true;
			}
			ext = fileName.substring(fileName.lastIndexOf(".") + 1);
			/* M.H. 2 June 2014 Fix for bug #172983: Client side validation for file extension is case sensitive for igUpload */
			noCancel = this._trigger(this.events.fileExtensionsValidating,
									 this,
									 { fileName: fileName, fileExtension: ext, owner: this });
			ext = ext.toLowerCase();
			res = $.inArray(ext, arrE) >= 0;
			if ((callEvent === true && res === false) || !noCancel) {
				res = false;
				this._setError(this._getLocaleValue("errorMessageValidatingFileExtension"), formNumber,
							this._const.clientSideErrorCode.extensionValidation, "clientside");
			}
			return res;
		},
		_getFileExtensionIconPath: function (ext) {
			/* search array for the specified extension, if could not find search for default
			/* even if ext is empty the function will return again default icon(if specified) */
			var arrIE = this.options.fileExtensionIcons, i, icon = "", l = arrIE.length;

			ext = String(ext).toLowerCase();
			for (i = 0; i < l; i++) {
				if (arrIE[ i ].ext !== undefined &&
					(arrIE[ i ].ext === ext || $.inArray(ext, arrIE[ i ].ext) !== -1)) {
					icon = arrIE[ i ].css;
					break;
				}
				if (icon === "" &&
					(arrIE[ i ].def === true || ($.isArray(arrIE[ i ].ext) && arrIE[ i ].ext.length === 0))) {
					/* M.H. 27 Jul 2011 - fix bug 77162 - Default icon could be those which has property def true OR ext.length is 0 */
					icon = arrIE[ i ].css;
				}
			}
			return icon;
		},
		_setError: function (message, fileId, errorCode, errorType, serverMessage) {
			/* error handling
			/* error message, errorCode - type int, errorType - serverside|clientside */
			var eArgs, o = this.options,
				errC = this._const.errorCode;

			if (serverMessage === undefined) {
				serverMessage = "";
			}

			if (errorType === "serverside") {
				/* M.H. 11 May 2011 - fix bug 74621: Add messages for most common errors */
				switch (errorCode) {
				case errC.MimeTypeValidation:
					message = this._getLocaleValue("errorMessageValidatingFileExtension");
					break;
				case errC.FileSizeExceeded:
					message = this._getLocaleValue("errorMessageMaxFileSizeExceeded");
					break;
				}
			}
			/* M.H. 12 Feb 2013 Fix for bug #129469 */
			this._spbCheckModeButton();
			eArgs = {
				fileId: fileId,
				errorCode: errorCode,
				errorMessage: message,
				errorType: errorType,
				serverMessage: serverMessage,
				owner: this
			};
			this._trigger(this.events.onError, null, eArgs);
		},
		/* convert functions */
		_formatFileSize: function (val) {
			/* val in bytes */
			var fsm = this.options.fileSizeMetric, res = val;

			switch (fsm) {
			case "bytes":
				res = val + "B";
				break;
			case "kbytes":
				res = this._convertToKBytes(val);
				break;
			case "mbytes":
				res = this._convertToMBytes(val);
				break;
			case "gbytes":
				res = this._convertToGBytes(val);
				break;
			case "auto":
				if (val < 1024) {
					res = val + "B";
				} else if (val < 1024 * 1024) { //1MB
					res = this._convertToKBytes(val);
				} else if (val < 1024 * 1024 * 1024) { //1GB
					res = this._convertToMBytes(val);
				} else {
					res = this._convertToGBytes(val);
				}
				break;
			default:
				break;
			}
			return res;
		},
		_convertToKBytes: function (val) {
			var res = val / 1024;
			return res.toFixed(this.options.fileSizeDecimalDisplay) + "KB";
		},
		_convertToMBytes: function (val) {
			var res = val / (1024 * 1024);

			return res.toFixed(this.options.fileSizeDecimalDisplay) + "MB";
		},
		_convertToGBytes: function (val) {
			var res = val / (1024 * 1024 * 1024);

			return res.toFixed(this.options.fileSizeDecimalDisplay) + "GB";
		},
		/* end of convert functions */
		/* Array Functions */
		_removeElementArrayById: function (array, keyValue) {
			if (array === undefined || array === null) {
				return [];
			}

			return $.grep(array, function (n) {
				return (n.id !== keyValue);
			});
		},
		_removeElementFromArray: function (array, keyValue) {
			if (array === undefined || array === null) {
				return [];
			}
			return $.grep(array, function (n) {
				return (n !== keyValue);
			});
		},
		_stringToJSONObject: function (s) {
			/* parses the string and returns an evaluated JSON object. If it is not possible to parse it return false
			paramType="string" the JSON as string.
			*/
			var data = {};
			try {
				data = JSON.parse(s);
			} catch (e) {
				return false;
			}
			return data;
		},
		_stringToXmlObject: function (s) {
			/* parses a string and returns a jQuery representation of the XML Document. If it is not possible to parse it - return false
			paramType="string" jQuery object
			*/
			var $xml;
			try {
				$xml = $(s);
			} catch (e) {
				return false;
			}
			if (!$xml.length) {
				return false;
			}
			return $xml;
		}
		/*************** HELPER FUNCTION ********************/
	});
	$.extend($.ui.igUpload, { version: "<build_number>" });
	return $.ui.igUpload;// REMOVE_FROM_COMBINED_FILES
}));// REMOVE_FROM_COMBINED_FILES
