'use strict';

module.exports = (sequelize, DataTypes) => {
    const Inventory = sequelize.define(
        'Inventory',
        {
            location: {
                type: DataTypes.STRING,
                allowNull: false,
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
            },
            model: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [1]
                }
            }
        }
    );

    return Inventory;
};
