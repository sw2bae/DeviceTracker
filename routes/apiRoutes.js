const Router = require('express').Router;
const db = require('../models');
const passport = require('../config/passport');
const apiRoutes = Router();
const isAuthenticated = require('../config/middleware/isAuthenticated');

// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
// how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
// otherwise send back an error
apiRoutes.post('/signup', async (req, res) => {
    const signUpdata = await db.User.create(req.body);
    res.json(signUpdata);
});
// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the members page.
// Otherwise the user will be sent an error
apiRoutes.post('/login', passport.authenticate('local'), (req, res) => {

    // Sending back a password, even a hashed password, isn't a good idea
    res.json(req.body);
});


//passport built in function to end any active sessions when called 
apiRoutes.get('/logout', function (req, res) {
    req.logout();
    req.session.destroy(function (err) {
        if (err) {
            return next(err);
        }
        return res.send({ success: true });
    });
});

apiRoutes.get("/checkAuthentication", isAuthenticated, (req, res) => {
    const user = req.user ? req.user : null;
    res.status(200).json({
        user: user,
    });
});




module.exports = apiRoutes;
