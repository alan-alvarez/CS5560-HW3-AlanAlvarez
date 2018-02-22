// Set the 'development' environment configuration object
module.exports = {
	db: 'mongodb://localhost/notes-book',
	sessionSecret: 'developmentSessionSecret',
	facebook: {
		clientID: '384942741978438',
		clientSecret: 'efedd40f66cfb5535ac20bc38b9afa26',
		callbackURL: 'http://localhost:3000/oauth/facebook/callback'
	}

};