'use strict';

var Joi = require( 'joi' );
var EmailSender = require('../handlers/email-sender.js');
var emailSender = new EmailSender()

module.exports = [
  {
    path: '/emails/send',
    method: 'POST',
    config: {
      description: 'Send an email to a list of recepients',
      notes: 'Sender and recepient emails are required',
      tags: ['api', 'email', 'send'],
      validate: {
        payload: {
          from: Joi.string().required().email()
            .description( 'The sender of the email' ),

          to: Joi.string().required().email()
            .description('The recepient of the email'),

          subject: Joi.string().optional()
            .description('The subject of the email'),

          text: Joi.string().optional()
            .description('The body of the email')
        }
      },
      handler: function (request, reply) {
        emailSender.send(request.payload, function () {
          reply( 'message sent' );
        });
      }
    }
  }
];