// config/passport.js
const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const User = require('../models/SocialUser');
const { CALLBACK_URL } = require('../utils/general');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${CALLBACK_URL}/auth/google/callback`,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ providerId: profile.id, provider: 'google' });
                if (!user) {
                    user = await User.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        provider: 'google',
                        profilePicture: profile._json.picture,
                        location: profile._json.locale,
                        phoneNumber: profile._json.phoneNumber || '', // Assuming phone number is in the profile
                        providerId: profile.id,
                    });
                }
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);

passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            callbackURL: `${CALLBACK_URL}/auth/facebook/callback`,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ providerId: profile.id, provider: 'facebook' });
                if (!user) {
                    user = await User.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        profilePicture: profile.photos[0].value,
                        location: profile._json.location || '', // Assuming location is in the profile
                        phoneNumber: profile._json.phoneNumber || '', // Assuming phone number is in the profile
                        provider: 'facebook',
                        providerId: profile.id,
                    });
                }
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);

module.exports = passport;
