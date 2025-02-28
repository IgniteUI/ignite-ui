QUnit.module("igUpload unit tests", {
	assert: null,
	divTag: '<div></div>',
	before: function () {
		var mockServer = new $.mockServer();
		$.mockjax({
			url: 'http://localhost/asdfasdf*',
			responseTime: 100,
			contentType: 'text/json',
			/*
			responseText: {
			bytesUploaded: 3785397, status: 2, size: 3785397
			}
			*/
			response: function (settings) {
				//alert(getParam('command', settings.url)); //settings.url + ' ' +
				var results = new RegExp('[\\?&]' + 'key' + '=([^&#]*)').exec(settings.url),
					key = results ? (results[1] || 0) : null,
					response = mockServer.processRequest(key);
				this.responseText = response;
			}
		});
	},
	uploadNewFile: function (uploaderId, isInitial = false) {
		var filePicker = isInitial ? $('#' + uploaderId + '_ibb_fp') : $('#' + uploaderId + '_bb_fp'),
			eventFileChange = jQuery.Event("change");

		filePicker.trigger(eventFileChange, { filePath: 'test.xml' });
	},
	checkUploadingData: function (uploaderId, formNumber) {
		var fu = uploaderId + '_' + formNumber;
		this.assert.equal($('#' + fu + '__ifrm').length, 1, 'Iframe is properly set');
		this.assert.equal($('#' + fu + '__frm').length, 1, 'Iframe is properly set');
		this.assert.equal($('#' + fu + '__frm').attr('target'), fu + '__ifrm', 'Iframe is properly set');
		this.assert.ok($('#' + fu + '__icn').hasClass(($('#' + uploaderId).igUpload('option', 'fileExtensionIcons'))[0].css), 'Because file is not defined the icon should be default');
	},
	checkUploadedData: function (uploaderId, formNumber) {
		var fu = uploaderId + '_' + formNumber,
			uploader = $('#' + uploaderId);
		text = $('#' + fu + '__pbrflsz').text().split('/');
		this.assert.equal(text[0], text[1], 'In progress bar uploaded file size should be equal to total file size.');
		this.assert.equal($('#' + fu + '__snglpbar').igProgressBar('option', 'value'), 100, 'Upload completion should be 100%.');
		this.assert.equal($('#' + fu + '__cbtn').igButton('option', 'disabled'), true, 'Cancel button should be disabled.');
	},
	checkUploading: function (data, uploaderId) {
		var uploader = $('#' + uploaderId),
			innerData = uploader.data('igUpload').fileInfoData,
			fileId = data.fileId,
			filePath = data.filePath,
			totalSize = data.totalSize,
			uploadedBytes = data.uploadedBytes,
			fileStatus = data.fileStatus,
			self = this,
			maxSimultaneousFiles = uploader.igUpload('option', 'maxSimultaneousFilesUploads');

		//fileInfo[fileId] = {fileId: fileId, filePath: filePath, totalSize: totalSize, uploadedBytes: uploadedBytes, fileStatus: fileStatus};

		this.assert.ok((fileStatus === 1 || fileStatus === 2), 'Status should be started or finished.');
		this.assert.ok(totalSize >= uploadedBytes, 'Total size should be greater or equal than uploaded bytes');
		if (maxSimultaneousFiles === 1) {
			/*
			if (fileInfo[fileId + 1] !== undefined) {
			ok (fileStatus === 2, 'When maxSimultaneousFiles it is possible to be uploaded only 1 file at the same time - chech next file.');
			}

			if (fileInfo[fileId - 1] !== undefined) {
			ok ((fileInfo[fileId - 1].fileStatus === 2), 'When maxSimultaneousFiles it is possible to be uploaded only 1 file at the same time - check previous file.'+ fileInfo[fileId - 1].fileStatus +' ' +fileInfo[fileId].fileStatus);
			}
			*/
		}
		//check whether inner data is properly set
		this.checkFileSizeUploaded(innerData.fileSizeUploaded, innerData.fileSizeTotal, innerData.filesInfo);

		if (fileStatus === 1) {
			this.assert.ok(uploadedBytes < totalSize, 'Uploaded bytes should be less than total size when status is started.');
			this.assert.equal($('#' + uploaderId + '_' + fileId + '__cbtn').igButton('option', 'disabled'), false, 'Cancel button should be enabled.');
			this.checkUploadingData(uploaderId, fileId);
		} else if (fileStatus === 2) {
			//totalCountUploadedFiles++;
			this.assert.equal(uploadedBytes, totalSize, 'Uploaded bytes should be equal to total size when status is finished.');
			//equal (totalCountUploadedFiles, innerData.countUploadingFiles, 'Count of uploading files should be equal to the inner data.');
			$('#' + uploaderId).on("iguploadfileuploaded", function (event, data) {
				self.checkUploadedData(uploaderId, fileId);
				$('#' + uploaderId).off("iguploadfileuploaded");
			});
			//equal( $('#' + uploaderId + '_clrabtn').igButton('option', 'disabled'), false, 'When the file is uploaded Clear All button should be enabled.');
		}
	},
	checkCancelFile: function (uploaderId, formId) {
		var innerData = $('#' + uploaderId).data('igUpload').fileInfoData;

		this.assert.equal($('#' + uploaderId + '_' + formId + '__fus').length, 0, 'Container of the canceled file should be removed.');
		this.assert.equal(innerData.fileSizeTotal, innerData.fileSizeUploaded, 'File size total should be the same as file size uploaded.');
		this.assert.equal(innerData.countUploadingFiles, innerData.countTotalFiles, 'Count uploading files should be the same as count total files in inner data.');
	},
	checkFileSizeUploaded: function (uploaded, total, array) {
		var t = 0, u = 0, i;
		return;
		for (i in array) {
			if (isNaN(i)) {
				continue;
			}
			t += array[i].sizeBytes;
			u += array[i].uploadedBytes;
		}

		this.assert.equal(t, total, 'Total from inner array should be the same as calculated total file size.');
		this.assert.equal(u, uploaded, 'Uploaded size from inner array should be the same as calculated uploaded size.');
	},
	checkFileCountUploaded: function (uploaded, array) {
		var u = 0;

		for (i in array) {
			if (array[i].status === 2) {
				u += 1;
			}
		}

		this.assert.equal(u, uploaded, 'Uploaded files from inner array should be the same as calculated count files.');
	},
	checkClearAllButton: function (uploaderId) {
		var clearAllButton = $('#' + uploaderId + '_clrabtn'),
			click = jQuery.Event("click"),
			innerData = $('#' + uploaderId).data('igUpload').fileInfoData,
			filesInfo = innerData.filesInfo,
			i, file;

		click.button = 0;
		clearAllButton.trigger(click);

		for (i in filesInfo) {
			file = filesInfo[i];
			if (file !== undefined &&
				(file.status === 4 ||
					file.status === 2 ||
					file.status === 5 ||
					file.status === 3)) {
				this.assert.equal($('#' + uploaderId + '_' + i + '__fus').length, 0, 'The file container should be removed as DOM element.');
			}
		}
	},
	checkFormDestroyed: function (uploaderId, formId) {
		var id = uploaderId + '_' + formId;
		this.assert.equal($('#' + id + '__ifrm').length, 0, 'Iframe should be removed.');
		this.assert.equal($('#' + id + '__frm').length, 0, 'Form should be removed.');
		this.assert.equal($('#' + id + '__frm_if').length, 0, 'Input type file should be removed.');
	}
});

QUnit.test('[ID1] igUpload MULTIPLE MODE test cancel multiple files while uploading', function (assert) {
	assert.expect(25);

	// MULTIPLE UPLOAD test Cancel multiple upload
	var uploaderId = "igUpload15",
		uploader = $.ig.TestUtil.appendToFixture(this.divTag, { id: uploaderId }),
		click = jQuery.Event("click"),
		innerData, filesInfo,
		self = this,
		done = assert.async();

	uploader.igUpload({
		mode: 'multiple', //Multiple
		autostartupload: true,
		progressUrl: 'http://localhost/asdfasdf'
	});

	this.assert = assert;
	click.button = 0;
	this.uploadNewFile(uploaderId, true);
	this.uploadNewFile(uploaderId);
	this.uploadNewFile(uploaderId);

	$.ig.TestUtil.wait(300).then(function () {
		var buttonSummaryCancel = $('#' + uploaderId + '_spbtncncl');
		buttonSummaryCancel.trigger(click);
		return $.ig.TestUtil.wait(100);
	}).then(function () {
		assert.equal($('#' + uploaderId + '_spbtncncl').igButton('option', 'disabled'), true, 'Cancel button should be disabled because all files are uploaded.');

		innerData = uploader.data('igUpload').fileInfoData;

		self.checkCancelFile(uploaderId, 1);
		self.checkFormDestroyed(uploaderId, 1);

		self.checkCancelFile(uploaderId, 2);
		self.checkFormDestroyed(uploaderId, 2);

		self.checkCancelFile(uploaderId, 3);
		self.checkFormDestroyed(uploaderId, 3);

		filesInfo = innerData.filesInfo;
		assert.equal(innerData.countUploadingFiles, innerData.countTotalFiles, 'Inner data count total files should be the same as uploaded files');
		assert.equal(innerData.fileSizeUploaded, innerData.fileSizeTotal, 'Inner data total file size should be the same as uploaded file size.');
		l = filesInfo.length;
		assert.equal(filesInfo[0].status, 4, 'Last file should be with status canceled.');
		assert.equal(filesInfo[1].status, 4, 'Last file should be with status canceled.');
		assert.equal(filesInfo[2].status, 4, 'Last file should be with status canceled.');

		self.checkFileSizeUploaded(innerData.fileSizeUploaded, innerData.fileSizeTotal, filesInfo);
		self.checkFileCountUploaded(innerData.countTotalFiles, filesInfo);
		uploader.igUpload("destroy");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('[ID2] igUpload SINGLE MODE test start upload new file', function (assert) {
	assert.expect(5);

	var uploaderId = "igUpload2",
		uploader = $.ig.TestUtil.appendToFixture(this.divTag, { id: uploaderId });
	uploader.igUpload({
		mode: 'single',
		autostartupload: true,
		progressUrl: 'http://localhost/asdfasdf'
	});

	var filePicker = $('#' + uploaderId + '_ibb_fp'),
		initBrowseButton = $('#' + uploaderId + '_ibb');

	this.uploadNewFile(uploaderId, true);

	//check what exactly is shown
	assert.notOk(initBrowseButton.is(':visible'), 'Init browse button should be hidden');
	assert.ok($('#' + uploaderId + '_fc').length > 0, 'Main container should be shown');
	assert.equal($('#' + uploaderId + '_bb').igBrowseButton('option', 'disabled'), true, 'Browse button should be disabled while file is uploading.');
	assert.equal($('#' + uploaderId + '_0__cbtn').igButton('option', 'disabled'), false, 'Cancel button should be enabled while file is uploading.');
	assert.equal(uploader.data('igUpload').fileInfoData.filesInfo.length, 1, 'Inner data array should have only 1 file');
});

QUnit.test('[ID3] igUpload SINGLE MODE resource test', function (assert) {
	assert.expect(7);

	this.assert = assert;
	var uploaderId = "igUpload3",
		uploader = $.ig.TestUtil.appendToFixture(this.divTag, { id: uploaderId });
	uploader.igUpload({
		mode: 'single',
		autostartupload: true,
		progressUrl: 'http://localhost/asdfasdf'
	});

	this.uploadNewFile(uploaderId, true);
	var data = uploader.data('igUpload').fileInfoData;
	assert.equal(data.formNumber, 1, "FormNumber should be 1");
	this.checkUploadingData(uploaderId, 0);
	assert.equal(data.filesInfo.length, 1, "Array for filesinfo should have only 1 item");
	assert.equal(data.filesInfo[0].sizeBytes, 0, 'Array for filesinfo filesize of the first file is not yet got from the server');
});

QUnit.test('[ID4] igUpload SINGLE MODE resource test finish file', function (assert) {
	assert.expect(10);

	// test file uploaded event triggering
	this.assert = assert;
	var uploaderId = "igUpload4",
		uploader = $.ig.TestUtil.appendToFixture(this.divTag, { id: uploaderId }),
		self = this,
		done = assert.async(),
		innerData;
	uploader.igUpload({
		mode: 'single',
		autostartupload: true,
		progressUrl: 'http://localhost/asdfasdf'
	});

	uploader.on("iguploadfileuploaded", function (event, data) {
		innerData = uploader.data('igUpload').fileInfoData;
		self.checkUploadedData(uploaderId, 0);
		assert.equal($('#' + uploaderId + '_bb').igBrowseButton('option', 'disabled'), false, 'Browse button should be enabled when file is uploaded.');
		assert.equal(innerData.filesInfo[0].uploadedBytes, innerData.filesInfo[0].sizeBytes, 'Status of the file should be finished.');
		assert.equal(data.fileId, 0, 'Data passed to the event handler should be correct - check id is 0.');
		assert.equal(data.filePath, '', 'FilePath should be empty because it is not specified.');
		self.checkFormDestroyed(uploaderId, 0);
		uploader.off("iguploadfileuploaded");
	});

	this.uploadNewFile(uploaderId, true);

	$.ig.TestUtil.wait(2000).then(function () {
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
	// alert($('#igUpload1').data('igUpload').fileInfoData)//summaryButtonModes.startupload
	// equal(summaryProgressButton.igButton('option', 'disabled'), false, 'Summary progress button should be enabled before start');
});

QUnit.test('[ID5] igUpload SINLGLE MODE upload new file', function (assert) {
	assert.expect(5);

	var uploaderId = "igUpload5",
		uploader = $.ig.TestUtil.appendToFixture(this.divTag, { id: uploaderId }),
		self = this,
		done = assert.async();
	uploader.igUpload({
		mode: 'single', //Multiple
		autostartupload: true,
		progressUrl: 'http://localhost/asdfasdf'
	});

	this.uploadNewFile(uploaderId, true);

	$.ig.TestUtil.wait(2000).then(function () {
		self.uploadNewFile(uploaderId);
		return $.ig.TestUtil.wait(300);
	}).then(function () {
		//check what exactly is shown
		assert.ok($('#' + uploaderId + '_fc').length > 0, 'Main container should be shown');
		assert.equal($('#' + uploaderId + '_bb').igBrowseButton('option', 'disabled'), true, 'Browse button should be disabled while file is uploading.');
		assert.equal($('#' + uploaderId + '_1__cbtn').igButton('option', 'disabled'), false, 'Cancel button should be enabled while file is uploading.');
		assert.equal(uploader.data('igUpload').fileInfoData.filesInfo.length, 2, 'Inner data array should have only 2 files.');
		assert.equal($('#' + uploaderId + '_fc').children().length, 1, 'There should be ONLY 1 file container for uploaded file.');
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('[ID6] igUpload SINLGLE MODE cancel file while uploading', function (assert) {
	assert.expect(4);

	//SINGLE MODE test cancel
	this.assert = assert;
	var uploaderId = "igUpload6",
		uploader = $.ig.TestUtil.appendToFixture(this.divTag, { id: uploaderId }),
		self = this,
		done = assert.async(),
		click = jQuery.Event("click"),
		innerData;
	uploader.igUpload({
		mode: 'single', //Multiple
		autostartupload: true,
		progressUrl: 'http://localhost/asdfasdf'
	});

	this.uploadNewFile(uploaderId, true);

	$.ig.TestUtil.wait(1200).then(function () {
		self.uploadNewFile(uploaderId);
		return $.ig.TestUtil.wait(200);
	}).then(function () {
		var cancelButton = $('#' + uploaderId + '_1__cbtn');
		click.button = 0;
		cancelButton.trigger(click);
		return $.ig.TestUtil.wait(200);
	}).then(function () {
		assert.equal($('#' + uploaderId + '_1__snglpbar').length, 0, 'Progressbar should be hidden.');
		assert.equal($('#' + uploaderId + '_1__cbtn').length, 0, 'Cancel button should be hidden.');
		assert.equal($('#' + uploaderId + '_bb').igBrowseButton('option', 'disabled'), false, 'Browse button should be enabled when file is canceled.');
		innerData = uploader.data('igUpload').fileInfoData;
		assert.equal(innerData.filesInfo.length, 2, 'Count of all files in innerdata should be 2.');
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('[ID9] igUpload MULTIPLE MODE - AUTOSTARTUPLOAD start uploading test', function (assert) {
	assert.expect(16);

	var uploaderId = "igUpload9",
		uploader = $.ig.TestUtil.appendToFixture(this.divTag, { id: uploaderId }),
		initBrowseButton = $('#' + uploaderId + '_ibb'),
		browseButton = $('#' + uploaderId + '_bb'),
		clearAllButton = $('#' + uploaderId + '_clrabtn'),
		summaryProgressContainer = $('#' + uploaderId + '_spbcntr'),
		showHideDetailsButton = $('#' + uploaderId + '_shdbtn'),
		innerData;
	uploader.igUpload({
		mode: 'multiple', //Multiple
		autostartupload: true,
		progressUrl: 'http://localhost/asdfasdf'
	});

	//eventFileChange.filePicker = 0;
	this.uploadNewFile(uploaderId, true);
	this.uploadNewFile(uploaderId);
	this.uploadNewFile(uploaderId);

	//check what exactly is shown
	assert.notOk(initBrowseButton.is(':visible'), 'Init browse button should be hidden');
	assert.equal($('#' + uploaderId + '_clrabtn').length, 1, 'Clear all button should be shown.');
	assert.ok($('#' + uploaderId + '_clrabtn').igButton('option', 'disabled') === true, 'Clear all button should be disabled.');
	assert.equal($('#' + uploaderId + '_bb').length, 1, 'Browse button should be shown.');
	assert.equal($('#' + uploaderId + '_spbcntr').length, 1, 'Summary progress bar should be shown.');
	assert.equal($('#' + uploaderId + '_shdbtn').length, 1, 'Show/hide details is shown.');

	assert.equal($('#' + uploaderId + '_shdbtn').text(), $.ig.Upload.locale.labelHideDetails, 'Show/hide details is shown.');
	assert.equal($('#' + uploaderId + '_summpbar').igProgressBar('option', 'value'), 0, 'Summary progress bar should have 0 value at the beginning.');

	//checkStartUploadData
	var fu1 = uploaderId + '_0';
	assert.equal($('#' + fu1 + '__snglpbar').igProgressBar('option', 'value'), 0, 'Upload completion should be 100%.');
	assert.equal($('#' + fu1 + '__cbtn').igButton('option', 'disabled'), false, 'Cancel button should be disabled.');

	var fu2 = uploaderId + '_1';
	assert.equal($('#' + fu2 + '__snglpbar').igProgressBar('option', 'value'), 0, 'Upload completion should be 100%.');
	assert.equal($('#' + fu2 + '__cbtn').igButton('option', 'disabled'), false, 'Cancel button should be disabled.');

	var fu3 = uploaderId + '_1';
	assert.equal($('#' + fu3 + '__snglpbar').igProgressBar('option', 'value'), 0, 'Upload completion should be 100%.');
	assert.equal($('#' + fu3 + '__cbtn').igButton('option', 'disabled'), false, 'Cancel button should be disabled.');

	innerData = $('#' + uploaderId).data('igUpload').fileInfoData
	assert.equal(innerData.formNumber, 3, 'Inner data formnumber should be 3.');
	assert.equal(innerData.filesInfo.length, 3, 'Inner data filesinfo array should have length 3.');
});

QUnit.test('[ID10] igUpload MULTIPLE MODE - AUTOSTARTUPLOAD event handling uploading test', function (assert) {
	assert.expect(42);

	// test file uploaded event triggering
	this.assert = assert;
	var uploaderId = "igUpload10",
		uploader = $.ig.TestUtil.appendToFixture(this.divTag, { id: uploaderId }),
		done = assert.async(),
		self = this,
		innerData;

	uploader.igUpload({
		mode: 'multiple', //Multiple
		autostartupload: true,
		progressUrl: 'http://localhost/asdfasdf',
		fileUploading: fileUploaderHandler
	});

	this.uploadNewFile(uploaderId, true);
	this.uploadNewFile(uploaderId);
	this.uploadNewFile(uploaderId);

	function fileUploaderHandler(event, data) {
		innerData = uploader.data('igUpload').fileInfoData;
		self.checkUploading(data, uploaderId);
		assert.ok(data.uploadedBytes <= data.totalSize, "Event argument uploadedBytes should be less than totalSize");
		if (innerData.countUploadingFiles === innerData.countTotalFiles) {
			uploader.off("iguploadfileuploading", fileUploaderHandler);
			$.ig.TestUtil.wait(500).then(function () {
				assert.equal($('#' + uploaderId + '_summpbar').igProgressBar('option', 'value'), 100, 'Summary progress bar should be 100%.');
				assert.equal(innerData.countTotalFiles, 3, 'Count total files should be 3');
				assert.equal($('#' + uploaderId).data('igUpload').fileInfoData.countUploadingFiles, 3, 'Count uploading files should be 3');
				self.checkUploadedData(uploaderId, 0);
				self.checkUploadedData(uploaderId, 1);
				self.checkUploadedData(uploaderId, 2);
				done();
			}).catch(function (er) {
				assert.pushResult({ result: false, message: er.message });
				done();
				throw er;
			});
		}
	}
});

QUnit.test('[ID14] igUpload MULTIPLE MODE test show/hide details', function (assert) {
	assert.expect(2);

	var uploaderId = "igUpload14",
		uploader = $.ig.TestUtil.appendToFixture(this.divTag, { id: uploaderId }),
		done = assert.async();

	uploader.igUpload({
		mode: 'multiple', //Multiple
		autostartupload: true,
		progressUrl: 'http://localhost/asdfasdf'
	});

	this.uploadNewFile(uploaderId, true);
	this.uploadNewFile(uploaderId);
	this.uploadNewFile(uploaderId);

	// MULTIPLE UPLOAD Show/Hide Details
	var click = jQuery.Event("click"),
		buttonShowHideDetails = $('#' + uploaderId + '_shdbtn');
	buttonShowHideDetails.trigger(click);

	$.ig.TestUtil.wait(500).then(function () {
		assert.equal($('#' + uploaderId + '_fc').is(':hidden'), true, 'File container should be hidden.');
		buttonShowHideDetails.trigger(click);
		assert.equal($('#' + uploaderId + '_fc').is(':hidden'), false, 'File container should be hidden.');
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('[ID15] igUpload test init browse button - width and label', function (assert) {
	assert.expect(1);

	var uploaderId = "igUpload1",
		uploader = $.ig.TestUtil.appendToFixture(this.divTag, { id: uploaderId });
	uploader.igUpload({
		mode: 'single',
		autostartupload: true,
		progressUrl: 'http://localhost/asdfasdf'
	});

	var initBrowseButton = $('#' + uploaderId + '_ibb'),
		filePicker = $('#' + uploaderId + '_ibb_fp'),
		widthUploadInitBrowseButton = uploader.igUpload('option', 'initBrowseButtonWidth'),
		widthBrowseButton = initBrowseButton.igBrowseButton('option', 'width'),
		label = 'upload it now',
		width = '200';

	uploader.igUpload('option', 'locale', { 'labelUploadButton': label });
	assert.equal(label, initBrowseButton.text(), 'Label of the browse button at startup should be the same as those set in options');
});

QUnit.test('[ID16] igUpload MULTIPLE MODE - NOT AUTOSTARTUPLOAD test file selecting', function (assert) {
	assert.expect(5);

	var uploaderId = "igUpload16",
		uploader = $.ig.TestUtil.appendToFixture(this.divTag, { id: uploaderId }),
		innerData;

	uploader.igUpload({
		mode: 'multiple', //Multiple
		autostartupload: false,
		progressUrl: 'http://localhost/asdfasdf'
	});

	this.uploadNewFile(uploaderId, true);
	this.uploadNewFile(uploaderId);

	this.assert = assert;
	innerData = uploader.data('igUpload').fileInfoData;
	this.checkClearAllButton(uploaderId);
	assert.equal(innerData.countUploadingFiles, 0, 'Count uploading files should be 0.');
	assert.equal(innerData.countTotalFiles, 2, 'Count total files should be 2.');
	//equal ($('#igUpload_fu_mainContainer').length, 1, 'File container should be initialized.');
	assert.equal($('#' + uploaderId + '_ibb').is(':hidden'), true, 'Browse button on startup should be hidden.');
	assert.equal($('#' + uploaderId + '_clrabtn').igButton('option', 'disabled'), true, 'Clear all button should be disabled.');
	assert.equal($('#' + uploaderId + '_spbtncncl').igButton('option', 'disabled'), false, 'Cancel button should be enabled.');
});

QUnit.test('[ID17] igUpload MULTIPLE MODE - NOT AUTOSTARTUPLOAD test start uploading batch of files', function (assert) {
	assert.expect(6);

	this.assert = assert;
	var uploaderId = "igUpload17",
		uploader = $.ig.TestUtil.appendToFixture(this.divTag, { id: uploaderId }),
		innerData,
		click = jQuery.Event("click"),
		self = this,
		done = assert.async();

	uploader.igUpload({
		mode: 'multiple', //Multiple
		autostartupload: false,
		progressUrl: 'http://localhost/asdfasdf'
	});

	this.uploadNewFile(uploaderId, true);
	this.uploadNewFile(uploaderId);

	click.button = 0;
	$.ig.TestUtil.wait(700).then(function () {
		var buttonSummaryProgress = $('#' + uploaderId + '_spbtncncl');
		buttonSummaryProgress.trigger(click);
		buttonSummaryProgress.trigger(click);
		return $.ig.TestUtil.wait(200);
	}).then(function () {
		var innerData = uploader.data('igUpload').fileInfoData;
		assert.equal(innerData.batch.length, 0, 'Inner array for batch should be with length 0.');
		assert.equal(innerData.countUploadingFiles, 0, 'Inner data of count uploading files should be 0.');
		assert.equal($('#' + uploaderId + '_summpbar').igProgressBar('option', 'value'), 0, 'Summary progress bar should be 0% because all files are removed.');
		assert.equal($('#' + uploaderId + '_spbtncncl').igButton('option', 'disabled'), true, 'Cancel button should be disabled because there are no files to upload.');
		self.checkClearAllButton(uploaderId);
		//equal($('#' + self.uploaderId + '_clrabtn').igButton('option', 'disabled'), true, 'Clear uploaded button should be enabled - all files are hidden');
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

// //bug 243975
QUnit.test('[ID20] igUpload test if text is correct when container has offset left', function (assert) {
	assert.expect(1);

	var uploaderId = "igUpload20",
		uploader = $.ig.TestUtil.appendToFixture(this.divTag, { id: uploaderId });
	uploader.igUpload({
		mode: 'multiple',
		controlId: "serverID1"
	});

	//Simulate file selection
	var filePicker = $('#' + uploaderId + '_ibb_fp'),
		eventFileChange = jQuery.Event("change");
	filePicker.trigger(eventFileChange);
	uploader.data("igUpload")._onBrowseButtonFileSelected(eventFileChange, false, { filePath: "FileWithLoooongText.xml", files: [{ name: "FileWithLoooongText.xml", size: 1 }], multiple: true });
	//Verify text
	var uploadFileNameContainer = $('#' + uploaderId + '_1__fus').find("span.ui-igupload-progressbar-filename");
	assert.equal(uploadFileNameContainer.text(), "FileWithLoooongText.xml", "File text should be correct.");
});

QUnit.test('[ID21] igUpload test one request multiple uploads', function (assert) {
	assert.expect(4);

	var uploaderId = "igUpload21",
		uploader = $.ig.TestUtil.appendToFixture(this.divTag, { id: uploaderId }),
		click = jQuery.Event("click");

	uploader.igUpload({
		mode: 'multiple',
		controlId: 'serverID1',
		useSingleRequest: true,
		progressUrl: 'http://localhost/asdfasdf'
	});

	this.uploadNewFile(uploaderId, true);
	this.uploadNewFile(uploaderId);
	this.uploadNewFile(uploaderId);

	var uploadButton = $('#' + uploaderId + '_spbtncncl');
	click.button = 0;
	uploadButton.trigger(click);

	var innerData = uploader.data('igUpload').fileInfoData,
		filesInfo = innerData.filesInfo, xhr = filesInfo[innerData.countTotalFiles - 1].xhr;

	assert.ok(innerData.countTotalFiles == 3, "There should be 3 total files");

	for (var i = 0; i < innerData.countTotalFiles; i++) {
		if (xhr) {
			assert.equal(xhr, filesInfo[i].xhr, "All the files should be sent with one XHR request");
		}
		xhr = filesInfo[i].xhr;
	}
});
