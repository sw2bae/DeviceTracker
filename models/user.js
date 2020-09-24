// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
const bcrypt = require("bcryptjs");
// const { Sequelize } = require(".");
// Creating our User model
module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define("User", {
        // The userId cannot be null
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [1]
            }
        },
        // The password cannot be null
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6]
            }
        }
    });

    // User.associate = function (models) {
    //     // associations can be defined here
    //     User.hasMany(models.Survey, {
    //         onDelete: "cascade"
    //     });
    // };

    // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
    User.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };
    // Hooks are automatic methods that run during various phases of the User Model lifecycle
    // In this case, before a User is created, we will automatically hash their password
    User.addHook("beforeCreate", user => {
        user.password = bcrypt.hashSync(
            user.password,
            bcrypt.genSaltSync(10),
            null
        );
    });
    return User;
};