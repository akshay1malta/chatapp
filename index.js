var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
//var mongoose = require('mongoose');
var nicknames= [];

/*var dbPath  = "mongodb://localhost/chat";

db = mongoose.connect(dbPath);

mongoose.connection.once('open', function() {

	console.log("database connection open success");

});
var Blog = require('./mongoModel.js');

var mongoModel = mongoose.model('user');
*/
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


	io.sockets.on('connection', function(socket){

	/*mongoModel.find({},function(err,docs){
		if(err) throw err;
		//console.log('sending old messages');
		socket.emit('load old messages',docs);
	});*/

    socket.on('new user',function(data, callback){
        if(nicknames.indexOf(data) != -1){
            callback(false);
        }else{
            callback(true);
            socket.nickname = data;
            nicknames.push(socket.nickname);
             io.sockets.emit('usernames',nicknames);
        }
    });

	socket.on('send message',function(data){
		/*var newMsg = new mongoModel({msg: data, nick: socket.nickname});
		newMsg.save(function(err){
			if(err) throw err;
			else {};*/
		
		io.sockets.emit('new message',{msg: data, nick: socket.nickname});
		//socket.broadcast.emit('new message',data);
	//});
});


socket.on('disconnect',function(data){

    if(!socket.nickname){
        return;
    }
      socket.broadcast.emit('usernames', socket.nickname+'left the chat');

      nicknames.splice(nicknames.indexOf(socket.nickname), 1);
    
       io.sockets.emit('usernames',nicknames);
 }); //end socket disconnected

});
http.listen(3000, function(){
  console.log('listening on *:3000');
});
