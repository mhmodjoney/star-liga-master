const express = require("express")
const TeamController = require("../../controllers/teams_controller");
const router = express.Router();



router.get("/",TeamController.get,(data,req,res,next)=>{
    res.status(data.statusCode).json(data)
})
router.get("/confirmTeams",TeamController.getConfirmTeams,(data,req,res,next)=>{
    res.status(data.statusCode).json(data)
})



router.post("/addTeam",TeamController.add,(data,req,res,next)=>{
    res.status(data.statusCode).json(data)
})
router.post("/addImage/:id",TeamController.addImage,(data,req,res,next)=>{
    res.status(data.statusCode).json(data)
})
router.post("/setGroups",TeamController.setGroups,(data,req,res,next)=>{
    res.status(data.statusCode).json(data)
})

router.put("/confirmTeam/:id",TeamController.confirm,(data,req,res,next)=>{
    res.status(data.statusCode).json(data)
})

router.delete("/deleteTeam/:id",TeamController.delete,(data,req,res,next)=>{
    res.status(data.statusCode).json(data)
})

module.exports = router