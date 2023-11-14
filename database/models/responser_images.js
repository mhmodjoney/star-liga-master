"use strict";

const { Model, Enum } = require("sequelize");


module.exports = (sequelize, DataTypes) => {
    class ResponserImages extends Model {
        static associate(models) {
            this.belongsTo(models.Responser, { foreignKey: 'responserId' })
        }
        
    }

    ResponserImages.init(
        {
          
            image:
            {
                type: DataTypes.STRING,
            },
            
            

        },
        {
            sequelize,
            modelName: "ResponserImages",
        }
    )

    return ResponserImages;
}