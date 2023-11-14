"use strict";

const { Model, Enum } = require("sequelize");


module.exports = (sequelize, DataTypes) => {
    class Responser extends Model {
        static associate(models) {
            this.hasMany(models.ResponserImages, { foreignKey: 'responserId' })
        }
    }
    Responser.init(
        {
            name:
            {
                type: DataTypes.STRING,
            },
            title:
            {
                type: DataTypes.STRING,
            },
            body1:
            {
                type: DataTypes.STRING,
                defaultValue: ""
            },
            body2:
            {
                type: DataTypes.STRING, defaultValue: ""
            },
            body3:
            {
                type: DataTypes.STRING, defaultValue: ""
            },
            link:
            {
                type: DataTypes.STRING, defaultValue: ""
            },
            image:
            {
                type: DataTypes.STRING,
            },
        },
        {
            sequelize,
            modelName: "Responser",
        }
    )

    return Responser;
}