//P.M. March 1st, 2018 Since jQuery 3.2.1 the .width(), .heigth(), .outerWidth() and .outerHeigth() functions get the computed width/height of the element.
//I have replaced these functions with offsetWidth/offsetHeight in order to get the element's offset dimentions.

QUnit.module("igTileManager unit tests", {
	divTag: '<div></div>',
	assert: null,
	tileWidth: null,
	tileHeight: null,
	tileTop: null,
	tileLeft: null,
	tm1Markup: [],
	tm1MinimizedMarkup: [],
	tm1MaximizedMarkup: [],
	tm1MarkupPlusTheBtn: [],
	minimizedTemplatesHTML: [],
	maximizedTemplatesHTML: [],
	maximizedTemplatesNoBtn: [],
	imageURL: '/base/tests/unit/tilemanager/tilemanager/assets/IMG_1556.jpg',
	btnMarkup: '<span class="ig-button ig-tile-minimize-button"><span class="ig-tile-minimize-icon"></span></span>',
	loremIpsumText: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature',
	dataSource: [],
	dataSource2: [],

	before: function () {
		var self = this;
		for (i = 0; i < 20; i++) {
			self.minimizedTemplatesHTML[i] = '<h3>Minimized Header ' + i + '</h3>';
			self.maximizedTemplatesHTML[i] = self.btnMarkup + '<h3>Maximized Header ' + i + '</h3>' + '<p>' + self.loremIpsumText + '</p>';
			self.maximizedTemplatesNoBtn[i] = '<h3>Maximized Header ' + i + '</h3>' + '<p>' + self.loremIpsumText + '</p>';
		}

		self.scrollWidth = $.ig.util.getScrollWidth();
		self.scrollHeight = $.ig.util.getScrollHeight();

		for( index = 0; index < 13; index++){
			var item = { header: 'Header ' + index, text: self.loremIpsumText, image: self.imageURL};
			self.dataSource.push(item);
			if(index < 8){
				self.dataSource2.push(item);
			}
		}
	},

	createTileManager: function () {
		var self = this;
		$.ig.TestUtil.appendToFixture('<div id="tilemanager1"><div><div class="minimized"><p>Minimized state text</p></div><div class="maximized"><img src="/base/tests/unit/tilemanager/tilemanager/assets/IMG_1556.jpg"><p>Maximized state text</p></div></div><div><div class="minimized"><p>Minimized state text</p></div><div class="maximized"><img src="/base/tests/unit/tilemanager/tilemanager/assets/IMG_1556.jpg"><p>Maximized state text</p></div></div><div><div class="minimized"><p>Minimized state text</p></div><div class="maximized"><img src="/base/tests/unit/tilemanager/tilemanager/assets/IMG_1556.jpg"><p>Maximized state text</p></div></div><div><div class="minimized"><p>Minimized state text</p></div><div class="maximized"><img src="/base/tests/unit/tilemanager/tilemanager/assets/IMG_1556.jpg"><p>Maximized state text</p></div></div><div><div class="minimized"><p>Minimized state text</p></div><div class="maximized"><img src="/base/tests/unit/tilemanager/tilemanager/assets/IMG_1556.jpg"><p>Maximized state text</p></div></div><div><div class="minimized"><p>Minimized state text</p></div><div class="maximized"><img src="/base/tests/unit/tilemanager/tilemanager/assets/IMG_1556.jpg"><p>Maximized state text</p></div></div><div><div class="minimized"><p>Minimized state text</p></div><div class="maximized"><img src="/base/tests/unit/tilemanager/tilemanager/assets/IMG_1556.jpg"><p>Maximized state text</p></div></div><div><div class="minimized"><p>Minimized state text</p></div><div class="maximized"><img src="/base/tests/unit/tilemanager/tilemanager/assets/IMG_1556.jpg"><p>Maximized state text</p></div></div><div><div class="minimized"><p>Minimized state text</p></div><div class="maximized"><img src="/base/tests/unit/tilemanager/tilemanager/assets/IMG_1556.jpg"><p>Maximized state text</p></div></div></div>');
		$('#tilemanager1>div').each(function (index) {
			var tile = $(this),
				html = tile.html();

			self.tm1Markup[index] = html;
			self.tm1MarkupPlusTheBtn[index] = self.btnMarkup + html;
			self.tm1MinimizedMarkup[index] = tile.find('.minimized').html();
			self.tm1MaximizedMarkup[index] = tile.find('.maximized').html();
		});
	},

	getTileManagerTileWidth: function (col, colSpan, colWidth, marginLeft) {
		var baseWidth = 0, width, i;

		if (Array.isArray(colWidth)) {
			for (i = col; i < col + colSpan; i++) {
				baseWidth = baseWidth + colWidth[i];
			}
		} else {
			baseWidth = colSpan * colWidth;
		}

		this.tileWidth = baseWidth + (colSpan - 1) * marginLeft;
	},

	getTileManagerTileHeight: function (row, rowSpan, colHeight, marginTop) {
		var baseHeight = 0, height, i;

		if (Array.isArray(colHeight)) {
			for (i = row; i < row + rowSpan; i++) {
				baseHeight += colHeight[i];
			}
		} else {
			baseHeight = rowSpan * colHeight;
		}

		this.tileHeight = baseHeight + (rowSpan - 1) * marginTop;
	},

	getTileManagerTileLeft: function (col, colWidth, marginLeft) {
		var baseLeft = 0, i;

		if (col > 0) {
			if (Array.isArray(colWidth)) {
				for (i = 0; i < col; i++) {
					baseLeft += colWidth[i];
				}
			} else {
				baseLeft = col * colWidth;
			}
		}

		this.tileLeft = baseLeft + (col + 1) * marginLeft;
	},

	getTileManagerTileTop: function (row, colHeight, marginTop) {
		var baseTop = 0, top, i;

		if (row > 0) {
			if (Array.isArray(colHeight)) {
				for (i = 0; i < row; i++) {
					baseTop += colHeight[i];
				}
			} else {
				baseTop = row * colHeight;
			}
		}

		this.tileTop = baseTop + (row + 1) * marginTop;
	},


	// Tests given container's initialization from markup and tiles interactions
	// Give the expected values as the arguments containerWidth/Height, cols/rows, colWidth/Height,
	// marginTop / Left, tilesCount, items, minimizedState, maximizedState, useApiMethods
	// Choose which tile to maximize and then which tile to swap by setting tileToMaximize, tileToSwap
	testTileManager: function (container, containerWidth, containerHeight, cols, rows,
		colWidth, colHeight, marginLeft, marginTop, tilesCount, rightPanelCols,
		rightPanelTilesWidth, rightPanelTilesHeight, rightPanelHasScroll, tileToMaximize,
		tileToSwap, items, minimizedState, maximizedState, showRightPanelScroll,
		enableSplitter, useApiMethods, fromMarkup, splitterInitiallyCollapsed, disabled) {

		var tiles = container.find('.ui-igtilemanager-left').children(),
			leftPanel = container.find('.ui-igtilemanager-left'),
			rightPanel = container.find('.ui-igtilemanager-right'),
			splitter = container.find('.ui-igsplitter-splitbar-vertical'),
			layoutConfig = container.igTileManager('layoutManager')._opt.gridLayout,
			layoutItems = leftPanel.igLayoutManager('option', 'items'),
			tile, innerContainer, minimizeBtn, minimizeIcon,
			self = this,
			// Calculate the other expected values
			borderWidth = 2,
			padding = 5,
			tilePaddings = padding * 2 + borderWidth,
			splitterWidth = splitter.outerWidth(),
			rightPanelTilesWidth = rightPanelTilesWidth || (Array.isArray(colWidth) ? colWidth[colWidth.length - 1] : colWidth),
			rightPanelTilesHeight = rightPanelTilesHeight || (Array.isArray(colHeight) ? colHeight[colHeight.length - 1] : colHeight),
			rightPanelHasScroll = showRightPanelScroll && rightPanelHasScroll,
			rightPanelWidth = rightPanelCols * (rightPanelTilesWidth + marginLeft) + (rightPanelHasScroll ? this.scrollWidth : 0),
			rightPanelHeight = containerHeight,
			leftPanelWidth = containerWidth,
			leftPanelMaximizedWidth = containerWidth - 2 * marginLeft - splitterWidth - rightPanelWidth,
			leftPanelHeight = containerHeight,
			maximizedTileWidth = leftPanelMaximizedWidth,
			maximizedTileHeight = leftPanelHeight - 2 * marginTop,
			innerContainerMaximizedWidth = maximizedTileWidth - tilePaddings,
			innerContainerMaximizedHeight = maximizedTileHeight - tilePaddings,
			innerContainerMinimizedWidth = rightPanelTilesWidth - tilePaddings,
			innerContainerMinimizedHeight = rightPanelTilesHeight - tilePaddings,
			i;

		if (splitterInitiallyCollapsed) {
			leftPanelMaximizedWidth += rightPanelWidth;
			maximizedTileWidth += rightPanelWidth;
			innerContainerMaximizedWidth += rightPanelWidth;
			rightPanelWidth = 0;
		}

		// INITIALIZATION
		// Configuration setup
		this.assert.equal(layoutConfig.rows, rows, 'Number of rows in the layout configuration did not match.');
		this.assert.equal(layoutConfig.cols, cols, 'Number of cols in the layout configuration did not match.');
		if (Array.isArray(layoutConfig.columnWidth)) {
			for (i = 0; i < layoutConfig.columnWidth.length; i++) {
				this.assert.equal(layoutConfig.columnWidth[i], colWidth[i],
					'The columnWidth[' + i + '] in the layout configuration did not match.');
			}
		} else {
			this.assert.equal(layoutConfig.columnWidth, colWidth, 'The columnWidth in the layout configuration did not match.');
		}

		if (Array.isArray(layoutConfig.columnHeight)) {
			for (i = 0; i < layoutConfig.columnHeight.length; i++) {
				this.assert.equal(layoutConfig.columnHeight[i], colHeight[i],
					'The columnHeight[' + i + '] in the layout configuration did not match.');
			}
		} else {
			this.assert.equal(layoutConfig.columnHeight, colHeight, 'The columnHeight in the layout configuration did not match.');
		}

		this.assert.equal(layoutConfig.marginLeft, marginLeft, 'The left margin in the layout configuration did not match.');
		this.assert.equal(layoutConfig.marginTop, marginTop, 'The top margin in the layout configuration did not match.');
		this.assert.equal(layoutItems.length, tilesCount, 'The items in the layout configuration did not match.');
		this.assert.equal(tiles.length, tilesCount, 'The number of tiles did not match.');

		// Left/right panels and the splitter
		this.assert.equal(leftPanel.children().length, tilesCount, 'The left panel number of tiles did not match.');
		this.assert.equal(leftPanel[0].offsetWidth, leftPanelWidth, 'The left panel width did not match.');
		this.assert.equal(leftPanel[0].offsetHeight, leftPanelHeight, 'The left panel height did not match.');
		this.assert.ok(leftPanel.hasClass('ui-igtilemanager-left'), 'The left panel tile manager class did not apply.');
		this.assert.ok(leftPanel.hasClass('ig-layout'), 'The left panel layout manager classes did not apply.');
		this.assert.ok(leftPanel.hasClass('ui-igsplitter-panel-vertical') && leftPanel.hasClass('ui-widget-content'), 'The left panel splitter classes did not apply.');

		this.assert.equal(rightPanel.children().length, 0, 'The right panel number of tiles did not match.');
		this.assert.ok(rightPanel.hasClass('ui-helper-hidden'), 'The right panel did not hide.');
		this.assert.ok(rightPanel.hasClass('ui-igtilemanager-right'), 'The right panel tile manaegr classes did not apply.');
		this.assert.ok(rightPanel.hasClass('ui-igsplitter-panel-vertical') && rightPanel.hasClass('ui-widget-content'), 'The right panel layout manager classes did not apply.');

		this.assert.ok(splitter.hasClass('ui-helper-hidden'), 'The splitter did not hide.');
		this.assert.ok(splitter.hasClass('ui-igsplitter-splitbar-vertical') && splitter.hasClass('ui-igsplitter-splitbar-default') && splitter.hasClass('ui-state-default'), 'The split bar splitter classes did not apply.');

		if (!enableSplitter) {
			this.assert.ok(splitter.hasClass('ui-helper-visibility-hidden'), 'The splitter did not hide.');
		}

		this.assert.ok(container.hasClass('ui-widget') && container.hasClass('ui-igtilemanager') && container.hasClass('ui-widget-content'), 'Tile manager container classes did not apply to the container.');
		this.assert.ok(container.hasClass('ui-igsplitter'), 'Splitter classes did not apply to the container.');
		if (disabled) {
			this.assert.ok(container.hasClass('ui-igTileManager-disabled'), 'The container was not disabled.');
		}
		
		// Tiles initial positioning and rendering
		tiles.each(function (index, element) {
			var tile = $(this),
				innerContainer = tile.find('.ui-igtile-inner-container'),
				row = Math.floor(index / cols),
				col = index % cols,
				colSpan = 1,
				rowSpan = 1,
				minimizeBtn, minimizeIcon,
				tileWidth, tileHeight,
				tileLeft, tileTop;

			if (items) {
				row = layoutItems[index].rowIndex;
				col = layoutItems[index].colIndex;
				colSpan = layoutItems[index].colSpan;
				rowSpan = layoutItems[index].rowSpan;
			}

			self.getTileManagerTileWidth(col, colSpan, colWidth, marginLeft);
			self.getTileManagerTileHeight(row, rowSpan, colHeight, marginTop);
			self.getTileManagerTileLeft(col, colWidth, marginLeft);
			self.getTileManagerTileTop(row, colHeight, marginTop);

			self.assert.ok(tile.hasClass('ui-widget-content') && tile.hasClass('ui-igtile'), "The content class did not apply to the tile " + index + '.');
			self.assert.ok(tile.hasClass('ig-layout-item') && tile.hasClass('ig-layout-griditem-abs'), "The layout manager classes did not apply to the tile " + index + '.');
			self.assert.ok(tile.hasClass('ui-igtile-minimized'), "The minimized class did not apply tile " + index + '.');
			self.assert.equal(tile.css('left'), self.tileLeft + 'px', 'The left property of the ' + index + ' tile did not match.');
			self.assert.equal(tile.css('top'), self.tileTop + 'px', 'The top property of the ' + index + ' tile did not match.');
			self.assert.equal(tile.outerWidth(), self.tileWidth, 'The width of the ' + index + ' tile did not match.');
			self.assert.equal(tile.outerHeight(), self.tileHeight, 'The height of the ' + index + ' tile did not match.');
			self.assert.equal(tile.children().length, 1, 'The children count of the ' + index + ' tile did not match.');
			self.assert.equal(tile.attr('data-index'), index + '', 'The index property of the ' + index + ' tile did not match.');

			tile.mouseover();
			if (disabled) {
				self.assert.notOk(tile.hasClass('ui-state-hover'), 'The hover class of the ' + index + ' tile did not apply.');
			} else {
				self.assert.ok(tile.hasClass('ui-state-hover'), 'The hover class of the ' + index + ' tile did not apply.');
			}
			tile.mouseout();
			self.assert.notOk(tile.hasClass('ui-state-hover'), 'The hover class of the ' + index + ' tile was not removed.');
			self.assert.equal(innerContainer.outerWidth(), self.tileWidth - tilePaddings, 'The inner container width of the ' + index + ' tile did not match.');
			self.assert.equal(innerContainer.outerHeight(), self.tileHeight - tilePaddings, 'The inner container height of the ' + index + ' tile did not match.');

			// Minimize button in minimized tiles is rendered only from markup
			if (fromMarkup) {
				minimizeBtn = innerContainer.find('.ig-tile-minimize-button');
				minimizeIcon = minimizeBtn.find('.ig-tile-minimize-icon');

				self.assert.equal(minimizeBtn.css('display'), 'none', 'The minimize button of the ' + index + ' is not hidden.');
				self.assert.ok(minimizeBtn.hasClass('ig-button') && minimizeBtn.hasClass('ig-tile-minimize-button'), 'The minimize button classes did not match.');
				self.assert.ok(minimizeIcon.hasClass('ig-tile-minimize-icon'), 'The minimize icon classes did not match.');

				// Check the markup shown
				if (minimizedState) {
					// Check if all the children except the minimized markup of the tile are hidden.
					self.assert.ok(Array.prototype.every.call(innerContainer.children().not(minimizedState).not(minimizeBtn), function (child) { return $(child).hasClass('ui-helper-hidden'); }), 'Minimized state markup of the ' + index + ' did not match.');

					self.assert.notOk(innerContainer.find(minimizedState).hasClass('ui-helper-hidden'), "The minimized content of the " + index + " tile is not shown.");
					self.assert.equal(innerContainer.find(minimizedState).html(), self.tm1MinimizedMarkup[index], 'The minimized markup of the ' + index + ' tile did not match.');
				} else {
					// If not minimized state is provided all the markup should be shown as minimized state.
					self.assert.ok(Array.prototype.every.call(innerContainer.children().not(minimizeBtn), function (child) { return !$(child).hasClass('ui-helper-hidden'); }), 'Minimized state markup of the ' + index + ' did not match.');
					self.assert.equal(innerContainer.html(), self.tm1MarkupPlusTheBtn[index], 'The minimized markup of the ' + index + ' tile did not match.');
				}

			} else {
				self.assert.equal(innerContainer.html(), self.minimizedTemplatesHTML[index], 'The minimized template of the ' + index + ' tile did not match');
			}
		});

		if (useApiMethods) {

			this.assert.equal(container.igTileManager('widget').attr('id'), container.attr('id'), 'The widget method did not return the element.');
			this.assert.equal(container.igTileManager('maximizedTile'), null, 'The tile returned by the maximizedTile method did not match.');
			this.assert.equal(container.igTileManager('minimizedTiles').length, tilesCount, 'The tiles returned by the minimizedTiles method did not match.');
		}

		// MAXIMIZING
		tile = tiles.eq(tileToMaximize);

		if (!useApiMethods) {
			tile.click();
		} else {
			container.igTileManager('maximize', tile);

			this.assert.equal(container.igTileManager('maximizedTile').attr('data-index'), tile.attr('data-index'), 'The tile returned by the maximized tile method did not match.');
			this.assert.equal(container.igTileManager('minimizedTiles').length, tilesCount - 1, 'The tiles returned by the minimizedTiles method did not match.');
		}

		innerContainer = tile.find('.ui-igtile-inner-container');
		minimizeBtn = innerContainer.find('.ig-tile-minimize-button');
		minimizeIcon = minimizeBtn.find('.ig-tile-minimize-icon');

		// Left/right panels and the splitter
		if (disabled) {
			this.assert.equal(leftPanel[0].offsetWidth, leftPanelWidth, 'The left panel width did not match.');
		} else {
			this.assert.equal(leftPanel[0].offsetWidth, leftPanelMaximizedWidth, 'The left panel width did not match.');
		}
		this.assert.equal(leftPanel[0].offsetHeight, leftPanelHeight, 'The left panel height did not match.');
		this.assert.equal(leftPanel.css('margin-right'), marginLeft + 'px', 'The right margin of the left panel did not match.');
		this.assert.equal(leftPanel.css('margin-left'), marginLeft + 'px', 'The left margin of the left panel did not match.');
		if (disabled) {
			this.assert.equal(leftPanel.children().length, tilesCount, 'The leftPanel number of children did not match.');
		} else {
			this.assert.equal(leftPanel.children().length, 1, 'The leftPanel number of children did not match.');
		}

		if (disabled) {
			this.assert.ok(rightPanel.hasClass('ui-helper-hidden'), 'The right panel is shown in a disabled tile manager.');
			this.assert.equal(rightPanel.children().length, 0, 'The right panel number of children did not match.');
		} else {
			this.assert.equal(rightPanel.children().length, tilesCount - 1, 'The right panel number of children did not match.');
			this.assert.notOk(rightPanel.hasClass('ui-helper-hidden'), 'The right panel is not shown.');
			//debugger;
			this.assert.equal(rightPanel[0].offsetWidth, rightPanelWidth, 'The width of the right panel did not match.');
			this.assert.equal(rightPanel.height(), rightPanelHeight, 'The height of the right panel did not match.');
		}

		if (!showRightPanelScroll) {
			this.assert.ok(rightPanel.hasClass('ui-helper-overflow-hidden'), 'The right panel overflow hidden class is not set.');
		}

		if (disabled) {
			this.assert.ok(splitter.hasClass('ui-helper-hidden'), 'The splitter is shown when disabled.');
		} else {
			this.assert.ok(!splitter.hasClass('ui-helper-hidden'), 'The splitter is not shown.');
		}

		if (!enableSplitter) {
			this.assert.ok(splitter.hasClass('ui-helper-visibility-hidden'), 'The splitter did not hide.');
		}

		// Check the maximized tile
		if (disabled) {
			this.assert.notOk(tile.hasClass('ui-igtile-maximized'), 'The maximized class did not apply to the maximized tile.');
		} else {
			this.assert.ok(tile.hasClass('ui-igtile-maximized'), 'The maximized class did not apply to the maximized tile.');
			this.assert.equal(tile[0].style.left, '0px', 'The left property of the maximized tile did not match.');
			this.assert.equal(tile[0].style.top, marginTop + 'px', 'The top property of the maximized tile did not match.');
			this.assert.equal(tile[0].style.width.contains("%") ? tile.outerWidth() : parseInt(tile[0].style.width || 0), maximizedTileWidth, 'The width of the maximized tile did not match.');
			this.assert.equal(parseInt(tile[0].style.height || 0), maximizedTileHeight, 'The height of the maximized tile did not match.');
			this.assert.equal(tile.attr('data-index'), tileToMaximize + '', 'The index property of the maximized tile did not match.');
			this.assert.equal(innerContainer.outerWidth(), innerContainerMaximizedWidth, 'The inner container width of the maximized tile did not match.');
			this.assert.equal(innerContainer.outerHeight(), innerContainerMaximizedHeight, 'The inner container height of the maximized tile did not match.');

			this.assert.ok(minimizeBtn.css('display'), 'block', 'The minimize button of the maximized tile is not shown.');
			// Check the button hover effect
			minimizeBtn.mouseover();
			this.assert.ok(minimizeIcon.hasClass('ui-state-hover'), 'The hover class on the minimize icon of the maximized tile did not apply.');
			minimizeBtn.mouseout();
			this.assert.notOk(minimizeIcon.hasClass('ui-state-hover'), 'The hover class on the minimize icon of the maximized tile was not removed.');
		}


		if (fromMarkup) {
			// Check the markup shown
			if (maximizedState) {
				// Check if all the children except the maximized markup of the tile are hidden.
				this.assert.ok(Array.prototype.every.call(innerContainer.children().not(maximizedState).not(minimizeBtn), function (child) { return $(child).hasClass('ui-helper-hidden'); }), 'The maximized state markup did not match.');

				this.assert.notOk(innerContainer.find(maximizedState).hasClass('ui-helper-hidden'), "The maximized content of the maximized tile is not shown.");
				this.assert.equal(innerContainer.find(maximizedState).html(), this.tm1MaximizedMarkup[tileToMaximize], 'The maximized markup of the maximized tile did not match.');
			} else {
				// If not maximized state is provided all the markup should be shown as maximized state.
				this.assert.ok(Array.prototype.every.call(innerContainer.children(), function (child) { return !$(child).hasClass('ui-helper-hidden'); }), 'The maximized state markup did not match.');
				this.assert.equal(innerContainer.html(), this.tm1MarkupPlusTheBtn[tileToMaximize], 'The maximized state markup did not match.');
			}
		} else {
			if (!disabled) {
				this.assert.equal(innerContainer.html(), this.maximizedTemplatesHTML[tileToMaximize], 'The maximized template of the maximized tile did not match');
			} else {
				this.assert.equal(innerContainer.html(), this.minimizedTemplatesHTML[tileToMaximize], 'The maximized template of the maximized tile did not match');
			}
		}

		// The minimized tiles positioning
		if (!disabled) {
			tiles.not(tile).each(function (index, element) {
				var tile = $(this),
					innerContainer = tile.find('.ui-igtile-inner-container'),
					expectedIndex = (index < tileToMaximize ? index : index + 1),
					minimizeBtn, minimizeIcon;

				self.assert.equal(tile[0].style.top || "0px", (Math.floor(index / rightPanelCols) * (rightPanelTilesHeight + marginTop) + marginTop) + 'px', 'The top property of the ' + index + ' tile did not match.');
				self.assert.equal(tile[0].style.left || "0px", ((index % rightPanelCols) * (rightPanelTilesWidth + marginLeft) + marginLeft / 2) + 'px', 'The left property of the ' + index + ' tile did not match.');

				self.assert.equal(parseInt(tile[0].style.width || 0), rightPanelTilesWidth, 'The width of the ' + index + ' tile did not match');
				self.assert.equal(parseInt(tile[0].style.height || 0), rightPanelTilesHeight, 'The height of the ' + index + ' tile did not match');
				self.assert.ok(tile.hasClass('ui-igtile-minimized'), 'The minimized class of the ' + index + ' tile did not apply.');
				self.assert.equal(tile.attr('data-index'), expectedIndex + '', 'The data index of the ' + index + ' tile did not match.');

				self.assert.equal(innerContainer.outerWidth(), innerContainerMinimizedWidth, 'The inner container width of the ' + index + ' tile did not match.');
				self.assert.equal(innerContainer.outerHeight(), innerContainerMinimizedHeight, 'The inner container height of the ' + index + ' tile did not match.');

				// Minimize button in minimized tiles is rendered only from markup
				if (fromMarkup) {
					minimizeBtn = innerContainer.find('.ig-tile-minimize-button');

					self.assert.equal(minimizeBtn.css('display'), 'none', 'The minimize button of the ' + index + ' is not hidden.');

					// Check the markup shown
					if (minimizedState) {
						// Check if all the children except the minimized markup of the tile are hidden.
						self.assert.ok(Array.prototype.every.call(innerContainer.children().not(minimizedState).not(minimizeBtn), function (child) { return $(child).hasClass('ui-helper-hidden'); }), 'Minimized state markup of the ' + index + ' did not match.');

						self.assert.notOk(innerContainer.find(minimizedState).hasClass('ui-helper-hidden'), "The minimized content of the " + index + " tile is not shown.");
						self.assert.equal(innerContainer.find(minimizedState).html(), self.tm1MinimizedMarkup[expectedIndex], 'The minimized markup of the ' + index + ' tile did not match.');
					} else {
						// If not minimized state is provided all the markup should be shown as minimized state.
						self.assert.ok(Array.prototype.every.call(innerContainer.children().not(minimizeBtn), function (child) { return !$(child).hasClass('ui-helper-hidden'); }), 'Minimized state markup of the ' + index + ' did not match.');
						self.assert.equal(innerContainer.html(), self.tm1MarkupPlusTheBtn[expectedIndex], 'The minimized markup of the ' + index + ' tile did not match.');
					}
				} else {
					self.assert.equal(innerContainer.html(), self.minimizedTemplatesHTML[expectedIndex], 'The minimized template of the ' + index + ' tile did not match');
				}
			});
		}

		// MAXIMIZED TILE SWAP
		tile = tiles.eq(tileToSwap);

		if (useApiMethods) {
			container.igTileManager('maximize', tile);
		} else {
			tile.click();
		}

		innerContainer = tile.find('.ui-igtile-inner-container');
		minimizeBtn = innerContainer.find('.ig-tile-minimize-button');
		minimizeIcon = minimizeBtn.find('.ig-tile-minimize-icon');

		// Left/right panels and the splitter
		if (disabled) {
			this.assert.equal(leftPanel[0].style.width.contains("%") ? leftPanel[0].offsetWidth : parseInt(leftPanel[0].style.width), leftPanelWidth, 'The left panel width did not match.');
		} else {
			this.assert.equal(leftPanel[0].style.width.contains("%") ? leftPanel[0].offsetWidth : parseInt(leftPanel[0].style.width), leftPanelMaximizedWidth, 'The left panel width did not match.');
		}
		this.assert.equal(leftPanel[0].offsetHeight, leftPanelHeight, 'The left panel height did not match.');
		this.assert.equal(leftPanel.css('margin-right'), marginLeft + 'px', 'The right margin of the left panel did not match.');
		this.assert.equal(leftPanel.css('margin-left'), marginLeft + 'px', 'The left margin of the left panel did not match.');
		if (disabled) {
			this.assert.equal(leftPanel.children().length, tilesCount, 'The leftPanel number of children did not match.');
		} else {
			this.assert.equal(leftPanel.children().length, 1, 'The leftPanel number of children did not match.');
		}

		if (disabled) {
			this.assert.ok(rightPanel.hasClass('ui-helper-hidden'), 'The right panel is shown in a disabled tile manager.');
			this.assert.equal(rightPanel.children().length, 0, 'The right panel number of children did not match.');
		} else {
			this.assert.equal(rightPanel.children().length, tilesCount - 1, 'The right panel number of children did not match.');
			this.assert.notOk(rightPanel.hasClass('ui-helper-hidden'), 'The right panel is not shown.');
			this.assert.equal(rightPanel[0].style.width, rightPanelWidth + "px", 'The width of the right panel did not match.');
			this.assert.equal(rightPanel.height(), rightPanelHeight, 'The height of the right panel did not match.');
		}

		if (!showRightPanelScroll) {
			this.assert.ok(rightPanel.hasClass('ui-helper-overflow-hidden'), 'The right panel overflow hidden class is not set.');
		}

		if (disabled) {
			this.assert.ok(splitter.hasClass('ui-helper-hidden'), 'The splitter is shown when disabled.');
		} else {
			this.assert.notOk(splitter.hasClass('ui-helper-hidden'), 'The splitter is not shown.');
		}

		if (!enableSplitter) {
			this.assert.ok(splitter.hasClass('ui-helper-visibility-hidden'), 'The splitter did not hide.');
		}

		// Check the maximized tile
		if (disabled) {
			this.assert.notOk(tile.hasClass('ui-igtile-maximized'), 'The maximized class did not apply to the maximized tile.');
		} else {
			this.assert.ok(tile.hasClass('ui-igtile-maximized'), 'The maximized class did not apply to the maximized tile.');
			this.assert.equal(tile.css('left'), '0px', 'The left property of the maximized tile did not match.');
			this.assert.equal(tile.css('top'), marginTop + 'px', 'The top property of the maximized tile did not match.');
			this.assert.equal(tile.outerWidth(), maximizedTileWidth, 'The width of the maximized tile did not match.');
			this.assert.equal(tile.outerHeight(), maximizedTileHeight, 'The height of the maximized tile did not match.');
			this.assert.equal(tile.attr('data-index'), tileToSwap + '', 'The index property of the maximized tile did not match.');
			this.assert.equal(innerContainer.outerWidth(), innerContainerMaximizedWidth, 'The inner container width of the maximized tile did not match.');
			this.assert.equal(innerContainer.outerHeight(), innerContainerMaximizedHeight, 'The inner container height of the maximized tile did not match.');

			this.assert.ok(minimizeBtn.css('display'), 'block', 'The minimize button of the maximized tile is not shown.');
			// Check the button hover effect
			minimizeBtn.mouseover();
			this.assert.ok(minimizeIcon.hasClass('ui-state-hover'), 'The hover class on the minimize icon of the maximized tile did not apply.');
			minimizeBtn.mouseout();
			this.assert.notOk(minimizeIcon.hasClass('ui-state-hover'), 'The hover class on the minimize icon of the maximized tile was not removed.');
		}

		if (fromMarkup) {
			// Check the markup shown
			if (maximizedState) {
				// Check if all the children except the maximized markup of the tile are hidden.
				this.assert.ok(Array.prototype.every.call(innerContainer.children().not(maximizedState).not(minimizeBtn), function (child) { return $(child).hasClass('ui-helper-hidden'); }), 'The maximized state markup did not match.');

				this.assert.ok(!innerContainer.find(maximizedState).hasClass('ui-helper-hidden'), "The maximized content of the maximized tile is not shown.");
				this.assert.equal(innerContainer.find(maximizedState).html(), this.tm1MaximizedMarkup[tileToSwap], 'The maximized markup of the maximized tile did not match.');
			} else {
				// If not maximized state is provided all the markup should be shown as maximized state.
				this.assert.ok(Array.prototype.every.call(innerContainer.children(), function (child) { return !$(child).hasClass('ui-helper-hidden'); }), 'The maximized state markup did not match.');
				this.assert.equal(innerContainer.html(), this.tm1MarkupPlusTheBtn[tileToSwap], 'The maximized state markup did not match.');
			}
		} else {
			if (!disabled) {
				this.assert.equal(innerContainer.html(), this.maximizedTemplatesHTML[tileToSwap], 'The maximized template of the maximized tile did not match');
			} else {
				this.assert.equal(innerContainer.html(), this.minimizedTemplatesHTML[tileToSwap], 'The maximized template of the maximized tile did not match');
			}
		}

		// The minimized tiles positioning
		if (!disabled) {
			tiles.not(tile).each(function (index, element) {
				var tile = $(this),
					innerContainer = tile.find('.ui-igtile-inner-container'),
					expectedIndex = (index < tileToSwap ? index : index + 1),
					minimizeBtn, minimizeIcon;

				self.assert.equal(tile[0].style.top || "0px", (Math.floor(index / rightPanelCols) * (rightPanelTilesHeight + marginTop) + marginTop) + 'px', 'The top property of the ' + index + ' tile did not match.');
				self.assert.equal(tile[0].style.left || "0px", ((index % rightPanelCols) * (rightPanelTilesWidth + marginLeft) + marginLeft / 2) + 'px', 'The left property of the ' + index + ' tile did not match.');

				self.assert.equal(parseInt(tile[0].style.width || 0), rightPanelTilesWidth, 'The width of the ' + index + ' tile did not match');
				self.assert.equal(parseInt(tile[0].style.height || 0), rightPanelTilesHeight, 'The height of the ' + index + ' tile did not match');
				self.assert.ok(tile.hasClass('ui-igtile-minimized'), 'The minimized class of the ' + index + ' tile did not apply.');
				self.assert.equal(tile.attr('data-index'), expectedIndex + '', 'The data index of the ' + index + ' tile did not match.');

				self.assert.equal(innerContainer.outerWidth(), innerContainerMinimizedWidth, 'The inner container width of the ' + index + ' tile did not match.');
				self.assert.equal(innerContainer.outerHeight(), innerContainerMinimizedHeight, 'The inner container height of the ' + index + ' tile did not match.');

				// Minimize button in minimized tiles is rendered only from markup
				if (fromMarkup) {
					minimizeBtn = innerContainer.find('.ig-tile-minimize-button');

					self.assert.equal(minimizeBtn.css('display'), 'none', 'The minimize button of the ' + index + ' is not hidden.');

					// Check the markup shown
					if (minimizedState) {
						// Check if all the children except the minimized markup of the tile are hidden.
						self.assert.ok(Array.prototype.every.call(innerContainer.children().not(minimizedState).not(minimizeBtn), function (child) { return $(child).hasClass('ui-helper-hidden'); }), 'Minimized state markup of the ' + index + ' did not match.');

						self.assert.notOk(innerContainer.find(minimizedState).hasClass('ui-helper-hidden'), "The minimized content of the " + index + " tile is not shown.");
						self.assert.equal(innerContainer.find(minimizedState).html(), self.tm1MinimizedMarkup[expectedIndex], 'The minimized markup of the ' + index + ' tile did not match.');
					} else {
						// If not minimized state is provided all the markup should be shown as minimized state.
						self.assert.ok(Array.prototype.every.call(innerContainer.children().not(minimizeBtn), function (child) { return !$(child).hasClass('ui-helper-hidden'); }), 'Minimized state markup of the ' + index + ' did not match.');
						self.assert.equal(innerContainer.html(), self.tm1MarkupPlusTheBtn[expectedIndex], 'The minimized markup of the ' + index + ' tile did not match.');
					}
				} else {
					self.assert.equal(innerContainer.html(), self.minimizedTemplatesHTML[expectedIndex], 'The minimized template of the ' + index + ' tile did not match');
				}
			});
		}

		// MINIMIZING
		if (!useApiMethods) {
			minimizeBtn.click();
		} else {
			container.igTileManager('minimize');
		}

		this.assert.equal(leftPanel.children().length, tilesCount, 'The left panel number of tiles did not match.');
		this.assert.equal(leftPanel[0].offsetWidth, leftPanelWidth, 'The left panel width did not match.');
		this.assert.equal(leftPanel[0].offsetHeight, leftPanelHeight, 'The left panel height did not match.');
		this.assert.equal(leftPanel.css('margin-right'), '0px', 'The right margin of the left panel did not match.');
		this.assert.equal(leftPanel.css('margin-left'), '0px', 'The left margin of the left panel did not match.');

		this.assert.equal(rightPanel.children().length, 0, 'The right panel number of tiles did not match.');
		this.assert.ok(rightPanel.hasClass('ui-helper-hidden'), 'The right panel did not hide.');

		this.assert.ok(splitter.hasClass('ui-helper-hidden'), 'The splitter did not hide.');

		if (!enableSplitter) {
			this.assert.ok(splitter.hasClass('ui-helper-visibility-hidden'), 'The splitter did not hide.');
		}

		tiles.each(function (index, element) {
			var tile = $(this),
				innerContainer = tile.find('.ui-igtile-inner-container'),
				row = Math.floor(index / cols),
				col = index % cols,
				colSpan = 1,
				rowSpan = 1,
				minimizeBtn, minimizeIcon,
				tileWidth, tileHeight,
				tileLeft, tileTop;

			if (items) {
				row = layoutItems[index].rowIndex;
				col = layoutItems[index].colIndex;
				colSpan = layoutItems[index].colSpan;
				rowSpan = layoutItems[index].rowSpan;
			}

			self.getTileManagerTileWidth(col, colSpan, colWidth, marginLeft);
			self.getTileManagerTileHeight(row, rowSpan, colHeight, marginTop);
			self.getTileManagerTileLeft(col, colWidth, marginLeft);
			self.getTileManagerTileTop(row, colHeight, marginTop);

			self.assert.ok(tile.hasClass('ui-widget-content') && tile.hasClass('ui-igtile'), "The content class did not apply to the tile " + index + '.');
			self.assert.ok(tile.hasClass('ig-layout-item') && tile.hasClass('ig-layout-griditem-abs'), "The layout manager classes did not apply to the tile " + index + '.');
			self.assert.ok(tile.hasClass('ui-igtile-minimized'), "The minimized class did not apply tile " + index + '.');

			self.assert.equal(tile.css('left'), self.tileLeft + 'px', 'The left property of the ' + index + ' tile did not match.');
			self.assert.equal(tile.css('top'), self.tileTop + 'px', 'The top property of the ' + index + ' tile did not match.');
			self.assert.equal(parseInt(tile[0].style.width || 0), self.tileWidth, 'The width of the ' + index + ' tile did not match.');
			self.assert.equal(parseInt(tile[0].style.height || 0), self.tileHeight, 'The height of the ' + index + ' tile did not match.');
			self.assert.equal(tile.children().length, 1, 'The children count of the ' + index + ' tile did not match.');
			self.assert.equal(tile.attr('data-index'), index + '', 'The index property of the ' + index + ' tile did not match.');

			tile.mouseover();
			if (disabled) {
				self.assert.ok(!tile.hasClass('ui-state-hover'), 'The hover class of the ' + index + ' tile did not apply.');
			} else {
				self.assert.ok(tile.hasClass('ui-state-hover'), 'The hover class of the ' + index + ' tile did not apply.');
			}
			tile.mouseout();
			self.assert.notOk(tile.hasClass('ui-state-hover'), 'The hover class of the ' + index + ' tile was not removed.');

			self.assert.equal(innerContainer.outerWidth(), self.tileWidth - tilePaddings, 'The inner container width of the ' + index + ' tile did not match.');
			self.assert.equal(innerContainer.outerHeight(), self.tileHeight - tilePaddings, 'The inner container height of the ' + index + ' tile did not match.');

			// Minimize button in minimized tiles is rendered only from markup
			if (fromMarkup) {
				minimizeBtn = innerContainer.find('.ig-tile-minimize-button');
				minimizeIcon = minimizeBtn.find('.ig-tile-minimize-icon');

				self.assert.equal(minimizeBtn.css('display'), 'none', 'The minimize button of the ' + index + ' is not hidden.');
				self.assert.ok(minimizeBtn.hasClass('ig-button') && minimizeBtn.hasClass('ig-tile-minimize-button'), 'The minimize button classes did not match.');
				self.assert.ok(minimizeIcon.hasClass('ig-tile-minimize-icon'), 'The minimize icon classes did not match.');

				// Check the markup shown
				if (minimizedState) {
					// Check if all the children except the minimized markup of the tile are hidden.
					self.assert.ok(Array.prototype.every.call(innerContainer.children().not(minimizedState).not(minimizeBtn), function (child) { return $(child).hasClass('ui-helper-hidden'); }), 'Minimized state markup of the ' + index + ' did not match.');

					self.assert.notOk(innerContainer.find(minimizedState).hasClass('ui-helper-hidden'), "The minimized content of the " + index + " tile is not shown.");
					self.assert.equal(innerContainer.find(minimizedState).html(), self.tm1MinimizedMarkup[index], 'The minimized markup of the ' + index + ' tile did not match.');
				} else {
					// If not minimized state is provided all the markup should be shown as minimized state.
					self.assert.ok(Array.prototype.every.call(innerContainer.children().not(minimizeBtn), function (child) { return !$(child).hasClass('ui-helper-hidden'); }), 'Minimized state markup of the ' + index + ' did not match.');
					self.assert.equal(innerContainer.html(), self.tm1MarkupPlusTheBtn[index], 'The minimized markup of the ' + index + ' tile did not match.');
				}
			} else {
				self.assert.equal(innerContainer.html(), self.minimizedTemplatesHTML[index], 'The minimized template of the ' + index + ' tile did not match');
			}
		});

		// DESTROYING
		container.igTileManager('destroy');
		tiles = container.children();

		this.assert.ok(!container.hasClass('ui-widget') && !container.hasClass('ui-igtilemanager') && !container.hasClass('ui-igsplitter') && !container.hasClass('ui-widget-content'), 'Tile manager did not remove classes from the container.');

		if (fromMarkup) {
			this.assert.equal(tiles.length, tilesCount, 'The number of elements after destroing did not match.');
			this.assert.notOk((container.find('ui-igtilemanager-left').length > 0), 'The tile manager did not destroy the left panel.');
			this.assert.notOk((container.find('ui-igtilemanager-right').length > 0), 'The tile manager did not destroy the right panel.');
			this.assert.notOk((container.find('ui-igsplitter-splitbar-vertical').length > 0), 'The tile manager did not destroy the splitter.');

			tiles.each(function (index, element) {
				var tile = $(this);

				self.assert.notOk(tile.hasClass('ui-igtile-minimized') && tile.hasClass('ui-widget-content') && tile.hasClass('ui-igtile'), "The tile manager did not remove the classes from tile " + index + ".");
				self.assert.equal(tile.html(), self.tm1Markup[index], 'The markup of the ' + index + ' tile did not match.');

				self.assert.notOk(tile.hasClass('ig-layout-item') && tile.hasClass('ig-layout-griditem-abs'), "The layout manager did not remove the classes from tile " + index + ".");
				self.assert.notOk(tile.attr('data-index'), 'The layout manager did not remove the data-index from tile ' + index + '.');
			});
		} else {
			this.assert.equal(tiles.length, 0, 'igTileManager did not destroy all tiles.');
		}
	},

	// Test tile manager configuration using maximized tile index option.
	// The test expect the items array to be sorted by the tiles position, from first to last.
	// The first position is considered the row:0, col:0. the last is row: last, col: last.
	testTileManagerWithMaximizedTileIndex: function (maximizedTileIndex, container,
		containerWidth, containerHeight, cols, rows, colWidth, colHeight, marginLeft,
		marginTop, tilesCount, tileToMaximize, items, minimizedState,
		maximizedState, useApiMethods, fromMarkup) {

		var tiles = container.children(),
			maximizedTile = tiles.eq(maximizedTileIndex),
			layoutConfig = container.igTileManager('layoutManager')._opt.gridLayout,
			layoutItems = container.igLayoutManager('option', 'items'),
			borderWidth = 2,
			padding = 5,
			tilePaddings = padding * 2 + borderWidth,
			tile, innerContainer, minimizeBtn, prevMaximizedTile, prevMaximizedTileWidth,
			prevMaximizedTileHeight, prevMaximizedTileTop, prevMaximizedTileLeft,
			prevMaximizedTileIndex, maximizedTileWidth, maximizedTileHeight,
			maximizedTileLeft, maximizedTileTop,
			self = this;

		// INITIALIZATION
		// Configuration setup
		this.assert.equal(layoutConfig.rows, rows, 'Number of rows in the layout configuration did not match.');
		this.assert.equal(layoutConfig.cols, cols, 'Number of cols in the layout configuration did not match.');
		this.assert.equal(layoutConfig.columnWidth, colWidth, 'The columnWidth in the layout configuration did not match.');
		this.assert.equal(layoutConfig.columnHeight, colHeight, 'The columnHeight in the layout configuration did not match.');
		this.assert.equal(layoutConfig.marginLeft, marginLeft, 'The left margin in the layout configuration did not match.');
		this.assert.equal(layoutConfig.marginTop, marginTop, 'The top margin in the layout configuration did not match.');
		this.assert.equal(layoutItems.length, tilesCount, 'The items in the layout configuration did not match.');
		this.assert.equal(tiles.length, tilesCount, 'The number of tiles did not match.');

		// Container
		this.assert.equal(container.width(), containerWidth, 'The container width did not match.');
		this.assert.equal(container.height(), containerHeight, 'The container height did not match.');
		this.assert.ok(container.hasClass('ui-widget') && container.hasClass('ui-igtilemanager') && container.hasClass('ui-widget-content'), 'Tile manager container classes did not apply to the container.');
		
		// Tiles initial positioning and rendering
		tiles.each(function (index, element) {
			var tile = $(this),
				innerContainer = tile.find('.ui-igtile-inner-container'),
				row = Math.floor(index / cols),
				col = index % cols,
				colSpan = 1,
				rowSpan = 1,
				minimizeBtn = innerContainer.find('.ig-tile-minimize-button'),
				isMaximized = index === maximizedTileIndex,
				tileWidth, tileHeight, tileLeft, tileTop;

			if (items) {
				row = layoutItems[index].rowIndex;
				col = layoutItems[index].colIndex;
				colSpan = layoutItems[index].colSpan;
				rowSpan = layoutItems[index].rowSpan;
			}

			tileWidth = colSpan * (colWidth + marginLeft) - marginLeft;
			tileHeight = rowSpan * (colHeight + marginTop) - marginTop;
			tileLeft = col * (colWidth + marginLeft) + marginLeft;
			tileTop = row * (colHeight + marginTop) + marginTop;

			if (isMaximized) {
				maximizedTileWidth = tileWidth;
				maximizedTileHeight = tileHeight;
				maximizedTileLeft = tileLeft;
				maximizedTileTop = tileTop;
			}

			self.assert.ok(tile.hasClass('ui-widget-content') && tile.hasClass('ui-igtile'), "The content class did not apply to the tile " + index + '.');
			self.assert.ok(tile.hasClass('ig-layout-item') && tile.hasClass('ig-layout-griditem-abs'), "The layout manager classes did not apply to the tile " + index + '.');

			if (isMaximized) {
				self.assert.ok(tile.hasClass('ui-igtile-maximized'), "The maximized class did not apply tile " + index + '.');
			} else {
				self.assert.ok(tile.hasClass('ui-igtile-minimized'), "The minimized class did not apply tile " + index + '.');
			}

			self.assert.equal(tile.css('left'), tileLeft + 'px', 'The left property of the ' + index + ' tile did not match.');
			self.assert.equal(tile.css('top'), tileTop + 'px', 'The top property of the ' + index + ' tile did not match.');
			self.assert.equal(tile.outerWidth(), tileWidth, 'The width of the ' + index + ' tile did not match.');
			self.assert.equal(tile.outerHeight(), tileHeight, 'The height of the ' + index + ' tile did not match.');
			self.assert.equal(tile.children().length, 1, 'The children count of the ' + index + ' tile did not match.');
			self.assert.equal(tile.attr('data-index'), index + '', 'The index property of the ' + index + ' tile did not match.');

			if (isMaximized) {
				tile.mouseover();
				self.assert.notOk(tile.hasClass('ui-state-hover'), 'The hover class of the ' + index + ' tile applied incorrectly.');
				tile.mouseout();
				self.assert.notOk(tile.hasClass('ui-state-hover'), 'The hover class of the ' + index + ' tile was not removed.');
			} else {
				tile.mouseover();
				self.assert.ok(tile.hasClass('ui-state-hover'), 'The hover class of the ' + index + ' tile did not apply.');
				tile.mouseout();
				self.assert.notOk(tile.hasClass('ui-state-hover'), 'The hover class of the ' + index + ' tile was not removed.');
			}

			self.assert.equal(innerContainer.outerWidth(), tileWidth - tilePaddings, 'The inner container width of the ' + index + ' tile did not match.');
			self.assert.equal(innerContainer.outerHeight(), tileHeight - tilePaddings, 'The inner container height of the ' + index + ' tile did not match.');

			self.assert.ok(minimizeBtn.length === 0, 'The minimize button of the ' + index + 'tile was incorrectly rendered.');

			if (fromMarkup) {
				// Check the markup shown
				if (isMaximized) {
					if (maximizedState) {
						// Check if all the children except the maximized markup of the tile are hidden.
						self.assert.ok(Array.prototype.every.call(innerContainer.children().not(maximizedState), function (child) { return $(child).hasClass('ui-helper-hidden'); }), 'Markup other than the maximized of the ' + index + ' tile is incorrectly shown.');

						self.assert.notOk(innerContainer.find(maximizedState).hasClass('ui-helper-hidden'), "The maximized content of the " + index + " tile is not shown.");
						self.assert.equal(innerContainer.find(maximizedState).html(), self.tm1MaximizedMarkup[index], 'The maximized markup of the ' + index + ' tile did not match.');
					} else {
						// If not maximized state is provided all the markup should be shown as maximized state.
						self.assert.ok(Array.prototype.every.call(innerContainer.children(), function (child) { return !$(child).hasClass('ui-helper-hidden'); }), 'Minimized state markup of the ' + index + ' did not match.');
						self.assert.equal(innerContainer.html(), self.tm1Markup[index], 'The minimized markup of the ' + index + ' tile did not match.');
					}
				} else {
					if (minimizedState) {
						// Check if all the children except the minimized markup of the tile are hidden.
						self.assert.ok(Array.prototype.every.call(innerContainer.children().not(minimizedState), function (child) { return $(child).hasClass('ui-helper-hidden'); }), 'Markup other than the minimized of the ' + index + ' tile is incorrectly shown.');

						self.assert.notOk(innerContainer.find(minimizedState).hasClass('ui-helper-hidden'), "The minimized content of the " + index + " tile is not shown.");
						self.assert.equal(innerContainer.find(minimizedState).html(), self.tm1MinimizedMarkup[index], 'The minimized markup of the ' + index + ' tile did not match.');
					} else {
						// If not minimized state is provided all the markup should be shown as minimized state.
						self.assert.ok(Array.prototype.every.call(innerContainer.children(), function (child) { return !$(child).hasClass('ui-helper-hidden'); }), 'Minimized state markup of the ' + index + ' did not match.');
						self.assert.equal(innerContainer.html(), self.tm1Markup[index], 'The minimized markup of the ' + index + ' tile did not match.');
					}
				}
			} else {
				if (isMaximized) {
					self.assert.equal(innerContainer.html(), self.maximizedTemplatesNoBtn[index], 'The maximized template of the ' + index + ' tile did not match');
				} else {
					self.assert.equal(innerContainer.html(), self.minimizedTemplatesHTML[index], 'The minimized template of the ' + index + ' tile did not match');
				}
			}
		});

		if (useApiMethods) {
			this.assert.equal(container.igTileManager('widget').attr('id'), container.attr('id'), 'The widget method did not return the element.');
			this.assert.equal(container.igTileManager('maximizedTile').attr('data-index'), maximizedTileIndex, 'The tile returned by the maximizedTile method did not match.');
			this.assert.equal(container.igTileManager('minimizedTiles').length, tilesCount - 1, 'The tiles returned by the minimizedTiles method did not match.');
		}

		// MAXIMIZING
		tile = tiles.eq(tileToMaximize);

		// The current maximized tile should transition to the position of the new maximized tile
		prevMaximizedTile = maximizedTile;
		prevMaximizedTileWidth = tile.outerWidth();
		prevMaximizedTileHeight = tile.outerHeight();
		prevMaximizedTileLeft = tile.css('left');
		prevMaximizedTileTop = tile.css('top');
		prevMaximizedTileIndex = parseInt(maximizedTile.attr('data-index'), 10);

		if (!useApiMethods) {
			tile.click();
		} else {
			container.igTileManager('maximize', tile);

			this.assert.equal(container.igTileManager('maximizedTile').attr('data-index'), tile.attr('data-index'), 'The tile returned by the maximized tile method did not match.');
			this.assert.equal(container.igTileManager('minimizedTiles').length, tilesCount - 1, 'The tiles returned by the minimizedTiles method did not match.');
		}

		innerContainer = tile.find('.ui-igtile-inner-container');
		minimizeBtn = innerContainer.find('.ig-tile-minimize-button');

		// Check the maximized tile
		this.assert.ok(tile.hasClass('ui-igtile-maximized'), 'The maximized class did not apply to the maximized tile.');
		this.assert.equal(tile.outerWidth(), maximizedTileWidth, 'The width of the maximized tile did not match.');
		this.assert.equal(tile.outerHeight(), maximizedTileHeight, 'The height of the maximized tile did not match.');
		this.assert.equal(tile.css('left'), maximizedTileLeft + 'px', 'The left property of the maximized tile did not match.');
		this.assert.equal(tile.css('top'), maximizedTileTop + 'px', 'The top property of the maximized tile did not match.');
		this.assert.equal(tile.attr('data-index'), tileToMaximize + '', 'The index property of the maximized tile did not match.');

		this.assert.ok(minimizeBtn.length === 0, 'The minimize button is rendered incorrectly.');

		this.assert.equal(innerContainer.outerWidth(), maximizedTileWidth - tilePaddings, 'The inner container width of the maximized tile did not match.');
		this.assert.equal(innerContainer.outerHeight(), maximizedTileHeight - tilePaddings, 'The inner container height of the maximized tile did not match.');

		tile.mouseover();
		this.assert.notOk(tile.hasClass('ui-state-hover'), 'The hover class of the maximized tile applied incorrectly.');
		tile.mouseout();
		this.assert.notOk(tile.hasClass('ui-state-hover'), 'The hover class of the maximized tile was not removed.');

		if (fromMarkup) {
			// Check the markup shown
			if (maximizedState) {
				// Check if all the children except the maximized markup of the tile are hidden.
				this.assert.ok(Array.prototype.every.call(innerContainer.children().not(maximizedState), function (child) { return $(child).hasClass('ui-helper-hidden'); }), 'Markup other than the maximized of the maximized tile is incorrectly shown.');

				this.assert.ok(!innerContainer.find(maximizedState).hasClass('ui-helper-hidden'), "The maximized content of the maximized tile is not shown.");
				this.assert.equal(innerContainer.find(maximizedState).html(), this.tm1MaximizedMarkup[tileToMaximize], 'The maximized markup of the maximized tile did not match.');
			} else {
				// If not maximized state is provided all the markup should be shown as maximized state.
				this.assert.ok(Array.prototype.every.call(innerContainer.children(), function (child) { return !$(child).hasClass('ui-helper-hidden'); }), 'Maximized state markup of the maximized tile did not match.');
				this.assert.equal(innerContainer.html(), this.tm1Markup[tileToMaximize], 'The maximized markup of the maximized tile did not match.');
			}
		} else {
			this.assert.equal(innerContainer.html(), this.maximizedTemplatesNoBtn[tileToMaximize], 'The maximized template of the maximized tile did not match');
		}

		// PrevMaximizedTileIndex position and content after maximizing another tile.
		this.assert.ok(prevMaximizedTile.hasClass('ui-igtile-minimized'), 'The minimized class did not apply to the prev maximized tile.');
		this.assert.notOk(prevMaximizedTile.hasClass('ui-igtile-maximized'), 'The maximized class was not removed from the prev maximized tile.');
		this.assert.equal(prevMaximizedTile.outerWidth(), prevMaximizedTileWidth, 'The width of the prev maximized tile did not match.');
		this.assert.equal(prevMaximizedTile.outerHeight(), prevMaximizedTileHeight, 'The height of the prev maximized tile did not match.');
		this.assert.equal(prevMaximizedTile.css('left'), prevMaximizedTileLeft, 'The left property of the prev maximized tile did not match.');
		this.assert.equal(prevMaximizedTile.css('top'), prevMaximizedTileTop, 'The top property of the prev maximized tile did not match.');
		this.assert.equal(prevMaximizedTile.attr('data-index'), prevMaximizedTileIndex + '', 'The index property of the prev maximized tile did not match.');

		innerContainer = prevMaximizedTile.find('.ui-igtile-inner-container');
		minimizeBtn = innerContainer.find('.ig-tile-minimize-button');

		this.assert.ok(minimizeBtn.length === 0, 'The minimize button is rendered incorrectly.');

		this.assert.equal(innerContainer.outerWidth(), prevMaximizedTileWidth - tilePaddings, 'The inner container width of the prev maximized tile did not match.');
		this.assert.equal(innerContainer.outerHeight(), prevMaximizedTileHeight - tilePaddings, 'The inner container height of the prev maximized tile did not match.');

		prevMaximizedTile.mouseover();
		this.assert.ok(prevMaximizedTile.hasClass('ui-state-hover'), 'The hover class of the prev maximized tile did not apply.');
		prevMaximizedTile.mouseout();
		this.assert.notOk(prevMaximizedTile.hasClass('ui-state-hover'), 'The hover class of the prev maximized tile was not removed.');

		if (fromMarkup) {
			if (minimizedState) {
				// Check if all the children except the minimized markup of the tile are hidden.
				this.assert.ok(Array.prototype.every.call(innerContainer.children().not(minimizedState), function (child) { return $(child).hasClass('ui-helper-hidden'); }), 'Markup other than the minimized of the prev maximized tile is incorrectly shown.');

				this.assert.notOk(innerContainer.find(minimizedState).hasClass('ui-helper-hidden'), "The minimized content of the prev maximized tile is not shown.");
				this.assert.equal(innerContainer.find(minimizedState).html(), this.tm1MinimizedMarkup[prevMaximizedTileIndex], 'The minimized markup of the prev maximized tile did not match.');
			} else {
				// If not minimized state is provided all the markup should be shown as minimized state.
				this.assert.ok(Array.prototype.every.call(innerContainer.children(), function (child) { return !$(child).hasClass('ui-helper-hidden'); }), 'Minimized state markup of the prev maximized did not match.');
				this.assert.equal(innerContainer.html(), this.tm1Markup[prevMaximizedTileIndex], 'The minimized markup of the prev maximized tile did not match.');
			}
		} else {
			this.assert.equal(innerContainer.html(), this.minimizedTemplatesHTML[prevMaximizedTileIndex], 'The minimized template of the prev maximized tile did not match');
		}

		// Rest tiles positioning
		tiles.not(prevMaximizedTile).not(tile).each(function (index, element) {
			var tile = $(this),
				tileIndex = parseInt(tile.attr('data-index'), 10),
				innerContainer = tile.find('.ui-igtile-inner-container'),
				row = Math.floor(tileIndex / cols),
				col = tileIndex % cols,
				colSpan = 1,
				rowSpan = 1,
				minimizeBtn = innerContainer.find('.ig-tile-minimize-button'),
				tileWidth, tileHeight, tileLeft, tileTop;

			if (items) {
				row = layoutItems[tileIndex].rowIndex;
				col = layoutItems[tileIndex].colIndex;
				colSpan = layoutItems[tileIndex].colSpan;
				rowSpan = layoutItems[tileIndex].rowSpan;
			}

			tileWidth = colSpan * (colWidth + marginLeft) - marginLeft;
			tileHeight = rowSpan * (colHeight + marginTop) - marginTop;
			tileLeft = col * (colWidth + marginLeft) + marginLeft;
			tileTop = row * (colHeight + marginTop) + marginTop;

			self.assert.ok(tile.hasClass('ui-widget-content') && tile.hasClass('ui-igtile'), "The content class did not apply to the tile " + tileIndex + '.');
			self.assert.ok(tile.hasClass('ig-layout-item') && tile.hasClass('ig-layout-griditem-abs'), "The layout manager classes did not apply to the tile " + tileIndex + '.');

			self.assert.ok(tile.hasClass('ui-igtile-minimized'), "The minimized class did not apply tile " + tileIndex + '.');

			self.assert.equal(tile.css('left'), tileLeft + 'px', 'The left property of the ' + tileIndex + ' tile did not match.');
			self.assert.equal(tile.css('top'), tileTop + 'px', 'The top property of the ' + tileIndex + ' tile did not match.');
			self.assert.equal(tile.outerWidth(), tileWidth, 'The width of the ' + tileIndex + ' tile did not match.');
			self.assert.equal(tile.outerHeight(), tileHeight, 'The height of the ' + tileIndex + ' tile did not match.');
			self.assert.equal(tile.children().length, 1, 'The children count of the ' + tileIndex + ' tile did not match.');
			self.assert.equal(tile.attr('data-index'), tileIndex + '', 'The index property of the ' + tileIndex + ' tile did not match.');

			tile.mouseover();
			self.assert.ok(tile.hasClass('ui-state-hover'), 'The hover class of the ' + tileIndex + ' tile did not apply.');
			tile.mouseout();
			self.assert.notOk(tile.hasClass('ui-state-hover'), 'The hover class of the ' + tileIndex + ' tile was not removed.');

			self.assert.equal(innerContainer.outerWidth(), tileWidth - tilePaddings, 'The inner container width of the ' + tileIndex + ' tile did not match.');
			self.assert.equal(innerContainer.outerHeight(), tileHeight - tilePaddings, 'The inner container height of the ' + tileIndex + ' tile did not match.');

			self.assert.ok(minimizeBtn.length === 0, 'The minimize button of the ' + tileIndex + 'tile was incorrectly rendered.');

			if (fromMarkup) {
				if (minimizedState) {
					// Check if all the children except the minimized markup of the tile are hidden.
					self.assert.ok(Array.prototype.every.call(innerContainer.children().not(minimizedState), function (child) { return $(child).hasClass('ui-helper-hidden'); }), 'Markup other than the minimized of the ' + tileIndex + ' tile is incorrectly shown.');
					//debugger;
					self.assert.notOk(innerContainer.find(minimizedState).hasClass('ui-helper-hidden'), "The minimized content of the " + tileIndex + " tile is not shown.");
					self.assert.equal(innerContainer.find(minimizedState).html(), self.tm1MinimizedMarkup[tileIndex], 'The minimized markup of the ' + tileIndex + ' tile did not match.');
				} else {
					// If not minimized state is provided all the markup should be shown as minimized state.
					self.assert.ok(Array.prototype.every.call(innerContainer.children(), function (child) { return !$(child).hasClass('ui-helper-hidden'); }), 'Minimized state markup of the ' + tileIndex + ' did not match.');
					self.assert.equal(innerContainer.html(), self.tm1Markup[tileIndex], 'The minimized markup of the ' + tileIndex + ' tile did not match.');
				}
			} else {
				self.assert.equal(innerContainer.html(), self.minimizedTemplatesHTML[tileIndex], 'The minimized template of the ' + tileIndex + ' tile did not match');
			}
		});

		// TODO: Trigger second maximize and check again all the positions and markup

		// DESTROYING
		container.igTileManager('destroy');
		tiles = container.children();

		this.assert.notOk(container.hasClass('ui-widget') && container.hasClass('ui-igtilemanager') && container.hasClass('ui-igsplitter') && container.hasClass('ui-widget-content'), 'Tile manager did not remove classes from the container.');

		if (fromMarkup) {
			this.assert.equal(tiles.length, tilesCount, 'The number of elements after destroing did not match.');

			tiles.each(function (index, element) {
				var tile = $(this);

				self.assert.notOk(tile.hasClass('ui-igtile-minimized') && tile.hasClass('ui-widget-content') && tile.hasClass('ui-igtile'), "The tile manager did not remove the classes from tile " + index + ".");
				self.assert.equal(tile.html(), self.tm1Markup[index], 'The markup of the ' + index + ' tile did not match.');

				self.assert.notOk(tile.hasClass('ig-layout-item') && tile.hasClass('ig-layout-griditem-abs'), "The layout manager did not remove the classes from tile " + index + ".");
				self.assert.ok(!tile.attr('data-index'), 'The layout manager did not remove the data-index from tile ' + index + '.');
			});
		} else {
			this.assert.equal(tiles.length, 0, 'igTileManager did not destroy all tiles.');
		}
	}
});

QUnit.test('[ID1] igTileManager script loading', function (assert) {
	assert.expect(1);

	this.createTileManager();
	assert.ok(typeof $('#tilemanager1').igTileManager === 'function', 'igTileManager is not defined.');
});

QUnit.test('[ID2] igTileManager initialize on markup. Default config', function (assert) {
	assert.expect(617);
	this.assert = assert;

	this.createTileManager();

	// Expected values
	var container = $('#tilemanager1'),
		containerWidth = 1000,
		containerHeight = 1000,
		cols = 3, rows = 3,
		colWidth = 333, colHeight = 333,
		marginLeft = 0, marginTop = 0,
		tilesCount = 9, rightPanelCols = 1,
		rightPanelTilesWidth = null,
		rightPanelTilesHeight = null,
		rightPanelHasScroll = true,
		tileToMaximize = 0, tileToSwap = 1, items = null,
		minimizedState = null, maximizedState = null,
		showRightPanelScroll = true, enableSplitter = true,
		useApiMethods = false, fromMarkup = true,
		splitterInitiallyCollapsed = false;

	$('#tilemanager1').igTileManager({
		animationDuration: 0,
		width: 1000,
		height: 1000
	});

	var done = assert.async(),
		self = this;
	window.requestAnimationFrame(function () {
		self.testTileManager(container, containerWidth, containerHeight, cols, rows,
		colWidth, colHeight, marginLeft, marginTop, tilesCount, rightPanelCols,
		rightPanelTilesWidth, rightPanelTilesHeight, rightPanelHasScroll,
		tileToMaximize, tileToSwap, items, minimizedState, maximizedState,
		showRightPanelScroll, enableSplitter, useApiMethods, fromMarkup,
		splitterInitiallyCollapsed);
		done();
	});
});


QUnit.test('[ID3] igTileManager initialize on markup. ColumnWidth and columnHeight in px', function (assert) {
	assert.expect(660);
	this.assert = assert;

	this.createTileManager();

	// Expected values
	var container = $('#tilemanager1'),
		containerWidth = 650,
		containerHeight = 600,
		cols = 3, rows = 3,
		marginLeft = 20, marginTop = 25,
		colWidth = 180, colHeight = 175,
		tilesCount = 9, rightPanelCols = 2,
		rightPanelTilesWidth = 100,
		rightPanelTilesHeight = 100,
		rightPanelHasScroll = true,
		tileToMaximize = 1, tileToSwap = 0, items = null,
		minimizedState = ".minimized", maximizedState = ".maximized",
		showRightPanelScroll = false, splitterEnabled = true,
		useApiMethods = true, fromMarkup = true,
		splitterInitiallyCollapsed = false;

	// ColumnWidth/Height in px.
	$('#tilemanager1').width(650).height(600).igTileManager({
		columnWidth: '180',
		columnHeight: "175px",
		marginLeft: 20,
		marginTop: 25,
		showRightPanelScroll: false,
		rightPanelCols: 2,
		rightPanelTilesWidth: 100,
		rightPanelTilesHeight: 100,
		splitterOptions: {
			enabled: splitterEnabled
		},
		animationDuration: 0,
		minimizedState: ".minimized",
		maximizedState: ".maximized"
	});

	var done = assert.async(),
		self = this;
	window.requestAnimationFrame(function () {
		self.testTileManager(container, containerWidth, containerHeight, cols, rows,
		colWidth, colHeight, marginLeft, marginTop, tilesCount, rightPanelCols,
		rightPanelTilesWidth, rightPanelTilesHeight, rightPanelHasScroll,
		tileToMaximize, tileToSwap, items, minimizedState, maximizedState,
		showRightPanelScroll, splitterEnabled, useApiMethods, fromMarkup,
		splitterInitiallyCollapsed);
		done();
	});
});

QUnit.test('[ID4] igTileManager initialize on markup. ColumnWidth and columnHeight in percent', function (assert) {
	assert.expect(653);
	this.assert = assert;

	this.createTileManager();

	// Expected values
	var container = $('#tilemanager1'),
		containerWidth = 750,
		containerHeight = 750,
		cols = 2, rows = 5,
		marginLeft = 10, marginTop = 33,
		colWidth = Math.floor(containerWidth * 0.5 - marginLeft),
		colHeight = Math.floor(containerHeight * 0.2 - marginTop),
		tilesCount = 9, rightPanelCols = 3,
		rightPanelTilesWidth = 75,
		rightPanelTilesHeight = 100,
		rightPanelHasScroll = false,
		tileToMaximize = 3, tileToSwap = 6, items = null,
		minimizedState = ".minimized", maximizedState = ".maximized",
		showRightPanelScroll = true, splitterEnabled = true,
		useApiMethods = false, fromMarkup = true,
		splitterInitiallyCollapsed = false;

	// ColumnWidth/Height in percent.
	$('#tilemanager1').width(750).height(750).igTileManager({
		columnWidth: '50%',
		columnHeight: '20%',
		marginLeft: 10,
		marginTop: 33,
		showRightPanelScroll: true,
		rightPanelCols: 3,
		rightPanelTilesWidth: 75,
		rightPanelTilesHeight: 100,
		splitterOptions: {
			enabled: splitterEnabled
		},
		animationDuration: 0,
		minimizedState: ".minimized",
		maximizedState: ".maximized"
	});

	var done = assert.async(),
		self = this;
	window.requestAnimationFrame(function () {
		self.testTileManager(container, containerWidth, containerHeight, cols, rows,
		colWidth, colHeight, marginLeft, marginTop, tilesCount, rightPanelCols,
		rightPanelTilesWidth, rightPanelTilesHeight, rightPanelHasScroll,
		tileToMaximize, tileToSwap, items, minimizedState, maximizedState,
		showRightPanelScroll, splitterEnabled, useApiMethods, fromMarkup,
		splitterInitiallyCollapsed);
		done();
	});
});

QUnit.test('[ID5] igTileManager initialize on markup. Items configuration', function (assert) {
	assert.expect(653);
	this.assert = assert;

	this.createTileManager();

	// Expected values
	var container = $('#tilemanager1'),
		containerWidth = 1000,
		containerHeight = 500,
		cols = 3, rows = 6,
		marginLeft = 8, marginTop = 15,
		colWidth = Math.floor(containerWidth / cols - marginLeft),
		colHeight = Math.floor(containerHeight / rows - marginTop),
		tilesCount = 9, rightPanelCols = 1,
		rightPanelTilesWidth = null,
		rightPanelTilesHeight = null,
		rightPanelHasScroll = true,
		tileToMaximize = 6, tileToSwap = 5,
		minimizedState = ".minimized", maximizedState = ".maximized",
		showRightPanelScroll = true, splitterEnabled = true,
		useApiMethods = false, fromMarkup = true,
		splitterInitiallyCollapsed = false,
		items = [{ colSpan: 2, rowSpan: 1, colIndex: 0, rowIndex: 0 },
		{ colSpan: 1, rowSpan: 1, colIndex: 2, rowIndex: 0 },
		{ colSpan: 1, rowSpan: 2, colIndex: 0, rowIndex: 1 },
		{ colSpan: 2, rowSpan: 3, colIndex: 1, rowIndex: 1 },
		{ colSpan: 1, rowSpan: 1, colIndex: 0, rowIndex: 3 },
		{ colSpan: 1, rowSpan: 1, colIndex: 0, rowIndex: 4 },
		{ colSpan: 1, rowSpan: 1, colIndex: 1, rowIndex: 4 },
		{ colSpan: 1, rowSpan: 1, colIndex: 2, rowIndex: 4 },
		{ colSpan: 1, rowSpan: 1, colIndex: 0, rowIndex: 5 }];

	// Items configuration
	$('#tilemanager1').width(1000).height(500).igTileManager({
		marginLeft: 8,
		marginTop: 15,
		items: items,
		animationDuration: 0,
		minimizedState: ".minimized",
		maximizedState: ".maximized"
	});
	var done = assert.async(),
		self = this;
	window.requestAnimationFrame(function () {
		self.testTileManager(container, containerWidth, containerHeight, cols, rows,
			colWidth, colHeight, marginLeft, marginTop, tilesCount, rightPanelCols,
			rightPanelTilesWidth, rightPanelTilesHeight, rightPanelHasScroll,
			tileToMaximize, tileToSwap, items, minimizedState, maximizedState,
			showRightPanelScroll, splitterEnabled, useApiMethods, fromMarkup,
			splitterInitiallyCollapsed);
		done();
	});
});


QUnit.test('[ID6] igTileManager initialize on markup. Default config with maximziedTileIndex', function (assert) {
	assert.expect(332);
	this.assert = assert;

	this.createTileManager();

	// Expected values
	var maximizedTileIndex = 2,
		container = $('#tilemanager1'),
		containerWidth = 1000,
		containerHeight = 1000,
		cols = 3, rows = 3,
		colWidth = 333, colHeight = 333,
		marginLeft = 0, marginTop = 0,
		tilesCount = 9, tileToMaximize = 0, items = null,
		minimizedState = null, maximizedState = null,
		useApiMethods = false, fromMarkup = true,
		splitterInitiallyCollapsed = false;

	$('#tilemanager1').width(1000).height(1000)
		.igTileManager({
			animationDuration: 0,
			maximizedTileIndex: 1
		})
		.igTileManager("option", "maximizedTileIndex", 2);

	this.testTileManagerWithMaximizedTileIndex(maximizedTileIndex, container,
		containerWidth, containerHeight, cols, rows, colWidth, colHeight,
		marginLeft, marginTop, tilesCount, tileToMaximize, items,
		minimizedState, maximizedState, useApiMethods, fromMarkup,
		splitterInitiallyCollapsed);
});

QUnit.test('[ID7] igTileManager initialize on markup. MaximziedTileIndex with items provided. Use api events', function (assert) {
	assert.expect(355);
	this.assert = assert;

	this.createTileManager();

	// Expected values
	var maximizedTileIndex = 5,
		container = $('#tilemanager1'),
		containerWidth = 750,
		containerHeight = 600,
		cols = 4, rows = 3,
		marginLeft = 15, marginTop = 15,
		colWidth = Math.floor(750 / cols - marginLeft),
		colHeight = Math.floor(600 / rows - marginTop),
		tilesCount = 9,
		tileToMaximize = 0,
		minimizedState = ".minimized", maximizedState = ".maximized",
		useApiMethods = true, fromMarkup = true,
		items = [{ rowIndex: 0, colIndex: 0, rowSpan: 1, colSpan: 1 },
		{ rowIndex: 0, colIndex: 1, rowSpan: 1, colSpan: 1 },
		{ rowIndex: 0, colIndex: 2, rowSpan: 1, colSpan: 1 },
		{ rowIndex: 0, colIndex: 3, rowSpan: 1, colSpan: 1 },
		{ rowIndex: 1, colIndex: 0, rowSpan: 1, colSpan: 1 },
		{ rowIndex: 1, colIndex: 1, rowSpan: 2, colSpan: 2 },
		{ rowIndex: 1, colIndex: 3, rowSpan: 1, colSpan: 1 },
		{ rowIndex: 2, colIndex: 0, rowSpan: 1, colSpan: 1 },
		{ rowIndex: 2, colIndex: 3, rowSpan: 1, colSpan: 1 }];

	$('#tilemanager1').width(750).height(600)
		.igTileManager({
			marginLeft: 15,
			marginTop: 15,
			maximizedTileIndex: 5,
			minimizedState: ".minimized",
			maximizedState: ".maximized",
			animationDuration: 0
		})
		.igTileManager("option", "items", items);

	this.testTileManagerWithMaximizedTileIndex(maximizedTileIndex, container,
		containerWidth, containerHeight, cols, rows, colWidth, colHeight,
		marginLeft, marginTop, tilesCount, tileToMaximize, items,
		minimizedState, maximizedState, useApiMethods, fromMarkup);
});

QUnit.test('[ID8] igTileManager initialize on markup. Set options test. Container with vertical scroll', function (assert) {
	assert.expect(657);
	this.assert = assert;

	this.createTileManager();

	// Initial setup
	$('#tilemanager1').width(500).height(500).igTileManager({
		columnWidth: 100,
		columnHeight: 100,
		marginLeft: 10,
		marginTop: 10,
		rearrangeItems: false,
		rightPanelCols: 1,
		rightPanelTilesWidth: 100,
		rightPanelTilesHeight: 100,
		minimizedState: ".maximized"
	});

	// Expected values
	var container = $('#tilemanager1'),
		containerWidth = 1000,
		containerHeight = 1000,
		cols = 2, rows = 8,
		marginLeft = 20, marginTop = 0,
		colWidth = Math.floor((containerWidth - this.scrollWidth) * 0.5 - marginLeft),
		colHeight = 150,
		tilesCount = 9, rightPanelCols = 2,
		rightPanelTilesWidth = 125,
		rightPanelTilesHeight = 75,
		rightPanelHasScroll = false,
		tileToMaximize = 6, tileToSwap = 5,
		minimizedState = ".minimized", maximizedState = ".maximized",
		showRightPanelScroll = true,
		splitterEnabled = false,
		useApiMethods = false, fromMarkup = true,
		splitterInitiallyCollapsed = false,
		items = [{ colSpan: 2, rowSpan: 1, colIndex: 0, rowIndex: 0 },
		{ colSpan: 1, rowSpan: 1, colIndex: 2, rowIndex: 0 },
		{ colSpan: 1, rowSpan: 2, colIndex: 0, rowIndex: 1 },
		{ colSpan: 2, rowSpan: 3, colIndex: 1, rowIndex: 1 },
		{ colSpan: 1, rowSpan: 1, colIndex: 0, rowIndex: 3 },
		{ colSpan: 1, rowSpan: 1, colIndex: 0, rowIndex: 4 },
		{ colSpan: 1, rowSpan: 1, colIndex: 1, rowIndex: 4 },
		{ colSpan: 1, rowSpan: 1, colIndex: 2, rowIndex: 4 },
		{ colSpan: 1, rowSpan: 1, colIndex: 0, rowIndex: 5 }];

	// Set new options
	$('#tilemanager1')
		.igTileManager('option', 'width', 1000)
		.igTileManager('option', 'height', 1000)
		.igTileManager('option', 'rearrangeItems', true)
		.igTileManager('option', 'items', items)
		.igTileManager('option', 'columnWidth', '50%')
		.igTileManager('option', 'columnHeight', '150px')
		.igTileManager('option', 'marginLeft', 20)
		.igTileManager('option', 'marginTop', 0)
		.igTileManager('option', 'animationDuration', 0)
		.igTileManager('option', 'minimizedState', '.minimized')
		.igTileManager('option', 'maximizedState', '.maximized')
		.igTileManager('option', 'rightPanelCols', 2)
		.igTileManager('option', 'rightPanelTilesWidth', 125)
		.igTileManager('option', 'animationDuration', 0)
		.igTileManager('option', 'rightPanelTilesHeight', 75)
		.igTileManager('option', 'showRightPanelScroll', true)
		.igTileManager('option', 'splitterOptions', { enabled: splitterEnabled });

	// In this configuration the items are rearranged by the Layout Manager.
	// For the test we provide the items configuration as it should be after the rearranging.
	// Only the colIndex and rowIndex are changed
	items = [{ colSpan: 2, rowSpan: 1, colIndex: 0, rowIndex: 0 },
	{ colSpan: 1, rowSpan: 1, colIndex: 0, rowIndex: 1 },
	{ colSpan: 1, rowSpan: 2, colIndex: 1, rowIndex: 1 },
	{ colSpan: 2, rowSpan: 3, colIndex: 0, rowIndex: 3 },
	{ colSpan: 1, rowSpan: 1, colIndex: 0, rowIndex: 2 },
	{ colSpan: 1, rowSpan: 1, colIndex: 0, rowIndex: 6 },
	{ colSpan: 1, rowSpan: 1, colIndex: 1, rowIndex: 6 },
	{ colSpan: 1, rowSpan: 1, colIndex: 0, rowIndex: 7 },
	{ colSpan: 1, rowSpan: 1, colIndex: 1, rowIndex: 7 }];

	var done = assert.async(),
		self = this;
	window.requestAnimationFrame(function () {
		self.testTileManager(container, containerWidth, containerHeight, cols, rows,
			colWidth, colHeight, marginLeft, marginTop, tilesCount, rightPanelCols,
			rightPanelTilesWidth, rightPanelTilesHeight, rightPanelHasScroll,
			tileToMaximize, tileToSwap, items, minimizedState, maximizedState,
			showRightPanelScroll, splitterEnabled, useApiMethods, fromMarkup,
			splitterInitiallyCollapsed);
		done();
	});
});


QUnit.test('[ID9] igTileManager initialize on markup. Set options test. Container with vertical scroll. Calling set option while a tile is maximized', function (assert) {
	assert.expect(657);
	this.assert = assert;
	this.createTileManager();

	// Initial setup
	$('#tilemanager1').width(500).height(500).igTileManager({
		columnWidth: 100,
		columnHeight: 100,
		marginLeft: 10,
		marginTop: 10,
		rearrangeItems: false,
		rightPanelCols: 1,
		rightPanelTilesWidth: 100,
		rightPanelTilesHeight: 100,
		minimizedState: ".maximized",
		animationDuration: 0
	});

	// Expected values
	var container = $('#tilemanager1'),
		containerWidth = 1000,
		containerHeight = 1000,
		cols = 2, rows = 8,
		marginLeft = 20, marginTop = 0,
		colWidth = Math.floor((containerWidth - this.scrollWidth) * 0.5 - marginLeft),
		colHeight = 150,
		tilesCount = 9, rightPanelCols = 2,
		rightPanelTilesWidth = 125,
		rightPanelTilesHeight = 75,
		rightPanelHasScroll = false,
		tileToMaximize = 6, tileToSwap = 5,
		minimizedState = ".minimized", maximizedState = ".maximized",
		showRightPanelScroll = true, splitterEnabled = false,
		useApiMethods = false, fromMarkup = true,
		splitterInitiallyCollapsed = false,
		items = [{ colSpan: 2, rowSpan: 1, colIndex: 0, rowIndex: 0 },
		{ colSpan: 1, rowSpan: 1, colIndex: 2, rowIndex: 0 },
		{ colSpan: 1, rowSpan: 2, colIndex: 0, rowIndex: 1 },
		{ colSpan: 2, rowSpan: 3, colIndex: 1, rowIndex: 1 },
		{ colSpan: 1, rowSpan: 1, colIndex: 0, rowIndex: 3 },
		{ colSpan: 1, rowSpan: 1, colIndex: 0, rowIndex: 4 },
		{ colSpan: 1, rowSpan: 1, colIndex: 1, rowIndex: 4 },
		{ colSpan: 1, rowSpan: 1, colIndex: 2, rowIndex: 4 },
		{ colSpan: 1, rowSpan: 1, colIndex: 0, rowIndex: 5 }];

	// Set new options while tile is maximized
	$('#tilemanager1')
		.igTileManager('maximize', $('[data-index=0]'))
		.width(1000)
		.igTileManager('maximize', $('[data-index=1]'))
		.height(1000)
		.igTileManager('maximize', $('[data-index=2]'))
		.igTileManager('option', 'rearrangeItems', true)
		.igTileManager('maximize', $('[data-index=3]'))
		.igTileManager('option', 'cols', 5)
		.igTileManager('maximize', $('[data-index=4]'))
		.igTileManager('option', 'rows', 5)
		.igTileManager('maximize', $('[data-index=5]'))
		.igTileManager('option', 'items', items)
		.igTileManager('maximize', $('[data-index=6]'))
		.igTileManager('option', 'columnWidth', '50%')
		.igTileManager('maximize', $('[data-index=7]'))
		.igTileManager('option', 'columnHeight', '150px')
		.igTileManager('maximize', $('[data-index=8]'))
		.igTileManager('option', 'marginLeft', 20)
		.igTileManager('maximize', $('[data-index=0]'))
		.igTileManager('option', 'marginTop', 0)
		.igTileManager('maximize', $('[data-index=1]'))
		.igTileManager('option', 'animationDuration', 0)
		.igTileManager('maximize', $('[data-index=2]'))
		.igTileManager('option', 'minimizedState', '.minimized')
		.igTileManager('maximize', $('[data-index=3]'))
		.igTileManager('option', 'maximizedState', '.maximized')
		.igTileManager('maximize', $('[data-index=4]'))
		.igTileManager('option', 'rightPanelCols', 2)
		.igTileManager('maximize', $('[data-index=5]'))
		.igTileManager('option', 'rightPanelTilesWidth', 125)
		.igTileManager('maximize', $('[data-index=6]'))
		.igTileManager('option', 'rightPanelTilesHeight', 75)
		.igTileManager('maximize', $('[data-index=7]'))
		.igTileManager('option', 'showRightPanelScroll', false)
		.igTileManager('maximize', $('[data-index=8]'))
		.igTileManager('option', 'splitterOptions', { enabled: splitterEnabled })
		.igTileManager('minimize');

	// In this configuration the items are rearranged by the Layout Manager.
	// For the test we provide the items configuration as it should be after the rearranging.
	// Only the colIndex and rowIndex are changed
	items = [{ colSpan: 2, rowSpan: 1, colIndex: 0, rowIndex: 0 },
	{ colSpan: 1, rowSpan: 1, colIndex: 0, rowIndex: 1 },
	{ colSpan: 1, rowSpan: 2, colIndex: 1, rowIndex: 1 },
	{ colSpan: 2, rowSpan: 3, colIndex: 0, rowIndex: 3 },
	{ colSpan: 1, rowSpan: 1, colIndex: 0, rowIndex: 2 },
	{ colSpan: 1, rowSpan: 1, colIndex: 0, rowIndex: 6 },
	{ colSpan: 1, rowSpan: 1, colIndex: 1, rowIndex: 6 },
	{ colSpan: 1, rowSpan: 1, colIndex: 0, rowIndex: 7 },
	{ colSpan: 1, rowSpan: 1, colIndex: 1, rowIndex: 7 }];

	var done = assert.async(),
		self = this;
	window.requestAnimationFrame(function () {
		self.testTileManager(container, containerWidth, containerHeight, cols, rows,
		colWidth, colHeight, marginLeft, marginTop, tilesCount, rightPanelCols,
		rightPanelTilesWidth, rightPanelTilesHeight, rightPanelHasScroll,
		tileToMaximize, tileToSwap, items, minimizedState, maximizedState,
		showRightPanelScroll, splitterEnabled, useApiMethods, fromMarkup,
		splitterInitiallyCollapsed);
		done();
	})
});


QUnit.test('[ID10] igTileManager initialize on data source. Default config', function (assert) {
	assert.expect(656);
	this.assert = assert;
	var tileManagerElement = $.ig.TestUtil.appendToFixture(this.divTag, { id: "tilemanager2" });

	// Expected values
	var container = $('#tilemanager2'),
		containerWidth = 666,
		containerHeight = 999,
		cols = 4, rows = 4,
		marginLeft = 0, marginTop = 0,
		colWidth = Math.floor(containerWidth / cols),
		colHeight = Math.floor(containerHeight / rows),
		tilesCount = 13, rightPanelCols = 1,
		rightPanelTilesWidth = null,
		rightPanelTilesHeight = null,
		rightPanelHasScroll = true,
		tileToMaximize = 0, tileToSwap = 1,
		minimizedState = null, maximizedState = null,
		items = null, showRightPanelScroll = true,
		splitterEnabled = true, useApiMethods = false,
		fromMarkup = false, splitterInitiallyCollapsed = false,
		dataSource = this.dataSource;

	// Default config
	$('#tilemanager2').width(666).height(999).igTileManager({
		dataSource: dataSource,
		minimizedState: '<h3>Minimized ${header}</h3>',
		maximizedState: '<h3>Maximized ${header}</h3><p>${text}</p>',
		animationDuration: 0
	});

	var done = assert.async(),
		self = this;
	window.requestAnimationFrame(function () {
		self.testTileManager(container, containerWidth, containerHeight, cols, rows,
			colWidth, colHeight, marginLeft, marginTop, tilesCount, rightPanelCols,
			rightPanelTilesWidth, rightPanelTilesHeight, rightPanelHasScroll,
			tileToMaximize, tileToSwap, items, minimizedState, maximizedState,
			showRightPanelScroll, splitterEnabled, useApiMethods, fromMarkup,
			splitterInitiallyCollapsed);
		done();
	});
});

QUnit.test('[ID11] igTileManager initialize on data source. ColumnWidth/Height in px. Container with vertical scrollbar. Use API methods', function (assert) {
	assert.expect(663);
	this.assert = assert;
	var tileManagerElement = $.ig.TestUtil.appendToFixture(this.divTag, { id: "tilemanager2" });

	// Expected values
	var container = $('#tilemanager2'),
		containerWidth = 540,
		containerHeight = 444,
		cols = 2, rows = 7,
		colWidth = 170, colHeight = 100,
		marginLeft = 10, marginTop = 10,
		tilesCount = 13, rightPanelCols = 2,
		rightPanelTilesWidth = 100,
		rightPanelTilesHeight = 100,
		rightPanelHasScroll = true,
		tileToMaximize = 1, tileToSwap = 0,
		minimizedState = null, maximizedState = null,
		items = null, showRightPanelScroll = false,
		splitterEnabled = true, useApiMethods = true,
		fromMarkup = false, splitterInitiallyCollapsed = false,
		dataSource = this.dataSource;

	// ColumnWidth/Height in px. Container with scrollbars
	$('#tilemanager2').width(540).height(444).igTileManager({
		columnWidth: 170,
		columnHeight: 100,
		marginLeft: 10,
		marginTop: 10,
		showRightPanelScroll: false,
		rightPanelCols: 2,
		rightPanelTilesWidth: 100,
		rightPanelTilesHeight: 100,
		dataSource: dataSource,
		minimizedState: '<h3>Minimized ${header}</h3>',
		maximizedState: '<h3>Maximized ${header}</h3><p>${text}</p>',
		animationDuration: 0
	});

	var done = assert.async(),
		self = this;
	window.requestAnimationFrame(function () {
		self.testTileManager(container, containerWidth, containerHeight, cols, rows,
			colWidth, colHeight, marginLeft, marginTop, tilesCount, rightPanelCols,
			rightPanelTilesWidth, rightPanelTilesHeight, rightPanelHasScroll,
			tileToMaximize, tileToSwap, items, minimizedState, maximizedState,
			showRightPanelScroll, splitterEnabled, useApiMethods, fromMarkup,
			splitterInitiallyCollapsed);
		done();
	});
});

QUnit.test('[ID12] igTileManager initialize on data source. ColumnWidth and columnHeight in percent and cols option. Container with vertical and horizontal scrollbar. RearrangeItems false', function (assert) {
	assert.expect(660);
	this.assert = assert;
	var tileManagerElement = $.ig.TestUtil.appendToFixture(this.divTag, { id: "tilemanager2" });

	// Expected values
	var container = $('#tilemanager2'),
		containerWidth = 1000,
		containerHeight = 1000,
		cols = 4, rows = 4,
		marginLeft = 0, marginTop = 24,
		colWidth = Math.floor((containerWidth - this.scrollWidth) * 0.5 - marginLeft),
		colHeight = Math.floor((containerHeight - this.scrollHeight) * 0.33 - marginTop),
		tilesCount = 13,
		rightPanelCols = 1,
		rightPanelTilesWidth = 125,
		rightPanelTilesHeight = 100,
		rightPanelHasScroll = true,
		tileToMaximize = 3, tileToSwap = 6,
		minimizedState = null, maximizedState = null, items = null,
		showRightPanelScroll = true, splitterEnabled = false,
		useApiMethods = false, fromMarkup = false,
		splitterInitiallyCollapsed = false,
		dataSource = this.dataSource;

	// ColumnWidth and columnHeight in percent and cols option.
	// Container with vertical and horizontal scrollbar. RearrangeItems false.
	$('#tilemanager2').width(1000).height(1000).igTileManager({
		columnWidth: '50%',
		columnHeight: "33%",
		marginTop: 24,
		cols: 4,
		rearrangeItems: false,
		showRightPanelScroll: true,
		rightPanelCols: 1,
		rightPanelTilesWidth: 125,
		rightPanelTilesHeight: 100,
		splitterOptions: {
			enabled: splitterEnabled
		},
		dataSource: dataSource,
		minimizedState: '<h3>Minimized ${header}</h3>',
		maximizedState: '<h3>Maximized ${header}</h3><p>${text}</p>',
		animationDuration: 0
	});

	var done = assert.async(),
		self = this;
	window.requestAnimationFrame(function () {
		self.testTileManager(container, containerWidth, containerHeight, cols, rows,
		colWidth, colHeight, marginLeft, marginTop, tilesCount, rightPanelCols,
		rightPanelTilesWidth, rightPanelTilesHeight, rightPanelHasScroll,
		tileToMaximize, tileToSwap, items, minimizedState, maximizedState,
		showRightPanelScroll, splitterEnabled, useApiMethods, fromMarkup,
		splitterInitiallyCollapsed);
		done();
	})
});

QUnit.test('[ID13] igTileManager initialize on data source. Items configuration. Rearrange false. Half of the container is empty', function (assert) {
	assert.expect(658);
	this.assert = assert;
	var tileManagerElement = $.ig.TestUtil.appendToFixture(this.divTag, { id: "tilemanager2" });

	// Expected values
	var container = $('#tilemanager2'),
		containerWidth = 500,
		containerHeight = 500,
		cols = 3, rows = 7,
		marginLeft = 0, marginTop = 0,
		colWidth = 100,
		colHeight = containerHeight * 0.1,
		tilesCount = 13, rightPanelCols = 1,
		rightPanelTilesWidth = null,
		rightPanelTilesHeight = null,
		rightPanelHasScroll = true,
		tileToMaximize = 3, tileToSwap = 6,
		minimizedState = null, maximizedState = null,
		showRightPanelScroll = false, splitterEnabled = true,
		useApiMethods = false, fromMarkup = false,
		splitterInitiallyCollapsed = false,
		dataSource = this.dataSource,
		items = [{ colSpan: 2, rowSpan: 1, colIndex: 0, rowIndex: 0 },
		{ colSpan: 1, rowSpan: 1, colIndex: 2, rowIndex: 0 },
		{ colSpan: 1, rowSpan: 2, colIndex: 0, rowIndex: 1 },
		{ colSpan: 2, rowSpan: 3, colIndex: 1, rowIndex: 1 },
		{ colSpan: 1, rowSpan: 1, colIndex: 0, rowIndex: 3 },
		{ colSpan: 1, rowSpan: 1, colIndex: 0, rowIndex: 4 },
		{ colSpan: 1, rowSpan: 1, colIndex: 1, rowIndex: 4 },
		{ colSpan: 1, rowSpan: 1, colIndex: 2, rowIndex: 4 },
		{ colSpan: 1, rowSpan: 1, colIndex: 0, rowIndex: 5 },
		{ colSpan: 1, rowSpan: 1, colIndex: 1, rowIndex: 5 },
		{ colSpan: 1, rowSpan: 1, colIndex: 2, rowIndex: 5 },
		{ colSpan: 1, rowSpan: 1, colIndex: 0, rowIndex: 6 },
		{ colSpan: 1, rowSpan: 1, colIndex: 1, rowIndex: 6 }];

	// Init
	$('#tilemanager2').width(500).height(500).igTileManager({
		columnWidth: 100,
		columnHeight: '10%',
		cols: "100",
		rows: "100",
		rearrangeItems: false,
		items: items,
		showRightPanelScroll: false,
		dataSource: dataSource,
		minimizedState: '<h3>Minimized ${header}</h3>',
		maximizedState: '<h3>Maximized ${header}</h3><p>${text}</p>',
		animationDuration: 0
	});

	var done = assert.async(),
		self = this;
	window.requestAnimationFrame(function () {
		self.testTileManager(container, containerWidth, containerHeight, cols, rows,
			colWidth, colHeight, marginLeft, marginTop, tilesCount, rightPanelCols,
			rightPanelTilesWidth, rightPanelTilesHeight, rightPanelHasScroll,
			tileToMaximize, tileToSwap, items, minimizedState, maximizedState,
			showRightPanelScroll, splitterEnabled, useApiMethods, fromMarkup,
			splitterInitiallyCollapsed);
		done();
	});
});

QUnit.test('[ID14] igTileManager initialize on data source. MaximziedTileIndex with items provided', function (assert) {
	assert.expect(398);
	this.assert = assert;
	var tileManagerElement = $.ig.TestUtil.appendToFixture(this.divTag, { id: "tilemanager2" });

	// Expected values
	var maximizedTileIndex = 3,
		container = $('#tilemanager2'),
		containerWidth = 500,
		containerHeight = 500,
		cols = 2, rows = 10,
		marginLeft = 20, marginTop = 33,
		containerWidthNoScroll = containerWidth - this.scrollWidth,
		colWidth = Math.floor(containerWidthNoScroll * 0.5 - marginLeft),
		colHeight = Math.floor(500 * 0.25 - marginTop),
		tilesCount = 13,
		tileToMaximize = 6,
		minimizedState = null, maximizedState = null,
		useApiMethods = false, fromMarkup = false,
		dataSource = this.dataSource,
		items = [{ colSpan: 2, rowSpan: 1, colIndex: 0, rowIndex: 0 },
		{ colSpan: 1, rowSpan: 1, colIndex: 2, rowIndex: 0 },
		{ colSpan: 1, rowSpan: 2, colIndex: 0, rowIndex: 1 },
		{ colSpan: 2, rowSpan: 3, colIndex: 1, rowIndex: 1 },
		{ colSpan: 1, rowSpan: 1, colIndex: 0, rowIndex: 3 },
		{ colSpan: 1, rowSpan: 1, colIndex: 0, rowIndex: 4 },
		{ colSpan: 1, rowSpan: 1, colIndex: 1, rowIndex: 4 },
		{ colSpan: 1, rowSpan: 1, colIndex: 2, rowIndex: 4 },
		{ colSpan: 1, rowSpan: 1, colIndex: 0, rowIndex: 5 },
		{ colSpan: 1, rowSpan: 1, colIndex: 1, rowIndex: 5 },
		{ colSpan: 1, rowSpan: 1, colIndex: 2, rowIndex: 5 },
		{ colSpan: 1, rowSpan: 1, colIndex: 0, rowIndex: 6 },
		{ colSpan: 1, rowSpan: 1, colIndex: 1, rowIndex: 6 }];

	// Init
	$('#tilemanager2').width(500).height(500).igTileManager({
		columnWidth: '50%',
		columnHeight: '25%',
		marginLeft: 20,
		marginTop: 33,
		items: items,
		maximizedTileIndex: 3,
		dataSource: dataSource,
		minimizedState: '<h3>Minimized ${header}</h3>',
		maximizedState: '<h3>Maximized ${header}</h3><p>${text}</p>',
		animationDuration: 0
	});

	this.testTileManagerWithMaximizedTileIndex(maximizedTileIndex, container,
		containerWidthNoScroll, containerHeight, cols, rows, colWidth, colHeight,
		marginLeft, marginTop, tilesCount, tileToMaximize, items,
		minimizedState, maximizedState, useApiMethods, fromMarkup);
});


QUnit.test('[ID15] igTileManager initialize on data source. Set options test', function (assert) {
	assert.expect(426);
	this.assert = assert;
	var tileManagerElement = $.ig.TestUtil.appendToFixture(this.divTag, { id: "tilemanager2" });

	// Expected values
	var container = $('#tilemanager2'),
		containerWidth = 1000,
		containerHeight = 1000,
		cols = 3, rows = 5,
		marginLeft = 26, marginTop = 12,
		colWidth = 200,
		colHeight = Math.floor(containerHeight / rows - marginTop),
		tilesCount = 8, rightPanelCols = 2,
		rightPanelTilesWidth = 125,
		rightPanelTilesHeight = 75,
		rightPanelHasScroll = false,
		tileToMaximize = 6, tileToSwap = 5,
		minimizedState = ".minimized", maximizedState = ".maximized",
		showRightPanelScroll = true, splitterEnabled = true,
		useApiMethods = false, fromMarkup = false,
		splitterInitiallyCollapsed = false,
		dataSource = this.dataSource,
		dataSource2 = this.dataSource2,
		items = [{ colSpan: 2, rowSpan: 1, colIndex: 0, rowIndex: 0 },
		{ colSpan: 1, rowSpan: 1, colIndex: 2, rowIndex: 0 },
		{ colSpan: 1, rowSpan: 2, colIndex: 0, rowIndex: 1 },
		{ colSpan: 2, rowSpan: 3, colIndex: 1, rowIndex: 1 },
		{ colSpan: 1, rowSpan: 1, colIndex: 0, rowIndex: 3 },
		{ colSpan: 1, rowSpan: 1, colIndex: 0, rowIndex: 4 },
		{ colSpan: 1, rowSpan: 1, colIndex: 1, rowIndex: 4 },
		{ colSpan: 1, rowSpan: 1, colIndex: 2, rowIndex: 4 }];

	// Initial setup
	$('#tilemanager2').width(500).height(500).igTileManager({
		columnWidth: 100,
		columnHeight: 100,
		marginLeft: 10,
		marginTop: 10,
		rearrangeItems: false,
		dataSource: dataSource,
		minimizedState: '<h3>Minimized ${header}</h3>',
		maximizedState: '<h3>Maximized ${header}</h3>',
		rightPanelCols: 1,
		rightPanelTilesWidth: 100,
		rightPanelTilesHeight: 100,
		animationDuration: 0
	});

	// Set new options
	$('#tilemanager2')
		.width(1000)
		.height(1000)
		.igTileManager('option', 'dataSource', dataSource2)
		.igTileManager('option', 'items', items)
		.igTileManager('option', 'columnWidth', '200px')
		.igTileManager('option', 'columnHeight', '') // Set columnHeight to be auto evaluated
		.igTileManager('option', 'marginLeft', 26)
		.igTileManager('option', 'marginTop', 12)
		.igTileManager('option', 'animationDuration', 0)
		.igTileManager('option', 'minimizedState', '<h3>Minimized ${header}</h3>')
		.igTileManager('option', 'maximizedState', '<h3>Maximized ${header}</h3><p>${text}</p>')
		.igTileManager('option', 'rightPanelCols', 2)
		.igTileManager('option', 'rightPanelTilesWidth', 125)
		.igTileManager('option', 'rightPanelTilesHeight', 75)
		.igTileManager('option', 'showRightPanelScroll', true)
		.igTileManager('option', 'splitterOptions', { enabled: splitterEnabled });

	var done = assert.async(),
		self = this;
	window.requestAnimationFrame(function () {
		self.testTileManager(container, containerWidth, containerHeight, cols, rows,
			colWidth, colHeight, marginLeft, marginTop, tilesCount, rightPanelCols,
			rightPanelTilesWidth, rightPanelTilesHeight, rightPanelHasScroll,
			tileToMaximize, tileToSwap, items, minimizedState, maximizedState,
			showRightPanelScroll, splitterEnabled, useApiMethods, fromMarkup,
			splitterInitiallyCollapsed);
		done();
	});
});

QUnit.test('[ID16] igTileManager events', function (assert) {
	assert.expect(45);
	var tileManagerElement = $.ig.TestUtil.appendToFixture(this.divTag, { id: "tilemanager2" });

	var container = $('#tilemanager2'),
		dataSource = this.dataSource,
		dataBinding = false,
		dataBound = false,
		rendering = false,
		rendered = false,
		swap = false;

	container = $('#tilemanager2').igTileManager({
		columnWidth: 200,
		columnHeight: 200,
		dataSource: dataSource,
		minimizedState: '<h3>Minimized ${header}</h3>',
		maximizedState: '<h3>Maximized ${header}</h3><p>${text}</p>',
		animationDuration: 0,
		dataBinding: function (event, ui) {
			dataBinding = true;
			assert.equal(dataBound, false, 'The dataBound event is fired before dataBinding.');
			assert.equal(event.type, 'igtilemanagerdatabinding', 'The native event argument type is not correct.');
			assert.equal(ui.owner.element.attr('id'), 'tilemanager2', 'There is a mismatch in the owner argument.');
			assert.ok(ui.dataSource instanceof $.ig.DataSource, 'The dataSource is not an $.ig.DataSource instance.');
		},
		dataBound: function (event, ui) {
			dataBound = true;
			assert.equal(dataBinding, true, 'The dataBound event is fired before dataBinding.');
			assert.equal(event.type, 'igtilemanagerdatabound', 'The native event argument type is not correct.');
			assert.equal(ui.owner.element.attr('id'), 'tilemanager2', 'There is a mismatch in the owner argument.');
			assert.ok(ui.success, 'The databinding failed.');
			assert.equal(ui.dataView.length, 13, 'The dataView does not reflect the items the tile manager is bound to.');
		},
		rendering: function (event, ui) {
			rendering = true;
			assert.equal(rendered, false, 'The rendered event is fired before rendering.');
			assert.equal(event.type, 'igtilemanagerrendering', 'The native event argument type is not correct.');
			assert.equal(ui.owner.element.attr('id'), 'tilemanager2', 'There is a mismatch in the owner argument.');
			assert.equal(ui.tiles.length, 13, 'The data does not reflect the items the tile manager is bound to.');
			assert.equal(ui.items.length, 13, 'The item definitions do not reflect the items the tile manager is bound to.');
		},
		rendered: function (event, ui) {
			rendered = true;
			assert.equal(rendering, true, 'The rendered event is fired before rendering.');
			assert.equal(event.type, 'igtilemanagerrendered', 'The native event argument type is not correct.');
			assert.equal(ui.owner.element.attr('id'), 'tilemanager2', 'There is a mismatch in the owner argument.');
		},
		// TODO: Add tileRendering/tileRendered tests
		tileMaximizing: function (event, ui) {
			if (!swap) {
				assert.equal(event.type, 'igtilemanagertilemaximizing', 'The native event argument type is not correct.');
				assert.equal(ui.owner.element.attr('id'), 'tilemanager2', 'There is a mismatch in the owner argument.');
				assert.equal(ui.tile.attr('data-index'), '0', 'There is a mismatch in the index argument.');
				assert.equal(ui.minimizingTile, null, 'The simultaniously minimizing tile does not match.');
			} else {
				assert.equal(event.type, 'igtilemanagertilemaximizing', 'The native event argument type is not correct.');
				assert.equal(ui.owner.element.attr('id'), 'tilemanager2', 'There is a mismatch in the owner argument.');
				assert.equal(ui.tile.attr('data-index'), '1', 'There is a mismatch in the index argument.');
				assert.equal(ui.minimizingTile.attr('data-index'), '0', 'The simultaniously minimizing tile does not match.');
			}
		},
		tileMaximized: function (event, ui) {
			assert.equal(event.type, 'igtilemanagertilemaximized', 'The native event argument type is not correct.');
			assert.equal(ui.owner.element.attr('id'), 'tilemanager2', 'There is a mismatch in the owner argument.');

			if (!swap) {
				assert.equal(ui.tile.attr('data-index'), '0', 'There is a mismatch in the index argument.');
			} else {
				assert.equal(ui.tile.attr('data-index'), '1', 'There is a mismatch in the index argument.');
			}
		},
		tileMinimizing: function (event, ui) {
			if (!swap) {
				assert.equal(event.type, 'igtilemanagertileminimizing', 'The native event argument type is not correct.');
				assert.equal(ui.owner.element.attr('id'), 'tilemanager2', 'There is a mismatch in the owner argument.');
				assert.equal(ui.tile.attr('data-index'), '1', 'There is a mismatch in the index argument.');
				assert.equal(ui.maximizingTile, null, 'The simultaniously maximizing tile does not match.');
			} else {
				assert.equal(event.type, 'igtilemanagertileminimizing', 'The native event argument type is not correct.');
				assert.equal(ui.owner.element.attr('id'), 'tilemanager2', 'There is a mismatch in the owner argument.');
				assert.equal(ui.tile.attr('data-index'), '0', 'There is a mismatch in the index argument.');
				assert.equal(ui.maximizingTile.attr('data-index'), '1', 'The simultaniously maximizing tile does not match.');
			}
		},
		tileMinimized: function (event, ui) {
			assert.equal(event.type, 'igtilemanagertileminimized', 'The native event argument type is not correct.');
			assert.equal(ui.owner.element.attr('id'), 'tilemanager2', 'There is a mismatch in the owner argument.');
			if (!swap) {
				assert.equal(ui.tile.attr('data-index'), '1', 'There is a mismatch in the index argument.');
			} else {
				assert.equal(ui.tile.attr('data-index'), '0', 'There is a mismatch in the index argument.');
			}
		}
	});

	// Maximize
	container.find('.ui-igtilemanager-left').children(':first').click();

	// Swap
	swap = true;
	container.find('.ui-igtilemanager-right').children(':first').click();

	// Minimize
	swap = false;
	container.find('.ui-igtilemanager-left').children(':first').find('.ig-tile-minimize-button').click();
});

QUnit.test('[ID17] igTileManager splitter events', function (assert) {
	assert.expect(8);
	this.assert = assert;

	var tileManagerElement = $.ig.TestUtil.appendToFixture(this.divTag, { id: "tilemanager2" }),
		dataSource = this.dataSource,
		container, splitter,
		newCollapsedEvent = function (event, ui) {
			assert.equal(event.type, 'igsplittercollapsed', 'The native event argument type is not correct.');
			assert.equal(ui.index, 1, 'The collapsed panel index is not correct.');
		},
		newExpandedEvent = function (event, ui) {
			assert.equal(event.type, 'igsplitterexpanded', 'The native event argument type is not correct.');
			assert.equal(ui.index, 1, 'The expanded panel index is not correct.');
			container.igTileManager('destroy');
		};

	container = $('#tilemanager2').igTileManager({
		columnWidth: 200,
		columnHeight: 200,
		dataSource: dataSource,
		minimizedState: '<h3>Minimized ${header}</h3>',
		maximizedState: '<h3>Maximized ${header}</h3><p>${text}</p>',
		animationDuration: 0,
		splitterOptions: {
			enabled: true,
			collapsible: true,
			events: {
				collapsed: function (event, ui) {
					assert.equal(event.type, 'igsplittercollapsed', 'The native event argument type is not correct.');
					assert.equal(ui.index, 1, 'The collapsed panel index is not correct.');
				},
				expanded: function (event, ui) {
					assert.equal(event.type, 'igsplitterexpanded', 'The native event argument type is not correct.');
					assert.equal(ui.index, 1, 'The expanded panel index is not correct.');

					// Testing setting of the events
					$('#tilemanager2').igTileManager({
						splitterOptions: {
							events: {
								collapsed: newCollapsedEvent,
								expanded: newExpandedEvent
							}
						}
					});

					splitter.collapseAt(1);
					splitter.expandAt(1);
				}
			}
		}
	});

	// Maximize
	container.find('.ui-igtilemanager-left').children(':first').click();

	// Collapse and expand
	splitter = $('#tilemanager2').igTileManager("splitter");
	splitter.collapseAt(1);
	splitter.expandAt(1);
});


QUnit.test('[ID18] igTileManager splitter collapsible option', function (assert) {
	assert.expect(4);
	this.assert = assert;

	var tileManagerElement = $.ig.TestUtil.appendToFixture(this.divTag, { id: "tilemanager2" }),
		container, splitter,
		leftPanel, rightPanel,
		initialLeftTileManagerPanelWidth, initialRightTileManagerPanelWidth,
		tileManagerOptions = {
			columnWidth: 200,
			columnHeight: 200,
			dataSource: this.dataSource,
			minimizedState: '<h3>Minimized ${header}</h3>',
			maximizedState: '<h3>Maximized ${header}</h3><p>${text}</p>',
			animationDuration: 0,
			splitterOptions: {
				enabled: true,
				collapsible: false
			}
		};

	container = tileManagerElement.igTileManager(tileManagerOptions);

	// Maximize
	container.find('.ui-igtilemanager-left').children(':first').click();
	
	var leftPanel = container.find('.ui-igtilemanager-left');
	var rightPanel = container.find('.ui-igtilemanager-right');

	initialLeftTileManagerPanelWidth = leftPanel.width();
	initialRightTileManagerPanelWidth = rightPanel[0].offsetWidth;

	splitter = tileManagerElement.igTileManager("splitter");
	splitter.collapseAt(1);

	assert.equal(initialLeftTileManagerPanelWidth, leftPanel.width(), 'Tile manager\'s left panel\'s width is not correct.');
	assert.equal(initialRightTileManagerPanelWidth, rightPanel[0].offsetWidth, 'Tile manager\'s right panel\'s width is not correct.');

	container.igTileManager('destroy');

	tileManagerOptions.splitterOptions.collapsible = true;
	tileManagerElement.igTileManager(tileManagerOptions);

	splitter = tileManagerElement.igTileManager("splitter");
	splitter.collapseAt(1);

	leftPanel = container.find('.ui-igtilemanager-left');
	rightPanel = container.find('.ui-igtilemanager-right');

	assert.equal(initialLeftTileManagerPanelWidth + initialRightTileManagerPanelWidth, leftPanel.width(),
		'Tile manager\'s left panel\'s width is not correct.');
	assert.equal(0, rightPanel.width(), 'Tile manager\'s right panel\'s width is not correct.');
});

QUnit.test('[ID19] igTileManager splitter collapsed option', function (assert) {
	assert.expect(656);
	this.assert = assert;

	var tileManagerElement = $.ig.TestUtil.appendToFixture(this.divTag, { id: "tilemanager2" }),
		container = $('#tilemanager2'),
		dataSource = this.dataSource,
		containerWidth = 700,
		containerHeight = 700,
		cols = 4, rows = 4,
		marginLeft = 0, marginTop = 0,
		colWidth = Math.floor(containerWidth / cols),
		colHeight = Math.floor(containerHeight / rows),
		tilesCount = 13, rightPanelCols = 1,
		rightPanelTilesWidth = null,
		rightPanelTilesHeight = null,
		rightPanelHasScroll = true,
		tileToMaximize = 0, tileToSwap = 1,
		minimizedState = null, maximizedState = null,
		items = null, showRightPanelScroll = true,
		splitterEnabled = true, useApiMethods = false,
		fromMarkup = false, splitterInitiallyCollapsed = true;


	tileManagerElement.width(containerWidth).height(containerHeight).igTileManager({
		dataSource: dataSource,
		minimizedState: '<h3>Minimized ${header}</h3>',
		maximizedState: '<h3>Maximized ${header}</h3><p>${text}</p>',
		animationDuration: 0,
		splitterOptions: {
			enabled: splitterEnabled,
			collapsed: true,
			collapsible: true
		}
	});

	var done = assert.async(),
		self = this;
	window.requestAnimationFrame(function () {
		self.testTileManager(container, containerWidth, containerHeight, cols, rows,
			colWidth, colHeight, marginLeft, marginTop, tilesCount, rightPanelCols,
			rightPanelTilesWidth, rightPanelTilesHeight, rightPanelHasScroll,
			tileToMaximize, tileToSwap, items, minimizedState, maximizedState,
			showRightPanelScroll, splitterEnabled, useApiMethods, fromMarkup,
			splitterInitiallyCollapsed);
		done();
	});
});

QUnit.test('[ID20] igTileManager splitter setting collapsible and collapsed options', function (assert) {
	assert.expect(2);
	this.assert = assert;

	var tileManagerElement = $.ig.TestUtil.appendToFixture(this.divTag, { id: "tilemanager2" }),
		dataSource = this.dataSource,
		container,
		setCollapsibleOptionFunc,
		setCollapsedOptionFunc;

	container = $('#tilemanager2').igTileManager({
		columnWidth: 200,
		columnHeight: 200,
		dataSource: dataSource,
		minimizedState: '<h3>Minimized ${header}</h3>',
		maximizedState: '<h3>Maximized ${header}</h3><p>${text}</p>',
		animationDuration: 0,
		splitterOptions: {
			enabled: true,
			collapsible: false,
			collapsed: false
		}
	});

	var setCollapsibleOptionToTrueFunc = function () {
		tileManagerElement.igTileManager({
			splitterOptions: {
				collapsible: true
			}
		});
	}

	assert.throws(setCollapsibleOptionToTrueFunc, Error, "Must throw error when trying to set collapsible option for th splitter.");

	var setCollapsedOptionToTrueFunc = function () {
		tileManagerElement.igTileManager({
			splitterOptions: {
				collapsed: true
			}
		});
	}

	assert.throws(setCollapsedOptionToTrueFunc, Error, "Must throw error when trying to set collapsed option for th splitter.");
});

QUnit.test('[ID21] igTileManager disabled', function (assert) {
	assert.expect(417);
	this.assert = assert;

	var tileManagerElement = $.ig.TestUtil.appendToFixture(this.divTag, { id: "tilemanager2" }),
		dataSource = this.dataSource,
		container = $('#tilemanager2'),
		containerWidth = 700,
		containerHeight = 700,
		cols = 4, rows = 4,
		marginLeft = 0, marginTop = 0,
		colWidth = Math.floor(containerWidth / cols),
		colHeight = Math.floor(containerHeight / rows),
		tilesCount = 13, rightPanelCols = 1,
		rightPanelTilesWidth = null,
		rightPanelTilesHeight = null,
		rightPanelHasScroll = true,
		tileToMaximize = 0, tileToSwap = 1,
		minimizedState = null, maximizedState = null,
		items = null, showRightPanelScroll = true,
		splitterEnabled = true, useApiMethods = false,
		fromMarkup = false, splitterInitiallyCollapsed = true, disabled = true;

	tileManagerElement.width(containerWidth).height(containerHeight).igTileManager({
		dataSource: dataSource,
		minimizedState: '<h3>Minimized ${header}</h3>',
		maximizedState: '<h3>Maximized ${header}</h3><p>${text}</p>',
		animationDuration: 0,
		disabled: disabled,
		splitterOptions: {
			enabled: splitterEnabled,
			collapsed: true,
			collapsible: true
		}
	});

	var done = assert.async(),
		self = this;
	window.requestAnimationFrame(function () {
		self.testTileManager(container, containerWidth, containerHeight, cols, rows,
			colWidth, colHeight, marginLeft, marginTop, tilesCount, rightPanelCols,
			rightPanelTilesWidth, rightPanelTilesHeight, rightPanelHasScroll,
			tileToMaximize, tileToSwap, items, minimizedState, maximizedState,
			showRightPanelScroll, splitterEnabled, useApiMethods, fromMarkup,
			splitterInitiallyCollapsed, disabled);
		done();
	});
});

QUnit.test('[ID22] igTileManager initialize on markup. ColumnWidth and ColumnHeight in *', function (assert) {
	assert.expect(660);
	this.assert = assert;

	this.createTileManager();

	var container = $('#tilemanager1'),
		containerWidth = 800,
		containerHeight = 600,
		cols = 3, rows = 3,
		marginLeft = 0, marginTop = 0,
		colWidth = Math.floor(containerWidth / 3),
		colHeight = Math.floor(containerHeight / 3),
		tilesCount = 9, rightPanelCols = 2,
		rightPanelTilesWidth = 100,
		rightPanelTilesHeight = 100,
		rightPanelHasScroll = true,
		tileToMaximize = 1, tileToSwap = 0, items = null,
		minimizedState = ".minimized", maximizedState = ".maximized",
		showRightPanelScroll = false, splitterEnabled = true,
		useApiMethods = true, fromMarkup = true,
		splitterInitiallyCollapsed = false;

	// ColumnWidth/Height in *.
	$('#tilemanager1').width(800).height(600).igTileManager({
		columnWidth: '*',
		columnHeight: "*",
		marginLeft: 0,
		marginTop: 0,
		showRightPanelScroll: false,
		rightPanelCols: 2,
		rightPanelTilesWidth: 100,
		rightPanelTilesHeight: 100,
		splitterOptions: {
			enabled: splitterEnabled
		},
		animationDuration: 0,
		minimizedState: ".minimized",
		maximizedState: ".maximized"
	});

	var done = assert.async(),
		self = this;
	window.requestAnimationFrame(function () {
		self.testTileManager(container, containerWidth, containerHeight, cols, rows,
			colWidth, colHeight, marginLeft, marginTop, tilesCount, rightPanelCols,
			rightPanelTilesWidth, rightPanelTilesHeight, rightPanelHasScroll,
			tileToMaximize, tileToSwap, items, minimizedState, maximizedState,
			showRightPanelScroll, splitterEnabled, useApiMethods, fromMarkup,
			splitterInitiallyCollapsed);
		done();
	});
});

QUnit.test('[ID23] igTileManager initialize on markup. ColumnWidth and ColumnHeight arrays', function (assert) {
	assert.expect(664);
	this.assert = assert;

	this.createTileManager();

	// Expected values
	var container = $('#tilemanager1'),
		containerWidth = 800,
		containerHeight = 600,
		cols = 3, rows = 3,
		marginLeft = 0, marginTop = 0,
		colWidth = [160, 320, 320],
		colHeight = [120, 200, 280],
		tilesCount = 9, rightPanelCols = 1,
		rightPanelTilesWidth = 320,
		rightPanelTilesHeight = 280,
		rightPanelHasScroll = true,
		tileToMaximize = 1, tileToSwap = 0, items = null,
		minimizedState = ".minimized", maximizedState = ".maximized",
		showRightPanelScroll = false, splitterEnabled = true,
		useApiMethods = true, fromMarkup = true,
		splitterInitiallyCollapsed = false;

	// ColumnWidth and ColumnHeight with various values.
	$('#tilemanager1').width(800).height(600).igTileManager({
		columnHeight: ["20%", "200px", "*"],
		columnWidth: ["20%", "*", "*"],
		marginLeft: 0,
		marginTop: 0,
		showRightPanelScroll: false,
		splitterOptions: {
			enabled: splitterEnabled
		},
		animationDuration: 0,
		minimizedState: ".minimized",
		maximizedState: ".maximized"
	});

	var done = assert.async(),
		self = this;
	window.requestAnimationFrame(function () {
		self.testTileManager(container, containerWidth, containerHeight, cols, rows,
			colWidth, colHeight, marginLeft, marginTop, tilesCount, rightPanelCols,
			rightPanelTilesWidth, rightPanelTilesHeight, rightPanelHasScroll,
			tileToMaximize, tileToSwap, items, minimizedState, maximizedState,
			showRightPanelScroll, splitterEnabled, useApiMethods, fromMarkup,
			splitterInitiallyCollapsed);
		done();
	});
});


