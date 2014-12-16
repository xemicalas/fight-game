var App;
var GlobalEvents;
var Point;
var Background;
var obj;
var socket = io();
var Config;

function StageScreen() {
	App = require('../../app');
	GlobalEvents = require('../global-events');
	Point = require('../canvas/point');
	Background = require('../canvas/background');
	Config = require('../config');
	this.backgroundImage = new Background('./img/stage_background.png');
	obj = this;

	App.player.setLocation(new Point(0,0));
	App.player.setZ(0);
	App.opponent.setLocation(new Point(50, 50));
	App.opponent.setZ(0);
};

StageScreen.prototype.updatePlayers = function() {
	var activeKeys = {
		key: 0,
		jumpKey: false
	};

	var key = GlobalEvents.Key;

	if (key.isDown(key.RIGHT) && key.isDown(key.UP)) {
		console.log('UP RIGHT');
		activeKeys.key = key.UP_RIGHT;
	}
	else if (key.isDown(key.LEFT) && key.isDown(key.UP)) {
		console.log('UP LEFT');
		activeKeys.key = key.UP_LEFT;
	}
	else if (key.isDown(key.DOWN) && key.isDown(key.LEFT)) {
		console.log('DOWN LEFT');
		activeKeys.key = key.DOWN_LEFT;
	}
	else if (key.isDown(key.DOWN) && key.isDown(key.RIGHT)) {
		console.log('DOWN RIGHT');
		activeKeys.key = key.DOWN_RIGHT;
	}
	else if (key.isDown(key.RIGHT)) {
		console.log('RIGHT');
		activeKeys.key = key.RIGHT;
	}
	else if (key.isDown(key.LEFT)) {
		console.log('LEFT');
		activeKeys.key = key.LEFT;
	}
	else if (key.isDown(key.UP)) {
		console.log('UP');
		activeKeys.key = key.UP;
	}
	else if (key.isDown(key.DOWN)) {
		console.log('DOWN');
		activeKeys.key = key.DOWN;
	}

	if(key.isDown(key.JUMP_KEY)) {
		console.log('JUMP');
		activeKeys.jumpKey = true;
	}

	StageScreen.updatePlayerCoordinates(App.player, activeKeys)

	if(activeKeys.key != 0 || activeKeys.jumpKey){
		socket.emit('update', activeKeys);
	}
};

StageScreen.updatePlayerCoordinates = function(player, input) {
	var key = GlobalEvents.Key;
	var x = player.getLocation().x;
	var y = player.getLocation().y;
	var z = player.getZ();
	var speedZ = player.getSpeedZ();
	
	console.log('key: ' + input.key + ', jump: ' + input.jumpKey);

	if(input.jumpKey && z >= 0) {
		speedZ = Config.playerJumpSpeed;
		z -= speedZ;
	}

	if(input.key == key.UP_LEFT) {
		y -= Config.playerMoveSpeed;
		x -= Config.playerMoveSpeed;
	}
	else if(input.key == key.UP_RIGHT) {
		y -= Config.playerMoveSpeed;
		x += Config.playerMoveSpeed;
	}
	else if(input.key == key.DOWN_LEFT) {
		x -= Config.playerMoveSpeed;
		y += Config.playerMoveSpeed;
	}
	else if(input.key == key.DOWN_RIGHT) {
		x += Config.playerMoveSpeed;
		y += Config.playerMoveSpeed;
	}
	else if(input.key == key.LEFT) {
		x -= Config.playerMoveSpeed;
	}
	else if(input.key == key.RIGHT) {
		x += Config.playerMoveSpeed;
	}
	else if(input.key == key.UP) {
		y -= Config.playerMoveSpeed;
	}
	else if(input.key == key.DOWN) {
		y += Config.playerMoveSpeed;
	}

	player.setLocation(new Point(x, y));
	player.setZ(z);
	player.setSpeedZ(speedZ);
};

StageScreen.prototype.graphics = function() {
	obj.updatePlayers();
	obj.backgroundImage.draw();
	App.player.draw();
	App.opponent.draw();
};

module.exports = StageScreen;