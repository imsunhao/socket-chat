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
        // coding there ...
    });

    //有用户发送新消息
    socket.on('addMessage',function(data){
        // coding there ...
    });

    //有用户退出聊天室
    socket.on('disconnect', function () {
        // coding there ...
    });
});

http.listen(6060, function () {
    console.log('app is running at port 6060 !');
});