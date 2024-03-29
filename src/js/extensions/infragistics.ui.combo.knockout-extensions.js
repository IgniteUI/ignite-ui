﻿/*!@license
* Infragistics.Web.ClientUI igCombo KnockoutJS extension <build_number>
*
* Copyright (c) 2012-<year> Infragistics Inc.
*
* http://www.infragistics.com/
*
* Depends on:
*	jquery.js
*	ig.util.js
*	ig.dataSource.js
*/

/*global ko*/
"use strict";
(function (factory) {
	if (typeof define === "function" && define.amd) {
		define( [
            "../modules/infragistics.ui.combo",
            "knockout"
            ], factory );
	} else {
		factory(jQuery, ko);
	}
}
(function ($, ko) {
    function selectItems(combo, selectedItems) {
		var valueKey = combo.igCombo("option", "valueKey"),
			allowCustomValue = combo.igCombo("option", "allowCustomValue"),
			selectedValues = [],
			index, item, value;

		selectedItems = ko.utils.unwrapObservable(selectedItems);

        // R.K. 18th January, 2017: #746 Custom values are not persisted in the combo input
		if (selectedItems) {
			// A.K 15th October, 2017: #1381 Text of selected item remains after selectedItems option is cleared
			// If we have allCustomValue set to true and we've typed smth that doesn't match any record of the dataSource, we have
			// to prevent this value to be added into selectedValues collection.
			if (allowCustomValue && !selectedItems.length) {
				return;
			}
            for (index = 0; index < selectedItems.length; index++) {
                item = selectedItems[ index ];
                if (typeof item === "function") {
                    item = item();
                }
                if (typeof item === "object") {
                    value = item[ valueKey ];
                } else {
                    value = item;
                }
                selectedValues.push(value);
            }
            combo.igCombo("value", selectedValues);
        }
    }

    function applyListItemsBindings(valueAccessor) {
        var combo = valueAccessor().combo,
            $comboList = combo.igCombo("listItems"),
            options = valueAccessor().options,
            dataSource = ko.utils.unwrapObservable(valueAccessor().dataSource),
            i;
         if (dataSource) {
            for (i = 0; i < dataSource.length; i++) {
                if (ko.isObservable(dataSource[ i ])) {
                    ko.applyBindingsToNode($comboList[ i ], {
                        igComboItem: {
                            combo: combo,
                            value: dataSource[ i ],
                            index: i,
                            options: options
                        }
                    }, dataSource[ i ]);
                }
            }
        }
    }

    ko.bindingHandlers.igCombo = {
        init: function (element, valueAccessor) {
            var combo = $(element),
                options = valueAccessor(),
                dataSource = options.dataSource,
                selectedItems = options.selectedItems,
                dataSourceSubscription;

            combo.igCombo(options);

            // Attach the different custom binding handlers
            ko.applyBindingsToNode(element, {
                igComboSelection: {
                    selectedItems: selectedItems
                }
            }, selectedItems);

            if (ko.isObservable(dataSource)) {
                dataSourceSubscription = dataSource.subscribe(function() {
                    combo.data("dataSourceUpdating", true);
                });
                ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
                    dataSourceSubscription.dispose();
                });
            }

            ko.applyBindingsToNode(combo.data("igCombo")._options.$dropDownCont[ 0 ], {
                igComboList: {
					combo: combo,
                    options: options,
                    dataSource: dataSource,
                    selectedItems: selectedItems
                }
            }, dataSource);

            ko.utils.registerEventHandler(element, "igcomboselectionchanged", function (evt, ui) {
                var valueKey = ui.owner.options.valueKey,
					items = ui.items,
					selectedItems = valueAccessor().selectedItems,
					selectionType = valueAccessor().selectedItemType,
					selectedValues = [],
					item, itemData, firstItem, itemForSelection, index;

                if (items && selectedItems && ko.isObservable(selectedItems)) {
                    selectedItems = ko.utils.unwrapObservable(selectedItems);
                    if (!selectionType) {
                        if (selectedItems.length > 0) {

                            // Take the format of the initially selected items set in the ViewModel:
                            firstItem = selectedItems[ 0 ];
                            if (typeof firstItem === "function") {
                                firstItem = firstItem();
                            }
                            if (typeof firstItem === "object") {

                                // ViewModel code: this.selectedItems = ko.observableArray([data[1]]);
                                selectionType = "object";
                            } else {

                                // ViewModel code: this.selectedItems = ko.observableArray(["value1"]);
                                selectionType = "primitive";
                            }
                        } else {

                            // This means that in the ViewModel there isn't initially selected items:
                            // ViewModel code: this.selectedItems = ko.observableArray();
                            // In such a case we create seletedItems as array of primitives
                            selectionType = "primitive";
                        }
                    }

					items = (typeof items === "function") ? items() : items;
					for (index = 0; index < items.length; index++) {
						item = items[ index ];
						itemData = item.data;
						if (typeof itemData === "function") {
							itemData = itemData();
						}
						if (selectionType === "object") {
							itemForSelection = itemData;
						} else if (selectionType === "primitive") {
							itemForSelection = itemData[ valueKey ];
						}
						if (typeof itemForSelection === "function") {
							itemForSelection = itemForSelection();
						}
						selectedValues.push(itemForSelection);
					}
                }
                if (ko.isObservable(valueAccessor().selectedItems)) {
                    valueAccessor().selectedItems(selectedValues);
                }
            });
        }
    };

    ko.bindingHandlers.igComboSelection = {
        update: function (element, valueAccessor) {
            selectItems($(element), valueAccessor().selectedItems);
        }
    };

    ko.bindingHandlers.igComboList = {
        init: function (element, valueAccessor) {
            applyListItemsBindings(valueAccessor);
        },
        update: function (element, valueAccessor) {
            var combo = $(valueAccessor().combo),
				options = valueAccessor().options,
                dataSource = ko.utils.unwrapObservable(valueAccessor().dataSource),
                dropDownScroller = combo.data("igCombo")._options.$dropDownScrollCont,
                lastScrollTop = dropDownScroller ? dropDownScroller.scrollTop() : 0;

            // N.A. 12 December 2018 Bug #1840 (https://github.com/IgniteUI/ignite-ui/issues/1840)
            // We want to dataBind only when dataSource() observable is invoked.
            if (!!combo.data("dataSourceUpdating")) {
                combo.removeData("dataSourceUpdating");
                combo.one("igcomboitemsrendered", function () {
                    applyListItemsBindings(valueAccessor);
                    selectItems(combo, valueAccessor().selectedItems);
                });

                // N.A. 8/5/2015 Bug #203826 Set datasource, cause in this case it is analyzed and then the dataBind happens.
                // This necessary in cases, when data source was empty array initially.
                combo.igCombo("option", "dataSource", dataSource);

                // R.K. 29th November, 2017 #246482: When an item is selected from the bottom of the list,
                // the combo list "scrolls" back to top and the vertical scroll bar is positioned incorrectly.
                // This happens with virtualization enabled. We're keeping the last scrollTop position and
                // after data-bind, we reset the scrollbar to it minus 1px triggering the re-rendering of the correct list items.
                if (options.virtualization) {
                    dropDownScroller.scrollTop(lastScrollTop - 1);
                }
            }
        }
    };

    ko.bindingHandlers.igComboItem = {
        update: function (element, valueAccessor) {
            var combo = valueAccessor().combo,
                textKey = valueAccessor().options.textKey,
                valueKey = valueAccessor().options.valueKey,
                item, index, dsItem;

            if (valueKey === undefined && textKey === undefined) {
                return;
            }
            index = valueAccessor().index;
            dsItem = valueAccessor().value;
            item = $(combo.igCombo("dropDown").find("li").eq(index));
            combo.data("igCombo")._updateItem(item, dsItem);
            combo.data("igCombo")._updateInputValues();
        }
    };

    ko.bindingHandlers.igComboVisible = {
        update: function (element, valueAccessor) {
            var visible = valueAccessor(),
                combo = $(element);
            if (!ko.isObservable(visible)) {
                return;
            }
            combo.igCombo("comboWrapper").css("display", visible() ? "inline-block" : "none");
        }
    };

    ko.bindingHandlers.igComboDisable = {
        update: function (element, valueAccessor) {
            var disabled = valueAccessor(),
                combo = $(element);
            if (!ko.isObservable(disabled)) {
                return;
            }
            combo.igCombo("option", "disabled", disabled());
        }
    };
}));// REMOVE_FROM_COMBINED_FILES
