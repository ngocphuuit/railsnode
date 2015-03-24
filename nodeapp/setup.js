/*
	By running socket.io with the socket.io-redis adapter you can run
	multiple socket.io instances in different processes or servers
	that can all broadcast and emit events to and from each other.

  If you need to emit events to socket.io instances from a non-socket.io process,
  you should use socket.io-emitter.
*/


var io = require('socket.io')(process.env.PORT);
var redis = require('redis');
var redis_adapter = require('socket.io-redis');
var request = require('request');

// ===Setup redis===
// pubClient: optional, the redis client to publish events on
var pub = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST, {auth_pass: process.env.REDIS_PASSWORD});
// subClient: optional, the redis client to subscribe to events on
var sub = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST, {auth_pass: process.env.REDIS_PASSWORD});

io.adapter(redis_adapter({
	key: process.env.REDIS_KEY, //the name of the key to pub/sub events on as prefix (socket.io)
	pubClient: pub,
	subClient: sub
}));

//Load realtime modules
require('./lib/chat')(io);

