"use strict";

const { Model, Enum } = require("sequelize");


module.exports = (sequelize, DataTypes) => {
    class MatchType extends Model {
        static associate(models) {
        
        }
    }

    MatchType.init(
        {
          
            name:
            {
                type: DataTypes.STRING,
            },
          

        },
        {
            sequelize,
            modelName: "MatchType",
        }
    )

    return MatchType;
}