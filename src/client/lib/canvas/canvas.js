var Config;
var Point;

function Canvas(id) {
	Config = require('../config');
	Point = require('./point');

	this.id = id;
	this.canvasMaskColor = Config.canvasMaskColor;
	this.updateInterval = Config.canvasUpdateInterval;
	this.canvasObj = $(this.id)[0];
	this.canvas = this.canvasObj.getContext('2d');
	this.updateCanvasDimensions();
	this.graphics = null;
};

Canvas.prototype.canvas = function() {
	return this.canvas;
};

Canvas.prototype.getWidth = function() {
	return this.canvasObj.width;
};

Canvas.prototype.getHeight = function() {
	return this.canvasObj.height;
};

Canvas.prototype.getOffsetLeft = function() {
	return this.canvasObj.offsetLeft;
};

Canvas.prototype.getOffsetTop = function() {
	return this.canvasObj.offsetTop;
};

Canvas.prototype.getUpdateInterval = function() {
	return this.updateInterval;
};

Canvas.prototype.setUpdateInterval = function(updateInterval) {
	this.updateInterval = updateInterval;
};

Canvas.prototype.clearCanvas = function() {
	this.canvas.clearRect(0, 0, this.canvasObj.width, this.canvasObj.height);
};

Canvas.prototype.setGraphics = function(graphics) {
	this.graphics = graphics;
};

Canvas.prototype.getGraphics = function() {
	return this.graphics;
};

Canvas.prototype.drawGraphics = function() {
	if (this.graphics != null) {
		this.graphics();
	}
};

Canvas.prototype.drawBackground = function() {
	this.canvas.fillStyle = this.canvasMaskColor;
	this.canvas.fillRect(0, 0, this.canvasObj.width, this.canvasObj.height);
};

Canvas.prototype.updateCanvasDimensions = function() {
	var w = $(window).width();
	var h = $(window).height();
	this.canvasObj.width = w;
	this.canvasObj.height = h;
};

Canvas.prototype.draw = function() {
	var obj = this;
	this.updateCanvasDimensions();
	this.clearCanvas();
	this.drawBackground();
	this.drawGraphics();
	setTimeout(function() {
		obj.draw()
	}, 1000 / this.updateInterval);
};

module.exports = Canvas;