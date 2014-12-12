var Point = require('./canvas/point');

function EventCollection() {};

EventCollection.clickList = [];
EventCollection.mouseOverList = [];

EventCollection.addOnClickObject = function(obj) {
	EventCollection.clickList.push(obj);
};

EventCollection.addMouseOverObject = function(obj) {
	EventCollection.mouseOverList.push(obj);
};

EventCollection.removeOnClickObject = function(obj) {
	for (var key in EventCollection.clickList) {
		if (EventCollection.clickList[key] == obj) {
			delete EventCollection.clickList[key];
			return;
		}
	}
};

EventCollection.removeMouseOverObject = function(obj) {
	for (var key in EventCollection.mouseOverList) {
		if (EventCollection.mouseOverList[key] == obj) {
			delete EventCollection.mouseOverList[key];
			return;
		}
	}
};

$(window).click(function(event) {
	var location = new Point(event.pageX, event.pageY);
	for (var key in EventCollection.clickList) {
		if (EventCollection.clickList[key].pointIntersects(location)) {
			EventCollection.clickList[key].executeClick();
		}
	}
});

$(window).mousemove(function(event) {
	var location = new Point(event.pageX, event.pageY);
	for (var key in EventCollection.mouseOverList) {
		if (EventCollection.mouseOverList[key].pointIntersects(location)) {
			EventCollection.mouseOverList[key].executeMouseOver();
		} else {
			EventCollection.mouseOverList[key].executeMouseLeave();
		}
	}
});

module.exports = EventCollection;