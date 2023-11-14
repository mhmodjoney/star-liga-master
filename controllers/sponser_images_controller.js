const models = require("../database/models")
const ResponseModel = require("../models/response_model")
const db = require("../database/models/index")


class SponserImagesController {
    static get = async (req, res, next) => {
        var _get = await models.ResponserImages.findAll(
            {
                where  : {responserId: req.params.id}
            }
        );
        next(
            new ResponseModel({
                statusCode: 200,
                data: _get,
                message: "done"
            })
        )
}

// static add = async(req,ews,next)=>{
//     var _add = await models.ResponserImages.
// }

}

module.exports = SponserImagesController