const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const db = require("../models");

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/userId and password
passport.use(
    new LocalStrategy(
        // Our user will sign in using an userId, rather than a "username"
        {
            usernameField: "userId"
        },
        (userId, password, done) => {
            // When a user tries to sign in this code runs
            db.User.findOne({
                where: {
                    userId: userId
                }
            }).then(dbUser => {
                // If there's no user with the given userId
                if (!dbUser) {
                    return done(null, false, {
                        message: "Incorrect userId or password."
                    });
                }
                // If there is a user with the given userId, but the password the user gives us is incorrect. changed message on both so that the user is not told if the userId or password is incorrect for additional security 
                else if (!dbUser.validPassword(password)) {
                    return done(null, false, {
                        message: "Incorrect userId or password."
                    });
                }
                // If none of the above, return the user
                return done(null, dbUser);
            });
        }
    )
);

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((obj, cb) => {
    cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;


