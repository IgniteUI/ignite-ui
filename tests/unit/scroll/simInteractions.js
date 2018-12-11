(function ($) {
	$.ig.TestUtil = $.ig.TestUtil || {};
	

	$.ig.TestUtil.simulateSingleClick = function (node, options) {
		var evtMouseOver = $.Event("mouseover"),
			evtMouseDown = $.Event("mousedown"),
			evtMouseUp = $.Event("mouseup")
			evtClick = $.Event("click");
		
		evtMouseOver.target = node[ 0 ];
		evtMouseDown.target = node[ 0 ];
		evtMouseUp.target = node[ 0 ];
		evtClick.target = node[ 0 ];
		
		for(var key in options) {
			if (!options.hasOwnProperty(key)) continue;
			
			var item = options[key];
			evtMouseOver[ key ] = item;
			evtMouseDown[ key ] = item;
			evtMouseUp[ key ] = item;
			evtClick[ key ] = item;	
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
		
		evtMouseOver.target = node[ 0 ];
		evtMouseDown.target = node[ 0 ];
		evtMouseUp.target = node[ 0 ];
		evtClick.target = node[ 0 ];
		
		for (var key in options) {
			if(!options.hasOwnProperty(key)) continue;
			
			var item = options[key];
			evtMouseOver[ key ] = item;
			evtMouseDown[ key ] = item;
			evtMouseUp[ key ] = item;
			evtClick[ key ] = item;	
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
		

		evtMouseOver.target = node[ 0 ];		
		evtMouseMove.target = node[ 0 ];
		evtMouseDown.target = node[ 0 ];
		evtMouseUp.target = node[ 0 ];	

		evtMouseDown.pageX = nodeCenter.x;
		evtMouseDown.pageY = nodeCenter.y;

		node.trigger(evtMouseOver);
		node.trigger(evtMouseDown);
		
		if (offsetX > offsetY) {
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
			
			if (curOffsetX < offsetX + 1 || curOffsetY < offsetY + 1) {
				animationID = requestAnimationFrame(moveStep);
			} else {
				cancelAnimationFrame(animationID);
				node.trigger(evtMouseUp);
				return;
			}
		};
		
		animationID = requestAnimationFrame(moveStep);
	};
	
	/* 	Simulates touch tap
	*	
	*	node - element on which that the tap is being initiated
	*	offsetX - the offset of the center of the element that the tap will be positioned
	*	offsetY - the offset of the center of the element that the tap will be positioned
	*/
	$.ig.TestUtil.simulateTouchTap = function (node, offsetX, offsetY) {
		var evtTouchStart = $.Event("touchstart"),			
			evtTouchEnd = $.Event("touchend"),
			nodeCenterPos = getCenter(node),
			curStep = 0,
			animationID = 0,
			touchObject = {
				clientX: nodeCenterPos.x + offsetX,
				clientY: nodeCenterPos.y + offsetY,
				force: 1,
				identifier: 0,
				pageX: nodeCenterPos.x + offsetX,
				pageY: nodeCenterPos.y + offsetY,
				radiusX: 11.5,
				radiusY: 11.5,
				rotationAngle: 0,
				screenX: nodeCenterPos.x + offsetX,
				screenY: nodeCenterPos.y + offsetY,
				target: node
			};

		evtTouchStart.originalEvent = {};
		evtTouchStart.originalEvent.touches = [];
		evtTouchStart.originalEvent.touches[ 0 ] = touchObject;
		evtTouchStart.target = node[ 0 ];		
		evtTouchEnd.target = node[ 0 ];	

		node.trigger(evtTouchStart);
		node.trigger(evtTouchEnd);
	};
	
	/* 	Simulates touch swipe 
	*	
	*	node - element on which that the swipe is being initiated
	*	stepsMove - array that describes how much moves with each step of the swipe. Structure: [{x: number, y: number}, ...]
	*	timePerStep - number that specifies how much delay there is between steps
	*/
	$.ig.TestUtil.simulateTouchSwipeFromCenter = function (node, stepsMove, timePerStep, defaultPrevented) {
		var evtTouchStart = $.Event("touchstart"),q
			evtTouchMove = $.Event("touchmove"),
			evtTouchEnd = $.Event("touchend"),
			nodeCenterPos = getCenter(node),
			curStep = 0,
			animationID = 0,
			touchObject = {
				clientX: nodeCenterPos.x,
				clientY: nodeCenterPos.y,
				force: 1,
				identifier: 0,
				pageX: nodeCenterPos.x,
				pageY: nodeCenterPos.y,
				radiusX: 11.5,
				radiusY: 11.5,
				rotationAngle: 0,
				screenX: nodeCenterPos.x,
				screenY: nodeCenterPos.y,
				target: node
			};

		evtTouchStart.originalEvent = {};
		evtTouchStart.originalEvent.touches = [];
		evtTouchStart.isDefaultPrevented = function () { return defaultPrevented };
		evtTouchStart.target = node[ 0 ];	
		evtTouchMove.originalEvent = {};
		evtTouchMove.originalEvent.touches = [];		
		evtTouchMove.isDefaultPrevented = function () { return defaultPrevented };
		evtTouchMove.preventDefault  = function () {};		
		evtTouchMove.stopPropagation   = function () {};		
		evtTouchEnd.target = node[ 0 ];	
		evtTouchEnd.isDefaultPrevented = function () { return defaultPrevented };
		
		function moveStep () {	
			touchObject.clientX -= stepsMove[ curStep ].x;
			touchObject.clientY -= stepsMove[ curStep ].y;
			touchObject.pageX -= stepsMove[ curStep ].x;
			touchObject.pageY -= stepsMove[ curStep ].y;		
			evtTouchMove.originalEvent.touches[ 0 ] = touchObject;
			
			node.trigger(evtTouchMove);
			if (curStep < stepsMove.length - 1) {
				curStep++;
				animationID = setTimeout(moveStep, timePerStep);
			} else {
				node.trigger(evtTouchEnd);
				clearTimeout(animationID);
				return;
			}
		};

		evtTouchStart.originalEvent.touches[ 0 ] = touchObject;
		node.trigger(evtTouchStart);
		animationID = setTimeout(moveStep, timePerStep);
	};	
	
	/* 	Simulates touch swipe with IE gesture events
	*	
	*	node - element on which that the swipe is being initiated
	*	stepsMove - array that describes how much moves with each step of the swipe. Structure: [{x: number, y: number}, ...]
	*	timePerStep - number that specifies how much delay there is between steps
	*/
	$.ig.TestUtil.simulateTouchSwipeFromCenterIE = function (node, stepsMove, timePerStep) {
		var evtTouchStart = $.Event("MSGestureStart"),
			evtTouchMove = $.Event("MSGestureChange"),			
			evtTouchEnd = $.Event("MSGestureEnd"),
			nodeCenterPos = getCenter(node),
			curStep = 0,
			animationID = 0,
			touchObject = {
				clientX: nodeCenterPos.x,
				clientY: nodeCenterPos.y,
				force: 1,
				identifier: 0,
				pageX: nodeCenterPos.x,
				pageY: nodeCenterPos.y,
				radiusX: 11.5,
				radiusY: 11.5,
				rotationAngle: 0,
				screenX: nodeCenterPos.x,
				screenY: nodeCenterPos.y,
				target: node
			};
		
		evtTouchStart.originalEvent = {};
		evtTouchStart.originalEvent.touches = [];
		evtTouchStart.target = node[ 0 ];
		
		evtTouchMove.originalEvent = {};
		evtTouchMove.originalEvent.screenX = nodeCenterPos.x;
		evtTouchMove.originalEvent.screenY = nodeCenterPos.y;
		evtTouchMove.preventDefault  = function () {};	
		evtTouchMove.stopPropagation   = function () {};
		
		evtTouchEnd.target = node[ 0 ];	
		
		function moveStep () {	
			evtTouchMove.originalEvent.screenX -= stepsMove[ curStep ].x;
			evtTouchMove.originalEvent.screenY -= stepsMove[ curStep ].y;
			
			node.trigger(evtTouchMove);
			if (curStep < stepsMove.length - 1) {
				curStep++;
				animationID = setTimeout(moveStep, timePerStep);
			} else {
				node.trigger(evtTouchEnd);
				clearTimeout(animationID);
				return;
			}
		};

		evtTouchStart.originalEvent.screenX = nodeCenterPos.x;
		evtTouchStart.originalEvent.screenY = nodeCenterPos.y;
		node.trigger(evtTouchStart);
		animationID = setTimeout(moveStep, timePerStep);
	};
	
	function getCenter(node) {		
		node = $(node);
		var offset = node.igOffset(),
			centerX = offset.left + node.outerWidth() / 2;
			centerY = offset.top + node.outerHeight() / 2;

		return { x: centerX, y: centerY }
	}
})(jQuery);