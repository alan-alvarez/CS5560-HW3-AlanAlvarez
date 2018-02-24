var passport = require('passport'),
	url = require('url'),
	FacebookStrategy = require('passport-facebook').Strategy,
	config = require('../config'),
	users = require('../../app/controllers/users.server.controller');
 
module.exports = function() {
		passport.use(new FacebookStrategy({
		clientID: config.facebook.clientID,
		clientSecret: config.facebook.clientSecret,
		callbackURL: config.facebook.callbackURL,
		passReqToCallback: true
	},
	function(req, accessToken, refreshToken, profile, done) {
		console.log('>>>> inside of facebook.js, the profile._json.email is : ' + profile._json.email);
		console.log('>>>> inside of facebook.js, the profile is : ' + JSON.stringify(profile));
		var providerData = profile._json;
		providerData.accessToken = accessToken;
		providerData.refreshToken = refreshToken;
		var providerUserProfile = {
			firstName: profile.name.givenName,
			lastName: profile.name.familyName,
			fullName: profile.displayName,
			email: profile.email,
			username: profile.username,
			provider: 'facebook',
			providerId: profile.id,
			providerData: providerData
		};
		console.log('>>>> inside of facebook.js, the providerUserProfile.fullName is : ' + providerUserProfile.fullName);
		users.saveOAuthUserProfile(req, providerUserProfile, done);
	}));
};