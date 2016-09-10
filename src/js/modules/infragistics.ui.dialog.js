/*!@license
* Infragistics.Web.ClientUI Dialog <build_number>
*
* Copyright (c) 2011-<year> Infragistics Inc.
*
* http://www.infragistics.com/
*
* Depends on:
* jquery-1.9.1.js
* jqueryui/1.8.11/jquery-ui.js
* jquery.ui.core.js
* jquery.ui.widget.js
* jquery.ui.mouse.js
* jquery.ui.draggable.js
* jquery.ui.resizable.js
* Example to use:
*	<script type="text/javascript">
*	$(function () {
*		$("#dialog1").igDialog();
*	});
*	</script>
*	<div id="dialog1"></div>
*/

/*global define, jQuery, setTimeout, document, window*/
(function (factory) {
	if (typeof define === "function" && define.amd) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"jquery-ui",
			"./infragistics.util",
			"./i18n/infragistics.ui.dialog-en"
		], factory );
	} else {

		// Browser globals
		factory(jQuery);
	}
}
(function ($) {
	var _lastTop, _iframe,
		_visCount = 0,
		_modals = [],
		_lastZ = 0,
		_maxZ = 0,
		CLOSE = 0,
		OPEN = 1,
		MIN = 2,
		MAX = 3,
		PIN = 4,
		UNPIN = 5,
		RESTORE = 6,
		_pos = {

		    // default position of dialog
			my: "center",
			at: "center",
			collision: "fit",
			of: window,
			using: function (pos) {
				if (pos.top < 0) {
					pos.top = 0;
				}
				if (pos.left < 0) {
					pos.left = 0;
				}
				var p = $(this).css(pos).offset();
				if (p.top < 0) {
					$(this).css("top", pos.top - p.top);
				}
				if (p.left < 0) {
					$(this).css("left", pos.left - p.left);
				}
			}
		},
		_isSrc = function (elem, src) {
			return elem && src && (elem.has(src).length > 0 || elem[ 0 ] === src);
		},
		_notab = function (elem) {
			return elem.attr("zIndex", -1).css("outline", 0).attr("unselectable", "on");
		},
		_toPx = function (elem, css) {

			// returns px value of style attribute
			var val = elem.css(css);
			if (!val) {
				return 0;
			}
			css = parseFloat(val);
			if (val.indexOf("px") > 0) {
				css += 0.7;
			} else if (val.indexOf("em") > 0) {
				css *= 12;
			} else {
				return 0;
			}
			return Math.floor(css);
		},
		_getPadding = function (elem, vert, margin) {

			// returns px value of vertical/horizontal padding and border style attributes
			return _toPx(elem, (margin || "padding") + (vert ? "Top" : "Left")) +
				_toPx(elem, (margin || "padding") + (vert ? "Bottom" : "Right")) +
				_toPx(elem, "border" + (vert ? "Top" : "Left") + "Width") +
				_toPx(elem, "border" + (vert ? "Bottom" : "Right") + "Width");
		},
		_stopEvt = function (e) {
			try {
				e.preventDefault();
				e.stopPropagation();
			} catch (ex) { }
		};
	/*
		igDialog is a widget based on jQuery UI that provides ability to show target element as the content of a dialog.
		Dialog provides common functionality such as ability to hide, show, minimize, maximize, pin and their combinations using
		buttons located in the header of dialog. It also supports modal state and may track focus.
		When igDialog is created, then target element is removed from its original parent and inserted into dynamically created html elements.
		The parent element of dialog can be form element (if target element is a child of that form) or body.
		When igDialog is destroyed, then original target html element is moved back into its original parent including position within original siblings.
		Note: if application uses tabIndex attributes for child elements of dialog-content, then it is not recommended to have mixed values of tabIndexes for
		elements located inside and outside of dialog.
	*/
	$.widget("ui.igDialog", {
		options: {
			/* type="dom" Gets the jquery DIV object which is used as the main container for the dialog.
				Notes:
				1. That object is optional and it should not contain any children.
				2. It should not have parent.
				3. It should not contain attributes which might destroy layout or appearance of the dialog.
				4. Change of that option is not supported.
				```
				//Initialize
				$(".selector").igDialog({
					mainElement : objContainer
				});

				//Get
				var objContainer = $(".selector").igDialog("option", "mainElement");
				```
			*/
			mainElement: null,
			/* type="opened|closed|minimized|maximized" Gets/Sets the state of the dialog.
				Note: when the dialog is modal, then pinned and minimized states are not supported, because that will trigger misbehavior.
				```
				//Initialize
				$(".selector").igDialog({
					state : "maximized"
				});

				//Get
				var state = $(".selector").igDialog("option", "state");

				//Set
				$(".selector").igDialog("option", "state", "maximized");
				```
				opened type="string" The dialog is opened.
				minimized type="string" The dialog is minimized.
				maximized type="string" The dialog is maximized.
				closed type="string" The dialog is closed.
			*/
			state: "opened",
			/* type="bool" Gets/Sets whether the dialog is pinned.
				When the dialog is pinned, then the html element of the dialog is moved to the original container where the target element was located and position:absolute is removed.
				The pinned dialog does not support modal state, maximized state and it can not be moved.
				Notes:
				1. If the parent element of the original target-element is invisible, then the pinned dialog becomes invisible as well.
				2. The pinned state is not supported for modal dialog.
				```
				//Initialize
				$(".selector").igDialog({
					pinned : true
				});

				//Get
				var isPinned = $(".selector").igDialog("option", "pinned");

				//Set
				$(".selector").igDialog("option", "pinned", true);
				```
			*/
			pinned: false,
			/* type="bool" Gets/Sets whether the dialog should close when Esc key is pressed.
				```
				//Initialize
				$(".selector").igDialog({
					closeOnEscape : false
				});

				//Get
				var closeDialogOnEscape = $(".selector").igDialog("option", "closeOnEscape");

				//Set
				$(".selector").igDialog("option", "closeOnEscape", false);
				```
			*/
			closeOnEscape: true,
			/* type="bool" Gets/Sets whether the close button in the dialog header should be visible.
				```
				//Initialize
				$(".selector").igDialog({
					showCloseButton : false
				});

				//Get
				var showDialogCloseButton = $(".selector").igDialog("option", "showCloseButton");

				//Set
				$(".selector").igDialog("option", "showCloseButton", false);
				```
			*/
			showCloseButton: true,
			/* type="bool" Gets/Sets whether the maximize button in the dialog header should be visible.
				```
				//Initialize
				$(".selector").igDialog({
					showMaximizeButton : true
				});

				//Get
				var showDialogMaximizeButton = $(".selector").igDialog("option", "showMaximizeButton");

				//Set
				$(".selector").igDialog("option", "showMaximizeButton", true);
				```
			*/
			showMaximizeButton: false,
			/* type="bool" Gets/Sets whether the minimize button in the dialog header should be visible.
				```
				//Initialize
				$(".selector").igDialog({
					showMinimizeButton : true
				});

				//Get
				var showDialogMinimizeButton = $(".selector").igDialog("option", "showMinimizeButton");

				//Set
				$(".selector").igDialog("option", "showMinimizeButton", true);
				```
			*/
			showMinimizeButton: false,
			/* type="bool" Gets/Sets whether the pin button in the dialog header should be visible.
				```
				//Initialize
				$(".selector").igDialog({
					showPinButton : true
				});

				//Get
				var showDialogPinButton = $(".selector").igDialog("option", "showPinButton");

				//Set
				$(".selector").igDialog("option", "showPinButton", true);
				```
			*/
			showPinButton: false,
			/* type="bool" Gets/Sets whether the dialog will be pinned on minimize.
				```
				//Initialize
				$(".selector").igDialog({
					pinOnMinimized : true
				});

				//Get
				var pinDialogOnMinimized = $(".selector").igDialog("option", "pinOnMinimized");

				//Set
				$(".selector").igDialog("option", "pinOnMinimized", true);
				```
			*/
			pinOnMinimized: false,
			/* type="string" Gets/Sets the name of the css class which is applied to the SPAN element located on the left side of the header.
				```
				//Initialize
				$(".selector").igDialog({
					imageClass : "dialog-header-image"
				});

				//Get
				var class = $(".selector").igDialog("option", "imageClass");
				```
			*/
			imageClass: null,
			/* type="string" Gets/Sets the text which appears in the header of the dialog.
				```
				//Initialize
				$(".selector").igDialog({
					headerText : "HEADER"
				});

				//Get
				var text = $(".selector").igDialog("option", "headerText");

				//Set
				$(".selector").igDialog("option", "headerText", "HEADER");
				```
			*/
			headerText: null,
			/* type="bool" Gets/Sets whether the dialog header should be visible. 
				```
				//Initialize
				$(".selector").igDialog({
					showHeader : false
				});

				//Get
				var showDialogHeader = $(".selector").igDialog("option", "showHeader");

				//Set
				$(".selector").igDialog("option", "showHeader", false);
				```
			*/
			showHeader: true,
			/* type="bool" Gets/Sets whether the dialog footer should be visible.
				```
				//Initialize
				$(".selector").igDialog({
					showFooter : true
				});

				//Get
				var showDialogFooter = $(".selector").igDialog("option", "showFooter");

				//Set
				$(".selector").igDialog("option", "showFooter", true);
				```
			*/
			showFooter: false,
			/* type="string" Gets/Sets the text which appears in the footer of the dialog.
				```
				//Initialize
				$(".selector").igDialog({
					footerText : "FOOTER"
				});

				//Get
				var text = $(".selector").igDialog("option", "footerText");

				//Set
				$(".selector").igDialog("option", "footerText", "FOOTER");
				```
			*/
			footerText: null,
			/* type="string" Gets/Sets name of the css class which is applied to the main DIV element of the dialog.
				```
				//Initialize
				$(".selector").igDialog({
					dialogClass : "myClass"
				});

				//Get
				var myClass = $(".selector").igDialog("option", "dialogClass");
				```
			*/
			dialogClass: null,
			/* type="object" Gets/Sets the container html element for the dialog.
				That can be reference to html element, jquery selector or jquery object.
				By default the parent form of the original target element is used. If a form is not found, then the body is used.
				Note: If the "position" of the container is not set or it is "static", then the position is set to "relative".
				```
				//Initialize
				$(".selector").igDialog({
					container : objContainer
				});

				//Get
				var objContainer = $(".selector").igDialog("option", "container");
				```
			*/
			container: null,
			/* type="number|string" Gets/Sets the initial height of the dialog in pixels for normal state.
				Besides numeric values, following units are supported: "px", "em" and "%".
				In case of "%", the size of browser window is used and it has effect only on open action.
				```
				//Initialize
				$(".selector").igDialog({
					height : 500
				});

				//Get
				var height = $(".selector").igDialog("option", "height");

				//Set
				$(".selector").igDialog("option", "height", 500);
				```
				*/
			height: null,
			/* type="number|string" Gets/Sets the initial width of the dialog in pixels for normal state.
				Besides numeric values, following units are supported: "px", "em" and "%".
				In case of "%", the size of browser window is used and it has effect only on open action.
				```
				//Initialize
				$(".selector").igDialog({
					width : 500
				});

				//Get
				var width = $(".selector").igDialog("option", "width");

				//Set
				$(".selector").igDialog("option", "width", 500);
				```
				*/
			width: 300,
			/* type="number" Gets/Sets the minimal height of the dialog in normal state.
				```
				//Initialize
				$(".selector").igDialog({
					minHeight : 100
				});

				//Get
				var minHeight = $(".selector").igDialog("option", "minHeight");

				//Set
				$(".selector").igDialog("option", "minHeight", 100);
				```
			*/
			minHeight: 100,
			/* type="number" Gets/Sets the minimal width of the dialog in normal state.
				```
				//Initialize
				$(".selector").igDialog({
					minWidth : 100
				});

				//Get
				var minWidth = $(".selector").igDialog("option", "minWidth");

				//Set
				$(".selector").igDialog("option", "minWidth", 100);
				```
			*/
			minWidth: 150,
			/* type="number" Gets/Sets the maximal height of the dialog in normal state. Note: that option has effect only while resizing the dialog by the end user.
				```
				//Initialize
				$(".selector").igDialog({
					maxHeight : 1000
				});

				//Get
				var maxHeight = $(".selector").igDialog("option", "maxHeight");

				//Set
				$(".selector").igDialog("option", "maxHeight", 1000);
				```
			*/
			maxHeight: null,
			/* type="number" Gets/Sets the maximal width of the dialog in normal state. Note: that option has effect only while resizing the dialog by the end user.
				```
				//Initialize
				$(".selector").igDialog({
					maxWidth : 1000
				});

				//Get
				var maxWidth = $(".selector").igDialog("option", "maxWidth");

				//Set
				$(".selector").igDialog("option", "maxWidth", 1000);
				```
			*/
			maxWidth: null,
			/* type="bool" Gets/Sets whether the dialog can be dragged by the user.
				```
				//Initialize
				$(".selector").igDialog({
					draggable : false
				});

				//Get
				var isDraggable = $(".selector").igDialog("option", "draggable");

				//Set
				$(".selector").igDialog("option", "draggable", false);
				```
			*/
			draggable: true,
			/* type="object" Gets/Sets the initial position of the dialog. That should be an object, which contains "top" and "left" members or an object
				supported by jquery.position(param) method. Examples: { left: 100, top: 200 }, { my: "left top", at: "left top", offset: "100 200" }
				```
				//Initialize
				$(".selector").igDialog({
					position : { left: 100, top: 200 }
				});

				//Get
				var position = $(".selector").igDialog("option", "position");

				//Set
				$(".selector").igDialog("option", "position", { left: 100, top: 200 });
				```
			*/
			position: null,
			/* type="bool" Gets/Sets whether the dialog can be resized by the user.
				```
				//Initialize
				$(".selector").igDialog({
					resizable : false
				});

				//Get
				var isResizable = $(".selector").igDialog("option", "resizable");

				//Set
				$(".selector").igDialog("option", "resizable", false);
				```
			*/
			resizable: true,
			/* type="number" Gets/Sets the value for the tabIndex attribute applied to the main html element of the dialog.
				```
				//Initialize
				$(".selector").igDialog({
					tabIndex : 1
				});

				//Get
				var state = $(".selector").igDialog("option", "tabIndex");

				//Set
				$(".selector").igDialog("option", "tabIndex", 1);
				```
			*/
			tabIndex: 0,
			/* type="object" Gets/Sets the animation applied to the dialog when it is opened. That can be any object supported by the jquery show(param) method.
				```
				//Initialize
				$(".selector").igDialog({
					openAnimation : "explode"
				});

				//Get
				var animation = $(".selector").igDialog("option", "openAnimation");

				//Set
				$(".selector").igDialog("option", "openAnimation", "explode");
				```
			*/
			openAnimation: null,
			/* type="object" Gets/Sets the animation applied to the dialog when it is closed. That can be any object supported by the jquery hide(param) method.
				```
				//Initialize
				$(".selector").igDialog({
					closeAnimation : "slide"
				});

				//Get
				var animation = $(".selector").igDialog("option", "closeAnimation");

				//Set
				$(".selector").igDialog("option", "closeAnimation", "slide");
				```
			*/
			closeAnimation: null,
			/* type="number" Gets/Sets the value of zIndex applied to the main html element of the dialog. If value is not set, then 1000 is used.
				```
				//Initialize
				$(".selector").igDialog({
					zIndex : 1001
				});

				//Get
				var zIndex = $(".selector").igDialog("option", "zIndex");

				//Set
				$(".selector").igDialog("option", "zIndex", 1001);
				```
			*/
			zIndex: null,
			/* type="bool" Gets/Sets the modal state of the dialog.
				If there are more than 1 modal igDialog, then the last opened dialog wins and becomes on the top.
				Note: the modal functionality is not supported when the dialog is minimized or pinned, because that will trigger misbehavior.
				```
				//Initialize
				$(".selector").igDialog({
					modal : true
				});

				//Get
				var isModal = $(".selector").igDialog("option", "modal");

				//Set
				$(".selector").igDialog("option", "modal", true);
				```
			*/
			modal: false,
			/* type="bool" Gets/Sets the ability to process focus and blur events of the child elements located in the dialog in order to maintain the focused state.
				Notes:
				If that option is enabled, then focus and blur event handlers are added to all the child elements of the dialog.
				If the dialog is modal or it can be maximized, then it is not recommended to disable that option.
				If that option is modified after the igDialog was already created, then depending on current state of the dialog, it will be temporary closed-opened or opened-closed.
				```
				//Initialize
				$(".selector").igDialog({
					trackFocus : false
				});

				//Get
				var trackDialogFocus = $(".selector").igDialog("option", "trackFocus");

				//Set
				$(".selector").igDialog("option", "trackFocus", false);
				```
			*/
			trackFocus: true,
			/* type="string" Gets/Sets the title/tooltip for the close button in the dialog. That is an override for $.ig.Dialog.locale.closeButtonTitle.
				```
				//Initialize
				$(".selector").igDialog({
					closeButtonTitle : "X"
				});

				//Get
				var title = $(".selector").igDialog("option", "closeButtonTitle");

				//Set
				$(".selector").igDialog("option", "closeButtonTitle", "X");
				```
			*/
			closeButtonTitle: null,
			/* type="string" Gets/Sets the title/tooltip for the minimize button in the dialog. That is an override for $.ig.Dialog.locale.minimizeButtonTitle.
				```
				//Initialize
				$(".selector").igDialog({
					minimizeButtonTitle : "MIN"
				});

				//Get
				var title = $(".selector").igDialog("option", "minimizeButtonTitle");

				//Set
				$(".selector").igDialog("option", "minimizeButtonTitle", "MIN");
				```
			*/
			minimizeButtonTitle: null,
			/* type="string" Gets/Sets the title/tooltip for the maximize button in the dialog. That is an override for $.ig.Dialog.locale.maximizeButtonTitle.
				```
				//Initialize
				$(".selector").igDialog({
					maximizeButtonTitle : "MAX"
				});

				//Get
				var title = $(".selector").igDialog("option", "maximizeButtonTitle");

				//Set
				$(".selector").igDialog("option", "maximizeButtonTitle", "MAX");
				```
			*/
			maximizeButtonTitle: null,
			/* type="string" Gets/Sets the title/tooltip for the pin button in the dialog. That is an override for $.ig.Dialog.locale.pinButtonTitle.
				```
				//Initialize
				$(".selector").igDialog({
					pinButtonTitle : "PIN"
				});

				//Get
				var tilte = $(".selector").igDialog("option", "pinButtonTitle");

				//Set
				$(".selector").igDialog("option", "pinButtonTitle", "PIN");
				```
			*/
			pinButtonTitle: null,
			/* type="string" Gets/Sets the title/tooltip for the unpin button in the dialog. That is an override for $.ig.Dialog.locale.unpinButtonTitle.
				```
				//Initialize
				$(".selector").igDialog({
					unpinButtonTitle : "UNPIN"
				});

				//Get
				var title = $(".selector").igDialog("option", "unpinButtonTitle");

				//Set
				$(".selector").igDialog("option", "unpinButtonTitle", "UNPIN");
				```
			*/
			unpinButtonTitle: null,
			/* type="string" Gets/Sets the title/tooltip for the restore button in the dialog. That is an override for $.ig.Dialog.locale.restoreButtonTitle.
				```
				//Initialize
				$(".selector").igDialog({
					restoreButtonTitle : "RESTORE"
				});

				//Get
				var title = $(".selector").igDialog("option", "restoreButtonTitle");

				//Set
				$(".selector").igDialog("option", "restoreButtonTitle", "RESTORE");
				```
			*/
			restoreButtonTitle: null,
			/* type="string" Gets/Sets the temporary value for src, which is used while changing the parent of the base element if it is an instance of IFRAME. That allows getting around possible javascript exceptions under IE.
				```
				//Initialize
				$(".selector").igDialog({
					temporaryUrl : "http://infragistics.com"
				});

				//Get
				var url = $(".selector").igDialog("option", "http://infragistics.com");
				```
			*/
			temporaryUrl: null,
			/* type="bool" Gets/Sets the ability to adjust the state of the header depending on focused and not-focused states. Note: the "trackFocus" option should be enabled.
				```
				//Initialize
				$(".selector").igDialog({
					enableHeaderFocus : false
				});

				//Get
				var hasHeaderFocus = $(".selector").igDialog("option", "enableHeaderFocus");

				//Set
				$(".selector").igDialog("option", "enableHeaderFocus", false);
				```
			*/
			enableHeaderFocus: true,
			/* type="auto|true|false" Gets/Sets the processing of the double-click on the dialog-header.
				If this option is not false and dialog was minimized, then its state will be set to normal.
				If this option is set to "auto" and showMaximizeButton is enabled or if this option is set to true, then the dialog will be maximized when it was in normal state,
				and dialog-state will be set to normal if it was maximized.
				```
				//Initialize
				$(".selector").igDialog({
					enableDblclick : false
				});

				//Get
				var doubleClick = $(".selector").igDialog("option", "enableDblclick");

				//Set
				$(".selector").igDialog("option", "enableDblclick", false);
				```
			*/
			enableDblclick: "auto"
		},
		events: {
			/* cancel="true" Event which is raised before the state of dialog was changed.
				Return false in order to cancel action.
				```
				//Bind after initialization
				$(document).delegate(".selector", "igdialogstatechanging", function (evt, ui) {
					//return the triggered browser event
					evt;

					// Reference to the igDialog widget.
					ui.owner

					// Obtain the name of button, which triggers the event. If the igDialog state was modified from the code, using control API, then the "button" property is undefined.
					ui.button

					// Obtain the old state of the igDialog. The possible values are: "opened", "minimized", "maximized", "closed".
					ui.oldState

					// Obtain if the old state of the igDialog was pinned.
					ui.oldPinned

					// Obtain one of the following dialog actions:
					//  - "open"
					//  - "close"
					//  - "minimize"
					//  - "maximize"
					//  - "restpore"
					//  - "pin"
					//  - "unpin"
					ui.action
				});

				//Initialize
				$(".selector").igDialog({
					stateChanging : function(evt, ui) {...}
				});
				```
				The function takes arguments "evt" and "ui".
				Use evt to obtain the browser event. That parameter can be null if the state was modified from the code.
				Use ui.owner to obtain a reference to the igDialog.
				Use ui.button to obtain the name of the button, which triggered the event. Note: if the state was modified from the code, then "button" is undefined.
				Use ui.oldState to obtain the old state of the dialog, which can be one of the following: "opened", "minimized", "maximized", "closed".
				Use ui.oldPinned to obtain the boolean value of the old pin state of the dialog.
				Use ui.action to obtain the name of the action. That can be one of the following:
				"open" - request to open the dialog
				"close" - request to close the dialog
				"minimize" - request to minimize the dialog
				"maximize" - request to maximize the dialog
				"restore" - request to restore the dialog from minimized or maximized state
				"pin" - request to pin the dialog
				"unpin" - request to unpin the dialog
			*/
			stateChanging: null,
			/* cancel="false" Event which is raised after the state of the dialog was changed.
				```
				//Bind after initialization
				$(document).delegate(".selector", "igdialogstatechanged", function (evt, ui) {
					//return the triggered browser event
					evt;

					// Reference to the igDialog widget.
					ui.owner

					// Obtain the name of the button, which triggers the event. If the igDialog state was modified from the code, using the control API, then the "button" property is undefined.
					ui.button

					// Obtain the old state of the igDialog. The possible values are: "opened", "minimized", "maximized", "closed".
					ui.oldState

					// Obtain if the old state of the igDialog was pinned.
					ui.oldPinned

					// Obtain one of the following dialog actions:
					//  - "open"
					//  - "close"
					//  - "minimize"
					//  - "maximize"
					//  - "restpore"
					//  - "pin"
					//  - "unpin"
					ui.action
				});

				//Initialize
				$(".selector").igDialog({
					stateChanged : function(evt, ui) {...}
				});
				```
				The function takes arguments "evt" and "ui".
				Use evt to obtain the browser event. That parameter can be null if the state was modified from the code.
				Use ui.owner to obtain a reference to the igDialog.
				Use ui.button to obtain the name of the button, which triggered the event. Note: if the state was modified from the code, then "button" is undefined.
				Use ui.oldState to obtain the old state of the dialog, which can be one of the following: "opened", "minimized", "maximized", "closed".
				Use ui.oldPinned to obtain the boolean value of the old pin state of the dialog.
				Use ui.action to obtain the name of the action. That can be one of the following:
				"open" - the dialog was opened. Note: the event is raised before a possible "openAnimation" started.
				"close" - the dialog was closed. Note: the event is raised before a possible "closeAnimation" started.
				"minimize" - the dialog was minimized
				"maximize" - the dialog was maximized
				"restore" - the dialog was restored from minimized or maximized state
				"pin" - the dialog was pinned
				"unpin" - the dialog was unpinned
			*/
			stateChanged: null,
			/* cancel="false" Event which is raised after the end of the animation when the dialod was closed or opened.
				```
				//Bind after initialization
				$(document).delegate(".selector", "igdialoganimationended", function (evt, ui) {
					//return the triggered browser event
					evt;

					// Reference to the igDialog widget.
					ui.owner

					// Obtain one of the following dialog actions:
					//  - "open"
					//  - "close"
					ui.action
				});

				//Initialize
				$(".selector").igDialog({
					animationEnded : function(evt, ui) {...}
				});
				```
				The function takes arguments "evt" and "ui".
				Use ui.owner to obtain a reference to the igDialog.
				Use ui.action to obtain the name of the action, which triggered the animation.
				"open" - the dialog was opened
				"close" - the dialog was closed
			*/
			animationEnded: null,
			/* cancel="false" Event which is raised when the dialog or its content gets focus.
				```
				//Bind after initialization
				$(document).delegate(".selector", "igdialogfocus", function (evt, ui) {
					//return the triggered browser event
					evt;

					// Reference to the igDialog widget.
					ui.owner
				});

				//Initialize
				$(".selector").igDialog({
					focus : function(evt, ui) {...}
				```
				The function takes arguments "evt" and "ui".
				Use evt to obtain the browser event.
				Use ui.owner to obtain a reference to the igDialog.
			*/
			focus: null,
			/* cancel="false" Event which is raised when the dialog or its content loses focus.
				```
				//Bind after initialization
				$(document).delegate(".selector", "igdialogblur", function (evt, ui) {
					//return the triggered browser event
					evt;

					// Reference to the igDialog widget.
					ui.owner
				});

				//Initialize
				$(".selector").igDialog({
					blur : function(evt, ui) {...}
				});
				```
				The function takes arguments "evt" and "ui".
				Use evt to obtain the browser event.
				Use ui.owner to obtain a reference to the igDialog.
			*/
			blur: null
		},
		css: {
			/* Classes applied to the main/top element. */
		    dialog: "ui-igdialog ui-dialog ui-widget " +
                "ui-widget-content ui-corner-all",
			/* Classes applied to the header. */
		    header: "ui-igdialog-header ui-dialog-titlebar ui-widget-header " +
                "ui-corner-top ui-helper-clearfix",
			/* Classes applied to the header in focused state. */
			headerFocus: "ui-igdialog-header-focus ui-state-focus",
			/* Classes applied to the header in minimized state. */
			headerMinimized: "ui-corner-bottom",
			/* Classes applied to the header text. */
			headerText: "ui-igdialog-headertext ui-dialog-title",
			/* Extra class applied to SPAN which represents image in header, when "image" option is set. */
			headerImage: "ui-igdialog-headerimage",
			/* Classes applied to the header text when dialog is in minimized state. */
			headerTextMinimized: "ui-igdialog-headertext-minimized",
			/* Classes applied to the buttons located in header. */
			headerButton: "ui-igdialog-headerbutton ui-corner-all ui-state-default",
			/* Classes applied to the buttons located in header when mouse is moved over them. */
			headerButtonHover: "ui-igdialog-headerbutton-hover ui-state-hover",
			/* Classes applied to the close button located in header. */
			close: "ui-igdialog-buttonclose",
			/* Classes applied to the minimize button located in header. */
			minimize: "ui-igdialog-buttonminimize",
			/* Classes applied to the maximize button located in header. */
			maximize: "ui-igdialog-buttonmaximize",
			/* Classes applied to the pin button located in header. */
			pin: "ui-igdialog-buttonpin",
			/* Classes applied to the icon of close button. */
			closeIcon: "ui-igdialog-close-icon ui-icon ui-icon-close",
			/* Classes applied to the icon of minimize button. */
			minimizeIcon: "ui-igdialog-minimize-icon ui-icon ui-icon-minus",
			/* Classes applied to the icon of maximize button. */
			maximizeIcon: "ui-igdialog-maximize-icon ui-icon ui-icon-extlink",
			/* Classes applied to the icon of restore button. */
			restoreIcon: "ui-igdialog-restore-icon ui-icon ui-icon-copy",
			/* Classes applied to the icon of pin button. */
			pinIcon: "ui-igdialog-pin-icon ui-icon ui-icon-pin-s",
			/* Classes applied to the icon of unpin button. */
			unpinIcon: "ui-igdialog-unpin-icon ui-icon ui-icon-pin-w",
			/* Classes applied to the footer. */
			footer: "ui-igdialog-footer ui-widget-header ui-corner-bottom ui-helper-clearfix",
			/* Classes applied to dialog while resizing. */
			resizing: "ui-igdialog-resizing",
			/* Classes applied to dialog while dragging. */
			dragging: "ui-igdialog-dragging",
			/* Classes applied to header when dialog is in unmovable state such as maximized of pinned. */
			unmovable: "ui-igdialog-unmovable",
			/* Classes applied to the shell element when dialog is in modal state. */
			overlay: "ui-igdialog-overlay ui-widget-overlay",
			/* Classes applied to the content area of dialog when target element is IFRAME. */
			contentIframe: "ui-igdialog-content-iframe",
			/* Classes applied to the content area of dialog. */
			content: "ui-igdialog-content ui-widget-content ui-dialog-content"
		},
		_create: function () {
			var elem,
				self = this,
				elem0 = self.element,
				el = elem0[ 0 ],
				url = (el && el.nodeName === "IFRAME") ? el.src : null,
				o = self.options,
				state = o.state,
				parent,
				css = self.css;

			// K.D. December 20th, 2013 Bug #159961 We're no longer attaching the dialog to the body by default
			o.container = o.container || this.element.parent();
			parent = o.container;
			self._fixIE(elem0);
			self._old = {
				position: elem0.css("position"),
				left: elem0.css("left"),
				top: elem0.css("top"),
				display: elem0.css("display"),
				visibility: elem0.css("visibility"),
				width: el.style.width,
				height: el.style.height
			};
			if (url) {
				el.src = o.temporaryUrl || "";
			}
			self._min = state === "minimized" || state === MIN;
			self._max = state === "maximized" || state === MAX;
			self._opened = state && state !== "closed";
			self._oldDad = el.parentNode;

			// Note: elem0.next() fails to return #text object
			self._next = self._oldDad ? el.nextSibling : null;
			self._dad = parent;

			// K.D. January 14th, 2014 The dialog does not preserve attributes or properties for the top-most element
			elem0 = $("<div />");
			this.element.contents().appendTo(elem0);
			el = elem = this.element;
			elem.css({ zIndex: o.zIndex || 1000, outline: 0 }).attr("tabIndex", o.tabIndex)
				.keydown(function (e) {
					if (o.closeOnEscape && e.keyCode === $.ui.keyCode.ESCAPE) {
						self.close(e);
						e.preventDefault();
					}
					if (e.keyCode !== $.ui.keyCode.TAB) {
						return;
					}
					self._tabTime = new Date().getTime();
					if (!self._modal && !self._max) {
						return;
					}
					var min, max, ti, next,
						iNext = -1,
						big = 999999,
						iMin = big,
						iMax = -1,
						targ = e.target,
						ti0 = self._getTabIndex(targ),
						shift = e.shiftKey,
						tabs = $(":tabbable", elem[ 0 ]),
						len = tabs.length,
						i = len;

					// find first/min and last/max tabbable child elements
					while (i-- > 0) {
						ti = self._getTabIndex(el = tabs[ i ]);
						if (ti > iMax) {
							iMax = ti;
							max = el;
						}
						if (ti <= iMin) {
							iMin = ti;
							min = el;
						}

						// find next tabbable elem with same tabIndex as targ
						if (ti === ti0) {
							if (!next) {
								next = el === targ;
								if (!next) {
									iNext = i;
								}
							} else if (iNext < 0) {
								iNext = i;
							}
						}
					}

					// find next tabbable elem with closest tabIndex to targ
					if (iNext < 0) {
						i = len;
					}
					iMin = shift ? -1 : big;
					while (i-- > 0) {
						ti = self._getTabIndex(tabs[ i ]);
						if ((ti > ti0 && ti < iMin && !shift) || (ti < ti0 && ti > iMin && shift)) {
							iMin = ti;
							iNext = i;
						}
					}
					max = max || elem[ 0 ];
					min = min || max;

					// it used if page has mixed tabIndexes of elements on dialog and outside of it
					self._nextTabElem = (iNext >= 0) ? tabs[ iNext ] : (shift ? max : min);
					if (targ === elem[ 0 ] || (targ === min && shift) || (targ === max && !shift)) {
						_stopEvt(e);
						el = shift ? max : min;
						try { el.focus(); } catch (ex) { }
					}
				})
				.mousedown(function (e) { self.moveToTop(e); });
			el.addClass(css.dialog);
			if (o.dialogClass) {
				el.addClass(o.dialogClass);
			}
			elem0.show().addClass(css.content).appendTo(el);
			if (url !== null) {
				elem0[ 0 ].src = url;
				elem0.addClass(css.contentIframe);
			}
			self._modal = self._hasFocus = false;
			self._lastFoc = "blur";
			self._doHeader();
			self._doFooter();
			self._doDraggable();
			self._doResizable();
			if (self._min) {
				self._onMin(true, true, true);
			}
			if (self._max) {
				o.pinned = false;
				self._onMax(true, true, true);
			}
			if (o.pinned) {
				self._onPin(true, true, true);
			}
			if (self._opened) {
				self._open();
			} else {
				elem.hide();
			}
			self._created = true;
			self._save();
		},

		// get around combination of jQuery with IE7 and other versions of IE
		// IE may generate 2 nodes for <input></input>
		// node with tag </input> kills focus functionality
		// since jQuery raises exception for selectors like "/INPUT", there is no choice but remove elements manually
		_fixIE: function (elem) {
			elem = elem.find("*");
			var n, e, i = elem.length;
			while (i-- > 0) {
				e = elem[ i ];
				n = e.nodeName;
				if (n === "/INPUT" || n === "/IMG") {
					e.parentNode.removeChild(e);
				}
			}
		},
		destroy: function () {
			/* Destroys the igDialog and moves the target element to its original parent.
				```
				$(".selector").igDialog("destroy");
				```
				returnType="object" Returns a reference to this igDialog.
			*/

			// K.D. January 14th, 2014 The dialog does not preserve attributes or properties for the top-most element
			// Changing the destructor to accommodate for this.element being the top-most element
			var self = this,
				elem0 = this.element.children(".ui-igdialog-content");
			this._doClose(null, true);
			if (self._winResize) {
				$(window).unbind("resize", self._winResize);
			}
			this.element.children(".ui-igdialog-header").remove();
			this.element.children(".ui-igdialog-footer").remove();

			//elem0.parentNode.removeChild(elem0);
			elem0.contents().unwrap();

			//elem.remove();
			this.element.removeClass(self.css.dialog).css(self._old);
			if (this.options.draggable) {
				this.element.draggable("destroy");
			}
			if (this.options.resizable) {
				this.element.resizable("destroy");
			}
			this.element.unbind();

			// if (next && next.parentNode === dad) {
				// dad.insertBefore(elem0, next);
			// } else {
				// dad.appendChild(elem0);
			// }
			$.Widget.prototype.destroy.apply(this, arguments);
			return this;
		},
		state: function (state) {
			/* Gets/Sets the state of the editor.
				Note: If the state of the dialog changes, then stateChanging and stateChanged events are raised.
				```
				// Get
				$(".selector").igDialog("state");

				// Set
				$(".selector").igDialog("state", "minimized");
				```
				paramType="string" optional="true" New state.
				returnType="string" Returns the state.
			*/
			if (!arguments.length) {
				return this.options.state;
			}
			if ((state === "minimized" || state === MIN) && (!this._min || !this._opened)) {
				if (!this._min) {
					this._minimize();
				} else {
					this._open(null, 1);
				}
			}
			if ((state === "maximized" || state === MAX) && (!this._max || !this._opened)) {
				if (!this._max) {
					this._maximize();
				} else {
					this._open(null, 1);
				}
			}
			if ((state === "opened" || state === OPEN) && (this._min || this._max || !this._opened)) {
				this._onMin();
				this._onMax();
				this._open();
				this.options.state = state;
			}
			if ((state === "closed" || !state) && (this._min || this._max || this._opened)) {
				this._onMin();
				this._onMax();
				this.close();
			}
			return this;
		},
		mainElement: function () {
			/* Gets reference to the dynamically created DIV element which represents the dialog.
				```
				$(".selector").igDialog("mainElement");
				```
				returnType="dom" Returns a reference to the jQuery object.
			*/
			return this.element;
		},
		close: function (e) {
			/* Closes the dialog if it is opened.
				Notes:
				1. If the state of the dialog changes, then stateChanging and stateChanged events are raised.
				2. That method does not change minimized or maximized state of the dialog.
				It means that method "open" will open the dialog and keep previous minimized or maximized state.
				```
				$(".selector").igDialog("close", e);
				```
				paramType="object" optional="true" Browser event: internal use only.
				returnType="object" Returns reference to this igDialog.
			*/
			if (this._opened) {
				this._doClose(e);
			}
			return this;
		},
		open: function () {
			/* Opens the dialog if it is closed. Notes:
				1. If the state of the dialog changes, then stateChanging and stateChanged events are raised.
				2. That method does not change minimized or maximized state of the dialog. It means that if the dialog was in minimized or maximized stated when closed by "close" method, then the dialog will open in minimized or maximized state respectively.
				```
				$(".selector").igDialog("open");
				```
				returnType="object" Returns а reference to this igDialog.
			*/
			return this._open(null, 1);
		},
		minimize: function () {
			/* Minimizes the dialog if it is not minimized.
				Note: If the state of the dialog changes, then stateChanging and stateChanged events are raised.
				```
				$(".selector").igDialog("minimize");
				```
				returnType="object" Returns a reference to this igDialog.
			*/
			if (!this._min) {
				this._minimize();
			}
			return this;
		},
		maximize: function () {
			/* Maximizes the dialog if it is not maximized.
				Note: If the state of the dialog changes, then stateChanging and stateChanged events are raised.
				```
				$(".selector").igDialog("maximize");
				```
				returnType="object" Returns a reference to this igDialog.
			*/
			if (!this._max) {
				this._maximize();
			}
			return this;
		},
		restore: function () {
			/* Sets the normal state for the dialog if it was maximized or minimized.
				Note: If the state of the dialog changes, then stateChanging and stateChanged events are raised.
				```
				$(".selector").igDialog("restore");
				```
				returnType="object" Returns a reference to this igDialog.
			*/
			if (this._max) {
				this._onMax();
			}
			if (this._min) {
				this._onMin();
			}
			return this;
		},
		pin: function () {
			/* Pins the dialog if it is not pinned.
				When the dialog is pinned, then the html element of the dialog is moved to the original container where the target element was located and position:absolute is removed.
				The pinned dialog does not support modal state, maximized state and it can not be moved.
				Notes:
				1. If the parent element of the original target-element is invisible, then the pinned dialog becomes invisible as well.
				2. If the state of the dialog changes, then stateChanging and stateChanged events are raised.
				```
				$(".selector").igDialog("pin");
				```
				returnType="object" Returns a reference to this igDialog.
			*/
			if (!this.options.pinned) {
				this._pin();
			}
			return this;
		},
		unpin: function () {
			/* Unpins the dialog if it is pinned.
				Note: If the state of the dialog changes, then stateChanging and stateChanged events are raised.
				```
				$(".selector").igDialog("unpin");
				```
				returnType="object" Returns a reference to this igDialog.
			*/
			if (this.options.pinned) {
				this._pin();
			}
			return this;
		},
		getTopModal: function () {
			/* Gets a reference to the top modal dialog.
				```
				$(".selector").igDialog("getTopModal");
				```
				returnType="object" reference to igDialog or null.
			*/
			return _modals[ _modals.length - 1 ];
		},
		isTopModal: function () {
			/* Checks if the dialog is modal and if it is currently active.
				```
				$(".selector").igDialog("isTopModal");
				```
				returnType="bool" true: the dialog is on top.
			*/
			return this.getTopModal() === this;
		},
		moveToTop: function (e) {
			/* Moves a not modal dialog to the top.
				```
				$(".selector").igDialog("moveToTop", e);
				```
				paramType="object" optional="true" Original event of browser.
				returnType="object" Returns a reference to this igDialog.
			*/
			var src, name,
				self = this,
				o = self.options,
				zi = o.zIndex,
				elem = self.element,
				zi0 = self._created ? null : zi,
				modal = o.modal,
				elem0 = this.element[ 0 ],
				scrollTop = elem0.scrollTop,
				scrollLeft = elem0.scrollLeft;
			if ($.ig && $.ig.util && $.ig.util.evtButton(e)) {
				return;
			}
			zi = zi || 1000;

			// cancel mousedown for header and footer
			src = e ? e.target : null;
			if (_isSrc(self._header, src) || _isSrc(self._footer, src)) {
				name = src.nodeName;
				if (name !== "INPUT" && name !== "BUTTON") {
				    _stopEvt(e);

					// ensure focus
					self._setFocus();
				}
			} else if (e && !this._hasFocus) {

				// ensure focus
				self._setFocus();
			}
			_maxZ = Math.max(zi0 || zi, _maxZ);
			if (o.pinned) {
				return self;
			}
			if (modal && self._lastZ) {

				// if it is modal dialog with hidden shell, then adjust shells
				elem = self._modalDiv;
				if (elem && elem[ 0 ].offsetWidth < 10) {
					self._onResize();
				}
				return self;
			}
			if (_lastTop === self && (zi0 || zi) >= _maxZ) {
				return self;
			}
			if (_lastTop && !zi0) {
				_lastTop.element.css("zIndex", _lastTop._lastZ || -1);
				_lastTop._save();
			}
			if (_lastZ >= _maxZ) {
				_maxZ++;
			}
			if (modal && !zi0) {
				_maxZ++;
				_maxZ++;
			}

			// bug:120224
			//if ((zi0 || zi) >= _lastZ) {
			_lastTop = self;

			//}
			self._lastZ = _lastZ = zi0 || ((modal || _modals.length > 0) ? _maxZ : zi);
			if (!zi0) {
				elem.css("zIndex", zi0 || _maxZ);
				self._save();
			}
			elem0.scrollTop = scrollTop;
			elem0.scrollLeft = scrollLeft;
			if (modal) {
				self._doModal(_maxZ);
			}
			return self;
		},
		content: function (newContent) {
			/* Retrieves the igDialog content container or sets its content to be the new content provided.
				```
				//Get
				$(".selector").igDialog("content");

				//Set
				$(".selector").igDialog("content", "<div>New content</div>");
				````
				paramType="string" optional="true" The new html content provided as a string. If the parameter is provided then the method acts as a setter.
				returnType="object" If no parameter is provided then the method returns the container carrying the igDialog content. This is the inner container of the dialog window excluding headers, resizing handlers, etc.
			*/
			if (arguments.length === 0) {
				return this.element.children(".ui-igdialog-content");
			}
			this.element.children(".ui-igdialog-content").html(newContent);
		},
		_save: function () {
			var str, input, pos, o = this.options, name = o.inputName;
			if (!name) {
				return;
			}
			input = $('input[name="' + name + '"]');
			if (input.length === 0) {
				input = input.parents("form")[ 0 ] || document.forms[ 0 ];
				if (!input) {
					return;
				}
				input = $('<input type="hidden" name="' + name + '" />').appendTo(input);
			}
			str = "s" + (o.pinned ? "1" : "") + (this._opened ? (this._min ? 2 : (this._max ? 3 : 1)) : 0) +
				(o.width ? ":w" + o.width : "") + (o.height ? ":h" + o.height : "") +
                    (":z" + this.element.css("zIndex") || o.zIndex);
			pos = o.position;
			if (pos && pos.length === 2) {
				str += ":p" + pos[ 0 ] + "," + pos[ 1 ];
			}
			input.val(str);
		},
		_open: function (e, raiseEvt) {
			var self = this,
				o = self.options,
				elem = self.element,
				anim = self._min ? null : o.openAnimation,
				arg = { action: "open", owner: this };
			if ((self._opened && self._vis) || (raiseEvt && !self._fireState(e, true, arg))) {
				return self;
			}
			if (!o.pinned) {
				elem.css("position", "absolute");
			}

			//A.T. 9 July - Fix for bug #142753
			if (o.width !== null) {
				elem.show();
			}

			// adjust opened before _doSize, because _onResize may fail
			self._opened = true;
			self._doSize(1);
			if (anim) {
				elem.hide().show(anim, function () {
					self._trigger("animationEnded", e, arg);
				});
			}
			self._vis = true;
			_visCount++;

			// enable focus/blur processing
			self._trackFocus(elem);
			self.moveToTop(true);
			self._fixState();
			if (raiseEvt) {
				self._fireState(e, false, arg);
			}
			self._save();
			return self;
		},
		_initContainer: function (container, change) {
			if (container) {
				if (typeof container === "string") {
					container = $(container);
				}
				if (container && container[ 0 ]) {
					container = container[ 0 ];
				}
			}
			if (!container || !container.parentNode) {
				container = this.element.parents("form")[ 0 ] || document.body;
			} else if (container.nodeName !== "BODY") {
				var style = container.style, pos = style ? style.position : null;
				if (style && (!pos || pos === "static")) {
					style.position = "relative";
				}
			}
			if (change) {
				this.element.appendTo(container);
			}
			return container;
		},
		_fixState: function () {
		    this.options.state = this._opened ?
                (this._min ? "minimized" : (this._max ? "maximized" : "opened")) : "closed";
		},
		_minimize: function (e) {
			return this._doState(e, { action: this._min ?
                "restore" : "minimize" }, e ? "minimize" : null, "_onMin", true);
		},
		_maximize: function (e) {
			return this._doState(e, { action: this._max ?
                "restore" : "maximize" }, e ? "maximize" : null, "_onMax", true);
		},
		_pin: function (e) {
			return this._doState(e, { action: this.options.pinned ?
                "unpin" : "pin" }, e ? "pin" : null, "_onPin");
		},
		_close: function (e) {
			return this._opened ? this.close(e) : this._open(e);
		},
		_getTabIndex: function (e) {
			return (isNaN(e = parseInt(e.tabIndex, 10)) || e < 1) ? 0 : e;
		},
		_doHeader: function () {
			var button, id, evts,
				i = 4,
				self = this,
				header = self._header,
				o = self.options,
				txt = o.headerText,
				css = self.css;
			if (header) {
				header.remove();
			}
			delete self._minHW;
			header = self._header = _notab($("<div />").addClass(css.header).css("display", "block")
                .prependTo(self.element)).dblclick(function (e) {
				var dbl = o.enableDblclick;
				if (!dbl) {
					return;
				}
				if (self._min) {
					self._doState(e, { action: "restore" }, null, "_onMin", true);
				} else if (dbl === true || (dbl === "auto" && o.showMaximizeButton)) {
					self._doState(e, { action: self._max ? "restore" : "maximize" }, null, "_onMax", true);
				}
			});

			if (o.imageClass) {
			    self._img = $("<span />").addClass(css.headerImage).addClass(o.imageClass)
                    .html("&nbsp;").appendTo(header);
			}
			self._headerText = $("<span />").addClass(css.headerText).html(txt || "&nbsp;").appendTo(header);

			evts = {
				mouseover: function () { $(this).addClass(css.headerButtonHover); },
				mouseleave: function () { $(this).removeClass(css.headerButtonHover); },
				mousedown: function (e) { this._mdb = $.ig && $.ig.util && $.ig.util.evtButton(e); },
				click: function (e) {
					if (!e || this._mdb) {
						return;
					}
					try {
						self[ "_" + $(this).attr("data-id") ](e);
					} catch (ex) {}
					_stopEvt(e);
				},
				touchstart: function (e) { this._drag = null; _stopEvt(e); },
				touchmove: function (e) { this._drag = 1; _stopEvt(e); },
				touchend: function () { if (!this._drag) { $(this).trigger("click"); } }
			};

			// i=order of buttons in header:pin,min,max,close
			while (i-- >= 0) {
				if (i === 3 && o.showCloseButton) {
					id = "close";
				} else if (i === 2 && o.showMaximizeButton) {
					id = "maximize";
				} else if (i === 1 && o.showMinimizeButton) {
					id = "minimize";
				} else {
					id = (i === 0 && o.showPinButton) ? "pin" : null;
				}
				if (id) {
					button = $("<a />").addClass(css.headerButton + " " + css[ id ]).attr("data-id", id)
						.attr("href", "#").attr("role", "button").bind(evts).appendTo(header);
					$("<span />").addClass(css[ id + "Icon" ]).appendTo(button);

					// i=order of buttons in header:pin,min,max,close
					self._loc(button, i === 3 ? CLOSE : (i === 2 ? MAX : (i === 1 ? MIN : PIN)));
				}
			}
			if (!o.showHeader) {
				header.hide();
			}
		},
		_doFooter: function () {
			var self = this,
				o = self.options,
				txt = o.footerText,
				css = self.css;
			if (self._footer) {
				self._footer.remove();
				delete self._footer;
			}
			if (o.showFooter) {
			    self._footer = _notab($("<div />").addClass(css.footer).css("display", "block")
                    .html(txt || "&nbsp").appendTo(self.element));
			}
		},
		_onMin: function (e, noSize, noFocus) {
			var but,
				o = this.options,
				bar = this._footer,
				css = this.css,
				header = this._header,
				min = (e && e.type) ? !this._min : !!e;
			if (min === this._min && this._created) {
				return;
			}
			this._min = min;
			if (min && o.pinOnMinimized) {
				this._onPin(min, true, true);
			}
			but = header.find("." + css.minimize);
			but.find("*").removeClass(min ? css.minimizeIcon : css.restoreIcon)
                .addClass(min ? css.restoreIcon : css.minimizeIcon);
			if (e && e.type && min && this._max) {
				this._onMax(false, true, true);
			}
			this._loc(but, min ? RESTORE : MIN);
			if (min) {
				header.addClass(css.headerMinimized);
				if (bar) {
					bar.hide();
				}
			} else {
				header.removeClass(css.headerMinimized);
				if (bar) {
					bar.show();
				}
			}
			if (!noSize && this._vis) {
				this._doSize();
			}
			if (!noFocus && this._vis) {
				this._setFocus();
			}
			this._save();
		},
		_onMax: function (e, noSize, noFocus) {
			var but,
				o = this.options,
				header = this._header,
				css = this.css,
				max = (e && e.type) ? !this._max : !!e;
			if (max === this._max && this._created) {
				return;
			}
			if (max) {
			    if (this._min) {
			        this._onMin(false, true, true);
			    }
			    if (o.pinned) {
			        this._onPin(false, true, true);
			    }
			}
			this._max = max;
			if (!max) {
				this._restoreHtml();
			} else {

				// K.D. July 3rd, 2014 Bug #166685 Attaching the dialog to the body before maximize and restoring its
			    // position in the DOM on minimize.
			    if (!this.element.parent().is(document.body)) {

			        // D.P. Dec 3rd, 2015 Bug #209633 igHtmlEditor content is cleared after igDialog is maximized
			        // Don't move dialog if it's already direct descendant of the body to avoid iframe relaods
			        this._originalParent = this.element.parent();
			        this.element.appendTo(document.body);
			    }
			}
			but = header.find("." + css.maximize);
			but.find("*").removeClass(max ? css.maximizeIcon : css.restoreIcon)
                .addClass(max ? css.restoreIcon : css.maximizeIcon);
			this._loc(but, max ? RESTORE : MAX);

			if (max) {
				header.addClass(css.unmovable);
			} else {
				header.removeClass(css.unmovable);
			}
			if (!noSize && this._vis) {
				this._doSize();
			}
			if (!noFocus && this._vis) {
				this._setFocus();
			}
			this._save();
		},
		_onPin: function (e, noSize, noFocus) {
			var but, elem, parent, dad, pos,
				old = this._old,
				next = this._next,
				css = this.css,
				header = this._header,
				o = this.options,
				pin = (e && e.type) ? !o.pinned : !!e;
			if (pin === o.pinned && this._created) {
				return;
			}
			o.pinned = pin;

			// fix icon on pin-button
			but = header.find("." + css.pin);
			but.find("*").removeClass(pin ? css.pinIcon : css.unpinIcon)
                .addClass(pin ? css.unpinIcon : css.pinIcon);
			if (this._max && pin) {
				this._onMax(false, false, true);
			}
			this._loc(but, pin ? UNPIN : PIN);
			if (pin) {
				header.addClass(css.unmovable);
			} else {
				header.removeClass(css.unmovable);
			}

			// fix position of dialog
			elem = this.element;
			if (pin) {
				pos = old.position;
				if (this._resize && (pos === "static" || !pos)) {
					pos = "relative";
				}
				this._pinPos = pos = { position: pos, left: old.left, top: old.top };
			} else {
				pos = { position: "absolute" };
			}
			elem.css(pos);

			// fix parent
			parent = elem.parent()[ 0 ];
			dad = pin ? this._oldDad : this._dad;

		    // D.P. Dec 3rd, 2015 Bug #209633: Fixing compare to work with the mix of DOM and jQuery objects..
			if (dad && !$(dad).is(parent)) {
				if (pin && next && next.parentNode === dad) {
					elem.insertBefore(next);
				} else {
					elem.appendTo(dad);
				}
			}
			if (!noFocus && this._vis) {
				this._setFocus();
			}
			if (!noSize && this._vis) {
				if (!pin) {
					this._doSize(1);
				} else {
					this._doModal();
				}
			}
			this._save();
		},
		_doClose: function (e, destroy) {
			var i,
				self = this,
				elem = self.element,
				arg = { action: "close" },
				o = self.options,
				anim = (self._min || destroy) ? null : o.closeAnimation;
			if (!self._opened || (!destroy && !self._fireState(e, true, arg, e ? "close" : null))) {
				return;
			}

			// disable focus/blur processing
			self._trackFocus(elem, 1);
			self._restoreHtml();
			if (_lastTop === self) {
				_lastTop = null;
			}
			self._fireFoc(false);
			self._hasFocus = false;
			delete self._lastZ;
			self._vis = self._opened = false;
			if (destroy) {
				o.modal = false;
			}
			self._doModal();
			if (anim) {
				elem.hide(anim, function () {
					self._trigger("animationEnded", e, arg);
				});
			} else if (!destroy) {
				elem.hide();
			}
			if (!destroy) {
				self._fixState();
				self._fireState(e, false, arg);
			}
			if (--_visCount < 1) {
				_visCount = _lastZ = _maxZ = 0;
			} else if (_visCount === (i = _modals.length)) {
				_modals[ i - 1 ]._setFocus();
			}
			self._save();
		},

		// fire stateChanging/ed event
		// e-browser event
		// before-cancelable before event (suffix ing or ed)
		// arg-ui argument
		// but-name of button or null
		_fireState: function (e, before, arg, but) {
			if (before) {
				var o = this.options;
				arg.oldState = o.state;
				arg.oldPinned = o.pinned;
				arg.owner = this;
				if (but) {
					arg.button = but;
				}
			}
			return this._created ? this._trigger("stateChang" + (before ? "ing" : "ed"), e, arg) : true;
		},

		// fire both stateChanging/ed events and call fnName function
		// e-browser event
		// arg-ui argument
		// but-name of button or null
		// fnName-name of function to call if before-event was not canceled
		// show-ensure that dialog is opened
		_doState: function (e, arg, but, fnName, show) {
			if (this._fireState(e, true, arg, but)) {
				this[ fnName ](e || { type: 1 });
				if (show && !this._opened) {
					this._open(null, true);
				}
				this._fixState();
				if (this._created) {
					this._trigger("stateChanged", e, arg);
				}
			}
			return this;
		},
		_fireFoc: function (foc, e) {
			var name = foc ? "focus" : "blur";
			if (name !== this._lastFoc) {

				// memorize last focus/blur state
				this._trigger(this._lastFoc = name, e, { owner: this });
				if (this.options.enableHeaderFocus) {
					name = this.css.headerFocus;
					if (foc) {
						this._header.addClass(name);
					} else {
						this._header.removeClass(name);
					}
				}
			}
		},

		// attach focus/blur event listeners to elem and all its children
		// remove: request to remove event listeners
		_trackFocus: function (elem, remove) {
			var self = this, focusEvt = self._focusEvt, track = self.options.trackFocus;
			if (!focusEvt && !track) {
				return;
			}
			if (remove) {
				if (self._focBind) {
					self._focBind.unbind(focusEvt);
					delete self._focBind;
				}
				return;
			}
			if (!focusEvt) {
				focusEvt = function (e) {
				    var elems, old = self._focBind, foc = e.type === "focus";

					// N.A. 2/12/2015 Bug #188573
					if (self._isDatePickerOpened()) {
						return;
					}
					if (!foc && old && elem) {

						// add focus listeners to new children (like editors in grid)
						elems = elem.find("*").not(old);
						if (elems.length) {
							self._focBind = old.add(elems);
							elems.bind(focusEvt);
						}
					}
					self._hasFocus = foc;

					// fire focus/blur events with delay with validation for last state
					setTimeout(function () {
					    var focusTo = self.getTopModal(), elem = self.element;

						// do not allow lost focus for modal dialog
					    if (elem && focusTo && !self._hasFocus && !foc && _lastTop === self) {

							// modal or maximized dialog lost focus
							if (self._max || focusTo === self) {
							    focusTo = self._nextTabElem || elem[ 0 ];

							// not-modal-child-dialog of modal-dialog lost focus on tab
							} else {
							    focusTo = (self._tabTime && (new Date()
                                    .getTime() - self._tabTime) < 200) ? elem[ 0 ] : null;
							}
							if (focusTo) {
								self._setFocus(focusTo);
							}
					    }

						// raise focus/blur events
						self._fireFoc(self._hasFocus, e);
					}, 50);
				};
				focusEvt = self._focusEvt = { focus: focusEvt, blur: focusEvt };
			}
			if (track && elem) {
				self._focBind = elem.find("*").add(elem).bind(focusEvt);
			}
		},

		// N.A. 2/12/2015 Bug #188573: The dialog gets the focus and therefore the month/year dropdown of the igDatePicker is closed.
		// There is similar bug in jQuery dialog http://bugs.jqueryui.com/ticket/8989, that is fixed https://github.com/jquery/jquery-ui/commit/c53198c2099d25e80887c86af6d0e624414cc2f7.
		// The dialog doesn't use focusin, but focus, that's why our context is always the dialog and we cannot make the same fix as jQuery.
		_isDatePickerOpened: function () {
			return $("#ui-datepicker-div")[ 0 ] && $("#ui-datepicker-div").css("display") === "block";
		},
		_setFocus: function (elem) {
		    try {

		        // D.P. 2015-12-03 Bug #207631: Controls lose focus when used in an iframe
		        // Don't move focus if it's already inside the dialog
		        if (elem && $(document.activeElement).closest(".ui-igdialog").is(this.element)) {
		            this._hasFocus = true;
		            return;
		        }
		    } catch (ex) { }

		    var self = this;
			setTimeout(function () {
				try {
					if (!self._hasFocus) {
						if (!self.options.trackFocus) {
							self._hasFocus = true;
						}
						elem = elem || self.element[ 0 ];
						elem.focus();
					}
				} catch (ex) {}
			}, 100);
		},

		// used after maximized off
		_restoreHtml: function () {
			var html, old = this._oldHtml, parent = this._originalParent;
			if (parent) {
				this.element.appendTo(parent);
				this._originalParent = null;
			}
			if (old) {
				html = old.html;
				if (html.style) {
					html.style.overflow = old.overflow;
				}
				html.scrollLeft = old.scrollLeft;
				html.scrollTop = old.scrollTop;
				delete this._oldHtml;
			}
		},
		_touch: function (elem, name) {
			var start, self = this, evt = function (evt, type) {
				var act, e = evt.originalEvent,
					touches = e ? e.touches : null,
					one = touches && touches.length === 1;

				// type: null-end
				if (one && type) {
					_stopEvt(evt);
				}

				// !one: scrolling should be ended
				one = one && type === "move";
				if (start) {
					start = one ? start : null;
					act = one ? "Drag" : "Stop";
				} else if (one) {
					start = true;
					elem.trigger("mouseover");
					act = "Start";
				}
				if (act) {
					e = self.element.data(name);
					act = "_mouse" + act;

					// explicitly call _mouseStart/Drag/Stop methods of draggable or resizable
					if (e && e[ act ]) {
						evt.pageX = one ? touches[ 0 ].pageX : 0;
						evt.pageY = one ? touches[ 0 ].pageY : 0;
						e[ act ](evt);
					}
				}
			};
			elem.bind({
				touchstart: function (e) { evt(e, "start"); },
				touchmove: function (e) { evt(e, "move"); },
				touchend: function (e) { evt(e); }
			});
		},
		_doDraggable: function () {
			var self = this, o = self.options, elem = self.element;
			if (elem.draggable && o.draggable) {
				self._touch(self._header, "draggable");
				elem.draggable({
					cancel: ".ui-igdialog-content, .ui-igdialog-headerbutton",
					handle: ".ui-igdialog-header",
					containment: "document",
					start: function () {
						if (o.pinned || self._max) {
							return false;
						}
						$(this).addClass(self.css.dragging);
					},
					stop: function (e, ui) {
						var doc = $(document);
						o.position = [ ui.position.left - doc.scrollLeft(), ui.position.top - doc.scrollTop() ];
						$(this).removeClass(self.css.dragging);
						self._save();
					}
				});
			}
		},
		_doResizable: function () {
			var elems, r, i = 0, self = this, o = self.options, elem = self.element;
			if (!elem.resizable) {
				return;
			}
			self._resize = o.resizable;
			if (!self._resize) {
				return;
			}
			elem.css("position", elem.css("position")).resizable({
				cancel: "." + self.css.content,
				containment: "document",
				alsoResize: self.element.children(".ui-igdialog-content"),
				maxWidth: o.maxWidth,
				maxHeight: o.maxHeight,
				minWidth: self._minWidth(),
				minHeight: o.minHeight,
				handles: (typeof o.resizable === "string") ? o.resizable : "n,e,s,w,se,sw,ne,nw",
				start: function () {

					// Note: cancel has no effect
				    $(this).addClass(self.css.resizing);

				    // restore position, left and top, which were modified by resizing
				    // A.M. April 28th, 2015 Bug #190822 "Resizing is not working properly from the top border of the window"
				    // Dialog now can be resized by dragging the left or the top border of the window
					//pos = ui.originalPosition;
					if (o.pinned && self._pinPos) {
						elem.css(self._pinPos);
					}
				},
				resize: function () {

					// Note: cancel has no effect
				    self._fixCaption();

					// K.D. December 20th, 2013 Bug #159961 Keeping the position because
				    // resizable messes it if inside absolute or relative element.
				    // A.M. April 28th, 2015 Bug #190822 "Resizing is not working properly from the top border of the window"
                    // Dialog now can be resized by dragging the left or the top border of the window
					//elem.css(pos);
					// restore position, left and top, which were modified by resizing
					if (o.pinned && self._pinPos) {
						elem.css(self._pinPos);
					}
				},
				stop: function () {
					$(this).removeClass(self.css.resizing);
					o.height = $(this).height();
					o.width = $(this).width();
					self._save();
				}
			}).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se");
			r = elem.data("resizable") || elem.data("ui-resizable");
			if (r) {

				// get around bug in resizable related to bounds of container
				if (!r._dragFix) {
					r._dragFix = r._mouseDrag;
					r._mouseDrag = function (e) {
						var x, y, d = r.parentData;
						if (d && e) {
							x = e.pageX;
							y = e.pageY;
							if (x <= d.left || y <= d.top || x >= d.left + d.width || y >= d.top + d.height) {
								return false;
							}
						}
						return r._dragFix(e);
					};
				}
				elems = r._handles;
				i = elems.length;
			}
			while (i-- > 0) {
				self._touch($(elems[ i ]), "resizable");
			}
		},
		_toPx: function (val, height) {
			if (typeof val === "number") {
				return val;
			}
			if (!val) {
				return height ? val : 0;
			}
			val = val.toString();
			var elem, num = parseInt(val, 10);
			if (isNaN(num)) {
				return 0;
			}

			// check for em, ex, in, cm, mm, pt units
			if (val.indexOf("m") > 0 || val.indexOf("e") > 0 || val.indexOf("i") > 0 ||
                val.indexOf("t") > 0)
			{
				elem = $("<div />").css({ visibility: "hidden", width: val }).appendTo(this._dad);
				num = elem.width();
				elem.remove();
			} else if (val.indexOf("%") > 0) {
				val = this._winRect(1);
				val = height ? val.height : val.width;
				return Math.floor(num * val / 100);
			}
			return num;
		},

		// fixPos: force adjust position
		// note: dialog should be already opened
		_doSize: function (fixPos) {

			// fix size
			var self = this,
				o = self.options,
				max = self._max,
				pos = max ? [ 0, 0 ] : o.position,
				resize = self._resize ? ".ui-resizable-handle" : null,
				elem0 = self.element.children(".ui-igdialog-content"),
				elem = self.element;
			if (resize) {

				// show/hide resizing handles
				if (self._min || max) {
					$(resize, elem).hide();
				} else {
					$(resize, elem).show();
				}
			}

			// temporary hide headerText, it will be adjusted by _fixCaption
			self._headerText.css("width", 0);
			if (self._min) {
				elem0.hide();
				self._fixCaption(elem);
			} else if (max) {
			    elem0.show().css({ width: "auto", height: "auto" });

				// temporary collapse dialog: to correctly set position (any reasonable values)
			    elem.css({ width: 100, height: 50 });

			//A.T. 9 July - Fix for bug #142753
			} else if (o.width !== null) {
				this._doSizePX(elem0,
					elem,
					Math.max(self._minWidth(), self._toPx(o.width)),
					self._toPx(o.height, true),
					o.minHeight);
				if (resize) {
					elem.resizable("option", "minHeight", o.minHeight);
				}
			}
			if (o.width === null) {
				this._fixCaption(elem);
				elem.show();
			}

			// fix position
			if (!o.pinned && (fixPos || max || self._oldMax)) {
				self._oldMax = max;
				if (max) {
					self._onResize();
				}
				if (elem.position) {
					if (pos) {
						if (pos.left !== undefined && pos.top !== undefined) {
							pos = [ pos.left, pos.top ];
						}
						if (pos && pos.length > 1) {
							if (typeof pos[ 0 ] !== "number") {
								pos[ 0 ] = parseInt(pos[ 0 ]);
							}
							if (typeof pos[ 1 ] !== "number") {
								pos[ 1 ] = parseInt(pos[ 1 ]);
							}
							if (isNaN(pos[ 0 ]) || isNaN(pos[ 1 ])) {
								pos = {};
							} else {

							// N.A. 10/17/2013 - Bug #155039: The property "offset" is deprecated in 1.9.
							if ($.ig.util.jQueryUIMainVersion <= 1 && $.ig.util.jQueryUISubVersion < 9) {
								pos = { my: "left top", at: "left top", offset: pos[ 0 ] + " " + pos[ 1 ] };
							} else {
								pos = { my: "left+" + pos[ 0 ] + " top+" + pos[ 1 ], at: "left top" };
							}
						}
						}
						pos = $.extend({}, _pos, pos);
					}
					elem.css({ top: 0, left: 0 }).position(pos || _pos);
				}
			}
			self._doModal();
			self._save();
		},

		// adjust px width and height of dialog (not minimized)
		_doSizePX: function (elem0, elem, width, height, minHeight) {

			// temporary collapse content in order to calculate height (minHeight) of header text and border/padding of content
			elem0.show().css({ width: "auto", height: 0, minHeight: 0 });
			var zeroHeight = elem.css({ width: width, height: "auto", display: "block" }).height();
			this._fixCaption(elem);
			if (typeof height === "string") {
				if (height.indexOf("px") > 0) {
					height = parseInt(height, 10);
				}
			}

			// auto size for height
			if (typeof height !== "number") {
				height = elem0.css("height", "auto").height() + zeroHeight;
			}
			height = Math.max(minHeight, height);
			elem0.height(Math.max(height - zeroHeight, 0));
			minHeight = height - elem[ 0 ].offsetHeight;
			if (minHeight > 0) {
				elem0.height(Math.max(height - zeroHeight + minHeight, 0));
			}
		},
		_onResize: function () {
			var rect, self = this, div = self.isTopModal() ? self._modalDiv : null;
			if (!self._winResize) {
				$(window).bind("resize", self._winResize = function () {
					setTimeout(function () {
						self._onResize();
					}, 50);
				});
			}
			if (!self._opened || self.options.pinned) {
				return;
			}

			// collapse modal DIV/IFRAME-shells
			if (div) {
				div.hide();
				self._doIframe(div, 1);
			}

			// adjust maximized dialog
			if (self._max) {
				self._doMaxSize(self.element);
			}

			// adjust modal DIV/IFRAME-shells
			if (div) {
				rect = self._winRect();
				div.css({ width: rect.maxWidth - 1, height: rect.maxHeight - 1 }).show();
				self._doIframe(div);
			}
		},
		_minHeaderWidth: function () {
			var outerWidth, elem,
				width = this._minHW,
				elems = this._header.children().not(this._headerText),
				i = elems.length;
			if (!width) {
				width = 3 + _getPadding(this._header);
				while (--i >= 0) {
				    elem = elems[ i ];

					// get around bugs in jquery-1.4.4 (exception in Opera or huge elem.outerWidth in IE)
					try {
						outerWidth = $(elem).outerWidth(true);
					} catch (ex) {}
					width += 1 + ((outerWidth && outerWidth > 2 && outerWidth < 100) ?
					    outerWidth : elem.offsetWidth);
				}
				this._minHW = width;
			}
			return width;
		},

		// minimal width of dialog in normal (not mimimized) state
		_minWidth: function () {
			if (!this._minW) {
				this._minW = this._minHeaderWidth();
			}
			return Math.max(this.options.minWidth, this._minW);
		},

		// adjust width of header text to fit into available width of header
		_fixCaption: function (elem) {
			var width, widths, top, len, topi,
				j = 0,
				i = -1,
				header = this._header,
				cap = this._headerText,
				minCss = this.css.headerTextMinimized;
			if (this._min) {
				cap.css("width", "").addClass(minCss);
				if (!elem) {
					return;
				}
				elem.css({ height: "auto", width: "auto", display: "inline-block" });

				// get around IE6/7 and draggable beyond right edge: check if width of header/dialog is not larger than widths of children
				widths = _getPadding(header) + 3;
				cap = header.children();
				len = cap.length;
				while (++i < len) {
				    widths += cap[ i ].offsetWidth + _toPx($(cap[ i ]), "marginLeft") +
                        _toPx($(cap[ i ]), "marginRight");
				}
				while (j++ < 2) {
				    elem.css("width", widths);

					// verify that buttons did not jump on 2nd line
					widths += 2;
					i = len;
					while (i-- > 0) {
						topi = cap[ i ].offsetTop;
						if (i > 0 && i < len - 1 && Math.abs(top - topi) > 4) {
							break;
						}
						top = topi;
					}
					if (i < 0) {
						j = 4;
					}
				}
				return;
			}
			cap.removeClass(minCss);

			// get around bugs in jquery-1.4.4 (exception in Opera or huge elem.innerWidth in IE)
			try {
				width = header.innerWidth() - 3;
			} catch (ex) { }
			if (!width || width > 1000) {
				width = header[ 0 ].clientWidth - 4;
			}
			width = Math.max(1, width - this._minHeaderWidth());
			cap.css("width", "auto");

			// if themeroller is used, then fonts can change without notification:
			// assume jump from smallest to largest (very ~, but at least something)
			if (cap[ 0 ].offsetWidth * 1.3 > width) {
				cap.css("width", width);
			}
		},

		// stretch dialog to size of window
		_doMaxSize: function (elem) {
			var html,
				old = this._oldHtml,
				elem0 = this.element.children(".ui-igdialog-content"),
				rect = this._winRect(),
				paddingX = _getPadding(elem),
				paddingY = _getPadding(elem, 1);
			html = rect.html;
			if (!old) {

				// save old attributes of window before maximize
				this._oldHtml = old = {
					html: html,
					scrollLeft: html.scrollLeft,
					scrollTop: html.scrollTop
				};
				html.scrollLeft = html.scrollTop = 0;
				if (html.style) {
					old.overflow = html.style.overflow;
					html.style.overflow = "hidden";

					// if window had scrollbars, then recalculate size
					if (rect.maxWidth > rect.width || rect.maxHeight > rect.height) {
						rect = this._winRect(1);
					}
				}
			}
			this._doSizePX(elem0, elem, rect.width - paddingX - 1, rect.height - paddingY - 1, 0);
		},

		// returns properties of window/HTML { width, height, maxWidth, maxHeight, html }
		_winRect: function (sizeOnly) {
		    var size, docElem, width, height, widthOk, heightOk,

				// container = this.options.container,
				maxWidth = 0,
				maxHeight = 0,
				big = 999999,
				win = window,
				doc = win.document,
				body = doc.body,
				html = body;

			// K.D. December 20th, 2013 Bug #159961 We're no longer attaching the dialog to the body by default
			// if (container) {
				// width = container.offsetWidth;
				// height = container.offsetHeight;
				// return { width: width, height: height, maxWidth: width, maxHeight: height, html: container };
			// }
			// find HTML
			while (html && html.nodeName !== "HTML") {
				html = html.parentNode;
			}
			if (!html) {
				html = body;
			}
			docElem = doc.documentElement || html;

			// check for quirks of IE
			size = ((doc.compatMode !== "CSS1Compat") && $.ig.util.isIE) ? body : html;
			width = size.clientWidth;
			height = size.clientHeight;
			if (sizeOnly) {
				return { width: width, height: height };
			}

			// any reasonable valid value
			if (width && width > 50) {
				maxWidth = width;
				maxHeight = height;
			} else {
				width = height = big;
			}
			widthOk = html.scrollWidth;
			heightOk = html.scrollHeight;
			if (widthOk && heightOk) {
				maxWidth = Math.max(maxWidth, widthOk);
				maxHeight = Math.max(maxHeight, heightOk);
			}
			maxWidth = Math.max(maxWidth, body.scrollWidth);
			maxHeight = Math.max(maxHeight, body.scrollHeight);
			widthOk = body.offsetWidth;
			heightOk = body.offsetHeight;
			maxWidth = Math.max(maxWidth, widthOk);
			maxHeight = Math.max(maxHeight, heightOk);
			return { width: (width === big) ?
			    widthOk : width, height: (height === big) ?
			        heightOk : height, maxWidth: maxWidth, maxHeight: maxHeight, html: html
			};
		},

		// create _iframe, adjust its parent and size
		// hide: request to temporary hide iframe (width/height:1px)
		_doIframe: function (div, hide) {

			// trick jslint validation for illegal "JavaScript URL" by hiding part in var
			var src = "javascript";
			if (!_iframe) {
				_iframe = _notab($("<iframe />").attr("frameBorder", 0).attr("scrolling", "no")
					.attr("src", src + ":''")
					.css({ position: "absolute", filter: "alpha(opacity=50)", opacity: 0 }));
			}
			if (_iframe.parent()[ 0 ] !== div.parent()[ 0 ]) {
			    _iframe.css({
			        width: "1px", height: "1px",
			        marginLeft: div.css("marginLeft"), marginTop: div.css("marginTop"),
					left: div.css("left"), top: div.css("top"),
                    zIndex: div.attr("zIndex") - 1 }).insertBefore(div);
			}
			_iframe.css({
			    width: hide ? "1px" : div.css("width"), height: hide ? "1px" : div.css("height")
			});
		},

		// zi: zIndex used when modal shell is visible
		// implement all actions related to modal functionality: start/end modal depending on visibility/pin/minimized
		_doModal: function (zi) {
			var i, pos, on, obj,
				len = _modals.length,
				self = this, o = self.options,
				elem = self.element,
				div = self._modalDiv;
			on = o.modal && !o.pinned && !self._min && self._opened;
			i = $.inArray(self, _modals);
			if (self._modal === on) {
				if (zi && div) {
					div.css("zIndex", zi - 1);
					self._onResize();
				}

				// if that dialog is not modal, then ensure that last modal dialog in array is on top
				if (!on && !_lastTop && len > 0) {
					_modals[ len - 1 ].moveToTop();
				}
				return;
			}

			// add new dialog to array
			if (i < 0 && on) {

				// hide shell of previous top dialog
				if (len > 0) {
					_modals[ len - 1 ]._modalDiv.hide();
				}
				_modals.push(self);
			}

			// remove this dialog from array
			if (i >= 0 && !on) {

				// find last dialog in array, which will be moved on top
				if (i > 0 && i + 1 === len) {
					obj = _modals[ i - 1 ];
				}
				_modals.splice(i, 1);
			}
			self._modal = on;
			if (on) {
			    self._modalDiv = div = _notab($("<div />").css({
			        position: "absolute", left: 0, top: 0, zIndex: _maxZ - 1
			    })
					.addClass(self.css.overlay).mousedown(function (e) {
						self._setFocus();
						_stopEvt(e);
					})
					.insertBefore(elem));
				pos = div.offset();
				div.css({ marginLeft: -pos.left + "px", marginTop: -pos.top + "px" });
				self._onResize();
			} else {
				div.remove();
				_iframe.remove();
				delete self._modalDiv;
				if (obj) {
					obj.moveToTop();
				}
			}
		},
		_loc: function (but, state) {
			state = ((state === MIN) ? "minimize" : ((state === MAX) ? "maximize" : ((state === RESTORE) ?
					"restore" : ((state === CLOSE) ? "close" : ((state === PIN) ?
					"pin" : ((state === UNPIN) ? "unpin" : "open")))))) + "ButtonTitle";
			var val = this.options[ state ] || ($.ig && $.ig.Dialog && $.ig.Dialog.locale ?
                $.ig.Dialog.locale[ state ] : null) || "";
			but.attr("title", val).attr("longdesc", val);
		},
		_setOption: function (key, val) {
			var pos, size, drag, resize,
				elem = this.element, o = this.options, container = key === "container";
			if ((key === "mainElement") || (key === "imageClass")) {
				throw new Error($.ig.Dialog.locale.cannotSetRuntime);
			}
			if (!elem || !key || o[ key ] === val) {
				return this;
			}
			if (key === "state") {
				return this.state(val);
			}
			if (key === "pinned") {
				return this._pin();
			}
			if (container) {
				if (o.draggable && elem.draggable) {
					elem.draggable("destroy");
					drag = true;
				}
				if (o.resizable && elem.resizable) {
					elem.resizable("destroy");
					resize = true;
				}
			}
			$.Widget.prototype._setOption.apply(this, arguments);
			if (typeof val === "function") {
				return this;
			}
			if (container) {
				this._initContainer(val, 1);
				if (drag) {
					this._doDraggable();
				}
				if (resize) {
					this._doResizable();
				}
			}
			if (key === "draggable") {
				if (val) {
					this._doDraggable();
				} else if (elem.draggable) {
					elem.draggable("destroy");
				}
			}
			if (key === "resizable") {
				if (val) {
					this._doResizable();
				} else if (this._resize) {
					this._resize = val;
					elem.resizable("destroy");
				}
			}
			if (key === "modal") {
				this._doModal();
			}
			if (key.indexOf("Button") > 0 || key === "image" || key === "headerText" ||
                key === "showHeader")
			{
				this._doHeader();
				size = true;
			}

			// check for showFooter and footerText
			if (key.indexOf("ooter") > 0) {
				this._doFooter();
				size = true;
			}
			if (key === "tabIndex") {
				elem.attr("tabIndex", val);
			}
			if (key === "zIndex") {
				elem.css("zIndex", val);
				this._save();
			}
			if (this._vis) {
			    pos = key === "position";

				// check for height, width, minHeight, minWidth, maxHeight, maxWidth
				if (container || size || pos || key.indexOf("idth") > 0 || key.indexOf("eight") > 0) {
					this._doSize(pos || container);
				}
			}

			// check for trackFocus, enableHeaderFocus
			if (key.indexOf("Foc") > 0) {
				this._header.removeClass(this.css.headerFocus);
				if (key === "trackFocus" && val !== (this._focBind ? true : false)) {
					if (this._opened) {
						this._doClose();
						this._open();
					} else {
						this._open();
						this._doClose();
					}
				}
			}
			return this;
		}
	});
	$.extend($.ui.igDialog, { version: "<build_number>" });
	return $.ui.igDialog;// REMOVE_FROM_COMBINED_FILES
}));// REMOVE_FROM_COMBINED_FILES
