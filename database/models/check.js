"use strict";

const { Model, Enum } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Check extends Model {
        static associate(models) {

        }
    }
    Check.init(
        {
            is_on:
            {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            },
            is_signin:
            {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            },
            is_begin:{
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            is_Quarterfinals:
            {
                type: DataTypes.BOOLEAN,
                defaultValue: false

            },
            is_semifinals: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            is_final: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }

        },
        {
            sequelize,
            modelName: "Check",
        }
    )

    return Check;
}