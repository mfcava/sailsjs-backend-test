/**
* Content-tag.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
	  name: 'string',
      posts: {
          collection: 'post',
          via: 'tags'
      }
  }
};

