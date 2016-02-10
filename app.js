var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);

server.listen(3000);

app.get('/', function(req, res){
	res.sendfile(__dirname + '/index.html');
});

//io.on and io.sockets.on are same
var $count=0;
io.sockets.on('connection', function(socket){
  ++$count;
  io.sockets.emit('count online user',$count);
	socket.on('send message', function(data,name){
    console.log(name+" : "+data + "<br/>");
		io.sockets.emit('new message', data,name);
	});
  socket.on('disconnect', function(){
    $count--;
    //io.sockets.emit('count online user',$count);
  });
  socket.on('keypress',function(data){
    console.log(data);
		socket.broadcast.emit('typing', data.nickname);
    //socket.emit('typing',name);
  });
});
