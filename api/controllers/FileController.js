/**
 * FileController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	upload: function  (req, res) {
			if(req.method === 'GET')
				return res.json({'status':'GET not allowed'});						
				//	Call to /upload via GET is error
			req.file('file').upload({ dirname: '../../assets/images/upload/' }, function (err, uploadedFiles){
			  if (err) return res.send(500, err);
			  return res.send(200, uploadedFiles);
			});

	}
	
};

