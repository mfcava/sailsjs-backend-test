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
    }

    Jwt.findOneByToken(req.headers.access_token).exec(function(err, token) {
		if (typeof token !== 'undefined') {
			if ( req.body.owner.id != token.owner ) {
				sails.log("not my owner")
				return res.forbidden(err);  
			}
		} else {
			sails.log("owner undefined");
			console.log(req.headers.access_token +' === '+ req.body.owner.id+' === '+ token)
			return res.forbidden(err);  
		}
		sails.log("ok edit")
	    next();
		});
  });
};
