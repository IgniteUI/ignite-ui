/*!@license
 * Infragistics.Web.ClientUI ColorPicker <build_number>
 *
 * Copyright (c) 2011-<year> Infragistics Inc.
 * <Licensing info>
 *
 * http://www.infragistics.com/
 *
 * Depends on:
 *   jquery-1.9.1.js
 *   jquery.ui.core.js
 *   jquery.ui.widget.js
 *	 infragistics.util.js
 *   infragistics.util.jquery.js
 *   infragistics.ui.shared.js
 */

(function (factory) {
	if (typeof define === "function" && define.amd) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
            "jquery-ui",
			"./infragistics.util",
			"./infragistics.util.jquery",
			"./infragistics.ui.shared"
		], factory );
	} else {

		// Browser globals
		return factory(jQuery);
	}
}
(function ($) {
    /*
		The igColorPicker is a jQuery based widget which allow you to pick a color.
	*/
    $.widget("ui.igColorPicker", {
        options: {
            /* type="string" Gets/Sets the default colors. Default colors are the ones displayed in the upper table of the color picker.
            The array should contain arrays that contain the color values for every next row.
            ```
                // Initialize
                // Every array with color strings will be rendered on a new row.
                $(".selector").igColorPicker({
                    colors: [["#ffffff", "#000000", "#EEECE1", "#1F497D"], ["#92D050", "#00B050", "#00B0F0", "#0070C0"]]
                })
                // Get
                var colors = $(".selector").igColorPicker("option", "colors")
                // Set
                var colors = [["#ffffff", "#000000", "#EEECE1", "#1F497D"], ["#92D050", "#00B050", "#00B0F0", "#0070C0"]]
                $(".selector").igColorPicker("option", "colors", colors);
            ```
            */
            colors: [
				[ "#ffffff", "#000000", "#EEECE1", "#1F497D", "#4F81BD", "#C0504D",
                    "#9BBB59", "#8064A2", "#4BACC6", "#F79646" ],
				[ "#F2F2F2", "#7F7F7F", "#DDD9C3", "#C6D9F0", "#DBE5F1", "#F2DCDB",
                    "#EBF1DD", "#E5E0EC", "#DBEEF3", "#FDEADA" ],
				[ "#D8D8D8", "#595959", "#C4BD97", "#8DB3E2", "#B8CCE4", "#E5B9B7",
                    "#D7E3BC", "#CCC1D9", "#B7DDE8", "#FAC08F" ],
				[ "#BFBFBF", "#3F3F3F", "#938953", "#548DD4", "#95B3D7", "#D99694",
                    "#C3D69B", "#B2A1C7", "#92CDDC", "#FAC08F" ],
				[ "#A5A5A5", "#262626", "#494429", "#17365D", "#366092", "#953734",
                    "#76923C", "#5F497A", "#31859B", "#E36C09" ],
				[ "#7F7F7F", "#0C0C0C", "#1D1B10", "#0F243E", "#244061", "#632423",
                    "#4F6128", "#3F3151", "#205867", "#974806" ]
            ],
            /* type="array" Gets/Sets the standard colors. Standard colors are the ones displayed in the color picker bottom,
            visually separated from the default colors. The array should contain the color values.
            ```
                // Initialize
                // Every array with color strings will be rendered on a new row.
                $(".selector").igColorPicker({
                    standardColors: ["red", "blue"]
                })
                // Get
                var standardColors = $(".selector").igColorPicker("option", "standardColors")
                // Set
                var standardColors = ["rgb(238,130,238)", "rgb(240,255,255)", "rgb(152,251,152)"]
                $(".selector").igColorPicker("option", "standardColors", standardColors);
            ```
            */
            standardColors: [ "#C00000", "#FF0000", "#FFC000", "#FFFF00", "#92D050",
                "#00B050", "#00B0F0", "#0070C0", "#002060", "#7030A0" ]
        },
        events: {
            /* cancel="false" The event is fired when a color is selected.
            ```
                // Initialize
                $(".selector").igCombo({
                    colorSelected: function(evt, ui) {...}
                });

                // Delegate
                $(document).delegate(".selector", "igcolorpickercolorselected", function (evt, ui) {
                    // use to get a reference to the color object.
                    ui.color;
                });
            ```
				Function takes arguments evt and ui.
				Use ui.color to get a reference to the color object.
			*/
            colorSelected: "colorSelected"
        },
        css: {
            /* The row class css. */
            standardColorsRow: "ui-colorpicker-standardcolors",
            /* The widget base class css. */
            baseClass: "ui-igColorPicker",
            /* The widget color table class css. */
            colorTable: "igColorPicker-table",
            /* The widget custom colors class css. */
            customColors: "igColorPicker-customColors",
            /* The widget default colors class css. */
            defaultColors: "ui-colorpicker-standardcolors",
            /* The widget colors row class css. */
            colorsRow: "igColorPicker-row",
            /* The widget color picker class css. */
            colorpickerColor: "igColorPicker-color"
        },
        _create: function () {
            this._colorTable = $("<div>");
            this._colorTable.addClass(this.css.colorTable);
            this._colorTable.appendTo(this.element);

            this._addOrChangeColors();
            this._addOrChangeStandardColors();

        },
        _addOrChangeColors: function () {
            var colsLength, row, col,
				colors = this.options.colors,
                rowsLength = colors.length,
                customColorsHtml = "";

            if (this._customColors && this._customColors.length > 0) {
                this._customColors.html("");
            } else {
                this._customColors = $("<div>").addClass(this.css.customColors);
                this._customColors.appendTo(this._colorTable);
            }

            for (row = 0; row < rowsLength; row++) {
                customColorsHtml += "<div class= " + this.css.colorsRow + ">";
                colsLength = colors[ row ].length; //taking second dimension size

                for (col = 0; col < colsLength; col++) {
                    customColorsHtml += "<div class=" + this.css.colorpickerColor +
                        ' style="background-color: ' + colors[ row ][ col ] + ';"></div>';
                }
                customColorsHtml += "</div>";
            }

            this._customColors.html(customColorsHtml);
        },
        _addOrChangeStandardColors: function () {
            var item,
				colors = this.options.standardColors,
                defaultColorsHtml = "";

            if (this._defaultColors && this._defaultColors.length > 0) {
                this._defaultColors.html("");
            } else {
                this._defaultColors = $("<div>").addClass(this.css.defaultColors);
                this._defaultColors.appendTo(this._colorTable);
            }

            for (item = 0; item < colors.length; item++) {
                defaultColorsHtml += "<div class=" + this.css.colorpickerColor +
                     ' style="background-color: ' + colors[ item ] + ';"></div>';
            }

            this._defaultColors.html(defaultColorsHtml);
        },
        _init: function () {
            this.element.addClass(this.css.baseClass);
            this._bindEvents();
        },
        _bindEvents: function () {
            var self = this;
            this._colorTable.delegate("." + this.css.colorpickerColor, "click", function (e) {
                var target = $(e.target);
                e.preventDefault();

                self._changeSelectedColor(target);
                self._trigger(self.events.colorSelected, e,
                    { color: self.colorFromElement(target) });
            });
        },
        _changeSelectedColor: function (target) {
            this._colorTable.find("div.selected-color").removeClass("selected-color");
            target.addClass("selected-color");
        },
        _setOption: function ( key, value ) {
            if (this.options[ key ] === value) {
                return;
            }

            $.Widget.prototype._setOption.apply(this, arguments);

            switch (key) {
			case "standardColors":
				this._addOrChangeStandardColors();
				break;
			case "colors":
				this._addOrChangeColors();
				break;
            }
        },
		colorTable: function () {
			/* Gets a reference to the div element of the color table
            ```
                var colorTable = $(".selector").igColorPicker("colorTable");
            ```
				returnType="object" Returns the div element with the colors table.
			*/
			return this._colorTable;
		},
		customColorTable: function () {
			/* Gets a reference to the div element with the default or custom colors table.
            ```
                var customColorTable = $(".selector").igColorPicker("customColorTable");
            ```
				returnType="object" Returns the div element with the default or custom colors table.
			*/
			return this._customColors;
		},
        standardColorsTable: function () {
            /* Returns the div element with the standard color table.
            ```
                var standardColorsTable = $(".selector").igColorPicker("standardColorsTable");
            ```
                returnType="object" Returns the div element with the standard colors.
            */

            return this._defaultColors;
        },
        colorFromElement: function ($element) {
			/* Gets the color for an element from the color picker in RGB format.
            ```
            var elementColor = $(".selector").igColorPicker("colorFromElement", $element);
            ```
				paramType="object" optional="false" A jQuery element in the color picker from which the color will be retrieved.
				returnType="string" Returns the color for the provided color element in RGB format.
			*/
            return $element.css("background-color");
        },
        selectedColor: function () {
            /* Returns the hexademical string of the currently selected color in the color picker. Returns null if no color is selected.
            ```
            var selectedColor = $(".selector").igColorPicker("selectedColor");
            ```
                returnType="string|null" Returns the selected color if available. Null if no color is selected.
            */
            var selected = this._colorTable.find("div.selected-color");
            if (selected.length) {
                return $.ig.util.rgbToHex(selected.css("background-color"));
            }
            return null;
        },
        selectColor: function (color) {
            /* Select a color.
            ```
            $(".selector").igColorPicker("selectColor", "#fac08f");
            ```
				paramType="string" optional="false" The #RGB value of the color to be selected.
                returnType="object" Returns reference to the igColorPicker.
			*/
            var matching = this._colorTable.find("div").filter(function (index, item) {
					var hexColor = $.ig.util.rgbToHex(item.style.backgroundColor);
					return hexColor && hexColor === color.toLowerCase();
				});
			this._changeSelectedColor(matching);
        }
    });

    $.extend($.ui.igColorPicker, { version: "<build_number>" });
    return $;// REMOVE_FROM_COMBINED_FILES
}));// REMOVE_FROM_COMBINED_FILES
