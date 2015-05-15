/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	findTagByName: function  (req, res) {
			if(req.method !== 'GET')
				return res.json({'status':'Method not allowed'});						
			    //  --- 
				//	Call not via GET is error
			    //  --- 
			var name = req.param('name');
			ContentTag.findByNameLike('%'+name+'%')
				.exec(function(err,tags){
          			if(err)
            			res.json({error:err});
          		    if(tags === undefined)
            			res.notFound();
          		    else
             		   	res.json(tags);
				});
	},

	findPostByTagName: function  (req, res) {
			if(req.method !== 'GET')
				return res.json({'status':'Method not allowed'});						
			    //  --- 
				//	Call not via GET is error
			    //  --- 
			var name = req.param('name');
			ContentTag.findOneByName(name).populate('posts')
				.exec(function(err,tags){
          			if(err)
            			res.json({error:err});
          		    if(tags === undefined)
            			res.notFound();
          		    else
             		   	res.json(tags);
				});
	}

};

