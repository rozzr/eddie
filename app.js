var express = require('express')
var app = express()
var server = require('http').Server(app)

var io = require('socket.io')(server)
var cylon = require('cylon')

app.use(express.static(__dirname + '/public'))
server.listen(8080)

// this will be called when Cylon is fully initialized, which is when we should open up our WebSocket connection.
var cylonReady = function(my) {
  io
    .of('/soundsocket')
    .on('connection', function (socket) {
      registerSocketHandlers(my, socket);
      console.log('client connected') 
      socket.emit('test_message', 'some data')
    })
}

// this will be called each time a socket is opened, so each client will receive their own events when buttons are pushed.
var registerSocketHandlers = function(my, socket) {
  my.button.on('push', function() {
    socket.emit('button', 'push')
  })

  my.button.on('release', function() {
    socket.emit('button', 'release')
  })
}

cylon.robot({
  connections: {
		edison: { adaptor: 'intel-iot' }
	}
  devices: {
		button: { driver: 'button', pin: 2 }
	}
}).on('ready', cylonReady);

cylon.start()
