"use strict";

const { Model, Enum } = require("sequelize");


module.exports = (sequelize, DataTypes) => {
    class Player extends Model {
        static associate(models) {
            this.belongsTo(models.Team, { foreignKey: 'teamId' })
         
        }
    }

    Player.init(
        {
          
            name:
            {
                type: DataTypes.STRING,
            },
            age: {
                type: DataTypes.INTEGER
            },
            is_captin: {
                type: DataTypes.BOOLEAN
            },
            image:{
                type: DataTypes.STRING,
                defaultValue: "https://i.ibb.co/Z1tD2bp/player-placeholder.png"
            },
            goals:
            {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            red_cards:
            {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            yellow_cards:
            {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
    

        },
        {
            sequelize,
            modelName: "Player",
        }
    )

    return Player;
}