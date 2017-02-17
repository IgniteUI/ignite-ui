/*!@license
* Infragistics.Web.ClientUI igCombo KnockoutJS extension <build_number>
*
* Copyright (c) 2012-<year> Infragistics Inc.
*
* http://www.infragistics.com/
*
* Depends on:
*	jquery-1.9.1.js
*	ig.util.js
*	ig.dataSource.js
*/

/*global ko*/
(function (factory) {
	if (typeof define === "function" && define.amd) {
		define( [
            "jquery",
            "jquery-ui",
            "knockout",
            "../modules/infragistics.util",
            "../modules/infragistics.datasource",
            "../modules/infragistics.ui.combo"
            ], factory );
	} else {
		factory(jQuery);
	}
}
(function ($) {
    function selectItems(combo, selectedItems) {
        var valueKey = combo.igCombo("option", "valueKey"),
			selectedValues = [],
			index, item, value;

        // R.K. 18th January, 2017: #746 Custom values are not persisted in the combo input
        if (ko.utils.unwrapObservable(selectedItems) &&
                ko.utils.unwrapObservable(selectedItems).length) {
            selectedItems = ko.utils.unwrapObservable(selectedItems);
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

    ko.bindingHandlers.igCombo = {
        init: function (element, valueAccessor) {
            var combo = $(element),
                options = valueAccessor(),
                selectedItems = valueAccessor().selectedItems;

            combo.igCombo(options);

            // Attach the different custom binding handlers
            ko.applyBindingsToNode(element, {
                igComboSelection: {
                    selectedItems: selectedItems
                }
            }, selectedItems);

            ko.applyBindingsToNode(combo.data("igCombo")._options.$dropDownCont[ 0 ], {
                igComboList: {
					combo: combo,
                    options: options,
                    dataSource: valueAccessor().dataSource,
                    selectedItems: selectedItems
                }
            }, valueAccessor().dataSource);

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
            var combo = valueAccessor().combo,
				$comboList = combo.igCombo("listItems"),
				options = valueAccessor().options,
                dataSource = ko.utils.unwrapObservable(valueAccessor().dataSource),
				i;

            if (dataSource) {
                for (i = 0; i < $comboList.length; i++) {
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
        },
        update: function (element, valueAccessor) {
            var combo = $(valueAccessor().combo),
				listLength = combo.igCombo("listItems").length,
				options = valueAccessor().options,
                dataSource = ko.utils.unwrapObservable(valueAccessor().dataSource),
				$comboList, i;

            if (listLength !== dataSource.length) {
                combo.one("igcomboitemsrendered", function () {
                    $comboList = combo.igCombo("listItems");
                    if (dataSource) {
                        for (i = 0; i < $comboList.length; i++) {
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
                    selectItems(combo, valueAccessor().selectedItems);
                });

                // N.A. 8/5/2015 Bug #203826 Set datasource, cause in this case it is analyzed and then the dataBind happens.
                // This necessay in cases, when data source was empty array initially.
                combo.igCombo("option", "dataSource", dataSource);
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
            item = combo.igCombo("itemsFromIndex", index).element;
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
            combo.css("display", visible() ? "inline-block" : "none");
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
