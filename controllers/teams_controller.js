const models = require("../database/models")
const ResponseModel = require("../models/response_model")
const db = require("../database/models/index")
const admin = require('firebase-admin');
const { where } = require("sequelize");
class TeamController {
  static add = async (req, res, next) => {
    const { team, players } = req.body;
    const t = await db.sequelize.transaction()
    try {


      var data_res = await models.Team.create(team, { transaction: t });
      await players.forEach(ply => {
        ply.teamId = data_res.id

      });

      const _players = await models.Player.bulkCreate(players, { transaction: t });
      const message1 = {
        notification: {
          title: "تم اضافة الفريق",
          body: "req.body.body"
        },

        topic: 'admin'
      };

      admin.messaging().send(message1)

      next(
        new ResponseModel({
          statusCode: 201,
          data: data_res,
          message: "added",
        })
      );
      await t.commit();
    }
    catch (error) {


      // Rollback the transaction if any error occurs
      await t.rollback();

      next(
        new ResponseModel({
          statusCode: 500,
          error: error,
        })
      );
    }

  }

  static setGroups = async (req, res, next) => {
    try {

      /// first group
      var update1 = await models.Team.update({ group_id: 1 }, {
        where: {
          id: req.body.firstGroup['firstTeamId'],
        }
      })
      var update2 = await models.Team.update({ group_id: 1 }, {
        where: {
          id: req.body.firstGroup['secondTeamId'],
        }
      })
      var update3 = await models.Team.update({ group_id: 1 }, {
        where: {
          id: req.body.firstGroup['thirdTeamId'],
        }
      })
      var update4 = await models.Team.update({ group_id: 1 }, {
        where: {
          id: req.body.firstGroup['fourthTeamId'],
        }
      })
//// second group
      var update5 = await models.Team.update({ group_id: 1 }, {
        where: {
          id: req.body.secondGroup['firstTeamId'],
        }
      })
      var update6 = await models.Team.update({ group_id: 1 }, {
        where: {
          id: req.body.secondGroup['secondTeamId'],
        }
      })
      var update7 = await models.Team.update({ group_id: 1 }, {
        where: {
          id: req.body.secondGroup['thirdTeamId'],
        }
      })
      var update8 = await models.Team.update({ group_id: 1 }, {
        where: {
          id: req.body.secondGroup['fourthTeamId'],
        }
      })

      /// third group
      var update9 = await models.Team.update({ group_id: 1 }, {
        where: {
          id: req.body.thirdGroup['firstTeamId'],
        }
      })
      var update10 = await models.Team.update({ group_id: 1 }, {
        where: {
          id: req.body.thirdGroup['secondTeamId'],
        }
      })
      var update11 = await models.Team.update({ group_id: 1 }, {
        where: {
          id: req.body.thirdGroup['thirdTeamId'],
        }
      })
      var update12 = await models.Team.update({ group_id: 1 }, {
        where: {
          id: req.body.thirdGroup['fourthTeamId'],
        }
      })


      //// fourth group 
      var update13 = await models.Team.update({ group_id: 1 }, {
        where: {
          id: req.body.fourthGroup['firstTeamId'],
        }
      })
      var update14 = await models.Team.update({ group_id: 1 }, {
        where: {
          id: req.body.fourthGroup['secondTeamId'],
        }
      })
      var update15 = await models.Team.update({ group_id: 1 }, {
        where: {
          id: req.body.fourthGroup['thirdTeamId'],
        }
      })
      var update16 = await models.Team.update({ group_id: 1 }, {
        where: {
          id: req.body.fourthGroup['fourthTeamId'],
        }
      })

      next(
        new ResponseModel({
          statusCode: 200,
          data: update1,
          message: "updated",
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

  static addImage = async (req, res, next) => {
    try {
      var _update = await models.Team.update({ image: req.body.image },
        {
          where: {
            id: req.params.id,
          }
        })
      next(
        new ResponseModel({
          statusCode: 201,
          data: _update,
          message: "updated",
        })
      );
    } catch (e) {
      next(
        new ResponseModel({
          statusCode: 500,
          error: error,
        })
      );
    }
  }

  static confirm = async (req, res, next) => {
    try {
      var _update = await models.Team.update(
        { is_confirmed: true },
        {
          where: {
            id: req.params.id,
          }
        }
      )
      next(
        new ResponseModel({
          statusCode: 201,
          data: _update,
          message: "updated",
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

      var _delete_player = await models.Player.destroy({
        where: {
          teamId: req.params.id,
        },
      })
      var _delete_team = await models.Team.destroy({
        where: {
          id: req.params.id,
        },
      });
      next(new ResponseModel({
        statusCode: 200,
        data: _delete_team,
        message: "deleted",
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
  };

  static get = async (req, res, next) => {
    var _get = await models.Team.findAll({
      order: [
        ["group_id", "ASC"], // Sort by group ID in ascending order
        ["points", "DESC"], // Sort by points in descending order
        ["GD", "DESC"], // Sort by GD (goal difference) in descending order
        ["GF","DESC"],
        ["red_card","DESC"],
        ["yellow_card","DESC"],
      ],
    });
    next(
      new ResponseModel({
        statusCode: 200,
        data: _get,
        message: "done"
      })
    )
  }

  static getConfirmTeams = async (req, res, next) => {
    var _get = await models.Team.findAll({
      where: {
        is_confirmed: true
      },
      order: [
        ["group_id", "ASC"], // Sort by group ID in ascending order
        ["points", "DESC"], // Sort by points in descending order
        ["GD", "DESC"], // Sort by GD (goal difference) in descending order
        ["GF","DESC"],
        ["red_card","ASC"],
        ["yellow_card","ASC"],
      ],
    });
    next(
      new ResponseModel({
        statusCode: 200,
        data: _get,
        message: "done"
      })
    )
  }

}

module.exports = TeamController