const models = require("../database/models")
const ResponseModel = require("../models/response_model")
const db = require("../database/models/index")
const { Op } = require("sequelize");

class MatchController {
    static get = async (req, res, next) => {
        try {
            const matches = await models.Match.findAll(
                {
                    // where: 
                    // {
                    //     [Op.and]: [
                    //         { status: "جارية الآن" },
                    //         {
                    //             match_type_id: {
                    //                 [Op.in]: [1, 2, 3, 4], // قمت بإضافة معرّفات الأنواع هنا
                    //             },
                    //         },
                    //     ],
                    // },
                    // order: [["match_type_id", "ASC"], ["status", "ASC"]],
                    include: [
                        { model: models.Team, as: 'fteam' },
                        { model: models.Team, as: 'steam' }
                    ], order: [['date', 'ASC']],
                }

            );

            const matchesData = matches.map(match => match.toJSON());
            const responseData = {
                matches: matchesData
            };

            res.json(new ResponseModel({
                statusCode: 200,
                data: responseData,
                message: 'Matches retrieved successfully'
            }));
        } catch (error) {
            console.log(error)
            next(new ResponseModel({
                statusCode: 500,
                message: 'Failed to retrieve matches'
            }));
        }
    };
    static getQuarterfinals = async (req, res, next) => {
        try {
            const matches = await models.Match.findAll(
                {
                    where: {
                        match_type_id: 2, // Specify the match type here

                    },
                    // order: [["match_type_id", "ASC"], ["status", "ASC"]],
                    include: [
                        { model: models.Team, as: 'fteam' },
                        { model: models.Team, as: 'steam' }
                    ], order: [['date', 'DESC']],
                }

            );

            const matchesData = matches.map(match => match.toJSON());
            const responseData = {
                matches: matchesData
            };

            res.json(new ResponseModel({
                statusCode: 200,
                data: responseData,
                message: 'Matches retrieved successfully'
            }));
        } catch (error) {
            console.log(error)
            next(new ResponseModel({
                statusCode: 500,
                message: 'Failed to retrieve matches'
            }));
        }
    };
    static getSemifinals = async (req, res, next) => {
        try {
            const matches = await models.Match.findAll(
                {
                    where: {
                        match_type_id: 3, // Specify the match type here

                    },
                    // order: [["match_type_id", "ASC"], ["status", "ASC"]],
                    include: [
                        { model: models.Team, as: 'fteam' },
                        { model: models.Team, as: 'steam' }
                    ], order: [['date', 'DESC']],
                }

            );

            const matchesData = matches.map(match => match.toJSON());
            const responseData = {
                matches: matchesData
            };

            res.json(new ResponseModel({
                statusCode: 200,
                data: responseData,
                message: 'Matches retrieved successfully'
            }));
        } catch (error) {
            console.log(error)
            next(new ResponseModel({
                statusCode: 500,
                message: 'Failed to retrieve matches'
            }));
        }
    };
    static final = async (req, res, next) => {
        try {
            const matches = await models.Match.findAll(
                {
                    where: {
                        match_type_id: 4, // Specify the match type here

                    },
                    // order: [["match_type_id", "ASC"], ["status", "ASC"]],
                    include: [
                        { model: models.Team, as: 'fteam' },
                        { model: models.Team, as: 'steam' }
                    ], order: [['date', 'DESC']],
                }

            );

            const matchesData = matches.map(match => match.toJSON());
            const responseData = {
                matches: matchesData
            };

            res.json(new ResponseModel({
                statusCode: 200,
                data: responseData,
                message: 'Matches retrieved successfully'
            }));
        } catch (error) {
            console.log(error)
            next(new ResponseModel({
                statusCode: 500,
                message: 'Failed to retrieve matches'
            }));
        }
    };



    static getEvent = async (req, res, next) => {
        var _data = await models.MatchEvent.findAndCountAll(
            {
                where: {
                    matchId: req.params.id
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
    static editMatch = async (req, res, next) => {
        try {
            var _update = await models.Match.update({
                first_team_id: req.body.first_team_id,
                second_team_id: req.body.second_team_id
            }, {
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
                    error: e.message,
                })
            );

        }
    }
    static start = async (req, res, next) => {
        try {
            var _update = await models.Match.update(
                { status: "جارية الآن" },
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

    static swapMatches = async (req, res, next) => {
        var _delete = await models.Match.destroy({
            where: {
                id: req.params.id,
            },
        })
        var _create = await models.Match.create(req.body)
        next(
            new ResponseModel({
                statusCode: 201,
                data: _create,
                message: "created",
            })
        )
    }

    static end = async (req, res, next) => {
        try {
            var _update = await models.Match.update(
                { status: 'انتهت' },
                {
                    where: {
                        id: req.params.id,
                    }
                }
            )

            var _getMatch = await models.Match.findOne({
                where: {
                    id: req.body.matchId
                }
            })
            if (req.body.matchStatus == "groups"){
            if (_getMatch['dataValues']['score_first_team'] ==_getMatch['dataValues']['score_second_team'])
            {
                var _updateFirstTeam = await models.Team.increment('draw', { where: { id: req.body.fTeamId }, transaction: t })
                var _updateFirstTeam = await models.Team.increment('points', { where: { id: req.body.fTeamId }, transaction: t })
                var _updateFirstTeam = await models.Team.increment('draw', { where: { id: req.body.sTeamId }, transaction: t })
                var _updateFirstTeam = await models.Team.increment('points', { where: { id: req.body.sTeamId }, transaction: t })
            }

            if (_getMatch['dataValues']['score_first_team'] > _getMatch['dataValues']['score_second_team'])
            {
                var _updateFirstTeam = await models.Team.increment('win', { where: { id: req.body.fTeamId }, transaction: t })
                var _updateFirstTeam = await models.Team.increment('lose', { where: { id: req.body.sTeamId }, transaction: t })
                var _updateFirstTeam = await models.Team.increment('points', { where: { id: req.body.fTeamId }, transaction: t })
                var _updateFirstTeam = await models.Team.increment('points', { where: { id: req.body.fTeamId }, transaction: t })
                var _updateFirstTeam = await models.Team.increment('points', { where: { id: req.body.fTeamId }, transaction: t })
            }

            if (_getMatch['dataValues']['score_first_team'] < _getMatch['dataValues']['score_second_team'])
            {
                var _updateFirstTeam = await models.Team.increment('win', { where: { id: req.body.sTeamId }, transaction: t })
                var _updateFirstTeam = await models.Team.increment('lose', { where: { id: req.body.fTeamId }, transaction: t })
                var _updateFirstTeam = await models.Team.increment('points', { where: { id: req.body.sTeamId }, transaction: t })
                var _updateFirstTeam = await models.Team.increment('points', { where: { id: req.body.sTeamId }, transaction: t })
                var _updateFirstTeam = await models.Team.increment('points', { where: { id: req.body.sTeamId }, transaction: t })
            }
        }


            
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

    static addEvent = async (req, res, next) => {
        const t = await db.sequelize.transaction()
        try {

            var _data = [];
            if (req.body.status == "goal") {
                var _getPlayerName = await models.Player.findOne({
                    where: {
                        id: req.body.playerId
                    }
                })
                var _addEvent = await models.MatchEvent.create({
                    status: req.body.status,
                    playerName: _getPlayerName['dataValues']['name'],
                    teamName: req.body.teamName,
                    matchId: req.params.id
                })


                if (req.body.who == "fteam") {
                    if (req.body.matchStatus == "groups") {
                        var _updateFirstTeam = await models.Team.increment('GF', { where: { id: req.body.fTeamId }, transaction: t })
                        var _updateFirstTeam = await models.Team.increment('GD', { where: { id: req.body.fTeamId }, transaction: t })
                        var _updateSecondTeam = await models.Team.increment('GA', { where: { id: req.body.sTeamId }, transaction: t })
                        var _updateSecondTeam = await models.Team.decrement('GD', { where: { id: req.body.sTeamId }, transaction: t })


                    }
                    var _updatescoreFirstTeam = await models.Match.increment('score_first_team', { where: { id: req.params.id }, transaction: t })
                }
                else {
                    if (req.body.matchStatus == "groups") {
                        var _updateFirstTeam = await models.Team.increment('GF', { where: { id: req.body.sTeamId }, transaction: t })
                        var _updateFirstTeam = await models.Team.increment('GD', { where: { id: req.body.sTeamId }, transaction: t })
                        var _updateSecondTeam = await models.Team.increment('GA', { where: { id: req.body.fTeamId }, transaction: t })
                        var _updateSecondTeam = await models.Team.decrement('GD', { where: { id: req.body.fTeamId }, transaction: t })


                    } var _updatescoreSecondTeam = await models.Match.increment('score_second_team', { where: { id: req.params.id }, transaction: t })
                }
                var _updatePlayer = await models.Player.increment('goals', { where: { id: req.body.playerId }, transaction: t })
            }

            else if (req.body.status == "red_card") {
                var _getPlayerName = await models.Player.findOne({
                    where: {
                        id: req.body.playerId
                    }
                })
                var _addEvent = await models.MatchEvent.create({
                    status: req.body.status,
                    playerName: _getPlayerName['dataValues']['name'],
                    teamName: req.body.teamName,
                    matchId: req.params.id
                })
                if (req.body.who == "fteam"){
                    if (req.body.matchStatus == "groups") {
                        var _updateFirstTeam = await models.Team.increment('red_card', { where: { id: req.body.fTeamId }, transaction: t })
                        

                    }
                    var _updatescoreFirstTeam = await models.Match.increment('red_first_team', { where: { id: req.params.id }, transaction: t })
       
                }
                else {
                    var _updatescoreSecondTeam = await models.Match.increment('red_second_team', { where: { id: req.params.id }, transaction: t })
                
                }
                var _data = await models.Player.increment('red_cards', { where: { id: req.body.playerId } })
            }

            else if (req.body.status == "yellow_card") {
                var _getPlayerName = await models.Player.findOne({
                    where: {
                        id: req.body.playerId
                    }
                })
                var _addEvent = await models.MatchEvent.create({
                    status: req.body.status,
                    playerName: _getPlayerName['dataValues']['name'],
                    teamName: req.body.teamName,
                    matchId: req.params.id
                })
                if (req.body.who == "fteam"){
                    if (req.body.matchStatus == "groups") {
                        var _updateFirstTeam = await models.Team.increment('yellow_card', { where: { id: req.body.fTeamId }, transaction: t })
                        

                    }
                    var _updatescoreFirstTeam = await models.Match.increment('yellow_first_team', { where: { id: req.params.id }, transaction: t })
       
                }
                else {
                    var _updatescoreSecondTeam = await models.Match.increment('yellow_second_team', { where: { id: req.params.id }, transaction: t })
                
                }
                var _data = await models.Player.increment('yellow_cards', { where: { id: req.body.playerId } })
            }



            await t.commit();
            next(
                new ResponseModel({
                    statusCode: 201,
                    data: _data,
                    message: "updated",
                })
            );





        } catch (e) {
            console.log(e)
            await t.rollback();
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

            var _data = await models.Match.create(req.body)
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
}

module.exports = MatchController