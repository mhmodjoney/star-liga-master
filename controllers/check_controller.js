const models = require("../database/models")
const ResponseModel = require("../models/response_model")
const db = require("../database/models/index")


class CheckController {
  static get = async (req, res, next) => {
    var _get = await models.Check.findAll();
    next(
      new ResponseModel({
        statusCode: 200,
        data: _get,
        message: "done"
      })
    )
  }

  static edit = async (req, res, next) => {
    var _edit = await models.Check.update(
      req.body

      , {
        where: {
          id: 1
        }
      });
    next(
      new ResponseModel({
        statusCode: 201,
        data: _edit,
        message: "updated"
      })
    )
  }

}


module.exports = CheckController