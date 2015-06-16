'use strict';

var Joi = require('joi');
var _ = require( 'lodash' );
var rabbit = require('wascally');
var lapin = require('lapin')(rabbit);
var newData = [];
// var lti = require( 'ims-lti' );

module.exports = [
  {
    path: '/lti',
    method: 'POST',
    config: {
      description: 'accepts an LTI request',
      notes: 'Consumes an LTI url',
      tags: ['api', 'LTI', 'SSO'],
      validate: {
      	payload: {
			resource_link_id : Joi.string().required()
				.description( 'This is an opaque unique identifier that the TC guarantees will be unique within the TC for every placement of the link' ),
			resource_link_title : Joi.string().optional()
				.description( 'A plain text title for the resource. This is the clickable text that appears in the link' ),
			resource_link_description : Joi.string().optional()
				.description( 'A plain text description of the link’s destination, suitable for display alongside the link. Typically no more than a few lines long' ),

			user_id : Joi.string().optional()
				.description( 'The user id based on the consumer\'s database' ),

			roles : Joi.string().optional()
				.description( 'The role of the current user logging in (e.g. Instructor, SysAdmin, Student, etc.)' ),

			lis_person_name_full : Joi.string().optional()
				.description( 'The full name of the user' ),
			lis_person_name_family : Joi.string().optional()
				.description( 'The Family name of the user' ),
			lis_person_name_given : Joi.string().optional()
				.description( 'The first / given name of the user' ),
			lis_person_contact_email_primary : Joi.string().optional()
				.description( 'The user\'s email address' ),
			lis_person_sourcedid : Joi.string().optional()
				.description( 'This field contains the LIS identifier for the user account that is performing this launch' ),

			context_id : Joi.string().optional()
				.description( 'This is an opaque identifier that uniquely identifies the context that contains the link being launched' ),
			context_title : Joi.string().optional()
				.description( 'A title of the context – it should be about the length of a line' ),
			context_label : Joi.string().optional()
				.description( 'A label for the context – intended to fit in a column' ),

			tool_consumer_info_product_family_code : Joi.string().optional()
				.description( 'The sender of the email' ),
			tool_consumer_info_version : Joi.string().optional()
				.description( 'NaN' ),
			tool_consumer_instance_guid : Joi.string().optional()
				.description( 'This is a unique identifier for the TC.  A common practice is to use the DNS of the organization or the DNS of the TC instance' ),
			tool_consumer_instance_description : Joi.string().optional()
				.description( 'The sender of the email' ),

			launch_presentation_locale : Joi.string().optional()
				.description( 'Language' ),
			launch_presentation_document_target : Joi.string().optional()
				.description( 'This field communicates the kind of browser window/frame where the TC has launched the tool' ),
			launch_presentation_width : Joi.string().optional()
				.description( 'The width of the window or frame where the content from the tool will be displayed' ),
			launch_presentation_height : Joi.string().optional()
				.description( 'The height of the window or frame where the content from the tool will be displayed' ),
			launch_presentation_css_url : Joi.string().optional()
				.description( 'css' ),

			oauth_callback : Joi.string().optional()
				.description( 'NaN' ),
			lis_outcome_service_url : Joi.string().optional()
				.description( 'NaN' ),
			lis_result_sourcedid : Joi.string().optional()
				.description( 'NaN' ),
			launch_presentation_return_url : Joi.string().optional()
				.description( 'NaN' ),
			lti_version : Joi.string().optional()
				.description( 'LTI version used' ),
			lti_message_type : Joi.string().optional()
				.description( 'Type of message sent by the consumer' ),
			oauth_version : Joi.string().optional()
				.description( 'Oauth version used by the consumer' ),
			oauth_nonce : Joi.string().optional()
				.description( 'Oauth nonce' ),
			oauth_timestamp : Joi.string().optional()
				.description( 'timestamp when the session is created' ),
			oauth_consumer_key : Joi.string().optional()
				.description( 'consumer key' ),
			oauth_signature_method : Joi.string().optional()
				.description( 'encryption method used to encrypt the signature' ),
			oauth_signature : Joi.string().optional()
				.description( 'signature' ),
			custom_consumer_secret : Joi.string().required()
				.description( 'signature' )
		  },
      },
       handler: function (request, reply) {
       	var req = {};
       	req.body = request.payload;
       	req.method = request.method;

        lapin.request('v1.lti.version1', req,
          function (error, response) {
            console.log( 'response' );
            reply( response );
            if (error) {
              reply(error).code(500);
            }
          }
        );
      }
	}
  }


];