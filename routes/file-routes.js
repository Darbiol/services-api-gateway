'use strict';

var Joi = require('joi');
var fileHandlers = require('../handlers/file');

module.exports = [
  {
    method: 'POST',
    path: '/files',
    config: {
      description: 'Upload a file',
      notes: 'Returns the data of the uploaded file',
      tags: ['api', 'files', 'upload'],

      payload: {
        output: 'stream',
        parse: true,
        allow: 'multipart/form-data',
        maxBytes: 104857600 // 100MB
      },

      validate: {
        payload: {
          file: Joi.any().required()
            .meta({
              swaggerType: 'file'
            })
            .description('File to upload'),

          fileType: Joi.any().required()
            .description('File type'),

          description: Joi.string().optional()
            .description('File description')

        }
      },

      handler: fileHandlers.upload.bind(fileHandlers)
    }
  },

  {
    method: 'GET',
    path: '/files/{id}/download',
    config: {
      description: 'Download a file',
      notes: 'Returns the data of the uploaded file',
      tags: ['api', 'files', 'download'],

      validate: {
        params: {
          id: Joi.string()
            .description('The id of the file').required()
        }
      },

      handler: fileHandlers.download.bind(fileHandlers)
    }
  },

  {
    method: 'GET',
    path: '/files/{id}',
    config: {
      description: 'Get a file',
      notes: 'Returns the metadata of the file specified by id',
      tags: ['api', 'files', 'findById'],

      validate: {
        params: {
          id: Joi.string()
            .description('The id of the file').required()
        }
      },

      handler: fileHandlers.findById.bind(fileHandlers)
    }
  },

  {
    method: 'GET',
    path: '/files',
    config: {
      description: 'Get all files',
      notes: 'Returns array of file metadata uploaded files',
      tags: ['api', 'files', 'findAll'],
      handler: fileHandlers.findAll.bind(fileHandlers)
    }
  },

  {
    method: 'DELETE',
    path: '/files/{id}',
    config: {
      description: 'Delete a file with the specified instance ID',
      notes: 'Set the deletedAt timestamp to the current time',
      tags: ['api', 'files', 'deleteById'],

      validate: {
        params: {
          id: Joi.string()
            .description('The id of the file').required()
        }
      },

      handler: fileHandlers.deleteById.bind(fileHandlers)
    }
  }
];
