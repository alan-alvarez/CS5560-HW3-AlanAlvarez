// Load the module dependencies
const config = require('./config');
const mongoose = require('mongoose');

// Define the Mongoose configuration method
module.exports = function() {
	// Use Mongoose to connect to MongoDB
	const db = mongoose.connect(config.db);

	// Load the 'Note' model 
	require('../app/models/note.server.model');
	
	// Load the 'user' model 
	require('../app/models/user');

	// Return the Mongoose connection instance
	return db;
};