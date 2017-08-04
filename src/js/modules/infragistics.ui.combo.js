/*!@license
* Infragistics.Web.ClientUI Combo <build_number>
*
* Copyright (c) 2011-<year> Infragistics Inc.
*
* http://www.infragistics.com/
*
* Depends on:
* jquery-1.9.1.js
* jquery.ui.core.js
* jquery.ui.widget.js
* infragistics.templating.js
* infragistics.util.js
* infragistics.util.jquery.js
* infragistics.dataSource.js
* infragistics.ui.widget.js
*
* Example to use:
*   <script type="text/javascript">
*   $(function () {
*       $("#combo").igCombo();
*   });
*   </script>
*   <input id="combo" />
*/

(function (factory) {
	if (typeof define === "function" && define.amd) {

		// AMD. Register as an anonymous module.
		define( [
			"./infragistics.ui.widget",
			"./infragistics.templating",
			"./infragistics.datasource",
			"./infragistics.ui.scroll",
			"./infragistics.ui.validator"
		], factory );
	} else {

		// Browser globals
		factory(jQuery);
	}
}
(function ($) {
	/*
		igCombo is a widget based on jQuery UI that provides ability to edit text and show drop-down list.
		Drop-down list supports multiple selection, filtering, templating, rendering matching items, active item, etc.
		Editing of field supports auto-complete, editing multiple items, synchronization with selection in drop-down list, clear button, etc.
	*/
	$.widget("ui.igCombo", $.ui.igWidget, {
		options: {
			/* type="number|string" Gets/Sets the width of combo. The numeric and string values (valid html units for size) are supported. It includes %, px, em and other units.
			```
				//Initialize
				$(".selector").igCombo({
					width : "300px"
				});

				//Get
				var width = $(".selector").igCombo("option", "width");

				//Set
				$(".selector").igCombo("option", "width", "300px");
			```
			string The default width can be set in pixels (px), %, em and other units.
			number The default width can be set as a number.
			*/
			width: null,
			/* type="number|string" Gets/Sets height of combo. The numeric and string values (valid html units for size) are supported. It includes %, px, em and other units.
			```
				//Initialize
				$(".selector").igCombo({
					height : "25px"
				});

				//Get
				var height = $(".selector").igCombo("option", "height");

				//Set
				$(".selector").igCombo("option", "height", "25px");
			```
				string The default height can be set in pixels (px), %, em and other units.
				number The default height can be set as a number.
			*/
			height: null,
			/* type="number|string" Gets/Sets the width of drop-down list in pixels.
			```
				//Initialize
				$(".selector").igCombo({
					dropDownWidth : 200
				});

				//Get
				var width = $(".selector").igCombo("option", "dropDownWidth");

				//Set
				$(".selector").igCombo("option", "dropDownWidth", 200);
			```
				string type="string" The default drop-down list width can be set in pixels (px).
				number type="number" The default drop-down list width can be set as a number.
			*/
			dropDownWidth: null,
			/* type="object" Gets/Sets a valid data source accepted by [$.ig.DataSource](ig.datasource), or an instance of an [$.ig.DataSource](ig.datasource) itself.
				Note: if it is set to string and [dataSourceType](ui.igcombo#options:dataSourceType) option is not set, then [$.ig.JSONDataSource](ig.jsondatasource) is used.
			```
				//Initialize
				$(".selector").igCombo({
					dataSource : data
				});

				//Get
				var data = $(".selector").igCombo("option", "dataSource");

				//Set
				$(".selector").igCombo("option", "dataSource", ds);
			```
			*/
			dataSource: null,
			/* type="string" Sets data source type (such as "json", "xml", etc). Please refer to the documentation of [$.ig.DataSource](ig.datasource) and its [type](ig.datasource#options:settings.type) property.
			```
				//Initialize
				$(".selector").igCombo({
					dataSourceType : "xml"
				});

				//Get
				var dataType = $(".selector").igCombo("option", "dataSourceType");
			```
			*/
			dataSourceType: null,
			/* type="string" Sets URL which is used for sending JSON on request for remote filtering (MVC for example). That option is required when [load on demand](ui.igcombo#options:loadOnDemandSettings) is
				[enabled](ui.igcombo#options:loadOnDemandSettings.enabled) and its [type](ui.igcombo#options:filteringType) is remote.
			```
				//Initialize
				$(".selector").igCombo({
					dataSourceUrl : "data.svc"
				});

				//Get
				var dataUrl = $(".selector").igCombo("option", "dataSourceUrl");
			```
			*/
			dataSourceUrl: null,
			/* type="string" see [$.ig.DataSource](ig.datasource) property in the response specifying the total number of records on the server.
			```
				//Initialize
				$(".selector").igCombo({
					responseTotalRecCountKey : "count"
				});

				//Get
				var countKey = $(".selector").igCombo("option", "responseTotalRecCountKey");
			```
			*/
			responseTotalRecCountKey: null,
			/* type="string" See [$.ig.DataSource](ig.datasource) This is basically the property in the response where data records are held, if the response is wrapped.
			```
			//Initialize
			$(".selector").igCombo({
				responseDataKey : "d.results"
			});

			//Get
			var dataKey = $(".selector").igCombo("option", "responseDataKey");
			```
			*/
			responseDataKey: null,
			/*
				type="json|xml|html|script|jsonp|text" Response type when a URL is set as the data source. See http://api.jquery.com/jQuery.ajax/ => dataType.
			```
				//Initialize
				$(".selector").igCombo({
					responseDataType : "text"
				});

				//Get
				var responseDataType = $(".selector").igCombo("option", "responseDataType");
			```
				json type="string"
				xml type="string"
				html type="string"
				script type="string"
				jsonp type="string"
				text type="string"
			*/
			responseDataType: null,
			/* type="string" Content type of the response. See http://api.jquery.com/jQuery.ajax/ => contentType.
			```
				//Initialize
				$(".selector").igCombo({
					responseContentType : "application/json; charset=utf-8"
				});

				//Get
				var responseContentType = $(".selector").igCombo("option", "responseContentType");
			```
			*/
			responseContentType: null,
			/* type="string" specifies the HTTP verb to be used to issue the request.
			```
				//Initialize
				$(".selector").igCombo({
					requestType : "get"
				});

				//Get
				var requestType = $(".selector").igCombo("option", "requestType");
			```
			*/
			requestType: "GET",
			/* type="string" Gets/Sets name of column which contains the "value". If it is missing, then the name of first column will be used.
			```
				//Initialize
				$(".selector").igCombo({
					valueKey : "ProductID"
				});

				//Get
				var key = $(".selector").igCombo("option", "valueKey");
			```
			*/
			valueKey: null,
			/* type="string" Gets/Sets name of column which contains the displayed text. If it is missing, then [valueKey](ui.igcombo#options:valueKey) option will be used.
			```
				//Initialize
				$(".selector").igCombo({
					textKey : "ProductName"
				});

				//Get
				var key = $(".selector").igCombo("option", "textKey");
			```*/
			textKey: null,
			/* type="string" Gets/Sets a template used to render an item in list. The igCombo utilizes igTemplating for generating node content templates.
				More info on the templating engine can be found here: http://www.igniteui.com/help/infragistics-templating-engine.
			```
				//Initialize
				$(".selector").igCombo({
					itemTemplate: "<span class="movieTitle">${Name}</span><img src="${Url}" />"
				});

				//Get
				var template = $(".selector").igCombo("option", "itemTemplate");
			```
			*/
			itemTemplate: null,
			/* type="string" Gets/Sets template used to render a header in the drop-down list. The template is rendered inside of a DIV html element.
			```
				//Initialize
				$(".selector").igCombo({
					headerTemplate : "<div class='dropDownHeaderFooter'>Available Products</div>"
				});

				//Get
				var headerTemplate = $(".selector").igCombo("option", "headerTemplate");

				//Set
				$(".selector").igCombo("option", "headerTemplate", "<div class='dropDownHeaderClass'>Available Products</div>");
			```
			 */
			headerTemplate: null,
			/* type="string" Gets/Sets template used to render a footer in the drop-down list.
				Notes:
					1. The template is rendered inside of DIV html element.
					2. The following variables can be used:
						- {0}: Number of records in igCombo (view of dataSource)
						- {1}: Number of records in dataSource
						- {2}: Number of (filtered) records on server
						- {3}: Number of all records on server
			```
				//Initialize
				$(".selector").igCombo({
					footerTemplate : "<div class='dropDownHeaderFooter'>Available Products</div>"
				});

				//Get
				var footerTemplate = $(".selector").igCombo("option", "footerTemplate");

				//Set
				$(".selector").igCombo("option", "footerTemplate", "<div class='dropDownFooterClass'>Product Count: {0} / {3} {1}/ {2}</div>");
			```
			*/
			footerTemplate: null,
			/* type="string" Gets/Sets the name of a hidden INPUT element, which is used when submitting data. Its value will be set to the values of the selected items valueKeys separated by ',' character on any change in igCombo. If the combo element has 'name' attribute and this option is not set, the 'name' attribute will be used for the input name.
			```
				//Initialize
				$(".selector").igCombo({
					inputName : "textField"
				});

				//Get
				var inputName = $(".selector").igCombo("option", "inputName");

				//Set
				$(".selector").igCombo("option", "inputName", "textField");
			```
			*/
			inputName: null,
			/* type="number" Gets/Sets show drop-down list animation duration in milliseconds.
			```
				//Initialize
				$(".selector").igCombo({
					animationShowDuration : 25
				});

				//Get
				var animationDuration = $(".selector").igCombo("option", "animationShowDuration");

				//Set
				$(".selector").igCombo("option", "animationShowDuration", 25);
			```
			*/
			animationShowDuration: 100,
			/* type="number" Gets/Sets hide drop-down list animation duration in milliseconds.
			```
				//Initialize
				$(".selector").igCombo({
					animationHideDuration : 25
				});

				//Get
				var animationDuration = $(".selector").igCombo("option", "animationHideDuration");

				//Set
				$(".selector").igCombo("option", "animationHideDuration", 25);
			```
			*/
			animationHideDuration: 100,
			/* type="bool" If set to true, the container of the drop-down list is appended to the body.
				If set to false, it is appended to the parent element of the combo.
			```
				//Initialize
				$(".selector").igCombo({
					dropDownAttachedToBody : false
				});

				//Get
				var dropDownAttachedToBody = $(".selector").igCombo("option", "dropDownAttachedToBody");
			```
			*/
			dropDownAttachedToBody: true,
			/* type="remote|local|none" Gets/Sets type of filtering.
				Note: option is set to "remote", then the "css.waitFiltering" is applied to combo and its drop-down list.
			```
				//Initialize
				$(".selector").igCombo({
					filteringType : "remote"
				});

				//Get
				var filterType = $(".selector").igCombo("option", "filteringType");

				//Set
				$(".selector").igCombo("option", "filteringType", "remote");
			```
				remote type="string" filtering is performed by server
				local type="string" filtering is performed by $.ig.DataSource
				none type="string" filtering is disabled
			*/
			filteringType: "local",
			/* type="string" Gets/Sets URL key name that specifies how the remote filtering expressions will be encoded for remote requests, e.g. &filter('col') = startsWith. Default is OData.
			```
				//Initialize
				$(".selector").igCombo({
					filterExprUrlKey : "filter"
				});

				//Get
				var filterKey = $(".selector").igCombo("option", "filterExprUrlKey");

				//Set
				$(".selector").igCombo("option", "filterExprUrlKey", "filter");
			```
			 */
			filterExprUrlKey: null,
			/* type="contains|doesNotContain|startsWith|endsWith|greaterThan|lessThan|greaterThanOrEqualTo|lessThanOrEqualTo|equals|doesNotEqual" Gets/Sets condition used for filtering.
				Note: When [autoComplete](ui.igcombo#options:autoComplete) is enabled, the filtering condition is always "startsWith".
			```
				//Initialize
				$(".selector").igCombo({
					filteringCondition : "startsWith"
				});

				//Get
				var condition = $(".selector").igCombo("option", "filteringCondition");

				//Set
				$(".selector").igCombo("option", "filteringCondition", "startsWith");
			```
				contains type="string"
				doesNotContain type="string"
				startsWith type="string"
				endsWith type="string"
				greaterThan type="string"
				lessThan type="string"
				greaterThanOrEqualTo type="string"
				lessThanOrEqualTo type="string"
				equals type="string"
				doesNotEqual type="string"
			*/
			filteringCondition: "contains",
			/* type="OR|AND" Gets/Sets filtering logic.
			```
				//Initialize
				$(".selector").igCombo({
					filteringLogic : "and"
				});

				//Get
				var filteringLogic = $(".selector").igCombo("option", "filteringLogic");

				//Set
				$(".selector").igCombo("option", "filteringLogic", "or");
			```
			OR type="string"
			AND type="string"
			*/
			filteringLogic: "OR",
			/* type="object" Gets/Sets container of variables which define load on demand functionality.
				Notes:
				That option has effect only when data is loaded remotely using [dataSourceUrl](ui.igcombo#options:dataSourceUrl).
				Selection is supported only for already loaded items.
			```
				//Initialize
				$(".selector").igCombo({
					loadOnDemandSettings: {
						enabled: true,
						pageSize: 55
					}
				});

				//Get
				var loadOnDemandSettings = $(".selector").igCombo("option", "loadOnDemandSettings");
				//Get the enabled state
				loadOnDemandSettings.enabled;
				//Get the drop down list page size
				loadOnDemandSettings.pageSize;

				//Set
				$(".selector").igCombo("option", "loadOnDemandSettings", { enabled: true, pageSize: 55 });
			```
			*/
			loadOnDemandSettings: {
				/* type="bool" Gets/Sets option to enable load on demand.
				```
					//Initialize
					$(".selector").igCombo({
						loadOnDemandSettings: { enabled: true }
					});

					//Get
					var loadOnDemandSettings = $(".selector").igCombo("option", "loadOnDemandSettings");
					//Get the enabled state
					loadOnDemandSettings.enabled;

					//Set
					$(".selector").igCombo("option", "loadOnDemandSettings", { enabled: true });
				```
				*/
				enabled: false,
				/* type="number" Gets/Sets number of records loaded on each request.
				```
					//Initialize
					$(".selector").igCombo({
						loadOnDemandSettings: {
							enabled: true,
							pageSize: 55
						}
					});

					//Get
					var loadOnDemandSettings = $(".selector").igCombo("option", "loadOnDemandSettings");
					//Get the drop down list page size
					loadOnDemandSettings.pageSize;

					//Set
					$(".selector").igCombo("option", "loadOnDemandSettings", { enabled: true, pageSize: 55 });
				```*/
				pageSize: 16
			},
			/* type="number" Gets/Sets how many items should be shown at once.
			   Notes:
			   This option is used for [virtualization](ui.igcombo#options:virtualization) in order to render initial list items.
			```
				//Initialize
				$(".selector").igCombo({
					visibleItemsCount: 22
				});

				//Get
				var count = $(".selector").igCombo("option", "visibleItemsCount");

				//Set
				$(".selector").igCombo("option", "visibleItemsCount", 33 });
			```
			*/
			visibleItemsCount: 15,
			/* type="editable|dropdown|readonlylist|readonly" Sets gets functionality mode.
				editable type="string" Allows to modify value by edit field and drop-down list.
				dropdown type="string" Allows to modify value by drop-down list only.
				readonlylist type="string" Allows to open list, but does not allow any changes in field or selection in drop-down list. If selection is not set, then first item in [dataSource](ui.igcombo#options:dataSource) is automatically selected.
				readonly type="string" Does not allow to open list or change value in field. If selection is not set, then first item in [dataSource](ui.igcombo#options:dataSource) is automatically selected.
			```
				//Initialize
				$(".selector").igCombo({
					mode : "readonlylist"
				});

				//Get
				var mode = $(".selector").igCombo("option", "mode");
			```
			*/
			mode: "editable",
			/* type="bool" Gets/Sets ability to use virtual rendering for drop-down list. Enable to boost performance when combo has lots of records.
				If that option is enabled, then only visible items are created and the top edge of the first visible item in list is aligned to the top edge of list.
			```
				//Initialize
				$(".selector").igCombo({
					virtualization : true
				});

				//Get
				var isVirtualizationEnabled = $(".selector").igCombo("option", "virtualization");
			```
			*/
			virtualization: false,
			/* type="object" Gets/Sets object specifying multi selection feature options. Note showCheckboxes and itemSeparator has effect only if multi selection is enabled.
			```
				//Initialize
				$(".selector").igCombo({
					multiSelection: {
						enabled: true,
						addWithKeyModifier: false,
						showCheckboxes: false,
						itemSeparator: ', '
					}
				});

				//Get
				var multiSelection = $(".selector").igCombo("option", "multiSelection");
			``` */
			multiSelection: {
				/* type="bool" Set enabled to true to turn multi selection on. Set to true by default when target element for the combo is a select with the multiple attribute set.
				```
					//Initialize
					$(".selector").igCombo({
						multiSelection: {
							enabled: true
						}
					});

					//Get
					var multiSelection = $(".selector").igCombo("option", "multiSelection");
					var enabled = multiSelection.enabled;

					//Set
					$(".selector").igCombo("option", "multiSelection", { enabled: true });
				```
				*/
				enabled: false,
				/* type="bool" Set addWithKeyModifier to true to disable the additive selection, then additive selection can be done by ctrl + mouse click / enter.
				```
					//Initialize
					$(".selector").igCombo({
						multiSelection: {
							addWithKeyModifier: true
						}
					});

					//Get
					var multiSelection = $(".selector").igCombo("option", "multiSelection");
					var addWithKeyModifier = multiSelection.addWithKeyModifier;


					//Set
					$(".selector").igCombo("option", "multiSelection", { addWithKeyModifier: true });
				```
				 */
				addWithKeyModifier: false,
				/* type="bool" Set showCheckboxes to true to render check boxes in front of each drop down item.
				```
					//Initialize
					$(".selector").igCombo({
						multiSelection: {
							showCheckboxes: true
						}
					});

					//Get
					var multiSelection = $(".selector").igCombo("option", "multiSelection");
					var showCheckboxes = multiSelection.showCheckboxes;

					//Set
					$(".selector").igCombo("option", "multiSelection", { showCheckboxes: false });
				```
				*/
				showCheckboxes: false,
				/* type="string" Use itemSeparator to set what string to be rendered between items in field.
				```
				//Initialize
					$(".selector").igCombo({
						multiSelection: {
							itemSeparator: ", "
						}
					});

					//Get
					var multiSelection = $(".selector").igCombo("option", "multiSelection");
					var itemSeparator = multiSelection.itemSeparator;


					//Set
					$(".selector").igCombo("option", "multiSelection", { itemSeparator: ". " });
				```
				*/
				itemSeparator: ", "
			},
			/* type="object" Gets/Sets object specifying grouping feature options. The option has key and dir properties.
			```
				//Initialize
				$(".selector").igCombo({
					grouping: {
						key: "Country",
						dir: "desc"
					},
				});

				//Get
				var grouping = $(".selector").igCombo("option", "grouping");

				//Set
				$(".selector").igCombo("option", "grouping", { key: "Age", dir: "asc" });
			```
			*/
			grouping: {
				/* type="string" Gets/Sets name of column by which the records will be grouped. Setting this option enables the grouping.
				```
					//Initialize
					$(".selector").igCombo({
						grouping: {
							key: "Country"
						},
					});

					//Get
					var grouping = $(".selector").igCombo("option", "grouping");
					var key = grouping.key;

					//Set
					$(".selector").igCombo("option", "grouping", { key: "Age" });
				```
				 */
				key: null,
				/* type="asc|desc" Specifies the sort order - ascending or descending.
				```
					//Initialize
					$(".selector").igCombo({
						grouping: {
							key: "Country",
							dir: "desc"
						},
					});

					//Get
					var grouping = $(".selector").igCombo("option", "grouping");
					var dir = grouping.dir;

					//Set
					$(".selector").igCombo("option", "grouping", { dir: "asc" });
				```
				asc type="string"
				desc type="string"
				 */
				dir: "asc"
			},
			/* type="object" Gets/Sets object which contains options supported by [igValidator](ui.igvalidator).
				Notes: in order for validator to work, application should ensure that [igValidator](ui.igvalidator) is loaded (ig.ui.validator.js/css files).
			```
				//Initialize
				$(".selector").igCombo({
					validatorOptions: {
						required: true
					}
				});

				//Get
				var validatorOptions = $(".selector").igCombo("option", "validatorOptions");

				//Set
				$(".selector").igCombo("option", "validatorOptions", {
					required: true
				});
			```
			*/
			validatorOptions: null,
			/* type="multi|contains|startsWith|full|null" Gets/Sets condition used for highlighting of matching parts in items of drop-down list.
			```
				//Initialize
				$(".selector").igCombo({
					highlightMatchesMode : "startsWith"
				});

				//Get
				var highlightMatchesMode = $(".selector").igCombo("option", "highlightMatchesMode");

				//Set
				$(".selector").igCombo("option", "highlightMatchesMode", "full");
			```
				multi type="string" multiple matches in a single item are rendered
				contains type="string" match at any position in item is rendered
				startsWith type="string" only match which starts from the beginning of text is rendered
				full type="string" only fully matched items are rendered
				null type="object" matches are not rendered
			*/
			highlightMatchesMode: "multi",
			/* type="bool" If set to true, filtering and auto selection will be case-sensitive.
			```
				//Initialize
				$(".selector").igCombo({
					caseSensitive : true
				});

				//Get
				var caseSensitive = $(".selector").igCombo("option", "caseSensitive");

				//Set
				$(".selector").igCombo("option", "caseSensitive", true);
			```
			 */
			caseSensitive: false,
			/* type="bool" Gets/Sets whether the first matching item should be auto selected when typing in input. When [multiSelection](ui.igcombo#options:multiSelection) is enabled this option will instead put the active item on the matching element.
			```
				//Initializes
				$(".selector").igCombo({
					autoSelectFirstMatch : false
				});

				//Get
				var autoSelectFirstMatch = $(".selector").igCombo("option", "autoSelectFirstMatch");

				//Set
				$(".selector").igCombo("option", "autoSelectFirstMatch", true);
			```
			*/
			autoSelectFirstMatch: true,
			/* type="bool" Gets/Sets ability to autocomplete field from first matching item in list.
				Note: When autoComplete option is enabled, then "startsWith" is used for [filteringCondition](ui.igcombo#options:filteringCondition).
			```
				//Initialize
				$(".selector").igCombo({
					autoComplete : true
				});

				//Get
				var autoComplete = $(".selector").igCombo("option", "autoComplete");

				//Set
				$(".selector").igCombo("option", "autoComplete", false);
			```
			*/
			autoComplete: false,
			/* type="bool" If set to true:
				1. Allows custom value input only with single selection.
				2. Custom values will be auto completed to the closest value if [autoComplete](ui.igcombo#options:autoComplete) is enabled.
			```
				//Initialize
				$(".selector").igCombo({
					allowCustomValue: true
				});

				//Get
				var allowCustomValue = $(".selector").igCombo("option", "allowCustomValue");

				//Set
				$(".selector").igCombo("option", "allowCustomValue", false);
			```
			*/
			allowCustomValue: false,
			/* type="bool" Gets/Sets ability to close drop-down list when control loses focus.
			```
				//Initialize
				$(".selector").igCombo({
					closeDropDownOnBlur: false
				});

				//Get
				var closeDropDownOnBlur = $(".selector").igCombo("option", "closeDropDownOnBlur");

				//Set
				$(".selector").igCombo("option", "closeDropDownOnBlur", false);
			```
			*/
			closeDropDownOnBlur: true,
			/* type="number" Specifies the delay duration before processing the changes in the input. Useful to boost performance by lowering the count of selection, filtering, auto complete and highlighting operations executed on each input change.
			```
				//Initialize
				$(".selector").igCombo({
					delayInputChangeProcessing : 500
				});

				//Get
				var delayInputChangeProcessing = $(".selector").igCombo("option", "delayInputChangeProcessing");

				//Set
				$(".selector").igCombo("option", "delayInputChangeProcessing", 1000);
			```
			*/
			delayInputChangeProcessing: 250,
			/* type="number" Gets/Sets tabIndex for the field of the combo.
			```
				//Initialize
				$(".selector").igCombo({
					tabIndex : 3
				});

				//Get
				var tabIndex = $(".selector").igCombo("option", "tabIndex");

				//Set
				$(".selector").igCombo("option", "tabIndex", 3);
			```
			*/
			tabIndex: null,
			/* type="bool" Gets/Sets ability to show the drop-down list when the combo is in focus. This option has effect only if the combo is in editable [mode](ui.igcombo#options:mode).
			```
				//Initialize
				$(".selector").igCombo({
					dropDownOnFocus : true
				});

				//Get
				var dropDownOnFocus = $(".selector").igCombo("option", "dropDownOnFocus");

				//Set
				$(".selector").igCombo("option", "dropDownOnFocus", true);
			```
			*/
			dropDownOnFocus: false,
			/* type="bool" Gets sets ability to close drop-down list when single item in the list is selected with mouse click or enter press. The default value when [multiSelection](ui.igcombo#options:multiSelection) is enabled will be false. This option will not close the drop down when [multiSelection](ui.igcombo#options:multiSelection) is enabled and additive selection is performed.
			```
				//Initialize
				$(".selector").igCombo({
					closeDropDownOnSelect: false
				});

				//Get
				var closeDropDownOnSelect = $(".selector").igCombo("option", "closeDropDownOnSelect");

				//Set
				$(".selector").igCombo("option", "closeDropDownOnSelect", false);
			```
			*/
			closeDropDownOnSelect: true,
			/* type="bool" Gets/Sets ability to select items by space button press.
			```
				//Initialize
				$(".selector").igCombo({
					selectItemBySpaceKey : true
				});

				//Get
				var selectSpace = $(".selector").igCombo("option", "selectItemBySpaceKey");

				//Set
				$(".selector").igCombo("option", "selectItemBySpaceKey", true);
				```
			*/
			selectItemBySpaceKey: false,
			/* type="array" Gets/Sets list of items to be selected when the combo is initialized. It should contain array of objects with index or value property, then on initialization the matching items will be selected. If initialSelectedItems are not set, the combo is with single selection and it is in a dropdown, readonly or readonlylist [mode](ui.igcombo#options:mode), the first item will be automatically selected.
			Note: Only items loaded on initialization can be selected. When using [load on demand](ui.igCombo#options:loadOnDemandSettings), selecting an item which is not loaded yet will fail.
			```
				//Initialize with index
				$(".selector").igCombo({
					multiSelection: {
						enabled: true
					},
					initialSelectedItems : [
						{ index: 0 },
						{ index: 1 },
						{ index: 2 }
					]
				});

				//Initialize with value
				$(".selector").igCombo({
					initialSelectedItems : [
						{ value: 5 }
					]
				});

				//Get
				var initialSelectedItems = $(".selector").igCombo("option", "initialSelectedItems");
			```
			*/
			initialSelectedItems: [ {
				/* type="number" optional="true" Index of item in the list. The index should be greater than -1 and less than the count of the [items](ui.igcombo#methods:items) in the list (rows in dataSource).
				```
					//Initialize
					$(".selector").igCombo({
						multiSelection: {
							enabled: true
						},
						initialSelectedItems : [
							{ index: 1 },
							{ index: 3 },
							{ index: 5 }
						]
					});

					//Get
					var initialSelectedItems = $(".selector").igCombo("option", "initialSelectedItems");
				```
				 */
				index: -1,
				/* type="object" optional="true" Value matching the [valueKey](ui.igcombo#options:valueKey) property of the item.
				```
					//Initialize
					$(".selector").igCombo({
						multiSelection: {
							enabled: true
						},
						initialSelectedItems : [
							{ value: 2 },
							{ value: 5 },
						]
					});

					//Get
					var initialSelectedItems = $(".selector").igCombo("option", "initialSelectedItems");
				``` */
				value: null
			} ],
			/* type="bool" Gets/Sets ability to prevent submitting form on enter key press.
			```
				//Initialize
				$(".selector").igCombo({
					preventSubmitOnEnter : true
				});

				//Get
				var preventSubmitOnEnter = $(".selector").igCombo("option", "preventSubmitOnEnter");

				//Set
				$(".selector").igCombo("option", "preventSubmitOnEnter", false);
			```
			*/
			preventSubmitOnEnter: true,
			/* type="string" Gets/Sets the format string that is used to format the text display values in the combo.
				Valid options are:
				"auto" (default) - uses automatic formatting for Date and number objects.
				"none", "", or null - will disable formatting

				Custom values can be something like "currency", "percent", "dateLong", "time", "MMM-dd-yyyy H:mm tt", etc.

				Custom format strings should match the data type in "textKey" column.
			```
				//Initialize
				$(".selector").igCombo({
					format : "auto"
				});

				//Get
				var format = $(".selector").igCombo("option", "format");
			```
			*/
			format: "auto",
			/* type="boolean" Gets/Sets whether the onscreen keyboard should be shown when the dropdown button is clicked (touch devices only).
				Note: The keyboard will still show when the combo input is focused in editable mode.
			```
				//Initialize
				$(".selector").igCombo({
					suppressKeyboard : true
				});

				//Get
				var suppressKeyboard = $(".selector").igCombo("option", "suppressKeyboard");

				//Set
				$(".selector").igCombo("option", "suppressKeyboard", true);
			```
			*/
			suppressKeyboard: false,
			/* type="boolean" Specifies whether the clear button should be rendered.
			When the [mode](ui.igcombo#options:mode) is single selection, readonly or readonlylist this option will default to false. It can still be enabled when it is specifically set to true.
			```
				//Initialize
				$(".selector").igCombo({
					enableClearButton : false
				});

				//Get
				var enableClearButton = $(".selector").igCombo("option", "enableClearButton");

				//Set
				$(".selector").igCombo("option", "enableClearButton", false);
			```
			*/
			enableClearButton: true,
			/* type="auto|bottom|top" Gets/Sets drop-down list orientation when open button is clicked.
			```
				//Initialize
				$(".selector").igCombo({
					dropDownOrientation : "top"
				});

				//Get
				var dropDownOrientation = $(".selector").igCombo("option", "dropDownOrientation");

				//Set
				$(".selector").igCombo("option", "dropDownOrientation", "top");
			```
			   auto type="string" if there is enough space, it positions the drop-down list below the combo input, otherwise - above the combo input
			   bottom type="string" below the combo input
			   top type="string" above the combo input
			*/
			dropDownOrientation: "auto"
		},
		events: {
			/* cancel="false" Event which is raised after rendering of the combo completes.
			```
				$(document).delegate(".selector", "igcomborendered", function (evt, ui) {
					//use to get a reference to the combo performing rendering.
					ui.owner;
					//use to get a reference to the main/top combo element.
					ui.element;
				});

				//Initialize
				$(".selector").igCombo({
					rendered: function(evt, ui) {...}
				});
			```
				Function takes arguments evt and ui.
				Use ui.owner to get a reference to the combo performing rendering.
				Use ui.element to get a reference to the main/top combo element.
			*/
			rendered: "rendered",
			/* cancel="true" Event which is raised before data binding is performed.
			```
				$(document).delegate(".selector", "igcombodatabinding", function (evt, ui) {
					//use to obtain reference to igCombo
					ui.owner;
					//use to obtain reference to instance of $.ig.DataSource used by combo
					ui.dataSource;
				});

				//Initialize
				$(".selector").igCombo({
					dataBinding: function (evt, ui) {
						...
					}
				});
			```
				Function takes arguments evt and ui.
				Use ui.owner to get a reference to igCombo performing the databinding.
				Use ui.dataSource to get a reference to the [$.ig.DataSource](ig.datasource) combo is to be databound to. */
			dataBinding: "dataBinding",
			/* cancel="false" Event which is raised after data binding is complete.
			```
				$(document).delegate(".selector", "igcombodatabound", function (evt, ui) {
					//use to obtain reference to igCombo
					ui.owner;
					//use to obtain reference to instance of $.ig.DataSource used by combo
					ui.dataSource;
				});

				//Initialize
				$(".selector").igCombo({
					dataBound: function (evt, ui) {
					...
					}
				});
			```
				Function takes arguments evt and ui.
				Use ui.owner to obtain reference to igCombo performing the data binding.
				Use ui.dataSource to get a reference to the [$.ig.DataSource](ig.datasource) combo is databound to.
				Use ui.success to see if the databinding was performed correctly.
				Use ui.errorMessage to get the error message if the databinding failed. */
			dataBound: "dataBound",
			/* cancel="true" Event which is raised before data filtering.
			```
				$(document).delegate(".selector", "igcombofiltering", function (evt, ui) {
					//use to obtain reference to the event browser
					evt.originalEvent;
					//use to obtain reference to igCombo
					ui.owner;
					//use to obtain reference to array which contains expressions supported by $.ig.DataSource
					ui.expression;
				});

				//Initialize
				$(".selector").igCombo({
					filtering: function (evt, ui) {
						...
					}
				});
			```
				Function takes arguments evt and ui.
				Use ui.owner to obtain reference to igCombo.
				Use ui.expression to obtain reference to array which contains expressions supported by [$.ig.DataSource](ig.datasource).
				Each expression-item contains following members: fieldName ([textKey](ui.igcombo#options:textKey)), cond ([filteringCondition](ui.igcombo#options:filteringCondition)), expr (value/string to filter). */
			filtering: "filtering",
			/* cancel="false" Event which is raised after filtering.
			```
				$(document).delegate(".selector", "igcombofiltered", function (evt, ui) {
					//use to obtain reference to the event browser
					evt.originalEvent;
					//use to obtain reference to igCombo
					ui.owner;
					//use to obtain reference to array which contains expressions supported by $.ig.DataSource
					ui.expression;
				});

				//Initialize
				$(".selector").igCombo({
					filtered: function (evt, ui) {
						...
					}
				});
			```
				Function takes arguments evt and ui.
				Use evt.originalEvent to obtain reference to event of browser. That can be null.
				Use ui.owner to obtain reference to igCombo.
				Use ui.elements to obtain a jquery reference to the rendered filtered elements.
			*/
			filtered: "filtered",
			/* cancel="true" Event which is raised before rendering of the combo items is performed.
			```
				$(document).delegate(".selector", "igcomboitemsrendering", function (evt, ui) {
					//use to get a reference to the combo performing rendering.
					ui.owner;
					//use to get a reference to the $.ig.DataSource combo is databound to.
					ui.dataSource;
				});

				//Initialize
				$(".selector").igCombo({
					itemsRendering: function(evt, ui) {...}
				});
			```
				Function takes arguments evt and ui.
				Use ui.owner to get a reference to the combo performing rendering.
				Use ui.dataSource to get a reference to the [$.ig.DataSource](ig.datasource) combo is databound to.
			*/
			itemsRendering: "itemsRendering",
			/* cancel="false" Event which is raised after rendering of the combo items completes.
			```
				$(document).delegate(".selector", "igcomboitemsrendered", function (evt, ui) {
					//use to obtain reference to igCombo
					ui.owner;
					//use to get a reference to the $.ig.DataSource combo is databound to.
					ui.dataSource;
				});

				//Initialize
				$(".selector").igCombo({
					itemsRendered: function(evt, ui) {...}
				});
			```
				Function takes arguments evt and ui.
				Use ui.owner to get a reference to the combo performing rendering.
				Use ui.dataSource to get a reference to the [$.ig.DataSource](ig.datasource) combo is databound to.
			*/
			itemsRendered: "itemsRendered",
			/* cancel="true" Event which is raised before drop-down list is opened.
			```
				$(document).delegate(".selector", "igcombodropdownopening", function (evt, ui) {
					//use to obtain reference to the event browser
					evt.originalEvent;
					//use to obtain reference to igCombo
					ui.owner;
					//use to obtain reference to jQuery DOM element which represents a container of list
					ui.element;
				});

				//Initialize
				$(".selector").igCombo({
					dropDownOpening: function (evt, ui) {
						...
					}
				});
			```
				Return false in order to cancel drop-down action.
				Function takes arguments evt and ui.
				Use ui.owner to obtain reference to igCombo.
				Use ui.list to obtain reference to jquery DOM element which represents drop down list container.
			*/
			dropDownOpening: "dropDownOpening",
			/* cancel="false" Event which is raised after drop-down list was opened.
			```
				$(document).delegate(".selector", "igcombodropdownopened", function (evt, ui) {
					//use to obtain reference to the event browser
					evt.originalEvent;
					//use to obtain reference to igCombo
					ui.owner;
					//use to obtain reference to jQuery DOM element which represents a container of list
					ui.element;
				});

				//Initialize
				$(".selector").igCombo({
					dropDownOpened: function (evt, ui) {
						...
					}
				});
			```
				Function takes arguments evt and ui.
				Use ui.owner to obtain reference to igCombo.
				Use ui.list to obtain reference to jquery DOM element which represents drop down list container.
			*/
			dropDownOpened: "dropDownOpened",
			/* cancel="true" Event which is raised before drop-down list is closed.
			```
				$(document).delegate(".selector", "igcombodropdownclosing", function (evt, ui) {
					//use to obtain reference to the event browser
					evt.originalEvent;
					//use to obtain reference to igCombo
					ui.owner;
					//use to obtain reference to jQuery DOM element which represents a container of list
					ui.element;
				});

				//Initialize
				$(".selector").igCombo({
					dropDownClosing: function (evt, ui) {
						...
					}
				});
			```
				Return false in order to cancel hide action.
				Function takes arguments evt and ui.
				Use ui.owner to obtain reference to igCombo.
				Use ui.list to obtain reference to jquery DOM element which represents drop down list container.
			*/
			dropDownClosing: "dropDownClosing",
			/* cancel="false" Event which is raised after drop-down list was closed.
			```
				$(document).delegate(".selector", "igcombodropdownclosed", function (evt, ui) {
					//use to obtain reference to the event browser
					evt.originalEvent;
					//use to obtain reference to igCombo
					ui.owner;
					//use to obtain reference to jQuery DOM element which represents a container of list
					ui.element;
				});

				//Initialize
				$(".selector").igCombo({
					dropDownClosed: function (evt, ui) {
						...
					}
				});
			```
				Function takes arguments evt and ui.
				Use evt.originalEvent to obtain reference to event of browser.
				Use ui.owner to obtain reference to igCombo.
				Use ui.list to obtain reference to jquery DOM element which represents drop down list container.
			*/
			dropDownClosed: "dropDownClosed",
			/* cancel="true" Event which is raised before selection change.
			```
				$(document).delegate(".selector", "igcomboselectionchanging", function (evt, ui) {
					//use to obtain reference to the event browser
					evt.originalEvent;
					//use to obtain reference to igCombo
					ui.owner;
					//use to obtain reference to array of new selected items. That can be null.
					ui.items;
					//use to obrain reference to array of currently selected items.
					ui.currentItems
				});

				//Initialize
				$(".selector").igCombo({
					selectionChanging: function (evt, ui) {
						...
					}
				});
			```
				Return false in order to cancel change.
				Function takes arguments evt and ui.
				Use ui.owner to obtain reference to igCombo.
				Use ui.currentItems to obtain reference to array of the selected items before the new selection has happened. That can be null.
				Use ui.items to obtain reference to array of all items that will be selected after the selection finish. That can be null.
			*/
			selectionChanging: "selectionChanging",
			/* cancel="false" Event which is raised after selection change.
			```
				$(document).delegate(".selector", "igcomboselectionchanged", function (evt, ui) {
					//use to obtain reference to the event browser
					evt.originalEvent;
					//use to obtain reference to igCombo
					ui.owner;
					//use to obtain reference to array of new selected items. That can be null.
					ui.items;
						//use to obtain reference to array of old selected items. That can be null.
					ui.oldItems;
				});

				//Initialize
				$(".selector").igCombo({
					selectionChanged: function (evt, ui) {
					...
					}
				});
			```
				Function takes arguments evt and ui.
				Use ui.owner to obtain reference to igCombo.
				Use ui.items to obtain reference to array of new selected items. That can be null.
				Use ui.oldItems to obtain reference to array of old selected items. That can be null.
			*/
			selectionChanged: "selectionChanged"
		},
		css: {
			/* Class applied to the wrapper element. */
			comboWrapper: "ui-igcombo-wrapper",
			/* Class applied to the combo element. */
			combo: "ui-igcombo ui-widget ui-state-default ui-corner-all ui-unselectable",
			/* Class applied to the combo in drop down mode. */
			dropDownMode: "ui-igcombo-mode-dropdown",
			/* Class applied to the combo in read only mode. */
			readOnlyMode: "ui-igcombo-mode-readonly",
			/* Class applied to the combo in read only list mode. */
			readOnlyListMode: "ui-igcombo-mode-readonlylist",
			/* Class applied to the text box container */
			textBox: "ui-igcombo-textbox ui-state-default ui-corner-all",
			/* Class applied to the editing element. */
			field: "ui-igcombo-field ui-corner-all",
			/* Class applied to the holder of editing element. */
			fieldHolder: "ui-igcombo-fieldholder",
			/* Class applied to the holder of editing element when direction is left to right. */
			fieldHolderLTR: "ui-igcombo-fieldholder-ltr ui-corner-left",
			/* Class applied to the holder of editing element when direction is right to left. */
			fieldHolderRTL: "ui-igcombo-fieldholder-rtl ui-corner-right",
			/* Class applied to the drop down list when direction is right to left*/
			dropDownListRTL: "ig-rtl",
			/* Class applied to the DIV element which represents the drop down button. */
			button: "ui-igcombo-button ui-state-default ui-unselectable",
			/* Classes applied to the DIV element which represents image on drop down button. */
			buttonIcon: "ui-igcombo-buttonicon ui-icon-triangle-1-s ui-icon",
			/* Class applied to the DIV element which represents drop down button when direction is left to right. */
			buttonLTR: "ui-igcombo-button-ltr ui-corner-right",
			/* Class applied to the DIV element which represents drop down button when direction is right to left. */
			buttonRTL: "ui-igcombo-button-rtl ui-corner-left",
			/* Class applied to the DIV element which represents clear button. */
			clear: "ui-igcombo-clear ui-unselectable",
			/* Class applied to the DIV element which represents clear button with right to left direction */
			clearRTL: "ui-igcombo-clear-rtl ui-unselectable",
			/* Classes applied to the SPAN element of clear button in mouse-over state. */
			clearHover: "ui-igcombo-clear-hover ui-state-hover",
			/* Class applied to the DIV element which represents image on clear button. */
			clearIcon: "ui-igcombo-clearicon ui-icon-circle-close ui-icon",
			/* Class applied to the DIV element which represents the combo drop down. It contains the list, the header and the footer containers. */
			dropDown: "ui-igcombo-dropdown ui-widget ui-widget-content ui-corner-all",
			/* Class applied to the DIV element which is used as container for drop down list. */
			list: "ui-igcombo-list",
			/* Class applied to the drop down container element when virtualization is enabled. */
			listOverflow: "ui-igcombo-list-overflow",
			/* Class applied to the UL element which is used as container for list items. */
			listItemHolder: "ui-igcombo-listitemholder",
			/* Classes applied to the LI element which represents item in drop down list. */
			listItem: "ui-igcombo-listitem ui-state-default ui-unselectable",
			/* Classes applied to the DIV element which represents header in combo drop down. */
			header: "ui-igcombo-header",
			/* Classes applied to the DIV element which represents footer in combo drop down. */
			footer: "ui-igcombo-footer",
			/* Classes applied to the element which holds group of list items in drop down list. */
			group: "ui-igcombo-group",
			/* Classes applied to the header element of each group */
			groupHeader: "ui-igcombo-group-header ui-state-default ui-unselectable",
			/* Class applied to the list item elements hover with mouse or navigated to by keyboard */
			itemInFocus: "ui-igcombo-item-in-focus",
			/* Class applied to the text in LI element which represents highlighted text in dropdown list. */
			listItemHighlighted: "ui-igcombo-highlight",
			/* Class applied to LI element that is shown when no matches are found while filtering */
			noMatchFound: "ui-igcombo-nomatchfound",
			/* Class applied to the SPAN element which represents text of item in dropdown list when checkboxes are enabled. */
			listItemTextWithCheckbox: "ui-igcombo-listitemtextwithcheckbox",
			/* Class applied to the SPAN element which represents checkbox in list item. */
			checkbox: "ui-igcombo-checkbox ui-state-default ui-corner-all ui-igcheckbox-small",
			/* Class applied to the SPAN element which represents icon in unchecked checkbox. */
			checkboxOff: "ui-icon ui-igcombo-checkbox-off ui-igcheckbox-small-off",
			/* Class applied to the SPAN element which represents icon in unchecked checkbox. */
			checkboxOn: "ui-icon ui-icon-check ui-igcombo-checkbox-on ui-igcheckbox-small-on",
			/* Class applied to the hidden input field */
			hiddenField: "ui-igcombo-hidden-field",
			/* Class applied to elements when hovered. */
			hover: "ui-state-hover",
			/* Class applied to elements in active state. */
			active: "ui-state-active",
			/* Class applied to unselectable elements */
			unselectable: "ui-unselectable",
			/* Class applied to drop down element when it is closed. */
			noBorder: "ui-igcombo-no-border",
			/* Class applied to the scroll holder element when virtualization is enabled. */
			scrollHolder: "ui-igcombo-scrollholder ui-unselectable",
			/* Class applied to the scroll element when virtualization is enabled. */
			scroll: "ui-igcombo-scroll ui-unselectable",
			/* Class applied to the span element in the footer that represents the number of records in data source view */
			recordsView: "ui-igcombo-records-view",
			/* Class applied to the span element in the footer that represents the number of records in the data source */
			recordsData: "ui-igcombo-records-data",
			/* Class applied to the span element in the footer that represents the number of filtered records on the server */
			recordsServer: "ui-igcombo-records-server",
			/* Class applied to the span element in the footer that represents the number of total records on the server */
			recordsServerTotal: "ui-igcombo-records-server-total",
			/* Class applied to the DIV which represents overlay over drop down list while data is retrieving. */
			loading: "ui-igcombo-loading",
			/* Class applied to filtered list items to hide them */
			hidden: "ui-helper-hidden",
			/* Class applied to combo top element when in readonly mode */
			disabled: "ui-state-disabled",
			/* Class applied to combo drop down element when top orientation is used */
			orientationTop: "ui-igcombo-orientation-top",
			/* Class applied to combo drop down element when bottom orientation is used */
			orientationBottom: "ui-igcombo-orientation-bottom"
		},
		/* Number of records in igCombo (view of dataSource) */
		RECORDS_VIEW: "{0}",
		/* Number of records in dataSource */
		RECORDS_DATA: "{1}",
		/* Number of (filtered) records on server */
		RECORDS_SERVER: "{2}",
		/* Number of all records on server */
		RECORDS_SERVER_TOTAL: "{3}",
		_createWidget: function (options) {
			var mode;

			// Private variables
			this._options = {
				$window: $(window),
				$comboWrapper: null,
				$combo: null,
				$input: null,
				$hiddenInput: null,
				$fieldCont: null,
				$clearCont: null,
				$clearIcon: null,
				$dropDownBtnCont: null,
				$dropDownBtnIcon: null,
				$dropDownCont: null,
				$dropDownListCont: null,
				$dropDownList: null,
				$header: undefined,
				$footer: undefined,
				$dropDownScrollCont: null,
				$dropDownScroll: null,
				$loading: null,
				$noMatchFound: null,
				$itemsToSelectOnShiftUpDown: $(),
				$itemsToSelectOnShiftClick: $(),
				selectedData: [ ],
				keyNavItemData: null,
				autoSelectedItemData: null,
				autoCompleteItemData: null,
				inputVal: "",
				highlightElement: "span",
				ltr: true,
				dropDownOpened: false,
				deltaItemsForLoadOnDemand: 5,
				dataBinding: false,
				shiftKeyCode: 16,
				validator: null,
				shiftDown: false,

				// If the initial element is input or select, cache the name, remove it, set it to the hidden input for submit and upon destroy return it
				nameAttribute: "",

				// Subscribe to fire callbacks when selection is changed from api
				internalSelChangeSubs: [],
				initialDataBinding: true,
				remoteFilteringTriggerEvt: null,
				preventInputBlur: false,

				// Track whether mouse down started from any list item to highlight elements on mouse hover
				mouseDownStartedFromListItem: false,

				// We need to cache the records in order to have correct input values for remote filtering
				cachedData: [ ],
				strDataSource: null,
				updateInputValuesOnRemoteFilter: false,
				hasFooterVariables: false,

				// Tracks whether the input field had text selection when a key was pressed down,
				// to handle correctly backspace when auto complete is enabled
				hadInputSelectionOnKeydown: false,

				// The filtering expression
				expression: null,
				preventItemSeparatorOnFocus: false,
				preventDropDownOnFocus: false,
				keyUpTimeout: null,
				repositionInterval: null,
				disableScroll: false,
				cachedGroupLength: null,
				initialGroupHeaders: 1,

				// The string that will be used to match item"s text when user types in drop down mode
				dropDownModeSearchBy: "",
				dropDownModeSearchByResetTimeout: null,
				dropDownModeSearchByResetDelay: 1000,
				originalOptions: options,

				// S.T. 6th July, 2015 #201924: Use template for checkbox markup
				checkboxItemTemplate: "<span class='{css.checkbox}'>" +
					"<span class='{css.checkboxOff}''></span></span>" +
					"<div class='{css.listItemTextWithCheckbox}'>{innerMarkup}</div>",
				scrollCallback: null,

				// T.I. 29-Oct-2015 #202222: When filtering is loading and click outside the combo the input value is not cleared
				closingDropDownOnBlur: false,

				// Handles data for composition events
				// P.P 26-Feb-2016 #212236: Incorrect input of Japanese symbols using IME
				composition: null
			};
			if (options) {
				mode = options.mode;

				// Default closeDropDownOnSelect to false when multi selection is enabled
				if (options.multiSelection && options.multiSelection.enabled &&
					options.closeDropDownOnSelect === undefined) {
					options.closeDropDownOnSelect = false;
				}

				// Default enableClearButton to false when mode readonly, readonlylist or drop down with single selection
				if ((mode === "readonly" || mode === "readonlylist") ||
					(mode === "dropdown" && !(options.multiSelection && options.multiSelection.enabled)) &&
					options.enableClearButton === undefined) {
					options.enableClearButton = false;
				}
			}

			this._superApply(arguments);
		},
		_create: function () {

			// Event handlers
			this._handlers = {
				windowResize: $.proxy(this._windowResize, this),
				documentMouseUp: $.proxy(this._documentMouseUp, this),
				inputFocus: $.proxy(this._inputFocus, this),
				inputBlur: $.proxy(this._inputBlur, this),
				inputClick: $.proxy(this._inputClick, this),
				inputKeyDown: $.proxy(this._inputKeyDown, this),
				inputPaste: $.proxy(this._inputPaste, this),
				inputKeyUp: $.proxy(this._inputKeyUp, this),
				inputKeyPress: $.proxy(this._inputKeyPress, this),
				inputMouseDown: $.proxy(this._inputMouseDown, this),

				// P.P 02-Mar-2016 #212238: Incorrect confirmation of Japanese symbols using IME
				inputCompositionUpdate: $.proxy(this._inputCompositionUpdate, this),

				// P.P 26-Feb-2016 #212236: Incorrect input of Japanese symbols using IME
				inputCompositionEnd: $.proxy(this._inputCompositionEnd, this),
				inputInput: $.proxy(this._inputInputHandler, this)
			};

			this._analyzeOptions();
			this._analyzeInitialElem();
			this._render();
			this.validator();
			this._attachEvents();
			this.dataBind();

			// P.P 07-Mar-2016 #212238: Incorrect confirmation of Japanese symbols using IME
			this._initCompositionObject();
		},
		_analyzeOptions: function () {
			var key, firstDataItem,
				options = this.options,
				$combo = $(this.element),
				lod = options.loadOnDemandSettings;

			if (this.options.dataSource) {
				if ($.isArray(this.options.dataSource)) {
					firstDataItem = this.options.dataSource[ 0 ];
				} else if (this.options.dataSource &&
					typeof this.options.dataSource._xmlToArray === "function" &&
					typeof this.options.dataSource._encodePkParams === "function") {

					// if isIgDataSource
					//isInstanceOfDs = ds && typeof ds._xmlToArray === "function" && typeof ds._encodePkParams === "function";
					firstDataItem = this.options.dataSource.data()[ 0 ];
				}
			}

			// Mode
			if (options.mode !== "editable" && options.mode !== "dropdown" &&
				options.mode !== "readonly" && options.mode !== "readonlylist") {
				options.mode = "editable";
			}

			// Page size
			if (lod && lod.enabled && lod.pageSize && options.loadOnDemandSettings.pageSize < 5) {
				lod.pageSize = 5;
			} else if (lod && lod.enabled && !lod.pageSize) {
				lod.pageSize = this.options.visibleItemsCount + 1;
			}

			// Text key
			if (!options.textKey) {
				if (options.valueKey) {
					options.textKey = options.valueKey;
				} else if (firstDataItem && $.type(firstDataItem) === "object") {

					// Use first data source column
					for (key in firstDataItem) {
						if (firstDataItem.hasOwnProperty(key)) {
							options.textKey = key;
							break;
						}
					}
				}
			}

			// Value key
			if (!options.valueKey) {
				options.valueKey = options.textKey;
			}

			// Use default values when textKey/valueKey are still not set
			if (!options.textKey && !options.valueKey) {
				options.textKey = "text";
				options.valueKey = "value";
			}

			// Filtering type
			if (options.filteringType !== "local" &&
				options.filteringType !== "remote" && options.filteringType !== "none") {
				options.filteringType = "none";
			}

			// Input name
			if ($combo.attr("name") && this._options.originalOptions.inputName === undefined) {
				options.inputName = $combo.attr("name");
			}

			// Multiple attribute
			// JD 6/25/15 - Bug 201623 - The attribute should only apply if multiSelection.enabled was not
			// set by the developer.
			if ($combo.attr("multiple") === "multiple" &&
				(this._options.originalOptions.multiSelection === undefined ||
				this._options.originalOptions.multiSelection.enabled === undefined)) {
				this.options.multiSelection.enabled = true;
			}

			// Right-to-left implementation
			// Z.K 25/08/15 Bug #189210 - When combo is initialized form input with dir="rtl", list is not aligned correct
			if ($combo.attr("dir") === "rtl") {
				this._options.ltr = false;
			}

			if (this.options.grouping.key && firstDataItem &&
				firstDataItem[ this.options.grouping.key ] === undefined) {
				throw new Error(this._getLocaleValue("errorIncorrectGroupingKey"));
			}
		},
		_analyzeInitialElem: function () {
			var element = this.element,
				_options = this._options;

			if (element.is("div") || element.is("span")) {

				// Use the provided div/span as wrapper container
				_options.$comboWrapper = element;
			} else if (element.is("input")) {

				// Use the provided input field for combo"s input
				_options.$input = element;
				_options.nameAttribute = element.attr("name");
				element.removeAttr("name");
			} else if (element.is("select")) {
				element.hide();
				_options.nameAttribute = element.attr("name");
				element.removeAttr("name");
			}
		},
		_setupInput: function () {
			var _options = this._options;

			// Add input"s place holder
			_options.$input.attr({
				"placeholder": this._getLocaleValue("placeHolder"),
				"data-localeid": "placeHolder",
				"data-localeattr": "placeholder"
			});

			if (this.options.mode !== "editable") {
				// Disable editing and selection for non-editable modes
				_options.$input
					.attr({
						"readonly": true,
						"unselectable": "on"
					})
					.addClass(this.css.unselectable);
			}
		},
		_renderHeaderTemplate: function(css, options, parent) {
			var $header, headerClass, $existingHeader;

			headerClass = "." + css.header;
			$existingHeader = parent.find(headerClass);

			// Remove old template
			if ($existingHeader.length) {
				if (typeof options.headerTemplate === "string") {
					$existingHeader.remove();
				}
			}

			$header = $("<div>")
				.addClass(css.header)
				.html(options.headerTemplate);

			$header.prependTo(parent);

			// Preserve refenreces
			this._options.$header = $header;
		},
		_renderFooterTemplate: function(css, options, parent, combo) {
			var $footer, footerMarkup, footerClass, $existingFooter;

			footerClass = "." + css.footer;
			$existingFooter = parent.find(footerClass);

			// Remove old template
			if ($existingFooter.length) {
				if (typeof options.footerTemplate === "string") {
					$existingFooter.remove();
				}
			}

			footerMarkup = options.footerTemplate
					.replace(combo.RECORDS_VIEW,
						"<span class=" + css.recordsView + "></span>")
					.replace(combo.RECORDS_DATA,
						"<span class=" + css.recordsData + "></span>")
					.replace(combo.RECORDS_SERVER,
						"<span class=" + css.recordsServer + "></span>")
					.replace(combo.RECORDS_SERVER_TOTAL,
						"<span class=" + css.recordsServerTotal + "></span>");

			combo._options.hasFooterVariables = footerMarkup !== options.footerTemplate;
			if (combo._options.hasFooterVariables) {
				$footer = $("<div>")
					.addClass(css.footer)
					.html(footerMarkup);

				$footer.appendTo(parent);
				combo._options.$footer = $footer;
				return;
			}

			$footer = $("<div>")
				.addClass(css.footer)
				.html(footerMarkup);

			$footer.appendTo(parent);

			// Preserve references
			this._options.$footer = $footer;
		},
		_render: function () {
			var css = this.css,
				options = this.options,
				_options = this._options,
				$comboWrapper = (_options.$comboWrapper ||
					$("<div>")).addClass(css.comboWrapper),
				$combo = $("<div>").addClass(css.combo).attr("unselectable", "on"),
				$input = (_options.$input ||
					$("<input type='text'>")).addClass(css.field)
					.attr({ tabIndex: options.tabIndex, autocomplete: "off" }),
				$hiddenInput = $("<input type='hidden'>").addClass(css.hiddenField),
				$fieldCont = $("<div>").addClass(css.fieldHolder),
				$clearCont = $("<div>").addClass(css.clear).
					attr({
						unselectable: "on",
						title: this._getLocaleValue("clearButtonTitle"),
						"data-localeid": "clearButtonTitle",
						"data-localeattr": "title"
					}),
				$clearIcon = $("<div>").addClass(css.clearIcon),
				$dropDownBtnCont = $("<div>").addClass(css.button).
					attr({
						unselectable: "on",
						title: this._getLocaleValue("dropDownButtonTitle"),
						"data-localeid": "dropDownButtonTitle",
						"data-localeattr": "title"
					}),
				$dropDownBtnIcon = $("<div>").addClass(css.buttonIcon),
				$dropDownCont = $("<div>").addClass(css.dropDown).width(options.dropDownWidth),
				$dropDownListCont = $("<div>").addClass(css.list),
				$dropDownList = $("<ul>").addClass(css.listItemHolder),
				$dropDownScrollCont = $("<div>").addClass(css.scrollHolder)
					.attr("unselectable", "on"),
				$dropDownScroll = $("<div>").addClass(css.scroll).attr("unselectable", "on"),
				$loading = $("<div>").addClass(css.loading);

			// Set combo mode class
			switch (options.mode) {
				case "dropdown":
					$combo.addClass(css.dropDownMode);
					break;
				case "readonlylist":
					$combo.addClass(css.readOnlyListMode);
					break;
				case "readonly":
					$combo.addClass(css.readOnlyMode);
					$comboWrapper.addClass(css.disabled);
					break;
			}

			// TO DO: Check where this class is used and remove it
			$fieldCont.addClass(css.fieldHolderLTR);

			// Add ltr/rtl classes
			if (!_options.ltr) {
				// Z.K 25/08/15 Bug #189210 - When combo is initialized form input with dir="rtl", list is not aligned correct
				$dropDownList.addClass(css.dropDownListRTL);
				$dropDownBtnCont.addClass(css.buttonRTL);
				$clearCont.addClass(css.clearRTL);
			} else {
				$dropDownBtnCont.addClass(css.buttonLTR);
			}

			if (options.grouping.key) {
				$dropDownList.addClass(css.group);
			}

			// Combine elements
			$clearIcon.appendTo($clearCont);
			$dropDownBtnIcon.appendTo($dropDownBtnCont);
			$dropDownList.appendTo($dropDownListCont);
			$dropDownListCont.appendTo($dropDownCont);

			// Header template
			if (typeof options.headerTemplate === "string") {
				this._renderHeaderTemplate(css, options, $dropDownCont);
			}

			// Footer template
			if (typeof options.footerTemplate === "string") {
				this._renderFooterTemplate(this.css, this.options, $dropDownCont, this);
			}

			if (options.virtualization) {
				$dropDownListCont.addClass(css.listOverflow);
				$dropDownScrollCont.insertBefore($dropDownList);
				$dropDownScroll.appendTo($dropDownScrollCont);
			}

			if (this.element.is("input")) {

				// When rendering on input element we reuse it and wrap all the content around it

				// Wrap the input. Then update the wrapper element's reference
				$input.wrap($fieldCont);
				$fieldCont = $input.parent();

				// Wrap the field container. Then update the wrapper element's reference
				$fieldCont.wrap($combo);
				$combo = $fieldCont.parent();

				// Wrap the combo. Then update the wrapper element's reference
				$combo.wrap($comboWrapper);
				$comboWrapper = $combo.parent();

				// Prepend elements to the main container to ensure the right markup order
				$clearCont.prependTo($combo);
				$dropDownBtnCont.prependTo($combo);
			} else {

				// Combine input and its container
				$input.appendTo($fieldCont);

				// Append the content to main container when rendering on div/span
				$dropDownBtnCont.appendTo($combo);
				$clearCont.appendTo($combo);
				$fieldCont.appendTo($combo);
				$combo.appendTo($comboWrapper);
			}

			$clearCont.hide();

			// Add the hidden input
			$hiddenInput
				.attr("name", options.inputName)
				.appendTo($combo);

			// Close drop down initially and move it out of the screen to avoid wierd bug where 1 px height is still rendered in FFox
			$dropDownCont
				.css({
					height: 0,
					top: -99999,
					left: -99999,
					overflow: "hidden"
				})
				.addClass(css.noBorder);

			if (options.dropDownAttachedToBody) {
				$dropDownCont.appendTo($("body"));
			} else {
				$dropDownCont.appendTo($comboWrapper);
			}

			if (this.element.is("select")) {
				// Ensure adding the main combo element to the dom when initializing on select
				$comboWrapper.insertBefore(this.element);
			}

			// Set wrapper sizes
			// Do not chain these, when called with width of null it won't return the wrapper
			$comboWrapper.outerWidth(options.width);
			$comboWrapper.outerHeight(options.height);

			// Preserve the refenreces
			_options.$comboWrapper = $comboWrapper;
			_options.$combo = $combo;
			_options.$input = $input;
			_options.$hiddenInput = $hiddenInput;
			_options.$fieldCont = $fieldCont;
			_options.$clearCont = $clearCont;
			_options.$clearIcon = $clearIcon;
			_options.$dropDownBtnCont = $dropDownBtnCont;
			_options.$dropDownBtnIcon = $dropDownBtnIcon;
			_options.$dropDownCont = $dropDownCont;
			_options.$dropDownListCont = $dropDownListCont;
			_options.$dropDownList = $dropDownList;
			_options.$loading = $loading;

			// Update input val
			this._setInputVal($input.val());

			if (options.virtualization) {
				_options.$dropDownScrollCont = $dropDownScrollCont;
				_options.$dropDownScroll = $dropDownScroll;
			}

			// Setup input for different combo mode types
			this._setupInput();

			if (options.disabled) {
				this._disableCombo(true);
			}

			this._triggerRendered();
		},
		_itemInnerMarkup: function (data) {
			var unwrappedData, dataItem, unwrappedDataItem;

			// If the data or the data item are observables, we need to unwrap them.
			unwrappedData = this._unwrapData(data);
			dataItem = unwrappedData[ this.options.textKey ];
			unwrappedDataItem = this._unwrapData(dataItem);

			// A.k August 15, 2016 Fixing Bug #223071 - [igCombo] Text from list items is not escaped.
			unwrappedDataItem = this._formatItem(unwrappedDataItem);
			unwrappedDataItem = $.ig.encode(unwrappedDataItem);

			return this.options.itemTemplate ?
				$.ig.tmpl(this.options.itemTemplate, data) : unwrappedDataItem;
		},
		_formatItem: function (item) {
			if ($.ig && $.ig.formatter) {
				if (this.options.format === "auto" &&
					($.type(item) === "date" || $.type(item) === "number")) {
					item = $.ig.formatter(
						item,
						null,
						null,
						null,
						null,
						null,
						null,
						null,
						null,
						$.ig.regional[ this.options.regional ]
					);
				} else if (this._formatEnabled()) {
					item = $.ig.formatter(
						item,
						null,
						this.options.format,
						null,
						null,
						null,
						null,
						null,
						null,
						$.ig.regional[ this.options.regional ]
					);
				}
			}

			return item;
		},
		_formatEnabled: function () {
			return !(this.options.format === "" ||
				this.options.format === null ||
				this.options.format === "none");
		},
		_itemsToRenderCount: function () {
			return this._isPossibleToVirtualize() ?
				this.options.visibleItemsCount :
					this.options.dataSource.dataView().length;
		},
		_sortDataSource: function () {
			var options = this.options;

			options.dataSource.sort([ {
				fieldName: options.grouping.key
			} ], options.grouping.dir);
		},

		// Returns records grouped in following structure:
		// [ {
		//      name: 'group name'
		//      members: [ data source items ]
		// },
		// {
		//      name: 'group name 2'
		//      members: [ data source items ]
		// } ]
		_groups: function (data) {
			var prevGroup, curGroup, curData, len, i,
				options = this.options,
				groupKey = options.grouping.key,
				groups = [ ];

			data = data || options.dataSource.dataView();

			for (i = 0, len = data.length; i < len; i++) {
				curData = data[ i ];

				// S.T. 7th September 2015, #205951: Add check for LOD in group method in case the key is not correct.
				if (curData[ groupKey ] === undefined) {
					throw new Error(this._getLocaleValue("errorIncorrectGroupingKey"));
				}

				curGroup = curData[ groupKey ];

				if (prevGroup === curGroup) {
					groups[ groups.length - 1 ].members.push(curData);
				} else {
					prevGroup = curGroup;

					groups[ groups.length ] = {
						name: curGroup,
						members: [ curData ]
					};
				}
			}

			return groups;
		},
		_itemMarkup: function (data) {
			var css = this.css,
				value = this._unwrapData(this._unwrapData(data)[ this.options.valueKey ]),
				innerMarkup = this._itemInnerMarkup(data),
				markup, escapedValue;

			// Z.K. 27/08/2015 Bug #205313 - Not possible to select item because of illegal special characters encoding
			// R.K. 24 November 2016 #543 - Cannot select an item from drop down list when you set HTML character entity reference to a datasource item
			escapedValue = $.ig.encode(value);
			markup = '<li class="' + css.listItem + '" data-value="' +
				escapedValue + '" unselectable="on">';

			if (this._checkBoxesEnabled()) {
				// S.T. 6th July, 2015 #201924: Construct checkboxes template with the css classes.
				markup += this._options.checkboxItemTemplate
					.replace("{css.checkbox}", css.checkbox)
					.replace("{css.checkboxOff}", css.checkboxOff)
					.replace("{css.listItemTextWithCheckbox}", css.listItemTextWithCheckbox)
					.replace("{innerMarkup}", innerMarkup);
			} else {
				markup += innerMarkup;
			}

			markup += "</li>";

			return markup;
		},
		_itemsMarkup: function () {
			var i,
				dataView = this.options.dataSource.dataView(),
				dataLen = this._itemsToRenderCount(),
				markup = "";

			// Generate <li>'s markup
			for (i = 0; i < dataLen; i++) {
				markup += this._itemMarkup(dataView[ i ]);
			}

			return markup;
		},
		_groupHeaderMarkup: function (groupName) {
			return '<li class="' + this.css.groupHeader + '">' + groupName + "</li>";
		},
		_groupMarkup: function (group) {
			var len, i,
				members = group.members,
				itemsMarkup = "";

			for (i = 0, len = members.length; i < len; i++) {
				itemsMarkup += this._itemMarkup(members[ i ]);
			}

			return this._groupHeaderMarkup(group.name) + itemsMarkup;
		},
		_groupsMarkup: function () {
			var groups, groupsLen, i,
				dataView,
				dataLen = this._itemsToRenderCount(),
				markup = "";

			// Sort the data source to extract all groups
			this._sortDataSource();
			dataView = this.options.dataSource.dataView();

			// Cache the count of all groups in data source
			if (this.options.virtualization && !this._options.cachedGroupLength) {
				this._options.cachedGroupLength = this._groups(dataView).length;
			}

			dataView = dataView.slice(0, dataLen);
			groups = this._groups(dataView);

			// Get group headers count and subtract them from list items when virtualization is enabled
			if (this.options.virtualization) {
				for (i = 0; i < dataLen; i++) {
					if (this._isBoundaryOfGroups(dataView, i)) {
						this._options.initialGroupHeaders++;
						i++;
					}
				}

				dataView = dataView.slice(0, dataLen - this._options.initialGroupHeaders);
				groups = this._groups(dataView);
			}

			for (i = 0, groupsLen = groups.length; i < groupsLen; i++) {
				markup += this._groupMarkup(groups[ i ]);
			}

			return markup;
		},
		_noMatchMarkup: function () {
			return '<li unselectable="on" class="' + this.css.noMatchFound + " " +
				this.css.unselectable + '" data-localeid="noMatchFoundText">' +
					this._getLocaleValue("noMatchFoundText") + "</li>";
		},
		_renderItems: function (success, msg, data) {
			var markup, dropDownScrollHeight, schema, noCancel,
				options = this.options,
				_options = this._options,
				lod = this.options.loadOnDemandSettings,
				dataView = data.dataView(),
				dataLen = this._itemsToRenderCount();

			if (success !== null) {
				this._triggerDataBound(success, msg);
			}

			// Z.K. November 30, 2015 Fixing Bug #209806 - Items do not render when binding to an array of strings provided through the DataSourceUrl
			this._convertToArrayOfObjects(options);

			// Set schema when loading remote url because filtering cannot work withouth it
			if (!options.dataSource.settings.schema && options.dataSource && dataView.length > 0) {
				schema = this._initSchema(this._unwrapData(dataView)[ 0 ]);

				// M.K. February 01, 2015 Fixing Bug #213282 - igDataSource throws unhandled exception when trying to filter
				options.dataSource.settings.schema = schema;
				options.dataSource._initSchema();
			}

			noCancel = this._triggerItemsRendering();

			if (noCancel) {
				if (dataLen > 0) {
					if (options.grouping.key) {
						markup = this._groupsMarkup();
					} else {
						markup = this._itemsMarkup();
					}
				} else {
					markup = this._noMatchMarkup();
				}

				// Render items
				_options.$dropDownList.html(markup);

				// K.D. March 3rd, 2015 Bug #188582 When filtering is remote the noMatchFoundText is not visible
				if (dataLen > 0) {
					this._setListContMaxHeight();
				}

				// Set scroll container height
				if (options.virtualization) {
					dropDownScrollHeight = data.totalLocalRecordsCount() * this._itemHeight();

					_options.$dropDownScroll.height(dropDownScrollHeight);

					// Scrollbar is not shown in IE, FF and some touch devices
					// D.A. 19th March 2015, Bug #190783 In Nexus virtualization does not have scroll bar
					_options.$dropDownScrollCont.width($.ig.util.getScrollWidth() + 1);
					this._updateVirtualScrollVisibility();

					// R.K. 22nd of February #830: igCombo not loading on demand with small pageSize
					if (lod && lod.enabled && lod.pageSize <= options.visibleItemsCount) {
						_options.$dropDownScroll.height(dropDownScrollHeight + this._itemHeight());
						_options.$dropDownScrollCont.removeClass(this.css.hidden);
					}
				}

				this._updateFooterVariables();

				if (_options.initialDataBinding) {
					this._handleInitialSelection();
					_options.initialDataBinding = false;
				}

				this._triggerItemsRendered();
			}
		},
		_handleRemoteFiltering: function (success, msg, data) {
			var $items, selectedData,
				_options = this._options,
				event = _options.remoteFilteringTriggerEvt;

			// Rerender items with filtered data
			this._renderItems(success, msg, data);

			// Z.K. 5th June 2015, Bug #200749 When combo is in buttom of the page and filter ant then clear filter the page scroll is changed for a second
			this.positionDropDown();
			$items = this._$items();

			// Reapply selection
			selectedData = _options.selectedData;
			_options.selectedData = [ ];

			this._selectData(selectedData, {
				focusCombo: true,

				// Keep filtering to avoid triggering infinite filtering recursion
				keepFiltering: true,
				keepInputText: true,
				keepNavItem: true
			});

			// Apply auto selected item / active item
			this._updateSelection(event);
			this._updateAutoComplete();

			// Reapply navigation item
			if (_options.keyNavItemData && !this._isDataSelected(_options.keyNavItemData)) {
				this._setKeyNavigationItem({
					data: _options.keyNavItemData,
					addStyles: true,
					resetDataOnNonFound: true
				});
			}

			// D.A., 9th March 2015, Bug #189997 When remote filtering is enabled, input values are not updated when closing the drop down
			if (_options.updateInputValuesOnRemoteFilter) {
				this._updateInputValues();

				// D.A. 12th May 2015, Bug #193546 When filtering is remote and close list and open it again items are still highlighted
				this._updateHighlighting();
				_options.updateInputValuesOnRemoteFilter = false;
			}

			if (_options.inputVal) {
				this._showClearButton();
			} else {
				this._hideClearButton();
			}

			this._updateFooterVariables();

			if (_options.validator) {
				_options.validator._validateInternal(this.element, event);
			}

			// Trigger filtered
			if (event) {
				this._triggerFiltered(event);
				_options.remoteFilteringTriggerEvt = null;
			}
		},
		_handleLocalFilteringWithVirt: function (data) {
			var $items, selectedData,
				_options = this._options;

			this._renderItems(null, null, data);

			// Z.K. 5th June 2015, Bug #200749 When combo is in buttom of the page and filter ant then clear filter the page scroll is changed for a second
			this.positionDropDown();
			$items = this._$items();

			// Reapply selection
			selectedData = _options.selectedData;
			_options.selectedData = [ ];

			this._selectData(selectedData, {
				focusCombo: true,

				// Keep filtering to avoid triggering infinite filtering recursion
				keepFiltering: true,
				keepInputText: true
			});

			// Reapply highlighting
			this._updateHighlighting();
		},
		_handleLoadOnDemand: function (err, success, data) {
			var $items, selectedData,
				_options = this._options;

			this._renderItems(err, success, data);

			// Z.K. 5th June 2015, Bug #200749 When combo is in buttom of the page and filter ant then clear filter the page scroll is changed for a second
			this.positionDropDown();
			$items = this._$items();

			// Reapply selection
			selectedData = _options.selectedData;
			_options.selectedData = [ ];

			this._selectData(selectedData, {
				focusCombo: true,

				// Keep filtering to avoid triggering infinite filtering recursion
				keepFiltering: true,
				keepInputText: true,
				keepScrollPosition: true
			});

			// Reapply highlighting
			this._updateHighlighting();

			// Reapply navigation item
			if (this.options.multiSelection.enabled && _options.keyNavItemData &&
				!this._isDataSelected(_options.keyNavItemData)) {
				this._setKeyNavigationItem({
					data: _options.keyNavItemData,
					addStyles: true
				});
			}

			// D.A. 9th March 2015, Bug #190032 Filtering should not be reapplied if it was previously cleared
			// When filtering is remote the newly loaded items are loaded filtred
			if (this.options.filteringType !== "remote" && _options.expression) {

				// Reapply filtering
				this._updateFiltering();
			}

			this._updateFooterVariables();
		},

		// Updates group header item according to new data
		_updateGroupHeader: function ($item, data) {
			if (this.options.grouping.key && this._isItem($item)) {
				this._setVisualStylesToGroupHeader($item);
			}

			this._updateMarkupForGroupHeader($item, data);
			$item.attr("data-value", null);
			return this;
		},

		// Updates item according to new data
		_updateItem: function ($item, data) {
			var unwrappedDataItem, unwrappedDataValue,
				innerMarkup = this._itemInnerMarkup(data);

			if (this.options.grouping.key && this._isGroupHeader($item)) {
				this._setVisualStylesToItem($item);

				// S.T. 6th July, 2015 #201924: If we the item was a group, we need to restore checkbox markup.
				if (this._checkBoxesEnabled()) {
					$item.html(this._options.checkboxItemTemplate
						.replace("{css.checkbox}", this.css.checkbox)
						.replace("{css.checkboxOff}", this.css.checkboxOff)
						.replace("{css.listItemTextWithCheckbox}",
							this.css.listItemTextWithCheckbox)
						.replace("{innerMarkup}", "")
					);
				}
			}

			this._updateMarkupForItem($item, innerMarkup);

			// Update data value
			unwrappedDataItem = this._unwrapData(data);
			unwrappedDataValue = this._unwrapData(unwrappedDataItem[ this.options.valueKey ]);
			$item.attr("data-value", unwrappedDataValue);

			return this;
		},

		// Z.K. 9th July 2015 Bug #202450 - "&nbsp;" displayed instead of blank value
		_removePlaceholderOnEmptyTextVal: function () {
			var _options = this._options,
				placeholderAttr = _options.$input.attr("placeholder");

			if (_options.inputVal === "" && _options.selectedData.length > 0 &&
				(typeof placeholderAttr !== typeof undefined || placeholderAttr !== false)) {
				_options.$input.removeAttr("placeholder");
			}

		},

		// Z.K. 9th July 2015 Bug #202450 - "&nbsp;" displayed instead of blank value
		_addPlaceholderWhenEmptyTextVal: function () {
			var _options = this._options,
				placeholderAttr = _options.$input.attr("placeholder");

			if (_options.inputVal === "" && _options.selectedData.length === 0 &&
				(typeof placeholderAttr === typeof undefined || placeholderAttr === false)) {
				_options.$input.attr({
					"placeholder": this.options.placeHolder,
					"data-localeid": "placeHolder",
					"data-localeattr": "placeholder"
				});
			}
		},
		_convertToArrayOfObjects: function (options) {
			var curData, len, i, ds;

			if ($.type(options.dataSource) === "object" && (options.dataSource._data !== null &&
				options.dataSource._data !== undefined)) {
				ds = options.dataSource._data;
			} else {
				ds = options.dataSource;
			}

			if ($.type(ds) === "array" && ($.type(ds[ 0 ]) === "number" ||
				$.type(ds[ 0 ]) === "string" || $.type(ds[ 0 ]) === "date")) {
				for (i = 0, len = ds.length; i < len; i++) {
					curData = ds[ i ];

					ds[ i ] = {};
					ds[ i ][ options.textKey ] = curData;
					ds[ i ][ options.valueKey ] = curData;
				}
			}
		},
		_isGroupHeader: function ($item) {
			return $item.hasClass(this.css.groupHeader);
		},
		_isItem: function ($item) {
			return $item.hasClass(this.css.listItem);
		},
		_setVisualStylesToGroupHeader: function ($item) {
			$item.removeClass(this.css.listItem);
			$item.addClass(this.css.groupHeader);
		},
		_setVisualStylesToItem: function ($item) {
			$item.removeClass(this.css.groupHeader);
			$item.addClass(this.css.listItem);
		},
		_updateMarkupForGroupHeader: function ($item, data) {

			// S.T. 1th July 2015, Bug #201839: Check for undefined values.
			if (this.options.grouping.key && data[ this.options.grouping.key ] !== undefined) {
				$item.html(data[ this.options.grouping.key ]);
			}
		},
		_updateMarkupForItem: function ($item, innerMarkup) {

			// Update markup for item
			if (this._checkBoxesEnabled()) {
				$item.find("." + this.css.listItemTextWithCheckbox).html(innerMarkup);
			} else {
				$item.html(innerMarkup);
			}
		},
		_$items: function (includeGroupHeaders) {
			var selector = "." + this.css.listItem.split(" ", 1)[ 0 ];

			if (this.options.grouping.key && includeGroupHeaders) {
				selector += ",." + this.css.groupHeader.split(" ", 1)[ 0 ];
			}

			return this._options.$dropDownList.children(selector);
		},

		// D.G. 24th November 2015 #Bug 209232: Returns no match item by selector
		_$noMatchFoundItem: function () {
			var selector = "." + this.css.noMatchFound;

			return this._options.$dropDownList.children(selector);
		},
		_$filteredItems: function () {
			return this._$items().not("." + this.css.hidden);
		},

		// Returns jquery object with item/items by data or array of data
		_$elementFromData: function (data, $items) {
			var curData, i, len,
				valueKey = this.options.valueKey,
				values = [ ];

			$items = $items || this._$items();

			// Handle data as array
			if ($.type(data) !== "array") {
				data = [ data ];
			}

			for (i = 0, len = data.length; i < len; i++) {
				curData = data[ i ];

				if (curData !== null && curData !== undefined) {
					values.push(curData[ valueKey ]);
				}
			}

			return this._$elementFromValue(values, $items);
		},

		// Returns jquery object with item/items by value or array of values
		_$elementFromValue: function (value, $items) {
			var i, currentValue,
				result = $();

			$items = $items || this._$items();

			// Handle value as array
			if ($.type(value) !== "array") {
				value = [ value ];
			}

			for (i = 0; i < value.length; i++) {

				// Z.K. December 30, 2015 Fixing Bug #205313 - Not possible to select item because of illegal special characters encoding in jQuery version 1.11.1
				currentValue = value[ i ];

				if (value[ i ]) {
					currentValue = $.ig.util.escapeStr(value[ i ].toString());
				}

				result = result.add($items.filter("[ data-value='" + currentValue + "' ]"));
			}

			return result;
		},

		// Returns jquery object with all elements from item or array with items { element, data }
		_$elementsFromItems: function (items) {
			var i,
				result = $();

			if ($.type(items) !== "array") {
				items = [ items ];
			}

			for (i = 0; i < items.length; i++) {
				result = result.add(items[ i ].element);
			}

			return result;
		},

		// Returns jQuery object with the rendered selected items
		_$selectedItems: function () {
			var i,
				selItems = this.selectedItems(),
				$selItems = $(),
				len = selItems.length;

			for (i = 0; i < len; i++) {
				$selItems = $selItems.add(selItems[ i ].element);
			}

			return $selItems;
		},
		_isDataEqual: function (data1, data2) {
			var data1Value, data2Value;

			if (data1 !== null && data1 !== undefined && data2 !== null && data2 !== undefined) {
				data1Value = this._unwrapData(this._unwrapData(data1)[ this.options.valueKey ]);
				data2Value = this._unwrapData(this._unwrapData(data2)[ this.options.valueKey ]);

				return data1Value === data2Value;
			}

			return false;
		},
		_isDataSelected: function (data) {
			return this.isValueSelected(data[ this.options.valueKey ]);
		},
		_filterData: function (data1, data2) {
			var data2Len,
				self = this;

			if ($.type(data1) !== "array") {
				data1 = [ data1 ];
			}

			if ($.type(data2) !== "array") {
				data2 = [ data2 ];
			}

			data2Len = data2.length;

			return data1.filter(function (data) {
				var i;

				for (i = 0; i < data2Len; i++) {
					if (self._isDataEqual(data, data2[ i ])) {
						return false;
					}
				}

				return true;
			});
		},

		// Filters items2 from items1
		_filterItems: function (items1, items2) {
			var result,
				valKey = this.options.valueKey,
				self = this;

			result = items1.filter(function (item) {
				var i, unwrappedDataItem, unwrappedDataValue,
					unwrappedDataItemToCompare, unwrappedDataValueToCompare,
					matchFound = false;

				unwrappedDataItem = self._unwrapData(item.data);
				unwrappedDataValue = self._unwrapData(unwrappedDataItem[ valKey ]);

				for (i = 0; i < items2.length && !matchFound; i++) {
					unwrappedDataItemToCompare = self._unwrapData(items2[ i ].data);
					unwrappedDataValueToCompare =
						self._unwrapData(unwrappedDataItemToCompare[ valKey ]);

					if (unwrappedDataValue === unwrappedDataValueToCompare) {
						matchFound = true;
					}
				}

				return !matchFound;
			});

			return result;
		},

		// Returns array with values for the given data object
		_valuesFromData: function (data) {
			var unwrappedDataItem, unwrappedDataValue, i,
				len = data.length,
				valKey = this.options.valueKey,
				values = [ ];

			for (i = 0; i < len; i++) {
				unwrappedDataItem = this._unwrapData(data[ i ]);
				unwrappedDataValue = this._unwrapData(unwrappedDataItem[ valKey ]);

				values.push(unwrappedDataValue);
			}

			return values;
		},

		// Returns array of values for the specified jquery object with list items
		_valuesFromElements: function ($items) {
			var i,
				values = [ ];

			for (i = 0; i < $items.length; i++) {
				values.push($items.eq(i).attr("data-value"));
			}

			return values;
		},

		// Returns array of values from item or array of items { element, data }
		_valuesFromItems: function (item) {
			var i, unwrappedDataItem, unwrappedDataValue,
				values = [ ],
				valueKey = this.options.valueKey;

			if (!item) {
				return;
			}

			// Handle item as array
			if ($.type(item) !== "array") {
				item = [ item ];
			}

			for (i = 0; i < item.length; i++) {
				unwrappedDataItem = this._unwrapData(item[ i ].data);
				unwrappedDataValue = this._unwrapData(unwrappedDataItem[ valueKey ]);
				values.push(unwrappedDataValue);
			}

			return values;
		},

		// Returns array with data from the given items { element, data }
		_dataFromItems: function (items) {
			var len, i,
				data = [ ];

			for (i = 0, len = items.length; i < len; i++) {
				data.push(items[ i ].data);
			}

			return data;
		},
		_dataFromIndex: function (index) {
			var data = this.options.dataSource.data();

			return data.length > index ? data[ index ] : null;
		},
		_dataForValues: function (value) {
			var data, i, len,
				result = [ ];

			if ($.type(value) !== "array") {
				value = [ value ];
			}

			for (i = 0, len = value.length; i < len; i++) {
				data = this.dataForValue(value[ i ]);

				if (data !== null) {
					result.push(data);
				}
			}

			return result;
		},

		// Finds index of data in data source by value
		_dataIndexByValue: function (value, searchDataViewOnly) {
			var unwrappedDataItem, unwrappedDataValue, i,
				result = -1,
				data = searchDataViewOnly ?
					this.options.dataSource.dataView() :
						this.options.dataSource.data(),
				len = data.length,
				valKey = this.options.valueKey;

			for (i = 0; i < len; i++) {
				unwrappedDataItem = this._unwrapData(data[ i ]);
				unwrappedDataValue = this._unwrapData(unwrappedDataItem[ valKey ]);

				if (this._areValuesEqual(unwrappedDataValue, value)) {
					result = i;
					break;
				}
			}

			return result;
		},

		// Keeping the function private to ensure always calling it with correct
		// parameters and faster execution time for large amount of data
		// Param "data" can be single data or array of data
		_itemsFromData: function (data) {
			var curData, len, i,
				$items = this._$items(),
				result = [ ];

			// Handle data as array
			if ($.type(data) !== "array") {
				data = [ data ];
			}

			for (i = 0, len = data.length; i < len; i++) {
				curData = data[ i ];

				if (curData !== null && curData !== undefined) {
					result.push({
						element: this._$elementFromData(curData, $items),
						data: curData
					});
				}
			}

			return result.length > 0 ? result : null;
		},
		_$keyNavItem: function () {
			return this._$elementFromData(this._options.keyNavItemData);
		},
		_updateFooterVariables: function () {
			var ds, recordsView, recordsData, recordsServer, recordsServerTotal;

			if (this._options.hasFooterVariables) {
				ds = this.options.dataSource;
				recordsView = ds.dataView().length;
				recordsData = ds.data().length;
				recordsServer = Math.max(ds.totalRecordsCount(), recordsData);
				recordsServerTotal = Math.max(recordsServer,
					parseInt(this._options.totalAll || 0, 10));

				this._options.$footer
					.find("." + this.css.recordsView)
					.html(recordsView);

				this._options.$footer
					.find("." + this.css.recordsData)
					.html(recordsData);

				this._options.$footer
					.find("." + this.css.recordsServer)
					.html(recordsServer);

				this._options.$footer
					.find("." + this.css.recordsServerTotal)
					.html(recordsServerTotal);
			}
		},

		// Focus combo and set carret to text input's end
		_moveCaretToInputEnd: function (preventItemSeparatorOnFocus) {
			var range,
				input = this._options.$input[ 0 ],
				readonly = this._options.$input.attr("readonly");

			// H.A. 30/05/2016 Bug #219635 - Caret moves to combo input end if deleting a symbol that is not the last
			if (document.activeElement === input) {
				return;
			}

			// J.D. July 8, 2015 - Bug #193837 IME input does not function properly when filtering in Chrome.
			// D.A. 6th March 2015, Bug #190025 In IE typing in the input closes the list
			// Note: IE executes the blur handler after the method has finished and preventInputBlur is false
			// Blur is required for chrome to move the carret
			//if ($.ig.util.isWebKit && this._options.$input.is(":focus")) {
			//    this._options.preventInputBlur = true;
			//    input.blur();
			//}

			// D.A. 20th March 2015, Bug #190591 In Chrome when mode is dropdown and selecting an item, the carret is not moved and the selected element is not visible
			// Remove readonly during the focus
			if (readonly) {
				this._options.$input.removeAttr("readonly");
			}

			// Setting the range without focus won't work in most browsers
			this._safeFocusInput(preventItemSeparatorOnFocus);

			// T.I. Feb 3 2016, Bug #210949 - When clicking on format list and font size dropdowns it loses text selection on Edge
			if (typeof input.selectionStart === "number" && !$.ig.util.isIE && !$.ig.util.isEdge) {
				if (!this._options.ltr && this._options.selectedData.length > 0) {
					input.selectionStart = input.selectionEnd =
						this._options.selectedData[ this._options.selectedData.length - 1 ][
							this.options.textKey ].length;
				} else {
					input.selectionStart = input.selectionEnd = input.value.length;
				}
			}

			// JD Sept 1, 2015, TFS 205346 IE throws an unhandled exception whenever attempting to modify range when the input is not visible
			// JD Sept 2, 2015, TFS 201580 IE treats an input with a range specified as editable even if readonly is applied
			else if (typeof input.createTextRange !== "undefined" &&
				$(input).is(":visible") && !readonly) {
				range = input.createTextRange();
				range.collapse(false);
				range.select();
			}

			// Reapply readonly attribute
			if (readonly) {
				this._options.$input.attr("readonly", readonly);
			}
		},
		_refreshVisualStylesForItem: function ($item, data) {
			var isSelected = this._isDataSelected(data);

			// Update selected style
			if (isSelected) {
				this._addItemSelectionStyles($item);
			} else {
				this._removeItemSelectionStyles($item);
			}

			if (this.options.multiSelection.enabled) {

				// Update active style
				if (this._isDataEqual(this._options.keyNavItemData, data) && !isSelected) {
					$item.addClass(this.css.itemInFocus);
				} else {
					$item.removeClass(this.css.itemInFocus);
				}
			}
		},
		_handleInitialSelection: function () {
			var curSelItem, selectOptions, selectedOptions, curIndex, i, curDataItem,
				selItems = this.options.initialSelectedItems,
				data = this.options.dataSource.data(),
				dataToSel = [ ],
				mode = this.options.mode;

			// Handle selectedItems option
			if ($.type(selItems) === "array") {
				for (i = 0; i < selItems.length; i++) {
					curSelItem = selItems[ i ];
					curIndex = curSelItem.index;

					if (curIndex >= 0 && data.length >= curIndex) {
						curDataItem = data[ curIndex ];
					} else if (curSelItem.value !== undefined && curSelItem.value !== null) {
						curDataItem = this.dataForValue(curSelItem.value);
					}

					// JD Sept 2, 2015 TFS 202202 Prevent duplication of selected items by seeing if they are already in the array
					if (curDataItem && dataToSel.indexOf(curDataItem) === -1) {
						dataToSel.push(curDataItem);
					}
				}
			}

			// Handle select element with <option selected>
			if (this.element.is("select")) {
				selectOptions = this.element.find("option");

				// In select element the first value is selected by default. So this will always select value
				selectedOptions = selectOptions.filter(":selected");

				for (i = 0; i < selectedOptions.length; i++) {
					dataToSel.push(data[ selectOptions.index(selectedOptions.eq(i)) ]);
				}
			}

			// S.T. 24th Sept 2015, Bug #207020: Extract a method for selecting.
			this._selectFirstItemInNonEditableModes(mode, dataToSel, data);
		},
		_selectFirstItemInNonEditableModes: function (mode, dataToSel, data) {

			// Select first item when no items are selected in non editable modes
			// D.A. 17th March 2015, Bug #190579 Initial item should be always selected when mode is drop down and selection is single
			if (((mode === "dropdown" && !this.options.multiSelection.enabled) ||
				mode === "readonly" || mode === "readonlylist") &&
				dataToSel.length === 0) {

				// D.A. 17th March 2015, Bug #190600 Binding to null data source throws exception
				if (data[ 0 ] !== null && data[ 0 ] !== undefined) {
					dataToSel.push(data[ 0 ]);
				}
			}

			if (dataToSel.length > 0) {
				this._selectData(dataToSel, {
					additive: true,
					keepScrollPosition: true
				});
			}
		},
		_checkBoxesEnabled: function () {
			return this.options.multiSelection.enabled &&
				this.options.multiSelection.showCheckboxes;
		},
		_isPossibleToVirtualize: function () {
			return this.options.virtualization &&
				this.options.dataSource.dataView().length > this.options.visibleItemsCount;
		},
		_areItemsLowerInVir: function () {
			return this.options.virtualization &&
				this.options.dataSource.dataView().length <= this.options.visibleItemsCount;
		},
		_dropDownHeight: function (itemHeight, allItemsCount) {
			return itemHeight * allItemsCount;
		},
		_itemHeight: function () {
			return this._$items().first().outerHeight();
		},
		_isFilteringEnabled: function () {
			return this.options.filteringType !== "none";
		},
		_updateItems: function (offset) {

			// elementIndex handles the index of the DOM element
			// itemIndex handles the index of the data value
			var elementIndex, lengthOfElements, itemIndex, $this, curData,
				self = this,
				options = this.options,
				dataView = options.dataSource.dataView(),
				$items = this._$items(true),
				realOffset = 0;

			offset = offset > 0 ? offset : 0;
			this._unhighlight();

			// For grouping we have group headers elements that are part of item elements
			// and we should be aware of that when items are iterating.
			for (elementIndex = 0, itemIndex = 0, lengthOfElements = $items.length;
				elementIndex < lengthOfElements; elementIndex++) {

				// Get element from list items
				$this = $items.eq(elementIndex);
				realOffset = itemIndex + offset;
				curData = dataView[ realOffset ];

				// We have to update the item to group header if it's between two groups.
				// First element in the list should be always a group header
				if (curData && this.options.grouping.key &&
					(self._isBoundaryOfGroups(dataView, realOffset) ||
						self._isFirstItem(dataView, realOffset))) {
					this
						._updateGroupHeader($this, curData)
						._refreshVisualStylesForItem($this, curData[ options.grouping.key ]);
					elementIndex++;

					// Get next DOM element from the list in order to update the item with data
					$this = $items.eq(elementIndex);
				}

				if ($this) {
					this
						._updateItem($this, curData)
						._refreshVisualStylesForItem($this, curData);
				}

				itemIndex++;
			}

			this._updateHighlighting();
		},
		_isFirstItem: function (data, itemIndex) {
			if (!data[ itemIndex - 1 ]) {
				return true;
			}

			return false;
		},
		_isBoundaryOfGroups: function (data, itemIndex) {
			if (this.options.grouping.key && data[ itemIndex - 1 ] &&
				(data[ itemIndex - 1 ][ this.options.grouping.key ] !==
					data[ itemIndex ][ this.options.grouping.key ])) {
				return true;
			}

			return false;
		},
		_toggleDropDownState: function (event) {
			if (this._options.dropDownOpened) {
				this.closeDropDown(null, event);
			} else {

				// Z.K. Fixing Bug #212934 - Keyboard shouldnt be shown when using 'dropdown' mode on touch device
				this.openDropDown(null, this._focusInInputWhenUsingTouchDevice(), event);
			}
		},
		_lastValAfterItemSep: function () {
			return this._options.inputVal.split(this.options.multiSelection.itemSeparator).pop();
		},
		_startsWith: function (text, fragment) {
			return fragment !== "" && text.indexOf(fragment) === 0;
		},

		// Returns number representing how many chars in the end of text match the item separator
		_endsPartialyWithItemSep: function (text) {
			var separator = this.options.multiSelection.itemSeparator,
				i = separator.length,
				matchFound = 0;

			for (; i > 0 && !matchFound; i--) {
				if (text.endsWith(separator.slice(0, i))) {
					matchFound = i;
				}
			}

			return matchFound;
		},

		// Filters text ending with part of the item separator
		// E.g. item separator is ', '. Given text 'Jon,' returns 'Jon'
		_filterItemSeparator: function (text) {
			return text.slice(0, text.length - this._endsPartialyWithItemSep(text));
		},

		// Returns array with values filtered from item separator
		_separatedInputTexts: function () {
			var result = this._options.inputVal.split(this.options.multiSelection.itemSeparator);

			// Filter last item in case it ends partially with the item separator
			result[ result.length - 1 ] = this._filterItemSeparator(result[ result.length - 1 ]);

			return result;
		},
		_updateSelection: function (event) {
			var textsLen, dataLen, curText, curData, curDataValue, curDataText,
				setAsKeyNav, matchFound, isLastText, unwrappedData, i, j,
				options = this.options,
				_options = this._options,
				texts = _options.inputVal,
				data = options.dataSource.data(),
				textKey = options.textKey,
				valueKey = options.valueKey,
				justSelectedData = [ ],
				multiSelect = options.multiSelection.enabled;

			// When filtering is remote also look in the cached data
			if (options.filteringType === "remote") {

				// D.A. June 15th, 2015 Bug #201117 Records that are duplicated both in cachedData and data, should be filtered
				data = this._filterData(_options.cachedData, data).concat(data);
			}

			dataLen = data.length;

			if (multiSelect) {
				texts = this._separatedInputTexts(texts);
			} else {
				texts = [ texts ];
			}

			if (options.autoSelectFirstMatch) {

				// Reset autoSelectedItem upon new auto selection
				_options.autoSelectedItemData = null;
			}

			unwrappedData = this._unwrapData(data);

			// Loop through all input texts
			for (i = 0, textsLen = texts.length; i < textsLen; i++) {
				curText = texts[ i ];
				matchFound = false;
				isLastText = i === textsLen - 1;

				if (!options.caseSensitive) {
					curText = curText.toLowerCase();
				}

				// Loop through all items
				for (j = 0; j < dataLen && !matchFound; j++) {
					curData = this._unwrapData(unwrappedData[ j ]);
					curDataText = this._unwrapData(curData[ textKey ]).toString();
					curDataValue = this._unwrapData(curData[ valueKey ]);
					setAsKeyNav = isLastText && !this.isValueSelected(curDataValue);

					if (!options.caseSensitive) {
						curDataText = curDataText.toLowerCase();
					}

					if (options.autoSelectFirstMatch) {
						if (this._startsWith(curDataText, curText)) {
							if (multiSelect) {

								// Select unselected matching item with multi selection enabled
								if (this._filterData(curData, justSelectedData).length === 1) {
									if (setAsKeyNav) {

										// Navigate to the last matching item when
										// multi selection is enabled instead of selecting it
										this._setKeyNavigationItem({
											data: curData,
											addStyles: true,
											clearPrevItem: true,
											scrollToItem: true
										});
									} else {

										// Select the item, keep input text unchanged
										this._selectData(curData, {
											additive: true,
											focusCombo: true,
											keepInputText: true,
											keepHighlighting: true,
											keepFiltering: true
										}, event);
									}

									matchFound = true;

									// Z.K September 9, 2015 Bug #205950 - When multy selection is enabled auto complete does not match correct item
									if (curDataText !== curText) {
										_options.autoSelectedItemData = curData;
									}
								}

								// JD Sept 2, 2015 TFS194605 - Adding in the use of autoSelectedItemData so that values can be autocompleted
								//if (curDataText !== curText) {
								//	_options.autoSelectedItemData = curData;
								//}

								// Last text is not being selected
								if (!setAsKeyNav) {
									justSelectedData.push(curData);
								}
							} else {

								// Select the item, keep input text unchanged
								this._selectData(curData, {
									focusCombo: true,
									keepInputText: true,
									keepHighlighting: true,
									keepFiltering: true
								}, event);

								// On full match the item shouldn't be considered as auto selected
								if (curDataText !== curText) {
									_options.autoSelectedItemData = curData;
								}

								matchFound = true;
								justSelectedData.push(curData);
							}
						}
					} else if (curDataText === curText) {
						if (multiSelect) {

							// Select unselected matching item with multi selection enabled
							if (this._filterData(curData, justSelectedData).length === 1) {
								if (setAsKeyNav) {

									// Navigate to the last matching item when
									// multi selection is enabled instead of selecting it
									this._setKeyNavigationItem({
										data: curData,
										addStyles: true,
										clearPrevItem: true,
										scrollToItem: true
									});
								} else {
									this._selectData(curData, {
										additive: true,
										focusCombo: true,
										keepInputText: true,
										keepHighlighting: true,
										keepFiltering: true
									}, event);
								}

								matchFound = true;
							}

							// Last text is not being selected
							if (!setAsKeyNav) {
								justSelectedData.push(curData);
							}
						} else {
							this._selectData(curData, {
								additive: true,
								focusCombo: true,
								keepInputText: true,
								keepHighlighting: true,
								keepFiltering: true
							}, event);

							matchFound = true;
							justSelectedData.push(curData);
						}
					}
				}
			}

			// Deselect all remaining items
			this._deselectData(this._filterData(_options.selectedData, justSelectedData), {
				focusCombo: true,
				keepInputText: true
			}, event);

			// Update input values after inserting item separator
			if (multiSelect && _options.inputVal.endsWith(options.multiSelection.itemSeparator)) {
				this._updateInputValues(false);
			}

			this._updateHighlighting();
		},

		// Updates the auto complete according to the value in the text input
		_updateAutoComplete: function () {
			var text, curData, curDataText, unwrappedData, i,
				options = this.options,
				_options = this._options,
				texts = _options.inputVal,
				data = options.dataSource.data(),
				dataLen = data.length,
				textKey = options.textKey,
				multiSelect = options.multiSelection.enabled;

			if (multiSelect) {
				texts = this._options.inputVal.split(options.multiSelection.itemSeparator);
			} else {
				texts = [ texts ];
			}

			// Avoid auto completing a selected element
			if (texts.length > this._fullySelectedItemsLen()) {
				// Auto complete by the last text value
				text = texts[ texts.length - 1 ];

				// D.A. 29th May, 2015 Bug #194604 When multiSelection is enabled and type "," after the text, autocomplete is not correct
				if (multiSelect && this._endsPartialyWithItemSep(text)) {
					return;
				}

				if (!options.caseSensitive) {
					text = text.toLowerCase();
				}

				if (_options.autoSelectedItemData) {

					// Auto selected item matches the item that should be auto completed
					_options.autoCompleteItemData = _options.autoSelectedItemData;
					this._autoComplete(_options.autoCompleteItemData[ textKey ]
						.toString().slice(text.length));
				} else {

					// Handle autoSelectFirstMatch: false
					// Auto complete should be handled separately when auto select first match is disabled, to avoid cases where we don't want
					// to auto complete item with the first match when there is full match later on in the data source, that would be selected instead
					for (i = 0; i < dataLen; i++) {
						unwrappedData = this._unwrapData(data);
						curData = this._unwrapData(unwrappedData[ i ]);
						curDataText = this._unwrapData(curData[ textKey ]).toString();

						if (!options.caseSensitive) {
							curDataText = curDataText.toLowerCase();
						}

						if (!(curData !== _options.autoSelectedItemData &&
							this._isDataSelected(curData)) &&
							this._startsWith(curDataText, text)) {
							_options.autoCompleteItemData = curData;

							// Auto complete with non modified / non lower cased value
							this._autoComplete(
								this._unwrapData(curData[ textKey ])
									.toString().slice(text.length));
							break;
						}
					}
				}
			}
		},

		// Auto completes the input value with given text
		_autoComplete: function (autoCompleteText) {
			var oldInputVal, newInputVal;

			// P.P 07-Mar-2016 #212238: Incorrect confirmation of Japanese symbols using IME
			if (this.options.autoComplete && this._options.composition.isAutocompleteNeeded()) {
				oldInputVal = this._options.inputVal;
				newInputVal = oldInputVal + autoCompleteText;

				// P.P 26-Feb-2016 #212236: Incorrect input of Japanese symbols using IME
				this._options.composition.autocompleteText = autoCompleteText;
				this._options.composition.inputVal = oldInputVal;

				// Set auto completed input value
				this._options.$input.val(newInputVal);

				// Select the auto completed part
				this._setInputSelection(oldInputVal.length, newInputVal.length);
			}
		},

		// Set selection to input text field
		_setInputSelection: function (start, end) {
			var selRange,
				field = this._options.$input[ 0 ];

			if (field.createTextRange) {
				selRange = field.createTextRange();
				selRange.collapse(true);
				selRange.moveStart("character", start);
				selRange.moveEnd("character", end);
				selRange.select();
				field.focus();
			} else if (field.setSelectionRange) {
				field.focus();
				field.setSelectionRange(start, end);
			} else if (typeof field.selectionStart !== "undefined") {
				field.selectionStart = start;
				field.selectionEnd = end;
				field.focus();
			}
		},
		_hasInputSelection: function () {
			var field = this._options.$input[ 0 ],
				result = false;

			if (typeof field.selectionStart !== "undefined") {
				result = field.selectionStart !== field.selectionEnd;
			}

			return result;
		},
		_scrollToItem: function (data) {
			var listContHeight, listContTop, listContScrollTop, itemTop, itemHeight, itemIndex,
				$item = this._$elementFromData(data);

			if (this._options.dropDownOpened) {
				if ($item.length > 0) {
					listContHeight = this._options.$dropDownListCont.height();
					listContTop = this._options.$dropDownListCont.offset().top;
					listContScrollTop = this.listScrollTop();
					itemTop = $item.offset().top;
					itemHeight = $item.outerHeight();

					// Change scroll top only when the item is not in the visible area
					if (!(itemTop > listContTop &&
						itemTop + itemHeight < listContHeight + listContTop)) {
						this.listScrollTop(itemTop + listContScrollTop + itemHeight -
							listContTop - listContHeight);
					}
				} else if (this.options.virtualization) {
					itemIndex = this._dataIndexByValue(data[ this.options.valueKey ]);

					// S.T. 1th Sept 2015, Bug 202891: Adjust position when scroll to item in virtualization.
					this.listScrollTop((itemIndex - this.options.visibleItemsCount + 2) *
						this._itemHeight());
				}
			}
		},
		_scrollToLastSelItem: function () {
			if (this._options.keyNavItemData !== null) {
				this._scrollToItem(this._options.keyNavItemData);
			} else if (this._options.selectedData.length > 0) {
				this._scrollToItem(this._options
					.selectedData[ this._options.selectedData.length - 1 ]);
			}
		},

		// Positions an item in the visible area when navigating with keyboard
		_positionItemInVisibleArea: function ($item) {
			var $listCont = this._options.$dropDownListCont,
				listContHeight = $listCont.height(),
				listContTop = $listCont.offset().top,
				listContScrollTop = this.listScrollTop(),
				itemTop = $item.offset().top,
				itemHeight = $item.outerHeight(true);

			// Item is hidden and is above visible area
			if (listContTop > itemTop) {
				this.listScrollTop(
					this._$items().filter(":visible").index($item) * itemHeight);
			}

			// Item is hidden and is below visible area
			if (itemTop + itemHeight > listContHeight + listContTop) {
				this.listScrollTop(itemTop + itemHeight + listContScrollTop -
					listContHeight - listContTop);
			}
		},

		// Param "options":
		//  data - the data of the element or jQuery reference to the element
		//  addStyles - boolean Specifies whether key navigation style should be applied
		//  clearPrevItem - boolean Specifies whether key navigation style should be removed from prev key navigation items. Mainly for shift interactions.
		//  scrollToItem - boolean Specifies whether to scroll to the new key navigation element
		//  resetDataOnNonFound - boolean Specifies whether the keyNavItemData should be set to null when the item is not found.
		_setKeyNavigationItem: function (options) {
			var $item, $prevKeyNavItem,
				data = options.data,
				addStyles = options.addStyles,
				clearPrevItem = options.clearPrevItem,
				scrollToItem = options.scrollToItem,
				resetDataOnNonFound = options.resetDataOnNonFound;

			// Handle data as jQuery object
			if (data instanceof $) {
				$item = data;
				data = this.dataForValue($item.attr("data-value"));
			} else {
				$item = this._$elementFromData(data);
			}

			if (clearPrevItem) {
				$prevKeyNavItem = this._$elementFromData(this._options.keyNavItemData);

				if ($prevKeyNavItem.length > 0) {
					$prevKeyNavItem.removeClass(this.css.itemInFocus);
				}
			}

			if (addStyles && $item.length > 0) {
				$item.addClass(this.css.itemInFocus);
			}

			if ($item.length === 0 && resetDataOnNonFound) {
				this._options.keyNavItemData = null;
			} else {
				this._options.keyNavItemData = data;
			}

			// D.A. 14th July, 2015 Bug #202197 The dropdown does not automatically scroll to the selected item.
			// Used to render the item when virtualization is enabled
			// The scroll calls _refreshVisualStylesForItem and updates the key nav item style
			if (scrollToItem) {
				this._scrollToItem(data);
			}
		},
		_navigateToItem: function ($item, addStyles, clearPrevItem, event, keepScrollPosition) {
			if ($item.length === 0) {
				return;
			}

			if (!this.options.multiSelection.enabled) {
				this.select($item, {
					focusCombo: true,
					keepFiltering: true,
					keepScrollPosition: keepScrollPosition
				}, event);
			} else {
				this._setKeyNavigationItem({
					data: $item,
					addStyles: addStyles,
					clearPrevItem: clearPrevItem
				});
			}

			this._positionItemInVisibleArea($item);
		},

		// Gets previous visible list item, while skipping grouping headers
		_prevVisibleItem: function ($item) {
			do {
				$item = $item.prev();
			} while ($item.length > 0 && (!$item.is("." +
				this.css.listItem.split(" ", 1)[ 0 ]) || !$item.is(":visible")));

			return $item;
		},

		// Gets next visible list item, while skipping grouping headers
		_nextVisibleItem: function ($item) {
			do {
				$item = $item.next();
			} while ($item.length > 0 && (!$item.is("." +
				this.css.listItem.split(" ", 1)[ 0 ]) || !$item.is(":visible")));

			return $item;
		},

		// Returns an item that is not filtered
		_visibleItemByIndex: function (index) {
			return this._$items().filter(":visible").eq(index);
		},
		_handleInputChange: function (openDropDown, event) {
			var options = this.options,
				_options = this._options,
				curVal = _options.$input.val();

			if (options.autoComplete &&

				// S.T. 18th Dec, 2015 Bug #211315: Add check for event parm.
				event &&
				event.which === 8 && // backspace
				_options.hadInputSelectionOnKeydown) {

				// Remove the character before the selection instead of removing the selection
				// when backspace is pressed and there was selection done by the auto complete
				curVal = curVal.slice(0, curVal.length - 1);
				_options.$input.val(curVal);
			}

			// In rare cases keyup events can be timed to process the same input value
			// But when auto complete is enabled the first event modified the input value with auto complete text and set the selection
			// This selection is also presisted when the second event is executed, which should normally not happen, because typing anything removes the selection
			// We should avoid processing the next event in this case, because this value was already processed and the carret would be incorrectly set to the input's end
			if (options.autoComplete && this._hasInputSelection()) {
				return;
			}

			// Ignore keyups that don"t change the value
			if (curVal !== _options.inputVal) {

				// Update input val
				this._setInputVal(curVal);

				if (options.filteringType === "remote") {
					this._updateFiltering(event);
				} else {
					if (options.filteringType === "local") {

						// Disable scroll when typing and load on demand is enabled
						// to prevent loading more items when items are filtered
						_options.disableScroll = true;
						this._updateFiltering(event);

						// D.A. 16th June, 2015 Bug #201124 When filtering is local and loadOnDemand is enabled new items are loaded after filter
						// Local filtering can trigger scroll event and the flag should be reset after the scroll event was triggered
						setTimeout(function () {
							_options.disableScroll = false;
						}, 0);
					}

					if (curVal) {
						this._showClearButton();
					} else {
						this._hideClearButton();
					}

					this._updateSelection(event);
					this._updateAutoComplete();

					if (_options.validator) {
						_options.validator._validateInternal(this.element, event);
					}
				}

				if (openDropDown) {

					// D.A. 10th March 2015, Bug #189913 Entering IME in the combo does not work correctly the first time. Input should not be focused on open.
					this.openDropDown(null, false, event);
				}
			}
		},
		_handleShiftNavigation: function ($itemToNavigate, event) {
			var _options = this._options,
				$keyNavItem = this._$keyNavItem();

			if ($itemToNavigate.is(_options.$itemsToSelectOnShiftUpDown)) {

				// The user is navigating backwards and we should restore the state of the previous item
				$keyNavItem.removeClass(this.css.itemInFocus);
				_options.$itemsToSelectOnShiftUpDown =
					_options.$itemsToSelectOnShiftUpDown.not($keyNavItem);
			} else {
				$itemToNavigate.addClass(this.css.itemInFocus);
				_options.$itemsToSelectOnShiftUpDown =
					_options.$itemsToSelectOnShiftUpDown.add($itemToNavigate);
			}

			this._navigateToItem($itemToNavigate, false, false, event);
		},
		_handleShiftUp: function (event) {
			var _options = this._options;

			if (_options.$itemsToSelectOnShiftUpDown.length > 1) {
				this.select(_options.$itemsToSelectOnShiftUpDown, {
					additive: true,
					focusCombo: true,
					keepNavItem: true,
					keepFiltering: true
				}, event);

				_options.$itemsToSelectOnShiftUpDown.removeClass(this.css.itemInFocus);
			}

			// Reset shift up/down selection
			_options.$itemsToSelectOnShiftUpDown = $();
			_options.shiftDown = false;
		},
		_handleShiftClick: function (event) {
			var _options = this._options;

			if (_options.$itemsToSelectOnShiftClick.length > 1) {
				this.select(_options.$itemsToSelectOnShiftClick, {
					additive: true,
					focusCombo: true,
					keepNavItem: true,
					keepFiltering: true
				}, event);

				_options.$itemsToSelectOnShiftClick.removeClass(this.css.itemInFocus);

				// Change key nav item to the one that was moused up on
				this._setKeyNavigationItem({
					data: $(event.target),
					clearPrevItem: true
				});
			}

			// Reset shift click selection
			_options.$itemsToSelectOnShiftClick = $();
		},
		_groupHeaderClass: function () {
			return "." + this.css.groupHeader.split(" ", 1)[ 0 ];
		},
		_$groupHeaders: function () {
			return this._$items(true).filter(this._groupHeaderClass());
		},
		_handleKeyNavigation: function (event) {
			// if reorderingFunctionInvocationTimeout = 0, from time to time the order of invocation get broken
			var $item, index, multiSelect, closeDropDown, isAutoSelectedActive,
				$lastSelectedItem, visibleItemsCount,
				self = this,
				options = this.options,
				_options = this._options,
				lod = this.options.loadOnDemandSettings,
				multiSelection = options.multiSelection.enabled,
				$keyNavItem = this._$keyNavItem(),
				$visibleItems = this._$items().filter(":visible"),
				currentScrollTop = this.listScrollTop(),
				activeIndex = this.activeIndex(),
				itemHeight = this._itemHeight(),
				addScrollCallback = false;

			// Remove the last text the user typed that is not part of selection
			// Close drop down when input is empty on escape
			if (event.keyCode === $.ui.keyCode.ESCAPE) {
				if (options.multiSelection.enabled) {
					if (this._lastValAfterItemSep().length === 0) {
						this.closeDropDown(null, event);
					} else {
						this._updateInputValues();
						this.clearFiltering(event);
						this._unhighlight();
					}
				} else {
					if (_options.inputVal.length === 0) {
						// Input is empty
						this.closeDropDown(null, event);
					} else if (_options.selectedData.length === 0) {
						// There is text, but no selection
						this._updateInputValues();
						this.clearFiltering(event);
						this._unhighlight();
					} else if (_options.autoSelectedItemData) {
						// There is selection, but the item was auto selected, then we should deselect it
						this._deselectData(_options.autoSelectedItemData, null, event);
						this.clearFiltering(event);
						this._unhighlight();
					} else {
						// There is selected item, that is not auto selected
						this.closeDropDown(null, event);
					}
				}

				// Prevent fire fox from returning the input value on esc
				event.preventDefault();
			}

			// Handle arrow down
			if (event.keyCode === $.ui.keyCode.DOWN) {
				if (event.altKey || !_options.dropDownOpened) {
					this.openDropDown(null, true, event);
				} else {
					$item = $keyNavItem.length > 0 ?
						this._nextVisibleItem($keyNavItem) :
							$visibleItems.eq(0);

					if (event.shiftKey && multiSelection && _options.dropDownOpened) {
						this._handleShiftNavigation($item, event);
					} else {
						this._navigateToItem($item, true, true, event);
					}

					// S.T. June 26th, 2015 Bug #201716: In the matter when grouping is enabled,
					// the intial rendered header group count should be extrated from visibleItemsCount.
					visibleItemsCount = options.visibleItemsCount - 1;
					if (options.grouping) {
						visibleItemsCount -= this._$groupHeaders().length;
					}

					// S.T. March 9th, 2015 Bug #188227: Handling DOWN arrow with virtualization.
					if (options.virtualization && (activeIndex >= visibleItemsCount)) {
						this.listScrollTop(currentScrollTop + itemHeight + 1);
					}

					// R.K. 22nd of February #830: igCombo not loading on demand with small pageSize
					if (options.virtualization && lod && lod.enabled &&
						(this.activeIndex() + 1 === this.listItems().length) &&
						(this.listItems().length < options.visibleItemsCount)) {
							self._callNextChunk(_options.$dropDownListCont, self._itemHeight());
					}
				}

				// Prevent carret from moving to end of input text
				event.preventDefault();
			}

			// Handle arrow up
			if (event.keyCode === $.ui.keyCode.UP) {
				if (_options.dropDownOpened) {

					// Close drop down on alt + up or on up when the top most item was the active one
					if (event.altKey || $keyNavItem.length === 0 ||

						// S.T. June 6th, 2015 Bug #201028: Use function to compare values.
						this._isDataEqual(_options.keyNavItemData,
							options.dataSource.dataView()[ 0 ])) {
						this.closeDropDown(null, event);
					} else {
						$item = this._prevVisibleItem($keyNavItem);

						if (event.shiftKey && multiSelection && _options.dropDownOpened) {
							this._handleShiftNavigation($item, event);
						} else {
							this._navigateToItem($item, true, true, event);
						}

						// S.T. March 9th, 2015 Bug #188227: Handling UP arrow with virtualization.
						if (options.virtualization && (activeIndex - 1 < 0)) {
							this.listScrollTop(currentScrollTop - itemHeight - 1);
						}
					}
				}

				// Prevent carret from moving to begining of input text
				event.preventDefault();
			}

			// Select the item on enter
			if (event.keyCode === $.ui.keyCode.ENTER ||
				(options.selectItemBySpaceKey && event.keyCode === $.ui.keyCode.SPACE)) {

				// Select all items from last selectied item to the navigation item on shift + enter
				if (event.shiftKey && _options.$itemsToSelectOnShiftUpDown.length === 1) {
					$lastSelectedItem = this._$elementFromData(_options
						.selectedData[ _options.selectedData.length - 1 ]);
					this.select(this._itemsBetweenTwoItems($keyNavItem, $lastSelectedItem),
						{ additive: true });
				} else {
					isAutoSelectedActive = $keyNavItem.is(_options.$autoSelectedItem);
					multiSelect = multiSelection &&
						(!options.multiSelection.addWithKeyModifier || event.ctrlKey ||
							isAutoSelectedActive);

					if (multiSelect && this.isSelected($keyNavItem) && !isAutoSelectedActive) {
						this._deselectData(_options.keyNavItemData, { focusCombo: true }, event);
					} else {
						closeDropDown = multiSelect ? false : options.closeDropDownOnSelect;

						if (options.autoComplete && $keyNavItem.length === 0 &&
							_options.autoCompleteItemData) {

							// Select auto completed item if there is no navigation item on enter press
							this._selectData(_options.autoCompleteItemData, {
								additive: multiSelect,
								closeDropDown: closeDropDown,
								focusCombo: true
							}, event);
						} else {
							this._selectData(_options.keyNavItemData, {
								additive: multiSelect,
								closeDropDown: closeDropDown,
								focusCombo: true
							}, event);
						}
					}
				}

				// Prevent default form submit on enter. Prevent space being inserted
				if ((event.keyCode === $.ui.keyCode.ENTER && options.preventSubmitOnEnter) ||
					event.keyCode === $.ui.keyCode.SPACE) {
					event.preventDefault();
				}
			}

			// Select first item on home + ctrl
			if (event.keyCode === $.ui.keyCode.HOME && event.ctrlKey && _options.dropDownOpened) {
				// S.T. 08-Sept-2015 #205955: Dropdown list does not scroll by Ctrl + Home, if virtualization is enabled.
				if (options.virtualization) {
					this.listScrollTop(0);
					addScrollCallback = true;
				}

				if (addScrollCallback) {
					this._options.scrollCallback = function () {
						self._navigateToItem($visibleItems.first(), true, true, event);
					};
				} else {
					this._navigateToItem($visibleItems.first(), true, true, event);
				}

				// Prevent caret from moving to beginning of input text
				event.preventDefault();
			}

			// Select last item on ctrl + end
			if (event.keyCode === $.ui.keyCode.END && event.ctrlKey && _options.dropDownOpened) {
				// S.T. 08-Sept-2015 #205955: Dropdown list does not scroll by Ctrl + End, if virtualization is enabled.
				if (options.virtualization) {
					this.listScrollTop(this.options.dataSource.totalLocalRecordsCount() *
						itemHeight);
					addScrollCallback = true;
				}

				if (addScrollCallback) {
					this._options.scrollCallback = function () {
						self._navigateToItem($visibleItems.last(), true, true, event);
					};
				} else {
					this._navigateToItem($visibleItems.last(), true, true, event);
				}

				// Prevent caret from moving to the end of input text
				event.preventDefault();
			}

			// Move the navigation item with single page size to the top of the list on page up
			if (event.keyCode === $.ui.keyCode.PAGE_UP && _options.dropDownOpened) {
				index = -options.visibleItemsCount + 1;

				if ($keyNavItem.length > 0) {
					index += $visibleItems.index($keyNavItem);
				}

				if (index < 0) {
					// P.P. 15-Jul-2015 #202198: Dropdown list does not scroll by PageDown and PageUp keys if virtualization is enabled.
					if (options.virtualization && currentScrollTop > 0) {
						this.listScrollTop(currentScrollTop + itemHeight * index);
						addScrollCallback = true;
					}

					index = 0;
				}

				// P.P. 15-Jul-2015 #202198: Dropdown list does not scroll by PageDown and PageUp keys if virtualization is enabled.
				if (addScrollCallback) {
					this._options.scrollCallback = function () {
						self._navigateToItem($visibleItems.eq(index), true, true, event, true);
					};
				} else {
					this._navigateToItem($visibleItems.eq(index), true, true, event, true);
				}

				// Prevent page from scrolling up
				event.preventDefault();
			}

			// Move the navigation item with single page size to the bottom of the list on page down
			if (event.keyCode === $.ui.keyCode.PAGE_DOWN && _options.dropDownOpened) {
				index = options.visibleItemsCount - 1;

				if ($keyNavItem.length > 0) {
					index += $visibleItems.index($keyNavItem);
				}

				if (index > $visibleItems.length - 1) {
					// P.P. 15-Jul-2015 #202198: Dropdown list does not scroll by PageDown and PageUp keys if virtualization is enabled.
					if (options.virtualization) {
						// P.P. 30-Nov-2015 #209608 Recalculation of the index is needed
						index -= options.visibleItemsCount - 1;

						this.listScrollTop(currentScrollTop + itemHeight * index);
						addScrollCallback = currentScrollTop < this.listScrollTop();
					}

					index = $visibleItems.length - 1;
				}

				// P.P. 15-Jul-2015 #202198: Dropdown list does not scroll by PageDown and PageUp keys if virtualization is enabled.
				if (addScrollCallback) {
					this._options.scrollCallback = function () {
						self._navigateToItem($visibleItems.eq(index), true, true, event);
					};
				} else {
					this._navigateToItem($visibleItems.eq(index), true, true, event);
				}

				// Prevent page from scrolling down
				event.preventDefault();
			}

			// Start multiple selection on shift press
			if (event.keyCode === _options.shiftKeyCode && multiSelection &&
				_options.dropDownOpened && !_options.shiftDown) {
				_options.shiftDown = true;

				_options.$itemsToSelectOnShiftUpDown = $keyNavItem;
				$keyNavItem.addClass(this.css.itemInFocus);
			}
		},
		_dropDownContHeight: function () {
			var _options = this._options,
				dropDownContainerHeight =
					parseInt(_options.$dropDownListCont.outerHeight(true), 10);

			// If header and footer templates are used
			if (_options.$header !== undefined) {
				dropDownContainerHeight += _options.$header.outerHeight(true);
			}

			if (_options.$footer !== undefined) {
				dropDownContainerHeight += _options.$footer.outerHeight(true);
			}

			return dropDownContainerHeight;
		},

		// Return jQuery object containing both items plus all items between them
		_itemsBetweenTwoItems: function ($item1, $item2) {
			var firstIndex, sndIndex, temp,
				$items = this._$items(),
				$result = $();

			firstIndex = $items.index($item1);
			sndIndex = $items.index($item2);

			// Swap values so firstIndex is the lower one
			if (firstIndex > sndIndex) {
				temp = firstIndex;
				firstIndex = sndIndex;
				sndIndex = temp;
			}

			for (; firstIndex <= sndIndex; firstIndex++) {
				$result = $result.add(this._visibleItemByIndex(firstIndex));
			}

			return $result;
		},

		// Focus the text input without changing combo state
		_safeFocusInput: function (preventItemSeparatorOnFocus) {
			var $input = this._options.$input,
				input = $input[ 0 ];

			// These flags should be reset in focusInput handler, because focus in IE is executed after this whole method has finished execution
			this._options.preventDropDownOnFocus = true;

			// Prevent input value from changing on select/deselect while analyzing selection in _updateSelection method
			this._options.preventItemSeparatorOnFocus = preventItemSeparatorOnFocus;

			if (!$input.is(":focus")) {
				input.focus();
			} else {

				// Trigger focus handler to reset the flags
				// $().focus() is not recommended when input is not focused, because it triggers focus handler twice in IE
				$input.focus();
			}
		},
		_windowResize: function () {
			this.positionDropDown();
		},
		_documentMouseUp: function () {
			var _options = this._options;

			if (_options.$itemsToSelectOnShiftClick.length > 0) {
				_options.$itemsToSelectOnShiftClick = $();
			}

			_options.mouseDownStartedFromListItem = false;
		},
		_inputFocus: function (event) {
			var mode = this.options.mode;

			if (this.options.disabled) {
				return;
			}

			if (mode === "editable" || mode === "dropdown") {
				this._options.$combo.addClass(this.css.active);
			}

			if (mode === "editable") {
				if (this._options.preventItemSeparatorOnFocus) {
					this._options.preventItemSeparatorOnFocus = false;
				} else {
					this._addItemSeparatorToEnd();
				}
			}

			if (mode === "editable" && this.options.dropDownOnFocus) {
				if (this._options.preventDropDownOnFocus) {
					this._options.preventDropDownOnFocus = false;
				} else {
					this.openDropDown(null, true, event);
				}
			}
		},
		_inputBlur: function (event) {
			var _options = this._options,
				$activeEl = $(document.activeElement);

			if (this.options.disabled) {
				return;
			}

			// In IE clicking on the drop down scrollbar triggers input"s blur
			// Prevent the blur and focus the input
			// D.A. 16th March 2015, Bug #190542 Blur should be prevented also when clicking icon elements, because in IE8
			// clicking them triggers input blur, even when the element"s mouse down event was called preventDefault()
			if ($activeEl.is(_options.$dropDownListCont) ||
				$activeEl.is(_options.$dropDownBtnIcon) ||
				$activeEl.is(_options.$clearIcon)) {
				_options.preventInputBlur = true;
				this._safeFocusInput(true);
			}

			if (!_options.preventInputBlur) {
				if (this.options.mode === "editable" || this.options.mode === "dropdown") {
					_options.$combo.removeClass(this.css.active);
				}

				if (this.options.mode === "editable") {
					this._removeItemSeparatorFromEnd();

					// R.K. 15th September 2016, #344: igCombo allows you to keep unlisted value
					if (_options.selectedData.length === 0 && !this.options.allowCustomValue) {
						this._setInputVal("");
						_options.$input.val("");
					}
				}

				if (this.options.closeDropDownOnBlur) {
					_options.closingDropDownOnBlur = true;
					this.closeDropDown(null, event);
				}

				// S.T. 27th Nov 2015, Bug #209241: Remove the check.
				if (_options.validator) {
					_options.validator._validateInternal(this.element, event, true);
				}
			} else {
				_options.preventInputBlur = false;
			}
		},
		_inputClick: function (event) {
			if (this.options.disabled) {
				return;
			}

			if (this.options.mode === "dropdown" || this.options.mode === "readonlylist") {
				this._toggleDropDownState(event);
			}
		},
		_inputKeyDown: function (event) {
			if (this.options.disabled) {
				return;
			}

			if (this.options.mode === "editable" || this.options.mode === "dropdown") {
				this._handleKeyNavigation(event);

				if (this.options.autoComplete) {
					this._options.hadInputSelectionOnKeydown = this._hasInputSelection();
				}
			}
		},
		_inputPaste: function (event) {
			var self = this;

			if (this.options.disabled) {
				return;
			}

			if (this.options.mode === "editable") {

				// On paste input value is not updated
				// We should wait after paste for input value to be populated
				setTimeout(function () {
					self._handleInputChange(!self._options.dropDownOpened, event);
				}, 0);
			}
		},
		_handleDropDownModeKeypress: function (event) {
			var curText, curData, value, startValue, startIndex, i,
				options = this.options,
				_options = this._options,

				// Event.which should be used, it normalises event.keyCode/charCode
				curChar = String.fromCharCode(event.which),
				data = options.dataSource.dataView(),
				len = data.length,
				textKey = options.textKey;

			// New typing should clear the reset timeout
			clearTimeout(_options.dropDownModeSearchByResetTimeout);

			// Pressing the same single character multiple times should not be treated as whole string of characters
			// E.g Pressing fast 'a', 'a' should search 2 times by 'a', instead of 'a' and 'aa'
			if (_options.dropDownModeSearchBy !== curChar) {
				_options.dropDownModeSearchBy += curChar;
			}

			if (options.multiSelection.enabled) {
				startValue = _options.keyNavItemData;
			} else {
				// R.K. 6th of January 2017 #709: Combo throws exception when keypress event is fired in dropdown mode
				startValue = _options.selectedData.length ?
				_options.selectedData[ _options.selectedData.length - 1 ][ options.valueKey ] : 0;
			}

			startIndex = this._dataIndexByValue(startValue, true);
			if (_options.dropDownModeSearchBy.length === 1) {

				// Start from next item when the search string is only single character long
				startIndex += 1;
			}

			// Search through all data for matching item, strating from the last selected item
			for (i = 0; i < len; i++) {
				curData = this._unwrapData(data[ (i + startIndex) % len ]);
				if (curData) {
					curText = this._unwrapData(curData[ textKey ]);

					if (!options.caseSensitive) {
						curText = curText.toLowerCase();
						_options.dropDownModeSearchBy =
							_options.dropDownModeSearchBy.toLowerCase();
					}
					if (curText.startsWith(_options.dropDownModeSearchBy)) {
						if (options.multiSelection.enabled) {
							this._setKeyNavigationItem({
								data: curData,
								addStyles: true,
								clearPrevItem: true
							});
						} else {
							this._selectData(curData, {}, event);
						}

						break;
					}
				}
			}

			// Scroll to the new selected item when selection changed
			if (value !== undefined) {
				if (options.multiSelection.enabled) {
					this._scrollToItem(_options.keyNavItemData);
				} else {
					this._scrollToLastSelItem();
				}
			}

			// Reset search string if the user doesn't type anything next 1000 ms
			_options.dropDownModeSearchByResetTimeout = setTimeout(function () {
				_options.dropDownModeSearchBy = "";
			}, _options.dropDownModeSearchByResetDelay);
		},
		_inputKeyPress: function (event) {
			if (this.options.disabled) {
				return;
			}

			if (this.options.mode === "dropdown") {
				this._handleDropDownModeKeypress(event);
			}
		},
		_inputKeyUp: function (event) {
			var self = this;

			if (this.options.disabled) {
				return;
			}

			if (this.options.mode === "editable") {

				// Clear the timeout if previous timeout is still not executed
				clearTimeout(this._options.keyUpTimeout);
				this._options.autoCompleteItemData = null;

				this._options.keyUpTimeout = setTimeout(function () {
					self._handleInputChange(!self._options.dropDownOpened, event);
				}, this.options.delayInputChangeProcessing);
			}

			if (this.options.mode === "editable" || this.options.mode === "dropdown") {
				if (event.keyCode === this._options.shiftKeyCode &&
					this.options.multiSelection.enabled) {
					this._handleShiftUp(event);
				}
			}
		},
		_inputMouseDown: function (event) {
			if (this.options.disabled) {
				return;
			}

			if (!this._options.$input.is(":focus")) {

				// Chrome does not move the carret if input wasn't focused initially
				// This happens when while the focus was in the input we have clicked somewhere inside the input to move the carret ourself
				this._options.$input.focus();
				this._moveCaretToInputEnd(true);

				// Prevent carret from being set to where user clicked
				event.preventDefault();
			}
		},

		// P.P 02-Mar-2016 #212238: Incorrect confirmation of Japanese symbols using IME
		_inputCompositionUpdate: function () {
			this._options.composition.isConfirmationNeeded = true;
		},
		_inputCompositionEnd: function () {

			// In FF it works fine - fix is not needed
			if ($.ig.util.isFF) {
				return;
			}

			this._options.composition.isCompositionEndFired = true;

			// P.P 02-Mar-2016 #212238: Incorrect confirmation of Japanese symbols using IME
			if (this._options.composition.isConfirmationNeeded) {
				this._options.composition.isConfirmationNeeded = false;

				if ($.ig.util.isIE || $.ig.util.isEdge) {
					this._inputInputHandler();
				}

				this._updateAutoComplete();
			}
		},
		_inputInputHandler: function () {

			// P.P 07-Mar-2016 #212238: Incorrect confirmation of Japanese symbols using IME
			this._options.composition.handleInput();
		},

		// P.P 07-Mar-2016 #212238: Incorrect confirmation of Japanese symbols using IME
		_initCompositionObject: function () {
			var comboContext = this;

			this._options.composition = {
				isCompositionEndFired: false,
				isConfirmationNeeded: false,
				autocompleteText: "",
				isAutocompleteNeeded: function () {

					// In FF it works fine - fix is not needed
					return $.ig.util.isFF || !this.isConfirmationNeeded;
				},
				autocompleteAfterComposition: function (newInputVal, oldInputVal) {
					comboContext._options.$input.val(newInputVal);
					comboContext._setInputSelection(oldInputVal.length, newInputVal.length);
				},
				handleInput: function () {
					var val, newInputVal, oldInputVal,
					compositionContext = this;

					// Simulate proper behavior on input after composition end, excluding FF where all works fine
					// When composition end is triggered autocomplete does not work properly
					// R.K. 3rd of January 2017 #696: Combo doesn't accept first character of input after clearing an IME composition in Chrome
					if ($.ig.util.isSafari && this.isCompositionEndFired && this.autoCompleteText) {
						val = comboContext._options.$input.val();

						if ($.ig.util.isOpera) {
							oldInputVal = val;
						} else {
							// P.P 10-Jun-2016 #219244: Composing 2 Japanese charachters in a row and then confirming cause their doubling
							oldInputVal = val.slice(0, -val.length / 2); // dwindle twice the ammount of the characters
						}

						// Backspace key is used at the end of composition
						if (oldInputVal.length === this.inputVal.length - 1 &&
							oldInputVal === this.inputVal.slice(0, -1))
						{
							oldInputVal = this.inputVal;
						}

						newInputVal = oldInputVal + this.autocompleteText;

						// Something clear the selection in Safari after it is set here,
						// so reordering of the functions with setTimeout is used
						if ($.ig.util.isSafari) {
							setTimeout(function () {
								compositionContext.
									autocompleteAfterComposition(newInputVal, oldInputVal);
							}, 0);
						} else {
							this.autocompleteAfterComposition(newInputVal, oldInputVal);
						}
					}

					this.isCompositionEndFired = false;
					this.autocompleteText = "";
				}
			};
		},
		_attachEvents: function () {
			var lastY,
				self = this,
				css = this.css,
				options = this.options,
				_options = this._options,
				_handlers = this._handlers;

			_options.$window.on({
				resize: _handlers.windowResize
			});

			$(document).on({
				mouseup: _handlers.documentMouseUp
			});

			// Combo events
			_options.$combo.on({
				mouseenter: function () {
					if (options.disabled) {
						return;
					}

					if (options.mode !== "readonly") {
						_options.$combo.addClass(css.hover);
					}
				},
				mouseleave: function () {
					if (options.disabled) {
						return;
					}

					_options.$combo.removeClass(css.hover);

					// Removes active class added when mousing down on the drop down button and leaving combo while holding mouse down
					if (!((options.mode === "editable" || options.mode === "dropdown") &&
						_options.$input.is(":focus"))) {
						_options.$combo.removeClass(css.active);
					}
				},
				mousedown: function () {
					if (options.disabled) {
						return;
					}

					if (options.mode !== "readonly") {
						_options.$combo.addClass(css.active);
					}
				},
				mouseup: function () {
					if (options.disabled) {
						return;
					}

					if (options.mode === "readonlylist") {
						_options.$combo.removeClass(css.active);
					}
				}
			});

			// Drop down button events
			_options.$dropDownBtnCont.on({
				mouseenter: function () {
					if (options.disabled) {
						return;
					}

					if (options.mode !== "readonly") {
						_options.$dropDownBtnCont.addClass(css.hover);
					}
				},
				mouseleave: function () {
					if (options.disabled) {
						return;
					}

					if (options.mode !== "readonly") {
						_options.$dropDownBtnCont.removeClass(css.hover);
					}
				},
				mousedown: function (event) {
					if (options.disabled) {
						return;
					}

					// Prevent mouse down from triggering blur on the combo input
					event.preventDefault();
				},
				click: function (event) {
					// Wait until items are added to the DOM
					if (options.disabled ||
						!(self._$items().length > 0 ||
							_options.$dropDownListCont.find("." + css.noMatchFound).length > 0)) {
						return;
					}

					if (options.mode !== "readonly") {
						if (_options.dropDownOpened) {
							self.closeDropDown(null, event);
						} else {

							if (self.options.suppressKeyboard && $.ig.util.isTouchDevice()) {
								event.stopPropagation();
								if (self._options.$input.is(":focus")) {
									self._options.$input.blur();
								}

								self.openDropDown(null, false, event);
								return;
							}

							self.openDropDown(null,
								self._focusInInputWhenUsingTouchDevice(), event);
						}
					}

					// K.D. March 3rd, 2015 Bug #189454 When combo is in tileManager and click on expand button the list position is not correct.
					// The event was propagated to the tile manager and so the tile was being expanded.
					event.stopPropagation();
				}
			});

			// Clear button events
			_options.$clearCont.on({
				mouseenter: function () {
					if (options.disabled) {
						return;
					}

					if (options.mode !== "readonly") {
						_options.$clearCont.addClass(css.clearHover);
					}
				},
				mouseleave: function () {
					if (options.disabled) {
						return;
					}

					if (options.mode !== "readonly") {
						_options.$clearCont.removeClass(css.clearHover);
					}
				},
				mousedown: function (event) {
					if (options.disabled) {
						return;
					}

					// Prevent mouse down from triggering blur on the combo input
					event.preventDefault();
				},
				click: function (event) {
					if (options.disabled || _options.dataBinding) {
						return;
					}

					if (options.mode === "editable" || options.mode === "dropdown") {
						self._hideClearButton();

						// H.A. 23 February 2016, #212566: igCombo gets focus when data source is changed and value is set.
						self.clearInput({ focusCombo: true }, event);
						if (self._focusInInputWhenUsingTouchDevice()) {
							self._moveCaretToInputEnd(true);
						}
					}
				}
			});

			// Input events
			_options.$input.on({
				focus: _handlers.inputFocus,
				blur: _handlers.inputBlur,
				click: _handlers.inputClick,
				keydown: _handlers.inputKeyDown,
				paste: _handlers.inputPaste,
				keyup: _handlers.inputKeyUp,
				keypress: _handlers.inputKeyPress,
				mousedown: _handlers.inputMouseDown,

				// P.P 02-Mar-2016 #212238: Incorrect confirmation of Japanese symbols using IME
				compositionupdate: _handlers.inputCompositionUpdate,

				// P.P 26-Feb-2016 #212236: Incorrect input of Japanese symbols using IME
				compositionend: _handlers.inputCompositionEnd,
				input: _handlers.inputInput
			});

			// List items events
			_options.$dropDownListCont.on({
				mouseenter: function () {
					var $this, $prevItems;

					if (options.disabled) {
						return;
					}

					if (options.mode === "editable" || options.mode === "dropdown") {
						$this = $(this);

						// Update shift + click selection when mouse is moved while shift is being held
						if (_options.$itemsToSelectOnShiftClick.length > 0) {
							$prevItems = _options.$itemsToSelectOnShiftClick;

							// Get the new items to select
							_options.$itemsToSelectOnShiftClick =
								self._itemsBetweenTwoItems(self._$keyNavItem(), $this);

							// Remove styling from items in previous selection range, that are not in the new one
							$prevItems
								.not(_options.$itemsToSelectOnShiftClick)
									.removeClass(css.itemInFocus);

							// Add styling to the new range of items
							_options.$itemsToSelectOnShiftClick.addClass(css.itemInFocus);
						} else {
							$this.addClass(css.hover);

							if (_options.mouseDownStartedFromListItem) {

								// Add mouse down class on the item when user is holding
								// the mouse button down while hovering over the item
								$this.addClass(css.itemInFocus);
							}
						}
					}
				},
				mouseleave: function () {
					var $this;

					if (options.disabled) {
						return;
					}

					if (options.mode === "editable" || options.mode === "dropdown") {
						$this = $(this);

						// Clear hover
						$this.removeClass(css.hover);

						// Clear item in focus applied on mouse down
						if (!($this.is(self._$keyNavItem()) ||
							$this.is(_options.$itemsToSelectOnShiftUpDown))) {
							$this.removeClass(css.itemInFocus);
						}

						// Clear shift + click selection styles
						if (_options.$itemsToSelectOnShiftClick.length > 0) {
							_options.$itemsToSelectOnShiftClick.removeClass(css.itemInFocus);
						}
					}
				},
				mousedown: function (event) {
					var $this, $keyNavItem;

					if (options.disabled) {
						return;
					}

					if (options.mode === "editable" || options.mode === "dropdown") {

						// Handle only left mouse button
						if (event.which === 1) {
							$this = $(this);
							$keyNavItem = self._$keyNavItem();

							if (event.shiftKey && options.multiSelection.enabled) {
								if ($keyNavItem.length === 0) {
									$keyNavItem = self._$items().filter(":visible").eq(0);

									self._setKeyNavigationItem({
										data: $keyNavItem,
										addStyles: true
									});
								}

								_options.$itemsToSelectOnShiftClick =
									self._itemsBetweenTwoItems($this, $keyNavItem);

								// Add styling to all items between current navigation item and the shift clicked item
								_options.$itemsToSelectOnShiftClick.addClass(css.itemInFocus);
							} else {
								$this.addClass(css.itemInFocus);
							}

							_options.mouseDownStartedFromListItem = true;
						}
					}
				},
				mouseup: function (event) {
					var $this, multiSelect, closeDropDown,
						shouldSuppress = options.suppressKeyboard && $.ig.util.isTouchDevice();

					if (options.disabled) {
						return;
					}

					if (options.mode === "editable" || options.mode === "dropdown") {

						// Handle only on left mouse button
						if (_options.mouseDownStartedFromListItem && event.which === 1) {
							$this = $(this);

							if (event.shiftKey && options.multiSelection.enabled) {

								// Select all items between the navigation item
								// and the selected item upon shift + click
								self._handleShiftClick(event);
							} else {
								multiSelect = options.multiSelection.enabled &&
									(!options.multiSelection.addWithKeyModifier || event.ctrlKey);
								closeDropDown = multiSelect ?
									false :
									options.closeDropDownOnSelect;

								if (multiSelect && self.isSelected($this) &&
									!self._$keyNavItem().is(_options.$autoSelectedItem)) {
										self.deselect($this, {
											focusCombo: !shouldSuppress },
											event);
								} else {
										self.select($this, {
											additive: multiSelect,
											closeDropDown: closeDropDown,
											focusCombo: !shouldSuppress
										}, event);
								}
							}

							// Remove class added on mouse down
							$this.removeClass(css.itemInFocus);
						}
					}
				}
			}, "." + css.listItem.split(" ", 1)[ 0 ]);

			// Drop down list container events
			_options.$dropDownListCont.on({
				mousedown: function (event) {
					if (options.disabled) {
						return;
					}

					// Prevent mouse down from triggering blur on the combo input
					event.preventDefault();
				},
				scroll: function () {
					if (options.disabled) {
						return;
					}

					_options.$loading.css({
						top: self.listScrollTop()
					});

					if (!(_options.dataBinding || _options.disableScroll)) {
						self._callNextChunk(_options.$dropDownListCont, self._itemHeight());
					}
				}
			});

			// Header and footer
			_options.$dropDownCont.on({
				mousedown: function (event) {

					// Prevent mouse down from triggering blur on the combo input
					event.preventDefault();
				}
			}, "." + css.header + ", ." + css.footer);

			if (_options.$dropDownScrollCont) {
				_options.$dropDownScrollCont
					.on("scroll", function () {
						if (options.disabled) {
							return;
						}

						self._scrollVirtualization($(this));

						if (_options.scrollCallback) {
							_options.scrollCallback();
							_options.scrollCallback = null;
						}
					});

				_options.$dropDownListCont.on("mousewheel DOMMouseScroll", function (event) {
					var currentScrollTop = self.listScrollTop(),
						itemHeight = self._itemHeight();

					if (options.disabled) {
						return;
					}

					if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
						self.listScrollTop(currentScrollTop - itemHeight);
					} else {
						self.listScrollTop(currentScrollTop + itemHeight);
					}

					// S.T. June 15th, 2015 Bug 194461: The event should not be propagated because the page is moved while scroll over the items with virtualization.
					if (options.virtualization) {
						return false;
					}
				});

				// S.T. Feb 17th, 2016 Bug 212901: Move the container on touchmove
				_options.$dropDownListCont.on("touchmove", function (event) {
					var currentY = event.originalEvent.touches[ 0 ].clientY,
						currentScrollTop = self.listScrollTop(),
						itemHeight = self._itemHeight();

					if (options.disabled) {
						return;
					}

					// R.K. 22/08/2016 #253: igCombo scrolling not working properly on ipad when virtualization is on
					if (currentY < lastY) {
						self.listScrollTop(currentScrollTop + itemHeight);
					} else if (currentY > lastY) {
						self.listScrollTop(currentScrollTop - itemHeight);
					}

					lastY = currentY;

					// S.T. June 15th, 2015 Bug 194461: The event should not be propagated because the page is moved while scroll over the items with virtualization.
					if (options.virtualization) {
						return false;
					}
				});
			}
		},
		_scrollVirtualization: function ($this) {
			var itemHeight, offset, dropDownScrollHeight,
				options = this.options,
				self = this,
				_options = this._options;

			if (!options.virtualization || _options.dataBinding) {
				return;
			}

			if (options.filteringType === "local" &&
				_options.inputVal !== "" &&
				_options.expression !== undefined &&
				_options.expression !== null) {
				options.dataSource.filter(_options.expression, options.filteringLogic, true);
			}

			itemHeight = this._itemHeight();
			offset = this._offsetItems(options.dataSource.dataView(), itemHeight);
			this._updateItems(offset);

			options.dataSource.settings.callback = function (err, success, data) {
				dropDownScrollHeight = data.totalLocalRecordsCount() * itemHeight;

				_options.$dropDownScroll.height(dropDownScrollHeight);

				// S.T. June 15th, 2015 Bug 194325: Update footer vars when virtualization is enabled with load on demand. The callback handler is different.
				self._updateFooterVariables();
			};

			this._callNextChunk($this, itemHeight);
		},
		_offsetItems: function (dataView, itemHeight) {
			var offset, containerRatio, itemRatio;

			containerRatio = this.listScrollTop() /
				this._options.$dropDownScrollCont.prop("scrollHeight");
			itemRatio = itemHeight / this._dropDownHeight(itemHeight, dataView.length);

			// S.T. 27th November 2015 Bug #208075: Use ceil instead parse int because sometimes dividing is float number.
			offset = this._calculateOffset(containerRatio, itemRatio);

			return offset;
		},
		_calculateOffset: function (containerRatio, itemRatio) {
			var offset, offsetCeil, offsetFloor,
				itemsLength = this.options.dataSource.dataView().length,
				visibleItems = this.options.visibleItemsCount;

			offset = containerRatio / itemRatio;
			offsetCeil = Math.ceil(offset);

			// S.T. 12th December 2015 Bug #208075: Asure that offset index does not exceed data items length.
			if (visibleItems + offsetCeil > itemsLength) {
				offsetFloor = Math.floor(offset);

				return offsetFloor;
			}

			return offsetCeil;
		},
		_callNextChunk: function ($element, itemHeight) {
			var delta = this._options.deltaItemsForLoadOnDemand * itemHeight;

			if (this.listScrollTop() + $element.innerHeight() +
				delta >= $element.prop("scrollHeight")) {
				this._nextChunk();
			}
		},
		_disableCombo: function (value) {

			// Applying jQuery UI default disable logic to the wrapper element
			this._options.$comboWrapper
				.toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!value)
				.attr("aria-disabled", value);

			this.hoverable.removeClass("ui-state-hover");
			this.focusable.removeClass("ui-state-focus");

			if (value) {
				this._options.$input.attr("readonly", true);
				this._options.$hiddenInput.attr("disabled", true);
			} else {

				// S.T. 27th November 2015 Bug #210080: When disable the combo and enable it after that, in "mode" dropdown the input should be readonly.
				if (this.options.mode !== "dropdown") {
					this._options.$input.removeAttr("readonly");
				}
				this._options.$hiddenInput.removeAttr("disabled");
			}
		},
		changeLocale: function () {
			this._super();
			var $noMatchFound = this._options.$noMatchFound;
			if ($noMatchFound && $noMatchFound.length) {
				this._changeLocaleForElement($noMatchFound);
			}
		},
		_changeRegional: function () {
			this.dataBind();
		},
		_setOption: function (option, value) {
			var options = this.options,
				_options = this._options;

			if (options[ option ] === value) {
				return;
			}

			// Z.K. Bug #201980 - When try to set 'mode' option, the option is changed and 'Operation not supported' exception is thrown
			if (option === "dropDownAttachedToBody" || option === "virtualization" ||
					option === "mode" || option === "format") {
				throw new Error(this._getLocaleValue("notSuported"));
			}

			// D.A. 10th March 2015, Bug #190028 Enabling multi selection through set option causes item separator to be undefined
			if (option === "multiSelection") {
				value = $.extend(true, {}, options.multiSelection, value);
			}

			if (option === "loadOnDemandSettings") {
				value = $.extend(true, {}, options.loadOnDemandSettings, value);
			}

			if (option === "disabled") {
				this._disableCombo(value);
			}

			// S.T. 1th July 2015, Bug #201925: Adding set option for grouping
			if (option === "grouping") {
				value = $.extend(true, {}, options.grouping, value);
			}

			this._super(option, value);

			this._analyzeOptions();

			switch (option) {
				// S.T. 3th Sept 2015, Bug #203257: Add support for changing option enableClearButton
				case "enableClearButton":
					if (_options.inputVal) {
						if (value === true) {
							this._showClearButton(true);
						} else {
							this._hideClearButton();
						}
					}
					break;
				case "width":
					_options.$comboWrapper.outerWidth(value);
					this.positionDropDown();
					break;
				case "height":
					_options.$comboWrapper.outerHeight(value);
					this.positionDropDown();
					break;
				case "headerTemplate":
					this._renderHeaderTemplate(this.css, this.options, _options.$dropDownCont);
					break;
				case "footerTemplate":
					this._renderFooterTemplate(this.css, this.options,
						_options.$dropDownCont, this);

					// Update footer vars if set in the new template
					this._updateFooterVariables();
					break;
				case "dropDownWidth":
					this.positionDropDown();
					break;
				case "itemTemplate":

					// S.T. March 11th, 2015 Bug #189915: Render items after change.
					this._renderItems(null, null, this.options.dataSource);
					break;
				case "inputName":
					_options.$hiddenInput.attr("name", value);
					break;
				case "visibleItemsCount":
					this._setListContMaxHeight();
					break;
				case "multiSelection":

					// Update selection to the first selected item when switching from multi selection to single
					this._selectData(this._options.selectedData[ 0 ]);

					// S.T. March 11th, 2015 Bug #190156: Render items after change.
					this._renderItems(null, null, this.options.dataSource);

					// S.T. March 17th, 2015 Bug #190263: Clear input after rendering.
					this.clearInput();
					break;
				case "tabIndex":
					this._options.$input.attr("tabIndex", value);
					break;
				case "validatorOptions":
					if (this._options.validator) {
						this.element.igValidator(this.options.validatorOptions);
					} else {
						this.validator();
					}
					break;
				case "dataSource":
				case "dataSourceType":
				case "dataSourceUrl":
				case "responseTotalRecCountKey":
				case "responseDataKey":
				case "responseDataType":
				case "responseContentType":
				case "requestType":
				case "filteringType":
				case "filterExprUrlKey":
				case "filteringCondition":
				case "filteringLogic":
				case "loadOnDemandSettings":
				case "grouping":
					this.dataBind();
					break;

					// S.T. April 24th , Bug #192958: Changing the textKey and valueKey should only update values.
				case "valueKey":
				case "textKey":
					this._updateItems();
					break;
			}
		},
		_initDataSource: function () {
			var dataSourceOptions, schema, pagingOptions,
				self = this,
				lod = this.options.loadOnDemandSettings,
				options = this.options,
				isStringDataSource = $.type(options.dataSource) === "string",
				url = options.dataSourceUrl;

			// Set the data source that should be used
			if (!options.dataSource && this.element.is("select")) {
				options.dataSource = this.element[ 0 ];
				schema = this._initSelectSchema();

				// K.D. March 2nd, 2015 Bug #189514 Handling the case of dataSource not set and dataSourceUrl is provided as initial data source
			} else if (!options.dataSource && url) {
				options.dataSource = url;
				isStringDataSource = true;
			}

			// P.P. 29-June-2015 Bug #201942: We need to unwrap the data here, because of the following logic.
			if ($.type(options.dataSource) === "function") {
				options.dataSource = options.dataSource();
			}

			if (!(options.dataSource && this._isInstanceOfDataSource(options.dataSource))) {

				// When dataSource is array of primitives convert it to array of objects
				// S.T. March 11th, 2015 Bug #190266: Add date.
				// Z.K. December 3, 15 - Extracting repeated code into separate function
				this._convertToArrayOfObjects(options);

				// Analyze the schema only when the data source is array or function
				if (!schema && options.dataSource && ($.isArray(options.dataSource) ||
					$.isFunction(options.dataSource))) {

					// N.A. 5/18/2015 Bug #193129: Unwrap before extracting the schema from the first field element.
					schema = this._initSchema(this._unwrapData(options.dataSource)[ 0 ]);
				}

				dataSourceOptions = {
					callback: this._renderItems,
					callee: this,
					dataSource: options.dataSource,
					type: options.dataSourceType || undefined,
					requestType: options.requestType || "GET",
					responseContentType: options.responseContentType || null,
					responseDataType: options.responseDataType || null,
					responseDataKey: options.responseDataKey || null,
					responseTotalRecCountKey: options.responseTotalRecCountKey || null,
					localSchemaTransform: false,
					schema: schema || null,
					dataBinding: function () {
						if (!self._options.dropDownOpened || self._options.dataBinding) {
							return;
						}

						self._options.dataBinding = true;
						self._options.$loading.insertBefore(self._options.$dropDownList);
					},
					dataBound: function () {
						self._options.$loading.remove();
						self._options.dataBinding = false;
					}
				};

				// S.T. Feb 24th, 2015 Bug #189447: Enable LOD only for url and if data source is string
				if (lod && lod.enabled && (url || isStringDataSource)) {
					pagingOptions = {
						enabled: true,
						appendPage: true,
						pageSize: lod.pageSize,
						pageIndex: 0,

						// S.T. Feb 27th, 2015 Bug #189554: Handle when lod is from MVC wrapper.
						pageSizeUrlKey: lod.pageSizeUrlKey || null,
						pageIndexUrlKey: lod.pageIndexUrlKey || null
					};

					$.extend(dataSourceOptions, {
						paging: pagingOptions
					});
				}

				// S.T. Feb 24th, 2015 Bug #189447: Handle when data source is JSONP.
				if ($.type(options.dataSource) === "string" &&
					!options.dataSourceType &&
					$.ig.util.isJsonpUrl(options.dataSource)) {

					// S.T. Feb 24th, 2015 Bug #189704: Save string data source url
					this._options.strDataSource = options.dataSource;
					options.dataSource = new $.ig.JSONPDataSource(dataSourceOptions);
				} else {
					options.dataSource = new $.ig.DataSource(dataSourceOptions);
				}

				// S.T. Feb 24th, 2015 Bug #189447: Handle when data source url is set fo remote filtering with MVC wrapper.
				if (url) {
					options.dataSource.settings.dataSource = url;
					options.dataSource.settings.type = "remoteUrl";
					options.dataSource._runtimeType = options.dataSource.analyzeDataSource();
					options.dataSource.settings.urlParamsEncoded =
						$.proxy(function (data, params) {
						params = params ? params.filteringParams : null;

						// set flag used by Mvc remote filtering
						if (params) {
							params.textKey = options.textKey || options.valueKey;
							params.valueKey = options.valueKey;

							if (!options.caseSensitive) {
								params.toLower = "1";
							}

							if (options.compactData) {
								params.compact = "1";
							}
						}
					}, this);
				}

				// S.T. Feb 27th, 2015 Bug #189554: Support for loadOnDemand coming from Mvc
				var _aNull = function (v, nan) {
					return v === null || v === undefined ||
						(nan && typeof v === "number" && isNaN(v));
				};

				options.dataSource._responseData = function (data) {
					var len = data ? data.length : 0,
						count = (len > 0) ? data[ len - 1 ][ ":totals:" ] : null;

					if (count) {
						data.pop();
						count = count.split(":");
						options.dataSource
							.totalRecordsCount(_aNull(len = parseInt(count[ 0 ], 10), true) ?
								0 : len);
						len = _aNull(len = parseInt(count[ 1 ], 10), true) ? 0 : len;

						if (len) {

							// The number of all total records on the server
							self._options.totalAll = len;
						}
					}
				};
			}
		},
		_isInstanceOfDataSource: function (ds) {
			return typeof ds._xmlToArray === "function" &&
				typeof ds._encodePkParams === "function";
		},
		_nextChunk: function () {
			var lod = this.options.loadOnDemandSettings,
				ds = this.options.dataSource;

			if (lod && ds && lod.enabled) {
				ds.settings.paging.appendPage = true;

				if (!this.options.virtualization) {
					this.options.dataSource.settings.callback = this._handleLoadOnDemand;
				}

				ds.nextPage();
			}

			return this;
		},
		_initSelectSchema: function () {
			var schema = {};

			schema.fields = [
				{
					name: this.options.valueKey,
					type: "string"
				},
				{
					name: this.options.textKey,
					type: "string"
				}
			 ];

			return schema;
		},
		_initSchema: function (firstDsRow) {
			var field,
				schema = {
					fields: [ ]
				};

			for (field in firstDsRow) {
				if (firstDsRow.hasOwnProperty(field)) {
					schema.fields.push({
						name: field,
						type: $.type(firstDsRow[ field ])
					});
				}
			}

			return schema;
		},
		_filteringCondition: function () {
			return this.options.autoComplete ? "startsWith" : this.options.filteringCondition;
		},
		_generateExpressions: function (texts) {
			var i, expressions = [ ];

			if ($.type(texts) === "string") {

				// K.D. March 3rd, 2015 Bug #189365 When clearing the filter leave the array empty.
				if (texts.length > 0 || (this._options.expression &&
					this._options.expression.length > 0)) {
					// R.K. August 23th 2016 Bug #260 Only lowercase items returned by igCombo filtering when filtering by turkish symbol ı
					if (texts.indexOf("ı") > -1 && !this.options.caseSensitive) {
						texts = texts.replace("ı", "ı|I");
						texts = new RegExp(texts);
					}
					expressions.push({
						fieldName: this.options.textKey,
						expr: texts,
						cond: this._filteringCondition()
					});
				}
			} else if ($.type(texts) === "array") {
				for (i = 0; i < texts.length; i++) {
					if ($.type(texts[ i ]) === "string") {
						expressions.push({
							fieldName: this.options.textKey,
							expr: texts[ i ],
							cond: this._filteringCondition(),
							logic: this.options.filteringLogic
						});
					} else {
						throw new Error(this._getLocaleValue("errorNoSupportedTextType"));
					}
				}
			} else {
				throw new Error(this._getLocaleValue("errorNoSupportedTextsType"));
			}

			return expressions;
		},
		_generateRegExpPattern: function (texts) {
			var pattern = null,
				types = {
					"multi": function (texts) {
						return "(" + texts.join("|") + ")";
					},
					"startsWith": function (texts) {
						return "^(" + texts.join("|") + ")";
					},
					"full": function (texts) {
						return "^" + texts.join("|") + "$";
					},
					"contains": function (texts) {
						return texts.join("|");
					}
				};

			if ($.type(texts) === "string") {
				texts = [ texts ];
			}

			// Filter empty strings
			texts = $.grep(texts, function (text) {
				return text !== "";
			});

			texts = $.map(texts, function (text) {
				return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
			});

			if (texts.length > 0) {
				if ($.type(types[ this.options.highlightMatchesMode ]) === "function") {
					pattern = types[ this.options.highlightMatchesMode ](texts);
				} else {
					throw new Error(this._getLocaleValue("errorUnrecognizedHighlightMatchesMode"));
				}
			}

			return pattern;
		},
		_highlight: function (texts) {
			var pattern, regex, $curContents, $matchingTextNodes,
				filterMatches, highlighMatches, len, i,
				$items = this._$items(),
				highlightElement = this._options.highlightElement,
				highlightCssClass = this.css.listItemHighlighted,
				regExpFlag = this.options.caseSensitive ? "" : "i";

			// Disabled highlighting with item templates
			if (this.options.highlightMatchesMode === null || this.options.itemTemplate) {
				return;
			}

			// Contains should return only first match but "g" makes return all matches. We are adding for all other modes "g".
			if (this.options.highlightMatchesMode !== "contains") {
				regExpFlag += "g";
			}

			pattern = this._generateRegExpPattern(texts);

			if (pattern) {
				regex = new RegExp(pattern, regExpFlag);

				// R.K. August 23th 2016 Bug #260 Only lowercase items returned by igCombo filtering when filtering by turkish symbol ı
				if (pattern.indexOf("ı") > -1 && !this.options.caseSensitive) {
					pattern = pattern.replace("ı", "ı|I");
					regex = new RegExp(pattern, regExpFlag);
				}

				filterMatches = function () {
					return this.nodeType === 3 && regex.test(this.nodeValue);
				};

				highlighMatches = function () {
					return (this.nodeValue || "")
						.replace(regex, function (match) {
							return "<" + highlightElement + " class=\"" + highlightCssClass +
								"\">" + match + "</" + highlightElement + ">";
						});
				};

				for (i = 0, len = $items.length; i < len; i++) {
					if (this._checkBoxesEnabled()) {
						$curContents = $items.eq(i).children("." +
							this.css.listItemTextWithCheckbox).contents();
					} else {
						$curContents = $items.eq(i).contents();
					}

					$matchingTextNodes = $curContents.filter(filterMatches);

					// Replace all matches
					$matchingTextNodes.replaceWith(highlighMatches);
				}
			}
		},
		_unhighlight: function () {
			var $highlightedItems, curItem, curParent, len, i;

			if (this.options.highlightMatchesMode === null) {
				return this;
			}

			if (this._checkBoxesEnabled()) {
				$highlightedItems = this._$items()
					.children("." + this.css.listItemTextWithCheckbox)
						.children("." + this.css.listItemHighlighted);
			} else {
				$highlightedItems = this._$items().children("." + this.css.listItemHighlighted);
			}

			for (i = 0, len = $highlightedItems.length; i < len; i++) {
				curItem = $highlightedItems.eq(i)[ 0 ];
				curParent = curItem.parentNode;

				// Replace the highlighted element with the text it wraps
				curParent.replaceChild(curItem.firstChild, curItem);
				curParent.normalize();
			}
		},

		// Updates filtering to reflect current input text
		_updateFiltering: function (event) {
			var val = this._options.inputVal;

			// Use text after last item separator with multiple selection enabled
			if (this.options.multiSelection.enabled) {
				if (this._endsPartialyWithItemSep(val)) {
					val = "";
				} else {
					val = this._lastValAfterItemSep();
				}
			}

			this.filter(val, event);
		},

		// Updates highlighting to reflect current input text
		_updateHighlighting: function () {
			var val = this._options.inputVal,
				selItemsLen = this._fullySelectedItemsLen(),
				skipHighlight = false;

			if (!this.options.multiSelection.enabled) {

				// D.A. 20th March 2015, Bug #190151 When virtualization is enabled the selected item is highlighted on scroll
				if (selItemsLen === 1) {
					skipHighlight = true;
				}
			} else {

				// D.A. 20th March 2015, Bug #190151 When virtualization is enabled the selected item is highlighted on scroll
				if (this._separatedInputTexts(val).length === selItemsLen) {
					skipHighlight = true;
				} else {

					// Use text after last item separator with multiple selection
					val = this._lastValAfterItemSep(val);
				}
			}

			this._unhighlight();
			if (!skipHighlight) {
				this._highlight(val);
			}
		},

		// Updates input values to reflect the current selection
		_updateInputValues: function (keepInputText, selectedItems) {
			var curText, curData, len, i,
				options = this.options,
				_options = this._options,
				inputVal = "",
				hiddenInputVal = "",
				itemSeparator = options.multiSelection.itemSeparator;

			selectedItems = selectedItems || this.selectedItems();
			len = selectedItems ? selectedItems.length : 0;

			// K.D. This is the allowCustomValues feature
			if (options.allowCustomValue && !len) {
				inputVal = _options.$input.val();
				hiddenInputVal = inputVal;
			}

			for (i = 0; i < len; i++) {
				curData = this._unwrapData(selectedItems[ i ].data);
				curText = this._unwrapData(curData[ options.textKey ]);

				if (i !== 0) {

					// Z.K. September 11, 2015 Bug #205954 - When dir=rtl and multiSelection is enabled intyp text is not correct when type in the input
					if (!_options.ltr) {
						inputVal = itemSeparator + inputVal;
						hiddenInputVal = itemSeparator + hiddenInputVal;
					} else {
						inputVal += itemSeparator;
						hiddenInputVal += itemSeparator;
					}
				}

				if (!_options.ltr) {
					if (curText !== "") {
						inputVal = this._formatItem(curText) + inputVal;
					}

					hiddenInputVal =
						this._unwrapData(curData[ options.valueKey ]) + hiddenInputVal;
				} else {

					// Z.K. 9th July 2015 Bug #202450 - "&nbsp;" displayed instead of blank value
					if (curText !== "") {
						inputVal += this._formatItem(curText);
					}

					hiddenInputVal += this._unwrapData(curData[ options.valueKey ]);
				}
			}

			if (!keepInputText) {

				// Append item separator when multi selection is enabled
				// When input is not focused we souldn't append it, this is to keep input value without item separator when combo is not focused
				if (options.multiSelection.enabled && len > 0 &&
					options.mode === "editable" && _options.$input.is(":focus")) {
					inputVal += itemSeparator;
				}

				// Update input val
				_options.$input.val(inputVal);

				this._setInputVal(inputVal);

				// Reset auto selected item when the input value changes
				_options.autoSelectedItemData = null;
			}

			_options.$hiddenInput.val(hiddenInputVal);
		},

		// This can be used to initially select item that was not loaded in handleInitialSelection
		//_requestDataByValue: function (value) {
		//	var ds,
		//		options = this.options,
		//		dataSourceOptions = {
		//			callback: this._requestDataByValueCallback,
		//			callee: this,
		//			// S.T. Feb 24th, 2015 Bug #189704: use string data source url
		//			dataSource: this._options.strDataSource,
		//			type: "remoteUrl",
		//			filtering: {
		//				type: "remote",
		//				filterExprUrlKey: options.filterExprUrlKey,
		//				expressions: [ {
		//					fieldName: this.options.valueKey,
		//					cond: "equals",
		//					expr: value
		//				} ]
		//			}
		//		};

		//	ds = new $.ig.JSONPDataSource(dataSourceOptions);

		//	ds.dataBind();
		//},
		//_requestDataByValueCallback: function (success, msg, data) {
		//	return data;
		//},
		_handleLocalFilteringWithGrouping: function () {
			var groupsLen, i, $group,
				visibleItems = [ ],
				self = this,
				$groupHeaders = this._$groupHeaders(),
				filterVisible = function (index, item) {

					// JD Sept 3, 2015, TFS 205303 - Need to add a check to prevent noMatchFound giving a false positive
					return !$(item).hasClass(self.css.hidden) &&
						!$(item).hasClass(self.css.noMatchFound);
				};

			for (i = 0, groupsLen = $groupHeaders.length; i < groupsLen; i++) {
				$group = $($groupHeaders[ i ]);

				visibleItems = $group
					.nextUntil(self._groupHeaderClass())
					.filter(filterVisible);

				if (visibleItems.length === 0) {
					$group.addClass(this.css.hidden);
				} else {
					$group.removeClass(this.css.hidden);
				}
			}
		},
		_handleLocalFiltering: function (dataSource) {
			var $curItem, curKey, filterItem, dataLen, i, j,
				unwrappedDataViewItem, unwrappedDataViewValue, $noMatchFoundItem,
				_options = this._options,
				valKey = this.options.valueKey,
				dataView = dataSource.dataView().slice(),
				initialDataLen = dataView.length,
				$items = this._$items(),
				len = $items.length,
				$keyNavItem = this._$keyNavItem(),
				cssHidden = this.css.hidden;

			// Filter items
			for (i = 0; i < len; i++) {
				$curItem = $items.eq(i);
				curKey = $curItem.attr("data-value");
				filterItem = true;

				for (j = 0, dataLen = dataView.length; j < dataLen && filterItem; j++) {
					unwrappedDataViewItem = this._unwrapData(dataView[ j ]);
					unwrappedDataViewValue = this._unwrapData(unwrappedDataViewItem[ valKey ]);

					if (this._areValuesEqual(curKey, unwrappedDataViewValue)) {
						filterItem = false;

						// Remove the matching data item to skip cheking for it again
						dataView.splice(j, 1);
					}
				}

				if (filterItem) {
					$curItem.addClass(cssHidden);
				} else {
					$curItem.removeClass(cssHidden);
				}
			}

			// S.T. 14 th July, 2015 #Bug 201921: Hide empty groups
			if (this.options.grouping.key) {
				this._handleLocalFilteringWithGrouping();
			}

			if ($keyNavItem.length > 0 && $keyNavItem.hasClass(cssHidden)) {

				// Reset key navigation item when it is filtered
				this._setKeyNavigationItem({
					data: $(),
					clearPrevItem: true
				});
			}

			// Add/remove no match found
			if (initialDataLen === 0) {

				// D.G. 24th November 2015 #Bug 209232: Check the dom for already existing no match found element
				if (!_options.$noMatchFound) {
					$noMatchFoundItem = this._$noMatchFoundItem();

					if ($noMatchFoundItem.length === 0) {
						_options.$noMatchFound = $(this._noMatchMarkup());
					} else {
						_options.$noMatchFound = $noMatchFoundItem;
					}
				}

				if (_options.$noMatchFound.parent().length === 0) {
					_options.$noMatchFound.appendTo(_options.$dropDownList);
				}
			} else if (_options.$noMatchFound && _options.$noMatchFound.parent().length > 0) {
				_options.$noMatchFound.detach();
			}
		},

		// Use this method as centralized place to change cached input value
		_setInputVal: function (val) {
			this._options.inputVal = val;
		},
		_setListContMaxHeight: function () {
			this._options.$dropDownListCont.css("maxHeight",
				this.options.visibleItemsCount * this._itemHeight());
		},
		_updateVirtualScrollVisibility: function () {
			if (this._isPossibleToVirtualize()) {
				this._options.$dropDownScrollCont.removeClass(this.css.hidden);
			} else if (this._areItemsLowerInVir()) {
				this._options.$dropDownScrollCont.addClass(this.css.hidden);
			}
		},
		_addItemSelectionStyles: function ($items) {
			var $curItem, len, i;

			for (i = 0, len = $items.length; i < len; i++) {
				$curItem = $items.eq(i);

				// S.T. 6th July, 2015 #201924: Skip adding selection on a group header.
				if (this._isGroupHeader($curItem)) {
					continue;
				}

				$curItem.addClass(this.css.active);

				if (this._checkBoxesEnabled()) {
					$curItem
						.find(".ui-igcombo-checkbox .ui-icon")
							.removeClass(this.css.checkboxOff)
							.addClass(this.css.checkboxOn);
				}
			}
		},
		_removeItemSelectionStyles: function ($items) {
			var $curItem, len, i;

			for (i = 0, len = $items.length; i < len; i++) {
				$curItem = $items.eq(i);
				$curItem.removeClass(this.css.active);

				if (this._checkBoxesEnabled()) {
					$curItem
						.find(".ui-igcombo-checkbox .ui-icon")
							.removeClass(this.css.checkboxOn)
							.addClass(this.css.checkboxOff);
				}
			}
		},
		_addItemSeparatorToEnd: function () {
			var newVal,
				inputVal = this._options.inputVal,
				itemSep = this.options.multiSelection.itemSeparator,
				sepTexts = this._separatedInputTexts(inputVal),
				selItemsLen = this._fullySelectedItemsLen();

			if (inputVal.length > 0 &&
				this.options.multiSelection.enabled &&
				!inputVal.endsWith(itemSep) &&
				sepTexts.length === selItemsLen) { // To not add item separator to unfinished selection
				newVal = inputVal + itemSep;
				this._options.$input.val(newVal);
				this._setInputVal(newVal);
			}
		},
		_removeItemSeparatorFromEnd: function () {
			var newVal,
				inputVal = this._options.inputVal,
				itemSep = this.options.multiSelection.itemSeparator;

			if (this.options.multiSelection.enabled && inputVal.endsWith(itemSep)) {
				newVal = inputVal.slice(0, inputVal.length - itemSep.length);
				this._options.$input.val(newVal);
				this._setInputVal(newVal);
			}
		},

		// Fire callbacks when selection is changed from api
		_callInternalSelChangeSubs: function (event) {
			var curCallback, i,
				callbacks = this._options.internalSelChangeSubs;

			if ($.type(callbacks) === "array") {
				for (i = 0; i < callbacks.length; i++) {
					curCallback = callbacks[ i ];

					if (typeof curCallback === "function") {
						curCallback();
					}
				}
			}
			if (this._options.validator) {
				this._options.validator._validateInternal(this.element, event);
			}
		},
		_fullySelectedItemsLen: function () {
			var autoSelItemLen = this._options.autoSelectedItemData === null ? 0 : 1;

			return this._options.selectedData.length - autoSelItemLen;
		},
		_unwrapData: function (data) {
			if (typeof data === "function") {
				data = data();
			}

			return data;
		},
		_dropDownOrientation: function () {
			var dropDownAndComboHeight,
				_options = this._options,
				direction = this.options.dropDownOrientation,
				$combo = _options.$combo,
				comboOffset = $combo.offset(),
				comboTopOffset = comboOffset.top,
				comboOuterHeight = parseInt($combo.outerHeight(), 10),
				dropDownContainerHeight = this._dropDownContHeight(),
				windowHeight = _options.$window.height(),

				// T.I. 29th Feb 2016 - Bug #207372 - Containers are not positioned correctly in a zoomer browser window
				windowScrollTop = comboOffset.documentScrollTop ?
					comboOffset.documentScrollTop :
					_options.$window.scrollTop();

			dropDownAndComboHeight = parseInt((comboTopOffset + comboOuterHeight +
				dropDownContainerHeight), 10);

			// Determine drop down direction
			if (direction === "auto") {
				if (dropDownAndComboHeight < windowHeight + windowScrollTop) {
					direction = "bottom";
				} else if ((comboTopOffset - dropDownContainerHeight) > 0) {
					direction = "top";
				} else {
					direction = "bottom";
				}
			}

			// For the issue when drop down container is opened and page scroller is used
			if (direction === "top") {
				if (_options.$dropDownCont.hasClass(this.css.orientationBottom)) {
					_options.$dropDownCont
						.removeClass(this.css.orientationBottom)
						.addClass(this.css.orientationTop);
				}
			} else {
				if (_options.$dropDownCont.hasClass(this.css.orientationTop)) {
					_options.$dropDownCont
						.removeClass(this.css.orientationTop)
						.addClass(this.css.orientationBottom);
				}
			}

			return direction;
		},
		_startRepositionInterval: function () {
			var self = this;

			this._options.repositionInterval = setInterval(function () {
				self.positionDropDown();
			}, 200);
		},
		_clearRepositionInterval: function () {
			clearInterval(this._options.repositionInterval);
		},

		// Used to compare data-attribute value, which is always a string, to data source value, which may not be string
		_areValuesEqual: function (val1, val2) {

			// Z.K. 27/08/2015 Bug #205313 - Not possible to select item because of illegal special characters encoding
			return (val1 !== null && val1 !== undefined && val2 !== null && val2 !== undefined) ?
				$.ig.encode(val1.toString()) === $.ig.encode(val2.toString()) : false;
		},

		// Checks whether certain value is contained in array of values while converting the values to string, because of data-attributes always being a string
		// This should be unsed instead of $.inArray/indexOf to find if value is contained in an array
		_isValueInArray: function (val, vals) {
			var i = 0,
				len = vals.length;

			val = val && val.toString();

			for (; i < len; i++) {
				if (this._areValuesEqual(val, vals[ i ])) {
					return i;
				}
			}

			return -1;
		},

		// Checks whether touch device is used with mode different than editable in order not to focus in the input element
		_focusInInputWhenUsingTouchDevice: function () {
			return !($.ig.util.isTouchDevice() && this.options.mode !== "editable");
		},
		_triggerItemsRendering: function () {
			var args = {
				owner: this,
				dataSource: this.options.dataSource
			};

			return this._trigger(this.events.itemsRendering, null, args);
		},
		_triggerItemsRendered: function () {
			var args = {
				owner: this,
				dataSource: this.options.dataSource
			};

			this._trigger(this.events.itemsRendered, null, args);
		},
		_triggerRendered: function () {
			var args = {
				owner: this,
				element: this._options.$comboWrapper
			};

			this._trigger(this.events.rendered, null, args);
		},
		_triggerDataBinding: function () {
			var args = {
				owner: this,
				dataSource: this.options.dataSource
			};

			return this._trigger(this.events.dataBinding, null, args);
		},
		_triggerDataBound: function (success, msg) {
			var args = {
				owner: this,
				success: success,
				errorMessage: msg,
				dataSource: this.options.dataSource
			};

			this._trigger(this.events.dataBound, null, args);
		},
		_triggerFiltering: function (event) {
			var args = {
				owner: this,
				expression: this._options.expression
			};

			return this._trigger(this.events.filtering, event, args);
		},
		_triggerFiltered: function (event) {
			var args = {
				owner: this,

				// D.A. May 12, 2015 Bug #193415 Bad performance when loading many items
				// Changing the method to return jquery reference to the filtered items instead of item: { data, element },
				// because the "data" to "element" match is very slow for over 10 000 elements
				elements: this._$filteredItems()
			};

			this._trigger(this.events.filtered, event, args);
		},
		_triggerDropDownOpening: function (event) {
			var args = {
				owner: this,
				list: this._options.$dropDownCont
			};

			return this._trigger(this.events.dropDownOpening, event, args);
		},
		_triggerDropDownOpened: function (event) {
			var args = {
				owner: this,
				list: this._options.$dropDownCont
			};

			this._trigger(this.events.dropDownOpened, event, args);
		},
		_triggerDropDownClosing: function (event) {
			var args = {
				owner: this,
				list: this._options.$dropDownCont
			};

			return this._trigger(this.events.dropDownClosing, event, args);
		},
		_triggerDropDownClosed: function (event) {
			var args = {
				owner: this,
				list: this._options.$dropDownCont
			};

			this._trigger(this.events.dropDownClosed, event, args);
		},
		_triggerSelectionChanging: function (newSelItems, currentSelItems, event) {
			var args = {
				owner: this,
				items: newSelItems,
				currentItems: currentSelItems
			};

			return this._trigger(this.events.selectionChanging, event, args);
		},
		_triggerSelectionChanged: function (newSelItems, oldItems, event) {
			var args = {
				owner: this,
				items: newSelItems,
				oldItems: oldItems
			};

			this._trigger(this.events.selectionChanged, event, args);
		},
		dataBind: function () {
			/* Performs databinding on the combo box. The [databinding](ui.igcombo#events:dataBinding) and [dataBound](ui.igcombo#events:dataBound) events are always raised.
			```
				$(".selector").igCombo("dataBind");
			```
				returnType="object" Returns reference to this igCombo.
			*/
			var noCancel;

			this._initDataSource();
			this._options.cachedData = [ ];
			noCancel = this._triggerDataBinding();

			if (noCancel) {
				if (!this._options.initialDataBinding) {
					this.clearInput();

					// Reset selectedData, because deselect() will not deselect non existent in data source values
					this._options.selectedData = [ ];
				}

				this.options.dataSource.dataBind(this._renderItems, this);
			}

			return this;
		},
		refreshValue: function () {
			/* Forces an update of the igCombo value according to the current text in the igCombo input.
			```
				$(".selector").igCombo("refreshValue");
			```
				The refresh is primarily intended to be used with [allowCustomValue](ui.igcombo#options:allowCustomValue) set to true.
				The refresh will take the current text and, if no selection is applied, will set it as igCombo value provided that [allowCustomValue](ui.igcombo#options:allowCustomValue) true.
				returnType="object" Returns reference to this combo.
			*/
			this._updateInputValues(true);
		},
		dataForValue: function (value) {
			/* Gets the associated data of an item by value matching it's [valueKey](ui.igcombo#options:valueKey) property.
			```
				var data = $(".selector").igCombo("dataForValue", value);
			```
				paramType="number|string" Value matching the valueKey property of item to be tested if it is selected
				returnType="object" The null or object - the associated data of the element
			*/
			var data, unwrappedDataItem, unwrappedDataValue, len, i,
				valKey = this.options.valueKey,
				cachedData = this._options.cachedData,
				matchFound = false,
				result = null;

			if (!this.options.dataSource || value === null || value === undefined) {
				return null;
			}

			data = this.options.dataSource.data();

			for (i = 0, len = data.length; i < len && !matchFound; i++) {
				unwrappedDataItem = this._unwrapData(data[ i ]);
				unwrappedDataValue = this._unwrapData(unwrappedDataItem[ valKey ]);

				if (this._areValuesEqual(unwrappedDataValue, value)) {
					result = data[ i ];
					matchFound = true;
				}
			}

			// Search in the cached records when filtering is remote and record wasn't found in the data
			if (!matchFound && this.options.filteringType === "remote") {
				for (i = 0, len = cachedData.length; i < len && !matchFound; i++) {
					unwrappedDataItem = this._unwrapData(cachedData[ i ]);
					unwrappedDataValue = this._unwrapData(unwrappedDataItem[ valKey ]);

					if (this._areValuesEqual(unwrappedDataValue, value)) {
						result = cachedData[ i ];
						matchFound = true;
					}
				}
			}

			return result;
		},
		dataForElement: function ($element) {
			/* Gets the associated data of li element in the combo.
			```
				var data = $(".selector").igCombo("dataForElement", $element);
			```
				paramType="object" optional="false" jQuery element of item in the drop down list
				returnType="object" The null or object - the associated data of the element
			*/
			if (!($element instanceof $ && $element.is(this._$items()))) {
				return null;
			}

			return this.dataForValue($element.attr("data-value"));
		},
		itemsFromElement: function ($element) {
			/* Gets object/s containing data and list item in the combo by element/s.
			```
				//from a list item
				var item = $(".selector").igCombo("itemsFromElement", $liElement);

				//from array of list items
				var items = $(".selector").igCombo("itemsFromElement", $liElements);
				var firstItemData = items[0].data;
				var $firstItemLi = items[0].element;
			```
				paramType="object" optional="false" jQuery object with drop down list item element or elements
				returnType="object" The null when no such item is found. Object when single element is provided or array with objects when multiple elements are provided containing following members: data - the associated data, element - the jquery element of the li
			*/
			var i, result, $curElement;

			if (!($element instanceof $ && $element.is(this._$items()))) {
				return null;
			}

			if ($element.length === 1) {
				result = {
					element: $element,
					data: this.dataForElement($element)
				};
			} else {
				result = [ ];

				for (i = 0; i < $element.length; i++) {
					$curElement = $element.eq(i);

					result.push({
						element: $curElement,
						data: this.dataForElement($curElement)
					});
				}
			}

			return result;
		},
		itemsFromValue: function (value) {
			/* Gets object/s containing data and list item in the combo by value/s.
			```
				//get item by value
				var item = $(".selector").igCombo("itemsFromValue", 2);

				//get items by values
				var items = $(".selector").igCombo("itemsFromValue", 2);
				var firstItemData = items[0].data;
				var $firstItemLi = items[0].element;
			```
				paramType="number|string|array" optional="false" Value of item in the drop down list or array with values.
				returnType="object" The null when no such item is found. Object when single element is provided or array with objects when multiple elements are provided containing following members: data - the associated data, element - the jquery element of the li
			*/
			var data, i, len,
				self = this,
				$items = this._$items(),
				result = null;

			if ($.type(value) === "array") {
				// Filter duplicate values
				value = $.grep(value, function (val, index) {
					return self._isValueInArray(val, value) === index;
				});

				for (i = 0, len = value.length; i < len; i++) {
					data = this.dataForValue(value[ i ]);

					if (data) {
						// Keep result null when no data is found
						if (!result) {
							result = [ ];
						}

						result.push({
							element: this._$elementFromValue(value[ i ], $items),
							data: data
						});
					}
				}
			} else {
				data = this.dataForValue(value);

				if (data) {
					result = {
						element: this._$elementFromValue(value, $items),
						data: data
					};
				}
			}

			return result;
		},
		itemsFromIndex: function (index) {
			/* Gets object/s containing data and list item in the combo by index/es.
			```
				//get item by index
				var item = $(".selector").igCombo("itemsFromIndex", 0);

				//get items by indexes
				var items = $(".selector").igCombo("itemsFromIndex", [0, 1, 2]);
				var firstItemData = items[0].data;
				var $firstItemLi = items[0].element;
			```
				paramType="number" optional="false" Index or array of indexes of items in the drop down list
				returnType="object" The null when no such item is found. Object when single element is provided or array with objects when multiple elements are provided containing following members: data - the associated data, element - the jquery element of the li
			*/
			var value, i,
				data = this.options.dataSource.data(),
				dataLen = data.length,
				valKey = this.options.valueKey;

			if ($.type(index) === "array") {
				value = [ ];

				for (i = 0; i < index.length; i++) {
					if (typeof index[ i ] === "number" && index[ i ] >= 0 &&
						index[ i ] < dataLen) {
						value.push(data[ index[ i ] ][ valKey ]);
					}
				}
			} else if (typeof index === "number" && index >= 0 && index < dataLen) {
				value = this._unwrapData(this._unwrapData(data[ index ])[ valKey ]);
			}

			return this.itemsFromValue(value);
		},
		items: function () {
			/* Gets array with data and objects representing li elements in combo box.
			```
				var items = $(".selector").igCombo("items");
				var firstItemData = items[0].data;
				var $firstItemLi = items[0].element;
			```
				returnType="array" The null or array with objects containing following members: data - the associated data, element - the jquery element of the li
			*/
			return this._itemsFromData(this.options.dataSource.data());
		},
		filteredItems: function () {
			/* Gets array with objects representing the filtered li elements in combo box.
			```
				var filteredItems = $(".selector").igCombo("filteredItems");
				var filteredItemData = filteredItems[0].data;
				var $filteredItemLi = filteredItems[0].element;
			```
				returnType="array" The null or array with objects containing following members: data - the associated data, element - the jquery element of the li
			*/
			return this._itemsFromData(this.options.dataSource.dataView());
		},
		selectedItems: function () {
			/* Gets array with objects representing selected li elements in combo box.
			```
				var items = $(".selector").igCombo("selectedItems");
				var firstItemData = items[0].data;
				var $firstItemLi = items[0].element;
			```
				returnType="array" The null or array with objects containing following members: data - the associated data, element - the jQuery element of the li.
			*/
			return this._options.selectedData.length > 0 ?
				this._itemsFromData(this._options.selectedData) : null;
		},
		filter: function (texts, event) {
			/* Triggers filtering.
			```
				//filter by string
				$(".selector").igCombo("filter", "Bob");

				//filter by array of strings
				$(".selector").igCombo("filter", ["Smith", "Mary"], true);

				//filter by string and trigger events
				$(".selector").igCombo("filter", "Bob", true);
			```
				paramType="string|array" optional="true" Filter by string, or array of strings.
				paramType="object" optional="true" Indicates the browser event which triggered this action (not API). Calling the method with this param set to "true" will trigger [filtering](ui.igcombo#events:filtering) and [filtered](ui.igcombo#events:filtered) events.
				returnType="object" Returns reference to this igCombo.
			*/
			var noCancel,
				ds = this.options.dataSource,
				type = this.options.filteringType,
				logic = this.options.filteringLogic,
				filterExprUrlKey = this.options.filterExprUrlKey,
				paging = ds.settings.paging,
				filtering = ds.settings.filtering,
				clearFiltering = texts === "";

			if (!this._isFilteringEnabled()) {
				return this;
			}

			// R.K 18th October 2016: #434 Filtering event returns wrong expression
			filtering.type = type;
			filtering.expressions = this._options.expression =
				this._generateExpressions(texts);
			filtering.caseSensitive = this.options.caseSensitive;

			noCancel = event ? this._triggerFiltering(event) : true;
			if (noCancel) {

				// Handle local filtering
				if (type === "local") {
					if (clearFiltering) {
						this._options.expression = null;
						ds.clearLocalFilter();
					} else {
						ds.filter(filtering.expressions, logic, true);
					}

					if (this.options.virtualization) {
						this._handleLocalFilteringWithVirt(ds);
					} else {
						this._handleLocalFiltering(ds);
					}
				}

				// Handle remote filtering
				if (type === "remote") {
					if (paging) {
						paging.pageIndex = 0;
						paging.appendPage = false;
					}

					if (filterExprUrlKey) {
						filtering.filterExprUrlKey = filterExprUrlKey;
					}

					// Cache the evt to use it when firing filtered
					this._options.remoteFilteringTriggerEvt = event;
					ds.dataBind(this._handleRemoteFiltering, this);
				}

				if (this._options.dropDownOpened) {
					this.listScrollTop(0);
				}

				if (event && !this._options.remoteFilteringTriggerEvt) {
					this._triggerFiltered(event);
				}
			}

			return this;
		},
		clearFiltering: function (event) {
			/* Clears filtering.
			```
				$(".selector").igCombo("clearFiltering");

				// triggering filtering and filtering
				$(".selector").igCombo("clearFiltering", true);
			```
				paramType="object" optional="true" Indicates the browser event which triggered this action (not API). Calling the method with this param set to "true" will trigger [filtering](ui.igcombo#events:filtering) and [filtered](ui.igcombo#events:filtered) events.
				returnType="object" Returns reference to this igCombo.
			*/
			var ds = this.options.dataSource,
				expression = this._options.expression;

			// K.D. March 3rd, 2015 Bug #189365 Filter should be cleared only if its applied.
			// D.A. May 12th, 2015 Bug #193431 Filtering should be skipped when empty ("") filter is applied
			if (!ds || !expression || expression.length <= 0 ||
				(expression.length === 1 && expression[ 0 ].expr === "")) {

				// S.T. June 18th 2015, Bug #200569: When filtering is remote closing the dropdown with value having partial item separator do not clear the input.
				// We should update the input here when we having remote filter and not applied filter because the clearFiltering function exit here and
				// no further update is executed.
				if (this._options.updateInputValuesOnRemoteFilter &&
					this._endsPartialyWithItemSep(this._options.inputVal)) {
					this._updateInputValues();
					this._hideClearButton();
				}

				// D.A. March 11th 2015, Bug #190152 When filtering is remote selecting an item and typing after it clears the input value
				this._options.updateInputValuesOnRemoteFilter = false;
				return;
			}

			this.filter("", event);

			// Z.K. July 1st 2015, Bug #201932 - When filtering is local and filter with no values after clear filtering the drop down is open in wrong location for a second
			this.positionDropDown();
			return this;
		},
		openDropDown: function (callback, focusCombo, event) {
			/* Opens the drop-down.
			```
				  $(".selector").igCombo("openDropDown");

				  //opens combo, executes the callback, focuses combo and triggers events
				  var callback = function() {
					  ...
				  }

				  $(".selector").igCombo("openDropDown", callback, true, true);
			```
				paramType="function" optional="true" Specifies callback function to be executed when open animation is completed.
				paramType="bool" optional="true" Set to false to not focus combo"s text input after the drop down is opened. By default the combo's input is focused.
				paramType="object" optional="true" Indicates the browser event which triggered this action (not API). Calling the method with this param set to "true" will trigger [dropDownOpening](ui.igcombo#events:dropDownOpening) and [dropDownOpened](ui.igcombo#events:dropDownOpened) events.
				returnType="object" Returns reference to this igCombo.
			*/
			var offset, itemHeight, noCancel, newAnimationStyle,
				_options = this._options,
				borderWidth = parseInt(_options.$combo.css("borderTopWidth"), 10),

				// T.I. 29th Feb 2016 - Bug #207372 - Containers are not positioned correctly in a zoomer browser window
				topPosition = $.ig.util.offset(_options.$combo).top - borderWidth,
				self = this,
				$ddCont = _options.$dropDownCont,
				orientation = this._dropDownOrientation(),
				autoHeight = this._dropDownContHeight();

			if (focusCombo === undefined) {
				focusCombo = true;
			}

			if (self.options.suppressKeyboard && $.ig.util.isTouchDevice()) {
				focusCombo = false;
			}

			if (!_options.dropDownOpened) {
				noCancel = event ? this._triggerDropDownOpening(event) : true;

				if (noCancel) {
					_options.dropDownOpened = true;
					this.positionDropDown();

					// D.A. 27th April 2015, Bug #192964 Scroll to last selected item when opening the drop down
					this._scrollToLastSelItem();

					if (orientation === "top") {
						$ddCont
							.addClass(this.css.orientationTop)
							.removeClass(this.css.orientationBottom)
								.css({
									top: parseInt($ddCont.css("top"), 10) - 1
								});

						if (this.options.dropDownAttachedToBody) {
							newAnimationStyle = {
								height: autoHeight,
								top: topPosition - autoHeight
							};
						} else {
							newAnimationStyle = {
								height: autoHeight,
								top: -autoHeight - borderWidth
							};
						}
					} else {
						$ddCont
							.addClass(this.css.orientationBottom)
							.removeClass(this.css.orientationTop);

						newAnimationStyle = {
							height: autoHeight
						};
					}

					this._startRepositionInterval();

					$ddCont
						.stop()
						.removeClass(this.css.noBorder)
						.animate(newAnimationStyle, {
							duration: this.options.animationShowDuration,
							queue: false,
							easing: "swing",
							complete: function () {

								// Remove inline styles
								$ddCont
									.height("")
									.css("overflow", "");

								// S.T. April 27th, 2015 Bug #192899: The offset has to be calculated after animation is completed. Otherwise it's zero.
								// If virtualization is enabled and scroll is moved, we need to go to scrolled items
								if (self.options.virtualization) {
									itemHeight = self._itemHeight();
									offset = self._offsetItems(self.options
										.dataSource.dataView(), itemHeight);
									self._updateItems(offset);
								}

								if ($.type(callback) === "function") {
									callback();
								}

								if (event) {
									self._triggerDropDownOpened(event);
								}
							}
						});

					if (focusCombo) {
						this._moveCaretToInputEnd(false);
					}
				}
			}

			return this;
		},
		closeDropDown: function (callback, event) {
			/* Closes the drop down.
			```
				$(".selector").igCombo("closeDropDown");

				// using callback and triggering events
				var callback = function () {
					...
				}

				$(".selector").igCombo("closeDropDown", callback, true);
			```
				paramType="function" optional="true" Specifies callback function to be executed when close animation is completed.
				paramType="object" optional="true" Indicates the browser event which triggered this action (not API). Calling the method with this param set to "true" will trigger [dropDownClosing](ui.igcombo#events:dropDownClosing) and [dropDownClosed](ui.igcombo#events:dropDownClosed) events.
				returnType="object" Returns reference to this igCombo.
			*/
			var noCancel, newAnimationStyle,
				_options = this._options,
				self = this,
				borderWidth = parseInt(_options.$combo.css("borderTopWidth"), 10),
				orientation = this._dropDownOrientation();

			if (_options.dropDownOpened && (!_options.dataBinding ||
				_options.closingDropDownOnBlur)) {
				noCancel = event ? this._triggerDropDownClosing(event) : true;

				if (noCancel) {
					this.positionDropDown();

					if (orientation === "top") {
						if (this.options.dropDownAttachedToBody) {
							newAnimationStyle = {
								height: 0,

								// T.I. 29th Feb 2016 - Bug #207372 - Containers are not positioned correctly in a zoomer browser window
								top: $.ig.util.offset(_options.$combo).top - borderWidth,
								left: $.ig.util.offset(_options.$dropDownCont).left
							};
						} else {
							newAnimationStyle = {
								height: 0,
								top: 0
							};
						}
					} else {
						newAnimationStyle = {
							height: 0
						};
					}

					_options.$dropDownCont
						.stop()
						.css("overflow", "hidden")
						.animate(newAnimationStyle, {
							duration: this.options.animationHideDuration,
							queue: false,
							easing: "swing",
							complete: function () {
								self._clearRepositionInterval();

								_options.$dropDownCont
									.addClass(self.css.noBorder)
									.removeClass(self.css.orientationBottom)
									.removeClass(self.css.orientationTop)
									.css({
										top: -99999,
										left: -99999
									});

								if (self.options.filteringType !== "remote") {
									self._updateInputValues();
									self._unhighlight();
									self.clearFiltering(event);

									if (self.options.multiSelection.enabled) {

										// Reset key navigation item
										self._setKeyNavigationItem({
											data: $(),
											clearPrevItem: true
										});
									}

									// K.D. August 25, 2015 Bug #205056 When allowCustomValue is true and type not existing text clear button is not visible
									if ((!self.options.allowCustomValue &&
										_options.selectedData.length === 0) ||
											(self.options.allowCustomValue &&
												_options.$input.val() === "")) {
										self._hideClearButton();
									}

									self._removePlaceholderOnEmptyTextVal();

									if (_options.validator) {
										_options.validator
											._validateInternal(self.element, event, true);
									}
								} else {
									_options.updateInputValuesOnRemoteFilter = true;
									self.clearFiltering(event);
								}

								if ($.type(callback) === "function") {
									callback();
								}

								// S.T. 4th September 2015, #204981: The flag should be set to false at the end of closing.
								_options.dropDownOpened = false;

								_options.closingDropDownOnBlur = false;

								if (event) {
									self._triggerDropDownClosed(event);
								}
							}
						});
				}
			}

			return this;
		},

		// H.A. 23 February 2016, #212566: igCombo gets focus when data source is changed and value is set.
		clearInput: function (options, event) {
			/* Clears the input text, resets highlighting, filtering and selection.
			```
				$(".selector").igCombo("clearInput");

				// clearing input, focusing the input and triggering events
				$(".selector").igCombo("clearInput", { focusCombo : true }, true);
			```
				paramType="object" optional="true" Object with set of options controlling the behavior of this api method.
					focusCombo (boolean): Set to true to focus combo after clearing the input.
				paramType="object" optional="true" Indicates the browser event which triggered this action (not API). Calling the method with this param set to "true" will trigger [selectionChanging](ui.igcombo#events:selectionChanging) and [selectionChanged](ui.igcombo#events:selectionChanged) events.

				returnType="object" Returns reference to this igCombo.
			*/

			// H.A. 23 February 2016, #212566: igCombo gets focus when data source is changed and value is set.
			options = options || {};

			this._options.$input.val("");
			this._options.$hiddenInput.val("");
			this._setInputVal("");

			// H.A. 23 February 2016, #212566: igCombo gets focus when data source is changed and value is set.
			this.deselectAll(options, event);
			this.clearFiltering(event);
			this._unhighlight();

			// Bug #189829 When changing dataSource, if there was selected item clear button stays
			this._hideClearButton();
			this._setKeyNavigationItem({
				data: $(),
				clearPrevItem: true
			});

			return this;
		},
		_hideClearButton: function () {
			if (!this.options.enableClearButton) {
				return;
			}

			this._options.$clearCont.hide();
		},
		_showClearButton: function (force) {
			if (!force && !this.options.enableClearButton) {
				return;
			}

			this._options.$clearCont.show();
		},
		isSelected: function ($item) {
			/* Verifies whether the specified li is selected.
			```
				var isSelected = $(".selector").igCombo("isSelected", $item);
			```
				paramType="object" optional="false" jQuery object with item to verify whether it is selected.
				returnType="bool" Returns boolean representing whether the item is selected
			*/
			return $item instanceof $ ? this.isValueSelected($item.attr("data-value")) : false;
		},
		isValueSelected: function (value) {
			/* Verifies whether a specified value is selected.
			```
				//value as number
				var isValueSelected = $(".selector").igCombo("isValueSelected", 2);

				//value as string
				var isValueSelected = $(".selector").igCombo("isValueSelected", "2");
			```
				paramType="number|string" optional="false" Value matching the [valueKey](ui.igcombo#options:valueKey) property of item to be tested if it is selected
				returnType="bool" Returns boolean representing whether the item is selected
			*/
			return this._isValueInArray(value,
				this._valuesFromData(this._options.selectedData)) !== -1;
		},
		isIndexSelected: function (index) {
			/* Verifies whether the li representing the data source's record at the specified index is selected.
			```
				var isIndexSelected = $(".selector").igCombo("isIndexSelected", 2);
			```
				paramType="object" optional="false" Index of data source record
				returnType="bool" Returns boolean representing whether the item is selected
			*/
			return this.isValueSelected(this.options
				.dataSource.data()[ index ][ this.options.valueKey ]);
		},

		// Keeping the function private to ensure always calling it with correct
		// parameters and faster execution time for large amount of data
		_selectData: function (data, options, event) {
			/* Selects list item/items from the drop down list by specified value or array of values. When called witout params will return the value of the selected item or if multiple selection is enabled array of selected values.
				paramType="number|string|array" optional="true" Value or array of values matching the valueKey property of item/items to be selected
				paramType="object" optional="true" Object with set of options controlling the behavior of this api method.
					closeDropDown (boolean): Set to true to close the drop down list after the selection.
					focusCombo (boolean): Set to true to focus combo after the selection.
					additive (boolean): Set to true to select the item without losing other selection. Works only when multi selection is enabled.
					keepFiltering (boolean): Set to true to keep filtering after the selection. By default the filtering is cleared.
					keepInputText (boolean): Set to true to keep input text unchanged after the selection. By default input text is updated.
					keepHighlighting (boolean): Set to true to keep highlighting unchanged after the selection. By default highlighting is removed.
					keepNavItem (boolean): Set to true to keep current navigation item unchanged after the selection. By default the navigation item is changed to the new selected item.
					keepScrollPosition (boolean): Set to true to keep current scroll position. By default the scroll position will change so that the last selected item is visible.
				paramType="object" optional="true" Indicates the browser event which triggered this action (not API). Calling the method with this param set to "true" will trigger selection changed event.
				returnType="object" Returns an object consisting of the following members.
					combo (object): Reference to this combo.
					selectionCanceled (boolean): Whether or not the selectionChanging event was canceled.
			*/
			var items, itemsLen, selectedValues, newSelItems, selAutoSelectedItem,
				selChanged, additive, prevSelValues, newSelData, skipEventTrigger, noCancel, i,
				comboOptions = this.options,
				_options = this._options,
				multiSelEnabled = comboOptions.multiSelection.enabled,
				prevSelItems = this.selectedItems(),
				returnValue = { combo: this, selectionCanceled: false };

			// Use first data when multi selection is not enabled
			data = ($.type(data) === "array" && !multiSelEnabled) ? data[ 0 ] : data;
			items = this._itemsFromData(data);

			options = options || {};

			if (items === null) {

				// Z.K. 30/06/2015 Bug #201518 - Selection is not initialized after clear viewmodel's collection when using knockoutjs
				if (!options.additive) {
					this.deselectAll(options, event);
				}

				return returnValue;
			}

			if ($.type(items) !== "array") {
				items = [ items ];
			}

			additive = options.additive && multiSelEnabled;
			itemsLen = items.length;
			selectedValues = this._valuesFromItems(items);

			if (additive) {

				// When selection is additive, selection will change only when any of the new items is not selected
				for (i = 0; i < itemsLen && !selChanged; i++) {
					if (!this.isValueSelected(items[ i ].data[ comboOptions.valueKey ])) {
						selChanged = true;
					}
				}
			} else {

				// When selection is not additive, selection will change only when new selection is not the same as the old selection
				prevSelValues = this._valuesFromItems(prevSelItems);

				// This compares the prev and new selected values for equality
				// Z.K. June 30, 2016 #17 not() behavior is changed in jQuery 3.0.0
				if (!$.ig.util.areSetsEqual(selectedValues, prevSelValues)) {
					selChanged = true;
				}
			}

			// Reset auto selected item
			if (this._isValueInArray(_options.autoSelectedItemData &&
				_options.autoSelectedItemData[ comboOptions.valueKey ], selectedValues) !== -1) {
				selAutoSelectedItem = true;

				// When only auto selected item is being selected we shouldn't trigger events,
				// because there is no real selection changing, the item was selected beforehand.
				// H.A. 29/01/2015 Bug #212663 - igCombo selectionChanged not fired when accepting auto-completed value
				if (this._options.selectedData.length > 0) {
					if (itemsLen === 1 &&
						this._options.autoSelectedItemData[ comboOptions.valueKey ] ===
							this._options.selectedData[ 0 ][ comboOptions.valueKey ]) {
						skipEventTrigger = (itemsLen === 1 &&
							this._options.autoSelectedItemData[ comboOptions.valueKey ] ===
								this._options.selectedData[ 0 ][ comboOptions.valueKey ]);
					}
				}
			}

			if (selChanged || selAutoSelectedItem) {
				if (additive && prevSelItems) {
					newSelItems = prevSelItems.concat(this._filterItems(items, prevSelItems));
					newSelData = this._dataFromItems(newSelItems);
				} else {
					newSelItems = items;
					newSelData = this._dataFromItems(newSelItems);
				}

				if (event && !skipEventTrigger) {

					// Z.K March 14, 2016 - Fixing Bug #215857 originalEvent and keyCode are missing from event parameter on selectionChanging event
					noCancel = this._triggerSelectionChanging(newSelItems, prevSelItems, event);
				} else {
					noCancel = true;
				}

				// R.K. 5th of May 2017 #986: The editor text changes even if selectionChanging event is canceled when allowCustomValue is set to true
				returnValue.selectionCanceled = !noCancel;

				if (noCancel) {

					// Update selected data
					_options.selectedData = newSelData;

					// Remove styling from previously selected items
					if (prevSelItems && prevSelItems.length > 0 && !additive) {
						this._removeItemSelectionStyles(this
							._$elementsFromItems(this._filterItems(prevSelItems, items)));
					}

					// Add styling to the new selected items
					this._addItemSelectionStyles(this._$elementsFromItems(newSelItems));
					this._updateInputValues(options.keepInputText, newSelItems);

					if (!options.keepHighlighting) {
						this._unhighlight();
					}

					this._showClearButton();

					if (options.focusCombo) {

						// D.A. May 28th, 2015 Bug #194600 Avoid moving the carret when there is auto completed text, because this would lose the selection
						if (!(options.autoComplete && this._hasInputSelection())) {

							// Focus input and to set carret to end of the text input
							this._moveCaretToInputEnd(true);
						}
					}

					if (!options.keepNavItem) {

						// Set new key nav to the last selected item or reset it if the last selected is null when virtialization or remote filtering is enabled
						this._setKeyNavigationItem({

							// S.T. 2th Sept 2015: #202979: The data should be provided instead of element.
							data: items[ itemsLen - 1 ].data ? items[ itemsLen - 1 ].data : $(),
							clearPrevItem: true
						});
					}

					// Cache selected items when filtering is remote
					if (comboOptions.filteringType === "remote") {
						this._options.cachedData = this._dataFromItems(newSelItems);
					}

					// D.A. 11th March 2015, Bug #190158 Close drop down should be called before clear filtering, because when filtering is remote the drop down does not close
					if (options.closeDropDown) {

						// Z.K. 25/08/2015 Bug #205191 - combo dropDownClosing event fired twice
						// Close drop down. Trigger closing only when event is provided.
						//noCancel = event ? this._triggerDropDownClosing(event) : true;
						//if (noCancel) {
						this.closeDropDown(null, event);

						//}
					}

					if (!options.keepFiltering) {
						this.clearFiltering(event);
					}

					this._removePlaceholderOnEmptyTextVal();

					// D.A. 14th July, 2015 Bug #202197 The dropdown does not automatically scroll to the selected item.
					if (!options.keepScrollPosition) {
						this._scrollToLastSelItem();
					}

					// Execute subscribed callbacks
					this._callInternalSelChangeSubs(event);

					// When selecting single already auto selected item, no selection change is happening
					if (event && !skipEventTrigger) {
						this._triggerSelectionChanged(newSelItems, prevSelItems, event);
					}
				}
			} else if (options.closeDropDown) {

				// D.A. 12th March 2015, Bug #190262 When selecting already selected item, the drop down is not closed
				noCancel = event ? this._triggerDropDownClosing(event) : true;
				if (noCancel) {
					this.closeDropDown(null, event);
				}
			}

			return returnValue;
		},
		value: function (value, options, event) {
			/* Selects list item/items from the drop-down list by specified value or array of values. When called witout params will return the value of the selected item or if [multiSelection](ui.igcombo#options:multiSelection) is enabled array of selected values.
			```
				//Get value/s
				var value = $(".selector").igCombo("value");

				//Set value
				$(".selector").igCombo("value", 2);

				//Set values
				$(".selector").igCombo("value", [1, 2]);

				//Set value, set options controlling behavior and trigger events
				$(".selector").igCombo("value", 3, {
					closeDropDown: true,
					focusCombo: true,
					additive: true,
					keepFiltering: true,
					keepInputText: true,
					keepHighlighting: true,
					keepNavItem: true,
					keepScrollPosition: true
				}, true);
			```
				paramType="number|string|array" optional="true" Value or array of values matching the valueKey property of item/items to be selected
				paramType="object" optional="true" Object with set of options controlling the behavior of this api method.
					closeDropDown (boolean): Set to true to close the drop down list after the selection.
					focusCombo (boolean): Set to true to focus combo after the selection.
					additive (boolean): Set to true to select the item without losing other selection. Works only when multi selection is enabled.
					keepFiltering (boolean): Set to true to keep filtering after the selection. By default the filtering is cleared.
					keepInputText (boolean): Set to true to keep input text unchanged after the selection. By default input text is updated.
					keepHighlighting (boolean): Set to true to keep highlighting unchanged after the selection. By default highlighting is removed.
					keepNavItem (boolean): Set to true to keep current navigation item unchanged after the selection. By default the navigation item is changed to the new selected item.
					keepScrollPosition (boolean): Set to true to keep current scroll position. By default the scroll position will change so that the last selected item is visible.
				paramType="object" optional="true" Indicates the browser event which triggered this action (not API). Calling the method with this param set to "true" will trigger [selectionChanging](ui.igcombo#events:selectionChanging) and [selectionChanged](ui.igcombo#events:selectionChanged) events.
				returnType="object" Returns reference to this igCombo, or array of values if the value parameter is provided.
			*/
			var selectedValues, selectedItems, i, retValue;

			// Return value of the value input when called without params
			if (value === undefined) {
				selectedValues = [ ];
				selectedItems = this.selectedItems();

				if (selectedItems) {
					for (i = 0; i < selectedItems.length; i++) {
						selectedValues.push(selectedItems[ i ].data[ this.options.valueKey ]);
					}
				} else if (this.options.allowCustomValue &&
					this._options.$hiddenInput.val() !== "") {
					selectedValues.push(this._options.$hiddenInput.val());
				}

				if (!this.options.multiSelection.enabled && selectedItems) {
					selectedValues = selectedValues.length > 0 ? selectedValues[ 0 ] : null;
				}

				return selectedValues;
			}

			retValue = this._selectData(this._dataForValues(value), options, event);

			// R.K. 5th of May 2017 #986: The editor text changes even if selectionChanging event is canceled when allowCustomValue is set to true
			if (this.options.allowCustomValue && !this.selectedItems() &&
					!retValue.selectionCanceled) {
				this._options.$input.val(value);
				this._updateInputValues();

				// K.D. September 8th, 2015 Bug #205881 Clear button is not shown after setting custom value through API.
				this._showClearButton();
			}
		},
		select: function ($items, options, event) {
			/* Selects a list item from the drop-down list.
			```
				//select item
				$(".selector").igCombo("select", $item);

				//select items
				$(".selector").igCombo("select", $items);

				//select items, set options controlling the behavior and trigger events
				$(".selector").igCombo("select", $item, {
					closeDropDown: true,
					focusCombo: true,
					keepFiltering: true,
					keepInputText: true,
					keepHighlighting: true,
					keepNavItem: true
				}, true);
			```
				paramType="object" optional="false" jQuery object with item or items to be selected.
				paramType="object" optional="true" Object with set of options controlling the behavior of this api method.
					closeDropDown (boolean): Set to true to close the drop down list after the selection.
					focusCombo (boolean): Set to true to focus combo after the selection.
					additive (boolean): Set to true to select the item without losing other selection. Works only when multi selection is enabled.
					keepFiltering (boolean): Set to true to keep filtering after the selection. By default the filtering is cleared.
					keepInputText (boolean): Set to true to keep input text unchanged after the selection. By default input text is updated.
					keepHighlighting (boolean): Set to true to keep highlighting unchanged after the selection. By default highlighting is removed.
					keepNavItem (boolean): Set to true to keep current navigation item unchanged after the selection. By default the navigation item is changed to the new selected item.
					keepScrollPosition (boolean): Set to true to keep current scroll position. By default the scroll position will change so that the last selected item is visible.
				paramType="object" optional="true" Indicates the browser event which triggered this action (not API). Calling the method with this param set to "true" will trigger [selectionChanging](ui.igcombo#events:selectionChanging) and [selectionChanged](ui.igcombo#events:selectionChanged) events.
				returnType="object" Returns reference to this igCombo.
			*/
			if ($items instanceof $) {
				this.value(this._valuesFromElements($items), options, event);
			}

			return this;
		},
		index: function (index, options, event) {
			/* Gets/Sets selected item/s from the drop-down list by specified index.
			```
				//get selected item index
				var selectedItemIndex = $(".selector").igCombo("index");

				//get selected items indexes
				var selectedItemsIndexesArray = $(".selector").igCombo("index");

				//select item by index
				$(".selector").igCombo("index", 3);

				//select items by indexes
				$(".selector").igCombo("index", [0, 1, 2]);

				//selects item by index, set options after selecting the item and trigger events
				$(".selector").igCombo("index", 3, {
					// Closes the drop down list after the selection.
					closeDropDown: true,
					// Focus combo after the selection.
					focusCombo: true,
					// Selects the item without losing other selection. Works only when multi selection is enabled.
					additive: true,
					// Keeps input text unchanged after the selection. By default input text is updated.
					keepInputText: true,
					// Keeps highlighting unchanged after the selection. By default highlighting is removed.
					keepHighlighting: true,
					// Keeps current navigation item unchanged after the selection. By default the navigation item is changed to the new selected item.
					keepNavItem: true,
					// Keeps current scroll position. By default the scroll position will change so that the last selected item is visible.
					keepScrollPosition: true,
					// Calling the method with this param set to "true" will trigger selection changed event.
				}, true);
			```
				paramType="number|array" optional="true" Index or array of indexes of items to be selected
				paramType="object" optional="true" Object with set of options controlling the behavior of this api method.
					closeDropDown (boolean): Set to true to close the drop down list after the selection.
					focusCombo (boolean): Set to true to focus combo after the selection.
					additive (boolean): Set to true to select the item without losing other selection. Works only when multi selection is enabled.
					keepFiltering (boolean): Set to true to keep filtering after the selection. By default the filtering is cleared.
					keepInputText (boolean): Set to true to keep input text unchanged after the selection. By default input text is updated.
					keepHighlighting (boolean): Set to true to keep highlighting unchanged after the selection. By default highlighting is removed.
					keepNavItem (boolean): Set to true to keep current navigation item unchanged after the selection. By default the navigation item is changed to the new selected item.
					keepScrollPosition (boolean): Set to true to keep current scroll position. By default the scroll position will change so that the last selected item is visible.
				paramType="object" optional="true" Indicates the browser event which triggered this action (not API). Calling the method with this param set to "true" will trigger [selectionChanging](ui.igcombo#events:selectionChanging) and [selectionChanged](ui.igcombo#events:selectionChanged) events.
				returnType="object" Returns reference to this igCombo, or array of indices if the index parameter is provided.
			*/
			var selectedItems, indexes, unwrappedDataItem, unwrappedDataValue, i, len,
				dataToSel = [ ];

			// Return the selected index or array with selected indexes if more than one items are selected
			if (index === undefined) {
				selectedItems = this.selectedItems();

				if (selectedItems.length === 1) {
					unwrappedDataItem = this._unwrapData(selectedItems[ 0 ].data);
					unwrappedDataValue =
						this._unwrapData(unwrappedDataItem[ this.options.valueKey ]);
					indexes = this._dataIndexByValue(unwrappedDataValue);
				} else {
					indexes = [ ];

					for (i = 0; i < selectedItems.length; i++) {
						unwrappedDataItem = this._unwrapData(selectedItems[ i ].data);
						unwrappedDataValue =
							this._unwrapData(unwrappedDataItem[ this.options.valueKey ]);
						indexes.push(this._dataIndexByValue(unwrappedDataValue));
					}
				}

				return indexes;
			}

			if ($.type(index) !== "array") {
				index = [ index ];
			}

			for (i = 0, len = index.length; i < len; i++) {
				dataToSel.push(this._dataFromIndex(index[ i ]));
			}

			this._selectData(dataToSel, options, event);

			return this;
		},
		selectAll: function (options, event) {
			/* Selects all items from the drop-down list.
			```
				$(".selector").igCombo("selectAll");

				//select all, set options controlling behavior
				$(".selector").igCombo("selectAll", {
						closeDropDown: true,
						focusCombo: true,
						keepFiltering: true,
						keepInputText: true,
						keepHighlighting: true,
						keepNavItem: true,
						keepScrollPosition: true
					}, true);
			```
				paramType="object" optional="true" Object with set of options controlling the behavior of this api method.
					closeDropDown (boolean): Set to true to close the drop down list after the selection.
					focusCombo (boolean): Set to true to focus combo after the selection.
					keepFiltering (boolean): Set to true to keep filtering after the selection. By default the filtering is cleared.
					keepInputText (boolean): Set to true to keep input text unchanged after the selection. By default input text is updated.
					keepHighlighting (boolean): Set to true to keep highlighting unchanged after the selection. By default highlighting is removed.
					keepNavItem (boolean): Set to true to keep current navigation item unchanged after the selection. By default the navigation item is changed to the new selected item.
					keepScrollPosition (boolean): Set to true to keep current scroll position. By default the scroll position will change so that the last selected item is visible.
				paramType="object" optional="true" Indicates the browser event which triggered this action (not API). Calling the method with this param set to "true" will trigger [selectionChanging](ui.igcombo#events:selectionChanging) and [selectionChanged](ui.igcombo#events:selectionChanged) events.
				returnType="object" Returns reference to this igCombo.
			*/
			options = options || {};

			this._selectData(this.options.dataSource.data(), options, event);
			return this;
		},
		_deselectData: function (data, options, event) {
			/* Deselects a list item from the drop down list by value
				paramType="number|string|array" optional="false" Value or array of values matching the valueKey property of item/items to be deselected
				paramType="object" optional="true" Object with set of options controlling the behavior of this api method.
					focusCombo (boolean): Set to true to focus combo after the deselection.
					keepInputText (boolean): Set to true to keep input text unchanged after the deselection. By default input text is updated.
				paramType="object" optional="true" Indicates the browser event which triggered this action (not API). Calling the method with this param set to "true" will trigger selection changed event.
				returnType="object" Returns reference to this igCombo.
			*/
			var newSelItems, selChanged, noCancel, len, i,
				_options = this._options,
				items = this._itemsFromData(data),
				prevSelItems = this.selectedItems();

			options = options || {};

			if (items === null) {
				return this;
			}

			if ($.type(items) !== "array") {
				items = [ items ];
			}

			// Selection will change when at least one of the given items was previously selected
			for (i = 0, len = items.length; i < len && !selChanged; i++) {
				if (this.isValueSelected(items[ i ].data[ this.options.valueKey ])) {
					selChanged = true;
				}
			}

			if (selChanged) {
				newSelItems = this._filterItems(prevSelItems, items);

				// Z.K March 14, 2016 - Fixing Bug #215857 originalEvent and keyCode are missing from event parameter on selectionChanging event
				noCancel = event ?
					this._triggerSelectionChanging(newSelItems, prevSelItems, event) :
					true;

				if (noCancel) {

					// Update selected data
					_options.selectedData = this._dataFromItems(newSelItems);

					// Remove styling from deselected items
					this._removeItemSelectionStyles(this._$elementsFromItems(items));
					this._updateInputValues(options.keepInputText, newSelItems);
					this._unhighlight();

					if (_options.selectedData.length === 0) {
						this._setKeyNavigationItem({
							data: $(),
							clearPrevItem: true
						});
					}

					if (_options.inputVal === "") {
						this._hideClearButton();
					}

					if (options.focusCombo) {
						if (this._focusInInputWhenUsingTouchDevice()) {

							// Focus combo and set carret to text input"s end
							this._moveCaretToInputEnd(true);
						}
					}

					// Cache selected items when filtering is remote
					if (this.options.filteringType === "remote") {
						this._options.cachedData = this._dataFromItems(newSelItems);
					}

					this._addPlaceholderWhenEmptyTextVal();

					// Execute subscribed callbacks
					this._callInternalSelChangeSubs(event);

					if (event) {
						this._triggerSelectionChanged(newSelItems, prevSelItems, event);
					}
				}
			}

			return this;
		},
		deselectByValue: function (value, options, event) {
			/* Deselects a list item from the drop down list by value.
			```
				//deselect by value
				$(".selector").igCombo("deselectByValue", 3);

				//deselect by value as string
				$(".selector").igCombo("deselectByValue", "3");

				//deselect by array of values
				$(".selector").igCombo("deselectByValue", [1,2,3]);

				//deselect by value, focus combo, keep input text and trigger events
				$(".selector").igCombo("deselectByValue", 1, { focusCombo: true, keepInputText: true }, true);
			```
				paramType="number|string|array" optional="false" Value or array of values matching the [valueKey](ui.igcombo#options:valueKey) property of item/items to be deselected
				paramType="object" optional="true" Object with set of options controlling the behavior of this api method.
					focusCombo (boolean): Set to true to focus combo after the deselection.
					keepInputText (boolean): Set to true to keep input text unchanged after the deselection. By default input text is updated.
				paramType="object" optional="true" Indicates the browser event which triggered this action (not API). Calling the method with this param set to "true" will trigger [selectionChanging](ui.igcombo#events:selectionChanging) and [selectionChanged](ui.igcombo#events:selectionChanged) events.
				returnType="object" Returns reference to this igCombo.
			*/
			options = options || {};

			// Deselect when there is single selected item and no value provided
			if (value === undefined && this._options.selectedData.length === 1) {
				value = this._options.selectedData[ 0 ][ this.options.valueKey ];
			}

			this._deselectData(this._dataForValues(value), options, event);
		},
		deselect: function ($items, options, event) {
			/* Deselects a list item from the drop down list.
			```
				//deselect item
				$(".selector").igCombo("deselect", $itemLi);

				//deselect items
				$(".selector").igCombo("deselect", $itemsLi);

				//deselect item, focus combo, keep input text and trigger events
				$(".selector").igCombo("deselect", $itemLi, { focusCombo: true, keepInputText: true }, true);
			```
				paramType="object" optional="false" jQuery object with item or items to be deselected
				paramType="object" optional="true" Object with set of options controlling the behavior of this api method.
					focusCombo (boolean): Set to true to focus combo after the deselection.
					keepInputText (boolean): Set to true to keep input text unchanged after the deselection. By default input text is updated.
				paramType="object" optional="true" Indicates the browser event which triggered this action (not API). Calling the method with this param set to "true" will trigger [selectionChanging](ui.igcombo#events:selectionChanging) and [selectionChanged](ui.igcombo#events:selectionChanged) events.
				returnType="object" Returns reference to this igCombo.
			*/
			if ($items === undefined) {
				// When single item is selected deselect it
				this.deselectByValue();
			}

			if ($items instanceof $) {
				$items = $items.filter(this._$items());
				this.deselectByValue(this._valuesFromElements($items), options, event);
			}

			return this;
		},
		deselectByIndex: function (index, options, event) {
			/* Deselects a list item from the drop down list by index.
			```
				//deselect by index
				$(".selector").igCombo("deselectByIndex", 3);

				//deselect by array of indexes
				$(".selector").igCombo("deselectByIndex", [0,2]);

				//deselect by index, focus combo, keep input text and trigger events
				$(".selector").igCombo("deselectByIndex", 1, { focusCombo: true, keepInputText: true }, true);
			```
				paramType="number|array" optional="false" Index or array of indexes of items to be selected
				paramType="object" optional="true" Object with set of options controlling the behavior of this api method.
					focusCombo (boolean): Set to true to focus combo after the deselection.
					keepInputText (boolean): Set to true to keep input text unchanged after the deselection. By default input text is updated.
				paramType="object" optional="true" Indicates the browser event which triggered this action (not API). Calling the method with this param set to "true" will trigger [selectionChanging](ui.igcombo#events:selectionChanging) and [selectionChanged](ui.igcombo#events:selectionChanged) events.
				returnType="object" Returns reference to this igCombo.
			*/
			var i, len,
				dataToDeselect = [ ];

			if ($.type(index) !== "array") {
				index = [ index ];
			}

			for (i = 0, len = index.length; i < len; i++) {
				dataToDeselect.push(this._dataFromIndex(index[ i ]));
			}

			this._deselectData(dataToDeselect, options, event);
			return this;
		},
		deselectAll: function (options, event) {
			/* Deselects all selected items from the drop down list.
			```
				$(".selector").igCombo("deselectAll");

				//deselect all, focus combo, keep input text and trigger events
				$(".selector").igCombo("deselectAll", { focusCombo: true, keepInputText: true }, true);
			```
				paramType="object" optional="true" Object with set of options controlling the behavior of this api method.
					focusCombo (boolean): Set to true to focus combo after the deselection.
					keepInputText (boolean): Set to true to keep input text unchanged after the deselection. By default input text is updated.
				paramType="object" optional="true" Indicates the browser event which triggered this action (not API). Calling the method with this param set to "true" will trigger [selectionChanging](ui.igcombo#events:selectionChanging) and [selectionChanged](ui.igcombo#events:selectionChanged) events.
				returnType="object" Returns reference to this igCombo.
			*/
			this._deselectData(this._options.selectedData, options, event);

			// S.T. 24th Sept 2015, Bug #207020: After deselection, should be check whether the mode is non editable and select first item.
			this._selectFirstItemInNonEditableModes(this.options.mode, [ ],
				this.options.dataSource.dataView());

			return this;
		},
		activeIndex: function (index) {
			/* Gets/Sets index of active item in list.
			```
				//Return index of active item
				var index = $(".selector").igCombo("activeIndex");

				$(".selector").igCombo("activeIndex", 5);
			```
				paramType="number" optional="true" New active index for list. In order to clear active item, use -1.
				returnType="number|object" Returns index of active item in list or -1, if parameter is undefined. Otherwise, it returns reference to this igCombo.
			*/
			if (index === undefined) {
				return this._$items().index(this._$keyNavItem());
			}

			this._setKeyNavigationItem({
				data: this._dataFromIndex(index),
				addStyles: true,
				clearPrevItem: true
			});

			return this;
		},
		text: function (text) {
			/* Gets/Sets text in text input field.
			```
				//Get
				var text = $(".selector").igCombo("text");

				//Set
				$(".selector").igCombo("text", "Orange");
			```
				paramType="string" optional="true" New text value for combo's input field.
				returnType="string|object" If parameter is undefined, then current text in field is returned. Otherwise, it returns reference to this igCombo.
			*/
			if (text === undefined) {
				return this._options.$input.val();
			}

			this._options.$input.val(text);
			this._handleInputChange(false);

			return this;
		},
		listScrollTop: function (value) {
			/* Gets/Sets scrollTop attribute of html element, which scrolls drop-down list of items.
			```
				//Get
				var scrollTop = $(".selector").igCombo("listScrollTop");

				//Set
				$(".selector").igCombo("listScrollTop", 50);
			```
				paramType="number" optional="true" New value for scroll top in list. Note: if list is closed and new value is provided, then openDropDown() is called automatically.
				returnType="number|object" If parameter is undefined, then scrollTop is returned. Otherwise, it returns reference to this igCombo.
			*/
			var $listCont,
				_options = this._options;

			if (value !== undefined && !_options.dropDownOpened) {
				this.openDropDown();
			}

			$listCont = _options.$dropDownScrollCont || _options.$dropDownListCont;

			if (value === undefined) {
				return $listCont ? $listCont.prop("scrollTop") : 0;
			}

			if ($listCont) {
				$listCont.prop("scrollTop", value || 0);
			}

			return this;
		},
		listItems: function () {
			/* Gets jQuery objects representing all rendered list items in the combo drop down list.
			```
				var listItems = $(".selector").igCombo("listItems");
			```
				returnType="object" Returns reference to jQuery objects representing all rendered list items in the combo drop down list
			*/
			return this._$items();
		},
		comboWrapper: function () {
			/* Gets jQuery object of the outer element of the combo.
			```
				var comboWrapper = $(".selector").igCombo("comboWrapper");
			```
				returnType="object" Returns reference to the jQuery outer element object
			*/
			return this._options.$comboWrapper;
		},
		dropDown: function () {
			/* Gets jQuery object of the drop down associated with this combo widget
			```
				var $dropDownContainer = $(".selector").igCombo("dropDown");
			```
				returnType="object" Returns reference to the jQuery drop down object
			*/
			return this._options.$dropDownCont;
		},
		list: function () {
			/* Gets jQuery object of the container that holds the list with items.
			```
				var list = $(".selector").igCombo("list");
			```
				returnType="object" Returns reference to the jQuery list container object
			*/
			return this._options.$dropDownListCont;
		},
		textInput: function () {
			/* Gets jQuery object of the text input associated with this combo widget.
			```
				var $textInput = $(".selector").igCombo("textInput");
			```
				returnType="object" Returns reference to the jQuery input object
			*/
			return this._options.$input;
		},
		valueInput: function () {
			/* Gets jQuery object of the value input associated with this combo widget.
			```
				var $input = $(".selector").igCombo("valueInput");
			```
				returnType="object" Returns reference to the jQuery input object
			*/
			return this._options.$hiddenInput;
		},
		validator: function (destroy) {
			/* Gets reference to [igValidator](ui.igvalidator) used by igCombo.
			```
				var validator = $(".selector").igCombo("validator");

				//destroy the validator
				 $(".selector").igCombo("validator", true);
			```
				paramType="bool" optional="true" Request to destroy validator.
				returnType="object" Returns reference to igValidator or null.
			*/
			var validatorOptions = this.options.validatorOptions,
				validator = this._options.validator;

			if (validator && (destroy || !validatorOptions) && validator.owner === this) {
				validator.destroy();
				this._options.validator = validator = null;
			} else if (!validator && !destroy && validatorOptions &&
				this.element.igValidator) {
				this._options.validator = validator =
					this.element.igValidator(validatorOptions).data("igValidator");
				this._options.validator.owner = this;
			}

			return validator;
		},
		validate: function () {
			/* Trigger validation.
			```
				var isValid = $(".selector").igCombo("validate");
			```
				returnType="bool" True if all checks have passed. Can be null in case validation is not enabled.
			*/
			return this._options.validator ? this._options.validator.validate() : null;
		},
		dropDownOpened: function () {
			/* Returns boolean representing whether the combo drop down list is opened.
			```
				var isDropDownOpened = $(".selector").igCombo("dropDownOpened");
			```
				returnType="bool" Returns boolean representing whether the combo drop down list is opened.
			*/
			return this._options.dropDownOpened;
		},
		positionDropDown: function () {
			/* Repositions drop down under combo input. Has effect only when the drop down is attached to body.
			```
				$(".selector").igCombo("positionDropDown");
			```
				returnType="object" Returns reference to this combo.
			*/
			var comboOffset, width,
				_options = this._options,
				$combo = _options.$combo,
				orientation = this.options.dropDownOrientation;

			if (orientation === "auto") {
				orientation = this._dropDownOrientation();
			}

			if (this.options.dropDownAttachedToBody) {
				// T.I. 29th Feb 2016 - Bug #207372 - Containers are not positioned correctly in a zoomer browser window
				comboOffset = $.ig.util.offset($combo);
				width = this.options.dropDownWidth || $combo.outerWidth();

				_options.$dropDownCont.outerWidth(width);

				if (orientation === "top") {
					_options.$dropDownCont
						.css({
							left: comboOffset.left,
							top: comboOffset.top - _options.$dropDownCont.outerHeight()
						});

				} else {
					_options.$dropDownCont
						.css({
							left: comboOffset.left,
							top: comboOffset.top + $combo.outerHeight()
						});
				}
			} else {
				if (orientation === "top") {
					_options.$dropDownCont
						.css({
							left: "",
							top: -(_options.$dropDownCont.outerHeight())
						});
				} else {
					_options.$dropDownCont
						.css({
							left: "",
							top: ""
						});
				}
			}
		},
		_unsetupInput: function () {
			// Called only when the source element is an input
			var _handlers = this._handlers;

			this.element.insertAfter(this._options.$comboWrapper);
			this._options.$comboWrapper.remove();

			this.element
				.removeClass(this.css.field)
				.val("")
				.removeAttr("placeholder")
				.removeAttr("tabIndex")
				.attr("name", this._options.nameAttribute);

			if (this.options.mode !== "editable") {
				// Disable editing and selection for non-editable modes
				this.element
					.removeAttr("readonly")
					.removeAttr("unselectable")
					.removeClass(this.css.unselectable);
			}

			this.element.off({
				focus: _handlers.inputFocus,
				blur: _handlers.inputBlur,
				click: _handlers.inputClick,
				keydown: _handlers.inputKeyDown,
				paste: _handlers.inputPaste,
				keyup: _handlers.inputKeyUp,
				keypress: _handlers.inputKeyPress,
				mousedown: _handlers.inputMouseDown,

				// P.P 07-Mar-2016 #212238: Incorrect confirmation of Japanese symbols using IME
				compositionupdate: _handlers.inputCompositionUpdate,

				// P.P 26-Feb-2016 #212236: Incorrect input of Japanese symbols using IME
				compositionend: _handlers.inputCompositionEnd,
				input: _handlers.inputInput
			});
		},
		destroy: function () {
			/* Destroys the igCombo widget.
			```
				$(".selector").igCombo("destroy");
			```
				returnType="object"
			*/
			var _options = this._options,
				_handlers = this._handlers;

			this.validator(true);

			_options.$window.off("resize", _handlers.windowResize);
			$(document).off("mouseup", _handlers.documentMouseUp);
			this._clearRepositionInterval();
			_options.$dropDownCont.remove();

			if (this.element.is("input")) {
				this._unsetupInput();
			} else if (this.element.is("select")) {
				_options.$comboWrapper.remove();

				this.element
					.show()
					.attr("name", _options.nameAttribute);
			} else {
				this.element
					.empty()
					.removeClass(this.css.comboWrapper);
			}

			_options = null;
			this._super();
			return this;
		}
	});

	$.extend($.ui.igCombo, { version: "<build_number>" });
	return $.ui.igCombo;// REMOVE_FROM_COMBINED_FILES
}));// REMOVE_FROM_COMBINED_FILES
