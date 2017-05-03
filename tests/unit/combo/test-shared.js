function getClassesCount($elem) {
    var classAttr = $elem.attr('class');

    return classAttr ? (classAttr.split(' ')).length : 0;
}

function getHighlightedText($input) {
    var selectedText = '';
    if (window.getSelection) {
        selectedText = window.getSelection().toString();
    }
    else if (document.selection && document.selection.type != 'Control') {
        selectedText = document.selection.createRange().text;
    }
    return selectedText;
}

// Used to get the start and end position of selection in the input
// For more info see http://stackoverflow.com/questions/4928586/get-caret-position-in-html-input
function getInputSelection($elem) {
    var normalizedValue, range, textInputRange, len, endRange,
        start = 0, end = 0, elem = $elem[0];

    if (typeof elem.selectionStart == "number" && typeof elem.selectionEnd == "number") {
        start = elem.selectionStart;
        end = elem.selectionEnd;
    } else if (document.selection && document.selection.type != 'Control') {
        range = document.selection.createRange();

        if (range && range.parentElement() == $elem) {
            len = $elem.value.length;
            normalizedValue = $elem.value.replace(/\r\n/g, "\n");

            // Create a working TextRange that lives only in the input
            textInputRange = $elem.createTextRange();
            textInputRange.moveToBookmark(range.getBookmark());

            // Check if the start and end of the selection are at the very end
            // of the input, since moveStart/moveEnd doesn't return what we want
            // in those cases
            endRange = $elem.createTextRange();
            endRange.collapse(false);

            if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
                start = end = len;
            } else {
                start = -textInputRange.moveStart("character", -len);
                start += normalizedValue.slice(0, start).split("\n").length - 1;

                if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
                    end = len;
                } else {
                    end = -textInputRange.moveEnd("character", -len);
                    end += normalizedValue.slice(0, end).split("\n").length - 1;
                }
            }
        }
    }

    return {
        start: start,
        end: end
    };
}

// classes - array of strings (classes) that the element should have
// attributes - array of objects with key/value attribute pairs that the element should have
function testElementRendering($elem, elName, elType, width, height, top, left, childrenLen, classes, attributes, tolerance) {
    var curClass, i,
        clasesLen = classes ? classes.length : 0,
        attrLen = attributes ? attributes.length : 0,
        elOffset = $elem.offset();

    strictEqual($elem.length, 1, elName + ' was not rendered');
    ok($elem.is(elType), elName + ' should be div element');

    // Adding tolerance for inconsistencies between the running engine and real browsers
    if (tolerance && tolerance.width && tolerance.height) {
        ok(width - tolerance.width <= $elem.outerWidth() && width + tolerance.width >= $elem.outerWidth(), width, elName + ' width is not correct');
        ok(height - tolerance.height <= $elem.outerHeight() && height + tolerance.height >= $elem.outerHeight(), height, elName + ' height is not correct');
    } else {
        strictEqual($elem.outerWidth(), width, elName + ' width is not correct');
        strictEqual($elem.outerHeight(), height, elName + ' height is not correct');
    }

    strictEqual(getClassesCount($elem), clasesLen, elName + ' has incorrect classes count');

    for (i = 0; i < clasesLen; i++) {
        curClass = classes[i];
        ok($elem.hasClass(curClass), 'Class ' + curClass + ' was not applied to ' + elName);
    }

    for (i = 0; i < attrLen; i++) {
        curAttr = attributes[i];
        strictEqual($elem.attr(curAttr.key), curAttr.value, 'The value of ' + curAttr.key + ' attribute should be ' + curAttr.value);
    }

    if (top !== null) {
        strictEqual(elOffset.top, top, elName + ' top position was incorrect');
    }

    if (left !== null) {
        strictEqual(elOffset.left, left, elName + ' left position was incorrect');
    }

    strictEqual($elem.children().length, childrenLen, elName + ' has incorrect number of child elements');
}

function testComboIsDestroyed($element) {
    if ($element.is("select")) {
        equal($element.closest(".igcombo-wrapper").length, 0, "The combo wrapper was not removed.");
        equal($element.attr("name"), "select-combo", "The input name was not moved back to the select element after destroy.");
    } else if ($element.is("div")) {
        ok(!$element.hasClass("igcombo-wrapper"), "The combo wrapper class was not removed.");
        equal($element.children().length, 0, "The combo wrapper was not emptied on destroy");
    } else if ($element.is("input")) {
        equal($element.closest(".igcombo-wrapper").length, 0, "The combo wrapper was not removed.");
        equal($element.attr("name"), "input-combo", "The input name was not moved back to the input element after destroy.");
        equal($._data($element[0], "events"), undefined, "The input events were not removed after destroy.");
    }
}

function emulateKeyBoard(key, ctrl, shift, alt, element) {
    var keyDown = jQuery.Event("keydown"),
        keyUp = jQuery.Event("keyup");

    keyDown.ctrlKey = keyUp.ctrlKey = ctrl;
    keyDown.altKey = keyUp.altKey = alt;
    keyDown.shiftKey = keyUp.shiftKey = shift;

    switch (key) {
        case "up": keyDown.keyCode = keyUp.keyCode = $.ui.keyCode.UP; break;
        case "left": keyDown.keyCode = keyUp.keyCode = $.ui.keyCode.LEFT; break;
        case "right": keyDown.keyCode = keyUp.keyCode = $.ui.keyCode.RIGHT; break;
        case "down": keyDown.keyCode = keyUp.keyCode = $.ui.keyCode.DOWN; break;
        case "enter": keyDown.keyCode = keyUp.keyCode = $.ui.keyCode.ENTER; break;
        case "esc": keyDown.keyCode = keyUp.keyCode = $.ui.keyCode.ESCAPE; break;
        default: keyDown.keyCode = keyUp.keyCode = key; break;
    }

    element.trigger(keyDown);
    element.trigger(keyUp);
}

function emulateNonSpecialKeyPress(keyCode, element) {
    var keyPress = jQuery.Event("keypress");
    var keyDown = jQuery.Event("keydown");

    keyPress.ctrlKey = false;
    keyPress.which = keyCode;
    keyPress.keyCode = keyCode;

    keyDown.ctrlKey = false;
    keyDown.which = keyCode;
    keyDown.keyCode = keyCode;

    $(element).trigger(keyPress);
    $(element).trigger(keyDown);
}

function emulateMouseActions(element, event) {
    var mouseEvent;

    switch (event) {
        case "mouseenter":
            mouseEvent = jQuery.Event("mouseenter");
            break;
        case "mouseleave":
            mouseEvent = jQuery.Event("mouseleave");
            break;
        case "mouseup":
            mouseEvent = jQuery.Event("mousedown");
            break;
        case "mousedown":
            mouseEvent = jQuery.Event("mouseup");
            break;
    }

    $(element).trigger(mouseEvent);
}

function typeInInput(key, element) {
    var keyDown = jQuery.Event("keydown"),
        keyUp = jQuery.Event("keyup");

    keyDown.keyCode = keyUp.keyCode = key;

    element.trigger(keyDown);
    element.val(key);
    element.trigger(keyUp);
}

function clickElement(element, ctrl, shift) {
    var mouseDown = jQuery.Event("mousedown"), mouseUp = jQuery.Event("mouseup");

    mouseUp.ctrlKey = mouseDown.ctrlKey = ctrl === true;
    mouseUp.shiftKey = mouseDown.shiftKey = shift === true;
    mouseDown.which = mouseUp.which = 1;
    element.trigger(mouseDown);
    element.trigger(mouseUp);
}

function testComboIsDisabled($element) {
    var $input = $element.igCombo("textInput");

    ok($element.hasClass("ui-state-disabled"), "Combo does not have ui-state-disabled class applied");
    ok($element.hasClass("ui-igCombo-disabled"), "Combo does not have ui-igCombo-disabled class applied");
    strictEqual($input.attr('readonly'), 'readonly', 'Readonly attribute was not applied');
}

function testComboIsEnabled($element) {
    var $input = $element.igCombo("textInput");

    strictEqual($element.hasClass("ui-state-disabled"), false, "Combo has ui-state-disabled class applied");
    strictEqual($element.hasClass("ui-igCombo-disabled"), false, "Combo has ui-igCombo-disabled class applied");
    strictEqual($input.attr('readonly'), undefined, 'Readonly attribute is applied');
}

function testCheckboxComboItemsExistence($items) {
    var $item;

    for (var i = 0; i < $items.length; i++) {
        $item = $items.eq(i);

        // If .find() returns 1 then classes are applied, if return 0 they are not applied
        strictEqual($item.find("span.ui-igcombo-checkbox.ui-state-default.ui-corner-all.ui-igcheckbox-small").length, 1, "Combo list item[" + i + "] first span does not have ui-igcombo-checkbox ui-state-default ui-corner-all ui-igcheckbox-small classes applied");
        strictEqual($item.find("span.ui-icon.ui-igcombo-checkbox-off.ui-igcheckbox-small-off").length, 1, "Combo list item[" + i + "] second nested span does not have ui-icon ui-igcombo-checkbox-off ui-igcheckbox-small-off applied");
        strictEqual($item.find("div.ui-igcombo-listitemtextwithcheckbox").length, 1, "Combo list item[" + i + "] div element does not have ui-igcombo-listitemtextwithcheckbox class applied");
    }
            }
