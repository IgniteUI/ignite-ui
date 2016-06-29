/*!@license
 * Infragistics.Web.ClientUI CountDown <build_number>
 *
 * Copyright (c) 2011-<year> Infragistics Inc.
 *
 * http://www.infragistics.com/
 *
 * Depends on:
 * jquery-1.9.1.js
 *	jquery.ui-1.9.0.js
 *	infragistics.util.js
 *	infragistics.ui.popover.js
 *	infragistics.ui.notifier.js
 */

/*global jQuery */
if (typeof jQuery !== "function") {
	throw new Error("jQuery is undefined");
}

(function ($) {
	/* The igBaseEditor is a widget based on jQuery UI. */
	$.widget("ui.igBaseEditor", {
		options: {
			/* type="string|number|null Gets/Sets how the width of the control can be set."
				string The widget width can be set in pixels (px) and percentage (%).
				number The widget width can be set as a number in pixels.
				null type="object" will stretch to fit data, if no other widths are defined.
			*/
			width: null,
			/* type="string|number|null Gets/Sets how the height of the control can be set."
				string The height can be set in pixels (px) and percentage (%).
				number The height can be set as a number in pixels.
				null type="object" will fit the editor inside its parent container, if no other heights are defined.
			*/
			height: null,
			/* type="object" Gets/Sets value in editor. The effect of setting/getting that option depends on type of editor and on dataMode options for every type of editor.*/
			value: null,
			/* type="number" Gets/Sets value in tabIndex for editor. */
			tabIndex: null,
			/* type="bool" Sets/Gets ability to prevent null value.
				If that option is false, and editor has no value, then value is set to an empty string.
			*/
			allowNullValue: false,
			/* type="string|number|null" Sets/Gets the representation of null value. In case of default the value for the input is set to null, which makes the input to hold an empty string */
			nullValue: null,
			/* type="string" Sets the name attribute of the value input. This input is used to sent the value to the server. In case the target element is input and it has name attribute, but the developer has set the inputName option, so this option overwrites the value input and removes the attribute from the element. */
			inputName: null,
			/* type="bool" Gets/Sets the readonly attribute.Does not allow editing. Disables all the buttons and iteracitons applied. On submit the current value is sent into the request.*/
			readOnly: false,
			/* type="bool" Gets/Sets the disabled attribute.Does not allow editing. Disables all the buttons and iteracitons applied. On submit the current value is not sent into the request*/
			disabled: false,
			/* type="object" Sets/Gets options supported by the igValidator widget.
				Note: Validation rules of igValidator, such as min and max value/length are applied separately triggering errors,
				while similar options of the editor work to prevent wrong values from being entered.
			*/
			validatorOptions: null
		},
		css: {
			/* Class applied to the main/top element. Default value is 'ui-igedit-input' */
			editor: "ui-igedit-input",
			/* Class applied to the top element when editor is rendered in container. Default value is 'ui-igedit ui-igedit-container ui-widget ui-corner-all ui-state-default' */
			container: "ui-igedit ui-igedit-container ui-widget ui-corner-all ui-state-default",
			/* Class applied to the top element when editor is hovered. Default value is 'ui-state-hover' */
			hover: "ui-state-hover",
			/* Class applied to the top element when editor is active. Default value is 'ui-state-active' */
			active: "ui-state-active",
			/* Class applied to the top element when editor is on focus. Default value is 'ui-state-focus' */
			focus: "ui-state-focus",
			/* Classes applied to the editing element in disabled state. Default value is 'ui-igedit-disabled ui-state-disabled' */
			disabled: "ui-state-disabled"
		},
		events: {
			/* igWidget events go here */
			/* cancel="false" Event which is raised before rendering of the editor completes.
				Function takes arguments evt and ui.
				Use ui.owner to get a reference to the editor performing rendering.
				Use ui.element to get a reference to the editor element.
			*/
			rendering: "rendering",
			/* cancel="false" Event which is raised after rendering of the editor completes.
				Function takes arguments evt and ui.
				Use ui.owner to get a reference to the editor performing rendering.
				Use ui.element to get a reference to the editor element.
			*/
			rendered: "rendered",
			/* Event which is raised on mousedown at any part of editor including drop-down list.
				Function takes arguments evt and ui.
				Use evt.originalEvent to obtain reference to event of browser.
				Use ui.owner to obtain reference to igEditor.
				Use ui.elementType to obtain type of html element under mouse, such as field, button, spinUpper, spinLower or item#.
				Use ui.id and ui.elementType to obtain flag which represents html element under mouse. */
			mousedown: "mousedown",
			/* Event which is raised on mouseup at any part of editor including drop-down list.
				Function takes arguments evt and ui.
				Use evt.originalEvent to obtain reference to event of browser.
				Use ui.owner to obtain reference to igEditor.
				Use ui.elementType to obtain type of html element under mouse, such as field, button, spinUpper, spinLower or item#.
				Use ui.id and ui.elementType to obtain flag which represents html element under mouse. */
			mouseup: "mouseup",
			/* Event which is raised on mousemove at any part of editor including drop-down list.
				Function takes arguments evt and ui.
				Use evt.originalEvent to obtain reference to event of browser.
				Use ui.owner to obtain reference to igEditor.
				Use ui.elementType to obtain type of html element under mouse, such as field, button, spinUpper, spinLower or item#.
				Use ui.id and ui.elementType to obtain flag which represents html element under mouse. */
			mousemove: "mousemove",
			/* Event which is raised on mouseover at any part of editor including drop-down list.
				Function takes arguments evt and ui.
				Use evt.originalEvent to obtain reference to event of browser.
				Use ui.owner to obtain reference to igEditor.
				Use ui.elementType to obtain type of html element under mouse, such as field, button, spinUpper, spinLower or item#.
				Use ui.id and ui.elementType to obtain flag which represents html element under mouse. */
			mouseover: "mouseover",
			/* Event which is raised on mouseleave at any part of editor including drop-down list.
				Function takes arguments evt and ui.
				Use evt.originalEvent to obtain reference to event of browser.
				Use ui.owner to obtain reference to igEditor.
				Use ui.elementType to obtain type of html element under mouse, such as field, button, spinUpper, spinLower or item#.
				Use ui.id and ui.elementType to obtain flag which represents html element under mouse. */
			mouseout: "mouseout",
			/* Event which is raised when input field of editor loses focus.
				Function takes argument evt.
				Use ui.owner to obtain reference to igEditor.
				Use evt.originalEvent to obtain reference to event of browser. */
			blur: "blur",
			/* Event which is raised when input field of editor gets focus.
				Function takes argument evt.
				Use ui.owner to obtain reference to igEditor.
				Use evt.originalEvent to obtain reference to event of browser. */
			focus: "focus",
			/* cancel="true" Event which is raised before value in editor was changed.
				Return false in order to cancel change.
				It can be raised on lost focus or on spin events.
				Function takes arguments evt and ui.
				Use ui.owner to obtain reference to igEditor.
				Use ui.newValue to obtain the new value.
				Use ui.oldValue to obtain the old value.
				Use ui.editorInput to obtain reference to the editor input.*/
			valueChanging: "valueChanging",
			/* Event which is raised after value in editor was changed. It can be raised on lost focus or on spin events.
				Function takes arguments evt and ui.
				Use ui.owner to obtain reference to igEditor.
				Use ui.newValue to obtain the new value.
				Use ui.originalValue to obtain the original value.
				Use ui.editorInput to obtain reference to the editor input.*/
			valueChanged: "valueChanged"
		},
		_createWidget: function (options) {

			// Those are only the options that are defined by the user, before merged with the default ones.
			this._definedOptions = options;
			$.Widget.prototype._createWidget.apply(this, arguments);
		},
		_create: function () { //BaseEditor
			/* igWidget constructor goes here */
			this._initialize();
			this._readAttributes();
			this._saveDOMConent();
			this._render();
		},
		_initialize: function () {
			this._timeouts = [];
		},
		_readAttributes: function () {
			this._saveAttributes();
			this._removeAttributesAndSetThemAsOptions();
		},
		_saveAttributes: function () {
			var i;
			var element = this.element[ 0 ], attr;

			this._initialAttributes = [];
			attr = element.attributes;
			for (i = 0; i < attr.length; i++) {
				if (attr[ i ].name !== "id") {
					this._initialAttributes.push({
						name: attr[ i ].name,
						attrValue: attr[ i ].value // ,
						// propValue: element[ attr[ i ].name ]
					});
				}
			}
		},
		_removeAttributesAndSetThemAsOptions: function ( ) {
			var element = this.element,
				name = element.attr("name"),
				value = element.attr("value"),
				disabled = element.attr("disabled"),
				readOnly = element.attr("readOnly");

			if (name) {
				element.removeAttr("name");
				if (this.options.inputName === null) {
					this.options.inputName = name;
				}
			}
			if (value) {
				element.removeAttr("value");
				if (this.options.value === null) {
					this.options.value = value;
				}
			}
			if (disabled) {
				element.removeAttr("disabled");

				// If we have 'disabled' attribute, then it is applied only when 'disabled' options is not defined.
				if (this._definedOptions === undefined || this._definedOptions.disabled === undefined) {
					this.options.disabled = true;
				}
			}
			if (readOnly) {
				element.removeAttr("readonly");

				// If we have 'readOnly' attribute, then it is applied only when 'readOnly' options is not defined.
				if (this._definedOptions === undefined || this._definedOptions.readOnly === undefined) {
					this.options.readOnly = true;
				}
			}
			delete this._definedOptions;
		},
		_saveDOMConent: function () {
			if (this.element.children().length > 0) {

				// We use clone because we will preserve event binding to the elements(if any) if binging is through javascript.
				// If we use innerHtml then it will be faster(better for performance) but will not preserve data binding to the element inside to the table(if any).
				this._initialDOMContent = this.element.children().clone(true);
				this.element.empty(); // Remove all element content before rendering it.
			}
		},
		_render: function () {
			throw ($.ig.Editor.locale.renderErrMsg);
		},
		_applyOptions: function () {
			if (this.options.tabIndex !== null) {
				this._setTabIndex(this.options.tabIndex);
			}
			if (this.options.readOnly) {
				this._setReadOnly(true);
			}
			if (this.options.disabled) {
				this._setDisabled(true);
			}
			if (this.options.inputName) {
				this.inputName(this.options.inputName);
			}
			if (this.options.validatorOptions) {
				this._setupValidator();
			}
		},
		_attachEvents: function () {
			var self = this;
			this._editorContainer.on({
				"mousedown.editor": function (event) {
					self._triggerMouseDown(event);
				},
				"mouseup.editor": function (event) {

					self._triggerMouseUp(event);
				},
				"mousemove.editor": function (event) {
					self._triggerMouseMove(event);
				},
				"mouseover.editor": function (event) {
					self._triggerMouseOver(event);
				},
				"mouseout.editor": function (event) {
					self._triggerMouseOut(event);
				}
			});
		},
		_setupValidator: function () {
			if (this.element.igValidator) {
				this._validator = this.element.igValidator(this.options.validatorOptions).data("igValidator");
				this._validator.owner = this;
			}
		},
		_destroyValidator: function () {
			if (this._validator && this._validator.owner === this) {
				this._validator.destroy();
				this._validator = null;
			}
		},
		_applyAria: function () {
			var ariaLabeledBy = this.element.attr("aria-labelledby");

			if (ariaLabeledBy) {
				this.element.removeAttr("aria-labelledby");
				this._editorInput.attr("aria-labelledby", ariaLabeledBy);
			}
			if (this._dropDownButton) {
				this._editorInput.attr("role", "combobox");
			} else {
				this._editorInput.attr("role", "textbox");
			}
		},
		_triggerRendering: function () {
			var args = {
				element: this.element,
				owner: this
			};
			return this._trigger(this.events.rendering, null, args);
		},
		_triggerRendered: function () {
			var args = {
				element: this.element,
				owner: this
			};
			this._trigger(this.events.rendered, null, args);
		},
		_triggerMouseMove: function (event) {
			var args = {
				owner: this,
				element: event.target,
				editorInput: this._editorInput
			};
			this._trigger(this.events.mousemove, event, args);
		},
		_triggerMouseDown: function (event) {
			this._editorContainer.addClass(this.css.active);
			var args = {
				owner: this,
				element: event.target,
				editorInput: this._editorInput
			};
			return this._trigger(this.events.mousedown, event, args);
		},
		_triggerMouseUp: function (event) {
			this._editorContainer.removeClass(this.css.active);
			var args = {
				owner: this,
				element: event.target,
				editorInput: this._editorInput
			};
			this._trigger(this.events.mouseup, event, args);
		},
		_triggerMouseOver: function (event) {
			this._editorContainer.addClass(this.css.hover);
			var args = {
				originalEvent: event,
				owner: this,
				element: event.target,
				editorInput: this._editorInput
			};
			this._trigger(this.events.mouseover, event, args);
		},
		_triggerMouseOut: function (event) {
			this._editorContainer.removeClass(this.css.hover);
			var args = {
				originalEvent: event,
				owner: this,
				element: event.target,
				editorInput: this._editorInput
			};
			this._trigger(this.events.mouseout, event, args);
		},
		_triggerFocus: function (event) {
			this._editorContainer.addClass(this.css.focus);
			var args = {
				originalEvent: event,
				owner: this,
				element: event.target,
				editorInput: this._editorInput
			};
			this._trigger(this.events.focus, event, args);
		},
		_triggerBlur: function (event) {
			this._editorContainer.removeClass(this.css.focus);
			this._clearEditorNotifier();
			var args = {
				owner: this,
				element: event.target,
				editorInput: this._editorInput
			};
			this._trigger(this.events.blur, event, args);
		},
		_setOption: function (option, value) { //Base editor
			/* igWidget custom setOption goes here */
			var prevValue = this.options[ option ];
			if (prevValue === value) {
				return;
			}

			// The following line applies the option value to the igWidget meaning you don't
			// have to perform this.options[ option ] = value;
			$.Widget.prototype._setOption.apply(this, arguments);
			switch (option) {
				case "readOnly":
					this._setReadOnly(value);
					break;
				case "disabled":
					this._setDisabled(value);
					break;
				case "width":
					this._setWidth(value);
					break;
				case "height":
					this._setHeight(value);
					break;
				case "validatorOptions":
					this._setupValidator();
					break;
				case "tabIndex":
					this._setTabIndex(value);
					break;
				default:
					break;
			}
		},
		_validateValue: function (val) {//Base editor
			return val ? true : false;
		},
		_updateValue: function (value) { //Base Editor
			if (value === this.options.nullValue && this.options.nullValue === null) {
				this._editorInput.val("");
				this._valueInput.val("");
			} else {

				//207411 T.P. 30th Oct 2015 setting the value at this stage causes the input to reset its cursor position.
				//this._editorInput.val(value);
				this._valueInput.val(value);
			}
			this.options.value = value;
		}, //BaseEditor
		//This method sets the value to null, or empty string depending on the nullable option.
		_clearValue: function () {

			// TODO use null, or 0 depending on the nullable option
			if (this.options.allowNullValue) {
				this._updateValue(this.options.nullValue);
			} else {
				this._updateValue("");
			}
		},
		_detachEvents: function () {
			if (this._detachButtonsEvents) {
				this._detachButtonsEvents();
			}
			if (this._detachListEvents) {
				this._detachListEvents();
			}

			// https://css-tricks.com/namespaced-events-jquery/
			this._editorContainer
				.off("mousedown.editor mouseup.editor mouseover.editor mouseout.editor");
		},
		_detachButtonsEvents: function () {
			if (this._dropDownList) {
				this._detachListEvents();
			}
			if (this._dropDownButton) {
				this._detachButtonsEvents(this._dropDownButton);
			}

			if (this._clearButton) {
				this._detachButtonsEvents(this._clearButton);
			}
			if (this._spinUpButton) {
				this._detachButtonsEvents(this._spinUpButton);
			}
			if (this._spinDownButton) {
				this._detachButtonsEvents(this._spinDownButton);
			}
		},
		_restoreDOMStructure: function () {
			this._removeDOM();
			this._removeAttributes();
			this._setPropsDefaults();
			this._recoverInitialAttributes();
			this._recoverInitialDOMContent();
		},
		_removeDOM: function () {
			this._removeList();
			this._removeClearButton();
			this._removeSpinButtons();
			this._removeContainer();
		},
		_removeContainer: function () {
			this._valueInput.remove();
			if (this.element.is("input")) {
				this.element.unwrap().unwrap();
			} else if (this.element.is("div")) {
				this.element.empty();
			} else if (this.element.is("span")) {
				this.element.empty();
				this.element.unwrap().unwrap();
			}
		},
		_removeList: function () {
			if (this._dropDownList) {
				this._deleteList();
				this._deleteDropDownButton();
			}
		},
		_removeClearButton: function () {
			if (this._clearButton) {
				this._clearButton.remove();
				delete this._clearButton;
			}
		},
		_removeSpinButtons: function () {
			if (this._spinUpButton) {
				this._spinUpButton.remove();
				delete this._spinUpButton;
			}
			if (this._spinDownButton) {
				this._spinDownButton.remove();
				delete this._spinDownButton;
			}
		},
		_removeAttributes: function () {
			var element = this.element,
				attr = element[ 0 ].attributes,
				concatenatedAttr = "", i;

			for (i = 0; i < attr.length; i++) {
				if (attr[ i ].name !== "id") {
					concatenatedAttr += (attr[ i ].name + " ") ;
				}
			}
			element.removeAttr(concatenatedAttr.trim(" "));
		},
		_setPropsDefaults: function () {
			var element = this.element[ 0 ];

			element.disabled = false;
			element.readOnly = false;
			element.checked = false;
			element.value = null;
		},
		_recoverInitialAttributes: function () {
			var i;
			if (this._initialAttributes) {
				for (i = 0; i < this._initialAttributes.length; i++) {
					if (this._initialAttributes[ i ].name !== "id") {
						this.element.attr(this._initialAttributes[ i ].name,
							this._initialAttributes[ i ].attrValue);

						// 3/2/2016 Bug #213138: Don't need to recover DOM information, only attributes.
						/* if (this._initialAttributes[ i ].propValue !== undefined) {
							this.element.prop(this._initialAttributes[ i ].name,
								this._initialAttributes[ i ].propValue);
						}*/
					}
				}
				delete this._initialAttributes;
			}
		},
		_recoverInitialDOMContent: function () {
			if (this._initialDOMContent) {
				this._initialDOMContent.appendTo(this.element);
				delete this._initialDOMContent;
			}
		},
		_clearStyling: function () {
			this._editorContainer
				.removeClass(this.css.container)
				.removeClass(this.css.hover)
				.removeClass(this.css.active);

			this._editorInput.removeClass(this.css.editor);
		},
		_deleteInternalProperties: function () {
			delete this._editorInput;
			delete this._editorContainer;
				delete this._valueInput;
			if (this._timeouts) {
				delete this._timeouts;
			}
		},
		_clearTimeouts: function() {
			var i, timeouts = this._timeouts;
			if (timeouts && timeouts instanceof Array) {
				for (i = 0; i < timeouts.length; i++) {
					clearTimeout(timeouts[ i ]);
				}
				this._timeouts = [];
			}
		},
		_disableEditor: function (applyDisabledClass) {

			//T.P. 9th Dec 2015 Bug 211010
			//applyDisabledClass parameter is flag wheather the ui-state-disabled class is applied to the both _editorInput and _valueInput
			//In both readOnly and disabled state we have similar logic for making the editor disabled/readonly (detach event and remove classes)
			if (applyDisabledClass) {
				this._editorContainer.addClass(this.css.disabled);
			}
			this._detachEvents();
		},
		_setEditableMode: function () {

			//Default value we don't do anything unless we implement setOption related to that.
			this._editorInput.prop("readonly", false);
			this._valueInput.prop("readonly", false);
			this._editorInput.prop("disabled", false);
			this._valueInput.prop("disabled", false);
			this._editorContainer.removeClass(this.css.disabled);
			this._attachEvents();
		},
		_setDisabled: function (activate) {
			if (activate) {
				this._editorInput.prop("disabled", true);
				this._valueInput.prop("disabled", true);
				this._disableEditor(true);
			} else {
				this._editorInput.prop("disabled", false);
				this._valueInput.prop("disabled", false);
				if (!this.options.readOnly) {
					this._setEditableMode();
				}
			}
		},
		_setReadOnly: function (activate) {
			if (activate) {
				this._editorInput.prop("readonly", true);
				this._valueInput.prop("readonly", true);
				this._disableEditor();
			} else {
				this._editorInput.prop("readonly", false);
				this._valueInput.prop("readonly", false);
				if (!this.options.disabled) {
					this._setEditableMode();

				}
				this._editorInput.off(".readonly");
			}
		},
		_setWidth: function (width) {
			if (width) {
				this._editorContainer.css("width", this.options.width);
			}
		},
		_setHeight: function (height) {
			if (height) {
				this._editorContainer.css("height", this.options.height);
			}
		},
		_setTabIndex: function (index) {
			this._editorInput.attr("tabIndex", index);
		},
		_setFocusDelay: function (delay) {
			var self = this;
			if (delay) {
				this._timeouts.push(setTimeout(function () { self.field().focus(); }, delay));
			} else {
				this.field().focus();
			}
		},
		_setFocus: function (event) {

			//getValue and set it to the input
			this._focused = true;
			this._enterEditMode();
			if (event) {
				this._triggerFocus(event);
			}
		},
		_setBlur: function (event) { //Base Editor
			var newValue;
			if (this._cancelBlurOnInput) {
				this._editorInput.focus();
				delete this._cancelBlurOnInput;
			} else {
				this._triggerBlur(event);
				newValue = $(event.target).val();
				this._currentInputTextValue = this._editorInput.val();
				this._processValueChanging(newValue);
				this._processTextChanged();
				this._exitEditMode();

				//In case our dropdown is opened we need to close it.
				if (this._dropDownList && this._dropDownList.is(":visible") && this._triggerDropDownClosing()) {
					this._hideDropDownList();
				}
				this._focused = false;
				this._clearTimeouts();
				if (this._validator) { // TODO VERIFY
					this._validator._validateInternal(this.element, event, true);
				}
				if (this._inComposition === true) {
					delete this._inComposition;
				}
			}
		},
		/* igBaseEditor public methods */
		inputName: function (newValue) {
			/* Gets/Sets name attribute applied to the editor element.
				paramType="string" optional="true" The new input name.
				returnType="string" Current input name. */
			if (newValue) {
				this.options.inputName = newValue;
				this._valueInput.attr("name", newValue);
			} else {
				return this.options.inputName;
			}
		},
		value: function (newValue) {
			if (newValue !== undefined) {

				// N.A. 12/1/2015 Bug #207198: Remove notifier when value updated through value method.
				this._clearEditorNotifier();
				if (this._validateValue(newValue)) {
					if (this.options.toUpper) {
						if (newValue) { newValue = newValue.toLocaleUpperCase(); }
					} else if (this.options.toLower) {
						if (newValue) { newValue = newValue.toLocaleLowerCase(); }
					}
					this._updateValue(newValue);
					this._editorInput.val(this._getDisplayValue());
				} else {
					this._clearValue();
					if (this._focused !== true) {
						this._exitEditMode();
					}
				}
			} else {
				return this.options.value;
			}
		},
		field: function () {
			/* Gets the visual editor element.
			returnType="$" The visual editor element. */
			return this._editorInput;
		},
		editorContainer: function () {
			/* Gets reference to jquery object which is used as top/outer element of igEditor.
			returnType="$" The container editor element. */
			return this._editorContainer;
		},
		hasFocus: function () {
			/* Checks if editor has focus.
				returnType="bool" Returns if the editor is focused or not. */
			return this._focused;
		},
		setFocus: function (delay) {
			/* Set focus to editor with delay.
				paramType="number" optional="true" The delay before focusing the editor. */
			this._setFocusDelay(delay);
		},
		hide: function () {
			/* Hides editor. */
			this._editorContainer.hide();
		},
		show: function () {
			/* Shows editor. */
			this._editorContainer.show();
		},
		validator: function () {
			/* Gets reference to igValidator used by the editor.
				returnType="object" Returns reference to igValidator or null. */
			return this._validator;
		},
		isValid: function () {
			/* Checks if value in editor is valid. Note: This function will not trigger automatic notifications.
				returnType="bool" Whether editor value is valid or not. */
			this._skipMessages = true;
			var valid = this._validateValue(this._editMode ? this.field().val() : this.value());
			this._skipMessages = false;
			return valid;
		},
		validate: function () {
			/* Triggers validation of editor and show potential warning message. If validatorOptions are set will also call validate on the igValidator.
				returnType="bool" Whether editor value is valid or not. */
			if (this.options.validatorOptions) {
				return this.validator().validate();
			} else {
				return this._validateValue(this.value());
			}
		},
		destroy: function () {
			/* Destructor of the widget */
			this._destroyValidator();
			this._detachEvents();
			this._clearTimeouts();
			this._clearStyling();
			this._restoreDOMStructure();
			this._deleteInternalProperties();
			delete this.options;
			$.Widget.prototype.destroy.apply(this, arguments);
			return this;
		}
	});
	$.extend($.ui.igBaseEditor, { version: "<build_number>" });
	$.widget("ui.igTextEditor", $.ui.igBaseEditor, {
		options: {

			/* type="dropdown|clear|spin" Gets visibility of spin and drop-down button. That option can be set only on initialization. Combinations like 'dropdown,spin' or 'spinclear' are supported too.
				dropdown type="string" button to open list is located on the right side of input-field (or left side if base html element has direction:rtl);
				clear type="string" button to clear value is located on the right side of input-field (or left side if base html element has direction:rtl);
				spin type="string" spin buttons are located on the right side of input-field (or left side if base html element has direction:rtl).
				Note! This option can not be set runtime.
			*/
			buttonType: "none",
			/* type="array" Gets/Sets list of items which are used for drop-down list.
				Items in list can be strings, numbers or objects. The items are directly rendered without casting, or manipulating them.
			 */
			listItems: null,
			/* type="number" Gets/Sets custom width of drop-down list in pixels. If value is equal to 0 or negative, then the width of editor is used. */
			listWidth: 0,
			/* type="number" Sets the hover/unhover animation duration. */
			listItemHoverDuration: 0,
			/* type="bool" Gets location of drop-down list.
				Value false will create html element for list as a child of main html element.
				Value true creates list as a child of body.
				Note! This option can not be set runtime.
			*/
			dropDownAttachedToBody: false,

			/* type="number" Gets/Sets show/hide drop-down list animation duration in milliseconds. */
			dropDownAnimationDuration: 300,
			/* type="number" Gets how many items should be shown at once.
				Notes:
				That option is overwritten if the number of list items is less than the value. In that case the height of the dropdown is adjusted to the number of items.
				Note! This option can not be set runtime.
			*/
			visibleItemsCount: 5,
			/* type="string" Gets/Sets ability to enter only specific characters in input-field from keyboard and on paste.
				Notes:
				If both "excludeKeys" and "includeKeys" options are used, then "excludeKeys" has priority and includeKeys options is not respected.
				The option is case sensitive! */
			includeKeys: null,
			/* type="string" Gets/Sets ability to prevent entering specific characters from keyboard or on paste.
				Notes:
				If both "excludeKeys" and "includeKeys" options are used, then "excludeKeys" has priority and includeKeys options is not respected.
				The option is case sensitive! */
			excludeKeys: null,
			/* type="left|right|center" Gets/Sets horizontal alignment of text in editor. If that option is not set, then 'right' is used for 'numeric', 'currency' and 'percent' editors and the 'left' is used for all other types of editor.
					left type="string"
					right type="string"
					center type="string"
				*/
			textAlign: "left",
			/* type="string" Gets/Sets text which appears in editor when editor has no focus and "value" in editor is null or empty string. */
			placeHolder: null,
				/* type="selectAll|atStart|atEnd|browserDefault" Set the action when the editor gets focused. The default value is selectAll.
					selectAll type="string" Setting this option will select all the text into the editor when the edit mode gets enetered.
					atStart type="string" Setting this option will move the cursor at the begining the text into the editor when the edit mode gets enetered.
					atEnd type="string" Setting this option will move the cursor at the end the text into the editor when the edit mode gets enetered.
					browserDefault type="string" Setting this option won't do any extra logic, but proceed with browser default behavior.
				*/
			selectionOnFocus: "selectAll",
			/* type="text|password|multiline" Gets text mode of editor such as: single-line text editor, password editor or multiline editor. That option has effect only on initialization. If based element (selector) is TEXTAREA, then it is used as input-field.
				text type="string" Single line text editor based on INPUT element is created.
				password type="string" Editor based on INPUT element with type password is created.
				multiline type="string" multiline editor based on TEXTAREA element is created.
			*/
			textMode: "text",
			/* type="bool" Gets/Sets ability to automatically change the hoverd item into the opened dropdown list to its oposide side. When last item is reached and the spin down is clicked the first item gets hovered and vice versa.
			*/
			spinWrapAround: false,
			/* type="bool" Sets the ability to allow values only set into the list items. This validation is done only when the editor is blured, or enter key is pressed*/
			isLimitedToListValues: false,
			/* type="bool" Sets the editor to revert value to previous value in case of not valid value on blur, or enter key. If set to false clear is called.*/
			revertIfNotValid: true,
			/* type="bool" Sets the ability of the editor to prevent form submition on enter key pressed.*/
			preventSubmitOnEnter: false,
			/* type="auto|bottom|top" Gets/Sets drop down opening orientation for the dorp down list when open button is clicked. If auto option is set the component calculates if there is enough space at the bottom, if not checks the space above the component and if in both directions there is not enough space it openes the dropdown down way.
				'auto' type="string"
				'bottom' type="string"
				'top' type="string"
			*/
			dropDownOrientation: "auto",
			/* type="number" Gets/Sets maximum length of text which can be entered by user.
				Negative values or 0 disables that behavior.
			*/
			maxLength: null,
			/* type="bool" Gets ability to limit editor to be used only from the dropdown list. When set to true the editor input is not editable.
				Note! In case there are no list items - the editor will reamin readonly
				Note! This option can not be set runtime. */
			dropDownOnReadOnly: false,
			/* type="bool" Gets/Sets ability to convert input characters to upper case (true) or keeps characters as they are (false). That option has effect only while keyboard entries and paste. */
			toUpper: false,
			/* type="bool" Gets/Sets ability to convert input characters to lower case (true) or keeps characters as they are (false). That option has effect only while keyboard entries and paste. */
			toLower: false,
			/* type="object" Gets/Sets strings used for title of buttons. Value of object should contain pairs or key:value members. Note: any sub-option of locale can appear within the main option of igEditor. In this case those values within main options will have highest priority and override corresponding value in locale. */
			locale: null,
			/* type="bool" Disables default notifications for basic validation scenarios built in the editors such as required list selection, value wrapping around or spin limits. */
			suppressNotifications: false
		},
		css: {
			/* igWidget element classes go here */
			/* Class applied to the div which wraps the editable input (in case of multiline textarea). Default value is "ui-igeditor-input-container ui-corner-all" */
			editorInputContainer: "ui-igeditor-input-container ui-corner-all",
			/* Class applied to the div holding the spin up button image. Default value is "ui-igedit-spinupperimage ui-icon-carat-1-n ui-icon ui-igedit-buttondefault ui-igedit-spinbutton ui-igedit-buttonimage'*/
			spinButtonUpImage: "ui-igedit-spinupperimage ui-icon-carat-1-n ui-icon " +
				"ui-igedit-buttondefault ui-igedit-spinbutton ui-igedit-buttonimage",
			/* Class applied to the div holding the spin down button image. Default value is 'ui-igedit-spinlowerimage ui-icon-carat-1-s ui-icon ui-igedit-buttondefault ui-igedit-spinbutton ui-igedit-buttonimage'*/
			spinButtonDownImage: "ui-igedit-spinlowerimage ui-icon-carat-1-s ui-icon " +
				"ui-igedit-buttondefault ui-igedit-spinbutton ui-igedit-buttonimage",
			/* Class applied to the div holding the drop down button image. Default value is 'ui-icon ui-icon-carat-1-s ui-igedit-buttonimage'*/
			dropDownImage: "ui-icon ui-icon-triangle-1-s ui-igedit-buttonimage",
			/* Class applied to the div holding the drop down button. Default value is 'ui-igedit-dropdown-button'*/
			dropDownButton: "ui-igedit-dropdown-button ",
			/* Class applied to the div holding the clear button image. Default value is 'ui-igedit-buttonimage ui-icon-circle-close ui-icon ui-igedit-buttondefault'*/
			clearButtonImage: "ui-igedit-buttonimage ui-icon-circle-close " +
				"ui-icon ui-igedit-buttondefault",
			/* Class applied to the div holding the clear button. Default value is 'ui-igedit-cleararea ui-state-default'*/
			clearButton: "ui-igedit-cleararea ui-state-default",
			/* Class applied commonly to all the button containers, Default value is 'ui-igedit-button-common ui-unselectable ui-igedit-button-ltr ui-state-default'*/
			buttonCommon: "ui-igedit-button-common ui-unselectable " +
				"ui-igedit-button-ltr ui-state-default",
			/* Class applied to the container holding the listitems. Default value is 'ui-igedit-dropdown'*/
			dropDownList: "ui-igedit-dropdown ui-widget",
			/* Class applied to the SPAN element which represents item in dropdown list. Default value is 'ui-igedit-listitem ui-state-default' */
			listItem: "ui-igedit-listitem ui-state-default",
			/* Class applied to the Class applied to the SPAN element which represents item in dropdown list with mouse-over state. Default value is 'ui-igedit-listitemhover ui-state-hover' */
			listItemHover: "ui-igedit-listitemhover ui-state-hover",
			/* Class applied to the Class applied to the SPAN element which represents active item in dropdown list. Default value is 'ui-igedit-listitemselected ui-state-highlight' */
			listItemActive: "ui-state-active ui-igedit-listitemactive",
			/* Class applied to the Class applied to the SPAN element which represents selected item in dropdown list. Default value is 'ui-igedit-listitemselected ui-state-highlight' */
			listItemSelected: "ui-igedit-listitemselected ui-state-highlight",
			/* Classes applied to the SPAN element of button in mouse-over state. Default value is 'ui-igedit-buttonhover ui-state-hover' */
			buttonHover: "ui-igedit-buttonhover ui-state-hover",
			/* Classes applied to the SPAN element of button in pressed state. Default value is 'ui-igedit-buttonpressed ui-state-highlight' */
			buttonPressed: "ui-igedit-buttonpressed ui-state-highlight",
			/* Class applied to the visible input in case of plaseHolder option set. This class is related only to the placeHolder styling. Default value is 'ui-igedit-placeholder'*/
			placeHolder: "ui-igedit-placeholder",
			/* Class applied to the visible textarea element in case of textMode set to 'multiline'*/
			textArea: "ui-igedit-textarea"
		},
		events: {
			/* cancel="true" Event which is raised on keydown event.
				Return false in order to cancel key action.
				Function takes arguments evt and ui.
				Use evt.originalEvent to obtain reference to event of browser.
				Use ui.owner to obtain reference to igEditor.
				Use ui.key to obtain value of keyCode. */
			keydown: "keydown",
			/* cancel="true" Event which is raised on keypress event.
				Return false in order to cancel key action.
				Function takes arguments evt and ui.
				Use evt.originalEvent to obtain reference to event of browser.
				Use ui.owner to obtain reference to igEditor.
				Use ui.key to obtain value of keyCode.
				Set ui.key to another character which will replace original entry. */
			keypress: "keypress",
			/* Event which is raised on keyup event.
				Function takes arguments evt and ui.
				Use evt.originalEvent to obtain reference to event of browser.
				Use ui.owner to obtain reference to igEditor.
				Use ui.key to obtain value of keyCode. */
			keyup: "keyup",
			/* cancel="true" Event which is raised when the drop down is opening.
				Function takes arguments evt and ui.
				Use ui.owner to obtain reference to igEditor.
				Use ui.editorInput to obtain reference to the editable input
				Use ui.list to obtain reference to the list contaier. */
			dropDownListOpening: "dropDownListOpening",
			/* Event which is raised when the drop down is already opened.
				Function takes arguments evt and ui.
				Use ui.owner to obtain reference to igEditor.
				Use ui.editorInput to obtain reference to the editable input
				Use ui.list to obtain reference to the list contaier. */
			dropDownListOpened: "dropDownListOpened",
			/* cancel="true" Event which is raised when the drop down is closing.
				Function takes arguments evt and ui.
				Use ui.owner to obtain reference to igEditor.
				Use ui.editorInput to obtain reference to the editable input
				Use ui.list to obtain reference to the list contaier. */
			dropDownListClosing: "dropDownListClosing",
			/* Event which is raised when the drop down is already closed.
				Function takes arguments evt and ui.
				Use ui.owner to obtain reference to igEditor.
				Use ui.editorInput to obtain reference to the editable input
				Use ui.list to obtain reference to the list contaier. */
			dropDownListClosed: "dropDownListClosed",
			/* cancel="true" Event which is raised when the drop down list item is selecting.
				Function takes arguments evt and ui.
				Use ui.owner to obtain reference to igEditor.
				Use ui.editorInput to obtain reference to the editable input
				Use ui.list to obtain reference to the list contaier.
				Use ui.item to obtain reference to the list item which is about to be selected. */
			dropDownItemSelecting: "dropDownItemSelecting",
			/* cancel="true" Event which is raised when the drop down list item is selected.
				Function takes arguments evt and ui.
				Use ui.owner to obtain reference to igEditor.
				Use ui.editorInput to obtain reference to the editable input
				Use ui.list to obtain reference to the list contaier.
				Use ui.item to obtain reference to the list item which is selected. */
			dropDownItemSelected: "dropDownItemSelected",
			/* Event which is raised after text in editor was changed. It can be raised when keyUp event occurs,
				or when the clear button is clicked or when an item from a list is selected.
				Function takes arguments evt and ui.
				Use ui.owner to obtain reference to igEditor.
				Use ui.text to obtain new text
				Use ui.oldText to obtain the old text. */
			textChanged: "textChanged"
		},
		_create: function () { //igTextEditor
			$.ui.igBaseEditor.prototype._create.call(this);
		},
		_setOption: function (option, value) { // igTextEditor
			/* igTextEditor custom setOption goes here */
			var prevValue = this.options[ option ];
			if (prevValue === value) {
				return;
			}

			// The following line applies the option value to the igWidget meaning you don't
			// have to perform this.options[ option ] = value;
			$.Widget.prototype._setOption.apply(this, arguments);
			switch (option) {
				case "value":
					this.value(value);

					//if (this._validateValue(value)) {
					//	this._updateValue(value);
					//	this._exitEditMode();
					//} else {
					//	this._clearValue();
					//	this._exitEditMode();
					//}
					break;
				case "placeHolder":
					this._applyPlaceHolder();
					break;
				case "suppressNotifications":
					if (value) {
						this._clearEditorNotifier();
					}
					break;
				case "listItems":
					this._deleteList();
					this._createList();
					this._clearValue();
					break;
				case "listWidth":
					this._setDropDownListWidth();
					break;
				case "excludeKeys":
					if (value === "") {
						this._excludeKeysArray = [];
					} else {
						this._excludeKeysArray = value.toString().split("");
					}
					break;
				case "includeKeys":
					if (value === "") {
						this._includeKeysArray = [];
					} else {
						this._includeKeysArray = value.toString().split("");
					}
					break;
				case "textAlign":
					this._editorInput.css("text-align", value);
					break;
				case "dropDownOnReadOnly":
				case "visibleItemsCount":
				case "buttonType":
				case "dropDownAttachedToBody":
					this.options[ option ] = prevValue;
					throw new Error($.ig.Editor.locale.cannotSetRuntime);
				default:

					//In case no propery matches, we call the super. Into the base widget default statement breaks
					this.options[ option ] = prevValue;
					this._super(option, value);
					break;
			}
		},

		//This method validates and updates the value input the hidden input
		_updateValue: function (value) { //TextEditor //WE should detect dataMode, so we can use the options.
			if (value !== null && value !== undefined) {
				value = value.toString();
			}
			this._super(value);
		},
		_applyOptions: function () { //TextEditor
			var initialValue;
			this._editMode = false;
			this._focused = false;
			this._super();
			if (this.options.includeKeys) {
				this._includeKeysArray = this.options.includeKeys.toString().split("");
			}
			if (this.options.excludeKeys) {
				this._excludeKeysArray = this.options.excludeKeys.toString().split("");
			}
			if (this.options.value !== undefined) {
				initialValue = this.options.value;
				if (this.options.maxLength) {
					if (initialValue && initialValue.toString().length > this.options.maxLength) {
						initialValue = initialValue.toString().substring(0, this.options.maxLength);

						//Raise warning
						this._sendNotification("warning",
							$.ig.util.stringFormat($.ig.Editor.locale.maxLengthErrMsg,
								this.options.maxLength));
					}
				}
				if (this._validateValue(initialValue)) {
					this._setInitialValue(initialValue);
				this._editorInput.val(this._getDisplayValue());
				}
			} else if (this.element.val() && this._validateValue(this.element.val())) {
				initialValue = this.element.val();
				if (this.options.maxLength) {
					if (initialValue && initialValue.toString().length > this.options.maxLength) {
						initialValue = initialValue
							.toString()
							.substring(0, this.options.maxLength);

						//Raise warning
						this._sendNotification("warning",
							$.ig.util.stringFormat($.ig.Editor.locale.maxLengthErrMsg,
								this.options.maxLength));
					}
				}
				if (this._validateValue(initialValue)) {
					this._setInitialValue(initialValue);
				this._editorInput.val(this._getDisplayValue());
				} else {
					this._editorInput.val("");
			}
			}
			this._applyPlaceHolder();
		},
		_render: function () {
			//We asume the base renderer has already been invoked
			var editorElementWrapper, editorElement, tempTimeStamp;
			this._triggerRendering();
			if (this.element.attr("id") !== undefined) {
				this.id = this.element.attr("id");
			} else {
				tempTimeStamp = new Date();
				this.id = tempTimeStamp.getTime();
			}
			if (this.element.is("div") || this.element.is("span")) {
				if (this.options.textMode === "multiline") {
					editorElement = $("<textarea rows='4' cols='50'></textarea>");
					editorElement.addClass(this.css.textArea);
				} else if (this.options.textMode === "password") {
					editorElement = $("<input type='password' autocomplete='off'/>");
				} else {
					editorElement = $("<input type='text' />");
				}

				if (this.element.is("span")) {
					editorElement = this.element.html(editorElement);
				}
				editorElementWrapper = editorElement.wrap($("<div></div>")).parent();
				editorElementWrapper.addClass(this.css.editorInputContainer);
				this._editorInputWrapper = editorElementWrapper;
				if (this.element.is("span")) {
					this._editorInput = editorElement.children(0);
					this._editorContainer = editorElementWrapper.wrap($("<div></div>")).parent();
				} else {
					this._editorInput = editorElement;
					this._editorContainer = this.element;
				}
				this._editorContainer.prepend(editorElementWrapper);
			} else if (this.element.is("input")) {
				this._editorContainer = this.element.wrap($("<div></div>")).parent();
				this._editorInput = this.element;
				editorElementWrapper = this._editorInput.wrap($("<div></div>")).parent();
				editorElementWrapper.addClass(this.css.editorInputContainer);
				this._editorInputWrapper = editorElementWrapper;
			} else if (this.element.is("textarea")) {
				if (this.options.textMode !== "multiline") {
					throw ($.ig.Editor.locale.multilineErrMsg);
				} else {
					this._editorContainer = this.element.wrap($("<div></div>")).parent();
					this._editorInput = this.element;
					this._editorInput.addClass(this.css.textArea);
					editorElementWrapper = this._editorInput.wrap($("<div></div>")).parent();
					editorElementWrapper.addClass(this.css.editorInputContainer);
					this._editorInputWrapper = editorElementWrapper;
				}
			} else {

				//TODO Throw target element not supported.
				throw ($.ig.Editor.locale.targetNotSupported);
			}
			this._editorContainer.addClass(this.css.container);
			this._editorInput.addClass(this.css.editor);
			this._editorInput.css("height", "100%");

			if (this.element.is("input") && this._editorInput.attr("id") !== undefined) {
				this._editorInputId = this._editorInput.attr("id");
			} else {
				this._editorInput.attr("id", this.id + "EditingInput");
				this._editorInputId = this.id + "EditingInput";
			}

			//Set input type to text
			if (!$.ig.util.isIE8) {
				if (this.options.textMode !== "multiline") {
					if (this.options.textMode === "password") {
						this._editorInput.attr("type", "password");
						this._editorInput.attr("autocomplete", "off");
					} else {
						this._editorInput.attr("type", "text");
					}
				}
			}

			if (this.options.buttonType && this.options.buttonType !== "none" &&
				this.options.textMode !== "multiline" && this.options.textMode !== "password") {
				this._renderButtons();
			}
			if (this.options.width) {
				this._editorContainer.css("width", this.options.width);
			}
			if (this.options.height) {
				this._editorContainer.css("height", this.options.height);
			}

			//TODO check for textarea
			if (this.options.textMode === "multiline") {
				this._valueInput = $("<textarea style='display:none'></textarea>");
			} else {
				this._valueInput = $("<input type='hidden'></input>");
			}
			this._editorInput.after(this._valueInput);
			this._editorInput.css("text-align", this.options.textAlign);
			this._createList();

			this._attachEvents();
			this._applyOptions();
			this._applyAria();

			this._triggerRendered();
		},
		_applyAria: function () {
			this._super();
			this._applyInputAriaLabel();
		},
		_applyInputAriaLabel: function () {
			var ariaLabelText;
			switch (this.widgetName) {
				case "igTextEditor": {
					ariaLabelText = this._getLocaleOption("ariaTextEditorFieldLabel");
				}
					break;
				case "igNumericEditor": {
					ariaLabelText = this._getLocaleOption("ariaNumericEditorFieldLabel");
				}
					break;
				case "igCurrencyEditor": {
					ariaLabelText = this._getLocaleOption("ariaCurrencyEditorFieldLabel");
				}
					break;
				case "igPercentEditor": {
					ariaLabelText = this._getLocaleOption("ariaPercentEditorFieldLabel");
				}
					break;
				case "igMaskEditor": {
					ariaLabelText = this._getLocaleOption("ariaMaskEditorFieldLabel");
				}
					break;
				case "igDateEditor": {
					ariaLabelText = this._getLocaleOption("ariaDateEditorFieldLabel");
				}
					break;
				case "igDatePicker": {
					ariaLabelText = this._getLocaleOption("ariaDatePickerFieldLabel");
				}
					break;
				default: {
					ariaLabelText = this._getLocaleOption("ariaTextEditorFieldLabel");
				}
			}
			this._editorInput.attr("aria-label", ariaLabelText);
		},
		_sendNotification: function (state, message) {
			if (this.options.suppressNotifications || this._skipMessages /* flag on isValid() call */) {
				this._currentMessage = message;
				return;
			}
			if (!this._editorContainer.data("igNotifier")) {
				this._editorContainer.igNotifier();
			}
			this._editorContainer.igNotifier("notify", state, message);
		},
		_applyPlaceHolder: function() {
			if (this.options.placeHolder && this.options.placeHolder !== "") {
				this._editorInput.attr("placeholder", this.options.placeHolder);

				//If placeholder is not supported
				this._editorInput.addClass(this.css.placeHolder);
				if (this._placeHolderNotSupported()) {
					console.log($.ig.Editor.locale.placeHolderNotSupported);
				}
			} else if (this._editorInput.attr("placeholder")) {
				this._editorInput.removeAttr("placeholder");
			}
		},
		_placeHolderNotSupported: function () {
			return document.createElement("input").placeholder === undefined;
		},

		//We use this extra function so we can branch the logic into mask editor.
		_setInitialValue: function (value) { //igTextEditor
			this._updateValue(value);
		},
		_disableEditor: function (applyDisabledClass) { //TextEditor
			//T.P. 9th Dec 2015 Bug 211010
			//applyDisabledClass parameter is flag wheather the ui-state-disabled class is applied to the both _editorInput and _valueInput
			//In both readOnly and disabled state we have similar logic for making the editor disabled/readonly (detach event and remove classes)
			if (this.options.dropDownOnReadOnly) {
				if (applyDisabledClass) {
					this._editorInput.addClass(this.css.disabled);
				}
			} else {
				if (applyDisabledClass) {
					this._editorContainer.addClass(this.css.disabled);
				}
				this._detachEvents();
			}

			if (this._dropDownList && !this.options.dropDownOnReadOnly) {
				if (applyDisabledClass) {
					this._dropDownList.addClass(this.css.disabled);
				}
				this._detachListEvents();
			}
			if (this._dropDownButton && !this.options.dropDownOnReadOnly) {
				this._dropDownButton.addClass(this.css.disabled);
				this._detachButtonsEvents(this._dropDownButton);
			}
			if (this._clearButton) {
				this._clearButton.addClass(this.css.disabled);
				this._detachButtonsEvents(this._clearButton);
			}
			if (this._spinUpButton) {
				this._spinUpButton.addClass(this.css.disabled);
				this._detachButtonsEvents(this._spinUpButton);
			}
			if (this._spinDownButton) {
				this._spinDownButton.addClass(this.css.disabled);
				this._detachButtonsEvents(this._spinDownButton);
			}
		},

		// replaces characted at a specific position
		_replaceCharAt: function (stringValue, index, ch) {
			if (stringValue !== undefined) {
				return stringValue.substring(0, index) + ch + stringValue.substring(index + 1);
			}
		},
		_getStringRange: function (stringValue, start, end) {
			if (stringValue !== undefined) {
				return stringValue.substring(start, end);
			}
		},
		_replaceStringRange: function (stringValue, replacementValue, indexStart, indexEnd) {
			var i = 0;
			while (indexStart <= indexEnd) {
				stringValue = this._replaceCharAt(stringValue, indexStart, replacementValue.charAt(i));
				i++;
				indexStart++;
			}
			return stringValue;
		},
		_validateValue: function (val) { //Text Editor
			var loweredItems, result;
			if (val === undefined) {
				result = false;
			} else if (val === null) {
				if (this.options.allowNullValue) {
					result = val === this.options.nullValue ? true : false;
				} else {
					result = false;
				}
			} else if (this.options.isLimitedToListValues && this._dropDownList) {
				loweredItems = $.map(this.options.listItems, function (item) {
					// M.H. 4 Dec 2015 Fix for bug 210666: "Uncaught TypeError: Cannot read property 'toString' of undefined" when using filter API
					return (item === null || item === undefined) ? "" : item.toString().toLowerCase();
				});
				if ($.inArray(val.toString().toLowerCase(), loweredItems) !== -1) {
					result = true;
				} else {
					this._sendNotification("warning", $.ig.Editor.locale.allowedValuesMsg);
					result = false;
				}
			} else if (this.options.maxLength) {
				 if (val.toString().length <= this.options.maxLength) {
					result = true;
				} else {
					this._sendNotification("warning",
						$.ig.util.stringFormat($.ig.Editor.locale.maxLengthErrMsg,
							this.options.maxLength));
					result = false;
				}
			} else {
				result = true;
			}
			return result;
		},
		_setEditableMode: function () {
			//Default value we don't do anything unless we implement setOption related to that.
			this._super("_setEditableMode");

			if (this._dropDownList && !this.options.dropDownOnReadOnly) {
				this._dropDownList.removeClass(this.css.disabled);
				this._attachListEvents();
			}
			if (this._dropDownButton && !this.options.dropDownOnReadOnly) {
				this._dropDownButton.removeClass(this.css.disabled);
				this._attachButtonsEvents("dropdown", this._dropDownButton);
			}
			if (this._clearButton) {
				this._clearButton.removeClass(this.css.disabled);
				this._attachButtonsEvents("clear", this._clearButton);
			}
			if (this._spinUpButton) {
				this._spinUpButton.removeClass(this.css.disabled);
				this._attachButtonsEvents("spinUp", this._spinUpButton);
			}
			if (this._spinDownButton) {
				this._spinDownButton.removeClass(this.css.disabled);
				this._attachButtonsEvents("spinDown", this._spinDownButton);
			}
		},
		_calculateDropDownListOrientation: function () {
			var containerOffset = this._editorContainer.offset(),
				containerTop = containerOffset.top,
				containerHeight = parseFloat(this._editorContainer.css("height")),
				dropDownAndEditorHeight = parseInt(containerTop + containerHeight + this._listInitialHeight),
				widndowHeight = $(window).height(),
				orientation;
			if (this.options.dropDownOrientation === "auto") {
				if (dropDownAndEditorHeight < widndowHeight + $(window).scrollTop()) {
					orientation = "bottom";
				} else if ((containerTop - this._listInitialHeight) > 0) {
					orientation = "top";
				} else {
					orientation = "bottom";
				}
			} else {
				orientation = this.options.dropDownOrientation;
			}
			return orientation;
		},
		_positionDropDownList: function () {
			var containerOffset = this._editorContainer.offset(),
			containerTop = containerOffset.top,
			containerLeft = containerOffset.left,
			containerHeight = parseFloat(this._editorContainer.css("height")),
			orientation = this._calculateDropDownListOrientation();
			if (this.options.dropDownAttachedToBody) {
				this._dropDownList.css("left", containerLeft);
				if (orientation === "bottom") {
					this._dropDownList.css("top", containerTop + containerHeight);
					this._dropDownListOrientation = "down";
					this._dropDownList.removeClass("ui-igedit-dropdown-orientation-top");
					this._dropDownList.addClass("ui-igedit-dropdown-orientation-bottom");
				} else {
					this._dropDownList.css("top", containerTop - this._listInitialHeight);
					this._dropDownListOrientation = "up";
					this._dropDownList.removeClass("ui-igedit-dropdown-orientation-bottom");
					this._dropDownList.addClass("ui-igedit-dropdown-orientation-top");
				}
			} else {
				this._dropDownList.css("left", "");
				if (orientation === "bottom") {
					this._dropDownList.css("top", "");
					this._dropDownListOrientation = "down";
					this._dropDownList.removeClass("ui-igedit-dropdown-orientation-top");
					this._dropDownList.addClass("ui-igedit-dropdown-orientation-bottom");
				} else {
					this._dropDownList.css("top", -this._listInitialHeight);
					this._dropDownListOrientation = "up";
					this._dropDownList.removeClass("ui-igedit-dropdown-orientation-bottom");
					this._dropDownList.addClass("ui-igedit-dropdown-orientation-top");
				}
			}

			// In case we have editor width set into percent, once the window is resized the width of the editor might be changed and we need to set new width for the list
			this._setDropDownListWidth();
		},
		_createList: function () {
			if (this.options.textMode !== "multiline" &&
				this.options.textMode !== "password" &&
				this.options.listItems && this.options.listItems.length > 0) {

				if (this.options.buttonType.toString().indexOf("dropdown") === -1) {
					this._renderDropDownButton();
				}
				this._renderList();
				this._positionDropDownList();
				this._attachListEvents();
			}
		},
		_renderList: function () {
			var i, list = this.options.listItems, itemValue, currentItem, itemHeight, dropdown,
				id = this.id, html;

			html = "<div id='" + id + "_list" + "' tabindex='-1' class='" +
				this.css.dropDownList + "' role='listbox' aria-activedescendant='" +
				this._editorInputId + "'>";
			this._editorInput.attr("aria-owns", this.id + "_list");
			for (i = 0; i < list.length; i++) {
				itemValue = this.options.displayFactor ?
					this._multiplyWithPrecision(list[ i ], this.options.displayFactor) :
					list[ i ];
				currentItem = "<span id='" + id + "_item_" + (i + 1) +
					"' tabindex='-1' role='option' aria-selected='false' aria-posinset='" +
					(i + 1).toString() + "' class='" + this.css.listItem + "' title='" +
					itemValue + "'>" + itemValue +
					"</span>";
				html += currentItem;
			}
			html += "</div>";
			dropdown = $(html);
			if (currentItem) {
				currentItem = $(currentItem);
			}

			if (this.options.dropDownAttachedToBody) {
				$(document.body).append(dropdown);
			} else {
				this._editorContainer.append(dropdown);
			}
			itemHeight = currentItem.css("height");
			itemHeight = parseFloat(itemHeight);
			if (itemHeight === 0) {

				// According to Designers, when height is 0, this is better solution, then setting min-height: 23 in CSS.
				itemHeight = 23;
			}
			if (list.length < this.options.visibleItemsCount) {
				dropdown.css("height", parseFloat(itemHeight * list.length));
				this._listInitialHeight = parseFloat(itemHeight * list.length);

				//TODO - hide scroll
			} else {
				dropdown.css("height", parseFloat(itemHeight * this.options.visibleItemsCount) + 2);
				this._listInitialHeight = parseFloat(itemHeight * this.options.visibleItemsCount) + 2;
			}
			this._dropDownList = dropdown;
			this._setDropDownListWidth();
			dropdown.hide();
			dropdown.visible = false;
		},
		_setDropDownListWidth: function () {
			if (this.options.listWidth && this.options.listWidth > 0) {
				this._dropDownList.css("width", this.options.listWidth);
			} else {
				this._dropDownList.css("width", this._editorContainer.css("width"));
			}
		},
		_attachListEvents: function () {
			var self = this;
			this._dropDownList.on({
				"mouseenter.editorList": function (event) {
					var item = event.target;
					$(item).addClass(self.css.listItemHover, self.options.listItemHoverDuration);
					$(item).attr("data-hovered", true);
				},
				"mouseleave.editorList": function (event) {
					var item = event.target;
					$(item).removeClass(self.css.listItemHover, self.options.listItemHoverDuration);
					$(item).removeAttr("data-hovered");
				},
				"click.editorList": function (event) {
					self._triggerListItemClick(event.target);
				},
				"mousedown.editorList": function (event) {
					event.preventDefault();

					// N.A. 12/8/2015 Bug #210922: In IE8 click is not fired, if the propagation is stopped in mousedown.
					if (!$.ig.util.isIE8) {
						event.stopPropagation();
					}
				}
			}, ".ui-igedit-listitem");

			this._dropDownList.on("mousedown.editorList", function (event) {
				self._listMouseDownHandler(event);
			});

		},
		_listMouseDownHandler: function (event) { //igTextEditor
			if ($.ig.util.isIE || $.ig.util.isEdge) {
				this._cancelBlurOnInput = true;
			} else {
				event.preventDefault();
				event.stopPropagation();
			}
		},
		_deleteList: function () {
			this._detachListEvents();
			this._dropDownList.remove();
			delete this._dropDownList;
		},
		_deleteDropDownButton: function () {
			this._detachButtonsEvents(this._dropDownButton);
			this._dropDownButton.remove();
			delete this._dropDownButton;
		},
		_detachListEvents: function () {
			if (this._dropDownList) {
				this._dropDownList.off("mouseenter.editorList mouseleave.editorList ");
				this._dropDownList.off("click.editorList mousedown.editorList");
			}
		},
		_renderDropDownButton: function () {
			var dropDownButton = $("<div role='button' tabindex='-1' id='" +
				this.id + "_dropDownButton' aria-label='" +
				this._getLocaleOption("ariaDropDownButton") + "'></div>"),
					dropDownIcon = $("<div></div>");
			if (this._dropDownButton) {
				return;
			}
			dropDownButton.addClass(this.css.buttonCommon);
			dropDownButton.attr("title", this._getLocaleOption("buttonTitle"));
			this._editorContainer.prepend(dropDownButton
				.addClass(this.css.dropDownButton)
				.append(dropDownIcon.addClass(this.css.dropDownImage)));
			this._dropDownButton = dropDownButton;
			this._attachButtonsEvents("dropdown", dropDownButton);
		},
		_renderSpinButtons: function () {
			var spinButtonUp = $("<div role='button' tabindex='-1' id='" +
				this.id +
				"_spinUpButton' aria-label='" +
				this._getLocaleOption("ariaSpinUpButton") +
				"'></div>"), spinButtonUpImage = $("<div></div>"),

				spinButtonDown = $("<div role='button' tabindex='-1' id='" +
					this.id + "_spinDownButton' aria-label='" +
					this._getLocaleOption("ariaSpinDownButton") +
					"'></div>"),

				spinButtonDownImage = $("<div></div>");
			if (this._spinUpButton) {
				return;
			}
			spinButtonUp
				.addClass(this.css.buttonCommon)
				.append(spinButtonUpImage.addClass(this.css.spinButtonUpImage));
			spinButtonDown
				.addClass(this.css.buttonCommon)
				.append(spinButtonDownImage.addClass(this.css.spinButtonDownImage));
			spinButtonUp.attr("title", this._getLocaleOption("spinUpperTitle"));
			spinButtonDown.attr("title", this._getLocaleOption("spinLowerTitle"));
			this._editorContainer.prepend(spinButtonDown).prepend(spinButtonUp);
			this._attachButtonsEvents("spinDown", spinButtonDown);
			this._attachButtonsEvents("spinUp", spinButtonUp);
			this._spinUpButton = spinButtonUp;
			this._spinDownButton = spinButtonDown;
		},
		_renderClearButton: function () {
			var clearButton = $("<div role='button' id='" +
				this.id +
				"_clearButton' tabindex='-1' aria-label='" +
				this._getLocaleOption("ariaClearButton") + "'></div>"),

				buttonClearIcon = $("<div></div>");
			if (this._clearButton) {
				return;
			}
			clearButton.addClass(this.css.buttonCommon);
			clearButton.append(buttonClearIcon.addClass(this.css.clearButtonImage));
			clearButton.attr("title", this._getLocaleOption("clearTitle"));
			this._editorContainer.prepend(clearButton.addClass(this.css.clearButton));
			this._clearButton = clearButton;
			this._attachButtonsEvents("clear", clearButton);
		},
		_renderButtons: function () {
			var buttons = this.options.buttonType.toString().split(/[\s,]+/), buttonsCountRendered = 0;

			if ($.inArray("clear", buttons) !== -1) {
				this._renderClearButton();
				buttonsCountRendered++;
			}
			if ($.inArray("spin", buttons) !== -1) {

				//In that case we need to render spin buttons in case of numeric editors and for all others we need to check if there is listItems.
				if (this._numericType || (this.options.listItems &&
					this.options.listItems !== null &&
					this.options.listItems.length > 0)) {
					this._renderSpinButtons();
					buttonsCountRendered += 2;
				} else if (this.options.listItems === null || this.options.listItems.length === 0) { //#208356 S.D. Error for no listitems
					throw new Error($.ig.Editor.locale.noListItemsNoButton);
				}
			}

			if ($.inArray("dropdown", buttons) !== -1) {
				if (this.options.listItems &&
					this.options.listItems !== null &&
					this.options.listItems.length > 0) {
					this._renderDropDownButton();
					buttonsCountRendered++;
				} else if (this.options.listItems === null || this.options.listItems.length === 0) {
					throw new Error($.ig.Editor.locale.noListItemsNoButton);
				}
			}

			if (buttonsCountRendered === 0) {
				console.log($.ig.Editor.locale.btnValueNotSupported);
			}
		},
		_attachButtonsEvents: function (type, target) {
			var self = this;
			if (!target) {
				return;
			}
			/* jshint -W083*/
			target.on({
				"mouseenter.button": function () {
					target.addClass(self.css.buttonHover);
				},
				"mouseleave.button": function () {
					target.removeClass(self.css.buttonHover);
					if (target._pressed) {
						delete target._pressed;
						target.removeClass(self.css.buttonPressed);
					}
					if (target._spinTimeOut) {
						clearTimeout(target._spinTimeOut);
						delete target._spinTimeOut;
					}
					if (target._spinInterval) {
						clearInterval(target._spinInterval);
						delete target._spinInterval;
					}

				},
				"mousedown.button": function (event) {
					if (event.button === 0 || (event.button === 1 && $.ig.util.isIE8)) {
						target.addClass(self.css.buttonPressed);
						target._pressed = true;
						event.preventDefault();
						if (type === "spinUp" || type === "spinDown") {
							self._handleSpinEvent(type, target);
						}
					}

					// A.M. 30 October, 2015 Bug #207460 "'active' class is applied to all buttons when you click any of them"
					event.stopPropagation();
				},
				"mouseup.button": function () {
					target.removeClass(self.css.buttonPressed);
					delete target._pressed;
					if (target._spinTimeOut) {
						clearTimeout(target._spinTimeOut);
						delete target._spinTimeOut;
					}
					if (target._spinInterval) {
						clearInterval(target._spinInterval);
						delete target._spinInterval;
					}
				},
				"click.button": function (event) {
					self._triggerButtonClick(event, type);
				}
			});
			/* jshint +W083*/
		},
		_detachButtonsEvents: function (target) {
			if (target) {
				target.off("mouseenter.button mouseleave.button mousedown.button mouseup.button click.button");
			}
		},
		_attachEvents: function () { //TextEditor
			var self = this;
			self._super();
			this._editorInput.on({
				"focus.editor": function (event) {
					self._setFocus(event);
				},
				"blur.editor": function (event) {
					self._setBlur(event);
				},
				"paste.editor": function (event) {
					self._currentInputTextValue = self._editorInput.val();
					self._pasteHandler(event);
				},
				"keydown.editor": function (event) {

					//T.P. In case of backspace and delete we need to trigger textchanged eved directly
					if ((event.keyCode === 8 || event.keyCode === 46) &&
						self._editorInput.val() !== self._currentInputTextValue) {
						self._processTextChanged();
					}
					self._currentInputTextValue = self._editorInput.val();
					self._triggerKeyDown(event);
				},
				"keyup.editor": function (event) {
					self._triggerKeyUp(event);
					self._processTextChanged();
				},
				"keypress.editor": function (event) {
					self._triggerKeyPress(event);
				},
				"compositionstart.editor": function () {
					var widgetName = self.widgetName, cursorPosition = self._getCursorPosition();
					if (cursorPosition === -1) {
						switch (widgetName){
							case "igMaskEditor":
							case "igDateEditor":
							case "igDatePicker": {
								self._editorInput.val(self._maskWithPrompts);
								self._setCursorPosition(0);
							}
								break;
							default:
						}
					}
					self._compositionStartValue = self._editorInput.val();
					self._copositionStartIndex = self._getCursorPosition();

					// 207318 T.P. 4th Dec 2015, Internal flag needed for specific cases.
					self._inComposition = true;
				},
				"compositionend.editor": function () {
					setTimeout(function () {
						var value, pastedValue, widgetName = self.widgetName,
							cursorPosition = self._getCursorPosition();

						// In that case blur event is triggered before the composition end and the editor has already processed the change.
						if (self._inComposition !== true) {
							return;
						}
						switch (widgetName) {
							case "igMaskEditor":
								{
									pastedValue = value = self._replaceStringRange(self._compositionStartValue,
										self._currentCompositionValue, self._copositionStartIndex,
										self._copositionStartIndex + self._currentCompositionValue.length - 1);
								}
								break;
							case "igDateEditor":
							case "igDatePicker":
								{
									value = self._currentCompositionValue;
									value = $.ig.util.IMEtoNumberString(value, $.ig.util.IMEtoENNumbersMapping());
									pastedValue = value = self._parseValueByMask(value);
									if (value !== self._maskWithPrompts) {
										value = self._parseDateFromMaskedValue(value);
									}
								}
								break;
							default: {
								pastedValue = value = self._editorInput.val();
							}
						}

						//T.P. 7th April 2016. Bug 217371 - In case of text/mask editor the full width numbers should not be converted to half width,
						//because they are valid characters.
						if (widgetName !== "igTextEditor" && widgetName !== "igMaskEditor") {
							value = $.ig.util.IMEtoNumberString(value, $.ig.util.IMEtoENNumbersMapping());
							pastedValue = $.ig.util.IMEtoNumberString(pastedValue, $.ig.util.IMEtoENNumbersMapping());
						}
						if (self._validateValue(value)) {
							self._insert(pastedValue, self._compositionStartValue);
							self._setCursorPosition(cursorPosition);
						} else {
							if (self.options.revertIfNotValid) {
								value = self._valueInput.val();
								self._updateValue(value);
							} else {
								self._clearValue();
							}
							if (self._focused) {
								self._enterEditMode();
							}
						}

						//207318 T.P. 4th Dec 2015, Internal flag needed for specific cases.
						delete self._inComposition;
						delete self._copositionStartIndex;
						delete self._currentCompositionValue;
						delete self._compositionStartValue;
					}, 0);
				},
				"compositionupdate.editor": function (evt) {
					setTimeout(function () {
						self._currentCompositionValue =
							$(evt.target)
							.val()
							.toString()
							.substring(self._copositionStartIndex, self._getCursorPosition());
					}, 0);
				}
			});
		},
		_detachEvents: function () {
			this._super();
			this._editorInput.off("focus.editor blur.editor paste.editor");
			this._editorInput.off("keydown.editor keyup.editor keypress.editor");
			this._editorInput.off("compositionstart.editor compositionend.editor compositionupdate.editor");
		},
		_processValueChanging: function (value) { //TextEditor

			if (value !== this.value()) {
				if (!(this.value() === null && value === "")) {
				this._triggerInternalValueChange(value);
			}
			}
		},
		_triggerInternalValueChange: function (value) { //TextEditor
			var noCancel = this._triggerValueChanging(value);
			if (noCancel) {
				this._processInternalValueChanging(value);

				//We pass the new value in order to have the original value into the arguments
				this._triggerValueChanged(value);

			}
		},
		_processInternalValueChanging: function (value) { //TextEditor
				if (this._validateValue(value)) {
					this._updateValue(value);
				} else {

					// If the value is not valid, we clear the editor
					if (this.options.revertIfNotValid) {
						value = this._valueInput.val();
						this._updateValue(value);
					} else {
						this._clearValue();
						value = this._valueInput.val();
					}
				}
		},
		_triggerKeyDown: function (event) { //TextEditor
			//cancellable
			var e = event, noCancel, activeItem, args, currentInputVal, selection;
			args = {
				owner: this,
				element: event.target,
				key: event.keyCode,
				editorInput: this._editorInput
			};
			noCancel = this._trigger(this.events.keydown, event, args);
			if (noCancel) {
				//clear notifier
				this._clearEditorNotifier();
				if (e.keyCode === 13) {
					if (event.altKey && this.options.textMode === "multiline") {
						// This is needed, because of the grid. By default the HTML textarea didn't go to next line on ALT + ENTER, but it should, because in grid updating, this is the used as a keyboard navigation to go the next line.
						this._editorInput.val(this._editorInput.val() + "\n");
					} else {
						currentInputVal = this._editorInput.val();
						if (this._dropDownList && this._dropDownList.is(":visible")) {
							activeItem = this._dropDownList
								.children(".ui-igedit-listitem")
								.filter("[data-active='true']");
							if (activeItem.length > 0) {
								// We use the same handler, because it runs the common logic for item selecting and so on.
								this._triggerListItemClick(activeItem);
							} else {
								this._processValueChanging(currentInputVal);
							}
						} else {
							// We repeat the logic in case we don't have dropdown list. On enter the value is updated with the current value into editorInput.
							this._processValueChanging(currentInputVal);
						}
					}
				} else if (this._dropDownList) {
					//Arrow Up
					if (e.keyCode === 38) {
						//Close if opened
						if (e.altKey && this._dropDownList.is(":visible")) {
							this._toggleDropDown();
						} else if (this._dropDownList.is(":visible")) {
							//hover previousItem
							activeItem = this._dropDownList
								.children(".ui-igedit-listitem")
								.filter("[data-active='true']");
							if (activeItem.length > 0 && !activeItem.is(":first-child")) {
								this._hoverPreviousDropDownListItem();
							} else {
								//Close DropDonw
								this._toggleDropDown();
							}
						}
					} else if (e.keyCode === 40 || (e.keyCode === 38 && e.altKey)) { //Arrow Down
						if (!this._dropDownList.is(":visible")) {
							//openDropDown
							this._toggleDropDown();
						} else {
							//hover next element
							this._hoverNextDropDownListItem();
						}
					} else if (e.keyCode === 27 && this._dropDownList.is(":visible")) { //Escape and dropdown is opened
						//Close dropdown
						this._toggleDropDown();
					}
				} else if (this.options.maxLength) {
					currentInputVal = this._editorInput.val();
					if (currentInputVal.length === this.options.maxLength &&
							e.keyCode > 46 && !e.altKey && !e.ctrlKey && !e.shiftKey) {
						selection = this._getSelection(this._editorInput[ 0 ]);
						if (selection.start === selection.end) {
							e.preventDefault();
							e.stopPropagation();
							this._sendNotification("warning",
								$.ig.util.stringFormat($.ig.Editor.locale.maxLengthWarningMsg,
									this.options.maxLength));
						}
					}
				}
			}

			//We need this flag into the derived method, because if the key has been canceled by the user, we should not proceed with the execution.
			return noCancel;
		},
		_triggerKeyUp: function (event) {
			var args = {
				originalEvent: event,
				owner: this,
				element: event.target,
				editorInput: this._editorInput
			};
			this._trigger(this.events.keyup, event, args);
		},
		_validateNonCharacter: function (event) {
			// We need this method only in firefox, as all other browsers handle nonChar keyboard iteractions and doesn't fire keypress events.
			if ($.ig.util.isFF) {
				var e = event;

				// Allow: backspace, delete, tab, escape, enter and .
				if ($.inArray(e.keyCode, [ 46, 8, 9, 27, 13, 110, 190 ]) !== -1 ||

					// Allow: Ctrl+A
					(e.which === 97 && e.ctrlKey === true) ||

					// Allow Ctrl+C
					(e.which === 99 && e.ctrlKey === true) ||

					// Allow Ctrl+X
					(e.which === 120 && e.ctrlKey === true) ||

					// Allow Ctrl+V
					(e.which === 118 && e.ctrlKey === true) ||

					// Allow Ctrl+Z
					(e.which === 122 && e.ctrlKey === true) ||

					// Allow Ctrl+Y
					(e.which === 121 && e.ctrlKey === true) ||

					// Allow: home, end, left, right, down, up
					(e.keyCode >= 35 && e.keyCode <= 40)) {

					// let it happen, don't do anything
					return true;
				}
			} else {
				//In case of enter key the validation should pass,
				//because we need to trigger keypress event and give the option for custom handling by the user
				if (event.keyCode === 13) {
					return true;
				}

				//For all other browsers we rely only on _validateKey method
				return false;
			}
		},
		_triggerKeyPress: function (event) { //TextEditor
			if (this._validateNonCharacter(event) || this._validateKey(event)) {
				var args = {
					owner: this,
					element: event.target,
					key: event.keyCode,
					originalEvent: event,
					editorInput: this._editorInput
				};
				if (this.options.preventSubmitOnEnter &&
					event.keyCode === 13 &&
					!event.shiftKey &&
					this.options.textMode !== "multiline") {
					event.preventDefault();
					event.stopPropagation();
				}

				// T.P. 6th Nov 2015 When running firefox special keys like backspace ctrl etc. trigger keypress events and apply toLower and toUpper should happen only if character key is pressed
				if ((this.options.toUpper || this.options.toLower) &&
					!this._validateNonCharacter(event)) {
					var keyCode = event.which ? event.which : event.keyCode;
					if (keyCode) {
						var charStr, transformedChar, key, selection, val;
						charStr = String.fromCharCode(keyCode);
						if (this.options.toUpper) {
							transformedChar = charStr.toLocaleUpperCase();
						} else {
							transformedChar = charStr.toLocaleLowerCase();
						}
						key = transformedChar.charCodeAt(0);
						args.key = key;
						selection = this._getSelection(this._editorInput[ 0 ]);
						val = this._editorInput.val();

						this._editorInput.val(val.slice(0, selection.start) +
							transformedChar + val.slice(selection.end));

						// Move the caret
						this._setCursorPosition(selection.start + 1);
						event.preventDefault();
					}
				}
				return this._trigger(this.events.keypress, event, args);
			} else {
				event.preventDefault();
				event.stopPropagation();
			}
		},
		_triggerValueChanged: function (originalValue) {
			var args = {
				owner: this,
				editorInput: this._editorInput,
				newValue: this.options.value
			};
			if (originalValue) {
				args.originalValue = originalValue;
			}
			this._trigger(this.events.valueChanged, null, args);
		},
		_triggerValueChanging: function (newValue) {
			var args = {
				owner: this,
				editorInput: this._editorInput,
				oldValue: this.value(),
				newValue: newValue
			};
			return this._trigger(this.events.valueChanging, null, args);
		},
		_triggerListItemClick: function (item) {
			var noCancel;

			// Trigger itemSelecting (Cancellable)
			noCancel = this._triggerDropDownItemSelecting(item);
			if (noCancel) {

				// TODO select closest parent class
				$(item).parent().children(".ui-igedit-listitem")
					.removeClass(this.css.listItemSelected)
					.attr("aria-selected", false);
				$(item).addClass(this.css.listItemSelected);
				$(item).attr("aria-selected", true);

				noCancel = this._triggerDropDownClosing();
				if (noCancel) {
					this._hideDropDownList();
				}
				this._triggerDropDownItemSelected(item);

				if (this.value() !== $(item).text()) {

					this._currentInputTextValue = this._editorInput.val();
					this._processValueChanging($(item).text());
					this._processTextChanged();
					this._enterEditMode();
				}
			}
		},
		_triggerButtonClick: function (event, buttonType) {
			if (buttonType) {
				switch (buttonType) {
					case "dropdown": {
						this._toggleDropDown();
					}
						break;
					case "clear": {
						this._currentInputTextValue = this._editorInput.val();
						this._clearValue();
						this._processTextChanged();
						if (!this._editMode) {
							this._exitEditMode();
							this._triggerValueChanged();
						} else {
							this._enterEditMode();
						}

					}
						break;
				}
			}
		},
		_triggerDropDownClosing: function () {
			var args = {
				editor: this._editorContainer, owner: this,
				editorInput: this._editorInput,
				list: this._dropDownList
			};
			return this._trigger(this.events.dropDownListClosing, null, args);
		},
		_triggerDropDownClosed: function () {
			var args = {
				editor: this._editorContainer, owner: this,
				editorInput: this._editorInput,
				list: this._dropDownList
			};
			this._trigger(this.events.dropDownListClosed, null, args);
		},
		_triggerDropDownOpening: function () {
			var args = {
				editor: this._editorContainer, owner: this,
				editorInput: this._editorInput,
				list: this._dropDownList
			};
			return this._trigger(this.events.dropDownListOpening, null, args);
		},
		_triggerDropDownOpened: function () {
			var args = {
				owner: this,
				editorInput: this._editorInput,
				list: this._dropDownList
			};
			return this._trigger(this.events.dropDownListOpened, null, args);
		},
		_triggerDropDownItemSelecting: function (item) {
			var args = {
				editor: this._editorContainer, owner: this,
				editorInput: this._editorInput,
				list: this._dropDownList,
				item: item
			};
			return this._trigger(this.events.dropDownItemSelecting, null, args);
		},
		_triggerDropDownItemSelected: function (item) {
			var args = {
				owner: this,
				editorInput: this._editorInput,
				list: this._dropDownList,
				item: item
			};
			this._trigger(this.events.dropDownItemSelected, null, args);
		},
		_processTextChanged: function () {
			var currentVal = this._editorInput.val(),
				previousVal = this._currentInputTextValue;
			if (previousVal === undefined) {
				//In that case we don't have track of previous value, so we trigger the textChanged event
				this._triggerTextChanged("", currentVal);
			} else if (currentVal !== previousVal) {
				this._triggerTextChanged(previousVal, currentVal);
				if (this._validator) {
					// D.P. 26th Oct 2015 Bug 20972 validation onchange does not work correctly
					this._validator._validateInternal(this.element, null, false,
						this._editMode ? this._valueFromText(currentVal) : this.value());
				}
				this._currentInputTextValue = currentVal;
			}
		},
		_triggerTextChanged: function (oldValue, newValue) {
			var args = {
				owner: this,
				text: newValue,
				oldText: oldValue ? oldValue : ""
			};
			this._trigger(this.events.textChanged, null, args);
		},
		_elementPositionInViewport: function (el) {
				var areaTop = Math.ceil(el.parent().offset().top),
					elementoffset = Math.ceil(el.offset().top),
					elementHeight = Math.ceil(el.outerHeight()),
					listVisibleHeight = el.parent().outerHeight(), result;
				if (elementoffset - areaTop < 0) {
					result = "top";
				} else if (elementoffset + elementHeight - areaTop < listVisibleHeight) {
					result = "inside";
				} else if (elementoffset + elementHeight - areaTop > listVisibleHeight) {
					result = "bottom";
				}
				return result;
		},
		_hoverPreviousDropDownListItem: function () {
			var items = this._dropDownList.children(".ui-igedit-listitem"), newItem, currentItem;
			if (items && items.length > 0) {
				if (items.filter("[data-active='true']").length > 0) {
					currentItem = items.filter("[data-active='true']");
					newItem = currentItem.prev();
					if (currentItem.is(":first-child")) {
						if (this.options.spinWrapAround) {
							newItem = items.last();
							this._dropDownList.scrollTop(this._dropDownList.scrollTop() +
								newItem.position().top);
						} else {
							return;
						}
					} else {
						if (this._elementPositionInViewport(newItem) === "top") {
							this._dropDownList.scrollTop(this._dropDownList.scrollTop() -
								newItem.outerHeight());
						}
					}
					currentItem.removeClass(this.css.listItemActive,
						this.options.listItemHoverDuration);
					currentItem.removeAttr("data-active");
					newItem.addClass(this.css.listItemActive, this.options.listItemHoverDuration);
					newItem.attr("data-active", true);
				}
			}
		},
		_hoverNextDropDownListItem: function () {
			var items = this._dropDownList.children(".ui-igedit-listitem"), newItem, currentItem;
			if (items && items.length > 0) {
				if (items.filter("[data-active='true']").length > 0) {
					//we have already hovered item.
					currentItem = items.filter("[data-active='true']");
					newItem = currentItem.next();
					if (currentItem.is(":last-child")) {

						if (this.options.spinWrapAround) {
							newItem = items.first();
							this._dropDownList.scrollTop(this._dropDownList.scrollTop() +
								newItem.position().top);
						} else {
							return;
						}
					}

					// Element is below the viewPort and we need to scroll
					if (this._elementPositionInViewport(newItem) === "bottom") {
						this._dropDownList.scrollTop(this._dropDownList.scrollTop() +
							newItem.outerHeight());
					}
					currentItem.removeClass(this.css.listItemActive,
						this.options.listItemHoverDuration);
					currentItem.removeAttr("data-active");
				} else {
					newItem = items.filter(":visible").first();
				}
				newItem.addClass(this.css.listItemActive, this.options.listItemHoverDuration);
				newItem.attr("data-active", true);
			}
		},
		_pasteHandler: function (event) {
			// TextEditor Handler
			var self = this, previousValue = $(event.target).val(), newValue;
			this._currentInputTextValue = this._editorInput.val();
			this._timeouts.push(setTimeout(function () {
				newValue = $(event.target).val();
				self._insert(newValue, previousValue);
			}, 10));
		},
		_insertHandler: function (string) {
			var selection = this._getSelection(this.field()[ 0 ]),
				previousValue, newValue;
			if (string) {
				previousValue = this._editMode ? this._editorInput.val() : this.displayValue();
				newValue = this._replaceDisplayValue(selection, previousValue, string);
				this._insert(newValue, previousValue);
			}
		},
		_replaceDisplayValue: function (selection, previousValue, string) {
			return previousValue.substring(0, selection.start) + string +
				previousValue.substring(selection.end, previousValue.length);
		},
		_insert: function (newValue, previousValue) { // TextEditor
			var selection, i, ch;
			if (this.options.maxLength) {
				if (newValue && newValue.toString().length > this.options.maxLength) {
					newValue = newValue.toString().substring(0, this.options.maxLength);

					//Raise warning
					this._sendNotification("warning",
						$.ig.util.stringFormat($.ig.Editor.locale.maxLengthErrMsg,
							this.options.maxLength));
					}
				}
			if (this._validateValue(newValue)) {
				selection = this._getSelection(this._editorInput[ 0 ]);
				if (this.options.toUpper) {
					if (newValue) { newValue = newValue.toLocaleUpperCase(); }
				} else if (this.options.toLower) {
					if (newValue) { newValue = newValue.toLocaleLowerCase(); }
				}
				if (this.options.includeKeys !== null) {
					for (i = 0; i < newValue.length; i++) {
						ch = newValue.charAt(i);
						if ($.inArray(ch, this._includeKeysArray) !== -1) {
							continue;
						} else {
							newValue = this._replaceCharAt(newValue, i, "");
							i--;
						}
					}
				}
				if (this.options.excludeKeys !== null) {
					for (i = 0; i < newValue.length; i++) {
						ch = newValue.charAt(i);
						if ($.inArray(ch, this._excludeKeysArray) !== -1) {
							newValue = this._replaceCharAt(newValue, i, "");
							i--;
						}
					}
				}
				if (this._focused) {
					this._editorInput.val(newValue);
				}
				this._processValueChanging(newValue);
				this._processTextChanged();

				// Move the caret
				this._setCursorPosition(selection.start + newValue.length);
			} else {
				this._editorInput.val(previousValue);
			}
		},
		_markDropDownHoverActiveItem: function () {
			var activeItem =
				this._dropDownList
					.children(".ui-igedit-listitem")
					.filter(".ui-igedit-listitemselected");

			activeItem.attr("data-active", true);
		},
		_clearDropDownHoverActiveItem: function () {
			var hoveredItem = this._dropDownList.children(".ui-igedit-listitem")
					.filter("[data-hovered='true']"),
				activeItem = this._dropDownList.children(".ui-igedit-listitem")
					.filter("[data-active='true']");
			if (hoveredItem.length > 0) {
				hoveredItem.removeClass(this.css.listItemHover);
				hoveredItem.removeAttr("data-hovered");
			}
			if (activeItem.length > 0) {
				activeItem.removeClass(this.css.listItemActive);
				activeItem.removeAttr("data-active");
			}
		},
		_showDropDownList: function () {
			// Open Dropdown
			var direction;
			this._positionDropDownList();
			if (this._dropDownListOrientation === "up") {

				// We need this parameter as part of blind animation we're using
				direction = "down";
			} else {
				direction = "up";
			}
			try {
				$(this._dropDownList).show("blind", { direction: direction },
					this.options.dropDownAnimationDuration,
					$.proxy(this._triggerDropDownOpened, this));
			} catch (ex) {
				$(this._dropDownList).show(this.options.dropDownAnimationDuration,
					$.proxy(this._triggerDropDownOpened, this));
			}
			this._editorInput.attr("aria-expanded", true);
			this._markDropDownHoverActiveItem();
		},
		_hideDropDownList: function () {
			var direction;
			if (this._dropDownListOrientation === "up") {
				//We need this parameter as part of blind animation we're using
				direction = "down";
			} else {
				direction = "up";
			}
			try {
				$(this._dropDownList).hide("blind", { direction: direction },
					this.options.dropDownAnimationDuration,
					$.proxy(this._triggerDropDownClosed, this));
			} catch (ex) {
				$(this._dropDownList).hide(this.options.dropDownAnimationDuration,
					$.proxy(this._triggerDropDownClosed, this));
			}
			this._editorInput.attr("aria-expanded", false);
			this._clearDropDownHoverActiveItem();
		},
		_toggleDropDown: function () { //TextEditor
			var noCancel;

			// Close dropdown
			if (this._dropDownList.is(":visible")) {
				noCancel = this._triggerDropDownClosing();
				if (noCancel) {

					// Proceed with hiding
					this._hideDropDownList();

				}
			} else {

				// Open DropDown
				noCancel = this._triggerDropDownOpening();
				if (noCancel) {

					// Proceed with hiding
					// D.P. 21 Jun 2016 Bug 220712: igTextEditor - typed text is reverted to previous value in case the drop down is opened
					if (!this._editMode) {
						this._editorInput.focus();
					}
					this._showDropDownList();
				}

			}
		},
		_validateKey: function (event) {
			var ch, result;
			if (this.options.excludeKeys) {
				ch = String.fromCharCode(event.charCode || event.which);
				if ($.inArray(ch, this._excludeKeysArray) !== -1) {
					result = false;
				} else {
					result = true;
				}
			} else if (this.options.includeKeys) {
				ch = String.fromCharCode(event.charCode || event.which);
				if ($.inArray(ch, this._includeKeysArray) !== -1) {
					result = true;
				} else {
					result = false;
				}
			} else {
				result = true;
			}
			return result;
		},
		_enterEditMode: function () { //TextEditor
			this._editMode = true;
			var selection = this._getSelection(this._editorInput[ 0 ]);
			this._currentInputTextValue = this._editorInput.val();
			this._editorInput.val(this._valueInput.val());
			this._positionCursor(selection.start, selection.end);
			this._processTextChanged();
		},
		_exitEditMode: function () { //TextEditor
			// Update the editor input with display value
			if (this.options.textMode === "text" && !$.ig.util.isIE8) {
				this._editorInput.attr("type", "text");
			}
			this._currentInputTextValue = this._editorInput.val();
			this._editorInput.val(this._getDisplayValue());
			this._editMode = false;
			this._processTextChanged();
		},

		// This method is used to get the display value according to masks, displayFactor and all the properties related to the value displayed when editor is blured.
		_getDisplayValue: function () { //igTextEditor
			return this._valueInput.val();
		},

		// This method is used to get the actual value according to masks, displayFactor and all the properties related to the value displayed when editor is edit mode.
		_valueFromText: function (text) { //igTextEditor
			return text;
		},
		_getSelectionRange: function () {
			var selection;
			if (window.getSelection) {
				selection = window.getSelection();
				if (selection.rangeCount) {
					return selection.getRangeAt(0);
				}
			} else if (document.selection) {
				return document.selection.createRange();
			}
		},
		_setCursorPosition: function (positionIndex) {
			this._setSelectionRange(this._editorInput[ 0 ], positionIndex, positionIndex);
		},
		_setSelectionRange: function (input, selectionStart, selectionEnd) {
			if (input.setSelectionRange) {
				input.setSelectionRange(selectionStart, selectionEnd);
			} else if (input.createTextRange) {
				var range = input.createTextRange();
				range.collapse(true);
				range.moveEnd("character", selectionEnd);
				range.moveStart("character", selectionStart);
				range.select();
			}
		},
		_positionCursor: function (startPostion, endPosition) {
			var currentValue = this._editorInput.val(), self = this;

			if (currentValue && currentValue.length > 0) {

				// Proceed acording to the options.
				switch (this.options.selectionOnFocus) {
					case "selectAll": {
						if ($.ig.util.isChrome || $.ig.util.isSafari) {
							this._timeouts.push(setTimeout(function () {
								self._setSelectionRange(self._editorInput[ 0 ], 0,
									currentValue.length);
							}, 100));
						} else {
							this._editorInput.select();
						}
					}
						break;
					case "atStart": {
						if ($.ig.util.isChrome || $.ig.util.isSafari) {
							this._timeouts.push(setTimeout(function () {
								self._setSelectionRange(self._editorInput[ 0 ], 0, 0);
							}, 100));
						} else {
							this._setSelectionRange(this._editorInput[ 0 ], 0, 0);
						}
					}
						break;
					case "atEnd": {
						if ($.ig.util.isChrome || $.ig.util.isSafari) {
							this._timeouts.push(setTimeout(function () {
								self._setSelectionRange(self._editorInput[ 0 ],
									currentValue.length,
									currentValue.length);
							}, 100));
						} else {
							this._setSelectionRange(this._editorInput[ 0 ],
								currentValue.length,
								currentValue.length);
						}
					}
						break;
					case "browserDefault": {
						if (startPostion) {
							if (endPosition) {
								if (endPosition > currentValue.length - 1) {
									endPosition = currentValue.length - 1;
								}
							} else {
								endPosition = startPostion;
							}
							if ($.ig.util.isChrome || $.ig.util.isSafari) {
								this._timeouts.push(setTimeout(function () {
									self._setSelectionRange(self._editorInput[ 0 ],
										startPostion, endPosition);
								}, 100));
							} else {
								this._setSelectionRange(this._editorInput[ 0 ],
									startPostion, endPosition);
							}
						} else {

							// If there is no startSelection we use default behavior selectAll
							if ($.ig.util.isChrome || $.ig.util.isSafari) {
								this._timeouts.push(setTimeout(function () {
									self._setSelectionRange(self._editorInput[ 0 ], 0,
									currentValue.length);
								}, 100));
							} else {
								this._editorInput.select();
							}
						}

					}
						break;
					default:
				}
			} else {
				this._editorInput.select();
			}
		},
		_spinUp: function () {
			if (this._dropDownList && this._dropDownList.is(":visible")) {
				this._hoverPreviousDropDownListItem();
			}
		},
		_spinDown: function () {
			if (this._dropDownList && this._dropDownList.is(":visible")) {
				this._hoverNextDropDownListItem();
			}
		},

		// We need this level of abstaction because of the numeric editors.
		_handleSpinUpEvent: function () {
			this._spinUp();
		},

		// We need this level of abstaction because of the numeric editors.
		_handleSpinDownEvent: function () {
			this._spinDown();
		},
		_handleSpinEvent: function (type, target) {
			var self = this;
			if (type === "spinUp") {
				this._handleSpinUpEvent();
				if (!target.attr("disabled")) {
					target._spinTimeOut = setTimeout(function () {
						target._spinInterval = setInterval(function () {
							self._handleSpinUpEvent();
						}, 75);
					}, 300);
				}
			} else if (type === "spinDown") {
				this._handleSpinDownEvent();
				if (!target.attr("disabled")) {
					target._spinTimeOut = setTimeout(function () {
						target._spinInterval = setInterval(function () {
							self._handleSpinDownEvent();
						}, 75);
					}, 300);
				}
			}
			this._timeouts.push(target._spinTimeOut);
		},
		_clearValue: function () {
			this._super();
			if (this._dropDownList &&
				this._dropDownList.children(".ui-igedit-listitemselected").length > 0) {
				this._dropDownList.children(".ui-igedit-listitemselected")
					.removeClass(this.css.listItemSelected);
			}
		},
		_clearEditorNotifier: function () {
			var notifier = this._editorContainer.data("igNotifier");
			if (notifier && notifier.options.state === "warning" && notifier.isVisible()) {
				notifier.hide();
			}
		},
		_getCursorPosition: function () {
			var selection = this._getSelection(this._editorInput[ 0 ]);
			if ((selection.end - selection.start) === this._editorInput.val().length &&
				this._editorInput.val().length > 0) {

				// Whole value is selected. We use flag -1 in case of all text is selected
				return -1;
			} else {

				// If multiple selection is done we use the beginig of the selection as metric.
				return selection.start;
			}
		},
		_getSelection: function (editor) {
			var startPostion = 0, endPosition = 0;
			if (editor.selectionStart !== undefined) {
				startPostion = editor.selectionStart;
				endPosition = editor.selectionEnd;
			} else if (document.selection) {

				// IE8 support, from the current text selection:
				var globalSelection = document.selection.createRange(), range, rangeClone;
				if (globalSelection !== null) {
					range = editor.createTextRange();
					rangeClone = range.duplicate();

					// Editor selection:
					range.moveToBookmark(globalSelection.getBookmark());
					endPosition = range.text.length;

					// Select text up to the selection:
					rangeClone.setEndPoint("EndToStart", range);
					startPostion = rangeClone.text.length;

					// Move end index with the start offset
					endPosition += startPostion;
				}
			}
			return { start: startPostion, end: endPosition };
		},
		_getLocaleOption: function (key) {
			var locale = this.options.locale;
			if (locale && locale[ key ]) {
				return locale[ key ];
			} else if ($.ig && $.ig.Editor && $.ig.Editor.locale) {
				return $.ig.Editor.locale[ key ];
			} else {
				return "";
			}
		},
		_listItems: function () {
			return this._dropDownList.children(".ui-igedit-listitem");
		},
		_getListItemByIndex: function (index) {
			return this._dropDownList.
				children(".ui-igedit-listitem:nth-child(" + (index + 1) + ")");
		},
		_getSelectedItemIndex: function () {
			var items = this._listItems(), i;
			for (i = 0; i < items.length; i++) {
				if ($(items[ i ]).hasClass(this.css.listItemSelected)) {
					return i;
				}
			}
			return -1;
		},
		_setSelectedItemByIndex: function (index) {
			var oldSelectedItem, newSelectedItem;

			if (this._getSelectedItemIndex() !== index) {
				oldSelectedItem = this.getSelectedListItem();
				oldSelectedItem.removeClass(this.css.listItemSelected);
				oldSelectedItem.removeAttr("data-active");
				newSelectedItem = this._getListItemByIndex(index);
				newSelectedItem.addClass(this.css.listItemSelected);
				if (this.dropDownVisible()) {
					newSelectedItem.attr("data-active", true);
				}
			}
		},

		// igTextEditor public methods
		displayValue: function () {
			/* Gets visible text in the editor.
				returnType="string" Visible text of the editor. */
			return this._getDisplayValue();
		},
		dropDownContainer: function () {
			/* Gets reference to jquery object which is used as container of drop-down.
				returnType="$" Returns reference to jquery object. */
			return this._dropDownList ? this._dropDownList : null;
		},
		showDropDown: function () {
			/* Shows the drop down list. */
			this._showDropDownList();
		},
		hideDropDown: function () {
			/* Hides the drop down list. */
			this._hideDropDownList();
		},
		dropDownButton: function () {
			/* Returns a reference to the clear button UI element of the editor.
				returnType="$" Returns reference to jquery object. */
			return this._dropDownButton;
		},
		dropDownVisible: function () {
			/* Returns the visibility state of the drop down listing the items.
				returnType="bool" The visibility state of the drop down. */
			return this._dropDownList.is(":visible");
		},
		clearButton: function () {
			/* Returns a reference to the clear button UI element of the editor.
				returnType="$" Returns reference to jquery object. */
			return this._clearButton;
		},
		findListItemIndex: function (text, matchType) {
			/* Finds index of list item by text that matches with the search parameters.
				paramType="string" optional="false" The text to search for in the drop down list.
				paramType="startsWith|endsWith|contains|exactMatch " optional="true" The rule that is applied for searching the text.
				returnType="number" Returns index of the found item. */

			var list = this.options.listItems,
				matchCase = "i",
				index = -1,
				regString, regExp, i;

			if (!list || list.length === 0) {
				return -1;
			}
			switch (matchType) {
				case "startsWith":
					regString = "^{pattern}";
					break;
				case "endsWith":
					regString = "{pattern}$";
					break;
				case "exact":
					regString = "^{pattern}$";
					matchCase = undefined;
					break;
				default:
					regString = "{pattern}";
					break;
			}
			regExp = new RegExp(regString.replace("{pattern}",
				$.ig.util.escapeRegExp(text)), matchCase);
			for (i = 0; i < list.length; i++) {
				if (regExp.test(list[ i ])) {
					index = i;
				}
			}
			return index;
		},
		selectedListIndex: function (index) {
			/* Gets/Sets selected list item index.
				paramType="number" optional="true" The index of the item that needs to be selected.
				returnType="number" Returns the selected index. */
			if (index !== undefined) {
				this._setSelectedItemByIndex(index);
			} else {
				return this._getSelectedItemIndex();
			}
		},
		getSelectedListItem: function () {
			/* Gets selected list item.
				returnType="$" Selected list item.*/
			return this._listItems().filter(".ui-igedit-listitemselected");
		},
		getSelectedText: function () {
			/* Gets selected text in editor.
				returnType="string" Selected text in editor.*/
			var text = this._editMode ? this._editorInput.val() : this.displayValue(),
				startIndex = this.getSelectionStart(),
				endIndex = this.getSelectionEnd();
			if (startIndex === undefined || endIndex === undefined ||
				startIndex === null || endIndex === null || startIndex === endIndex) {
				return "";
			}
			return text.substring(startIndex, endIndex);
		},
		getSelectionStart: function () {
			/* Gets start index of the selected text in editor.
				returnType="number" Start index of the selected text in editor.*/
			return this._getSelection(this._editorInput[ 0 ]).start;
		},
		getSelectionEnd: function () {
			/* Gets end index of the selected text in editor.
				returnType="number" End index of the selected text in editor.*/
			return this._getSelection(this._editorInput[ 0 ]).end;
		},
		insert: function (string) {
			/* Paste text at location of caret. Note: method raises the "valueChanged" event.
				paramType="string" optional="false" The string to be inserted. */
			this._insertHandler(string);
		},
		select: function (start, end) {
			/* Selects text in editor. If parameters are equal, then than method sets location of caret. That method has effect only when editor has focus.
				paramType="number" optional="false" Start of the selection.
				paramType="number" optional="false" End of the selection. */
			this._setSelectionRange(this._editorInput[ 0 ], start, end);
		},
		spinUp: function () {
			/* Increments hovered index in the list. */
			this._spinUp();
		},
		spinDown: function () {
			/* Decrements hovered index in the list. */
			this._spinDown();
		},
		spinUpButton: function () {
			/* Returns a reference to the spin up UI element of the editor.
				returnType="$" The jQuery object representing the spin up UI element of the editor. */
			return this._spinUpButton;
		},
		spinDownButton: function () {
			/* Returns a reference to the spin down UI element of the editor.
				returnType="$" The jQuery object representing the spin down UI element of the editor. */
			return this._spinDownButton;
		}
	});

	$.widget("ui.igNumericEditor", $.ui.igTextEditor, {
		options: {
			/* type="object" Gets/Sets custom regional settings for editor. If it is string, then $.ig.regional[stringValue] is assumed. */
			regional: null,
			/* type="string" Gets the character, which is used as negative sign.
				Note: This option has priority over possible regional settings.
				Note: Even if the default value is null - if internationalization file is provided and it contains default values for those properties the values are imlicitly set. */
			negativeSign: null,
			/* type="string" Gets the string, which is used as negative pattern. The "n" flag represents the value of number. The "-" and "()" flags are static part of pattern.
				Note: This option has priority over possible regional settings.
				Note: Even if the default value is null - if internationalization file is provided and it contains default values for those properties the values are imlicitly set. */
			negativePattern: null,
			/* type="string" Gets the character, which is used as decimal separator.
				Note: this option has priority over possible regional settings.
				Note: Even if the default value is null - if internationalization file is provided and it contains default values for those properties the values are imlicitly set. */
			decimalSeparator: null,
			/* type="string" Gets/Sets the character, which is used as separator for groups (like thousands).
				That option has effect only in display mode(no focus).
				Note: this option has priority over possible regional settings.
				Note: Even if the default value is null - if internationalization file is provided and it contains default values for those properties the values are imlicitly set. */
			groupSeparator: null,
			/* type="array" (array of number objects) Gets the number of digits in integer part of number, which are divided into groups.
				The "groupSeparator" is inserted between groups.
				If the sum of all values in array is smaller than the length of integer part, then the last item in array is used for all following groups.
				Count of groups starts from the decimal point (from right to left).
				That option has effect only in display mode(no focus).
				Note: this option has priority over possible regional settings.
				Note: Even if the default value is null - if internationalization file is provided and it contains default values for those properties the values are imlicitly set. */
			groups: null,
			/* type="number" Gets the maximum number of decimal places which are used in display mode(no focus).
				Note: this option has priority over possible regional settings.
				Note: In case of min decimals value higher than max decimals - max decimals are equaled to min decimals property.
				Note: Even if the default value is null - if internationalization file is provided and it contains default values for those properties the values are imlicitly set. */
			maxDecimals: null,
			/* type="number" Gets the minimum number of decimal places which are used in display (no focus) state.
				If number of digits in fractional part of number is less than the value of this option, then the "0" characters are used to fill missing digits.
				Note: This option has priority over possible regional settings.
				Note: In case of min decimals value higher than max decimals - max decimals are equaled to min decimals property.
				Note: Even if the default value is null - if internationalization file is provided and it contains default values for those properties the values are imlicitly set. */
			minDecimals: null,
			/* type="left|right|center" Gets/Sets horizontal alignment of text in editor. If that option is not set, then 'right' is used for 'numeric', 'currency' and 'percent' editors and the 'left' is used for all other types of editor.
				left type="string"
				right type="string"
				center type="string"
			*/
			textAlign: "right",
			/* type="double|float|long|ulong|int|uint|short|ushort|sbyte|byte" Gets type of value returned by the get of value() method. That also affects functionality of the set value(val) method and the copy/paste operations of browser.
				double type="string" the Number object is used with limits of double and if value is not set, then the null or Number.NaN is used depending on the option 'nullable'. Note: that is used as default.
				float type="string" the Number object is used with limits of float and if value is not set, then the null or Number.NaN is used depending on the option 'nullable'.
				long type="string" the Number object is used with limits of signed long and if value is not set, then the null or 0 is used depending on the option 'nullable'.
				ulong type="string" the Number object is used with limits of unsigned long and if value is not set, then the null or 0 is used depending on the option 'nullable'.
				int type="string" the Number object is used with limits of signed int and if value is not set, then the null or 0 is used depending on the option 'nullable'.
				uint type="string" the Number object is used with limits of unsigned int and if value is not set, then the null or 0 is used depending on the option 'nullable'.
				short type="string" the Number object is used with limits of signed short and if value is not set, then the null or 0 is used depending on the option 'nullable'.
				ushort type="string" the Number object is used with limits of unsigned short and if value is not set, then the null or 0 is used depending on the option 'nullable'.
				sbyte type="string" the Number object is used with limits of signed byte and if value is not set, then the null or 0 is used depending on the option 'nullable'.
				byte type="string" the Number object is used with limits of unsigned byte and if value is not set, then the null or 0 is used depending on the option 'nullable'.
			*/
			dataMode: "double",
			/* type="number" Gets/Sets the minimum value which can be entered in editor by end user. */
			minValue: null,
			/* type="number" Gets/Sets the maximum value which can be entered in editor by end user. */
			maxValue: null,
			/* type="bool" Gets/Sets ability to prevent null value.
				If that option is disabled, and editor has no value, then value is set to 0 (or minValue/maxValue).
			*/
			allowNullValue: false,
			/* type="number" Gets/Sets delta-value which is used to increment or decrement value in editor on spin events. If value is set to negative value an exception is thrown. Non integer value is supported only for dataMode double and float.*/
			spinDelta: 1,
			/* type="null|E|e|E+|e+"
				Gets/Sets support for E-power format in edit mode.
				If that option is set, then numeric value appears as a string with possible E-power flag. In edit mode the "E" or "e" character can be entered as well.
				Notes: The "+" character is not supported in edit mode.
				null type="object" scientific format is disabled.
				E type="string" scientific format is enabled and the "E" character is used.
				e type="string" scientific format is enabled and the "e" character is used.
				E+ type="string" scientific format is enabled and the "E" character is used. The "E+" is used for positive values in display mode.
				e+ type="string" scientific format is enabled and the "e" character is used. The "e+" is used for positive values in display mode.
			*/
			scientificFormat: null,
			/* type="bool" Sets gets ability to automatically set value in editor to opposite limit, when spin action reached minimum or maximum limit. */
			spinWrapAround: false,
			/* @Skipped@ Removed from numeric editor options*/
			maxLength: null,
			/* @Skipped@ Removed from numeric editor options*/
			excludeKeys: null,
			/* @Skipped@ Removed from numeric editor options*/
			includeKeys: null,
			/* @Skipped@ Removed from numeric editor options*/
			toLower: null,
			/* @Skipped@ Removed from numeric editor options*/
			toUpper: null,
			/* type="text|password|multiline" @Skipped@ Sets gets text mode of editor such as: single-line text editor, password editor or multiline editor. That option has effect only on initialization. If based element (selector) is TEXTAREA, then it is used as input-field.
				text type="string" Single line text editor based on INPUT element is created.
				password type="string" Editor based on INPUT element with type password is created.
				multiline type="string" multiline editor based on TEXTAREA element is created.
			*/
			textMode: "text"
		},
		events: {
			/* igWidget events go here */
		},
		css: {

			/* Class applied to the editing element of numeric editor when value is negative. The class is applied only when the editor is in display mode (no focus). Default value is 'ui-igedit-negative' */
			negative: "ui-igedit-negative"
		},
		_create: function () { //Numeric Editor

			// We need this option internaly for parsing the value, set this option via method so we can overwrite it.
			$.ui.igTextEditor.prototype._create.call(this);

			//TODO - make this as an option for using native input
			if (!$.ig.util.isIE8) {
				this._editorInput.attr("type", "tel");
			}
		},
		_initialize: function () {
			this._super();
			this._applyRegionalSettings();
			this._applyDataModeSettings();
			this._setNumericType();
			var numericChars = "0123456789", dataMode = this.options.dataMode;

			// Allow decimal separator as a char.
			// When the dataMode is set to int, decimal separator should not be allowed
			if (dataMode === "double" || dataMode === "float") {
				numericChars += this.options.decimalSeparator;

				// K.D. September 25th, 2015 The decimal separator key on the keyboard is always the 110 and 190 keycodes, which is '.'
				if (this.options.decimalSeparator !== ".") {
					numericChars += ".";
				}
			}
			if (this._getScientificFormat()) {
				numericChars += this._getScientificFormat();
			}

			// Allow negativeSign as a char only where negative values are supported
			if (dataMode === "double" || dataMode === "float" || dataMode === "long" ||
				dataMode === "int" || dataMode === "short" || dataMode === "sbyte") {
				numericChars += this.options.negativeSign;
			}

			// Setting Exclude keys is not allowed into numeric/percent/currency editor
			if (this.options.excludeKeys) {
				this.options.excludeKeys = null;
			}

			// This property is only internally used and it's not configurable in this widget.
			this.options.includeKeys = numericChars;
		},
		_setNumericType: function () {
			this._numericType = "numeric";
		},
		_getScientificFormat: function () {
			var result;
			if (this.options.scientificFormat) {
				switch (this.options.scientificFormat) {
					case "E":
					case "E+": {
						result = "E";
					}
						break;
					case "e":
					case "e+": {
						result = "e";
					}
						break;
					default: {
						result = "e";
						throw ($.ig.Editor.locale.scientificFormatErrMsg);
					}
				}
			} else {
				result = null;
			}
			return result;
		},
		_applyRegionalSettings: function () { //Numeric
			this.options.negativeSign = this._getRegionalOption("negativeSign");
			this.options.negativePattern = this.options.negativePattern ||
				this._getRegionalOption("numericNegativePattern");
			this.options.decimalSeparator = this.options.decimalSeparator ||
				this._getRegionalOption("numericDecimalSeparator");

			// TODO: make a validate function to ignore numbers as separators, undefined vs allowed chars here?
			this.options.groupSeparator = this.options.groupSeparator !== null ?
				this.options.groupSeparator :
				this._getRegionalOption("numericGroupSeparator");
			this.options.groups = this.options.groups || this._getRegionalOption("numericGroups");
			this.options.maxDecimals = this.options.maxDecimals === null ?
				this._getRegionalOption("numericMaxDecimals") :
				this.options.maxDecimals;
			this.options.minDecimals = this.options.minDecimals === null ?
				this._getRegionalOption("numericMinDecimals") :
				this.options.minDecimals;
		},
		_applyOptions: function () { // NumericEditor
			var delta, fractional;
			this._super();
			if (this.options.spinDelta !== 1) {
				delta = this.options.spinDelta;
				if (typeof delta !== "number") {
					this.options.spinDelta = 1;
					throw new Error($.ig.Editor.locale.spinDeltaIsOfTypeNumber);
				}
				if (delta < 0) {
					this.options.spinDelta = 1;
					throw new Error($.ig.Editor.locale.spinDeltaCouldntBeNegative);
				}
				if (this.options.dataMode === "float" || this.options.dataMode === "double") {

					// Validate if the fractional part is longer than maxDecimals
					if (delta % 1 !== 0) {
						fractional = delta.toString().substring(delta.toString().indexOf(".") + 1);
						if (fractional.toString().length > this.options.maxDecimals) {
							throw new Error($.ig.util.stringFormat($.ig.Editor.locale.
								spinDeltaContainsExceedsMaxDecimals,
								this.options.maxDecimals));
						}
					}
				} else {
					// This means the value is integer, without floating point
					if (delta % 1 !== 0) {
						throw new Error($.ig.Editor.locale.spinDeltaIncorrectFloatingPoint);
					}
				}
			}
			if (this.options.scientificFormat) {
				this.options.spinDelta = Number(this.options.spinDelta.toExponential());
			}
			if (this.options.maxLength !== null) {
				this.options.maxLength = null;
			}
			if (this.options.value < 0) {
				this._editorInput.addClass(this.css.negative);
			}
		},
		_setOption: function (option, value) { // igNumericEditor
			/* igNumericEditor custom setOption goes here */
			var prevValue = this.options[ option ];
			if (prevValue === value) {
				return;
			}

			// The following line applies the option value to the igWidget meaning you don't
			// have to perform this.options[ option ] = value;
			$.Widget.prototype._setOption.apply(this, arguments);
			switch (option) {
				case "spinDelta": {
					if (typeof value !== "number") {
						this.options[ option ] = prevValue;
						throw new Error($.ig.Editor.locale.spinDeltaIsOfTypeNumber);
					} else if (value < 0) {
						this.options[ option ] = prevValue;
						throw new Error($.ig.Editor.locale.spinDeltaCouldntBeNegative);
					} else if ((this.options.dataMode !== "float" &&
						this.options.dataMode !== "double") && value % 1 !== 0) {
						this.options[ option ] = prevValue;
						throw new Error($.ig.Editor.locale.spinDeltaIncorrectFloatingPoint);
					} else if (this.options.scientificFormat) {
						this.options[ option ] = Number(value.toExponential());
			}
					break;
				}
				case "minDecimals",
					 "maxDecimals":
					value = parseFloat(value);
					if (isNaN(value)) {
						this.options[ option ] = prevValue;
						throw new Error($.ig.Editor.locale.notEditableOptionByInit);
					}
					break;
				case "excludeKeys":
				case "includeKeys":
					this.options[ option ] = prevValue;
					throw new Error($.ig.Editor.locale.numericEditorNoSuchOption);
				default: {

					// In case no propery matches, we call the super. Into the base widget default statement breaks
						this.options[ option ] = prevValue;
						this._super(option, value);
					}
					break;
			}
		},
		_processValueChanging: function (value) { //NumericEditor
			if (typeof value === "string" || value instanceof String) {
				value = value.trim();
				value = this._parseNumericValueByMode(value,
					this._numericType,
					this.options.dataMode);
				if (this._numericType === "percent" && this.options.displayFactor) {

					// TODO - any logic related to "percent" should not be in numeric editor.
					value = this._divideWithPrecision(value, this.options.displayFactor);
				}
			}
			this._super(value);
		},
		_processInternalValueChanging: function (value) { //NumericEditor
			value = this._parseNumericValueByMode(value,
					this._numericType,
					this.options.dataMode);
			if (value !== "" && !isNaN(value)) {
				if (this.options.maxValue && value > this.options.maxValue) {
					value = this.options.maxValue;

					//Raise warning
					this._sendNotification("warning",
						$.ig.util.stringFormat($.ig.Editor.locale.maxValExceedSetErrMsg,
							this.options.maxValue));
				} else if (this.options.minValue && value < this.options.minValue) {
					value = this.options.minValue;

						// Raise Warning level 2
						this._sendNotification("warning",
							$.ig.util.stringFormat($.ig.Editor.locale.minValExceedSetErrMsg,
								this.options.minValue));
				}
			}
			if (!this._validateValue(value)) {
				if (value !== "" && !isNaN(value)) {

					//Verify
					if (this.options.revertIfNotValid) { // TODO VERIFY!!! revertIfNotValid > minValue/maxValue
						value = this._valueInput.val();
					} else {
						if (value <= this.options.minValue) {
							value = this.options.minValue;
						} else {
							value = this.options.maxValue;
						}
					}
				} else {
					if (this.options.allowNullValue) { // TODO VERIFY!!! allowNullValue > revertIfNotValid
						value = this.options.nullValue;
					} else {
						if (this.options.revertIfNotValid) {
							value = this._valueInput.val();
						} else {
							value = 0; // TODO VERIFY!!! If value is "" and allowNullValue and revertIfNotValid is false, then becasue it is numeric editor we set it to 0. right?
							if (this.options.minValue > 0) {
								value = this.options.minValue;
							} else if (this.options.maxValue < 0) {
								value = this.options.maxValue;
							} else {
								value = 0;
							}
						}
					}
				}
			}
			if (value !== this.value()) {
				this._updateValue(value);
			}
			this._setSpinButtonsState(value);
		},
		_triggerKeyDown: function (event) { //NumericEditor
			var e = event, noCancel, args, currentInputVal;
			args = {
				owner: this,
				element: event.target,
				key: event.keyCode,
				editorInput: this._editorInput
			};
			noCancel = this._trigger(this.events.keydown, event, args);
			if (noCancel) {

				// Clear notifier
				this._clearEditorNotifier();
				if (e.keyCode === 13) {
					currentInputVal = this._editorInput.val();

					if (this._dropDownList && this._dropDownList.is(":visible")) {
						this._super(event);
					} else {

						// We repeat the logic in case we don't have dropdown list. On enter the value is updated with the current value into editorInput
						this._processValueChanging(currentInputVal);
					}

				} else if (e.keyCode === 38) {

					// Arrow Up
					// Close if opened
					if (e.altKey && this._dropDownList && this._dropDownList.is(":visible")) {
						this._toggleDropDown();
					} else if (!this.options.readOnly) {
						if (this._dropDownList && this._dropDownList.is(":visible")) {

							// Hover previous element
							this._hoverPreviousDropDownListItem();
						} else {

							// Spin numeric value
							this._handleSpinUpEvent();
						}
					}
				} else if (e.keyCode === 40) {//Arrow Down
					if (e.altKey && this._dropDownList && !this._dropDownList.is(":visible")) {

						// OpenDropDown
						this._toggleDropDown();
					} else if (!this.options.readOnly) {
						if (this._dropDownList && this._dropDownList.is(":visible")) {

							// Hover next element
							this._hoverNextDropDownListItem();
						} else {

							// Spin numeric value
							this._handleSpinDownEvent();
						}
					}
				} else if (e.keyCode === 27 && this._dropDownList &&
					this._dropDownList.is(":visible")) { //Escape and dropdown is opened

					// Close dropdown
					this._toggleDropDown();
				} else if (this.options.maxLength) {
					currentInputVal = this._editorInput.val();
					if (currentInputVal.length === this.options.maxLength &&
						e.keyCode > 46 && !e.altKey && !e.ctrlKey && !e.shiftKey) {
						e.preventDefault();
						e.stopPropagation();

						//// Process notification
						// TODO
					}
				}
			}
			return noCancel;
		},
		_applyDataModeSettings: function () {
			// We need to adjust max decimals, based on the dataMode limits
			var doubleMaxDecimals = 15;
			switch (this.options.dataMode) {
				case "double": {
					this._setMinMaxValues(-(Number.MAX_VALUE), Number.MAX_VALUE);
					this._setMinMaxDecimals(doubleMaxDecimals);
				}
					break;
				case "float": {
					var floatMaxDecimals = 7, floatMinValue = -3.40282347e38,
						floatMaxValue = 3.40282347e38;
					this._setMinMaxValues(floatMinValue, floatMaxValue);
					this._setMinMaxDecimals(floatMaxDecimals);
				}
					break;
				case "long": {
					var longMinValue = -9223372036854775807, longMaxValue = 9223372036854775807;
					this._setMinMaxValues(longMinValue, longMaxValue);
				}
					break;
				case "ulong": {
					var ulongMinValue = 0, ulongMaxValue = 18446744073709551615;
					this._setMinMaxValues(ulongMinValue, ulongMaxValue);
				}
					break;
				case "int": {
					var intMinValue = -2147483647, intMaxValue = 2147483647;
					this._setMinMaxValues(intMinValue, intMaxValue);
				}
					break;
				case "uint": {
					var uintMinValue = 0, uintMaxValue = 4294967295;
					this._setMinMaxValues(uintMinValue, uintMaxValue);
				}
					break;
				case "short": {
					var shortMinValue = -32768, shortMaxValue = 32767;
					this._setMinMaxValues(shortMinValue, shortMaxValue);
				}
					break;
				case "ushort": {
					var ushortMinValue = 0, ushortMaxValue = 65535;
					this._setMinMaxValues(ushortMinValue, ushortMaxValue);
				}
					break;
				case "sbyte": {
					var sbyteMinValue = -127, sbyteMaxValue = 127;
					this._setMinMaxValues(sbyteMinValue, sbyteMaxValue);
				}
					break;
				case "byte": {
					var byteMinValue = 0, byteMaxValue = 256;
					this._setMinMaxValues(byteMinValue, byteMaxValue);
				}
					break;

				// If dataMode doesn't match the editor fails back to dataMode double
				default: {
					this.options.dataMode = "double";
					this._setMinMaxValues(Number.MIN_VALUE, Number.MAX_VALUE);
					this._setMinMaxDecimals(doubleMaxDecimals);
				}
			}
		},
		_setMinMaxDecimals: function (typeMaxDecimals) {
			if (this.options.maxDecimals === null || this.options.maxDecimals > typeMaxDecimals) {
				this.options.maxDecimals = typeMaxDecimals;
			}

			// this.options.numericMinDecimals = this._getRegionalOption("numericMinDecimals");
			// In case of conflict between min and max decimals - both values are equaled to the max decimals
			if (this.options.minDecimals && this.options.minDecimals > this.options.maxDecimals) {
				this.options.maxDecimals = this.options.minDecimals;
			}
		},
		_setMinMaxValues: function (typeMinValue, typeMaxValue) {
			//Set bounderies based on the type
			if (this.options.minValue === null || this.options.minValue < typeMinValue) {
				this.options.minValue = typeMinValue;
			}
			if (this.options.maxValue === null || this.options.maxValue > typeMaxValue) {
				this.options.maxValue = typeMaxValue;
			}
		},
		_parseNumericValueByMode: function (value, numericEditorType, dataMode) { //NumericEditor
			var val, stringValue, decimalSeparator, groupSeparator, minDecimals, maxDecimals;
			decimalSeparator = this.options.decimalSeparator;
			groupSeparator = this.options.groupSeparator;
			minDecimals = this.options.minDecimals;
			maxDecimals = this.options.maxDecimals;

			if (value === null || value === "") { // TODO VERIFY _validateValue and _updateValue both have cases calling parse with null!
				return value;
			}

			if ($.type(value) !== "number") {

				// In case of IME input digits we need to convert
				// value = $.ig.util.replaceJpToEnNumbers(value);
				value = $.ig.util.IMEtoNumberString(value, $.ig.util.IMEtoENNumbersMapping);

				// D.P. 27th Oct 2015 Bug 208296: Don't replace group separator on actual numbers as it can be '.'
				value = value.toString().replace(new RegExp($.ig.util.escapeRegExp(groupSeparator), "g"), ""); // TODO VERIFY Remove group separator cause parseInt("1,000") returns 1?
				if (this.options.negativeSign !== "-") {
					value = value.replace(this.options.negativeSign, "-");
				}
				if (numericEditorType === "percent") {
					value = value.replace(this.options.percentSymbol, "").trim();
				} else if (numericEditorType === "currency") {
					value = value.replace(this.options.currencySymbol, "").trim();
				}
			}
			if (dataMode === "double" || dataMode === "float") {
				stringValue = value.toString().toLowerCase();
				if (stringValue.indexOf("e") !== -1) {

					// In that case leave the value as it is
					// TODO work on validation method
					val = value;
				} else {

					// In that case we need to validate the value against the constraints.
					if (stringValue.indexOf(decimalSeparator) !== -1 || stringValue.indexOf(".") !== -1) {
						var integerDigits, fractionalDigits;
						if (stringValue.indexOf(".") !== -1) {
							decimalSeparator = ".";
						}
						fractionalDigits = stringValue.substring(stringValue.indexOf(decimalSeparator) + 1);

						//In case of pasted value with multiple decimal points. We can't use parseFloat because we want to keep the number of the fractional digits, but parseFloat cuts to 6th
						if (fractionalDigits.indexOf(decimalSeparator) > 0) {
							fractionalDigits = fractionalDigits.substring(0, fractionalDigits.indexOf(decimalSeparator));
						}
						if (fractionalDigits.length > maxDecimals) {
							fractionalDigits = fractionalDigits.substring(0, maxDecimals);
						}
						integerDigits = stringValue.substring(0, stringValue.indexOf(decimalSeparator));

						//We want to evaluate the number without losing fractional digits, as parseFloat cuts six digits after the decimal point.
						val = (integerDigits + "." + fractionalDigits) / 1;
					} else {

						//In that case we don't have fractional digits, so we can use ParseInt for the integer digits.
						val = parseFloat(parseInt(value).toFixed(minDecimals));
					}
				}
			} else {
				if (value.toString().toLowerCase().indexOf("e") !== -1) {
					value = this._toFixed(value.toString().toLocaleLowerCase());
				}
				if (this._numericType === "percent" &&
					this.options.displayFactor === 100 &&
					this.options.dataMode === "int" &&
					parseInt(value) !== parseInt(this._editorInput.val())) {

					// TODO - This is edge case
					val = value;
				} else {
					val = parseInt(value);
				}
			}
			if (this.options.scientificFormat &&
				val.toString().toLowerCase().indexOf("e") === -1) {
				val = val.toExponential();
			}
			return val;
		},
		_toFixed: function (x) {
			var e;
			if (Math.abs(x) < 1.0) {
				e = parseInt(x.toString().split("e-")[ 1 ]);
				if (e) {
					x *= Math.pow(10, e - 1);
					x = "0." + (new Array(e)).join("0") + x.toString().substring(2);
				}
			} else {
				e = parseInt(x.toString().split("+")[ 1 ]);
				if (e > 20) {
					e -= 20;
					x /= Math.pow(10, e);
					x += (new Array(e + 1)).join("0");
				}
			}
			return x;
		},
		_multiplyWithPrecision: function (value1, value2, precision) {

			// Values MUST be numeric, precision is optoinal
			// TODO: verify, test with 0.57 * 100[00] or (0.1, 0.2), might be overdone
			var fractionalDigits, fractionalDigits2, result;
			if (!precision) {
				fractionalDigits = value1.toString().indexOf(".") > 0 ?
					value1.toString().substring(value1.toString().indexOf(".") + 1) : "";
				fractionalDigits2 = value2.toString().indexOf(".") > 0 ?
					value2.toString().substring(value2.toString().indexOf(".") + 1) : "";
				if (fractionalDigits2.length) {

					// if both are floats, must use combined?
					fractionalDigits += fractionalDigits2;
				}
				precision = Math.pow(10, fractionalDigits.length);
			}

			value1 *= precision;
			value2 *= precision;
			result = (value1 * value2) / (precision * precision);
			return result.toFixed(fractionalDigits.length) * 1;
		},
		_divideWithPrecision: function (value1, value2) {

			// TODO: verify
			var fractionalDigits, fractionalDigits2, precision;
			fractionalDigits = value1.toString().indexOf(".") > 0 ?
				value1.toString().substring(value1.toString().indexOf(".") + 1) : "";
			fractionalDigits2 = value2.toString().indexOf(".") > 0 ?
				value2.toString().substring(value2.toString().indexOf(".") + 1) : "";
			if (fractionalDigits2.length > fractionalDigits.length) {
				fractionalDigits = fractionalDigits2;
			}
			precision = Math.pow(10, fractionalDigits.length);

			// Ensure both are integers
			value1 = this._multiplyWithPrecision(value1, precision);
			value2 = this._multiplyWithPrecision(value2, precision);

			return (value1 / value2);
		},

		//This method validates and updates the value input the hidden input
		_updateValue: function (value) { //Numeric Editor
			// WE should detect dataMode, so we can use the options.
			var val, dataMode = this.options.dataMode;
			if (value === "" && this.options.allowNullValue) {
				val = this.options.nullValue;
				this._valueInput.val("");
			} else if (value === this.options.nullValue && value === null) {
				val = value;
				this._valueInput.val("");
			} else {
				val = this._parseNumericValueByMode(value, this._numericType, dataMode);
				this._valueInput.val(val);
			}
			this.options.value = val;
		},
		_validateKey: function (event) { //NumericEditor
			if (this._super(event)) {
				var dataMode = this.options.dataMode,
					negativeSign = this.options.negativeSign, ch, val,
					cursorPos = this._getCursorPosition(),
					isDecimal = event.which ? event.which === 46 : false;
				ch = String.fromCharCode(event.charCode || event.which);
				if (ch === negativeSign && cursorPos > 0) {
					return false;
				}

				//We need this extra validation in case the user tries to enter decimal separator multiple times
				if (dataMode === "double" || dataMode === "float") {
					var decimalSeparator = this.options.decimalSeparator;

					// val = $(event.target).val();
					val = this._editorInput.val();
					if (decimalSeparator !== "." && isDecimal &&
						(val.indexOf(".") !== -1 || val.indexOf(decimalSeparator) !== -1) &&
						cursorPos !== -1) {
						return false;
					}
					if (((ch === decimalSeparator || isDecimal) &&
							(val.indexOf(decimalSeparator) !== -1 || val.indexOf(".") !== -1) &&
							cursorPos !== -1) ||
						(ch === negativeSign &&
							val.indexOf(negativeSign) !== -1 &&
							cursorPos !== -1)) {

						// We already have decimal separator so prevent default
						return false;
					} else {
						return true;
					}
				} else if (dataMode === "long" || dataMode === "int" ||
					dataMode === "short" || dataMode === "sbyte") {
					val = $(event.target).val();
					if (ch === negativeSign && val.indexOf(negativeSign) > 0 && cursorPos !== -1) {

						// We already have decimal separator so prevent default
						return false;
					} else {
						return true;
					}
				} else {

					// If the dataMode differs from double, or float and the super method returns true the cher is valid
					return true;
				}
			} else {

				// If the super method fails, the char is not allowed
				return false;
			}

			// return true;
		},
		_disableSpinButton: function (target) {
			if (target && !target.attr("disabled") && !this.options.spinWrapAround) {
				target.addClass(this.css.disabled);
				target.attr("disabled", true);
				target.removeClass(this.css.buttonHover);
				if (target._pressed) {
					delete target._pressed;
					target.removeClass(this.css.buttonPressed);
				}
				if (target._spinTimeOut) {
					clearTimeout(target._spinTimeOut);
					delete this._spinUpButton._spinTimeOut;
				}
				if (target._spinInterval) {
					clearInterval(target._spinInterval);
					delete target._spinInterval;
				}
				this._detachButtonsEvents(target);
			}
		},
		_enableSpinButton: function (target, type) {
			if (target && target.attr("disabled")) {
				target.removeClass(this.css.disabled);
				target.attr("disabled", false);
				this._attachButtonsEvents(type, target);
			}
		},
		_setSpinButtonsState: function (val) {
			if (typeof val === "string" || val instanceof String) {
				val = val.trim();
			}
			if (val === null) {
				this._enableSpinButton(this._spinDownButton, "spinDown");
				this._enableSpinButton(this._spinUpButton, "spinUp");
				return;
			}
			if (val !== "" && !this.options.spinWrapAround) {
				if (val >= this.options.maxValue) {
					this._disableSpinButton(this._spinUpButton);
					this._enableSpinButton(this._spinDownButton, "spinDown");
				} else if (val <= this.options.minValue) {
					this._disableSpinButton(this._spinDownButton);
					this._enableSpinButton(this._spinUpButton, "spinUp");
				} else {
					this._enableSpinButton(this._spinDownButton, "spinDown");
					this._enableSpinButton(this._spinUpButton, "spinUp");
				}
			}
		},
		_validateValue: function (val) { //Numeric Editor
			var result;
			if (this._super(val) && !isNaN(val = this._parseNumericValueByMode(val,
					this._numericType, this.options.dataMode))) { // TODO VERIFY it was !isNaN(parseFloat(val), but this is not OK. The case where you press enter then value is updated, and then on TAB the value isNaN "$123.90"
				{
					result = true;
				}
			} else {
				result = false;
			}
			return result;
		},
		_insert: function (newValue, previousValue) { //NumericEditor
			if (!isNaN(newValue = this._parseNumericValueByMode(newValue,
					this._numericType, this.options.dataMode))) {

				if (this.options.maxValue && newValue > this.options.maxValue) {
					newValue = this.options.maxValue;

					// Raise Warning level 2
					this._sendNotification("warning",
						$.ig.util.stringFormat($.ig.Editor.locale.maxValExceedSetErrMsg,
							this.options.maxValue));
				} else if (this.options.minValue && newValue < this.options.minValue) {
					newValue = this.options.minValue;

					// Raise Warning level 2
					this._sendNotification("warning",
						$.ig.util.stringFormat($.ig.Editor.locale.minValExceedSetErrMsg,
							this.options.minValue));
				}

				if (!this._validateValue(newValue) && this.options.revertIfNotValid) {
					newValue = previousValue;
				}
			} else if (this.options.revertIfNotValid) {
				newValue = previousValue;
			} else {
				newValue = "";
			}
			if (this._editMode) {
				this._editorInput.val(newValue);
			} else {
				this._processInternalValueChanging(newValue);
				this._exitEditMode();
			}
			this._setSpinButtonsState(newValue);
			this._processTextChanged();
		},
		_clearValue: function () { //Numeric Editor
			if (this.options.allowNullValue) {
				this._updateValue(this.options.nullValue);
				if (this.options.nullValue === null) {
					this._editorInput.val("");
				} else {
					this._editorInput.val(this.options.nullValue);
				}
			} else {

				// If the min value is different from zero, we clear the value with the minimum value.
				if (this.options.minValue && this.options.minValue > 0) {
					this._updateValue(this.options.minValue);
					this._editorInput.val(this.options.minValue);
				} else if (this.options.maxValue && this.options.maxValue < 0) {
					this._updateValue(this.options.maxValue);
					this._editorInput.val(this.options.maxValue);
				} else {
					if (this.value()) {
						this._updateValue(0);
						this._editorInput.val(0);
					}
				}
			}
			if (this.dropDownContainer() &&
				this.dropDownContainer().children(".ui-igedit-listitemselected").length > 0) {
				this.dropDownContainer().children(".ui-igedit-listitemselected")
					.removeClass(this.css.listItemSelected);
			}
		},
		_getRegionalOption: function (key) {
			var regional = this.options.regional;
			if (this.options[ key ]) {
				return this.options[ key ];
			}
			if (typeof regional === "string") {
				regional = $.ig.regional[ regional ];
			}
			if (regional && regional[ key ]) {
				return regional[ key ];
			} else {

				// return defaults
				return $.ig.regional.defaults[ key ];
			}
		},
		_convertScientificToNumeric: function (num) {
			var parts = num.toString().split("e+"), first, zeroes, i;
			first = parts[ 0 ].replace(".", "");
			zeroes = parseInt(parts[ 1 ], 10) - (first.length - 1);
			for (i = 0; i < zeroes; i++) {
				first += "0";
			}
			return first;
		},
		_getDisplayValue: function () { //Numeric Editor
			var value = this._valueInput.val(),
				decimalSeparator = this.options.decimalSeparator, decimalPoint = ".",
				minDecimals = this.options.minDecimals, dataMode = this.options.dataMode,
				stringValue, displayValue, integerDigits, fractionalDigits, scientificPrecision,
				scientificValue, negativeSign,
				positivePattern, negativePattern, groups, groupSeparator, symbol = "";
			if (value === this.options.nullValue || value === "" || isNaN(value)) {
				if (isNaN(value)) {
					this._valueInput.val("");
					return "";
				} else {
					return value;
				}
			}
			if (this._numericType !== "numeric") {
				positivePattern = this.options.positivePattern;
				symbol = this.options[ this._numericType + "Symbol" ];
			}
			negativePattern = this.options.negativePattern;
			groups = this.options.groups;
			groupSeparator = this.options.groupSeparator;
			if (this._numericType === "percent" && this.options.displayFactor) {
				value = this._multiplyWithPrecision(value, this.options.displayFactor);
				value = this._parseNumericValueByMode(value, this._numericType, this.options.dataMode);
			}

			// Min decimals check.
			if (dataMode === "double" || dataMode === "float") {
				stringValue = value.toString().toLowerCase();
				if (this.options.scientificFormat) {
					if (stringValue.indexOf("e") !== -1) {
						displayValue = stringValue.replace("e", this._getScientificFormat());
					} else {
						scientificValue = (stringValue / 1).toExponential();
						displayValue = scientificValue.toString().replace("e", this._getScientificFormat());
					}
				} else {
					if (stringValue.indexOf("e") !== -1) {

						// In that case leave the value as it is
						scientificPrecision = stringValue
							.substring(stringValue.toLowerCase().indexOf("e") + 1);
						stringValue = stringValue / 1;
						if (scientificPrecision > 0) {
							stringValue = this._convertScientificToNumeric(stringValue);
						} else {
							stringValue = stringValue.toFixed(Math.abs(scientificPrecision));
						}

					}

					// There are edge cases where the value after convertion still contains scientific format. In that case we just pass that value.
					if (stringValue.indexOf("e") !== -1) {
						displayValue = stringValue;
					} else {

						// In that case we need to validate the value against the constraints.
						// Here decimalPoint is used instead of the decimalSeparator, as we work with the value from the hiddedn input, which is Number, so the decimalSeparator is dot.
						if (stringValue.indexOf(decimalPoint) !== -1) {
							fractionalDigits = stringValue
								.substring(stringValue.indexOf(decimalPoint) + 1);
							if (fractionalDigits.length < minDecimals) {
								var missingDecimals = minDecimals - fractionalDigits.length;
								while (missingDecimals > 0) {
									fractionalDigits += "0";
									missingDecimals--;
								}
							}
							integerDigits = stringValue
								.substring(0, stringValue.indexOf(decimalPoint));
						} else {
							integerDigits = stringValue;
							if (minDecimals > 0) {
								stringValue = parseInt(stringValue).toFixed(minDecimals);
								fractionalDigits = stringValue
									.substring(stringValue.indexOf(decimalPoint) + 1);
							}
						}
						integerDigits = this._applyGroups(integerDigits, groups, groupSeparator);
						if (fractionalDigits && fractionalDigits.length > 0) {
							displayValue = integerDigits + decimalSeparator + fractionalDigits;
						} else {
							displayValue = integerDigits;
						}
					}
				}
			} else {
				displayValue = this._applyGroups(value.toString(), groups, groupSeparator);

			}
			if (value < 0 &&
				(this.options.scientificFormat === null || displayValue.indexOf("e") === -1)) {
				negativeSign = this.options.negativeSign;
				displayValue = displayValue.replace("-", "");
				displayValue = negativePattern
					.replace("n", displayValue).replace("$", symbol).replace("-", negativeSign);
			} else if (positivePattern &&
				(this.options.scientificFormat === null || displayValue.indexOf("e") === -1)) {

				// Apply Positive Pattern
				displayValue = positivePattern.replace("n", displayValue).replace("$", symbol);
			}
			return displayValue;
		},
		_valueFromText: function (text) { //NumericEditor
			return this._parseNumericValueByMode(text, this._numericType, this.options.dataMode);
		},
		_applyGroups: function (integerDigits, groups, groupSeparator) {
			var digitsPosition = integerDigits.length - 1, br = 1,
				l = groups.length, digitsLimit = 0, group;
			group = (groups.length > 0) ? groups[ 0 ] : 0;

			// The first group is longer than the integer - we can't insert group separator
			if (group > integerDigits.length || group === 0) {
				return integerDigits;
			}

			// If the value is negative we need to skip the minus sign
			if (parseFloat(integerDigits) < 0) {
				digitsLimit = 1;
			}
			for (digitsPosition; digitsPosition > digitsLimit; digitsPosition--) {

				// Group size exceeded - we need to insert group separator
				if (--group === 0) {
					integerDigits = integerDigits.substring(0, digitsPosition) +
						groupSeparator + integerDigits.substring(digitsPosition);
					if (br === l) {
						// We are on the last group
						group = groups[ --br ];
					} else {
						group = groups[ br ];
						br++;
					}
				}
			}
			return integerDigits;
		},
		_enterEditMode: function () { //NumericEditor
			var val, selection = this._getSelection(this._editorInput[ 0 ]);
			if (!$.ig.util.isIE8) {
				this._editorInput.attr("type", "tel");
			}
			this._currentInputTextValue = this._editorInput.val();
			val = this._valueInput.val();
			if (val < 0) {

				// Remove negative css into edit mode
				this._editorInput.removeClass(this.css.negative);

			}

			if (this._numericType === "percent" && this.options.displayFactor) {
				val = this._parseNumericValueByMode(val, this._numericType, this.options.dataMode);
				val = this._multiplyWithPrecision(val, this.options.displayFactor);
			}

			if (this.options.decimalSeparator !== ".") {
				val = val.toString().replace(".", this.options.decimalSeparator);
			}
			if (this.options.negativeSign !== "-") {
				val = val.toString().replace("-", this.options.negativeSign);
			}
			this._editorInput.val(val);
			this._editMode = true;
			this._positionCursor(selection.start, selection.end);
			this._processTextChanged();
		},
		_exitEditMode: function () { //NumericEditor
			this._super();
			if (this.value() < 0) {
				this._editorInput.addClass(this.css.negative);
			} else {
				this._editorInput.removeClass(this.css.negative);
			}
		},
		_getSpinValue: function (spinType, currentValue, decimalSeparator) {
			var fractional, scientificPrecision, spinPrecision,
				valuePrecision, spinDelta, toFixedVal, precision;
			if (currentValue.toString().toLowerCase().indexOf("e") !== -1) {

				// Number is in scientific format
				currentValue = Number(currentValue);
				if (this.options.spinDelta.toString().toLowerCase().indexOf("e") === -1) {
				spinDelta = Number(this.options.spinDelta.toExponential());
				} else {
					spinDelta = this.options.spinDelta;
				}

				if (spinType === "spinUp") {
					currentValue += spinDelta;
				} else {
					currentValue -= spinDelta;
				}
			} else if (currentValue.toString().indexOf(decimalSeparator) !== -1) {
				fractional = currentValue
					.substring(currentValue.toString().indexOf(decimalSeparator) + 1);

				toFixedVal = fractional.toString().length;

				if (decimalSeparator !== ".") {

					// Replace the decimal separator with .
					currentValue = currentValue.toString().replace(decimalSeparator, ".");
				}
				currentValue = currentValue / 1;

				// D.P. value is already float, always use precision
				if (this.options.spinDelta.toString().toLowerCase().indexOf("e") !== -1) {
					currentValue = Number(currentValue.toExponential());
					scientificPrecision = this.options.spinDelta.toString().toLowerCase()
						.substring(this.options.spinDelta.toString()
							.toLowerCase().indexOf("e") + 1);
					spinPrecision = Math.abs(scientificPrecision);
				} else {
					spinPrecision = this.options.spinDelta.toString().toLowerCase()
						.substring(this.options.spinDelta.toString()
							.toLowerCase().indexOf(".") + 1).length;
					valuePrecision = currentValue.toString()
						.substring(currentValue.toString().indexOf(".") + 1).length;
					spinPrecision = valuePrecision > spinPrecision ?
						valuePrecision :
						spinPrecision;
				}
				precision = Math.pow(10, spinPrecision);
				if (spinType === "spinUp") {
					if (currentValue === 0 && scientificPrecision) {

						// We guarantee we have spin delta in scientific format
						currentValue = this.options.spinDelta.toFixed(spinPrecision);
					} else {
						currentValue = (Math.round(currentValue * precision) +
							Math.round(this.options.spinDelta * precision)) / precision;
					}
				} else {
					if (currentValue === 0 && scientificPrecision) {

						// We guarantee we have spin delta in scientific format
						currentValue = (-this.options.spinDelta).toFixed(spinPrecision);
					} else {
						currentValue = (Math.round(currentValue * precision) -
							Math.round(this.options.spinDelta * precision)) / precision;
					}
				}

				// We need to call to fixed only in case current fractional lenth is less than it originally was.
				if (currentValue.toString().substring(currentValue
					.toString().indexOf(".") + 1).length < fractional.length) {
					currentValue = currentValue.toFixed(toFixedVal);
				}
				if (decimalSeparator !== ".") {

					// Replace . with decimal separator
					currentValue = currentValue.toString().replace(".", decimalSeparator);
				}
			} else {
				currentValue = currentValue / 1;
				if (this.options.spinDelta % 1 === 0) {

					// Integer value
					if (spinType === "spinUp") {
						currentValue += this.options.spinDelta;
					} else {
						currentValue -= this.options.spinDelta;
					}
				} else {
					if (this.options.spinDelta.toString().toLowerCase().indexOf("e") !== -1) {
						scientificPrecision = this.options.spinDelta.toString().toLowerCase()
							.substring(this.options.spinDelta.toString()
								.toLowerCase().indexOf("e") + 1);
						spinPrecision = Math.abs(scientificPrecision);
					} else {
						spinPrecision = this.options.spinDelta.toString().toLowerCase()
							.substring(this.options.spinDelta.toString()
								.toLowerCase().indexOf(".") + 1).length;
					}
					precision = Math.pow(10, spinPrecision);
					if (spinType === "spinUp") {
						if (currentValue === 0) {

							// We guarantee we have spin delta in scientific format
							currentValue = this.options.spinDelta.toFixed(spinPrecision);
						} else {
							currentValue = (Math.round(currentValue * precision) +
								Math.round(this.options.spinDelta * precision)) / precision;
						}
					} else {
						if (currentValue === 0) {

							// We guarantee we have spin delta in scientific format
							currentValue = (-this.options.spinDelta).toFixed(spinPrecision);
						} else {
							currentValue = (Math.round(currentValue * precision) -
								Math.round(this.options.spinDelta * precision)) / precision;
						}
					}
				}
			}
			return currentValue;
		},
		_spinUp: function () { //NumericEditor
			var currVal, decimalSeparator = this.options.decimalSeparator, noCancel;
			if (this._focused) {
				currVal = this._editorInput.val();
			} else {
				if (this.value() || this.value() === 0) {
					currVal = this.value().toString();
				} else {
					currVal = "";
				}
			}
			this._clearEditorNotifier();
			this._currentInputTextValue = this._editorInput.val();
			currVal = this._getSpinValue("spinUp", currVal, decimalSeparator);
			if ((!this._validateValue(currVal) && currVal > this.options.maxValue &&
				this.options.spinWrapAround) || currVal < this.options.minValue) {
				currVal = this.options.minValue;
				this._sendNotification("warning",
					$.ig.util.stringFormat($.ig.Editor.locale.maxValExceededWrappedAroundErrMsg,
						this.options.maxValue));
			} else if (currVal >= this.options.maxValue && !this.options.spinWrapAround) {
				currVal = this.options.maxValue;
				this._sendNotification("warning",
					$.ig.util.stringFormat($.ig.Editor.locale.maxValErrMsg,
						this.options.maxValue));
			}
			if (this._focused) {
				if (this.options.scientificFormat) {
					currVal = Number(currVal).toExponential()
						.replace("e", this._getScientificFormat());
				}
				this._editorInput.val(currVal);
				this._processTextChanged();
			} else {

				// Trigger value changing
				noCancel = this._triggerValueChanging(currVal);
				if (noCancel) {
					this._updateValue(currVal);
					this._exitEditMode();

					// We pass the new value in order to have the original value into the arguments
					this._triggerValueChanged(currVal);
				}
			}
			this._setSpinButtonsState(currVal);
		},
		_spinDown: function () { //NumericEditor
			var currVal, decimalSeparator = this.options.decimalSeparator, noCancel;
			if (this._focused) {
				currVal = this._editorInput.val();
			} else {
				if (this.value() || this.value() === 0) {
					currVal = this.value().toString();
				} else {
					currVal = "";
				}
			}
			this._clearEditorNotifier();
			this._currentInputTextValue = this._editorInput.val();
			currVal = this._getSpinValue("spinDown", currVal, decimalSeparator);
			if ((!this._validateValue(currVal) && currVal < this.options.minValue &&
				this.options.spinWrapAround) || currVal > this.options.maxValue) {
				currVal = this.options.maxValue;
				this._sendNotification("warning",
					$.ig.util.stringFormat($.ig.Editor.locale.minValExceededWrappedAroundErrMsg,
						this.options.minValue));

			} else if (currVal <= this.options.minValue && !this.options.spinWrapAround) {
				currVal = this.options.minValue;
				this._sendNotification("warning",
					$.ig.util.stringFormat($.ig.Editor.locale.minValErrMsg,
						this.options.minValue));
			}
			if (this._focused) {
				if (this.options.scientificFormat) {
					currVal = Number(currVal).toExponential()
						.replace("e", this._getScientificFormat());
				}
				this._editorInput.val(currVal);
				this._processTextChanged();
			} else {

				// Trigger value changing
				noCancel = this._triggerValueChanging(currVal);
				if (noCancel) {
					this._updateValue(currVal);
					this._exitEditMode();

					// We pass the new value in order to have the original value into the arguments
					this._triggerValueChanged(currVal);
				}
			}
			this._setSpinButtonsState(currVal);
		},
		_handleSpinUpEvent: function () {
			var cursorPosition = this._getCursorPosition();
			if (this.options.dataMode === "double" || this.options.dataMode === "float") {

				// Get cursor position
				if (this._focused) {

					switch (this._fractionalOrIntegerSelected(cursorPosition)) {
						case "fractional": {
							this._spinUp(true);//True stands for increase the value only on the fractional part of the number
							this._setSelectionRange(this._editorInput[ 0 ],
								cursorPosition, cursorPosition);
						}
							break;
						case "integer": {
							this._spinUp();
							this._setSelectionRange(this._editorInput[ 0 ],
								cursorPosition, cursorPosition);
						}
							break;
						case "all": {
							this._spinUp();
							this._editorInput.select();

							// Select All
						}
							break;
						default:
							this._spinUp();
							this._editorInput.select();
					}
				} else {
					this._spinUp();
				}
			} else {
				this._spinUp();
			}
		},
		_handleSpinDownEvent: function () {
			var cursorPosition = this._getCursorPosition();
			if (this.options.dataMode === "double" || this.options.dataMode === "float") {
				if (this._focused) {
					switch (this._fractionalOrIntegerSelected(cursorPosition)) {
						case "fractional": {
							this._spinDown(true);//True stands for increase the value only on the fractional part of the number
							this._setSelectionRange(this._editorInput[ 0 ],
								cursorPosition, cursorPosition);
						}
							break;
						case "integer": {
							this._spinDown();
							this._setSelectionRange(this._editorInput[ 0 ],
								cursorPosition, cursorPosition);
						}
							break;
						case "all": {
							this._spinDown();
							this._editorInput.select();

							//Select All
						}
							break;
						default:
							this._spinDown();
							this._editorInput.select();
					}
				} else {
					this._spinDown();
				}
			} else {
				this._spinDown();
			}
		},
		_fractionalOrIntegerSelected: function (cursorPosition) {
			var decimalSeparator, val;
			if (cursorPosition === -1) {
				return "all";
			} else {
				decimalSeparator = this.options.decimalSeparator;
				val = this._editorInput.val();
				if (val.indexOf(decimalSeparator) < 0) {
					return "all";
				} else {
					if (cursorPosition <= val.indexOf(decimalSeparator)) {
						return "integer";
					} else {
						return "fractional";
					}
				}
			}
		},

		// igNumericEditor public methods
		value: function (newValue) { // Numeric Editor
			/* Gets/Sets editor value.
				paramType="number" optional="true" New editor value.
				returnType="number" Current editor value. */
			if (newValue !== undefined) {

				// N.A. 12/1/2015 Bug #207198: Remove notifier when value updated through value method.
				this._clearEditorNotifier();
				if (newValue !== null && !isNaN(this._parseNumericValueByMode(newValue,
					this._numericType, this.options.dataMode))) {
					if (newValue !== "" && !isNaN(newValue)) {
						if (this.options.maxValue && newValue > this.options.maxValue) {
							newValue = this.options.maxValue;

							// Raise Warning level 2
							this._sendNotification("warning",
								$.ig.util.stringFormat($.ig.Editor.locale.maxValExceedSetErrMsg,
									this.options.maxValue));
						} else if (this.options.minValue && newValue < this.options.minValue) {
							newValue = this.options.minValue;

							// Raise Warning level 2
							this._sendNotification("warning",
								$.ig.util.stringFormat($.ig.Editor.locale.minValExceedSetErrMsg,
									this.options.value));
						}
					}
					if (this._validateValue(newValue)) {
						this._updateValue(newValue);
						if (!this._focused) {
							this._editorInput.val(this._getDisplayValue());
						} else {
							this._enterEditMode();
						}
					} else {
						if (newValue < this.options.minValue) {
							newValue = this.options.minValue;
						} else if (newValue > this.options.maxValue) {
							newValue = this.options.maxValue;
						}
						this._updateValue(newValue);
						if (!this._focused) {
							this._editorInput.val(this._getDisplayValue());
						} else {
							this._enterEditMode();
						}
					}
					this._setSpinButtonsState(newValue);
				} else {
					if (this.options.revertIfNotValid &&
					!(newValue === null && this.options.allowNullValue)) {
						newValue = this._valueInput.val();
					} else {
						this._clearValue();
					}
				}
				if (newValue < 0) {
					this._editorInput.addClass(this.css.negative);
				} else {
					this._editorInput.removeClass(this.css.negative);
				}
			} else {
				return this.options.value;
			}
		},
		findListItemIndex: function (number) {
			/* Finds index of list item by text that matches with the search parameters.
				paramType="number" optional="false" The text to search for.
				returnType="number" Returns index of the found item. */
			var list = this.options.listItems, i;

			for (i = 0; i < list.length; i++) {
				if (this._parseNumericValueByMode(list[ i ],
					this._numericType, this.options.dataMode) === number) {
					return i;
			}
		}
			return -1;
		},
		getSelectedText: function () {
			/*@Skipped@*/
			throw ($.ig.Editor.locale.numericEditorNoSuchMethod);
		},
		getSelectionStart: function () {
			/*@Skipped@*/
			throw ($.ig.Editor.locale.numericEditorNoSuchMethod);
		},
		getSelectionEnd: function () {
			/*@Skipped@*/
			throw ($.ig.Editor.locale.numericEditorNoSuchMethod);
		},
		spinUp: function (delta) {
			/* Increments value in editor according to the parameter.
				paramType="number" optional="true" Increments value. */
			this._spinUp(delta); // TODO this._spinUp() method should accept delta.
		},
		spinDown: function (delta) {
			/* Decrements value in editor according to the parameter.
				paramType="number" optional="true" Decrement value. */
			this._spinDown(delta); // TODO this._spinUp() method should accept delta.
		},
		selectListIndexUp: function () {
			/* Moves the hovered index to the item that appears above the current one in the list. */
			$.ui.igTextEditor.prototype.spinUp.call(this);
		},
		selectListIndexDown: function () {
			/* Moves the hovered index to the item that appears above the current one in the list. */
			$.ui.igTextEditor.prototype.spinDown.call(this);
		},
		getRegionalOption: function () {
			/* Get current regional.
				returnType="string" Current regional */
			return this._getRegionalOption();
		}
	});
	$.widget("ui.igCurrencyEditor", $.ui.igNumericEditor, {
		options: {
			/* type="string" Sets gets the string, which is used as positive pattern. The "n" flag represents the value of number.
				Note: This option has priority over possible regional settings.
				Note: Even if the default value is null - if internationalization file is provided and it contains default values for those properties the values are imlicitly set. */
			positivePattern: null,
			currencySymbol: null // TODO it seems this option is not used at all

		},
		events: {
			/* igWidget events go here */
		},
		_create: function () { //Currency editor
			$.ui.igNumericEditor.prototype._create.call(this);
		},
		_setNumericType: function () {
			this._numericType = "currency";
		},
		_applyRegionalSettings: function () { //igCurrencyEditor

			this.options.negativeSign = this._getRegionalOption("negativeSign");
			this.options.currencySymbol = this._getRegionalOption("currencySymbol");
			this.options.positivePattern = this.options.positivePattern ||
				this._getRegionalOption("currencyPositivePattern");
			this.options.negativePattern = this.options.negativePattern ||
				this._getRegionalOption("currencyNegativePattern");
			this.options.decimalSeparator = this.options.decimalSeparator ||
				this._getRegionalOption("currencyDecimalSeparator");
			this.options.groupSeparator = this.options.groupSeparator !== null ?
				this.options.groupSeparator :
				this._getRegionalOption("currencyGroupSeparator");
			this.options.groups = this.options.groups ||
				this._getRegionalOption("currencyGroups");
			this.options.maxDecimals = this.options.maxDecimals === null ?
				this._getRegionalOption("currencyMaxDecimals") :
				this.options.maxDecimals;
			this.options.minDecimals = this.options.minDecimals === null ?
				this._getRegionalOption("currencyMinDecimals") :
				this.options.minDecimals;
		},

		// igCurrencyEditor public methods
		currencySymbol: function (symbol) {
			/* Gets/sets a string that is used as the currency symbol shown with the number in the input. The value provided as a param is propagated to the currencySymbol option and thus has the same priority as the option.
				paramType="sting" optional="true" New currency symbol.
				returnType="string" Current currency symbol. */
			if (symbol) {
				this.options.currencySymbol = symbol;
			} else {
				return this.options.currencySymbol;
			}
		}
	});
	$.widget("ui.igPercentEditor", $.ui.igNumericEditor, {
		options: {
			/* type="string" Gets the pattern for positive numeric values, which is used in display (no focus) state.
				The "$" flag represents "numericSymbol" and the "n" flag represents the value of number.
				Note: this option has priority over possible regional settings. */
			positivePattern: null,
			/* type="string" Gets symbol, which is used in display (no focus) state.
				Note: this option has priority over possible regional settings. */
			percentSymbol: null,
			/* type="number" Gets/Sets the factor which used for the get and set of the "value" method.
				On the get number (string) entered by user is divided by that factor and on the set the number (string) displayed in editor is multiplied by that factor.
				For example, if factor is 100 and the "value" is set to 0.123, then editor will show string "12.3".
				Possible values: 1, or 100.
				Note: this option has priority over possible regional settings. */
			displayFactor: 100,
			/* type="double|float|long|ulong|int|uint|short|ushort|sbyte|byte" Gets type of value returned by the get of value() method. That also affects functionality of the set value(val) method and the copy/paste operations of browser.
				double type="string" the Number object is used with limits of double and if value is not set, then the null or Number.NaN is used depending on the option 'nullable'. Note: that is used as default.
				float type="string" the Number object is used with limits of float and if value is not set, then the null or Number.NaN is used depending on the option 'nullable'.
				long type="string" the Number object is used with limits of signed long and if value is not set, then the null or 0 is used depending on the option 'nullable'.
				ulong type="string" the Number object is used with limits of unsigned long and if value is not set, then the null or 0 is used depending on the option 'nullable'.
				int type="string" the Number object is used with limits of signed int and if value is not set, then the null or 0 is used depending on the option 'nullable'.
				uint type="string" the Number object is used with limits of unsigned int and if value is not set, then the null or 0 is used depending on the option 'nullable'.
				short type="string" the Number object is used with limits of signed short and if value is not set, then the null or 0 is used depending on the option 'nullable'.
				ushort type="string" the Number object is used with limits of unsigned short and if value is not set, then the null or 0 is used depending on the option 'nullable'.
				sbyte type="string" the Number object is used with limits of signed byte and if value is not set, then the null or 0 is used depending on the option 'nullable'.
				byte type="string" the Number object is used with limits of unsigned byte and if value is not set, then the null or 0 is used depending on the option 'nullable'.
			*/
			dataMode: "float", // TODO maybe it should be "double"?
			/* type="number" Gets/Sets delta-value which is used to increment or decrement value in editor on spin events. If value is set to negative value an exception is thrown. Non integer value is supported only for dataMode double and float.*/
			spinDelta: 0.01
		},
		events: {
		},
		_create: function () { //Percent
			$.ui.igNumericEditor.prototype._create.call(this);
		},
		_setNumericType: function () {
			this._numericType = "percent";
		},
		_insert: function (newValue, previousValue) { // Percent Editor
			if (!isNaN(newValue = this._parseNumericValueByMode(newValue,
				this._numericType, this.options.dataMode))) {
				if (this.options.maxValue &&
					newValue / this.options.displayFactor > this.options.maxValue) {
					newValue = this.options.maxValue * this.options.displayFactor;

					//Notify
					this._sendNotification("warning",
						$.ig.util.stringFormat($.ig.Editor.locale.maxValExceedSetErrMsg,
							this.options.maxValue));
				} else if (this.options.minValue &&
					newValue / this.options.displayFactor < this.options.minValue) {
					newValue = this.options.minValue * this.options.displayFactor;

					//Notify
					this._sendNotification("warning",
						$.ig.util.stringFormat($.ig.Editor.locale.minValExceedSetErrMsg,
						this.options.minxValue));
				}

				if (!this._validateValue(newValue / this.options.displayFactor) &&
					this.options.revertIfNotValid) {
					newValue = previousValue;
				}
			} else if (this.options.revertIfNotValid) {
				newValue = previousValue;
			} else {
				newValue = "";
			}
			if (this._editMode) {
				this._editorInput.val(newValue);
			} else {
				newValue = this._divideWithPrecision(newValue, this.options.displayFactor);
				this._processInternalValueChanging(newValue);
				this._exitEditMode();
			}
			this._setSpinButtonsState(newValue / this.options.displayFactor);
			this._processTextChanged();
		},
		_applyRegionalSettings: function () { //Percent

			this.options.negativeSign = this.options.negativeSign ||
				this._getRegionalOption("negativeSign");
			this.options.percentSymbol = this.options.percentSymbol ||
				this._getRegionalOption("percentSymbol");
			this.options.positivePattern = this.options.positivePattern ||
				this._getRegionalOption("percentPositivePattern");
			this.options.negativePattern = this.options.negativePattern ||
				this._getRegionalOption("percentNegativePattern");
			this.options.decimalSeparator = this.options.decimalSeparator ||
				this._getRegionalOption("percentDecimalSeparator");
			this.options.groupSeparator = this.options.groupSeparator !== null ?
				this.options.groupSeparator :
				this._getRegionalOption("percentGroupSeparator");
			this.options.groups = this.options.groups ||
				this._getRegionalOption("percentGroups");
			this.options.maxDecimals = this.options.maxDecimals === null ?
				this._getRegionalOption("percentMaxDecimals") :
				this.options.maxDecimals;
			this.options.minDecimals = this.options.minDecimals === null ?
				this._getRegionalOption("percentMinDecimals") :
				this.options.minDecimals;
			if (this.options.displayFactor === 100) {
				// TODO - this is needed, cause when value(20.34) is devided by 100, then it becomes 0.2034, and if maxDecimals is 2 then it will be cut to 0.20
				this.options.maxDecimals += 2;
			}
			this.options.displayFactor = this.options.displayFactor ||
				this._getRegionalOption("displayFactor");
			if (typeof this.options.displayFactor !== "number") {
				throw new Error($.ig.Editor.locale.displayFactorIsOfTypeNumber);
			} else if (this.options.displayFactor !== 1 && this.options.displayFactor !== 100) {
				throw new Error($.ig.Editor.locale.displayFactorAllowedValue);
			}
		},
		_setOption: function (option, value) { // igPercentEditor
			/* igPercentEditor custom setOption goes here */
			var prevValue = this.options[ option ];
			if (prevValue === value) {
				return;
			}

			// The following line applies the option value to the igWidget meaning you don't
			// have to perform this.options[ option ] = value;
			$.Widget.prototype._setOption.apply(this, arguments);
			switch (option) {
				case "displayFactor": {
					if (typeof value !== "number") {
						this.options[ option ] = prevValue;
						throw new Error($.ig.Editor.locale.displayFactorIsOfTypeNumber);
					} else if (value !== 1 && value !== 100) {
						this.options[ option ] = prevValue;
						throw new Error($.ig.Editor.locale.displayFactorAllowedValue);
					}
				}
					break;
				default: {
					//In case no propery matches, we call the super. Into the base widget default statement breaks
					this.options[ option ] = prevValue;
					this._super(option, value);
				}
					break;
			}
		},
		_valueFromText: function (text) { //igPercentEditor
			var val = this._parseNumericValueByMode(text, this._numericType, this.options.dataMode);
			return this._divideWithPrecision(val, this.options.displayFactor);
		},
		_spinUp: function () { //igPercentEditor
			// TODO: refactor numemic spin functions
			var currVal, displayValue, decimalSeparator = this.options.decimalSeparator, noCancel;
			if (this._focused) {
				currVal = this._divideWithPrecision(this._editorInput.val(),
					this.options.displayFactor).toString();
			} else {
				if (this.value() || this.value() === 0) {
					currVal = this.value().toString();
				} else {
					currVal = "";
				}
			}
			this._clearEditorNotifier();
			this._currentInputTextValue = this._editorInput.val();
			currVal = this._getSpinValue("spinUp", currVal, decimalSeparator);

			if ((!this._validateValue(currVal) && currVal > this.options.maxValue &&
				this.options.spinWrapAround) || currVal < this.options.minValue) {
				currVal = this.options.minValue;
				this._sendNotification("warning",
					$.ig.util.stringFormat($.ig.Editor.locale.maxValExceededWrappedAroundErrMsg,
					this.options.maxValue));
			} else if (currVal >= this.options.maxValue && !this.options.spinWrapAround) {
				currVal = this.options.maxValue;
				this._sendNotification("warning",
					$.ig.util.stringFormat($.ig.Editor.locale.maxValErrMsg,
						this.options.maxValue));
			}
			if (this._focused) {
				displayValue = this._multiplyWithPrecision(currVal, this.options.displayFactor);
				if (this.options.scientificFormat) {
					currVal = Number(displayValue).toExponential()
						.replace("e", this._getScientificFormat());
				}
				this._editorInput.val(displayValue);
				this._processTextChanged();
			} else {
				//trigger value changing
				noCancel = this._triggerValueChanging(currVal);
				if (noCancel) {
					this._updateValue(currVal);
					this._exitEditMode();

					// We pass the new value in order to have the original value into the arguments
					this._triggerValueChanged(currVal);
				}
			}
			this._setSpinButtonsState(currVal);
		},
		_spinDown: function () { //igPercentEditor
			var currVal, decimalSeparator = this.options.decimalSeparator, noCancel;
			if (this._focused) {
				currVal = this._divideWithPrecision(this._editorInput.val(),
					this.options.displayFactor).toString();
			} else {
				if (this.value() || this.value() === 0) {
					currVal = this.value().toString();
				} else {
					currVal = "";
				}
			}
			this._clearEditorNotifier();
			this._currentInputTextValue = this._editorInput.val();
			currVal = this._getSpinValue("spinDown", currVal, decimalSeparator);
			if ((!this._validateValue(currVal) && currVal < this.options.minValue &&
				this.options.spinWrapAround) || currVal > this.options.maxValue) {
				currVal = this.options.maxValue;
				this._sendNotification("warning",
					$.ig.util.stringFormat($.ig.Editor.locale.minValExceededWrappedAroundErrMsg,
						this.options.minValue));

			} else if (currVal <= this.options.minValue && !this.options.spinWrapAround) {
				currVal = this.options.minValue;
				this._sendNotification("warning",
					$.ig.util.stringFormat($.ig.Editor.locale.minValErrMsg,
						this.options.minValue));
			}
			if (this._focused) {
				this._editorInput
					.val(this._multiplyWithPrecision(currVal, this.options.displayFactor));
				this._processTextChanged();
			} else {
				//trigger value changing
				noCancel = this._triggerValueChanging(currVal);
				if (noCancel) {
					this._updateValue(currVal);
					this._exitEditMode();

					// We pass the new value in order to have the original value into the arguments
					this._triggerValueChanged(currVal);
				}
			}
			this._setSpinButtonsState(currVal);
		},

		// igPercentEditor public methods
		percentSymbol: function (symbol) {
			/* Gets/sets a string that is used as the percent symbol shown with the number in the input. The value provided as a param is propagated to the percentSymbol option and thus has the same priority as the option.
				paramType="sting" optional="true" New percent symbol.
				returnType="string" Current percent symbol. */
			if (symbol) {
				this.options.percentSymbol = symbol;
			} else {
				return this.options.percentSymbol;
			}

		}
	});
	$.widget("ui.igMaskEditor", $.ui.igTextEditor, {
		options: {
			/* type="object" Sets gets custom regional settings for editor. If it is string, then $.ig.regional[stringValue] is assumed. */
			regional: null,
			/*type="clear|spin" Gets visibility of spin and clear buttons. That option can be set only on initialization. Combinations like 'spin,clear' are supported too.
				clear type="string" button to clear value is located on the right side of input-field (or left side if base html element has direction:rtl);
				spin type="string" spin buttons are located on the right side of input-field (or left side if base html element has direction:rtl).*/
			buttonType: "none",
			/* type="string" Gets input mask. Mask may include filter-flags and literal characters.
				Literal characters are part of mask which cannot be modified by end user. In order to use a filter-flag as a literal character, the escape "\\" character should be used.
				Default is "CCCCCCCCCC"
				Note: optional flags/entries affect the value returned by get of the "value" and "text" methods.
				List of filter-flags:
				C: any keyboard character. Entry is optional.
				&: any keyboard character. Entry is required.
				a: letter or digit character. Entry is optional.
				A: letter or digit character. Entry is required.
				?: letter character. Entry is optional.
				L: letter character. Entry is required.
				9: digit character. Entry is optional.
				0: digit character. Entry is required.
				#: digit character or "+" or "_". Entry is optional with replacement by "emptyPositionChar" or by "padChar".
				>: all letters to the right are converted to the upper case. In order to disable conversion, the ">" flag should be used again.
				<: all letters to the right are converted to the lower case. In order to disable conversion, the "<" flag should be used again.
				Note! This option can not be set runtime.
			*/
			inputMask: "CCCCCCCCCC",
			/* type="rawText|rawTextWithRequiredPrompts|rawTextWithAllPrompts|rawTextWithLiterals|rawTextWithRequiredPromptsAndLiterals|allText" Gets type of value returned by the get of value() method. That also affects functionality of the set value(val) method and the copy/paste operations of browser.
				rawText type="string" only entered text. All unfilled prompts (positions) and literals are ignored (removed).
				rawTextWithRequiredPrompts type="string" only entered text and required prompts (positions). All optional unfilled prompts and literals are ignored (removed)
				rawTextWithAllPrompts type="string" only entered text and prompts (positions). All literals are ignored (removed).
				rawTextWithLiterals type="string" only entered text and literals. All unfilled prompts are ignored (removed).
				rawTextWithRequiredPromptsAndLiterals type="string" only entered text, required prompts (positions) and literals. All optional unfilled prompts are ignored (removed).
				allText type="string" entered text, all prompts (positions) and literals. Note: that is used as default.
			*/
			dataMode: "allText",
			/* type="string" Gets character which is used as prompt in edit mode for available entry position. */
			unfilledCharsPrompt: "_",
			/* type="string" Gets character which is used as replacement of not-filled required position in mask when editor is in display mode (not focused). */
			padChar: " ",
			/* type="string" Gets character which is used as replacement of not-filled required position in mask when application calls get for the "value" or for the "text" methods. */
			emptyChar: " ",
			/* type="string" Gets ability to enter only specific characters in input-field from keyboard and on paste.
				Notes:
				If "excludeKeys" option contains same characters as this option, then "excludeKeys" has priority.
				Note! This option can not be se runtime. */
			includeKeys: null,
			/* type="string" Gets ability to prevent entering specific characters from keyboard or on paste.
				Notes:
				If a character is specified in "includeKeys" option also, then "excludeKeys" has priority.
				Note! This option can not be se runtime. */
			excludeKeys: null,
			/* type="array" @Skipped@ Sets gets list of items which are used for drop-down list.
				Items in list can be strings, numbers or objects. The items are directly rendered without casting, or manipulating them.
			 */
			listItems: null,
			/* type="number" @Skipped@ Sets gets custom width of drop-down list in pixels. If value is equal to 0 or negative, then the width of editor is used. */
			listWidth: 0,
			/* type="number" @Skipped@ Sets the hover/unhover animation duration. */
			listItemHoverDuration: 0,
			/* type="bool" @Skipped@ Sets the ability to allow values only set into the list items. This validation is done only when the editor is blured, or enter key is pressed*/
			isLimitedToListValues: false,
			/* type="auto|bottom|top" @Skipped@ Gets/Sets drop down opening orientation for the dorp down list when open button is clicked. If auto option is set the component calculates if there is enough space at the bottom, if not checks the space above the component and if in both directions there is not enough space it openes the dropdown down way.
				'auto' type="string"
				'bottom' type="string"
				'top' type="string"
			*/
			dropDownOrientation: "auto",
			/* type="text|password|multiline" @Skipped@ Sets gets text mode of editor such as: single-line text editor, password editor or multiline editor. That option has effect only on initialization. If based element (selector) is TEXTAREA, then it is used as input-field.
				text type="string" Single line text editor based on INPUT element is created.
				password type="string" Editor based on INPUT element with type password is created.
				multiline type="string" multiline editor based on TEXTAREA element is created.
			*/
			textMode: "text",
			/* type="number" @Skipped@ Gets/Sets how many items should be shown at once.
				Notes:
				That option is overwritten if the number of list items is less than the value. In that case the height of the dropdown is adjusted to the number of items.
				Note! This option can not be set runtime.
			*/
			visibleItemsCount: 5
		},
		events: {
			/* igWidget events go here */

			/* cancel="true" @Skipped@ Event which is raised when the drop down is opening.
				Function takes arguments evt and ui.
				Use ui.owner to obtain reference to igEditor.
				Use ui.editorInput to obtain reference to the editable input
				Use ui.list to obtain reference to the list contaier. */
			dropDownListOpening: "dropDownListOpening",
			/*@Skipped@ Event which is raised when the drop down is already opened.
				Function takes arguments evt and ui.
				Use ui.owner to obtain reference to igEditor.
				Use ui.editorInput to obtain reference to the editable input
				Use ui.list to obtain reference to the list contaier. */
			dropDownListOpened: "dropDownListOpened",
			/* cancel="true" @Skipped@ Event which is raised when the drop down is closing.
				Function takes arguments evt and ui.
				Use ui.owner to obtain reference to igEditor.
				Use ui.editorInput to obtain reference to the editable input
				Use ui.list to obtain reference to the list contaier. */
			dropDownListClosing: "dropDownListClosing",
			/*@Skipped@ Event which is raised when the drop down is already closed.
				Function takes arguments evt and ui.
				Use ui.owner to obtain reference to igEditor.
				Use ui.editorInput to obtain reference to the editable input
				Use ui.list to obtain reference to the list contaier. */
			dropDownListClosed: "dropDownListClosed",
			/* cancel="true" @Skipped@ Event which is raised when the drop down list item is selecting.
				Function takes arguments evt and ui.
				Use ui.owner to obtain reference to igEditor.
				Use ui.editorInput to obtain reference to the editable input
				Use ui.list to obtain reference to the list contaier.
				Use ui.item to obtain reference to the list item which is about to be selected. */
			dropDownItemSelecting: "dropDownItemSelecting",
			/* cancel="true" @Skipped@ Event which is raised when the drop down list item is selected.
				Function takes arguments evt and ui.
				Use ui.owner to obtain reference to igEditor.
				Use ui.editorInput to obtain reference to the editable input
				Use ui.list to obtain reference to the list contaier.
				Use ui.item to obtain reference to the list item which is selected. */
			dropDownItemSelected: "dropDownItemSelected"
		},
		_create: function () { //igMaskEditor
			$.ui.igTextEditor.prototype._create.call(this);
		},
		_initialize: function () {
			this._super();
			if (this.options.maxLength) {

				// In case of explicidly set length as an option, we remove it because that option is controlled by the mask
				this.options.maxLength = null;
			}
			if (this.options.listItems) {

				// In case of mask editor we're not supporting listItems. When the listItems are disabled,1890 there are no spin buttons rendered.
				this.options.listItems = null;
			}
			if (this._maskFlagsArray) {
				this._maskFlagsArray = $.merge(this._maskFlagsArray,
					[ "C", "&", "a", "A", "?", "L", "9", "0", "<", ">", "#" ]);
			} else {
				this._maskFlagsArray = [ "C", "&", "a", "A", "?", "L", "9", "0", "<", ">", "#" ];
			}
			this._promptCharsIndices = [];
		},
		_applyOptions: function () { //igMaskEditor

			// In case value is not set we need to use the setInitialValue method to store mask, required field indeces, prompt indeces etc.
			this._super();
			if (this.options.value === null || this.options.value === undefined) {
				this._setInitialValue();
			}
		},

		_enterEditMode: function () { // MaskEditor
			var selection = this._getSelection(this._editorInput[ 0 ]);
			this._editMode = true;
			this._currentInputTextValue = this._editorInput.val();
			if (this._maskedValue === "") {
				this._editorInput.val(this._maskWithPrompts);
			} else {
				this._editorInput.val(this._maskedValue);
			}
			this._positionCursor(selection.start, selection.end);
			this._processTextChanged();
		},
		_insert: function (newValue) { // MaskEditor
			var selection = this._getSelection(this._editorInput[ 0 ]);
				if (this.options.toUpper) {
					if (newValue) { newValue = newValue.toLocaleUpperCase(); }
				} else if (this.options.toLower) {
					if (newValue) { newValue = newValue.toLocaleLowerCase(); }
				}
				this._promptCharsIndices = [];
				newValue = this._parseValueByMask(newValue);
				this._editorInput.val(newValue);
				this._processTextChanged();

				// Move the caret
				this._setCursorPosition(selection.start + newValue.length);

		},
		_pasteHandler: function (event) {
			// MaskEditor Handler
			var self = this, previousValue = $(event.target).val(), newValue;
			this._currentInputTextValue = this._editorInput.val();
			this._timeouts.push(setTimeout(function () {
				newValue = $(event.target).val();
				if (self._validateValueAgainstMask(newValue)) {
					self._insert(newValue, previousValue);
				} else {
					if (self.options.revertIfNotValid) {
						newValue = self._valueInput.val();
						self._updateValue(newValue);
					} else {
						self._clearValue();
					}
					if (self._focused) {
						self._enterEditMode();
					}
				}
			}, 10));
		},
		_attachEvents: function () { //MaskEditor
			var self = this;
			self._super();
			this._editorInput.on({
				"dragend.editor": function () {
					self._handleDeleteKey(true);
				},
				"cut.editor": function () {
					self._handleDeleteKey(true);
				},
				"drop.editor": function (event) {
					event.preventDefault();
					self._pasteHandler(event);
				}
			});
		},
		_detachEvents: function () {
			this._super();
			this._editorInput.off("cut.editor dragend.editor");
		},
		_getMaskLiteralsAndRequiredPositions: function() {
			// This method returns array of indexes which represent literals into edit mode.
			var mask, literalIndeces = [], requiredFieldsIndeces = [],
				maskFlagsArray = this._maskFlagsArray, output, maskChar, unescapedMask, i, j,
			isToLower = false, isToUpper = false, toLowerIndeces = [], toUpperIndeces = [];

			output = unescapedMask = mask = this.options.inputMask;

			// j stands for real index, after we remove escape chars
			for (i = 0, j = 0; i < mask.length; i++, j++) {
				maskChar = mask.charAt(i);
				if ($.inArray(maskChar, maskFlagsArray) !== -1) {

					// Get requred chars
					if (isToLower) {
						toLowerIndeces.push(j);
					} else if (isToUpper) {
						toUpperIndeces.push(j);
					}
					if (maskChar === "&" || maskChar === "A" ||
						maskChar === "L" || maskChar === "0") {
						requiredFieldsIndeces.push(j);
					} else if (maskChar === ">") {
						if (!isToUpper) {
							isToUpper = true;

							// toUpperIndeces.push(j);
							if (isToLower) {
								isToLower = false;
								toLowerIndeces.pop();
							}
						} else {

							// If there are two flags < all between characters are converted toUpper
							isToUpper = false;
							toUpperIndeces.pop();
						}

						// We need to remove the symbol < from the unescaped mask
						unescapedMask = this._replaceCharAt(unescapedMask, j, "");
						j--;
					} else if (maskChar === "<") {
						if (!isToLower) {
							isToLower = true;

							// toLowerIndeces.push(j);
							if (isToUpper) {
								isToUpper = false;
								toUpperIndeces.pop();
							}
						} else {
							isToLower = false;
							toLowerIndeces.pop();
						}
						unescapedMask = this._replaceCharAt(unescapedMask, j, "");
						j--;
					}
				} else if (maskChar === "\\") {
					if ($.inArray(mask.charAt(i + 1), maskFlagsArray) !== -1) {
						unescapedMask = this._replaceCharAt(unescapedMask, j, "");
						i++;
					}
					literalIndeces.push(j);
				} else {

					// Literal add it.
					literalIndeces.push(j);
				}
			}
			this._literalIndeces = literalIndeces;
			this._requiredIndeces = requiredFieldsIndeces;
			this._toLowerIndeces = toLowerIndeces;
			this._toUpperIndeces = toUpperIndeces;

			// We need the mask into this format to be sure we have the right index when the key is pressed.
			this._unescapedMask = unescapedMask;
		},
		_validateValue: function (val) { // Mask Editor
			if (val === undefined || val === null) {
				return this._super(val);
			} else {
				return this._validateValueAgainstMask(val);
			}
		},
		_parseValueByMask: function (value) { //igMaskEditor
			var mask = this.options.inputMask, outputVal = mask,
				ch, maskFlagsArray = this._maskFlagsArray,
			length = mask.length, i, j, tempChar;

			value = value ? value.toString() : "";
			if (length && length > 0) {
				if (value.indexOf(this.options.unfilledCharsPrompt !== -1)) {
					i = 225;

					// We need to generate tempchar which is not part of both mask and value
					tempChar = String.fromCharCode(i);
					while ((mask.indexOf(tempChar) !== -1) &&
						(value.indexOf(tempChar) !== -1)) {
						i++;
					}
				}
				for (i = 0, j = 0; i < length; i++, j++) {
					ch = value.charAt(j);
					if (this._validateCharOnPostion(ch, i) === null) {

						// Move to next char on the mask
						// We need to detect Escaped chars

						if (mask.charAt(i) === "\\") {
							i++;
							j--;
						} else if (mask.charAt(i) === "<" || mask.charAt(i) === ">") {
							j--;
						}

						// In case passed value contains both literals and filled prompts we try to parse the value.
						// In case of mask 00/00 we should accept both 1234 and 12/34 as input and parse it with the correct result.
						else if ($.inArray(i, this._literalIndeces) !== -1) {
							if (mask.charAt(i) !== ch) {
								j--;
							}
						}
					} else if (this._validateCharOnPostion(ch, i) === true) {
						if (ch === this.options.unfilledCharsPrompt) {
							outputVal = this._replaceCharAt(outputVal, i, tempChar);
						} else {
							outputVal = this._replaceCharAt(outputVal, i, ch);
						}

					} else {

						// We replace with unfilledCharsPrompt
						outputVal = this
							._replaceCharAt(outputVal, i, this.options.unfilledCharsPrompt);
					}
				}

				// We need to loop throught the value and remove escape chars
				for (i = 0; i < outputVal.length; i++) {
					ch = outputVal.charAt(i);
					if (ch === "\\" && $.inArray(outputVal.charAt(i + 1), maskFlagsArray) !== -1) {
						outputVal = this._replaceCharAt(outputVal, i, "");
					} else if (ch === "<" || ch === ">") {
						outputVal = this._replaceCharAt(outputVal, i, "");
						i--;
					} else if ($.inArray(i, this._toLowerIndeces) !== -1) {
						if (ch === tempChar) {
							outputVal = this._replaceCharAt(outputVal, i,
								this.options.unfilledCharsPrompt);
							this._promptCharsIndices.push(i);
						}
						outputVal = this
							._replaceCharAt(outputVal, i, outputVal.charAt(i).toLocaleLowerCase());
					} else if ($.inArray(i, this._toUpperIndeces) !== -1) {
						outputVal = this
							._replaceCharAt(outputVal, i, outputVal.charAt(i).toLocaleUpperCase());
						if (ch === tempChar) {
							outputVal = this
								._replaceCharAt(outputVal, i, this.options.unfilledCharsPrompt);
							this._promptCharsIndices.push(i);
						}
					} else if (ch === tempChar) {
						outputVal = this.
							_replaceCharAt(outputVal, i, this.options.unfilledCharsPrompt);
						this._promptCharsIndices.push(i);
					}
				}
			}
			return outputVal;
		},
		_getValueByDataMode: function (maskedVal) {
			var dataModeValue, regExpr, i, ch, index, tempChar,
				dataMode = this.options.dataMode;
			maskedVal = maskedVal !== undefined ? maskedVal : this._maskedValue;
			if (this._promptCharsIndices.length > 0) {
				i = 225;
				tempChar = String.fromCharCode(i);
				while (maskedVal.indexOf(tempChar) !== -1) {
					i++;
				}
				for (i = 0; i < this._promptCharsIndices.length; i++) {
					index = this._promptCharsIndices[ i ];
					maskedVal = this._replaceCharAt(maskedVal, index, tempChar);
				}
			}
			switch (dataMode) {
				case "allText": {
					regExpr = new RegExp($.ig.util
						.escapeRegExp(this.options.unfilledCharsPrompt), "g");
					dataModeValue = maskedVal.replace(regExpr, this.options.emptyChar);
					if (this._promptCharsIndices.length > 0) {
						regExpr = new RegExp($.ig.util.escapeRegExp(tempChar), "g");
						dataModeValue = dataModeValue
							.replace(regExpr, this.options.unfilledCharsPrompt);
					}
				}
					break;
				case "rawText": {
					dataModeValue = "";
					for (i = 0; i < maskedVal.length; i++) {
						ch = maskedVal.charAt(i);

						// We ensure current char is not literal and it's filled (not unfilledCharsPrompt)
						if ($.inArray(i, this._literalIndeces) === -1 &&
							ch !== this.options.unfilledCharsPrompt) {
							if (this._promptCharsIndices.length > 0 && ch === tempChar) {
								dataModeValue += this.options.unfilledCharsPrompt;
							} else {
								dataModeValue += ch;
							}
						}
					}
				}
					break;
				case "rawTextWithRequiredPrompts": {
					dataModeValue = "";
					for (i = 0; i < maskedVal.length; i++) {
						ch = maskedVal.charAt(i);

						// We ensure current char is not literal and it's filled (not unfilledCharsPrompt)
						if ($.inArray(i, this._literalIndeces) === -1) {
							if (ch === this.options.unfilledCharsPrompt) {
								if ($.inArray(i, this._requiredIndeces) !== -1) {
									dataModeValue += this.options.emptyChar;
								}
							} else {
								if (this._promptCharsIndices.length > 0 && ch === tempChar) {
									dataModeValue += this.options.unfilledCharsPrompt;
								} else {
									dataModeValue += ch;
								}
							}
						}
					}
				}
					break;
				case "rawTextWithAllPrompts": {
					dataModeValue = "";
					for (i = 0; i < maskedVal.length; i++) {
						ch = maskedVal.charAt(i);
						if ($.inArray(i, this._literalIndeces) === -1) {
							if (ch === this.options.unfilledCharsPrompt) {
								dataModeValue += this.options.emptyChar;
							} else {
								if (this._promptCharsIndices.length > 0 && ch === tempChar) {
									dataModeValue += this.options.unfilledCharsPrompt;
								} else {
									dataModeValue += ch;
								}
							}
						}
					}
				}
					break;
				case "rawTextWithLiterals": {
					dataModeValue = "";
					for (i = 0; i < maskedVal.length; i++) {
						ch = maskedVal.charAt(i);

						// We ensure current char is not literal and it's filled (not unfilledCharsPrompt)
						if (ch !== this.options.unfilledCharsPrompt) {
							if (this._promptCharsIndices.length > 0 && ch === tempChar) {
								dataModeValue += this.options.unfilledCharsPrompt;
							} else {
								dataModeValue += ch;
							}
						}
					}
				}
					break;
				case "rawTextWithRequiredPromptsAndLiterals": {
					dataModeValue = "";
					for (i = 0; i < maskedVal.length; i++) {
						ch = maskedVal.charAt(i);

						// We ensure current char is not literal and it's filled (not unfilledCharsPrompt)
						if ($.inArray(i, this._literalIndeces) === -1) {
							if (ch === this.options.unfilledCharsPrompt) {

								// Non filled required
								if ($.inArray(i, this._requiredIndeces) !== -1) {
									dataModeValue += this.options.emptyChar;
								}
							} else {

								// Filled char
								if (this._promptCharsIndices.length > 0 && ch === tempChar) {
									dataModeValue += this.options.unfilledCharsPrompt;
								} else {
									dataModeValue += ch;
								}
							}
						} else {

							// Literal
							dataModeValue += ch;
						}
					}
				}
					break;
				default: {

					// If the option is not valid we default back to the allText
					regExpr = new RegExp($.ig.util
						.escapeRegExp(this.options.unfilledCharsPrompt), "g");
					dataModeValue = maskedVal.replace(regExpr, this.options.emptyChar);
					if (this._promptCharsIndices.length > 0) {
						regExpr = new RegExp($.ig.util.escapeRegExp(tempChar), "g");
						dataModeValue = dataModeValue
							.replace(regExpr, this.options.unfilledCharsPrompt);
					}
				}
			}
			return dataModeValue;
		},
		_updateValue: function (value) { //igMaskEditor
			var nullValue;
			if (value === "") {

				// Convert empty value by dataMode
				this.options.value = "";
				this._valueInput.val("");
				this._maskedValue = "";
			} else if (value === null) {
				if (this.options.allowNullValue) {
					if (this.options.nullValue === null) {
						this._valueInput.val("");
						this.options.value = this.options.nullValue;
					} else {
						nullValue = this._parseValueByMask(this.options.nullValue);
						this._maskedValue = nullValue;
						this._valueInput.val(nullValue);
						this.options.value = nullValue;
					}
				} else {

					// Convert empty value by dataMode
					this.options.value = "";
					this._valueInput.val("");
					this._maskedValue = "";
				}
			} else {
				this._maskedValue = value;
				this.options.value = this._getValueByDataMode();
				this._valueInput.val(this.options.value);
			}
		},
		_getDisplayValue: function () { //igMaskEditor
			var result, maskedVal = this._maskedValue,
				i, j, p, maskChar, tempChar, index, regExpr,
				inputMask = this.options.inputMask, maskFlagsArray = this._maskFlagsArray;

			result = maskedVal;
			if (this._promptCharsIndices.length > 0) {
				i = 225;
				tempChar = String.fromCharCode(i);
				while (maskedVal.indexOf(tempChar) !== -1) {
					i++;
				}
				for (i = 0; i < this._promptCharsIndices.length; i++) {
					index = this._promptCharsIndices[ i ];
					maskedVal = this._replaceCharAt(maskedVal, index, tempChar);
				}
			}
			for (i = 0, j = 0, p = 0; i < maskedVal.length; i++, j++, p++) {

				if (inputMask.charAt(j) === "<" || inputMask.charAt(j) === ">") {
					j++;
				} // We need extra counter for the escaped chars, so we can be sure we check the correct mask flag
				if (inputMask.charAt(j) === "\\" &&
					$.inArray(inputMask.charAt(j + 1), maskFlagsArray) !== -1) {
					j++;
					continue;
				}

				if (maskedVal.charAt(i) === this.options.unfilledCharsPrompt) {
					maskChar = inputMask.charAt(j);
					if (maskChar === "&" || maskChar === "A" ||
						maskChar === "L" || maskChar === "0") {

						// All the required fields, which are unfilled are replaced with the padChar
						result = this._replaceCharAt(result, p, this.options.padChar);
					} else {
						result = this._replaceCharAt(result, p, "");
						p--;
					}
				}
			}
			if (this._promptCharsIndices.length > 0) {
				regExpr = new RegExp($.ig.util.escapeRegExp(tempChar), "g");
				result = result.replace(regExpr, this.options.unfilledCharsPrompt);
			}
			return result;
		},
		_valueFromText: function (text) { //igMaskEditor
			return this._getValueByDataMode(text);
		},
		_validateValueAgainstMask: function (value) {
			var i, j, length = value.length, result = true, ch, mask = this.options.inputMask;
			if (length && length > 0) {
				for (j = 0, i = 0; i < mask.length && j < value.length; i++, j++) {
					ch = value.charAt(j);
					if (this._focused && ch === this.options.unfilledCharsPrompt) {
						continue;
					}
					if (this._validateCharOnPostion(ch, i) === null) {

						// If we have left postions on the map and _validateCharOnPostion returns null this means we have literal and we need to move
						// Move to next char on the mask
						// We need to detect Escaped chars
						if (mask.charAt(i) === "\\") {
							i++;
							j--;
						} else if (mask.charAt(i) === "<" || mask.charAt(i) === ">") {
							j--;
						}

						// In case passed value contains both literals and filled prompts we try to parse the value.
						// In case of mask 00/00 we should accept both 1234 and 12/34 as input and parse it with the correct result.
						else if ($.inArray(i, this._literalIndeces) !== -1) {
							if (mask.charAt(i) !== ch) {
								j--;
							}
						}

					} else if (this._validateCharOnPostion(ch, i) === false) {
						return false;
					}
				}
			} else {
				result = true;
			}
			return result;
		},
		_setInitialValue: function (value) { //igMaskEditor
			this._maskWithPrompts = this._parseValueByMask("");
			this._getMaskLiteralsAndRequiredPositions();
			if (value === null || value === "" || typeof value === undefined) {
				this._maskedValue = "";
			} else {
				this._maskedValue = this._parseValueByMask(value);
				this._updateValue(this._maskedValue);
			}
		},
		_triggerInternalValueChange: function (value) { //MaskEditor
			if (value === this._maskWithPrompts && this._promptCharsIndices.length === 0) {
				value = "";
			}
			var noCancel = this._triggerValueChanging(value);
			if (noCancel) {
				this._processInternalValueChanging(value);

				// We pass the new value in order to have the original value into the arguments
				this._triggerValueChanged(value);

				// Check if maskedValue contains promptChars
				if (value !== "" && !this._validateRequiredPrompts(value)) {

					// Raise warning not all required fields are entered
					// State - message
					this._sendNotification("warning", $.ig.Editor.locale.maskMessage);
				}
			}
		},
		_validateRequiredPrompts: function (value) {
			var i;
			if (value === "") {
				return false;
			}
			for (i = 0; i < this._requiredIndeces.length; i++) {
				var ch = value.charAt(this._requiredIndeces[ i ]);
				if (ch === this.options.unfilledCharsPrompt) {
					if (this._promptCharsIndices.length > 0 &&
						$.inArray(this._requiredIndeces[ i ], this._promptCharsIndices) !== -1) {
						continue;
					} else {
						return false;
					}
				}
			}
			return true;
		},
		_processInternalValueChanging: function (value) { //MaskEditor
			if (this._validateValue(value)) {
				this._updateValue(value);
			} else {

				// If the value is not valid, we clear the editor
				if (this.options.revertIfNotValid) {
					value = this._valueInput.val();
					this._updateValue(value);
				} else {
					this._clearValue();
					value = this._valueInput.val();
					if (this._focused) {
						this._enterEditMode();
					}
				}
			}
		},
		_triggerKeyDown: function (event) { // MaskEditor
			var key = !event.charCode ? event.which : event.charCode,
				cursorStartPosition = this._getSelection(this._editorInput[ 0 ]).start,
				ch, transformedChar, noCancel;

			// N.A. 3/9/2016 Bug #215523: Cancel keyDown event in the derived editors.
			noCancel = this._super(event);
			if (noCancel) {
				if (key === 8) { // Backspace
					this._handleBackSpaceKey();
					event.preventDefault();
				} else if (key === 46) { // Delete
					this._handleDeleteKey();
					event.preventDefault();
				} else if (($.inArray(cursorStartPosition, this._toUpperIndeces) !== -1) &&
					this._inComposition !== true) {
					if (!event.ctrlKey && !event.altKey && ((key > 46 && key < 91) || (key > 145))) {

						// Bug 207318. T.P. 4th Dec 2015 In case of webkit composition start is fired with different order and _inCompositio flag is not correctly set.
						if (!$.ig.util.isWebKit || key !== 229) {
							ch = String.fromCharCode(key);
							transformedChar = ch.toLocaleUpperCase();
							this._editorInput.val(this._replaceCharAt(this._editorInput.val(),
								cursorStartPosition, transformedChar));
							this._setCursorPosition(cursorStartPosition + 1);
							event.preventDefault();
						}
					}
				} else if (($.inArray(cursorStartPosition, this._toLowerIndeces) !== -1) &&
					this._inComposition !== true) {
					if (!event.ctrlKey && !event.altKey && ((key > 46 && key < 91) || (key > 145))) {

						// Bug 207318. T.P. 4th Dec 2015 In case of webkit composition start is fired with different order and _inCompositio flag is not correctly set.
						if (!$.ig.util.isWebKit || key !== 229) {
							ch = String.fromCharCode(key);
							transformedChar = ch.toLocaleLowerCase();
							this._editorInput.val(this._replaceCharAt(this._editorInput.val(),
								cursorStartPosition, transformedChar));
							this._setCursorPosition(cursorStartPosition + 1);
							event.preventDefault();
						}
					}
				}
			}
			return noCancel;
		},
		_triggerKeyPress: function (event) { // MaskEditor
			var cursorPosition,
				key = !event.charCode ? event.which : event.charCode,
				ch;
			if (this._super(event)) {
				cursorPosition = this._getCursorPosition();
				if (key === 46 && this._promptCharsIndices.length > 0) { // Delete
					if ($.inArray(cursorPosition, this._promptCharsIndices) !== -1) {
						this._promptCharsIndices = this._promptCharsIndices.splice(
							$.inArray(cursorPosition, this._promptCharsIndices), 1);
					}
				} else if (key === 8 && this._promptCharsIndices.length > 0) { // BackSpace
					if ($.inArray(cursorPosition - 1, this._promptCharsIndices) !== -1) {
						this._promptCharsIndices = this._promptCharsIndices.splice(
							$.inArray(cursorPosition - 1, this._promptCharsIndices), 1);
					}
				} else {
					ch = String.fromCharCode(key);
					if (ch === this.options.unfilledCharsPrompt &&
						$.inArray(cursorPosition, this._promptCharsIndices) === -1) {
						this._promptCharsIndices.push(cursorPosition);
					}
				}
			}
		},
		_validateKey: function (event) {
			var result, ch, key, cursorPosition = this._getCursorPosition();
			if (this._super(event) && this.options.inputMask) {

				// Validate key against the mask
				key = !event.charCode ? event.which : event.charCode;
				if ($.ig.util.isFF && this._validateNonCharacter(event)) {
					result = true;
				} else if (key !== 8 && key !== 46) { // Backspace
					ch = String.fromCharCode(key);
					if (cursorPosition === -1) {

						// In case all the text is selected we set the cursor to 0, so we can continue correctly with the indexes.
						this._editSelectAllStartied = true;
						this._editorValueBeforeClear = this._editorInput.val();
						this._editorInput.val(this._maskWithPrompts);
						cursorPosition++;
					}
					while ($.inArray(cursorPosition, this._literalIndeces) !== -1 ||
						cursorPosition === this._maskWithPrompts.length) {
						cursorPosition++;
					}
					result = this._validateKeyCharAgainstMask(ch,
						cursorPosition, this._unescapedMask);
					if (result === true) {

						// In firefow when key is held down triggers keypress and on rightArrow we need to manually move the cursor to the left.
						if ($.ig.util.isFF && event.keyCode === 37) {

							// Bug 206039
							this._setSelectionRange(this._editorInput[ 0 ],
								cursorPosition, cursorPosition - 1);
						} else {

							// If the key is valid, we selec the next char so we don't extend the value but delete the prompt char.
							this._setSelectionRange(this._editorInput[ 0 ],
								cursorPosition, cursorPosition + 1);
						}
					}
				}
			} else {
				result = false;
			}
			if (result === false && this._editSelectAllStartied) {
				this._editorInput.val(this._editorValueBeforeClear);
				this._editorInput.select();
				delete this._editSelectAllStartied;
				delete this._editorValueBeforeClear;
			}
			if (result === true && this._editSelectAllStartied) {
				delete this._editSelectAllStartied;
				delete this._editorValueBeforeClear;
			}
			return result;
		},

		// We use this method both in edit mode and when validte value
		_validateKeyCharAgainstMask: function (ch, cursorPosition, inputMask) {
			var mask = inputMask || this.options.inputMask, isValid;//,
			if (cursorPosition >= this._maskWithPrompts.length) {

				// The cursor position at the end of the possible value
				isValid = false;
			} else {

				if (this._validateCharOnPostion(ch, cursorPosition, mask) === null) {

					// In that case we need to move to next char on the mask
					isValid = this._validateKeyCharAgainstMask(ch, cursorPosition + 1);

				} else {
					isValid = this._validateCharOnPostion(ch, cursorPosition, mask);
				}
			}
			return isValid;
		},
		_validateCharOnPostion: function (ch, position, inputMask) {
			var maskSymbol, mask, isValid,
				regex,
				inputChar = ch,
				letterOrDigitRegEx = "[\\d\u00C0-\u1FFF\u2C00-\uD7FFa-zA-Z]",
				letterRegEx = "[\u00C0-\u1FFF\u2C00-\uD7FFa-zA-Z]",
				digitRegEx = "[\\d]",
				digitSpecialRegEx = "[\\d_\\+]";
				mask = inputMask || this.options.inputMask;
				maskSymbol = mask.charAt(position);
				switch (maskSymbol) {
					case "C":
					case "&": {
						if (inputChar === "") {
							isValid = false;
						} else {
							isValid = true;
						}
					}
						break;
					case "a":
					case "A": {
						regex = new RegExp(letterOrDigitRegEx);
						if (regex.test(inputChar)) {
							isValid = true;
						} else {
							isValid = false;
						}
					}
						break;
					case "?":
					case "L": {
						regex = new RegExp(letterRegEx);
						if (regex.test(inputChar)) {
							isValid = true;
						} else {
							isValid = false;
						}
					}
						break;
					case "0":
					case "9": {
						regex = new RegExp(digitRegEx);
						if (regex.test(inputChar)) {
							isValid = true;
						} else {
							isValid = false;
						}
					}
						break;
					case "#": {
						regex = new RegExp(digitSpecialRegEx);
						if (regex.test(inputChar)) {
							isValid = true;
						} else {
							isValid = false;
						}
					}
						break;
					default: {

						// Move cursor if possible
						// this._setCursorPosition(cursorPosition + 1);
						// this._validateCharAgainstMask(char, cursorPosition + 1);
						isValid = null;
					}
				}
				return isValid;
		},
		_setOption: function (option, value) { // igMaskEditor
			/* igPercentEditor custom setOption goes here */
			var prevValue = this.options[ option ];
			if (prevValue === value) {
				return;
			}

			// The following line applies the option value to the igWidget meaning you don't
			// have to perform this.options[ option ] = value;
			$.Widget.prototype._setOption.apply(this, arguments);
			switch (option) {
				case "inputMask": {
					this.options[ option ] = prevValue;
					throw new Error($.ig.Editor.locale.cannotSetRuntime);
				}
				case "excludeKeys":
				case "includeKeys":
					this.options[ option ] = prevValue;
					throw new Error($.ig.Editor.locale.cannotSetRuntime);
				default: {

					// In case no propery matches, we call the super. Into the base widget default statement breaks
					this.options[ option ] = prevValue;
					this._super(option, value);
				}
					break;
			}
		},
		_handleBackSpaceKey: function () {
			// Get setlection
			var selection = this._getSelection(this._editorInput[ 0 ]),
				startPostion = selection.start,
				endPosition = selection.end, index = endPosition;
			if (startPostion === endPosition) {
				startPostion--;
			}
			index--;
			for (index; index > startPostion - 1; index--) {
				while ($.inArray(index, this._literalIndeces) !== -1 || index === -1) {
					index--;
				}
				if (index > -1) {
					this._editorInput.val(this._replaceCharAt(this._editorInput.val(),
						index, this.options.unfilledCharsPrompt));
					this._setCursorPosition(index);
				}
			}
		},
		_handleDeleteKey: function (skipCursorPosition) { //MaskEditor
			// Get setlection
			var selection = this._getSelection(this._editorInput[ 0 ]),
				startPostion = selection.start,
				endPosition = selection.end, index = startPostion;
			if (startPostion === endPosition) {

				// In that case we don't have selection, but cursor set and we increase the endCursor so we can enter the loop.
				endPosition++;
			}
			for (index; index < endPosition; index++) {

				while ($.inArray(index, this._literalIndeces) !== -1 &&
					index <= this._maskWithPrompts.length) {
					index++;
				}
				if (index !== this._maskWithPrompts.length) {
					this._editorInput.val(this._replaceCharAt(this._editorInput.val(),
						index, this.options.unfilledCharsPrompt));
					if (!skipCursorPosition) {
						this._setCursorPosition(index + 1);
					}
				} else {
					if (!skipCursorPosition) {
						this._setCursorPosition(index);
					}
				}
			}
		},

		// igMaskEditor public methods
		value: function (newValue) { // Mask Editor
			/* Gets/Sets mask editor value.
				paramType="string" optional="true" New mask editor value.
				returnType="string" Current mask editor value. */
			if (newValue !== undefined) {

				// N.A. 12/1/2015 Bug #207198: Remove notifier when value updated through value method.
				this._clearEditorNotifier();
				if (newValue !== null) {
					this._promptCharsIndices = [];
					newValue = this._parseValueByMask(newValue);
				}
				if (newValue === this._maskWithPrompts) {
					newValue = "";
				}
				this._updateValue(newValue);

				// this._setInitialValue(newValue);
				//In the applyOption there is initial value false to _editMode variable, so the editor input is changed based on the state of the editor.
				//if (this._focused === false || this._focused === undefined) {
					this._editorInput.val(this._editMode ?
						this._maskedValue :
						this._getDisplayValue());
			} else {
				return this.options.value;
			}
		},
		dropDownContainer: function () {
			/*@Skipped@*/
			throw new Error($.ig.Editor.locale.maskEditorNoSuchMethod);
		},
		showDropDown: function () {
			/*@Skipped@*/
			throw new Error($.ig.Editor.locale.maskEditorNoSuchMethod);
		},
		hideDropDown: function () {
			/*@Skipped@*/
			throw new Error($.ig.Editor.locale.maskEditorNoSuchMethod);
		},
		dropDownButton: function () {
			/*@Skipped@*/
			throw new Error($.ig.Editor.locale.maskEditorNoSuchMethod);
		},
		spinUpButton: function () {
			/*@Skipped@*/
			throw new Error($.ig.Editor.locale.maskEditorNoSuchMethod);
		},
		spinDownButton: function () {
			/*@Skipped@*/
			throw new Error($.ig.Editor.locale.maskEditorNoSuchMethod);
		},
		dropDownVisible: function () {
			/*@Skipped@*/
			throw new Error($.ig.Editor.locale.maskEditorNoSuchMethod);
		},
		findListItemIndex: function () {
			/*@Skipped@*/
			throw new Error($.ig.Editor.locale.maskEditorNoSuchMethod);
		},
		selectedListIndex: function () {
			/*@Skipped@*/
			throw new Error($.ig.Editor.locale.maskEditorNoSuchMethod);
		},
		getSelectedListItem: function () {
			/*@Skipped@*/
			throw new Error($.ig.Editor.locale.maskEditorNoSuchMethod);
		},
		spinUp: function () {
			/*@Skipped@*/
			throw new Error($.ig.Editor.locale.maskEditorNoSuchMethod);
		},
		spinDown: function () {
			/*@Skipped@*/
			throw new Error($.ig.Editor.locale.maskEditorNoSuchMethod);
		},
		isValid: function () { //igMaskEditor
		/* Checks if value in editor is valid. Note: This function will not trigger automatic notifications.
			returnType="bool" Whether editor value is valid or not. */
			var value, valid;

			this._skipMessages = true;
			if (this._editMode) {
				value = this.field().val();
				valid = this._validateRequiredPrompts(value);
			} else {
				value = this.options.value;
				valid = this._validateValue(value);
				if (value !== "" && !this._validateRequiredPrompts(this._maskedValue)) {

					// Raise warning not all required fields are entered
					// State - message
					valid = false;
					this._sendNotification("warning", $.ig.Editor.locale.maskMessage);
				}
			}
			this._skipMessages = false;
			return valid;
		}
	});
	$.widget("ui.igDateEditor", $.ui.igMaskEditor, {
		options: {
			/* type="date" Gets/Sets value in editor. Date object can be set as value. String value can be passed and the editor will use the javascript Date object constructor to create date object and will use it as value. MVC date format can be used too. For example Date(/"thicks"/).
				Note! This option doesn't use the displayInputFormat to extract the date. */
			value: null,
			/* type="date" Gets the minimum value which can be entered in editor by user. Date object can be set as value. String value can be passed and the editor will use the javascript Date object constructor to create date object and will use it for the comparison. MVC date format can be used too. For example Date(/"thicks"/).
				Note! This option doesn't use the displayInputFormat to extract the date.
				Note! This option can not be set runtime.
				*/
			minValue: null,
			/* type="date" Gets the maximum value which can be entered in editor by user. Date object can be set as value. String value can be passed and the editor will use the javascript Date object constructor to create date object and will use it for the comparison. MVC date format can be used too. For example Date(/"thicks"/).
				Note! This option doesn't use the displayInputFormat to extract the date.
				Note! This option can not be set runtime.
				*/
			maxValue: null,
			/* type="string"
				Gets/Sets format of date while editor has no focus.
				Value of that option can be set to a specific date pattern or to a flag defined by regional settings.
				If value is not set, then the dateInputFormat is used automatically.
				If value is set to explicit date pattern and pattern besides date-flags has explicit characters which match with date-flags or mask-flags, then the "escape" character should be used in front of them.
				List of predefined regional flags:
				"date": the datePattern member of regional option is used
				"dateLong": the dateLongPattern member of regional option is used
				"time": the timePattern member of regional option is used
				"timeLong": the timeLongPattern member of regional option is used
				"dateTime": the dateTimePattern member of regional option is used
				List of explicit characters, which should have escape \\ character in front of them:
					C, &, a, A, ?, L, 9, 0, #, >, <, y, M, d, h, H, m, s, t, f.
				List of date-flags when explicit date pattern is used:
				"y": year field without century and without leading zero
				"yy": year field without century and with leading zero
				"yyyy": year field with leading zeros
				"M": month field as digit without leading zero
				"MM": month field as digit with leading zero
				"MMM": month field as short month name
				"MMMM": month field as long month name
				"d": day of month field without leading zero
				"dd": day of month field with leading zero
				"ddd": day of the week as short name
				"dddd": day of the week as long name
				"t": first character of string which represents AM/PM field
				"tt": 2 characters of string which represents AM/PM field
				"h": hours field in 12-hours format without leading zero
				"hh": hours field in 12-hours format with leading zero
				"H": hours field in 24-hours format without leading zero
				"HH": hours field in 24-hours format with leading zero
				"m": minutes field without leading zero
				"mm": minutes field with leading zero
				"s": seconds field without leading zero
				"ss": seconds field with leading zero
				"f": milliseconds field in hundreds
				"ff": milliseconds field in tenths
				"fff": milliseconds field
			*/
			dateDisplayFormat: null,
			/* type="string"
				Gets format of date while editor has focus.
				Value of that option can be set to explicit date pattern or to a flag defined by regional settings.
				If value is set to explicit date pattern and pattern besides date-flags has explicit characters which match with date-flags or mask-flags, then the "escape" character should be used in front of them.
				If option is not set, then the "date" is used automatically.
				List of predefined regional flags:
				"date": the datePattern member of regional option is used
				"dateLong": the dateLongPattern member of regional option is used
				"time": the timePattern member of regional option is used
				"timeLong": the timeLongPattern member of regional option is used
				"dateTime": the dateTimePattern member of regional option is used
				List of explicit characters, which should have escape \\ character in front of them: C, &, a, A, ?, L, 9, 0, #, >, <, y, M, d, h, H, m, s, t, f.
				List of date-flags when explicit date pattern is used:
				"y": year field without century and without leading zero
				"yy": year field without century and with leading zero
				"yyyy": year field with leading zeros
				"M": month field as digit without leading zero
				"MM": month field as digit with leading zero
				"MMM": month field as short month name. Note: in focused state the MM is used.
				"MMMM": month field as long month name. Note: in focused state the MM is used.
				"d": day of month field without leading zero
				"dd": day of month field with leading zero
				"ddd": day of the week as short name. Note: in focused state that field is skipped.
				"dddd": day of the week as long name. Note: in focused state that field is skipped.
				"t": first character of string which represents AM/PM field
				"tt": 2 characters of string which represents AM/PM field
				"h": hours field in 12-hours format without leading zero
				"hh": hours field in 12-hours format with leading zero
				"H": hours field in 24-hours format without leading zero
				"HH": hours field in 24-hours format with leading zero
				"m": minutes field without leading zero
				"mm": minutes field with leading zero
				"s": seconds field without leading zero
				"ss": seconds field with leading zero
				"f": milliseconds field in hundreds
				"ff": milliseconds field in tenths
				"fff": milliseconds field
				Note! This option can not be set runtime.
			*/
			dateInputFormat: null,
			/* type="date|editModeText|displayModeText|" Gets type of value returned by the get of value() method. That also affects functionality of the set value(val) method and the copy/paste operations of browser.
				date type="string" The Date object is used. When that mode is set the value send to the server on submit is string value converter from the javascript Date object using "toISOString" method.
				Note: that is used as default.
				displayModeText type="string" The String object is used and the "text" in display mode (no focus) format (pattern).
				editModeText type="string" The String object is used and the "text" in edit mode (focus) format (pattern).
			*/
			dataMode: "date",
			/*type="clear|spin" Gets visibility of spin and clear buttons. That option can be set only on initialization. Combinations like 'spin,clear' are supported too.
				clear type="string" button to clear value is located on the right side of input-field (or left side if base html element has direction:rtl);
				spin type="string" spin buttons are located on the right side of input-field (or left side if base html element has direction:rtl).*/
			buttonType: "none",
			/* type="number" Gets/Sets delta-value which is used to increment or decrement value in editor on spin events. If value is set to negative value an exception is thrown. Non integer value is supported only for dataMode double and float.*/
			spinDelta: 1,
			/* type="bool" Gets/Sets ability to modify only 1 date field on spin events.
				Value false enables changes of other date fields when incremented or decremented date-field reaches its limits.
				Value true modifies only value of one field.
			*/
			limitSpinToCurrentField: false,
			/* type="bool" Gets/Sets formatting of the dates as UTC.
				That option is supported only when dataMode option is 'date' and Date objects are used to get/set value of editor.
				Notes:
				That option affects only functionality of get/set value method and the Date-value, which was set on initialization.
				When application uses the set-value, then internal Date-value and displayed-text is incremented by TimezoneOffset.
				When application uses the get-value, then editor returns internal Date-value decremented by TimezoneOffset.
				When that option is modified after initialization, then displayed text and internal Date-value are not affected.
				It is not recommended to change that option without resetting Date-value.
			*/
			enableUTCDates: false,
			/* type="number" Gets/Sets year for auto detection of 20th and 21st centuries.
				That option is used to automatically fill century when the user entered only 1 or 2 digits into the year field or when the date pattern contains only 1 or 2 year positions, e.g. "yy" or "y".
				If user entered value larger than value of this option, then 20th century is used, otherwise the 21st. */
			centuryThreshold: 29,
			/* type="number" Gets/Sets difference between year in Gregorian calendar and displayed year. */
			yearShift: 0,
			/* @Skipped@ This option is inherited from a parent widget and it's not applicable for igDateEditor */
			isLimitedToListValues: false,
			/* @Skipped@ This option is inherited from a parent widget and it's not applicable for igDateEditor */
			listItemHoverDuration: 0,
			/* @Skipped@ This option is inherited from a parent widget and it's not applicable for igDateEditor */
			listItems: null,
			/* @Skipped@ This option is inherited from a parent widget and it's not applicable for igDateEditor */
			listWidth: 0,
			/* @Skipped@ This option is inherited from a parent widget and it's not applicable for igDateEditor */
			dropDownAnimationDuration: 0,
			/* @Skipped@ This option is inherited from a parent widget and it's not applicable for igDateEditor */
			dropDownAttachedToBody: false,
			/* @Skipped@ This option is inherited from a parent widget and it's not applicable for igDateEditor */
			dropDownOnReadOnly: false,
			/*@Skipped@ This option is inherited from a parent widget and it's not applicable for igDateEditor*/
			inputMask: "CCCCCCCCCC",
			/* @Skipped@ This option is inherited from a parent widget and it's not applicable for igDateEditor */
			unfilledCharsPrompt: "_",
			/* @Skipped@ This option is inherited from a parent widget and it's not applicable for igDateEditor */
			padChar: " ",
			/* @Skipped@ This option is inherited from a parent widget and it's not applicable for igDateEditor */
			emptyChar: " ",
			/* @Skipped@ This option is inherited from a parent widget and it's not applicable for igDateEditor */
			toUpper: false,
			/* @Skipped@ This option is inherited from a parent widget and it's not applicable for igDateEditor */
			toLower: false
		},
		events: {
			/* @Skipped@ This event is inherited from a parent widget and it's not triggered in igDateEditor */
			dropDownListOpening: "dropDownListOpening",
			/* @Skipped@ This event is inherited from a parent widget and it's not triggered in igDateEditor */
			dropDownListOpened: "dropDownListOpened",
			/* @Skipped@ This event is inherited from a parent widget and it's not triggered in igDateEditor */
			dropDownListClosing: "dropDownListClosing",
			/* @Skipped@ This event is inherited from a parent widget and it's not triggered in igDateEditor */
			dropDownListClosed: "dropDownListClosed",
			/* @Skipped@ This event is inherited from a parent widget and it's not triggered in igDateEditor */
			dropDownItemSelecting: "dropDownItemSelecting",
			/* @Skipped@ This event is inherited from a parent widget and it's not triggered in igDateEditor */
			dropDownItemSelected: "dropDownItemSelected"
		},
		_create: function () { // igDateEditor

			$.ui.igMaskEditor.prototype._create.call(this);
		},
		_initialize: function () {
			this._super();
			this._applyRegionalSettings();
			this.options.inputMask =
				this._convertDateMaskToDigitMask(this.options.dateInputFormat);
			this._setNumericType();

			// RegEx for /Date(milisecond)/
			this._mvcDateRegex = /^\/Date\((.*?)\)\/$/i;
		},
		_setNumericType: function () {
			this._numericType = "datetime";
		},
		_setOption: function (option, value) { // igDateEditor
			/* igDateEditor custom setOption goes here */
			var prevValue = this.options[ option ];
			if ($.type(prevValue) === "date") {
				var date = this._getDateObjectFromValue(value);
				if ($.type(date) === "date" && (prevValue.getTime() === date.getTime())) {
					return;
				}
			} else if (prevValue === value) {
				return;
			}

			// The following line applies the option value to the igWidget meaning you don't
			// have to perform this.options[ option ] = value;
			$.Widget.prototype._setOption.apply(this, arguments);
			switch (option) {
				case "minValue": {
					this.options[ option ] = prevValue;
					throw new Error($.ig.Editor.locale.dateEditorMinValue);
				}
				case "maxValue": {
					this.options[ option ] = prevValue;
					throw new Error($.ig.Editor.locale.dateEditorMaxValue);
				}
					break;
				case "dateInputFormat": {
					this.options[ option ] = prevValue;
					throw new Error($.ig.Editor.locale.cannotSetRuntime);
				}
					break;
				default: {

					// In case no propery matches, we call the super. Into the base widget default statement breaks
					this.options[ option ] = prevValue;
					this._super(option, value);
				}
					break;
			}
		},
		_applyRegionalSettings: function () { //DateEditor
			var format;
			if (this.options.dateInputFormat !== null) {
				format = this.options.dateInputFormat;
				if (format === "date" || format === "dateLong" || format === "dateTime" ||
					format === "time" || format === "timeLong") {
					this.options.dateInputFormat = this._getRegionalOption(format + "Pattern");
				}
			} else {
				this.options.dateInputFormat = this._getRegionalOption("datePattern");
			}
			if (this.options.dateDisplayFormat !== null) {
				format = this.options.dateDisplayFormat;
				if (format === "date" || format === "dateLong" || format === "dateTime" ||
					format === "time" || format === "timeLong") {
					this.options.dateDisplayFormat = this._getRegionalOption(format + "Pattern");
				}
			} else {
				this.options.dateDisplayFormat = this.options.dateInputFormat;
			}
		},
		_setInitialValue: function (value) { //igDateEditor
			this._maskWithPrompts = this._parseValueByMask("");
			this._getMaskLiteralsAndRequiredPositions();
			if (value === null || value === "" || typeof value === "undefined") {
				this._maskedValue = "";
			} else {
				//check value
				if (this._validateValue(value)) {
					this._updateValue(this._getDateObjectFromValue(value));

					// Update maskedValue according to the new value.
					this._updateMaskedValue();
				}
				this._editorInput.val(this._getDisplayValue());
			}
		},
		_applyOptions: function () { // DateEditor
			this._super();
			if (this.options.centuryThreshold > 99 || this.options.centuryThreshold < 0) {
				this.options.centuryThreshold = 29;
				console.log($.ig.Editor.locale.centuryThresholdValidValues);
			}
			if (this.options.minValue) {
				if (!this._isValidDate(new Date(this.options.minValue))) {
					throw new Error($.ig.Editor.locale.invalidDate);
				} else {
					this.options.minValue = this._getDateObjectFromValue(this.options.minValue);
				}
			}
			if (this.options.maxValue) {
				if (!this._isValidDate(new Date(this.options.maxValue))) {
					throw new Error($.ig.Editor.locale.invalidDate);
				} else {
					this.options.maxValue = this._getDateObjectFromValue(this.options.maxValue);
				}
			}
			if (this._maskWithPrompts === undefined) {
				this._setInitialValue();
			}
		},
		_triggerKeyDown: function (event) { //DateEditor
			var key = !event.charCode ? event.which : event.charCode,
				noCancel;

			// N.A. 3/9/2016 Bug #215523: Cancel keyDown event in the derived editors.
			noCancel = this._super(event);
			if (noCancel) {

				// TODO: Optimize this method together with _triggerKeyDown in the igDatePicker.
				if (key === 38 && !(this instanceof $.ui.igDatePicker)) {
					this._spinUpEditMode();
				}
				if (key === 40 && !(this instanceof $.ui.igDatePicker)) {
					this._spinDownEditMode();
				}
				if (key === 13) {
					this._enterEditMode();
				}
			}
			return noCancel;
		},
		_handleSpinUpEvent: function () { // DateEditor
			this.spinUp(1);
		},
		_handleSpinDownEvent: function () { // DateEditor
			this.spinDown(1);
		},
		_replaceDisplayValue: function (selection, previousValue, newValue) {
			var value = previousValue, currentIndex = selection.start, currentChar,
				charCode, charIndex = 0, newChar;
			newValue = newValue.toString();
			while (currentIndex < previousValue.length && charIndex < newValue.length) {
				currentChar = previousValue.charAt(currentIndex);
				charCode = previousValue.charCodeAt(currentIndex);
				newChar = newValue.charAt(charIndex);
				if (charCode >= 48 && charCode <= 57 || currentChar === "_") {
					value = value.substring(0, currentIndex) + newChar +
						value.substring(currentIndex + 1, previousValue.length);
					charIndex++;
				}
				currentIndex++;
			}
			return value;
		},

		// Flag to get/set specific date field (year, month, day, hours, minutes, seconds, milliseconds)
		// date DateObject
		_getDateField: function (flag, date) {
			var utc = this.options.enableUTCDates, shift = this.options.yearShift, year;

				if (!date) {
					date = this._dateObjectValue;
				}
				if (!date) {
					return null;
				}

				//// set into datepicker
				//	if (f === -1) {
				//		return (date && utc) ? new Date(date.getTime() + date.getTimezoneOffset() * 60000) : date;
				//	}
				//// now
				//if (!date) {
				//	date = new Date();
				//	if (utc) {
				//		date.setUTCMinutes(date.getUTCMinutes() - date.getTimezoneOffset());
				//	}
				//	return date;
				//}

				if (flag === "year") {
					year = utc ? date.getUTCFullYear() : date.getFullYear();
					if (shift) {
						year += shift;
					}
					return year;
				}
				if (flag === "month") {
					return utc ? date.getUTCMonth() : date.getMonth();
				}
				if (flag === "day") {
					return utc ? date.getUTCDay() : date.getDay();
				}
				if (flag === "date") {
					return utc ? date.getUTCDate() : date.getDate();
				}
				if (flag === "hours") {
					return utc ? date.getUTCHours() : date.getHours();
				}
				if (flag === "minutes") {
					return utc ? date.getUTCMinutes() : date.getMinutes();
				}
				if (flag === "seconds") {
					return utc ? date.getUTCSeconds() : date.getSeconds();
				}
				return utc ? date.getUTCMilliseconds() : date.getMilliseconds();
		},

		// This method sets specific field and returns the date
		_setDateField: function(flag, date, newValue) {
			var utc = this.options.enableUTCDates, shift = this.options.yearShift;
			if (!date) {
				date = this._dateObjectValue;
			}
			if (flag === "year") {
				if (shift) {
					newValue -= shift;
				}
				if (utc) {
					date.setUTCFullYear(newValue);
				} else {
					date.setFullYear(newValue);
				}
			}
			if (flag === "month") {
				if (utc) {
					date.setUTCMonth(newValue);
				} else {
					date.setMonth(newValue);
				}
			}
			if (flag === "date") {
				if (utc) {
					date.setUTCDate(newValue);
				} else {
					date.setDate(newValue);
				}
			}
			if (flag === "hours") {
				if (utc) {
					date.setUTCHours(newValue);
				} else {
					date.setHours(newValue);
				}
			}
			if (flag === "minutes") {
				if (utc) {
					date.setUTCMinutes(newValue);
				} else {
					date.setMinutes(newValue);
				}
			}
			if (flag === "seconds") {
				if (utc) {
					date.setUTCSeconds(newValue);
				} else {
					date.setSeconds(newValue);
				}
			}
			if (flag === "milliseconds") {
				if (utc) {
					date.setUTCMilliseconds(newValue);
				} else {
					date.setMilliseconds(newValue);
				}
			}
			return date;
		},
		_getInternalMaskedValue: function (newDate) {
			return this._updateMaskedValue(newDate, true);
		},
		_updateMaskedValue: function (newDate, returnValue) {

			// This method updated maskwith prompts according to te set new date value
			var currentMaskValue = this._maskWithPrompts ?
					this._maskWithPrompts :
					this._parseValueByMask(""),
				dateObj, year, month, day, hours, minutes, seconds, milliseconds;
			dateObj = newDate ? newDate : this._dateObjectValue;

			// TODO update all the fields
			if (dateObj) {
				if (this._dateIndices.yy !== undefined) {
					year = this._getDateField("year", dateObj).toString();
					if (this._dateIndices.fourDigitYear) {

						// T.P. 29th Jan 2016 Bug #212642 When the year is 3 digit for example (111) we need to add extra zero in fron of the value, so in edit mode it's displayed correctly
						if (year.toString().length < 4) {
							while (year.toString().length < 4) {
								year = "0" + year;
							}
						}
						currentMaskValue = this._replaceStringRange(currentMaskValue,
							year, this._dateIndices.yy, this._dateIndices.yy + 3);
					} else {
						year = year.substring(2);
						currentMaskValue = this._replaceStringRange(currentMaskValue,
							year, this._dateIndices.yy, this._dateIndices.yy + 1);
					}
				}
				if (this._dateIndices.MM !== undefined) {
					month = this._getDateField("month", dateObj);
					month++;
					if (month < 10) {
						month = "0" + month.toString();
					} else {
						month = month.toString();
					}
					currentMaskValue = this._replaceStringRange(currentMaskValue,
						month, this._dateIndices.MM, this._dateIndices.MM + 1);
				}
				if (this._dateIndices.dd !== undefined) {
					day = this._getDateField("date", dateObj);
					if (day < 10) {
						day = "0" + day.toString();
					} else {
						day = day.toString();
					}
					currentMaskValue = this._replaceStringRange(currentMaskValue,
						day, this._dateIndices.dd, this._dateIndices.dd + 1);
				}
				if (this._dateIndices.hh !== undefined) {
					hours = this._getDateField("hours", dateObj);
					if (!this._dateIndices.hh24 && hours > 12) {
						hours -= 12;
					}

					// N.A. 3/8/2016 Bug #215548: In 12 hour mode, there isn't 00:00 AM hour, it should be 12:00 AM.
					if (!this._dateIndices.hh24 && hours === 0) {
						hours = 12;
					}
					if (hours < 10) {
						hours = "0" + hours.toString();
					} else {
						hours = hours.toString();
					}
					currentMaskValue = this._replaceStringRange(currentMaskValue,
						hours, this._dateIndices.hh, this._dateIndices.hh + 1);
				}
				if (this._dateIndices.mm !== undefined) {
					minutes = this._getDateField("minutes", dateObj);
					if (minutes < 10) {
						minutes = "0" + minutes.toString();
					} else {
						minutes = minutes.toString();
					}
					currentMaskValue = this._replaceStringRange(currentMaskValue,
						minutes, this._dateIndices.mm, this._dateIndices.mm + 1);
				}
				if (this._dateIndices.ss !== undefined) {
					seconds = this._getDateField("seconds", dateObj);
					if (seconds < 10) {
						seconds = "0" + seconds.toString();
					} else {
						seconds = seconds.toString();
					}
					currentMaskValue = this._replaceStringRange(currentMaskValue,
						seconds, this._dateIndices.ss, this._dateIndices.ss + 1);
				}
				if (this._dateIndices.tt !== undefined) {
					hours = this._getDateField("hours", dateObj);

					// N.A. 3/16/2016 Bug #216017: When we are in the 12 hour format, then 12 o'clock is PM and 24 (00) o'clock is AM.
					if (hours >= 12 && hours < 24) {

						// PM
						if (this._dateIndices._ttLength === 1) {

							// _replaceCharAt
							currentMaskValue = this._replaceCharAt(currentMaskValue,
								this._dateIndices.tt, "P");
						} else {
							currentMaskValue = this._replaceStringRange(currentMaskValue,
								"PM", this._dateIndices.tt, this._dateIndices.tt + 1);
						}
					} else {
						// AM
						if (this._dateIndices._ttLength === 1) {
							// _replaceCharAt
							currentMaskValue = this._replaceCharAt(currentMaskValue,
								this._dateIndices.tt, "A");
						} else {
							currentMaskValue = this._replaceStringRange(currentMaskValue,
								"AM", this._dateIndices.tt, this._dateIndices.tt + 1);
						}
					}
				}
				if (this._dateIndices.ff !== undefined) {
					milliseconds = this._getDateField("milliseconds", dateObj);
					if (this._dateIndices.ffLength === 1) {
						currentMaskValue = this._replaceCharAt(currentMaskValue,
							this._dateIndices.ff,
							this._getMilliseconds(milliseconds, 100).toString());
					} else if (this._dateIndices.ffLength === 2) {
						currentMaskValue = this._replaceStringRange(currentMaskValue,
							this._getMilliseconds(milliseconds, 10).toString(),
								this._dateIndices.ff, this._dateIndices.ff + 1);
					} else {
						currentMaskValue = this._replaceStringRange(currentMaskValue,
							this._getMilliseconds(milliseconds, 1).toString(),
								this._dateIndices.ff, this._dateIndices.ff + 2);
					}
				}
			}

			// That check is needed in case we want to return the maskedvalue without setting it.
			if (returnValue === true) {
				return currentMaskValue;
			} else {
				this._maskedValue = currentMaskValue;
			}
		},

		// This method is used to get indices of the date groups within the mask and to convert the date mask into a mask with digit flags valid for igMaskEditor
		_convertDateMaskToDigitMask: function (mask) {
			var x, i, j, flag = -1, txt = "", maskVal = mask;
			if (!maskVal) {
				maskVal = "";
			}
			maskVal = maskVal.replace("dddd", "ddd").replace("ddd,", "").replace("ddd ", "")
						.replace(" ddd", "").replace("ddd", "");

			this._dateIndices = {};
			this._dateIndices.fourDigitYear = false;

			// temporary replace \\f,d,s,m,etc. by \x01-\x09
			maskVal = maskVal.replace(/\x08/g, " ").replace(/\x09/g, " ");
			maskVal = maskVal.replace(/\\f/g, "\x01").replace(/\\d/g, "\x02")
				.replace(/\\s/g, "\x03").replace(/\\m/g, "\x04")
				.replace(/\\t/g, "\x05").replace(/\\H/g, "\x06")
				.replace(/\\h/g, "\x07").replace(/\\M/g, "\x08").replace(/\\y/g, "\x09");

			// 01-y,02-yy,03-yyyy,04-M,05-MM,06-MMM,07-MMMM,08-d,09-dd
			// 10-h,11-hh,12-H,13-HH,14-t,15-tt,16-m,17-mm,18-s,19-ss
			// 20-ddd,21-dddd,22-f,23-ff,24-fff
			// Temporary remove 0 and 9, as they are valid mask flags

			maskVal = maskVal.replace(/9/g, "\x11").replace(/0/g, "\x12");
			maskVal = maskVal.replace("fff", "24").replace("ff", "23").replace("f", "22");
			maskVal = maskVal.replace("dddd", "").replace("ddd", "").replace("dd", "09")
				.replace("d", "08").replace("ss", "19").replace("s", "18")
				.replace("mm", "17").replace("m", "16");
			maskVal = maskVal.replace("tt", "15").replace("t", "14").replace("HH", "13")
				.replace("H", "12").replace("hh", "11").replace("h", "10");
			maskVal = maskVal.replace("MMMM", "MM").replace("MMM", "MM")
				.replace("MM", "05").replace("M", "04");
			maskVal = maskVal.replace("yyyy", "03").replace("yy", "02").replace("y", "01");

			// Restore original \\f,d,s,m,etc.
			maskVal = maskVal.replace(/\x01/g, "g").replace(/\x02/g, "d").replace(/\x03/g, "s")
				.replace(/\x04/g, "m").replace(/\x05/g, "t").replace(/\x06/g, "H")
				.replace(/\x07/g, "h").replace(/\x08/g, "M").replace(/\x09/g, "y");

			for (i = 0, j = 0; i < maskVal.length; i++, j++) {
				x = maskVal.charCodeAt(i);
				if (x < 48 || x > 57) {
					flag = maskVal.charAt(i);
						if (flag === "\\" && i + 1 < maskVal.length &&
							($.inArray(maskVal.charAt(i + 1), this._maskFlagsArray) !== -1) || //Escaped mask flag
							maskVal.charAt(i + 1) === "\x11" || // Temporary removed 9
							maskVal.charAt(i + 1) === "\x12") { // Temporary removed 0
							j--;
						}
						txt += maskVal.charAt(i);
					continue;
				}

				// Generate flag (Still using VS functionality )
				flag = (x - 48) * 10 + maskVal.charCodeAt(++i) - 48;
				if (flag === 14) {
					txt += "L";

				} else if (flag === 15) {
					txt += "LL";

				} else if (flag === 22) {
					txt += "0";
				} else {
					txt += "00";
					if (flag === 3) {
						txt += "00";
					}
					if (flag === 24) {
						txt += "0";
					}
				}

				// 01-y,02-yy,03-yyyy,04-M,05-MM,06-MMM,07-MMMM,08-d,09-dd
				// 10-h,11-hh,12-H,13-HH,14-t,15-tt,16-m,17-mm,18-s,19-ss
				// 20-ddd,21-dddd,22-f,23-ff,24-fff
				// TODO discuss if we want to throw an w
				switch (flag) {

					// 4, 5, 6, 7
					// 04-M,05-MM,06-MMM,07-MMMM
					case 4:
					case 5:
					case 6:
					case 7: {
						if (this._dateIndices.MM) {
							j++;
							break;
						} else {
							this._dateIndices.MM = j;
							j++;
						}
					}
						break;
					case 8:
					case 9:
					case 20:
					case 21: {
						if (this._dateIndices.dd) {
							j++;
							break;
						} else {
							this._dateIndices.dd = j;
							j++;
						}
					}
						break;
					case 1:
					case 2: {
						if (this._dateIndices.yy) {
							j++;
							break;
						} else {
							this._dateIndices.yy = j;
							j++;
							this._dateIndices.fourDigitYear = false;
						}
					}
						break;
					case 3: {
						if (this._dateIndices.yy) {
							j += 3;
							break;
						} else {
							this._dateIndices.yy = j;
							j += 3;
							this._dateIndices.fourDigitYear = true;
						}
					}
						break;
					case 14: { // t
						if (this._dateIndices.tt) {
							break;
						} else {
							this._dateIndices.tt = j;
							j++;

							// Flag representing am/pm field
							this._dateIndices._ttLength = 1;
						}
					}
						break;
					case 15: { // tt
						if (this._dateIndices.tt) {
							j++;
							break;
						} else {
							this._dateIndices.tt = j;
							j++;

							// Flag representing am/pm field
							this._dateIndices._ttLength = 2;
						}
					}
						break;

						// 10-h,11-hh,12-H,13-HH,14-t,15-tt,16-m,17-mm,18-s,19-ss
					case 10: //h
					case 11: { // hh
						if (this._dateIndices.hh) {
							j += 2;
							break;
						} else {
							this._dateIndices.hh = j;

							// This flag is used to distinguish if the hours are in 24 hours format or 12 hours
							this._dateIndices.hh24 = false;
							j++;
						}
					}
						break;
					case 12: // H
					case 13: { // HH
						if (this._dateIndices.hh) {
							j += 2;
							break;
						} else {
							this._dateIndices.hh = j;

							// This flag is used to distinguish if the hours are in 24 hours format or 12 hours
							this._dateIndices.hh24 = true;
							j++;
						}
					}
						break;
					case 16: // m
					case 17: { //mm
						if (this._dateIndices.mm) {
							j++;
							break;
						} else {
							this._dateIndices.mm = j;
							j++;
						}
					}
						break;
					case 18: //s
					case 19: {//ss
						if (this._dateIndices.ss) {
							j++;
							break;
						} else {
							this._dateIndices.ss = j;
							j++;
						}
					}
						break;

						//22 - f, 23 - ff, 24 - fff
					case 22: {
						if (this._dateIndices.ff) {
							break;
						} else {
							this._dateIndices.ff = j;
							this._dateIndices.ffLength = 1;
						}
					}
						break;
					case 23: {
						if (this._dateIndices.ff) {
							j++;
							break;
						} else {
							this._dateIndices.ff = j;
							this._dateIndices.ffLength = 2;
							j++;
						}
					}
						break;
					case 24: {
						if (this._dateIndices.ff) {
							j += 2;
							break;
						} else {
							this._dateIndices.ff = j;
							this._dateIndices.ffLength = 3;
							j += 2;
						}
					}
						break;
					default:
				}
			}

			// Restore temporary removed 0 and 9 flags.
			txt = txt.replace(/\x11/g, 9).replace(/\x12/g, 0);
			return txt;
		},
		_getRegionalOption: function (key) { // igDateEditor
			var regional = this.options.regional;
			if (this.options[ key ]) {
				return this.options[ key ];
			}
			if (typeof regional === "string") {
				regional = $.ig.regional[ regional ];
			}
			if (regional && regional[ key ]) {
				return regional[ key ];
			} else {

				// return defaults
				return $.ig.regional.defaults[ key ];
			}
		},
		_validateKey: function (event) {
			var result = true, ch, key, cursorPosition;
			if (this._super(event) === true) {
				cursorPosition = this._getCursorPosition();

				// TODO add all needed checks for indices /left
				// For every pair we check if the current index is in the array for month fields, or the previous index is in the array. if we have dd, as a mask and we have alredy entered 1, when we type 5 - current cursor position is not in the list so we check if the previous one is in the list and pass the validation to month validateion.
				if (cursorPosition === this._dateIndices.MM ||
					(cursorPosition - 1) === this._dateIndices.MM) {

					// ValidateMonthInput
					result = this._validateMonthInput(event, cursorPosition);
				} else if (cursorPosition === this._dateIndices.dd ||
					(cursorPosition - 1) === this._dateIndices.dd) {

					// ValidateDayInput
					result = this._validateDayInput(event, cursorPosition);
				} else if (cursorPosition === this._dateIndices.hh ||
					(cursorPosition - 1) === this._dateIndices.hh) {

					// ValidateHoursInput
					result = this._validateHoursInput(event, cursorPosition);
				} else if (cursorPosition === this._dateIndices.mm ||
					(cursorPosition - 1) === this._dateIndices.mm) {

					// ValidateMinutesInput
					result = this._validateMinutesInput(event, cursorPosition);
				} else if (cursorPosition === this._dateIndices.ss ||
					(cursorPosition - 1) === this._dateIndices.ss) {

					// ValidateSeconsInput
					result = this._validateSecondsInput(event, cursorPosition);
				} else if (cursorPosition === this._dateIndices.tt ||
					(cursorPosition - 1) === this._dateIndices.tt) {

					// ValidateMidDayInput and process
					result = this._validateMidDayInput(event, cursorPosition);

					// In case the value is valid and the field contains 2 chars we need to type the m
					if (result === true) {
						//We might insert only m after the current position
						key = !event.charCode ? event.which : event.charCode;
						ch = String.fromCharCode(key);
						if (ch.toLocaleLowerCase() === "a") {
							this._editorInput.val(this._replaceCharAt(this._editorInput.val(),
								cursorPosition, "A"));
				} else {
							this._editorInput.val(this._replaceCharAt(this._editorInput.val(),
								cursorPosition, "P"));
						}
						if (this._dateIndices._ttLength === 2) {
							this._editorInput.val(this._replaceCharAt(this._editorInput.val(),
								++cursorPosition, "M"));

						}
						this._setCursorPosition(++cursorPosition);
						event.preventDefault();
					}
				} else {
					result = true;
				}

				if (result === null) {
					cursorPosition++;
					while ($.inArray(cursorPosition, this._literalIndeces) !== -1 ||
						cursorPosition === this._maskWithPrompts.length) {
						cursorPosition++;
					}
					this._setCursorPosition(cursorPosition);
					result = this._validateKey(event);
				}

				// In case the key is valid according to te parent method the symbol after the cursor position gets selected and if the key is not valid we are setting the cursor position to remain the same without seelection
				if (result === false) {
					this._setCursorPosition(cursorPosition);
				}
			} else {
				result = false;
			}
			return result;
		},
		_setBlur: function (event) { //DateEditor
			var newValue, oldVal, convertedDate;
			if (this._cancelBlurOnInput) {
				this._editorInput.focus();
				delete this._cancelBlurOnInput;
			} else {
				this._triggerBlur(event);
				newValue = $(event.target).val();
				oldVal = this._dateObjectValue;

				convertedDate = this._parseDateFromMaskedValue(newValue);

				// #206308 in case newValiue == maskWithPrompts it's either clear value, or just exiting edit mode without entering value.
				if (newValue === this._maskWithPrompts) {
					if (oldVal) {
						this._processValueChanging(newValue);
					}
				} else if (!oldVal) {
					this._processValueChanging(newValue);
				} else if (convertedDate !== "" && convertedDate - oldVal !== 0) {
					this._processValueChanging(newValue);
				}
				this._exitEditMode();

				// TODO: There is no dropdown functionality in the igDateEditor should be removed !!!
				////In case our dropdown is opened we need to close it.

				this._focused = false;
				this._clearTimeouts();
				if (this._validator) { // TODO VERIFY
					this._validator._validateInternal(this.element, event, true);
				}
			}
		},
		_validateDayInput: function (event, position) {
			var /*cursor = position ? position : this._getCursorPosition(), */result = false,
				key = !event.charCode ? event.which : event.charCode,
				ch = String.fromCharCode(key),
				num = parseInt(ch),
				charAtCurrentPosition = parseInt(this._editorInput.val().charAt(position)),
				charAtPreviousPosition, charAtNextPosition;

			if (position === this._dateIndices.dd) {
				if (num < 4) {
					charAtNextPosition = parseInt(this._editorInput.val().charAt(position + 1));
					if (!isNaN(charAtNextPosition) && charAtNextPosition > 1 && num === 3) {

						// In that case we have valid digit ot first position but entering 37 as a day is not valid
						result = null;
					} else {
						result = true;
					}
				} else {
					if (!isNaN(charAtCurrentPosition) && charAtCurrentPosition === 3) {

						// In that case we have, 3 on first position and we know the the entered number is greater than 3, which is not valid and we want to move the index to the next group
						result = null;
					} else {
						this._setSelectionRange(this._editorInput[ 0 ],
							position + 1, position + 2);
						result = true;
					}
				}
			} else {

				// We need to check the previous char (digit) and if it's 3
				charAtPreviousPosition = parseInt(this._editorInput.val().charAt(position - 1));
				if (!isNaN(charAtPreviousPosition) && charAtPreviousPosition === 3) {
					// If the previous digit is 3 the only valid digits are 0 and 1,
					if (num === 0 || num === 1) {
						result = true;
					} else {

						// In that case the digit is not valid in case first digit in the group remains - so we delete the first digit and proceed with the entry
						this._setCursorPosition(position - 1);
						this._handleDeleteKey();
						this._setSelectionRange(this._editorInput[ 0 ], position, position + 1);
						result = true;
					}
				} else {
					result = true;
				}
			}
			return result;
		},
		_validateMonthInput: function (event, position) {
			var result = false,
				key = !event.charCode ? event.which : event.charCode,
				ch = String.fromCharCode(key),
				num = parseInt(ch),
				charAtCurrentPosition = parseInt(this._editorInput.val().charAt(position)),
				charAtPreviousPosition, charAtNextPosition;
			position = position ? position : this._getCursorPosition();
			if (position === this._dateIndices.MM) { //the cursor is on the first pair
				if (num < 2) {
					charAtNextPosition = parseInt(this._editorInput.val().charAt(position + 1));
					if (!isNaN(charAtNextPosition) && charAtNextPosition > 2 && num === 1) {

						// In that case we have valid digit ot first position but entering 17 as a month is not valid
						result = null;
					} else {
						result = true;
					}
				} else {

					if (!isNaN(charAtCurrentPosition) && charAtCurrentPosition === 1) {

						// In that case we have, 1 on first position and we know the the entered number is greater than 3, which is not valid and we want to move the index to the next group
						if (num === 2) {
							result = true;
						} else {
							result = null;
						}
					} else if (this._editorInput.val().charAt(position) ===
						this.options.unfilledCharsPrompt) {
						if (num < 2) {
							result = true;
						} else {
							result = null;
						}
					} else {

						// First position is either empty, or 0, so all the digits are valid for month.
						this._setSelectionRange(this._editorInput[ 0 ],
							position + 1, position + 2);
						result = true;
					}
				}
			} else {

				// We need to check the previous char (digit) and if it's 3
				charAtPreviousPosition = parseInt(this._editorInput.val().charAt(position - 1));
				if (!isNaN(charAtPreviousPosition) && charAtPreviousPosition === 1) {

					// If the previous digit is 1 the only valid digits are 0, 1 and 2;
					if (num === 0 || num === 1 || num === 2) {
						result = true;
					} else {

						// In that case the digit is not valid in case first digit in the group remains - so we delete the first digit and proceed with the entry
						this._setCursorPosition(position - 1);
						this._handleDeleteKey();
						this._setSelectionRange(this._editorInput[ 0 ], position, position + 1);
						result = true;
					}
				} else {
					result = true;
				}
			}
			return result;
		},
		_validateMidDayInput: function (event, position) {
			var result = false,
				key = !event.charCode ? event.which : event.charCode,
				ch = String.fromCharCode(key);

			position = position ? position : this._getCursorPosition();
			if (position === this._dateIndices.tt) { //the cursor is on the first pair
				if (ch.toString().toLocaleLowerCase() === "a" || ch.toString().toLocaleLowerCase() === "p") {
					result = true;
				} else {
					result = false;
				}
			} else {

				// In that case we are in the second pair and we can't distinguish what the user wants to enter as the second letter is alwayas "m" (am/pm). so the result is null and the cursor will be moved to the next possible position
				result = null;
			}
			return result;
		},
		_validateHoursInput: function (event, position) {
			var result = false,
					key = !event.charCode ? event.which : event.charCode,
					ch = String.fromCharCode(key),
					num = parseInt(ch),
					charAtPreviousPosition, charAtNextPosition;

			position = position ? position : this._getCursorPosition();
			if (position === this._dateIndices.hh) {

				// The 24 hours format
				if (this._dateIndices.hh24) {
					if (num === 0 || num === 1) {
						result = true;
					} else if (num === 2) {
						charAtNextPosition = parseInt(this._editorInput.val().charAt(position + 1));
						if (!isNaN(charAtNextPosition) && charAtNextPosition > 4 ) {

							// In that case we have valid digit ot first position but entering 37 as a day is not valid
							result = null;
						} else {
							result = true;
						}
					} else {
						result = null;
					}
				} else {

					// 12 hour format
					if (num === 0) {
						result = true;
					} else if (num === 1) {
						charAtNextPosition = parseInt(this._editorInput.val().charAt(position + 1));
						if (!isNaN(charAtNextPosition) && charAtNextPosition > 2) {

							// In that case we have valid digit ot first position but entering 37 as a day is not valid
							result = null;
						} else {
							result = true;
						}
					} else {
						result = null;
					}
				}
			} else {
				charAtPreviousPosition = parseInt(this._editorInput.val().charAt(position - 1));
				if (this._dateIndices.hh24) {
					if (!isNaN(charAtPreviousPosition) && charAtPreviousPosition === 2) {

						// If the previous digit is 2 the only valid digits are 0 and 1, 2, 3 and 4
						if (num <= 4) {
							result = true;
						} else {

							// We need to use this flag to move the cursor to the next group
							result = true;
							this._setCursorPosition(position - 1);
							this._handleDeleteKey();
							this._setSelectionRange(this._editorInput[ 0 ], position, position + 1);
						}
					} else {
						result = true;
					}
				} else {
					if (!isNaN(charAtPreviousPosition) && charAtPreviousPosition === 1) {
						// If the previous digit is 1 the only valid digits are 0 and 1 and 2
						if (num <= 2) {
							result = true;
						} else {
							// We need to use this flag to move the cursor to the next group
							this._setCursorPosition(position - 1);
							this._handleDeleteKey();
							this._setSelectionRange(this._editorInput[ 0 ], position, position + 1);
							result = true;

						}
					} else {
						result = true;
					}
				}

			}
			return result;
		},
		_validateMinutesInput: function (event, position) {
			var result = false,
					key = !event.charCode ? event.which : event.charCode,
					ch = String.fromCharCode(key),
					num = parseInt(ch);

			position = position ? position : this._getCursorPosition();
			if (position === this._dateIndices.mm) {

				if (num < 6) {
					result = true;
				} else {
					result = true;
					this._handleDeleteKey();
					this._setSelectionRange(this._editorInput[ 0 ], position + 1, position + 2);
				}
			} else {
				result = true;
			}
			return result;
		},
		_validateSecondsInput: function (event, position) {
			var result = false,
					key = !event.charCode ? event.which : event.charCode,
					ch = String.fromCharCode(key),
					num = parseInt(ch);

			position = position ? position : this._getCursorPosition();
			if (position === this._dateIndices.ss) {
				if (num < 6) {
					result = true;
				} else {
					this._handleDeleteKey();
					this._setSelectionRange(this._editorInput[ 0 ], position + 1, position + 2);
					result = true;
				}
			} else {
				result = true;
			}
			return result;
		},
		_fillCentury: function (year) {
			if (!isNaN(year)) {
				if (year >= 0 && year <= this.options.centuryThreshold) {
					year = 2000 + year;
				} else if (year < 100) {
					year = 1900 + year;
				}
			}
			return year;
		},
		_triggerKeyPress: function (event) { // DateEditor
			if (event.keyCode === 13) {
				this._processInternalValueChanging(this._editorInput.val());
			} else {
				this._super(event);
			}
		},
		_triggerInternalValueChange: function (value) { //DateEditor
			if (value === this._maskWithPrompts) {
				value = "";
			}
			var noCancel = this._triggerValueChanging(value);
			if (noCancel) {
				this._processInternalValueChanging(value);

				// We pass the new value in order to have the original value into the arguments
				this._triggerValueChanged(value);
			}
		},
		_processInternalValueChanging: function (value) { //DateEditor

			// value = this._parseDateFromMaskedValue(value);
			var parsedVal, cursorPosition;
			if (value === "") { //Empty string is passed only when the value from the _triggerInternalValueChange is equal to the empty mask with prompts
				cursorPosition = this._getCursorPosition();
				this._clearValue();
				if (this._focused && cursorPosition !== undefined) {
					// Bug #207321 If all the text is selected and the value is cleared the cursor is positioned on the first place
					cursorPosition = cursorPosition === -1 ? cursorPosition++ : cursorPosition;
					this._setCursorPosition(cursorPosition);
				}
				return;
			}
			if ($.type(value) === "date") {
				parsedVal = value;
			} else {
				parsedVal = this._parseDateFromMaskedValue(value);
			}
			if (this._isValidDate(parsedVal)) {
				if (this.options.maxValue && parsedVal > this.options.maxValue) {
					parsedVal = this._getDateObjectFromValue(this.options.maxValue);
					this._sendNotification("warning",
						$.ig.util.stringFormat($.ig.Editor.locale.maxValExceedSetErrMsg,
							this._getDisplayValue(new Date(this.options.maxValue))));
				} else if (this.options.minValue && parsedVal < this.options.minValue) {
					parsedVal = this._getDateObjectFromValue(this.options.minValue);
					this._sendNotification("warning",
					$.ig.util.stringFormat($.ig.Editor.locale.minValExceedSetErrMsg,
							this._getDisplayValue(new Date(this.options.minValue))));
				}
			}
			if (this._validateValue(parsedVal)) {
				this._updateValue(parsedVal);
			} else {

				// If the value is not valid, we clear the editor
				if (this.options.revertIfNotValid) {
					value = this._valueInput.val();
					this._updateValue(value);
				} else {
					this._clearValue();
					value = this._valueInput.val();
				}
			}
		},
		_isValidDate: function (date) {
			date = this._getDateObjectFromValue(date);
			return date.getTime() === date.getTime();
		},
		_validateValue: function (val) { // igDateEditor
			var result, dateObj, minValue, maxValue;
			if (val === null || val === "") {
				return true;
			}
			dateObj = this._getDateObjectFromValue(val);
			if (this.options.minValue) {
			minValue = this._getDateObjectFromValue(this.options.minValue);
			}
			if (this.options.maxValue) {
			maxValue = this._getDateObjectFromValue(this.options.maxValue);
			}
			if (this._isValidDate(dateObj)) {
				if (this.options.maxValue && this._isValidDate(maxValue) && dateObj > maxValue) {
					result = false;
				} else if (this.options.minValue && this._isValidDate(minValue) && dateObj < minValue) {
					result = false;
				} else {
					result = true;
				}
			} else {
				result = false;
			}
			return result;
		},
		_updateValue: function (value) { //igDateEditor
			//TODO Review
			if (value === null) {
				this._maskedValue = this._maskWithPrompts;
				this._valueInput.val("");
				this.options.value = null;
				this._dateObjectValue = null;
			} else if (value === "") {

				// Empty string is passed only when clear is called, or when an empty value is created
				// In that case we have empty editor.

				this._maskedValue = this._maskWithPrompts;
				this._valueInput.val("");
				this.options.value = "";
				this._dateObjectValue = null;
			} else {

				// Convert the value to date object;
				this._dateObjectValue = this._getDateObjectFromValue(value);
				this._updateMaskedValue();
				this.options.value = this._getValueByDataMode();

				// TODO here maybe the format of the submit value of the date should be some standart format like 2015-03-25T12:00:00
				if ($.type(this.options.value) === "date") {
						this._valueInput.val(this.options.value.toISOString());
				} else {
					this._valueInput.val(this.options.value);
				}
			}
		},
		_clearValue: function () { //DateEditor
			// TODO
			if (this.options.allowNullValue) {
				this._updateValue(this.options.nullValue);
				if (this.options.nullValue === null) {
					this._editorInput.val(this._maskWithPrompts);
				}
			} else {
				this._updateValue("");
				this._editorInput.val(this._maskWithPrompts);
			}
			if (this._editMode === false) {
				this._exitEditMode();
			}
		},
		_getDateObjectFromValue: function (value) { //DateEditor
			var date;
			if ($.type(value) === "date") {

				//if (this.options.enableUTCDates) {
				//	//T.P. 26th Oct 2015 Bug 208350 when creating UTC date we need to set hours, minutes, seconds and milliseconds
				//	value = new Date(Date.UTC(value.getFullYear(), value.getMonth(), value.getDate(), value.getHours(), value.getMinutes(), value.getSeconds(), value.getMilliseconds()));
				//}
				date = value;
			} else if (this._mvcDateRegex.test(value)) {
				date = new Date(parseInt(value.replace(this._mvcDateRegex, "$1"), 10));
			} else {
				date = new Date(value);
				if (this.options.enableUTCDates) {
					date = new Date(Date.UTC(date.getFullYear(),
						date.getMonth(), date.getDate(),
						date.getHours(), date.getMinutes(),
						date.getSeconds(), date.getMilliseconds()));
				}
			}
			return date;
		},
		_getValueByDataMode: function () {
			var dataModeValue,
				maskedVal = this._maskedValue ? this._maskedValue : this._maskWithPrompts,
				dataMode = this.options.dataMode;

			// TODO implement all of the modes
			switch (dataMode) {
				case "date": {
						dataModeValue = this._dateObjectValue;
				}
					break;
				case "displayModeText": {
					dataModeValue = this._getDisplayValue();
				}
					break;
				case "editModeText": {
					dataModeValue = maskedVal;
				}
					break;
				default: {

					// If the option is not valid we default back to the date
						dataModeValue = this._dateObjectValue;
				}
			}
			return dataModeValue;
		},
		_parseDateFromMaskedValue: function (value) {
			var dateField, monthField, yearField, hourField, minutesField, secondsField,
				millisecondsField, midDayField, today,
				dateStartIndex = this._dateIndices.dd, regExpr, ffCount, lastDayOfMonth,
				monthStartIndex = this._dateIndices.MM,
				yearStartIndex = this._dateIndices.yy,
				hourStartIndex = this._dateIndices.hh,
				minuteStartIndex = this._dateIndices.mm,
				secondsStartIndex = this._dateIndices.ss,
				midDayStartIndex = this._dateIndices.tt,
				millisecondsStartIndex = this._dateIndices.ff,
				extractedDate = "";
			if (value === "" || value === null || $.type(value) === "date") {

				// That case is when in the process value changing the value is equal to the empty mask. We don"t have any user input.
				return extractedDate;
			}

			// Extract Day
			if (dateStartIndex !== undefined && dateStartIndex !== null) {
				dateField = value.substring(dateStartIndex, dateStartIndex + 2);
				if (dateField.indexOf(this.options.unfilledCharsPrompt) !== -1) {
					regExpr =
						new RegExp($.ig.util.escapeRegExp(this.options.unfilledCharsPrompt), "g");
					dateField = dateField.replace(regExpr, "");
				}
				if (dateField !== "") {
					dateField = parseInt(dateField);
					if (dateField <= 0) {
						//0 is not valid date
						dateField = null;
					}
				} else {
					dateField = null;
				}
			}

			// Extract Month
			if (monthStartIndex !== undefined && monthStartIndex !== null) {
				monthField = value.substring(monthStartIndex, monthStartIndex + 2);
				if (monthField.indexOf(this.options.unfilledCharsPrompt) !== -1) {
					regExpr =
						new RegExp($.ig.util.escapeRegExp(this.options.unfilledCharsPrompt), "g");
					monthField = monthField.replace(regExpr, "");
				}
				if (monthField !== "") {
					monthField = parseInt(monthField);
					if (monthField <= 0) {
						monthField = null;
					} else {

					// jquery uses zero base months while the user enters real months
					monthField--;
					}
				} else {
					monthField = null;
				}
			}

			// Extract Year
			if (yearStartIndex !== undefined && yearStartIndex !== null) {
				if (this._dateIndices.fourDigitYear) {
					yearField = value.substring(yearStartIndex, yearStartIndex + 4);
				} else {
					yearField = value.substring(yearStartIndex, yearStartIndex + 2);
				}
				if (yearField.indexOf(this.options.unfilledCharsPrompt) !== -1) {
					regExpr =
						new RegExp($.ig.util.escapeRegExp(this.options.unfilledCharsPrompt), "g");
					yearField = yearField.replace(regExpr, "");
				}
				if (yearField !== "") {
					yearField = parseInt(yearField);
					yearField = this._fillCentury(yearField);
				} else {
					yearField = null;
				}

				//TODO Century
			}

			// Extract midday am/pm
			if (midDayStartIndex !== undefined && midDayStartIndex !== null) {
				midDayField = value.substring(midDayStartIndex, midDayStartIndex + 1);
				if (midDayField === this.options.unfilledCharsPrompt) {
					midDayField = null;
				} else {

					// Possible values "a" and "p"
					midDayField = midDayField.toLocaleLowerCase();
				}
			}

			// Extract Hour
			if (hourStartIndex !== undefined && hourStartIndex !== null) {
				hourField = value.substring(hourStartIndex, hourStartIndex + 2);
				if (hourField.indexOf(this.options.unfilledCharsPrompt) !== -1) {
					regExpr =
						new RegExp($.ig.util.escapeRegExp(this.options.unfilledCharsPrompt), "g");
					hourField = hourField.replace(regExpr, "");
				}
				if (hourField !== "") {
					hourField = parseInt(hourField);
					if (this._dateIndices.hh24 === false) {
						if (midDayField && midDayField === "p") {

							// Bug 209696 T.P. 25.11.2015 In that case there is PM flag entered and hour field is 12, so it should be left as it is.
							if (hourField !== 12) {
								hourField += 12;
							}
						} else if (hourField === 12) {

							// Bug 209696 T.P. 25.11.2015. In that case there is AM flag entered and hour field is 12, so it should be converted to 0
							hourField = 0;
						}
					}
				} else {
					hourField = null;
				}
			}

			//Extract Minute
			if (minuteStartIndex !== undefined && minuteStartIndex !== null) {
				minutesField = value.substring(minuteStartIndex, minuteStartIndex + 2);
				if (minutesField.indexOf(this.options.unfilledCharsPrompt) !== -1) {
					regExpr =
						new RegExp($.ig.util.escapeRegExp(this.options.unfilledCharsPrompt), "g");
					minutesField = minutesField.replace(regExpr, "");
				}
				if (minutesField !== "") {
					minutesField = parseInt(minutesField);
				} else {
					minutesField = null;
				}
			}

			// Extract Seconds
			if (secondsStartIndex !== undefined && secondsStartIndex !== null) {
				secondsField = value.substring(secondsStartIndex, secondsStartIndex + 2);
				if (secondsField.indexOf(this.options.unfilledCharsPrompt) !== -1) {
					regExpr =
						new RegExp($.ig.util.escapeRegExp(this.options.unfilledCharsPrompt), "g");
					secondsField = secondsField.replace(regExpr, "");
				}
				if (secondsField !== "") {
					secondsField = parseInt(secondsField);

				} else {
					secondsField = null;
				}

			}

			//Extract Milliseconds
			if (millisecondsStartIndex !== undefined && millisecondsStartIndex !== null) {
				millisecondsField = value.substring(millisecondsStartIndex,
					millisecondsStartIndex + this._dateIndices.ffLength);
				if (millisecondsField.indexOf(this.options.unfilledCharsPrompt) !== -1) {
					regExpr =
						new RegExp($.ig.util.escapeRegExp(this.options.unfilledCharsPrompt), "g");
					millisecondsField = millisecondsField.replace(regExpr, "");
				}
				if (millisecondsField !== "") {
					if (millisecondsField.length < this._dateIndices.ffLength) {
						ffCount = this._dateIndices.ffLength - millisecondsField.length;

						// If the user has entered 1 in 3 digit field - the value is converted into 300
						millisecondsField = parseInt(millisecondsField) * Math.pow(10, ffCount);
					}
					millisecondsField = parseInt(millisecondsField);
					if (this._dateIndices.ffLength === 2) {
						millisecondsField *= 10;
					} else if (this._dateIndices.ffLength === 1) {
						millisecondsField *= 100;
					}
				} else {
					millisecondsField = null;
				}
			}

			if (!this._dateObjectValue) {

				// If we have year, month and day field we create date from them, else we create today date.
				if (yearField !== null && yearField !== undefined &&
					 monthField !== null && monthField !== undefined &&
					 dateField !== null && dateField !== undefined) {
					if (this.options.enableUTCDates) {
						extractedDate = new Date(Date.UTC(yearField, monthField, dateField));
					} else {
						extractedDate = new Date(yearField, monthField, dateField);
					}
				} else {
					if (this.options.enableUTCDates) {
						today = new Date();
						extractedDate = new Date(Date.UTC(today.getFullYear(),
							today.getMonth(), today.getDate()));
					} else {
						extractedDate = new Date();
					}
					if (yearField !== null && yearField !== undefined) {
						extractedDate = this._setDateField("year", extractedDate, yearField);
					}
					if (monthField !== null && monthField !== undefined) {
						extractedDate = this._setDateField("month", extractedDate, monthField);
					}
					if (dateField !== null && dateField !== undefined) {
						lastDayOfMonth = this._lastDayOfMonth(this
							._getDateField("year", extractedDate),
								this._getDateField("month", extractedDate) + 1);
						if (dateField > lastDayOfMonth) {
							dateField = lastDayOfMonth;
						}
						extractedDate = this._setDateField("date", extractedDate, dateField);
					}
				}
			} else {

				// extractedDate = this._dateObjectValue;
				// N.A. 11/10/2015 Bug #207560: Set new date using timestamp.
				extractedDate = new Date(this._dateObjectValue.getTime());
			}
			if (yearField !== null && yearField !== undefined) {
				extractedDate = this._setDateField("year", extractedDate, yearField);
			}
			if (monthField !== null && monthField !== undefined) {

				if (dateField !== null && dateField !== undefined) {
					//temporary set day to be in the middle of the month to ensure when setting the month the day won't overflow into the next month.
					extractedDate = this._setDateField("date", extractedDate, "15");
				}
				extractedDate = this._setDateField("month", extractedDate, monthField);
			}
			if (dateField !== null && dateField !== undefined) {
				lastDayOfMonth = this._lastDayOfMonth(this
					._getDateField("year", extractedDate),
					this._getDateField("month", extractedDate) + 1);
				if (dateField > lastDayOfMonth) {
					dateField = lastDayOfMonth;
				}
				extractedDate = this._setDateField("date", extractedDate, dateField);
			}
			if (hourField !== null && hourField !== undefined) {
				extractedDate = this._setDateField("hours", extractedDate, hourField);
			}
			if (minutesField !== null && minutesField !== undefined) {
				extractedDate = this._setDateField("minutes", extractedDate, minutesField);
			}
			if (secondsField !== null && secondsField !== undefined) {
				extractedDate = this._setDateField("seconds", extractedDate, secondsField);
			}
			if (millisecondsField !== null && millisecondsField !== undefined) {
				extractedDate =
					this._setDateField("milliseconds", extractedDate, millisecondsField);
			}

			return extractedDate;

		},
		_getDisplayValue: function (newDate) { //igDateEditor
			var maskVal, dateObject = newDate ? newDate : this._dateObjectValue;

			if (!dateObject) {
				return "";
			}

			maskVal = this.options.dateDisplayFormat;
			maskVal = maskVal.replace(/\x08/g, " ").replace(/\x09/g, " ");
			maskVal = maskVal.replace(/\\f/g, "\x01").replace(/\\d/g, "\x02")
				.replace(/\\s/g, "\x03").replace(/\\m/g, "\x04").replace(/\\t/g, "\x05")
				.replace(/\\H/g, "\x06").replace(/\\h/g, "\x07").replace(/\\M/g, "\x08")
				.replace(/\\y/g, "\x09");

			// 01-y,02-yy,03-yyyy,04-M,05-MM,06-MMM,07-MMMM,08-d,09-dd
			// 10-h,11-hh,12-H,13-HH,14-t,15-tt,16-m,17-mm,18-s,19-ss
			// 20-ddd,21-dddd,22-f,23-ff,24-fff
			// Temporary remove 0 and 9, as they are valid mask flags
			// maskVal = maskVal.replace(/9/g, "\x11").replace(/0/g, "\x12");

			// Mark all flags as hexadecimal
			maskVal = maskVal.replace(/fff/g, "\x10030")
				.replace(/ff/g, "\x10031")
				.replace(/f/g, "\x10032");

			maskVal = maskVal.replace(/dddd/g, "\x10033")
				.replace(/ddd/g, "\x10034")
				.replace(/dd/g, "\x10035")
				.replace(/d/g, "\x10036")
				.replace(/ss/g, "\x10037")
				.replace(/s/g, "\x10038")
				.replace(/mm/g, "\x10039")
				.replace(/m/g, "\x10040");
			maskVal = maskVal.replace(/tt/g, "\x10041")
				.replace(/t/g, "\x10042")
				.replace(/HH/g, "\x10043")
				.replace(/H/g, "\x10044")
				.replace(/hh/g, "\x10045")
				.replace(/h/g, "\x10046");
			maskVal = maskVal.replace(/MMMM/g, "\x10047")
				.replace(/MMM/g, "\x10048")
				.replace(/MM/g, "\x10049")
				.replace(/M/g, "\x10050");
			maskVal = maskVal.replace(/yyyy/g, "\x10051")
				.replace(/yy/g, "\x10052")
				.replace(/y/g, "\x10053");

			maskVal = maskVal.replace(/\x10030/g,
				this._getMilliseconds(this._getDateField("milliseconds", dateObject), 1))
				.replace(/\x10031/g, this._getMilliseconds(this._getDateField("milliseconds",
					dateObject), 10))
				.replace(/\x10032/g, this._getMilliseconds(this._getDateField("milliseconds",
					dateObject), 100));

			maskVal = maskVal.replace(/\x10033/g,
				this._getDay(this._getDateField("day", dateObject), "dddd"))
				.replace(/\x10034/g, this._getDay(this._getDateField("day", dateObject), "ddd"))
				.replace(/\x10035/g, this._getDate(this._getDateField("date", dateObject), "dd"))
				.replace(/\x10036/g, this._getDate(this._getDateField("date", dateObject), "d"))
				.replace(/\x10037/g,
					this._getSeconds(this._getDateField("seconds", dateObject), "ss"))
				.replace(/\x10038/g,
					this._getSeconds(this._getDateField("seconds", dateObject), "s"))
				.replace(/\x10039/g,
					this._getMinutes(this._getDateField("minutes", dateObject), "mm"))
				.replace(/\x10040/g,
					this._getMinutes(this._getDateField("minutes", dateObject), "m"))

				.replace(/\x10041/g,
					this._getAMorPM(this._getDateField("hours", dateObject), "tt"))
				.replace(/\x10042/g, this._getAMorPM(this._getDateField("hours", dateObject), "t"))
				.replace(/\x10043/g, this._getHours(this._getDateField("hours", dateObject), "HH"))
				.replace(/\x10044/g, this._getHours(this._getDateField("hours", dateObject), "H"))
				.replace(/\x10045/g, this._getHours(this._getDateField("hours", dateObject), "hh"))
				.replace(/\x10046/g, this._getHours(this._getDateField("hours", dateObject), "h"));

			maskVal = maskVal.replace(/\x10047/g,
				this._getMonth(this._getDateField("month", dateObject), "MMMM"))
				.replace(/\x10048/g, this._getMonth(this._getDateField("month", dateObject), "MMM"))
				.replace(/\x10049/g, this._getMonth(this._getDateField("month", dateObject), "MM"))
				.replace(/\x10050/g, this._getMonth(this._getDateField("month", dateObject), "M"));

			maskVal = maskVal.replace(/\x10051/g,
				this._getYear(this._getDateField("year", dateObject), "yyyy"))
				.replace(/\x10052/g, this._getYear(this._getDateField("year", dateObject), "yy"))
				.replace(/\x10053/g, this._getYear(this._getDateField("year", dateObject), "y"));

			// Restore original \\f,d,s,m,etc.
			maskVal = maskVal.replace(/\x01/g, "g").replace(/\x02/g, "d").replace(/\x03/g, "s")
				.replace(/\x04/g, "m").replace(/\x05/g, "t").replace(/\x06/g, "H")
				.replace(/\x07/g, "h").replace(/\x08/g, "M").replace(/\x09/g, "y");

			return maskVal;
		},
		_valueFromText: function (text) { //igDateEditor
			// TODO Verify
			var dateFromText = this._parseDateFromMaskedValue(text), dataModeValue;
			switch (this.options.dataMode) {
				case "date": {
					dataModeValue = dateFromText;
				}
					break;
				case "displayModeText": {
					dataModeValue = this._getDisplayValue(dateFromText);
				}
					break;
				case "editModeText": {
					dataModeValue = this._getInternalMaskedValue(dateFromText);
				}
					break;
				default: {

					// If the option is not valid we default back to the date
					dataModeValue = dateFromText;
				}
			}
			return dataModeValue;
		},

		// We use flag for different mask flags f milliseconds field in thousands, ff milliseconds field in tenths, fff milliseconds field in hundreds
		_getMilliseconds: function (milliseconds, flag) {
			var result = parseInt(milliseconds / flag).toString();
			if (flag === 10) {
				if (result.length !== 2) {
					while (result.length < 2) {
						result = "0" + result;
					}
				}
			} else if (flag === 1) {

				// Flag 1
				if (result.length !== 3) {
					while (result.length < 3) {
						result = "0" + result;
					}
				}
			}
			return result;
		},

		// Flag values are dddd, ddd, dd, d - according to the
		_getSeconds: function (seconds, flag) {
			var result;
			if (flag === "ss" && seconds < 10) {
				result = "0" + seconds.toString();
			} else {
				result = seconds.toString();
			}
			return result;
		},
		_getMinutes: function (minutes, flag) {
			var result;
			if (flag === "mm" && minutes < 10) {
				result = "0" + minutes.toString();
			} else {
				result = minutes.toString();
			}
			return result;
		},

		// Get before midday, or after middday
		_getAMorPM: function (hours, flag) {
			var result;
			if (hours >= 12) {

				// pm
				result = this._getRegionalOption("pm");
			} else {
				result = this._getRegionalOption("am");
			}
			if (flag === "t") {
				result = result.charAt(0);
			}
			return result;
		},
		_getHours: function (hours, flag) {
			var result;
			switch (flag) {
				case "h": {
					if (hours > 12) {
						hours -= 12;
					}

					// N.A. 3/8/2016 Bug #215548: In 12 hour mode, there isn't 00:00 AM hour, it should be 12:00 AM.
					if (hours === 0) {
						hours = 12;
					}
					result = hours.toString();
				}
					break;
				case "hh": {
					if (hours > 12) {
						hours -= 12;
					}

					// N.A. 3/8/2016 Bug #215548: In 12 hour mode, there isn't 00:00 AM hour, it should be 12:00 AM.
					if (hours === 0) {
						hours = 12;
					}
					if (hours < 10) {
						result = "0" + hours.toString();
					} else {
						result = hours.toString();
					}
				}
					break;
				case "H": {
					result = hours.toString();
				}
					break;
				case "HH": {
					if (hours < 10) {
						result = "0" + hours.toString();
					} else {
						result = hours.toString();
					}
				}
					break;

			}
			return result;
		},
		_getDate: function (date, flag) {
			var result;
			switch (flag) {
				case "dd": {
					if (date < 10) {
						result = "0" + date.toString();
					} else {
						result = date;
					}
				}
					break;
				case "d": {
					result = date.toString();
				}
					break;
			}
			return result;
		},
		_getDay: function (day, flag) {
			var result;
			switch (flag) {
				case "dddd": {
					result = this._getRegionalOption("dayNames")[ day ];
				}
					break;
				case "ddd": {
					result = this._getRegionalOption("dayNamesShort")[ day ];
				}
					break;
			}
			return result;
		},
		_getMonth: function (month, flag) {
			var result;
			switch (flag) {
				case "MMMM": {
					result = this._getRegionalOption("monthNames")[ month ];
				}
					break;
				case "MMM": {
					result = this._getRegionalOption("monthNamesShort")[ month ];
				}
					break;
				case "MM": {
					month++;
					if (month < 10) {
						result = "0" + month.toString();
					} else {
						result = month;
					}
				}
					break;
				case "M": {
					month++;
					result = month.toString();
				}
					break;
			}
			return result;
		},
		_getYear: function (year, flag) {
			var result;
			if (flag === "yy") {
				result = year.toString().substring(2);
			} else if (flag === "y") {
				result = parseInt(year.toString().substring(2)).toString();
			} else {
				result = year.toString();
			}
			return result;

		},
		_handleBackSpaceKey: function () { //igDateEditor
			var cursorPosition;
			this._super();
			cursorPosition = this._getSelection(this._editorInput[ 0 ]).start;
			if (cursorPosition === this._dateIndices.tt ||
				(cursorPosition - 1) === this._dateIndices.tt) {
				if (this._dateIndices._ttLength === 2) {
					if (cursorPosition === this._dateIndices.tt) {
						this._setCursorPosition(cursorPosition + 1);
						$.ui.igMaskEditor.prototype._handleDeleteKey.call(this);
						this._setCursorPosition(cursorPosition);
					} else {
						this._super();
					}
				}
			}
		},
		_handleDeleteKey: function (skipCursorPosition) { //igDateEditor
			var cursorPosition;
			this._super(skipCursorPosition);
			cursorPosition = this._getSelection(this._editorInput[ 0 ]).start;
			if ((cursorPosition - 2) === this._dateIndices.tt ||
				(cursorPosition - 1) === this._dateIndices.tt) {
				if (this._dateIndices._ttLength === 2) {
					if ((cursorPosition - 1) === this._dateIndices.tt) {
						this._super();
					} else {
						if (!skipCursorPosition) {
							this._setCursorPosition(cursorPosition - 1);
						}
						$.ui.igMaskEditor.prototype._handleBackSpaceKey.call(this);
						if (!skipCursorPosition) {
							this._setCursorPosition(cursorPosition);
						}
					}
				}
			}
		},
		_setMillisecondsEditMode: function (mask, time, currentMilliseconds, delta) {
			var isLimited = this.options.limitSpinToCurrentField, newMilliseconds,
				secondsUpdateDelta = 0, currentSecond, timeSecond;
			if (currentMilliseconds + delta >= 60) {
				if (isLimited) {
					newMilliseconds = currentMilliseconds;
				} else {
					newMilliseconds = (currentMilliseconds + delta) - 60;
					secondsUpdateDelta = 1;
				}
			} else if (currentMilliseconds + delta < 0) {
				if (isLimited) {
					newMilliseconds = currentMilliseconds;
				} else {
					if (currentMilliseconds + delta === 0) {
						newMilliseconds = 0;
					} else {
						newMilliseconds = 60 + (currentMilliseconds + delta);
						secondsUpdateDelta = -1;
					}
				}
			} else {
				newMilliseconds = currentMilliseconds + delta;
			}
			mask = this._setTimeEditMode(mask, time, currentMilliseconds, newMilliseconds);
			if (secondsUpdateDelta !== undefined && secondsUpdateDelta !== 0) {
				timeSecond = this._createSecondsPosition();
				if (timeSecond !== null) {
					currentSecond = parseInt(this._getStringRange(mask, timeSecond.startPosition,
						timeSecond.endPosition), 10);
					mask = this._setSecondsEditMode(mask, timeSecond,
						currentSecond, secondsUpdateDelta);
				} else {

					// This is the case, when we don't have seconds in the mask, but we increase/decrease the milliseconds to the next/previous second.
					// In such a situation, we update the internal date with the new second, so that when we loose focus the second is the correct one.
					if (!isLimited) {
						this._setDateField("seconds",
							this._dateObjectValue,
							this._getDateField("seconds", this._dateObjectValue) +
								secondsUpdateDelta);
					}
				}
			}
			return mask;
		},
		_setSecondsEditMode: function (mask, time, currentSecond, delta) {
			var isLimited = this.options.limitSpinToCurrentField, newSecond,
				minuteUpdateDelta = 0, currentMinute, timeMinute;
			if (currentSecond + delta >= 60) {
				if (isLimited) {
					newSecond = currentSecond;
				} else {
					newSecond = (currentSecond + delta) - 60;
					minuteUpdateDelta = 1;
				}
			} else if (currentSecond + delta < 1) {
				if (isLimited) {
					newSecond = currentSecond;
				} else {
					if (currentSecond + delta === 0) {
						newSecond = 0;
					} else {
						newSecond = 60 + (currentSecond + delta);
						minuteUpdateDelta = -1;
					}
				}
			} else {
				newSecond = currentSecond + delta;
			}
			mask = this._setTimeEditMode(mask, time, currentSecond, newSecond);
			if (minuteUpdateDelta !== undefined && minuteUpdateDelta !== 0) {
				timeMinute = this._createMinutesPosition();
				if (timeMinute !== null) {
					currentMinute = parseInt(this._getStringRange(mask,
						timeMinute.startPosition, timeMinute.endPosition), 10);
					mask = this._setMinutesEditMode(mask,
						timeMinute, currentMinute, minuteUpdateDelta);
				} else {

					// This is the case, when we don't have minute in the mask, but we increase/decrease the seconds to the next/previous minute.
					// In such a situation, we update the internal date with the new minute, so that when we loose focus the minute is the correct one.
					if (!isLimited) {
						this._setDateField("minutes",
							this._dateObjectValue,
							this._getDateField("minutes", this._dateObjectValue) +
								minuteUpdateDelta);
					}
				}
			}
			return mask;
		},
		_setMinutesEditMode: function (mask, time, currentMinute, delta) {
			var isLimited = this.options.limitSpinToCurrentField, newMinute,
				hourUpdateDelta = 0, currentHour, timeHour;
			if (currentMinute + delta >= 60) {
				if (isLimited) {
					newMinute = currentMinute;
				} else {
					newMinute = (currentMinute + delta) - 60;
					hourUpdateDelta = 1;
				}
			} else if (currentMinute + delta < 1) {
				if (isLimited) {
					newMinute = currentMinute;
				} else {
					if (currentMinute + delta === 0) {
						newMinute = 0;
					} else {
						newMinute = 60 + (currentMinute + delta);
						hourUpdateDelta = -1;
					}
				}
			} else {
				newMinute = currentMinute + delta;
			}
			mask = this._setTimeEditMode(mask, time, currentMinute, newMinute);
			if (hourUpdateDelta !== undefined && hourUpdateDelta !== 0) {
				timeHour = this._createHoursPosition();
				if (timeHour !== null) {
					currentHour = parseInt(this._getStringRange(mask,
						timeHour.startPosition, timeHour.endPosition), 10);
					mask = this._setHoursEditMode(mask, timeHour, currentHour, hourUpdateDelta);
				} else {

					// This is the case, when we don't have hours in the mask, but we increase/decrease the minute to the next/previous hour.
					// In such a situation, we update the internal date with the new hour, so that when we loose focus the hour is the correct one.
					if (!isLimited) {
						this._setDateField("hours",
							this._dateObjectValue,
							this._getDateField("hours", this._dateObjectValue) +
								hourUpdateDelta);
					}
				}
			}
			return mask;
		},
		_setHoursEditMode: function (mask, time, currentHour, delta) {
			var isLimited = this.options.limitSpinToCurrentField,
				is24format = this._dateIndices.hh24,
				dayUpdateDelta = false,
				amPmUpdateDelta = false,
				newHour = currentHour + delta,
				hours, wrapUpHours, wrapDownHours, currentDay, currentAmPm, timeDay, timeAmPm;

			if (is24format) {
				hours = 24;
				wrapUpHours = newHour >= hours; // The maximum hour in 24H format is 23, that's why 24 is the turning point.
				wrapDownHours = newHour < 0; // The minumum hour in 24H format is 00, that's why -1 is the turing point.
			} else {
				hours = 12;
				wrapUpHours = newHour > hours; // The maximum hour in 12H format is 12, that's why 13 is the turning point.
				wrapDownHours = newHour < 1; // The minumum hour in 12H format is 01, that's why 0 is the turning point.
				currentAmPm = (mask.toLowerCase().indexOf(" pm") >= 0) ? "pm" : "am";
			}

			if (wrapUpHours) {
				if (isLimited) {
					newHour = currentHour;
				} else {
					if (is24format) {

						// In 24H format date, when the hour changes (wraps up) from 23 to 00, this is the time that the day is increased also.
						newHour -= hours;
						dayUpdateDelta = true;
					} else {

						// In 12H format date, when the hour changes (wraps up) from 12 to 01, this is NOT the time that the day is increased.
						// It is increased an hour earlier. (implemented in the top else block).
						if (newHour === 13) {
							newHour = 1;
						}
					}
				}
			} else if (wrapDownHours) {
				if (isLimited) {
					newHour = currentHour;
				} else {
					if (is24format) {

						// In 24H format date, when the hour changes (wraps up) from 00 to 23, this is the time that the day is decreased also.
						newHour += hours;
						dayUpdateDelta = true;
					} else {

						// In 12H format date, when the hour changes (wraps down) from 01 to 12, this is NOT the time that the day is decreased.
						// It is decreased an hour later. (implemented in the top else block).
						if (newHour === 0) {
							newHour = 12;
						}
					}
				}
			} else {
				if (!is24format) {

					// Update AM/PM and date in 12H format.
					if (delta > 0 && newHour === 12) {
						amPmUpdateDelta = true;
						if (currentAmPm === "pm") {
							dayUpdateDelta = true;
						}
					}
					if (delta < 0 && newHour === 11) {
						amPmUpdateDelta = true;
						if (currentAmPm === "am") {
							dayUpdateDelta = true;
						}
					}
				}
			}

			mask = this._setTimeEditMode(mask, time, currentHour, newHour);
			if (amPmUpdateDelta) {
				timeAmPm = this._createAmOrPmPosition();
				if (timeAmPm !== null) {
					mask = this._setAmOrPmEditMode(mask, timeAmPm, currentAmPm);
				}
			}
			if (dayUpdateDelta) {
				timeDay = this._createDayPosition();
				if (timeDay !== null) {
					currentDay = parseInt(this._getStringRange(mask, timeDay.startPosition,
						timeDay.endPosition), 10);
					mask = this._setDayEditMode(mask, timeDay, currentDay, delta);
				} else {

					// This is the case, when we don't have day in the mask, but we increase/decrease the hour to the next/previous day.
					// In such a situation, we update the internal date with the new day, so that when we loose focus the day is the correct one.
					if (!isLimited) {
						this._setDateField("date", this._dateObjectValue,
							this._getDateField("date", this._dateObjectValue) + delta);
					}
				}
			}
			return mask;
		},
		_setAmOrPmEditMode: function (mask, time, currentAmOrPm, noSwap) {
			var newAmOrPm;
			if (noSwap) {
				newAmOrPm = currentAmOrPm;
			} else {
				if (currentAmOrPm.toLocaleLowerCase() === "am") {
					newAmOrPm = "PM";
				} else {
					newAmOrPm = "AM";
				}
			}
			mask = this._setTimeEditMode(mask, time, currentAmOrPm, newAmOrPm);
			return mask;
		},
		_lastDayOfMonth: function (year, month) {
			var day;

			if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 ||
				month === 10 || month === 12) {
				day = 31;
			} else if (month === 4 || month === 6 || month === 9 || month === 11) {
				day = 30;
			} else if (month === 2 && year % 4 === 0) {
				day = 29;
			} else if (month === 2 && year % 4 !== 0) {
				day = 28;
			}
			return day;
		},
		_setDayEditMode: function (mask, time, currentDay, delta) {
			var isLimited = this.options.limitSpinToCurrentField, currentYear,
				currentMonth, lastDayOfMonth, lastDayOfPreviousMonth, newDay,
				monthUpdateDelta, timeYear, timeMonth;

			timeYear = this._createYearPosition();
			currentYear = parseInt(this._getStringRange(mask,
				timeYear.startPosition, timeYear.endPosition), 10);
			timeMonth = this._createMonthPosition();
			currentMonth = parseInt(this._getStringRange(mask,
				timeMonth.startPosition, timeMonth.endPosition), 10);
			lastDayOfMonth = this._lastDayOfMonth(currentYear, currentMonth);
			lastDayOfPreviousMonth = this._lastDayOfMonth(currentYear,
				currentMonth - 1 !== 0 ? currentMonth - 1 : 12);

			if (currentDay + delta > lastDayOfMonth) {
				if (isLimited) {
					newDay = currentDay;
				} else {
					newDay = (currentDay + delta) - lastDayOfMonth;
					monthUpdateDelta = 1;
				}
			} else if (currentDay + delta < 1) {
				if (isLimited) {
					newDay = currentDay;
				} else {
					newDay = lastDayOfPreviousMonth + (currentDay + delta);
					monthUpdateDelta = -1;
				}
			} else {
				newDay = currentDay + delta;
				}
			mask = this._setTimeEditMode(mask, time, currentDay, newDay);
			if (monthUpdateDelta !== undefined && monthUpdateDelta !== 0) {
				timeMonth = this._createMonthPosition();
				if (timeMonth !== null) {
					currentMonth = parseInt(this._getStringRange(mask, timeMonth.startPosition,
						timeMonth.endPosition), 10);
					mask = this._setMonthEditMode(mask, timeMonth, currentMonth, monthUpdateDelta);
				} else {

					// This is the case, when we don't have month in the mask, but we increase/decrease the days to the next/previous month.
					// In such a situation, we update the internal date with the new month, so that when we loose focus the month is the correct one.
					if (!isLimited) {
						this._setDateField("month", this._dateObjectValue,
							this._getDateField("month", this._dateObjectValue) + monthUpdateDelta);
					}
				}
			}
			return mask;
		},
		_setMonthEditMode: function (mask, time, currentMonth, delta) {
			var isLimited = this.options.limitSpinToCurrentField, newMonth, yearUpdateDelta = 0,
				currentYear, timeYear;
			if (currentMonth + delta > 12) {
				if (isLimited) {
					newMonth = currentMonth;
				} else {
					newMonth = (currentMonth + delta) - 12;
					yearUpdateDelta = 1;
				}
			} else if (currentMonth + delta < 1) {
				if (isLimited) {
					newMonth = currentMonth;
				} else {
					newMonth = 12 + (currentMonth + delta);
					yearUpdateDelta = -1;
				}
			} else {
				newMonth = currentMonth + delta;
			}
			mask = this._setTimeEditMode(mask, time, currentMonth, newMonth);
			if (yearUpdateDelta !== undefined && yearUpdateDelta !== 0) {
				timeYear = this._createYearPosition();
				if (timeYear !== null) {
					currentYear = parseInt(this._getStringRange(mask,
						timeYear.startPosition, timeYear.endPosition), 10);
					mask = this._setYearEditMode(mask, timeYear, currentYear, yearUpdateDelta);
				} else {

					// This is the case, when we don't have year in the mask, but we increase/decrease the month to the next/previous minute.
					// In such a situation, we update the internal date with the new year, so that when we loose focus the month is the correct one.
					if (!isLimited) {
						this._setDateField("year",
							this._dateObjectValue,
							this._getDateField("year", this._dateObjectValue) + yearUpdateDelta);
					}
				}
			}
			return mask;
		},
		_setYearEditMode: function (mask, time, currentYear, delta) {
			var newYear;
			if (currentYear + delta < 0) {
				newYear = currentYear;
			} else {
				newYear = currentYear + delta;
			}
			mask = this._setTimeEditMode(mask, time, currentYear, newYear);
			return mask;
		},
		_setTimeEditMode: function (mask, time, currentValue, newValue) {
			var newValueAsString;

			newValueAsString = newValue.toString();
			if (newValueAsString.length === 1) {
				newValueAsString = "0" + newValueAsString;
				if (time.name === "milliseconds" && this._dateIndices.ffLength === 3) {
					newValueAsString = "0" + newValueAsString;
				}

				// N.A. 3/17/2016 Bug #216293: When we don't have date object and we spin the year needs additional 0, depending on the current year we are spinning.
				if (time.name === "year" && this._dateIndices.fourDigitYear) {
					newValueAsString = "00" + newValueAsString;
				}
			} else if (newValueAsString.length === 2 &&
				time.name === "year" && this._dateIndices.fourDigitYear) {
				newValueAsString = "00" + newValueAsString;
			} else if (newValueAsString.length === 3 &&
				time.name === "year" && this._dateIndices.fourDigitYear) {
				newValueAsString = "0" + newValueAsString;
			}
			mask = this._replaceStringRange(mask,
				newValueAsString, time.startPosition, time.endPosition - 1);

			return mask;
		},
		_createYearPosition: function () {
			var time = null;
			if (this._dateIndices.yy !== undefined) {
				time = {};
				time.name = "year";
				time.startPosition = this._dateIndices.yy;
				time.length = this._dateIndices.fourDigitYear ? 4 : 2;
				time.endPosition = time.startPosition + time.length;
			}
			return time;
		},
		_createMonthPosition: function () {
			var time = null;
			if (this._dateIndices.MM !== undefined) {
				time = {};
				time.name = "month";
				time.startPosition = this._dateIndices.MM;
				time.length = 2;
				time.endPosition = time.startPosition + time.length;
			}
			return time;
		},
		_createDayPosition: function () {
			var time = null;
			if (this._dateIndices.dd !== undefined) {
				time = {};
				time.name = "day";
				time.startPosition = this._dateIndices.dd;
				time.length = 2;
				time.endPosition = time.startPosition + time.length;
			}
			return time;
		},
		_createAmOrPmPosition: function () {
			var time = null;
			if (this._dateIndices.tt !== undefined) {
				time = {};
				time.name = "amOrPm";
				time.startPosition = this._dateIndices.tt;
				time.length = 2;
				time.endPosition = time.startPosition + time.length;
			}
			return time;
		},
		_createHoursPosition: function () {
			var time = null;
			if (this._dateIndices.hh !== undefined) {
				time = {};
				time.name = "hours";
				time.startPosition = this._dateIndices.hh;
				time.length = 2;
				time.endPosition = time.startPosition + time.length;
			}
			return time;
		},
		_createMinutesPosition: function () {
			var time = null;
			if (this._dateIndices.mm !== undefined) {
				time = {};
				time.name = "minutes";
				time.startPosition = this._dateIndices.mm;
				time.length = 2;
				time.endPosition = time.startPosition + time.length;
			}
			return time;
		},
		_createSecondsPosition: function () {
			var time = null;
			if (this._dateIndices.ss !== undefined) {
				time = {};
				time.name = "seconds";
				time.startPosition = this._dateIndices.ss;
				time.length = 2;
				time.endPosition = time.startPosition + time.length;
			}
			return time;
		},
		_createMillisecondsPosition: function () {
			var time = null;
			if (this._dateIndices.ff !== undefined) {
				time = {};
				time.name = "milliseconds";
				time.startPosition = this._dateIndices.ff;
				time.length = this._dateIndices.ffLength;
				time.endPosition = time.startPosition + time.length;
			}
			return time;
		},
		_getTimePosition: function () {
			var cursorPosition = this._getCursorPosition(),
				indices = this._dateIndices, time = null;

			if (cursorPosition < 0) {
				cursorPosition = 0;
			}
			if (cursorPosition >= indices.yy &&
				(indices.fourDigitYear && cursorPosition <= indices.yy + 4 ||
					indices.fourDigitYear === undefined && indices.yy + 2)) {
				time = this._createYearPosition();
			} else if (cursorPosition >= indices.MM && cursorPosition <= indices.MM + 2) {
				time = this._createMonthPosition();
			} else if (cursorPosition >= indices.dd && cursorPosition <= indices.dd + 2) {
				time = this._createDayPosition();
			} else if (cursorPosition >= indices.tt && cursorPosition <= indices.tt + 2) {
				time = this._createAmOrPmPosition();
			} else if (cursorPosition >= indices.hh && cursorPosition <= indices.hh + 2) {
				time = this._createHoursPosition();
			} else if (cursorPosition >= indices.mm && cursorPosition <= indices.mm + 2) {
				time = this._createMinutesPosition();
			} else if (cursorPosition >= indices.ss && cursorPosition <= indices.ss + 2) {
				time = this._createSecondsPosition();
			} else if (cursorPosition >= indices.ff &&
				cursorPosition <= indices.ff + indices.ffLength) {
				time = this._createMillisecondsPosition();
			}
			return time;
		},
		_updateTimeMask: function (mask, time, delta) {
			var currentValueString, currentValue, range, index,
				unfilled = this.options.unfilledCharsPrompt;

			// N.A. 3/12/2016 Bug #215134: We remove unfilled characters before parsing the date.
			// N.A. 3/17/2016 Bug #216293: When we don't have date object and we spin the year needs additional 0, depending on the current year we are spinning.
			currentValueString = range = this._getStringRange(mask, time.startPosition, time.endPosition);
			for (index = 0; index < range.length; index++) {
				if (currentValueString.indexOf(unfilled) === index) {
					currentValueString = currentValueString.replace(unfilled, "0");
				} else {
					break;
				}
			}

			if (time.name !== "amOrPm") {
				currentValue = parseInt(currentValueString, 10);
			}

			// N.A. 3/12/2016 Bug #215134: When we enter a value and spin before the date is created, we create a today date, cause everything is empty.
			if (!this._dateObjectValue && mask.indexOf(unfilled) >= 0) {
				mask = this._initEmptyMask(this._dateObjectValue);
				mask = mask.substring(0, time.startPosition) +
					currentValueString +
					mask.substring(time.endPosition, mask.length);
			}

			switch (time.name) {
				case "year":
					mask = this._setYearEditMode(mask, time, currentValue, delta);
					break;
				case "month":
					mask = this._setMonthEditMode(mask, time, currentValue, delta);
					break;
				case "day":
					mask = this._setDayEditMode(mask, time, currentValue, delta);
					break;
				case "amOrPm":
					currentValue =
						this._getStringRange(mask, time.startPosition, time.endPosition);
					mask = this._setAmOrPmEditMode(mask, time, currentValue);
					break;
				case "hours":
					mask = this._setHoursEditMode(mask, time, currentValue, delta);
					break;
				case "minutes":
					mask = this._setMinutesEditMode(mask, time, currentValue, delta);
					break;
				case "seconds":
					mask = this._setSecondsEditMode(mask, time, currentValue, delta);
					break;
				case "milliseconds":
					mask = this._setMillisecondsEditMode(mask, time, currentValue, delta);
					break;
			}
			return mask;
		},
		_initEmptyMask: function (date) {
			var mask = this._maskWithPrompts,
				today = new Date(),
				timeYear, timeMonth, timeDay, timeHours,
				timeAmOrPM, timeMinutes, timeSeconds, timeMilliseconds,
				year, month, day, hours, amPM, minutes, seconds, milliseconds;

			if (!date) {
				date = today;
			}

			timeYear = this._createYearPosition();
			timeMonth = this._createMonthPosition();
			timeDay = this._createDayPosition();
			timeHours = this._createHoursPosition();
			timeAmOrPM = this._createAmOrPmPosition();
			timeMinutes = this._createMinutesPosition();
			timeSeconds = this._createSecondsPosition();
			timeMilliseconds = this._createMillisecondsPosition();

			year = date.getFullYear();
			month = date.getMonth() + 1;
			day = date.getDate();
			hours = date.getHours();
			amPM = !this._dateIndices.hh24 && hours >= 12 ? "PM" : "AM";
			hours = !this._dateIndices.hh24 && hours > 12 ? hours - 12 : hours;
			minutes = date.getMinutes();
			seconds = date.getSeconds();
			milliseconds = date.getMilliseconds();

			if (timeYear) {
				mask = this._setYearEditMode(mask, timeYear, year, 0);
			}
			if (timeMonth) {
				mask = this._setMonthEditMode(mask, timeMonth, month, 0);
			}
			if (timeDay) {
				mask = this._setDayEditMode(mask, timeDay, day, 0);
			}
			if (timeHours) {
				mask = this._setHoursEditMode(mask, timeHours, hours, 0);
			}
			if (timeAmOrPM) {
				mask = this._setAmOrPmEditMode(mask, timeAmOrPM, amPM, true);
			}
			if (timeMinutes) {
				mask = this._setMinutesEditMode(mask, timeMinutes, minutes, 0);
			}
			if (timeSeconds) {
				mask = this._setSecondsEditMode(mask, timeSeconds, seconds, 0);
			}
			if (timeMilliseconds) {
				mask = this._setMillisecondsEditMode(mask, timeMilliseconds, milliseconds, 0);
			}
			return mask;
		},
		_spinEditMode: function (delta) {
			var self = this, cursorPosition = this._getCursorPosition(),
				mask = this._editorInput.val(), time;

			time = this._getTimePosition();
			if (!time) {

				// If the cursor position is not available for some reason, we do not spin.
				return;
			}

			if (mask === undefined) {
				return;
			} else if (mask === "" || mask === this._maskWithPrompts) {
				mask = this._initEmptyMask(this._dateObjectValue);
			} else {
				mask = this._updateTimeMask(mask, time, delta);
			}

			//	N.A. 3/2/2016 Bug #215046: We don't need to update _maskedValue, before the value is updated.
			// this._maskedValue = mask;
			this._editorInput.val(mask);
			if ($.ig.util.isChrome || $.ig.util.isSafari || $.ig.util.isFF) {

				// In Chrome, Safari and FF there is a bug and the cursor needs to be set with timeout in order to work.
				this._timeouts.push(setTimeout(function () {
					self._setCursorPosition(cursorPosition);
				}, 0));
			} else {
				self._setCursorPosition(cursorPosition);
			}
		},
		_setTimePeriod: function (periodName, delta) {
			var date, period, newPeriod;

			date = this._dateObjectValue;
			period = parseInt(this._getDateField(periodName, date), 10);
			if (period === null) {

				// When there is no date at all we want to set today and should not increase the day.
				// It's the same for the other time periods.
				period = this._getDateField(periodName, new Date());
				delta = 0;
			}
			newPeriod = period + delta;

			if (!date) {
				date = new Date();
			}
			if (newPeriod !== period) {
				this._setDateField(periodName, date, newPeriod);
				this._triggerInternalValueChange(date);
				this._editorInput.val(this._getDisplayValue());
			}
		},
		_spinDisplayMode: function (delta) {
			var indices = this._dateIndices, periodName;

			if (indices.dd !== undefined) {

				// Default behavior is that we always spin up/down day if it is available in the mask.
				periodName = "date";
			} else if (indices.ff !== undefined) {

				// If day is not available then we spin the smallest time period, that's why we start from milliseconds.
				periodName = "milliseconds";
				if (indices.ffLength === 2) {
					delta = delta * 10;
				} else if (indices.ffLength === 1) {
					delta = delta * 100;
				}
			} else if (indices.ss !== undefined) {
				periodName = "seconds";
			} else if (indices.mm !== undefined) {
				periodName = "minutes";
			} else if (indices.hh !== undefined) {
				periodName = "hours";
			} else if (indices.MM !== undefined) {
				periodName = "month";
			} else if (indices.yy !== undefined) {
				periodName = "year";
			}
			this._setTimePeriod(periodName, delta);
		},
		_spin: function (delta) {
			this._currentInputTextValue = this._editorInput.val();
			if (this._editMode) {
				this._spinEditMode(delta);
			} else {
				this._spinDisplayMode(delta);
			}
			this._processTextChanged();
		},
		_spinUpEditMode: function (delta) {
			this._spinEditMode(delta ? delta : this.options.spinDelta);
		},
		_spinDownEditMode: function (delta) {
			this._spinEditMode(delta ? -delta : -this.options.spinDelta);
		},

		// igDateEditor public methods
		value: function (newValue) { // Date Editor
			/* Gets/Sets editor value.
				paramType="date" optional="true" New editor value. Date object can be set as value. String value can be passed and the editor will use the javascript Date object constructor to create date object and will use it for the comparison. MVC date format can be used too. For example Date(/"thicks"/).
				Note! This option doesn't use the displayInputFormat to extract the date
				returnType="date" Current editor value. */
			var parsedVal;
			if (newValue !== undefined) {

				// N.A. 12/1/2015 Bug #207198: Remove notifier when value updated through value method.
				this._clearEditorNotifier();

				//If the value is valid proceed with min/max value
				parsedVal = this._getDateObjectFromValue(newValue);
				if (this._isValidDate(parsedVal)) {
					if (this.options.maxValue && parsedVal > this.options.maxValue) {
						newValue = this._getDateObjectFromValue(this.options.maxValue);
						this._sendNotification("warning",
							$.ig.util.stringFormat($.ig.Editor.locale.maxValExceedSetErrMsg,
								this._getDisplayValue(new Date(this.options.maxValue))));
					} else if (this.options.minValue && parsedVal < this.options.minValue) {
						newValue = this._getDateObjectFromValue(this.options.minValue);
						this._sendNotification("warning",
						$.ig.util.stringFormat($.ig.Editor.locale.minValExceedSetErrMsg,
								this._getDisplayValue(new Date(this.options.minValue))));
					}
				}
				if (this._validateValue(newValue)) {
					this._updateValue(newValue);

					//TODO Update maskedValue according to the new value.
					this._updateMaskedValue();
				}
				this._editorInput.val(this._editMode ?
					this._maskedValue :
					this._getDisplayValue());
			} else {
				if (this.options.value) {
					return this._getValueByDataMode();
				} else {
					if (this.options.allowNullValue) {
						return this.options.nullValue;
					} else {
						return "";
					}
				}
			}
		},
		getSelectedDate: function() {
			/* Gets selected date.
				returnType="date" */
			return this._dateObjectValue;
		},
		selectDate: function (date) {
			/* Sets selected date.
				paramType="date" optional="false" */
			this._updateValue(date);
			this._exitEditMode();
		},
		spinUp: function (delta) {
			/* Increase date-time period, depending on the cursor position.
				paramType="number" optional="true" The increase delta. */
			this._spin(delta ? delta : this.options.spinDelta);
		},
		spinDown: function (delta) {
			/* Decrease date-time period, depending on the cursor position.
				paramType="number" optional="true" The decrease delta. */
			this._spin(delta ? -delta : -this.options.spinDelta);
		},
		spinUpButton: function () {
			/* Returns a reference to the spin up UI element of the editor.
				returnType="$" The jQuery object representing the spin up UI element of the editor. */
			return $.ui.igTextEditor.prototype.spinUpButton.call(this);
		},
		spinDownButton: function () {
			/* Returns a reference to the spin down UI element of the editor.
				returnType="$" The jQuery object representing the spin down UI element of the editor. */
			return $.ui.igTextEditor.prototype.spinDownButton.call(this);
		},
		isValid: function () { //igDateEditor
			/* Checks if value in editor is valid. Note: This function will not trigger automatic notifications.
				returnType="bool" Whether editor value is valid or not */
			var value, valid;
			value = this.field().val();
			this._skipMessages = true;
			if (this._editMode) {
				if (value === this._maskWithPrompts) {
					valid = false;
				} else {
					valid = this._validateValue(this._parseDateFromMaskedValue(value));
				}
			} else {
				valid = this._validateValue(this._dateObjectValue);
				if (value !== "" && !valid) {

					//Raise warning not all required fields are entered
					//State - message
					valid = false;
					this._sendNotification("warning", $.ig.Editor.locale.dateMessage);
				}
			}
			this._skipMessages = false;
			return valid;
		},
		/* This method is inherited from a parent widget and it's supported in igDateEditor */
		dropDownButton: function () {
			/*@Skipped@*/
			throw ($.ig.Editor.locale.datePickerNoSuchMethodDropDownContainer);
		},
		/* This method is inherited from a parent widget and it's supported in igDateEditor */
		dropDownContainer: function () {
			/*@Skipped@*/
			throw ($.ig.Editor.locale.datePickerNoSuchMethodDropDownContainer);
		},
		/* This method is inherited from a parent widget and it's supported in igDateEditor */
		dropDownVisible: function () {
			/*@Skipped@*/
			throw ($.ig.Editor.locale.datePickerNoSuchMethodDropDownContainer);
		},
		/* This method is inherited from a parent widget and it's supported in igDateEditor */
		findListItemIndex: function () {
			/*@Skipped@*/
			throw ($.ig.Editor.locale.datePickerEditorNoSuchMethod);
		},
		/* This method is inherited from a parent widget and it's supported in igDateEditor */
		getSelectedListItem: function () {
			/*@Skipped@*/
			throw ($.ig.Editor.locale.datePickerEditorNoSuchMethod);
		},
		/* This method is inherited from a parent widget and it's supported in igDateEditor */
		selectedListIndex: function () {
			/*@Skipped@*/
			throw ($.ig.Editor.locale.datePickerEditorNoSuchMethod);
		}
	});
	$.widget("ui.igDatePicker", $.ui.igDateEditor, {
		options: {
			/* type="object" Gets/Sets custom regional settings for editor. If it is string, then $.ig.regional[stringValue] is assumed. */
			regional: null,
			/* type="dropdown|clear|spin" Gets visibility of spin, clear and drop-down button. That option can be set only on initialization. Combinations like 'dropdown,clear' or 'dropdownclear' are supported too.
				dropdown type="string" button to open list is located on the right side of input-field (or left side if base html element has direction:rtl);
				clear type="string" button to clear value is located on the right side of input-field (or left side if base html element has direction:rtl);
				spin type="string" spin buttons are located on the right side of input-field (or left side if base html element has direction:rtl).
			*/
			buttonType: "dropdown",
			/* type="object" Gets/Sets options supported by the jquery.ui.datepicker. Only options related to drop-down calendar are supported. */
			datepickerOptions: null,
			/* @Skipped@ This option is inherited from a parent widget and it's not applicable for igDatePicker */
			dropDownAttachedToBody: false,
			/* @Skipped@ This option is inherited from a parent widget and it's not applicable for igDatePicker */
			isLimitedToListValues: false,
			/* @Skipped@ This option is inherited from a parent widget and it's not applicable for igDatePicker */
			listItemHoverDuration: 0,
			/* @Skipped@ This option is inherited from a parent widget and it's not applicable for igDatePicker */
			listItems: null,
			/* @Skipped@ This option is inherited from a parent widget and it's not applicable for igDatePicker */
			listWidth: 0
		},
		events: {
			/* cancel="true" Event which is raised when the drop down is opening.
				Function takes arguments evt and ui.
				Use ui.owner to obtain reference to igEditor.
				Use ui.editorInput to obtain reference to the editable input
				Use ui.calendar to obtain a reference to jQuery UI date picker widget, used as a calendar from the igDatePicker. */
			dropDownListOpening: "dropDownListOpening",
			/* Event which is raised when the drop down is already opened.
				Function takes arguments evt and ui.
				Use ui.owner to obtain reference to igEditor.
				Use ui.editorInput to obtain reference to the editable input
				Use ui.calendar to obtain a reference to jQuery UI date picker widget, used as a calendar from the igDatePicker. */
			dropDownListOpened: "dropDownListOpened",
			/* @Skipped@ This event is inherited from a parent widget and it's not triggered in igDatePicker */
			dropDownListClosing: "dropDownListClosing",
			/* @Skipped@ This event is inherited from a parent widget and it's not triggered in igDatePicker */
			dropDownItemSelecting: "dropDownItemSelecting",
			/* Event which is raised when the drop down (calendar) is already closed.
				Function takes arguments evt and ui.
				Use ui.owner to obtain reference to igEditor.
				Use ui.editorInput to obtain reference to the editable input
				Use ui.calendar to obtain a reference to jQuery UI date picker widget, used as a calendar from the igDatePicker.*/
			dropDownListClosed: "dropDownListClosed",
			/* @Skipped@ This event is inherited from a parent widget and it's not triggered in igDatePicker */
			dropDownItemSelected: "dropDownItemSelected",
			/* cancel="false" Event which is raised after the date selection in the calendar.
				Function takes argument ui.
				Use ui.owner to obtain reference to igEditor.
				Use ui.dateFromPicker to obtain reference to the date object which is selected.
				Use ui.item to obtain a referece to the selected html element from the calendar.
				Use ui.calendar to obtain a reference to jQuery UI date picker, used as a calendar from the igDatePicker.
				*/
			itemSelected: "itemSelected"
		},
		_setDropDownListWidth: function () { // igDatePicker
		},
		_listMouseDownHandler: function () { // igDatePicker
		},
		_disableEditor: function (applyDisabledClass) { //igDatePicker
			//T.P. 9th Dec 2015 Bug 211010
			//applyDisabledClass parameter is flag wheather the ui-state-disabled class is applied to the both _editorInput and _valueInput
			//In both readOnly and disabled state we have similar logic for making the editor disabled/readonly (detach event and remove classes)
			if (this.options.dropDownOnReadOnly) {
				if (applyDisabledClass) {
					this._editorInput.addClass(this.css.disabled);
				}
				this._detachEvents();
			} else {
				if (applyDisabledClass) {
					this._editorContainer.addClass(this.css.disabled);
				}
				this._detachEvents();
			}
			if (this._dropDownButton && !this.options.dropDownOnReadOnly) {
				this._dropDownButton.addClass(this.css.disabled);
				this._detachButtonsEvents(this._dropDownButton);
			}

			if (this._clearButton) {
				this._clearButton.addClass(this.css.disabled);
				this._detachButtonsEvents(this._clearButton);
			}
			if (this._spinUpButton) {
				this._spinUpButton.addClass(this.css.disabled);
				this._detachButtonsEvents(this._spinUpButton);
			}
			if (this._spinDownButton) {
				this._spinDownButton.addClass(this.css.disabled);
				this._detachButtonsEvents(this._spinDownButton);
			}
		},
		_pickerDefaults: function () {
			var self = this, pickerDefaults;
			pickerDefaults = {
				showOn: "",
				duration: self.options.dropDownAnimationDuration ?
					self.options.dropDownAnimationDuration :
					"normal",
				onSelect: function (dateText, inst) {
					var date, dateFromPicker = $(this).datepicker("getDate");
					if (self._dateObjectValue) {

						// Date comming from the picker contains only year, month and date - if the user has specified inputMask with hours and minutes - then selecting the date from the picker should keep the same hours and minutes.
						date = new Date(self._dateObjectValue);
					} else {

						//T.P. 10th Dec 2015 211062: When there is no value and the datepicker selects value the stored date object needs to be with current time.
						//In Case there is no dateObject which meand the editor has no value when the date is selected it will be with current time value (hours, minutes, seconds)
						date = new Date();
					}
					date = self._setDateField("year", date, dateFromPicker.getFullYear());

					//Temporary change the date to be in the middle of the month 15th, because when using JavaScript Date object to set month when date is 31, the date object is moved with one day.
					date = self._setDateField("date", date, 15);
					date = self._setDateField("month", date, dateFromPicker.getMonth());
					date = self._setDateField("date", date, dateFromPicker.getDate());

					self._processValueChanging(date);
					self._triggerItemSelected.call(self,
						inst.dpDiv.find(".ui-datepicker-calendar>tbody>tr>td .ui-state-hover"),
							dateFromPicker);
					self._processTextChanged();
					if (self.options.readOnly === true || self.options.disabled === true) {
						self._exitEditMode();
					} else {
						self._editorInput.focus();
					}
				},
				onClose: $.proxy(self._triggerDropDownClosed, self)
			};
			return pickerDefaults;
		},
		_renderList: function () { // igDatePicker
			var self = this, options, regional;

			//#207222 S.D. Change options to have priority instead of regional settings
			regional = $.extend(self._dpRegion(), self.options.datepickerOptions) || {};

			options = $.extend(regional, this._pickerDefaults());
			if (regional.onSelect) {
				var igOnSelect = regional.onSelect;
				options.onSelect = function (dateText, inst) {
					igOnSelect.call(this, dateText, inst);
					if (self.options.datepickerOptions &&
						self.options.datepickerOptions.onSelect) {
						self.options.datepickerOptions.onSelect.call(this, dateText, inst);
					}
				};
			}
			if (regional.onClose) {
				var igOnClose = regional.onClose;
				options.onClose = function (dateText, inst) {
					igOnClose.call(this);
					if (self.options.datepickerOptions && self.options.datepickerOptions.onClose) {
						self.options.datepickerOptions.onClose.call(this, dateText, inst);
					}
				};
			}
			this._editorInput.datepicker(options);
			this._dropDownList = this._editorInput.datepicker("widget");
		},
		_renderDropDownButton: function () {
			var dropDownButton = $("<div role='button' tabindex='-1' id='" +
					this.id + "_calendarButton' aria-label='" +
					this._getLocaleOption("ariaCalendarButton") + "'></div>"),
				dropDownIcon = $("<div></div>");

			if (this._dropDownButton) {
				return;
			}
			dropDownButton.addClass(this.css.buttonCommon);
			dropDownButton.attr("title", this._getLocaleOption("datePickerButtonTitle"));
			this._editorContainer.prepend(dropDownButton
				.addClass(this.css.dropDownButton)
				.append(dropDownIcon.addClass(this.css.dropDownImage)));
			this._dropDownButton = dropDownButton;
			this._attachButtonsEvents("dropdown", dropDownButton);
		},
		_dpRegion: function () {
			var reg = this.options.regional, lastRegional, regional;
			regional = ($.datepicker && typeof reg === "string") ?
				$.datepicker.regional[ (reg === "defaults" || reg === "en-US") ? "" : reg ] :
				null;
			if (regional === null && $.datepicker) {
				for (lastRegional in $.datepicker.regional) { }
				if ($.datepicker.regional[ lastRegional ]) {
					regional = $.datepicker.regional[ lastRegional ];
				}
			}
			return regional;

			// TODO refactor that function later
		},
		_create: function () { // igDatePicker
			$.ui.igDateEditor.prototype._create.call(this);
		},
		_initialize: function () { //igDatePicker
			this._super();

			//We set this option internally so we can call the _renderList method.
			this.options.listItems = [ "datePicker" ];
		},
		_applyOptions: function () { // DatePicker
			this._super();

			if (!this.options.minValue &&
				this.options.datepickerOptions &&
				this.options.datepickerOptions.minDate) {
				if (this._isValidDate(this.options.datepickerOptions.minDate)) {
					this.options.minValue = this.options.datepickerOptions.minDate;
				}
			}
			if (!this.options.maxValue &&
				this.options.datepickerOptions &&
				this.options.datepickerOptions.maxDate) {
				if (this._isValidDate(this.options.datepickerOptions.minDate)) {
					this.options.maxValue = this.options.datepickerOptions.maxDate;
				}
			}
		},
		_setOption: function (option, value) { // igDatePicker
			/* igPercentEditor custom setOption goes here */
			var prevValue = this.options[ option ];
			if (prevValue === value) {
				return;
			}

			// The following line applies the option value to the igWidget meaning you don't
			// have to perform this.options[ option ] = value;
			$.Widget.prototype._setOption.apply(this, arguments);
			switch (option) {
				case "datepickerOptions": {
					var pickerOptions = this._editorInput.data("datepicker").settings,
						settings, self = this;
					settings = $.extend(value, this._pickerDefaults());
					pickerOptions = $.extend(pickerOptions, settings);

					if (settings.onSelect) {
						var igOnSelect = settings.onSelect;
						pickerOptions.onSelect = function (dateText, inst) {
							igOnSelect.call(this);
							if (self.options.datepickerOptions &&
								self.options.datepickerOptions.onSelect) {
								self.pickerOptions.datepickerOptions
									.onSelect.call(this, dateText, inst);
							}
						};
					}
					if (settings.onClose) {
						var igOnClose = settings.onClose;
						pickerOptions.onClose = function (dateText, inst) {
							igOnClose.call(this);
							if (self.options.datepickerOptions &&
								self.options.datepickerOptions.onClose) {
								self.pickerOptions.datepickerOptions
									.onClose.call(this, dateText, inst);
							}
						};
					}
					this._editorInput.data("datepicker").settings = pickerOptions;
				}
					break;
				default: {

					//In case no propery matches, we call the super. Into the base widget default statement breaks
					this.options[ option ] = prevValue;
					this._super(option, value);
				}
					break;
			}
		},
		_triggerKeyDown: function (event) { //igDatePicker
			// If we press arrow down/up, without alt, we don't want drop down to appear/disappear.
			// If we press arrow down/up, with ctrl, we want to navigate in the calendar, instead of increasing the time, where the cursor is positioned.
			if (event.keyCode === 38 && !event.altKey) {
				if (!event.ctrlKey) {
					this._spinUpEditMode();
				}
			} else if (event.keyCode === 40 && !event.altKey) {
				if (!event.ctrlKey) {
					this._spinDownEditMode();
				}
			} else {
				this._super(event);
			}
		},
		_triggerDropDownOpened: function () {
			var args = {
				owner: this,
				editorInput: this._editorInput,
				calendar: this._dropDownList
			};
			this._trigger(this.events.dropDownListOpened, null, args);
		},
		_triggerDropDownOpeninng: function () {
			var args = {
				owner: this,
				editorInput: this._editorInput,
				calendar: this._dropDownList
			};
			return this._trigger(this.events.dropDownListOpening, null, args);
		},
		_triggerDropDownClosed: function () {
			var args = {
				owner: this,
				editorInput: this._editorInput,
				calendar: this._dropDownList
			};
			this._trigger(this.events.dropDownListClosed, null, args);
		},
		_toggleDropDown: function () { //igDatePicker
			var noCancel;

			// Close dropdown
			//T.P. 15th March 2016. When there are two editors and the drpdown is opened - when we click the dropwodn button
			//of the other editor - click event is triggered prior to blur of the previous editor
			if (this._dropDownList.is(":visible") && !!this._focused) {

					// Proceed with hiding
					this._hideDropDownList();
			} else {

				// Open DropDown
				noCancel = this._triggerDropDownOpening();
				if (noCancel) {

					// Proceed with hiding
					this._showDropDownList();
				}
			}
		},
		_triggerItemSelected: function (htmlItem, dateFromPicker) {
			var args = {
				owner: this,
				dateFromPicker: dateFromPicker,
				item: htmlItem,
				calendar: this._dropDownList
			};
			this._trigger(this.events.itemSelected, null, args);
		},
		_showDropDownList: function () { //DatePicker

			// Open Dropdown
			var self = this, direction, currentDate = this._dateObjectValue, currentInputValue;
			this._cancelBlurDatePickerOpen = true;
			this._positionDropDownList();
			if (this._dropDownListOrientation === "up") {

				//We need this parameter as part of blind animation we're using
				direction = "up";
			} else {
				direction = "down";
			}
			if (this._editMode && this._editorInput.val() !== this._maskWithPrompts) {
				currentDate = this._valueFromText(this._editorInput.val());
			}

			if (currentDate) {
				if (this.options.enableUTCDates) {
					currentDate = new Date(currentDate.getUTCFullYear(),
						currentDate.getUTCMonth(), currentDate.getUTCDate());
				}
				$(this._editorInput).datepicker("setDate", currentDate);

			}
			currentInputValue = this._editorInput.val();
			try {
				this._editorInput.datepicker("option", "showOptions", { direction: direction });

				// $(this._dropDownList).show("blind", { direction: direction }, this.options.dropDownAnimationDuration);
				this._editorInput.datepicker("show");
				if (currentInputValue) {
					this._editorInput.val(currentInputValue);
				}
			} catch (ex) {

				// $(this._dropDownList).show(this.options.dropDownAnimationDuration);
				this._editorInput.datepicker("show");
				if (currentInputValue) {
					this._editorInput.val(currentInputValue);
				}
			}

			// We cannot trigger drop down opened callback, using the datepicker widget API.
			// That's why we use promise and wait all the animations applied to the drop down list and then trigger the event.
			this._dropDownList.promise().done(function () {
				self._triggerDropDownOpened();
			});
		},
		_hideDropDownList: function () {
			this._editorInput.datepicker("hide");
			this._editorInput.attr("aria-expanded", false);
		},

		// igDatePicker public methods
		getCalendar: function () {
			/* Returns a reference to the jQuery calendar used as a picker selector
			returnType="$" Returns reference to jquery object. */
			return $.ui.igTextEditor.prototype.dropDownContainer.call(this);
		},
		/* This method is inherited from a parent widget and it's supported in igDateEditor and igDatePicker */
		dropDownContainer: function () {
			/*@Skipped@*/
			throw ($.ig.Editor.locale.datePickerNoSuchMethodDropDownContainer);
		},
		/* This method is inherited from a parent widget and it's supported in igDateEditor and igDatePicker */
		findListItemIndex: function () {
			/*@Skipped@*/
			throw ($.ig.Editor.locale.datePickerEditorNoSuchMethod);
		},
		/* This method is inherited from a parent widget and it's supported in igDateEditor and igDatePicker */
		getSelectedListItem: function () {
			/*@Skipped@*/
			throw ($.ig.Editor.locale.datePickerEditorNoSuchMethod);
		},
		/* This method is inherited from a parent widget and it's supported in igDateEditor and igDatePicker */
		selectedListIndex: function () {
			/*@Skipped@*/
			throw ($.ig.Editor.locale.datePickerEditorNoSuchMethod);
		},
		showDropDown: function () {
			/* Shows the drop down list. */
			$.ui.igTextEditor.prototype.showDropDown.call(this);
		},
		hideDropDown: function () {
			/* Hides the drop down list. */
			$.ui.igTextEditor.prototype.hideDropDown.call(this);
		},
		dropDownButton: function () {
			/* Returns a reference to the calendar button UI element of the editor.
				returnType="$" Returns reference to jquery object. */
			return $.ui.igTextEditor.prototype.dropDownButton.call(this);
		},
		dropDownVisible: function () {
			/* Returns the visibility state of the calendar.
				returnType="bool" The visibility state of the calendar. */
			return $.ui.igTextEditor.prototype.dropDownVisible.call(this);
		},
		destroy: function () {
			/* Destructor of the widget */
			this._editorInput.datepicker("destroy");
			this._super();
			return this;
		}
	});
	$.widget("ui.igCheckboxEditor", $.ui.igBaseEditor, {
		options: {
			/* type="number" Gets/Sets either the editor is checked or not. */
			checked: false,
			/* type="verysmall|small|normal|large" Gets/Sets size of the checkbox based on preset styles.
				For different sizes, define 'width' and 'height' options instead.
				verysmall The size of the Checkbox editor is very small.
				small The size of the Checkbox editor is small.
				normal The size of the Checkbox editor is normal.
				large The size of the Checkbox editor is large.
			*/
			size: "normal",
			/* type="string" Applies custom class on the checkbox, so that custom image can be used.
				The following jQuery classes can be used in addition http://api.jqueryui.com/theming/icons/
			*/
			iconClass: "ui-icon-check",
			/* type="number" Gets/Sets value in tabIndex for Checkbox Editor. */
			tabIndex: 0
		},
		css: {
			/* Classes applied to the top element when editor is rendered in container. Default value is 'ui-state-default ui-corner-all ui-widget ui-checkbox-container ui-igcheckbox-normal' */
			container: "ui-state-default ui-corner-all ui-widget ui-checkbox-container ui-igcheckbox-normal",
			/* Class applied to the top element when editor is checked. Default value is 'ui-state-checkbox-checked' */
			containerChecked: "ui-state-checkbox-checked",
			/* Class applied to the checkbox element when that holds the styles for the checkbox icon. Default value is 'ui-icon' */
			checkboxIcon: "ui-icon",
			/* Class applied to the checkbox element that there is custom width and height, in order to have the image centered. Default value is 'ui-icon-custom' */
			iconCentered: "ui-icon-custom",
			/* Class applied to the checkbox element when it is checked. Default value is 'ui-igcheckbox-normal-on' */
			checked: "ui-igcheckbox-normal-on",
			/* Class applied to the checkbox element when it is unchecked. Default value is 'ui-igcheckbox-normal-off' */
			unchecked: "ui-igcheckbox-normal-off",
			/* Class applied to the hidden HTML checkbox input when. Default value is 'ui-helper-hidden' */
			checkboxInput: "ui-helper-hidden"
		},
		events: {
			/* cancel="true" Event which is raised on keydown event.
				Return false in order to cancel key action.
				Function takes arguments evt and ui.
				Use evt.originalEvent to obtain reference to event of browser.
				Use ui.owner to obtain reference to igEditor.
				Use ui.key to obtain value of keyCode. */
			keydown: "keydown",
			/* cancel="true" Event which is raised on keypress event.
				Return false in order to cancel key action.
				Function takes arguments evt and ui.
				Use evt.originalEvent to obtain reference to event of browser.
				Use ui.owner to obtain reference to igEditor.
				Use ui.key to obtain value of keyCode.
				Set ui.key to another character which will replace original entry. */
			keypress: "keypress",
			/* Event which is raised on keyup event.
				Function takes arguments evt and ui.
				Use evt.originalEvent to obtain reference to event of browser.
				Use ui.owner to obtain reference to igEditor.
				Use ui.key to obtain value of keyCode. */
			keyup: "keyup",
			/* cancel="true" Event which is raised before value in editor was changed.
				Return false in order to cancel change.
				It can be raised on lost focus or on spin events.
				Function takes arguments evt and ui.
				Use ui.owner to obtain reference to igEditor.
				Use ui.newValue to obtain the new value.
				Use ui.newState to obtain the new state.
				Use ui.oldValue to obtain the old value.
				Use ui.oldState to obtain the old state.
				Use ui.element to obtain reference to the DOM element.
				Use ui.editorInput obtain reference to the editor input.*/
			valueChanging: "valueChanging",
			/* Event which is raised after value in editor was changed. It can be raised on lost focus or on spin events.
				Function takes arguments evt and ui.
				Use ui.owner to obtain reference to igEditor.
				Use ui.newValue to obtain the new value.
				Use ui.newState to obtain the new state.
				Use ui.element to obtain reference to the DOM element.
				Use ui.editorInput obtain reference to the editor input.*/
			valueChanged: "valueChanged"
		},
		_triggerKeyUp: function (event) {
			var args = {
				originalEvent: event,
				owner: this,
				element: event.target,
				editorInput: this._editorInput
			};
			this._trigger(this.events.keyup, event, args);
		},
		_triggerKeyPress: function (event) {
			var args = {
				originalEvent: event,
				owner: this,
				element: event.target,
				editorInput: this._editorInput
			};
			this._trigger(this.events.keypress, event, args);
		},
		_triggerKeyDown: function (event) {
			var args = {
				originalEvent: event,
				owner: this,
				element: event.target,
				editorInput: this._editorInput
			};
			this._trigger(this.events.keydown, event, args);
		},
		_create: function () {
			this._checkedClass = this.css.checked;
			this._uncheckedClass = this.css.unchecked;
			$.ui.igBaseEditor.prototype._create.call(this);
		},
		_render: function () {
			this._triggerRendering();

			if (this.element.is("div")) {
				this._editorContainer = this.element;
				this._editorInput = $("<span></span>");
				this._valueInput = $("<input type='checkbox'></input>");
				this._editorContainer.prepend(this._editorInput);
				this._editorInput.after(this._valueInput);
			} else if (this.element.is("input")) {
				this._valueInput = this.element;
				this._editorInput = $("<span></span>");
				this._editorContainer = this.element.wrap($("<div></div>")).parent();
				this._valueInput.before(this._editorInput);
			} else if (this.element.is("span")) {
				this._editorInput = this.element;
				this._valueInput = $("<input type='checkbox'></input>");
				this._editorContainer = this.element.wrap($("<div></div>")).parent();
				this._editorInput.after(this._valueInput);
			} else {
				throw ($.ig.Editor.locale.instantiateCheckBoxErrMsg);
			}

			this._editorContainer
				.addClass(this.css.container)
				.attr("role", "checkbox");
			this._editorInput.
				addClass(this.css.checkboxIcon).
				addClass(this.options.iconClass).
				addClass(this.css.checked);
			this._valueInput
				.addClass(this.css.checkboxInput)
				.attr("aria-hidden", "true");

			if (!$.ig.util.isIE8 && this._valueInput.attr("type") !== "checkbox") {
				this._valueInput.attr("type", "checkbox");
			}

			this._attachEvents();
			this._applyOptions();
			this._applyAria();

			this._triggerRendered();
		},
		_applyAria: function () {
			var ariaLabeledBy = this.element.attr("aria-labelledby");

			if (ariaLabeledBy) {
				this.element.removeAttr("aria-labelledby");
				this._editorContainer.attr("aria-labelledby", ariaLabeledBy);
			}
		},
		_applyOptions: function () {
			var checked = this.options.checked;
			this._super();

			if (checked) {
				this._initialState();
			} else {
				this.options.checked = false;
			}
			if (this.options.value) {
				this._inputValue = this.options.value;
				this.value(this.options.value);
			}
			this._size(this.options.size);
			this._setWidth(this.options.width);
			this._setHeight(this.options.height);
			this._updateState(checked && checked !== "false" ? true : false);
		},
		_setOption: function (option, value) {
			var iconClass = this.options.iconClass;

			this._super(option, value);
			switch (option) {
				case "checked":
					this._updateState(value && value !== "false" ? true : false);
					break;
				case "value":
					this._inputValue = value;
					this._updateState(this.options.checked);
					break;
				case "size":
					this._size(value);
					break;
				case "iconClass":
					this._setIconClass(iconClass, value);
					break;
				default:
					break;
			}

		},
		_readAttributes: function () {
			var checked = this.element.attr("checked");

			this._super(this.element);

			if (checked) {
				this.element.removeAttr("checked");
				this.options.checked = true;
			}
		},
		_attachEvents: function () {
			var self = this;
			this._super();
			this._editorContainer.on({
				"click.editor": function (event) {
					var internalChecked = self._inputValue !== undefined ?
						self.options.checked :
						true;

					// D.P. Label for can trigger click as if the internal checkbox has been clicked. Browsers toggle state in advance, so revert before _toggleInternal()
					if (self._valueInput[ 0 ].checked !== internalChecked) {

						// Note: Don't preventDefault (all changes in this handler will be ignored) - set value back instead:
						self._valueInput[ 0 ].checked = internalChecked;
						this.focus();
					}
					self._toggleInternal(event);
				},
				"mousedown.editor": function (event) {
					/* Prevent multi-click text selection, but keep focus */
					this.focus();
					event.preventDefault();
					return false;
				},
				"focus.editor": function (event) {
					self._setFocus(event, self._cancelFocusTrigger);
				},
				"blur.editor": function (event) {
					self._setBlur(event);
				},
				"keyup.editor": function (event) {
					var keyCode = event.keyCode || event.which || 0; /*space*/
					self._triggerKeyUp(event);
					if (keyCode === 32) {
						self._toggleInternal(event);
						event.preventDefault();
					}
				},
				"keydown.editor": function (event) {
					self._triggerKeyDown(event);
				},
				"keypress.editor": function (event) {
					var keyCode = event.keyCode || event.which || 0;
					self._triggerKeyPress(event);
					if (keyCode === 32) {
						event.preventDefault();
					}
				}
			});
		},
		_triggerValueChanging: function (event, newState, newValue) {
			var args = {
				owner: this,
				element: event.target,
				editorInput: this._editorInput,
				oldState: this.options.checked,
				newState: newState,
				oldValue: this.value(),
				newValue: newValue
			};
			return this._trigger(this.events.valueChanging, event, args);
		},
		_triggerValueChanged: function (event) {
			var args = {
				owner: this,
				element: event.target,
				editorInput: this._editorInput,
				newState: this.options.checked,
				newValue: this.value()
			};
			this._trigger(this.events.valueChanged, event, args);
			this._trigger(this.options.checked ?
				this.events.checked :
				this.events.unchecked, event, args);
		},
		_triggerFocus: function (event) {
			var args = {
				originalEvent: event,
				owner: this,
				element: event.target,
				editorInput: this._editorInput
			};
			this._trigger(this.events.focus, event, args);
		},
		_triggerBlur: function (event) {
			var args = {
				owner: this,
				element: event.target,
				editorInput: this._editorInput
			};
			this._trigger(this.events.blur, event, args);
		},
		_updateValue: function (value) {
			this.options.value = value;
			this._valueInput.val(value);
		},
		_getState: function () {
			var state;
			if (this._inputValue !== undefined) {
				state = this._valueInput[ 0 ].checked;
			} else {
				var value = this._tryParseBool(this._valueInput[ 0 ].value);
				if (value.ret) {
					state = value.p1;
				} else {
					throw ($.ig.Editor.locale.cannotParseNonBoolValue);
				}
			}

			return state;
		},
		_tryParseBool: function (value) {
			if (typeof value === "boolean") {
				return { ret: true, p1: value };
			} else if (typeof value === "string") {
				return $.ig.Boolean.prototype.tryParse(value);
			}
		},
		_toggleInternal: function (event) {
			var noCancel, newState, newVal;
			newState = !this._getState();
			newVal = this.value();
			if (this._inputValue === undefined) {
				newVal = newState;
			}
			noCancel = this._triggerValueChanging(event, newState, newVal);
			if (noCancel) {
				this._updateState(newState);
				this._triggerValueChanged(event);
				if (this._validator) {// TODO VERIFY
					this._validator._validateInternal(this.element, event);
				}
			}
		},
		_initialState: function () {
			this._valueInput.attr("checked", "checked");
		},
		_updateState: function (value) {
			this.options.checked = value;
			this._editorContainer.attr("aria-checked", value);

			if (value) {
				this._editorInput.removeClass(this._uncheckedClass);
				this._editorContainer.addClass(this.css.containerChecked);

			} else {
				this._editorInput.addClass(this._uncheckedClass);
				this._editorContainer.removeClass(this.css.containerChecked);
			}
			if (this._inputValue !== undefined) {
				this._valueInput[ 0 ].checked = value;
				this._valueInput[ 0 ].value = this._inputValue;
			} else {
				this._valueInput[ 0 ].checked = true;
				this._valueInput[ 0 ].value = value;
			}
		},
		_removeDOM: function () {
			if (this.element.is("div")) {
				this.element.empty();
			} else if (this.element.is("input")) {
				this._editorInput.remove();
				this.element.unwrap();
			} else if (this.element.is("span")) {
				this._valueInput.remove();
				this.element.unwrap();
			}
		},
		_detachEvents: function () {
			this._editorContainer
				.off("click.editor mousedown.editor focus.editor blur.editor keydown.editor");
			this._super();
		},
		_clearStyling: function () {
			this._editorContainer
				.removeClass(this.css.checkboxContainer)
				.removeClass(this.css.containerChecked)
				.removeAttr("role");
			this._editorInput
				.removeClass(this._checkedClass)
				.removeClass(this._uncheckedClass)
				.removeClass(this.css.checkboxIcon)
				.removeClass(this.options.iconClass);
			this._valueInput
				.removeClass(this.css.checkboxInput)
				.removeAttr("aria-hidden");
			this._super();
		},
		_deleteInternalProperties: function () {
			delete this._checkedClass;
			delete this._uncheckedClass;
			this._super();
		},
		_size: function (size) {
			if (size) {
				this._editorContainer
					.removeClass("ui-igcheckbox-verysmall ui-igcheckbox-small")
					.removeClass("ui-igcheckbox-normal ui-igcheckbox-large");
				this._editorContainer.addClass("ui-igcheckbox-" + size);
				this._editorInput
					.removeClass(this._checkedClass).removeClass(this._uncheckedClass);
				this._checkedClass = "ui-igcheckbox-" + size + "-on";
				this._uncheckedClass = "ui-igcheckbox-" + size + "-off";
				this._editorInput.addClass(this._checkedClass);
			}
		},
		_setTabIndex: function (index) {
			this._editorContainer.attr("tabIndex", index);
		},
		_setWidth: function (width) {
			this._super(width);
			if (width) {
				this._editorInput.addClass(this.css.iconCentered);
			}
		},
		_setHeight: function (height) {
			this._super(height);
			if (height) {
				this._editorInput.addClass(this.css.iconCentered);
			}
		},
		_setIconClass: function (oldIconClass, iconClass) {
			this._editorInput.removeClass(oldIconClass).addClass(iconClass);
		},
		_setFocus: function (event, triggerEvent) {
			this._editorContainer.addClass(this.css.focus);
			if (event && !triggerEvent) {
				this._triggerFocus(event);
			} else {
				delete this._cancelFocusTrigger;
			}
		},
		_setFocusDelay: function (delay) {
			var self = this;
			if (delay) {
				this._timeouts.push(setTimeout(function () {
					self._cancelFocusTrigger = true;
					this._editorContainer.focus();
					self._setFocus();
				}, delay));
			} else {
				this._cancelFocusTrigger = true;
				this._editorContainer.focus();
				this._setFocus();
			}
		},
		_setBlur: function (event) {
			this._editorContainer.removeClass(this.css.focus);
			this._triggerBlur(event);
			if (this._validator) { // TODO VERIFY
				this._validator._validateInternal(this.element, event, true);
			}
		},
		isValid: function () { // Checkbox
			/* Checks if value in editor is valid. Note: This function always returns true for the igCheckboxEditor
				returnType="bool" Whether editor value is valid or not */

			// TODO VERIFY
			return true;
		},

		// igCheckboxEditor public methods
		value: function (newValue) {
			/* Gets/Sets Current checked state/Value of the igCheckboxEditor that will be submitted by the HTML form.
				1. If the 'value' option IS NOT defined, then 'value' method will match the checked state of the editor.
				This is a good option when the checkbox is intended to operate as a Boolean editor.
				2. If the 'value' option IS defined, then 'value' method will return the 'value' option,
				the one that is going to be submitted by the HTML form to the server.
				To get checked state regardless of the 'value' option, use $("checkBox").igCheckboxEditor("option", "checked");
				returnType="boolean|string" Current checked state or the value of the igCheckboxEditor that will be submitted by the HTML form.
			*/
			if (newValue !== undefined) {
				if (this._inputValue === undefined) {
					/*no explicit value */
					var result = this._tryParseBool(newValue);
					if (result.ret) {
						this._updateState(result.p1);
					} else {
						throw ($.ig.Editor.locale.cannotSetNonBoolValue);
					}
				} else {
					/* update value only */
					this.options.value = newValue;
					this._inputValue = newValue;
					this._updateState(this._getState());
				}
			} else {
				if (this._inputValue === undefined) {
					return this._getState();
				}
				return this.options.value;
			}
		},
		toggle: function () {
			/* Toggles the state of the checkbox. */
			if (this._getState()) {
				this._updateState(false);
			} else {
				this._updateState(true);
			}
		}
	});

}(jQuery));
