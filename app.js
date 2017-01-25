/**
 * Created by 孙颢pc on 2017/1/25.
 */
var express = require('express');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

// 设置静态文件路径
app.use(express.static(__dirname + '/client'));

app.get('/', function (req, res) {
    res.sendfile('index.html');
});

var connectedSockets={};
var allUsers=[{nickname:""}];
io.on('connection',function(socket){

    //有新用户进入聊天室
    socket.on('addUser',function(data){
        if(connectedSockets[data.nickname]){
            //昵称已被占用
            socket.emit('userAddingResult',{result:false});
        }else{
            socket.emit('userAddingResult',{result:true});
            socket.nickname=data.nickname;
            //保存每个socket实例,发私信需要用
            connectedSockets[socket.nickname]=socket;
            allUsers.push(data);
            //广播欢迎新用户,除新用户外都可看到
            socket.broadcast.emit('userAdded',data);
            //将所有在线用户发给新用户
            socket.emit('allUser',allUsers);
        }
    });

    //有用户发送新消息
    socket.on('addMessage',function(data){
        if(data.to){
            //发给特定用户
            connectedSockets[data.to].emit('messageAdded',data);
        }else{
            //群发-广播消息,除原发送者外都可看到
            socket.broadcast.emit('messageAdded',data);
        }
    });

    //有用户退出聊天室
    socket.on('disconnect', function () {
            //广播有用户退出
            socket.broadcast.emit('userRemoved', {
                nickname: socket.nickname
            });
            for(var i=0;i<allUsers.length;i++){
                if(allUsers[i].nickname==socket.nickname){
                    allUsers.splice(i,1);
                }
            }
            //删除对应的socket实例
            delete connectedSockets[socket.nickname];
        }
    );
});

http.listen(6060, function () {
    console.log('app is running at port 6060 !');
});