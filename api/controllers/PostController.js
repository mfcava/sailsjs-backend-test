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
			var names = name.split(",");
		    Post.find( {select: ['id','title']} ).populate('tags', {name: names, select: ['id','name'] }  )
			// ContentTag.find({name: names}).populate('posts', { select: ['id','title']} )
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

