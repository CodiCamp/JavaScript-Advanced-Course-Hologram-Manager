var webSocketsServerPort = 1337;
var webSocketServer = require('websocket').server;
var http = require('http');

var history = [ ];
var clients = [ ];

var server = http.createServer(function(request, response) {});

server.listen(webSocketsServerPort, function() {
    console.log("Server is listening on port " + webSocketsServerPort);
});

var wsServer = new webSocketServer({
    httpServer: server
});

wsServer.on('request', function(request) {
    console.log((new Date()) + ' Connection from origin ' + request.origin + '.');

    var connection = request.accept(null, request.origin);

    var index = clients.push(connection) - 1;

    console.log((new Date()) + ' Connection accepted.');

    if (history.length > 0) {
        connection.send(JSON.stringify( { type: 'history', data: history} ));
    }

    connection.on('message', function(message) {
        console.log((new Date()) + ' Received: ' + message.utf8Data);

        var obj = {
                    time: (new Date()).getTime(),
                    text: message.utf8Data,
                };
        history.push(obj);

        var json = JSON.stringify({ type:'message', data: obj });
        for (var i=0; i < clients.length; i++) {
            clients[i].send(json);
        }
    });

    connection.on('close', function(connection) {
            console.log((new Date()) + " Peer "
                + connection.remoteAddress + " disconnected.");
            clients.splice(index, 1);
    });

});