// Load the Mongoose module and Schema object
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a new 'NoteSchema'
const NoteSchema = new Schema({
	subject: String,
	body: String,
	userid: String
});


// Create the 'findOneBySubject' static method
NoteSchema.statics.findOneBySubject = function (subject, callback) {
	// Use the 'findOne' method to retrieve a note document
	this.findOne({
		subject: new RegExp(subject, 'i')
	}, callback);
};

// Create the 'Note' model out of the 'NoteSchema'
mongoose.model('Note', NoteSchema);