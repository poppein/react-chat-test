var WebSocketServer = require('websocket').server;
var http = require('http');

var connections = [];

var server = http.createServer(function (request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
server.listen(1337, function () {
    console.log((new Date()) + ' Server is listening on port 1337');
});

var wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});

wsServer.on('request', function (request) {
    var connection = request.accept();
    console.log((new Date()) + ' Connection accepted.');
    connection.on('message', function (message) {
        console.log('Received Message: ' + message.utf8Data);
        connections.forEach((c) => {
            if (c !== connection) {
                c.sendUTF(message.utf8Data);
            }
        });
    });
    connection.on('close', function () {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
    connections.push(connection);
});