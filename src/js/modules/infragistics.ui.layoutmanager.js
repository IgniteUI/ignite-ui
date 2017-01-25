/*!@license
* Infragistics.Web.ClientUI Layout Manager <build_number>
*
* Copyright (c) 2011-<year> Infragistics Inc.
*
* http://www.infragistics.com/
*
* Depends on:
*	jquery-1.9.1.js
*	jquery.ui.core.js
*	jquery.ui.widget.js
*   infragistics.util.js
*/

(function (factory) {
    if (typeof define === "function" && define.amd) {

        // AMD. Register as an anonymous module.
        define([
            "jquery",
            "jquery-ui",
            "./infragistics.util"
        ], factory);
    } else {

        // Browser globals
        factory(jQuery);
    }
}
    (function ($) {
        /*
            igLayoutManager is a widget based on jQuery UI that implements different layout modes - flow layout, vertical layout,
            a border layout, which divides the container into left/right/footer/header/center regions, responsive and fluid column layout based on 12 columns,
            as well as a grid layout which allows items to be positioned at arbitrary places on the screen, and have variable row and col spans.
        */
        $.widget("ui.igLayoutManager", {
            css: {
                /* classes applied to an individual layout item */
                "item": "ig-layout-item",
                /* classes applied to the  main container element, on which the layout manager widget is instantiated */
                "container": "ig-layout",
                /* classes applied to an item that is part of a flow layout*/
                "flowItem": "ig-layout-flow-item",
                /* classes applied to the container when layout mode is flow*/
                "flow": "ig-layout-flow",
                /* classes applied to the container when layout mode is vertical */
                "vertical": "ig-layout-vertical",
                /* classes applied to the individual layout item, when layout is vertical*/
                "verticalItem": "ig-layout-vertical-item",
                /* classes applied to the container when layout mode is border */
                "border": "ig-layout-border",
                /* classes applied to the individual layout item, when layout is of border type */
                "borderItem": "ig-layout-border-item",
                /* classes applied to the hidden individual layout item, when layout is of border type */
                "borderItemHidden": "ig-layout-border-item-hidden",
                /* classes applied to the  header region of a border layout */
                "borderHeader": "ig-layout-border-header",
                /* classes applied to the  footer region of a border layout */
                "borderFooter": "ig-layout-border-footer",
                /* classes applied to the left region of a border layout */
                "borderLeft": "ig-layout-border-left",
                /* classes applied to the center region of a border layout */
                "borderCenter": "ig-layout-border-center",
                /* classes applied to the right region of a border layout */
                "borderRight": "ig-layout-border-right",
                /* classes applied to the  container element, when mode is border */
                "borderContainer": "ig-layout-border-container",
                /* classes applied to the item elements, when mode is grid and the items are absolutely positioned */
                "gridItemAbs": "ig-layout-griditem-abs",
                /* classes applied to the item elements, when mode is grid and the items are relatively positioned */
                "gridItemRel": "ig-layout-griditem-rel"
                /*
                "borderWrapper1": "ig-layout-border-wrapper1",
                "borderWrapper2": "ig-layout-border-wrapper2"
                */
            },
            options: {
                /* type="object" Options specific to a border layout
                ```
                // Initialize
                $('.selector').igLayoutManager({
                      layoutMode: "border",
                      borderLayout: {
                          leftWidth: "10%",
                          rightWidth:"20%",
                          showFooter: true,
                          showHeader: true,
                          showLeft: true,
                          showRight: true
                      }
                });

                // Get
                var borderLayout = $('.selector').igLayoutManager("option", "borderLayout");

                // Set
                $('.selector').igLayoutManager("option", "borderLayout", { leftWidth: "20%", rightWidth:"30%", showFooter: false });
                ```
                */
                borderLayout: {
                    /* type="string" Option specifying the width of the left region, either in px or percentages
                    ```
                    // Initialize
                    $('.selector').igLayoutManager({
                        layoutMode: "border",
                        borderLayout: {
                          leftWidth: "10%"
                        }
                    });

                    // Get
                    var borderLayout = $('.selector').igLayoutManager("option", "borderLayout");
                    var leftWidth = borderLayout.leftWidth;

                    // Set
                    $('.selector').igLayoutManager("option", "borderLayout", { leftWidth: "30%" });
                    ```
                    */
                    leftWidth: "20%",
                    /* type="string" Option specifying the width of the right region, either in px or percentages
                    ```
                    // Initialize
                    $('.selector').igLayoutManager({
                        layoutMode: "border",
                        borderLayout: {
                          rightWidth: "10%"
                        }
                    });

                    // Get
                    var borderLayout = $('.selector').igLayoutManager("option", "borderLayout");
                    var rightWidth = borderLayout.rightWidth;

                    // Set
                    $('.selector').igLayoutManager("option", "borderLayout", { rightWidth:"30%" });
                    ```
                    */
                    rightWidth: "10%",
                    /* type="bool" Option specifying whether the footer region in the border layout will be hidden or shown
                    ```
                    // Initialize
                    $('.selector').igLayoutManager({
                        layoutMode: "border",
                        borderLayout: {
                          showFooter: true
                        }
                    });

                    // Get
                    var borderLayout = $('.selector').igLayoutManager("option", "borderLayout");
                    var showFooter = borderLayout.showFooter;

                    // Set
                    $('.selector').igLayoutManager("option", "borderLayout", { showFooter: false });
                    ```
                    */
                    showFooter: true,
                    /* type="bool" Option specifying whether the header region in the border layout will be hidden or shown
                    ```
                    // Initialize
                    $('.selector').igLayoutManager({
                        layoutMode: "border",
                        borderLayout: {
                          showHeader: true
                        }
                    });

                    // Get
                    var borderLayout = $('.selector').igLayoutManager("option", "borderLayout");
                    var showHeader = borderLayout.showHeader;

                    // Set
                    $('.selector').igLayoutManager("option", "borderLayout", { showHeader: true });
                    ```
                    */
                    showHeader: true,
                    /* type="bool" Option specifying whether the left region in the border layout will be hidden or shown
                    ```
                    // Initialize
                    $('.selector').igLayoutManager({
                        layoutMode: "border",
                        borderLayout: {
                            showLeft: true
                        }
                    });

                    // Get
                    var borderLayout = $('.selector').igLayoutManager("option", "borderLayout");
                    var showLeft = borderLayout.showLeft;

                    // Set
                    $('.selector').igLayoutManager("option", "borderLayout", { showLeft: true });
                    ```
                    */
                    showLeft: true,
                    /* type="bool" Option specifying whether the right region in the border layout will be hidden or shown
                    ```
                    // Initialize
                    $('.selector').igLayoutManager({
                        layoutMode: "border",
                        borderLayout: {
                            showRight: true
                        }
                    });

                    // Get
                    var borderLayout = $('.selector').igLayoutManager("option", "borderLayout");
                    var showRight = borderLayout.showRight;

                    // Set
                    $('.selector').igLayoutManager("option", "borderLayout", { showRight: false });
                    ```
                    */
                    showRight: true
                },
                /* type="object" Options specific to grid layout mode
                ```
                    // Initialize
                    $('.selector').igLayoutManager({
                    layoutMode: "grid",
                    width: "500px",
                    height: "500px",
                    gridLayout: {
                        cols: 3,
                        rows: 3,
                        columnWidth: 200,
                        columnHeight: 200,
                        animationDuration : 500,
                        marginLeft: 10,
                        marginTop : 10,
                        rearrangeItems: true
                    },
                    items: [
                        {
                            rowSpan: 2, colSpan: 2, colIndex: 0, rowIndex: 0
                        },
                        {
                            rowSpan: 1, colSpan: 1, rowIndex: 0, colIndex: 1
                        },
                        {
                            rowSpan: 1, colSpan: 1, rowIndex: 0, colIndex: 2
                        }]
                    });

                    // Get
                    var gridLayout = $('.selector').igLayoutManager("option", "gridLayout");

                    // Set
                    $('.selector').igLayoutManager('option', 'gridLayout', { columnWidth: 400, columnHeight: 500 });
                ```
                */
                gridLayout: {
                    /* type="number" Specifies the duration of the animations in the layout manager"s grid layout
                    ```
                    // Initialize
                    $('.selector').igLayoutManager({
                        layoutMode: "grid",
                        gridLayout: {
                        animationDuration : 500
                        }
                    });

                    // Get
                    var gridLayout = $('.selector').igLayoutManager('option', 'gridLayout');
                    var animationDuration = gridLayout.animationDuration;

                    // Set
                    var gridLayout = $('.selector').igLayoutManager('option', 'gridLayout');
                    gridLayout.animationDuration = 500;
                    $('.selector').igLayoutManager('option', 'gridLayout', gridLayout);
                    ```
                    */
                    animationDuration: 500,
                    /* type="number" Number of columns in the grid
                    ```
                    //Initialize
                    $('.selector').igLayoutManager({
                        layoutMode: "grid",
                        gridLayout: {
                            cols : 3
                        }
                    });

                    //Get
                    var gridLayout = $('.selector').igLayoutManager('option', 'gridLayout');
                    var cols = gridLayout.cols;

                    // Set
                    var gridLayout = $('.selector').igLayoutManager('option', 'gridLayout');
                    gridLayout.cols = 4;
                    $('.selector').igLayoutManager('option', 'gridLayout', gridLayout);
                    ```
                    */
                    cols: null,
                    /* type="string|number" Accepts number or string with height in px or percents
                    ```
                    // Initialize
                    $('.selector').igLayoutManager({
                    layoutMode: "grid",
                    gridLayout: {
                        columnHeight: 200
                    }
                    });

                    // Get
                    var gridLayout = $('.selector').igLayoutManager('option', 'gridLayout');
                    var columnHeight = gridLayout.columnHeight;

                    // Set
                    $('.selector').igLayoutManager('option', 'gridLayout', { columnWidth: 400, columnHeight: 500});
                    ```
                    string The column height can be set in pixels (px), %, em and other units.
                    number The column height can be set as a number.
                    */
                    columnHeight: null,
                    /* type="string|number" Accepts number or string with width in px or percents
                    ```
                    //Initialize
                    $('.selector').igLayoutManager({
                        layoutMode: "grid",
                        gridLayout: {
                        columnWidth: 200
                        }
                    });

                    //Get
                    var gridLayout = $('.selector').igLayoutManager('option', 'gridLayout');
                    var columnWidth = gridLayout.columnWidth;

                    // Set
                    $('.selector').igLayoutManager('option', 'gridLayout', { columnWidth: 400, columnHeight: 500});
                    ```
                    string The column width can be set in pixels (px), %, em and other units.
                    number The column width can be set as a number.
                    */
                    columnWidth: null,
                    /* type="number" specifies the margin left css property for items
                    ```
                    // Initialize
                    $('.selector').igLayoutManager({
                        layoutMode: "grid",
                        width: "75%",
                        height: "500px",
                        gridLayout: {
                            marginLeft : 10
                        }
                    });

                    // Get
                    var gridLayout = $('.selector').igLayoutManager('option', 'gridLayout');
                    var marginLeft = gridLayout.marginLeft;

                    // Set
                    $('#.selector').igLayoutManager('option', 'gridLayout', { marginLeft: 15 });
                    ```*/
                    marginLeft: 0,
                    /* type="number" specifies the margin top css property for items
                    ```
                    // Initialize
                    $('.selector').igLayoutManager({
                        layoutMode: "grid",
                        gridLayout: {
                        marginTop : 10
                        }
                    });

                    // Get
                    var gridLayout = $('.selector').igLayoutManager('option', 'gridLayout');
                    var marginTop = gridLayout.marginTop;

                    // Set
                    $('#.selector').igLayoutManager('option', 'gridLayout', { marginTop: 15 });
                    ```
                    */
                    marginTop: 0,
                    /* type="boolean" Specifies whether the previous set options should be overriden when setting options
                    ```
                    // Initialize
                    $('.selector').igLayoutManager({
                        layoutMode: "grid",
                        gridLayout: {
                            overrideConfigOnSetOption : true
                        }
                    });

                    // Get
                    var gridLayout = $('.selector').igLayoutManager('option', 'gridLayout');
                    var overrideConfigOnSetOption = gridLayout.overrideConfigOnSetOption;
                    ```
                    */
                    overrideConfigOnSetOption: true,
                    /* type="boolean" Specified whether the items should rearrange to fit in the container when it is resized.
                        Have effect only when fixed columnWidth option is set.
                    ```
                    // Initialize
                    $('.selector').igLayoutManager({
                          layoutMode: "grid",
                          gridLayout: {
                              rearrangeItems: true
                        }
                    });

                    // Get
                    var gridLayout = $('.selector').igLayoutManager('option', 'gridLayout');
                    var rearrangeItems = gridLayout.rearrangeItems;

                    // Set
                    var gridLayout = $('.selector').igLayoutManager('option', 'gridLayout');
                    gridLayout.rearrangeItems = false;
                    $('.selector').igLayoutManager('option', 'gridLayout', gridLayout);
                    ```
                    */
                    rearrangeItems: true,
                    /* type="number" Number of rows in the grid
                    ```
                    // Initialize
                    $('.selector').igLayoutManager({
                        layoutMode: "grid",
                        width: "75%",
                        height: "500px",
                        gridLayout: {
                          rows : 3
                        }
                    });

                    // Get
                    var gridLayout = $('.selector').igLayoutManager('option', 'gridLayout');
                    var rows = gridLayout.rows;

                    // Set
                    var gridLayout = $('.selector').igLayoutManager('option', 'gridLayout');
                    gridLayout.rows = 4;
                    $('.selector').igLayoutManager('option', 'gridLayout', gridLayout);
                    ```
                    */
                    rows: null
                },
                /* type="number|string" Gets/Sets height of the layout container.
                ```
                // Initialize
                $('.selector').igLayoutManager({
                    layoutMode: "border",
                    height : "400px"
                });

                // Get
                var height = $('.selector').igLayoutManager("option", "height");

                // Set
                $('.selector').igLayoutManager("option", "height", "800px");
                ```
                string The default height can be set in pixels (px), %, em and other units.
                number The default height can be set as a number.
                */
                height: null,
                /* type="number" Number of items to render, this is only applicable to layouts: vertical and flow
                ```
                    // Initialize
                    $('.selector').igLayoutManager({
                        height : "300px",
                        layoutMode: "vertical",
                        itemCount: 10
                    });

                    // Get
                    var itemCount = $('.selector').igLayoutManager('option', 'itemCount');

                    // Set
                    $('.selector').igLayoutManager('option', 'itemCount', 2);
                ```
                */
                itemCount: null,
                /* type="array" an array of item descriptions
                    this assumes the container is empty, and every item
                    is described by rowspan, colspan, etc. - otherwise values of
                    1 are assumed
                    items can have various properties some of which may not be applicable
                    depending on the layoutMode.
                    for example rowSpan/colSpan/colIndex/rowIndex are only applicable to gridlayout
                ```
                // Initialize
                $('.selector').igLayoutManager({
                    layoutMode: "vertical",
                    items: [
                      {
                        width: "10%",
                        height: "150px"
                      },
                      {
                        width: "40%",
                        height: "250px"
                      },
                      {
                        width: "40%",
                        height: "150px"
                      },
                      {
                        width: "20%",
                        height: "150px"
                      },
                      {
                        width: "50%",
                        height: "150px"
                      }
                    ]
                });

                // Get
                var items = $('.selector').igLayoutManager('option', 'items');
                ```
                */
                items: [
                    {
                        /* type="number" column index of the item in the grid
                        ```
                        // Initialize
                        $('.selector').igLayoutManager({
                          layoutMode: "grid",
                          items: [
                            {
                                rowSpan: 2,
                                colSpan: 2,
                                colIndex: 0,
                                rowIndex: 0
                            },
                            {
                                rowSpan: 1,
                                colSpan: 1,
                                rowIndex: 0,
                                colIndex: 1
                            }]
                        });

                        // Get
                        var items = $('.selector').igLayoutManager('option', 'items');
                        var firstItemColIndex = items[0].colIndex;
                        ```
                        */
                        colIndex: 0,
                        /* type="number" colSpan of the item
                        ```
                        // Initialize
                        $('.selector').igLayoutManager({
                          layoutMode: "grid",
                          items: [
                            {
                                rowSpan: 2,
                                colSpan: 2,
                                colIndex: 0,
                                rowIndex: 0
                            },
                            {
                                rowSpan: 1,
                                colSpan: 1,
                                rowIndex: 0,
                                colIndex: 1
                            }]
                        });

                        // Get
                        var items = $('.selector').igLayoutManager('option', 'items');
                        var firstItemColSpan = items[0].colSpan;
                        ```
                        */
                        colSpan: 1,
                        /* type="string" Gets/Sets individual item height, either in px or percentage
                        string The default height can be set in pixels (px), %, em and other units.
                        ```
                        // Initialize
                        $('.selector').igLayoutManager({
                          layoutMode: "vertical",
                          items: [
                              {
                                  height: "150px"
                              },
                              {
                                  height: "250px"
                              },
                              {
                                  height: "150px"
                              },
                              {
                                  height: "150px"
                              },
                              {
                                  height: "150px"
                              }
                          ]
                        });

                        // Get
                        var items = $('.selector').igLayoutManager('option', 'items');
                        var firstItemHeight = items[0].height;
                        ```
                        */
                        height: null,
                        /* type="number" row index of the item in the grid
                        ```
                        // Initialize
                        $('.selector').igLayoutManager({
                          layoutMode: "grid",
                          items: [
                            {
                                rowSpan: 2,
                                colSpan: 2,
                                colIndex: 0,
                                rowIndex: 0
                            },
                            {
                                rowSpan: 1,
                                colSpan: 1,
                                rowIndex: 0,
                                colIndex: 1
                            }]
                        });

                        // Get
                        var items = $('.selector').igLayoutManager('option', 'items');
                        var firstItemRowIndex = items[0].rowIndex;
                        ```
                        */
                        rowIndex: 0,
                        /* type="number" rowSpan of the item
                        ```
                        // Initialize
                        $('.selector').igLayoutManager({
                          layoutMode: "grid",
                          items: [
                            {
                                rowSpan: 2,
                                colSpan: 2,
                                colIndex: 0,
                                rowIndex: 0
                            },
                            {
                                rowSpan: 1,
                                colSpan: 1,
                                rowIndex: 0,
                                colIndex: 1
                            }]
                        });

                        // Get
                        var items = $('.selector').igLayoutManager('option', 'items');
                        var firstItemRowSpan = items[0].rowSpan;
                        ```
                        */
                        rowSpan: 1,
                        /* type="number" Gets/Sets individual item width, either in px or percentage
                        string The default width can be set in pixels (px), %, em and other units.
                        ```
                        // Initialize
                        $('.selector').igLayoutManager({
                          layoutMode: "vertical",
                          items: [
                              {
                                  width: "10%"
                              },
                              {
                                  width: "40%",
                              },
                              {
                                  width: "40%",
                              },
                              {
                                  width: "20%",
                              },
                              {
                                  width: "50%",
                              }
                          ]
                        });

                        // Get
                        var items = $('.selector').igLayoutManager('option', 'items');
                        var firstItemWidth = items[0].width;
                        ```
                        */
                        width: null
                    }
                ],
                /* type="grid|border|flow|column|vertical" Defines the layout type
                ```
                    // Initialize
                    $('.selector').igLayoutManager({
                        layoutMode: "vertical"
                    });

                    // Get
                    var layoutMode = $('.selector').igLayoutManager('option', 'layoutMode');
                ```
                grid Column type can be set with grid layout
                border Column type can be set with border layout
                flow Column type can be set with flow layout
                column Column type can be set with column layout
                vertical Column type can be set with vertical layout
                */
                layoutMode: "column",
                /* type="number|string" Gets/Sets width of the layout container.
                ```
                // Initialize
                $('.selector').igLayoutManager({
                    layoutMode: "border",
                    width : "800px"
                });

                // Get
                var width = $('.selector').igLayoutManager("option", "width");

                // Set
                $('.selector').igLayoutManager("option", "width", "200px");
                ```
                string The default width can be set in pixels (px), %, em and other units.
                number The default width can be set as a number.
                */
                width: null
            },
            events: {
                /* cancel="false" Event fired after items are resized.
                    Use ui.owner to get a reference to the layout manager performing resizing.
                ```
                // Initialize
                $(".selector").igLayoutManager({
                    internalResized: function(evt, ui) {
                        //reference to igLayourManager
                        ui.owner;
                    }
                });

                // Bind
                $(document).delegate("#layout", "iglayoutmanagerinternalresized", function (evt, ui) {
                    // reference to igLayoutManager
                    ui.owner;
                });
                ```
                */
                internalResized: "internalResized",
                /* cancel="true" Event fired before items are resized.
                    Use ui.owner to get a reference to the layout manager performing resizing.
                ```
                // Initialize
                $(".selector").igLayoutManager({
                    internalResizing: function(evt, ui) {
                        //reference to igLayourManager
                        ui.owner;
                    }
                });

                // Bind
                $(document).delegate("#layout", "iglayoutmanagerinternalresizing", function (evt, ui) {
                  // reference to igLayoutManager
                  ui.owner;
                });
                ```
                */
                internalResizing: "internalResizing",
                /* Event fired after an item has been rendered in the container.
                    Function takes arguments evt and ui.
                    Use ui.owner to get reference to the igLayoutManager.
                    Use ui.itemData to get a reference of item's settings, such as colspan ,rowspan, etc.
                    Use ui.index to get a reference of the item's index, if the layout is flow or vertical
                    Use ui.item to get a reference to the rendered item
                ```
                //  Initialize
                $(".selector").igLayoutManager({
                    itemRendered: function(evt, ui) {
                        //reference to rendered item
                        ui.item;
                        //reference to rendered item index
                        ui.index
                        //reference to item's settings, such as colspan ,rowspan, etc
                        ui.itemData
                        //reference to the igLayoutManager
                        ui.owner
                    }
                });

                //  Bind
                $(document).delegate("#layout", "iglayoutmanageritemrendered", function (evt, ui) {
                    //reference to rendered item
                    ui.item;
                    //reference to rendered item index
                    ui.index
                    //reference to item's settings, such as colspan ,rowspan, etc
                    ui.itemData
                });
                ```
                */
                itemRendered: "itemRendered",
                /* cancel="false" Event fired before an item is rendered in the container.
                    Function takes arguments evt and ui.
                    Use ui.owner to get reference to the igLayoutManager.
                    Use ui.itemData to get a reference of item's settings, such as colspan ,rowspan, etc.
                    Use ui.index to get a reference of the item's index, if the layout is flow or vertical
                    Use ui.item to get a reference to the rendered item
                ```
                // Initialize
                $(".selector").igLayoutManager({
                    itemRendering: function(evt, ui) {
                        //reference to rendered item
                        ui.item;
                        //reference to item index which is goding to be rendered
                        ui.index
                        //reference to item's settings, such as colspan ,rowspan, etc
                        ui.itemData
                        //reference to the igLayoutManager
                        ui.owner
                    }
                });

                // Bind
                $(document).delegate("#layout", "iglayoutmanageritemrendering", function (evt, ui) {
                    //reference to rendered item
                    ui.item;
                    //reference to item index which is goding to be rendered
                    ui.index
                     //reference to item's settings, such as colspan ,rowspan, etc
                    ui.itemData
                });
                ```
                */
                itemRendering: "itemRendering",
                /*
                 Event fired after all items are rendered.
                    Function takes arguments evt and ui.
                    Use ui.owner to get reference to the igLayoutManager.
                ```
                // Initialize
                $(".selector").igLayoutManager({
                    rendered: function(evt, ui) {
                      //reference to rendered items
                      ui.items;
                    }
                });

                // Bind
                $(document).delegate("#layout", "iglayoutmanagerrendered", function (evt, ui) {
                    //reference to rendered items
                    ui.items;
                });
                ```
                */
                rendered: "rendered"
            },
            _opt: null,
            _createWidget: function (options) {
                this.options.items = [];
                this.options.gridLayout.useOffset = true;

                // D.A.September 18th 2013 BUG #148630 Use deep copy of the items configuration
                // to avoid issues when the same instance of items configuration is used in
                // multiple layout managers. jQuery options merging does not deep copy arrays.
                if (options && options.items) {
                    options.items = $.extend(true, [], options.items);
                }
                $.Widget.prototype._createWidget.apply(this, arguments);
            },
            _create: function () {
                var self = this;

                // D.A. 28th April 2014, Bug #170423 The _opt object should be created after the user and default options are merged.
                this._opt = {
                    eventHandlers: {},
                    gridLayout: null,
                    borderLayout: null,
                    scrollBarWidth: $.ig.util.getScrollWidth(),
                    scrollBarHeight: $.ig.util.getScrollHeight(),
                    resizeLayout: this.options.layoutMode === "grid" ||
                    this.options.layoutMode === "border"
                };
                this.element.addClass(this.css.container);
                if (this.options.width !== null) {
                    this.element.css("width", this.options.width);
                }
                if (this.options.height !== null) {
                    this.element.css("height", this.options.height);
                }

                // D.A. 15th April 2014, Bug #169721 InternalResizing / InternalResize
                // events should fire only for layouts that actually resize internally.
                if (this._opt.resizeLayout) {

                    // D.A. 5th September 2014, Bug #169732 Removing reflow on element resize
                    // track resizing
                    //this._opt.eventHandlers.elementResizeHandler = function (e) {
                    //    var noCancel = self._triggerInternalResizing(e);
                    //    if (noCancel) {
                    //        self.reflow(false, null, e);
                    //    }
                    //};
                    //this.element.on("resize", this._opt.eventHandlers.elementResizeHandler);
                    this._opt.eventHandlers.windowResizeHandler = function (e) {
                        var noCancel = self._triggerInternalResizing(e);
                        if (noCancel) {
                            self.reflow(false, null, e);
                        }
                    };
                    $(window).on("resize", this._opt.eventHandlers.windowResizeHandler);
                }

                // also listen to device orientation changes
                //TODO ? (depending on algorithm)
                switch (this.options.layoutMode) {
                    case "grid":
                        this._initGridLayout();
                        break;
                    case "border":
                        this._initBorderLayout();
                        break;
                    case "flow":
                        this._initFlowLayout();
                        break;
                    case "vertical":
                        this._initVerticalLayout();
                        break;
                    default:
                        break;
                }
            },
            _setOption: function (option, value) {
                if (this.options[ option ] === value) {
                    return;
                }

                var opt = this.options,
                    borderLayout = $.extend(true, {}, this.options.borderLayout),
                    initGridLayout, gridLayout;

                switch (option) {
                    case "gridLayout":
                        if (opt.gridLayout.overrideConfigOnSetOption) {

                            // Use the default options
                            gridLayout = $.extend(true, {
                                overrideConfigOnSetOption: opt.gridLayout.overrideConfigOnSetOption,
                                useOffset: opt.gridLayout.useOffset
                            }, {
                                    cols: null,
                                    rows: null,
                                    columnWidth: null,
                                    columnHeight: null,
                                    marginLeft: 0,
                                    marginTop: 0,
                                    rearrangeItems: true,
                                    animationDuration: 500
                                });
                            initGridLayout = true;
                        } else {

                            // Preserve previous set options
                            gridLayout = $.extend(true, {}, this.options.gridLayout);

                            // Reinit the grid layout only when any of the layout options are changed
                            initGridLayout = value.cols || value.rows || value.columnWidth ||
                                value.columnHeight || typeof value.marginLeft === "number" ||
                                typeof value.marginTop === "number" || value.useOffset;
                        }
                        break;
                    default:
                        break;
                }
                $.Widget.prototype._setOption.apply(this, arguments);
                switch (option) {
                    case "width":
                        this.element.width(this.options.width);
                        if (opt.layoutMode === "grid") {
                            this.reflow(true);
                        }
                        break;
                    case "height":
                        this.element.height(this.options.height);
                        if (opt.layoutMode === "grid") {
                            this.reflow(true);
                        }
                        break;
                    case "gridLayout":
                        this.options.gridLayout = $.extend(
                            true, {}, gridLayout, this.options.gridLayout);
                        if (initGridLayout) {
                            this._destroyGridLayout();
                            this._initGlFromItemsConfig(false);
                        } else {
                            if (value.hasOwnProperty("rearrangeItems")) {
                                this._opt.gridLayout.rearrangeItems = value.rearrangeItems;
                            }
                            if (value.hasOwnProperty("animationDuration")) {
                                this._opt.gridLayout.animationDuration = value.animationDuration;
                            }
                        }
                        break;
                    case "borderLayout":
                        this._destroyBorderLayout();
                        this.options.borderLayout = $.extend(
                            true, {}, borderLayout, this.options.borderLayout);
                        this._initBorderLayout();
                        break;
                    case "items":
                        switch (opt.layoutMode) {
                            case "vertical":
                                this._destroyVerticalLayout();
                                this._initVerticalLayout();
                                break;
                            case "grid":
                                this._initGlFromItemsConfig(false);
                                break;
                            case "flow":
                                this._destroyFlowLayout();
                                this._initFlowLayout();
                                break;
                        }
                        break;
                    case "itemCount":
                        switch (opt.layoutMode) {
                            case "vertical":
                                this._destroyVerticalLayout();
                                this._initVerticalLayout();
                                break;
                            case "flow":
                                this._destroyFlowLayout();
                                this._initFlowLayout();
                                break;
                        }
                        break;
                    default:
                        break;
                }
            },
            /*
            addItems: function (items) {
                // add extra items to this.options.gridLayout.items, and cause a reflow
            },
            */
            reflow: function (forceReflow, animationDuration, event) {
                /* Triggers recalculation of the layout dimensions. Layouts may not need to be reflowed manually, if their sizes are in percentages (i.e. they are responsive by default)
                    this can be particularly useful with a grid layout, when the container has percentage sizes, but items are calculated in pixels and positioned absolutely in the container.
                    ```
                    var forceReflow = true,
                        animationDuration = 200;

                    $(".selector").igLayoutManager("reflow", forceReflow, animationDuration, event);
                    ```
                    paramType="bool" optional="true" Indicates whether the reflow should be forced. Useful in cases where the items size and position was changed manually.
                    paramType="number" optional="true" The animation duration to be used for this reflow only. Supported only for Grid Layout mode.
                    paramType="object" optional="true" Indicates the browser even which triggered this action (not API).
                */

                // trigger recalculation
                // since different layout algorithms may or may not need to reflow depending on whether
                // they are responsive by nature, we are going to fire an event, and different
                // implementations are going to subscribe to it, so that we avoid doing if/else checks here, etc.
                var parsedDur;
                if (this.options.layoutMode === "grid") {
                    parsedDur = parseInt(animationDuration, 10);
                    animationDuration = parsedDur >= 0 ?
                        parsedDur :
                        this.options.gridLayout.animationDuration;

                    this._reflowGlConfiguration(forceReflow, animationDuration, event);
                }

                // D.A. 13th March 2014 Bug #164295 Update container paddings when the header/footer height changes.
                if (this.options.layoutMode === "border") {
                    this._setBorderLayoutPaddings();
                }
            },
            /*
            _initColumnLayout: function () {
            },
            */
            _initVerticalLayout: function () {
                var i, length = this.options.itemCount, items = this.options.items, item;
                this.element.addClass(this.css.vertical);
                if (length > 0) {
                    for (i = 0; i < length; i++) {
                        this._trigger(this.events.itemRendering, null, { index: i });
                        item =
                            $("<div></div>").appendTo(this.element).addClass(this.css.verticalItem);
                        this.options.destroyItems = true;
                        this._trigger(this.events.itemRendered, null, { item: item, index: i });
                    }
                    this._trigger(this.events.rendered, null, { owner: this });
                } else if (items && items.length > 0) {
                    this.element.empty();
                    for (i = 0; i < items.length; i++) {
                        this._trigger(this.events.itemRendering, null,
                            { itemData: items[ i ], index: i });
                        item =
                            $("<div></div>").appendTo(this.element).addClass(this.css.verticalItem);
                        if (items[ i ].width) {
                            item.css("width", items[ i ].width);
                        }
                        if (items[ i ].height) {
                            item.css("height", items[ i ].height);
                        }
                        this._trigger(this.events.itemRendered, null, { item: item, index: i });
                    }
                    this.options.destroyItems = true;
                    this._trigger(this.events.rendered, null, { owner: this });
                } else {
                    this.element.children().addClass(this.css.verticalItem);
                }
            },

            // When items configuration is given get the cols and rows values from it.
            _analyzeGlItems: function () {
                var gl = this._opt.gridLayout,
                    items = this.options.items,
                    cols = 0,
                    rows = 0,
                    item, itemCols, itemRows, i;

                for (i = 0; items.length > i; i++) {
                    item = items[ i ];
                    itemCols = item.colIndex + item.colSpan;
                    itemRows = item.rowIndex + item.rowSpan;

                    if (itemCols > cols) {
                        cols = itemCols;
                    }

                    if (itemRows > rows) {
                        rows = itemRows;
                    }
                }

                if (cols > 0) {
                    gl.cols = cols;
                }

                if (rows > 0) {
                    gl.rows = rows;
                }
            },
            _analyzeGlWidth: function () {
                var gl = this._opt.gridLayout,
                    columnWidth = gl.columnWidth,
                    elWidth = this.element.width(),
                    units;

                // Convert the column width option to number value
                if (columnWidth) {
                    if (typeof columnWidth === "string") {
                        if (columnWidth.indexOf("%") !== -1) {
                            units = columnWidth.substring(0, columnWidth.length - 1);
                            units = parseInt(units, 10) / 100;
                            if (!isNaN(units) && units > 0) {

                                // Keep the ratio to resize the tiles when the container is resized
                                gl.columnWidthRatio = units;

                                // When columnWidth option is set in percent
                                // consider the margin-left to be part of it for users ease
                                gl.columnWidth = Math.floor(elWidth * units - gl.marginLeft);
                            }
                        } else {
                            // Try to parse the value
                            units = parseInt(columnWidth, 10);
                            if (!isNaN(units) && units > 0) {
                                gl.columnWidth = units;
                            }
                        }
                    }
                }
            },
            _analyzeGlHeight: function () {
                var gl = this._opt.gridLayout,
                    columnHeight = gl.columnHeight,
                    elHeight = this.element.height(),
                    units;

                // Convert the column height option to number value
                if (columnHeight) {
                    if (typeof columnHeight === "string") {
                        if (columnHeight.indexOf("%") !== -1) {
                            units = columnHeight.substring(0, columnHeight.length - 1);
                            units = parseInt(units, 10) / 100;
                            if (!isNaN(units) && units > 0) {
                                gl.columnHeightRatio = units;

                                // When columnHeight option is set in percent
                                // consider the margin-top to be part of it for users ease
                                gl.columnHeight = Math.floor(elHeight * units - gl.marginTop);
                            }
                        } else {
                            units = parseInt(columnHeight, 10);
                            if (!isNaN(units) && units > 0) {
                                gl.columnHeight = units;
                            }
                        }
                    }
                }
            },
            _analyzeGlNotSetOptions: function () {
                var gl = this._opt.gridLayout,
                    elWidth = this.element.width(),
                    elHeight = this.element.height(),
                    itemsLength = this.options.items.length,
                    columnWidthOption = typeof gl.columnWidth === "number" &&
                        gl.columnWidth > 0,
                    columnHeightOption = typeof gl.columnHeight === "number" &&
                        gl.columnHeight > 0,
                    colsOption = typeof gl.cols === "number" && gl.cols > 0,
                    rowsOption = typeof gl.rows === "number" && gl.rows > 0;

                // Calculate cols/rows depending on provided options
                if (!colsOption) {
                    if (rowsOption) {

                        // When rows are given, but cols are not. Calculate cols from the rows.
                        gl.cols = Math.ceil(itemsLength / gl.rows);
                    } else {
                        if (columnWidthOption) {

                            // When cols & rows options are not given, but column width option is given.
                            // Calculate cols/rows from column width.
                            gl.cols = Math.floor(elWidth / (gl.columnWidth + gl.marginLeft));
                            gl.rows = Math.ceil(itemsLength / gl.cols);
                        } else if (columnHeightOption) {

                            // When cols, rows and column width options are not given, but column height is given.
                            // Calculate cols/rows from column height.
                            gl.rows = Math.floor(elHeight / (gl.columnHeight + gl.marginTop));
                            gl.cols = Math.ceil(itemsLength / gl.rows);
                        } else {

                            // Default, when no options are given.
                            gl.cols = Math.ceil(Math.sqrt(itemsLength));
                            gl.rows = Math.ceil(itemsLength / gl.cols);
                        }
                    }
                } else if (!rowsOption) {

                    // When cols are given, but rows are not. Calculate rows from the cols.
                    gl.rows = Math.ceil(itemsLength / gl.cols);
                }

                // When columnWidth is not given. Consider it is set in percent and calculate it from number of cols.
                if (!columnWidthOption) {
                    gl.columnWidth = Math.floor(elWidth * (1 / gl.cols) - gl.marginLeft);
                    gl.columnWidthRatio = 1 / gl.cols;
                }

                // When columnHeight is not set. Consider it is set in percent and calculate it from number of rows.
                if (!columnHeightOption) {
                    gl.columnHeight = Math.floor(elHeight * (1 / gl.rows) - gl.marginTop);
                    gl.columnHeightRatio = 1 / gl.rows;
                }

                // Adjust the columnHeight automatically based on the container's height when no options
                // specifying the columnHeight were provided in the configuration (as columnHeight, cols, items).
                // This is possible only when the columnWidth is fixed value and the items rearrange.
                if (!columnHeightOption && !colsOption && !gl.columnWidthRatio) {
                    gl.autoAdjustColumnHeight = true;
                }

                // Adjust the columnWidth automatically based on the container's width when no options
                // specifying the columnWidth were provided in the configuration (as columnWidth, rows, items).
                // This is possible only when the columnHeight is fixed value and the items rearrange.
                if (!columnWidthOption && !rowsOption && !gl.columnHeightRatio) {
                    gl.autoAdjustColumnWidth = true;
                }
            },
            _analyzeGlConfiguration: function () {
                this._analyzeGlWidth();
                this._analyzeGlHeight();
                this._analyzeGlItems();
                this._analyzeGlNotSetOptions();
            },
            _createGlConfig: function () {
                var gl,
                    e = this.element;

                // Initialize internal grid layout options
                this._opt.gridLayout = gl = $.extend(true, {}, this.options.gridLayout, {

                    // The created items
                    elements: $(),

                    // The minimum column count
                    minColCount: 1,

                    // The column width to container width ratio
                    columnWidthRatio: null,

                    // The column height to container height ratio
                    columnHeightRatio: null,

                    // The effective width of the container, the width without the vertical scrollbar
                    // The initial value is be set to the full container's width.
                    // When vertical scroll appear or disappear the value is recalculated accordingly
                    containerWidthNoScroll: e.width(),

                    // The effective height of the container, the height without the horizontal scrollbar
                    // The initial value is be set to the full container's height
                    // When horizontal scroll appear or disappear the value is recalculated accordingly
                    containerHeightNoScroll: e.height(),

                    // Items are considered resizable when their width or height is set in percent
                    resizeItems: false,

                    // Whether the items are currently animated
                    animating: false,

                    // When the items are rearranged and the columnWidth or cols are not set
                    // The columnWidth will be automatically adjusted to fit the items in the container
                    autoAdjustColumnWidth: false,

                    // When the items are rearranged and the columnHeight or rows are not set
                    // The columnHeight will be automatically adjusted to fit the items in the container
                    autoAdjustColumnHeight: false,

                    // D.A. 12th May 2014, Bug #160622, Preserve the initial configuration when reflowing
                    initialCols: 0,
                    initialRows: 0,
                    initialColWidth: 0,
                    initialColWidthRatio: null,
                    initialColHeight: 0,
                    initialColHeightRation: null,
                    initialItems: [],
                    initialReflow: true,
                    useOffset: (e.css("position") === "static" || e.css("position") === "fixed") &&
                        this.options.gridLayout.useOffset ? true : false,
                    destroyItemsFromIndex: e.children().length
                });

                // D.A. 4th April 2014, Bug #169251 Grid Layout doesn't accept string values for cols/rows options
                if (typeof gl.cols === "string") {
                    gl.cols = parseInt(gl.cols, 10);
                }

                if (typeof gl.rows === "string") {
                    gl.rows = parseInt(gl.rows, 10);
                }

                // Analyze configuration's columnWidth/Height and cols/rows
                // Sets columnWidth/HeightRatio
                this._analyzeGlConfiguration();

                // Resize the items if columnWidth or columnHeight was set in percent ( % ).
                gl.resizeItems = !!(gl.columnWidthRatio || gl.columnHeightRatio);
            },
            _glSortItemsByPositionOrder: function () {
                var items = this.options.items,
                    compareFunc = function (item1, item2) {
                        return (item1.rowIndex !== item2.rowIndex) ?
                            item1.rowIndex - item2.rowIndex : item1.colIndex - item2.colIndex;
                    };

                // Sort the items from left to right and top to bottom
                items = items.sort(compareFunc);
            },
            _renderGlItemsFromItemsConfig: function (initialRendering) {
                var i,
                    item,
                    itemData,
                    width,
                    height,
                    top,
                    left,
                    row,
                    col,
                    colSpan,
                    rowSpan,
                    $currChild,
                    renderNewItem,
                    e = this.element,
                    items = this.options.items,
                    gl = this._opt.gridLayout,
                    ml = gl.marginLeft,
                    mt = gl.marginTop,
                    iw = gl.columnWidth,
                    ih = gl.columnHeight,
                    offset = e.offset(),
                    $children = e.children();

                // Create items for each item definition in this.options.items
                for (i = 0; i < items.length; i++) {
                    itemData = items[ i ];
                    $currChild = $children.eq(i);
                    renderNewItem = $currChild.length === 0;

                    colSpan = itemData.colSpan = (typeof itemData.colSpan === "number") ?
                        itemData.colSpan : 1;
                    rowSpan = itemData.rowSpan = (typeof itemData.rowSpan === "number") ?
                        itemData.rowSpan : 1;
                    row = itemData.rowIndex = (typeof itemData.rowIndex === "number") ?
                        itemData.rowIndex : Math.floor(i / gl.cols);
                    col = itemData.colIndex = (typeof itemData.colIndex === "number") ?
                        itemData.colIndex : i % gl.cols;

                    if (renderNewItem || initialRendering) {

                        // Trigger Item Rendering
                        this._trigger(this.events.itemRendering, null, {
                            itemData: itemData,
                            index: i
                        });
                    }

                    if (renderNewItem) {
                        item = $("<div>").appendTo(this.element);
                    } else {
                        item = $currChild;
                    }

                    itemData.item = item;
                    gl.elements = gl.elements.add(item);

                    if (colSpan > gl.minColCount) {
                        gl.minColCount = colSpan;
                    }

                    width = colSpan * iw + (colSpan - 1) * ml;
                    height = rowSpan * ih + (rowSpan - 1) * mt;
                    left = col * iw + (col + 1) * ml;
                    top = row * ih + (row + 1) * mt;

                    if (gl.useOffset) {
                        top += offset.top;
                        left += offset.left;
                    }

                    item.addClass(this.css.item)
                        .addClass(this.css.gridItemAbs)
                        .attr("data-index", i)
                        .css({
                            top: top,
                            left: left,
                            width: width,
                            height: height
                        });

                    if (renderNewItem || initialRendering) {

                        // Trigger Item Rendered
                        this._trigger(this.events.itemRendered, null, {
                            item: item,
                            itemData: itemData,
                            index: i
                        });
                    }
                }

                this._glSortItemsByPositionOrder();

                // Remove excess elements when setOption "items"
                // is called with less item configurations
                $children.slice(items.length).remove();

                if (initialRendering) {

                    // Trigger grid layout rendered
                    this._trigger(this.events.rendered, null, {
                        items: this.options.items
                    });
                }
            },
            _initGlFromItemsConfig: function (initialRendering) {

                // Initialize and analyze the internal grid layout configuration
                this._createGlConfig();

                // Render the grid layout based on the items configuration
                this._renderGlItemsFromItemsConfig(initialRendering);

                // Reflow the items in case scrollbar appeared
                this.reflow(false, 0);
            },
            _renderGlItemsFromColsRows: function (initialRendering) {
                var i,
                    j,
                    top,
                    left,
                    item,
                    gl = this._opt.gridLayout,
                    ml = gl.marginLeft,
                    mt = gl.marginTop,
                    iw = gl.columnWidth,
                    ih = gl.columnHeight;

                for (i = 0; i < gl.rows; i++) {
                    for (j = 0; j < gl.cols; j++) {
                        item = $("<div>")
                            .appendTo(this.element)
                            .addClass(this.css.item)
                            .addClass(this.css.gridItemAbs)
                            .attr("data-index", i * gl.cols + j)
                            .width(iw)
                            .height(ih);

                        // Trigger Item Rendered
                        this._trigger(this.events.itemRendered, null, {
                            item: item
                        });

                        left = j * iw + (j + 1) * ml;
                        top = i * ih + (i + 1) * mt;
                        left += j === 0 ? ml : 0;

                        item.css({
                            top: top,
                            left: left
                        });
                    }
                }

                if (initialRendering) {

                    // Trigger Grid Layout rendered
                    this._trigger(this.events.rendered, null, {
                        items: this.options.items
                    });
                }
            },
            _initGlFromColsRows: function (initialRendering) {
                this._createGlConfig();
                this._renderGlItemsFromColsRows(initialRendering);
            },
            _initGridLayout: function () {
                var i,
                    items = this.options.items,
                    e = this.element,
                    $children = e.children(),
                    lenDiff = $children.length - this.options.items.length;

                // D.A 3rd April 2014, Bug #168927 Grid Layout is not
                // instantiated correctly from markup when items are not provided
                if (lenDiff > 0) {
                    // Add items configuration for each child
                    for (i = 0; i < lenDiff; i++) {
                        this.options.items.push({});
                    }
                }

                if (items && items.length > 0) {
                    this._initGlFromItemsConfig(true);
                } else if ($children.length === 0) {

                    // When there aren't any children, and cols & rows is defined in the gridLayout settings
                    // we are going to create cols * rows number of DIVs
                    this._initGlFromColsRows(true);
                }
            },

            // Stores the grid layout configuration as it is upon initialization
            _setGlInitialConfig: function () {
                var gl = this._opt.gridLayout;

                gl.initialCols = gl.cols;
                gl.initialRows = gl.rows;
                gl.initialColHeight = gl.columnHeight;
                gl.initialColWidth = gl.columnWidth;
                gl.initialColWidthRatio = gl.columnWidthRatio;
                gl.initialColHeightRatio = gl.columnHeightRatio;
                gl.initialItems = $.extend(true, [], this.options.items);
            },
            _getContainerWidthNoScroll: function () {
                var widthNoScroll;

                // D.A. 23th September 2014, Bug #181578 jQuery width rounding issue causes maximum callstack exceeded exception in Chrome.
                // Leaving this fix for WebKit only, because of browsers inconsistencies with getComputedStyle.
                // Chrome and IE don't include the scrollbarWidth in the computed value while Firefox does.
                // D.A. 20th January 2015, Bug #187424 Same as above bug in IE9
                if ($.ig.util.isWebKit && window.getComputedStyle) {
                    widthNoScroll = parseInt(window.getComputedStyle(this.element[ 0 ]).width, 10);
                } else {
                    widthNoScroll = this.element.width() -
                        ($.ig.util.hasVerticalScroll(this.element) ? this._opt.scrollBarWidth : 0);
                }

                return widthNoScroll;
            },
            _getContainerHeightNoScroll: function () {
                var heightNoScroll;

                // Look _getContainerWidthNoScroll comments
                if ($.ig.util.isWebKit && window.getComputedStyle) {
                    heightNoScroll =
                        parseInt(window.getComputedStyle(this.element[ 0 ]).height, 10);
                } else {
                    heightNoScroll = this.element.height() -
                        ($.ig.util.hasHorizontalScroll(this.element) ?
                            this._opt.scrollBarHeight : 0);
                }

                return heightNoScroll;
            },

            // returnType='boolean' Returns "true" when grid layout reflow is needed
            // to adjust the tiles in case scrollbars appeared or disappeared.
            _glReflowNeeded: function () {
                var gl = this._opt.gridLayout,
                    newContainerWidthNoScroll = this._getContainerWidthNoScroll(),
                    newContainerHeightNoScroll = this._getContainerHeightNoScroll();

                // Reflow is needed when vertical scrollbar appeared or disappeared and columnWidth
                // is in percent or is fixed and enough space for new column is available.
                // Reflow is needed also when horizontal scrollbar appeared or disappeared and
                // columnHeight is in percent.
                return (gl.containerWidthNoScroll !== newContainerWidthNoScroll &&
                    (gl.columnWidthRatio ||
                        gl.cols !== Math.floor(newContainerWidthNoScroll /
                            (gl.columnWidth + gl.marginLeft)))) ||
                    (gl.containerHeightNoScroll !== newContainerHeightNoScroll &&
                        gl.columnHeightRatio);
            },
            _reflowGlConfiguration: function (forceReflow, animationDuration, event) {
                var self = this,
                    e = this.element,
                    gl = this._opt.gridLayout,
                    ml = gl.marginLeft,
                    mt = gl.marginTop,
                    items = this.options.items,
                    newContainerWidthNoScroll = this._getContainerWidthNoScroll(),
                    newContainerHeightNoScroll = this._getContainerHeightNoScroll(),
                    leftOffset = gl.useOffset ? e.offset().left : 0,
                    topOffset = gl.useOffset ? e.offset().top : 0,
                    col, row, colSpan, rowSpan, newColCount, newDim, helperArray, itemData,
                    colWidthChanged, colHeightChanged, positionsChanged, foundMatch,
                    currentRow, item, i, j, k, r, n,
                    rearrangeCallback = function () {

                        // Check if all animations have ended
                        if (!gl.elements.is(":animated")) {
                            gl.animating = false;
                            if (self._glReflowNeeded()) {
                                self.reflow(false, animationDuration, event);
                            } else {

                                // Trigger the internal resized event.
                                // The calls of the public api  method will also trigger the event.
                                self._triggerInternalResized(event);
                            }
                        }
                    };

                if (items) {

                    // Update columnWidth value when it is set in percent and container width changed
                    if (gl.columnWidthRatio &&
                        gl.containerWidthNoScroll !== newContainerWidthNoScroll) {
                        gl.columnWidth = Math.floor(
                            newContainerWidthNoScroll * gl.columnWidthRatio - ml);
                        colWidthChanged = true;
                    } else {
                        colWidthChanged = false;
                    }

                    // Update columnHeight when it is set in percent and container height changed
                    if (gl.columnHeightRatio &&
                        gl.containerHeightNoScroll !== newContainerHeightNoScroll) {
                        gl.columnHeight = Math.floor(
                            newContainerHeightNoScroll * gl.columnHeightRatio - mt);
                        colHeightChanged = true;
                    } else {
                        colHeightChanged = false;
                    }

                    // Recalculate the columnWidth of the items to most efficiently use the container's
                    // width when the container's height changed and the height should be autoadjusted.
                    // This might happen only when no options specifying the columnWidth were set by the user
                    // (columnWidth, cols and items) and the items are rearrangeable or reflow was forced.
                    if (gl.autoAdjustColumnWidth && ((gl.containerHeightNoScroll !==
                        newContainerHeightNoScroll && gl.rearrangeItems) || forceReflow)) {
                        gl.rows = Math.max(Math.floor(newContainerHeightNoScroll /
                            (gl.columnHeight + mt)), 1);
                        gl.columnWidthRatio = 1 / Math.ceil(items.length / gl.rows);
                        gl.columnWidth = Math.floor(
                            newContainerWidthNoScroll * gl.columnWidthRatio - ml);
                        colWidthChanged = true;
                    }

                    // Update the container width value
                    gl.containerWidthNoScroll = newContainerWidthNoScroll;

                    // Update the container height value
                    gl.containerHeightNoScroll = newContainerHeightNoScroll;

                    // Rearrange items
                    if (gl.rearrangeItems || forceReflow) {
                        if (gl.rearrangeItems) {
                            if (gl.columnWidthRatio) {
                                newColCount = Math.floor(1 / gl.columnWidthRatio);
                            } else {
                                newColCount = Math.floor(newContainerWidthNoScroll /
                                    (gl.columnWidth + ml));
                            }
                        } else {

                            // When the reflow is forced
                            if (gl.autoAdjustColumnWidth) {

                                // Update the column value when autoAdjustment is necessary
                                newColCount = Math.ceil(items.length / gl.rows);
                            } else if (gl.autoAdjustColumnHeight) {

                                // Update the column value when autoAdjustment is necessary
                                newColCount = Math.floor(newContainerWidthNoScroll /
                                    (gl.columnWidth + ml));
                            } else {

                                // Preserve the cols value when the items are not
                                // rearrangeable, but the reflow was forced.
                                newColCount = gl.cols;
                            }
                        }

                        // D.A. 18. July 2013 Bug#147162 Items do not rearrange when restoring the browser
                        // and the width of the container is less than the minimum column count
                        if (gl.minColCount > newColCount) {
                            newColCount = gl.minColCount;
                        }

                        // Rearrange only when the new column count value is different from the old one
                        if (newColCount !== gl.cols || forceReflow) {
                            if (newColCount === gl.initialCols) {

                                // D.A. 12th May 2014, Bug #160622, Preserve the initial configuration when reflowing
                                items = this.options.items = $.extend(true, [], gl.initialItems);
                                gl.rows = gl.initialRows;
                                gl.cols = gl.initialCols;
                            } else {
                                gl.cols = newColCount;
                                helperArray = [[]];
                                helperArray[ 0 ].length = gl.cols || 0;

                                // Rearrange items to best fit in the container and to keep their original order
                                for (i = 0; i < items.length; i++) {
                                    itemData = items[ i ];
                                    colSpan = itemData.colSpan;
                                    rowSpan = itemData.rowSpan;
                                    foundMatch = false;

                                    // Create array with 1 row and the same number of columns as the grid layout.
                                    // Search for a matching position for each item.
                                    // If such position cannot be found, add new row to the array.
                                    // Keep the items order as in the items array.
                                    // When a matching position is found, mark it as occupied.
                                    // Change the item colIndex and rowIndex according to the position found.
                                    // "j" is the rowIndex. "k" is the colIndex.
                                    // Animate the items to their new positions.
                                    for (j = 0; j < helperArray.length && !foundMatch; j++) {
                                        for (k = 0; k < helperArray[ j ].length &&
                                            !foundMatch; k++) {

                                            // Check if the position is occupied
                                            if (!helperArray[ j ][ k ]) {
                                                foundMatch = true;
                                                for (r = 0; foundMatch &&
                                                    r < rowSpan * colSpan; r++) {
                                                    if (colSpan > helperArray[ j ].length - k) {
                                                        foundMatch = false;
                                                    } else {
                                                        currentRow = j + Math.floor(r / colSpan);
                                                        if (!helperArray[ currentRow ]) {
                                                            helperArray[ currentRow ] = [];
                                                            helperArray[ currentRow ].length =
                                                                gl.cols;
                                                        }
                                                        if (helperArray[ currentRow ][
                                                            k + (r % colSpan) ] === 1) {
                                                            foundMatch = false;
                                                        }
                                                    }
                                                }
                                            }
                                            if (foundMatch) {
                                                itemData.rowIndex = j;
                                                itemData.colIndex = k;

                                                // Mark the positions as occupied
                                                for (n = 0; n < rowSpan * colSpan; n++) {
                                                    helperArray[ itemData.rowIndex +
                                                        Math.floor(n / colSpan) ][
                                                        itemData.colIndex + (n % colSpan) ] = 1;
                                                }
                                            } else if (j === (helperArray.length - 1) &&
                                                k === (helperArray[ j ].length - 1)) {
                                                helperArray[ j + 1 ] = [];
                                                helperArray[ j + 1 ].length = gl.cols;
                                            }
                                        }
                                    }
                                }

                                // Recalculate the columnHeight of the items to most efficiently use the container's
                                // height when the rows count changed and the height should be auto adjusted.
                                // This may happen only when no options specifying the columnHeight were set by the user
                                // (columnHeight, rows and items) and items are rearrangeable or reflow was forced.
                                if (gl.autoAdjustColumnHeight && gl.rows !== helperArray.length) {
                                    gl.columnHeightRatio = 1 / helperArray.length;
                                    gl.columnHeight = Math.floor(
                                        newContainerHeightNoScroll * gl.columnHeightRatio - mt);
                                    colHeightChanged = true;
                                }
                                gl.rows = helperArray.length;
                            }

                            positionsChanged = true;
                        }
                    }

                    // Adjust the items size and position
                    if ((colWidthChanged || colHeightChanged || positionsChanged) || forceReflow) {
                        gl.animating = (positionsChanged && animationDuration > 0) || gl.animating;
                        for (i = 0; i < items.length; i++) {
                            itemData = items[ i ];
                            item = itemData.item;
                            row = itemData.rowIndex;
                            col = itemData.colIndex;
                            colSpan = itemData.colSpan;
                            rowSpan = itemData.rowSpan;
                            newDim = {};

                            // Animate to the new values when the items positions changed.
                            // When the columnWidth/Height is changed while animation is
                            // still running (e.g. from container resizing), animate to the new values.
                            if (positionsChanged || gl.animating) {
                                newDim.left = (col * gl.columnWidth + (col + 1) * ml) + leftOffset;
                                newDim.top = (row * gl.columnHeight + (row + 1) * mt) + topOffset;
                                if (colWidthChanged || forceReflow) {
                                    newDim.width = colSpan * gl.columnWidth + (colSpan - 1) * ml;
                                }
                                if (colHeightChanged || forceReflow) {
                                    newDim.height = rowSpan * gl.columnHeight + (rowSpan - 1) * mt;
                                }
                                if (animationDuration > 0) {

                                    // Animate the items to their new positions when animation duration is greater than 0.
                                    // Trigger the internal resized event in the callback.
                                    item.animate(newDim, {
                                        duration: animationDuration,
                                        queue: false,
                                        complete: rearrangeCallback
                                    });
                                } else {
                                    item.css(newDim);
                                }
                            } else {
                                if (colWidthChanged || forceReflow) {
                                    newDim.left =
                                        (col * gl.columnWidth + (col + 1) * ml) + leftOffset;
                                    newDim.width = colSpan * gl.columnWidth + (colSpan - 1) * ml;
                                }
                                if (colHeightChanged || forceReflow) {
                                    newDim.top =
                                        (row * gl.columnHeight + (row + 1) * mt) + topOffset;
                                    newDim.height = rowSpan * gl.columnHeight + (rowSpan - 1) * mt;
                                }
                                item.css(newDim);
                            }
                        }
                    }

                    // When items are animating the event will be triggered
                    // in the callback when all animations are completed.
                    if (!gl.animating) {
                        if (this._glReflowNeeded()) {
                            this.reflow(false, animationDuration, event);
                        } else {

                            // Sets the initial grid layout config after the layout is initially reflowed
                            if (gl.initialReflow) {
                                this._setGlInitialConfig();
                                gl.initialReflow = false;
                            }
                            this._triggerInternalResized(event);
                        }
                    }
                }
            },
            _initBorderLayout: function () {
                var left, right, center, header, footer,
                    rwidth, lwidth, container, sections,
                    maxHeight, currHeight, i,
                    bl = this.options.borderLayout;
                this.element.addClass(this.css.border);

                // init from markup
                left = this.element.find(".left");
                header = this.element.find(".header");
                right = this.element.find(".right");
                center = this.element.find(".center");
                footer = this.element.find(".footer");

                // create elements if they don't exist
                if (left.length === 0) {
                    this._trigger(this.events.itemRendering, null, { region: "left" });
                    left = $("<div></div>").appendTo(this.element);
                    this._removeLeft = true;
                    this._trigger(this.events.itemRendered, null,
                        { region: "left", element: left });
                }
                if (bl.showLeft) {
                    left.removeClass(this.css.borderItemHidden);
                } else {
                    left.addClass(this.css.borderItemHidden);
                }
                left.addClass(this.css.borderItem).addClass(this.css.borderLeft);

                if (right.length === 0) {
                    this._trigger(this.events.itemRendering, null, { region: "right" });
                    right = $("<div></div>").appendTo(this.element);
                    this._removeRight = true;
                    this._trigger(this.events.itemRendered, null,
                        { region: "right", element: right });
                }
                if (bl.showRight) {
                    right.removeClass(this.css.borderItemHidden);
                } else {
                    right.addClass(this.css.borderItemHidden);
                }
                right.addClass(this.css.borderItem).addClass(this.css.borderRight);

                if (center.length === 0) {
                    this._trigger(this.events.itemRendering, null, { region: "center" });
                    center = $("<div></div>").appendTo(this.element);
                    this._removeCenter = true;
                    this._trigger(this.events.itemRendered, null,
                        { region: "center", element: center });
                }
                center.addClass(this.css.borderItem).addClass(this.css.borderCenter);

                if (footer.length === 0) {
                    this._trigger(this.events.itemRendering, null, { region: "footer" });
                    footer = $("<div></div>").appendTo(this.element);
                    this._removeFooter = true;
                    this._trigger(this.events.itemRendered, null,
                        { region: "footer", element: footer });
                }
                if (bl.showFooter) {
                    footer.removeClass(this.css.borderItemHidden);
                } else {
                    footer.addClass(this.css.borderItemHidden);
                }
                footer.addClass(this.css.borderItem).addClass(this.css.borderFooter);

                if (header.length === 0) {
                    this._trigger(this.events.itemRendering, null, { region: "header" });
                    header = $("<div></div>").appendTo(this.element);
                    this._removeHeader = true;
                    this._trigger(this.events.itemRendered, null,
                        { region: "header", element: header });
                }
                if (bl.showHeader) {
                    header.removeClass(this.css.borderItemHidden);
                } else {
                    header.addClass(this.css.borderItemHidden);
                }
                header.addClass(this.css.borderItem).addClass(this.css.borderHeader);

                // create container element
                //wrapper1 = $("<div></div>").appendTo(this.element).addClass(this.css.borderWrapper1);
                //wrapper2 = $("<div></div>").appendTo(wrapper1).addClass(this.css.borderWrapper2);
                container = $("<div></div>").appendTo(this.element)
                    .addClass(this.css.borderContainer)
                    .append(left)
                    .append(right)
                    .append(center);

                // put footer at the end
                this.element.append(footer);

                // check sizes if we have them set via options
                // check if we have size of the left col defined in options
                if (bl.leftWidth !== null && bl.showLeft) {
                    left.css("width", bl.leftWidth);
                    /* K.D. May 28th, 2013 Bug #140104 Horizontal scrollbar is always displayed in the browser when using border layout */

                    //left.css("right", bl.leftWidth);
                    //container.css("padding-left", bl.leftWidth);
                } else if (bl.showLeft === false || left.length === 0) {
                    container.css("padding-left", 0);
                }
                if (bl.rightWidth !== null && bl.showRight) {
                    right.css("width", bl.rightWidth);
                    /* K.D. May 28th, 2013 Bug #140104 Horizontal scrollbar is always displayed in the browser when using border layout */

                    //container.css("padding-right", bl.rightWidth);
                } else if (bl.showRight === false || right.length === 0) {
                    container.css("padding-right", 0);
                }
                lwidth = bl.leftWidth && bl.leftWidth.indexOf &&
                    bl.leftWidth.indexOf("%") !== -1 ? 0 : parseInt(bl.leftWidth, 10);
                rwidth = bl.rightWidth && bl.rightWidth.indexOf &&
                    bl.rightWidth.indexOf("%") !== -1 ? 0 : parseInt(bl.rightWidth, 10);
                this.element.css("min-width", lwidth + rwidth);

                // D.A. 13th March 2014 Bug #164295 Layout Manager in border layout mode doesn't set height correctly
                this._opt.borderLayout = {
                    header: header,
                    footer: footer,
                    paddingTop: null,
                    paddingBottom: null
                };
                this._setBorderLayoutPaddings();

                // D.A. 29th April 2014, Bug #169730 Set default height equal to the maximum height of the sections
                if (this.options.height === null) {
                    sections = left.add(right).add(center);
                    for (i = 0, maxHeight = 0; i < sections.length; i++) {
                        currHeight = sections.eq(i).hasClass(this.css.borderItemHidden) ?
                            0 : sections.eq(i).outerHeight(true);
                        if (currHeight > maxHeight) {
                            maxHeight = currHeight;
                        }
                    }
                    this.element.height(maxHeight);
                }
                this._trigger(this.events.rendered, null, { owner: this });
            },
            _setBorderLayoutPaddings: function () {
                var headerHeight, footerHeight,
                    isHeaderHidden, isFooterHidden,
                    _bl = this._opt.borderLayout;
                if (_bl.header.length) {
                    isHeaderHidden = _bl.header.hasClass(this.css.borderItemHidden);
                    headerHeight = isHeaderHidden ? 0 : _bl.header.outerHeight(true);
                    if (_bl.paddingTop !== headerHeight) {
                        _bl.paddingTop = headerHeight;
                        this.element.css("paddingTop", _bl.paddingTop);
                    }
                }
                if (_bl.footer.length) {
                    isFooterHidden = _bl.footer.hasClass(this.css.borderItemHidden);
                    footerHeight = isFooterHidden ? 0 : _bl.footer.outerHeight(true);
                    if (_bl.paddingBottom !== footerHeight) {
                        _bl.paddingBottom = footerHeight;
                        this.element.css("paddingBottom", _bl.paddingBottom);
                    }
                }
            },

            // reflowBorder: function (event) {
            // var center = this.element.find('.ig-layout-border-center'),
            // bl = this.options.borderLayout,
            // lwidth = bl.showLeft ? parseInt(bl.leftWidth, 10) : 0,
            // rwidth = bl.showRight ? parseInt(bl.rightWidth, 10) : 0,
            // cwidth = this.element.width() - lwidth - rwidth;
            // center.css("width", cwidth);
            // },
            _initFlowLayout: function () {
                var i, length = this.options.itemCount, items = this.options.items, item;
                this.element.addClass(this.css.flow);
                if (length > 0) {
                    for (i = 0; i < length; i++) {
                        this._trigger(this.events.itemRendering, null, { index: i });
                        item = $("<li></li>").appendTo(this.element).addClass(this.css.flowItem);
                        this.options.destroyItems = true;
                        this._trigger(this.events.itemRendered, null, { item: item, index: i });
                    }
                    this._trigger(this.events.rendered, null, { owner: this });
                } else if (items && items.length > 0) {
                    this.element.empty();
                    for (i = 0; i < items.length; i++) {
                        this._trigger(this.events.itemRendering, null,
                            { itemData: items[ i ], index: i });
                        item = $("<li></li>").appendTo(this.element).addClass(this.css.flowItem);
                        if (items[ i ].width) {
                            item.css("width", items[ i ].width);
                        }
                        if (items[ i ].height) {
                            item.css("height", items[ i ].height);
                        }
                        this._trigger(this.events.itemRendered, null, { item: item, index: i });
                    }
                    this.options.destroyItems = true;
                    this._trigger(this.events.rendered, null, { owner: this });
                } else {
                    this.element.children().addClass(this.css.flowItem);
                }
            },
            _triggerInternalResizing: function (event) {
                var args = {
                    owner: this
                };
                return this._trigger(this.events.internalResizing, event, args);
            },
            _triggerInternalResized: function (event) {
                var args = {
                    owner: this
                };
                return this._trigger(this.events.internalResized, event, args);
            },
            /* recalculates the layout, if it can be done all via CSS, this is not necessary */
            /*
            _doGridLayout: function () {
            },
            _doBorderLayout: function () {
                throw new Error("Not Implemented");
            },
            _doFlowLayout: function () {
                throw new Error("Not Implemented");
            },
            */
            _destroyBorderLayout: function () {
                this.element.removeClass(this.css.border);
                if (this.element.find("." + this.css.borderLeft).length) {
                    this.element.find("." + this.css.borderLeft).unwrap();
                } else {
                    this.element.find("." + this.css.borderRight).unwrap();
                }
                if (this._removeLeft) {
                    this.element.children("." + this.css.borderLeft).remove();
                }
                if (this._removeRight) {
                    this.element.children("." + this.css.borderRight).remove();
                }
                if (this._removeCenter) {
                    this.element.children("." + this.css.borderCenter).remove();
                }
                if (this._removeHeader) {
                    this.element.children("." + this.css.borderHeader).remove();
                }
                if (this._removeFooter) {
                    this.element.children("." + this.css.borderFooter).remove();
                }
                this.element.children().removeClass(this.css.borderItem)
                    .removeClass(this.css.borderLeft)
                    .removeClass(this.css.borderRight)
                    .removeClass(this.css.borderCenter)
                    .removeClass(this.css.borderFooter)
                    .removeClass(this.css.borderHeader);
                this.element.find("." + this.css.borderItemHidden)
                    .removeClass(this.css.borderItemHidden);
            },
            _destroyGridLayout: function () {
                var $children = this.element.children();

                // S.T., D.A 29th April 2014, Bug #169723: Remove dynamically added markup
                $children
                    .slice(this._opt.gridLayout.destroyItemsFromIndex)
                    .remove();

                $children
                    .removeClass(this.css.item)
                    .removeClass(this.css.gridItemAbs)
                    .removeClass(this.css.gridItemRel)
                    .removeAttr("data-index");
            },
            _destroyFlowLayout: function () {
                this.element.removeClass(this.css.flow);
                if (this.options.destroyItems) {
                    this.element.empty();
                } else {
                    this.element.children().removeClass(this.css.flowItem);
                }
            },
            _destroyVerticalLayout: function () {
                this.element.removeClass(this.css.vertical);
                if (this.options.destroyItems) {
                    this.element.empty();
                } else {
                    this.element.children().removeClass(this.css.verticalItem);
                }
            },
            destroy: function () {
                /* destroy is part of the jQuery UI widget API and does the following:
                    1. Remove custom CSS classes that were added.
                    2. Remove any elements that were added at widget's initialization and after that, which didn't below to the original markup
                    3. Unbind all events that were bound.

                    ```
                    $(".selector").igLayoutManager("destroy");
                    ```
                */
                $.Widget.prototype.destroy.apply(this, arguments);
                this.element.removeClass(this.css.container);
                switch (this.options.layoutMode) {
                    case "grid":
                        this._destroyGridLayout();
                        break;
                    case "border":
                        this._destroyBorderLayout();
                        break;
                    case "flow":
                        this._destroyFlowLayout();
                        break;
                    case "vertical":
                        this._destroyVerticalLayout();
                        break;
                    default:
                        break;
                }
                if (this._opt.resizeLayout) {

                    // D.A. 24th October 2013 Remove the attached window events upon destroy
                    // D.A. 5th September 2014, Bug #169732 Removing reflow on element resize
                    //this.element.off('resize', this._opt.eventHandlers.elementResizeHandler);
                    $(window).off("resize", this._opt.eventHandlers.windowResizeHandler);
                }
                return this;
            }
        });
        $.extend($.ui.igLayoutManager, { version: "<build_number>" });
        return $.ui.igLayoutManager;// REMOVE_FROM_COMBINED_FILES
    }));// REMOVE_FROM_COMBINED_FILES
