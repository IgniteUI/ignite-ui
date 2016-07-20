if (typeof (jQuery) === "undefined") {
    throw new Error("jQuery is undefined");
}

$.ig = $.ig || {};

$.extend($.ig, {
    apiViewer: function () {
        $(".api-explorer,.api-viewer").addClass("api-ui").wrap("<div class='api-container' />");
        $(".api-viewer").before("<div class='api-viewer-header api-ui'>API VIEWER</div>");
        $(".api-explorer").before("<div class='api-viewer-header api-ui'>API EXPLORER</div>");
        $(".api-explorer,.api-viewer").show();
    }
});

$.ig.apiViewer.prototype = {
    _prevContent: "",
    _prevCount: 0,
    log: function (content) {
        var _$select = ".api-viewer";

        if (content != this._prevContent) {
            this._prevCount = 1;
            $(_$select).prepend("<div id='firstRow' class='api-row'>" + content + "</div>");
            /* OK 7/1/2013 145828 - This causes an exception in the ui-min when it is in an IFrame (jsFiddle) */
            try{
                $("#firstRow").show("blind", 200, function () {
                    $(this).animate({ backgroundColor: "#FFFFFF" }, 500, function () {
                        $(this).removeAttr("id");
                    });
                });
            } catch (ex) { }
        }
        else {
            this._prevCount++
            var element = $(_$select)[0].children[0];
            if (this._prevCount > 1) {
                element.innerHTML = content + (" <span class='api-count'>" + this._prevCount + "</span>");
            }
            else {
                element.innerHTML = cell.innerHTML + (" <span class='api-count'>" + this._prevCount + "</span>");
            }
        }

        this._prevContent = content;
    }
}