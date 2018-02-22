// Load the 'Note' Mongoose model
const Note = require('mongoose').model('Note');

// Create a new 'create' controller method
exports.create = function (req, res, next) {
	// Create a new instance of the 'Note' Mongoose model
	const note = new Note(req.body);

	// Use the 'Note' instance's 'save' method to save a new note document
	note.save((err) => {
		if (err) {
			// Call the next middleware with an error message
			return next(err);
		} else {
			// Use the 'response' object to send create view response
			res.render('create');
		}
	});
};

// Create a new 'list' controller method
exports.list = function (req, res, next) {
	// Use the 'Note' static 'find' method to retrieve the list of notes
	Note.find({}, (err, notes) => {
		if (err) {
			// Call the next middleware with an error message
			return next(err);
		} else {
			// Use the 'response' object to send a list view
			res.render('list', { notesArray: notes });
		}
	});
};

// Create a new 'read' controller method
exports.read = function (req, res) {
	// Use the 'response' object to send a detailed view
	res.render('details', { note: req.note });
};

// Create a new 'update' controller method
exports.update = function (req, res, next) {
	// Use the 'Note' static 'findByIdAndUpdate' method to update a specific note
	Note.findByIdAndUpdate(req.note.id, req.body, (err, note) => {
		if (err) {
			// Call the next middleware with an error message
			return next(err);
		} else {
			// Use the 'response' object to send a JSON response
			res.json(note);
		}
	})
};

// Create a new 'delete' controller method
exports.delete = function (req, res, next) {
	// Use the 'Note' instance's 'remove' method to save a new note document
	req.note.remove((err) => {
		if (err) {
			// Call the next middleware with an error message
			return next(err);
		} else {
			// Use the 'response' object to send a JSON response
			res.json(req.note);
		}
	})
};

// Create a new 'noteBySubject' controller method
exports.noteById = function (req, res, next, id) {
	// Use the 'Note' static 'findOne' method to retrieve a specific note
	Note.findOne({
		_id: id
	}, (err, note) => {
		if (err) {
			// Call the next middleware with an error message
			return next(err);
		} else {
			// Set the 'req.note' property
			req.note = note;

			// Call the next middleware
			next();
		}
	});
};

// Create a new 'renderCreate' controller method
exports.renderCreate = function (req, res) {
	// Use the 'response' object to render the 'create' view
	res.render('create');
};

