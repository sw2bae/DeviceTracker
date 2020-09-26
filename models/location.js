'use strict';

module.exports = (sequelize, DataTypes) => {
    const Location = sequelize.define(
        'Location',
        {
            location: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    len: [1]
                }
            },
            // locaiton_from: {
            //     type: DataTypes.STRING,
            //     allowNull: true,
            // },
            qty: {
                type: DataTypes.INTEGER,
                // primaryKey: true,
                allowNull: false,
                validate: {
                    len: [1]
                }
            }
        }
    );

    return Location;
};
