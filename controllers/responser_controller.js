const models = require("../database/models")
const ResponseModel = require("../models/response_model")
const db = require("../database/models/index")


class ResponserController {
    static get = async (req, res, next) => {
        var _get = await models.Responser.findAll();
        next(
            new ResponseModel({
                statusCode: 200,
                data: _get,
                message: "done"
            })
        )
    }

    static add = async (req, res, next) => {
        const { responser, images } = req.body;
        const t = await db.sequelize.transaction();
            try {
                var _data = await models.Responser.create(responser, { transaction: t });
                console.log("1111111111111111111111111111111")
                await     images.forEach(img => {
                    img.responserId = _data.id
                });
                console.log("2222222222222222222222222222222222222222")

                const _images = await models.ResponserImages.bulkCreate(images, { transaction: t })
                console.log("3333333333333333333333333333333333333333333333333333333")
                await t.commit();
                next(
                    new ResponseModel({
                        statusCode: 201,
                        data: _data,
                        message: "added",
                    })
                );
            } catch (e) {

                await t.rollback();

                next(
                    new ResponseModel({
                        statusCode: 500,
                        error: e,
                    })
                );
            }
        

    }

}

module.exports = ResponserController