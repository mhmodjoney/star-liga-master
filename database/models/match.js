"use strict";

const { Model, Enum } = require("sequelize");


module.exports = (sequelize, DataTypes) => {
    class Match extends Model {
        static associate(models) {
            //     this.hasMany(models.ResponserImages, { foreignKey: 'responserId' })
            this.hasMany(models.MatchEvent, { foreignKey: 'matchId' })
            this.belongsTo(models.Team, { as: 'fteam', foreignKey: 'first_team_id' });
            this.belongsTo(models.Team, { as: 'steam', foreignKey: 'second_team_id' });
        }
    }
    Match.init(
        {
            first_team_id: {
                type: DataTypes.INTEGER,
            },
            second_team_id: {
                type: DataTypes.INTEGER,
            },

            date: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            },
            Refree:
            {
                type: DataTypes.STRING,
            },
            status: {
                type: DataTypes.STRING,
                defaultValue: "لم تلعب بعد"
            },
            match_type_id: {
                type: DataTypes.INTEGER,
            },
            score_first_team: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            yellow_first_team: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            yellow_second_team: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            red_first_team: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            red_second_team: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            score_second_team: {
                type: DataTypes.INTEGER,
                defaultValue: 0

            },
        },
        {
            sequelize,
            modelName: "Match",
        }
    )

    return Match;
}