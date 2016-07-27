(function ($) {
	$.ig.TestUtil = $.ig.TestUtil || {};

	$.ig.TestUtil.simulateDragStart = function (node) {
		var e = $.Event("mousedown");
		e.target = node[0];
		node.data("draggable")._mouseStart(e);
	};
	
	$.ig.TestUtil.simulateDrag = function (node, target) {
		var e = $.Event("mousemove");
		e.target = target[0];
		node.data("draggable")._mouseDrag(e);
	};
	
	$.ig.TestUtil.simulateDrop = function (tree, target) {
		var e = $.Event("mouseup");
		e.target = target[0];
		tree.data("droppable")._drop(e);
	};
	
	$.ig.TestUtil.simulateDragStop = function (node) {
		var e = $.Event("mouseup");
		e.target = node[0];
		node.data("draggable")._mouseStop(e);
	}
})(jQuery);