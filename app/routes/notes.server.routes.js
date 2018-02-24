// Load the 'notes' controller
const notes = require('../../app/controllers/notes.server.controller');
const users = require('../../app/controllers/users.server.controller');
const passport = require('passport');

// Define the routes module' method
module.exports = function (app) {
	
	// Mount the 'notes' controller's 'render' method
	app.get('/create', notes.renderCreate);

	// Set up the 'notes' base routes 
	app.route('/notes')
		.post(notes.create)
		.get(notes.list);

	// Set up the 'notes' parameterized routes
	app.route('/notes/:itemSubject')
		.get(notes.read)
		.put(notes.update);

	// Set up the 'itemSubject' parameter middleware
	app.param('itemSubject', notes.noteById);
	
	
	
	// passport stuff
	app.route('/signup')
		.get(users.renderSignup)
		.post(users.signup);
		
	app.route('/signin')
		.get(users.renderSignin)
		.post(passport.authenticate('local', {
			successRedirect: '/',
			failureRedirect: '/signin',
			failureFlash: true
		}));
		
	app.get('/signout', users.signout);
	
	
	
	app.get('/oauth/facebook', passport.authenticate('facebook', {
		failureRedirect: '/signin'
	}));
	
	app.get('/oauth/facebook/callback', passport.authenticate('facebook',
	{
		failureRedirect: '/signin',
		successRedirect: '/'
	}));
	
};
