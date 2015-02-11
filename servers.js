
var PORT_A = 12352,
    PORT_B = 31452,
    HOST = '127.0.0.1';


var server = function(port) {
  var dgram = require('dgram');
  var server = dgram.createSocket('udp4');
  server.on('listening', function() {
    var address = server.address();
    console.log("UDP server listening on " + address.address + ":" + address.port);

    message = new Buffer('Hello World');
    server.send(message, 0, message.length, PORT_A, HOST, function(err, bytes) {
      if(err) {
        throw(err);
      }
    });
  }, 1000);

  server.on('message', function(message, remote) {
    console.log(remote.address + ':' + remote.port + ' - ' + message);

    setTimeout(function() {
      message = new Buffer(' OK says ' + port +  ' - ' + message);
      server.send(message, 0, message.length, remote.port, remote.address, function(err, bytes) {
        if(err) {
          throw(err);
        }
      });
    }, 1000);
  });

  server.bind(port, HOST);

  return server;
};


var a = server(PORT_A);
var b = server(PORT_B);
