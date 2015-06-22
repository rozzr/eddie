var BD;

T("audio").load("./drumkit.wav", function() {
	drum = T("lowshelf", {freq:110, gain:8, mul:0.6}, BD).play()
	BD = this.slice(0,  500).set({bang:false})
})

var socketConnection = io.connect('http://0.0.0.0:8080/soundsocket')

socketConnection.on('connect', function () {
  console.log('connected to socket')
})

socketConnection.on('button', function (value) {
  if (value == 'push') {
    BD.bang()
	}
})
