const express = require("express")
const CheckController = require("../../controllers/check_controller")
const router = express.Router();


router.get("/",CheckController.get,(data,req,res,next)=>{
    res.status(data.statusCode).json(data)
})
router.put("/edit",CheckController.edit,(data,req,res,next)=>{
    res.status(data.statusCode).json(data)
})


module.exports = router