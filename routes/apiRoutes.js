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
apiRoutes.get("/inventoryread/:model", async (req, res) => {
    const count = await db.Inventory.findAll({
        attributes: [
            'location',
            'qty'
        ],
        where: {
            model: req.params.model
        }
    });
    res.send(count);
    console.log("LOG=====>", count);
});

apiRoutes.post("/inventoryadd", async (req, res) => {
    const locationAdd = await db.Inventory.create(req.body);
    res.json(locationAdd);
})


apiRoutes.put("/inventoryupdate/:model", async (req, res) => {
    const countUpdate = await db.Inventory.update(req.body, {
        where: {
            location: req.body.location,
            model: req.params.model
        }
    });
    // console.log(countUpdate);
    res.json(countUpdate);
})

apiRoutes.delete("/inventorydelete/:model/:location", async (req, res) => {
    // console.log("DELETE LOG : ", req.params.location);
    const locationDelete = await db.Inventory.destroy({
        where: {
            location: req.params.location,
            model: req.params.model
        }
    });
    res.json(locationDelete);
})

apiRoutes.post("/logcreate", async (req, res) => {
    // console.log(req.body);
    const logAdd = await db.Log.create(req.body);
    res.json(logAdd);
})

apiRoutes.get("/logread", async (req, res) => {
    const log = await db.Log.findAll();
    res.send(log);
})

apiRoutes.get("/dailyLog/:model", async (req, res) => {
    function leadingZeros(n, digits) {
        var zero = '';
        n = n.toString();
        if (n.length < digits) {
            for (let i = 0; i < digits - n.length; i++)
                zero += '0';
        }
        return zero + n;
    }
    function getTimeStamp() {
        var d = new Date();
        var s =
            leadingZeros(d.getFullYear(), 4) + '-' +
            leadingZeros(d.getMonth() + 1, 2) + '-' +
            leadingZeros(d.getDate(), 2);
        return s;
    }
    var today = getTimeStamp();
    const dailyLogRead = await db.Log.findAll({
        attributes: [
            'logInId',
            'location_1',
            'location_2',
            'qty'
        ],
        where: {
            date: today,
            model: req.params.model
        }
    });
    res.send(dailyLogRead);
})

module.exports = apiRoutes;

