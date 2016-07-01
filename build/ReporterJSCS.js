module.exports = function (errors) {
		var reportHtmlJS = "",
			errorHtmlJS = "",
			iError = 0, fileName = "",
			error = null, errorLine = 0, errorCode, errorReason, fs,
			date = new Date(), isDummy = false;
		
		reportHtmlJS += "<body><head></head><body>";
		reportHtmlJS += "<h2>JSCS for build: jQuery_{{build_number}} </h2><br />" + date;
		reportHtmlJS += "<p>Check JSCS from console using 'grunt cs' or 'grunt cs:controlName'.";
		reportHtmlJS += "<table border=1 cellpadding=5 cellspacing=0 style='font-family:Verdana; font-size:11pt; border-width:1px; border: 1px solid black;width:600px;'>";

		for (iErr = 0; iErr < errors.length; iErr++) {

			errorInFile = errors[iErr];
			fileName = errorInFile._file._filename;
			fileName = fileName.replace("src/js/", "");
			fileNameLink = fileName.replace("/", "_");
			fileNameLink = fileNameLink.replace(/\./mg, "_");
			fileNameLink = fileNameLink.replace("extensions/", "");
			fileNameLink = fileNameLink.replace("modules/", "");
			fileNameLink = fileNameLink.replace("infragistics.", "");
			fileNameLink = fileNameLink.replace(".js", "");
			
			fileErrors = errorInFile.getErrorList();
			fileErrorsCount = errorInFile.getErrorCount();
			
			if (fileErrorsCount === 0) {
				reportHtmlJS += "<tr><td style='background-color:#E8FFCF;'>" + fileName + "</td><td style='background-color:#E8FFCF;'>passed</td></tr>";
			} else {
				reportHtmlJS += "<tr><td style='background-color:#FFEDF1;'><a href='#" + fileNameLink + "'>" + fileName + "</a></td><td style='background-color:#FFEDF1;'>failed: " + fileErrorsCount + " errors</td></tr>";
			}
			if (fileErrors && fileErrors.length > 0) {
				errorHtmlJS += "<h2 name='" + fileNameLink + "' id='" + fileNameLink + "'>File: " + fileName + "</h2>";
				errorHtmlJS += "<table border=1 cellpadding=5 cellspacing=0 style='background-color:#FFEDF1; font-family:Verdana; font-size:11pt; border-width:1px; border: 1px solid black;width:600px;'>";
				errorHtmlJS += "<tr style='background-color:#E8FFCF;'><th>Line Number</th><th>Error Code</th><th>Error Reason</th></tr>";
				for(iError = 0; iError < fileErrors.length; iError++ ) {
					error = fileErrors[iError];
					errorLine = (error && error.line) ? error.line.toString() : "";
					errorRule = (error && error.rule) ? error.rule.toString() : "";
					errorReason = (error && error.message) ? error.message.toString() : "";
					if (errorReason.indexOf("Unsupported rule: files") < 0) { // This is bug in node-module https://github.com/jscs-dev/grunt-jscs/issues/114
						errorHtmlJS += "<tr>" +
										"<td>" + errorLine + "</td>" +
										"<td>" + errorRule + "</a></td>" +
										"<td>" + errorReason + "</td>" +
									"</tr>";
					} else {
						isDummy = true;
					}
				}
				errorHtmlJS += "</table><br/>";
				if (fileErrors.length === 1 && isDummy) {
					errorHtmlJS = "";
				}
			}			
		}
		reportHtmlJS += "</table>";
		reportHtmlJS += errorHtmlJS;
		reportHtmlJS += "</body></body>";

		// Write the HTML report
		process.stdout.write(reportHtmlJS);

		fs = require('fs');
		if (errorHtmlJS.length > 0) {
			if (!fs.exists("./jscs")) {
				fs.mkdir("./jscs");
				fs.writeFile("./jscs/err", "JsCS Failed", function (err) {
					if (err) {
						return console.log(err);
					}
					console.log("The 'err' file was saved!");
				});
			}
		}
};