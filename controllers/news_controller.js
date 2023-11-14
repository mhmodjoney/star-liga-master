const { where } = require("sequelize");
const models = require("../database/models")
const ResponseModel = require("../models/response_model")
const db = require("../database/models/index")
const admin = require('firebase-admin');


class NewsController {
  static get = async (req, res, next) => {
    var _get = await models.News.findAll();
    next(
      new ResponseModel({
        statusCode: 200,
        data: _get,
        message: "done"
      })
    )
  }

  static delete = async (req, res, next) => {
    try {
      var _delete = await models.News.destroy({
        where: {
          id: req.params.id,
        },
      })
      next(
        new ResponseModel({
          statusCode: 200,
          data: _delete,
          message: "done"
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
    const t = await db.sequelize.transaction();
    try {

      var _data = await models.News.create(req.body, { transaction: t })


      //   await t.commit();
      const message1 = {
        notification: {
          title: req.body.title,
          body: req.body.body
        },

        topic: 'broadcast'
      };

      admin.messaging().send(message1)
      next(
        new ResponseModel({
          statusCode: 201,
          data: _data,
          message: "added",
        })
      );
      await t.commit();
      //   next(
      //     admin.messaging().send(message1)
      //         .then((response) => {
      //             console.log('Successfully sent message:', response);
      //         })
      //         .catch((error) => {
      //             console.log('Error sending message:', error);
      //         })
      // )

    }
    catch (e) {
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

module.exports = NewsController