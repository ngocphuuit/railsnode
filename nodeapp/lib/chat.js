/**
	Chat module
	TODO: save messages
*/

var chat = function(io){
	var redis = require('redis');
	var redisClient = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST, {auth_pass: process.env.REDIS_PASSWORD});

	var namespace = io.of('chat');

	namespace.use(function(socket, next){
		// Join Room. Get room of user from client
		var room = socket.handshake.query.room;
		socket.join(room, function(err){
			if(err) next(err);

			// Save email to redis
			// Key: value => socket.id: user hash
			var userHash = {
				id: socket.id
			};
			/*Sets the specified fields to their respective values in the hash stored at key. This command overwrites any existing fields in the hash. If key does not exist, a new key holding a hash is created.*/
			redisClient.hmset(socket.id, userHash);


			// Get list of other members in room
			var socketIds = Object.keys(namespace.adapter.rooms[room]);
			console.log("Id room: "+socketIds);
			var multi = redisClient.multi(); //Đánh dấu sự khởi đầu của một khối giao dịch. Lệnh tiếp theo sẽ được xếp hàng để thực hiện nguyên tử sử dụng EXEC.
			socketIds.forEach(function(socketId){
				multi.hgetall(socketId);
			});

			multi.exec(function(err, members){
				socket.emit('memberList', members);
			});

			next();
		});
	});

	namespace.on('connection', function(socket){
		// Let other people in rooms know that this socket has left
		socket.on('disconnect', function(){
			var room = socket.handshake.query.room;
			// Remove member in List
			redisClient.del(socket.id);
			socket.to(room).emit('memberleave', socket.id);
		});

		// Send message to all members in room
		socket.on('message', function(message){
			socket.rooms.forEach(function(room){
				socket.to(room).emit('message', message, socket.handshake.query.name)
			});
		});
	});
};

module.exports = chat;