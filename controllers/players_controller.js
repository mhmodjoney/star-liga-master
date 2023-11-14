const { where } = require("sequelize");
const models = require("../database/models")
const ResponseModel = require("../models/response_model")

class PlayerController {
  static get = async (req, res, next) => {
    var _get = await models.Player.findAll();
    next(
      new ResponseModel({
        statusCode: 200,
        data: _get,
        message: "done"
      })
    )
  }


  
  static getByTeamId = async (req, res, next) => {
    var _data = await models.Player.findAndCountAll(
      {
        where: {
          teamId: req.params.id
        }
      }
    )

    next(
      new ResponseModel({
        statusCode: 200,
        data: _data,
        message: "done"
      })
    )

  }

  static getTopThree = async (req, res, next) => {
    try {
      const limit = 3
      var byGoals = await models.Player.findAll({
        order: [["goals", "DESC"]],
        limit,
        include: [models.Team]
      })
      var byYellow = await models.Player.findAll({
        order: [["yellow_cards", "DESC"]],
        limit,
        include: [models.Team]
      })
      var byRed = await models.Player.findAll({
        order: [["red_cards", "DESC"]],
        limit,
        include: [models.Team]
      })

      next(
        new ResponseModel({
          statusCode: 200,
          data: {byGoals,byYellow,byRed},
          message: "done",
        })
      )
    } catch (e) {
      next(
        new ResponseModel({
          statusCode: 500,
          error: e,
        })
      );
    }
  }

  static add = async (req, res, next) => {
    try {
      var _data = await models.Player.create(req.body)
      next(
        new ResponseModel({
          statusCode: 201,
          data: _data,
          message: "added",
        })
      );
    } catch (e) {
      next(
        new ResponseModel({
          statusCode: 500,
          error: e,
        })
      );
    }
  }

  static delete = async (req, res, next) => {
    try {
      var _delete = await models.Player.destroy({
        where: {
          id: req.params.id,
        },
      })
      next(
        new ResponseModel({
          statusCode: 201,
          data: _delete,
          message: "deleted",
        })
      );
    } catch (e) {
      next(
        new ResponseModel({
          statusCode: 500,
          error: e,
        })
      );
    }
  }
}

module.exports = PlayerController;