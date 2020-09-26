'use strict';

module.exports = (sequelize, DataTypes) => {
    const Log = sequelize.define(
        'Log',
        {
            location_1: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [1]
                }
            },
            location_2: {
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
            }
        }
    );
    Log.associate = function (models) {
        // associations can be defined here
        Log.belongsTo(models.User, {
            onDelete: 'cascade',
            foreignKdy: {
                allowNull: false
            }
        });
    };
    return Log;
};
