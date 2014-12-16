var SessionCollection = require('./session-collection');
var PlayerCollection = require('./player-collection');
var Session = require('./session');
var SocketServer = require('./socket-server')

function PlayerUpdate(){
};

PlayerUpdate.inputs = [];

module.exports = PlayerUpdate;

PlayerUpdate.emitData = function(){
	var collection = SessionCollection.getCollection();
	for (var key in collection){
		var session = collection[key];
		if(session.state == Session.PLAYING){
			var playerObj = PlayerCollection.getPlayerObject(session.socket.id);
			if (playerObj != null) {
				var opponentObj = PlayerCollection.getPlayerObject(playerObj.getOpponentId());
				var data = SocketServer.prepareSocketData(playerObj, opponentObj);
				session.socket.emit('update', data);
			}
		}
	}
	setTimeout(PlayerUpdate.emitData, 45);
};

PlayerUpdate.updatePhysics = function(){
	var collection = SessionCollection.getCollection();
	for (var key in collection){
		var session = collection[key];
		if(session.state == Session.PLAYING){
			var playerObj = PlayerCollection.getPlayerObject(session.socket.id);
			if (playerObj != null) {
				for (key in PlayerUpdate.inputs) {
					var opponentObj = PlayerCollection.getPlayerObject(playerObj.getOpponentId());
					SocketServer.updateClientCoordinates(playerObj, PlayerUpdate.inputs[key]);
					SocketServer.updateZ(playerObj);
					SocketServer.updateZ(opponentObj);
				}
				PlayerUpdate.inputs = [];
			}
		}
	}
	setTimeout(PlayerUpdate.updatePhysics, 15);
}