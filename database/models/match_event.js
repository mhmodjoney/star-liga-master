"use strict";

const { Model, Enum } = require("sequelize");


module.exports = (sequelize, DataTypes) => {
    class MatchEvent extends Model {
        static associate(models) {
            this.belongsTo(models.Match, { foreignKey: 'matchId' })
        }
    }

    MatchEvent.init(
        {

            status:
            {
                type: DataTypes.STRING,
            },
            playerName: {
                type: DataTypes.STRING,
            },
            teamName: {
                type: DataTypes.STRING,
            }


        },
        {
            sequelize,
            modelName: "MatchEvent",
        }
    )

    return MatchEvent;
}