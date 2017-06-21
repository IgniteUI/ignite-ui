/*!@license
 * Infragistics.Web.ClientUI Tile Manager <build_number>
 *
 * Copyright (c) 2011-<year> Infragistics Inc.
 *
 * http://www.infragistics.com/
 *
 * Depends on:
 *  jquery-1.9.1.js
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	infragistics.templating.js
 *	infragistics.dataSource.js
 *	infragistics.util.js
 *  infragistics.util.jquery.js
 *  infragistics.ui.splitter.js
 *	infragistics.ui.layoutmanager.js
 *	infragistics.ui.tilemanager-en.js
 */

(function (factory) {
	if (typeof define === "function" && define.amd) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"jquery-ui",
			"./infragistics.util",
			"./infragistics.util.jquery",
			"./infragistics.datasource",
			"./infragistics.templating",
			"./infragistics.ui.layoutmanager",
			"./infragistics.ui.splitter"
		], factory );
	} else {

		// Browser globals
		factory(jQuery);
	}
}
(function ($) {
    /*
		igTileManager is a widget based on jQuery UI that instantiates itself on existing markup or on any $.ig.DataSource supported data source
		type. The igTileManager control provides the functionality of wrapping content in a tile view and displaying them in a fully responsive
		grid layout.
	*/
    $.widget("ui.igTileManager", {
        css: {
            /* classes applied to the top container element */
            container: "ui-widget ui-igtilemanager ui-widget-content",
            /* classes applied to the left panel */
            leftPanel: "ui-igtilemanager-left",
            /* classes applied to the right panel */
            rightPanel: "ui-igtilemanager-right",
            /* classes applied to the tile header element */
            header: "ui-widget-header ui-igtile-header",
            /* classes applied to the tile content element */
            content: "ui-widget-content ui-igtile",
            /* classes applied to the tile content inner container element */
            innerContainer: "ui-igtile-inner-container",
            /* classes applied to the tiles in minimized state */
            minimized: "ui-igtile-minimized",
            /* classes applied to the tiles in maximized state */
            maximized: "ui-igtile-maximized",
            /* classes applied to the minimize button when a tile is in maximized state */
            minimizeButton: "ig-button ig-tile-minimize-button",
            /* classes applied to the tile minimize button icon element in the header */
            minimizeIcon: "ig-tile-minimize-icon",
            /* class applied to the tile button elements when hovered */
            hoverClass: "ui-state-hover",
            /* class applied to hide elements */
            hidden: "ui-helper-hidden",
            /* class applied to hide scrollbars */
            overflowHidden: "ui-helper-overflow-hidden",
            /* class applied to show overflowing elements */
            overflowVisible: "ui-helper-overflow-visible",
            /* class applied set element visibility to hidden */
            visibilityHidden: "ui-helper-visibility-hidden",
            /* class applied to right panel disabling the scroll while width is zero */
            splitterNoScroll: "ui-igsplitter-no-scroll"
        },
        options: {
            /* type="string|number|null Gets/Sets the width of the container."
            ```
                //Initialize
                $('.selector').igTileManager({
                    width: 300
                });

                //Get
                var width = $('.selector').igTileManager("option", "width");

                //Set
                $('.selector').igTileManager("option", "width", 300);
            ```
                string type="string" The container width can be set in pixels (px) and percentage (%).
                number type="number" The container width can be set as a number in pixels.
                null type="object" The default container width will be used.
            */
            width: null,
            /* type="string|number|null" Gets/Sets the height of the container.
            ```
                //Initialize
                $(".selector").igTileManager({
                    height : 400
                });

                //Get
                var height = $(".selector").igTileManager("option", "height");

                //Set
                $(".selector").igTileManager("option", "height", 400);
            ```
                string type="string" The height width can be set in pixels (px) and percentage (%).
                number type="number" The height width can be set as a number in pixels.
                null type="object" The height width can be set as a number in pixels.
            */
            height: null,
            /* type="string|number|null" Gets/Sets the width of each column in the container.
            ```
                //Initialize
                $('.selector').igTileManager({
                    columnWidth: 150
                });

                //Get
                var columnWidth = igTileManager("option", "columnWidth");

                //Set
                $igTileManager("option", "columnWidth", 150);
            ```
                string type="string" The column width can be set in pixels (px) or percentage (%).
                number type="number" The column width can be set as a number representing value in pixels.
                null type="object" The column width will be calculated based on the container width and the other options.
            */
            columnWidth: null,
            /* type="string|number|null" Gets/Sets the height of each column in the container.
            ```
                //Initialize
                $('.selector').igTileManager({
                    columnHeight: 150
                });

                //Get
                var columnHeight = igTileManager("option", "columnHeight");

                //Set
                $igTileManager("option", "columnHeight", 150);
            ```
                string type="string" The column height can be set in pixels (px) or percentage (%).
                number type="number" The column height can be set as a number representing value in pixels.
                null type="object" The column height will be calculated based on the container height and the other options.
            */
            columnHeight: null,
            /* type="number|null" Gets/Sets the columns count in the container.
            ```
                //Initialize
                $('.selector').igTileManager({
                    cols: 5
                });

                //Get
                var cols = igTileManager("option", "cols");

                //Set
                $igTileManager("option", "cols", 5);
            ```
                null type="object" The column count will be automatically calculated.
                number type="number" The column count can be set as a number.
            */
            cols: null,
            /* type="number|null" Gets/Sets the rows count in the container.
            ```
                //Initialize
                $('.selector').igTileManager({
                    rows: 5
                });

                //Get
                var rows = $('.selector').igTileManager("option", "rows");

                //Set
                var rows = 5;
                $('.selector').igTileManager("option", "rows", rows);
            ```
                number type="number" The row count can be set as a number.
                null type="object" The row count will be automatically calculated.
            */
            rows: null,
            /* type="number" Gets/Sets the horizontal spacing between tiles.
            ```
                //Initialize
                $(".selector").igTileManager({
                    marginLeft : 15
                });

                //Get
                var marginLeft = $(".selector").igTileManager("option", "marginLeft");

                //Set
                $(".selector").igTileManager("option", "marginLeft", 15);
            ```
                number type="number" The horizontal spacing between tiles can be set as a number.
            */
            marginLeft: 0,
            /* type="number" Gets/Sets the vertical spacing between tiles.
            ```
                //Initialize
                $(".selector").igTileManager({
                    marginTop : 15
                });

                //Get
                var marginTop = $(".selector").igTileManager("option", "marginTop");

                //Set
                $(".selector").igTileManager("option", "marginTop", 15);
            ```
                number type="number" The vertical spacing between tiles can be set as a number.
            */
            marginTop: 0,
            /* type="boolean" Gets/Sets whether the items will rearrange when the container is resized.
            ```
                //Initialize
                $(".selector").igTileManager({
                    rearrangeItems : false
                });

                //Get
                var rearrangeItems = $(".selector").igTileManager("option", "rearrangeItems");

                //Set
                $(".selector").igTileManager("option", "rearrangeItems", false);
            ```
            */
            rearrangeItems: true,
            /* type="array|null" Gets/Sets the tiles configurations. Every tile is described by rowSpan, colSpan, rowIndex and colIndex.
            ```
                //Initialize
                $('.selector').igTileManager({
                        items: [{ colSpan: 1, rowSpan: 1, colIndex: 0, rowIndex: 0 },
                                { colSpan: 2, rowSpan: 1, colIndex: 1, rowIndex: 0 },
                                { colSpan: 3, rowSpan: 2, colIndex: 0, rowIndex: 1 },
                                { colSpan: 3, rowSpan: 1, colIndex: 0, rowIndex: 3 }]
                });

                //Get
                var items = igTileManager("option", "items");

                //Set
                //Items configuration can be set when the new configuration matches the number of items in the old configuration
                var items = [{ colSpan: 1, rowSpan: 1, colIndex: 0, rowIndex: 0 },
                                { colSpan: 2, rowSpan: 1, colIndex: 1, rowIndex: 0 },
                                { colSpan: 3, rowSpan: 2, colIndex: 0, rowIndex: 1 },
                                { colSpan: 3, rowSpan: 1, colIndex: 0, rowIndex: 3 }];
                $('.selector').igTileManager("option", "items", items);
            ```
                array type="object" An array with colSpan, rowSpan, colIndex, rowIndex configurations for each tile.
                null type="object" Default tile configurations of rowSpan: 1 and colSpan: 1 will be used.
            */
            items: null,
            /* type="object" Specifies any valid data source accepted by [$.ig.DataSource](ig.datasource), or an instance of an [$.ig.DataSource](ig.datasource) itself.
            ```
                //Initialize
                $(".selector").igTileManager({
                    dataSource : data
                });

                //Get
                var data = $(".selector").igTileManager("option", "dataSource");

                //Set
                var dataSource = data;
                $(".selector").igTileManager("option", "dataSource", dataSource);
            ```
            */
            dataSource: null,
            /* type="string|null" Gets/Sets the content of the tiles in minimized state.
            ```
                //Initialize
                $('.selector').igTileManager({
                    minimizedState : 'h1'
                });

                //Get
                var minimizedState = $('.selector').igTileManager("option", "minimizedState");

                //Set
                var minimizedState = 'h1';
                $('.selector').igTileManager("option", "minimizedState", minimizedState);
            ```
                string type="string" When initializing on html markup provide jQuery selector specifying what content of the tile to be shown in minimized state. When initializing on data source provide igTemplate that will be rendered for the minimized state.
                null type="object" The whole content of the tile will be visible in minimized state.
            */
            minimizedState: null,
            /* type="string|null" Gets/Sets the content of the tiles in maximized state.
             ```
                //Initialize
                $('.selector').igTileManager({
                    maximizedState : 'div'
                });

                //Get
                var maximizedState = $('.selector').igTileManager("option", "maximizedState");

                //Set
                var maximizedState = 'div';
                $('.selector').igTileManager("option", "maximizedState", maximizedState);
            ```
                string type="string" When initializing on html markup provide jQuery selector specifying which elements of the tile to be shown in maximized state. When initializing on data source provide igTemplate that will be rendered for the maximized state.
                null type="object" The whole content of the tile will be visible in maximized state.
            */
            maximizedState: null,
            /* type="number|null" Gets/Sets the index of which items configuration will be used for positioning and sizing of the maximized tile.
            ```
                //Initialize
                $('.selector').igTileManager({
                        items: [{ colSpan: 1, rowSpan: 1, colIndex: 0, rowIndex: 0 },
                            { colSpan: 2, rowSpan: 1, colIndex: 1, rowIndex: 0 },
                            { colSpan: 3, rowSpan: 2, colIndex: 0, rowIndex: 1 },
                            { colSpan: 3, rowSpan: 1, colIndex: 0, rowIndex: 3 }],
                        maximizedTileIndex: 2
                });

                //Get
                var maximizedTileIndex = $('.selector').igTileManager("option", "maximizedTileIndex");

                //Set
                var index = 1;
                $('.selector').igTileManager("option", "maximizedTileIndex", index);
            ```
                number type="number" The maximizedTileindex can be set as a number.
                null type="object" Option is ignored.
            */
            maximizedTileIndex: null,

            // TODO: Implement custom tile selector
            /* type="string" Selector that specifies which elements to be considered as tiles when initializing from html markup. */

            //tileSelector: null,
            /* type="number|null" Gets/Sets how many columns to be displayed in the right panel when the tiles are minimized.
            ```
                //Initialize
                $('.selector').igTileManager({
                    rightPanelCols: 2
                });

                //Get
                var cols = $('.selector').igTileManager("option", "rightPanelCols");

                //Set
                var cols = 2;
                $('.selector').igTileManager("option", "rightPanelCols", cols);
            ```
                number type="number" Set the number of right panel columns as a number. The minimum value is 1.
                null type="object" Default of 1 column will be used.
            */
            rightPanelCols: 1,
            /* type="number|null" Gets/Sets the width of the minimized tiles in the right panel.
            ```
                //Initialize
                $('.selector').igTileManager({
                    rightPanelTilesWidth: 100
                });

                //Get
                var width = $('.selector').igTileManager("option", "rightPanelTilesWidth");

                //Set
                var width = 100;
                $('.selector').igTileManager("option", "rightPanelTilesWidth", width);
            ```
                number type="number" Set the width of the minimized tiles as a number.
                null type="object" Default value equal to the column width will be used.
            */
            rightPanelTilesWidth: null,
            /* type="number|null" Gets/Sets the height of the minimized tiles in the right panel.
            ```
                //Initialize
                $('.selector').igTileManager({
                    rightPanelTilesHeight: 100
                });

                //Get
                var height = $('.selector').igTileManager("option", "rightPanelTilesHeight");

                //Set
                var height = 100;
                $('.selector').igTileManager("option", "rightPanelTilesHeight", height);
            ```
                number type="number" Set the height of the minimized tiles as a number.
                null type="object" Default value equal to the column height will be used.
            */
            rightPanelTilesHeight: null,
            /* type="boolean" Gets/Sets whether the right panel should show scrollbar when tiles are overflowing.
            ```
                //Initialize
                $('.selector').igTileManager({
                    showRightPanelScroll: true
                });

                //Get
                var showRightScroll = $('.selector').igTileManager("option", "showRightPanelScroll");

                //Set
                var showRightScroll = true;
                $('.selector').igTileManager("option", "rightPanelTilesWidth", showRightScroll);
            ```
            */
            showRightPanelScroll: true,
            /* type="object" Configure the container variable representation, which defines splitter functionality.
            ```
                //Initialize
                $('.selector').igTileManager({
                    splitterOptions: {
                        enabled: true,
                        collapsed: false,
                        collapsible: true
                    }
                });

                //Get
                var splitterOptions = $(".selector").igTileManager("option", "splitterOptions");

                //Set
                var splitterOptions = { enabled : false };
                $(".selector").igTileManager("option", "splitterOptions", splitterOptions);
            ```
            */
            splitterOptions: {
                /* type="boolean" Gets/Sets whether the splitter should be enabled.
                ```
                    //Initialize
                    $('.selector').igTileManager({
                        splitterOptions: {
                            enabled: true
                        }
                    });

                    //Get
                    var splitterOptions = $(".selector").igTileManager("option", "splitterOptions");
                    splitterOptions.enabled;

                    //Set
                    var splitterOptions = { enabled : false };
                    $(".selector").igTileManager("option", "splitterOptions", splitterOptions);
                ```
                */
                enabled: true,
                /* type="boolean" Gets whether the splitter can be collapsible.
                ```
                    //Initialize
                    $('.selector').igTileManager({
                        splitterOptions: {
                            collapsible: true
                        }
                    });

                    //Get
                    var splitterOptions = $(".selector").igTileManager("option", "splitterOptions");
                    splitterOptions.collapsible;
                ```
                */
                collapsible: false,
                /* type="boolean" Gets whether the splitter should be initially collapsed.
                ```
                    //Initialize
                    $('.selector').igTileManager({
                        splitterOptions: {
                            collapsed: true
                        }
                    });

                    //Get
                    var splitterOptions = $(".selector").igTileManager("option", "splitterOptions");
                    splitterOptions.collapsed;
                ```
                */
                collapsed: false,
                /* type="object" Gets/Sets splitter events.
                ```
                    //Initialize
                    $('.selector').igTileManager({
                        splitterOptions: {
                            events: {
                                collapsed: function(evt, ui) {
                                    //return reference to igSplitter
                                    ui.owner;
                                    // return index of collapsed panel
                                    ui.index;
                                },
                                expanded: function (evt, ui) {
                                    //return reference to igSplitter
                                    ui.owner;
                                    // return index of expanded panel
                                    ui.index;
                                }
                            }
                        }
                    });

                    //Get
                    var splitterOptions = $(".selector").igTileManager("option", "splitterOptions");
                    splitterOptions.events;

                    //Set
                    var splitterOptions = {
                        events : {
                            collapsed: function(evt, ui) {...},
                            expanded: function (evt, ui) {...}
                        }
                    }
                    $(".selector").igTileManager("option", "splitterOptions", splitterOptions);
                ```
                */
                events: {
                    /* Event fired after collapsing is performed. Not cancellable.
                    ```
                        //Initialize
                        $('.selector').igTileManager({
                            splitterOptions: {
                                events: {
                                    collapsed: function(evt, ui) {
                                        //return reference to igSplitter
                                        ui.owner;
                                        // return index of collapsed panel
                                        ui.index;
                                    }
                                }
                            }
                        });

                        //Get
                        var splitterOptions = $(".selector").igTileManager("option", "splitterOptions");
                        splitterOptions.events.collapsed;

                        //Set
                        var splitterOptions = {
                            events : {
                                collapsed: function(evt, ui) {...}
                            }
                        }
                        $(".selector").igTileManager("option", "splitterOptions", splitterOptions);
                    ```
                    Function takes arguments evt and ui.
                    Use ui.owner to get a reference to the splitter instance.
                    Use ui.index to get an index of collased panel.
                    */
                    collapsed: null,
                    /* Event fired after expanding is performed. Not cancellable.
                    ```
                        //Initialize
                        $('.selector').igTileManager({
                            splitterOptions: {
                                    events: {
                                        expanded: function (evt, ui) {
                                        //return reference to igSplitter
                                        ui.owner;
                                        // return index of expanded panel
                                        ui.index;
                                    }
                                }
                            }
                        });

                        //Get
                        var splitterOptions = $(".selector").igTileManager("option", "splitterOptions");
                        splitterOptions.events.expanded;

                        //Set
                        var splitterOptions = {
                            events : {
                                expanded: function (evt, ui) {...}
                            }
                        }
                        $(".selector").igTileManager("option", "splitterOptions", splitterOptions);
                    ```
                    Function takes arguments evt and ui.
                    Use ui.owner to get a reference to the splitter instance.
                    Use ui.index to get an index of expanded panel.
                    */
                    expanded: null
                }
            },
            /* type="string" Gets/Sets JQuery selector that specifies which elements will not trigger maximizing when clicked on.
            ```
                //Initialize
                $('.selector').igTileManager({
                    preventMaximizingSelector : 'a, input'
                });

                //Get
                var selector = $('.selector').igTileManager("option", "preventMaximizingSelector");

                //Set
                var selector = 'a, input';
                $('.selector').igTileManager("option", "preventMaximizingSelector", selector);
            ```
            */
            preventMaximizingSelector: "a, input",
            /* type="number" Gets/Sets the duration of the animations in the tile manager.
            ```
                //Initialize
                $(".selector").igTileManager({
                    animationDuration : 1000
                    });

                //Get
                var animationDuration = $(".selector").igTileManager("option", "animationDuration");

                //Set
                $(".selector").igTileManager("option", "animationDuration", 1000);
            ```
            */
            animationDuration: 500,
            /* type="string" Specifies a remote URL accepted by [$.ig.DataSource](ig.datasource) in order to request data from it.
            ```
                //Initialize
                $(".selector").igTileManager({
                    dataSourceUrl : "data.svc"
                });

                //Get
                var url = $(".selector").igTileManager("option", "dataSourceUrl");

                //Set
                var url = "data.svc";
                $(".selector").igTileManager("option", "dataSourceUrl", url);
            ```
            */
            dataSourceUrl: null,
            /* type="string|null" Property in the response which specifies where the data records array will be held (if the response is wrapped). See [$.ig.DataSource responseDataKey](ig.datasource#options:settings.responseDataKey).
            ```
                //Initialize
                $('.selector').igTileManager({
                    responseDataKey : "d.results"
                });

                //Get
                var responseDataKey = $('.selector').igTileManager("option", "responseDataKey");

                //Set
                var responseDataKey = "d.results";
                $('.selector').igTileManager("option", "responseDataKey", responseDataKey);
            ```
				string type="string" Specifies the name of the property in which data records are held if the response is wrapped.
				null type="object" Option is ignored.
			*/
            responseDataKey: null,
            /* type="string|null" Explicitly set data source type (such as "json"). Please refer to the documentation of [$.ig.DataSource type](ig.datasource#options:settings.type) and its type property.
            ```
                //Initialize
                $('.selector').igTileManager({
                    responseDataType : "json"
                });

                //Get
                var responseDataType = $('.selector').igTileManager("option", "responseDataType");

                //Set
                var responseDataType = "json";
                $('.selector').igTileManager("option", "responseDataType", responseDataType);
            ```
                string type="string" Explicitly set data source type (such as "json"). Please refer to the documentation of $.ig.DataSource and its type property.
				null type="object" Option is ignored.
			*/
            responseDataType: null,
            /* type="string" Explicitly set data source type (such as "json"). Please refer to the documentation of [$.ig.DataSource type](ig.datasource#options:settings.type) and its type property.
            ```
                //Initialize
                $(".selector").igTileManager({
                    dataSourceType : "xml"
                });

                //Get
                var type = $(".selector").igTileManager("option", "dataSourceType");

                //Set
                var type = "xml";
                $(".selector").igTileManager("option", "dataSourceType", type);
            ```
            */
            dataSourceType: null,
            /* type="string" Specifies the HTTP request method.
            ```
                //Initialize
                $(".selector").igTileManager({
                        requestType : "get"
                });

                //Get
                var requestType = $('.selector').igTileManager("option", "requestType");

                //Set
                var requestType = "get";
                $('.selector').igTileManager("option", "requestType", requestType);
            ```
            */
            requestType: "GET",
            /* type="string" Gets/Sets the HTTP content type for the response object. See [Perform an asynchronous HTTP (Ajax) request](http://api.jquery.com/jQuery.ajax/).
            ```
                //Initialize
                $(".selector").igTileManager({
                    responseContentType : 'application/x-www-form-urlencoded; charset=UTF-8'
                )};

                //Get
                var respContentType = $('.selector').igTileManager("option", "responseContentType");

                //Set
                var respContentType = 'application/x-www-form-urlencoded; charset=UTF-8';
                $('.selector').igTileManager("option", "responseContentType", respContentType);
            ```
            */
            responseContentType: null
        },
        events: {
            /* cancel="true" Fired before databinding is performed
            ```
                //Bind
                $(document).delegate(".selector", "igtilemanagerdatabinding", function (evt, ui) {
                    // reference to igTileManager
                    ui.owner;
                    //reference to dataSource
                    ui.dataSource;
                });

                //Initialize
                $(".selector").igTileManager({
                    dataBinding: function(evt, ui) {...}
                });
            ```
            Function takes arguments evt and ui.
            Use ui.owner to get a reference to the tile manager performing databinding.
            Use ui.dataSource to get a reference to the [$.ig.DataSource](ig.datasource) the tile manager is to be databound to.
			*/
            dataBinding: "dataBinding",
            /* cancel="false" Fired after databinding is complete
            ```
                //Bind
                $(document).delegate(".selector", "igtilemanagerdatabound", function (evt, ui) {
                    // reference to igTilemanager
                    ui.owner;
                    // reference to the data the tile has been databound to.
                    ui.dataView;
                });

                //Initialize
                $(".selector").igTileManager({
                    dataBound: function(evt, ui) {...}
                });
            ```
            Function takes arguments evt and ui.
            Use ui.owner to get a reference to the tile manager performing databinding.
            Use ui.dataView to get a reference to the data the tile manager is databound to.
            Use ui.success to get see if the databinding was performed correctly.
            Use ui.errorMessage to get the error message if the databinding failed.
			*/
            dataBound: "dataBound",
            /* cancel="true" Fired before rendering of the tile manager begins.
            ```
                //Bind
                $(document).delegate(".selector", "igtilemanagerrendering", function (evt, ui) {
                    //reference to the tile.
                    ui.owner;
                    //reference to tiles
                    ui.tiles;
                    //reference to items
                    ui.items;
                });

                //Initialize
                $(".selector").igTileManager({
                    rendering: function(evt, ui) {...}
                });
            ```
            Function takes arguments evt and ui.
            Use ui.owner to get a reference to the tile manager performing rendering.
            Use ui.tiles to get a reference to the tiles the tile manager is going to render. If using data source this referes to the data provided.
            Use ui.items to get a reference to the item configurations the tile manager has.
			*/
            rendering: "rendering",
            /* cancel="false" Fired after rendering of the tile manager completes.
            ```
                //Bind
                $(document).delegate(".selector", "igtilemanagerrendered", function (evt, ui) {
                    // reference to the tile.
                    ui.owner;
                });

                //Initialize
                $(".selector").igTileManager({
                    rendered: function(evt, ui) {...}
                });
            ```
            Function takes arguments evt and ui.
            Use ui.owner to get a reference to the tile manager performing rendering.
			*/
            rendered: "rendered",
            /* cancel="true" Event fired before a tile is rendered in the container
            ```
                //Bind
                $(document).delegate(".selector", "igtilemanagertilerendering", function (evt, ui) {
                    //reference to the widget
                    ui.owner;
                    //reference to the tile.
                    ui.tile;
                });

                //Initialize
                $(".selector").igTileManager({
                    tileRendering: function(evt, ui) {...}
                });
            ```
            Function takes arguments evt and ui.
            Use ui.owner to get a reference to the tile manager performing rendering.
            Use ui.tile to get a reference to the tile being rendered
            */
            tileRendering: "tileRendering",
            /* cancel="false" Event Fired after a tile has been rendered in the container
            ```
                //Bind
                $(document).delegate(".selector", "igtilemanagertilerendered", function (evt, ui) {
                    //reference to the widget.
                    ui.owner;
                    //reference to the tile
                    ui.tile;
                });

                //Initialize
                $(".selector").igTileManager({
                    tileRendered: function(evt, ui) {...}
                });
            ```
            Function takes arguments evt and ui.
            Use ui.owner to get a reference to the tile manager performing rendering.
            Use ui.tile to get a reference to the rendered tile
			*/
            tileRendered: "tileRendered",
            /* cancel="true" Fired before a tile in the tile manager is maximized.
            ```
                //Bind
                $(document).delegate(".selector", "igtilemanagertilemaximizing", function (evt, ui) {
                    //reference to the widget.
                    ui.owner;
                    //reference to the tile that is going to be maximized.
                    ui.tile;
                    //reference to the tile that is going to be minimized or null if not any
                    ui.minimizingTile;
                });

                //Initialize
                $(".selector").igTileManager({
                    tileMaximizing: function(evt, ui) {...}
                });
            ```
            Function takes arguments evt and ui.
            Use ui.owner to get a reference to the tile manager performing the maximizing the tile belongs to.
            Use ui.tile to get the jQuery element of the tile being maximized
            Use ui.minimizingTile to get reference to the tile that is minimizing simultaneously or null if no tile is minimizing.
			*/
            tileMaximizing: "tileMaximizing",
            /* cancel="false" Fired after a tile in the tile manager is maximized.
            ```
                //Bind
                $(document).delegate(".selector", "igtilemanagertilemaximized", function (evt, ui) {
                    //reference to the widget.
                    ui.owner;
                    //reference to the maximized tile
                    ui.tile;
                });

                //Initialize
                $(".selector").igTileManager({
                    tileMaximized: function(evt, ui) {...}
                });
            ```
            Function takes arguments evt and ui.
            Use ui.owner to get a reference to the tile manager the maximized tile belongs to.
            Use ui.tile to get the jQuery element of the maximized tile
			*/
            tileMaximized: "tileMaximized",
            /* cancel="true" Fired before a tile in the tile manager is minimized.
            ```
                //Bind
                $(document).delegate(".selector", "igtilemanagertileminimizing", function (evt, ui) {
                    //reference to the widget.
                    ui.owner;
                    //reference to the tile that is going to be minimized
                    ui.tile;
                    //reference to the tile that is going to be maximized or null if not any
                    ui.maximizingTile;
                });

                //Initialize
                $(".selector").igTileManager({
                    tileMinimizing: function(evt, ui) {...}
                });
            ```
            Function takes arguments evt and ui.
            Use ui.owner to get a reference to the tile manager performing the minimizing the tile belongs to.
            Use ui.tile to get the jQuery element of the tile being minimized
            Use ui.maximizingTile to get reference to the tile that is maximizing simultaneously or null if no tile is maximizing.
            */
            tileMinimizing: "tileMinimizing",
            /* cancel="false" Fired after a tile in the tile manager is minimized.
            ```
                //Bind
                $(document).delegate(".selector", "igtilemanagertileminimized", function (evt, ui) {
                    //reference to the widget
                    ui.owner;
                    //reference to the tile that was minimized
                    ui.tile;
                });

                //Initialize
                $(".selector").igTileManager({
                    tileMinimized: function(evt, ui) {...}
                });
            ```
            Function takes arguments evt and ui.
            Use ui.owner to get a reference to the tile manager the minimized tile belongs to.
            Use ui.tile to get the jQuery element of the minimized tile
			*/
            tileMinimized: "tileMinimized"
        },

        // Selectors
        _selectors: {
            tileSelector: ".ui-igtile",
            minimizedTileSelector: ".ui-igtile-minimized",
            minimizeBtnSelector: ".ig-tile-minimize-button",
            minimizeIconSelector: ".ig-tile-minimize-icon",
            leftPanelSelector: ".ui-igtilemanager-left",
            rightPanelSelector: ".ui-igtilemanager-right",
            splitbarSelector: ".ui-igsplitter-splitbar-vertical",
            innerContainerSelector: ".ui-igtile-inner-container"
        },
        _createWidget: function () {
            $.Widget.prototype._createWidget.apply(this, arguments);
        },
        _create: function () {
            var opt = this.options;

            this._options = {
                $tiles: null,
                $maximizedTile: null,
                $leftPanel: null,
                $rightPanel: null,
                $layoutManagerElement: null, // The element on which the layout manager was instantiated
                fromMarkup: false,
                animating: false,
                useMaximizedTileIndex: false,
                rightPanelWidth: 0,
                gridLayout: null, // Reference to the internal layout manger"s gridLayout options
                elementHandlers: {},
                windowHandlers: {},
                splitterFirstExpandEventFired: false
            };

            this.element.addClass(this.css.container);

            if (opt.width) {
                this.element.css("width", opt.width);
            }

            if (opt.height) {
                this.element.css("height", opt.height);
            }

            // Set the default tile selector if such was not given
            this.options.tileSelector = this.options.tileSelector ||
                this._selectors.tileSelector;

            if (opt.dataSource !== null) {
                this.dataBind();
            } else {
                this._options.fromMarkup = true;
                this._initFromMarkup();
            }

            // P.P. 3 Sep 2015 #202506 - Disabled TileManager is fully functional
            if (this.options.disabled) {
                // This allows us to pass first check in _setOption method
                this.options.disabled = false;
                this._setOption("disabled", true);
            }

            this._attachEvents();
        },
        _setOption: function (option, value) {
            if (this.options[ option ] === value) {
                return;
            }

            var i, len, itemsMerged, items, glOption,
                self = this,
                _opt = this._options;

            $.Widget.prototype._setOption.apply(this, arguments);
            switch (option) {
                case "dataSource":
                    this.dataBind();
                    break;
                case "dataSourceUrl":
                    this.dataBind();
                    break;
                case "width":
                    if (!_opt.useMaximizedTileIndex) {
                        this.minimize(0);
                    }
                    this.element.width(this.options.width);
                    this.reflow(true, 0);
                    break;
                case "height":
                    if (!_opt.useMaximizedTileIndex) {
                        this.minimize(0);
                    }
                    this.element.height(this.options.height);
                    this.reflow(true, 0);
                    break;
                case "columnWidth":
                case "columnHeight":
                case "cols":
                case "rows":
                case "marginLeft":
                case "marginTop":
                case "rearrangeItems":

                    // D.A. 9th July 2014, Bug #174952 Setting the 'cols'
                    // option while a tile is maximized breaks the control.
                    if (!_opt.useMaximizedTileIndex) {
                        this.minimize(0);
                    }

                    glOption = {};
                    glOption[ option ] = value;

                    _opt.$layoutManagerElement.igLayoutManager(
                        "option", "gridLayout", glOption);

                    // Update the reference to the Layout Manager's internal gridLayout options
                    _opt.gridLayout = this.layoutManager()._opt.gridLayout;
                    break;
                case "items":

                    // TODO: Implement setting items number different than the number of tiles
                    if (value.length !== _opt.$tiles.length) {
                        throw new Error($.ig.TileManager.locale.setOptionItemsLengthError);
                    }

                    if (_opt.useMaximizedTileIndex) {

                        // Preserve the items order
                        // When setting new items configuration with maximizedTileIndex option
                        // the configuration will be applied according to the tiles current position.
                        // This is necessary to ensure consistency when the maximziedTileIndex is used because the tiles can swap places
                        // E.g. the first item configuration will be applied to the tile that is
                        // in the first position at the moment when set option is called.
                        // The tiles are ordered from top left to bottom right. Tile at first position is top left.

                        // Merge old items and new items
                        itemsMerged = $.extend(true, [], this._options
                            .$layoutManagerElement.igLayoutManager("option", "items"), value);
                    } else {
                        this.minimize(0);
                    }

                    _opt.$layoutManagerElement.igLayoutManager("option", "items", value);
                    _opt.gridLayout = this.layoutManager()._opt.gridLayout;

                    if (_opt.useMaximizedTileIndex) {
                        items =
                            this._options.$layoutManagerElement.igLayoutManager("option", "items");
                        len = items.length;

                        // D.A. 19th September 2014, Bug #180981 Items setOption with maximizedTileIndex works incorrectly
                        // Override layout manager's items with the old items to preserve the items order and the current maximized tile
                        for (i = 0; i < len; i++) {
                            $.extend(true, items[ i ], itemsMerged[ i ]);
                        }

                        // Sort the items
                        this.layoutManager()._glSortItemsByPositionOrder();

                        // Update initialItems
                        _opt.gridLayout.initialItems = $.extend(true, [], this._options
                            .$layoutManagerElement.igLayoutManager("option", "items"));
                    }

                    this.reflow(true, 0);
                    break;
                case "minimizedState":
                    _opt.$tiles.not(_opt.$maximizedTile).each(function () {
                        self._toMinimizedState($(this));
                    });
                    break;
                case "maximizedState":
                    if (_opt.$maximizedTile) {
                        this._toMaximizedState(_opt.$maximizedTile);
                    }
                    break;
                case "maximizedTileIndex":
                    this._toMinimizedState(_opt.$maximizedTile);
                    _opt.$maximizedTile = _opt.$tiles.filter(
                        "[data-index=" + this.options.maximizedTileIndex + "]");
                    this._toMaximizedState(_opt.$maximizedTile);
                    break;
                case "rightPanelCols":
                    if (_opt.$maximizedTile && !_opt.useMaximizedTileIndex) {
                        this._setRightPanelSize();
                        this._positionRightPanelTiles(_opt.$tiles.not(_opt.$maximizedTile),
                            parseInt(_opt.$maximizedTile.attr("data-index"), 10), false, false);
                    }
                    break;
                case "rightPanelTilesWidth":
                    if (_opt.$maximizedTile && !_opt.useMaximizedTileIndex) {
                        this._setRightPanelSize();
                        this._positionRightPanelTiles(_opt.$tiles.not(_opt.$maximizedTile),
                            parseInt(_opt.$maximizedTile.attr("data-index"), 10), false, true);
                    }
                    break;
                case "rightPanelTilesHeight":
                    if (_opt.$maximizedTile && !_opt.useMaximizedTileIndex) {
                        this._setRightPanelSize();
                        this._positionRightPanelTiles(_opt.$tiles.not(_opt.$maximizedTile),
                            parseInt(_opt.$maximizedTile.attr("data-index"), 10), false, true);
                    }
                    break;
                case "showRightPanelScroll":
                    if (!_opt.useMaximizedTileIndex) {
                        if (value) {
                            _opt.$rightPanel.removeClass(this.css.overflowHidden);
                        } else {
                            _opt.$rightPanel.addClass(this.css.overflowHidden);
                        }

                        if (_opt.$maximizedTile) {
                            this._setRightPanelSize();
                        }
                    }
                    break;
                case "splitterOptions":
                    if (value.hasOwnProperty("collapsed") || value.hasOwnProperty("collapsible")) {
                        throw new Error($.ig.Splitter.locale.errorSettingOption);
                    }

                    if (value.enabled === true) {
                        this.element
                            .children(this._selectors.splitbarSelector)
                                .removeClass(this.css.visibilityHidden);
                    } else if (value.enabled === false) {
                        this.element
                            .children(this._selectors.splitbarSelector)
                                .addClass(this.css.visibilityHidden);
                    }

                    if (value.events && value.events.collapsed) {
                        this.element.igSplitter({
                            collapsed: value.events.collapsed
                        });
                    }

                    if (value.events && value.events.expanded) {
                        this.element.igSplitter({
                            expanded: value.events.expanded
                        });
                    }

                    value = $.extend(true, {}, this.layoutManager().options.splitterOptions, value);
                    break;
                case "animationDuration":

                    // Update the animation duration in the layout manager
                    this.layoutManager().options.gridLayout.animationDuration = value;
                    break;

                    // P.P. 3 Sep 2015 #202506 - Disabled TileManager is fully functional
                case "disabled":
                    this._toggleDisabled(value);
                    break;
                default:
                    break;
            }
        },
        _initFromMarkup: function () {
            var $tiles,
                $children = this.element.children(),
                $filtered = $children.filter(this.options.tileSelector);

            // Tiles are rendered for elements matching the tile selector.
            if ($filtered.length) {
                $tiles = $filtered;
                $children
                    .not($tiles)
                        .addClass(this.css.hidden);
            } else {

                // Tiles are rendered for all elements when no match is found.
                $tiles = this.element.children();
            }

            // Wrap all tiles with div elements.
            // The Layout manager uses them for its initialization.
            $tiles.wrap("<div>");
            this._initLayoutManager($tiles);
        },
        _renderData: function (success, msg, data) {
            var _opt = this._options;

            this._triggerDataBound(success, msg, data._data);

            if (success) {

                // Destroy layout manager and splitter in case of rebinding
                if (_opt.$layoutManagerElement) {
                    _opt.$layoutManagerElement.igLayoutManager("destroy");
                    if (!_opt.useMaximizedTileIndex) {
                        this.element.igSplitter("destroy");
                    }
                    this._resetInternalOptions();
                }

                this.element.empty();
                this._initLayoutManager(data._data);
            } else {
                throw new Error($.ig.TileManager.locale.renderDataError);
            }
        },
        _resetInternalOptions: function () {
            var _opt = this._options;

            _opt.gridLayout = null;
            _opt.$layoutManagerElement = null;
            _opt.$leftPanel = null;
            _opt.$rightPanel = null;
            _opt.$maximizedTile = null;
            _opt.$tiles = null;
            _opt.animating = false;
        },
        _initDataSource: function () {
            var opt = this.options,
                dataOpt;

            if (!opt.dataSource && opt.dataSourceUrl) {
                opt.dataSource = opt.dataSourceUrl;
            }

            if (!(opt.dataSource instanceof $.ig.DataSource)) {
                dataOpt = {
                    callback: this._renderData,
                    callee: this,
                    dataSource: opt.dataSource,
                    requestType: opt.requestType,
                    responseContentType: opt.responseContentType,
                    responseDataType: opt.responseDataType,
                    localSchemaTransform: false
                };

                if (opt.responseDataKey) {
                    dataOpt.responseDataKey = opt.responseDataKey;
                }

                if (opt.dataSourceType) {
                    dataOpt.dataSourceType = opt.dataSourceType;
                }

                opt.dataSource = new $.ig.DataSource(dataOpt);
            }
        },
        _tileRendered: function (event, ui) {
            var _opt = this._options,
                $tile = ui.item,
                renderMaximizedState = _opt.useMaximizedTileIndex &&
                    this.options.maximizedTileIndex === ui.index,
                $innerContainer;

            if (_opt.fromMarkup) {
                $innerContainer = $tile.children();

                if (!_opt.useMaximizedTileIndex) {
                    $innerContainer
                        .prepend(this._renderMinimizeButton());
                }

                if (renderMaximizedState) {
                    if (this.options.maximizedState) {

                        // Hide all but maximized state markup
                        $innerContainer
                            .children()
                                .not(this.options.maximizedState)
                                    .addClass(this.css.hidden);
                    }
                } else if (this.options.minimizedState) {

                    // Hide all but minimized state markup
                    $innerContainer
                        .children()
                            .not(this.options.minimizedState)
                                .addClass(this.css.hidden);
                }
            } else {

                // Render the inner container when from data source
                $innerContainer = $("<div/>").appendTo($tile);

                if (renderMaximizedState) {
                    $innerContainer
                        .html(this._renderMaximizedState(ui.index));
                } else {
                    $innerContainer
                        .html(this._renderMinimizedState(ui.index));
                }
            }

            $innerContainer.addClass(this.css.innerContainer);
            $tile
                .addClass(this.css.content)
                .addClass(renderMaximizedState ? this.css.maximized : this.css.minimized);

            this._triggerTileRendered(event, ui);
        },
        _initLayoutManager: function ($tiles) {
            var self = this,
                opt = this.options,
                _opt = this._options,
                items = [],
                lengthDiff, noCancel, i;

            if (opt.items) {
                $.extend(items, opt.items);
            }

            // Equalize the length of the tiles and items
            if ($tiles.length > items.length) {
                lengthDiff = $tiles.length - items.length;

                for (i = 0; i < lengthDiff; i++) {

                    // Add item for each tile to be rendered.
                    // The Layout manager expects item config for each tile.
                    items.push({});
                }
            } else {

                // When the tiles are less than the tile configurations
                // remove the not used configurations
                items.splice($tiles.length);
            }

            noCancel = this._triggerRendering($tiles, items);
            if (noCancel) {
                if (!(typeof opt.maximizedTileIndex === "number" &&
                        $tiles.length >= opt.maximizedTileIndex)) {

                    // Add panels and render the splitter
                    this._addPanels();

                    // Set overflow hidden before the tiles are rendered.
                    // Scrollbars could be caused by the initial markup in the element.
                    _opt.$leftPanel.addClass(this.css.overflowHidden);

                    this._renderSplitter();

                    // Store the layout manager element
                    _opt.$layoutManagerElement = _opt.$leftPanel;

                    // Initialize the layoutManager on the leftPanel
                    _opt.$leftPanel.igLayoutManager($.extend(true, {}, {
                        layoutMode: "grid",
                        items: items,
                        gridLayout: {
                            columnWidth: opt.columnWidth,
                            columnHeight: opt.columnHeight,
                            cols: opt.cols,
                            rows: opt.rows,
                            marginLeft: opt.marginLeft,
                            marginTop: opt.marginTop,
                            rearrangeItems: opt.rearrangeItems,
                            animationDuration: opt.animationDuration,
                            overrideConfigOnSetOption: false,
                            useOffset: false
                        },
                        itemRendered: function (event, ui) {
                            noCancel = self._triggerTileRendering(event, ui);
                            if (noCancel) {
                                self._tileRendered(event, ui);
                            }
                        },
                        rendered: function () {

                            // Save reference to the Layout Manager's internal gridLayout options
                            _opt.gridLayout = self.layoutManager()._opt.gridLayout;

                            // Remove the overflow hidden when the tiles are rendered
                            // and before the layout manager reflow is called.
                            _opt.$leftPanel.removeClass(self.css.overflowHidden);

                            // Store the rendered by the layout manager tiles in _opt.$tiles
                            _opt.$tiles = $(this).data("igLayoutManager")._opt.gridLayout.elements;
                            self._triggerRendered();
                        },
                        internalResizing: function () {

                            // Cancel the event when maximized tile is present
                            if (_opt.$maximizedTile) {
                                return false;
                            }
                        },
                        internalResized: function (event) {

                            // D.A. 10th September 2014, Bug #178636 The 'items' option should return the current array of items
                            self.options.items = self.layoutManager().options.items;

                            // When the internalResized was triggered by the minimize method call.
                            // Reset the maximized tile and trigger the tile minimized event.
                            if (_opt.$maximizedTile) {
                                _opt.animating = false;
                                if (event) {
                                    self._triggerTileMinimized(event, _opt.$maximizedTile);
                                }
                                _opt.$maximizedTile = null;
                            }
                        }
                    }));
                } else {
                    _opt.useMaximizedTileIndex = true;

                    // Set overflow hidden before the tiles are rendered.
                    // Scrollbars could be caused by the initial markup in the element.
                    this.element.addClass(this.css.overflowHidden);

                    // Store the layout manager element
                    _opt.$layoutManagerElement = this.element;

                    // Initialize the layoutManager on the element
                    this.element.igLayoutManager($.extend(true, {}, {
                        layoutMode: "grid",
                        items: items,
                        gridLayout: {
                            columnWidth: opt.columnWidth,
                            columnHeight: opt.columnHeight,
                            cols: opt.cols,
                            rows: opt.rows,
                            marginLeft: opt.marginLeft,
                            marginTop: opt.marginTop,
                            rearrangeItems: opt.rearrangeItems,
                            animationDuration: opt.animationDuration,
                            overrideConfigOnSetOption: false,
                            useOffset: false
                        },
                        itemRendered: function (event, ui) {
                            noCancel = self._triggerTileRendering(event, ui);
                            if (noCancel) {
                                self._tileRendered(event, ui);
                            }
                        },
                        rendered: function () {

                            // Save reference to the Layout Manager's internal gridLayout options
                            _opt.gridLayout = self.layoutManager()._opt.gridLayout;

                            // Remove the overflow hidden when the tiles are rendered
                            // and before the layout manager reflow is called.
                            self.element.removeClass(self.css.overflowHidden);

                            // Store the rendered by the layout manager tiles in _opt.$tiles
                            _opt.$tiles = $(this).data("igLayoutManager")._opt.gridLayout.elements;
                            self._triggerRendered();
                        },
                        internalResized: function () {

                            // D.A. 10th September 2014, Bug #178636 The "items' option should return the current array of items
                            self.options.items = self.layoutManager().options.items;
                        }
                    }));

                    _opt.$maximizedTile = _opt.$tiles.filter(
                        "[data-index=" + opt.maximizedTileIndex + "]");
                }

                // D.A. 10th September 2014, Bug #178636 The 'items' option should return the current array of items
                this.options.items = this.layoutManager().options.items;
            }
        },
        _toMaximizedState: function ($tile) {
            var $innerContChildren,
                $innerContainer = $tile.children(this._selectors.innerContainerSelector);

            $tile
                .removeClass(this.css.minimized)
                .addClass(this.css.maximized);

            if (!this._options.fromMarkup) {

                // Render the maximized template if from data source
                $innerContainer
                    .html((this._options.useMaximizedTileIndex ?
                        "" : this._renderMinimizeButton()) +
                        this._renderMaximizedState($tile.attr("data-index")));
            } else {
                $innerContChildren = $innerContainer.children();

                if (this.options.maximizedState) {

                    // Hide all elements
                    $innerContChildren
                        .not(this.options.maximizedState)
                            .addClass(this.css.hidden);

                    // Show only maximized state markup and the minimize button
                    $innerContChildren
                        .filter(this.options.maximizedState +
                            ", " + this._selectors.minimizeBtnSelector)
                            .removeClass(this.css.hidden);
                } else {

                    // Show all elements when the maximizedState option is not used
                    $innerContChildren.removeClass(this.css.hidden);
                }
            }
        },
        _toMinimizedState: function ($tile) {
            var $innerContainer = $tile.children(this._selectors.innerContainerSelector),
                $minimizedState,
                $children;

            $tile
                .removeClass(this.css.maximized)
                .addClass(this.css.minimized);

            if (!this._options.fromMarkup) {

                // Render the minimized template if from data source
                $innerContainer
                    .html(this._renderMinimizedState($tile.attr("data-index")));
            } else {
                $children = $innerContainer.children();

                if (this.options.minimizedState) {
                    $minimizedState = $children.filter(this.options.minimizedState);

                    // Hide all elements
                    $children
                        .not($minimizedState)
                            .addClass(this.css.hidden);

                    // Show only minimized state markup
                    $minimizedState.removeClass(this.css.hidden);
                } else {

                    // Show all elements when no minimized state is given
                    $children.removeClass(this.css.hidden);
                }
            }
        },
        _renderMaximizedState: function (index) {
            return this.options.maximizedState ?
                $.ig.tmpl(this.options.maximizedState, this.options.dataSource.data()[ index ]) :
                this._renderMinimizedState(index);
        },
        _renderMinimizedState: function (index) {
            return this.options.minimizedState ?
                $.ig.tmpl(this.options.minimizedState, this.options.dataSource.data()[ index ]) :
                "";
        },
        _renderMinimizeButton: function () {
            return '<span class="' + this.css.minimizeButton + '">' +
                '<span class="' + this.css.minimizeIcon + '"></span></span>';
        },
        _addPanels: function () {
            var _opt = this._options,
                markup = this.element.children(),
                $leftPanel = $("<div/>").addClass(this.css.leftPanel),
                $rightPanel = $("<div/>").addClass(
                    this.css.rightPanel + " " + this.css.hidden);

            $leftPanel.appendTo(this.element);
            $rightPanel.appendTo(this.element);

            _opt.$leftPanel = $leftPanel;
            _opt.$rightPanel = $rightPanel;

            if (!this.options.showRightPanelScroll) {
                _opt.$rightPanel.addClass(this.css.overflowHidden);
            }

            // Move the markup to the left panel
            markup.appendTo(_opt.$leftPanel);
        },

        // Removes the panels
        // Appends the initial markup back to the main container
        _removePanels: function () {
            this.element
                .children(this._selectors.leftPanelSelector)
                    .children()
                        .appendTo(this.element);

            this.element
                .children(this._selectors.leftPanelSelector + ", " +
                    this._selectors.rightPanelSelector)
                    .remove();

            this._options.$leftPanel = null;
            this._options.$rightPanel = null;
        },
        _renderSplitter: function () {
            var self = this,
                opt = this.options,
                _opt = this._options;

            this.element.igSplitter({
                panels: [{ }, {
                        collapsible: opt.splitterOptions.collapsible,
                        collapsed: opt.splitterOptions.collapsed
                }],

                // D.A. 29th April 2014, Bug #164471 Maximizing a tile causes all tile manager's on the same page to resize their containers.
                resizeOtherSplitters: false,
                layoutRefreshing: function () {

                    // D.A. 10th July 2013. Bug#146523 Cancel the splitter layoutRefreshing
                    // event which caused panels resizing. That would lead to scrollbars and
                    // incorrect sizing of the tiles when the layout manager reflow is called
                    return false;
                },
                resizeStarted: function () {
                    _opt.rightPanelWidth = _opt.$rightPanel.width();
                },
                resizeEnded: function () {
                    var gl = _opt.gridLayout,
                        rightPanelWidth = _opt.$rightPanel.width(),
                        rightPanelTilesWidth = self._getRightPanelTilesWidth(),
                        rightPanelTilesHeight = self._getRightPanelTilesHeight(),
                        $tiles = _opt.$tiles.not(_opt.$maximizedTile),
                        rightPanelCols, oldRightPanelCols, rightPanelHasScroll;

                    if (_opt.rightPanelWidth > rightPanelWidth) {

                        // Round down cols when user reduces the width
                        rightPanelCols = Math.floor(rightPanelWidth /
                            (rightPanelTilesWidth + gl.marginLeft));
                    } else {

                        // Round up cols when user increases the width
                        rightPanelCols = Math.ceil(rightPanelWidth /
                            (rightPanelTilesWidth + gl.marginLeft));
                    }

                    // Detect whether the right panel will have scroll after the animation
                    rightPanelHasScroll = self.options.showRightPanelScroll &&
                        (Math.ceil($tiles.length / rightPanelCols) *
                        (rightPanelTilesHeight + gl.marginTop)) >
                        _opt.$rightPanel.height();

                    // Recalculate the cols when the panel has scroll
                    if (rightPanelHasScroll) {
                        if (_opt.rightPanelWidth > rightPanelWidth) {

                            // Round down cols when user reduces the width
                            rightPanelCols = Math.floor((rightPanelWidth -
                                $.ig.util.getScrollWidth()) /
                                (rightPanelTilesWidth + gl.marginLeft));
                        } else {

                            // Round up cols when user increases the width
                            rightPanelCols = Math.ceil((rightPanelWidth -
                                $.ig.util.getScrollWidth()) /
                                (rightPanelTilesWidth + gl.marginLeft));
                        }
                    }

                    oldRightPanelCols = self.options.rightPanelCols;
                    self.options.rightPanelCols = rightPanelCols;
                    self._setRightPanelSize();

                    // Resize only if the new size wasn't changed by _setRightPanelSize
                    if (oldRightPanelCols !== self.options.rightPanelCols) {
                        self._positionRightPanelTiles($tiles, parseInt(
                            _opt.$maximizedTile.attr("data-index"), 10), false, false);
                    }

                    _opt.rightPanelWidth = rightPanelWidth;
                },
                collapsed: opt.splitterOptions.events.collapsed,
                expanded: function (evt, ui) {

                    // It is needed because if the right panel is initially collapsed and we expand it
                    // the splitter is positioned in the middle.
                    if (!_opt.splitterFirstExpandEventFired) {
                        _opt.splitterFirstExpandEventFired = true;
                        self._setRightPanelSize();
                    }

                    if (opt.splitterOptions.events.expanded) {
                        opt.splitterOptions.events.expanded(evt, ui);
                    }
                }
            });

            // Hide the splitter on init
            this._hideSplitterElements();
        },
        _attachEvents: function () {
            var self = this,
                _opt = this._options,
                minimizeBtnSelector = this._selectors.minimizeBtnSelector,
                minimizedTileSelector = this._selectors.minimizedTileSelector,
                splitter = this.splitter(),
                elHandlers = _opt.elementHandlers,
                noCancel;

            // Event handler for click on the minimized tiles
            elHandlers.minimizedTileClick = function (event) {
                var $target = $(event.target),
                    $tileToMaximize = $(this);

                self._stopEventPropagation(event);

                // P.P. 3 Sep 2015 #202506 - Disabled TileManager is fully functional
                if (self.options.disabled) {
                    return;
                }

                // Prevent maximizing when the event target matches the preventMaximizingSelector
                if ($target.is(self.options.preventMaximizingSelector)) {
                    return;
                }

                // Trigger maximize event
                if (!_opt.animating) {
                    _opt.animating = true;
                    $tileToMaximize.removeClass(self.css.hoverClass);
                    noCancel = self._triggerTileMaximizing(event, $tileToMaximize);

                    if (_opt.$maximizedTile) {

                        // Trigger minimizing when another maximized tile is present.
                        self._triggerTileMinimizing(
                            event, _opt.$maximizedTile, $tileToMaximize);
                    }

                    if (noCancel) {
                        self.maximize($tileToMaximize, self.options.animationDuration, event);
                    } else {
                        _opt.animating = false;
                    }
                }
            };

            // Event handler for mouse over the minimized tiles
            elHandlers.miminimizedTileMouseOver = function (event) {
                self._stopEventPropagation(event);

                // P.P. 3 Sep 2015 #202506 - Disabled TileManager is fully functional
                if (self.options.disabled) {
                    return;
                }

                // D.A Bug #145029 Do not add the hover effect when the
                // animation is in progress or the splitter is dragged
                if (!(_opt.animating || (splitter && splitter._isDrag))) {
                    $(this).addClass(self.css.hoverClass);
                }
            };

            // Event handler for mouse out of the minimized tiles
            elHandlers.minimizedTileMouseOut = function (event) {
                self._stopEventPropagation(event);

                // P.P. 3 Sep 2015 #202506 - Disabled TileManager is fully functional
                if (self.options.disabled) {
                    return;
                }

                $(this).removeClass(self.css.hoverClass);
            };

            // Event handler for click on the minimize button
            elHandlers.minimizeBtnClick = function (event) {

                // Stop minimize button click propagation. If the animation duration is set to 0 and
                // the event is not stopped, then minimize followed by maximize is triggered.
                self._stopEventPropagation(event);

                // P.P. 3 Sep 2015 #202506 - Disabled TileManager is fully functional
                if (self.options.disabled) {
                    return;
                }

                if (!_opt.animating) {
                    _opt.animating = true;
                    noCancel = self._triggerTileMinimizing(event, _opt.$maximizedTile);

                    if (noCancel) {
                        self.minimize(null, event);
                    } else {
                        _opt.animating = false;
                    }
                }
            };

            // Event handler for mouse over the minimize button
            elHandlers.minimizeBtnMouseOver = function (event) {
                self._stopEventPropagation(event);

                // P.P. 3 Sep 2015 #202506 - Disabled TileManager is fully functional
                if (self.options.disabled) {
                    return;
                }

                // D.A Bug #145029 Do not add the hover effect when the
                // animation is in progress or the splitter is dragged
                if (!(_opt.animating || (splitter && splitter._isDrag))) {
                    $(this)
                        .children(self._selectors.minimizeIconSelector)
                            .addClass(self.css.hoverClass);
                }
            };

            // Event handler for mouse out of the minimize button
            elHandlers.minimizeBtnMouseOut = function (event) {
                self._stopEventPropagation(event);

                // P.P. 3 Sep 2015 #202506 - Disabled TileManager is fully functional
                if (self.options.disabled) {
                    return;
                }

                $(this)
                    .children(self._selectors.minimizeIconSelector)
                        .removeClass(self.css.hoverClass);
            };

            // Attach events to the tiles in minimized state
            this.element
                .on("click", minimizedTileSelector, elHandlers.minimizedTileClick)
                .on("mouseover", minimizedTileSelector, elHandlers.miminimizedTileMouseOver)
                .on("mouseout", minimizedTileSelector, elHandlers.minimizedTileMouseOut)
                .on("click", minimizeBtnSelector, elHandlers.minimizeBtnClick)
                .on("mouseover", minimizeBtnSelector, elHandlers.minimizeBtnMouseOver)
                .on("mouseout", minimizeBtnSelector, elHandlers.minimizeBtnMouseOut);

            // Resize the leftPanel, not the right when the container is resized with maximizedTile.
            // TODO: This functionality should be added in the splitter as an option to resize
            // the leftPanel instead of the right when container's size is changed
            _opt.windowHandlers.resize = function () {
                if (_opt.$maximizedTile && !_opt.useMaximizedTileIndex) {
                    self._setRightPanelSize();
                }
            };

            $(window).on("resize", _opt.windowHandlers.resize);
        },

        // Stops the event propagation. In case of nested tile managers the event
        // will be caught only once by the innermost tile manager.
        _stopEventPropagation: function (event) {
            if (event.stopPropagation) {
                event.stopPropagation();
            }

            if (event.cancelBubble !== null || event.cancelBubble !== undefined) {
                event.cancelBubble = true;
            }
        },
        _getRightPanelTilesWidth: function () {

            // D.A. 29th April 2014, Bug #170433 Added rigtPanelTiles width/height support for string values
            return parseInt(this.options.rightPanelTilesWidth, 10) ||
                this._options.gridLayout.columnWidth;
        },
        _getRightPanelTilesHeight: function () {
            return parseInt(this.options.rightPanelTilesHeight, 10) ||
                this._options.gridLayout.columnHeight;
        },
        _setRightPanelSize: function () {
            var self = this,
                opt = this.options,
                _opt = this._options,
                gl = _opt.gridLayout,

                // The minimum width that the maximized tile should have
                minMaximizedTileWidth = gl.columnWidth + 2 * gl.marginLeft,
                rightTilesTotalWidth = this._getRightPanelTilesWidth() + gl.marginLeft,
                rightTilesTotalHeight = this._getRightPanelTilesHeight() + gl.marginTop,
                rightPanelHeight = _opt.$rightPanel.height(),
                splitterWidth = this.element.
                    children(this._selectors.splitbarSelector).outerWidth(true),
                scrollWidth = $.ig.util.getScrollWidth(),
                maxCols, minWidth, rightPanelWidth, leftPanelWidth,
                rightPanelHasScroll = function () {

                    // Detect whether the right panel will have scroll after the animation
                    return self.options.showRightPanelScroll &&
                        (Math.ceil((_opt.$tiles.length - 1) / self.options.rightPanelCols) *
                        rightTilesTotalHeight) > rightPanelHeight;
                };

            if (opt.rightPanelCols < 1) {

                // Right panel cols cannot be less than 1
                opt.rightPanelCols = 1;
            }

            // Calculate the maximum number of columns that can be shown in the right panel.
            maxCols = Math.max(Math.floor((this.element.width() -
                minMaximizedTileWidth - splitterWidth -
                (rightPanelHasScroll() ? scrollWidth : 0)) / rightTilesTotalWidth), 1);

            if (opt.rightPanelCols > maxCols) {
                opt.rightPanelCols = maxCols;
            }

            rightPanelWidth = opt.rightPanelCols * rightTilesTotalWidth +
                (rightPanelHasScroll() ? scrollWidth : 0);

            // D.A. 14th October 2013 Bug #151452 Added min width to the container when a tile is maximized.
            // This should prevent issues when the container is too small to show the maximized tile and the right column.
            minWidth = rightPanelWidth + minMaximizedTileWidth + splitterWidth;
            this.element.css("min-width", minWidth);
            leftPanelWidth = this.element.width() - rightPanelWidth -
                2 * gl.marginLeft - splitterWidth;

            // Call the splitter set size method.
            this.element.igSplitter("setFirstPanelSize", leftPanelWidth);
        },

        // tiles - the tiles to be positioned
        // maximizingTileIndex - the index of the tile that is simultaneously maximizing
        // In case of setOption, this is the index of the tile that is already maximized
        // containerSwap - if the tiles should swap containers
        // animateSize - if the tiles width/height to be animated too
        // animDuration - the animation duration for this reposition
        // callback - function to be executed when the animation ends
        _positionRightPanelTiles: function (
            $tiles, maximizingTileIndex, containerSwap, animateSize, animDuration, callback) {
            var opt = this.options,
                _opt = this._options,
                gl = _opt.gridLayout,
                rightPanelTilesWidth = this._getRightPanelTilesWidth(),
                rightPanelTilesHeight = this._getRightPanelTilesHeight(),
                leftAdjustment = containerSwap ?
                    _opt.$rightPanel.position().left - gl.marginLeft : 0,
                topAdjustment = containerSwap ?
                    _opt.$rightPanel.scrollTop() : 0,
                rightPanelCols = opt.rightPanelCols;

            animDuration = typeof animDuration === "number" ?
                animDuration : this.options.animationDuration;

            $tiles.each(function () {
                var $tile = $(this),
                    tileIndex = parseInt($tile.attr("data-index"), 10),
                    tileLeft, tileTop, newDim;

                // The maximizing tile position should not be empty.
                // Each tile positioned after the maximizing tile should be adjusted with one position.
                if (tileIndex > maximizingTileIndex) {
                    tileTop = Math.floor((tileIndex - 1) / rightPanelCols) *
                        (rightPanelTilesHeight + gl.marginTop) + gl.marginTop;
                    tileLeft = ((tileIndex - 1) % rightPanelCols) *
                        (rightPanelTilesWidth + gl.marginLeft) + gl.marginLeft / 2;
                } else {
                    tileTop = Math.floor(tileIndex / rightPanelCols) *
                        (rightPanelTilesHeight + gl.marginTop) + gl.marginTop;
                    tileLeft = (tileIndex % rightPanelCols) *
                        (rightPanelTilesWidth + gl.marginLeft) + gl.marginLeft / 2;
                }

                newDim = {
                    top: tileTop - topAdjustment,
                    left: tileLeft + leftAdjustment
                };

                if (animateSize) {
                    newDim.width = rightPanelTilesWidth;
                    newDim.height = rightPanelTilesHeight;
                }

                $tile.animate(newDim, animDuration, function () {
                    if (containerSwap) {

                        // Move the tile to the right panel
                        // Adjust its left/top so that the panel change does not affect the position on the screen
                        $tile
                            .css({
                                left: tileLeft,
                                top: tileTop
                            })
                            .appendTo(_opt.$rightPanel);
                    }

                    if (callback) {
                        callback.apply(this);
                    }
                });
            });
        },
        _hideSplitterElements: function () {
            var _opt = this._options,
                $splitBar = this.element
                    .children(this._selectors.splitbarSelector);

            _opt.$rightPanel
                .addClass(this.css.hidden)
                .addClass(this.css.splitterNoScroll);
            $splitBar.addClass(this.css.hidden);
            _opt.$leftPanel.width("100%");

            if (!this.options.splitterOptions.enabled) {

                // Use visibility:hidden to hide the splitter.
                // There is a problem with the resize calculations if the splitter is hidden with display:none.
                $splitBar.addClass(this.css.visibilityHidden);
            }
        },
        _showSplitterElements: function () {
            this._options.$rightPanel.removeClass(this.css.hidden);

            // When the splitter is initially collapsed and we switch to maximazed view, we should not
            // remove the splitterNoScroll class.
            if (!this.splitter()._panels[ 1 ].options.collapsed) {
                this._options.$rightPanel.removeClass(this.css.splitterNoScroll);
            }

            this.element
                .children(this._selectors.splitbarSelector)
                    .removeClass(this.css.hidden);
        },
        _toMaximizedView: function ($tileToMaximize, animDuration, event) {
            var _opt = this._options,
                marginLeft = _opt.gridLayout.marginLeft;

            // Adjust tiles left position
            _opt.$tiles.css({
                left: "-=" + marginLeft
            });

            // Set margins on the left panel
            // The maximized tile will transition to width: 100% to resize when the splitter is moved
            _opt.$leftPanel.css({
                marginLeft: marginLeft,
                marginRight: marginLeft
            });

            this._setRightPanelSize();

            // TODO: Show the splitter when the first tile is animated to the right panel
            this._showSplitterElements();

            // Move and animate tiles to the right panel
            this._positionRightPanelTiles(_opt.$tiles.not($tileToMaximize),
                parseInt($tileToMaximize.attr("data-index"), 10), true, true, animDuration);

            // Animate the maximizing tile
            this._maximizeTile($tileToMaximize, animDuration, event);
        },
        _maximizedTileSwap: function ($tileToMaximize, animDuration, event) {
            var self = this,
                _opt = this._options,
                gl = _opt.gridLayout,
                minimizedTiles = _opt.$tiles.not(_opt.$maximizedTile),
                $tileToMinimize = _opt.$maximizedTile,
                tileToMinimizeIndex = parseInt($tileToMinimize.attr("data-index"), 10),
                tileToMaximizeIndex = parseInt($tileToMaximize.attr("data-index"), 10),
                rightPanelOffset = _opt.$rightPanel.position().left - gl.marginLeft;

            this._toMinimizedState($tileToMinimize);

            // Reposition the minimizing tile with container swap
            this._positionRightPanelTiles(
                $tileToMinimize, tileToMaximizeIndex, true, true, animDuration, function () {
                    var prevIndex = tileToMinimizeIndex - 1,
                        prevTile;

                    if (prevIndex === tileToMaximizeIndex) {
                        prevIndex -= 1;
                    }

                    prevTile = _opt.$tiles.filter("[data-index=" + prevIndex + "]");

                    if (prevTile.length > 0) {

                        // Insert the minimizing tile after the first minimized tile with lower index in the right panel
                        $tileToMinimize.insertAfter(prevTile);
                    } else {

                        // When no such tile is present insert at the top of the right panel
                        $tileToMinimize.prependTo(_opt.$rightPanel);
                    }

                    if (event) {
                        self._triggerTileMinimized(event, $tileToMinimize);
                    }
                });

            // Reposition the rest of the tiles
            this._positionRightPanelTiles(minimizedTiles.not($tileToMaximize),
                tileToMaximizeIndex, false, false, animDuration);

            // Move the maximizing tile to the left panel
            // Adjust its left/top so that the panel change does not affect the position on the screen
            $tileToMaximize
                .css({
                    left: "+=" + rightPanelOffset,
                    top: "-=" + _opt.$rightPanel.scrollTop()
                })
                .appendTo(_opt.$leftPanel);

            // Animate the tile
            this._maximizeTile($tileToMaximize, animDuration, event);
        },
        _maximizeTile: function ($tileToMaximize, animDuration, event) {
            var self = this,
                _opt = this._options,
                mt = _opt.gridLayout.marginTop,
                innerContainer = $tileToMaximize
                    .children(this._selectors.innerContainerSelector);

            animDuration = typeof animDuration === "number" ?
                animDuration : this.options.animationDuration;

            // Switch to maximized content
            this._toMaximizedState($tileToMaximize);

            // Hide inner container scrolls during the animation
            innerContainer.addClass(this.css.overflowHidden);

            $tileToMaximize.animate({
                width: "100%",
                height: this.element.height() - 2 * mt,
                top: mt,
                left: 0
            },
            animDuration,
            function () {

                // Remove the overflow visible when the animation ends
                _opt.$leftPanel.removeClass(self.css.overflowVisible);
                innerContainer.removeClass(self.css.overflowHidden);

                // Update the maximized tile
                _opt.$maximizedTile = $tileToMaximize;
                _opt.animating = false;

                if (event) {
                    self._triggerTileMaximized(event, $tileToMaximize);
                }
            });
        },

        // Maximizes tile when maximizedTileIndex option is given
        _maximizeTileWithCustomIndex: function ($tileToMaximize, animDuration, event) {
            var itemData, i,
                self = this,
                _opt = this._options,
                $tileToMinimize = _opt.$maximizedTile,
                tileToMinimizeNewDim = {
                    width: $tileToMaximize.outerWidth(),
                    height: $tileToMaximize.outerHeight(),
                    top: $tileToMaximize.css("top"),
                    left: $tileToMaximize.css("left")
                },
                tileToMaximizeNewDim = {
                    width: $tileToMinimize.outerWidth(),
                    height: $tileToMinimize.outerHeight(),
                    top: $tileToMinimize.css("top"),
                    left: $tileToMinimize.css("left")
                },
                swapTilesInConfig = function (itemsConfig) {

                    // Swap the tiles in the grid layout items configuration array
                    for (i = 0; i < itemsConfig.length; i++) {
                        itemData = itemsConfig[ i ];
                        if (itemData.item.is($tileToMinimize)) {
                            itemData.item = $tileToMaximize;
                        } else if (itemData.item.is($tileToMaximize)) {
                            itemData.item = $tileToMinimize;
                        }
                    }
                };

            this._toMaximizedState($tileToMaximize);
            this._toMinimizedState($tileToMinimize);

            // Animate the minimized tile to the position of the maximized
            $tileToMinimize.animate(tileToMinimizeNewDim, animDuration, function () {
                if (event) {
                    self._triggerTileMinimized(event, $tileToMinimize);
                }
            });

            // Animate the maximized tile to the position of the minimized
            $tileToMaximize.animate(tileToMaximizeNewDim, animDuration, function () {

                // Swap tiles in grid layout items
                swapTilesInConfig(self._options.
                    $layoutManagerElement.igLayoutManager("option", "items"));

                // Swap tiles in initial config
                swapTilesInConfig(_opt.gridLayout.initialItems);

                // Update the maximized tile
                _opt.$maximizedTile = $tileToMaximize;
                _opt.animating = false;

                if (event) {
                    self._triggerTileMaximized(event, $tileToMaximize);
                }
            });
        },
        maximize: function ($tileToMaximize, animDuration, event) {
            /* Maximizes a given tile.
            ```
                $(".selector").igTileManager("maximize", tileToMaximize, event);
            ```
               paramType="object" optional="false" Specifies the jQuery object of the tile element to be maximized.
               paramType="number" optional="true" Specifies the animation duration for this maximizing.
               paramType="object" optional="true" Indicates the browser even which triggered this action (not API).
            */
            var _opt = this._options;

            animDuration = typeof animDuration === "number" ?
                animDuration : this.options.animationDuration;

            if (!$tileToMaximize) {

                // Tile to maximize not provided
                return;
            }

            if (_opt.$maximizedTile && _opt.$maximizedTile.attr("data-index") ===
                    $tileToMaximize.attr("data-index")) {

                // The tile is already maximized
                return;
            }

            if (!_opt.useMaximizedTileIndex) {

                // Set overflow visible before the animation start
                _opt.$leftPanel
                    .addClass(this.css.overflowVisible)
                    .removeClass(this.css.overflowHidden);

                if (!_opt.$maximizedTile) {

                    // Maximize the selected tile. Move the rest to the right panel.
                    this._toMaximizedView($tileToMaximize, animDuration, event);
                } else {

                    // Maximize the selected tile. Minimized the currently maximized. Rearrange the rest.
                    this._maximizedTileSwap($tileToMaximize, animDuration, event);
                }
            } else {

                // Maximize the selected tile. Minimize the currently maximized. Swap these tiles positions.
                this._maximizeTileWithCustomIndex($tileToMaximize, animDuration, event);
            }
        },
        minimize: function (animDuration, event) {
            /* Minimizes the maximized tile. Has no effect if no maximized tile is present.
            ```
                $(".selector").igTileManager("minimize", event);
            ```
               paramType="number" optional="true" Specifies the animation duration for this minimize.
               paramType="object" optional="true" Indicates the browser even which triggered this action (not API).
            */
            var _opt = this._options,
                $tileToMinimize = _opt.$maximizedTile,
                gl = _opt.gridLayout,
                rightTilesOffset = _opt.$rightPanel.position().left,
                tileToMinimizeIndex;

            if (!$tileToMinimize) {
                return;
            }

            // D.A. 14th October 2013 Bug #151452 Remove the min-width when minimizing a tile.
            this.element.css("min-width", 0);
            tileToMinimizeIndex = parseInt($tileToMinimize.attr("data-index"), 10);

            // Revert the left panel to no margins. Keep its current widhth and height.
            _opt.$leftPanel
                .width(_opt.$leftPanel.outerWidth(true))
                .height(_opt.$leftPanel.outerHeight(true))
                .css({ margin: 0 });

            // Switch to minimized state
            this._toMinimizedState($tileToMinimize);

            // Adjust the tile to minimize's left/top position so that
            // the panel change does not affect its position on the screen
            $tileToMinimize.css({
                width: $tileToMinimize.outerWidth(),
                height: $tileToMinimize.outerHeight(),
                top: gl.marginTop,
                left: gl.marginLeft
            });

            // Adjust the rest tile's left/top position so that the panel change
            // does not affect its position on the screen
            _opt.$tiles
                .not($tileToMinimize)
                    .each(function () {
                        var $tile = $(this);

                        $tile.css({
                            left: "+=" + rightTilesOffset,
                            top: "-=" + _opt.$rightPanel.scrollTop()
                        });

                        // Move the tile to the left panel
                        if (parseInt($tile.attr("data-index"), 10) > tileToMinimizeIndex) {
                            $tile.appendTo(_opt.$leftPanel);
                        } else {
                            $tile.insertBefore($tileToMinimize);
                        }
                    });

            // Hide splitter and right panel
            this._hideSplitterElements();

            // Reflow the tiles to their normal positions
            this.reflow(true, animDuration, event);
        },
        maximizedTile: function () {
            /* Returns the maximized tile or null if such is not present.
            ```
                $(".selector").igTileManager("maximizedTile");
            ```
            returnType="object|null" Returns the maximized tile or null if such is not present.
            */
            return this._options.$maximizedTile || null;
        },
        minimizedTiles: function () {
            /* Returns an array with the tiles in minimized state or null if such are not present.
            ```
                $(".selector").igTileManager("minimizedTiles");
            ```
               returnType="object|null" Returns an array with the tiles in minimized state or null if such are not present.
            */
            var minimizedTiles = this._options.$tiles.not(this._options.$maximizedTile);
            return minimizedTiles.length > 0 ? minimizedTiles : null;
        },
        splitter: function () {
            /* Returns the splitter associated with this tile manager or
                null if the tile manager was instantiated with maximizedTileIndex.
            ```
                $('.selector').igTileManager("splitter")
            ```
                returnType="object|null" Returns the splitter associated with this tile manager or null if the tile manager was instantiated with maximizedTileIndex.
            */
            return this._options.useMaximizedTileIndex ? null : this.element.data("igSplitter");
        },
        layoutManager: function () {
            /* Returns the [layout manager](ui.iglayoutmanager) associated with current tile manager.
            ```
                $(".selector").igTileManager("layoutManager");
            ```
               returnType="object" Returns the layout manager associated with this tile manager.
            */
            return this._options.$layoutManagerElement.data("igLayoutManager");
        },
        reflow: function (forceReflow, animationDuration, event) {
            /* Reflow the tile manager. Rearranging the tiles to fit in the container
            ```
                $('.selector').igTileManager("reflow", forceReflow, event);
            ```
               paramType="boolean" optional="true" Indicates whether the reflow should be forced. Useful in cases where the items size and position was changed manually.
               paramType="number" optional="true" The animation duration to be used for this reflow only.
               paramType="object" optional="true" Indicates the browser even which triggered this action (not API).
            */
            this.layoutManager().reflow(forceReflow, animationDuration, event);
        },
        widget: function () {
            /* Returns the element that represents this widget.
            ```
                $('.selector').igTileManager("widget");
            ```
               returnType="object" Returns the element that represents this widget.
            */
            return this.element;
        },
        _triggerDataBinding: function () {
            var args = {
                owner: this,
                dataSource: this.options.dataSource
            };

            return this._trigger(this.events.dataBinding, null, args);
        },
        _triggerDataBound: function (success, msg, dataView) {
            var args = {
                owner: this,
                success: success,
                errorMessage: msg,
                dataView: dataView
            };

            this._trigger(this.events.dataBound, null, args);
        },
        _triggerRendering: function (tiles, items) {
            var args = {
                owner: this,
                tiles: tiles,
                items: items
            };

            return this._trigger(this.events.rendering, null, args);
        },
        _triggerRendered: function () {
            this._trigger(this.events.rendered, null, { owner: this });
        },
        _triggerTileRendering: function (event, ui) {
            var args = {
                owner: this,
                tile: ui.item
            };

            return this._trigger(this.events.tileRendering, event, args);
        },
        _triggerTileRendered: function (event, ui) {
            var args = {
                owner: this,
                tile: ui.item
            };

            return this._trigger(this.events.tileRendered, event, args);
        },
        _triggerTileMaximizing: function (event, tile) {
            var args = {
                owner: this,
                tile: tile,
                minimizingTile: this._options.$maximizedTile || null
            };

            return this._trigger(this.events.tileMaximizing, event, args);
        },
        _triggerTileMaximized: function (event, tile) {
            var args = {
                owner: this,
                tile: tile
            };

            this._trigger(this.events.tileMaximized, event, args);
        },
        _triggerTileMinimizing: function (event, tile, maximizingTile) {
            var args = {
                owner: this,
                tile: tile,
                maximizingTile: maximizingTile || null
            };

            return this._trigger(this.events.tileMinimizing, event, args);
        },
        _triggerTileMinimized: function (event, tile) {
            var args = {
                owner: this,
                tile: tile
            };

            this._trigger(this.events.tileMinimized, event, args);
        },
        dataBind: function () {
            /* Causes the TileManager to data bind to the data source (local or remote) , and re-render all of the data as well.
            ```
                $(".selector").igTileManager("dataBind");
            ```
            */
            var noCancel;

            this._initDataSource();

            noCancel = this._triggerDataBinding();
            if (noCancel) {
                this.options.dataSource.dataBind(this._renderData, this);
            }
        },

        // Returns the markup (if such) to its initial state. Destroys the layout manager and splitter widgets.
        // Destroys the rendered ui-igtiles. Removes the classes from the tiles.
        _destroyTiles: function () {
            var self = this,
                _opt = this._options;

            // Destroy the other widgets
            _opt.$layoutManagerElement.igLayoutManager("destroy");

            if (!_opt.useMaximizedTileIndex) {
                this.element.igSplitter("destroy");
            }

            // Remove the rendered content
            if (_opt.fromMarkup) {
                if (_opt.useMaximizedTileIndex) {

                    // When no splitter is used remove all classes from the tiles and the rendered content.
                    _opt.$tiles.each(function () {
                        var $tile = $(this);

                        $tile
                            .children()
                                .removeClass(self.css.innerContainer)
                                .appendTo(self.element)
                                .children("." + self.css.hidden)
                                    .removeClass(self.css.hidden);

                        $tile.remove();
                    });
                } else {

                    // The destroy of the splitter returns all the markup as it was
                    // before all classes were applied and any other content was rendered.
                    // Only the tiles should be moved back to the original container and
                    // the panels should be removed.
                    this._removePanels();

                    // Unwrap the original markup from the added <div> tags
                    this.element
                        .children()
                            .children()
                                .unwrap();
                }
            } else {

                // When data source is used empty the container
                this.element.empty();
            }
        },

        // Remove the attached event handlers
        _removeEventHandlers: function () {
            var _opt = this._options,
                elHandlers = _opt.elementHandlers,
                minimizeBtnSelector = this._selectors.minimizeBtnSelector,
                minimizedTileSelector = this._selectors.minimizedTileSelector;

            this.element
                .off("click", minimizedTileSelector, elHandlers.minimizedTileClick)
                .off("mouseover", minimizedTileSelector, elHandlers.miminimizedTileMouseOver)
                .off("mouseout", minimizedTileSelector, elHandlers.minimizedTileMouseOut)
                .off("click", minimizeBtnSelector, elHandlers.minimizeBtnClick)
                .off("mouseover", minimizeBtnSelector, elHandlers.minimizeBtnMouseOver)
                .off("mouseout", minimizeBtnSelector, elHandlers.minimizeBtnMouseOut);

            $(window).off("resize", _opt.windowHandlers.resize);
        },

        // P.P. 3 Sep 2015 #202506 - Disabled TileManager is fully functional
        _toggleDisabled: function (value) {
            var splitter = this.splitter(),
                layoutManager = this._options.$layoutManagerElement.data().igLayoutManager;

            if (splitter) {
                splitter.options.disabled = value;
            }

            if (layoutManager) {
                layoutManager.options.disabled = value;
            }
        },
        destroy: function () {
            /* Deletes the widget instance (client object). It is no longer accessible and all its event handlers stop working. Destroys all child widgets. Removes auto-generated HTML content, which is outside the widget, e.g. detached popups, dropdowns, etc.
            ```
                $(".selector").igTileManager("destroy");
            ```
                returnType="object"
            */
            $.Widget.prototype.destroy.apply(this, arguments);
            this.element.removeClass(this.css.container);
            this._destroyTiles();
            this._removeEventHandlers();
            return this;
        }
    });
    $.extend($.ui.igTileManager, { version: "<build_number>" });
    return $.ui.igTileManager;// REMOVE_FROM_COMBINED_FILES
}));// REMOVE_FROM_COMBINED_FILES
