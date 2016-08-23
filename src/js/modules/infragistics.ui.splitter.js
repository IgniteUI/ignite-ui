/*!@license
 * Infragistics.Web.ClientUI Splitter <build_number>
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
 *	infragistics.ui.splitter-en.js
 */

/*global jQuery, document, window */
if (typeof jQuery !== "function") {
    throw new Error("jQuery is undefined");
}

(function ($) {
    /*
		igSplitter is a widget based on jQuery UI that manages layout into two panels with split bar and providers the end user with a rich interaction functionality including the ability to expand/collapse panel, and resize panels via split bar.
	*/
    $.widget("ui.igSplitter", {
        _const: {
            orientations: {
                horizontal: {
                    size: "height",
                    oppositeSize: "width",
                    outerSize: "outerHeight",
                    dimention: "top",
                    start: "_startY",
                    mouse: "_mouseStartY",
                    page: "pageY",
                    keyboard: [ "UP", "DOWN" ]
                },
                vertical: {
                    size: "width",
                    oppositeSize: "height",
                    outerSize: "outerWidth",
                    dimention: "left",
                    start: "_startX",
                    mouse: "_mouseStartX",
                    page: "pageX",
                    keyboard: [ "LEFT", "RIGHT" ]
                }
            },

            // S.T. 21 May 2013 #142543
            // Added propeties _min and _max in order to hold percentage size of the panel
            properties: [ "max", "_max", "min", "_min", "size",
                "collapsed", "collapsible", "resizable" ],
            step: 10,
            touchEvents: {
                mousedown: "touchstart",
                mouseup: "touchend",
                mousemove: "touchmove",
                mouseenter: "",
                mouseleave: "",
                focus: "focus",
                blur: "blur",
                keydown: "keydown"
            }
        },
        css: {
            /* classes applied to the top container element */
            splitter: "ui-igsplitter ui-widget ui-widget-content",
            /* classes applied to the vertical panel in the splitter */
            verticalPanel: "ui-igsplitter-panel-vertical ui-widget-content",
            /* classes applied to the horizontal panel in the splitter */
            horizontalPanel: "ui-igsplitter-panel-horizontal ui-widget-content",
            /* class applied to the split bar in the splitter */
            bar: "ui-igsplitter-splitbar",
            /* classes defining the default state style of the split bar */
            barNormal: "ui-igsplitter-splitbar-default ui-state-default",
            /* class defining the collapsed state style of the split bar */
            barCollapsed: "ui-igsplitter-splitbar-collapsed",
            /* classes defining the hover state style of the split bar */
            barHover: "ui-igsplitter-splitbar-hover ui-state-hover",
            /* classes defining the focus state style of the split bar */
            barActive: "ui-igsplitter-splitbar-focus ui-state-focus",
            /* class defining the invalid state style of the split bar */
            barInvalid: "ui-igsplitter-splitbar-invalid",
            /* class applied to the resize handler in the split bar */
            resizeHandler: "ui-igsplitter-splitbar-resize-handler",
            /* class applied to the inner resize handler in the split bar */
            resizeHandlerInner: "ui-igsplitter-splitbar-resize-handler-inner",
            /* class applied to the left vertical collapse button in the split bar when it is expanded */
            verticalCollapseButtonLeftExpanded: "ui-igsplitter-collapse-button-vertical-left",
            /* classes defining the left expanded collapse button icon in vertical orientation */
            verticalCollapseButtonLeftExpandedIcon: "ui-icon ui-icon-triangle-1-w",
            /* class applied to the left vertical collapse button in the split bar when it is collapsed  */
            verticalCollapseButtonLeftCollapsed: "ui-igsplitter-collapse-button-vertical-left",
            /* class defining the left collapsed button icon in vertical orientation */
            verticalCollapseButtonLeftCollapsedIcon: "ui-icon ui-icon-triangle-1-e",
            /* class applied to the right vertical collapse button in the split bar when it is expanded */
            verticalCollapseButtonRightExpanded: "ui-igsplitter-collapse-button-vertical-right",
            /* class defining the right expanded button icon in vertical orientation */
            verticalCollapseButtonRightExpandedIcon: "ui-icon ui-icon-triangle-1-e",
            /* class applied to the right vertical button in the split bar when it is collapsed */
            verticalCollapseButtonRightCollapsed: "ui-igsplitter-collapse-button-vertical-right",
            /* class defining the right collapsed button icon in vertical orientation */
            verticalCollapseButtonRightCollapsedIcon: "ui-icon ui-icon-triangle-1-w",
            /* class applied to the left horizontal collapse button in the split bar when it is expanded */
            horizontalCollapseButtonLeftExpanded: "ui-igsplitter-collapse-button-horizontal-left",
            /* class defining the left expanded button icon in horizontal orientation */
            horizontalCollapseButtonLeftExpandedIcon: "ui-icon ui-icon-triangle-1-n",
            /* class applied to the left horizontal collapse button in the split bar when it is collapsed */
            horizontalCollapseButtonLeftCollapsed: "ui-igsplitter-collapse-button-horizontal-left",
            /* class defining the right collapsed button icon in horizontal orientation */
            horizontalCollapseButtonLeftCollapsedIcon: "ui-icon ui-icon-triangle-1-s",
            /* class applied to the right horizontal collapse button in the split bar when it is expanded */
            horizontalCollapseButtonRightExpanded: "ui-igsplitter-collapse-button-horizontal-right", //jscs:ignore maximumLineLength
            /* class defining the right expanded button icon in horizontal orientation */
            horizontalCollapseButtonRightExpandedIcon: "ui-icon ui-icon-triangle-1-s",
            /* class applied to the right horizontal collapse button in the split bar when it is collapsed */
            horizontalCollapseButtonRightCollapsed: "ui-igsplitter-collapse-button-horizontal-right", //jscs:ignore maximumLineLength
            /* class defining the right collapsed button icon in horizontal orientation */
            horizontalCollapseButtonRightCollapsedIcon: "ui-icon ui-icon-triangle-1-n",
            /* class defining the default state style of the button */
            collapseButtonDefault: "ui-state-default",
            /* class applied to a button in the split bar when it is single */
            collapseButtonSingle: "ui-igsplitter-collapse-single-button",
            /* class defining the pressed state style of the button */
            collapseButtonPressed: "ui-igsplitter-collapse-button-pressed",
            /* classes defining the hover state style of the button */
            collapseButtonHover: "ui-igsplitter-collapse-button-hover ui-state-hover",
            /* classes disabling the panel scrolling while width is zero */
            noScroll: "ui-igsplitter-no-scroll"
        },
        events: {
            /* cancel="false" fired after collapsing is performed
				Function takes arguments evt and ui.
				Use ui.owner to get a reference to the splitter instance.
				Use ui.index to get an index of collased panel.
			*/
            collapsed: "collapsed",
            /* cancel="false" fired after expanding is performed
				Function takes arguments evt and ui.
				Use ui.owner to get a reference to the splitter instance.
				Use ui.index to get an index of expanded panel.
			*/
            expanded: "expanded",
            /* cancel="false" fired before split bar move is performed
				Function takes arguments evt and ui.
				Use ui.owner to get a reference to the splitter instance.
			*/
            resizeStarted: "resizeStarted",
            /* cancel="true" fired while split bar move is performed
				Function takes arguments evt and ui.
				Use ui.owner to get a reference to the splitter instance.
			*/
            resizing: "resizing",
            /* cancel="false" fired after split bar move is performed
				Function takes arguments evt and ui.
				Use ui.owner to get a reference to the splitter instance.
			*/
            resizeEnded: "resizeEnded",
            /* cancel="true" Fired before the panels are going to go refreshed because of browser"s resizing.
				Function takes arguments evt and ui.
				Use ui.owner to get a reference to the splitter instance.*/
            layoutRefreshing: "layoutRefreshing",
            /* cancel="false" fired after the panels are refreshed because of browser"s resizing.
				Function takes arguments evt and ui.
				Use ui.owner to get a reference to the splitter instance.*/
            layoutRefreshed: "layoutRefreshed"
        },
        options: {
            /* type="string|number|null" Gets sets how the width of the control can be set.
				string The widget width can be set in pixels (px) and percentage (%).
				number The widget width can be set as a number in pixels.
				null type="object" will stretch to fit data, if no other widths are defined.
			*/
            width: null,
            /* type="string|number|null" Gets sets how the height of the control can be set.
				string The height width can be set in pixels (px) and percentage (%).
				number The height width can be set as a number in pixels.
				null type="object" will fit the tree inside its parent container, if no other widths are defined.
			*/
            height: null,
            /* type="vertical|horizontal" Specifies the orientation of the splitter.
				vertical type="string"
				horizontal type="string"
				*/
            orientation: "vertical",
            /* type="array" Array of objects options that specify the panels settings. The panels are no more than two. Settings are specified via enumeration.*/
            panels: [
                   {
                       /* type="string|number" Gets sets the size of the panel*/
                       size: null,
                       /* type="string|number" Gets sets the minimum size that the panel can have*/
                       min: null,
                       /* type="string|number" Gets sets the maximum size that the panel can have */
                       max: null,
                       /* type="bool" Gets sets whether the panel can be resized*/
                       resizable: false,
                       /* type="bool" Gets sets whether the panel is initially collapsed*/
                       collapsed: false,
                       /* type="bool" Gets sets whether the panel can be collapsed*/
                       collapsible: false
                   }
             ],
            /* type="number" Specifies drag delta of the split bar. In order to start dragging move, the mouse has to be moved specific distance from original position. */
            dragDelta: 3,
            /* type="boolean" Specifies whether the other splitters on the page will be resized as this splitter resizes. */
            resizeOtherSplitters: true
        },
        widget: function () {
            /* Returns the element that represents this widget.
				returnType="object" Returns the element that represents this widget.
			*/
            return this.element;
        },
        _createWidget: function () {
            /* !Strip dummy objects from options, because they are defined for documentation purposes only! */
            this.options.panels = [ ];

            this._opt = {
                eventHandlers: {},

                // If both panels are undefined 50% size will be applied
                defaultPanelSize: "50%",

                // Default max width/height of panel1
                defaultPanelMaxSize: 9007199254740992,

                // splitter clone object, used for splitter/panels size calculation on window resize
                calculateSizeCloneObject: {
                    element: null,
                    panels: [ {
                        options: {},
                        element: null
                    }, {
                        options: {},
                        element: null
                    } ],
                    bar: {
                        element: null
                    }
                }
            };
            $.Widget.prototype._createWidget.apply(this, arguments);
        },
        _create: function () {
            var splitters, length = $(this.element.children("div")).length;
            this._htmlMarkup = this.element.html();
            if (this.options.panels.length > 2 || length > 2) {
                throw new Error($.ig.Splitter.locale.errorPanels);
            }
            if (length === 1) {
                this.element.append("<div/>");
            } else if (length === 0) {
                this.element.append("<div/>");
                this.element.append("<div/>");
            }
            this._panels = [ ];
            this._splitter = {};
            splitters = $.data(document.body, "ig-splitters") || [ ];
            splitters.push(this.element);
            $.data(document.body, "ig-splitters", splitters);
            if (this.options.width) {
                this.element.css("width", this.options.width);
            }
            if (this.options.height) {
                this.element.css("height", this.options.height);
            }

            this._opt.barMouseDown = false;

            this._render();
            this._removeClasses();
            this._addClasses();
            this._removeEventHandlers();
            this._addEventHandlers();
            this._panelsLayout({ isInit: true });
        },
        _setOption: function (option, value) {
            var oldWidth, oldHeight;

            if (this.options[ option ] === value) {
                return;
            }

            $.Widget.prototype._setOption.apply(this, arguments);

            switch (option) {
                case "width":
                    oldWidth = this.element.width();
                    this.element.css("width", value);

                    if (this.options.orientation === "vertical") {
                        this._setPanelsNewWidth(value, oldWidth);
                    }

                    this._panelsLayout();
                    break;
                case "height":
                    oldHeight = this.element.height();
                    this.element.css("height", value);

                    if (this.options.orientation === "horizontal") {
                        this._setPanelsNewHeight(value, oldHeight);
                    }

                    this._panelsLayout();
                    break;
                case "orientation":
                case "panels":
                    throw new Error($.ig.Splitter.locale.errorSettingOption);
                default:
                    break;
            }
        },
        _setPanelsNewWidth: function (newWidth, oldWidth) {
            var secondPanelRatio = this.secondPanel().width() / oldWidth;

            this.setSecondPanelSize(newWidth * secondPanelRatio);
        },
        _setPanelsNewHeight: function (newHeight, oldHeight) {
            var secondPanelRatio = this.secondPanel().height() / oldHeight;

            this.setSecondPanelSize(newHeight * secondPanelRatio);
        },
        _render: function () {
            //D.U. 8st July 2014 default size always NaN while width or height was set with percentage.
            var panels = $(this.element.children("div")), panel, self = this,
                reducedSize, defaultSize = 0, j, elementSize;
            reducedSize = this._reducedSize();
            if (this.options[ this._getOrientation("size") ]) {
                //D.U. 8st July 2014 default size always NaN while width or height was set with percentage.
                elementSize = this._getOrientation("size") === "width" ?
                    this.element.width() : this.element.height();
                defaultSize = elementSize - reducedSize.size;
            } else {
                defaultSize = this._getSize(this._getOrientation("size")) - reducedSize.size;
            }
            if ((panels.length - reducedSize.length) !== 0) {
                defaultSize = Math.floor(defaultSize / (panels.length - reducedSize.length));
            }
            if (this._panels.length < 1) {
                panels.each(function (i, element) {
                    panel = $(element);

                    // S.T. 21 May 2013 #142543
                    // Added propeties _min and _max in order to hold percentage size of the panel. Here, they are initiliazed to 0% for _min and 100% for _max.
                    panel.options = {
                        max: self._opt.defaultPanelMaxSize,
                        _max: "100%",
                        min: 0,
                        _min: "0",
                        collapsible: false,
                        resizable: true,
                        collapsed: false,
                        size: panel[ self._getOrientation("size") ]()
                    };
                    for (j = 0; j < self._const.properties.length; j++) {
                        if (self.options.panels[ i ] &&
                            self.options.panels[ i ][ self._const.properties[ j ] ] !==
                                undefined && self.options.panels[ i ][
                                        self._const.properties[ j ] ] !== null) {
                            panel.options[ self._const.properties[ j ] ] =
                                self.options.panels[ i ][ self._const.properties[ j ] ];
                        } else {
                            if (self._const.properties[ j ] === "size") {
                                if (panel[ 0 ].style[ self._getOrientation("size") ] !==
                                    "auto" && panel[ 0 ].style[ self._getOrientation("size") ] !==
                                        "") {
                                    panel.options.size = panel[ self._getOrientation("size") ]();
                                } else {
                                    panel.options.size = defaultSize;
                                }
                            }
                        }
                    }
                    self._panels.push(panel);
                });
                this._createSplitter();
            }
        },
        _reducedSize: function () {
            var i, reducedSize = { "size": 0, "length": 0 }, size = 0;
            for (i = 0; i < this.options.panels.length; i++) {
                size = 0;
                if (this.options.panels[ i ].size !== undefined) {
                    if (/%/.test(this.options.panels[ i ].size)) {
                        this.options.panels[ i ].size = this.options.panels[ i ].size
                            .replace("%", "") * this._getSize(this._getOrientation("size")) / 100;
                        this._isPercentLayout = true;
                    }
                    if (/px/.test(this.options.panels[ i ].size)) {
                        this.options.panels[ i ].size =
                            parseInt(this.options.panels[ i ].size, 10);
                    }

                    // P.P. 31 Aug 2015 #202983 - Splitter gives you a chance to resize panel over it max/min limit
                    size = this.options.panels[ i ].size;
                    reducedSize.length += 1;
                }

                // P.P. 31 Aug 2015 #202983 - Splitter gives you a chance to resize panel over it max/min limit
                if (this.options.panels[ i ].min !== undefined) {
                    if (/px/.test(this.options.panels[ i ].min)) {
                        this.options.panels[ i ].min = parseInt(this.options.panels[ i ].min, 10);
                    }
                    if (/%/.test(this.options.panels[ i ].min)) {

                        // S.T. 21 May 2013 #142543
                        // If the layout is in percentage then keep min size in percentage
                        this.options.panels[ i ]._min = this.options.panels[ i ].min;
                        this.options.panels[ i ].min =
                            this.options.panels[ i ].min
                            .replace("%", "") * this._getSize(this._getOrientation("size")) / 100;
                    }
                }

                // P.P. 31 Aug 2015 #202983 - Splitter gives you a chance to resize panel over it max/min limit
                if (this.options.panels[ i ].max !== undefined) {
                    if (/px/.test(this.options.panels[ i ].max)) {
                        this.options.panels[ i ].max = parseInt(this.options.panels[ i ].max, 10);
                    }
                    if (/%/.test(this.options.panels[ i ].max)) {

                        // S.T. 21 May 2013 #142543
                        // If the layout is in percentage then keep max size in percentage
                        this.options.panels[ i ]._max = this.options.panels[ i ].max;
                        this.options.panels[ i ].max =
                            this.options.panels[ i ].max.replace("%", "") *
                                this._getSize(this._getOrientation("size")) / 100;
                    }
                }

                reducedSize.size += size;
            }
            return reducedSize;
        },
        _getSize: function (size) {

            //S.T. 8 May 2013 #140833 and #142820
            //The container in JSFiddle that’s hold the splitter control has float width - 834.5px.
            //The splitter is initialized without width. So, it’s width 799.5px in IE9. In Chrome, the splitter has width 800px.
            //When it gets container width in IE9 with jQuery function width(), the result is 800px, not 799.5px. And that’s cause the issue.
            //Now, it is using getComputedStyle in order to take the container width direclty from DOM (if getComputedStyle is defined)
            //getComputedStyle is not supported in IE7 and IE8
            var borderWidth, boxSizing = this.element.css("box-sizing"), value;
            if (window.getComputedStyle !== undefined) {
                value = parseInt(window.getComputedStyle(this.element[ 0 ])[ size ], 10);

                // S.T. 22 May 2013 #142262
                // If the cointaner is with border box and the browser is Chrome, in the computed style of the element is not include border width
                if ($.ig.util.isChrome && boxSizing === "border-box") {

                    // P.P 29 May 2016 #215742 Edge present border width as empty string
                    borderWidth = this.element.css("border-width") === "" ?
                        0 : this.element.css("border-width");

                    value -= parseInt(borderWidth, 10) * 2;
                }
                return value;
            }
            return this.element[ size ]();
        },
        _getOrientation: function (property) {
            return this._const.orientations[ this.options.orientation ][ property ];
        },
        _getEvent: function (event) {
            if (this._isTouch()) {

                // K.D. D.A. 12th March 2014, Bug #185854 Splitter is not able to resize on Chrome or Firefox
                // Notebooks with touch screen require both events
                return event + " " + this._const.touchEvents[ event ];
            }
            return event;
        },
        _isTouch: function (event) {
	        var isTouch = $.ig.util.isTouch;
            if (event) {

                // K.D. D.A. 12th March 2014, Bug #185854 Splitter is not able to resize on Chrome or Firefox
                // Notebooks with touch are recognized as touch but when interacting with the mouse, non touch events are fired
                isTouch = isTouch && event.originalEvent.touches;
            }
            return isTouch;
        },
        _createSplitter: function () {
            var collapseButtons = $("<div><span></span></div><div><span></span></div>"),
                bar = $("<div></div>").attr("tabindex", 0),
				div, topMarginButtonLeftCollapsed;
            this._splitter = {
                left: this._panels[ 0 ],
                right: this._panels[ 1 ]
            };
            bar.insertAfter(this._panels[ 0 ]);
            this._splitter.bar = bar;
            this._splitter.bar.append(collapseButtons);
            div = $("<div/>").appendTo(this._splitter.bar);

            //D.A. 31st October 2013 JSLint validation. Removing unused variable span.
            $("<span></span>")[ this._getOrientation("size") ](this._splitter
                .bar[ this._getOrientation("size") ]).attr("title", "").appendTo(div);
            
        },
        _removeClasses: function () {
            var buttonLeft, buttonRight, resizeHandler, i;
            this.element.removeClass(this.css.splitter);
            for (i = 0; i < this._panels.length; i++) {
                this._panels[ i ].removeClass(this.css[ this.options.orientation + "Panel" ]);
            }
            this._splitter.bar.removeClass(this.css.bar + "-" + this.options.orientation);
            this._splitter.bar.removeClass(this.css.barNormal);
            this._splitter.bar.removeClass(this.css.barCollapsed);
            buttonLeft = $(this._splitter.bar.children()[ 0 ]);
            buttonRight = $(this._splitter.bar.children()[ 1 ]);
            buttonLeft.removeClass(this.css[ this.options.orientation +
                "CollapseButtonLeftExpanded" ]);
            buttonRight.removeClass(this.css[ this.options.orientation +
                "CollapseButtonRightExpanded" ]);
            buttonLeft.removeClass(this.css.collapseButtonDefault);
            buttonRight.removeClass(this.css.collapseButtonDefault);
            resizeHandler = $(this._splitter.bar.children()[ 2 ]);
            resizeHandler.removeClass(this.css.resizeHandler + "-" + this.options.orientation);
            $(resizeHandler.children()[ 0 ]).removeClass(this.css.resizeHandlerInner + "-" +
                this.options.orientation);
        },
        _addClasses: function () {
            var buttonLeft, buttonRight, i, resizeHandler;
            this.element.addClass(this.css.splitter);
            for (i = 0; i < this._panels.length; i++) {
                this._panels[ i ].addClass(this.css[ this.options.orientation + "Panel" ]);
            }
            this._splitter.bar.addClass(this.css.bar + "-" + this.options.orientation);
            this._splitter.bar.addClass(this.css.barNormal);
            if (this._panels[ 0 ].options.collapsed || this._panels[ 1 ].options.collapsed) {
                this._splitter.bar.addClass(this.css.barCollapsed);
            }
            buttonLeft = $(this._splitter.bar.children()[ 0 ]);
            buttonRight = $(this._splitter.bar.children()[ 1 ]);
            buttonLeft.addClass(this.css[ this.options.orientation +
                "CollapseButtonLeftExpanded" ]);
            $(buttonLeft.children()).addClass(this.css[ this.options.orientation +
                "CollapseButtonLeftExpandedIcon" ]);
            buttonRight.addClass(this.css[ this.options.orientation +
                "CollapseButtonRightExpanded" ]);
            $(buttonRight.children()).addClass(this.css[ this.options.orientation +
                "CollapseButtonRightExpandedIcon" ]);
            resizeHandler = $(this._splitter.bar.children()[ 2 ]);
            resizeHandler.addClass(this.css.resizeHandler + "-" + this.options.orientation);
            $(resizeHandler.children()[ 0 ]).addClass(this.css.resizeHandlerInner + "-" +
                this.options.orientation);
            if (!this._panels[ 0 ].options.collapsible) {
                buttonLeft.hide();
                buttonRight.addClass(this.css.collapseButtonSingle);
            }
            if (!this._panels[ 1 ].options.collapsible) {
                buttonRight.hide();
                buttonLeft.addClass(this.css.collapseButtonSingle);
            }
            buttonLeft.addClass(this.css.collapseButtonDefault);
            buttonRight.addClass(this.css.collapseButtonDefault);

            // P.P 26-10-2015 Bug#202830 Add classes for disabled widget
            if (this.options.disabled) {

                // This line will help to pass first check in the _setOption method
                this.options.disabled = false;
                this._setOption("disabled", true);
            }
        },
        _removeEventHandlers: function () {
            $(this._splitter.bar).unbind(this._getEvent("focus"),
				this._getEvent("blur"),
				this._getEvent("keydown"));
            $(this._splitter.bar.children()[ 0 ]).unbind(this._getEvent("mousedown"));
            $(this._splitter.bar.children()[ 1 ]).unbind(this._getEvent("mousedown"));

            //T.P. Bug #155452 fix _removeEventHandlers so when under mobile devices mouseenter and mouseleave are not unbinded
            if (!this._isTouch()) {
                $(this._splitter.bar).unbind(this._getEvent("mouseenter"),
					this._getEvent("mouseleave"));
                $(this._splitter.bar.children()[ 0 ]).unbind(this._getEvent("mouseenter"),
                    this._getEvent("mouseleave"));
                $(this._splitter.bar.children()[ 1 ]).unbind(this._getEvent("mouseenter"),
                    this._getEvent("mouseleave"));
            }
        },
        _addEventHandlers: function () {
            var self = this,
                options = this.options;

            self.autoResize = true;

            this._opt.eventHandlers.documentMouseUp = function () {

                // P.P. 26 June 2015: Bug#200732: Even when the splitter is disabled, the splitbar is still draggable
                if (options.disabled) {
                    return;
                }

                self.autoResize = false;
                self._stopDrag(self);
                self.autoResize = true;
                self._lastMove = null;
                self._opt.barMouseDown = false;
            };

            this._opt.eventHandlers.documentMouseMove = function (ev) {

                // P.P. 26 June 2015: Bug#200732: Even when the splitter is disabled, the splitbar is still draggable
                if (options.disabled) {
                    return;
                }

                var noCancel = true;
                self._currentMove = self._isTouch(ev) ?
                    ev.originalEvent.touches[ 0 ][ self._getOrientation("page") ] :
                        ev[ self._getOrientation("page") ];
                if (self._capturedElement && self._isDragging() && !self._isDrag) {
                    self._triggerResizeStarted();
                    self._isDrag = true;
                }
                if (self._capturedElement && self._isDragging()) {
                    noCancel = self._triggerResizing();
                }
                if (noCancel && self._isDragging()) {
                    self._performDrag(self, ev);
                } else {
                    return false;
                }
            };

            this._opt.eventHandlers.windowResize = function () {
                var noCancel = self._triggerLayoutRefreshing();
                if (noCancel) {
                    self._panelsLayout({ isWindowResize: true });
                    self._triggerLayoutRefreshed();
                }
            };

            $(document)
				.bind(this._getEvent("mouseup") + "." + this.element.attr("id"),
                    this._opt.eventHandlers.documentMouseUp)
				.bind(this._getEvent("mousemove") + "." + this.element.attr("id"),
                    this._opt.eventHandlers.documentMouseMove);

            $(window).bind("resize." + this.element.attr("id"),
                this._opt.eventHandlers.windowResize);

            this._addBarHandlers();
            this._addCollapseButtonHandlers($(this._splitter.bar.children()[ 0 ]), 0);
            this._addCollapseButtonHandlers($(this._splitter.bar.children()[ 1 ]), 1);
        },
        _isDragging: function () {

            // S.T. 09 Septemeber 2014 #173602
            // Ignore drag delta when an user use iframes inside the panel.
            if (this.element.find("iframe").length) {
                return true;
            }

            return Math.abs(this._currentMove - this._lastMove) > this.options.dragDelta;
        },
        _addBarHandlers: function () {
            var self = this,
                splitter = this._splitter,
                options = this.options;

            splitter.bar
                .bind(this._getEvent("mousedown"), {
                    self: this
                }, this._startDrag)
			    .bind(this._getEvent("mousedown"), function () {

			        // P.P. 26 June 2015: Bug#200732: Even when the splitter is disabled, the splitbar is still draggable
			        if (options.disabled) {
			            return;
			        }

			        self._opt.barMouseDown = true;
			    });

            this._splitter.bar.find("." + this.css.resizeHandler + "-" + this.options.orientation)
                .bind(this._getEvent("mousedown"), {
                    self: this
                }, this._startDrag);

            splitter.bar.bind(this._getEvent("keydown"), {
                self: this
            }, this._kbNavigation);

            //T.P. Bug #155452 fix _addBarHandlers so when under mobile devices mouseenter and mouseleave are not binded
            if (!this._isTouch()) {
                splitter.bar.bind(this._getEvent("mouseenter"), function () {

                    // P.P. 26 June 2015: Bug#200732: Even when the splitter is disabled, the splitbar is still draggable
                    if (options.disabled) {
                        return;
                    }

                    $(this).addClass(self.css.barHover);
                });
                splitter.bar.bind(this._getEvent("mouseleave"), function () {

                    // P.P. 26 June 2015: Bug#200732: Even when the splitter is disabled, the splitbar is still draggable
                    if (options.disabled) {
                        return;
                    }

                    $(this).removeClass(self.css.barHover);
                });
            }
            splitter.bar.bind(this._getEvent("focus"), function () {

                // P.P. 26 June 2015: Bug#200732: Even when the splitter is disabled, the splitbar is still draggable
                if (options.disabled) {
                    return;
                }

                $(this).addClass(self.css.barActive);
            });
            splitter.bar.bind(this._getEvent("blur"), function () {

                // P.P. 26 June 2015: Bug#200732: Even when the splitter is disabled, the splitbar is still draggable
                if (options.disabled) {
                    return;
                }

                $(this).removeClass(self.css.barActive);
            });
        },
        _kbNavigation: function (event) {
            var splitter = event.data.self,
                noCancel = true;

            // P.P. 26 June 2015: Bug#200732: Even when the splitter is disabled, the splitbar is still draggable
            if (splitter.options.disabled) {
                return;
            }

            // Right/Down
            if (event.keyCode === $.ui.keyCode[ splitter._getOrientation("keyboard")[ 0 ] ]) {
                if (event.ctrlKey) {
                    splitter._stopDrag(splitter, true, true);
                    if (splitter._panels[ 1 ].options.collapsed) {
                        splitter.expandAt(1);
                    } else if (!splitter._panels[ 0 ].options.collapsed) {
                        splitter.collapseAt(0);
                    }
                } else {
                    splitter._startDrag(event);
                    splitter._kbMove -= splitter._kbLockRight ? 0 : splitter._getStep();
                    if (splitter._capturedElement && !splitter._isDrag) {
                        splitter._triggerResizeStarted();
                        splitter._isDrag = true;
                    }
                    if (splitter._capturedElement) {
                        noCancel = splitter._triggerResizing();
                    }
                    if (noCancel) {
                        splitter._performDrag(splitter, event);
                    } else {
                        return false;
                    }
                    if (splitter._capturedElement && splitter._capturedElement
                        .hasClass(splitter.css.barInvalid)) {
                        splitter._kbLockRight = true;
                        splitter._kbLockLeft = false;
                    } else {
                        splitter._kbLockRight = false;
                        splitter._kbLockLeft = false;
                    }
                }
                event.preventDefault();

                // Left/Up
            } else if (event.keyCode ===
                $.ui.keyCode[ splitter._getOrientation("keyboard")[ 1 ] ]) {
                if (event.ctrlKey) {
                    splitter._stopDrag(splitter, true, true);
                    if (splitter._panels[ 0 ].options.collapsed) {
                        splitter.expandAt(0);
                    } else if (!splitter._panels[ 1 ].options.collapsed) {
                        splitter.collapseAt(1);
                    }
                } else {
                    splitter._startDrag(event);
                    splitter._kbMove += splitter._kbLockLeft ? 0 : splitter._getStep();
                    if (splitter._capturedElement && !splitter._isDrag) {
                        splitter._triggerResizeStarted();
                        splitter._isDrag = true;
                    }
                    if (splitter._capturedElement) {
                        noCancel = splitter._triggerResizing();
                    }
                    if (noCancel) {
                        splitter._performDrag(splitter, event);
                    } else {
                        return false;
                    }
                    if (splitter._capturedElement &&
                        splitter._capturedElement.hasClass(splitter.css.barInvalid)) {
                        splitter._kbLockRight = false;
                        splitter._kbLockLeft = true;
                    } else {
                        splitter._kbLockRight = false;
                        splitter._kbLockLeft = false;
                    }
                }
                event.preventDefault();
            } else if (event.keyCode === $.ui.keyCode.ENTER ||
                event.keyCode === $.ui.keyCode.SPACE) {
                splitter._stopDrag(splitter, false, true);
                event.preventDefault();
            } else if (event.keyCode === $.ui.keyCode.ESCAPE) {
                splitter._stopDrag(splitter, true);
            } else if (event.keyCode === $.ui.keyCode.TAB) {
                splitter._stopDrag(splitter, false, true);
            }
        },
        _startDrag: function (event) {
            var left, right, capturedElementOffset,
                splitter = event.data.self;

            // P.P. 26 June 2015: Bug#200732: Even when the splitter is disabled, the splitbar is still draggable
            if (splitter.options.disabled) {
                return;
            }

            splitter._splitter.bar.focus();
            splitter._resizeArea = splitter._splitter;
            if (splitter._resizeArea !== null) {
                if ((splitter._resizeArea.left.options.resizable === undefined ||
                    splitter._resizeArea.left.options.resizable) &&
                        (splitter._resizeArea.right.options.resizable === undefined ||
                            splitter._resizeArea.right.options.resizable)) {
                    left = splitter._resizeArea.left;
                    right = splitter._resizeArea.right;
                    if ((!left.options.collapsed && !right.options.collapsed) &&
                        !(right.options.max <= right[ splitter._getOrientation("outerSize") ]() &&
                            left.options.max <= left[ splitter._getOrientation("outerSize") ]())) {
                        if (!splitter._capturedElement) {
                            splitter._lastMove = splitter._isTouch(event) ?
                                event.originalEvent.touches[ 0 ][
                                    splitter._getOrientation("page") ] :
                                event[ splitter._getOrientation("page") ];

                            if ($(event.target).is("span")) {
                                splitter._capturedElement =
                                    splitter._clone($($(event.target).parent())
                                        .parent(), splitter);
                            } else {
                                splitter._capturedElement =
                                    splitter._clone(event.target, splitter);
                            }

                            //S.T. 8 May 2013
                            //In IE7 and IE8 left and right are 0 in some reason. This make them to return correct values.
                            // T.I. 29th Feb 2016 - Bug #207372 - Containers are not positioned correctly in a zoomer browser window
                            capturedElementOffset = $.ig.util.offset(splitter._capturedElement);
                            splitter._startX = capturedElementOffset.left;
                            splitter._startY = capturedElementOffset.top;
                            splitter._kbMove = 0;
                            splitter._kbLockLeft = false;
                            splitter._kbLockRight = false;
                            splitter._mouseStartX = splitter._isTouch(event) ?
                                event.originalEvent.touches[ 0 ].pageX : event.pageX;
                            splitter._mouseStartY = splitter._isTouch(event) ?
                                event.originalEvent.touches[ 0 ].pageY : event.pageY;
                        }
                    }
                }
                return false;
            }
            return false;
        },

        _clone: function (bar, splitter) {
            var opt = this._opt,
				$bar = $(bar),
				clonedBar = $bar.clone(),

                // T.I. 29th Feb 2016 - Bug #207372 - Containers are not positioned correctly in a zoomer browser window
				offset = $.ig.util.offset($bar);

            clonedBar.css({
                position: "absolute",
                top: offset.top,
                left: offset.left,
                "z-index": 9999
            }).fadeTo(0, 0.7);

            // Z.K. Bug #201281 Click event does not fire on the click of the splitter.
            // This is happening because the bar element is cloned and the click event is not fired.
            // In order to overcome this mouse up and down events are handled and on mouse up "click" is triggered
            clonedBar.mouseup(function () {

                if (splitter.options.orientation === "vertical") {
                    if (opt.barMouseDown && Math.round(offset.left) ===
                        Math.round($.ig.util.offset(clonedBar).left)) {
                        $bar.trigger("click");
                    }
                } else {
                    if (opt.barMouseDown && Math.round(offset.top) ===
                        Math.round($.ig.util.offset(clonedBar).top)) {
                        $bar.trigger("click");
                    }
                }

                opt.barMouseDown = false;
            });

            $(document.body).append(clonedBar);
            return clonedBar;
        },
        _addCollapseButtonHandlers: function (button, index) {
            var self = this,
                 options = this.options;

            button.bind(this._getEvent("mouseenter"), function (e) {
                // P.P. 26 June 2015: Bug#200732: Even when the splitter is disabled, the splitbar is still draggable
                if (options.disabled) {
                    return;
                }

                $($(this).parent()).removeClass(self.css.barHover);
                $(this).addClass(self.css.collapseButtonHover);
                if (e.stopPropagation !== undefined) {
                    e.stopPropagation();
                }
                if (e.preventDefault !== undefined) {
                    e.preventDefault();
                }
                return false;
            });
            button.bind(this._getEvent("mouseleave"), function () {
                // P.P. 26 June 2015: Bug#200732: Even when the splitter is disabled, the splitbar is still draggable
                if (options.disabled) {
                    return;
                }

                $($(this).parent()).addClass(self.css.barHover);
                $(this).removeClass(self.css.collapseButtonHover);
            });
            button.bind("mousedown touchstart", function (e) {
                // P.P. 26 June 2015: Bug#200732: Even when the splitter is disabled, the splitbar is still draggable
                if (options.disabled) {
                    return;
                }

                $(this).toggleClass(self.css.collapseButtonPressed);
                if (self._panels[ index ].options.collapsed) {
                    self.expandAt(index);
                } else {
                    self.collapseAt(index);
                }
                if (e.stopPropagation !== undefined) {
                    e.stopPropagation();
                }
                if (e.preventDefault !== undefined) {
                    e.preventDefault();
                }
                return false;
            });
        },
        _performDrag: function (self, ev) {
            var page = self._isTouch(ev) ?
                ev.originalEvent.touches[ 0 ][ self._getOrientation("page") ] :
                ev[ self._getOrientation("page") ], bar;
            if (self._capturedElement) {
                if (ev.type === "keydown") {
                    bar = self[ self._getOrientation("start") ] + self._kbMove;
                } else {
                    bar = (page - self[ self._getOrientation("mouse") ]) +
                        self[ self._getOrientation("start") ];
                }
                self._moveBar(bar);
                return false;
            }
            return true;
        },
        _moveBar: function (bar) {
            bar = this._validatePosition(bar);
            if (bar.invalid) {
                this._capturedElement.addClass(this.css.barInvalid);
            } else {
                this._capturedElement.removeClass(this.css.barInvalid);
            }
            this._capturedElement.css(this._getOrientation("dimention"), bar.position);
        },
        _validatePosition: function (bar) {
            var resizeArea = this._resizeArea,
				rightBoundary = this._getNextBoundary(resizeArea),
				getPreviousBoundary = this._getPreviousBoundary(resizeArea),
				min = Math.min(rightBoundary, rightBoundary -
                    resizeArea.right.options.min, getPreviousBoundary +
                    resizeArea.left.options.max),
				max = Math.max(getPreviousBoundary, getPreviousBoundary +
                    resizeArea.left.options.min, rightBoundary -
                    resizeArea.right.options.max),
				pos;
            if (max > min) {
                pos = resizeArea.right.offset()[ this._getOrientation("dimention") ] -
                    this._capturedElement[ this._getOrientation("outerSize") ](true);
                return {
                    position: pos,
                    invalid: true
                };
            }
            if (bar < max) {
                return {
                    position: max,
                    invalid: true
                };
            }
            if (bar > min) {
                return {
                    position: min,
                    invalid: true
                };
            }
            return {
                position: bar,
                invalid: false
            };
        },
        _getNextBoundary: function (panel) {
            var size = panel.right.offset()[ this._getOrientation("dimention") ] +
                panel.right[ this._getOrientation("size") ]() -
                this._capturedElement[ this._getOrientation("outerSize") ](true);
            if (panel.right.options.collapsed) {
                size -= panel.right.options.min;
            }
            return size;
        },
        _getPreviousBoundary: function (panel) {
            var size = panel.left.offset()[ this._getOrientation("dimention") ];
            if (panel.left.options.collapsed) {
                size += panel.left.options.min;
            }
            return size;
        },
        _stopDrag: function (self, cancel, kbMove) {
            if (self._capturedElement) {
                if (!cancel && (self._isDrag || kbMove)) {
                    self._performAreaResize();
                }
                self._capturedElement.remove();
                self._isDrag = false;
            }
            self._capturedElement = null;
        },
        _performAreaResize: function () {
            var resizeArea = this._resizeArea,

                // T.I. 29th Feb 2016 - Bug #207372 - Containers are not positioned correctly in a zoomer browser window
				offset = $.ig.util.offset(this._capturedElement)[
                    this._getOrientation("dimention") ] - this[ this._getOrientation("start") ],
				left = resizeArea.left[ this._getOrientation("size") ]() + offset,
				right = resizeArea.right[ this._getOrientation("size") ]() - offset;
            this._setPanelSize(resizeArea.left, left);
            this._setPanelSize(resizeArea.right, right);
            if (offset !== 0) {
                this._triggerResizeEnded();
            }
            this._splittersLayout();
        },
        _splittersLayout: function () {
            var splitters = $.data(document.body, "ig-splitters") || [ ],
                $currSplitter, i;
            for (i = 0; i < splitters.length; i++) {
                $currSplitter = splitters[ i ];
                if ($currSplitter === this.element) {
                    $currSplitter.data("igSplitter")._panelsLayout();
                } else if (this.options.resizeOtherSplitters) {
                    // D.A. 29th April 2014, Bug #164471 Added option whether the other splitters on the page should be resized
                    $currSplitter.data("igSplitter")._panelsLayout();
                }
            }
        },

        // D.A. 9th September 2014, Bug #179805 When zoomed in Chrome and Firefox the outer width
        // of the splitbar becomes float number (e.g. from 6px to 5.9994px) and jquery rounds it down to 5.
        // We should round it up to correctly work with zoomed environment
        _getSplitBarSize: function () {
            var style, innerSize, border, size,
                elem = this._splitter.bar[ 0 ],
                sizeKey = this._const.orientations[ this.options.orientation ].size;

            if (window.getComputedStyle) {
                style = window.getComputedStyle(elem, null);
            } else {
                style = elem.currentStyle;
            }

            innerSize = style[ sizeKey ];
            border = style.borderLeftWidth;
            size = parseFloat(innerSize) + 2 * parseFloat(border);

            return Math.ceil(size);
        },
        /* parameterObject properties:
            - isWindowResize - determines whether the method is called when the window is resized
            - isInit - determines whether the method is called on widget initialization
        */
        _panelsLayout: function (parameterObject) {
            var i, $currChild, $currChildChildren, oppositeSize, panelsSizeInPercentages,
                outerSize = (this._panels.length - 1) * this._getSplitBarSize(),
                sizeKey = this._getOrientation("size"),
                oppositeSizeKey = this._getOrientation("oppositeSize"),
				size = this._getSize(sizeKey),
			    $splitBarChildren = this._splitter.bar.children(),
			    regExp = new RegExp("%"),
                cloneObjPanels = this._opt.calculateSizeCloneObject.panels, outerOppositeSizeKey;

            for (i = 0; i < this._panels.length; i++) {
                if (!this._panels[ i ].options.collapsed) {
                    outerSize += this._handlerPanelSize(this._panels[ i ], outerSize, size);
                } else {
                    $currChild = $splitBarChildren.eq(i);
                    $currChildChildren = $currChild.children();

                    this._handlerPanelSize(this._panels[ i ], outerSize, size);
                    $splitBarChildren.eq((i + 1) % 2).hide();

                    $currChild
                        .removeClass(this.css[ this.options.orientation + "CollapseButton" +
                            (i % 2 === 0 ? "Left" : "Right") + "Expanded" ])
                        .addClass(this.css[ this.options.orientation + "CollapseButton" +
                            (i % 2 === 0 ? "Left" : "Right") + "Collapsed" ]);

                    $currChildChildren
                        .removeClass(this.css[ this.options.orientation + "CollapseButton" +
                            (i % 2 === 0 ? "Left" : "Right") + "ExpandedIcon" ])
                        .addClass(this.css[ this.options.orientation + "CollapseButton" +
                            (i % 2 === 0 ? "Left" : "Right") + "CollapsedIcon" ]);
                }
            }

            // Test whether the splitter size is in percentage
            if (regExp.test(this.options[ sizeKey ]) || !this.options[ sizeKey ]) {
                if (parameterObject && parameterObject.isWindowResize) {
                    this._calculateSizeWithClone();
                } else {
                    cloneObjPanels[ 0 ].options = {
                        min: this._getPanelInitMin(0),
                        max: this._getPanelInitMax(0)
                    };

                    cloneObjPanels[ 1 ].options = {
                        min: this._getPanelInitMin(1),
                        max: this._getPanelInitMax(1)
                    };

                    // Test whether some panel size is in percentage
                    // P.P. 06-July-2015 #202331: Handle undefined panels resizing
                    if (this._isPercentLayout || !this.options.panels.length ||
                        (this.options.panels[ 0 ] === undefined ||
                            this.options.panels[ 0 ].size === undefined) &&
                        (this.options.panels[ 1 ] === undefined ||
                            this.options.panels[ 1 ].size === undefined)) {
                        panelsSizeInPercentages =
                            this._getPanelsSizeInPercentages.call(this, sizeKey);
                        cloneObjPanels[ 0 ].options.size = panelsSizeInPercentages[ 0 ];
                        cloneObjPanels[ 1 ].options.size = panelsSizeInPercentages[ 1 ];
                    } else {
                        cloneObjPanels[ 0 ].options.size =
                            this.options.panels[ 0 ] && this.options.panels[ 0 ].size &&
                            this._panels[ 0 ].options.size;
                        cloneObjPanels[ 1 ].options.size =
                            this.options.panels[ 1 ] && this.options.panels[ 1 ].size &&
                                this._panels[ 1 ].options.size;
                    }

                    // P.P. 26-Oct-2015 #202982: Set min/max of panels on splitter init)
                    if (parameterObject && parameterObject.isInit) {
                        this._calculateSizeWithClone();
                    }

                    if (outerSize < size && !(parameterObject && parameterObject.isInit)) {
                        this._createPanel(size, outerSize, this._panels.length - 1);
                    }
                }
            } else if (outerSize < size) { // Handles cases when panel 2 is enlarged on window resize. Splitter - fixed size.
                this._createPanel(size, outerSize, this._panels.length - 1);
            }

            oppositeSize = this.element[ oppositeSizeKey ]();

            // T.I. 5th April 2016,  Bug #217010 Resizing of the splitter causes
            // enlarge of the opposite size to with 2px constantly
            outerOppositeSizeKey = "outer" + oppositeSizeKey.charAt(0).toUpperCase() +
                oppositeSizeKey.slice(1);
            if (oppositeSize === this._splitter.bar[ outerOppositeSizeKey ](true)) {
                oppositeSize -= this._splitter.bar[ outerOppositeSizeKey ](true) -
                    this._splitter.bar[ oppositeSizeKey ]();
            }

            this._splitter.bar[ oppositeSizeKey ](oppositeSize);
            $splitBarChildren.eq(2).find("span")[ oppositeSizeKey ](oppositeSize);
        },

        // P.P. 22 June 2015, Bug #194300 Max/min options are not properly reapplied
        // when using a percentage width for the splitter and resizing the browser window

        // This method uses clone of the splitter to calculate the size of the panels
        _calculateSizeWithClone: function () {
            var $splitterClone, sizeWithoutBarSize, panel1RecalculatedSize,
                panel2RecalculatedSize, min, max,
                oppositeSizeKey = this._getOrientation("oppositeSize"),
                cloneObj = this._opt.calculateSizeCloneObject,
                cloneObjPanels = cloneObj.panels,
                $bar = cloneObj.bar.element,
                $panel1 = cloneObjPanels[ 0 ].element,
                $panel2 = cloneObjPanels[ 1 ].element,
                sizeKey = this._getOrientation("size"),
                outerSizeKey = "outer" + sizeKey.charAt(0).toUpperCase() + sizeKey.slice(1),
                minSize = "min-" + sizeKey,
                maxSize = "max-" + sizeKey,
                cssObj = {},
                size = this._getSize(sizeKey),
                barSize = this._getSplitBarSize(),
                panel1Size = cloneObjPanels[ 0 ].options.size,
                panel2Size = cloneObjPanels[ 1 ].options.size &&
                            /%/.test(cloneObjPanels[ 1 ].options.size) ?
                            size * cloneObjPanels[ 1 ].options.size.replace("%", "") / 100 -
                                barSize :
                            cloneObjPanels[ 1 ].options.size,
                isPanel1Collapsed = this._panels[ 0 ].options.collapsed,
                isPanel2Collapsed = this._panels[ 1 ].options.collapsed,
                isAnyPanelCollapsed = isPanel1Collapsed || isPanel2Collapsed;

            if (!cloneObj.element || !$panel1 || !$panel2 || !$bar) {
                $splitterClone = this.element.clone().html("");
                $splitterClone
                    .removeAttr("id")
                    .css({
                        top: -99999,
                        left: -99999,
                        position: "absolute"
                    })
                    .addClass("calc-size-clone"); // very helpful for debug, but still not public class

                $panel2 = $("<div>");

                // M.P.: Fix for bug 204402 - Missing TypeScript definitions for igQRCodeBarcode, igZoombar, igSplitter, igSplitButton.
                // API docs parser throws an error for the following syntax: cssObj.float = "right", because "float" is reserved word in the grammar.
                cssObj = { "float": "right" };
                cssObj[ oppositeSizeKey ] = "100%";
                $panel2.prop("className", this._panels[ 1 ].prop("className"));
                $panel2.css(cssObj).appendTo($splitterClone);

                $bar = $("<div>");
                $bar.css(cssObj).appendTo($splitterClone);

                cssObj = {};
                cssObj[ oppositeSizeKey ] = "100%";
                cssObj.overflow = "hidden";
                $panel1 = $("<div>");
                $panel1.prop("className", this._panels[ 0 ].prop("className"));
                $panel1.css(cssObj).appendTo($splitterClone);
                cssObj = {};

                cloneObj.element = $splitterClone;
                cloneObjPanels[ 0 ].element = $panel1;
                cloneObjPanels[ 1 ].element = $panel2;
                cloneObj.bar.element = $bar;
            }

            cssObj[ maxSize ] = isAnyPanelCollapsed ? "" : cloneObjPanels[ 1 ].options.max;
            cssObj[ minSize ] = isAnyPanelCollapsed ? 0 : cloneObjPanels[ 1 ].options.min;
            cssObj[ sizeKey ] = isPanel2Collapsed ? 0 : isPanel1Collapsed ? size : panel2Size;
            $panel2.css(cssObj);

            $bar[ sizeKey ](barSize);

            cssObj[ maxSize ] = isAnyPanelCollapsed ? "" : cloneObjPanels[ 0 ].options.max;
            cssObj[ minSize ] = isAnyPanelCollapsed ? 0 : cloneObjPanels[ 0 ].options.min;
            cssObj[ sizeKey ] = isPanel1Collapsed ? 0 : isPanel2Collapsed ? size -
                barSize + "px" : panel1Size;
            $panel1.css(cssObj);

            cloneObj.element[ sizeKey ](this.element[ sizeKey ]());
            cloneObj.element.appendTo($("body"));

            // Need to check panels and splitter sizes after they are placed in the clone object
            sizeWithoutBarSize = size - barSize;
            panel2RecalculatedSize = sizeWithoutBarSize - $panel1[ sizeKey ]();

            // P.P. 06-July-2015 #202331: Handle undefined panels resizing
            // on window resize when splitter is defined in %s;
            // else condition: resize panel1 only if panel2 size is 0 or undefined
            if (panel2Size === undefined && panel1Size === undefined) {
                // Handle only first panel,
                //the second one will be handled in the panel2 recalculate code block below
                $panel1[ sizeKey ](this._opt.defaultPanelSize);
            } else if ($panel1[ sizeKey ]() > sizeWithoutBarSize &&
                        !this._panels[ 1 ].options.size) {
                // P.P. 06-July-2015 #202332: Handle panel1 resizing (on  window resize)
                // when splitter is smaller than the panel and defined in %s
                $panel1[ sizeKey ](sizeWithoutBarSize);
            }

            // P.P. 06-July-2015 #201886: the panel drops down when has fixed size
            // and the window is resized below this size
            // P.P. 29-June-2015 #201887: when only panel1 is defined with fixed size
            if ($panel2[ sizeKey ]() !== panel2RecalculatedSize ||
                panel2Size === undefined && panel1Size !== undefined) {

                // When first panel and splitter size are undefined and only second panel is defined
                if (panel1Size === undefined && panel2Size > 0 && !this.options[ sizeKey ]) {
                    // P.P. 21-July-2016 #222056: igSplitter makes the second panel
                    //take the whole width if width for the first panel is not set

                    if (sizeWithoutBarSize < panel2Size) { // when resize window under panel 2 size
                        $panel1[ sizeKey ](0);
                        $panel2[ sizeKey ](panel2RecalculatedSize);
                    } else {
                        panel1RecalculatedSize = sizeWithoutBarSize - panel2Size;
                        $panel1[ sizeKey ](panel1RecalculatedSize);
                    }
                } else {
                    $panel2[ sizeKey ](panel2RecalculatedSize);
                }
            }

            // P.P. 1 Sep 2015 #202984 - On window resize of splitter, panel drops down, if min/max limitations of the panels are conflicted
            if ($panel1[ outerSizeKey ]() + $panel2[ outerSizeKey ]() +
                barSize !== cloneObj.element[ sizeKey ]()) {
                this._resolveSizeConflictsOfCloneObject($panel1, $panel2,
                    cloneObj.element, sizeKey);
            }

            // P.P. 1 Sep 2015 #201087 - Splitter cannot be resized if size is in percentage and window is resized
            this._resolveRoundingConflictsOfCloneObject($panel1, $panel1.css(minSize),
                $panel2, size, sizeKey);
            this._resolveRoundingConflictsOfCloneObject($panel2, $panel2.css(minSize),
                $panel1, size, sizeKey);

            this._setPanelSize(this._panels[ 1 ], $panel2[ sizeKey ]());

            if ($panel2.css(minSize) && $panel2.css(minSize) !== "none" && !isAnyPanelCollapsed) {
                min = $panel2.css(minSize);
                this._setPanelActualMin(1, min);
            } else {
                this._panels[ 1 ].css(minSize, "");
            }

            if ($panel2.css(maxSize) && $panel2.css(maxSize) !== "none" && !isAnyPanelCollapsed) {
                max = $panel2.css(maxSize);
                this._setPanelActualMax(1, max);
            } else {
                this._panels[ 1 ].css(maxSize, "");
            }

            this._setPanelSize(this._panels[ 0 ], $panel1[ sizeKey ]());

            if ($panel1.css(minSize) && $panel1.css(minSize) !== "none" && !isAnyPanelCollapsed) {
                min = $panel1.css(minSize);
                this._setPanelActualMin(0, min);
            } else {
                this._panels[ 0 ].css(minSize, "");
            }

            if ($panel1.css(maxSize) && $panel1.css(maxSize) !== "none" && !isAnyPanelCollapsed) {
                max = $panel1.css(maxSize);
                this._setPanelActualMax(0, max);
            } else {
                this._panels[ 0 ].css(maxSize, "");
            }

            cloneObj.element.detach();
        },

        // P.P. 1 Sep 2015 #202984 - On window resize of splitter, panel drops down, if min/max limitations of the panels are conflicted
        // The implemented logic should be: (highest to lowest priority)
        // (1) panel1 min/max; (2) panel2 min/max; (3) panel1 size; (4) panel2 size
        _resolveSizeConflictsOfCloneObject: function (clonePanel1, clonePanel2,
            cloneSplitter, sizeKey) {
            var barSize = this._getSplitBarSize(),
                size = cloneSplitter[ sizeKey ](),
                size1 = this._getSizeInPixels(clonePanel1[ sizeKey ](), size),
                size2 = this._getSizeInPixels(clonePanel2[ sizeKey ](), size),
                outerSizeKey = "outer" + sizeKey.charAt(0).toUpperCase() + sizeKey.slice(1),
                outerSize1 = this._getSizeInPixels(clonePanel1[ outerSizeKey ](), size),
                outerSize2 = this._getSizeInPixels(clonePanel2[ outerSizeKey ](), size),
                clonePanel1NeededArea = size - barSize - size2,
                clonePanel2NeededArea = size - barSize - size1,
                clonePanel1Min = this._getSizeInPixels(clonePanel1.css("min-" + sizeKey), size),
                clonePanel2Min = this._getSizeInPixels(clonePanel2.css("min-" + sizeKey), size);

            if (size1 > clonePanel1NeededArea && (clonePanel1Min || clonePanel2Min)) {
                if (clonePanel1Min && !clonePanel2Min) {
                    clonePanel2[ sizeKey ](clonePanel2NeededArea);
                } else if (!clonePanel1Min && clonePanel2Min) {
                    if (clonePanel2NeededArea > clonePanel2Min) {
                        clonePanel2[ sizeKey ](clonePanel2NeededArea);
                    } else {
                        clonePanel2[ sizeKey ](clonePanel2Min);
                        clonePanel1[ sizeKey ](size - barSize - clonePanel2Min);
                    }
                } else {
                    // The minimum of both panels exist
                    if (clonePanel2NeededArea > clonePanel2Min) {
                        clonePanel2[ sizeKey ](clonePanel2NeededArea);
                    } else if (clonePanel1NeededArea > clonePanel1Min) {
                        clonePanel2[ sizeKey ](clonePanel2Min);
                        clonePanel1[ sizeKey ](size - barSize - clonePanel2Min);
                    } else {
                        // Both panels reached their minimums
                        clonePanel1[ sizeKey ](Math.floor(clonePanel1Min));
                        clonePanel2.css("min-" + sizeKey, size - barSize -
                            Math.floor(clonePanel1Min));
                    }
                }
            } else if (outerSize1 !== size - barSize - outerSize2 &&
                        (size1 !== outerSize1 || size2 !== outerSize2 )) {

                // panel2 has a lower priority, so it goes first
                if (size2 !== outerSize2) {
                    clonePanel2[ sizeKey ](size2 - (outerSize2 - size2));
                } // no if-else here because both panels' sizes can be wrong

                // get actual outer size
                outerSize2 = this._getSizeInPixels(clonePanel2[ outerSizeKey ](), size);

                if (outerSize1 !== size - barSize - outerSize2 && size1 !== outerSize1) {
                    clonePanel1[ sizeKey ](size1 - (outerSize1 - size1));
                }
            }
        },

        // P.P. 1 Sep 2015 #202984 - On window resize of splitter, panel drops down, if min/max limitations of the panels are conflicted
        _resolveRoundingConflictsOfCloneObject: function (checkedPanel, checkedPanelMin,
            oppositePanel, sizeSplitter, sizeKey) {
            // P.P. 1 Sep 2015 #201087 - Splitter cannot be resized if size is in percentage and window is resized
            var floatSize, diff, newSize,
                outerSizeKey = "outer" + sizeKey.charAt(0).toUpperCase() + sizeKey.slice(1),
                barSize = this._getSplitBarSize(); // actual float size that browser uses

            floatSize =
                Math.floor(checkedPanel[ 0 ].getBoundingClientRect()[ sizeKey ] * 1000) / 1000;
            diff = Math.abs(this._getSizeInPixels(checkedPanel[ outerSizeKey ]()) - floatSize);

            if (0 < diff && diff <= 1) {
                if (checkedPanelMin) {
                    checkedPanelMin = this._getSizeInPixels(checkedPanelMin, sizeSplitter);
                    diff = Math.abs(Math.floor(checkedPanelMin) - checkedPanelMin);
                    if (0 < diff && diff <= 1) {
                        checkedPanel.css("min-" + sizeKey, Math.floor(checkedPanelMin) + "px");
                    }
                }

                newSize = Math.floor(floatSize);
                checkedPanel[ sizeKey ](newSize + "px");
                oppositePanel[ sizeKey ](sizeSplitter - barSize - newSize + "px");
            }
        },

        // P.P. 1 Sep 2015 #202984 - On window resize of splitter, panel drops down, if min/max limitations of the panels are conflicted
        // Method returns size/min/max as number represents pixels
        _getSizeInPixels: function(candidateValue, sizeOfParentInPixels) {
            if (/%/.test(candidateValue)) {
                return parseFloat(sizeOfParentInPixels * (candidateValue.replace("%", "")) / 100);
            } else {
                return parseFloat(candidateValue);
            }
        },

        // P.P 16-Jul-2015 #201087: If min is defined in %s, we should use it, otherwise use the fixed value in pixels
        _getPanelInitMin: function (panelIndex) {
            var optionsPanel = this.options.panels[ panelIndex ];
            return optionsPanel && (optionsPanel._min || optionsPanel.min);
        },

        // P.P 16-Jul-2015 #201087: If max is defined in %s, we should use it, otherwise use the fixed value in pixels
        _getPanelInitMax: function (panelIndex) {
            var optionsPanel = this.options.panels[ panelIndex ];
            return optionsPanel && (optionsPanel._max || optionsPanel.max);
        },
        _getStep: function () {
            return this._const.step + this._splitter.bar[ this._getOrientation("size") ]();
        },
        _handlerPanelSize: function (panel, outerSize, size) {
            // S.T. 21 May 2013 #142543
            // If the layout is in percentage then keep aspect ration while resize the splitter.
            if (this._isPercentLayout) {
                if (panel.options._min !== undefined) {
                    panel.options.min = panel.options._min.replace("%", "") *
                        this._getSize(this._getOrientation("size")) / 100;
                }
                if (panel.options._max !== undefined) {
                    panel.options.max = panel.options._max.replace("%", "") *
                    this._getSize(this._getOrientation("size")) / 100;
                }
            }
            this._setPanelSize(panel, panel.options.size);
            var newSize;
            if (outerSize + panel.options.size >= size && !panel.options.collapsed) {
                newSize = size - outerSize;

                // S.T. 21 May 2013 #142543
                // If the layout is in percentage, break the layout.
                //newSize = Math.min(newSize, panel.options.max);
                //newSize = Math.max(newSize, panel.options.min);
                if (!panel.options.collapsed) {
                    if (this._isPercentLayout) {
                        panel[ this._getOrientation("size") ]((newSize /
                            this._getSize(this._getOrientation("size"))) * 100 + "%");
                    } else {
                        panel[ this._getOrientation("size") ](newSize);
                    }
                    panel.options.size = newSize;
                }
            }
            return panel[ this._getOrientation("outerSize") ](true);
        },
        _setPanelSize: function (panel, size) {
            if (!panel.options.collapsed) {
                panel.options.size = parseInt(size, 10);

                // S.T. 21 May 2013 #142543
                // If the layout is in percentage, it hides the scrolbar because it is break the layout
                if (panel.options.size === 0 ||
                    (this._isPercentLayout && panel.options.size <= $.ig.util.getScrollWidth())) {
                    panel.addClass(this.css.noScroll);
                } else {
                    panel.removeClass(this.css.noScroll);
                }
                if (this._isPercentLayout) {
                    // S.T. 21 May 2013 #142544
                    size = parseInt(size, 10);
                    panel[ this._getOrientation("size") ]((size /
                        this._getSize(this._getOrientation("size"))) * 100 + "%");
                } else {
                    panel[ this._getOrientation("size") ](size);
                }
            } else {
                panel.addClass(this.css.noScroll);
                panel[ this._getOrientation("size") ](0);
            }
        },

        // set the min value (and _min if needed) in this._panels[ x ].options, not in this.options.panels[ x ]
        _setPanelActualMin: function (panelIndex, min) {
            var convertedMin,
                panel = this._panels[ panelIndex ],
                sizeKey = this._getOrientation("size"),
                size = this._getSize(sizeKey);

            if (min === undefined) {
                return;
            }

            if (/%/.test(min)) {
                if (this._isInitMinDefinedInPercentages(panelIndex)) {
                    panel.options._min = min;
                }

                convertedMin = size * parseFloat(min, 10) / 100;
                panel.options.min = convertedMin;
            } else {
                min = parseInt(min, 10);

                if (this._isInitMinDefinedInPercentages(panelIndex)) {
                    convertedMin = (min / size) * 100;
                    panel.options._min = convertedMin + "%";
                }

                panel.options.min = min;
                min += "px";
            }

            if (!panel.options.collapsed) {
                panel.css("min-" + this._getOrientation("size"), min);
            }
        },

        // set the max value (and _max if needed) in this._panels[ x ].options, not in this.options.panels[ x ]
        _setPanelActualMax: function (panelIndex, max) {
            var convertedMax,
                panel = this._panels[ panelIndex ],
                sizeKey = this._getOrientation("size"),
                size = this._getSize(sizeKey);

            if (max === undefined) {
                return;
            }

            if (/%/.test(max)) {
                if (this._isInitMaxDefinedInPercentages(panelIndex)) {
                    panel.options._max = max;
                }

                convertedMax = size * parseFloat(max, 10) / 100;
                panel.options.max = convertedMax;
            } else {
                max = parseInt(max, 10);

                if (this._isInitMaxDefinedInPercentages(panelIndex)) {
                    convertedMax = (max / size) * 100;
                    panel.options._max = convertedMax + "%";
                }

                panel.options.max = max;
                max += "px";
            }

            if (!panel.options.collapsed) {
                panel.css("max-" + this._getOrientation("size"), max);
            }
        },
        _isInitMinDefinedInPercentages: function(panelIndex)
        {
            var initPanelOptions = this.options.panels[ panelIndex ];
            return initPanelOptions !== undefined && (initPanelOptions._min !== undefined ||
                /%/.test(initPanelOptions.min));
        },
        _isInitMaxDefinedInPercentages: function(panelIndex)
        {
            var initPanelOptions = this.options.panels[ panelIndex ];
            return initPanelOptions !== undefined && (initPanelOptions._max !== undefined ||
                /%/.test(initPanelOptions.max));
        },

        // overrideMax (boolean) - determines whether the max value of panel should be override on re-creation. Default set to true.
        _createPanel: function (size, outerSize, index, overrideMax) {
            var panel, newSize, panelSize, maxSize;

            if (overrideMax === undefined) {
                overrideMax = true;
            }

            if (index === undefined) {
                index = 0;
            }

            panel = this._panels[ index ];
            newSize = size - outerSize;
            panelSize = panel[ this._getOrientation("size") ]();
            maxSize = newSize + panelSize;

            // if (index <= this._panels.length) {
                if (panel.options.collapsed) {
                    this._panelHelper(outerSize, size);
                } else {
                    if (maxSize > panel.options.max && overrideMax) {
                        panel.options.max = maxSize;
                    }
                    if (this._isPercentLayout) {
                        panel[ this._getOrientation("size") ]((maxSize /
                            this._getSize(this._getOrientation("size"))) * 100 + "%");
                    } else {
                        panel[ this._getOrientation("size") ](maxSize);
                    }
                    panel.options.size = maxSize;
                }
            // } 
            // Dead code the index always is smaller than length of panels.
            // else {
            //     maxSize = Math.min(maxSize, panel.options.max);
            //     if (!panel.options.collapsed) {
            //         panel[ this._getOrientation("size") ](maxSize);
            //         panel.options.size = maxSize;
            //     } else {
            //         maxSize = panelSize = 0;
            //     }
            //     if (maxSize + (outerSize - panelSize) < size || panel.options.collapsed) {
            //         this._createPanel(size, (outerSize - panelSize) + maxSize, index - 1);
            //     }
            // }
        },
        _panelHelper: function (outerSize, size) {
            var panel, flag = false, i;
            for (i = 0; i < this._panels.length && !flag; i++) {
                panel = this._panels[ i ];
                if (!panel.options.collapsed) {
                    flag = true;
                }
            }
            panel[ this._getOrientation("size") ](size - outerSize +
                panel[ this._getOrientation("size") ]());
        },
        expandAt: function (index) {
            /* Expand the specified panel.
				paramType="int" optional="false" Specifies the index of the panel to expand.
			*/
            var neighborPanel,
                sizeProperty = this._getOrientation("size"),
                panel = this._panels[ index ];

            //animationDuration = 0;
            if (index <= this._panels.length && index >= 0 && panel.options.collapsed) {
                neighborPanel = this._panels[ index % 2 === 0 ? 1 : 0 ];
                panel.options.collapsed = false;
                panel.options.size = Math.min(panel.options.size,
                    neighborPanel[ this._getOrientation("size") ]());
                neighborPanel.options.size = neighborPanel[ this._getOrientation("size") ]() -
                    panel.options.size;
                this._splitter.bar.removeClass(this.css.barCollapsed);
                if (this._panels[ (index + 1) % 2 ].options.collapsible) {
                    $(this._splitter.bar.children()[ (index + 1) % 2 ]).show();
                }
                $(this._splitter.bar.children()[ index ])
                    .removeClass(this.css.collapseButtonPressed);
                $(this._splitter.bar.children()[ index ])
                    .removeClass(this.css[ this.options.orientation +
                        "CollapseButton" + (index % 2 === 0 ? "Left" : "Right") + "Collapsed" ]);
                $($(this._splitter.bar.children()[ index ]).children())
                    .removeClass(this.css[ this.options.orientation + "CollapseButton" +
                        (index % 2 === 0 ? "Left" : "Right") + "CollapsedIcon" ]);
                $(this._splitter.bar.children()[ index ])
                    .addClass(this.css[ this.options.orientation + "CollapseButton" +
                        (index % 2 === 0 ? "Left" : "Right") + "Expanded" ]);
                $($(this._splitter.bar.children()[ index ]).children())
                    .addClass(this.css[ this.options.orientation + "CollapseButton" +
                        (index % 2 === 0 ? "Left" : "Right") + "ExpandedIcon" ]);

                //A.T. 12 March 2013
                //this._animateResize(neighborPanel, neighborPanel.options.size, animationDuration);
                //this._animateResize(this._panels[ index ], this._panels[ index ].options.size, animationDuration);
                neighborPanel.css(sizeProperty, neighborPanel.options.size);
                panel.css(sizeProperty, panel.options.size);

                // P.P. 09-Fab-2016 #212740:Collapsible property is not compatible with min and max properties
                this._setPanelMinMax(panel);
                this._setPanelMinMax(neighborPanel);

                this._splittersLayout();
                this._triggerExpanded(index);
            }
        },
        collapseAt: function (index) {
            /* Collapse the specified panel.
				paramType="int" optional="false" Specifies the index of the panel to collapse.
			*/
            var size, neighborPanel,
                panel = this._panels[ index ],
                sizeProperty = this._getOrientation("size");

            //animationDuration = 0;
            if (index < this._panels.length && index >= 0 && !panel.options.collapsed &&
                panel.options.collapsible) {
                size = panel[ this._getOrientation("size") ]();
                neighborPanel = this._panels[ index % 2 === 0 ? 1 : 0 ];
                panel.options.size = size || panel.options.size;
                panel.options.collapsed = true;
                this._splitter.bar.addClass(this.css.barCollapsed);
                $(this._splitter.bar.children()[ (index + 1) % 2 ]).hide();
                $(this._splitter.bar.children()[ index ]).addClass(this.css.collapseButtonPressed);
                $(this._splitter.bar.children()[ index ])
                    .removeClass(this.css[ this.options.orientation + "CollapseButton" +
                        (index % 2 === 0 ? "Left" : "Right") + "Expanded" ]);
                $($(this._splitter.bar.children()[ index ]).children())
                    .removeClass(this.css[ this.options.orientation + "CollapseButton" +
                        (index % 2 === 0 ? "Left" : "Right") + "ExpandedIcon" ]);
                $(this._splitter.bar.children()[ index ])
                    .addClass(this.css[ this.options.orientation + "CollapseButton" +
                        (index % 2 === 0 ? "Left" : "Right") + "Collapsed" ]);
                $($(this._splitter.bar.children()[ index ]).children())
                    .addClass(this.css[ this.options.orientation + "CollapseButton" +
                        (index % 2 === 0 ? "Left" : "Right") + "CollapsedIcon" ]);
                neighborPanel.options.size =
                    neighborPanel[ this._getOrientation("size") ]() + size;

                //A.T. 12 March 2013
                //this._animateResize(neighborPanel, neighborPanel.options.size, animationDuration);
                //this._animateResize(this._panels[ index ], 0, animationDuration);
                neighborPanel.css(sizeProperty, neighborPanel.options.size);
                panel.css(sizeProperty, 0);

                // P.P. 09-Fab-2016 #212740:Collapsible property is not compatible with min and max properties
                this._clearPanelMinMax(panel);
                this._clearPanelMinMax(neighborPanel);

                this._splittersLayout();
                this._triggerCollapsed(index);
            }
        },

        // P.P. 09-Fab-2016 #212740: Collapsible property is not compatible with min and max properties
        _clearPanelMinMax: function (panel) {
            var sizeProperty = this._getOrientation("size");

            if (parseFloat(panel.css("min-" + sizeProperty))) {
                panel.css("min-" + sizeProperty, "");
            }

            if (panel.css("max-" + sizeProperty)) {
                panel.css("max-" + sizeProperty, "");
            }
        },

        // P.P. 09-Fab-2016 #212740: Collapsible property is not compatible with min and max properties
        _setPanelMinMax: function (panel) {
            var sizeProperty = this._getOrientation("size");

            if (panel.options && panel.options.min) {
                panel.css("min-" + sizeProperty, panel.options.min + "px");
            }

            if (panel.options && panel.options.max &&
                panel.options.max < this._opt.defaultPanelMaxSize) {
                panel.css("max-" + sizeProperty, panel.options.max + "px");
            }
        },

        // Currently not used
        // _animateResize: function (panel, size, animationDuration, callback) {
        //     var properties = {}, self = this;
        //     properties[ this._getOrientation("size") ] = size;
        //     panel.animate(properties, {
        //         step: function () {
        //             self._splittersLayout();
        //         },
        //         duration: animationDuration,
        //         complete: function () {
        //             self._splittersLayout();
        //             if (callback && typeof callback === 'function') {
        //                 callback();
        //             }
        //         }
        //     });
        // },
        _triggerCollapsed: function (index) {
            var args = { owner: this, index: index };
            this._trigger(this.events.collapsed, null, args);
        },
        _triggerExpanded: function (index) {
            var args = { owner: this, index: index };
            this._trigger(this.events.expanded, null, args);
        },
        _triggerResizeStarted: function () {
            var args = { owner: this },
                iframes = this.element.find("iframe");

            // S.T. 09 Septemeber 2014 #173602
            // Setting the pointer events to none enables firing mouse move event over iframe while dragging the bar. It"s working only in modern browsers.
            if (iframes.length > 0) {
                iframes.css("pointer-events", "none");
            }

            this._trigger(this.events.resizeStarted, null, args);
        },
        _triggerResizing: function () {
            var args = { owner: this };
            return this._trigger(this.events.resizing, null, args);
        },
        _triggerResizeEnded: function () {
            var args = { owner: this },
                iframes = this.element.find("iframe");

            // S.T. 09 Septemeber 2014 #173602
            // Restore the pointer events to auto.
            if (iframes.length > 0) {
                iframes.css("pointer-events", "auto");
            }

            this._trigger(this.events.resizeEnded, null, args);
        },
        _triggerLayoutRefreshing: function () {
            var args = { owner: this };
            return this._trigger(this.events.layoutRefreshing, null, args);
        },
        _triggerLayoutRefreshed: function () {
            var args = { owner: this };
            return this._trigger(this.events.layoutRefreshed, null, args);
        },
        firstPanel: function () {
            /* Retrieves the jQuery element of the first panel.
				returnType="object" Returns the jQuery object of the first panel element.
			*/
            return this._panels[ 0 ];
        },
        secondPanel: function () {
            /* Retrieves the jQuery element of the second panel.
				returnType="object" Returns the jQuery object of the second panel element.
			*/
            return this._panels[ 1 ];
        },
        refreshLayout: function () {
            /* You can refresh layout after the splitter is rendered in order to render it correctly.
			*/
            this._panelsLayout();
        },

        // S.T. 14 June 2013 #144685
        // Improve Splitter API with set method for panel's size
        setFirstPanelSize: function (size) {
            /*
			You can set new size of the first panel after the splitter is rendered.
			paramType="int|string" optional="false" Specifies the new size of the first panel.
			*/
            if (/%/.test(size)) {
                size = size.replace("%", "") * this._getSize(this._getOrientation("size")) / 100;
                this._isPercentLayout = true;
            }
            if (/px/.test(size)) {
                size = parseInt(size, 10);
            }
            this._setPanelSize(this._panels[ 0 ], size);
            this._splittersLayout();
        },

        // S.T. 14 June 2013 #144685
        // Improve Splitter API with set method for panel's size
        setSecondPanelSize: function (size) {
            /*
			You can set new size of the second panel after the splitter is rendered.
			paramType="int|string" optional="false" Specifies the new size of the second panel.
			*/
            if (/%/.test(size)) {
                size = size.replace("%", "") * this._getSize(this._getOrientation("size")) / 100;
                this._isPercentLayout = true;
            }
            if (/px/.test(size)) {
                size = parseInt(size, 10);
            }
            this._setPanelSize(this._panels[ 0 ],
                this._getSize(this._getOrientation("size")) - size);
            this._splittersLayout();
        },

        // P.P. 26 June 2015 Bug#201856 - handle window resize, when panel width > 100%
        // sizeKey (string); Determines whether width or height is needed for calculation
        // retyrnType - array; Array of both panel sizes in %s
        _getPanelsSizeInPercentages: function (sizeKey) {
            var size = this._getSize(sizeKey),
                barSize = this._getSplitBarSize(),
                panel1CalculatedSize = size - barSize === this._panels[ 0 ].options.size ?
                    100 :
                    this._panels[ 0 ].options.size / size * 100,
                panel1Size = panel1CalculatedSize < 0 ? 0 : panel1CalculatedSize > 100 ?
                    100 :
                    panel1CalculatedSize,
                panel2CalculatedSize = 100 - panel1Size,
                panel2Size = panel2CalculatedSize < 0 ?
                    0 :
                    panel2CalculatedSize > 100 ? 100 : panel2CalculatedSize;

            return [ panel1Size + "%", panel2Size + "%" ];
        },
        destroy: function () {
            /* Destructor */
            var evtHandlers = this._opt.eventHandlers,
				i, splitters, index;
            this._removeEventHandlers();
            this._removeClasses();
            this.element.html(this._htmlMarkup);
            splitters = $.data(document.body, "ig-splitters") || [ ];
            for (i = 0; i < splitters.length; i++) {
                if (splitters[ i ][ 0 ].id === this.element[ 0 ].id) {
                    index = i;
                    break;
                }
            }
            splitters.splice(index, 1);
            $.data(document.body, "ig-splitters", splitters);

            // D.A. 24th October 2013 Remove the attached events to window and document
            $(document).unbind(this._getEvent("mouseup"), evtHandlers.documentMouseUp);
            $(document).unbind(this._getEvent("mousemove"), evtHandlers.documentMouseMove);
            $(window).unbind("resize", evtHandlers.windowResize);
            $.Widget.prototype.destroy.apply(this, arguments);
            this._opt = null;
            return this;
        }
    });
    $.extend($.ui.igSplitter, { version: "<build_number>" });
}(jQuery));
