/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {
	var mosca = require('mosca');
	var pubsubsettings = {
	  //using ascoltatore
	  type: 'mongo',        
	  url: 'mongodb://localhost:27017/mqtt',
	  pubsubCollection: 'ascoltatori',
	  mongo: {}
	};
	var moscaSettings = {
	  port: 4000,               // mosca (mqtt) port: 1883
	  backend: pubsubsettings   // pubsubsettings is the object we created above 

	};

	var server = new mosca.Server(moscaSettings);   // here we start mosca
	server.on('ready', setup);                      // on init it fires up setup()

	// fired when the mqtt server is ready
	function setup() {
	  sails.log.debug('Mosca server is up and running')
	};
	// fired when a message is published
	server.on('published', function(packet, client) {
	sails.log.info('Published', packet);
	sails.log.info('Client', client);
	});
	// fired when a client connects
	server.on('clientConnected', function(client) {
	sails.log.info('Client Connected:', client.id);
	});

	// fired when a client disconnects
	server.on('clientDisconnected', function(client) {
	sails.log.info('Client Disconnected:', client.id);
	});
	
  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
