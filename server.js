var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , moment = require('moment')
  , fs = require('fs')

app.listen(8000);

function handler (req, res) {
  fs.readFile(__dirname + '/client.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

var _socket;

function roundFloat(num, dec) {
	var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
}

function getColor(diff) {
	if (diff < 0) {
		return '#D60404';
	} else {
		return '#219301';
	}
}

io.sockets.on('connection', function (socket) {
	var interval = Math.random() * 1000 + 250;
	var price = 0;
	var diff = 0;
	setInterval(function() {
		var now = new Date();
		
		var newprice = Math.random()*2 + 30;
		diff = roundFloat(newprice - price, 2);
		price = roundFloat(newprice, 2);
		
		socket.emit('ticker', { stock: 'Microsoft Corporation (MSFT)', timestamp: moment().format('h:mm:ss'), price: price, diff: diff, color: getColor(diff)});
		interval = Math.random() * 5000 + 250;
	}, interval);
  /*
  socket.emit('news', { hello: 'world' });
   socket.emit('news', { hello: 'world' });
    socket.emit('news', { hello: 'world' });
     socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });*/
});

