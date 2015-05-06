/**
 * User
 *
 * @module      :: Model
 * @description :: This is the base user model
 * @docs        :: http://waterlock.ninja/documentation
 */

module.exports = {

  attributes: require('waterlock').models.user.attributes({
  
  nickname: "STRING",
  posts:{
  	collection: "post",
	  via: "owner"
  },
  roles: {
  	collection: "role",
	  via: "users"
  }
  
  }),
  
  beforeCreate: require('waterlock').models.user.beforeCreate,
  beforeUpdate: require('waterlock').models.user.beforeUpdate
};
