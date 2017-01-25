/**
 * Created by 孙颢pc on 2017/1/25.
 */
var app=angular.module("chatRoom",[]);

app.factory('socket', function($rootScope) {
    var socket = io(); //默认连接部署网站的服务器
    return {
        on: function(eventName, callback) {
            socket.on(eventName, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function(eventName, data, callback) {
            socket.emit(eventName, data, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    if(callback) {
                        callback.apply(socket, args);
                    }
                });
            });
        }
    };
});

app.factory('userService', function($rootScope) {
    return {
        get: function(users,nickname) {
            if(users instanceof Array){
                for(var i=0;i<users.length;i++){
                    if(users[i].nickname===nickname){
                        return users[i];
                    }
                }
            }else{
                return null;
            }
        }
    };
});

app.controller("chatCtrl",['$scope','socket','userService',function($scope,socket,userService){
    var messageWrapper= $('.message-wrapper');
    $scope.hasLogined=false;
    $scope.receiver="";//默认是群聊
    $scope.publicMessages=[];//群聊消息
    $scope.privateMessages={};//私信消息
    $scope.messages=$scope.publicMessages;//默认显示群聊
    $scope.users=[];

    //登录进入聊天室
    $scope.login=function(){
        // coding there ...
    }
    $scope.scrollToBottom=function(){
        // coding there ...
    }

    $scope.postMessage=function(){
        // coding there ...
    }
    $scope.setReceiver=function(receiver){
        // coding there ...
    }

    // 收到登录结果
    socket.on('userAddingResult',function(data){
        // coding there ...
    });

    // 接收到欢迎新用户消息
    socket.on('userAdded', function(data) {
        // coding there ...
    });

    // 接收到在线用户消息
    socket.on('allUser', function(data) {
        // coding there ...
    });

    // 接收到用户退出消息
    socket.on('userRemoved', function(data) {
        // coding there ...
    });

    // 接收到新消息
    socket.on('messageAdded', function(data) {
        // coding there ...
    });
}]);