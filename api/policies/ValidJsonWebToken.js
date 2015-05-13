'use strict';
/* jshint unused:false */

/**
 * hasJsonWebToken
 *
 * @module      :: Policy
 * @description :: Assumes that your request has an jwt;
 *
 * @docs        :: http://waterlock.ninja/documentation
 */
module.exports = function(req, res, next) {

  waterlock.validator.validateTokenRequest(req, function(err, user){
    if(err){
      return res.forbidden(err);  
    } else {
		Jwt.findOneByToken(req.headers.access_token).exec(function(err, token) {
			if (typeof token !== 'undefined') {
				sails.log("hasJsonWebToken: valid")
	    		// valid request
				next(); 
			} else {
				sails.log("hasJsonWebToken: undefined")
				return res.forbidden(err);  
			}
		});
	}
	
  });

};
