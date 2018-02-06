// Load the 'Vehicle' Mongoose model
const Vehicle = require('mongoose').model('Vehicle');

// Create a new 'create' controller method
exports.create = function (req, res, next) {
	// Create a new instance of the 'Vehicle' Mongoose model
	const vehicle = new Vehicle(req.body);

	// Use the 'Vehicle' instance's 'save' method to save a new vehicle document
	vehicle.save((err) => {
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
	// Use the 'Vehicle' static 'find' method to retrieve the list of vehicles
	Vehicle.find({}, (err, vehicles) => {
		if (err) {
			// Call the next middleware with an error message
			return next(err);
		} else {
			// Use the 'response' object to send a list view
			res.render('list', { vehiclesArray: vehicles });
		}
	});
};

// Create a new 'read' controller method
exports.read = function (req, res) {
	// Use the 'response' object to send a detailed view
	res.render('details', { vehicle: req.vehicle });
};

// Create a new 'update' controller method
exports.update = function (req, res, next) {
	// Use the 'Vehicle' static 'findByIdAndUpdate' method to update a specific vehicle
	Vehicle.findByIdAndUpdate(req.vehicle.id, req.body, (err, vehicle) => {
		if (err) {
			// Call the next middleware with an error message
			return next(err);
		} else {
			// Use the 'response' object to send a JSON response
			res.json(vehicle);
		}
	})
};

// Create a new 'delete' controller method
exports.delete = function (req, res, next) {
	// Use the 'Vehicle' instance's 'remove' method to save a new vehicle document
	req.vehicle.remove((err) => {
		if (err) {
			// Call the next middleware with an error message
			return next(err);
		} else {
			// Use the 'response' object to send a JSON response
			res.json(req.vehicle);
		}
	})
};

// Create a new 'vehicleByID' controller method
exports.vehicleByItemId = function (req, res, next, id) {
	// Use the 'Vehicle' static 'findOne' method to retrieve a specific vehicle
	Vehicle.findOne({
		_id: id
	}, (err, vehicle) => {
		if (err) {
			// Call the next middleware with an error message
			return next(err);
		} else {
			// Set the 'req.vehicle' property
			req.vehicle = vehicle;

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

