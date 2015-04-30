'use strict';

var rabbit = require('wascally');
var lapin = require('lapin')(rabbit);
var Joi = require( 'joi' );

var EmailSender = require('../handlers/email-sender.js');
var emailSender = new EmailSender();

module.exports = [
  {
    path: '/emails/send',
    method: 'POST',
    config: {
      description: 'Send an email to a list of recepients',
      notes: 'Sender and recepient emails are required',
      tags: ['api', 'email', 'send', 'template'],
      validate: {
        payload: {
          from: Joi.string().required().email()
            .description('The sender of the email'),

          to: Joi.string().required().email()
            .description('The recepient of the email'),

          subject: Joi.string().optional()
            .description('The subject of the email'),

          text: Joi.string().optional()
            .description('The body of the email'),

          id: Joi.string().optional()
            .description('The id of the template being used'),

          sendMail: Joi.boolean().optional()
            .description('The flag to check if a user wants a preview of the compiled template or just send it')
        }
      },
      handler: function(request, reply) {
        if (request.payload.id) {
          // this means the user has chosen a template to use for the email
          // send request to temp service
          lapin.request('v1.templates.compile', request.payload,
            function(error, response) {
              if (error) {
                reply(error).code(500);
              }
              reply(response.data);
            }
          );
        } else {
          // this means the user has not chosen a template and this email is just an ordinary email
          // send a Send to email service
          emailSender.send(request.payload, function() {
            reply('message sent');
          });
       }

      }
    }
  }
];