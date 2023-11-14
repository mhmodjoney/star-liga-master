"use strict";

const { Model, Enum } = require("sequelize");


module.exports = (sequelize, DataTypes) => {
    class Team extends Model {
        static associate(models) {
            this.hasMany(models.Player, { foreignKey: 'teamId' })
      //      this.belongsTo(models.Group, { foreignKey: 'groupId' })
            this.hasMany(models.Match, { as: 'fteam_matches', foreignKey: 'first_team_id' });
            this.hasMany(models.Match, { as: 'steam_matches', foreignKey: 'second_team_id' })
        }
    }
    Team.init({
        name: {
            type: DataTypes.STRING,
        },
        phoneNumber: {
            type: DataTypes.STRING,
        },
        is_confirmed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        group_id:{
            type: DataTypes.INTEGER,
        },
        win: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        draw: {
            type: DataTypes.INTEGER, defaultValue: 0
        },
        lose: {
            type: DataTypes.INTEGER, defaultValue: 0
        },
        GF: {
            type: DataTypes.INTEGER, defaultValue: 0
        },
        GA: {
            type: DataTypes.INTEGER, defaultValue: 0
        },
        GD: {
            type: DataTypes.INTEGER, defaultValue: 0
        },
        points: {
            type: DataTypes.INTEGER, defaultValue: 0
        },
        image:{
            type: DataTypes.STRING,defaultValue: "https://i.ibb.co/wg7mCrL/star-liga-2.png"
        },
        yellow_card:{
            type: DataTypes.INTEGER,
        },
        red_card:{
            type: DataTypes.INTEGER,
        }


    }, {
        sequelize,
        modelName: "Team",
    })
    return Team
}