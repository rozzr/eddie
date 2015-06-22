var express = require('express')
var app = express()
var server = require('http').Server(app)

var io = require('socket.io')(server) // pass our http server to Socket.IO

app.use(express.static(__dirname + '/public'))
server.listen(8080)

io
  .of('/soundsocket') // establish a route to connect to using the Socket.IO client
  .on('connection', function (socket) {
	console.log('client connected') // each time a client establishes a connection, log a message to the console that the app is running on (on the Edison).
  })
