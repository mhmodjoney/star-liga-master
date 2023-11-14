const express = require("express")
const MatchController = require("../../controllers/match_controller")
const router = express.Router();


router.get("/",MatchController.get,(data,req,res,next)=>{
    res.status(data.statusCode).json(data)
})

router.get("/Quarterfinals",MatchController.getQuarterfinals,(data,req,res,next)=>{
    res.status(data.statusCode).json(data)
})

router.get("/Semifinals",MatchController.getSemifinals,(data,req,res,next)=>{
    res.status(data.statusCode).json(data)
})

router.get("/final",MatchController.final,(data,req,res,next)=>{
    res.status(data.statusCode).json(data)
})

router.post("/addMatch",MatchController.add,(data,req,res,next)=>{
    res.status(data.statusCode).json(data)
})
router.delete("/swapMatches/:id",MatchController.swapMatches,(data,req,res,next)=>{
    res.status(data.statusCode).json(data)
})

router.put("/startMatch/:id",MatchController.start,(data,req,res,next)=>{
    res.status(data.statusCode).json(data)
})

router.put("/endMatch/:id",MatchController.end,(data,req,res,next)=>{
    res.status(data.statusCode).json(data)
})

router.put("/editMatch/:id",MatchController.editMatch,(data,req,res,next)=>{
    res.status(data.statusCode).json(data)
})
router.put("/addEvent/:id",MatchController.addEvent,(data,req,res,next)=>{
    res.status(data.statusCode).json(data)
})

router.get("/Event/:id",MatchController.getEvent,(data,req,res,next)=>{
    res.status(data.statusCode).json(data)
})


module.exports = router