// Load the Mongoose module and Schema object
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a new 'VehicleSchema'
const VehicleSchema = new Schema({
	title: String,
	make: String,
	model: String,
	year: Number,
	created: {
		type: Date,
		// Create a default 'created' value
		default: Date.now
	}
});


// Create the 'findOneByTitle' static method
VehicleSchema.statics.findOneByTitle = function (title, callback) {
	// Use the 'findOne' method to retrieve a vehicle document
	this.findOne({
		title: new RegExp(title, 'i')
	}, callback);
};

// Create the 'Vehicle' model out of the 'VehicleSchema'
mongoose.model('Vehicle', VehicleSchema);