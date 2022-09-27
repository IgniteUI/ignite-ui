QUnit.module("igScroll events unit tests", {
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
		"<tbody>" +
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
		"</tbody>" +
		"</table>" +
		"<div>Text text</div>",
	id: function (name) {
		return "#" + name;
	},
	testUtil: $.ig.TestUtil,
	util: $.ig.util,
	vhScrollId: "elemVH",
	elemContainer: "elemVH_container",
	vhScroll: function () {
		return $(this.id(this.vhScrollId))
	},
	vDrag: function (id) {
		return $(this.id(id) + "_vBar_drag");
	},
	hScrollbarContainer: function (id) {
		return $(this.id(id) + "_hBar");
	},
	vScrollbarContainer: function (id) {
		return $(this.id(id) + "_vBar");
	}, 
	scrollContainer: function (id) {
		return $(this.id(id) + "_container");
	},
	arrowRight: function (id) {
		return $(this.id(id) + "_hBar_arrowRight");
	},
	beforeEach: function () {
		$("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
	},
	afterEach: function () {
		this.vhScroll().remove();
	}
});

QUnit.test("On destroy there are not events left bound to the body and window igScroll namespace.", function (assert) {
	var isFiredMouseMove = false, isFiredMouseUp= false;
	this.vhScroll().igScroll({});
	$("body").on("mousemove.igscroll_" + this.vhScrollId, function (evt, args) {
		isFiredMouseMove = true;
	});
	$(window).on("mouseup.igscroll_" + this.vhScrollId, function (evt, args) {
		isFiredMouseUp = true;
	});
	
	this.vhScroll().remove();
	$("body").mousemove();
	$(window).mouseup();
	assert.notOk(isFiredMouseMove, "Mousemove in igScroll namespace event shouldn't fire.");
	assert.notOk(isFiredMouseUp, "Mouseup in igScroll namespace event shouldn't fire.");
});

QUnit.test("Rendered event is fired and its event arguments are correct.", function (assert) {
	var evtArgs, isFired = false, done, self = this;
	assert.expect(1);
	done = assert.async()
	this.vhScroll().igScroll({
		rendered: function (evt, args) {
			assert.equal(args.owner, self.vhScroll().data("igScroll"), "'owner' event argument should be the igScroll instance.");
			done();
		}
	});
});

QUnit.test("Scrolling event is fired and its event arguments are correct.", function (assert) {
	assert.expect(6);
	var done = assert.async(), self = this;
	this.vhScroll().igScroll({
		scrolling: function (evt, args) {
			assert.equal(args.owner, self.vhScroll().data("igScroll"), "'owner' event argument should be the igScroll instance.");
			assert.equal(args.smallIncrement, 0, "'smallIncrement' event argument should be 0.");
			assert.equal(args.bigIncrement, 0, "'bigIncrement' event argument should be 0.");
			assert.equal(args.horizontal, false, "'horizontal' event argument should be false.");
			assert.equal(args.stepX, 0, "'stepX' event argument should be 0.");
			assert.equal(args.stepY, 50, "'stepY' event argument should be 0.");
			done();
		}
	});
	var wheelEvtDown = jQuery.Event("wheel", { originalEvent: { deltaY: 100 }, preventDefault: function () { }, stopPropagation: function () { } });
	this.scrollContainer(this.vhScrollId).mouseenter();
	this.scrollContainer(this.vhScrollId).trigger(wheelEvtDown);
});

QUnit.test("Scrolled event is fired and its event arguments are correct.", function (assert) {
	var self = this;
	assert.expect(4);
	this.vhScroll().igScroll({
		scrolled: function (evt, args) {
			assert.equal(args.owner, self.vhScroll().data("igScroll"), "'owner' event argument should be the igScroll instance.");
			assert.equal(args.smallIncrement, 1, "'smallIncrement' event argument should be 1.");
			assert.equal(args.bigIncrement, 0, "'bigIncrement' event argument should be 0.");
			assert.equal(args.horizontal, true, "'horizontal' event argument should be true.");
		}
	});

	this.hScrollbarContainer(this.vhScrollId).mouseenter();
	this.testUtil.simulateSingleClick(this.arrowRight(this.vhScrollId));

});

QUnit.test("When Scrolling event is canceled scrolling should not occur and the scrolled event should not fire.", function (assert) {
	var scrolledIsFired = false;
	assert.expect(2);
	this.vhScroll().igScroll({
		scrolling: function (evt, args) {
			//cancel event
			return false;
		}, 				
		scrolled: function (evt, args) {
			scrolledIsFired = true;
		}
	});

	var wheelEvtDown = jQuery.Event("wheel", { originalEvent: { deltaY: 100 }, preventDefault: function () { }, stopPropagation: function () { } });
	this.scrollContainer(this.vhScrollId).mouseenter();
	this.scrollContainer(this.vhScrollId).trigger(wheelEvtDown);

	assert.ok(!scrolledIsFired, "Scrolled event should not fire.");
	assert.equal(this.scrollContainer(this.vhScrollId).scrollTop(), 0, "No scrolling should occur.");
});

QUnit.test("When Scrolling event is canceled scrolling should not occur when setting scrollLeft and the scrolled event should not fire.", function (assert) {
	var scrolledIsFired = false;
	assert.expect(1);
	this.vhScroll().igScroll({
		scrolling: function (evt, args) {
			//cancel event
			return false;
		},				
		scrolled: function (evt, args) {
			scrolledIsFired = true;
		}
	});
	var wheelEvtDown = jQuery.Event("wheel", { originalEvent: { deltaY: 100 }, preventDefault: function () { }, stopPropagation: function () { } });
	this.scrollContainer(this.vhScrollId).mouseenter();
	this.scrollContainer(this.vhScrollId).trigger(wheelEvtDown);

	this.vhScroll().igScroll("option", "scrollLeft", 100);
	//Following check fails due to issue: https://github.com/IgniteUI/ignite-ui/issues/175
	//ok(!scrolledIsFired, "Scrolled event should not fire.");
	assert.equal(this.scrollContainer(this.vhScrollId).scrollLeft(), 0, "No scrolling should occur.");
});

QUnit.test("ThumbDragStart event is fired and its event arguments are correct.", function (assert) {
	var isFired = false, evtArgs, done, self = this;
	assert.expect(3);
	this.vhScroll().igScroll({
		modifyDOM: true,
		scrollHeight: 5000,
		thumbDragStart: function (evt, args) {
			isFired = true;
			evtArgs = args;
		}
	});
	done = assert.async();
	this.scrollContainer(this.vhScrollId).mouseenter();
	this.vScrollbarContainer(this.vhScrollId).mouseenter();
	this.testUtil.simulateClickDragRelese(this.vDrag(this.vhScrollId), 0, 50, 200);

	//Wait for simulation to finish
	this.testUtil.wait(2500).then(function () {
		assert.ok(isFired, "ThumbDragStart should fire.");
		assert.equal(evtArgs.owner, self.vhScroll().data("igScroll"), "'owner' event argument should be the igScroll instance.");
		assert.equal(evtArgs.horizontal, false, "'horizontal' event argument should be the false.");
		done();
	}).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test("ThumbDragMove event is fired and its event arguments are correct.", function (assert) {
	var isFired = false, evtArgs, totalScrollY = 0, done, self = this;
	assert.expect(5);
	this.vhScroll().igScroll({
		modifyDOM: true,
		scrollHeight: 5000,
		thumbDragMove: function (evt, args) {
			isFired = true;
			evtArgs = args;
			totalScrollY += evtArgs.stepY;
		}
	});
	done = assert.async();
	this.scrollContainer(this.vhScrollId).mouseenter();
	this.vScrollbarContainer(this.vhScrollId).mouseenter();
	this.testUtil.simulateClickDragRelese(this.vDrag(this.vhScrollId), 0, 50, 200);

	//Wait for simulation to finish
	this.testUtil.wait(2500).then(function () {
		assert.ok(isFired, "ThumbDragMove should fire.");
		assert.equal(evtArgs.owner, self.vhScroll().data("igScroll"), "'owner' event argument should be the igScroll instance.");
		assert.equal(evtArgs.horizontal, false, "'horizontal' event argument should be the false.");
		assert.equal(evtArgs.stepX, 0, "'stepX' event argument should be 0.");
		assert.notOk(totalScrollY >= 190, "'stepY' event argument should more than 190, but is " + totalScrollY);
		done();
	}).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});
QUnit.test("ThumbDragEnd event is fired and its event arguments are correct.", function (assert) {
	var isFired = false, evtArgs, done, self = this;
	assert.expect(3);
	this.vhScroll().igScroll({
		modifyDOM: true,
		scrollHeight: 5000,
		thumbDragEnd: function (evt, args) {
			isFired = true;
			evtArgs = args;
		}
	});

	done = assert.async();
	this.scrollContainer(this.vhScrollId).mouseenter();
	this.vScrollbarContainer(this.vhScrollId).mouseenter();
	this.testUtil.simulateClickDragRelese(this.vDrag((this.vhScrollId)), 0, 50, 200);

	//Wait for simulation to finish
	this.testUtil.wait(2500).then(function () {
		assert.ok(isFired, "ThumbDragEnd should fire.");
		assert.equal(evtArgs.owner, self.vhScroll().data("igScroll"), "'owner' event argument should be the igScroll instance.");
		assert.equal(evtArgs.horizontal, false, "'horizontal' event argument should be the false.");
		done();
	}).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test("Events order", function (assert) {
	var eventsOrder = [], done, self = this;
	var expectedOrder = ["thumbDragStart", "thumbDragMove", "scrolling", "thumbDragEnd", "scrolled"];

	this.vhScroll().igScroll({
		modifyDOM: true,
		scrollHeight: 5000,
		thumbDragStart: function (evt, args) {
			eventsOrder.push("thumbDragStart");
		},
		scrolling: function (evt, args) {
			eventsOrder.push("scrolling");
		},
		thumbDragMove: function (evt, args) {
			eventsOrder.push("thumbDragMove");
		},
		thumbDragEnd: function (evt, args) {
			eventsOrder.push("thumbDragEnd");
		},
		scrolled: function (evt, args) {
			eventsOrder.push("scrolled");
		}
	});

	done = assert.async();
	this.scrollContainer(this.vhScrollId).mouseenter();
	this.vScrollbarContainer(this.vhScrollId).mouseenter();
	this.testUtil.simulateClickDragRelese(this.vDrag(this.vhScrollId), 0, 50, 200);

	//Wait for simulation to finish
	this.testUtil.wait(2500).then(function () {
		assert.equal(eventsOrder[0], expectedOrder[0], "Events order should be correct.");
		assert.equal(eventsOrder[1], expectedOrder[1], "Events order should be correct.");
		assert.equal(eventsOrder[2], expectedOrder[2], "Events order should be correct.");

		assert.equal(eventsOrder[eventsOrder.length - 2], expectedOrder[3], "Events order should be correct.");
		assert.equal(eventsOrder[eventsOrder.length - 1], expectedOrder[4], "Events order should be correct.");
		done();
	}).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test("When ThumbDragMove event is canceled scrolling should not occur and the ThumbDragEnd event should not fire..", function (assert) {
	var isFired = false, evtArgs, done, self = this;
	this.vhScroll().igScroll({
		modifyDOM: true,
		scrollHeight: 5000,
		thumbDragMove: function (evt, args) {
			//cancel event
			return false;
		},
		thumbDragEnd: function (evt, args) {
			isFired = true;
		}
	});
	done = assert.async();
	this.scrollContainer(this.vhScrollId).mouseenter();
	this.vScrollbarContainer(this.vhScrollId).mouseenter();
	this.testUtil.simulateClickDragRelese(this.vDrag(this.vhScrollId), 0, 50, 200);

	//Wait for simulation to finish
	this.testUtil.wait(2500).then(function () {
		assert.ok(!isFired, "ThumbDragEnd should not fire.");
		assert.equal(self.scrollContainer(self.vhScrollId).scrollTop(), 0, "No scrolling should occur.");
		done();
	}).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

		
		
QUnit.test("When touchend/touchmove/touchstart are prevented igScroll does not scroll and there are no errors.", function (assert) {
	this.util.isTouch = true;
	var done, self = this;
	assert.expect(2);
	this.vhScroll().igScroll({
		modifyDOM: true
	});
	done = assert.async();
	var touchSteps = [{x: 0, y: 3}, {x: 0, y: 7}, {x: 0 , y: 15}, {x: 0, y: 15}, {x: 0, y: 6}, {x: 0, y: 5}, {x: 0, y: 1}]
	this.testUtil.simulateTouchSwipeFromCenter(this.scrollContainer(this.vhScrollId), touchSteps, 10, true);
	
	//Wait for simulation to finish
	this.testUtil.wait(2500).then(function () {
		assert.equal(self.vhScroll().data("igScroll")._getContentPositionX(), 0, "igScroll scrolled horizontally by the swipe");
		assert.equal(self.vhScroll().data("igScroll")._getContentPositionY(), 0, "igScroll did not scroll properly vertically");
		self.util.isTouch = false;
		done();
	}).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test("When changing the width of the element the resizing/resized events are fired and are in order", function (assert) {
	var eventsFired = [];
	assert.expect(14);
	this.vhScroll().igScroll({
		resizing: function (evt, ui) {
			eventsFired.push("resizing");
		},
		
		resized: function (evt, ui) {
			eventsFired.push("resized");
		}
	});
	
	assert.equal(this.vhScroll().css("height"), "400px", "Element initial height is correct");
	assert.equal(this.vhScroll().css("width"), "600px", "Element initial width is correc");
	assert.equal(this.scrollContainer(this.vhScrollId).css("height"), "400px", "IgScroll's initial contianer height is correct");
	assert.equal(this.scrollContainer(this.vhScrollId).css("width"), "600px", "IgScroll's initial contianer width is correct");
	assert.equal($(".igscroll-vcontainer").css("height"), "400px", "IgScroll's initial vertical scrollbar container height is correct");
	assert.equal($(".igscroll-hcontainer").css("width"), "600px", "IgScroll's initial horizontal scrollbar container width is correct");
	
	//Simulate MutationObserver since it is not supported by PhantomJS prior to 2.0 version
	this.vhScroll().css("width", "300px")
	this.vhScroll().data("igScroll")._onElementMutation([{ attributeName: "style" }]);
	
	assert.equal(this.vhScroll().css("height"), "400px", "Element height after resising is correct");
	assert.equal(this.vhScroll().css("width"), "300px", "Element width after resizing is correct");
	assert.equal(this.scrollContainer(this.vhScrollId).css("height"), "400px", "IgScroll's contaner height after resizing is correct");
	assert.equal(this.scrollContainer(this.vhScrollId).css("width"), "300px", "IgScroll's contaner width after resizing is correct");
	assert.equal($(".igscroll-vcontainer").css("height"), "400px", "IgScroll's vertical scrollbar container height after resizing is correct");
	assert.equal($(".igscroll-hcontainer").css("width"), "300px", "IgScroll's horizontal scrollbar container width after resizing is correct");
	assert.equal(eventsFired[0], "resizing", "Resizing event fired");
	assert.equal(eventsFired[1], "resized", "Resized event fired");
});

QUnit.test("When resizing event is canceled the igScroll should not refresh when changing the width of the element", function (assert) {
	assert.expect(13);
	this.vhScroll().igScroll({
		resizing: function (evt, ui) {
			return false;
		}
	});
	
	var hThumbWidthPercentage = $("#elemVH_hBar_drag")[0].style.width;
	
	assert.equal(this.vhScroll().css("height"), "400px", "Element initial height is correct");
	assert.equal(this.vhScroll().css("width"), "600px", "Element initial width is correc");
	assert.equal(this.scrollContainer(this.vhScrollId).css("height"), "400px", "IgScroll's initial contianer height is correct");
	assert.equal(this.scrollContainer(this.vhScrollId).css("width"), "600px", "IgScroll's initial contianer width is correct");
	assert.equal($(".igscroll-vcontainer").css("height"), "400px", "IgScroll's initial vertical scrollbar container height is correct");
	assert.equal($(".igscroll-hcontainer").css("width"), "600px", "IgScroll's initial horizontal scrollbar container width is correct");
	
	//Simulate MutationObserver since it is not supported by PhantomJS prior to 2.0 version
	this.vhScroll().css("width", "300px")
	this.vhScroll().data("igScroll")._onElementMutation([{ attributeName: "style" }]);
	
	assert.equal(this.vhScroll().css("height"), "400px", "Element height after resising is the same");
	assert.equal(this.vhScroll().css("width"), "300px", "Element width after resizing is updated");
	assert.equal(this.scrollContainer(this.vhScrollId).css("height"), "400px", "IgScroll's contaner height after resizing is the same");
	assert.equal(this.scrollContainer(this.vhScrollId).css("width"), "600px", "IgScroll's contaner width after resizing is the same");
	assert.equal($(".igscroll-vcontainer").css("height"), "400px", "IgScroll's vertical scrollbar container height after canceling resizing is the same");
	
	//The width of the horizontal scrollbar is changed because it fits the element it is child of to 100%, and since we resized that main element to 300px, the scrollbar container also auto resizes.
	//The rest remains the same though
	assert.equal($(".igscroll-hcontainer").css("width"), "300px", "IgScroll's horizontal scrollbar container width after canceling resizing is updated");
	assert.equal($("#elemVH_hBar_drag")[0].style.width, hThumbWidthPercentage, "IgScroll's horizontal scrollbar thumb width % after canceling resizing is the same");
});
