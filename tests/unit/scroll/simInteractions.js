(function ($) {
	$.ig.TestUtil = $.ig.TestUtil || {};
	

	$.ig.TestUtil.simulateSingleClick = function (node) {
		var evtMouseOver = $.Event("mouseover"),
			evtMouseDown = $.Event("mousedown"),
			evtMouseUp = $.Event("mouseup")
			evtClick = $.Event("click");
		
		evtMouseOver.target = node[0];
		evtMouseDown.target = node[0];
		evtMouseUp.target = node[0];
		evtClick.target = node[0];
		
		node.trigger(evtMouseOver);
		node.trigger(evtMouseDown);
		node.trigger(evtMouseUp);
		node.trigger(evtClick);
	};

	$.ig.TestUtil.simulateClickAndHold = function (node, holdTime) {
		var evtMouseOver = $.Event("mouseover"),
			evtMouseDown = $.Event("mousedown"),
			evtMouseUp = $.Event("mouseup")
			evtClick = $.Event("click");
		
		evtMouseOver.target = node[0];
		evtMouseDown.target = node[0];
		evtMouseUp.target = node[0];
		evtClick.target = node[0];
		
		node.trigger(evtMouseOver);
		node.trigger(evtMouseDown);
		
		setTimeout(function () {
			node.trigger(evtMouseUp);
			node.trigger(evtClick);
		}, holdTime);
	};
})(jQuery);