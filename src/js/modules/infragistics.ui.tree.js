/*!@license
 * Infragistics.Web.ClientUI Tree <build_number>
 *
 * Copyright (c) 2011-<year> Infragistics Inc.
 *
 * http://www.infragistics.com/
 *
 * Depends on:
 *  jquery-1.9.1.js
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	jquery.ui.mouse.js
 *	jquery.ui.draggable.js
 *	jquery.ui.droppable.js
 *	infragistics.templating.js
  *	infragistics.util.js
 *  infragistics.util.jquery.js
 *	infragistics.dataSource.js
 *	infragistics.ui.tree-en.js
 */

/*global define */
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
			"./infragistics.ui.shared",
			"./infragistics.ui.tree-en"
		], factory );
	} else {

		// Browser globals
		factory(jQuery);
	}
}
(function ($) {
	$.ui.keyCode.NUMPAD_ADD = $.ui.keyCode.NUMPAD_ADD || 107;
	$.ui.keyCode.NUMPAD_SUBTRACT = $.ui.keyCode.NUMPAD_SUBTRACT || 109;
	/*
		igTree is a widget based on jQuery UI that loads hierarchical data and visualizes it in the form of a
		tree and providers the end user with a rich interaction functionality including the ability to expand/collapse
		child data, node selection, checkboxes, node images, etc. The igTree supports performance optimization for large
		data sources via load on demand. The igTree can be bound to various types of data such as JSON, XML, Remote data
		providers, etc.
	*/
	$.widget("ui.igTree", {
		_const: {
			dragCursorAt: {
				top: -10,
				left: -10
			}
		},
		css: {
			/* classes applied to the top container element */
			tree: "ui-widget ui-igtree",
			/* class applied to the node collection element */
			treeCollection: "ui-igtree-collection",
			/* class applied to every node element in the tree */
			treeNode: "ui-igtree-node",
			/* class applied to the root ul element in the tree */
			treeRoot: "ui-igtree-root ui-widget-content",
			/* class applied to every node element that is a root node in the tree */
			treeRootNode: "ui-igtree-noderoot",
			/* class applied nodes that have no children and thus no expander image */
			nodeNoChildren: "ui-igtree-node-nochildren",
			/* class applied to nodes that have children */
			parentNode: "ui-igtree-parentnode",
			/* classes defining the css sprite icon for collapsed node */
			collapseIcon: "ui-icon ui-icon-triangle-1-s",
			/* classes defining the css sprite icon for expanded node */
			expandIcon: "ui-icon ui-icon-triangle-1-e",
			/* classes applied to the node anchor */
			nodeAnchor: "ui-corner-all",
			/* class applied to the expand/collapse node container */
			nodeExpander: "ui-igtree-expander",
			/* class defining the default state style of the node */
			nodeNormal: "ui-state-default",
			/* class defining the highlight state style of the node */
			nodeHightlight: "ui-state-highlight",
			/* class defining the hover state style of the node */
			nodeHovered: "ui-state-hover",
			/* class defining the selected state style of the node */
			nodeSelected: "ui-state-active",
			/* class defining the focus state style of the node */
			nodeActive: "ui-state-focus",
			/* classes applied to the checkbox container */
			checkbox: "ui-state-default ui-corner-all ui-igcheckbox-normal",
			/* classes defining the unchecked state of the checkbox */
			checkboxOff: "ui-icon ui-icon-check ui-igcheckbox-normal-off",
			/* classes defining the checked state of the checkbox */
			checkboxOn: "ui-icon ui-icon-check ui-igcheckbox-normal-on",
			/* classes defining the partially checked state of the checkbox */
			checkboxPartial: "ui-icon ui-icon-check ui-state-disabled ui-igcheckbox-normal-on",
			/* classes applied to the invalid drop indicator container */
			invalidDropIndicator: "ui-widget ui-igtree-dropindicator ui-state-error ui-corner-all",
			/* classes applied to the drop indicator container */
			dropIndicator: "ui-widget ui-igtree-dropindicator ui-state-highlight ui-corner-all",
			/* classes defining the move to drop indicator icon */
			moveMarkupIcon: "ui-icon ui-icon-arrowthick-1-e",
			/* classes defining the invalid move to drop indicator icon */
			invalidMoveMarkupIcon: "ui-icon ui-icon-cancel",
			/* classes defining the copy drop indicator icon */
			copyMarkupIcon: "ui-icon ui-icon-plus",
			/* classes applied to the insert line container */
			insertLine: "ui-state-default ui-igtree-insertline"
		},
		options: {
			/* type="string|number|null" Gets/Sets the width of the control container.
			```
				//Initialize
				$(".selector").igTree({
					width : "300px"
				});

				//Get
				var width = $(".selector").igTree("option", "width");

				//Set
				$(".selector").igTree("option", "width", "300px");
			```

				string type="string" The widget width can be set in pixels (px) and percentage (%).
				number type="number" The widget width can be set as a number in pixels.
				null type="object" No width will be applied to the container and it will be rendered by default for the browser rendering engine.
			*/
			width: null,
			/* type="string|number|null" Gets/Sets how the height of of the control container.
			```
				//Initialize
				$(".selector").igTree({
					height : 400
				});

				//Get
				var height = $(".selector").igTree("option", "height");

				//Set
				$(".selector").igTree("option", "height", 400);
			```
				string type="string" The widget height can be set in pixels (px) and percentage (%).
				number type="number" The widget height can be set as a number in pixels.
				null type="object" No height will be applied to the container and it will be rendered default for the browser rendering engine.
			*/
			height: null,
			/* type="off|biState|triState" Gets the behavior and type of the checkboxes rendered for the tree nodes. Can be set only at initialization.
			```
				//Initialize
				$(".selector").igTree({
					checkboxMode : "triState"
				});

				//Get
				var checkboxMode = $(".selector").igTree("option", "checkboxMode");
			```
				off type="string" Checkboxes are turned off and are not rendered for the tree.
				biState type="string" Checkboxes are rendered and support two states (checked and unchecked). Checkboxes do not cascade down or up in this mode.
				triState type="string" Checkboxes are rendered and support three states (checked, partial and unchecked). Checkboxes cascade up and down in this mode.
			*/
			checkboxMode: "off",
			/* type="bool" Gets/Sets one or more branches to be expanded at a time. If set to true then only one branch at each level of the tree can be expanded at a time. Otherwise multiple branches can be expanded at a time.
			```
				//Initialize
				$(".selector").igTree({
					singleBranchExpand : true
				});

				//Get
				var singleBranchExpand = $(".selector").igTree("option", "singleBranchExpand");

				//Set
				$(".selector").igTree("option", "singleBranchExpand", true);
			```
			*/
			singleBranchExpand: false,
			/* type="bool" Gets/Sets whether nodes are hoverable. Setting this option to false would make the tree to not apply hover styles on the nodes when they are hovered.
			```
				//Initialize
				$(".selector").igTree({
					hotTracking : false
				});

				//Get
				var tracking = $(".selector").igTree("option", "hotTracking");

				//Set
				$(".selector").igTree("option", "hotTracking", false);
			```
			*/
			hotTracking: true,
			/* type="string|null" Gets/Sets the image url applied to all parent nodes.
			```
				//Initialize
				$(".selector").igTree({
					parentNodeImageUrl : "images/folder.png"
				});

				//Get
				var url = $(".selector").igTree("option", "parentNodeImageUrl");

				// Set - works only if an image was also set on initialization.
				// Throws an error otherwise, as the element holding the image source is missing.
				$(".selector").igTree("option", "parentNodeImageUrl", "images/photo.png");

			```
				string type="string" Image with the specified URL will be rendered for each node that has children (If you define both parentNodeImageUrl and parentNodeImageClass the parentNodeImageUrl would take priority).
				null type="object" Option is ignored
			*/
			parentNodeImageUrl: null,
			/* type="string|null" Gets/Sets the CSS class applied to all parent nodes.
			```
				//Initialize
				$(".selector").igTree({
					parentNodeImageClass : "folderimage"
				});

				//Get
				var class = $(".selector").igTree("option", "parentNodeImageClass");

				// Set - works only if an image was also set on initialization.
				// Throws an error otherwise, as the element holding the image source is missing.
				$(".selector").igTree("option", "parentNodeImageClass", "altfolderimage");
			```
				string type="string" Specified class with a CSS sprite that would be rendered for each node that has children (If you define both parentNodeImageUrl and parentNodeImageClass the parentNodeImageUrl would take priority).
				null type="object" Option is ignored
			*/
			parentNodeImageClass: null,
			/* type="string|null" Gets/Sets the tooltip applied to all parent node images.
			```
				//Initialize
				$(".selector").igTree({
					parentNodeImageTooltip : "Folder"
				});

				//Get
				var text = $(".selector").igTree("option", "parentNodeImageTooltip");

				// Set - works only if an image was also set on initialization.
				// Throws an error otherwise, as the element holding the image source is missing.
				$(".selector").igTree("option", "parentNodeImageTooltip", "rootFolder");
			```
				string type="string" Specified a tooltip that would be rendered for each node that has children.
				null type="object" Option is ignored
			*/
			parentNodeImageTooltip: null,
			/* type="string|null" Gets/Sets the image url applied to all leaf nodes.
			```
				//Initialize
				$(".selector").igTree({
					leafNodeImageUrl : "images/book.png"
				});

				//Get
				var url = $(".selector").igTree("option", "leafNodeImageUrl");

				// Set - works only if an image was also set on initialization.
				// Throws an error otherwise, as the element holding the image source is missing.
				$(".selector").igTree("option", "leafNodeImageUrl", "images/magazine.png");

			```
				string type="string" Image with the specified URL will be rendered for each node that has no children (If you define both leafNodeImageUrl and leafNodeImageClass the leafNodeImageUrl would take priority).
				null type="object" Option is ignored
			*/
			leafNodeImageUrl: null,
			/* type="string|null" Gets/Sets the CSS class applied to all leaf nodes.
			```
				//Initialize
				$(".selector").igTree({
					leafNodeImageClass : "leafnodeimage"
				});

				//Get
				var class = $(".selector").igTree("option", "leafNodeImageClass");

				// Set - works only if an image was also set on initialization.
				// Throws an error otherwise, as the element holding the image source is missing.
				$(".selector").igTree("option", "leafNodeImageClass", "altleafnodeimage");
			```
				string type="string" Specified class with a CSS sprite that would be rendered for each node that has no children (If you define both leafNodeImageUrl and leafNodeImageClass the leafNodeImageUrl would take priority).
				null type="object" Option is ignored
			*/
			leafNodeImageClass: null,
			/* type="string|null" Gets/Sets the tooltip applied to all leaf node images.
			```
				//Initialize
				$(".selector").igTree({
					leafNodeImageTooltip : "Book"
				});

				//Get
				var text = $(".selector").igTree("option", "leafNodeImageTooltip");

				// Set - works only if an image was also set on initialization.
				// Throws an error otherwise, as the element holding the image source is missing.
				$(".selector").igTree("option", "leafNodeImageTooltip", "Magazine");
			```
				string type="string" Specified a tooltip that would be rendered for each node that has no children.
				null type="object" Option is ignored
			*/
			leafNodeImageTooltip: null,
			/* type="number" Gets/Sets the duration of each animation such as the expand/collapse.
			```
				//Initialize
				$(".selector").igTree({
					animationDuration : 25
				});

				//Get
				var animationDuration = $(".selector").igTree("option", "animationDuration");

				//Set
				$(".selector").igTree("option", "animationDuration", 25);
			```
			*/
			animationDuration: 200,
			/* type="string" Gets the node data-path attribute separator character.
			```
				//Initialize
				$(".selector").igTree({
					pathSeparator : "."
				});

				//Get
				var pathSeparator = $(".selector").igTree("option", "pathSeparator");
			```
			*/
			pathSeparator: "_",
			/* type="object" Gets/Sets the igTree data source. Accepts any valid data source accepted by $.ig.DataSource, or an instance of an $.ig.DataSource itself.
				Once the data source is initialized, this option becomes an instance of the $.ig.HierarchicalDataSource.
				```
					//Initialize
					$(".selector").igTree({
						dataSource : data
					});

					//Get
					var dataSource = $(".selector").igTree("option", "dataSource");
				```

			*/
			dataSource: null,
			/* type="string|null" Gets/Sets a remote URL accepted by [$.ig.DataSource](ig.datasource) in order to request data from it.
			```
				//Initialize
				$(".selector").igTree({
					dataSourceUrl : "data.svc"
				});

				//Get
				var url = $(".selector").igTree("option", "dataSourceUrl");
			```
			string type="string" Specifies the remote url.
			null type="object" Option is ignored.
			*/
			dataSourceUrl: null,
			/* type="string|null" Gets the type of the data source. Delegates the value to [$.ig.DataSource.settings.type](ig.datasource#options:settings.type). Explicitly set data source type (such as "json"). Please refer to the documentation of $.ig.DataSource.settings.type.
			```
				//Initialize
				$(".selector").igTree({
					dataSourceType : "xml"
				});

				//Get
				var type = $(".selector").igTree("option", "dataSourceType");
			```
			string type="string" Specifies the data source type implicitly.
			null type="object" Type is inferred.
			*/
			dataSourceType: null,
			/* type="string|null" Gets the JSON key at which a remote data source will write the data. Delegates the value to [$.ig.DataSource.settings.responseDataKey](ig.datasource#options:settings.responseDataKey). Please refer to the documentation of $.ig.DataSource.settings.responseDataKey.
			```
				//Initialize
				$(".selector").igTree({
					responseDataKey : "d.results"
				});

				//Get
				var responseDataKey = $(".selector").igTree("option", "responseDataKey");
			```
			string type="string" Specifies the name of the property in which data records are held if the response is wrapped.
			null type="object" Option is ignored.
			*/
			responseDataKey: null,
			/* type="string|null" Gets the data type of the remote data source response. Delegates the value to [$.ig.DataSource.settings.responseDataType](ig.datasource#options:settings.responseDataType). Please refer to the documentation of $.ig.DataSource.settings.responseDataType.
			```
				//Initialize
				$(".selector").igTree({
					responseDataType : "json"
				});

				//Get
				var responseDataType = $(".selector").igTree("option", "responseDataType");
			```
			string type="string" Response type when a URL is set as the data source. See http://api.jquery.com/jQuery.ajax/ => dataType.
			null type="object" Type is inferred.
			*/
			responseDataType: null,
			/* type="string" Gets the HTTP verb used for remote requests. Specifies the HTTP verb to be used to issue the requests to the [dataSourceUrl](ui.igtree#options:dataSourceUrl).
			```
				//Initialize
				$(".selector").igTree({
					requestType : "GET"
				});

				//Get
				var url = $(".selector").igTree("option", "requestType");
			```
			*/
			requestType: "GET",
			/* type="string" Gets the type of the content in a remote data source response. Content type of the response from the [dataSourceUrl](ui.igtree#options:dataSourceUrl). See http://api.jquery.com/jQuery.ajax/ => contentType
			```
				//Initialize
				$(".selector").igTree({
					responseContentType : "application/json"
				});

				//Get
				var url = $(".selector").igTree("option", "responseContentType");
			```
			*/
			responseContentType: null,
			/* type="number" Gets the initial depth the igTree is going to be expanded to upon initial render.
			```
				//Initialize
				$(".selector").igTree({
					initialExpandDepth : 1
				});

				//Get
				var expandDepth = $(".selector").igTree("option", "initialExpandDepth");
			```
			*/
			initialExpandDepth: -1,
			/* type="bool" Gets whether all the data would be bound initially or each child collection would be bound upon expand.
			```
				//Initialize
				$(".selector").igTree({
					loadOnDemand : true
				});

				//Get
				var loadOnDemand = $(".selector").igTree("option", "loadOnDemand");
			```
			*/
			loadOnDemand: false,
			/* type="object" Gets the data binding properties and keys. The igTree uses these to extract the corresponding data from the dataSource.
			```
				$(".selector").igTree({
					bindings: {
						textKey: 'Name',
						valueKey: 'ID',
						primaryKey: 'ID',
						childDataProperty: 'Products',
						bindings: {
							textKey: 'Name',
							valueKey: 'ID',
							primaryKey: 'ID',
							childDataProperty: 'Supplier',
							bindings: {
								textKey: 'Name',
								valueKey: 'ID'
							}
						}
					}
				});
			```
			*/
			bindings: {
				/* type="string" Gets the name of the data source property the value of which would be the node text.
				```
					$(".selector").igTree({
						bindings: {
							textKey: "Name",
							valueKey: "ID",
							primaryKey: "ID"
						}
					});
				```
				*/
				textKey: "Text",
				/* type="string" Gets the XPath to the text attribute/node. Used in client-only binding directly to XML.
				```
				//XML nodes have this structure:
				//<Folder Text="Y.Malmsteen" ImageUrl="book.png" Value="Folder" NavigateUrl="http://www.infragistics.com">
					$(".selector").igTree({
						dataSource: data,
						dataSourceType: "xml",
						initialExpandDepth: 0,
						pathSeparator: ".",
						bindings: {
							textXPath: "@Text"
						}
					});
				```
				*/
				textXPath: "@Text",
				/* type="string" Gets the name of the data source property the value of which would be the node value.
				```
					$(".selector").igTree({
						bindings: {
							textKey: "Name",
							valueKey: "ID",
							primaryKey: "ID"
						}
					});
				```
				*/
				valueKey: "Value",
				/* type="string" Gets the XPath to the value attribute/node. Used in client-only binding directly to XML.
				```
				//XML nodes have this structure:
				//<Folder Text="Y.Malmsteen" ImageUrl="book.png" Value="Folder" NavigateUrl="http://www.infragistics.com">
					$(".selector").igTree({
						dataSource: data,
						dataSourceType: "xml",
						initialExpandDepth: 0,
						pathSeparator: ".",
						bindings: {
							valueXPath: "@Value"
						}
					});
				```
				*/
				valueXPath: "@Value",
				/* type="string" Gets the name of the data source property the value of which would be used as a URL for the node image.
				```
					$(".selector").igTree({
						bindings: {
							imageUrlKey: "ImageUrl"
						}
					});
				```
				*/
				imageUrlKey: "ImageUrl",
				/* type="string" Gets the XPath to the image URL attribute/node. Used in client-only binding directly to XML.
				```
				//XML node has the following structure:
				//<Folder Text="Y.Malmsteen" ImageUrl="book.png" Value="Folder" NavigateUrl="http://www.infragistics.com">
					$(".selector").igTree({
						dataSource: data,
						dataSourceType: "xml",
						initialExpandDepth: 0,
						pathSeparator: ".",
						bindings: {
							imageUrlXPath: "@ImageUrl"
						}
				});
				```
				*/
				imageUrlXPath: "@ImageUrl",
				/* type="string" Gets the name of the data source property the value of which would be used as an href attribute for the node anchor.
				```
					$(".selector").igTree({
						bindings: {
							navigateUrlKey: "NavigateUrl"
						}
					});
				```
				*/
				navigateUrlKey: "NavigateUrl",
				/* type="string" Gets the XPath to the navigate URL attribute/node. Used in client-only binding directly to XML.
				```
				//XML node has the following structure:
				//<Folder Text="Y.Malmsteen" ImageUrl="book.png" Value="Folder" NavigateUrl="http://www.infragistics.com">
					$(".selector").igTree({
						dataSource: data,
						dataSourceType: "xml",
						initialExpandDepth: 0,
						pathSeparator: ".",
						bindings: {
							navigateUrlXPath: "@NavigateUrl"
						}
					});
				```
				*/
				navigateUrlXPath: "@NavigateUrl",
				/* type="string" Gets the name of the data source property the value of which would be used as a target
								attribute for the node anchor.
				```
					$(".selector").igTree({
						bindings: {
							targetKey: "Target"
						}
					});
				```
				*/
				targetKey: "Target",
				/* type="string" Gets the name of the data source property the value of which would indicate that the
								node is expanded on initial load.
					```
					$(".selector").igTree({
						dataSource: data,
						dataSourceType: "xml",
						initialExpandDepth: 0,
						pathSeparator: ".",
						bindings: {
							expandedKey: "Expanded"
						}
					});
					```
				*/
				expandedKey: "Expanded",
				/* type="string" Gets the name of the data source property the value of which is the primary key attribute
								for the data. This property is used when load on demand is enabled and if specified the node paths
								would be generated using primary keys instead of indices.
				```
					$(".selector").igTree({
						bindings: {
							textKey: "Name",
							valueKey: "ID",
							primaryKey: "ID",
							childDataProperty: "Products",
							bindings: {
								textKey: "Name",
								valueKey: "ID",
								primaryKey: "ID",
								childDataProperty: "Supplier",
								bindings: {
									textKey: "Name",
									valueKey: "ID"
								}
							}
						}
					});
				```
				*/
				primaryKey: null,
				/* type="string" Gets the node content template for the current layer of bindings. The igTree utilizes igTemplating
								for generating node content templates. A good example of how to setup templating can be found here http://www.infragistics.com/community/blogs/marina_stoyanova/archive/2014/06/17/how-to-use-templates-to-style-the-different-nodes-of-the-ignite-ui-tree-control.aspx
				```
					$(".selector").igTree({
						dataSource: data,
						dataSourceType: "xml",
						initialExpandDepth: 0,
						pathSeparator: ".",
						bindings: {
							nodeContentTemplate: "Stay: ${Duration}"
						}
					});
				```
				*/
				nodeContentTemplate: null,
				/* type="string" Gets the name of the data source property that holds the child data of the current layer node.
				```
					$(".selector").igTree({
						bindings: {
							textKey: "Name",
							valueKey: "ID",
							primaryKey: "ID",
							childDataProperty: "Products",
							bindings: {
								textKey: "Name",
								valueKey: "ID",
								primaryKey: "ID",
								childDataProperty: "Supplier",
								bindings: {
									textKey: "Name",
									valueKey: "ID"
								}
							}
						}
					});
				```
				*/
				childDataProperty: "Nodes",
				/* type="string" Gets the XPath to the child data node. Used in client-only binding directly to XML.
				```
					$(".selector").igTree({
						dataSource: data,
							dataSourceType: "xml",
							initialExpandDepth: 0,
							pathSeparator: ".",
							bindings: {
								childDataXPath: "Folder"
							}
					});
				```
				*/
				childDataXPath: "Children",
				/* type="string" Gets the XPath to the root data node. Used in client-only binding directly to XML.
				```
				//XML node has the following structure:
				//<Folder Text="Y.Malmsteen" ImageUrl="book.png" Value="Folder" NavigateUrl="http://www.infragistics.com">
					$(".selector").igTree({
						bindings: {
							searchFieldXPath: "Folder"
						}
					});
				```
				*/
				searchFieldXPath: "Nodes",
				/* type="object" Gets the next layer of bindings in a recursive fashion.
				```
					$(".selector").igTree({
						bindings: {
							textKey: "Name",
							valueKey: "ID",
							primaryKey: "ID",
							childDataProperty: "Products",
							bindings: {
								textKey: "Name",
								valueKey: "ID",
								primaryKey: "ID",
								childDataProperty: "Supplier",
								bindings: {
									textKey: "Name",
									valueKey: "ID"
								}
							}
						}
					});
				```
				*/
				bindings: {
					/* Recursively defines next layer fo bindings */
				}
			},
			/* type="string" Gets the default target attribute value for the node anchors.
			```
				//Initialize
				$(".selector").igTree({
					defaultNodeTarget : "_blank"
				});

				//Get
				var target = $(".selector").igTree("option", "defaultNodeTarget");
			```
			*/
			defaultNodeTarget: "_self",
			/* type="boolean" Gets/Sets whether drag and drop functionality is enabled.
			```
				//Initialize
				$(".selector").igTree({
					dragAndDrop : true
				});

				//Get
				var value = $(".selector").igTree("option", "dragAndDrop");

				//Set
				$(".selector").igTree("option", "dragAndDrop", false);
			```
			*/
			dragAndDrop: false,
			/* type="string" Gets the URL to which updating requests will be made.
			```
				//Initialize
				$(".selector").igTree({
					updateUrl: "http://example.com/update"
				});

				//Get
				var updateUrl = $(".selector").igTree("option", "updateUrl");

				//Set
				$(".selector").igTree("option", "updateUrl", "http://example.com/update");
			```
			*/
			updateUrl: null,
			/* type="object" Gets/Sets specific settings for the drag and drop functionality.
			```
				//Initialize
				$(".selector").igTree({
					dragAndDropSettings : {
						allowDrop: true,
						...
					}
				});

				//Get
				var settings = $(".selector").igTree("option", "dragAndDropSettings");

				//Set
				settings.allowDrop = {
					allowDrop: false,
					...
					};
				$(".selector").igTree("option", "dragAndDropSettings", settings);
			```
			*/
			dragAndDropSettings: {
				/* type="boolean" Gets whether the widget will accept drag and drop from other controls.
				```
					//Initialize
					$(".selector").igTree({
						dragAndDropSettings : {
							allowDrop: true
						}
					});

					//Get
					var settings = $(".selector").igTree("option", "dragAndDropSettings");
					var allowDrop = settings.allowDrop;

					//Set
					settings.allowDrop = false;
					$(".selector").igTree("option", "dragAndDropSettings", settings);
				```
				*/
				allowDrop: false,
				/* type="default|copy|move" Gets the drag and drop mode.
				```
					//Initialize
					$(".selector").igTree({
						dragAndDropSettings : {
							dragAndDropMode: "copy"
						}
					});

					//Get
					var settings = $(".selector").igTree("option", "dragAndDropSettings");
					var dragAndDropMode = settings.dragAndDropMode;

					//Set
					settings.dragAndDropMode = "copy";
					$(".selector").igTree("option", "dragAndDropSettings", settings);
				```
					default type="string" Performs "copy" when holding the Ctrl key, otherwise "move" is performed.
					copy type="string" Makes a copy of the dragged node at the drop location.
					move type="string" Moves the dragged node at the drop location.
				*/
				dragAndDropMode: "default",
				/* type="number" Gets the opacity of the drag helper: 0 is fully transparent while 1 is fully opaque.
				```
					//Initialize
					$(".selector").igTree({
						dragAndDropSettings : {
							dragOpacity: 0.25
						}
					});

					//Get
					var settings = $(".selector").igTree("option", "dragAndDropSettings");
					var dragOpacity = settings.dragOpacity;

					//Set
					settings.dragOpacity = 0.5;
					$(".selector").igTree("option", "dragAndDropSettings", settings);
				```
				*/
				dragOpacity: 0.75,
				/* type="boolean" Gets whether the helper would revert to its original position upon an invalid drop.
				```
					//Initialize
					$(".selector").igTree({
						dragAndDropSettings : {
							revert: false
						}
					});

					//Get
					var settings = $(".selector").igTree("option", "dragAndDropSettings");
					var revert = settings.revert;

					//Set
					settings.revert = false;
					$(".selector").igTree("option", "dragAndDropSettings", settings);
				```
				*/
				revert: true,
				/* type="number" Gets the duration of the revert animation.
				```
					//Initialize
					$(".selector").igTree({
						dragAndDropSettings : {
							revertDuration: 1000
						}
					});

					//Get
					var settings = $(".selector").igTree("option", "dragAndDropSettings");
					var revertDuration = settings.revertDuration;

					//Set
					settings.revertDuration = 1000;
					$(".selector").igTree("option", "dragAndDropSettings", settings);
				```
				*/
				revertDuration: 500,
				/* type="number" Gets the z-index that would be set for the drag helper.
				```
					//Initialize
					$(".selector").igTree({
						dragAndDropSettings : {
							zIndex: 20
						}
					});

					//Get
					var settings = $(".selector").igTree("option", "dragAndDropSettings");
					var zIndex = settings.zIndex;

					//Set
					settings.zIndex = 20;
					$(".selector").igTree("option", "dragAndDropSettings", settings);
				```

				*/
				zIndex: 10,
				/* type="number" Gets the delay between mousedown and the start of the actual drag. Smaller values make the nodes
									more sensitive to drag and may interfere with selection.
				```
					//Initialize
					$(".selector").igTree({
						dragAndDropSettings : {
							dragStartDelay: 400
						}
					});

					//Get
					var settings = $(".selector").igTree("option", "dragAndDropSettings");
					var dragStartDelay = settings.dragStartDelay;

					//Set
					settings.dragStartDelay = 500;
					$(".selector").igTree("option", "dragAndDropSettings", settings);
				```
				*/
				dragStartDelay: 200,
				/* type="boolean" Gets whether when dragging over a collapsed node with children will trigger the node to expand.
					```
					//Initialize
					$(".selector").igTree({
						dragAndDropSettings : {
							expandOnDragOver: false
						}
					});

					//Get
					var settings = $(".selector").igTree("option", "dragAndDropSettings");
					var expand = settings.expandOnDragOver;

					//Set
					settings.expandOnDragOver = false;
					$(".selector").igTree("option", "dragAndDropSettings", settings);
				```
				*/
				expandOnDragOver: true,
				/* type="number" Gets the delay after hovering a parent node before expanding that node during drag when [expandOnDragOver](ui.igtree#options:dragAndDropSettings.expandOnDragOver) is set to true.
				```
					//Initialize
					$(".selector").igTree({
						dragAndDropSettings : {
							expandDelay: 1500
						}
					});

					//Get
					var settings = $(".selector").igTree("option", "dragAndDropSettings");
					var expandDelay = settings.expandDelay;

					//Set
					settings.expandDelay = 2000;
					$(".selector").igTree("option", "dragAndDropSettings", settings);
				```
				*/
				expandDelay: 1000,
				/* type="function|default" Gets the type of helper to be rendered for the drag operation.
				```
					//Initialize
					$(".selector").igTree({
						dragAndDropSettings : {
							helper: "myHelper"
						}
					});

					//Get
					var settings = $(".selector").igTree("option", "dragAndDropSettings");
					var helper = settings.helper;

					//Set
					settings.helper = "myHelper";
					$(".selector").igTree("option", "dragAndDropSettings", settings);
				```
					function type="function" A function that will return a DOMElement to use while dragging.
					default type="string" would render the default igTree helper.
				*/
				helper: "default",
				/* type="function|null" Gets the method for custom drop point validation. Returning true from this function would render the drop point valid, while false would make it invalid. The function has one parameter which is the current drop point and the context (this) of the function is the drag element.
					```
						//Initialize
						$(".selector").igTree({
							dragAndDropSettings : {
								customDropValidation: function() {}
							}
						});

						//Get
						var settings = $(".selector").igTree("option", "dragAndDropSettings");
						var customDropValidation = settings.customDropValidation;

						//Set
						settings.customDropValidation = function() {};
						$(".selector").igTree("option", "dragAndDropSettings", settings);
					```
					function type="function" A function that will be used for validating drop points.
					null type="object" Only built-in validation is applied.
				*/
				customDropValidation: null,
				/* type="bool|selector|element|string|array" Gets the containment for the drag helper. The area inside of which the
					helper is contained would be scrollable while dragging.
					```
						//Initialize
						$(".selector").igTree({
							dragAndDropSettings : {
								containment: true
							}
						});

						//Get
						var settings = $(".selector").igTree("option", "dragAndDropSettings");
						var containment = settings.containment;

						//Set
						settings.containment = false;
						$(".selector").igTree("option", "dragAndDropSettings", settings);
					```
					bool type="bool" If set to false, then the draggable elements will be contained in their window.
					selector type="string" The draggable element will be contained to the bounding box of the first element found by the selector. If no element is found, no containment will be set.
					element type="object" The draggable element will be contained to the bounding box of this element.
					string type="string" Possible values: "parent", "document", "window".
					array type="array" An array defining a bounding box in the form [ x1, y1, x2, y2 ].
				*/
				containment: false,
				/* type="string" Gets the HTML markup for the invalid helper.
				```
					//Initialize
					$(".selector").igTree({
						dragAndDropSettings : {
							invalidMoveToMarkup: "<div class=\"message\">Invalid</div>"
						}
					});

					//Get
					var settings = $(".selector").igTree("option", "dragAndDropSettings");
					var invalidMoveToMarkup = settings.invalidMoveToMarkup;

					//Set
					settings.invalidMoveToMarkup = "<div class=\"message\">Invalid</div>";
					$(".selector").igTree("option", "dragAndDropSettings", settings);
				```
				*/
				invalidMoveToMarkup: "<div><p><span></span><strong>{0}</strong></p></div>",
				/* type="string" Gets the HTML markup for the "move to" helper.
				```
					//Initialize
					$(".selector").igTree({
						dragAndDropSettings : {
							moveToMarkup: "<div class=\"message\"><h3>Move To</h3><p> {0}</p></div>"
						}
					});

					//Get
					var settings = $(".selector").igTree("option", "dragAndDropSettings");
					var moveBetweenMarkup = settings.moveBetweenMarkup;

					//Set
					settings.moveBetweenMarkup = "<div class=\"message\"><h3>Move Between</h3><p> {0} and {1}</p></div>";
					$(".selector").igTree("option", "dragAndDropSettings", settings);
				```
				*/
				moveToMarkup: "<div><p><span></span><strong>Move to</strong> {0}</p></div>",
				/* type="string" Gets the HTML markup for the "move between" helper.
				```
					//Initialize
					$(".selector").igTree({
						dragAndDropSettings : {
							moveBetweenMarkup: "<div class=\"message\"><h3>Move Between</h3><p> {0}</p></div>"
						}
					});

					//Get
					var settings = $(".selector").igTree("option", "dragAndDropSettings");
					var moveBetweenMarkup = settings.moveBetweenMarkup;

					//Set
					settings.moveBetweenMarkup = "<div class=\"message\"><h3>Move Between</h3><p> {0} and {1}</p></div>";
					$(".selector").igTree("option", "dragAndDropSettings", settings);
				```
				*/
				moveBetweenMarkup: "<div><p><span></span><strong>Move between</strong> {0} and {1}</p></div>",
				/* type="string" Gets the HTML markup for the "move after" helper.
				```
					//Initialize
					$(".selector").igTree({
						dragAndDropSettings : {
							moveAfterMarkup: "<div class=\"message\"><h3>Move After</h3><p> {0}</p></div>"
						}
					});

					//Get
					var settings = $(".selector").igTree("option", "dragAndDropSettings");
					var moveAfterMarkup = settings.moveAfterMarkup;

					//Set
					settings.moveAfterMarkup = "<div class=\"message\"><h3>Move After</h3><p> {0}</p></div>";
					$(".selector").igTree("option", "dragAndDropSettings", settings);
				```
				*/
				moveAfterMarkup: "<div><p><span></span><strong>Move after</strong> {0}</p></div>",
				/* type="string" Gets the HTML markup for the "move before" helper.
				```
					//Initialize
					$(".selector").igTree({
						dragAndDropSettings : {
							moveBeforeMarkup: "<div class=\"message\"><h3>Move After</h3><p> {0}</p></div>"
						}
					});

					//Get
					var settings = $(".selector").igTree("option", "dragAndDropSettings");
					var moveBeforeMarkup = settings.moveBeforeMarkup;

					//Set
					settings.moveBeforeMarkup = "<div class=\"message\"><h3>Move Before</h3><p> {0}</p></div>";
					$(".selector").igTree("option", "dragAndDropSettings", settings);
				```
				*/
				moveBeforeMarkup: "<div><p><span></span><strong>Move before</strong> {0}</p></div>",
				/* type="string" Gets the HTML markup for the "copy to" helper.
				```
					//Initialize
					$(".selector").igTree({
						dragAndDropSettings : {
							copyToMarkup: "<div class=\"message\"><h3>Copy To</h3><p> {0}</p></div>"
						}
					});

					//Get
					var settings = $(".selector").igTree("option", "dragAndDropSettings");
					var copyToMarkup = settings.copyToMarkup;

					//Set
					settings.copyToMarkup = "<div class=\"message\"><h3>Copy To</h3><p> {0}</p></div>";
					$(".selector").igTree("option", "dragAndDropSettings", settings);
				```
				*/
				copyToMarkup: "<div><p><span></span><strong>Copy to</strong> {0}</p></div>",
				/* type="string" Gets the HTML markup for the "copy between" helper.
				```
					//Initialize
					$(".selector").igTree({
						dragAndDropSettings : {
							copyBetweenMarkup: "<div class=\"message\"><h3>Copy Between</h3><p> {0} and {1}</p></div>"
						}
					});

					//Get
					var settings = $(".selector").igTree("option", "dragAndDropSettings");
					var copyBetweenMarkup = settings.copyBetweenMarkup;

					//Set
					settings.copyBetweenMarkup = "<div class=\"message\"><h3>Copy Between</h3><p> {0} and {1}</p></div>";
					$(".selector").igTree("option", "dragAndDropSettings", settings);
				```
				*/
				copyBetweenMarkup: "<div><p><span></span><strong>Copy between</strong> {0} and {1}</p></div>",
				/* type="string" Gets the HTML markup for the "copy after" helper.
				```
					//Initialize
					$(".selector").igTree({
						dragAndDropSettings : {
							copyAfterMarkup: "<div class=\"message\"><h3>Copy After</h3><p> {0}</p></div>"
						}
					});

					//Get
					var settings = $(".selector").igTree("option", "dragAndDropSettings");
					var copyAfterMarkup = settings.copyAfterMarkup;

					//Set
					settings.copyAfterMarkup = "<div class=\"message\"><h3>Copy After</h3><p> {0}</p></div>";
					$(".selector").igTree("option", "dragAndDropSettings", settings);
				```
				*/
				copyAfterMarkup: "<div><p><span></span><strong>Copy after</strong> {0}</p></div>",
				/* type="string" Gets the HTML markup for the "copy before" helper.
				```
					//Initialize
					$(".selector").igTree({
						dragAndDropSettings : {
							copyBeforeMarkup: "<div class=\"message\"><h3>Copy Before</h3><p> {0}</p></div>"
						}
					});

					//Get
					var settings = $(".selector").igTree("option", "dragAndDropSettings");
					var copyBeforeMarkup = settings.copyBeforeMarkup;

					//Set
					settings.copyBeforeMarkup = "<div class=\"message\"><h3>Copy Before</h3><p> {0}</p></div>";
					$(".selector").igTree("option", "dragAndDropSettings", settings);
				```
				*/
				copyBeforeMarkup: "<div><p><span></span><strong>Copy before</strong> {0}</p></div>"
			}
		},
		events: {
			/* cancel="false" Fired before databinding is performed.
			```
				//Bind
				$(document).delegate(".selector", "igtreedatabinding", function (evt, ui) {
					//return reference to igTree
					ui.owner;
				});

				//Initialize
				$(".selector").igTree({
					dataBinding: function(evt, ui) {...}
				});
			```
				Function takes arguments evt and ui.
				Use ui.owner to get a reference to the tree performing databinding.
			*/
			dataBinding: "dataBinding",
			/* cancel="false" Fired after databinding is finished.
			```
				//Bind
				$(document).delegate(".selector", "igtreedatabound", function (evt, ui) {
					//return reference to igTree
					ui.owner;
					//return reference to the data the tree has been databound to.
					ui.dataView;
				});

				//Initialize
				$(".selector").igTree({
					dataBound: function(evt, ui) {...}
				});
			```
				Function takes arguments evt and ui.
				Use ui.owner to get a reference to the tree performing the databinding.
				Use ui.dataView to get a reference to the data the tree has been databound to.
			*/
			dataBound: "dataBound",
			/* cancel="false" Fired before rendering of the tree begins.
			```
				//Bind
				$(document).delegate(".selector", "igtreerendering", function (evt, ui) {
					//return reference to the tree.
					ui.owner;
					//return reference to the data the tree is going to render.
					ui.dataView;
				});

				//Initialize
				$(".selector").igTree({
					rendering: function(evt, ui) {...}
				});
			```
				Function takes arguments evt and ui.
				Use ui.owner to get a reference to the tree performing rendering.
				Use ui.dataView to get a reference to the data the tree is going to render.
			*/
			rendering: "rendering",
			/* cancel="false" Fired after rendering of the tree has finished.
			```
				//Bind
				$(document).delegate(".selector", "igtreerendered", function (evt, ui) {
					//return reference to the tree.
					ui.owner;
				});

				//Initialize
				$(".selector").igTree({
					rendered: function(evt, ui) {...}
				});
			```
				Function takes arguments evt and ui.
				Use ui.owner to get a reference to the tree.
			*/
			rendered: "rendered",
			/* cancel="true" Fired before a new node is selected.
			```
				//Bind
				$(document).delegate(".selector", "igtreeselectionchanging", function (evt, ui) {
					//return reference to the tree.
					ui.owner;
					//return reference to the currently selected nodes.
					ui.selectedNodes;
					//return reference to the new nodes getting selected.
					ui.newNodes;
				});

				//Initialize
				$(".selector").igTree({
					selectionChanging: function(evt, ui) {...}
				});
			```
				Function takes arguments evt and ui.
				Use ui.owner to get a reference to the tree.
				Use ui.selectedNodes to get a reference to currently selected nodes.
				Use ui.newNodes to get a reference to the new nodes getting selected.
			*/
			selectionChanging: "selectionChanging",
			/* cancel="false" Fired after a new node is selected.
			```
				//Bind
				$(document).delegate(".selector", "igtreeselectionchanged", function (evt, ui) {
					//return reference to the tree.
					ui.owner;
					//return reference to the selected nodes.
					ui.selectedNodes;
					//return reference to the newly added nodes to the selection.
					ui.newNodes;
				});

				//Initialize
				$(".selector").igTree({
					selectionChanged: function(evt, ui) {...}
				});
			```
				Function takes arguments evt and ui.
				Use ui.owner to get a reference to the tree.
				Use ui.selectedNodes to get a reference to the selected nodes.
				Use ui.newNodes to get a reference to the newly added nodes to the selection.
			*/
			selectionChanged: "selectionChanged",
			/* cancel="true" Fired before the checkbox state of a node is changed.
			```
				//Bind
				$(document).delegate(".selector", "igtreenodecheckstatechanging", function (evt, ui) {
					//return reference to igTree
					ui.owner;
					//return reference to the node object the checkbox of which is being interacted with.
					ui.node;
					//return the current state of the checkbox.
					ui.currentState
					//return the new current state of the checkbox.
					ui.newState;
					//return the collection of all checked nodes.
					ui.currentCheckedNodes;
				});

				//Initialize
				$(".selector").igTree({
					nodeCheckstateChanging: function(evt, ui) {...}
				});
			```
				Function takes arguments evt and ui.
				Use ui.owner to get a reference to the tree.
				Use ui.node to get a reference to the node object the checkbox of which is being interacted with.
				Use ui.currentState to get the current state of the checkbox.
				Use ui.newState to get the new state that is going to be applied to the checkbox.
				Use ui.currentCheckedNodes to get the collection of all checked nodes before the new state is applied.
			*/
			nodeCheckstateChanging: "nodeCheckstateChanging",
			/* cancel="false" Fired after the checkstate of a node is changed.
			```
				//Bind
				$(document).delegate(".selector", "igtreenodecheckstatechanged", function (evt, ui) {
					//return reference to igTree
					ui.owner;
					//return reference to the node object the checkbox of which is being interacted with.
					ui.node;
					//return the new current state of the checkbox.
					ui.newState;
					//return the collection of all checked nodes.
					ui.currentCheckedNodes;
					//return the collection of all partially checked nodes.
					ui.newPartiallyCheckedNodes;
				});

				//Initialize
				$(".selector").igTree({
					nodeCheckstateChanged: function(evt, ui) {...}
				});
			```
				Use ui.owner to get a reference to the tree.
				Use ui.node to get a reference to the node object the checkbox of which is being interacted with.
				Use ui.newState to get the new state that is already applied to the checkbox.
				Use ui.newCheckedNodes to get the collection of all checked nodes.
				Use ui.newPartiallyCheckedNodes to get the collection of all partially checked nodes.
			*/
			nodeCheckstateChanged: "nodeCheckstateChanged",
			/* cancel="true" Fired before the children of a node are populated in the case of load on demand.
			```
				//Bind
				$(document).delegate(".selector", "igtreenodepopulating", function (evt, ui) {
					//return areference to the path of the node being populated.
					ui.path;
					//return a reference to the jQuery element of the node being populated.
					ui.element;
					//return the node data.
					ui.data;
					//return a reference to the bindings object for the level at which the populating node is located.
					ui.binding;
				});

				//Initialize
				$(".selector").igTree({
					nodePopulating: function(evt, ui) {...}
				});
			```
				Use ui.path to get the data-path attribute of the node being populated.
				Use ui.element to get a reference to the jQuery element of the node being populated.
				Use ui.data to get the node data.
				Use ui.binding to get a reference to the bindings object for the level at which the populating node is located.
			*/
			nodePopulating: "nodePopulating",
			/* cancel="false" Fired after the children of a node are populated in the case of load on demand.
			```
				//Bind
				$(document).delegate(".selector", "igtreenodepopulated", function (evt, ui) {
					//return a reference to the path of the populated node.
					ui.path;
					//return a reference to the jQuery element of the populated node.
					ui.element;
					//return the node data.
					ui.data;
					//return a reference to the bindings object for the level at which the populated node is located.
					ui.binding;
				});

				//Initialize
				$(".selector").igTree({
					nodePopulated: function(evt, ui) {...}
				});
			```
				Use ui.path to get the data-path atrribute of the populated node.
				Use ui.element to get a reference to the jQuery element of the populated node.
				Use ui.data to get the node data.
				Use ui.binding to get a reference to the bindings object for the level at which the populated node is located.
			*/
			nodePopulated: "nodePopulated",
			/* cancel="true" Fired before a node is collapsed.
			```
				//Bind
				$(document).delegate(".selector", "igtreenodecollapsing", function (evt, ui) {
					//return reference to igTree
					ui.owner;
					//return reference to the node object about to collapse.
					ui.node;
				});

				//Initialize
				$(".selector").igTree({
					nodeCollapsing: function(evt, ui) {...}
				});
			```
				Use ui.owner to get a reference to the tree.
				Use ui.node to get a reference to the node object about to collapse.
			*/
			nodeCollapsing: "nodeCollapsing",
			/* cancel="false" Fired after a node is collapsed.
			```
				//Bind
				$(document).delegate(".selector", "igtreenodecollapsed", function (evt, ui) {
					//return reference to igTree
					ui.owner;
					//return reference to the collapsed node object.
					ui.node;
				});

				//Initialize
				$(".selector").igTree({
					nodeCollapsed: function(evt, ui) {...}
				});
			```
				Use ui.owner to get a reference to the tree.
				Use ui.node to get a reference to the collapsed node object.
			*/
			nodeCollapsed: "nodeCollapsed",
			/* cancel="true" Fired before a node is expanded.
			```
				//Bind
				$(document).delegate(".selector", "igtreenodeexpanding", function (evt, ui) {
					//return reference to igTree
					ui.owner;
					//return reference to the node object about to expand.
					ui.node;
				});

				//Initialize
				$(".selector").igTree({
					nodeExpanding: function(evt, ui) {...}
				});
			```
				Use ui.owner to get a reference to the tree.
				Use ui.node to get a reference to the node object about to expand.
			*/
			nodeExpanding: "nodeExpanding",
			/* cancel="false" Fired after a node is expanded.
			```
				//Bind
				$(document).delegate(".selector", "igtreenodeexpanded", function (evt, ui) {
					//return reference to igTree
					ui.owner;
					//return reference to the expanded node object.
					ui.node;
				});

				//Initialize
				$(".selector").igTree({
					nodeExpanded: function(evt, ui) {...}
				});
			```
				Use ui.owner to get a reference to the tree.
				Use ui.node to get a reference to the expanded node object.
			*/
			nodeExpanded: "nodeExpanded",
			/* cancel="false" Fired on node click.
			```
				//Bind
				$(document).delegate(".selector", "igtreenodeclick", function (evt, ui) {
					//return reference to igTree
					ui.owner;
					//return reference to the node object being clicked.
					ui.node;
				});

				//Initialize
				$(".selector").igTree({
					nodeClick: function(evt, ui) {...}
				});
			```
				Use ui.owner to get a reference to the tree.
				Use ui.node to get a reference to the node object being clicked.
			*/
			nodeClick: "nodeClick",
			/* cancel="false" Fired on node double click.
			```
				//Bind
				$(document).delegate(".selector", "igtreenodedoubleclick", function (evt, ui) {
					//return a reference to the path of the double clicked node.
					ui.path;
					//return a reference to the jQuery element of the double clicked node.
					ui.element;
					//return the node data.
					ui.data;
					//return a reference to the bindings object for the level at which the double clicked node is located.
					ui.binding;
				});

				//Initialize
				$(".selector").igTree({
					nodeDoubleClick: function(evt, ui) {...}
				});
			```
				Use ui.path to get the data-path attribute of the double clicked node.
				Use ui.element to get a reference to the jQuery element of the double clicked node.
				Use ui.data to get the node data.
				Use ui.binding to get a reference to the bindings object for the level at which the double clicked node is located.
			*/
			nodeDoubleClick: "nodeDoubleClick",
			/* cancel="true" Fired on node drag start.
			```
				//Bind
				$(document).delegate(".selector", "igtreedragstart", function (evt, ui) {
					//return reference to the binding.
					ui.binding;
					//return reference to the data.
					ui.data;
					//return reference to the element.
					ui.element;
					//return reference to the helper.
					ui.helper;
					//return reference to the offset.
					ui.offest;
					//return to get a reference to the original position of the draggable element (the node).
					ui.orginalPosition
					//return reference to the node path.
					ui.path
					//return reference to the current position of the draggable element.
					ui.position
				});

				//Initialize
				$(".selector").igTree({
					dragStart: function(evt, ui) {...}
				});
			```
				Use ui.binding to gets a reference to the bindings object for the level at which the dragged node is located.
				Use ui.data	to get a reference to the node data.
				Use ui.element to get a reference to the node element.
				Use ui.helper to get a reference to the helper.
				Use ui.offset to get a reference to the offset.
				Use ui.orginalPosition to get a reference to the original position of the draggable element (the node).
				Use ui.path	to get the node data-path attrubte.
				Use ui.position to get a reference to the current position of the draggable element.
			*/
			dragStart: "dragStart",
			/* cancel="true" Fired on node drag.
			```
				//Bind
				$(document).delegate(".selector", "igtreedrag", function (evt, ui) {
					//return reference to the binding.
					ui.binding;
					//return reference to the data.
					ui.data;
					//return reference to the element.
					ui.element;
					//return reference to the helper.
					ui.helper;
					//return reference to the offset.
					ui.offest;
					//return to get a reference to the original position of the draggable element (the node).
					ui.orginalPosition
					//return reference to the node path.
					ui.path
					//return reference to the current position of the draggable element.
					ui.position
				});

				//Initialize
				$(".selector").igTree({
					drag: function(evt, ui) {...}
				});

			```
				Use ui.binding to gets a reference to the binding object for the level at which the dragged node is located.
				Use ui.data	to get a reference to the node data.
				Use ui.element to get a reference to the node element.
				Use ui.helper to get a reference to the helper.
				Use ui.offset to get a reference to the offset.
				Use ui.orginalPosition to get a reference to the original position of the draggable element (the node).
				Use ui.path	to get the node data-path attribute.
				Use ui.position to get a reference to the current position of the draggable element.
			*/
			drag: "drag",
			/* cancel="false" Fired after a drag operation has completed.
			```
				//Bind
				$(document).delegate(".selector", "igtreedragstop", function (evt, ui) {
					ui.offest;
					//return to get a reference to the original position of the draggable element (the node).
					ui.orginalPosition
					//return reference to the node path.
					ui.path
					//return reference to the current position of the draggable element.
					ui.position
				});

				//Initialize
				$(".selector").igTree({
					dragStop: function(evt, ui) {...}
				});
			```
				Use ui.helper to get a reference to the helper.
				Use ui.offset to get a reference to the offset.
				Use ui.orginalPosition to get a reference to the original position of the draggable element (the node).
				Use ui.position to get a reference to the current position of the draggable element.
			*/
			dragStop: "dragStop",
			/* cancel="true" Fired before a node is dropped.
			```
				//Bind
				$(document).delegate(".selector", "igtreenodedropping", function (evt, ui) {
					//return reference to the binding.
					ui.binding;
					//return reference to the data.
					ui.data;
					//return reference to the draggable element (the node).
					ui.draggable
					//return reference to the element.
					ui.element;
					//return reference to the helper.
					ui.helper;
					//return reference to the offset.
					ui.offest;
					//return to get a reference to the original position of the draggable element (the node).
					ui.path
					//return reference to the current position of the draggable element.
					ui.position
				});

				//Initialize
				$(".selector").igTree({
					nodeDropping: function(evt, ui) {...}
				});
			```
				Use ui.binding to gets a reference to the binding object for the level at which the target node is located.
				Use ui.data	to get a reference to the target node data.
				Use ui.draggable to get a reference to the draggable element (the node).
				Use ui.element to get a reference to the node element.
				Use ui.helper to get a reference to the helper.
				Use ui.offset to get a reference to the offset.
				Use ui.path	to get the target node data-path attribute.
				Use ui.position to get a reference to the current position of the draggable element.
			*/
			nodeDropping: "nodeDropping",
			/* cancel="false" Fired after a node is dropped.
			```
				//Bind
				$(document).delegate(".selector", "igtreenodedropped", function (evt, ui) {
					//return reference to the binding.
					ui.binding;
					//return reference to the data.
					ui.data;
					//return reference to the draggable element (the node).
					ui.draggable
					//return reference to the element.
					ui.element;
					//return reference to the helper.
					ui.helper;
					//return reference to the offset.
					ui.offest;
					//return to get a reference to the original position of the draggable element (the node).
					ui.orginalPosition
					//return reference to the node path.
					ui.path
					//return reference to the current position of the draggable element.
					ui.position
				});

				//Initialize
				$(".selector").igTree({
					nodeDropped: function(evt, ui) {...}
				});
			```
				Use ui.binding to gets a reference to the binding object for the level at which the target node is located.
				Use ui.data	to get a reference to the target node data.
				Use ui.draggable to get a reference to the draggable element (the node).
				Use ui.element to get a reference to the element.
				Use ui.helper to get a reference to the helper.
				Use ui.offset to get a reference to the offset.
				Use ui.path	to get the target node data-path attribute.
				Use ui.position to get a reference to the current position of the draggable element.
			*/
			nodeDropped: "nodeDropped"
		},
		_createWidget: function (options) {
			/* !Strip dummy objects from options, because they are defined for documentation purposes only! */
			this.options.bindings = null;
			if (options && options.dragAndDrop) {
				this.options.dragAndDropSettings.moveToMarkup =
					"<div><p><span></span>" + $.ig.Tree.locale.moveTo + "</p></div>";
				this.options.dragAndDropSettings.moveBetweenMarkup =
					"<div><p><span></span>" + $.ig.Tree.locale.moveBetween + "</p></div>";
				this.options.dragAndDropSettings.moveAfterMarkup =
					"<div><p><span></span>" + $.ig.Tree.locale.moveAfter + "</p></div>";
				this.options.dragAndDropSettings.moveBeforeMarkup =
					"<div><p><span></span>" + $.ig.Tree.locale.moveBefore + "</p></div>";
				this.options.dragAndDropSettings.copyToMarkup =
					"<div><p><span></span>" + $.ig.Tree.locale.copyTo + "</p></div>";
				this.options.dragAndDropSettings.copyBetweenMarkup =
					"<div><p><span></span>" + $.ig.Tree.locale.copyBetween + "</p></div>";
				this.options.dragAndDropSettings.copyAfterMarkup =
					"<div><p><span></span>" + $.ig.Tree.locale.copyAfter + "</p></div>";
				this.options.dragAndDropSettings.copyBeforeMarkup =
					"<div><p><span></span>" + $.ig.Tree.locale.copyBefore + "</p></div>";
			}
			$.Widget.prototype._createWidget.apply(this, arguments);
		},
		_create: function () {
			var opt = this.options;
			this.dataBind();
			this.element.addClass(this.css.tree);

			// K.D. February 17th, 2014 Bug #164398 Attaching events only on create as delegate is used instead of bind now.
			this._attachEvents();

			if (opt.width) {
				this.element.css("width", opt.width);
			}
			if (opt.height) {
				this.element.css("height", opt.height);
			}
		},
		_setOption: function (option, value) {
			var css = this.css, elements, prevValue = this.options[ option ];
			if (prevValue === value) {
				return;
			}
			$.Widget.prototype._setOption.apply(this, arguments);

			switch (option) {
			case "width":
				this.element.css("width", value);
				break;
			case "height":
				this.element.css("height", value);
				break;
			case "parentNodeImageUrl":
				elements = this.element.find("img[data-role=parent-node-image]");
				if (elements.length > 0) {
					elements.attr("src", value);
				} else {
					throw new Error($.ig.Tree.locale.setOptionError + option);
				}
				break;
			case "parentNodeImageTooltip":
				elements = this.element.find("img[data-role=parent-node-image]");
				if (elements.length <= 0) {
					elements = this.element.find("span[data-role=parent-node-image]");
				}
				if (elements.length > 0) {
					elements.attr("title", value);
				} else {
					throw new Error($.ig.Tree.locale.setOptionError + option);
				}
				break;
			case "parentNodeImageClass":
				elements = this.element.find("span[data-role=parent-node-image]");
				if (elements.length > 0) {
					elements.removeClass();
					elements.addClass(value);
				} else {
					throw new Error($.ig.Tree.locale.setOptionError + option);
				}
				break;
			case "leafNodeImageUrl":
				elements = this.element.find("img[data-role=leaf-node-image]");
				if (elements.length > 0) {
					elements.attr("src", value);
				} else {
					throw new Error($.ig.Tree.locale.setOptionError + option);
				}
				break;
			case "leafNodeImageTooltip":
				elements = this.element.find("img[data-role=leaf-node-image]");
				if (elements.length <= 0) {
					elements = this.element.find("span[data-role=leaf-node-image]");
				}
				if (elements.length > 0) {
					elements.attr("title", value);
				} else {
					throw new Error($.ig.Tree.locale.setOptionError + option);
				}
				break;
			case "leafNodeImageClass":
				elements = this.element.find("span[data-role=leaf-node-image]");
				if (elements.length > 0) {
					elements.removeClass();
					elements.addClass(value);
				} else {
					throw new Error($.ig.Tree.locale.setOptionError + option);
				}
				break;
			case "hotTracking":
				if (value) {

					// K.D. August 16th, 2013 Bug #149438 Switching to delegated events
					this.element.delegate("a", {
						"mouseover": function (event) {
							$(event.target).addClass(css.nodeHovered);
						},
						"mouseout": function (event) {
							$(event.target).removeClass(css.nodeHovered);
						}
					});
				} else {

					// K.D. August 16th, 2013 Bug #149438 Switching to delegated events
					this.element.undelegate("a", "mouseover");
					this.element.undelegate("a", "mouseout");
				}
				break;
				case "checkboxMode":

				// K.D. February 10th, 2014 Bug #163522 When the igTree is initialized with checkboxMode = off setting its value to biState is not possible
				if (value.toLowerCase() === "off") {
					this._removeCheckboxes();
				} else if (prevValue === "off") {
					this._addCheckboxes();
				}
				break;
				case "dataSource":

				// K.D. January 10th, 2012 Bug #99110 The tree needs to be rebound and rerendered after changing the DS
				this.dataBind();
				break;
			case "dragAndDrop":
				if (value) {
					this._initDragAndDrop();
				} else {
					this._destroyDragAndDrop();
				}
				break;
			case "updateUrl":
				this.options.dataSource.root().settings.updateUrl = value;
				break;
			case "bindings":
			case "loadOnDemand":
			case "pathSeparator":
			case "initialExpandDepth":
			case "defaultNodeTarget":

				// K.D. April 14th, 2014 Bug #169669 Throwing an error on bindings
				throw new Error($.ig.Tree.locale.setOptionError + option);
			default:
				break;
			}
		},
		_removeCheckboxes: function () {
			this.element.find("span[data-role=checkbox]").remove();
		},
		_addCheckboxes: function () {
			var self = this;
			this.element.find("li[data-role=node]").each(function () {
				var $this = $(this);
				if ($this.children("span[data-role=expander]").length > 0) {
					$this.children("span[data-role=expander]").after(self._renderCheckbox());
				} else {
					$this.prepend(self._renderCheckbox());
				}
			});
		},
		_initDataOptions: function () {
			var dataOptions, ul, s;

			s = this._initDataSourceSchema();
			if (!this.options.dataSource && !this.options.dataSourceUrl) {
				if (!this.element.is("ul")) {
					ul = this.element.children("ul");
					this.options.dataSource = ul[ 0 ];
				} else {
					this.options.dataSource = this.element[ 0 ];
				}
			} else if (!this.options.dataSource && this.options.dataSourceUrl) {
				this.options.dataSource = this.options.dataSourceUrl;
			} else if ($.type(this.options.dataSource) === "object" &&
						typeof this.options.dataSource._encodeHierarchicalUrlParams !== "function" &&
						typeof this.options.dataSource._xmlToArray !== "function" &&
						!this.options.dataSourceType) {

				// K.D. October 14th, 2013 Bug #154764 When the igTree is bound to an object and not an array an error is thrown
				this.options.dataSource = [ this.options.dataSource ];
			}

			dataOptions = {
				callback: this._constructFromData,
				callee: this,
				dataSource: this.options.dataSource,
				requestType: this.options.requestType,
				responseContentType: this.options.responseContentType,
				defaultChildrenDataProperty: this.options.bindings.childDataProperty,
				responseDataType: this.options.responseDataType,
				primaryKey: this.options.primaryKey,
				localSchemaTransform: this.options.dataSourceType &&
					this.options.dataSourceType === "xml" ? true : false,
				schema: s,
				updateUrl: this.options.updateUrl
			};

			if (this.options.dataSourceType) {
				dataOptions.type = this.options.dataSourceType;
			}

			// K.D. September 20th, 2012 Bug #121861 The responseDataKey needs to be set in the data source
			if (this.options.responseDataKey) {
				dataOptions.responseDataKey = this.options.responseDataKey;
			}

			return dataOptions;
		},
		_initDataSourceSchema: function () {
			var schema = {}, opt = this.options, bindings = opt.bindings;

			if (bindings === null) {
				opt.bindings = {};
				schema.text = { name: "Text", type: "string" };
				opt.bindings.textKey = "Text";
				schema.value = { name: "Value", type: "string" };
				opt.bindings.valueKey = "Value";
				schema.imageUrl = { name: "ImageUrl", type: "string" };
				opt.bindings.imageUrlKey = "ImageUrl";
				schema.navigateUrl = { name: "NavigateUrl", type: "string" };
				opt.bindings.navigateUrlKey = "NavigateUrl";
				schema.childData = { name: "Nodes", type: "object" };
				opt.bindings.childDataProperty = "Nodes";
				schema.target = { name: "Target", type: "string" };
				opt.bindings.targetKey = "Target";
				schema.expanded = { name: "Expanded", type: "boolean" };
				opt.bindings.expandedKey = "Expanded";
				bindings = opt.bindings;
			} else if (opt.dataSourceType === "xml") {
				if (bindings.searchFieldXPath) {
					schema.searchField = bindings.searchFieldXPath;
				}
			}

			schema.fields = [];
			if (bindings.textKey) {
				schema.fields.push({ name: bindings.textKey, type: "string", xpath: bindings.textXPath });
				schema.textKey = bindings.textKey;
			}
			if (bindings.valueKey) {
				schema.fields.push({ name: bindings.valueKey, type: "string", xpath: bindings.valueXPath });
				schema.valueKey = bindings.valueKey;
			}
			if (bindings.navigateUrlKey) {
				schema.fields.push({
					name: bindings.navigateUrlKey, type: "string", xpath: bindings.navigateUrlXPath
				});
				schema.navigateUrlKey = bindings.navigateUrlKey;
			}
			if (bindings.imageUrlKey) {
				schema.fields.push({
					name: bindings.imageUrlKey, type: "string", xpath: bindings.imageUrlXPath
				});
				schema.imageUrlKey = bindings.imageUrlKey;
			}
			if (bindings.targetKey) {
				schema.fields.push({ name: bindings.targetKey, type: "string" });
				schema.targetKey = bindings.targetKey;
			}
			if (bindings.expandedKey) {
				schema.fields.push({ name: "Expanded", type: "boolean" });
				schema.expandedKey = bindings.expandedKey;
			}
			if (bindings.primaryKey) {
				schema.fields.push({ name: bindings.primaryKey, type: "string" });
				schema.primaryKey = bindings.primaryKey;
			}
			if (bindings.childDataProperty) {
				schema.fields.push({
					name: bindings.childDataProperty, type: "object", xpath: bindings.childDataXPath
				});
				schema.childDataProperty = bindings.childDataProperty;
			}

			// K.D. March 30th, 2012 Bug #106890 When the data source type is remoteUrl and responseDataKey is set, then searchField in the
			// schema needs to be set to be the responseDataKey
			if (!schema.searchField && opt.responseDataKey) {
				schema.searchField = opt.responseDataKey;
			}
			return schema;
		},
		_initDataSource: function (dataOptions) {
			var opt = this.options;

			if (!opt.dataSource || typeof opt.dataSource._encodeHierarchicalUrlParams !== "function") {
				opt.dataSource = new $.ig.HierarchicalDataSource(dataOptions);
			}
		},
		_helper: null,
		_insertLine: {
			html: null
		},
		_originalHelper: {
			html: null
		},
		_sourceNode: {
			data: null,
			element: null,
			owner: null
		},
		_validationObject: {
			valid: true,
			dropAfter: true,
			expandTimeout: null,
			target: null
		},
		_helperDirty: false,
		_dropAfter: true,
		_initDragOptions: function () {
			var self = this,
				dragAndDropSettings = self.options.dragAndDropSettings,
				helper = dragAndDropSettings.helper === "default" ? function (event) {
					var target = $(event.target).closest("li[data-role=node]"),
						markup = $(self.options.dragAndDropSettings.invalidMoveToMarkup
						.replace("{0}", target.children("a").text()));
					markup.addClass(self.css.invalidDropIndicator)
						.find("span")
						.addClass(self.css.invalidMoveMarkupIcon);
					return markup;
				} : dragAndDropSettings.helper,
				opt = {
					revert: dragAndDropSettings.revert ? "invalid" : false,
					opacity: dragAndDropSettings.dragOpacity,
					zIndex: dragAndDropSettings.zIndex,
					cursorAt: this._const.dragCursorAt,
					helper: helper,
					revertDuration: dragAndDropSettings.revertDuration,
					appendTo: self.element,
					delay: dragAndDropSettings.dragStartDelay,
					containment: dragAndDropSettings.containment,
					start: function (event, ui) {
						var node = self.nodeFromElement($(this)), noCancel;
						noCancel = self._triggerDragStart(event, ui, node.element);
						if (noCancel) {
							self._originalHelper.html = ui.helper.html();

							// K.D. October 17th, 2013 Bug #155067 A shallow copy should be created instead of a deep one
							self._sourceNode.data = $.extend(false, {}, node.data);
							self._sourceNode.owner = self;
							self._sourceNode.element = node.element;
						} else {
							return false;
						}
					},
					drag: function (event, ui) {
						var noCancel = self._triggerDrag(event, ui, self._sourceNode.element);
						if (noCancel) {
							self._performDrag(event, ui);
						} else {

							// K.D. October 29th, 2012 Bug #125545 When the drag event is cancelled all the objects need to be reset.
							self._resetSourceNode();
							self._resetValidationObject();
							return false;
						}
					},
					stop: function (event, ui) {
						self._triggerDragStop(event, ui);
						$(document).find("div[data-role=insert-line]").remove();
						self._helperDirty = false;
						self._resetSourceNode();
						self._resetValidationObject();
					}
				};
			return opt;
		},
		_performDrag: function (event, ui) {
			var target = $(event.originalEvent.target),
				markup,
				copy = (event.ctrlKey && this.options.dragAndDropSettings.dragAndDropMode ===
					"default") || this.options.dragAndDropSettings.dragAndDropMode === "copy",
				targetTop,
				dragTop,
				self = this;
			if (target.is("div[data-role=insert-line]")) {
				return;
			}
			this._validationObject.valid = this._accept(this._sourceNode.element, target);
			$(document).find("div[data-role=insert-line]").remove();

			// Expand on hover
			// K.D. July 24th, 2012 Bug #117682 Expand on hover should only activate when hovering the anchor
			// K.D. February 7th, 2013 Bug #132384 Adding an option to disable the expandOnDragOver functionality
			if (this.options.dragAndDropSettings.expandOnDragOver) {
				if ((target.is("a") || target.closest("a").parent().is("li[data-role=node]")) &&
					this._validationObject.target !== target.closest("li[data-role=node]")) {
					clearTimeout(this._validationObject.expandTimeout);
					this._validationObject.target = target.closest("li[data-role=node]");

					// K.D. September 3rd, 2012 Bug #118064 Checking whether the current target has children and not triggering the expand if it does not
					if (this._validationObject.target.hasClass("ui-igtree-parentnode")) {
						this._validationObject.expandTimeout = setTimeout(function () {
							self.expand(self._validationObject.target);
						}, this.options.dragAndDropSettings.expandDelay);
					}
				} else {
					clearTimeout(this._validationObject.expandTimeout);
					this._validationObject.expandTimeout = null;
					this._validationObject.target = null;
				}
			}

			// Show the appropriate drag and drop markup
			if ((target.is("a") || target.closest("a").parent().is("li[data-role=node]")) &&
				this._validationObject.valid) {
				if (copy) {
					markup = $(this.options.dragAndDropSettings.copyToMarkup.replace("{0}", target.text()));
					markup.find("span").addClass(this.css.copyMarkupIcon);
				} else {
					markup = $(this.options.dragAndDropSettings.moveToMarkup.replace("{0}", target.text()));
					markup.find("span").addClass(this.css.moveMarkupIcon);
				}
				this._helper = markup.html();
				ui.helper.removeClass(this.css.invalidDropIndicator)
					.addClass(this.css.dropIndicator).html(this._helper);
				this._helperDirty = true;
			} else if (target.is("li[data-role=node]") && this._validationObject.valid) {
				targetTop = target.offset().top + target.height() / 2;
				dragTop = ui.offset.top + this._const.dragCursorAt.top;
				if (dragTop > targetTop) {
					this._validationObject.dropAfter = true;
					if (copy) {
						if (target.next("li[data-role=node]").length > 0) {
							markup = $(this.options.dragAndDropSettings.copyBetweenMarkup.replace("{0}", target
								.children("a").text()).replace("{1}",
								target.next("li[data-role=node]").children("a").text()));
							markup.find("span").addClass(this.css.copyMarkupIcon);
						} else {
							markup = $(this.options.dragAndDropSettings.copyAfterMarkup.replace(
										"{0}", target.children("a").text()
									));
							markup.find("span").addClass(this.css.copyMarkupIcon);
						}
					} else {
						if (target.next("li[data-role=node]").length > 0) {
							markup = $(this.options.dragAndDropSettings.moveBetweenMarkup.replace("{0}", target
								.children("a").text()).replace("{1}", target
								.next("li[data-role=node]").children("a").text()));
							markup.find("span").addClass(this.css.moveMarkupIcon);
						} else {
							markup = $(this.options.dragAndDropSettings.moveAfterMarkup
								.replace("{0}", target.children("a").text()));
							markup.find("span").addClass(this.css.moveMarkupIcon);
						}
					}
					$(this._insertLine.html).appendTo(target);
					this._helper = markup.html();
					ui.helper.removeClass(this.css.invalidDropIndicator)
						.addClass(this.css.dropIndicator)
						.html(this._helper);
				} else {
					this._validationObject.dropAfter = false;
					if (copy) {
						if (target.prev("li[data-role=node]").length > 0) {
							markup = $(this.options.dragAndDropSettings.copyBetweenMarkup
								.replace("{0}", target.children("a").text())
								.replace("{1}", target.prev("li[data-role=node]")
								.children("a").text()));
							markup.find("span").addClass(this.css.copyMarkupIcon);
						} else {
							markup = $(this.options.dragAndDropSettings.copyBeforeMarkup
								.replace("{0}", target.children("a").text()));
							markup.find("span").addClass(this.css.copyMarkupIcon);
						}
					} else {
						if (target.prev("li[data-role=node]").length > 0) {
							markup = $(this.options.dragAndDropSettings.moveBetweenMarkup
								.replace("{0}", target.prev("li[data-role=node]")
								.children("a").text())
								.replace("{1}", target.children("a").text()));
							markup.find("span").addClass(this.css.moveMarkupIcon);
						} else {
							markup = $(this.options.dragAndDropSettings.moveBeforeMarkup
								.replace("{0}", target.children("a").text()));
							markup.find("span").addClass(this.css.moveMarkupIcon);
						}
					}
					if (target.index() === 0) {
						$(this._insertLine.html).prependTo(target).css("padding-bottom", "0.1em");
					} else {
						$(this._insertLine.html).appendTo(target.prev());
					}
					this._helper = markup.html();
					ui.helper.removeClass(this.css.invalidDropIndicator)
						.addClass(this.css.dropIndicator)
						.html(this._helper);
				}
				this._helperDirty = true;
			} else if (target.is(":ui-igTree") && target.data("igTree") !== this) {

				// K.D. December 13th, 2013 Bug #159540 Allowing for dragging and dropping into an empty tree.
				if (copy) {
					markup = $(this.options.dragAndDropSettings.copyToMarkup.replace("{0}", ""));
					markup.find("span").addClass(this.css.copyMarkupIcon);
				} else {
					markup = $(this.options.dragAndDropSettings.moveToMarkup.replace("{0}", ""));
					markup.find("span").addClass(this.css.moveMarkupIcon);
				}
				this._helper = markup.html();
				ui.helper.removeClass(this.css.invalidDropIndicator)
					.addClass(this.css.dropIndicator).html(this._helper);
				this._helperDirty = true;
			} else {
				$(document).find("div[data-role=insert-line]").remove();
				if (this._helperDirty) {
					this._helper = null;
					ui.helper.removeClass(this.css.dropIndicator)
						.addClass(this.css.invalidDropIndicator)
						.html(this._originalHelper.html);
					this._helperDirty = false;
				}
			}
		},
		_resetSourceNode: function () {
			this._originalHelper.html = null;
			this._sourceNode.data = null;
			this._sourceNode.owner = null;
			this._sourceNode.element = null;
		},
		_resetValidationObject: function () {
			this._validationObject.valid = true;
			this._validationObject.dropAfter = true;
			clearTimeout(this._validationObject.expandTimeout);
			this._validationObject.expandTimeout = null;
			this._validationObject.target = null;
		},
		_initDropOptions: function () {
			var self = this,
				opt = {
					tolerance: "pointer",
					greedy: true,
					drop: function (event, ui) {

						// K.D. October 12th, 2012 Bug #124246 Disallow external element drop inside the tree
						if (self._sourceNode.element === null && self._sourceNode.owner === null) {
							return false;
						}
						return self._performDrop(event, ui);
					},
					accept: function () {
						return self._validationObject.valid;
					}
				};
			return opt;
		},
		_performDrop: function (event, ui) {
			var self = this, parent, target = $(event.originalEvent.target), noCancel;
			if (target.is("div[data-role=insert-line]")) {
				target = target.closest("li[data-role=node]");
			}
			self.element.find("div[data-role=insert-line]").remove();
			noCancel = self._triggerNodeDropping(event, ui, target.closest("li[data-role=node]"),
				target.next("li[data-role=node]").length > 0 || !self._validationObject.dropAfter ?
				target.index() + (self._validationObject.dropAfter ? 1 : 0) : target.index());
			if (noCancel) {
				if (target.is("a") || target.closest("a").parent().is("li[data-role=node]")) {
					target = target.closest("li[data-role=node]");
					switch (self.options.dragAndDropSettings.dragAndDropMode) {
					case "move":
						self.addNode(self._sourceNode.data, target);
						self._sourceNode.owner.removeAt(self._sourceNode.element.attr("data-path"));
						break;
					case "copy":
						self.addNode(self._sourceNode.data, target);
						break;
					default:
						if (!event.ctrlKey) {
							self.addNode(self._sourceNode.data, target);
							self._sourceNode.owner.removeAt(self._sourceNode.element.attr("data-path"));
						} else {
							self.addNode(self._sourceNode.data, target);
						}
						break;
					}
				} else if (target.is("li")) {
					parent = self.parentNode(target);
					switch (self.options.dragAndDropSettings.dragAndDropMode) {
					case "move":
						self.addNode(self._sourceNode.data, parent, target
							.next("li[data-role=node]").length > 0 ||
							!self._validationObject.dropAfter ?
							target.index() + (self._validationObject.dropAfter ? 1 : 0) : null);
						self._sourceNode.element.attr("data-path", self._sourceNode.element
							.attr("data-path") + "_remove");
						self._sourceNode.owner
							.removeAt(self._sourceNode.element.attr("data-path"));
						break;
					case "copy":
						self.addNode(self._sourceNode.data, parent, target
							.next("li[data-role=node]").length > 0 ||
							!self._validationObject.dropAfter ?
							target.index() + (self._validationObject.dropAfter ? 1 : 0) : null);
						break;
					default:
						if (!event.ctrlKey) {
							self.addNode(self._sourceNode.data, parent, target
								.next("li[data-role=node]").length > 0 ||
								!self._validationObject.dropAfter ? target
								.index() + (self._validationObject.dropAfter ? 1 : 0) : null);
							self._sourceNode.element.attr("data-path",
								self._sourceNode.element.attr("data-path") + "_remove");
							self._sourceNode.owner.removeAt(self._sourceNode.element.attr("data-path"));
						} else {
							self.addNode(self._sourceNode.data, parent, target
								.next("li[data-role=node]").length > 0 ||
								!self._validationObject.dropAfter ? target
								.index() + (self._validationObject.dropAfter ? 1 : 0) : null);
						}
						break;
					}
				} else if (target.is(":ui-igTree")) {

					// K.D. December 13th, 2013 Bug #159540 Allowing for dragging and dropping into an empty tree.
					switch (self.options.dragAndDropSettings.dragAndDropMode) {
					case "move":
						self.addNode(self._sourceNode.data);
						self._sourceNode.owner.removeAt(self._sourceNode.element.attr("data-path"));
						break;
					case "copy":
						self.addNode(self._sourceNode.data);
						break;
					default:
						if (!event.ctrlKey) {
							self.addNode(self._sourceNode.data);
							self._sourceNode.owner.removeAt(self._sourceNode.element.attr("data-path"));
						} else {
							self.addNode(self._sourceNode.data);
						}
						break;
					}
				}
				self._triggerNodeDropped(event, ui, target);
			} else {
				return false;
			}
		},
		_accept: function (dropElem, target) {

			// Validates the drop target
			var valid = true,
				node = target.closest("li[data-role=node]"),
				dropPath = dropElem.attr("data-path"),
				tree = target.closest(".ui-widget.ui-igtree"),
				sourceBinding = this._retrieveCurrentDepthBinding(parseInt(this._sourceNode.element
				.closest("ul").attr("data-depth"), 10)),
				destinationBinding;
			if ((target.is("a") && target.parent().is("li[data-role=node]")) ||
				target.closest("a").parent().is("li[data-role=node]")) {
				destinationBinding = tree.data("igTree")._retrieveCurrentDepthBinding(parseInt(target
					.closest("ul").attr("data-depth"), 10) + 1);
			} else {
				if (target.is("li[data-role=node]")) {
					destinationBinding = tree.data("igTree")._retrieveCurrentDepthBinding(parseInt(target
						.closest("ul").attr("data-depth"), 10));
				} else if (target.is(":ui-igTree")) {

					// K.D. December 13th, 2013 Bug #159540 Allowing for dragging and dropping into an empty tree.
					destinationBinding = tree.data("igTree")._retrieveCurrentDepthBinding(0);
				} else {
					destinationBinding = false;
				}
			}
			if (node.length > 0 && (node.attr("data-path") === dropPath || node.attr("data-path")
				.indexOf(dropPath + this.options.pathSeparator) === 0) &&
				this === tree.data("igTree")) {
				valid = false;
			} else if (this !== tree.data("igTree") &&
				!tree.igTree("option", "dragAndDropSettings").allowDrop) {
				valid = false;
			} else if (typeof tree.igTree("option", "dragAndDropSettings")
				.customDropValidation === "function") {
				valid = tree.igTree("option", "dragAndDropSettings")
					.customDropValidation.apply(target, [ dropElem ]);
			}
			if (sourceBinding && destinationBinding && valid) {
				valid = this._validateBindings(sourceBinding, destinationBinding, target);
			}
			return valid;
		},
		_validateBindings: function (sourceBinding, destinationBinding, target) {
			var valid = true;
			if (destinationBinding.hasOwnProperty("primaryKey")) {
				if (!sourceBinding.hasOwnProperty("primaryKey") ||
					sourceBinding.primaryKey !== destinationBinding.primaryKey) {
					valid = false;
				} else if (target.is("a") && this._sourceNode.element.parent()
					.closest("li[data-role=node]").is(target.closest("li[data-role=node]"))) {

					// K.D. November 12th, 2014 Bug #184185 Dropping a node on its parent removes the node when there is a primary key
					valid = false;
				}
			}
			if (destinationBinding.textKey !== sourceBinding.textKey) {
				valid = false;
			}
			if (destinationBinding.hasOwnProperty("valueKey") &&
				sourceBinding.hasOwnProperty("valueKey") &&
				destinationBinding.valueKey !== sourceBinding.valueKey) {
				valid = false;
			}
			if (destinationBinding.hasOwnProperty("childDataProperty") &&
				sourceBinding.hasOwnProperty("childDataProperty") &&
				destinationBinding.childDataProperty !== sourceBinding.childDataProperty) {
				valid = false;
			}
			return valid;
		},
		_initDragAndDrop: function (element) {
			var dragOptions = this._initDragOptions(),
				dropOptions = this._initDropOptions();
			if (!this._insertLine.html) {
				this._insertLine.html =
					'<div data-role="insert-line" class="' + this.css.insertLine + '"></div>';
			}
			if (!element) {
				this.element.find("li[data-role=node]").draggable(dragOptions);
				this.element.droppable(dropOptions);

				// K.D. August 16th, 2013 Bug #149438 Switching to delegated events
				this.element.delegate("a", "mousedown", function () {
					$(this).focus();
				});
			} else {
				element.draggable(dragOptions);
				element.find("li[data-role=node]").draggable(dragOptions);
			}
		},
		_destroyDragAndDrop: function () {
			this.element.find("li[data-role=node]").draggable("destroy");
			this.element.droppable("destroy");
			this.element.undelegate("a", "mousedown");
		},
		_constructFromData: function () {
			var ul, data = this.options.dataSource.root().data();
			this._triggerDataBound(data);
			this._triggerRendering(data);

			// K.D. Adding data-scroll attribute for igScroll (custom scrolling under touch environments)
			this.element.attr("data-scroll", true);

			if (this.element.is("ul")) {
				this.element.empty();
				ul = this.element;
				ul.addClass(this.css.treeCollection).addClass(this.css.treeRoot).attr("data-depth", 0);
				ul.html(this._initChildrenRecursively("", data));
				this._triggerRendered();
			} else {
				this.element.empty();
				ul = "<ul class='" + this.css.treeCollection + " " + this.css.treeRoot + "' data-depth='0'>";
				ul += this._initChildrenRecursively("", data);
				ul += "</ul>";

				$(ul).appendTo(this.element);
				this._triggerRendered();
			}

			if (this.options.dragAndDrop) {
				this._initDragAndDrop();
				if (typeof this.options.dragAndDropSettings.customDropValidation === "string") {

					// K.D. November 9th, 2012 Bug #126853 An exception is thrown in old IEs because the global object
					// does not have hasOwnProperty() defined on it.
					if (window[ this.options.dragAndDropSettings.customDropValidation ] &&
						typeof window[ this.options.dragAndDropSettings
						.customDropValidation ] === "function") {
						this.options.dragAndDropSettings.customDropValidation =
							window[ this.options.dragAndDropSettings.customDropValidation ];
					}
				}
			}
		},
		_attachEvents: function () {
			var self = this, css = this.css, noCancel, target;

			// Bind expander
			// K.D. August 16th, 2013 Bug #149438 Switching to delegated events
			this.element.delegate("span[data-role=expander]", "click", function (event) {
				self.toggle($(event.target).closest("li[data-role=node]"), event);
			});

			// Bind anchor
			// K.D. August 16th, 2013 Bug #149438 Switching to delegated events
			this.element.delegate("a", {
				"click": function (event) {
					target = $(event.target).closest("a");
					noCancel = self._triggerNodeClick(event, target.parent());

					if (noCancel) {
						self.select(target.parent(), event);
						if ($.ig.util.isWebKit) {
							target.focus();
						}
					} else {
						event.preventDefault();
					}
				},
				"dblclick": function (event) {
					event.preventDefault();
					self._triggerNodeDoubleClick(event, $(event.target.parentNode));
				},
				"keydown": function (event) {
					self._kbNavigation(event);
				},
				"focus": function (event) {
					self._focusNode(event);
				},
				"blur": function (event) {
					self._blurNode(event);
				}
			});

			if (this.options.hotTracking) {
				this.element.delegate("a", {
					"mouseover": function (event) {
						$(event.target).addClass(css.nodeHovered);
					},
					"mouseout": function (event) {
						$(event.target).removeClass(css.nodeHovered);
					}
				});
			}

			// Bind checkbox
			// K.D. August 16th, 2013 Bug #149438 Switching to delegated events
			this.element.delegate("span[data-role=checkbox] > span", {
				"click": function (event) {
					self.toggleCheckstate($(event.target).closest("li[data-role=node]"), event);
				},
				"mouseover": function (event) {
					$(event.target).closest("span[data-role=checkbox]").addClass(css.nodeHovered);
				},
				"mouseout": function (event) {
					$(event.target).closest("span[data-role=checkbox]").removeClass(css.nodeHovered);
				}
			});
		},
		_initChildrenRecursively: function (path, data, depth, checkFlag, indexFeed) {
			var childUl, opt = this.options, childPath, binding, value, display,
				liStr = [], i = 0, li, children;

			if (!indexFeed) {
				indexFeed = 0;
			}

			// Applying binding according to depth
			if (!depth) {
				depth = 0;
			}
			binding = this._retrieveCurrentDepthBinding(depth);
			if (!data.hasOwnProperty("length") && data.hasOwnProperty(binding.textKey)) {
				data = [ data ];
			}
			for (i; i < data.length; i++) {
				childUl = "";
				value = "";
				if (path.length <= 0) {
					if (binding.hasOwnProperty("primaryKey") && data[ i ].hasOwnProperty(binding.primaryKey)) {
						childPath = typeof data[ i ][ binding.primaryKey ] === "function" ?
							data[ i ] [ binding.primaryKey ]() : data[ i ][ binding.primaryKey ];
					} else {
						childPath =  i + indexFeed;
					}
				} else {
					if (binding.hasOwnProperty("primaryKey") && data[ i ].hasOwnProperty(binding.primaryKey)) {
						childPath = path + opt.pathSeparator +
							(typeof data[ i ][ binding.primaryKey ] === "function" ?
							data[ i ][ binding.primaryKey ]() : data[ i ][ binding.primaryKey ]);
					} else {
						childPath = path + opt.pathSeparator + (i + indexFeed);
					}
				}
				if (binding.hasOwnProperty("valueKey") && data[ i ].hasOwnProperty(binding.valueKey)) {
					if (typeof data[ i ][ binding.valueKey ] === "function") {
						value = data[ i ][ binding.valueKey ]();
					} else {
						value = data[ i ][ binding.valueKey ];
					}
				}
				li = '<li class="' + this._buildNodeCssString(data[ i ], depth, binding) +
					'" data-path="' + childPath + '" data-value="' + value + '" data-role="node">';

				children = data[ i ][ binding.childDataProperty ];
				if (typeof children === "function") {
					children = children();
				}
				if ((children && children.length > 0) || (children && opt.loadOnDemand)) {
					if ((depth <= opt.initialExpandDepth &&
						!opt.loadOnDemand) || (binding.hasOwnProperty("expandedKey") &&
						data[ i ].hasOwnProperty(binding.expandedKey) &&
						data[ i ][ binding.expandedKey ])) {
						li += this._renderExpanderImage(true);
						display = "block";
					} else {
						li += this._renderExpanderImage(false);
						display = "none";
					}
				}

				if (opt.checkboxMode && opt.checkboxMode.toLowerCase() !== "off") {
					li += this._renderCheckbox(checkFlag);
				}
				li += this._renderNodeImage(data[ i ], binding);
				if (!binding.nodeContentTemplate) {
					li += this._renderAnchor(data[ i ], binding);
				} else {
					li += this._renderNodeTemplate(data[ i ], binding);
				}

				if ((children && children.length > 0) || (children && opt.loadOnDemand)) {
					childUl = '<ul style="display: ' + display + '" data-depth="' + (depth + 1) + '"';
					if (children.length > 0 && !opt.loadOnDemand) {
						childUl += ">" + this._initChildrenRecursively(childPath, children, depth + 1, checkFlag);
					} else {
						childUl += ' data-populated="false">';
					}
					childUl += "</ul>";
				}
				li += childUl;
				li += "</li>";
				liStr.push(li);
			}
			return liStr.join("");
		},
		_buildNodeCssString: function (data, depth, binding) {
			var css = this.css, str = css.treeNode, children;
			if (depth === 0) {
				str += " " + css.treeRootNode;
			}
			children = data[ binding.childDataProperty ];
			if (typeof children === "function") {
				children = children();
			}
			if ((children && children.length > 0) || (children && this.options.loadOnDemand)) {
				str += " " + css.parentNode;
			} else {
				str += " " + css.nodeNoChildren;
			}
			return str;
		},
		_retrieveCurrentDepthBinding: function (depth) {
			var binding = this.options.bindings, i = 0;
			for (i; i < depth; i++) {
				if (binding.hasOwnProperty("bindings")) {
					binding = binding.bindings;
				} else {
					break;
				}
			}
			return binding;
		},
		_renderExpanderImage: function (expanded) {
			var self = this, css = self.css, expander = "";

			if (expanded) {
				expander = "<span data-role='expander' data-exp='true' class='" +
					css.collapseIcon + " " + css.nodeExpander + "'></span>";
			} else {
				expander = "<span data-role='expander' data-exp='false' class='" +
					css.expandIcon + " " + css.nodeExpander + "'></span>";
			}
			return expander;
		},
		_renderAnchor: function (data, binding) {
			var href, target, text;

			if (binding.hasOwnProperty("navigateUrlKey") && data[ binding.navigateUrlKey ]) {
				if (typeof data[ binding.navigateUrlKey ] === "function") {
					href = data[ binding.navigateUrlKey ]();
				} else {
					href = data[ binding.navigateUrlKey ];
				}
			} else {
				href = "#";
			}

			if (binding.targetKey && binding.targetKey.length > 0 && data.hasOwnProperty(binding.targetKey))
			{
				target = data[ binding.targetKey ];
			} else {
				target = this.options.defaultNodeTarget;
			}

			if (typeof data[ binding.textKey ] === "function") {
				text = data[ binding.textKey ]();
			} else {
				text = data[ binding.textKey ];
			}

			return "<a href='" + href + "' target='" + target + "' class='" +
				this.css.nodeAnchor + "'>" + text + "</a>";
		},
		_renderNodeTemplate: function (data, binding) {
			var div = $("<div></div>"), html, href, target, template = binding.nodeContentTemplate;

			// K.D. July 30th, 2013 Bug #148135 navigateURL non-responsive when nodeContentTemplate is set
			if (binding.hasOwnProperty("navigateUrlKey") && data[ binding.navigateUrlKey ]) {
				if (typeof data[ binding.navigateUrlKey ] === "function") {
					href = data[ binding.navigateUrlKey ]();
				} else {
					href = data[ binding.navigateUrlKey ];
				}
			} else {
				href = "#";
			}
			if (binding.targetKey && binding.targetKey.length > 0 && data.hasOwnProperty(binding.targetKey))
			{
				target = data[ binding.targetKey ];
			} else {
				target = this.options.defaultNodeTarget;
			}

			// K.D. February 14th, 2012 There needs to be a default case in which the html is simply the content of the div
			// without any manipulations
			div.html($.ig.tmpl(template, data));
			if (div.children("a").length <= 0) {
				html = "<a href='" + href + "' target='" + target + "' class='" +
					this.css.nodeAnchor + "'>" + div.html() + "</a>";
			} else if (!div.children("a").attr("href")) {
				div.children("a").addClass(this.css.nodeAnchor).attr({
					href: href,
					target: target
				});
				html = div.html();
			} else {
				div.children("a").addClass(this.css.nodeAnchor);
				html = div.html();
			}
			return html;
		},
		_renderCheckbox: function (checkFlag) {
			var self = this, css = self.css;
			return "<span data-chk='" + (checkFlag ? "on" : "off") + "' data-role='checkbox' class='" +
				css.checkbox + "'><span class='" + (checkFlag ?
				css.checkboxOn : css.checkboxOff) + "'></span></span>";
		},
		_renderNodeImage: function (data, binding) {
			var opt = this.options, hasChildren, img = "", src;

			hasChildren = (data[ binding.childDataProperty ] &&
				data[ binding.childDataProperty ].length > 0) ||
				(data[ binding.childDataProperty ] && opt.loadOnDemand);

			if (binding.hasOwnProperty("imageUrlKey") && data.hasOwnProperty(binding.imageUrlKey)) {
				if (typeof data[ binding.imageUrlKey ] === "function") {
					src = data[ binding.imageUrlKey ]();
					if (src && src.length > 0) {
						img = '<img src="' + src + '" alt="error" data-role="node-image" />';
					}
				} else if (data[ binding.imageUrlKey ].length > 0) {
					img = '<img src="' + data[ binding.imageUrlKey ] + '" alt="error" data-role="node-image" />';
				}
			}
			if (opt.parentNodeImageUrl && hasChildren) {
				img += "<img src='" + opt.parentNodeImageUrl + "' alt='error' title='" +
					(opt.parentNodeImageTooltip !== null ? opt.parentNodeImageTooltip : "") +
					"' data-role='parent-node-image' />";
			} else if (opt.parentNodeImageClass && hasChildren) {
				img += "<span title='" + (opt.parentNodeImageTooltip !== null ?
					opt.parentNodeImageTooltip : "") + "' class='" + opt.parentNodeImageClass +
					"' data-role='parent-node-image'></span>";
			} else if (!hasChildren && opt.leafNodeImageUrl) {
				img += "<img src='" + opt.leafNodeImageUrl + "' alt='error' title='" +
					(opt.leafNodeImageTooltip !== null ? opt.leafNodeImageTooltip : "") +
					"' data-role='leaf-node-image' />";
			} else if (!hasChildren && opt.leafNodeImageClass) {
				img += "<span title='" + (opt.leafNodeImageTooltip !== null ?
					opt.leafNodeImageTooltip : "") + "' class='" +
					opt.leafNodeImageClass + "' data-role='leaf-node-image'></span>";
			}
			return img;
		},
		_focusNode: function (event) {
			$(event.target).addClass(this.css.nodeActive);
		},
		_blurNode: function (event) {
			$(event.target).removeClass(this.css.nodeActive);
		},
		_kbNavigation: function (event) {
			var opt = this.options, css = this.css, li = $(event.target.parentNode),
				nextLi, seq = li.index(), expander;

			if (event.keyCode === $.ui.keyCode.UP) {
				nextLi = this._nextVisibleNodeUp(li);
				if (!nextLi) {
					return;
				}

				if (event.ctrlKey) {

					// K.D. December 14th, 2011 Bug #85068 jQuery 1.4.4 does not trigger blur when
					// calling focus so I'm calling it manually
					li.children("a").blur();
					nextLi.children("a").focus();
				} else {

					// K.D. December 14th, 2011 Bug #85068 jQuery 1.4.4 does not trigger blur when
					// calling focus so I'm calling it manually
					li.children("a").blur();
					nextLi.children("a").focus();
					this.select(nextLi, null);
				}
				event.preventDefault();
			} else if (event.keyCode === $.ui.keyCode.DOWN) {
				nextLi = this._nextVisibleNodeDown(li, seq);
				if (!nextLi) {
					return;
				}

				if (event.ctrlKey) {

					// K.D. December 14th, 2011 Bug #85068 jQuery 1.4.4 does not trigger blur when
					// calling focus so I'm calling it manually
					li.children("a").blur();
					nextLi.children("a").focus();
				} else {

					// K.D. December 14th, 2011 Bug #85068 jQuery 1.4.4 does not trigger blur when
					// calling focus so I'm calling it manually
					li.children("a").blur();
					nextLi.children("a").focus();
					this.select(nextLi, null);
				}
				event.preventDefault();
			} else if (event.keyCode === $.ui.keyCode.RIGHT) {
				if (li.children("ul").length > 0) {
					expander = li.children("." + css.nodeExpander);
					if (!expander.attr("data-exp") || expander.attr("data-exp") === "false") {
						this.toggle(li, null);
					} else {
						nextLi = li.find("ul > li:first");
						if (nextLi.length > 0) {
							if (event.ctrlKey) {

								// K.D. December 14th, 2011 Bug #85068 jQuery 1.4.4 does not trigger blur when
								// calling focus so I'm calling it manually
								li.children("a").blur();
								nextLi.children("a").focus();
							} else {

								// K.D. December 14th, 2011 Bug #85068 jQuery 1.4.4 does not trigger blur when
								// calling focus so I'm calling it manually
								li.children("a").blur();
								nextLi.children("a").focus();
								this.select(nextLi, null);
							}
						}
					}
				}
			} else if (event.keyCode === $.ui.keyCode.LEFT) {
				expander = li.children("." + css.nodeExpander);
				if (expander.attr("data-exp") && expander.attr("data-exp") !== "false") {
					this.toggle(li, null);
				} else if (li.parent().parent().is("li")) {
					nextLi = li.parent().parent();
					if (event.ctrlKey) {

						// K.D. December 14th, 2011 Bug #85068 jQuery 1.4.4 does not trigger blur when
						// calling focus so I'm calling it manually
						li.children("a").blur();
						nextLi.children("a").focus();
					} else {

						// K.D. December 14th, 2011 Bug #85068 jQuery 1.4.4 does not trigger blur when
						// calling focus so I'm calling it manually
						li.children("a").blur();
						nextLi.children("a").focus();
						this.select(nextLi, null);
					}
				}
			} else if (event.keyCode === $.ui.keyCode.NUMPAD_ADD) {
				if (li.children("ul").length > 0) {
					expander = li.children("." + css.nodeExpander);
					if (!expander.attr("data-exp") || expander.attr("data-exp") === "false") {
						this.toggle(li, null);
					}
				}
			} else if (event.keyCode === $.ui.keyCode.NUMPAD_SUBTRACT) {
				if (li.children("ul").length > 0) {
					expander = li.children("." + css.nodeExpander);
					if (expander.attr("data-exp") && expander.attr("data-exp") !== "false") {
						this.toggle(li, null);
					}
				}
			} else if (event.keyCode === $.ui.keyCode.SPACE) {
				if (opt.checkboxMode && opt.checkboxMode.toLowerCase() !== "off") {
					this.toggleCheckstate(li, null);
					event.preventDefault();
					event.stopPropagation();
				}
			} else if (event.keyCode === $.ui.keyCode.HOME) {

				// K.D. December 14th, 2011 Bug #85068 jQuery 1.4.4 does not trigger blur when
				// calling focus so I'm calling it manually
				li.children("a").blur();
				li = this.element.find("li:first");
				if (li.length > 0) {
					li.children("a").focus();
					this.select(li);
				}
				event.preventDefault();
			} else if (event.keyCode === $.ui.keyCode.END) {

				// K.D. December 14th, 2011 Bug #85068 jQuery 1.4.4 does not trigger blur when
				// calling focus so I'm calling it manually
				li.children("a").blur();
				li = this._lastVisibleNode();
				if (li) {
					li.children("a").focus();
					this.select(li);
				}
				event.preventDefault();
			}
		},
		_nextVisibleNodeDown: function (node, nodeSeq) {
			var expander = node.children("." + this.css.nodeExpander), parentLi,
				seq = nodeSeq, result = null;

			if (expander.length > 0 && expander.attr("data-exp") &&
				expander.attr("data-exp") !== "false" &&
				node.children("ul").children("li:first").length > 0) {
				return node.children("ul").children("li:first");
			}

			if (seq === node.siblings().length) {
				parentLi = node.parent().parent();
				while (parentLi.is("li")) {
					seq = parentLi.index();
					if (seq !== parentLi.siblings().length) {
						result = parentLi.next();
						break;
					}
					parentLi = parentLi.parent().parent();
				}
			} else {
				result = node.next();
			}
			return result;
		},
		_nextVisibleNodeUp: function (node) {
			var li = node.prev(), expander, result = null;

			if (li.length <= 0) {
				if (node.parent().parent().is("li")) {
					result = node.parent().parent();
				}
			} else {
				while (li.length > 0) {
					expander = li.children("." + this.css.nodeExpander);
					if (li.children("ul").children("li").length <= 0 ||
						!expander.attr("data-exp") || expander.attr("data-exp") === "false") {
						result = li;
						break;
					}
					li = li.children("ul").children("li:last");
				}
			}
			return result;
		},
		_lastVisibleNode: function () {
			var li = this.element.is("ul") ? this.element.children("li:last") :
				this.element.children("ul").children("li:last"), expander, result;

			if (li.length <= 0) {
				result = null;
			} else {
				while (li.length > 0) {
					expander = li.children("." + this.css.nodeExpander);
					if (li.children("ul").children("li").length <= 0 || !expander.attr("data-exp") ||
						expander.attr("data-exp") === "false") {
						result = li;
						break;
					}
					li = li.children("ul").children("li:last");
				}
			}
			return result;
		},
		_populatingNode: null,
		_populateNodeData: function (success, msg, data) {
			if (!success) {
				throw new Error($.ig.Tree.locale.errorOnRequest + msg);
			}
			var ul = this._populatingNode.ul, node = this._populatingNode.node,
				originalData = this.nodeDataFor(node.attr("data-path")),
				depth = ul.attr("data-depth"),
				binding = this._retrieveCurrentDepthBinding(depth - 1),
				checked, newData = data.data();

			if (this.options.checkboxMode.toLowerCase() === "tristate") {
				checked = this.isChecked(node);
			}

			// Clear the loading indicator space
			// K.D. August 16th, 2013 Bug #149438 Keeping the already rendered nodes and rendering the loaded ones after
			ul.children('li[data-role="loading"]').remove();
			if (!originalData[ binding.childDataProperty ] ||
				!originalData[ binding.childDataProperty ].length) {
				originalData[ binding.childDataProperty ] = newData;
			} else {
				originalData[ binding.childDataProperty ] =
					originalData[ binding.childDataProperty ].concat(newData);
			}
			this._triggerNodePopulated(null, node);

			// K.D. November 23rd, 2011 Bug #96609 The data should be extracted from the datasource before sent to the event trigger
			this._triggerRendering(newData);

			// K.D. August 16th, 2013 Bug #149438 Keeping the already rendered nodes and rendering the loaded ones after
			ul.append(this._initChildrenRecursively(node.attr("data-path"),
				newData, parseInt(ul.attr("data-depth"), 10), checked));
			ul.attr("data-populated", true);
			if (this.options.dragAndDrop) {
				this._initDragAndDrop(ul);
			}
			this._triggerRendered();
			this._populatingNode.indicator.hide();
			this._populatingNode.indicator.destroy();
			this._populatingNode = null;
			this.toggle(node);

			// K.D. December 15th, 2014 Bug #186563 After expand the load queue should be synced for expanding to node with LOD
			this._loadRequest();
		},
		_prepareRequest: function (node, event) {
			var opt = this.options, pathKeyArr, path, key, data, binding, parentBinding, noCancel;

			if (this._populatingNode !== null) {
				return;
			}

			noCancel = this._triggerNodePopulating(event, node);
			if (noCancel) {
				pathKeyArr = this._buildRequestString(node);
				binding = this._retrieveCurrentDepthBinding(parseInt(
					node.children("ul").attr("data-depth"), 10
					));
				if (!pathKeyArr) {
					return;
				}
				path = pathKeyArr[ 0 ];
				key = pathKeyArr[ 1 ];

				data = this.nodeDataFor(node.attr("data-path"));
				parentBinding = this._retrieveCurrentDepthBinding(parseInt(node.children("ul")
					.attr("data-depth"), 10) - 1);
				if (data.hasOwnProperty(parentBinding.childDataProperty)) {
					data = data[ parentBinding.childDataProperty ];
				}
				if (data && data.__deferred && data.__deferred.uri) {
					this._executeODataRequest(node, data);
				} else if (data && data.length > 0 && !opt.dataSourceUrl) {
					this._renderOnDemand(node, data);
				} else {
					this._executeUrlRequest(node, binding, path, key);
				}
			}
		},
		_executeODataRequest: function (node, data) {
			var dataSource, ul, indicator, opt = this.options, li;
			dataSource = new $.ig.JSONPDataSource({ dataSource: data.__deferred.uri +
				"?$format=json&$callback=?", responseDataKey: opt.responseDataKey });
			ul = node.children("ul");

			// Create loading indicator space
			li = $('<li style="width: 20px" data-role="loading">&nbsp;</li>').appendTo(ul);
			ul.show();

			// K.D. December 19th, 2011 Bug #98217 Adding flag pointing that the loading indicator is instantiated by the tree
			indicator = li.igLoading({ includeVerticalOffset: false }).data("igLoading").indicator();
			indicator.show();
			this._populatingNode = {
				ul: ul,
				node: node,
				indicator: indicator
			};
			dataSource.dataBind(this._populateNodeData, this);
		},
		_renderOnDemand: function (node, data) {
			var ul, checked;
			ul = node.children("ul");
			if (this.options.checkboxMode.toLowerCase() === "tristate") {
				checked = this.isChecked(node);
			}
			this._triggerNodePopulated(null, node);
			this._triggerRendering(data);

			// K.D. November 4th, 2013 Bug #156776 When we have render on demand and drag and drop we need to clear the container
			// because we've added the data to the data source and we've rendered an item upon drop and thus we end up with two
			// items when we pass through this method
			ul.html(this._initChildrenRecursively(node.attr("data-path"),
				data, parseInt(ul.attr("data-depth"), 10), checked));
			ul.attr("data-populated", true);
			if (this.options.dragAndDrop) {
				this._initDragAndDrop(ul);
			}
			this._triggerRendered();
			this.toggle(node);

			// K.D. December 15th, 2014 Bug #186563 After expand the load queue should be synced for expanding to node with LOD
			this._loadRequest();
		},
		_executeUrlRequest: function (node, binding, path, key) {
			var opt = this.options, ul, indicator, dataSource, li;
			if (opt.dataSourceUrl && opt.dataSourceUrl.lastIndexOf("?") === -1) {
				opt.dataSourceUrl += "?";
			} else if (!opt.dataSourceUrl) {
				throw new Error($.ig.Tree.locale.noDataSourceUrl);
			}

			// K.D. April 26, 2016 Bug #217440 Response data key is not correctly set on additional LOD requests
			dataSource = new $.ig.DataSource({
				dataSource: opt.dataSourceUrl + "&" +
					this._encodeUrlPath(path, key) + "&" + this._encodeBinding(binding) +
					"&depth=" + node.parent().attr("data-depth"), dataSourceType: "remoteUrl",
				responseDataKey: opt.responseDataKey
			});
			ul = node.children("ul");

			// Create loading indicator space
			li = $('<li style="width: 20px" data-role="loading">&nbsp;</li>').appendTo(ul);
			ul.show();

			// K.D. December 19th, 2011 Bug #98217 Adding flag pointing that the loading indicator is instantiated by the tree
			indicator = li.igLoading({ includeVerticalOffset: false }).data("igLoading").indicator();
			indicator.show();
			this._populatingNode = {
				ul: ul,
				node: node,
				indicator: indicator
			};
			dataSource.dataBind(this._populateNodeData, this);
		},
		_buildRequestString: function (node) {
			var nodePath, key = "", path = "", binding = this.options.bindings, i, result;

			nodePath = node.attr("data-path").split(this.options.pathSeparator);
			for (i = 0; i < nodePath.length; i++) {
				if (key.length > 0) {
					key += "/";
				}
				key += binding.childDataProperty;
				if (path.length > 0) {
					path += "/";
				}
				path += (binding.primaryKey ? binding.primaryKey + ":" : "") + nodePath[ i ];
				if (binding.bindings) {
					binding = binding.bindings;
				}
			}
			if (path.length <= 0) {
				result = null;
			} else {
				result = [ path, key ];
			}
			return result;
		},
		_encodeBinding: function (binding) {
			var temp = "binding=", item;

			for (item in binding) {
				if (binding.hasOwnProperty(item) && item !== "bindings" && item !== "nodeContentTemplate") {
					temp += item.toString() + ":" + binding[ item ] + ",";
				}
			}
			temp = temp.substr(0, temp.length - 1);
			return temp;
		},
		_encodeUrlPath: function (path, key) {
			var result;
			if (path.lastIndexOf("/") === -1) {
				path += "/@" + key;
				result = "path=" + path;
			} else {
				result = "path=" + path.substr(path.lastIndexOf("/") + 1, path.length) + "/@" +
					key.substr(key.lastIndexOf("/") + 1, key.length);
			}
			return result;
		},
		_updateParentState: function (parent) {
			var expander = parent.children("span[ data-role=expander ]");

			// Render expander image if this is the first add operation on a leaf node
			if (expander.length <= 0) {
				parent.removeClass(this.css.nodeNoChildren).addClass(this.css.parentNode);

				// K.D. September 24th, 2013 Bug #152109 Expanding the deleted items causes the tree to collapse
				$(this._renderExpanderImage(false)).prependTo(parent);
			} else if (parent.children("ul").children("li").length <= 0) { // Last child has been deleted
				parent.removeClass(this.css.parentNode).addClass(this.css.nodeNoChildren);
				parent.children("ul").remove();
				expander.remove();
			}
			this._updateImage(parent);
		},
		_updateParentCheckbox: function (parent) {
			var checkbox = parent.children("span[data-role=checkbox]"),
				checkIcon = checkbox.children("span"), checkState = checkbox.attr("data-chk"),
				shouldBe, checkCount = 0, css = this.css;
			parent.children("ul").children("li").each(function () {
				if ($(this).children("span[data-role=checkbox]").attr("data-chk") === "on") {
					checkCount++;
				}
			});
			if (checkCount === 0) {
				shouldBe = "off";
			} else if (checkCount === parent.children("ul").children("li").length) {
				shouldBe = "on";
			} else {
				shouldBe = "partial";
			}
			if (checkState !== shouldBe) {
				checkbox.attr("data-chk", shouldBe);
				switch (shouldBe) {
				case "off":
					checkIcon.removeClass(css.checkboxOn).removeClass(css.checkboxPartial)
						.addClass(css.checkboxOff);
					break;
				case "partial":
					checkIcon.removeClass(css.checkboxOn).removeClass(css.checkboxOff)
						.addClass(css.checkboxPartial);
					break;
				case "on":
					checkIcon.removeClass(css.checkboxPartial).removeClass(css.checkboxOff)
						.addClass(css.checkboxOn);
					break;
				default:
					checkIcon.removeClass(css.checkboxOn).removeClass(css.checkboxPartial)
						.addClass(css.checkboxOff);
				}
				parent = this.parentNode(parent);
				if (parent) {
					this._updateParentCheckbox(parent);
				}
			}
		},
		_updateImage: function (parent) {
			var hasChildren = parent.children("ul").children("li").length > 0, opt = this.options, img;
			if (!hasChildren) {
				if (opt.leafNodeImageUrl) {
					img = parent.children("img[data-role=parent-node-image]");
					if (img.length > 0) {
						img.attr({
							"title": opt.leafNodeImageTooltip !== null ? opt.leafNodeImageTooltip : "",
							"src": opt.leafNodeImageUrl,
							"data-role": "leaf-node-image"
						});
					}
				} else if (opt.leafNodeImageClass) {
					img = parent.children("span[data-role=parent-node-image]");
					if (img.length > 0) {
						img.attr({
							"title": opt.leafNodeImageTooltip !== null ? opt.leafNodeImageTooltip : "",
							"data-role": "leaf-node-image"
						});
						img.removeClass(opt.parentNodeImageClass).addClass(opt.leafNodeImageClass);
					}
				}
			} else {
				if (opt.parentNodeImageUrl) {
					img = parent.children("img[data-role=leaf-node-image]");
					if (img.length > 0) {
						img.attr({
							"title": opt.parentNodeImageTooltip !== null ? opt.parentNodeImageTooltip : "",
							"src": opt.parentNodeImageUrl,
							"data-role": "parent-node-image"
						});
					}
				} else if (opt.parentNodeImageClass) {
					img = parent.children("span[data-role=leaf-node-image]");
					if (img.length > 0) {
						img.attr({
							"title": opt.parentNodeImageTooltip !== null ? opt.parentNodeImageTooltip : "",
							"data-role": "parent-node-image"
						});
						img.removeClass(opt.leafNodeImageClass).addClass(opt.parentNodeImageClass);
					}
				}
			}
		},
		_addData: function (data, path, depth, dataIndex) {
			var originalData = this.nodeDataFor(path),
				binding = this._retrieveCurrentDepthBinding(depth),
				temp,
				i;
			if (!binding.hasOwnProperty("primaryKey")) {
				if (!originalData) {
					if (this.options.dataSource.root()._data.length <= this.element.
						find(".ui-igtree-noderoot").length ||
						this.element.find(".ui-igtree-noderoot").length <= 0) {
						if (dataIndex === 0) {
							if ($.type(data) === "array") {
								this.options.dataSource.root()._data = data.concat(this.options.dataSource.root()._data);
							} else {
								this.options.dataSource.root()._data = [ data ]
									.concat(this.options.dataSource.root()._data);
							}
						} else if (!dataIndex) {
							if ($.type(data) === "array") {
								for (i = 0; i < data.length; i++) {
									this.options.dataSource.root()._data.push(data[ i ]);
								}
							} else {
								this.options.dataSource.root()._data.push(data);
							}
						} else {
							this.options.dataSource.root()._data.splice(dataIndex, 0, data);
						}
					}
				} else {
					if (typeof originalData[ binding.childDataProperty ] !== "function") {

						// K.D. November 14th, 2014 Bug #185180 In some cases the child data prop is an empty object and it should be made an array.
						if (!originalData.hasOwnProperty(binding.childDataProperty) ||
							$.type(originalData[ binding.childDataProperty ]) !== "array") {
							originalData[ binding.childDataProperty ] = [];
						}
						if (dataIndex === 0) {
							if ($.type(data) === "array") {
								originalData[ binding.childDataProperty ] =
									data.concat(originalData[ binding.childDataProperty ]);
							} else {
								originalData[ binding.childDataProperty ] =
									[ data ].concat(originalData[ binding.childDataProperty ]);
							}
						} else if (!dataIndex) {
							originalData[ binding.childDataProperty ] =
								originalData[ binding.childDataProperty ].concat(data);
						} else {
							temp = originalData[ binding.childDataProperty ].slice(0, dataIndex);
							temp = temp.concat(data);
							originalData[ binding.childDataProperty ] =
								temp.concat(originalData[ binding.childDataProperty ]
								.slice(dataIndex));
						}
					} else {
						if (originalData[ binding.childDataProperty ]().length <=
							this.nodeByPath(path).children("ul").children("li").length) {
							if (dataIndex === 0) {
								temp = $("<li></li>").appendTo(this.nodeByPath(path).children("ul"));
								originalData[ binding.childDataProperty ].unshift(data);
								temp.remove();
							} else if (!dataIndex) {
								temp = $("<li></li>").appendTo(this.nodeByPath(path).children("ul"));
								originalData[ binding.childDataProperty ].push(data);
								temp.remove();
							} else {
								temp = $("<li></li>").appendTo(this.nodeByPath(path).children("ul"));
								originalData[ binding.childDataProperty ]().splice(dataIndex, 0, data);
								temp.remove();
							}
						}
					}
				}
			} else {
				if (!originalData) {
					if (this.options.dataSource.root()._data.length <=
						this.element.find(".ui-igtree-noderoot").length ||
						this.element.find(".ui-igtree-noderoot").length <= 0) {
						if ($.type(data) === "array") {
							for (i = 0; i < data.length; i++) {
								this.options.dataSource.root()._data.push(data[ i ]);
							}
						} else {
							this.options.dataSource.root()._data.push(data);
						}
					}
				} else {
					if (typeof originalData[ binding.childDataProperty ] !== "function") {

						// K.D. November 14th, 2014 Bug #185180 In some cases the child data prop is an empty object and it should be made an array.
						if (!originalData.hasOwnProperty(binding.childDataProperty) ||
							$.type(originalData[ binding.childDataProperty ]) !== "array") {
							originalData[ binding.childDataProperty ] = [];
						}
						originalData[ binding.childDataProperty ] =
							originalData[ binding.childDataProperty ].concat(data);
					} else {
						if (originalData[ binding.childDataProperty ]().length <=
							this.nodeByPath(path).children("ul").children("li").length) {
							temp = $("<li></li>").appendTo(this.nodeByPath(path).children("ul"));
							originalData[ binding.childDataProperty ].push(data);
							temp.remove();
						}
					}
				}
			}
		},
		_removeData: function (path) {
			var splitPath = path.split(this.options.pathSeparator),
				data = this.options.dataSource.root().data(), i, j,
				binding = this.options.bindings, key;

			if (splitPath.length === 1) {
				if (!binding.hasOwnProperty("primaryKey")) {
					data.splice(parseInt(splitPath[ 0 ], 10), 1);
				} else {
					for (j = 0; j < data.length; j++) {
						if (data[ j ].hasOwnProperty(binding.primaryKey)) {
							key = typeof data[ j ][ binding.primaryKey ] === "function" ?
								data[ j ][ binding.primaryKey ]() :
								data[ j ][ binding.primaryKey ];
							if (key.toString() === splitPath[ 0 ].toString()) {
								data.splice(j, 1);
								break;
							}
						}
					}
				}
				return;
			}
			for (i = 0; i < splitPath.length - 1; i++) {
				if (!binding.hasOwnProperty("primaryKey")) {
					data = data[ parseInt(splitPath[ i ], 10) ];
				} else {
					for (j = 0; j < data.length; j++) {
						if (data[ j ].hasOwnProperty(binding.primaryKey)) {
							key = typeof data[ j ][ binding.primaryKey ] === "function" ?
								data[ j ][ binding.primaryKey ]() :
								data[ j ][ binding.primaryKey ];
							if (key.toString() === splitPath[ i ].toString()) {
								data = data[ j ];
								break;
							}
						}
					}
				}
				if (i < splitPath.length - 2) {
					if (data[ binding.childDataProperty ] &&
						typeof data[ binding.childDataProperty ] === "function") {
						data = data[ binding.childDataProperty ]();
					} else {
						data = data[ binding.childDataProperty ];
					}
				}
				if (binding.hasOwnProperty("bindings") && i < splitPath.length - 2) {
					binding = binding.bindings;
				}
			}
			if (data[ binding.childDataProperty ] &&
				typeof data[ binding.childDataProperty ] !== "function") {
				if (data[ binding.childDataProperty ] &&
					data[ binding.childDataProperty ].length <= 1) {
					delete data[ binding.childDataProperty ];
				} else {
					data = data[ binding.childDataProperty ];
					if (binding.hasOwnProperty("bindings")) {
						binding = binding.bindings;
					}
					if (!binding.hasOwnProperty("primaryKey") && data.length) {
						data.splice(parseInt(splitPath[ splitPath.length - 1 ], 10), 1);
					} else {
						for (j = 0; j < data.length; j++) {
							if (data[ j ].hasOwnProperty(binding.primaryKey) &&
								data[ j ][ binding.primaryKey ].toString() ===
								splitPath[ i ].toString()) {
								data.splice(j, 1);
								break;
							}
						}
					}
				}
			} else {
				data = data[ binding.childDataProperty ]();
				if (binding.hasOwnProperty("bindings")) {
					binding = binding.bindings;
				}
				if (!binding.hasOwnProperty("primaryKey") && data.length) {
					data.splice(parseInt(splitPath[ splitPath.length - 1 ], 10), 1);
				} else {
					for (j = 0; j < data.length; j++) {
						if (data[ j ].hasOwnProperty(binding.primaryKey)) {
							key = typeof data[ j ][ binding.primaryKey ] === "function" ?
								data[ j ][ binding.primaryKey ]() :
								data[ j ][ binding.primaryKey ];
							if (key.toString() === splitPath[ splitPath.length - 1 ].toString()) {
								data.splice(j, 1);
								break;
							}
						}
					}
				}
			}
		},
		_recalculatePaths: function (path) {
			var splitPath = path.split(this.options.pathSeparator), index = path.length > 0 ?
				splitPath[ splitPath.length - 1 ] : 0, node, parentPath, newPath, ul, child;
			if (splitPath.length > 1) {
				splitPath.splice(splitPath.length - 1, 1);
				parentPath = splitPath.join(this.options.pathSeparator);
				node = this.nodeByPath(parentPath);
				for (index; index < node.children("ul").children("li").length; index++) {
					newPath = parentPath + this.options.pathSeparator + index;
					child = $(node.children("ul").children("li")[ index ]);
					child.attr("data-path", newPath);
					if (child.children("ul").length > 0 && child.children("ul").children("li").length > 0) {
						this._recalculatePaths(newPath + this.options.pathSeparator + "0");
					}
				}
			} else {
				ul = this.element.is("ul") ? this.element : this.element.children("ul");
				for (index; index < ul.children("li").length; index++) {
					child = $(ul.children("li")[ index ]);
					child.attr("data-path", index);
					if (child.children("ul").length > 0 && child.children("ul").children("li").length > 0) {
						this._recalculatePaths(index + this.options.pathSeparator + "0");
					}
				}
			}
		},

		// K.D. November 22nd, 2012 Implementing a request chain for expandToNode with Load on Demand
		_loadQueue: null,
		_toSelect: false,
		_triggerChainRequest: function (path, toSelect) {
			var list = path.split(this.options.pathSeparator), i, newPath = "";
			if (this._loadQueue === null) {
				this._loadQueue = [];
			}
			if (toSelect) {
				this._toSelect = true;
			}
			for (i = 0; i < list.length; i++) {
				newPath += list[ i ];
				this._loadQueue.push(newPath);
				newPath += this.options.pathSeparator;
			}
			this._loadRequest();
		},
		_loadRequest: function () {
			var node;
			if (this._populatingNode === null) {
				if (this._loadQueue && this._loadQueue.length > 0) {
					node = this.nodeByPath(this._loadQueue.shift());
					if (this._loadQueue.length > 0) {
						if (!this.isExpanded(node)) {
							this.toggle(node);
						} else {
							this._loadRequest();
						}
					} else if (this._toSelect) {
						this.select(node);
						this._toSelect = false;
					}
				}
			}
		},
		_replaceUIValue: function (node, data, item) {
			var element = node.element, binding = this._retrieveCurrentDepthBinding(parseInt(element
				.parent().attr("data-depth"), 10)), value, isFocused, anchor;

			// K.D. August 15th, 2013 Bug #149367 The member does not necessarily need to be observable
			switch (item) {
				case binding.textKey:

				// K.D. June 25th, 2014 Bug #173722 Adding handling for templates
				if (!binding.nodeContentTemplate) {
					value = typeof data[ item ] === "function" ? data[ item ]() : data[ item ];
					element.children("a").text(value);
				} else {

					// K.D. August 4th, 2015 Bug #203489 When nodeContentTemplate is defined, a node at the current level loses selected and focused state after
					// changes have been applied to it.
					anchor = element.children("a");
					if (anchor.hasClass(this.css.nodeActive)) {
						isFocused = true;
					}
					anchor.replaceWith(this._renderNodeTemplate(data, binding));
					if (this.isSelected(element)) {
						element.children("a").addClass(this.css.nodeSelected);
						this._selectedNode[ 0 ] = this.nodeFromElement(element);
					}
					if (isFocused) {
						element.children("a").focus();
					}
				}
				break;
			case binding.valueKey:
				value = typeof data[ item ] === "function" ? data[ item ]() : data[ item ];
				element.attr("data-value", value);
				break;
			case binding.navigateUrlKey:
				value = typeof data[ item ] === "function" ? data[ item ]() : data[ item ];
				element.children("a").attr("href", value);
				break;
			case binding.imageUrlKey:
				value = typeof data[ item ] === "function" ? data[ item ]() : data[ item ];
				element.children("img[data-role=node-image]").attr("src", value);
				break;
			}
		},
		dataBind: function () {
			/* Performs databinding on the igTree.
			```
				$(".selector").igTree("dataBind");
			```
			*/

			// K.D. December 9th, 2014 Bug #186240 Moving the databinding event before the data options are created.
			this._triggerDataBinding();
			var dataOpt = this._initDataOptions();
			this._initDataSource(dataOpt);
			this.options.dataSource.dataBind(this._constructFromData, this);
		},
		toggleCheckstate: function (node, event) {
			/* Toggles the checkstate of a node if checkboxMode is not set to off, otherwise does nothing.
			```
				$(".selector").igTree("toggleCheckstate", targetNode);
			```
				paramType="object" optional="false" Specifies the node element the checkbox of which would be toggled.
				paramType="object" optional="true" Indicates the browser event which triggered this action, if this is not an API call.
			*/
			var self = this, opt = self.options, css = self.css, childCheckboxes, childCheckIcons,
				checkbox, checkIcon, parentLi, noCancel;

			// K.D. November 28th, 2011 Bug #96672 Checking if no argument is provided when doing the API call
			if (!node) {
				throw new Error($.ig.Tree.locale.incorrectNodeObject);
			}
			if (!opt.checkboxMode || opt.checkboxMode.toLowerCase() === "off") {
				return;
			}

			checkbox = node.children("span[data-role=checkbox]");
			checkIcon = checkbox.children("span");
			noCancel = self._triggerNodeCheckstateChanging(event, node);
			if (noCancel) {
				if (opt.checkboxMode.toLowerCase() === "tristate") {
					if (checkbox.attr("data-chk") === "on" || checkbox.attr("data-chk") === "partial") {
						childCheckboxes = node.find("span[data-role=checkbox]");
						childCheckIcons = childCheckboxes.children("span");
						checkbox.attr("data-chk", "off");
						checkIcon.removeClass(css.checkboxOn).removeClass(css.checkboxPartial)
							.addClass(css.checkboxOff);
						childCheckboxes.attr("data-chk", "off");
						childCheckIcons.removeClass(css.checkboxOn).removeClass(css.checkboxPartial)
							.addClass(css.checkboxOff);

						parentLi = checkbox.parent().parent().parent();
						while (parentLi && parentLi.is("li")) {

							// All child checkboxes are unchecked
							if (parentLi.find("ul > li > span[data-chk=on]").length <= 0) {
								checkbox = parentLi.children("span[data-role=checkbox]");
								checkIcon = checkbox.children("span");
								checkbox.attr("data-chk", "off");
								checkIcon.removeClass(css.checkboxOn).removeClass(css.checkboxPartial)
									.addClass(css.checkboxOff);
								parentLi = this.parentNode(parentLi);
							} else {
								checkbox = parentLi.children("span[data-role=checkbox]");
								checkIcon = checkbox.children("span");
								checkbox.attr("data-chk", "partial");
								checkIcon.removeClass(css.checkboxOn).removeClass(css.checkboxOff)
									.addClass(css.checkboxPartial);
								parentLi = this.parentNode(parentLi);
							}
						}
					} else {
						childCheckboxes = node.find("span[data-role=checkbox]");
						childCheckIcons = childCheckboxes.children("span");
						checkbox.attr("data-chk", "on");
						checkIcon.removeClass(css.checkboxOff).removeClass(css.checkboxPartial)
							.addClass(css.checkboxOn);
						childCheckboxes.attr("data-chk", "on");
						childCheckIcons.removeClass(css.checkboxOff).removeClass(css.checkboxPartial)
							.addClass(css.checkboxOn);

						parentLi = checkbox.parent().parent().parent();
						while (parentLi && parentLi.is("li")) {

							// All childcheckboxes are checked
							if (parentLi.find("ul > li > span[data-chk=on]").length ===
									parentLi.find("ul > li").length) {
								checkbox = parentLi.children("span[data-role=checkbox]");
								checkIcon = checkbox.children("span");
								checkbox.attr("data-chk", "on");
								checkIcon.removeClass(css.checkboxOff).removeClass(css.checkboxPartial)
									.addClass(css.checkboxOn);
								parentLi = this.parentNode(parentLi);
							} else {
								checkbox = parentLi.children("span[data-role=checkbox]");
								checkIcon = checkbox.children("span");
								checkbox.attr("data-chk", "partial");
								checkIcon.removeClass(css.checkboxOn).removeClass(css.checkboxOff)
									.addClass(css.checkboxPartial);
								parentLi = this.parentNode(parentLi);
							}
						}
					}
				} else {
					if (checkbox.attr("data-chk") === "on" || checkbox.attr("data-chk") === "partial") {
						checkbox.attr("data-chk", "off");
						checkIcon.removeClass(css.checkboxOn).removeClass(css.checkboxPartial)
							.addClass(css.checkboxOff);
					} else {
						checkbox.attr("data-chk", "on");
						checkIcon.removeClass(css.checkboxOff).addClass(css.checkboxOn);
					}
				}
				self._triggerNodeCheckstateChanged(event, node);
			}
		},
		toggle: function (node, event) {
			/* Toggles the collapse/expand state for the specified node.
			```
				$(".selector").igTree("toggle", targetNode);
			```
				paramType="object" optional="false" Specifies the node element the checkbox of which would be toggled.
				paramType="object" optional="true" Indicates the browser event which triggered this action, if this is not an API call.
			*/
			var self = this, opt = self.options, css = self.css, noCancel, sibling,
				siblingExpander, i = 0, expander;

			// K.D. November 28th, 2011 Bug #96672 Checking if no argument is provided when doing the API call
			if (!node) {
				throw new Error($.ig.Tree.locale.incorrectNodeObject);
			}
			if (!event) {
				expander = node.children("." + css.nodeExpander);
			} else {
				expander = $(event.target).closest("span[data-role=expander]");
			}

			if (node.children("ul").attr("data-populated") &&
				node.children("ul").attr("data-populated") === "false") {
				this._prepareRequest(node, event);
				return;
			}

			if (expander.attr("data-exp") && expander.attr("data-exp") !== "false") {
				noCancel = self._triggerNodeCollapsing(event, node);

				if (noCancel) {
					$(node).children("ul").hide(opt.animationDuration, function () {
						self._triggerNodeCollapsed(event, node);
					});
					expander.removeClass(css.collapseIcon).addClass(css.expandIcon).attr("data-exp", false);
				}
			} else {
				noCancel = self._triggerNodeExpanding(event, node);

				if (noCancel) {

					// Performing collapse on the same level if single expand is enabled
					if (opt.singleBranchExpand) {
						sibling = node.siblings();

						for (i; i < sibling.length; i++) {
							siblingExpander = $(sibling[ i ]).children("." + css.nodeExpander);
							if (siblingExpander.length > 0 && (siblingExpander.attr("data-exp") === "true" ||
								siblingExpander.attr("data-exp") === true)) {
								noCancel = self._triggerNodeCollapsing(event, $(sibling[ i ]));

								if (noCancel) {
									$(sibling[ i ]).children("ul").hide(opt.animationDuration,
										$.proxy(this._triggerNodeCollapsed(event,
											$(sibling[ i ])), this));
									siblingExpander.removeClass(css.collapseIcon).addClass(css.expandIcon)
										.attr("data-exp", false);
								}
							}
						}
					}

					node.children("ul").show(opt.animationDuration, function () {
						self._triggerNodeExpanded(event, node);
					});
					expander.removeClass(css.expandIcon).addClass(css.collapseIcon).attr("data-exp", true);
				}
			}
		},
		expandToNode: function (node, toSelect) {
			/* Expands the tree down to the specified node and selects the node if specified.
			```
				$(".selector").igTree("expandToNode", targetNode);
			```
				paramType="object" optional="false" Specifies the node element down to which the tree would be expanded.
				paramType="bool" optional="true" Specifies the whether to select the node after expanding to it.
			*/
			var parentNode, cachedanimationDuration;

			// K.D. November 28th, 2011 Bug #96672 Checking if no argument is provided when doing the API call
			if (node && node.length > 0) {
				if (typeof node === "string" && this.nodeByPath(node).length > 0) {
					node = this.nodeByPath(node);
				}
				if (typeof node === "string" && this.options.loadOnDemand) {
					this._triggerChainRequest(node, toSelect);
					return;
				}
				if (toSelect) {
					this.select(node);
				}
				parentNode = this.parentNode(node);
				cachedanimationDuration = this.options.animationDuration;
				this.options.animationDuration = 0;
				while (parentNode) {
					if (!this.isExpanded(parentNode)) {
						this.toggle(parentNode);
					}
					parentNode = this.parentNode(parentNode);
				}
				this.options.animationDuration = cachedanimationDuration;
			}
		},
		expand: function (node) {
			/* Expands the specified node.
			```
				$(".selector").igTree("expand", targetNode);
			```
				paramType="object" optional="false" Specifies the node element to expand.
			*/
			var self = this, opt = self.options, css = self.css, sibling, siblingExpander, i = 0, expander;

			// K.D. November 28th, 2011 Bug #96672 Checking if no argument is provided when doing the API call
			if (!node || node.length <= 0) {
				throw new Error($.ig.Tree.locale.incorrectNodeObject);
			}

			if (node.children("ul").attr("data-populated") &&
					node.children("ul").attr("data-populated") === "false") {
				this._prepareRequest(node);
				return;
			}

			expander = node.children("." + css.nodeExpander);

			if (!expander.attr("data-exp") || expander.attr("data-exp") === "false") {

				// Performing collapse on the same level if single expand is enabled
				if (opt.singleBranchExpand) {
					sibling = node.siblings();

					for (i; i < sibling.length; i++) {
						siblingExpander = $(sibling[ i ]).children("." + css.nodeExpander);
						if (siblingExpander.length > 0 && (siblingExpander.attr("data-exp") === "true" ||
							siblingExpander.attr("data-exp") === true)) {
							$(sibling[ i ]).children("ul").hide(opt.animationDuration);
							siblingExpander.removeClass(css.collapseIcon).addClass(css.expandIcon)
								.attr("data-exp", false);
						}
					}
				}

				node.children("ul").show(opt.animationDuration);
				expander.removeClass(css.expandIcon).addClass(css.collapseIcon).attr("data-exp", true);
			}
		},
		collapse: function (node) {
			/* Collapses the specified node.
			```
				$(".selector").igTree("collapse", targetNode);
			```
				paramType="object" optional="false" Specifies the node element to collapse.
			*/
			var self = this, opt = self.options, css = self.css, expander;

			// K.D. November 28th, 2011 Bug #96672 Checking if no argument is provided when doing the API call
			if (!node || node.length <= 0) {
				throw new Error($.ig.Tree.locale.incorrectNodeObject);
			}
			expander = node.children("." + css.nodeExpander);

			if (expander.attr("data-exp") && expander.attr("data-exp") !== "false") {
				$(node).children("ul").hide(opt.animationDuration);
				expander.removeClass(css.collapseIcon).addClass(css.expandIcon).attr("data-exp", false);
			}
		},
		parentNode: function (node) {
			/* Retrieves the parent node element of the specified node element.
			```
				var parentNode = $(".selector").igTree("parentNode", targetNode);
			```
				paramType="object" optional="false" Specifies the jQuery selected node element to collapse.
				returnType="object" Returns the parent node element, null if the node provided as parameter is a root level node.
			*/
			if (!node) {
				throw new Error($.ig.Tree.locale.incorrectNodeObject);
			}
			var parent = node.parent().closest("li[data-role=node]");
			return parent.length > 0 ? parent : null;
		},
		nodeByPath: function (nodePath) {
			/* Retrieves the jQuery element of the node with the specified path.
			```
				// Retrieves the 1st child of the 2nd node at root level
				var nodes = $(".selector").igTree("nodeByPath", "1_0");
			```
				paramType="string" optional="false" Specifies the path to the required node.
				returnType="object" Returns the jQuery selected node element with the specified path. The length property would be 0 if node isn't found.
			*/
			return this.element.find('li[data-path="' + nodePath + '"]');
		},
		nodesByValue: function (value) {
			/* Retrieves the jQuery element of the node with the specified value.
			```
				var nodes = $(".selector").igTree("nodesByValue", "NY");
			```
				paramType="string" optional="false" Specifies the value of the required node.
				returnType="object" Returns the jQuery object of the node element with the specified value. The length property would be 0 if node isn't found.
			*/
			return this.element.find('li[data-value="' + value + '"]');
		},
		checkedNodes: function () {
			/* Retrieves all the node objects for the nodes that have their checkboxes checked.
			```
				var nodes = $(".selector").igTree("checkedNodes");
			```
				returnType="array" Returns an array of node objects for all the checked nodes.
			*/
			var elements = this.element.find("span[data-chk=on]").parent(), i = 0, collection = [];
			if (elements.length > 0) {
				for (i; i < elements.length; i++) {
					collection.push(this.nodeFromElement($(elements[ i ])));
				}
			}
			return collection;
		},
		uncheckedNodes: function () {
			/* Retrieves all the node objects for the nodes that have their checkboxes unchecked.
			```
				var nodes = $(".selector").igTree("uncheckedNodes");
			```
				returnType="array" Returns an array of node objects for all the unchecked nodes.
			*/
			var elements = this.element.find("span[data-chk=off]").parent(), i = 0, collection = [];
			if (elements.length > 0) {
				for (i; i < elements.length; i++) {
					collection.push(this.nodeFromElement($(elements[ i ])));
				}
			}
			return collection;
		},
		partiallyCheckedNodes: function () {
			/* Retrieves all the node objects for the nodes that have their checkboxes partially checked.
			```
				var nodes = $(".selector").igTree("partiallyCheckedNodes");
			```
				returnType="array" Returns an array of node objects of all the partially checked nodes.
			*/
			var elements = this.element.find("span[data-chk=partial]").parent(), i = 0, collection = [];
			if (elements.length > 0) {
				for (i; i < elements.length; i++) {
					collection.push(this.nodeFromElement($(elements[ i ])));
				}
			}
			return collection;
		},
		select: function (node, event) {
			/* Selects a node.
			```
				$(".selector").igTree("select", targetNode);
			```
				paramType="object" optional="false" Specifies the node element to be selected.
				paramType="object" optional="true" Indicates the browser event which triggered this action, if this is not an API call.
			*/

			// K.D. November 28th, 2011 Bug #96672 Checking if no argument is provided when doing the API call
			if (!node || node.length <= 0) {
				throw new Error($.ig.Tree.locale.incorrectNodeObject);
			}
			var css = this.css, nodeId = node.attr("data-path"), noCancel, prevent = false;

			if (event && (node.children("a").attr("href") === "#" ||
				node.children("a").attr("href") === document.URLUnencoded + "#")) {
				prevent = true;
			}

			if (!this._selectedNode) {
				this._selectedNode = [{ path: null, element: null, data: null, binding: null }];
			}

			// To do: Implement multiple selection logic
			if (this._selectedNode[ 0 ].path !== null) {
				if (this._selectedNode[ 0 ].path !== nodeId) {
					noCancel = this._triggerSelectionChanging(event, node);

					if (noCancel) {
						this._selectedNode[ 0 ].element.children("a").removeClass(css.nodeSelected);
						node.children("a").addClass(css.nodeSelected);
						this._selectedNode[ 0 ] = this.nodeFromElement(node);
						this._triggerSelectionChanged(event);
					} else if (event) {
						prevent = true;
					}
				}
			} else {
				noCancel = this._triggerSelectionChanging(event, node);

				if (noCancel) {
					node.children("a").addClass(css.nodeSelected);
					this._selectedNode[ 0 ] = this.nodeFromElement(node);
					this._triggerSelectionChanged(event);
				} else if (event) {
					prevent = true;
				}
			}

			if (prevent) {
				event.preventDefault();
			}
		},
		deselect: function (node) {
			/* Deselects the specified node.
			```
				$(".selector").igTree("deselect", targetNode);
			```
				paramType="object" optional="false" Specifies the node element to be deselected.
			*/

			// K.D. November 28th, 2011 Bug #96672 Checking if no argument is provided when doing the API call
			if (!node) {
				throw new Error($.ig.Tree.locale.incorrectNodeObject);
			}
			var css = this.css, nodeId = node.attr("data-path");

			if (!this._selectedNode) {
				this._selectedNode = [{ path: null, element: null, data: null, binding: null }];
			}

			if (this._selectedNode[ 0 ].path !== null) {
				if (this._selectedNode[ 0 ].path === nodeId) {
					node.children("a").removeClass(css.nodeSelected);
					this._selectedNode[ 0 ].path = null;
					this._selectedNode[ 0 ].element = null;
					this._selectedNode[ 0 ].data = null;
					this._selectedNode[ 0 ].binding = null;
				}
			}
		},
		clearSelection: function () {
			/* Deselects all the selected nodes.
			```
				$(".selector").igTree("clearSelection");
			```
			*/
			var css = this.css, i = 0;

			// K.D. August 16th, 2013 Bug #149419 Clearing selection before selecting anything results in an exception
			if (this._selectedNode && this._selectedNode[ 0 ].path !== null) {
				for (i; i < this._selectedNode.length; i++) {
					this._selectedNode[ i ].element.children("a").removeClass(css.nodeSelected);
				}
				this._selectedNode = [{
					path: null,
					element: null,
					data: null,
					binding: null
				}];
			}
		},
		selectedNode: function () {
			/* Retrieves the node object for the selected node.
			```
				var node = $(".selector").igTree("selectedNode");
			```
				returnType="object" Node Object description: { path: "node_path", element: jQuery LI Element, data: data, binding: binding }
			*/
			if (!this._selectedNode) {
				this._selectedNode = [{ path: null, element: null, data: null, binding: null }];
			}
			return this._selectedNode[ 0 ];
		},
		findNodesByText: function (text, parent) {
			/* Retrieves all node objects with the specified text (case sensitive).
			```
				var nodes = $(".selector").igTree("findNodesByText", "ice cream", targetNode);
			```
				paramType="string" optional="false" The text to search for.
				paramType="object" optional="true" The node element to start the search from. If not specified then search would start from the root of the tree.
				returnType="array" Node Object description: { path: "node_path", element: jQuery LI Element, data: data, binding: binding }
			*/
			var collection = [], nodes, self = this;
			nodes = parent ? parent.find('li > a:contains("' + text + '")') :
				this.element.find('li > a:contains("' + text + '")');
			nodes.each(function () {
				collection.push(self.nodeFromElement($(this).closest("li[data-role=node]")));
			});

			return collection;
		},
		findImmediateNodesByText: function (text, parent) {
			/* Retrieves all node objects for the immediate children of the specified parent with the specified text (case sensitive).
			```
				var nodes = $(".selector").igTree("findImmediateNodesByText", "ice cream", targetNode);
			```
				paramType="string" optional="false" The text to search for.
				paramType="object" optional="true" The node element the children of which would be searched.
				returnType="array" Node Object description: { path: "node_path", element: jQuery LI Element, data: data, binding: binding }
			*/
			var collection = [], nodes, self = this;
			nodes = parent ? parent.children("ul").children("li").children('a:contains("' + text + '")') :
				this.element.is("ul") ? this.element.children("li").children('a:contains("' + text + '")') :
					this.element.children("ul").children("li").children('a:contains("' + text + '")');
			nodes.each(function () {
				collection.push(self.nodeFromElement($(this).closest("li[data-role=node]")));
			});

			return collection;
		},
		nodeByIndex: function (index, parent) {
			/* Retrieves the n-th jQuery node element child of the specified parent.
			```
				var node = $(".selector").igTree("nodeByIndex", 10);
			```
				paramType="number" optional="false" Specifies the index the node at which to be retrieved.
				paremType="object" optional="true" The parent node element to start the search from.
				returnType="object" The node element at the specified index.
			*/
			var node;
			if (!parent) {
				if (this.element.is("ul")) {
					node = this.element.children().eq(index);
				} else {
					node = this.element.children("ul").children().eq(index);
				}
			} else {
				node = parent.children("ul").children().eq(index);
			}
			return node;
		},
		nodeFromElement: function (element) {
			/* Retrieves a node object for the specified node element.
			```
				var nodes = $(".selector").igTree("nodeFromElement", element);
			```
				paramType="object" optional="false" Specifies the node element.
				returnType="object" Node Object description: { path: "node_path", element: jQuery LI Element, data: data, binding: binding }
			*/
			if (element.length > 0) {
				var nodeElement = {
					path: element.attr("data-path"),
					element: element,
					data: this.nodeDataFor(element.attr("data-path")),
					binding: this._retrieveCurrentDepthBinding(element.parent().attr("data-depth"))
				};
				return nodeElement;
			}
		},
		children: function (parent) {
			/* Retrieves a node object collection of the immediate children of the provided node element.
			```
				var nodes = $(".selector").igTree("children", parentNode);
			```
				paramType="object" optional="false" Specifies the node element.
				returnType="array" Node Object description: { path: "node_path", element: jQuery LI Element, data: data, binding: binding }
			*/
			var children = [], self = this, child, ul;
			if (parent && parent.length > 0) {
				ul = parent.children("ul");
				if (ul.length > 0) {
					ul.children("li").each(function () {
						child = $(this);
						children.push(self.nodeFromElement(child));
					});
				}
				return children;
			}
			throw new Error($.ig.Tree.locale.incorrectNodeObject);
		},
		childrenByPath: function (path) {
			/* Retrieves a node object collection of the immediate children of the node with the provided path.
			```
				// Retrieves child nodes of the 1st child of the 2nd node at root level
				var nodes = $(".selector").igTree("childrenByPath", "1_0");
			```
				paramType="string" optional="false" Specifies the path of the node the children of which are to be retrieved.
				returnType="array" Node Object description: { path: "node_path", element: jQuery LI Element, data: data, binding: binding }
			*/
			var node = this.nodeByPath(path), children = [], self = this, child, ul;
			if (node.length > 0) {
				ul = node.children("ul");
				if (ul.length > 0) {
					ul.children("li").each(function () {
						child = $(this);
						children.push(self.nodeFromElement(child));
					});
				}
				return children;
			}
			throw new Error($.ig.Tree.locale.incorrectPath + path);
		},
		isSelected: function (node) {
			/* Returns true if the provided node element is selected and false otherwise.
			```
				var isSelected = $(".selector").igTree("isSelected", targetNode);
			```
				paramType="object" optional="false" Specifies the node element.
				returnType="bool" True if the node is selected, false otherwise.
			*/
			if (!this._selectedNode) {
				this._selectedNode = [{ path: null, element: null, data: null, binding: null }];
			}
			if (node && node.length > 0) {
				return this._selectedNode[ 0 ].path === node.attr("data-path");
			}
			throw new Error($.ig.Tree.locale.incorrectNodeObject);
		},
		isExpanded: function (node) {
			/* Returns true if the provided node element is expanded and false otherwise.
			```
				var isExpanded = $(".selector").igTree("isExpanded", targetNode);
			```
				paramType="object" optional="false" Specifies the node element.
				returnType="bool" True if the node is selected, false otherwise.
			*/
			if (node && node.length > 0) {
				var expander = node.children("span[data-role=expander]");
				if (expander.length > 0) {
					return expander.attr("data-exp") === "true";
				}
			} else {
				throw new Error($.ig.Tree.locale.incorrectNodeObject);
			}
		},
		isChecked: function (node) {
			/* Returns true if the provided node element has its checkbox checkstate checked and false otherwise.
			```
				var isChecked = $(".selector").igTree("isChecked", targetNode);
			```
				paramType="object" optional="false" Specifies the node element.
				returnType="bool" True if the node is checked, false otherwise.
			*/
			if (node && node.length > 0) {
				var checkbox = node.children("span[data-role=checkbox]");
				if (checkbox.length > 0) {
					return checkbox.attr("data-chk") === "on";
				}
			} else {
				throw new Error($.ig.Tree.locale.incorrectNodeObject);
			}
		},
		checkState: function (node) {
			/* Returns the specified node checkstate.
			```
				var checkedState = $(".selector").igTree("checkState", targetNode);
			```
				paramType="object" optional="false" Specifies the node element.
				returnType="string" The checkbox state of the node. "on" if checked, "partial" if partially checked, "off" if unchecked.
			*/
			if (node && node.length > 0) {
				var checkbox = node.children("span[data-role=checkbox]");
				if (checkbox.length > 0) {
					return checkbox.attr("data-chk");
				}
			} else {
				throw new Error($.ig.Tree.locale.incorrectNodeObject);
			}
		},
		addNode: function (node, parent, nodeIndex) {
			/* Adds a new array of nodes to the tree. New nodes are appended to the root or to a specified parent node, at a specified index.
			```
				$(".selector").igTree("addNode", {Text: "New Node"}, parentNode);
			```
				paramType="object|array" optional="false" Specifies the data used to create the new nodeс.
				paramType="object" optional="true" Specifies the element of the parent node the nodes are to be appended to.
				paramType="number" optional="true" Specifies the index at which the nodes to be inserted.
			*/

			// No data is being passed in
			// K.D. July 24th, 2012 Bug #117457 addNode creates an expansion indicator if the node param is an empty array []
			if (!nodeIndex && typeof parent === "number") {
				nodeIndex = parent;
				parent = null;
			}
			if (!node || node.length <= 0) {
				if (parent && parent.length > 0) {
					this._updateParentState(parent);
				}
				return;
			}
			var ul, path, checked, isLi, li, isEmpty, r, binding;

			// Root node is to be used
			if (!parent) {
				parent = this.element.is("ul") ? this.element : this.element.children("ul");

				// No children case
				if (parent.children().length <= 0) {
					this._addData(node, "", 0);
					this._triggerRendering(node);
					r = $(this._initChildrenRecursively("", node)).appendTo(parent);
					if (this.options.dragAndDrop) {
						this._initDragAndDrop(r);
					}
					this._triggerRendered();

					// Update transaction log
					this.options.dataSource.root().addNode({
						data: node,
						parentPath: "",
						path: r.attr("data-path")
					});
					return;
				}
			}

			isLi = parent.is("li");
			ul = isLi ? parent.children("ul") : parent;
			if (ul.length <= 0) {
				ul = $("<ul data-depth='" + (parseInt(parent.parent().attr("data-depth"), 10) + 1) +
					"' style='display: none'></ul>").appendTo(parent);
			}
			path = isLi ? parent.attr("data-path") : "";
			binding = this._retrieveCurrentDepthBinding(parseInt(ul.attr("data-depth"), 10));
			if (this.options.checkboxMode.toLowerCase() === "tristate") {
				checked = isLi ? this.isChecked(parent) : false;
			}

			// K.D. July 3rd, 2012 Bug #116064 We need the parent UL depth not the current UL. This would be at least 0 because the root insert is
			// handled up top.
			this._addData(node, path, parseInt(ul.attr("data-depth"), 10) - 1, nodeIndex);
			this._triggerRendering(node);
			isEmpty = ul.children("li").length <= 0;
			if (nodeIndex === 0) {
				li = $(this._initChildrenRecursively(path, node, parseInt(ul.attr("data-depth"), 10),
						checked, ul.children("li").length)).prependTo(ul);
				if (!binding.hasOwnProperty("primaryKey")) {
					this._recalculatePaths(path);
				}
			} else if (!nodeIndex) {
				li = $(this._initChildrenRecursively(path, node, parseInt(ul.attr("data-depth"), 10),
						checked, ul.children("li").length)).appendTo(ul);
			} else {
				li = $(this._initChildrenRecursively(path, node, parseInt(ul.attr("data-depth"), 10),
						checked, ul.children("li").length))
						.insertBefore(ul.children("li:eq(" + nodeIndex + ")"));
				if (!binding.hasOwnProperty("primaryKey")) {
					this._recalculatePaths(path);
				}
			}
			if (isLi && isEmpty) {
				this._updateParentState(parent);
			}
			if (this.options.dragAndDrop) {
				this._initDragAndDrop(li);
			}

			// K.D. August 16th, 2013 Bug #149438 Switching to delegated events
			this._triggerRendered();

			// Update transaction log
			r = [];
			li.each(function () {
				r.push($(this).attr("data-path"));
			});
			this.options.dataSource.root().addNode({
				data: node,
				parentPath: path,
				path: r
			});
			this._trigger("nodeAdded", null,
				{ owner: this, element: li, data: node, index: nodeIndex, binding: binding });
		},
		removeAt: function (path) {
			/* Removes the node with with the specified path and all of its children.
			```
				$(".selector").igTree("removeAt", "0_1");
			```
				paramType="string" optional="false" Specifies the path of the node to be removed.
			*/
			var node = this.nodeByPath(path), depth = parseInt(node.parent().attr("data-depth"), 10),
				binding, parent = this.parentNode(node), data;

			// No such node
			if (node.length <= 0) {
				return;
			}
			if (path.indexOf("_remove") !== -1) {
				path = path.replace("_remove", "");
			}
			binding = this._retrieveCurrentDepthBinding(depth);

			// Update transaction log
			// K.D. October 17th, 2013 Bug #155067 A shallow copy should be created instead of a deep one
			data = {
				data: $.extend(false, {}, this.nodeDataFor(path)),
				path: path
			};
			this._removeData(path, binding);
			node.remove();
			if (!binding.hasOwnProperty("primaryKey")) {
				this._recalculatePaths(path);
			}
			if (parent && parent.children("ul").children("li").length <= 0) {
				this._updateParentState(parent);
			}
			if (this.options.checkboxMode.toLowerCase() === "tristate" && parent) {
				this._updateParentCheckbox(parent);
			}
			this.options.dataSource.root().removeNode(data);
			this._trigger("nodeDeleted", null, { owner: this, data: data.data, path: path });
		},
		removeNodesByValue: function (value) {
			/* Removing all the nodes with the specified value.
			```
				$(".selector").igTree("removeNodesByValue", "Old Node");
			```
				paramType="string" optional="false" Specifies the value of the nodes to be removed.
			*/
			var nodes = this.nodesByValue(value), self = this;
			nodes.each(function () {
				self.removeAt($(this).attr("data-path"));
			});
		},
		applyChangesToNode: function (element, data) {
			/* Performs a UI update on the provided node element with the provided data.
			```
				 $(".selector").igTree("applyChangesToNode", node, newData);
			```
				paramType="object" optional="false" Specifies the node to be updated.
				paramType="object" optional="false" Specifies the new data item the node would update according to.
			*/
			var node = this.nodeFromElement(element), item;
			for (item in node.data) {
				if (node.data.hasOwnProperty(item)) {
					this._replaceUIValue(node, data, item);
				}
			}
		},
		transactionLog: function () {
			/* Returns the transaction log stack.
			```
				var log = $(".selector").igTree("transactionLog");
			```
				returnType="array" The transaction log stack.
			*/
			return this.options.dataSource.root()._transactionLog;
		},
		_triggerSelectionChanging: function (event, node) {
			var args = {
					owner: this,
					selectedNodes: this._selectedNode,
					newNodes: [ this._constructNodeObject(node) ]
				};

			return this._trigger(this.events.selectionChanging, event, args);
		},
		_triggerSelectionChanged: function (event) {
			var args = {
					owner: this,
					selectedNodes: this._selectedNode,
					newNodes: this._selectedNode
				};

			this._trigger(this.events.selectionChanged, event, args);
		},
		_triggerNodeCollapsing: function (event, node) {
			var args = {
					owner: this,
					node: this._constructNodeObject(node)
				};

			return this._trigger(this.events.nodeCollapsing, event, args);
		},
		_triggerNodeCollapsed: function (event, node) {
			var args = {
					owner: this,
					node: this._constructNodeObject(node)
				};

			this._trigger(this.events.nodeCollapsed, event, args);
		},
		_triggerNodeExpanding: function (event, node) {
			var args = {
					owner: this,
					node: this._constructNodeObject(node)
				};

			return this._trigger(this.events.nodeExpanding, event, args);
		},
		_triggerNodeExpanded: function (event, node) {
			var args = {
					owner: this,
					node: this._constructNodeObject(node)
				};

			this._trigger(this.events.nodeExpanded, event, args);
		},
		_triggerNodePopulating: function (event, node) {
			var args = this._constructNodeObject(node);
			return this._trigger(this.events.nodePopulating, event, args);
		},
		_triggerNodePopulated: function (event, node) {
			var args = this._constructNodeObject(node);
			this._trigger(this.events.nodePopulated, event, args);
		},
		_triggerNodeCheckstateChanging: function (event, node) {
			var state = node.children("span[data-role=checkbox]").attr("data-chk"), args = {
				owner: this,
				node: this._constructNodeObject(node),
				currentState: state,
				newState: state === "off" ? "on" : "off",
				currentCheckedNodes: this.checkedNodes()
			};

			return this._trigger(this.events.nodeCheckstateChanging, event, args);
		},
		_triggerNodeCheckstateChanged: function (event, node) {
			var state = node.children("span[data-role=checkbox]").attr("data-chk"), args = {
				owner: this,
				node: this._constructNodeObject(node),
				newState: state,
				newCheckedNodes: this.checkedNodes(),
				newPartiallyCheckedNodes: this.partiallyCheckedNodes()
			};

			return this._trigger(this.events.nodeCheckstateChanged, event, args);
		},
		_triggerNodeClick: function (event, node) {
			var args = {
				owner: this,
				node: this._constructNodeObject(node)
			};

			return this._trigger(this.events.nodeClick, event, args);
		},
		_triggerNodeDoubleClick: function (event, node) {
			var args = this._constructNodeObject(node);

			return this._trigger(this.events.nodeDoubleClick, event, args);
		},
		_triggerDataBinding: function () {
			var args = { owner: this };

			this._trigger(this.events.dataBinding, null, args);
		},
		_triggerDataBound: function (dataView) {
			var args = { owner: this, dataView: dataView };

			this._trigger(this.events.dataBound, null, args);
		},
		_triggerRendering: function (dataView) {
			var args = { owner: this, dataView: dataView };

			this._trigger(this.events.rendering, null, args);
		},
		_triggerRendered: function () {
			var args = { owner: this };

			this._trigger(this.events.rendered, null, args);
		},
		_triggerDragStart: function (event, ui, node) {
			var obj = this._constructNodeObject(node),
				args = $.extend(false, obj, ui);

			return this._trigger(this.events.dragStart, event, args);
		},
		_triggerDrag: function (event, ui, node) {
			var obj = this._constructNodeObject(node),
				args = $.extend(false, obj, ui);

			return this._trigger(this.events.drag, event, args);
		},
		_triggerDragStop: function (event, ui) {
			this._trigger(this.events.dragStop, event, ui);
		},
		_triggerNodeDropping: function (event, ui, node, targetIndex) {
			var obj = this._constructNodeObject(node),
				args,
				indexDecrement;
			obj.targetIndex = targetIndex;
			obj.originalIndex = ui.draggable.index();

			// K.D. January 21st, 2013 Bug #129864 The position of the moved column in the moving dialog is not accurate to the one in the grid when dragging in the tree.
			// When moving up the indices in the same level we need to decrement the index.
			indexDecrement = this._sourceNode.element.parent().attr("data-depth") ===
				node.parent().attr("data-depth") && obj.targetIndex > obj.originalIndex ? -1 : 0;
			obj.targetIndex += indexDecrement;
			args = $.extend(false, obj, ui);

			return this._trigger(this.events.nodeDropping, event, args);
		},
		_triggerNodeDropped: function (event, ui, node) {
			var obj = this._constructNodeObject(node),
				args = $.extend(false, obj, ui);

			this._trigger(this.events.nodeDropped, event, args);
		},
		_constructNodeObject: function (node) {

			// Logic for constructing node object that would be used by the developer
			var nodeData = this.nodeDataFor(node !== null ? node.attr("data-path") : null),
				nodeObject = {
					path: node !== null ? node.attr("data-path") : null,
					element: node !== null ? node : null,
					data: nodeData,
					binding: node !== null ? this._retrieveCurrentDepthBinding(parseInt(node.parent()
						.attr("data-depth"), 10)) : null
				};

			return nodeObject;
		},
		nodeDataFor: function (path) {
			/* Returns the data for the node with specified path.
			```
				// Retrieves the data of the 1st child of the 2nd node at root level
				var nodes = $(".selector").igTree("nodeDataFor", "1_0");
			```
				paramType="string" optional="false" Specifies the node path for which the data is returned.
				returnType="object" The JSON object holding the node data.
			*/
			if (!path) {
				return;
			}

			var splitPath = path.split(this.options.pathSeparator), data = this.options.
				dataSource.root().data(), i, j, binding = this.options.bindings, temp;

			for (i = 0; i < splitPath.length - 1; i++) {
				if (!binding.hasOwnProperty("primaryKey")) {
					if (data[ parseInt(splitPath[ i ], 10) ]) {
						if (typeof data[ parseInt(splitPath[ i ], 10) ][ binding.childDataProperty ] === "function")
						{
							data = data[ parseInt(splitPath[ i ], 10) ][ binding.childDataProperty ]();
						} else {
							data = data[ parseInt(splitPath[ i ], 10) ][ binding.childDataProperty ];
						}
					}
				} else {
					for (j = 0; j < data.length; j++) {
						if (data[ j ].hasOwnProperty(binding.primaryKey)) {
							temp = typeof data[ j ][ binding.primaryKey ] === "function" ?
								data[ j ][ binding.primaryKey ]() :
								data[ j ][ binding.primaryKey ];
							if (temp.toString() === splitPath[ i ].toString()) {
								data = typeof data[ j ][ binding.childDataProperty ] === "function" ?
									data[ j ][ binding.childDataProperty ]() :
									data[ j ][ binding.childDataProperty ];
								break;
							}
						}
					}
				}
				if (binding.hasOwnProperty("bindings")) {
					binding = binding.bindings;
				}
			}

			// K.D. January 18th, 2012 Bug #99681 There are cases where there is only one data item and this is the data item we want as it's not an array
			if (!binding.hasOwnProperty("primaryKey") && data.length) {
				data = data[ parseInt(splitPath[ splitPath.length - 1 ], 10) ];
			} else {
				for (j = 0; j < data.length; j++) {
					if (data[ j ].hasOwnProperty(binding.primaryKey)) {
						temp = typeof data[ j ][ binding.primaryKey ] === "function" ?
							data[ j ][ binding.primaryKey ]() : data[ j ][ binding.primaryKey ];
						if (temp.toString() === splitPath[ i ].toString()) {
							data = data[ j ];
							break;
						}
					}
				}
			}
			if (typeof data === "function") {
				data = data();
			}
			return data;
		},
		destroy: function () {
			/* Destructor for the igTree widget.
			```
				$(".selector").igTree("destroy");
			```
			*/
			$.Widget.prototype.destroy.apply(this, arguments);

			// K.D. February 17th, 2014 Bug #164398 Attaching events only on create as delegate is used instead of bind now.
			this.element.undelegate();
			this.element.removeClass(this.css.tree);
			this.element.removeClass(this.css.treeCollection);
			this.element.removeClass(this.css.treeRoot);
			if (this.options.width) {
				this.element.css("width", "");
			}
			if (this.options.height) {
				this.element.css("height", "");
			}
			if (this.options.dragAndDrop) {
				this._destroyDragAndDrop();
			}
			this.element.removeAttr("data-depth");
			this.element.removeAttr("data-scroll");
			this.element.empty();
			return this;
		}
	});
	$.extend($.ui.igTree, { version: "<build_number>" });
	return $.ui.igTree;// REMOVE_FROM_COMBINED_FILES
}));// REMOVE_FROM_COMBINED_FILES
