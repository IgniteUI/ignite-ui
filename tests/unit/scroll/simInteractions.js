(function ($) {
	$.ig.TestUtil = $.ig.TestUtil || {};
	

	$.ig.TestUtil.simulateSingleClick = function (node, options) {
		var evtMouseOver = $.Event("mouseover"),
			evtMouseDown = $.Event("mousedown"),
			evtMouseUp = $.Event("mouseup")
			evtClick = $.Event("click");
		
		evtMouseOver.target = node[0];
		evtMouseDown.target = node[0];
		evtMouseUp.target = node[0];
		evtClick.target = node[0];
		
		for( var key in options ) {
			if(!options.hasOwnProperty(key)) continue;
			
			var item = options[key];
			evtMouseOver[key] = item;
			evtMouseDown[key] = item;
			evtMouseUp[key] = item;
			evtClick[key] = item;	
		}

		node.trigger(evtMouseOver);
		node.trigger(evtMouseDown);
		node.trigger(evtMouseUp);
		node.trigger(evtClick);
	};

	$.ig.TestUtil.simulateClickAndHold = function (node, holdTime, options) {
		var evtMouseOver = $.Event("mouseover"),
			evtMouseDown = $.Event("mousedown"),
			evtMouseUp = $.Event("mouseup")
			evtClick = $.Event("click");
		
		evtMouseOver.target = node[0];
		evtMouseDown.target = node[0];
		evtMouseUp.target = node[0];
		evtClick.target = node[0];
		
		for( var key in options ) {
			if(!options.hasOwnProperty(key)) continue;
			
			var item = options[key];
			evtMouseOver[key] = item;
			evtMouseDown[key] = item;
			evtMouseUp[key] = item;
			evtClick[key] = item;	
		}
		
		node.trigger(evtMouseOver);
		node.trigger(evtMouseDown);
		
		setTimeout(function () {
			node.trigger(evtMouseUp);
			node.trigger(evtClick);
		}, holdTime);
	};
	
	$.ig.TestUtil.simulateClickDragRelese = function (node, offsetX, offsetY, timeDrag) {
		var evtMouseOver = $.Event("mouseover"),
			evtMouseDown = $.Event("mousedown"),
			evtMouseMove = $.Event("mousemove"),			
			evtMouseUp = $.Event("mouseup");
			nodeCenter = getCenter(node),
			curOffsetX = 0,
			curOffsetY = 0,
			stepTime = 0,
			animationID = 0;
		

		evtMouseOver.target = node[0];		
		evtMouseMove.target = node[0];
		evtMouseDown.target = node[0];
		evtMouseUp.target = node[0];	

		evtMouseDown.pageX = nodeCenter.x;
		evtMouseDown.pageY = nodeCenter.y;

		node.trigger(evtMouseOver);
		node.trigger(evtMouseDown);
		
		if(offsetX > offsetY) {
			stepTime = timeDrag / offsetX;
		} else {
			stepTime = timeDrag / offsetY;
		}
		
		function moveStep () {
			if (curOffsetX < offsetX + 1) {
				curOffsetX++;
			}
			
			if (curOffsetY < offsetY + 1) {
				curOffsetY++;
			}
			
			evtMouseMove.pageX = curOffsetX;
			evtMouseMove.pageY = curOffsetY;
			node.trigger(evtMouseMove);
			
			if(curOffsetX < offsetX + 1 || curOffsetY < offsetY + 1) {
				animationID = requestAnimationFrame(moveStep);
			} else {
				cancelAnimationFrame(animationID);
				node.trigger(evtMouseUp);
				return;
			}
		};
		
		animationID = requestAnimationFrame(moveStep);
	};
	
	function getCenter(node) {		
		node = $(node);
		
		var doc = $(node.ownerDocument),
			offset = node.offset(),
			centerX = offset.left + node.outerWidth() / 2 - doc.scrollLeft();
			centerY = offset.top + node.outerHeight() / 2 - doc.scrollTop();
		
		return { x: centerX, y: centerY }
	}
})(jQuery);