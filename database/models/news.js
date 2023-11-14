"use strict";

const { Model, Enum } = require("sequelize");


module.exports = (sequelize, DataTypes) => {
    class News extends Model {
        static associate(models) {

        }
    }
    News.init(
        {
            image:
            {
                type: DataTypes.STRING,
            },
            title:
            {
                type: DataTypes.STRING,
            },
            body:
            {
                type: DataTypes.STRING,

            }

        },
        {
            sequelize,
            modelName: "News",
        }
    )

    return News;
}