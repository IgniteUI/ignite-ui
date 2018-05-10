//This is to tests for improper use of for..in.. loops. Tests will fail that touch array parsing in the scroll.
//Array.prototype.foo = 1;

QUnit.module("igScroll unit tests", {
    id: function (name) {
        return "#" + name;
    },
    vScrollId: "elemV",
    hScrollId: "elemH",
    vhScrollId: "elemVH",
    vhScroll1Id: "elemVH1",
    vhScroll2Id: "elemVH2",
    noScrollId: "elemNoScroll",
    vSyncScrollId: "elemVSync",
    hSyncScrollId: "elemHSync",
    vhScroll: function () {
        return $(this.id(this.vhScrollId))
    },
    vScroll: function () {
        return $(this.id(this.vScrollId))
    },
    hScroll: function () {
        return $(this.id(this.hScrollId))
    },
    noScroll: function () {
        return $(this.id(this.noScrollId))
    },
    vSyncScroll: function () {
        return $(this.id(this.vSyncScrollId))
    },
    hSyncScroll: function () {
        return $(this.id(this.hSyncScrollId))
    },
    vhScroll1: function () {
        return $(this.id(this.vhScroll1Id))
    },
    vhScroll2: function () {
        return $(this.id(this.vhScroll2Id))
    },
    vScrollBar: function (id) {
        return $(this.id(id) + "_vBar");
    },
    hScrollBar: function (id) {
        return $(this.id(id) + "_hBar");
    },
    scrollContainer: function (id) {
        return $(this.id(id) + "_container");
    },
    arrowUp: function (id) {
        return $(this.id(id) + "_vBar_arrowUp");
    },
    arrowDown: function (id) {
        return $(this.id(id) + "_vBar_arrowDown");
    },
    arrowLeft: function (id) {
        return $(this.id(id) + "_hBar_arrowLeft");
    },
    arrowRight: function (id) {
        return $(this.id(id) + "_hBar_arrowRight");
    },
    vDrag: function (id) {
        return $(this.id(id) + "_vBar_drag");
    },
    hDrag: function (id) {
        return $(this.id(id) + "_hBar_drag");
    },
    elemContent: function (id) {
        return $(this.id(id) + "_content");
    },
    vSyncElemContent: function () {
        return $(this.id(this.vSyncScrollId) + "_content");
    },
    hTrack: function (id) {
        return $(this.id(id) + "_hBar_track");
    },
    vTrack: function (id) {
        return $(this.id(id) + "_vBar_track");
    },
    util: $.ig.util,
    testUtil: $.ig.TestUtil,
    //Content for igScroll that does not need to render any scrollbars due to the content beeing too small
    contentNoScroll: '<table width="600" style="border: 1px solid #777777;">' +
        "<thead>" +
        "<th>Product ID</th>" +
        "<th>Name</th>" +
        "<th>Product Number</th>" +
        "<th>Make</th>" +
        "<th>Finished Goods</th>" +
        "<th>Color</th>" +
        "<th>Safety Stock Level</th>" +
        "<th>Reorder Point</th>" +
        "</thead>" +
        "<tbody>" +
        "<tr><td>1</td><td>Adjustable Race</td><td>AR-5381</td><td>false</td><td>false</td><td>&nbsp;</td><td>1000</td><td>750</td></tr>" +
        "</tbody>" +
        "</table>" +
        "<div>Text text</div>",
    //Content for igScroll that does not need to render vertical scrollbars. Only horizontal scrollbar
    contentScrollH: '<table width="800" style="border: 1px solid #777777;">' +
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
        "</tbody>" +
        "</table>" +
        "<div>Text text</div>",
    //Content for igScroll that does not need to render horizontal scrollbars. Only vertical scrollbar
    contentScrollV: '<table width="600" style="border: 1px solid #777777;">' +
        "<thead>" +
        "<th>Product ID</th>" +
        "<th>Name</th>" +
        "<th>Product Number</th>" +
        "<th>Make</th>" +
        "<th>Finished Goods</th>" +
        "<th>Color</th>" +
        "<th>Safety Stock Level</th>" +
        "<th>Reorder Point</th>" +
        "</thead>" +
        "<tbody>" +
        "<tr><td>1</td><td>Adjustable Race</td><td>AR-5381</td><td>false</td><td>false</td><td>&nbsp;</td><td>1000</td><td>750</td></tr>" +
        "<tr><td>2</td><td>Bearing Ball</td><td>BA-8327</td><td>false</td><td>false</td><td>&nbsp;</td><td>1000</td><td>750</td></tr>" +
        "<tr><td>3</td><td>BB Ball Bearing</td><td>BE-2349</td><td>true</td><td>false</td><td>&nbsp;</td><td>800</td><td>600</td></tr>" +
        "<tr><td>4</td><td>Headset Ball Bearings</td><td>BE-2908</td><td>false</td><td>false</td><td>&nbsp;</td><td>800</td><td>600</td></tr>" +
        "<tr><td>316</td><td>Blade</td><td>BL-2036</td><td>true</td><td>false</td><td>&nbsp;</td><td>800</td><td>600</td></tr>" +
        "<tr><td>317</td><td>LL Crankarm</td><td>CA-5965</td><td>false</td><td>false</td><td>Black</td><td>500</td><td>375</td></tr>" +
        "<tr><td>318</td><td>ML Crankarm</td><td>CA-6738</td><td>false</td><td>false</td><td>Black</td><td>500</td><td>375</td></tr>" +
        "<tr><td>319</td><td>HL Crankarm</td><td>CA-7457</td><td>false</td><td>false</td><td>Black</td><td>500</td><td>375</td></tr>" +
        "<tr><td>320</td><td>Chainring Bolts</td><td>CB-2903</td><td>false</td><td>false</td><td>Silver</td><td>1000</td><td>750</td></tr>" +
        "<tr><td>321</td><td>Chainring Nut</td><td>CN-6137</td><td>false</td><td>false</td><td>Silver</td><td>1000</td><td>750</td></tr>" +
        "<tr><td>322</td><td>Chainring</td><td>CR-7833</td><td>false</td><td>false</td><td>Black</td><td>1000</td><td>750</td></tr>" +
        "<tr><td>323</td><td>Crown Race</td><td>CR-9981</td><td>false</td><td>false</td><td>&nbsp;</td><td>1000</td><td>750</td></tr>" +
        "<tr><td>324</td><td>Chain Stays</td><td>CS-2812</td><td>true</td><td>false</td><td>&nbsp;</td><td>1000</td><td>750</td></tr>" +
        "<tr><td>325</td><td>Decal 1</td><td>DC-8732</td><td>false</td><td>false</td><td>&nbsp;</td><td>1000</td><td>750</td></tr>" +
        "<tr><td>326</td><td>Decal 2</td><td>DC-9824</td><td>false</td><td>false</td><td>&nbsp;</td><td>1000</td><td>750</td>" +
        "<tr><td>327</td><td>Down Tube</td><td>DT-2377</td><td>true</td><td>false</td><td>&nbsp;</td><td>800</td><td>600</td>" +
        "<tr><td>328</td><td>Mountain End Caps</td><td>EC-M092</td><td>true</td><td>false</td><td>&nbsp;</td><td>1000</td><td>750</td>" +
        "<tr><td>329</td><td>Road End Caps</td><td>EC-R098</td><td>true</td><td>false</td><td>&nbsp;</td><td>1000</td><td>750</td>" +
        "<tr><td>330</td><td>Touring End Caps</td><td>EC-T209</td><td>true</td><td>false</td><td>&nbsp;</td><td>1000</td><td>750</td>" +
        "<tr><td>331</td><td>Fork End</td><td>FE-3760</td><td>true</td><td>false</td><td>&nbsp;</td><td>800</td><td>600</td>" +
        "<tr><td>332</td><td>Freewheel</td><td>FH-2981</td><td>false</td><td>false</td><td>Silver</td><td>500</td><td>375</td>" +
        "<tr><td>341</td><td>Flat Washer 1</td><td>FW-1000</td><td>false</td><td>false</td><td>&nbsp;</td><td>1000</td><td>750</td>" +
        "<tr><td>342</td><td>Flat Washer 6</td><td>FW-1200</td><td>false</td><td>false</td><td>&nbsp;</td><td>1000</td><td>750</td>" +
        "<tr><td>343</td><td>Flat Washer 2</td><td>FW-1400</td><td>false</td><td>false</td><td>&nbsp;</td><td>1000</td><td>750</td>" +
        "<tr><td>344</td><td>Flat Washer 9</td><td>FW-3400</td><td>false</td><td>false</td><td>&nbsp;</td><td>1000</td><td>750</td>" +
        "<tr><td>345</td><td>Flat Washer 4</td><td>FW-3800</td><td>false</td><td>false</td><td>&nbsp;</td><td>1000</td><td>750</td>" +
        "<tr><td>346</td><td>Flat Washer 3</td><td>FW-5160</td><td>false</td><td>false</td><td>&nbsp;</td><td>1000</td><td>750</td>" +
        "<tr><td>347</td><td>Flat Washer 8</td><td>FW-5800</td><td>false</td><td>false</td><td>&nbsp;</td><td>1000</td><td>750</td>" +
        "<tr><td>348</td><td>Flat Washer 5</td><td>FW-7160</td><td>false</td><td>false</td><td>&nbsp;</td><td>1000</td><td>750</td>" +
        "<tr><td>349</td><td>Flat Washer 7</td><td>FW-9160</td><td>false</td><td>false</td><td>&nbsp;</td><td>1000</td><td>750</td>" +
        "<tr><td>350</td><td>Fork Crown</td><td>FC-3654</td><td>true</td><td>false</td><td>&nbsp;</td><td>800</td><td>600</td>" +
        "<tr><td>351</td><td>Front Derailleur Cage</td><td>FC-3982</td><td>false</td><td>false</td><td>Silver</td><td>800</td><td>600</td>" +
        "<tr><td>352</td><td>Front Derailleur Linkage</td><td>FL-2301</td><td>false</td><td>false</td><td>Silver</td><td>800</td><td>600</td>" +
        "<tr><td>355</td><td>Guide Pulley</td><td>GP-0982</td><td>false</td><td>false</td><td>&nbsp;</td><td>800</td><td>600</td>" +
        "<tr><td>356</td><td>LL Grip Tape</td><td>GT-0820</td><td>false</td><td>false</td><td>&nbsp;</td><td>800</td><td>600</td>" +
        "<tr><td>357</td><td>ML Grip Tape</td><td>GT-1209</td><td>false</td><td>false</td><td>&nbsp;</td><td>800</td><td>600</td>" +
        "<tr><td>358</td><td>HL Grip Tape</td><td>GT-2908</td><td>false</td><td>false</td><td>&nbsp;</td><td>800</td><td>600</td>" +
        "</tbody>" +
        "</table>" +
        "<div>Text text</div>",
    //Content for igScroll that is big enough so vertical and horizontal scrollbars need to be rendered
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
    elemVH1: function () {
        return '<div id="elemVH1" style="height:400px; width: 600px; overflow: hidden; position:relative;">' +
            '<div id="elemVH1_container" style="height:400px; width: 600px; overflow: hidden; position: absolute;">' +
            '<div id="elemVH1_content" style="position: absolute;">' +
            this.contentScrollVH +
            '</div>' +
            '</div>' +
            '</div>'
    },
    elemVH2: function () {
        return '<div id="elemVH2" style="height:400px; width: 600px; overflow: hidden; position:relative;">' +
            '<div id="elemVH2_container" style="height:400px; width: 600px; overflow: hidden; position: absolute;">' +
            '<div id="elemVH2_content" style="position: absolute;">' +
            this.contentScrollVH +
            '</div>' +
            '</div>' +
            '</div>'
    },
    hiddenVBarClass: $.ui.igScroll.prototype.css.verticalScrollThumbDragHidden,
    hiddenHBarClass: $.ui.igScroll.prototype.css.horizontalScrollThumbDragHidden,
    hiddenVArrowClass: $.ui.igScroll.prototype.css.verticalScrollArrowHidden,
    hiddenHArrowClass: $.ui.igScroll.prototype.css.horizontalScrollArrowHidden,
    vBarThinClass: $.ui.igScroll.prototype.css.verticalScrollThumbDragThin,
    vBarBigClass: $.ui.igScroll.prototype.css.verticalScrollThumbDragBig,
    hBarThinClass: $.ui.igScroll.prototype.css.horizontalScrollThumbDragThin,
    hBarBigClass: $.ui.igScroll.prototype.css.horizontalScrollThumbDragBig,
    getTransform3dValueX: function (jqElem) {
        var matrix, values, posX;
        if (jqElem.css("-webkit-transform")) {
            matrix = jqElem.css("-webkit-transform");
            values = matrix ? matrix.match(/-?[\d\.]+/g) : undefined;
            posX = values ? Number(values[4]) : 0;
        } else if (jqElem.css("-moz-transform")) {
            matrix = $jqElem.css("-moz-transform");
            values = matrix ? matrix.match(/-?[\d\.]+/g) : undefined;
            posX = values ? Number(values[4]) : 0;
        } else if (jqElem.css("-ms-transform")) {
            matrix = jqElem.css("-ms-transform");
            values = matrix ? matrix.match(/-?[\d\.]+/g) : undefined;
            posX = values ? Number(values[13]) : 0;
        }

        return posX;
    },
    getTransform3dValueY: function (jqElem) {
        var matrix, values, posY;
        if (jqElem.css("-webkit-transform")) {
            matrix = jqElem.css("-webkit-transform");
            values = matrix ? matrix.match(/-?[\d\.]+/g) : undefined;
            posY = values ? Number(values[5]) : 0;
        } else if (jqElem.css("-moz-transform")) {
            matrix = jqElem.css("-moz-transform");
            values = matrix ? matrix.match(/-?[\d\.]+/g) : undefined;
            posY = values ? Number(values[5]) : 0;
        } else if (jqElem.css("-ms-transform")) {
            matrix = jqElem.css("-ms-transform");
            values = matrix ? matrix.match(/-?[\d\.]+/g) : undefined;
            posY = values ? Number(values[14]) : 0;
        }

        return posY;
    },
    beforeEach: function () {
    },
    afterEach: function () {
    }
});

var testId_1 = 'loaded test.';
var testId_2 = 'no scrollbars rendered when content is too small test.';
var testId_3 = 'verify only vertical custom scrollbar rendered when content is not wide test.';
var testId_4 = 'verify only horizontal custom scrollbarsrendered when content is not long test.';
var testId_5 = 'verify vertical and horizontal custom scrollbars rendered test.';
var testId_6 = 'no scrollbars rendered when scrollbarType is none test.';
var testId_7 = 'native vertical and horizontal scrollbars rendered when scrollbarType is native test.';
var testId_8 = 'initially setting scrollTop and scrollLeft test.';
var testId_9 = 'initially setting scrollTop and scrollLeft with content not high and wide enough to scroll test.';
var testId_10 = 'initially setting scrollTop and scrollLeft with content not high and wide enough to scroll on touch test.';
var testId_11 = 'initially setting scrollTop and scrollLeft on touch test.';
var testId_12 = 'initially setting scrollTop and scrollLeft with native scrollbars test.';
var testId_13 = 'dynamically setting scrollTop and scrollLeft test.';
var testId_14 = 'dynamically setting scrollTop and scrollLeft with the same options set initially test.';
var testId_15 = 'initially setting high scrollHeight on a small content renders vertical scrollbar test.';
var testId_16 = 'can scroll vertically after initially setting high scrollHeight on a small content test.';
var testId_17 = 'dinamically setting high scrollHeight on a small content renders vertical scrollbar test.';
var testId_18 = 'initially setting high scrollWidth on a small content renders vertical scrollbar test.';
var testId_19 = 'can scroll horizontally after initially setting high scrollWidth on a small content test.';
var testId_20 = 'dinamically setting high scrollWidth on a small content renders vertical scrollbar test.';
var testId_21 = 'initially setting high scrollWidth and scrollWidth on a small content renders both scrollbars test.';
var testId_22 = 'using mouse wheel to scroll down without smoothing test.';
var testId_23 = 'using mouse wheel to scroll down and then up without smoothing test.';
var testId_24 = 'using mouse wheel to scroll down with smoothing on test.';
var testId_25 = 'using mouse wheel to scroll up with smoothing on and initially set scrollTop test.';
var testId_26 = 'changing the main element width and refreshing igScroll should update custom scrollbars and container test.';
var testId_27 = 'changing the main element width and refreshing igScroll should update native scrollbars and container test.';
var testId_28 = 'scrollTop and scrollLeft return the content position if no value is given test.';
var testId_29 = 'scrollTop and scrollLeft return the content position if no value is given on touch test.';

/*//////////////////////Custom scrollbars interaction scenarios tests///////////////////////////*/
var testId_30 = 'right after the scrollbar is loaded the thin scrollbars show for a short time test.';
var testId_31 = 'thin scrollbars show after entering the container area test.';
var testId_32 = 'thin scrollbars hide after leaving the container area test.';
var testId_33 = 'thin scrollbars hide after leaving and show after entering the container area test.';
var testId_34 = 'thin scrollbars turn into big when mouse enters the vertical scrollbar area from inside the container test.';
var testId_35 = 'big scrollbars turn into thin scrollbars when moving out of the scrollbars area to the container test.';
var testId_36 = 'big scrollbars show when entereing the vertical scrollbar area from outside the container test.';

//Arrow Down
var testId_37 = 'clicking on arrow down once scrolls the content test.';
var testId_38 = 'clicking on arrow down once to scroll when the content is at the bottom does not scroll test.';
var testId_39 = 'clicking on arrow down and holding scrolls the container more than just clicking once test.';
var testId_40 = 'clicking on arrow down, moving the mouse out of the scroll container, releasing and moving back into the arrow does not scroll test.';
var testId_41 = 'clicking on arrow down, moving the mouse out of the scroll container stops scrolling and moving back into the arrow starts scrolling again test.';

//Arrow Up
var testId_42 = 'clicking on arrow up once scrolls the content test.';
var testId_43 = 'clicking on arrow up once to scroll the content to the top test.';
var testId_44 = 'clicking on arrow up once to scroll when the content is at the top does not scroll test.';
var testId_45 = 'clicking on arrow up and holding scroll the container more than just clicking once test.';
var testId_46 = 'clicking on arrow up, moving the mouse out of the scroll container, releasing and moving back into the arrow does not scroll test.';
var testId_47 = 'clicking on arrow up, moving the mouse out of the scroll container stops scrolling and moving back into the arrow starts scrolling again test.';

//Arrow Left
var testId_48 = 'clicking on arrow left once scrolls the content test.';
var testId_49 = 'clicking on arrow left once to scroll the content to the most left position test.';
var testId_50 = 'clicking on arrow left once to scroll when the content is at the most left does not scroll test.';
var testId_51 = 'clicking on arrow left and holding scroll the container more than just clicking once test.';
var testId_52 = 'clicking on arrow left, moving the mouse out of the scroll container, releasing and moving back into the arrow does not scroll test.';

//Arrow Right
var testId_53 = 'clicking on arrow right once scrolls the content test.';
var testId_54 = 'clicking on arrow right once to scroll when the content is at the most right does not scroll test.';
var testId_55 = 'clicking on arrow right and holding scrolls the container more than just clicking once test.';
var testId_56 = 'clicking on arrow right, moving the mouse out of the scroll container, releasing and moving back into the arrow does not scroll test.';

//Vertical track
var testId_57 = 'clicking on the vertical track bellow the thumb drag scrolls the content test.';
var testId_58 = 'clicking on the vertical track above the thumb drag scrolls the content test.';
var testId_59 = 'clicking on the vertical track, holding and releasing bellow the thumb drag scrolls the content constantly test.';
var testId_60 = 'clicking on the vertical track, holding and releasing above the thumb drag scrolls the content constantly test.';
var testId_61 = 'clicking on the vertical track, holding bellow the thumb drag and moving out of the track area and content area stops scrolling test.';
var testId_62 = 'clicking on the vertical track, holding above the thumb drag and moving out of the track area and content area stops scrolling test.';

//Vertical thumb drag dragging
var testId_63 = 'clicking on the vertical thumb drag and dragging scroll the content test.';

//Horizontal track
var testId_64 = 'clicking on the horizontal track right of the thumb drag scrolls the content test.';
var testId_65 = 'clicking on the horizontal track left of the thumb drag scrolls the content test.';
var testId_66 = 'clicking on the horizontal track, holding and releasing right of the thumb drag scrolls the content constantly test.';
var testId_67 = 'clicking on the horizontal track, holding and releasing left of the thumb drag scrolls the content constantly test.';
var testId_68 = 'clicking on the horizontal track, holding right the thumb drag and moving out of the track area and content area stops scrolling test.';

//Horizontal thumb drag dragging
var testId_69 = 'clicking on the horizontal thumb drag and dragging scroll the content test.';
/*//////////////////////End Custom scrollbars interaction scenarios tests///////////////////////////*/

/*//////////////////////Start Native scrollbars related tests///////////////////////////*/
var testId_70 = 'scrolling with the horizontal native scrollbar scroll the content test.';
var testId_71 = 'scrolling with the vertical native scrollbar scroll the content test.';
var testId_72 = 'scrolling the content out of the igScroll api updates native horizontal scrollbar position test.';
var testId_73 = 'scrolling the content out of the igScroll api updates native vertical scrollbar position test.';
var testId_74 = 'changing from custom scrollbars to native through scrollbarType removes old scrollbars test.';
var testId_75 = 'changing from no visible scrollbars to native through scrollbarType test.'
var testId_76 = 'changing from native scrollbars to none through scrollbarType removes native scrollbars test.';
/*//////////////////////End Native scrollbars related tests///////////////////////////*/

/*//////////////////////Start Touch interactions tests///////////////////////////*/
var testId_80 = 'touch swipe vertically without inertia scrolls the content test.';
var testId_81 = 'touch swipe horizontally without inertia scrolls the content test.';
var testId_82 = 'touch swipe vertically with inertia scrolls the content more than without interita test.';
var testId_83 = 'touch swipe horizontally with inertia scrolls the content more than without interita test.';
var testId_84 = 'tapping during vertical touch swipe inertia stops scrolling test.';
var testId_85 = 'tapping during horizontal touch swipe inertia stops scrolling test.';
var testId_86 = 'touch swipe vertically with IE events without inertia scrolls the content test.';
var testId_87 = 'touch swipe horizontally with IE events without inertia scrolls the content test.';
var testId_88 = 'touch swipe vertically without inertia and then scrolling with mouse wheel scroll properly test.';
/*//////////////////////End Touch interactions tests///////////////////////////*/

var testId_90 = 'linked element vertically updates when scrolling with scrollTop option test.';
var testId_91 = 'linked element horizontally updates when scrolling with scrollLeft option test.';
var testId_92 = 'dynamically linking element vertically updates when scrolling with scrollTop option test.';
var testId_93 = 'dynamically linking element horizontally updates when scrolling with scrollLeft option test.';
var testId_94 = 'linked element vertically updates when scrolling with scrollTop option on touch test.';
var testId_95 = 'linked element horizontally updates when scrolling with scrollLeft option on touch test.';
var testId_96 = 'setting initially alwaysVisible for custom scrollbars keeps the big scrollbars visible test.';
var testId_97 = 'setting initially alwaysVisible for custom scrollbars keeps the small scrollbars visible on touch test.';
var testId_98 = 'setting dynamically alwaysVisible for custom scrollbars keeps the big scrollbars visible test.';
var testId_99 = 'setting dynamically alwaysVisible for custom scrollbars keeps the big scrollbars visible on touch test.';
var testId_100 = 'linking invalid elements throws error test.';
var testId_101 = 'linking invalid scrollbars test.';
var testId_102 = 'clicking on arrow left, moving the mouse out of the scroll container stops scrolling and moving back into the arrow starts scrolling again test.';
var testId_103 = 'clicking on arrow right, moving the mouse out of the scroll container stops scrolling and moving back into the arrow starts scrolling again test.';
var testId_104 = 'linked two elements with igScroll instanced vertically updates when scrolling with scrollTop option test.';
var testId_105 = 'linked two elements with igScroll instanced horizontally updates when scrolling with scrollLeft option test.';
var testId_106 = 'linked two elements with igScroll instanced vertically updates when scrolling with scrollTop option on touch test.';
var testId_107 = 'linked two elements with igScroll instanced horizontally updates when scrolling with scrollLeft option on touch test.';
var testId_108 = 'linking two igScroll elements with modfiyDOM false syncs the content vertically.';
var testId_109 = 'linking two igScroll elements with modfiyDOM false syncs the content horizontally.';

var testId_110 = 'linking a custom vertical scrollbar with scrollOnlyVBar enabled scrolls the content properly.';
var testId_111 = 'linking a custom vertical scrollbar with scrollOnlyVBar enabled scrolls the content properly on mouse wheel.';
var testId_112 = 'linking a custom vertical scrollbar with scrollOnlyVBar enabled scrolls the content properly on smoothed mouse wheel.';
var testId_113 = 'linking a custom vertical scrollbar with scrollOnlyVBar enabled scrolls the content properly on touch.';
var testId_114 = 'linking a custom horizontal scrollbar with scrollOnlyVBar enabled scrolls the content properly.';
var testId_115 = 'linking a custom horizontal scrollbar with scrollOnlyVBar enabled scrolls the content properly on touch.';

var testId_116 = 'linking a custom vertical scrollbar and scrolling that scrollbar scrolls the content properly on touch.';
var testId_117 = 'linking a custom horizontal scrollbar  and scrolling that scrollbar scrolls the content properly on touch.';

var testId_118 = 'changing the main element width and refreshing igScroll should remove custom horizontal scrollbar if not needed.';
var testId_119 = 'changing the main element width and refreshing igScroll should remove native horizontal scrollbar if not needed, filler and reset bottom padding.';
var testId_120 = 'changing the main element height and refreshing igScroll should remove custom vertical scrollbar if not needed.';
var testId_121 = 'changing the main element height and refreshing igScroll should remove native vertical scrollbar if not needed, filler and reset right padding.';

var testId_122 = 'when scrollbarType is native scrollbars on mobile/touch only environment do not render scrollbar filler like on desktop.';
var testId_123 = 'setting scrollbarType to native and defining parents for the vertical and horiontal scrollbar puts them as childs of the proper elements.';
var testId_124 = 'linking two different igScroll to a third one by different orientation scrolls the proper one accordingly.';
var testId_125 = 'linking two different igScroll to a third one by different orientation scrolls the proper one accordingly on mobile.';

var testId_126 = 'setting scrollWidth updates the custom horizontal scrollbar width and its visibility.';
var testId_127 = 'setting scrollHeight updates the custom vertical scrollbar width and its visibility.';

var testId_128 = 'linked element that can be scrolled only vertically updates its position only vertically on touch.';
var testId_129 = 'linked element that can be scrolled only horizontally updates its position only horizontally on touch.';

var testId_130 = 'scrolling the container while the scrollbarType is none and setting after that the scrollbarType to native the scrollbars indicate proper scroll position.';
var testId_131 = 'scrolling the container while the scrollbarType is none and setting after that the scrollbarType to native the scrollbars indicate proper scroll position on touch.';
var testId_132 = 'scrolling the container while the scrollbarType is none and setting after that the scrollbarType to custom the scrollbars indicate proper scroll position.';

var testId_133 = 'changing the width of the main element should auto update the igScroll container and custom scrollbar sizes.';
var testId_134 = 'changing the height of the main element should auto update the igScroll container and custom scrollbar sizes.';
var testId_135 = 'changing the width of the main element twice should auto hide and then show the custom horizontal scrollbar and the custom vertical scrollbar should update correctly';
var testId_136 = 'changing the width of the main element twice should auto hide and then show the custom vertical scrollbar and the custom horizontal scrollbar should update correctly';
var testId_137 = 'changing the width of the main element twice should auto hide and then show the native horizontal scrollbar and the native vertical scrollbar should update correctly';
var testId_138 = 'changing the width of the main element twice should auto hide and then show the native vertical scrollbar and the native horizontal scrollbar should update correctly';

var testId_140 = 'setting scrollTop during vertical inertia stops the inertia and executes the set scrollTop on touch.';
var testId_141 = 'setting scrollLeft during horizontal inertia stops the inertia and executes the set scrollLeft on touch.';
var testId_142 = "setting scrollTop of the container manually on touch changes it to transform3d";
var testId_143 = "setting scrollLeft of the container manually on touch changes it to transform3d";


QUnit.test(testId_1, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    assert.expect(2);
    this.vhScroll().igScroll({ modifyDOM: true });
    assert.ok(typeof this.vhScroll().igScroll === 'function', "igScroll script did not load");
    assert.ok(typeof this.vhScroll().data("igScroll") === "object", "igScroll did not initialize");
    this.vhScroll().remove();
});

QUnit.test(testId_2, function (assert) {
    $("body").append($('<div id="elemNoScroll" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentNoScroll));
    assert.expect(3);
    this.noScroll().igScroll({ modifyDOM: true });
    assert.ok(typeof this.noScroll().data("igScroll") === "object", "igScroll did not initialize");
    assert.ok(this.vScrollBar(this.noScrollId).length === 0, "igScrollbar rendered vertical scrollbar");
    assert.ok(this.hScrollBar(this.noScrollId).length === 0, "igScrollbar did not render horizontal scrollbar");
    this.noScroll().remove();
});

QUnit.test(testId_3, function (assert) {
    $("body").append($('<div id="elemV" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollV));
    assert.expect(4);
    this.vScroll().igScroll({ modifyDOM: true });
    assert.ok(typeof this.vScroll().data("igScroll") === "object", "igScroll did not initialize");
    assert.ok(this.vScrollBar(this.vScrollId).length > 0, "igScrollbar did not render vertical scrollbar");
    assert.ok(this.hScrollBar(this.vScrollId).length === 0, "igScrollbar rendered horizontal scrollbar");

    this.testUtil.checkClass(this.vScrollBar(this.vScrollId), 'igscroll-vcontainer');
    this.vScroll().remove();
});

QUnit.test(testId_4, function (assert) {
    $("body").append($('<div id="elemH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollH));
    assert.expect(4);
    this.hScroll().igScroll({ modifyDOM: true });
    assert.ok(typeof this.hScroll().data("igScroll") === "object", "igScroll did not initialize");
    assert.ok(this.vScrollBar(this.hScrollId).length === 0, "igScrollbar rendered vertical scrollbar");
    assert.ok(this.hScrollBar(this.hScrollId).length > 0, "igScrollbar did not render horizontal scrollbar");

    this.testUtil.checkClass(this.hScrollBar(this.hScrollId), 'igscroll-hcontainer');
    this.hScroll().remove();
});

QUnit.test(testId_5, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    assert.expect(5);
    this.vhScroll().igScroll({ modifyDOM: true });
    assert.ok(typeof this.vhScroll().data("igScroll") === "object", "igScroll did not initialize");
    assert.ok(this.vScrollBar(this.vhScrollId).length > 0, "igScrollbar did not render vertical scrollbar");
    assert.ok(this.hScrollBar(this.vhScrollId).length > 0, "igScrollbar did not render horizontal scrollbar");

    this.testUtil.checkClass(this.vScrollBar(this.vhScrollId), 'igscroll-vcontainer');
    this.testUtil.checkClass(this.hScrollBar(this.vhScrollId), 'igscroll-hcontainer');
    this.vhScroll().remove();
});

QUnit.test(testId_6, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    assert.expect(3);
    this.vhScroll().igScroll({
        modifyDOM: true,
        scrollbarType: "none"
    });
    assert.ok(typeof this.vhScroll().data("igScroll") === "object", "igScroll did not initialize");
    assert.ok(this.vScrollBar(this.vhScrollId).length === 0, "igScrollbar rendered vertical scrollbar");
    assert.ok(this.hScrollBar(this.vhScrollId).length === 0, "igScrollbar rendered horizontal scrollbar");
    this.vhScroll().remove();
});

QUnit.test(testId_7, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    assert.expect(5);
    this.vhScroll().igScroll({
        modifyDOM: true,
        scrollbarType: "native"
    });
    assert.ok(typeof this.vhScroll().data("igScroll") === "object", "igScroll did not initialize");
    assert.ok(this.vScrollBar(this.vhScrollId).length > 0, "igScrollbar rendered vertical scrollbar");
    assert.ok(this.hScrollBar(this.vhScrollId).length > 0, "igScrollbar rendered horizontal scrollbar");

    this.testUtil.checkClass(this.vScrollBar(this.vhScrollId), 'igscroll-vnative-outer');
    this.testUtil.checkClass(this.hScrollBar(this.vhScrollId), 'igscroll-hnative-outer');
    this.vhScroll().remove();
});

QUnit.test(testId_8, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    assert.expect(3);
    this.vhScroll().igScroll({
        modifyDOM: true,
        scrollTop: 200,
        scrollLeft: 100
    });

    assert.ok(typeof this.vhScroll().data("igScroll") === "object", "igScroll did not initialize");
    assert.equal(this.vhScroll().data("igScroll")._getContentPositionX(), 100, "igScroll is not scrolled horizontally initially");
    assert.equal(this.vhScroll().data("igScroll")._getContentPositionY(), 200, "igScroll is not scrolled vertically initially");
    this.vhScroll().remove();
});

QUnit.test(testId_9, function (assert) {
    $("body").append($('<div id="elemNo" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentNoScroll));
    assert.expect(3);
    $("#elemNo").igScroll({
        modifyDOM: true,
        scrollTop: 200,
        scrollLeft: 100
    });

    assert.ok(typeof $("#elemNo").data("igScroll") === "object", "igScroll did not initialize");
    assert.equal($("#elemNo").data("igScroll")._getContentPositionX(), 0, "igScroll is scrolled horizontally initially");
    assert.equal($("#elemNo").data("igScroll")._getContentPositionY(), 0, "igScroll is scrolled vertically initially");
    $("#elemNo").remove();
});

QUnit.test(testId_10, function (assert) {
    this.util.isTouchDevice = function () { return true; };
    $("body").append($('<div id="elemNo" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentNoScroll));
    assert.expect(3);
    $("#elemNo").igScroll({
        modifyDOM: true,
        scrollTop: 200,
        scrollLeft: 100
    });

    assert.ok(typeof $("#elemNo").data("igScroll") === "object", "igScroll did not initialize");
    assert.equal($("#elemNo").data("igScroll")._getContentPositionX(), 0, "igScroll is scrolled horizontally initially");
    assert.equal($("#elemNo").data("igScroll")._getContentPositionY(), 0, "igScroll is scrolled vertically initially");
    this.util.isTouchDevice = function () { return false; };
    $("#elemNo").remove();
});

QUnit.test(testId_11, function (assert) {
    this.util.isTouchDevice = function () { return true; };
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    assert.expect(3);
    this.vhScroll().igScroll({
        modifyDOM: true,
        scrollTop: 200,
        scrollLeft: 100
    });

    assert.ok(typeof this.vhScroll().data("igScroll") === "object", "igScroll did not initialize");
    assert.equal(this.vhScroll().data("igScroll")._getContentPositionX(), 100, "igScroll is not scrolled horizontally initially");
    assert.equal(this.vhScroll().data("igScroll")._getContentPositionY(), 200, "igScroll is not scrolled vertically initially");
    this.util.isTouchDevice = function () { return false; };
    this.vhScroll().remove();
});

QUnit.test(testId_12, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    assert.expect(3);
    this.vhScroll().igScroll({
        modifyDOM: true,
        scrollbarType: "native",
        scrollTop: 200,
        scrollLeft: 100
    });

    assert.ok(typeof this.vhScroll().data("igScroll") === "object", "igScroll did not initialize");
    assert.equal(this.vhScroll().data("igScroll")._getContentPositionX(), 100, "igScroll is not scrolled horizontally initially");
    assert.equal(this.vhScroll().data("igScroll")._getContentPositionY(), 200, "igScroll is not scrolled vertically initially");
    this.vhScroll().remove();
});

QUnit.test(testId_13, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    assert.expect(3);
    this.vhScroll().igScroll({
        modifyDOM: true
    });

    assert.ok(typeof this.vhScroll().data("igScroll") === "object", "igScroll did not initialize");
    this.vhScroll().igScroll("option", "scrollTop", 500);
    assert.equal(this.vhScroll().data("igScroll")._getContentPositionY(), 500, "igScroll is not scrolled vertically initially");
    this.vhScroll().igScroll("option", "scrollLeft", 100);
    assert.equal(this.vhScroll().data("igScroll")._getContentPositionX(), 100, "igScroll is not scrolled horizontally initially");
    this.vhScroll().remove();
});

QUnit.test(testId_14, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    assert.expect(5);
    this.vhScroll().igScroll({
        modifyDOM: true,
        scrollTop: 200,
        scrollLeft: 100
    });

    assert.ok(typeof this.vhScroll().data("igScroll") === "object", "igScroll did not initialize");
    assert.equal(this.vhScroll().data("igScroll")._getContentPositionX(), 100, "igScroll is not scrolled horizontally initially");
    assert.equal(this.vhScroll().data("igScroll")._getContentPositionY(), 200, "igScroll is not scrolled vertically initially");

    this.vhScroll().igScroll("option", "scrollTop", 500);
    assert.equal(this.vhScroll().data("igScroll")._getContentPositionY(), 500, "igScroll is not scrolled vertically initially");

    this.vhScroll().igScroll("option", "scrollLeft", 200);
    assert.equal(this.vhScroll().data("igScroll")._getContentPositionX(), 200, "igScroll is not scrolled horizontally initially");
    this.vhScroll().remove();
});

QUnit.test(testId_15, function (assert) {
    $("body").append($('<div id="elemNoScroll" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentNoScroll));
    assert.expect(3);
    this.noScroll().igScroll({
        modifyDOM: true,
        scrollHeight: 1000
    });
    assert.ok(typeof this.noScroll().data("igScroll") === "object", "igScroll did not initialize");
    assert.ok(this.vScrollBar(this.noScrollId).length > 0, "igScrollbar rendered vertical scrollbar");
    assert.ok(this.hScrollBar(this.noScrollId).length === 0, "igScrollbar did not render horizontal scrollbar");
    this.noScroll().remove();
});

QUnit.test(testId_16, function (assert) {
    $("body").append($('<div id="elemNoScroll" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentNoScroll));
    assert.expect(4);
    this.noScroll().igScroll({
        modifyDOM: true,
        scrollHeight: 1000
    });
    assert.ok(typeof this.noScroll().data("igScroll") === "object", "igScroll did not initialize");
    assert.ok(this.vScrollBar(this.noScrollId).length > 0, "igScrollbar rendered vertical scrollbar");
    assert.ok(this.hScrollBar(this.noScrollId).length === 0, "igScrollbar did not render horizontal scrollbar");

    this.noScroll().igScroll("option", "scrollTop", 500);
    assert.equal(this.noScroll().data("igScroll")._getContentPositionY(), 500, "igScroll did not scroll vertically");
    this.noScroll().remove();
});

QUnit.test(testId_17, function (assert) {
    $("body").append($('<div id="elemNoScroll" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentNoScroll));
    assert.expect(3);
    this.noScroll().igScroll({
        modifyDOM: true
    });
    assert.ok(typeof this.noScroll().data("igScroll") === "object", "igScroll did not initialize");
    this.noScroll().igScroll("option", "scrollHeight", 1000);
    assert.ok(this.vScrollBar(this.noScrollId).length > 0, "igScrollbar rendered vertical scrollbar");
    assert.ok(this.hScrollBar(this.noScrollId).length === 0, "igScrollbar did not render horizontal scrollbar");
    this.noScroll().remove();
});

QUnit.test(testId_18, function (assert) {
    $("body").append($('<div id="elemNoScroll" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentNoScroll));
    assert.expect(3);
    this.noScroll().igScroll({
        modifyDOM: true,
        scrollWidth: 1000
    });
    assert.ok(typeof this.noScroll().data("igScroll") === "object", "igScroll did not initialize");
    assert.ok(this.vScrollBar(this.noScrollId).length === 0, "igScrollbar rendered vertical scrollbar");
    assert.ok(this.hScrollBar(this.noScrollId).length > 0, "igScrollbar did not render horizontal scrollbar");
    this.noScroll().remove();
});

QUnit.test(testId_19, function (assert) {
    $("body").append($('<div id="elemNoScroll" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentNoScroll));
    assert.expect(4);
    this.noScroll().igScroll({
        modifyDOM: true,
        scrollWidth: 1000
    });
    assert.ok(typeof this.noScroll().data("igScroll") === "object", "igScroll did not initialize");
    assert.ok(this.vScrollBar(this.noScrollId).length === 0, "igScrollbar rendered vertical scrollbar");
    assert.ok(this.hScrollBar(this.noScrollId).length > 0, "igScrollbar did not render horizontal scrollbar");

    this.noScroll().igScroll("option", "scrollLeft", 200);
    assert.equal(this.noScroll().data("igScroll")._getContentPositionX(), 200, "igScroll is not scrolled horizontally initially");
    this.noScroll().remove();
});

QUnit.test(testId_20, function (assert) {
    $("body").append($('<div id="elemNoScroll" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentNoScroll));
    assert.expect(3);
    this.noScroll().igScroll({
        modifyDOM: true
    });
    assert.ok(typeof this.noScroll().data("igScroll") === "object", "igScroll did not initialize");
    this.noScroll().igScroll("option", "scrollWidth", 1000);
    assert.ok(this.vScrollBar(this.noScrollId).length === 0, "igScrollbar rendered vertical scrollbar");
    assert.ok(this.hScrollBar(this.noScrollId).length > 0, "igScrollbar did not render horizontal scrollbar");
    this.noScroll().remove();
});

QUnit.test(testId_21, function (assert) {
    $("body").append($('<div id="elemNoScroll" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentNoScroll));
    assert.expect(3);
    this.noScroll().igScroll({
        modifyDOM: true,
        scrollHeight: 1000,
        scrollWidth: 1000
    });
    assert.ok(typeof this.noScroll().data("igScroll") === "object", "igScroll did not initialize");
    assert.ok(this.vScrollBar(this.noScrollId).length > 0, "igScrollbar rendered vertical scrollbar");
    assert.ok(this.hScrollBar(this.noScrollId).length > 0, "igScrollbar did not render horizontal scrollbar");
    this.noScroll().remove();
});

QUnit.test(testId_22, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    assert.expect(1);
    this.vhScroll().igScroll({
        modifyDOM: true,
        smoothing: false
    });
    var wheelEvt = jQuery.Event("wheel", { originalEvent: { deltaY: 100 }, preventDefault: function () { }, stopPropagation: function () { } });
    this.scrollContainer(this.vhScrollId).trigger(wheelEvt);

    //50 because the default scroll step is 50
    assert.equal(this.scrollContainer(this.vhScrollId).scrollTop(), 50, "");
    this.vhScroll().remove();
});

QUnit.test(testId_23, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    assert.expect(1);
    this.vhScroll().igScroll({
        modifyDOM: true,
        smoothing: false
    });
    var wheelEvtDown = jQuery.Event("wheel", { originalEvent: { deltaY: 100 }, preventDefault: function () { }, stopPropagation: function () { } }),
        wheelEvtUp = jQuery.Event("wheel", { originalEvent: { deltaY: -100 }, preventDefault: function () { }, stopPropagation: function () { } });

    this.scrollContainer(this.vhScrollId).trigger(wheelEvtDown);
    this.scrollContainer(this.vhScrollId).trigger(wheelEvtDown);
    this.scrollContainer(this.vhScrollId).trigger(wheelEvtDown);
    this.scrollContainer(this.vhScrollId).trigger(wheelEvtDown);
    this.scrollContainer(this.vhScrollId).trigger(wheelEvtUp);

    //Default scroll step is 50
    assert.equal(this.scrollContainer(this.vhScrollId).scrollTop(), 150, "");
    this.vhScroll().remove();
});

QUnit.test(testId_24, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(1);
    this.vhScroll().igScroll({
        modifyDOM: true,
        smoothing: true
    });
    var wheelEvtDown = jQuery.Event("wheel", { originalEvent: { deltaY: 100 }, preventDefault: function () { }, stopPropagation: function () { } });
    this.scrollContainer(this.vhScrollId).mouseenter();
    this.scrollContainer(this.vhScrollId).trigger(wheelEvtDown);
    done = assert.async();
    this.testUtil.wait(2000).then(function () {
        //Using the mouse wheel once is approximately 99 pixels by default
        //On non touch environment scrollTop can be used to determine the scroll position
        assert.ok(self.scrollContainer(self.vhScrollId).scrollTop() > 80, "igScroll did not scroll properly with smoothing on");
        self.vhScroll().remove();
        done();
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_25, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(2);
    this.vhScroll().igScroll({
        modifyDOM: true,
        smoothing: true,
        scrollTop: 80
    });
    var wheelEvtUp = jQuery.Event("wheel", { originalEvent: { deltaY: -100 }, preventDefault: function () { }, stopPropagation: function () { } });

    //On non touch environment scrollTop can be used to determine the scroll position
    assert.equal(this.scrollContainer(this.vhScrollId).scrollTop(), 80, "igScroll did not scroll properly with smoothing on");
    this.scrollContainer(this.vhScrollId).trigger(wheelEvtUp);
    done = assert.async();
    this.testUtil.wait(2200).then(function () {
        assert.equal(self.scrollContainer(self.vhScrollId).scrollTop(), 0, "igScroll did not scroll properly with smoothing on");
        self.vhScroll().remove();
        done();
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_26, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    assert.expect(16);
    this.vhScroll().igScroll({
        modifyDOM: true,
    });
    var vTrack = this.vTrack(this.vhScrollId),
        hTrack = this.hTrack(this.vhScrollId);
    var vDragHeightOld = parseInt(this.vDrag(this.vhScrollId).css("height"), 10);
    var hDragWidthOld = parseInt(this.hDrag(this.vhScrollId).css("width"), 10);
    //Make it smaller
    this.vhScroll().css("height", "300px");
    this.vhScroll().css("width", "500px");
    this.vhScroll().igScroll("refresh");
    var vDragHeightNew = parseInt(this.vDrag(this.vhScrollId).css("height"), 10);
    var hDragWidthNew = parseInt(this.hDrag(this.vhScrollId).css("width"), 10);
    assert.equal(this.scrollContainer(this.vhScrollId).css("height"), "300px", "igScroll container did not update it's height");
    assert.equal(this.scrollContainer(this.vhScrollId).css("width"), "500px", "igScroll container did not update it's width");
    assert.equal(this.vScrollBar(this.vhScrollId).height(), 300, "igScroll did not update vertical scrollbar container height");
    assert.equal(this.hScrollBar(this.vhScrollId).width(), 500, "igScroll did not update horizontal scrollbar container width");
    assert.ok(300 - 3 * 15 - 1 <= parseInt(vTrack.css("height"), 10) && parseInt(vTrack.css("height"), 10) <= 300 - 3 * 15 + 1, "igScroll did not update vertical track height");
    assert.ok(500 - 3 * 15 - 1 <= parseInt(hTrack.css("width"), 10) && parseInt(hTrack.css("width"), 10) <= 500 - 3 * 15 + 1, "igScroll did not update horizontal track width");
    assert.ok(vDragHeightOld > vDragHeightNew, "igScroll did not update vertical thumb drag height");
    assert.ok(hDragWidthOld > hDragWidthNew, "igScroll did not update horizontal thumb drag width");
 
    vDragHeightOld = vDragHeightNew;
    hDragWidthOld = hDragWidthNew;
    //Make it bigger
    this.vhScroll().css("height", "500px");
    this.vhScroll().css("width", "700px");
    this.vhScroll().igScroll("refresh");
    vDragHeightNew = parseInt(this.vDrag(this.vhScrollId).css("height"), 10);
    hDragWidthNew = parseInt(this.hDrag(this.vhScrollId).css("width"), 10);
    vDragHeight = Math.floor((this.vhScroll().height() - 3 * 15) * ((this.vhScroll().height() / this.elemContent(this.vhScrollId).height())));
    hDragWidth = Math.floor((this.vhScroll().width() - 3 * 15) * (this.vhScroll().width() / this.elemContent(this.vhScrollId).width()));
    assert.equal(this.scrollContainer(this.vhScrollId).css("height"), "500px", "igScroll container did not update it's height");
    assert.equal(this.scrollContainer(this.vhScrollId).css("width"), "700px", "igScroll container did not update it's width");
    assert.equal(this.vScrollBar(this.vhScrollId).height(), 500, "igScroll did not update vertical scrollbar container height");
    assert.equal(this.hScrollBar(this.vhScrollId).width(), 700, "igScroll did not update horizontal scrollbar container width");
    assert.ok(500 - 3 * 15 - 1 <= parseInt(vTrack.css("height"), 10) && parseInt(vTrack.css("height"), 10) <= 500 - 3 * 15 + 1, "igScroll did not update vertical track height");
    assert.ok(700 - 3 * 15 - 1 <= parseInt(hTrack.css("width"), 10) && parseInt(hTrack.css("width"), 10) <= 700 - 3 * 15 + 1, "igScroll did not update horizontal track width");
    assert.ok(vDragHeightOld < vDragHeightNew, "igScroll did not update vertical thumb drag height");
    assert.ok(hDragWidthOld < hDragWidthNew, "igScroll did not update horizontal thumb drag width");    
    this.vhScroll().remove();
});

QUnit.test(testId_27, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    assert.expect(8);
    this.vhScroll().igScroll({
        modifyDOM: true,
        scrollbarType: "native"
    });

    var nativeScrollSize = this.util.getScrollWidth();

    //Make it smaller
    this.vhScroll().css("height", "300px");
    this.vhScroll().css("width", "500px");
    this.vhScroll().igScroll("refresh");

    assert.equal(this.scrollContainer(this.vhScrollId).css("height"), "300px", "igScroll container did not update it's height");
    assert.equal(this.scrollContainer(this.vhScrollId).css("width"), "500px", "igScroll container did not update it's width");
    assert.equal(this.vScrollBar(this.vhScrollId).height(), 300 - nativeScrollSize, "igScroll did not update vertical scrollbar container height");
    assert.equal(this.hScrollBar(this.vhScrollId).width(), 500 - nativeScrollSize, "igScroll did not update horizontal scrollbar container width");

    //Make it bigger
    this.vhScroll().css("height", "500px");
    this.vhScroll().css("width", "700px");
    this.vhScroll().igScroll("refresh");

    assert.equal(this.scrollContainer(this.vhScrollId).css("height"), "500px", "igScroll container did not update it's height");
    assert.equal(this.scrollContainer(this.vhScrollId).css("width"), "700px", "igScroll container did not update it's width");
    assert.equal(this.vScrollBar(this.vhScrollId).height(), 500 - nativeScrollSize, "igScroll did not update vertical scrollbar container height");
    assert.equal(this.hScrollBar(this.vhScrollId).width(), 700 - nativeScrollSize, "igScroll did not update horizontal scrollbar container width");
    this.vhScroll().remove();
});

QUnit.test(testId_28, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    assert.expect(2);
    this.vhScroll().igScroll({
        modifyDOM: true,
        scrollbarType: "native"
    });

    var wheelEvtDown = jQuery.Event("wheel", { originalEvent: { deltaY: 100 }, preventDefault: function () { }, stopPropagation: function () { } });

    this.scrollContainer(this.vhScrollId).trigger(wheelEvtDown);
    this.scrollContainer(this.vhScrollId).trigger(wheelEvtDown);
    this.scrollContainer(this.vhScrollId).trigger(wheelEvtDown);
    this.scrollContainer(this.vhScrollId).trigger(wheelEvtDown);


    var posX = this.vhScroll().igScroll("option", "scrollLeft");
    var posY = this.vhScroll().igScroll("option", "scrollTop");

    assert.equal(this.scrollContainer(this.vhScrollId).scrollLeft(), posX, "igScroll container did not update it's height");
    assert.equal(this.scrollContainer(this.vhScrollId).scrollTop(), posY, "igScroll container did not update it's width");
    this.vhScroll().remove();
});

QUnit.test(testId_29, function (assert) {
    this.util.isTouchDevice = function () { return true; };
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(4);
    this.vhScroll().igScroll({
        modifyDOM: true,
        scrollbarType: "native"
    });
    done = assert.async();
    //Make sure that we are testing mobile way of scrolling despite being hybrid, because that way we use 3d transformations
    this.vhScroll().data('igScroll')._bMixedEnvironment = false;
    var touchSteps = [{ x: 0, y: 3 }, { x: 0, y: 7 }, { x: 0, y: 15 }, { x: 0, y: 15 }, { x: 0, y: 6 }, { x: 0, y: 5 }, { x: 0, y: 1 }]
    this.testUtil.simulateTouchSwipeFromCenter(this.scrollContainer(this.vhScrollId), touchSteps, 10);
    this.testUtil.wait(2000).then(function () {
        assert.equal(self.vhScroll().data("igScroll")._getContentPositionX(), 0, "igScroll scrolled horizontally by the swipe");
        assert.equal(self.vhScroll().data("igScroll")._getContentPositionY(), 52, "igScroll did not scroll properly vertically");

        var posX = self.vhScroll().igScroll("option", "scrollLeft");
        var posY = self.vhScroll().igScroll("option", "scrollTop");

        assert.equal(-(self.getTransform3dValueX(self.elemContent(self.vhScrollId))), posX, "igScroll container did not update it's height");
        assert.equal(-(self.getTransform3dValueY(self.elemContent(self.vhScrollId))), posY, "igScroll container did not update it's width");
        self.util.isTouchDevice = function () { return false; };
        self.vhScroll().remove();
        done();
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_30, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(14);
    this.vhScroll().igScroll({
        modifyDOM: true
    });
    done = assert.async();
    this.testUtil.wait(650).then(function () {
        assert.equal(self.arrowUp(self.vhScrollId).css("opacity"), 0, "igScroll scrollbar Arrow Up is visible");
        assert.equal(self.arrowDown(self.vhScrollId).css("opacity"), 0, "igScroll scrollbar Arrow Down is visible");
        assert.equal(self.arrowLeft(self.vhScrollId).css("opacity"), 0, "igScroll scrollbar Arrow Left is visible");
        assert.equal(self.arrowRight(self.vhScrollId).css("opacity"), 0, "igScroll scrollbar Arrow Right is visible");
        assert.ok(self.vDrag(self.vhScrollId).css("opacity") > 0.7, "igScroll vertical scrollbar thumb drag is not visible");
        assert.ok(self.hDrag(self.vhScrollId).css("opacity") > 0.7, "igScroll horizontal scrollbar thumb drag is not visible");
        assert.equal(self.vDrag(self.vhScrollId).css("width"), "5px", "igScroll vertical scrollbar thumb drag is big");
        assert.equal(self.hDrag(self.vhScrollId).css("height"), "5px", "igScroll horizontal scrollbar thumb drag is big");
        return self.testUtil.wait(2100);
    }).then(function () {
        assert.equal(self.arrowUp(self.vhScrollId).css("opacity"), 0, "igScroll scrollbar Arrow Up is visible");
        assert.equal(self.arrowDown(self.vhScrollId).css("opacity"), 0, "igScroll scrollbar Arrow Down is visible");
        assert.equal(self.arrowLeft(self.vhScrollId).css("opacity"), 0, "igScroll scrollbar Arrow Left is visible");
        assert.equal(self.arrowRight(self.vhScrollId).css("opacity"), 0, "igScroll scrollbar Arrow Right is visible");
        assert.equal(self.vDrag(self.vhScrollId).css("opacity"), 0, "igScroll vertical scrollbar thumb drag is visible");
        assert.equal(self.hDrag(self.vhScrollId).css("opacity"), 0, "igScroll horizontal scrollbar thumb drag is visible");
        self.vhScroll().remove();
        done();
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_31, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(8);
    this.vhScroll().igScroll({
        modifyDOM: true
    });
    this.scrollContainer(this.vhScrollId).mouseenter();
    done = assert.async();
    this.testUtil.wait(200).then(function () {
        assert.equal(self.arrowUp(self.vhScrollId).css("opacity"), 0, "igScroll scrollbar Arrow Up is visible");
        assert.equal(self.arrowDown(self.vhScrollId).css("opacity"), 0, "igScroll scrollbar Arrow Down is visible");
        assert.equal(self.arrowLeft(self.vhScrollId).css("opacity"), 0, "igScroll scrollbar Arrow Left is visible");
        assert.equal(self.arrowRight(self.vhScrollId).css("opacity"), 0, "igScroll scrollbar Arrow Right is visible");
        assert.ok(self.vDrag(self.vhScrollId).css("opacity") > 0.89, "igScroll vertical scrollbar thumb drag is not visible");
        assert.ok(self.hDrag(self.vhScrollId).css("opacity") > 0.89, "igScroll horizontal scrollbar thumb drag is not visible");
        assert.equal(self.vDrag(self.vhScrollId).css("width"), "5px", "igScroll vertical scrollbar thumb drag is big");
        assert.equal(self.hDrag(self.vhScrollId).css("height"), "5px", "igScroll horizontal scrollbar thumb drag is big");
        self.vhScroll().remove();
        done();
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_32, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(2);
    this.vhScroll().igScroll({
        modifyDOM: true
    });
    this.scrollContainer(this.vhScrollId).mouseleave();
    done = assert.async();
    this.testUtil.wait(2100).then(function () {
        assert.equal(self.vDrag(self.vhScrollId).css("opacity"), 0, "igScroll vertical scrollbar thumb is visible");
        assert.equal(self.hDrag(self.vhScrollId).css("opacity"), 0, "igScroll horizontal scrollbar thumb is visible");
        self.vhScroll().remove();
        done();
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_33, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(4);
    this.vhScroll().igScroll({
        modifyDOM: true
    });
    this.scrollContainer(this.vhScrollId).mouseleave();
    done = assert.async();
    this.testUtil.wait(2100).then(function () {
        assert.ok(self.vDrag(self.vhScrollId).hasClass(self.hiddenVBarClass), "igScroll vertical scrollbar thumb drag is visible");
        assert.ok(self.hDrag(self.vhScrollId).hasClass(self.hiddenHBarClass), "igScroll horizontal scrollbar thumb drag is visible");

        self.scrollContainer(self.vhScrollId).mouseenter();
        assert.notOk(self.vDrag(self.vhScrollId).hasClass(self.hiddenVBarClass), "igScroll vertical scrollbar thumb drag is not visible");
        assert.notOk(self.hDrag(self.vhScrollId).hasClass(self.hiddenHBarClass), "igScroll horizontal scrollbar thumb drag is not visible");
        self.vhScroll().remove();
        done();
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_34, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    assert.expect(16);
    this.vhScroll().igScroll({
        modifyDOM: true
    });
    this.scrollContainer(this.vhScrollId).mouseenter();
    assert.ok(this.arrowUp(this.vhScrollId).hasClass(this.hiddenVArrowClass), "igScroll scrollbar Arrow Up is not visible");
    assert.ok(this.arrowDown(this.vhScrollId).hasClass(this.hiddenVArrowClass), "igScroll scrollbar Arrow Down is not visible");
    assert.ok(this.arrowLeft(this.vhScrollId).hasClass(this.hiddenHArrowClass), "igScroll scrollbar Arrow Left is not visible");
    assert.ok(this.arrowRight(this.vhScrollId).hasClass(this.hiddenHArrowClass), "igScroll scrollbar Arrow Right is not visible");
    assert.notOk(this.vDrag(this.vhScrollId).hasClass(this.hiddenVBarClass), "igScroll vertical scrollbar thumb drag is not visible");
    assert.notOk(this.hDrag(this.vhScrollId).hasClass(this.hiddenHBarClass), "igScroll horizontal scrollbar thumb drag is not visible");

    this.vScrollBar(this.vhScrollId).mouseenter();
    assert.notOk(this.arrowUp(this.vhScrollId).hasClass(this.hiddenVArrowClass), "igScroll scrollbar Arrow Up is not visible");
    assert.notOk(this.arrowDown(this.vhScrollId).hasClass(this.hiddenVArrowClass), "igScroll scrollbar Arrow Down is not visible");
    assert.notOk(this.arrowLeft(this.vhScrollId).hasClass(this.hiddenHArrowClass), "igScroll scrollbar Arrow Left is not visible");
    assert.notOk(this.arrowRight(this.vhScrollId).hasClass(this.hiddenHArrowClass), "igScroll scrollbar Arrow Right is not visible");
    assert.notOk(this.vDrag(this.vhScrollId).hasClass(this.hiddenVBarClass), "igScroll vertical scrollbar thumb drag is not visible");
    assert.notOk(this.hDrag(this.vhScrollId).hasClass(this.hiddenHBarClass), "igScroll horizontal scrollbar thumb drag is not visible");
    assert.ok(this.vDrag(this.vhScrollId).hasClass(this.vBarBigClass), "igScroll vertical scrollbar thumb drag is not big");
    assert.notOk(this.vDrag(this.vhScrollId).hasClass(this.vBarThinClass), "igScroll vertical scrollbar thumb drag is not big");
    assert.ok(this.hDrag(this.vhScrollId).hasClass(this.hBarBigClass), "igScroll horizontal scrollbar thumb drag is not big");
    assert.notOk(this.hDrag(this.vhScrollId).hasClass(this.hBarThinClass), "igScroll horizontal scrollbar thumb drag is not big");
    this.vhScroll().remove();
});

QUnit.test(testId_35, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(14);
    this.vhScroll().igScroll({
        modifyDOM: true
    });
    done = assert.async();
    this.scrollContainer(this.vhScrollId).mouseenter();
    this.testUtil.wait(2200).then(function () {
    assert.equal(self.arrowUp(self.vhScrollId).css("opacity"), 0, "igScroll scrollbar Arrow Up is visible");
    assert.equal(self.arrowDown(self.vhScrollId).css("opacity"), 0, "igScroll scrollbar Arrow Down is visible");
    assert.equal(self.arrowLeft(self.vhScrollId).css("opacity"), 0, "igScroll scrollbar Arrow Left is visible");
    assert.equal(self.arrowRight(self.vhScrollId).css("opacity"), 0, "igScroll scrollbar Arrow Right is visible");
    assert.ok(self.vDrag(self.vhScrollId).css("opacity") > 0, "igScroll vertical scrollbar thumb drag is big");
    assert.ok(self.hDrag(self.vhScrollId).css("opacity") > 0, "igScroll horizontal scrollbar thumb drag is big");

    self.vScrollBar(self.vhScrollId).mouseenter();
    self.vScrollBar(self.vhScrollId).mouseleave();
    self.scrollContainer(self.vhScrollId).mouseenter();

    self.testUtil.wait(2200).then(function () {
        assert.equal(self.arrowUp(self.vhScrollId).css("opacity"), 0, "igScroll scrollbar Arrow Up is visible");
        assert.equal(self.arrowDown(self.vhScrollId).css("opacity"), 0, "igScroll scrollbar Arrow Down is visible");
        assert.equal(self.arrowLeft(self.vhScrollId).css("opacity"), 0, "igScroll scrollbar Arrow Left is visible");
        assert.equal(self.arrowRight(self.vhScrollId).css("opacity"), 0, "igScroll scrollbar Arrow Right is visible");
        assert.ok(self.vDrag(self.vhScrollId).css("opacity") > 0, "igScroll vertical scrollbar thumb drag is big");
        assert.ok(self.hDrag(self.vhScrollId).css("opacity") > 0, "igScroll horizontal scrollbar thumb drag is big");
        assert.equal(self.vDrag(self.vhScrollId).css("width"), "5px", "igScroll vertical scrollbar thumb drag is not big");
        assert.equal(self.hDrag(self.vhScrollId).css("height"), "5px", "igScroll horizontal scrollbar thumb drag is not big");
        self.vhScroll().remove();
        done();
    })
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_36, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(12);
    this.vhScroll().igScroll({
        modifyDOM: true
    });
    this.scrollContainer(this.vhScrollId).mouseleave();
    done = assert.async();
    this.testUtil.wait(2100).then(function () {
        assert.ok(self.vDrag(self.vhScrollId).hasClass(self.hiddenVBarClass), "igScroll vertical scrollbar thumb drag is visible");
        assert.ok(self.hDrag(self.vhScrollId).hasClass(self.hiddenHBarClass), "igScroll horizontal scrollbar thumb drag is visible");

        self.vScrollBar(self.vhScrollId).mouseenter();
        assert.notOk(self.arrowUp(self.vhScrollId).hasClass(self.hiddenVArrowClass), "igScroll scrollbar Arrow Up is not visible");
        assert.notOk(self.arrowDown(self.vhScrollId).hasClass(self.hiddenVArrowClass), "igScroll scrollbar Arrow Down is not visible");
        assert.notOk(self.arrowLeft(self.vhScrollId).hasClass(self.hiddenHArrowClass), "igScroll scrollbar Arrow Left is not visible");
        assert.notOk(self.arrowRight(self.vhScrollId).hasClass(self.hiddenHArrowClass), "igScroll scrollbar Arrow Right is not visible");
        assert.notOk(self.vDrag(self.vhScrollId).hasClass(self.hiddenVBarClass), "igScroll vertical scrollbar thumb drag is not visible");
        assert.notOk(self.hDrag(self.vhScrollId).hasClass(self.hiddenHBarClass), "igScroll horizontal scrollbar thumb drag is not visible");
        assert.ok(self.vDrag(self.vhScrollId).hasClass(self.vBarBigClass), "igScroll vertical scrollbar thumb drag is not big");
        assert.notOk(self.vDrag(self.vhScrollId).hasClass(self.vBarThinClass), "igScroll vertical scrollbar thumb drag is not big");
        assert.ok(self.hDrag(self.vhScrollId).hasClass(self.hBarBigClass), "igScroll horizontal scrollbar thumb drag is not big");
        assert.notOk(self.hDrag(self.vhScrollId).hasClass(self.hBarThinClass), "igScroll horizontal scrollbar thumb drag is not big");
        self.vhScroll().remove();
        done();
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_37, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(3);
    this.vhScroll().igScroll({
        modifyDOM: true
    });

    this.vScrollBar(this.vhScrollId).mouseenter();
    assert.ok(this.arrowDown(this.vhScrollId).css("opacity") > 0, "igScroll scrollbar Arrow Down is not visible");

    this.testUtil.simulateSingleClick(this.arrowDown(this.vhScrollId));
    assert.equal(this.scrollContainer(this.vhScrollId).scrollTop(), 40, "igScroll did not scroll properly");

    done = assert.async();
    this.testUtil.wait(25).then(function () {
        var scrollbarPixelContentRatio =  (40 / (self.elemContent(self.vhScrollId).height() - self.scrollContainer(self.vhScrollId).height())) * 
        (self.vTrack(self.vhScrollId).height() - self.vDrag(self.vhScrollId).height());
 +		assert.equal((self.getTransform3dValueY(self.vDrag(self.vhScrollId))).toFixed(4), (scrollbarPixelContentRatio).toFixed(4), "igScroll did not update scrollbar position properly");
        self.vhScroll().remove();
        done();
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_38, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    this.vhScroll().igScroll({
        modifyDOM: true
    });
    this.vhScroll().igScroll("option", "scrollTop", this.elemContent(this.vhScrollId).height() - this.scrollContainer(this.vhScrollId).height());
    this.vScrollBar(this.vhScrollId).mouseenter();
    assert.notOk(this.arrowDown(this.vhScrollId).hasClass(this.hiddenVArrowClass), "igScroll scrollbar Arrow Down is not visible");

    this.testUtil.simulateSingleClick(this.arrowDown(this.vhScrollId));
    assert.equal(this.scrollContainer(this.vhScrollId).scrollTop(), this.elemContent(this.vhScrollId).height() - this.scrollContainer(this.vhScrollId).height(), "igScroll did not scroll properly");
    this.vhScroll().remove();
});

QUnit.test(testId_39, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(2);
    this.vhScroll().igScroll({
        modifyDOM: true
    });
    this.vScrollBar(this.vhScrollId).mouseenter();
    assert.ok(this.arrowDown(this.vhScrollId).css("opacity") > 0, "igScroll scrollbar Arrow Down is not visible");

    this.testUtil.simulateClickAndHold(this.arrowDown(this.vhScrollId), 325);

    done = assert.async();
    this.testUtil.wait(400).then(function () {
        assert.equal(self.scrollContainer(self.vhScrollId).scrollTop(), 120, "igScroll did not scroll properly");
        self.vhScroll().remove();
        done();
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_40, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(3);
    this.vhScroll().igScroll({
        modifyDOM: true
    });
    this.vScrollBar(this.vhScrollId).mouseenter();
    assert.ok(this.arrowDown(this.vhScrollId).css("opacity") > 0, "igScroll scrollbar Arrow Down is not visible");

    this.testUtil.simulateClickAndHold(this.arrowDown(this.vhScrollId), 375);

    done = assert.async();
    this.testUtil.wait(325).then(function () {
        assert.equal(self.scrollContainer(self.vhScrollId).scrollTop(), 120, "igScroll did not scroll properly");
        self.arrowDown(self.vhScrollId).mouseout();
        $(window).mouseup();
        self.arrowDown(self.vhScrollId).mouseover();
        self.testUtil.wait(50).then(function () {
            assert.equal(self.scrollContainer(self.vhScrollId).scrollTop(), 120, "igScroll did not scroll properly");
            self.vhScroll().remove();
            done();
        });
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_41, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(4);
    this.vhScroll().igScroll({
        modifyDOM: true
    });
    this.vScrollBar(this.vhScrollId).mouseenter();
    assert.ok(this.arrowDown(this.vhScrollId).css("opacity") > 0, "igScroll scrollbar Arrow Down is not visible");

    this.testUtil.simulateClickAndHold(this.arrowDown(this.vhScrollId), 500);

    done = assert.async();
    this.testUtil.wait(325).then(function () {
        assert.equal(self.scrollContainer(self.vhScrollId).scrollTop(), 120, "igScroll did not scroll properly");
        self.arrowDown(self.vhScrollId).mouseout();
        self.testUtil.wait(100).then(function () {
            assert.equal(self.scrollContainer(self.vhScrollId).scrollTop(), 120, "igScroll did not scroll properly");
            self.arrowDown(self.vhScrollId).mouseover();
            self.testUtil.wait(100).then(function () {
                assert.equal(self.scrollContainer(self.vhScrollId).scrollTop(), 200, "igScroll did not scroll properly");
                self.vhScroll().remove();
                done();
            });
        });
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_42, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(5);
    this.vhScroll().igScroll({
        modifyDOM: true
    });

    this.vScrollBar(this.vhScrollId).mouseenter();
    assert.ok(this.arrowDown(this.vhScrollId).css("opacity") > 0, "igScroll scrollbar Arrow Down is not visible");
    assert.ok(this.arrowUp(this.vhScrollId).css("opacity") > 0, "igScroll scrollbar Arrow Down is not visible");

    this.testUtil.simulateSingleClick(this.arrowDown(this.vhScrollId));
    this.testUtil.simulateSingleClick(this.arrowDown(this.vhScrollId));
    assert.equal(this.scrollContainer(this.vhScrollId).scrollTop(), 80, "igScroll did not scroll properly");

    this.testUtil.simulateSingleClick(this.arrowUp(this.vhScrollId));
    assert.equal(this.scrollContainer(this.vhScrollId).scrollTop(), 40, "igScroll did not scroll properly");

    done = assert.async();
    this.testUtil.wait(500).then(function () {
        var scrollbarPixelContentRatio = (40 / (self.elemContent(self.vhScrollId).height() - self.scrollContainer(self.vhScrollId).height())) * 
            (self.vTrack(self.vhScrollId).height() - self.vDrag(self.vhScrollId).height());
        assert.equal((self.getTransform3dValueY(self.vDrag(self.vhScrollId))).toFixed(4), (scrollbarPixelContentRatio).toFixed(4), "igScroll did not update scrollbar position properly");
        self.vhScroll().remove();
        done();
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_43, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    assert.expect(4);
    this.vhScroll().igScroll({
        modifyDOM: true
    });

    this.vScrollBar(this.vhScrollId).mouseenter();
    assert.ok(this.arrowDown(this.vhScrollId).css("opacity") > 0, "igScroll scrollbar Arrow Down is not visible");
    assert.ok(this.arrowUp(this.vhScrollId).css("opacity") > 0, "igScroll scrollbar Arrow Down is not visible");

    this.testUtil.simulateSingleClick(this.arrowDown(this.vhScrollId));
    assert.equal(this.scrollContainer(this.vhScrollId).scrollTop(), 40, "igScroll did not scroll properly");

    this.testUtil.simulateSingleClick(this.arrowUp(this.vhScrollId));
    assert.equal(this.scrollContainer(this.vhScrollId).scrollTop(), 0, "igScroll did not scroll properly");
    this.vhScroll().remove();
});

QUnit.test(testId_44, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    assert.expect(2);
    this.vhScroll().igScroll({
        modifyDOM: true
    });
    this.vScrollBar(this.vhScrollId).mouseenter();
    assert.ok(this.arrowUp(this.vhScrollId).css("opacity") > 0, "igScroll scrollbar Arrow Down is not visible");

    this.testUtil.simulateSingleClick(this.arrowUp(this.vhScrollId));
    assert.equal(this.scrollContainer(this.vhScrollId).scrollTop(), 0, "igScroll did not scroll properly");
    this.vhScroll().remove();
});

QUnit.test(testId_45, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    this.vhScroll().igScroll({
        modifyDOM: true,
        scrollTop: 500
    });
    this.vScrollBar(this.vhScrollId).mouseenter();
    assert.ok(this.arrowUp(this.vhScrollId).css("opacity") > 0, "igScroll scrollbar Arrow Down is not visible");

    this.testUtil.simulateClickAndHold(this.arrowUp(this.vhScrollId), 325);

    done = assert.async();
    this.testUtil.wait(400).then(function () {
        //500 minus 120
        assert.equal(self.scrollContainer(self.vhScrollId).scrollTop(), 380, "igScroll did not scroll properly");
        self.vhScroll().remove();
        done();
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_46, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(3);
    this.vhScroll().igScroll({
        modifyDOM: true,
        scrollTop: 500
    });
    this.vScrollBar(this.vhScrollId).mouseenter();
    assert.ok(this.arrowUp(this.vhScrollId).css("opacity") > 0, "igScroll scrollbar Arrow Down is not visible");

    this.testUtil.simulateClickAndHold(this.arrowUp(this.vhScrollId), 375);
    done = assert.async();
    this.testUtil.wait(325).then(function () {
        //500 minus 120
        assert.equal(self.scrollContainer(self.vhScrollId).scrollTop(), 380, "igScroll did not scroll properly");

        self.arrowUp(self.vhScrollId).mouseout();
        $(window).mouseup();
        self.arrowUp(self.vhScrollId).mouseover();

        self.testUtil.wait(50).then(function () {
            //500 minus 160
            assert.equal(self.scrollContainer(self.vhScrollId).scrollTop(), 380, "igScroll did not scroll properly");
            self.vhScroll().remove();
            done();
        });
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_47, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(4);
    this.vhScroll().igScroll({
        modifyDOM: true,
        scrollTop: 500
    });
    this.vScrollBar(this.vhScrollId).mouseenter();
    assert.ok(this.arrowUp(this.vhScrollId).css("opacity") > 0, "igScroll scrollbar Arrow Up is not visible");
    this.testUtil.simulateClickAndHold(this.arrowUp(this.vhScrollId), 500);
    done = assert.async();
    this.testUtil.wait(325).then(function () {
        //500 minus 120
        assert.equal(self.scrollContainer(self.vhScrollId).scrollTop(), 380, "igScroll did not scroll properly");
        self.arrowUp(self.vhScrollId).mouseout();
        self.testUtil.wait(100).then(function () {
            //500 minus 160
            assert.equal(self.scrollContainer(self.vhScrollId).scrollTop(), 380, "igScroll did not scroll properly");
            self.arrowUp(self.vhScrollId).mouseover();
            self.testUtil.wait(100).then(function () {
                //500 minus 160
                assert.equal(self.scrollContainer(self.vhScrollId).scrollTop(), 300, "igScroll did not scroll properly");
                self.vhScroll().remove();
                done();
            });
        });
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_48, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(3);
    this.vhScroll().igScroll({
        modifyDOM: true,
        scrollLeft: 100
    });
    this.hScrollBar(this.vhScrollId).mouseenter();
    assert.ok(this.arrowLeft(this.vhScrollId).css("opacity") > 0, "igScroll scrollbar Arrow Down is not visible");

    this.testUtil.simulateSingleClick(this.arrowLeft(this.vhScrollId));
    assert.equal(this.scrollContainer(this.vhScrollId).scrollLeft(), 60, "igScroll did not scroll properly");

    done = assert.async();
    this.testUtil.wait(25).then(function () {
        var scrollbarPixelContentRatio = (60 / (self.elemContent(self.vhScrollId).width() - self.scrollContainer(self.vhScrollId).width())) * 
        (self.hTrack(self.vhScrollId).width() - self.hDrag(self.vhScrollId).width());
        assert.equal((self.getTransform3dValueX(self.hDrag(self.vhScrollId))).toFixed(4), (scrollbarPixelContentRatio).toFixed(4), "igScroll did not update scrollbar position properly");
        self.vhScroll().remove();
        done();
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_49, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    assert.expect(2);
    this.vhScroll().igScroll({
        modifyDOM: true,
        scrollLeft: 40
    });
    this.hScrollBar(this.vhScrollId).mouseenter();
    assert.ok(this.arrowLeft(this.vhScrollId).css("opacity") > 0, "igScroll scrollbar Arrow Down is not visible");

    this.testUtil.simulateSingleClick(this.arrowLeft(this.vhScrollId));
    assert.equal(this.scrollContainer(this.vhScrollId).scrollLeft(), 0, "igScroll did not scroll properly");
    this.vhScroll().remove();
});

QUnit.test(testId_50, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    assert.expect(2);
    this.vhScroll().igScroll({
        modifyDOM: true,
    });
    this.hScrollBar(this.vhScrollId).mouseenter();
    assert.ok(this.arrowLeft(this.vhScrollId).css("opacity") > 0, "igScroll scrollbar Arrow Down is not visible");

    this.testUtil.simulateSingleClick(this.arrowLeft(this.vhScrollId));
    assert.equal(this.scrollContainer(this.vhScrollId).scrollLeft(), 0, "igScroll did not scroll properly");
    this.vhScroll().remove();
});

QUnit.test(testId_51, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(2);
    this.vhScroll().igScroll({
        modifyDOM: true,
        scrollLeft: 180
    });
    this.hScrollBar(this.vhScrollId).mouseenter();
    assert.ok(this.arrowLeft(this.vhScrollId).css("opacity") > 0, "igScroll scrollbar Arrow Down is not visible");

    this.testUtil.simulateClickAndHold(this.arrowLeft(this.vhScrollId), 325);

    done = assert.async();
    this.testUtil.wait(400).then(function () {
        assert.equal(self.scrollContainer(self.vhScrollId).scrollLeft(), 60, "igScroll did not scroll properly");
        self.vhScroll().remove();
        done();
    }, 400);
});

QUnit.test(testId_52, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(3);
    this.vhScroll().igScroll({
        modifyDOM: true,
        scrollLeft: 180
    });

    this.hScrollBar(this.vhScrollId).mouseenter();
    assert.ok(this.arrowLeft(this.vhScrollId).css("opacity") > 0, "igScroll scrollbar Arrow Down is not visible");

    this.testUtil.simulateClickAndHold(this.arrowLeft(this.vhScrollId), 375);
    done = assert.async();
    this.testUtil.wait(325).then(function () {
        assert.equal(self.scrollContainer(self.vhScrollId).scrollLeft(), 60, "igScroll did not scroll properly");

        self.arrowLeft(self.vhScrollId).mouseout();
        $(window).mouseup();
        self.arrowLeft(self.vhScrollId).mouseover();

        self.testUtil.wait(50).then(function () {
            assert.equal(self.scrollContainer(self.vhScrollId).scrollLeft(), 60, "igScroll continued scrolling left after hovering left arrow again");
            self.vhScroll().remove();
            done();
        });
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_53, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(3);
    this.vhScroll().igScroll({
        modifyDOM: true
    });
    this.hScrollBar(this.vhScrollId).mouseenter();
    assert.ok(this.arrowRight(this.vhScrollId).css("opacity") > 0, "igScroll scrollbar Arrow Down is not visible");

    this.testUtil.simulateSingleClick(this.arrowRight(this.vhScrollId));
    assert.equal(this.scrollContainer(this.vhScrollId).scrollLeft(), 40, "igScroll did not scroll properly");
    done = assert.async();
    this.testUtil.wait(25).then(function () {
        var scrollContainerWidth = self.scrollContainer(self.vhScrollId).width(),
            contentWidth = self.elemContent(self.vhScrollId).width(),
            hTrackWidth = self.hTrack(self.vhScrollId).width(),
            hDragWidth = self.hDrag(self.vhScrollId).width(),
            scrollbarPixelContentRatio = (40 / (contentWidth - scrollContainerWidth)) * (hTrackWidth - hDragWidth),
            expectedPosY = self.getTransform3dValueX(self.hDrag(self.vhScrollId));

        assert.equal(expectedPosY.toFixed(3), scrollbarPixelContentRatio.toFixed(3), "igScroll did not update scrollbar position properly");
        self.vhScroll().remove();
        done();
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});


QUnit.test(testId_54, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    assert.expect(2);
    this.vhScroll().igScroll({
        modifyDOM: true
    });
    this.vhScroll().igScroll("option", "scrollLeft", this.elemContent(this.vhScrollId).width() - this.scrollContainer(this.vhScrollId).width());
    this.hScrollBar(this.vhScrollId).mouseenter();
    assert.notOk(this.arrowRight(this.vhScrollId).hasClass(this.hiddenHArrowClass), "igScroll scrollbar Arrow Down is not visible");

    this.testUtil.simulateSingleClick(this.arrowRight(this.vhScrollId));
    assert.equal(this.scrollContainer(this.vhScrollId).scrollLeft(), this.elemContent(this.vhScrollId).width() -
        this.scrollContainer(this.vhScrollId).width(), "igScroll did not scroll properly");
    this.vhScroll().remove();
});

QUnit.test(testId_55, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(2);
    this.vhScroll().igScroll({
        modifyDOM: true
    });
    this.hScrollBar(this.vhScrollId).mouseenter();
    assert.ok(this.arrowRight(this.vhScrollId).css("opacity") > 0, "igScroll scrollbar Arrow Down is not visible");

    this.testUtil.simulateClickAndHold(this.arrowRight(this.vhScrollId), 325);
    done = assert.async();
    this.testUtil.wait(400).then(function () {
        assert.equal(self.scrollContainer(self.vhScrollId).scrollLeft(), 120, "igScroll did not scroll properly");
        self.vhScroll().remove();
        done();
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_56, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(3);
    this.vhScroll().igScroll({
        modifyDOM: true
    });
    this.hScrollBar(this.vhScrollId).mouseenter();
    assert.ok(this.arrowRight(this.vhScrollId).css("opacity") > 0, "igScroll scrollbar Arrow Down is not visible");

    this.testUtil.simulateClickAndHold(this.arrowRight(this.vhScrollId), 375);
    done = assert.async();
    this.testUtil.wait(325).then(function () {
        assert.equal(self.scrollContainer(self.vhScrollId).scrollLeft(), 120, "igScroll did not scroll properly");
        self.arrowRight(self.vhScrollId).mouseout();
        $(window).mouseup();
        self.arrowRight(self.vhScrollId).mouseover();

        self.testUtil.wait(50).then(function () {
            assert.equal(self.scrollContainer(self.vhScrollId).scrollLeft(), 120, "igScroll continued scrolling right after hovering right arrow again");
            self.vhScroll().remove();
            done();
        });
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_57, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(2);
    this.vhScroll().igScroll({
        modifyDOM: true
    });
    this.vScrollBar(this.vhScrollId).mouseenter();
    this.testUtil.simulateSingleClick(this.vTrack(this.vhScrollId), { offsetY: 300 });
    done = assert.async();
    this.testUtil.wait(25).then(function () {
        assert.equal(self.scrollContainer(self.vhScrollId).scrollTop(), self.vhScroll().height(), "igScroll did not scroll properly");
        var scrollContainerHeight = self.scrollContainer(self.vhScrollId).height(),
            contentHeight = self.elemContent(self.vhScrollId).height(),
            vTrackHeight = self.vTrack(self.vhScrollId).height(),
            vDragHeight = self.vDrag(self.vhScrollId).height(),
            scrollbarPixelContentRatio = (self.vhScroll().height() / (contentHeight - scrollContainerHeight)) * (vTrackHeight - vDragHeight),
            expectedPosY = self.getTransform3dValueY(self.vDrag(self.vhScrollId));

        assert.equal(expectedPosY.toFixed(4), scrollbarPixelContentRatio.toFixed(4), "igScroll did not scroll properly");
        self.vhScroll().remove();
        done();
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_58, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(2);
    this.vhScroll().igScroll({
        modifyDOM: true
    });
    //scroll to the bottom first
    var bottomPos = this.elemContent(this.vhScrollId).height() - this.scrollContainer(this.vhScrollId).height();
    this.vhScroll().igScroll("option", "scrollTop", bottomPos);
    done = assert.async();
    this.testUtil.wait(100).then(function () {
        self.vScrollBar(self.vhScrollId).mouseenter();
        self.testUtil.simulateSingleClick(self.vTrack(self.vhScrollId), { offsetY: 150 });
        assert.equal(self.scrollContainer(self.vhScrollId).scrollTop(), bottomPos - self.scrollContainer(self.vhScrollId).height(), "igScroll did not scroll properly");

        self.testUtil.wait(100).then(function () {
            var scrollContainerHeight = self.scrollContainer(self.vhScrollId).height(),
                contentHeight = self.elemContent(self.vhScrollId).height(),
                vTrackHeight = self.vTrack(self.vhScrollId).height(),
                vDragHeight = self.vDrag(self.vhScrollId).height(),
                scrollbarPixelContentRatio = (bottomPos - scrollContainerHeight) / (contentHeight - scrollContainerHeight) * (vTrackHeight - vDragHeight),
                expectedPosY = self.getTransform3dValueY(self.vDrag(self.vhScrollId));

            assert.equal(expectedPosY.toFixed(3), scrollbarPixelContentRatio.toFixed(3), "igScroll did not scroll properly");
            self.vhScroll().remove();
            done();
        });
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_59, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(1);
    this.vhScroll().igScroll({
        modifyDOM: true,
        scrollHeight: 5000
    });
    this.vScrollBar(this.vhScrollId).mouseenter();
    this.testUtil.simulateClickAndHold(this.vTrack(this.vhScrollId), 325, { offsetY: 250 });
    done = assert.async();
    this.testUtil.wait(400).then(function () {
        assert.equal(self.scrollContainer(self.vhScrollId).scrollTop(), 3 * self.scrollContainer(self.vhScrollId).height(), "igScroll did not scroll properly");
        self.vhScroll().remove();
        done();
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_60, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(1);
    this.vhScroll().igScroll({
        modifyDOM: true,
        scrollHeight: 5000
    });
    //scroll to the bottom first
    this.vhScroll().igScroll("option", "scrollTop", this.elemContent(this.vhScrollId).height() - this.scrollContainer(this.vhScrollId).height());
    done = assert.async();
    this.testUtil.wait(100).then(function () {
        self.vScrollBar(self.vhScrollId).mouseenter();
        self.testUtil.simulateClickAndHold(self.vTrack(self.vhScrollId), 325, { offsetY: 150 });
        self.testUtil.wait(400).then(function () {
            assert.equal(self.scrollContainer(self.vhScrollId).scrollTop(), (self.elemContent(self.vhScrollId).height() - self.scrollContainer(self.vhScrollId).height()) - 3 * self.scrollContainer(self.vhScrollId).height(),
                "igScroll did not scroll properly");
            self.vhScroll().remove();
            done();
        });
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_61, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(2);
    this.vhScroll().igScroll({
        modifyDOM: true,
        scrollHeight: 5000
    });
    done = assert.async();
    this.testUtil.wait(100).then(function () {
        self.vScrollBar(self.vhScrollId).mouseenter();
        self.testUtil.simulateClickAndHold(self.vTrack(self.vhScrollId), 400, { offsetY: 350 });
        //Wait a while to move out of the track area
        self.testUtil.wait(200).then(function () {
            self.vTrack(self.vhScrollId).mouseout();
            assert.ok(self.scrollContainer(self.vhScrollId).scrollTop() < 4 * self.scrollContainer(self.vhScrollId).height(), "igScroll should not scroll fully");

            //Verify that it donesn't continue to scroll
            self.testUtil.wait(500).then(function () {
                assert.notEqual(self.scrollContainer(self.vhScrollId).scrollTop(), 4 * self.scrollContainer(self.vhScrollId).height(), "igScroll scrolled after moving the mouse out of the track while holding");
                self.vhScroll().remove();
                done();
            });
        });
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_62, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(2);
    this.vhScroll().igScroll({
        modifyDOM: true,
        scrollHeight: 5000
    });
    //scroll to the bottom first
    this.vhScroll().igScroll("option", "scrollTop", this.elemContent(this.vhScrollId).height() - this.scrollContainer(this.vhScrollId).height());
    done = assert.async();
    this.testUtil.wait(100).then(function () {
        self.vScrollBar(self.vhScrollId).mouseenter();
        self.testUtil.simulateClickAndHold(self.vTrack(self.vhScrollId), 400, { offsetY: 150 });
        //Wait 100ms and then move out of the track area before the hold is finished
        self.testUtil.wait(350).then(function () {
            self.vTrack(self.vhScrollId).mouseout();
            assert.equal(self.scrollContainer(self.vhScrollId).scrollTop(),
                (self.elemContent(self.vhScrollId).height() - self.scrollContainer(self.vhScrollId).height()) - 3 * self.scrollContainer(self.vhScrollId).height(),
                "igScroll did not scroll properly");
            //Verify that it donesn't continue to scroll
            self.testUtil.wait(200).then(function () {
                assert.equal(self.scrollContainer(self.vhScrollId).scrollTop(),
                    (self.elemContent(self.vhScrollId).height() - self.scrollContainer(self.vhScrollId).height()) - 3 * self.scrollContainer(self.vhScrollId).height(),
                    "igScroll scrolled after moving the mouse out of the track while holding");
                self.vhScroll().remove();
                done();
            });
        });
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_63, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(1);
    this.vhScroll().igScroll({
        modifyDOM: true,
        scrollHeight: 5000
    });
    done = assert.async();
    this.scrollContainer(this.vhScrollId).mouseenter();
    this.vScrollBar(this.vhScrollId).mouseenter();
    this.testUtil.simulateClickDragRelese(this.vDrag(this.vhScrollId), 0, 50, 200);
    this.testUtil.wait(2500).then(function () {
        //Pixel per move is taken from the igScroll source
        var vDragX = self.getTransform3dValueY(self.vDrag(self.vhScrollId),
            vTrackWidth = self.vTrack(self.vhScrollId).height(),
            vDragWidth = self.vDrag(self.vhScrollId).height()),
            contentHeight = self.elemContent(self.vhScrollId).height(),
            containerHeight = self.scrollContainer(self.vhScrollId).height(),
            pixelsMoved = (vDragX / (vTrackWidth -vDragWidth)) * (contentHeight - containerHeight);

        //We can have 2px error in the calculation due to rounding
        assert.equal(self.scrollContainer(self.vhScrollId).scrollTop(), Math.floor(pixelsMoved), "igScroll did not scroll properly");
        //equal(getTransform3dValueY(vDrag), 50, "igScroll did not update scrollbar position properly");
        self.vhScroll().remove();
        done();
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_64, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(2);
    this.vhScroll().igScroll({
        modifyDOM: true
    });
    this.hScrollBar(this.vhScrollId).mouseenter();
    this.testUtil.simulateSingleClick(this.hTrack(this.vhScrollId), { offsetX: 500 });
    done = assert.async();
    this.testUtil.wait(25).then(function () {
        //200 because the width of the content is actually 800 and the width of the container is 600.
        assert.equal(self.scrollContainer(self.vhScrollId).scrollLeft(), 200, "igScroll did not scroll properly");
        //Check horizontal thumb drag position
        var scrollbarPixelContentRatio = (200 / (self.elemContent(self.vhScrollId).width() - self.vhScroll().width())) *
              (self.hTrack(self.vhScrollId).width() - self.hDrag(self.vhScrollId).width());

        assert.equal(self.getTransform3dValueX(self.hDrag(self.vhScrollId)), (scrollbarPixelContentRatio).toFixed(3), "igScroll did not scroll properly");
        self.vhScroll().remove();
        done();
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});


QUnit.test(testId_65, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(3);
    this.vhScroll().igScroll({
        modifyDOM: true
    });
    //scroll to the bottom first
    this.vhScroll().igScroll("option", "scrollLeft", this.elemContent(this.vhScrollId).width() - this.scrollContainer(this.vhScrollId).width());
    done = assert.async();
    this.testUtil.wait(500).then(function () {
        assert.equal(self.scrollContainer(self.vhScrollId).scrollLeft(), 200, "igScroll did not scroll properly");
        self.hScrollBar(self.vhScrollId).mouseenter();
        self.testUtil.simulateSingleClick(self.hTrack(self.vhScrollId), { offsetX: 50 });
        assert.equal(self.scrollContainer(self.vhScrollId).scrollLeft(), 0, "igScroll did not scroll properly");
        self.testUtil.wait(100).then(function () {
            //Check horizontal thumb drag position
            var scrollbarPixelContentRatio = (self.vhScroll().width() - 3 * 15) / self.elemContent(self.vhScrollId).width();
            assert.equal(self.getTransform3dValueX(self.hDrag(self.vhScrollId)), 0, "igScroll did not scroll properly");
            self.vhScroll().remove();
            done();
        });
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_66, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(1);
    this.vhScroll().igScroll({
        modifyDOM: true,
        scrollWidth: 5000
    });
    this.hScrollBar(this.vhScrollId).mouseenter();
    this.testUtil.simulateClickAndHold(this.hTrack(this.vhScrollId), 325, { offsetX: 250 });
    done = assert.async();
    this.testUtil.wait(400).then(function () {
        assert.equal(self.scrollContainer(self.vhScrollId).scrollLeft(), 3 * self.scrollContainer(self.vhScrollId).width(), "igScroll did not scroll properly");
        self.vhScroll().remove();
        done();
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_67, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(1);
    this.vhScroll().igScroll({
        modifyDOM: true,
        scrollWidth: 5000
    });
    //scroll to the bottom first
    this.vhScroll().igScroll("option", "scrollLeft", this.elemContent(this.vhScrollId).width() - this.scrollContainer(this.vhScrollId).width());
    done = assert.async();
    this.testUtil.wait(100).then(function () {
        self.hScrollBar(self.vhScrollId).mouseenter();
        self.testUtil.simulateClickAndHold(self.hTrack(self.vhScrollId), 325, { offsetX: 150 });
        self.testUtil.wait(400).then(function () {
            assert.equal(self.scrollContainer(self.vhScrollId).scrollLeft(),
                (self.elemContent(self.vhScrollId).width() - self.scrollContainer(self.vhScrollId).width()) - 3 * self.scrollContainer(self.vhScrollId).width(),
                "igScroll did not scroll properly");
            self.vhScroll().remove();
            done();
        });
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});
//fail
QUnit.test(testId_68, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(2);
    this.vhScroll().igScroll({
        modifyDOM: true,
        scrollWidth: 5000
    });
    done = assert.async();
    this.testUtil.wait(100).then(function () {
        self.hScrollBar(self.vhScrollId).mouseenter();
        self.testUtil.simulateClickAndHold(self.hTrack(self.vhScrollId), 400, { offsetX: 300 });
        //Wait a while to move out of the track area
        self.testUtil.wait(350).then(function () {
            self.hTrack(self.vhScrollId).mouseout();
            assert.equal(self.scrollContainer(self.vhScrollId).scrollLeft(), 3 * self.scrollContainer(self.vhScrollId).width(), "igScroll did not scroll properly");
            //Verify that it donesn't continue to scroll
            self.testUtil.wait(200).then(function () {
                assert.equal(self.scrollContainer(self.vhScrollId).scrollLeft(), 3 * self.scrollContainer(self.vhScrollId).width(),
                    "igScroll scrolled after moving the mouse out of the track while holding");
                self.vhScroll().remove();
                done();
            });
        });
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_69, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(1);
    this.vhScroll().igScroll({
        modifyDOM: true,
        scrollWidth: 5000
    });
    done = assert.async();
    this.scrollContainer(this.vhScrollId).mouseenter();
    this.hScrollBar(this.vhScrollId).mouseenter();
    this.testUtil.simulateClickDragRelese(this.hDrag(this.vhScrollId), 50, 0, 200);
    this.testUtil.wait(2500).then(function () {
        //Pixel per move is taken from the igScroll source
        var hDragX = self.getTransform3dValueX(self.hDrag(self.vhScrollId),
            hTrackWidth = self.hTrack(self.vhScrollId).width(),
            hDragWidth = self.hDrag(self.vhScrollId).width()),
            contentWidth = self.elemContent(self.vhScrollId).width(),
            containerWidth = self.scrollContainer(self.vhScrollId).width(),
            pixelsMoved = (hDragX / (hTrackWidth -hDragWidth)) * (contentWidth - containerWidth);

        assert.equal(self.scrollContainer(self.vhScrollId).scrollLeft(), Math.floor(pixelsMoved), "igScroll did not scroll properly");
        //equal(getTransform3dValueX(hDrag), 50, "igScroll did not update scrollbar position properly");
        self.vhScroll().remove();
        done();
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_70, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(2);
    this.vhScroll().igScroll({
        modifyDOM: true,
        scrollbarType: "native"
    });
    this.vScrollBar(this.vhScrollId).scrollTop(100);
    done = assert.async();
    this.testUtil.wait(100).then(function () {
        assert.equal(self.scrollContainer(self.vhScrollId).scrollTop(), 100, "igScroll did not scroll properly");
        assert.equal(self.vhScroll().data("igScroll")._getContentPositionY(), 100, "igScroll did not scroll properly with native vertical scrollbar");
        self.vhScroll().remove();
        done();
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_71, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(2);
    this.vhScroll().igScroll({
        modifyDOM: true,
        scrollbarType: "native"
    });
    this.hScrollBar(this.vhScrollId).scrollLeft(100);
    done = assert.async();
    this.testUtil.wait(100).then(function () {
        assert.equal(self.scrollContainer(self.vhScrollId).scrollLeft(), 100, "igScroll did not scroll properly");
        assert.equal(self.vhScroll().data("igScroll")._getContentPositionX(), 100, "igScroll did not scroll properly with native horizontal scrollbar");
        self.vhScroll().remove();
        done();
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_72, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(2);
    this.vhScroll().igScroll({
        modifyDOM: true,
        scrollbarType: "native"
    });
    this.scrollContainer(this.vhScrollId).scrollTop(100);
    done = assert.async();
    this.testUtil.wait(100).then(function () {
        assert.equal(self.vScrollBar(self.vhScrollId).scrollTop(), 100, "igScroll did not scroll properly");
        assert.equal(self.vhScroll().data("igScroll")._getContentPositionY(), 100, "igScroll did not scroll properly with native horizontal scrollbar");
        self.vhScroll().remove();
        done();
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_73, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(2);
    this.vhScroll().igScroll({
        modifyDOM: true,
        scrollbarType: "native"
    });
    this.scrollContainer(this.vhScrollId).scrollLeft(100);
    done = assert.async();
    this.testUtil.wait(100).then(function () {
        assert.equal(self.hScrollBar(self.vhScrollId).scrollLeft(), 100, "igScroll did not scroll properly");
        assert.equal(self.vhScroll().data("igScroll")._getContentPositionX(), 100, "igScroll did not scroll properly with native horizontal scrollbar");
        self.vhScroll().remove();
        done();
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});
//fail
QUnit.test(testId_74, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    assert.expect(4);
    this.vhScroll().igScroll({
        modifyDOM: true
    });
    this.vhScroll().igScroll("option", "scrollbarType", "native");
    assert.equal($(".igscroll-vcontainer").length, 0, "igScroll did not remove vertical custom scrollbar");
    assert.equal($(".igscroll-hcontainer").length, 0, "igScroll did not remove horizontal custom scrollbar");
    assert.equal($(".igscroll-vnative-outer").length, 1, "igScroll did add vertical native scrollbar");
    assert.equal($(".igscroll-hnative-outer").length, 1, "igScroll did add horizontal native scrollbar");
    this.vhScroll().remove();
});
//fail
QUnit.test(testId_75, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    assert.expect(2);
    this.vhScroll().igScroll({
        modifyDOM: true,
        scrollbarType: "none"
    });

    this.vhScroll().igScroll("option", "scrollbarType", "native");
    assert.equal($(".igscroll-vnative-outer").length, 1, "igScroll did not remove vertical custom scrollbar");
    assert.equal($(".igscroll-hnative-outer").length, 1, "igScroll did not remove horizontal custom scrollbar");
    this.vhScroll().remove();
});
// //fail
QUnit.test(testId_76, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    assert.expect(4);
    this.vhScroll().igScroll({
        modifyDOM: true,
        scrollbarType: "native"
    });
    assert.equal($(".igscroll-vnative-outer").length, 1, "igScroll did not remove vertical custom scrollbar");
    assert.equal($(".igscroll-hnative-outer").length, 1, "igScroll did not remove horizontal custom scrollbar");
    this.vhScroll().igScroll("option", "scrollbarType", "none");
    assert.equal($(".igscroll-vnative-outer").length, 0, "igScroll did not remove vertical custom scrollbar");
    assert.equal($(".igscroll-hnative-outer").length, 0, "igScroll did not remove horizontal custom scrollbar");
    this.vhScroll().remove();
});

QUnit.test(testId_80, function (assert) {
    this.util.isTouchDevice = function () { return true; };
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(2);
    this.vhScroll().igScroll({
        modifyDOM: true
    });
    done = assert.async();
    this.vhScroll().data('igScroll')._bMixedEnvironment = false;
    var touchSteps = [{ x: 0, y: 3 }, { x: 0, y: 7 }, { x: 0, y: 15 }, { x: 0, y: 15 }, { x: 0, y: 6 }, { x: 0, y: 5 }, { x: 0, y: 1 }];
    this.testUtil.simulateTouchSwipeFromCenter(this.scrollContainer(this.vhScrollId), touchSteps, 10);
    this.testUtil.wait(2500).then(function () {
        assert.equal(self.vhScroll().data("igScroll")._getContentPositionX(), 0, "igScroll scrolled horizontally by the swipe");
        assert.equal(self.vhScroll().data("igScroll")._getContentPositionY(), 52, "igScroll did not scroll properly vertically");
        self.util.isTouchDevice = function () { return false; };
        self.vhScroll().remove();
        done();
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_81, function (assert) {
    this.util.isTouchDevice = function () { return true; };
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(2);
    this.vhScroll().igScroll({
        modifyDOM: true
    });
    done = assert.async();
    this.vhScroll().data('igScroll')._bMixedEnvironment = false;
    var touchSteps = [{ x: 3, y: 0 }, { x: 7, y: 0 }, { x: 15, y: 0 }, { x: 15, y: 0 }, { x: 6, y: 0 }, { x: 5, y: 0 }, { x: 1, y: 0 }];
    this.testUtil.simulateTouchSwipeFromCenter(this.scrollContainer(this.vhScrollId), touchSteps, 10);
    this.testUtil.wait(2500).then(function () {
        //22 because there is compensation for horizontal scroll of 30 pixels by default
        assert.equal(self.vhScroll().data("igScroll")._getContentPositionX(), 22, "igScroll scrolled horizontally by the swipe");
        assert.equal(self.vhScroll().data("igScroll")._getContentPositionY(), 0, "igScroll did not scroll properly vertically");
        self.util.isTouchDevice = function () { return false; };
        self.vhScroll().remove();
        done();
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_82, function (assert) {
    this.util.isTouchDevice = function () { return true; };
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(4);
    this.vhScroll().igScroll({
        modifyDOM: true,
    });
    done = assert.async();
    this.vhScroll().data('igScroll')._bMixedEnvironment = false;
    var touchSteps = [{ x: 0, y: 3 }, { x: 0, y: 4 }, { x: 0, y: 3 }, { x: 0, y: 3 }];
    this.testUtil.simulateTouchSwipeFromCenter(this.scrollContainer(this.vhScrollId), touchSteps, 1);
    this.testUtil.wait(1500).then(function () {
        assert.equal(self.vhScroll().data("igScroll")._getContentPositionX(), 0, "igScroll scrolled horizontally by the swipe");
        assert.notEqual(self.vhScroll().data("igScroll")._getContentPositionY(), 13, "igScroll did not scroll properly vertically");

        var lastPosY = self.vhScroll().data("igScroll")._getContentPositionY();
        self.testUtil.wait(1000).then(function () {
            assert.equal(self.vhScroll().data("igScroll")._getContentPositionX(), 0, "igScroll scrolled horizontally by the swipe");
            assert.ok(self.vhScroll().data("igScroll")._getContentPositionY() > lastPosY, "igScroll did not scroll continuously vertically");
            self.util.isTouchDevice = function () { return false; };
            self.vhScroll().remove();
            done();
        });
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_83, function (assert) {
    this.util.isTouchDevice = function () { return true; };
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(2);
    this.vhScroll().igScroll({
        modifyDOM: true,
        inertiaDuration: 0.2
    });
    done = assert.async();
    this.vhScroll().data('igScroll')._bMixedEnvironment = false;
    var touchSteps = [{ x: 3, y: 0 }, { x: 7, y: 0 }, { x: 8, y: 0 }, { x: 9, y: 0 }];
    this.testUtil.simulateTouchSwipeFromCenter(this.scrollContainer(this.vhScrollId), touchSteps, 10);
    this.testUtil.wait(2500).then(function () {
        assert.notEqual(self.vhScroll().data("igScroll")._getContentPositionX(), 27, "igScroll scrolled horizontally by the swipe");
        assert.equal(self.vhScroll().data("igScroll")._getContentPositionY(), 0, "igScroll did not scroll properly vertically");
        self.util.isTouchDevice = function () { return false; };
        self.vhScroll().remove();
        done();
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_84, function (assert) {
    this.util.isTouchDevice = function () { return true; };
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(6);
    this.vhScroll().igScroll({
        modifyDOM: true,
    });
    done = assert.async();
    this.vhScroll().data('igScroll')._bMixedEnvironment = false;
    var touchSteps = [{ x: 0, y: 3 }, { x: 0, y: 4 }, { x: 0, y: 3 }, { x: 0, y: 3 }];
    this.testUtil.simulateTouchSwipeFromCenter(this.scrollContainer(this.vhScrollId), touchSteps, 1);
    this.testUtil.wait(500).then(function () {
        //Check if we have scrolled more than if we didn't have inertia
        assert.equal(self.vhScroll().data("igScroll")._getContentPositionX(), 0, "igScroll scrolled horizontally by the swipe");
        assert.ok(self.vhScroll().data("igScroll")._getContentPositionY() > 13, "igScroll did not scroll properly vertically");

        var lastPosY = self.vhScroll().data("igScroll")._getContentPositionY();
        self.testUtil.wait(500).then(function () {
            //Check if we have scrolled even more than last time
            assert.equal(self.vhScroll().data("igScroll")._getContentPositionX(), 0, "igScroll scrolled horizontally by the swipe");
            assert.ok(self.vhScroll().data("igScroll")._getContentPositionY() > lastPosY, "igScroll did not scroll continuously");

            //Should interrupt inertia
            self.testUtil.simulateTouchTap(self.scrollContainer(self.vhScrollId), 50, 50);

            lastPosY = self.vhScroll().data("igScroll")._getContentPositionY();
            self.testUtil.wait(500).then(function () {
                //Check if we have successfully interrupted the inertia
                assert.equal(self.vhScroll().data("igScroll")._getContentPositionX(), 0, "igScroll scrolled horizontally by the swipe");
                assert.equal(self.vhScroll().data("igScroll")._getContentPositionY(), lastPosY, "igScroll did not scroll properly vertically");
                self.util.isTouchDevice = function () { return false; };
                self.vhScroll().remove();
                done();
            });
        });
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_85, function (assert) {
    this.util.isTouchDevice = function () { return true; };
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(2);
    this.vhScroll().igScroll({
        modifyDOM: true,
    });
    this.vhScroll().data('igScroll')._bMixedEnvironment = false;
    var touchSteps = [{ x: 3, y: 0 }, { x: 7, y: 0 }, { x: 8, y: 0 }, { x: 9, y: 0 }];
    this.testUtil.simulateTouchSwipeFromCenter(this.scrollContainer(this.vhScrollId), touchSteps, 10);
    done = assert.async();
    this.testUtil.wait(1500).then(function () {
        self.testUtil.simulateTouchTap(self.scrollContainer(self.vhScrollId), 50, 50);
        assert.notEqual(self.vhScroll().data("igScroll")._getContentPositionX(), 27, "igScroll scrolled horizontally by the swipe");
        assert.equal(self.vhScroll().data("igScroll")._getContentPositionY(), 0, "igScroll did not scroll properly vertically");
        self.util.isTouchDevice = function () { return false; };
        self.vhScroll().remove();
        done();
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});


QUnit.test(testId_86, function (assert) {
    this.util.isTouchDevice = function () { return true; };
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(2);
    this.vhScroll().igScroll({
        modifyDOM: true
    });
    done = assert.async();
    this.vhScroll().data('igScroll')._bMixedEnvironment = false;
    var touchSteps = [{ x: 0, y: 3 }, { x: 0, y: 7 }, { x: 0, y: 15 }, { x: 0, y: 15 }, { x: 0, y: 6 }, { x: 0, y: 5 }, { x: 0, y: 1 }];
    this.testUtil.simulateTouchSwipeFromCenterIE(this.scrollContainer(this.vhScrollId), touchSteps, 10);
    this.testUtil.wait(1500).then(function () {
        //igScroll does not use custom inertia in IE. It is handled inside the borwser and given as MSGestureChange by the browser
        assert.equal(self.vhScroll().data("igScroll")._getContentPositionX(), 0, "igScroll scrolled horizontally by the swipe");
        assert.equal(self.vhScroll().data("igScroll")._getContentPositionY(), 52, "igScroll did not scroll properly vertically");
        self.util.isTouchDevice = function () { return false; };
        self.vhScroll().remove();
        done();
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_87, function (assert) {
    this.util.isTouchDevice = function () { return true; };
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(2);
    this.vhScroll().igScroll({
        modifyDOM: true
    });
    done = assert.async();
    this.vhScroll().data('igScroll')._bMixedEnvironment = false;
    var touchSteps = [{ x: 3, y: 0 }, { x: 7, y: 0 }, { x: 15, y: 0 }, { x: 15, y: 0 }, { x: 6, y: 0 }, { x: 5, y: 0 }, { x: 1, y: 0 }];
    this.testUtil.simulateTouchSwipeFromCenterIE(this.scrollContainer(this.vhScrollId), touchSteps, 10);
    this.testUtil.wait(2500).then(function () {
        //22 because there is compensation for horizontal scroll of 30 pixels by default
        assert.equal(self.vhScroll().data("igScroll")._getContentPositionX(), 22, "igScroll scrolled horizontally by the swipe");
        assert.equal(self.vhScroll().data("igScroll")._getContentPositionY(), 0, "igScroll did not scroll properly vertically");
        self.util.isTouchDevice = function () { return false; };
        self.vhScroll().remove();
        done();
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_88, function (assert) {
    this.util.isTouchDevice = function () { return true; };
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var self = this, done;
    assert.expect(3);
    this.vhScroll().igScroll({
        modifyDOM: true
    });
    done = assert.async();
    this.vhScroll().data('igScroll')._bMixedEnvironment = false;
    var touchSteps = [{ x: 0, y: 3 }, { x: 0, y: 7 }, { x: 0, y: 15 }, { x: 0, y: 15 }, { x: 0, y: 6 }, { x: 0, y: 5 }, { x: 0, y: 1 }];
    this.testUtil.simulateTouchSwipeFromCenter(this.scrollContainer(this.vhScrollId), touchSteps, 10);
    this.testUtil.wait(2500).then(function () {
        assert.equal(self.vhScroll().data("igScroll")._getContentPositionX(), 0, "igScroll scrolled horizontally by the swipe");
        assert.equal(self.vhScroll().data("igScroll")._getContentPositionY(), 52, "igScroll did not scroll properly vertically");
        var wheelEvt = jQuery.Event("wheel", { originalEvent: { deltaY: 100 }, preventDefault: function () { }, stopPropagation: function () { } });
        self.scrollContainer(self.vhScrollId).trigger(wheelEvt);

        assert.equal(self.vhScroll().data("igScroll")._getContentPositionY(), 102, "igScroll did not scroll properly vertically");
        self.util.isTouchDevice = function () { return false; };
        self.vhScroll().remove();
        done();
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_90, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    $("body").append($('<div id="elemVSync" style="height:400px; width: 600px; overflow: hidden;"></div>').append($('<div id="syncContent"></div>').append(this.contentScrollVH)));
    assert.expect(1);
    this.vhScroll().igScroll({
        modifyDOM: true,
        syncedElemsV: [this.vSyncScroll()],
    });

    this.vhScroll().igScroll("option", "scrollTop", 100);
    assert.equal(this.vSyncScroll().scrollTop(), 100, "igScroll did not scroll properly vertically");
    this.vhScroll().remove();
    this.vSyncScroll().remove();
});

QUnit.test(testId_91, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    $("body").append($('<div id="elemVSync" style="height:400px; width: 600px; overflow: hidden;"></div>').append($('<div id="syncContent"></div>').append(this.contentScrollVH)));
    assert.expect(1);
    this.vhScroll().igScroll({
        modifyDOM: true,
        syncedElemsH: [this.vSyncScroll()],
    });

    this.vhScroll().igScroll("option", "scrollLeft", 100);
    assert.equal(this.vSyncScroll().scrollLeft(), 100, "igScroll did not scroll properly vertically");
    this.vhScroll().remove();
    this.vSyncScroll().remove();
});

QUnit.test(testId_92, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    $("body").append($('<div id="elemVSync" style="height:400px; width: 600px; overflow: hidden;"></div>').append($('<div id="syncContent"></div>').append(this.contentScrollVH)));
    assert.expect(1);
    this.vhScroll().igScroll({
        modifyDOM: true
    });
    this.vhScroll().igScroll("option", "syncedElemsV", [this.vSyncScroll()]);
    this.vhScroll().igScroll("option", "scrollTop", 100);
    assert.equal(this.vSyncScroll().scrollTop(), 100, "igScroll did not sync element vertically");
    this.vhScroll().remove();
    this.vSyncScroll().remove();
});

QUnit.test(testId_93, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    $("body").append($('<div id="elemHSync" style="height:400px; width: 600px; overflow: hidden;"></div>').append($('<div id="syncContent"></div>').append(this.contentScrollVH)));
    assert.expect(1);
    this.vhScroll().igScroll({
        modifyDOM: true
    });
    this.vhScroll().igScroll("option", "syncedElemsH", [this.hSyncScroll()]);
    this.vhScroll().igScroll("option", "scrollLeft", 100);
    assert.equal(this.hSyncScroll().scrollLeft(), 100, "igScroll did not sync element horizontally");
    this.vhScroll().remove();
    this.hSyncScroll().remove();
});

QUnit.test(testId_94, function (assert) {
    this.util.isTouchDevice = function () { return true; };
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    $("body").append($('<div id="elemVSync" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(3);
    this.vhScroll().igScroll({
        modifyDOM: true,
        syncedElemsV: [this.vSyncScroll()],
    });
    done = assert.async();
    this.vhScroll().data('igScroll')._bMixedEnvironment = false;
    var touchSteps = [{ x: 0, y: 3 }, { x: 0, y: 4 }, { x: 0, y: 3 }, { x: 0, y: 3 }];
    this.testUtil.simulateTouchSwipeFromCenter(this.scrollContainer(this.vhScrollId), touchSteps, 1);
    this.testUtil.wait(1500).then(function () {
        assert.equal(self.vhScroll().data("igScroll")._getContentPositionX(), 0, "igScroll scrolled horizontally by the swipe");
        assert.notEqual(self.vhScroll().data("igScroll")._getContentPositionY(), 13, "igScroll did not scroll properly vertically");

        self.testUtil.wait(1000).then(function () {
            assert.equal(self.vhScroll().data("igScroll")._getContentPositionY(), -self.getTransform3dValueY(self.vSyncElemContent(self.vSyncScrollId)), "igScroll content and linked element did not sync vertically on touch");
            self.util.isTouchDevice = function () { return false; };
            self.vhScroll().remove();
            self.vSyncScroll().remove();
            done();
        });
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_95, function (assert) {
    this.util.isTouchDevice = function () { return true; };
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    $("body").append($('<div id="elemHSync" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(3);
    this.vhScroll().igScroll({
        modifyDOM: true,
        syncedElemsH: [this.hSyncScroll()],
    });
    done = assert.async();
    this.vhScroll().data('igScroll')._bMixedEnvironment = false;
    var touchSteps = [{ x: 3, y: 0 }, { x: 7, y: 0 }, { x: 8, y: 0 }, { x: 9, y: 0 }];
    this.testUtil.simulateTouchSwipeFromCenter(this.scrollContainer(this.vhScrollId), touchSteps, 10);
    this.testUtil.wait(2500).then(function () {
        assert.notEqual(self.vhScroll().data("igScroll")._getContentPositionX(), 27, "igScroll scrolled horizontally by the swipe");
        assert.equal(self.vhScroll().data("igScroll")._getContentPositionY(), 0, "igScroll did not scroll properly vertically");
        assert.equal(self.vhScroll().data("igScroll")._getContentPositionX(), -self.getTransform3dValueX($('#elemHSync_content')), "igScroll content and linked element did not sync horizontally on touch");
        self.util.isTouchDevice = function () { return false; };
        self.vhScroll().remove();
        self.hSyncScroll().remove();
        done();
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_96, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(8);
    this.vhScroll().igScroll({
        modifyDOM: true,
        alwaysVisible: true
    });
    done = assert.async();
    this.testUtil.wait(1500).then(function () {
        assert.ok(self.arrowUp(self.vhScrollId).css("opacity") > 0, "igScroll scrollbar Arrow Up is not visible");
        assert.ok(self.arrowDown(self.vhScrollId).css("opacity") > 0, "igScroll scrollbar Arrow Down is not visible");
        assert.ok(self.arrowLeft(self.vhScrollId).css("opacity") > 0, "igScroll scrollbar Arrow Left is not visible");
        assert.ok(self.arrowRight(self.vhScrollId).css("opacity") > 0, "igScroll scrollbar Arrow Right is not visible");
        assert.ok(self.vDrag(self.vhScrollId).css("opacity") > 0, "igScroll vertical scrollbar thumb drag is not big");
        assert.ok(self.hDrag(self.vhScrollId).css("opacity") > 0, "igScroll horizontal scrollbar thumb drag is not big");
        assert.equal(self.vDrag(self.vhScrollId).css("width"), "9px", "igScroll vertical scrollbar thumb drag is not big");
        assert.equal(self.hDrag(self.vhScrollId).css("height"), "9px", "igScroll horizontal scrollbar thumb drag is not big");
        self.vhScroll().remove();
        done();
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_97, function (assert) {
    this.util.isTouchDevice = function () { return true; };
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(8);
    this.vhScroll().igScroll({
        modifyDOM: true,
        alwaysVisible: true
    });
    done = assert.async();
    this.vhScroll().data('igScroll')._bMixedEnvironment = false;
    this.testUtil.wait(1500).then(function () {
        assert.equal(self.arrowUp(self.vhScrollId).css("opacity"), 0, "igScroll scrollbar Arrow Up is not visible");
        assert.equal(self.arrowDown(self.vhScrollId).css("opacity"), 0, "igScroll scrollbar Arrow Down is not visible");
        assert.equal(self.arrowLeft(self.vhScrollId).css("opacity"), 0, "igScroll scrollbar Arrow Left is not visible");
        assert.equal(self.arrowRight(self.vhScrollId).css("opacity"), 0, "igScroll scrollbar Arrow Right is not visible");
        assert.ok(self.vDrag(self.vhScrollId).css("opacity") > 0, "igScroll vertical scrollbar thumb drag is not big");
        assert.ok(self.hDrag(self.vhScrollId).css("opacity") > 0, "igScroll horizontal scrollbar thumb drag is not big");
        assert.equal(self.vDrag(self.vhScrollId).css("width"), "5px", "igScroll vertical scrollbar thumb drag is not big");
        assert.equal(self.hDrag(self.vhScrollId).css("height"), "5px", "igScroll horizontal scrollbar thumb drag is not big");
        self.util.isTouchDevice = function () { return false; };
        self.vhScroll().remove();
        done();
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_98, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(20);
    this.vhScroll().igScroll({
        modifyDOM: true
    });
    this.scrollContainer(this.vhScrollId).mouseleave();
    done = assert.async();
    this.testUtil.wait(2100).then(function () {
        self.vhScroll().igScroll("option", "alwaysVisible", true);

        assert.notOk(self.arrowUp(self.vhScrollId).hasClass(self.hiddenVArrowClass), "igScroll scrollbar Arrow Up is not visible");
        assert.notOk(self.arrowDown(self.vhScrollId).hasClass(self.hiddenVArrowClass), "igScroll scrollbar Arrow Down is not visible");
        assert.notOk(self.arrowLeft(self.vhScrollId).hasClass(self.hiddenHArrowClass), "igScroll scrollbar Arrow Left is not visible");
        assert.notOk(self.arrowRight(self.vhScrollId).hasClass(self.hiddenHArrowClass), "igScroll scrollbar Arrow Right is not visible");
        assert.notOk(self.vDrag(self.vhScrollId).hasClass(self.hiddenVBarClass), "igScroll vertical scrollbar thumb drag is not big");
        assert.notOk(self.hDrag(self.vhScrollId).hasClass(self.hiddenHBarClass), "igScroll horizontal scrollbar thumb drag is not big");
        assert.ok(self.vDrag(self.vhScrollId).hasClass(self.vBarBigClass), "9px", "igScroll vertical scrollbar thumb drag is not big");
        assert.notOk(self.hDrag(self.vhScrollId).hasClass(self.vBarThinClass), "igScroll horizontal scrollbar thumb drag is not big");
        assert.ok(self.hDrag(self.vhScrollId).hasClass(self.hBarBigClass), "9px", "igScroll horizontal scrollbar thumb drag is not big");
        assert.notOk(self.hDrag(self.vhScrollId).hasClass(self.hBarThinClass), "igScroll horizontal scrollbar thumb drag is not big");

        self.testUtil.wait(200).then(function () {
            assert.notOk(self.arrowUp(self.vhScrollId).hasClass(self.hiddenVArrowClass), "igScroll scrollbar Arrow Up is not visible");
            assert.notOk(self.arrowDown(self.vhScrollId).hasClass(self.hiddenVArrowClass), "igScroll scrollbar Arrow Down is not visible");
            assert.notOk(self.arrowLeft(self.vhScrollId).hasClass(self.hiddenHArrowClass), "igScroll scrollbar Arrow Left is not visible");
            assert.notOk(self.arrowRight(self.vhScrollId).hasClass(self.hiddenHArrowClass), "igScroll scrollbar Arrow Right is not visible");
            assert.notOk(self.vDrag(self.vhScrollId).hasClass(self.hiddenVBarClass), "igScroll vertical scrollbar thumb drag is not big");
            assert.notOk(self.hDrag(self.vhScrollId).hasClass(self.hiddenHBarClass), "igScroll horizontal scrollbar thumb drag is not big");
            assert.ok(self.vDrag(self.vhScrollId).hasClass(self.vBarBigClass), "9px", "igScroll vertical scrollbar thumb drag is not big");
            assert.notOk(self.hDrag(self.vhScrollId).hasClass(self.vBarThinClass), "igScroll horizontal scrollbar thumb drag is not big");
            assert.ok(self.hDrag(self.vhScrollId).hasClass(self.hBarBigClass), "9px", "igScroll horizontal scrollbar thumb drag is not big");
            assert.notOk(self.hDrag(self.vhScrollId).hasClass(self.hBarThinClass), "igScroll horizontal scrollbar thumb drag is not big");
            self.vhScroll().remove();
            done();
        });
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_99, function (assert) {
    $.ig.util.isTouchDevice = function () { return true; };
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    this.vhScroll().igScroll({
        modifyDOM: true
    });
    this.vhScroll().data('igScroll')._bMixedEnvironment = false;
    this.scrollContainer(this.vhScrollId).mouseleave();
    done = assert.async();
    this.testUtil.wait(1500).then(function () {
        self.vhScroll().igScroll("option", "alwaysVisible", true);

        assert.equal(self.arrowUp(self.vhScrollId).css("opacity"), 0, "igScroll scrollbar Arrow Up is visible");
        assert.equal(self.arrowDown(self.vhScrollId).css("opacity"), 0, "igScroll scrollbar Arrow Down is visible");
        assert.equal(self.arrowLeft(self.vhScrollId).css("opacity"), 0, "igScroll scrollbar Arrow Left is visible");
        assert.equal(self.arrowRight(self.vhScrollId).css("opacity"), 0, "igScroll scrollbar Arrow Right is visible");
        assert.ok(self.vDrag(self.vhScrollId).css("opacity") > 0, "igScroll vertical scrollbar thumb drag is not visible");
        assert.ok(self.hDrag(self.vhScrollId).css("opacity") > 0, "igScroll horizontal scrollbar thumb drag is not visible");
        assert.equal(self.vDrag(self.vhScrollId).css("width"), "5px", "igScroll vertical scrollbar thumb drag is not big");
        assert.equal(self.hDrag(self.vhScrollId).css("height"), "5px", "igScroll horizontal scrollbar thumb drag is not big");

        self.testUtil.wait(200).then(function () {
            assert.equal(self.arrowUp(self.vhScrollId).css("opacity"), 0, "igScroll scrollbar Arrow Up is visible");
            assert.equal(self.arrowDown(self.vhScrollId).css("opacity"), 0, "igScroll scrollbar Arrow Down is visible");
            assert.equal(self.arrowLeft(self.vhScrollId).css("opacity"), 0, "igScroll scrollbar Arrow Left is visible");
            assert.equal(self.arrowRight(self.vhScrollId).css("opacity"), 0, "igScroll scrollbar Arrow Right is visible");
            assert.ok(self.vDrag(self.vhScrollId).css("opacity") > 0, "igScroll vertical scrollbar thumb drag is not visible");
            assert.ok(self.hDrag(self.vhScrollId).css("opacity") > 0, "igScroll horizontal scrollbar thumb drag is not visible");
            assert.equal(self.vDrag(self.vhScrollId).css("width"), "5px", "igScroll vertical scrollbar thumb drag is big");
            assert.equal(self.hDrag(self.vhScrollId).css("height"), "5px", "igScroll horizontal scrollbar thumb drag is  big");

            self.util.isTouchDevice = function () { return false; };
            self.vhScroll().remove();
            done();
        });
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_100, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    this.vhScroll().igScroll({
        modifyDOM: true
    });

    //Horizontal elements
    var err = "";
    try {
        this.vhScroll().igScroll("option", "syncedElemsH", [$("#noElem")]);
    }
    catch (e) {
        err = e.message;
    }
    assert.equal(err, "Element that is being linked does not exists.", "No error is thrown");

    //Vertical elements
    err = "";
    try {
        this.vhScroll().igScroll("option", "syncedElemsV", [$("#noElem")]);
    }
    catch (e) {
        err = e.message;
    }
    assert.equal(err, "Element that is being linked does not exists.", "No error is thrown");
    this.vhScroll().remove();
});

QUnit.test(testId_101, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    this.vhScroll().igScroll({
        modifyDOM: true
    });
    //Horizontal scrollbar
    var err = "";
    try {
        this.vhScroll().igScroll("option", "scrollbarH", $("#noElem"));
    }
    catch (e) {
        err = e.message;
    }
    assert.equal(err, "Scrollbar element that is being linked does not exists.", "No error is thrown");

    //Vertical scrollbar
    err = "";
    try {
        this.vhScroll().igScroll("option", "scrollbarV", $("#noElem"));
    }
    catch (e) {
        err = e.message;
    }

    assert.equal(err, "Scrollbar element that is being linked does not exists.", "No error is thrown");
    this.vhScroll().remove();
});

QUnit.test(testId_102, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(4);
    this.vhScroll().igScroll({
        modifyDOM: true,
        scrollWidth: 5000,
        scrollLeft: 500,
    });
    this.hScrollBar(this.vhScrollId).mouseenter();
    assert.ok(this.arrowLeft(this.vhScrollId).css("opacity") > 0, "igScroll scrollbar Arrow Left is not visible");

    this.testUtil.simulateClickAndHold(this.arrowLeft(this.vhScrollId), 500);
    done = assert.async();
    this.testUtil.wait(325).then(function () {
        //500 minus 120
        assert.equal(self.scrollContainer(self.vhScrollId).scrollLeft(), 380, "igScroll did not scroll properly");

        self.arrowLeft(self.vhScrollId).mouseout();
        self.testUtil.wait(100).then(function () {
            //500 minus 160
            assert.equal(self.scrollContainer(self.vhScrollId).scrollLeft(), 380, "igScroll did not scroll properly");

            self.arrowLeft(self.vhScrollId).mouseover();
            self.testUtil.wait(100).then(function () {
                //500 minus 160
                assert.equal(self.scrollContainer(self.vhScrollId).scrollLeft(), 300, "igScroll did not scroll properly");
                self.vhScroll().remove();
                done();
            });
        });
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_103, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(4);
    this.vhScroll().igScroll({
        modifyDOM: true
    });
    this.hScrollBar(this.vhScrollId).mouseenter();
    assert.ok(this.arrowRight(this.vhScrollId).css("opacity") > 0, "igScroll scrollbar Arrow Right is not visible");
    done = assert.async();
    this.testUtil.simulateClickAndHold(this.arrowRight(this.vhScrollId), 500);
    this.testUtil.wait(325).then(function () {
        assert.equal(self.scrollContainer(self.vhScrollId).scrollLeft(), 120, "igScroll did not scroll properly");

        self.arrowRight(self.vhScrollId).mouseout();
        self.testUtil.wait(100).then(function () {
            assert.equal(self.scrollContainer(self.vhScrollId).scrollLeft(), 120, "igScroll did not scroll properly");

            self.arrowRight(self.vhScrollId).mouseover();
            self.testUtil.wait(100).then(function () {
                assert.equal(self.scrollContainer(self.vhScrollId).scrollLeft(), 200, "igScroll did not scroll properly");
                self.vhScroll().remove();
                done();
            });
        });
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_104, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    $("body").append($('<div id="elemVSync" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    assert.expect(2);
    this.vhScroll().igScroll({
        syncedElemsV: [this.vSyncScroll()]
    });

    this.vSyncScroll().igScroll({
        syncedElemsV: [this.vhScroll()]
    });

    this.vhScroll().igScroll("option", "scrollTop", 100);
    assert.equal(this.vhScroll().igScroll("option", "scrollTop"), 100, "igScroll did not scroll properly vertically");
    assert.equal(this.vSyncScroll().igScroll("option", "scrollTop"), 100, "igScroll did not scroll properly vertically");
    this.vhScroll().remove();
    this.vSyncScroll().remove();
});

QUnit.test(testId_105, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    $("body").append($('<div id="elemHSync" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    this.vhScroll().igScroll({
        syncedElemsH: [this.hSyncScroll()]
    });

    this.hSyncScroll().igScroll({
        syncedElemsH: [this.vhScroll()]
    });

    this.vhScroll().igScroll("option", "scrollLeft", 100);
    assert.equal(this.vhScroll().igScroll("option", "scrollLeft"), 100, "igScroll did not scroll properly vertically");
    assert.equal(this.hSyncScroll().igScroll("option", "scrollLeft"), 100, "igScroll did not scroll properly vertically");
    this.vhScroll().remove();
    this.hSyncScroll().remove();
});

QUnit.test(testId_106, function (assert) {
    $.ig.util.isTouchDevice = function () { return true; };
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    $("body").append($('<div id="elemVSync" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    assert.expect(2);
    this.vhScroll().igScroll({
        syncedElemsV: [this.vSyncScroll()]
    });

    this.vSyncScroll().igScroll({
        syncedElemsV: [this.vhScroll()]
    });

    this.vhScroll().data('igScroll')._bMixedEnvironment = false;
    this.vSyncScroll().data('igScroll')._bMixedEnvironment = false;

    this.vhScroll().igScroll("option", "scrollTop", 100);
    assert.equal(this.vhScroll().igScroll("option", "scrollTop"), 100, "igScroll did not scroll properly vertically");
    assert.equal(this.vSyncScroll().igScroll("option", "scrollTop"), 100, "igScroll did not scroll properly vertically");
    this.util.isTouchDevice = function () { return false; };
    this.vhScroll().remove();
    this.vSyncScroll().remove();
});

QUnit.test(testId_107, function (assert) {
    this.util.isTouchDevice = function () { return true; };
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    $("body").append($('<div id="elemHSync" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    assert.expect(2);
    this.vhScroll().igScroll({
        syncedElemsH: [this.hSyncScroll()]
    });

    this.hSyncScroll().igScroll({
        syncedElemsH: [this.vhScroll()]
    });

    this.vhScroll().data('igScroll')._bMixedEnvironment = false;
    this.hSyncScroll().data('igScroll')._bMixedEnvironment = false;

    this.vhScroll().igScroll("option", "scrollLeft", 100);
    assert.equal(this.vhScroll().igScroll("option", "scrollLeft"), 100, "igScroll did not scroll properly vertically");
    assert.equal(this.hSyncScroll().igScroll("option", "scrollLeft"), 100, "igScroll did not scroll properly vertically");

    this.util.isTouchDevice = function () { return false; };
    this.vhScroll().remove();
    this.hSyncScroll().remove();
});

QUnit.test(testId_108, function (assert) {
    $("body").append(this.elemVH1());
    $("body").append(this.elemVH2());
    assert.expect(2);
    $('#elemVH1_container').igScroll({
        modifyDOM: false,
        syncedElemsV: [$('#elemVH2_content')]
    });

    $('#elemVH2_container').igScroll({
        modifyDOM: false,
        syncedElemsV: [$('#elemVH1_content')]
    });

    $("#elemVH1_container").igScroll("option", "scrollTop", 100);
    assert.equal($("#elemVH1_container").igScroll("option", "scrollTop"), 100, "igScroll did not scroll properly vertically");
    assert.equal($("#elemVH2_container").igScroll("option", "scrollTop"), 100, "igScroll did not scroll properly vertically");
    this.vhScroll1(this.elemVH1()).remove();
    this.vhScroll2(this.elemVH2()).remove();
});

QUnit.test(testId_109, function (assert) {
    assert.expect(2);
    $("body").append(this.elemVH1());
    $("body").append(this.elemVH2());
    $('#elemVH1_container').igScroll({
        modifyDOM: false,
        syncedElemsH: [$('#elemVH2_content')]
    });

    $('#elemVH2_container').igScroll({
        modifyDOM: false,
        syncedElemsH: [$('#elemVH1_content')]
    });

    $("#elemVH1_container").igScroll("option", "scrollLeft", 100);
    assert.equal($("#elemVH1_container").igScroll("option", "scrollLeft"), 100, "igScroll did not scroll properly vertically");
    assert.equal($("#elemVH2_container").igScroll("option", "scrollLeft"), 100, "igScroll did not scroll properly vertically");
    this.vhScroll1(this.elemVH1()).remove();
    this.vhScroll2(this.elemVH2()).remove();
});

QUnit.test(testId_110, function (assert) {
    var verticalScrollbar = '<div id="elemVH_vBar" style="overflow-x:hidden; overflow-y:autoe; float:left; width:18px; height: 385px;">' +
        '<div id="elemVH_vBar_inner" style="width:17px;"></div>' +
        '</div>';
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    $("body").append($(verticalScrollbar));
    assert.expect(1);
    this.vhScroll().igScroll({
        scrollOnlyVBar: true,
        scrollbarType: "none",
        scrollbarV: this.vScrollBar(this.vhScrollId)
    });
    $("#elemVH_vBar_inner").css("height", this.elemContent(this.vhScrollId).outerHeight());
    this.vScrollBar(this.vhScrollId).on("scroll", function (event) {
        var currentPos = event.target.scrollTop;
        self.scrollContainer(self.vhScrollId).scrollTop(currentPos);
    });

    this.vScrollBar(this.vhScrollId).scrollTop(270);
    done = assert.async();
    this.testUtil.wait(100).then(function () {
        assert.equal(self.scrollContainer(self.vhScrollId).scrollTop(), 270, "custom scrollbar scrolls when scrollOnlyVBar is true");
        self.vScrollBar(self.vhScrollId).remove();
        self.vhScroll().remove();
        done();
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_111, function (assert) {
    var verticalScrollbar = '<div id="elemVH_vBar" style="overflow-x:hidden; overflow-y:autoe; float:left; width:18px; height: 385px;">' +
        '<div id="elemVH_vBar_inner" style="width:17px;"></div>' +
        '</div>';

    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var self = this, done;
    $("body").append($(verticalScrollbar));
    assert.expect(2);
    this.vhScroll().igScroll({
        scrollOnlyVBar: true,
        scrollbarType: "none",
        scrollbarV: self.vScrollBar(this.vhScrollId)
    });
    $("#elemVH_vBar_inner").css("height", this.elemContent(this.vhScrollId).outerHeight());
    this.vScrollBar(this.vhScrollId).on("scroll", function (event) {
        var currentPos = event.target.scrollTop;
        self.scrollContainer(self.vhScrollId).scrollTop(currentPos);
    });

    var wheelEvt = jQuery.Event("wheel", { originalEvent: { deltaY: 100 }, preventDefault: function () { }, stopPropagation: function () { } });
    this.scrollContainer(this.vhScrollId).trigger(wheelEvt);
    done = assert.async();
    this.testUtil.wait(100).then(function () {
        assert.equal(self.scrollContainer(self.vhScrollId).scrollTop(), 50, "content is scrolled on mouse wheel");
        assert.equal(self.vScrollBar(self.vhScrollId).scrollTop(), 50, "custom scrollbar has it's position updated on mouse wheel over the content");
        self.vScrollBar(self.vhScrollId).remove();
        self.vhScroll().remove();
        done();
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_112, function (assert) {
    var verticalScrollbar = '<div id="elemVH_vBar" style="overflow-x:hidden; overflow-y:autoe; float:left; width:18px; height: 385px;">' +
        '<div id="elemVH_vBar_inner" style="width:17px;"></div>' +
        '</div>';

    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    $("body").append($(verticalScrollbar));
    assert.expect(2);
    this.vhScroll().igScroll({
        smoothing: true,
        scrollOnlyVBar: true,
        scrollbarType: "none",
        scrollbarV: this.vScrollBar(this.vhScrollId)
    });
    $("#elemVH_vBar_inner").css("height", this.elemContent(this.vhScrollId).outerHeight());
    this.vScrollBar(this.vhScrollId).on("scroll", function (event) {
        var currentPos = event.target.scrollTop;
        self.scrollContainer(self.vhScrollId).scrollTop(currentPos);
    });

    var wheelEvt = jQuery.Event("wheel", { originalEvent: { deltaY: 100 }, preventDefault: function () { }, stopPropagation: function () { } });
    this.scrollContainer(this.vhScrollId).trigger(wheelEvt);
    done = assert.async();
    this.testUtil.wait(2000).then(function () {
        assert.ok(self.scrollContainer(self.vhScrollId).scrollTop() > 80, "content scrolled properly by the custom scrollbar on smooth mouse wheel");
        assert.ok(self.vScrollBar(self.vhScrollId).scrollTop() > 80, "custom scrollbar has it's position updated on smooth mouse wheel");
        self.vScrollBar(self.vhScrollId).remove();
        self.vhScroll().remove();
        done();
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});


QUnit.test(testId_113, function (assert) {
    this.util.isTouchDevice = function () { return true; };
    var verticalScrollbar = '<div id="elemVH_vBar" style="overflow-x:hidden; overflow-y:autoe; float:left; width:18px; height: 385px;">' +
        '<div id="elemVH_vBar_inner" style="width:17px;"></div>' +
        '</div>',
        touchSteps = [{ x: 0, y: 3 }, { x: 0, y: 7 }, { x: 0, y: 15 }, { x: 0, y: 15 }, { x: 0, y: 6 }, { x: 0, y: 5 }, { x: 0, y: 1 }], wheelEvt;

    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done = assert.async(), self = this;
    $("body").append($(verticalScrollbar));
    assert.expect(2);
    this.vhScroll().igScroll({
        scrollOnlyVBar: true,
        scrollbarType: "none",
        scrollbarV: self.vScrollBar(this.vhScrollId)
    });
    this.vhScroll().data('igScroll')._bMixedEnvironment = false;
    $("#elemVH_vBar_inner").css("height", this.elemContent(this.vhScrollId).outerHeight());
    this.vScrollBar(this.vhScrollId).on("scroll", function (event) {
        var currentPos = event.target.scrollTop;
        self.scrollContainer(self.vhScrollId).scrollTop(currentPos);
    });
    this.testUtil.simulateTouchSwipeFromCenter(this.scrollContainer(this.vhScrollId), touchSteps, 50);
    this.testUtil.wait(1000).then(function () {
        assert.equal(self.scrollContainer(self.vhScrollId).scrollTop(), 52, "content is scrolled by the custom vertical scrollbar properly");
        assert.equal(self.vScrollBar(self.vhScrollId).scrollTop(), 52, "custom scrollbar has it's position updated on touch swipe with no inertia");
        self.vScrollBar(self.vhScrollId).remove();
        self.vhScroll().remove();
        self.util.isTouchDevice = function () { return false; };
        done();
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_114, function (assert) {
    var horizontalScrollbar = '<div id="elemVH_hBar"  style="width: 585px; height: 18px; overflow-x:auto; overflow-y:hidden;">' +
        '<div id="elemVH_hBar_inner" style="height: 17px;"></div>' +
        '</div>';
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    $("body").append($(horizontalScrollbar));
    assert.expect(1);
    this.vhScroll().igScroll({
        scrollOnlyHBar: true,
        scrollbarType: "none",
        scrollbarH: self.hScrollBar(this.vhScrollId)
    });
    $("#elemVH_hBar_inner").css("width", this.elemContent(this.vhScrollId).outerWidth());
    this.hScrollBar(this.vhScrollId).on("scroll", function (event) {
        var currentPos = event.target.scrollLeft;
        self.scrollContainer(self.vhScrollId).scrollLeft(currentPos);
    });

    this.hScrollBar(this.vhScrollId).scrollLeft(170);
    done = assert.async();
    this.testUtil.wait(100).then(function () {
        assert.equal(self.scrollContainer(self.vhScrollId).scrollLeft(), 170, "custom scrollbar scrolls when scrollOnlyHBar is true");
        self.hScrollBar(self.vhScrollId).remove();
        self.vhScroll().remove();
        done();
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_115, function (assert) {
    this.util.isTouchDevice = function () { return true; };
    var horizontalScrollbar = '<div id="elemVH_hBar"  style="width: 585px; height: 18px; overflow-x:auto; overflow-y:hidden;">' +
        '<div id="elemVH_hBar_inner" style="height: 17px;"></div>' +
        '</div>',
        touchSteps = [{ x: 3, y: 0 }, { x: 7, y: 0 }, { x: 15, y: 0 }, { x: 15, y: 0 }, { x: 6, y: 0 }, { x: 5, y: 0 }, { x: 1, y: 0 }];
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    $("body").append($(horizontalScrollbar));
    assert.expect(1);
    this.vhScroll().igScroll({
        scrollOnlyHBar: true,
        scrollOnlyVBar: true,
        scrollbarType: "none",
        scrollbarH: this.hScrollBar(this.vhScrollId),
    });
    this.vhScroll().data('igScroll')._bMixedEnvironment = false;
    $("#elemVH_hBar_inner").css("width", this.elemContent(this.vhScrollId).outerWidth());
    this.hScrollBar(this.vhScrollId).on("scroll", function (event) {
        var currentPos = event.target.scrollLeft;
        self.scrollContainer(self.vhScrollId).scrollLeft(currentPos);
    });
    done = assert.async();
    this.testUtil.simulateTouchSwipeFromCenter(this.scrollContainer(self.vhScrollId), touchSteps, 10);
    this.testUtil.wait(1000).then(function () {
        assert.equal(self.scrollContainer(self.vhScrollId).scrollLeft(), 22, "custom scrollbar scrolls when scrollOnlyHBar is true");
        self.hScrollBar(self.vhScrollId).remove();
        self.vhScroll().remove();
        self.util.isTouchDevice = function () { return false; };
        done();
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_116, function (assert) {
    this.util.isTouchDevice = function () { return true; };
    var verticalScrollbar = '<div id="elemVH_vBar" style="overflow-x:hidden; overflow-y:autoe; float:left; width:18px; height: 385px;">' +
        '<div id="elemVH_vBar_inner" style="width:17px;"></div>' +
        '</div>', done, self = this;
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    $("body").append($(verticalScrollbar));
    assert.expect(1);
    this.vhScroll().igScroll({
        scrollbarType: "none",
        scrollbarV: self.vScrollBar(this.vhScrollId)
    });
    this.vhScroll().data('igScroll')._bMixedEnvironment = false;
    $("#elemVH_vBar_inner").css("height", this.elemContent(this.vhScrollId).outerHeight());

    done = assert.async();
    this.vScrollBar(this.vhScrollId).scrollTop(170);
    this.testUtil.wait(1000).then(function () {
        assert.equal(-self.getTransform3dValueY(self.elemContent(self.vhScrollId)), 170, "igScroll content scrolled vertically using transformations");
        self.vScrollBar(self.vhScrollId).remove();
        self.vhScroll().remove();
        self.util.isTouchDevice = function () { return false; };
        done();
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_117, function (assert) {
    var horizontalScrollbar = '<div id="elemVH_hBar"  style="width: 585px; height: 18px; overflow-x:auto; overflow-y:hidden;">' +
        '<div id="elemVH_hBar_inner" style="height: 17px;"></div>' +
        '</div>',
        done, self = this;
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    $("body").append($(horizontalScrollbar));
    assert.expect(1);
    this.vhScroll().igScroll({
        scrollbarType: "none",
        scrollbarH: this.hScrollBar(this.vhScrollId)
    });
    this.vhScroll().data('igScroll')._bMixedEnvironment = false;
    $("#elemVH_hBar_inner").css("width", this.elemContent(this.vhScrollId).outerWidth());

    done = assert.async();
    this.hScrollBar(this.vhScrollId).scrollLeft(170);
    this.testUtil.wait(100).then(function () {
        assert.equal(-self.getTransform3dValueX(self.elemContent(self.vhScrollId)), 170, "igScroll content scrolled horizontally using transformations");
        self.hScrollBar(self.vhScrollId).remove();
        self.vhScroll().remove();
        done();
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_118, function (assert) {
    $("body").append($('<div id="elemH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollH));
    assert.expect(2);
    this.hScroll().igScroll({
        scrollbarType: "custom"
    });

    //Make it bigger
    this.hScroll().css("width", "1000px");
    this.hScroll().igScroll("refresh");

    assert.equal(this.hScrollBar(this.hScrollId).length, 0, "igScroll removed horizontal scrollbar on refresh");
    assert.equal(this.hScroll().data("igScroll")._hBarContainer, null, "igScroll updated reference to scrollbar elements inside igScroll");
    this.hScroll().remove();
});

QUnit.test(testId_119, function (assert) {
    $("body").append($('<div id="elemH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollH));
    assert.expect(6);
    this.hScroll().igScroll({
        scrollbarType: "native"
    });

    //Check if there is only horizontal scrollbar
    assert.equal(this.vScrollBar(this.hScrollId).length, 0, "igScroll did not render vertical scrollbar on init");
    assert.equal(this.hScrollBar(this.hScrollId).length, 1, "igScroll rendered horizontal scrollbar on init");

    //Make it bigger
    this.hScroll().css("width", "1000px");
    this.hScroll().igScroll("refresh");

    assert.equal(this.hScrollBar(this.hScrollId).length, 0, "igScroll removed horizontal scrollbar on refresh");
    assert.equal($("#elemH_scrollbarFiller").length, 0, "igScroll removed scrollbar filler on refresh");
    assert.equal(this.hScroll().data("igScroll")._hBarContainer, null, "igScroll updated reference to scrollbar elements inside igScroll");
    assert.equal(this.elemContent(this.hScrollId).css("padding-bottom"), "0px", "igScroll updated reference to scrollbar elements inside igScroll");
    this.hScroll().remove();
});

QUnit.test(testId_120, function (assert) {
    $("body").append($('<div id="elemV" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollV));
    assert.expect(2);
    this.vScroll().igScroll({
        scrollbarType: "custom"
    });

    //Make it bigger
    this.vScroll().css("height", "2000px");
    this.vScroll().igScroll("refresh");

    assert.equal(this.vScrollBar(this.vScrollId).length, 0, "igScroll removed vertical scrollbar on refresh");
    assert.equal(this.vScroll().data("igScroll")._vBarContainer, null, "igScroll updated reference to scrollbar elements inside igScroll");
    this.vScroll().remove();
});

QUnit.test(testId_121, function (assert) {
    $("body").append($('<div id="elemV" style="height:400px; width: 700px; overflow: hidden;"></div>').append(this.contentScrollV));
    assert.expect(6);
    this.vScroll().igScroll({
        scrollbarType: "native"
    });

    //Check if there is only vertical scrollbar
    assert.equal(this.vScrollBar(this.vScrollId).length, 1, "igScroll rendered vertical scrollbar on init");
    assert.equal(this.hScrollBar(this.vScrollId).length, 0, "igScroll did not render horizontal scrollbar on init");

    //Make it bigger
    this.vScroll().css("height", "2000px");
    this.vScroll().igScroll("refresh");

    assert.equal(this.vScrollBar(this.vScrollId).length, 0, "igScroll removed vertical scrollbar on refresh");
    assert.equal($("#elemV_scrollbarFiller").length, 0, "igScroll removed scrollbar filler on refresh");
    assert.equal(this.vScroll().data("igScroll")._vBarContainer, null, "igScroll updated reference to scrollbar elements inside igScroll");
    assert.equal(this.elemContent(this.vScrollId).css("padding-right"), "0px", "igScroll updated reference to scrollbar elements inside igScroll");
    this.vScroll().remove();
});

QUnit.test(testId_122, function (assert) {
    this.util.isTouchDevice = function () { return true; };
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    assert.expect(3);
    this.vhScroll().igScroll({
        scrollbarType: "none"
    });

    //Emulate touch only environment
    this.vhScroll().data('igScroll')._bMixedEnvironment = false;
    this.vhScroll().igScroll("option", "scrollbarType", "native");

    assert.equal(this.vScrollBar(this.vhScrollId).length, 1, "igScroll rendered vertical scrollbar");
    assert.equal(this.hScrollBar(this.vhScrollId).length, 1, "igScroll rendered horizontal scrollbar");
    assert.equal($("#elemVH_scrollbarFiller").length, 0, "igScroll did not render scrollbar filler");
    this.vhScroll().remove();
    this.util.isTouchDevice = function () { return false; };
});

QUnit.test(testId_123, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    $("body").append($('<div id="hBarParent" style="float: left"></div>'));
    $("body").append($('<div id="vBarParent" style="float: left"></div>'));
    assert.expect(2);
    this.vhScroll().igScroll({
        scrollbarType: "native",
        scrollbarVParent: $("#vBarParent"),
        scrollbarHParent: $("#hBarParent")
    });

    assert.equal($("#elemVH_vBar", "#vBarParent").length, 1, "igScroll rendered vertical scrollbar as a child of the proper parent");
    assert.equal($("#elemVH_hBar", "#hBarParent").length, 1, "igScroll rendered horizontal scrollbar as a child of the proper parent");
    this.vhScroll().remove();
});

QUnit.test(testId_124, function (assert) {
    $("body").append($('<div id="syncV" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    $("body").append($('<div id="syncH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(6);
    $("#syncV").igScroll();
    $("#syncH").igScroll();
    this.vhScroll().igScroll({
        scrollbarType: "native",
        syncedElemsV: [$("#syncV")],
        syncedElemsH: [$("#syncH")]
    });
    this.hScrollBar(this.vhScrollId).scrollLeft(100);
    this.vScrollBar(this.vhScrollId).scrollTop(300);

    done = assert.async();
    this.testUtil.wait(100).then(function () {
        assert.equal(self.scrollContainer(self.vhScrollId).scrollTop(), 300, "The main contianer scrolled vertically");
        assert.equal(self.scrollContainer(self.vhScrollId).scrollLeft(), 100, "The main contianer scrolled horizontally");
        assert.equal($("#syncV_container").scrollTop(), 300, "The synced vertically container scrolled vertically ");
        assert.equal($("#syncV_container").scrollLeft(), 0, "The synced vertically container did not scroll horizontally");
        assert.equal($("#syncH_container").scrollTop(), 0, "The synced vertically container did not scroll vertically");
        assert.equal($("#syncH_container").scrollLeft(), 100, "");
        self.vhScroll().remove();
        $("#syncV").remove();
        $("#syncH").remove();
        done();
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });

});

QUnit.test(testId_125, function (assert) {
    this.util.isTouchDevice = function () { return true; };
    $("body").append($('<div id="syncV" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    $("body").append($('<div id="syncH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(6);
    $("#syncV").igScroll();
    $("#syncH").igScroll();
    this.vhScroll().igScroll({
        syncedElemsV: [$("#syncV")],
        syncedElemsH: [$("#syncH")]
    });

    //Simulate touch only environment
    this.vhScroll().data('igScroll')._bMixedEnvironment = false;
    $("#syncV").data('igScroll')._bMixedEnvironment = false;
    $("#syncH").data('igScroll')._bMixedEnvironment = false;
    done = assert.async();
    var touchSteps = [{ x: 20, y: 3 }, { x: 17, y: 7 }, { x: 17, y: 15 }, { x: 17, y: 15 }, { x: 7, y: 6 }, { x: 6, y: 5 }, { x: 1, y: 1 }];
    this.testUtil.simulateTouchSwipeFromCenter(this.scrollContainer(this.vhScrollId), touchSteps, 10);
    this.testUtil.wait(2500).then(function () {
        //The scroll ammount on X axis is 55 because there is swipe tollerance of 30px
        assert.equal(self.vhScroll().data("igScroll")._getContentPositionX(), 55, "igScroll scrolled horizontally by the swipe");
        assert.equal(self.vhScroll().data("igScroll")._getContentPositionY(), 52, "igScroll scrolled vertically by the swipe");
        assert.equal($("#syncV").data("igScroll")._getContentPositionX(), 0, "Synced vertically element scrolled horizontally");
        assert.equal($("#syncV").data("igScroll")._getContentPositionY(), 52, "Synced vertically element did not scroll vertically");
        assert.equal($("#syncH").data("igScroll")._getContentPositionX(), 55, "Synced horizontally element scrolled horizontally");
        assert.equal($("#syncH").data("igScroll")._getContentPositionY(), 0, "Synced horizontally element did not scroll vertically");
        self.vhScroll().remove();
        $("#syncV").remove();
        $("#syncH").remove();
        self.util.isTouchDevice = function () { return false; };
        done();
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_126, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;" tabindex="1"></div>').append(this.contentScrollVH));
    assert.expect(6);
    this.vhScroll().igScroll();

    // Claclulating the drag width and height is based on the formula used in the igScroll implementation
    var hDragWidthPercentage = (this.hTrack(this.vhScrollId).width() / this.elemContent(this.vhScrollId).width()) * 100,
        vDragHeightPercentage = (this.vTrack(this.vhScrollId).height() / this.elemContent(this.vhScrollId).height()) * 100;

    assert.equal(parseFloat(this.hDrag(this.vhScrollId)[0].style.width).toFixed(4), hDragWidthPercentage.toFixed(4), "Horizontal thumb drag has proper initial width");
    assert.equal(parseFloat(this.vDrag(this.vhScrollId)[0].style.height).toFixed(4), vDragHeightPercentage.toFixed(4), "Vertical thumb drag has proper initial height");

    this.vhScroll().igScroll("option", "scrollWidth", 700);
    hDragWidthPercentage = (this.hTrack(this.vhScrollId).width() / this.elemContent(this.vhScrollId).width()) * 100;
    vDragHeightPercentage = (this.vTrack(this.vhScrollId).height() / this.elemContent(this.vhScrollId).height()) * 100;

    assert.equal(parseFloat(this.hDrag(this.vhScrollId)[0].style.width).toFixed(4), hDragWidthPercentage.toFixed(4), "Horizontal thumb drag has updated its width after setting scrollWidth");
    assert.equal(parseFloat(this.vDrag(this.vhScrollId)[0].style.height).toFixed(4), vDragHeightPercentage.toFixed(4), "Vertical thumb drag has its height unchanged after setting scrollWidth");

    this.vhScroll().igScroll("option", "scrollWidth", 500);

    assert.equal(this.hScrollBar(this.vhScrollId).length, 0, "Horizontal thumb drag is removed");
    assert.equal(this.vScrollBar(this.vhScrollId).length, 1, "Vertical thumb drag is not removed");
    this.vhScroll().remove();
});

QUnit.test(testId_127, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;" tabindex="1"></div>').append(this.contentScrollVH));
    assert.expect(6);
    this.vhScroll().igScroll();

    // Claclulating the drag width and height is based on the formula used in the igScroll implementation
    var hDragWidthPercentage = (this.hTrack(this.vhScrollId).width() / this.elemContent(this.vhScrollId).width()) * 100,
        vDragHeightPercentage = (this.vTrack(this.vhScrollId).height() / this.elemContent(this.vhScrollId).height()) * 100;

    assert.equal(parseFloat(this.hDrag(this.vhScrollId)[0].style.width).toFixed(4), hDragWidthPercentage.toFixed(4), "Horizontal thumb drag has proper initial width");
    assert.equal(parseFloat(this.vDrag(this.vhScrollId)[0].style.height).toFixed(4), vDragHeightPercentage.toFixed(4), "Vertical thumb drag has proper initial height");

    this.vhScroll().igScroll("option", "scrollHeight", 1000);
    hDragWidthPercentage = (this.hTrack(this.vhScrollId).width() / this.elemContent(this.vhScrollId).width()) * 100;
    vDragHeightPercentage = (this.vTrack(this.vhScrollId).height() / this.elemContent(this.vhScrollId).height()) * 100;

    assert.equal(parseFloat(this.hDrag(this.vhScrollId)[0].style.width).toFixed(4), hDragWidthPercentage.toFixed(4), "Horizontal thumb drag has updated its width after setting scrollWidth");
    assert.equal(parseFloat(this.vDrag(this.vhScrollId)[0].style.height).toFixed(4), vDragHeightPercentage.toFixed(4), "Vertical thumb drag has its height unchanged after setting scrollWidth");

    this.vhScroll().igScroll("option", "scrollHeight", 300);

    assert.equal(this.hScrollBar(this.vhScrollId).length, 1, "Horizontal thumb drag is not removed");
    assert.equal(this.vScrollBar(this.vhScrollId).length, 0, "Vertical thumb drag is removed");
    this.vhScroll().remove();
});

QUnit.test(testId_128, function (assert) {
    this.util.isTouchDevice = function () { return true; };
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    $("body").append($('<div id="elemVSync" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollV));
    var done, self = this;
    assert.expect(4);
    this.vhScroll().igScroll({
        modifyDOM: true,
        syncedElemsV: [this.vSyncScroll()],
    });
    done = assert.async();
    this.vhScroll().data('igScroll')._bMixedEnvironment = false;
    var touchSteps = [{ x: 3, y: 3 }, { x: 7, y: 7 }, { x: 8, y: 8 }, { x: 9, y: 9 }];
    this.testUtil.simulateTouchSwipeFromCenter(this.scrollContainer(this.vhScrollId), touchSteps, 1);
    this.testUtil.wait(2500).then(function () {
        assert.equal(self.vhScroll().data("igScroll")._getContentPositionX(), 200, "igScroll scrolled horizontally by the swipe");
        assert.notEqual(self.vhScroll().data("igScroll")._getContentPositionY(), 13, "igScroll did not scroll properly vertically");

        assert.equal(self.vhScroll().data("igScroll")._getContentPositionY(), -self.getTransform3dValueY($('#elemVSync_content')), "igScroll content and linked element did not sync vertically on touch");
        assert.equal(-self.getTransform3dValueX(self.elemContent(self.vSyncScrollId)), 0, "igScroll content and linked element did not sync vertically on touch");
        self.vhScroll().remove();
        self.vSyncScroll().remove();
        self.util.isTouchDevice = function () { return false; };
        done();
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_129, function (assert) {
    this.util.isTouchDevice = function () { return true; };
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    $("body").append($('<div id="elemHSync" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollH));
    var done, self = this;
    assert.expect(4);
    this.vhScroll().igScroll({
        modifyDOM: true,
        syncedElemsH: [this.hSyncScroll()],
    });
    done = assert.async();
    this.vhScroll().data('igScroll')._bMixedEnvironment = false;
    var touchSteps = [{ x: 3, y: 3 }, { x: 7, y: 7 }, { x: 8, y: 8 }, { x: 9, y: 9 }];
    this.testUtil.simulateTouchSwipeFromCenter(this.scrollContainer(this.vhScrollId), touchSteps, 10);
    this.testUtil.wait(2500).then(function () {
        assert.notEqual(self.vhScroll().data("igScroll")._getContentPositionX(), 27, "igScroll scrolled horizontally by the swipe");
        assert.equal(self.vhScroll().data("igScroll")._getContentPositionY(), 27, "igScroll did not scroll vertically");

        assert.equal(self.vhScroll().data("igScroll")._getContentPositionX(), -self.getTransform3dValueX($('#elemHSync_content')), "igScroll content and linked element did not sync horizontally on touch");
        assert.equal(-self.getTransform3dValueY(self.elemContent(self.hSyncScrollId)), 0, "igScroll content and linked element did not sync horizontally on touch");
        self.vhScroll().remove();
        self.hSyncScroll().remove();
        self.util.isTouchDevice = function () { return false; };
        done();
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_130, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;" tabindex="1"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(4);
    this.vhScroll().igScroll({
        scrollbarType: "native"
    });
    this.vhScroll().igScroll("option", "scrollTop", 600);
    this.vhScroll().igScroll("option", "scrollLeft", 100);

    done = assert.async();
    this.testUtil.wait(100).then(function () {
        assert.equal(self.vScrollBar(self.vhScrollId).scrollTop(), 600, "the vertical native scrollbar is poistioned correctly before hiding it");
        assert.equal(self.hScrollBar(self.vhScrollId).scrollLeft(), 100, "the horizontal native scrollbar is poistioned correctly before hiding it");

        self.vhScroll().igScroll("option", "scrollbarType", "none");

        self.vhScroll().igScroll("option", "scrollTop", 700);
        self.vhScroll().igScroll("option", "scrollLeft", 200);

        self.vhScroll().igScroll("option", "scrollbarType", "native");
        assert.equal(self.vScrollBar(self.vhScrollId).scrollTop(), 700, "the vertical native scrollbar is poistioned correctly after showing it again");
        assert.equal(self.hScrollBar(self.vhScrollId).scrollLeft(), 200, "the horizontal native scrollbar is poistioned correctly after showing it again");
        self.vhScroll().remove();
        done();
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_131, function (assert) {
    this.util.isTouchDevice = function () { return true; };
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(4);
    this.vhScroll().igScroll({
        scrollbarType: "none"
    });
    done = assert.async();
    this.vhScroll().data('igScroll')._bMixedEnvironment = false;
    var touchSteps = [{ x: 3, y: 3 }, { x: 7, y: 7 }, { x: 8, y: 8 }, { x: 9, y: 9 }];
    this.testUtil.simulateTouchSwipeFromCenter(this.scrollContainer(this.vhScrollId), touchSteps, 1);
    this.testUtil.wait(2500).then(function () {
        assert.equal(self.vhScroll().data("igScroll")._getContentPositionX(), 200, "igScroll scrolled horizontally by the swipe");
        assert.equal(self.vhScroll().data("igScroll")._getContentPositionY(), 27, "igScroll did not scroll properly vertically");

        self.vhScroll().igScroll("option", "scrollbarType", "native");
        assert.equal(self.hScrollBar(self.vhScrollId).scrollLeft(), 200, "the vertical native scrollbar is poistioned correctly after showing it again");
        assert.equal(self.vScrollBar(self.vhScrollId).scrollTop(), 27, "the horizontal native scrollbar is poistioned correctly after showing it again");
        self.vhScroll().remove();
        self.util.isTouchDevice = function () { return false; };
        done();
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_132, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;" tabindex="1"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(2);
    this.vhScroll().igScroll({
        scrollbarType: "custom"
    });
    this.vhScroll().igScroll("option", "scrollTop", 600);
    this.vhScroll().igScroll("option", "scrollLeft", 100);
    done = assert.async();
    this.testUtil.wait(100).then(function () {
        var oldScrollbarPosX = self.getTransform3dValueX(self.hDrag(self.vhScrollId)),
            oldScrollbarPosY = self.getTransform3dValueY(self.vDrag(self.vhScrollId));

        self.vhScroll().igScroll("option", "scrollbarType", "none");
        self.vhScroll().igScroll("option", "scrollTop", 700);
        self.vhScroll().igScroll("option", "scrollLeft", 200);

        self.vhScroll().igScroll("option", "scrollbarType", "custom");
        self.testUtil.wait(100).then(function () {
            assert.ok(self.getTransform3dValueX(self.hDrag(self.vhScrollId)) > oldScrollbarPosX, "the vertical native scrollbar is poistioned correctly after showing it again");
            assert.ok(self.getTransform3dValueY(self.vDrag(self.vhScrollId)) > oldScrollbarPosY, "the horizontal native scrollbar is poistioned correctly after showing it again");
            self.vhScroll().remove();
            done();
        });
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});


QUnit.test(testId_133, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;" tabindex="1"></div>').append(this.contentScrollVH));
    assert.expect(12);
    this.vhScroll().igScroll();

    assert.equal(this.vhScroll().css("height"), "400px", "tabindex is the same as the main element");
    assert.equal(this.vhScroll().css("width"), "600px", "tabindex is the same as the main element");
    assert.equal(this.scrollContainer(this.vhScrollId).css("height"), "400px", "tabindex is the same as the main element");
    assert.equal(this.scrollContainer(this.vhScrollId).css("width"), "600px", "tabindex is the same as the main element");
    assert.equal($(".igscroll-vcontainer").css("height"), "400px", "tabindex is the same as the main element");
    assert.equal($(".igscroll-hcontainer").css("width"), "600px", "tabindex is the same as the main element");

    //Simulate MutationObserver since it is not supported by PhantomJS prior to 2.0 version
    this.vhScroll().css("width", "300px");
    this.vhScroll().data("igScroll")._onElementMutation([{ attributeName: "style" }]);

    assert.equal(this.vhScroll().css("height"), "400px", "tabindex is the same as the main element");
    assert.equal(this.vhScroll().css("width"), "300px", "tabindex is the same as the main element");
    assert.equal(this.scrollContainer(this.vhScrollId).css("height"), "400px", "tabindex is the same as the main element");
    assert.equal(this.scrollContainer(this.vhScrollId).css("width"), "300px", "tabindex is the same as the main element");
    assert.equal($(".igscroll-vcontainer").css("height"), "400px", "tabindex is the same as the main element");
    assert.equal($(".igscroll-hcontainer").css("width"), "300px", "tabindex is the same as the main element");
    this.vhScroll().remove();
});

QUnit.test(testId_134, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;" tabindex="1"></div>').append(this.contentScrollVH));
    assert.expect(12);
    this.vhScroll().igScroll();

    assert.equal(this.vhScroll().css("height"), "400px", "tabindex is the same as the main element");
    assert.equal(this.vhScroll().css("width"), "600px", "tabindex is the same as the main element");
    assert.equal(this.scrollContainer(this.vhScrollId).css("height"), "400px", "tabindex is the same as the main element");
    assert.equal(this.scrollContainer(this.vhScrollId).css("width"), "600px", "tabindex is the same as the main element");
    assert.equal($(".igscroll-vcontainer").css("height"), "400px", "tabindex is the same as the main element");
    assert.equal($(".igscroll-hcontainer").css("width"), "600px", "tabindex is the same as the main element");

    //Simulate MutationObserver since it is not supported by PhantomJS prior to 2.0 version
    this.vhScroll().css("height", "600px");
    this.vhScroll().data("igScroll")._onElementMutation([{ attributeName: "style" }]);

    assert.equal(this.vhScroll().css("height"), "600px", "tabindex is the same as the main element");
    assert.equal(this.vhScroll().css("width"), "600px", "tabindex is the same as the main element");
    assert.equal(this.scrollContainer(this.vhScrollId).css("height"), "600px", "tabindex is the same as the main element");
    assert.equal(this.scrollContainer(this.vhScrollId).css("width"), "600px", "tabindex is the same as the main element");
    assert.equal($(".igscroll-vcontainer").css("height"), "600px", "tabindex is the same as the main element");
    assert.equal($(".igscroll-hcontainer").css("width"), "600px", "tabindex is the same as the main element");

    this.vhScroll().remove();
});

QUnit.test(testId_135, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 400px; overflow: hidden;" tabindex="1"></div>').append(this.contentScrollVH));
    assert.expect(31);
    this.vhScroll().igScroll();

    assert.equal(this.vhScroll().css("height"), "400px", "Initial height of the main element is correct");
    assert.equal(this.vhScroll().css("width"), "400px", "Initial width of the main element is correct");
    assert.equal(this.scrollContainer(this.vhScrollId).css("height"), "400px", "Initial height of the igScroll main container is correct");
    assert.equal(this.scrollContainer(this.vhScrollId).css("width"), "400px", "Initial height of the igScroll main container is correct");

    assert.equal(this.vScrollBar(this.vhScrollId).css("height"), "400px", "Initial height of the custom vertical scrollbar container is correct");
    assert.equal(this.vTrack(this.vhScrollId).css("bottom"), "30px", "Initial empty space under the custom vertical scrollbar track is correct");
    assert.equal(this.arrowDown(this.vhScrollId).css("bottom"), "15px", "Initial empty space under the custom vertical scrollbar track is correct");

    assert.equal(this.hScrollBar(this.vhScrollId).css("width"), "400px", "Initial height of the custom vertical scrollbar container is correct");
    assert.equal(this.hTrack(this.vhScrollId).css("right"), "30px", "Initial empty space right of the custom vertical scrollbar track is correct");
    assert.equal(this.arrowRight(this.vhScrollId).css("right"), "15px", "Initial empty space right of the custom vertical scrollbar track is correct");

    //Simulate MutationObserver since it is not supported by PhantomJS prior to 2.0 version
    this.vhScroll().css("width", "1200px");
    this.vhScroll().data("igScroll")._onElementMutation([{ attributeName: "style" }]);

    assert.equal(this.vhScroll().css("height"), "400px", "Height of the main element is correct after changing width");
    assert.equal(this.vhScroll().css("width"), "1200px", "Width of the main element is correct after changing width");
    assert.equal(this.scrollContainer(this.vhScrollId).css("height"), "400px", "Height of the igScroll main container is correct after changing width");
    assert.equal(this.scrollContainer(this.vhScrollId).css("width"), "1200px", "Width of the igScroll main container is correct after changing width");

    assert.equal(this.vScrollBar(this.vhScrollId).length, 1, "Custom vertical scrollbar should be visible");
    assert.equal(this.vScrollBar(this.vhScrollId).css("height"), "400px", "Height of the custom vertical scrollbar container is correct");
    assert.equal(this.vTrack(this.vhScrollId).css("bottom"), "15px", "Empty space under the custom vertical scrollbar track is correct");
    assert.equal(this.arrowDown(this.vhScrollId).css("bottom"), "0px", "Empty space under the custom down arrow is correct");

    assert.equal(this.hScrollBar(this.vhScrollId).length, 0, "Custom horizontal scrollbar should not be visible");

    //Simulate MutationObserver since it is not supported by PhantomJS prior to 2.0 version
    this.vhScroll().css("width", "400px");
    this.vhScroll().data("igScroll")._onElementMutation([{ attributeName: "style" }]);

    assert.equal(this.vhScroll().css("height"), "400px", "Height of the main element is correct after changing width");
    assert.equal(this.vhScroll().css("width"), "400px", "Width of the main element is correct after changing width");
    assert.equal(this.scrollContainer(this.vhScrollId).css("height"), "400px", "Height of the igScroll main container is correct after changing width");
    assert.equal(this.scrollContainer(this.vhScrollId).css("width"), "400px", "Width of the igScroll main container is correct after changing width");

    assert.equal(this.vScrollBar(this.vhScrollId).length, 1, "Custom vertical scrollbar should be visible");
    assert.equal(this.vScrollBar(this.vhScrollId).css("height"), "400px", "Height of the custom vertical scrollbar container is correct");
    assert.equal(this.vTrack(this.vhScrollId).css("bottom"), "30px", "Empty space under the custom vertical scrollbar track is correct");
    assert.equal(this.arrowDown(this.vhScrollId).css("bottom"), "15px", "Empty space under the custom vertical scrollbar down arrow is correct");

    assert.equal(this.hScrollBar(this.vhScrollId).length, 1, "Custom horizontal scrollbar should be visible");
    assert.equal(this.hScrollBar(this.vhScrollId).css("width"), "400px", "Width of the custom horizontal scrollbar container is correct");
    assert.equal(this.hTrack(this.vhScrollId).css("right"), "30px", "Empty space right of the custom horizontal scrollbar track is correct");
    assert.equal(this.arrowRight(this.vhScrollId).css("right"), "15px", "Empty space right of the custom right arrow is correct");
    this.vhScroll().remove();
});

QUnit.test(testId_136, function (assert) {
    $("body").append($('<div id="elemVH" style="height:400px; width: 400px; overflow: hidden;" tabindex="1"></div>').append(this.contentScrollV));
    assert.expect(31);
    this.vhScroll().igScroll();

    assert.equal(this.vhScroll().css("height"), "400px", "Initial height of the main element is correct");
    assert.equal(this.vhScroll().css("width"), "400px", "Initial width of the main element is correct");
    assert.equal(this.scrollContainer(this.vhScrollId).css("height"), "400px", "Initial height of the igScroll main container is correct");
    assert.equal(this.scrollContainer(this.vhScrollId).css("width"), "400px", "Initial height of the igScroll main container is correct");

    assert.equal(this.vScrollBar(this.vhScrollId).css("height"), "400px", "Initial height of the custom vertical scrollbar container is correct");
    assert.equal(this.vTrack(this.vhScrollId).css("bottom"), "30px", "Initial empty space under the custom vertical scrollbar track is correct");
    assert.equal(this.arrowDown(this.vhScrollId).css("bottom"), "15px", "Initial empty space under the custom vertical scrollbar track is correct");

    assert.equal(this.hScrollBar(this.vhScrollId).css("width"), "400px", "Initial height of the custom vertical scrollbar container is correct");
    assert.equal(this.hTrack(this.vhScrollId).css("right"), "30px", "Initial empty space right of the custom vertical scrollbar track is correct");
    assert.equal(this.arrowRight(this.vhScrollId).css("right"), "15px", "Initial empty space right of the custom vertical scrollbar track is correct");

    //Simulate MutationObserver since it is not supported by PhantomJS prior to 2.0 version
    this.vhScroll().css("height", "1500px");
    this.vhScroll().data("igScroll")._onElementMutation([{ attributeName: "style" }]);

    assert.equal(this.vhScroll().css("height"), "1500px", "Height of the main element is correct after changing width");
    assert.equal(this.vhScroll().css("width"), "400px", "Width of the main element is correct after changing width");
    assert.equal(this.scrollContainer(this.vhScrollId).css("height"), "1500px", "Height of the igScroll main container is correct after changing width");
    assert.equal(this.scrollContainer(this.vhScrollId).css("width"), "400px", "Width of the igScroll main container is correct after changing width");

    assert.equal(this.vScrollBar(this.vhScrollId).length, 0, "Custom vertical scrollbar should be visible");

    assert.equal(this.hScrollBar(this.vhScrollId).length, 1, "Custom horizontal scrollbar should not be visible");
    assert.equal(this.hScrollBar(this.vhScrollId).css("width"), "400px", "Width of the custom horizontal scrollbar container is correct");
    assert.equal(this.hTrack(this.vhScrollId).css("right"), "15px", "Empty space right of the custom horizontal scrollbar track is correct");
    assert.equal(this.arrowRight(this.vhScrollId).css("right"), "0px", "Empty space right of the custom right arrow is correct");

    //Simulate MutationObserver since it is not supported by PhantomJS prior to 2.0 version
    this.vhScroll().css("height", "400px");
    this.vhScroll().data("igScroll")._onElementMutation([{ attributeName: "style" }]);

    assert.equal(this.vhScroll().css("height"), "400px", "Height of the main element is correct after changing width");
    assert.equal(this.vhScroll().css("width"), "400px", "Width of the main element is correct after changing width");
    assert.equal(this.scrollContainer(this.vhScrollId).css("height"), "400px", "Height of the igScroll main container is correct after changing width");
    assert.equal(this.scrollContainer(this.vhScrollId).css("width"), "400px", "Width of the igScroll main container is correct after changing width");

    assert.equal(this.vScrollBar(this.vhScrollId).length, 1, "Custom vertical scrollbar should be visible");
    assert.equal(this.vScrollBar(this.vhScrollId).css("height"), "400px", "Height of the custom vertical scrollbar container is correct");
    assert.equal(this.vTrack(this.vhScrollId).css("bottom"), "30px", "Empty space under the custom vertical scrollbar track is correct");
    assert.equal(this.arrowDown(this.vhScrollId).css("bottom"), "15px", "Empty space under the custom vertical scrollbar down arrow is correct");

    assert.equal(this.hScrollBar(this.vhScrollId).length, 1, "Custom horizontal scrollbar should be visible");
    assert.equal(this.hScrollBar(this.vhScrollId).css("width"), "400px", "Width of the custom horizontal scrollbar container is correct");
    assert.equal(this.hTrack(this.vhScrollId).css("right"), "30px", "Empty space right of the custom horizontal scrollbar track is correct");
    assert.equal(this.arrowRight(this.vhScrollId).css("right"), "15px", "Empty space right of the custom right arrow is correct");
    this.vhScroll().remove();
});

QUnit.test(testId_137, function (assert) {
    var nativeScrollSize = this.util.getScrollWidth();
    $("body").append($('<div id="elemVH" style="height:400px; width: 400px; overflow: hidden;" tabindex="1"></div>').append(this.contentScrollV));
    assert.expect(29);
    this.vhScroll().igScroll({
        scrollbarType: "native"
    });

    assert.equal(this.vhScroll().css("height"), "400px", "Initial height of the main element is correct");
    assert.equal(this.vhScroll().css("width"), "400px", "Initial width of the main element is correct");
    assert.equal(this.scrollContainer(this.vhScrollId).css("height"), "400px", "Initial height of the igScroll main container is correct");
    assert.equal(this.scrollContainer(this.vhScrollId).css("width"), "400px", "Initial height of the igScroll main container is correct");
    assert.equal($("#elemVH_scrollbarFiller").length, 1, "Native scrollbars filler should be visible");

    assert.equal(this.vScrollBar(this.vhScrollId).css("height"), (400 - nativeScrollSize) + "px", "Initial height of the native vertical scrollbar container is correct");
    assert.equal(this.vScrollBar(this.vhScrollId).css("bottom"), nativeScrollSize + "px", "Initial empty space under the native vertical scrollbar track is correct");

    assert.equal(this.hScrollBar(this.vhScrollId).css("width"), (400 - nativeScrollSize) + "px", "Initial height of the native vertical scrollbar container is correct");
    assert.equal(this.hScrollBar(this.vhScrollId).css("right"), nativeScrollSize + "px", "Initial empty space right of the native vertical scrollbar track is correct");

    //Simulate MutationObserver since it is not supported by PhantomJS prior to 2.0 version
    this.vhScroll().css("width", "700px");
    this.vhScroll().data("igScroll")._onElementMutation([{ attributeName: "style" }]);

    assert.equal(this.vhScroll().css("height"), "400px", "Height of the main element is correct after changing width");
    assert.equal(this.vhScroll().css("width"), "700px", "Width of the main element is correct after changing width");
    assert.equal(this.scrollContainer(this.vhScrollId).css("height"), "400px", "Height of the igScroll main container is correct after changing width");
    assert.equal(this.scrollContainer(this.vhScrollId).css("width"), "700px", "Width of the igScroll main container is correct after changing width");
    assert.equal($("#elemVH_scrollbarFiller").length, 0, "Native scrollbars filler should not be visible");

    assert.equal(this.vScrollBar(this.vhScrollId).length, 1, "native vertical scrollbar should be visible");
    assert.equal(this.vScrollBar(this.vhScrollId).css("height"), "400px", "Initial height of the native vertical scrollbar container is correct");
    assert.equal(this.vScrollBar(this.vhScrollId).css("bottom"), "0px", "Initial empty space under the native vertical scrollbar track is correct");

    assert.equal(this.hScrollBar(this.vhScrollId).length, 0, "native horizontal scrollbar should not be visible");

    //Simulate MutationObserver since it is not supported by PhantomJS prior to 2.0 version
    this.vhScroll().css("width", "400px");
    this.vhScroll().data("igScroll")._onElementMutation([{ attributeName: "style" }]);

    assert.equal(this.vhScroll().css("height"), "400px", "Height of the main element is correct after changing width");
    assert.equal(this.vhScroll().css("width"), "400px", "Width of the main element is correct after changing width");
    assert.equal(this.scrollContainer(this.vhScrollId).css("height"), "400px", "Height of the igScroll main container is correct after changing width");
    assert.equal(this.scrollContainer(this.vhScrollId).css("width"), "400px", "Width of the igScroll main container is correct after changing width");
    assert.equal($("#elemVH_scrollbarFiller").length, 1, "Native scrollbars filler should be visible");

    assert.equal(this.vScrollBar(this.vhScrollId).length, 1, "native vertical scrollbar should be visible");
    assert.equal(this.vScrollBar(this.vhScrollId).css("height"), (400 - nativeScrollSize) + "px", "Height of the native vertical scrollbar container is correct");
    assert.equal(this.vScrollBar(this.vhScrollId).css("bottom"), nativeScrollSize + "px", "Empty space under the native vertical scrollbar track is correct");

    assert.equal(this.hScrollBar(this.vhScrollId).length, 1, "native horizontal scrollbar should be visible");
    assert.equal(this.hScrollBar(this.vhScrollId).css("width"), (400 - nativeScrollSize) + "px", "Width of the native horizontal scrollbar container is correct");
    assert.equal(this.hScrollBar(this.vhScrollId).css("right"), nativeScrollSize + "px", "Empty space right of the native horizontal scrollbar track is correct");
    this.vhScroll().remove();
});

QUnit.test(testId_138, function (assert) {
    var nativeScrollSize = this.util.getScrollWidth();
    $("body").append($('<div id="elemVH" style="height:400px; width: 400px; overflow: hidden;" tabindex="1"></div>').append(this.contentScrollV));
    assert.expect(29);
    this.vhScroll().igScroll({
        scrollbarType: "native"
    });

    assert.equal(this.vhScroll().css("height"), "400px", "Initial height of the main element is correct");
    assert.equal(this.vhScroll().css("width"), "400px", "Initial width of the main element is correct");
    assert.equal(this.scrollContainer(this.vhScrollId).css("height"), "400px", "Initial height of the igScroll main container is correct");
    assert.equal(this.scrollContainer(this.vhScrollId).css("width"), "400px", "Initial height of the igScroll main container is correct");
    assert.equal($("#elemVH_scrollbarFiller").length, 1, "Native scrollbars filler should be visible");

    assert.equal(this.vScrollBar(this.vhScrollId).css("height"), (400 - nativeScrollSize) + "px", "Initial height of the native vertical scrollbar container is correct");
    assert.equal(this.vScrollBar(this.vhScrollId).css("bottom"), nativeScrollSize + "px", "Initial empty space under the native vertical scrollbar track is correct");

    assert.equal(this.hScrollBar(this.vhScrollId).css("width"), (400 - nativeScrollSize) + "px", "Initial height of the native vertical scrollbar container is correct");
    assert.equal(this.hScrollBar(this.vhScrollId).css("right"), nativeScrollSize + "px", "Initial empty space right of the native vertical scrollbar track is correct");

    //Simulate MutationObserver since it is not supported by PhantomJS prior to 2.0 version
    this.vhScroll().css("height", "1500px");
    this.vhScroll().data("igScroll")._onElementMutation([{ attributeName: "style" }]);

    assert.equal(this.vhScroll().css("height"), "1500px", "Height of the main element is correct after changing width");
    assert.equal(this.vhScroll().css("width"), "400px", "Width of the main element is correct after changing width");
    assert.equal(this.scrollContainer(this.vhScrollId).css("height"), "1500px", "Height of the igScroll main container is correct after changing width");
    assert.equal(this.scrollContainer(this.vhScrollId).css("width"), "400px", "Width of the igScroll main container is correct after changing width");
    assert.equal($("#elemVH_scrollbarFiller").length, 0, "Native scrollbars filler should not be visible");

    assert.equal(this.vScrollBar(this.vhScrollId).length, 0, "native vertical scrollbar should be visible");

    assert.equal(this.hScrollBar(this.vhScrollId).length, 1, "native horizontal scrollbar should not be visible");
    assert.equal(this.hScrollBar(this.vhScrollId).css("width"), "400px", "Width of the native horizontal scrollbar container is correct");
    assert.equal(this.hScrollBar(this.vhScrollId).css("right"), "0px", "Empty space right of the native horizontal scrollbar track is correct");

    //Simulate MutationObserver since it is not supported by PhantomJS prior to 2.0 version
    this.vhScroll().css("height", "400px");
    this.vhScroll().data("igScroll")._onElementMutation([{ attributeName: "style" }]);

    assert.equal(this.vhScroll().css("height"), "400px", "Height of the main element is correct after changing width");
    assert.equal(this.vhScroll().css("width"), "400px", "Width of the main element is correct after changing width");
    assert.equal(this.scrollContainer(this.vhScrollId).css("height"), "400px", "Height of the igScroll main container is correct after changing width");
    assert.equal(this.scrollContainer(this.vhScrollId).css("width"), "400px", "Width of the igScroll main container is correct after changing width");
    assert.equal($("#elemVH_scrollbarFiller").length, 1, "Native scrollbars filler should be visible");

    assert.equal(this.vScrollBar(this.vhScrollId).length, 1, "native vertical scrollbar should be visible");
    assert.equal(this.vScrollBar(this.vhScrollId).css("height"), (400 - nativeScrollSize) + "px", "Height of the native vertical scrollbar container is correct");
    assert.equal(this.vScrollBar(this.vhScrollId).css("bottom"), nativeScrollSize + "px", "Empty space under the native vertical scrollbar track is correct");

    assert.equal(this.hScrollBar(this.vhScrollId).length, 1, "native horizontal scrollbar should be visible");
    assert.equal(this.hScrollBar(this.vhScrollId).css("width"), (400 - nativeScrollSize) + "px", "Width of the native horizontal scrollbar container is correct");
    assert.equal(this.hScrollBar(this.vhScrollId).css("right"), nativeScrollSize + "px", "Empty space right of the native horizontal scrollbar track is correct");
    this.vhScroll().remove();
});

QUnit.test(testId_140, function (assert) {
    this.util.isTouchDevice = function () { return true; };
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(6);
    this.vhScroll().igScroll({
        modifyDOM: true,
    });
    this.vhScroll().data('igScroll')._bMixedEnvironment = false;
    var touchSteps = [{ x: 0, y: 3 }, { x: 0, y: 4 }, { x: 0, y: 3 }, { x: 0, y: 3 }];
    this.testUtil.simulateTouchSwipeFromCenter(this.scrollContainer(this.vhScrollId), touchSteps, 1);
    done = assert.async();
    this.testUtil.wait(500).then(function () {
        //Check if we have scrolled more than if we didn't have inertia
        assert.equal(self.vhScroll().data("igScroll")._getContentPositionX(), 0, "igScroll scrolled horizontally by the swipe");
        assert.ok(self.vhScroll().data("igScroll")._getContentPositionY() > 13, "igScroll did not scroll properly vertically");

        var lastPosY = self.vhScroll().data("igScroll")._getContentPositionY();
        self.testUtil.wait(500).then(function () {
            //Check if we have scrolled even more than last time
            assert.equal(self.vhScroll().data("igScroll")._getContentPositionX(), 0, "igScroll scrolled horizontally by the swipe");
            assert.ok(self.vhScroll().data("igScroll")._getContentPositionY() > lastPosY, "igScroll did not scroll continuously");

            //Should interrupt inertia
            self.vhScroll().igScroll("option", "scrollTop", 20);
            self.testUtil.wait(500).then(function () {
                //Check if we have successfully interrupted the inertia
                assert.equal(self.vhScroll().data("igScroll")._getContentPositionX(), 0, "igScroll scrolled horizontally by the swipe");
                assert.equal(self.vhScroll().data("igScroll")._getContentPositionY(), 20, "igScroll did not scroll properly vertically");
                self.vhScroll().remove();
                self.util.isTouchDevice = function () { return false; };
                done();
            });
        });
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_141, function (assert) {
    this.util.isTouchDevice = function () { return true; };
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    var done, self = this;
    assert.expect(2);
    this.vhScroll().igScroll({
        modifyDOM: true,
    });
    this.vhScroll().data('igScroll')._bMixedEnvironment = false;
    var touchSteps = [{ x: 3, y: 0 }, { x: 7, y: 0 }, { x: 8, y: 0 }, { x: 9, y: 0 }];
    this.testUtil.simulateTouchSwipeFromCenter(this.scrollContainer(this.vhScrollId), touchSteps, 10);
    done = assert.async();
    this.testUtil.wait(500).then(function () {
        self.vhScroll().igScroll("option", "scrollLeft", 20);
        self.testUtil.wait(500).then(function () {
            //Check if we have successfully interrupted the inertia
            assert.equal(self.vhScroll().data("igScroll")._getContentPositionX(), 20, "igScroll scrolled horizontally by the swipe");
            assert.equal(self.vhScroll().data("igScroll")._getContentPositionY(), 0, "igScroll did not scroll properly vertically");
            self.vhScroll().remove();
            self.util.isTouchDevice = function () { return false; };
            done();
        });
    }).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_142, function (assert) {
    var self = this;
    assert.expect(2);
	this.util.isTouchDevice = function () { return true; };
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    this.vhScroll().igScroll({
		modifyDOM: true
	});
	var elemContainer = $("#elemVH_container"),
		elemContent = $("#elemVH_content");

	this.vhScroll().data('igScroll')._bMixedEnvironment = false;
	
    this.vhScroll().igScroll("option", "scrollTop", 100);
    done = assert.async();
    this.testUtil.wait(10).then(function () {
		assert.equal(elemContainer.scrollTop(), 0, "scrollTop of the container should be 0");
		assert.equal(-self.getTransform3dValueY(elemContent), 100, "the Y axis of the transform3d of the content should be 100");
		self.vhScroll().remove();
        self.util.isTouchDevice = function () { return false; };
        done();
	}).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});

QUnit.test(testId_143, function (assert) {
    var self = this;
    assert.expect(2);
	this.util.isTouchDevice = function () { return true; };
    $("body").append($('<div id="elemVH" style="height:400px; width: 600px; overflow: hidden;"></div>').append(this.contentScrollVH));
    this.vhScroll().igScroll({
		modifyDOM: true
	});
	var elemContainer = $("#elemVH_container"),
		elemContent = $("#elemVH_content");

	this.vhScroll().data('igScroll')._bMixedEnvironment = false;
	
	//Scroll right 100px
	this.vhScroll().igScroll("option", "scrollLeft", 100);
    done = assert.async();
    this.testUtil.wait(10).then(function () {
		assert.equal(elemContainer.scrollLeft(), 0, "scrollLeft of the container should be 0");
		assert.equal(-self.getTransform3dValueX(elemContent), 100, "the X axis of the transform3d of the content should be 100");
		self.vhScroll().remove();
        self.util.isTouchDevice = function () { return false; };
        done();
	}).catch(function (er) {
        assert.pushResult({ result: false, message: er.message });
        done();
        throw er;
    });
});