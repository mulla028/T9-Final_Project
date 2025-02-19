// config/passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook');
const User = require('../models/SocialUser');
const { CALLBACK_URL, CURRENT_API_URL }  = require('../utils/general');

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${CURRENT_API_URL}/auth/google/callback`,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ providerId: profile.id, provider: 'google' });
                if (!user) {
                    user = await User.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        provider: 'google',
                        providerId: profile.id,
                    });
                }
                return done(null, {user, accessToken});
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
            callbackURL: `${CURRENT_API_URL}/auth/facebook/callback`,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ providerId: profile.id, provider: 'facebook' });
                if (!user) {
                    user = await User.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
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
