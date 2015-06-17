'use strict';

var fs = require('fs');
var path = require('path');

var rabbit = require('wascally');
var lapin = require('lapin')(rabbit);
var mkdirp = require('mkdirp');

module.exports = {
  upload: function(request, reply) {
    var env = process.NODE_ENV || 'development';
    var payload = request.payload;
    var filename = payload.file[ 1 ].hapi.filename;
    var uploadDir = './uploads';

      var writeStream = fs.createWriteStream( uploadDir + '/' + filename );

      payload.file[ 1 ].pipe( writeStream );

      // On stream end or error send a response.
      payload.file[ 1 ].on('end', function() {
        var message = {
          filename: filename,
          description: request.payload.description
        };

        lapin.request('v1.files.upload', message, function(err, response) {
          if (err) {
            return reply(err).code(500);
          }
          return reply(response.data);
        });
      }).on('error', function() {
        return reply('Error in uploading');
      });
    },

    download: function (request, reply) {
        var message = {
            'id' : request.params.id
        };

        lapin.request('v1.files.download', message, function(err, response) {
            if (err) {
              return reply(err).code(500);
            }
            return reply(response.data);
        });
    },

    findById: function (request, reply) {
        var message = {
            'id' : request.params.id
        };

        lapin.request('v1.files.findById', message, function(err, response) {
            if (err) {
              return reply(err).code(500);
            }
            return reply(response.data);
        });
    },

    findAll: function (request, reply) {
        lapin.request('v1.files.findAll', {}, function(err, response) {
            if (err) {
              return reply(err).code(500);
            }
            return reply(response.data);
        });
    },

    deleteById: function (request, reply) {
        var message = {
            'id' : request.params.id
        };

        lapin.request('v1.files.deleteById', message, function(err, response) {
            if (err) {
              return reply(err).code(500);
            }
            return reply(response.data);
        });
    }
};