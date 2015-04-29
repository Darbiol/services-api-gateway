'use strict';

var fs = require('fs');

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
        allow: 'multipart/form-data'
      },
      handler: function (request, reply) {
        var payload = request.payload;

        if (payload.file) {
          var name = payload.file.hapi.filename;
          var path = process.cwd() + '/uploads/' + name;
          var file = fs.createWriteStream(path);

          file.on('error', function (err) {
            console.error(err)
          });

          payload.file.pipe(file);

          payload.file.on('end', function (err) {
            var ret = {
              filename: payload.file.hapi.filename,
              headers: payload.file.hapi.headers
            };
            reply(JSON.stringify(ret));
          });
        }
      }
    }
  }
];