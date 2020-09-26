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
            qty: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    len: [1]
                }
            }
        }
    );

    return Location;
};
