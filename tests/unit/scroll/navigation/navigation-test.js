QUnit.module("igScroll navigation unit tests", {
	contentScrollVH: '<table width="800" style="border: 1px solid #777777;">' +
		"<thead>" +
		"<th>Product ID</th>" +
		"<th>Name</th>" +
		"<th>Product Number</th>" +
		"<th>Make</th>" +
		"<th>Finished Goods</th>" +
		"<th>Color</th>" +
		"<th>Safety Stock Level</th>" +
		"<th>Reorder Point</th>" +
		"<th>Standard Const</th>" +
		"<th>List Price</th>" +
		"<th>Days to Manufacture</th>" +
		"<th>Modified Date</th>" +
		"</thead>" +
		"<t#testBed>" +
		"<tr><td>1</td><td>Adjustable Race</td><td>AR-5381</td><td>false</td><td>false</td><td>&nbsp;</td><td>1000</td><td>750</td><td >0</td><td>0</td><td>0</td><td>3/11/2004</td></tr>" +
		"<tr><td>2</td><td>Bearing Ball</td><td>BA-8327</td><td>false</td><td>false</td><td>&nbsp;</td><td>1000</td><td>750</td><td>0</td><td>0</td><td>0</td><td>3/11/2004</td></tr>" +
		"<tr><td>3</td><td>BB Ball Bearing</td><td>BE-2349</td><td>true</td><td>false</td><td>&nbsp;</td><td>800</td><td>600</td><td>0</td><td>0</td><td>1</td><td>3/11/2004</td></tr>" +
		"<tr><td>4</td><td>Headset Ball Bearings</td><td>BE-2908</td><td>false</td><td>false</td><td>&nbsp;</td><td>800</td><td>600</td><td>0</td><td>0</td><td>0</td><td>3/11/2004</td></tr>" +
		"<tr><td>316</td><td>Blade</td><td>BL-2036</td><td>true</td><td>false</td><td>&nbsp;</td><td>800</td><td>600</td><td>0</td><td>0</td><td>1</td><td>3/11/2004</td></tr>" +
		"<tr><td>317</td><td>LL Crankarm</td><td>CA-5965</td><td>false</td><td>false</td><td>Black</td><td>500</td><td>375</td><td>0</td><td>0</td><td>0</td><td>3/11/2004</td></tr>" +
		"<tr><td>318</td><td>ML Crankarm</td><td>CA-6738</td><td>false</td><td>false</td><td>Black</td><td>500</td><td>375</td><td>0</td><td>0</td><td>0</td><td>3/11/2004</td></tr>" +
		"<tr><td>319</td><td>HL Crankarm</td><td>CA-7457</td><td>false</td><td>false</td><td>Black</td><td>500</td><td>375</td><td>0</td><td>0</td><td>0</td><td>3/11/2004</td></tr>" +
		"<tr><td>320</td><td>Chainring Bolts</td><td>CB-2903</td><td>false</td><td>false</td><td>Silver</td><td>1000</td><td>750</td><td>0</td><td>0</td><td>0</td><td>3/11/2004</td></tr>" +
		"<tr><td>321</td><td>Chainring Nut</td><td>CN-6137</td><td>false</td><td>false</td><td>Silver</td><td>1000</td><td>750</td><td>0</td><td>0</td><td>0</td><td>3/11/2004</td></tr>" +
		"<tr><td>322</td><td>Chainring</td><td>CR-7833</td><td>false</td><td>false</td><td>Black</td><td>1000</td><td>750</td><td>0</td><td>0</td><td>0</td><td>3/11/2004</td></tr>" +
		"<tr><td>323</td><td>Crown Race</td><td>CR-9981</td><td>false</td><td>false</td><td>&nbsp;</td><td>1000</td><td>750</td><td>0</td><td>0</td><td>0</td><td>3/11/2004</td></tr>" +
		"<tr><td>324</td><td>Chain Stays</td><td>CS-2812</td><td>true</td><td>false</td><td>&nbsp;</td><td>1000</td><td>750</td><td>0</td><td>0</td><td>1</td><td>3/11/2004</td></tr>" +
		"<tr><td>325</td><td>Decal 1</td><td>DC-8732</td><td>false</td><td>false</td><td>&nbsp;</td><td>1000</td><td>750</td><td>0</td><td>0</td><td>0</td><td>3/11/2004</td></tr>" +
		"<tr><td>326</td><td>Decal 2</td><td>DC-9824</td><td>false</td><td>false</td><td>&nbsp;</td><td>1000</td><td>750</td><td>0</td><td>0</td><td>0</td><td>3/11/2004</td></tr>" +
		"<tr><td>327</td><td>Down Tube</td><td>DT-2377</td><td>true</td><td>false</td><td>&nbsp;</td><td>800</td><td>600</td><td>0</td><td>0</td><td>1</td><td>3/11/2004</td></tr>" +
		"<tr><td>328</td><td>Mountain End Caps</td><td>EC-M092</td><td>true</td><td>false</td><td>&nbsp;</td><td>1000</td><td>750</td><td>0</td><td>0</td><td>1</td><td>3/11/2004</td></tr>" +
		"<tr><td>329</td><td>Road End Caps</td><td>EC-R098</td><td>true</td><td>false</td><td>&nbsp;</td><td>1000</td><td>750</td><td>0</td><td>0</td><td>1</td><td>3/11/2004</td></tr>" +
		"<tr><td>330</td><td>Touring End Caps</td><td>EC-T209</td><td>true</td><td>false</td><td>&nbsp;</td><td>1000</td><td>750</td><td>0</td><td>0</td><td>1</td><td>3/11/2004</td></tr>" +
		"<tr><td>331</td><td>Fork End</td><td>FE-3760</td><td>true</td><td>false</td><td>&nbsp;</td><td>800</td><td>600</td><td>0</td><td>0</td><td>1</td><td>3/11/2004</td></tr>" +
		"<tr><td>332</td><td>Freewheel</td><td>FH-2981</td><td>false</td><td>false</td><td>Silver</td><td>500</td><td>375</td><td>0</td><td>0</td><td>0</td><td>3/11/2004</td></tr>" +
		"<tr><td>341</td><td>Flat Washer 1</td><td>FW-1000</td><td>false</td><td>false</td><td>&nbsp;</td><td>1000</td><td>750</td><td>0</td><td>0</td><td>0</td><td>3/11/2004</td></tr>" +
		"<tr><td>342</td><td>Flat Washer 6</td><td>FW-1200</td><td>false</td><td>false</td><td>&nbsp;</td><td>1000</td><td>750</td><td>0</td><td>0</td><td>0</td><td>3/11/2004</td></tr>" +
		"<tr><td>343</td><td>Flat Washer 2</td><td>FW-1400</td><td>false</td><td>false</td><td>&nbsp;</td><td>1000</td><td>750</td><td>0</td><td>0</td><td>0</td><td>3/11/2004</td></tr>" +
		"<tr><td>344</td><td>Flat Washer 9</td><td>FW-3400</td><td>false</td><td>false</td><td>&nbsp;</td><td>1000</td><td>750</td><td>0</td><td>0</td><td>0</td><td>3/11/2004</td></tr>" +
		"<tr><td>345</td><td>Flat Washer 4</td><td>FW-3800</td><td>false</td><td>false</td><td>&nbsp;</td><td>1000</td><td>750</td><td>0</td><td>0</td><td>0</td><td>3/11/2004</td></tr>" +
		"<tr><td>346</td><td>Flat Washer 3</td><td>FW-5160</td><td>false</td><td>false</td><td>&nbsp;</td><td>1000</td><td>750</td><td>0</td><td>0</td><td>0</td><td>3/11/2004</td></tr>" +
		"<tr><td>347</td><td>Flat Washer 8</td><td>FW-5800</td><td>false</td><td>false</td><td>&nbsp;</td><td>1000</td><td>750</td><td>0</td><td>0</td><td>0</td><td>3/11/2004</td></tr>" +
		"<tr><td>348</td><td>Flat Washer 5</td><td>FW-7160</td><td>false</td><td>false</td><td>&nbsp;</td><td>1000</td><td>750</td><td>0</td><td>0</td><td>0</td><td>3/11/2004</td></tr>" +
		"<tr><td>349</td><td>Flat Washer 7</td><td>FW-9160</td><td>false</td><td>false</td><td>&nbsp;</td><td>1000</td><td>750</td><td>0</td><td>0</td><td>0</td><td>3/11/2004</td></tr>" +
		"<tr><td>350</td><td>Fork Crown</td><td>FC-3654</td><td>true</td><td>false</td><td>&nbsp;</td><td>800</td><td>600</td><td>0</td><td>0</td><td>1</td><td>3/11/2004</td></tr>" +
		"<tr><td>351</td><td>Front Derailleur Cage</td><td>FC-3982</td><td>false</td><td>false</td><td>Silver</td><td>800</td><td>600</td><td>0</td><td>0</td><td>0</td><td>3/11/2004</td></tr>" +
		"<tr><td>352</td><td>Front Derailleur Linkage</td><td>FL-2301</td><td>false</td><td>false</td><td>Silver</td><td>800</td><td>600</td><td>0</td><td>0</td><td>0</td><td>3/11/2004</td></tr>" +
		"<tr><td>355</td><td>Guide Pulley</td><td>GP-0982</td><td>false</td><td>false</td><td>&nbsp;</td><td>800</td><td>600</td><td>0</td><td>0</td><td>0</td><td>3/11/2004</td></tr>" +
		"<tr><td>356</td><td>LL Grip Tape</td><td>GT-0820</td><td>false</td><td>false</td><td>&nbsp;</td><td>800</td><td>600</td><td>0</td><td>0</td><td>0</td><td>3/11/2004</td></tr>" +
		"<tr><td>357</td><td>ML Grip Tape</td><td>GT-1209</td><td>false</td><td>false</td><td>&nbsp;</td><td>800</td><td>600</td><td>0</td><td>0</td><td>0</td><td>3/11/2004</td></tr>" +
		"<tr><td>358</td><td>HL Grip Tape</td><td>GT-2908</td><td>false</td><td>false</td><td>&nbsp;</td><td>800</td><td>600</td><td>0</td><td>0</td><td>0</td><td>3/11/2004</td></tr>" +
		"<tr><td>359</td><td>Thin-Jam Hex Nut 9</td><td>HJ-1213</td><td>false</td><td>false</td><td>&nbsp;</td><td>1000</td><td>750</td><td>0</td><td>0</td><td>0</td><td>3/11/2004</td></tr>" +
		"<tr><td>360</td><td>Thin-Jam Hex Nut 10</td><td>HJ-1220</td><td>false</td><td>false</td><td>&nbsp;</td><td>1000</td><td>750</td><td>0</td><td>0</td><td>0</td><td>3/11/2004</td></tr>" +
		"<tr><td>361</td><td>Thin-Jam Hex Nut 1</td><td>HJ-1420</td><td>false</td><td>false</td><td>&nbsp;</td><td>1000</td><td>750</td><td>0</td><td>0</td><td>0</td><td>3/11/2004</td></tr>" +
		"<tr><td>362</td><td>Thin-Jam Hex Nut 2</td><td>HJ-1428</td><td>false</td><td>false</td><td>&nbsp;</td><td>1000</td><td>750</td><td>0</td><td>0</td><td>0</td><td>3/11/2004</td></tr>" +
		"<tr><td>363</td><td>Thin-Jam Hex Nut 15</td><td>HJ-3410</td><td>false</td><td>false</td><td>&nbsp;</td><td>1000</td><td>750</td><td>0</td><td>0</td><td>0</td><td>3/11/2004</td></tr>" +
		"<tr><td>364</td><td>Thin-Jam Hex Nut 16</td><td>HJ-3416</td><td>false</td><td>false</td><td>&nbsp;</td><td>1000</td><td>750</td><td>0</td><td>0</td><td>0</td><td>3/11/2004</td></tr>" +
		"<tr><td>365</td><td>Thin-Jam Hex Nut 5</td><td>HJ-3816</td><td>false</td><td>false</td><td>&nbsp;</td><td>1000</td><td>750</td><td>0</td><td>0</td><td>0</td><td>3/11/2004</td></tr>" +
		"<tr><td>366</td><td>Thin-Jam Hex Nut 6</td><td>HJ-3824</td><td>false</td><td>false</td><td>&nbsp;</td><td>1000</td><td>750</td><td>0</td><td>0</td><td>0</td><td>3/11/2004</td></tr>" +
		"<tr><td>367</td><td>Thin-Jam Hex Nut 3</td><td>HJ-5161</td><td>false</td><td>false</td><td>&nbsp;</td><td>1000</td><td>750</td><td>0</td><td>0</td><td>0</td><td>3/11/2004</td></tr>" +
		"<tr><td>368</td><td>Thin-Jam Hex Nut 4</td><td>HJ-5162</td><td>false</td><td>false</td><td>&nbsp;</td><td>1000</td><td>750</td><td>0</td><td>0</td><td>0</td><td>3/11/2004</td></tr>" +
		"<tr><td>369</td><td>Thin-Jam Hex Nut 13</td><td>HJ-5811</td><td>false</td><td>false</td><td>&nbsp;</td><td>1000</td><td>750</td><td>0</td><td>0</td><td>0</td><td>3/11/2004</td></tr>" +
		"<tr><td>370</td><td>Thin-Jam Hex Nut 14</td><td>HJ-5818</td><td>false</td><td>false</td><td>&nbsp;</td><td>1000</td><td>750</td><td>0</td><td>0</td><td>0</td><td>3/11/2004</td></tr>" +
		"<tr><td>371</td><td>Thin-Jam Hex Nut 7</td><td>HJ-7161</td><td>false</td><td>false</td><td>&nbsp;</td><td>1000</td><td>750</td><td>0</td><td>0</td><td>0</td><td>3/11/2004</td></tr>" +
		"<tr><td>372</td><td>Thin-Jam Hex Nut 8</td><td>HJ-7162</td><td>false</td><td>false</td><td>&nbsp;</td><td>1000</td><td>750</td><td>0</td><td>0</td><td>0</td><td>3/11/2004</td></tr>" +
		"<tr><td>373</td><td>Thin-Jam Hex Nut 12</td><td>HJ-9080</td><td>false</td><td>false</td><td>&nbsp;</td><td>1000</td><td>750</td><td>0</td><td>0</td><td>0</td><td>3/11/2004</td></tr>" +
		"<tr><td>374</td><td>Thin-Jam Hex Nut 11</td><td>HJ-9161</td><td>false</td><td>false</td><td>&nbsp;</td><td>1000</td><td>750</td><td>0</td><td>0</td><td>0</td><td>3/11/2004</td></tr>" +
		"</t#testBed>" +
		"</table>" +
		"<div>Text text</div>",
	id: function (name) {
		return "#" + name;
	},
	vhScrollId: "elemVH",
	elemContainer: "elemVH_container",
	vhScroll: function () {
		return $(this.id(this.vhScrollId))
	},
	scrollContainer: function (id) {
		return $(this.id(id) + "_container");
	},
	beforeEach: function () {
		$("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
	},
	afterEach: function () {
		this.vhScroll().remove();
	}
});
var testId_1 = 'pressig down arrow key scrolls down small increment test.';
var testId_2 = 'pressing up arrow key scrolls up small increment test.';
var testId_3 = 'pressing left arrow key scrolls left small increment test.';
var testId_4 = 'pressing right arrow key scrolls right small increment test.';
var testId_5 = 'pressing page down key scrolls down big increment test.';
var testId_6 = 'pressing page up key scrolls up big increment test.';
var testId_7 = 'pressing spacebar scrolls down big increment test.';
var testId_8 = 'pressing spacebar+shift scrolls up big increment test.';
var testId_9 = 'tabindex is added on the container as well if the main element has tabindex.';

QUnit.test(testId_1, function (assert) {
	assert.expect(1);
	this.vhScroll().igScroll();
	// Simulate keydown of backspace event
	var downPressEvent = jQuery.Event("keydown", { keyCode: $.ui.keyCode.DOWN });

	this.scrollContainer(this.vhScrollId).focus();
	this.scrollContainer(this.vhScrollId).trigger(downPressEvent);
	assert.equal(this.scrollContainer(this.vhScrollId).scrollTop(), 40, "scrolled down small increment");
});

QUnit.test(testId_2, function (assert) {
	assert.expect(1);
	this.vhScroll().igScroll({
		scrollTop: 100
	});
	// Simulate keydown of backspace event
	var upPressEvent = jQuery.Event("keydown", { keyCode: $.ui.keyCode.UP });

	this.scrollContainer(this.vhScrollId).focus();
	this.scrollContainer(this.vhScrollId).trigger(upPressEvent);
	assert.equal(this.scrollContainer(this.vhScrollId).scrollTop(), 60, "scrolled up small increment");
});

QUnit.test(testId_3, function (assert) {
	assert.expect(1);
	this.vhScroll().igScroll({
		scrollLeft: 100
	});
	// Simulate keydown of backspace event
	var leftPressEvent = jQuery.Event("keydown", { keyCode: $.ui.keyCode.LEFT });

	this.scrollContainer(this.vhScrollId).focus();
	this.scrollContainer(this.vhScrollId).trigger(leftPressEvent);
	assert.equal(this.scrollContainer(this.vhScrollId).scrollLeft(), 60, "scrolled left small increment");
});

QUnit.test(testId_4, function (assert) {
	assert.expect(1);
	this.vhScroll().igScroll();
	// Simulate keydown of backspace event
	var rightPressEvent = jQuery.Event("keydown", { keyCode: $.ui.keyCode.RIGHT });

	this.scrollContainer(this.vhScrollId).focus();
	this.scrollContainer(this.vhScrollId).trigger(rightPressEvent);
	assert.equal(this.scrollContainer(this.vhScrollId).scrollLeft(), 40, "scrolled right small increment");
});

QUnit.test(testId_5, function (assert) {
	assert.expect(1);
	$('#elemVH').igScroll();

	// Simulate keydown of backspace event
	var pageDownPressEvent = jQuery.Event("keydown", { keyCode: $.ui.keyCode.PAGE_DOWN });

	this.scrollContainer(this.vhScrollId).focus();
	this.scrollContainer(this.vhScrollId).trigger(pageDownPressEvent);
	assert.equal(this.scrollContainer(this.vhScrollId).scrollTop(), this.scrollContainer(this.vhScrollId).height(), "scrolled down big increment");
});

QUnit.test(testId_6, function (assert) {
	assert.expect(1);
	this.vhScroll().igScroll();

	this.vhScroll().igScroll("option", "scrollTop", 2 * this.scrollContainer(this.vhScrollId).height());

	// Simulate keydown of backspace event
	var pageUpPressEvent = jQuery.Event("keydown", { keyCode: $.ui.keyCode.PAGE_UP });

	this.scrollContainer(this.vhScrollId).focus();
	this.scrollContainer(this.vhScrollId).trigger(pageUpPressEvent);
	assert.equal(this.scrollContainer(this.vhScrollId).scrollTop(), this.scrollContainer(this.vhScrollId).height(), "scrolled down big increment");
});

QUnit.test(testId_7, function (assert) {
	assert.expect(1);
	this.vhScroll().igScroll();

	// Simulate keydown of backspace event
	var spacePressEvent = jQuery.Event("keydown", { keyCode: $.ui.keyCode.SPACE });

	this.scrollContainer(this.vhScrollId).focus();
	this.scrollContainer(this.vhScrollId).trigger(spacePressEvent);
	assert.equal(this.scrollContainer(this.vhScrollId).scrollTop(), this.scrollContainer(this.vhScrollId).height(), "scrolled down big increment");
});

QUnit.test(testId_8, function (assert) {
	assert.expect(1);
	this.vhScroll().igScroll();

	this.vhScroll().igScroll("option", "scrollTop", 2 * this.scrollContainer(this.vhScrollId).height());

	// Simulate keydown of backspace event
	var spacePressEvent = jQuery.Event("keydown", { keyCode: $.ui.keyCode.SPACE, shiftKey: true });

	this.scrollContainer(this.vhScrollId).focus();
	this.scrollContainer(this.vhScrollId).trigger(spacePressEvent);
	assert.equal(this.scrollContainer(this.vhScrollId).scrollTop(), this.scrollContainer(this.vhScrollId).height(), "scrolled down big increment");
});

QUnit.test(testId_9, function (assert) {
	assert.expect(2);
	this.vhScroll().igScroll();

	assert.equal(this.scrollContainer(this.vhScrollId).attr("tabindex"), undefined, "tabindex is set");
	assert.notEqual(this.scrollContainer(this.vhScrollId).attr("tabindex"), 1, "tabindex is the same as the main element");
});