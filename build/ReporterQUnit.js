var report = "",
	newTestErrors = false,
	testsFailed = false,
	modulesInTest = "",
	errorsTableHTML = "",
	exceptionCounter = 1,
	reportIndex = 0,
	tableHeader = "<tr style='background-color:#E8FFCF;'><th>Module Names</th><th>Passed</th><th>Failed</th><th>Total</th><th>Execution Time</th></tr>",
	totalPassed, totalFailed, totalTotal, totalTime;

module.exports.writeReport = function (phase, done) {
	var fs,
		date = new Date();

	if (phase === "init") {
		totalPassed = 0;
		totalFailed = 0;
		totalTotal = 0;
		totalTime = 0;
		exceptionCounter = 1;
		report += "<body><head></head><body>";
		report += "<h2>QUnit for build: jQuery_{{build_number}}</h2><br />" + date;
		report += "<table border=1 cellpadding=5 cellspacing=0 style='font-family:Verdana; font-size:11pt; border-width:1px; border: 1px solid black;width:600px;'>";
		report += tableHeader;
	}
	else if (phase === "finalize") {
		fs = require('fs');
		var color = totalFailed ? "#FFEDF1;" : "#E8FFCF;"
		report = report.replace(tableHeader, tableHeader + "<tr style='background-color:" + color + "; font-weight: bold;'><td>TOTAL</td><td>" + totalPassed + "</td><td>" + totalFailed + "</td><td>" + totalTotal + "</td><td>" + totalTime + " ms</td></tr>");
		report += "</table>" + errorsTableHTML + "</body></html>";

		if (!fs.existsSync("./qunit/")) {
			fs.mkdirSync("./qunit/");
		}

		// Write the HTML report
		fs.writeFile("./qunit/report.html", report, function (err) {
			if (err) {
				fs.writeFile("./qunit/err", "The Qunit report was not created due to the following error:" + err);
			} else {
				console.log("The Qunit report was created");
			}
			done();
		});
	}
}

module.exports.initModule = function (name) {
	modulesInTest += name;
	modulesInTest += "<br />";
};

module.exports.endModule = function (name, failed, passed, total, duration) {
	var fs;
	if (errorsTableHTML !== "") {
		errorsTableHTML += "</table>";
	}
	newTestErrors = false;
	if(failed && !testsFailed) {
		fs = require('fs');
		testsFailed = true;
		if (!fs.existsSync("./qunit/")) {
			fs.mkdirSync("./qunit/");
		}
		fs.writeFile("./qunit/err", "One of the tests has failed");
	}
};

module.exports.endTest = function(failed, passed, total, runtime) {
	var color = failed ? "#FFEDF1;" : "#E8FFCF;",
		name, nameHref, testRunDetails;

	name = modulesInTest.replace(/<br\s\/?>/mg, "_");
	name = name.replace(/\s/mg, "_");
	name = name.replace(/\./mg, "_");
	if (failed > 0) {
		if (modulesInTest === "") {
			modulesInTest = "Exception in the test #" + exceptionCounter;
			name = exceptionCounter;
			exceptionCounter++;
		}
		nameHref = "<a href='#" + name + "'>" + modulesInTest + "</a>";
	} else {
		if (modulesInTest === "") {
			name = modulesInTest = "No modules defined in the test file";
		}
		nameHref = modulesInTest;
	}
	report += "<tr style='background-color:" + color + "'><td>" + nameHref + "</td><td>" + passed + "</td><td>" + failed + "</td><td>" + total + "</td><td>" + runtime + " ms</td></tr>";
	errorsTableHTML = errorsTableHTML.replace(/{{modulesInTest}}/mg, name);

	testRunDetails = new Object();
	testRunDetails["Passes"] = passed;
	testRunDetails["Fails"] = failed;
	testRunDetails["Duration"] = runtime;
	testRunDetails["FunctionalArea"] = name; // TODO
	testRunDetails["Scenario"] = name;
	testRunDetails["DeviceType"] = { "DeviceName": "PhantomJS" };

	totalPassed += passed;
	totalFailed += failed;
	totalTotal += total;
	totalTime += runtime;
	modulesInTest = "";
};

module.exports.onError = function (message, source, result, actual, expected) {
	var fs, name, 
		isReferenceErr = message && message.indexOf("ReferenceError") >= 0,
		preModule = "";

	if (isReferenceErr) {
		totalFailed++;
		preModule = "MODULE PRECEDING ";

	}
	if (!newTestErrors) {
		newTestErrors = true;
		errorsTableHTML += "<h2 name='{{modulesInTest}}' id='{{modulesInTest}}'>Error Details</h2>";
		errorsTableHTML += "<table border=1 cellpadding=5 cellspacing=0 style='background-color:#FFEDF1; font-family:Verdana; font-size:11pt; border-width:1px; border: 1px solid black;width:600px;'>";
		errorsTableHTML += "<tr><th>Test modules: " + preModule + "{{modulesInTest}}</th></tr>";
	}

	errorsTableHTML += "<tr><td>";
	if (actual === expected && (message === "" || isReferenceErr)) {
		errorsTableHTML += "<b>There is a missing reference or there is a JavaSciprt error/exception in the test HTML file</b><br />";
	} else {
		errorsTableHTML += "<b>Actual Result:</b> " + actual + " <span style='background-color: #E8FFCF'><b>Expected Result:</b> " + expected + "</span><br />";
	}
	errorsTableHTML += "<b>Message Error:</b> " + message + "<br />" +
			"<b>Source:</b> " + source + "<br /><br />" +
		"</td></tr>";

	if (!testsFailed) {
		fs = require('fs');
		testsFailed = true;
		if (!fs.existsSync("./qunit/")){
			fs.mkdirSync("./qunit/");
		}
		fs.writeFile("./qunit/err", "Failed due to an error");
	}
}