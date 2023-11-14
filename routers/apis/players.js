const express = require("express")
const PlayerController = require("../../controllers/players_controller")
const router = express.Router();


router.get("/",PlayerController.get,(data,req,res,next)=>{
    res.status(data.statusCode).json(data)
})

router.get("/getTopPlayers",PlayerController.getTopThree,(data,req,res,next)=>{
    res.status(data.statusCode).json(data)
})

router.get("/teamId/:id",PlayerController.getByTeamId,(data,req,res,next)=>{
    res.status(data.statusCode).json(data)
})
router.post("/addPlayer",PlayerController.add,(data,req,res,next)=>{
    res.status(data.statusCode).json(data)
})

router.delete("/deletePlayer/:id",PlayerController.delete,(data,req,res,next)=>{
    res.status(data.statusCode).json(data)
})

module.exports = router