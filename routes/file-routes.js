'use strict';

var fs = require('fs');
var amqp = require('amqp');
var amqpStream = require('amqp-stream');

module.exports = [
  {
    path: '/files/upload',
    method: 'POST',
    config: {
      description: 'Upload a file',
      notes: 'Returns the data of the uploaded file',
      tags: ['api', 'file', 'upload'],
      payload: {
        output: 'stream',
        parse: true,
        allow: 'multipart/form-data',
        maxBytes: 10485760 // 10MB
      },
      handler: function (request, reply) {
        var payload = request.payload;

        if (payload.file) {
          // create an AMPQ RPC client
          var connection = amqp.createConnection({host: 'boot2docker'});
          var amqpStreamOpts = {
              connection: connection,
              exchange: 'req-res.files-exchange',
              routingKey: 'v1.files.upload'
          };

          amqpStream(amqpStreamOpts, function (err, rpcStream) {
            rpcStream.createCorrelatedRequest(function (err, fileUploader) {
              payload.file.pipe(fileUploader);

              fileUploader.on('end', function (err) {
                connection.end.bind(connection);

                var ret = {
                  filename: payload.file.hapi.filename,
                  headers: payload.file.hapi.headers
                };

                reply(JSON.stringify(ret));
              });
            });
          });
        }
      }
    }
  }
];