module.exports = {
	reporter: function (errors, files) {
		var reportHtml = "",
			errorHtml = "",
			reportJSON = "",
			jsonObj, testRunDetails, iFile, iError, file, fileName,
			error, errorLine, errorCode, errorReason, fs, CodeAnalysisRunDetail,
			date = new Date();
		
		reportHtml += "<body><head></head><body>";
		reportHtml += "<h2>JSHint for build: jQuery_{{build_number}} </h2><br />" + date;
		reportHtml += "<p>Check JSHint from console using 'grunt hint' or 'grunt hint:controlName' or go to <a href='http://www.jshint.com/' target='_blank'>http://www.jshint.com/</a> and paste the code.</p>";
		reportHtml += "<p>More about <a href='http://www.jshint.com/docs/' target='_blank'>JSHint.</a></p>";
		// http://jshint.com/docs/#options
			reportHtml += "<table border=1 cellpadding=5 cellspacing=0 style='font-family:Verdana; font-size:11pt; border-width:1px; border: 1px solid black;width:600px;'>";

		// JSON report
		jsonObj = new Object();
		jsonObj["RunOn"] = date;
		jsonObj["CodeAnalysisRunDetail"] = [];

		for (iFile = 0; iFile < files.length; iFile++) {


			file = files[iFile];
			fileName = file.file.replace("src/js/", "");
			fileNameLink = fileName.replace("/", "_");
			fileNameLink = fileNameLink.replace(/\./mg, "_");
			fileNameLink = fileNameLink.replace("extensions/", "");
			fileNameLink = fileNameLink.replace("modules/", "");
			fileNameLink = fileNameLink.replace("infragistics.", "");
			fileNameLink = fileNameLink.replace(".js", "");
			if (!file.errors) {
				reportHtml += "<tr><td style='background-color:#E8FFCF;'>" + fileName + "</td><td style='background-color:#E8FFCF;'>passed</td></tr>";
			} else {
				reportHtml += "<tr><td style='background-color:#FFEDF1;'><a href='#" + fileNameLink + "'>" + fileName + "</a></td><td style='background-color:#FFEDF1;'>failed: " + file.errors.length + " errors</td></tr>";
			}
			if(file.errors){
				errorHtml += "<h2 name='" + fileNameLink + "' id='" + fileNameLink + "'>File: " + fileName + "</h2>";
				errorHtml += "<table border=1 cellpadding=5 cellspacing=0 style='background-color:#FFEDF1; font-family:Verdana; font-size:11pt; border-width:1px; border: 1px solid black;width:600px;'>";
				errorHtml += "<tr style='background-color:#E8FFCF;'><th>Line Number</th><th>Error Code</th><th>Error Reason</th></tr>";
				for(iError = 0; iError < file.errors.length; iError++ ) {
					error = file.errors[iError];
					errorLine = (error && error.line) ? error.line.toString() : "";
					errorCode = (error && error.code) ? error.code.toString() : "";
					errorReason = (error && error.reason) ? error.reason.toString() : "";
					errorHtml += "<tr>" + 
									"<td>" + errorLine + "</td>" +
									"<td><a href='https://github.com/jshint/jshint/blob/master/src/messages.js' target='_blank'>" + errorCode + "</a></td>" +
									"<td>" + errorReason + "</td>" +
								"</tr>";
				}
				errorHtml += "</table><br/>";
			}

			// JSON report
			fileNameJSON = fileName.replace("modules/", "");
			fileNameJSON = fileNameJSON.replace("extensions/", "");
			CodeAnalysisRunDetail = new Object();
			CodeAnalysisRunDetail["OverallAnalysisPercent"] = file.errors ? 0 : 100;
			if (file.errors) {
				CodeAnalysisRunDetail["ErrorCount"] = file.errors.length;
			}
			CodeAnalysisRunDetail["FunctionalArea"] = fileNameJSON;
			jsonObj["CodeAnalysisRunDetail"].push(CodeAnalysisRunDetail);
		}
		reportHtml += "</table>";
		reportHtml += errorHtml;
		reportHtml += "</body></body>";

		reportJSON = JSON.stringify(jsonObj);

		fs = require('fs');
		if (!fs.existsSync("./jshint/")) {
			fs.mkdir("./jshint");
		}

		// Wirite the JSON report
		fs.writeFile("./jshint/report.json", reportJSON);

		// Write the HTML report
		process.stdout.write(reportHtml);

		if (errors.length > 0) {
			fs.writeFile("./jshint/err", "JsHint Failed");
		}
	}
};