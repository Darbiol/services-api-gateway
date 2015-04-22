'use strict';

var Joi = require('joi');
var rabbit = require('wascally');
var lapin = require('lapin')(rabbit);

module.exports = [
  {
    path: '/templates',
    method: 'GET',
    config: {
      description: 'Get all templates',
      notes: 'Returns the array of templates',
      tags: ['api', 'templates', 'find'],
      handler: function (request, reply) {
        lapin.request('v1.templates.findAll', {},
          function (error, response) {
            if (error) {
              reply(error).code(500);
            }

            reply(response.data);
          }
        );
      }
    }
  },

  {
    path: '/templates',
    method: 'POST',
    config: {
      description: 'Create a new template',
      notes: 'Returns the path of the created template in the response headers',
      tags: ['api', 'template', 'create'],
      validate: {
        payload: {
          name: Joi.string().required()
            .description( 'Name of the template' ),

          description: Joi.string().optional()
            .description('Description of the template'),

          content: Joi.string().required()
            .description('Template content')
        }
      },
      handler: function (request, reply) {
        lapin.request('v1.templates.create', request.payload,
          function (error, response) {
            if (error) {
              reply(error).code(500);
            }

            var baseUrl = request.server.info.uri;
            var path = request.path;

            reply().created( baseUrl + path + '/' + response.data.id )
          }
        );
      }
    }
  },

  {
    path : '/templates/{id}',
    method: 'GET',
    config : {
      description: 'Get a specific template by ID',
      notes: 'Returns data for the specified template ID',
      tags: ['api', 'template', 'findById'],
      validate: {
        params: {
          id: Joi.string()
            .description('The id of the template').required()
        }
      },
      handler : function (request, reply) {
        lapin.request('v1.templates.findById', {
            id: request.params.id
          }, function (error, response) {
            if (error) {
              reply(error).code(500);
            }

            reply(response.data);
          }
        );
      }
    }
  },

  {
    path : '/templates/{id}',
    method: 'PUT',
    config : {
      description: 'Update template attributes for the specified template ID',
      notes: 'Returns number of affected rows',
      tags: ['api', 'template', 'updateById'],
      validate: {
        params: {
          id: Joi.string()
            .description('The id of the template').required()
        },
        payload: {
          name: Joi.string().required()
            .description('Name of the template'),

          description: Joi.string().optional()
            .description('Description of the template'),

          content: Joi.string().required()
            .description('Template content'),
        }
      },
      handler : function (request, reply) {
        var message = {
          id: request.params.id,
          payload: request.payload
        };

        lapin.request('v1.templates.updateById', message,
          function (error, template) {
            if (error) {
              reply(error).code(500);
            }

            reply(template.data);
          }
        );
      }
    }
  },

  {
    path: '/templates/{id}',
    method: 'DELETE',
    config: {
      description: 'Delete a template with the specified instance ID',
      notes: 'Set the deletedAt timestamp to the current time',
      tags: ['api', 'template', 'deleteById'],
      validate: {
        params: {
          id: Joi.string().description('The template ID').required()
        }
      },
      handler : function (request, reply) {
        lapin.request('v1.templates.deleteById', {
            id: request.params.id
          }, function (error, response) {
            if (error) {
              reply(error).code(500);
            }

            reply().code(204);
          }
        );
      }
    }
  }
];