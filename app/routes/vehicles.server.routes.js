// Load the 'vehicles' controller
const vehicles = require('../../app/controllers/vehicles.server.controller');

// Define the routes module' method
module.exports = function (app) {
	// Mount the 'vehicles' controller's 'render' method
	app.get('/create', vehicles.renderCreate);

	// Set up the 'vehicles' base routes 
	app.route('/vehicles')
		.post(vehicles.create)
		.get(vehicles.list);

	// Set up the 'vehicles' parameterized routes
	app.route('/vehicles/:itemId')
		.get(vehicles.read)
		.put(vehicles.update)
		.delete(vehicles.delete);

	// Set up the 'itemId' parameter middleware
	app.param('itemId', vehicles.vehicleByItemId);
};
