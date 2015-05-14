/**
 * MailingController
 *
 * @description :: Server-side logic for managing mailings
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	  subscribe: function  (req, res) {
		if(req.method === 'GET')
			return res.json({'status':'GET not allowed'});						
			//	Call to /upload via GET is error
		MailChimp.call('campaigns', 'list', { start: 0, limit: 25 }, function (error, data) {
		    if (error)
		        console.log(error.message);
		    else
		        console.log(JSON.stringify(data)); // Do something with your data!
		});
	  },
	  
	  unsubscribe: function  (req, res) {
  		if(req.method === 'GET')
  			return res.json({'status':'GET not allowed'});						
  			//	Call to /upload via GET is error
	  }
};

