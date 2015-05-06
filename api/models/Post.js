/**
* Post.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    attributes: {
  	  title: 		'string',
  	  content: 		'string',
  	  coverImage:   'string',
  	  owner: {
  		  model: 'user'
  	  },
      tags: {
          collection: 'ContentTag',
                 via: 'posts',
            dominant: true // ---
      }
    }

};

