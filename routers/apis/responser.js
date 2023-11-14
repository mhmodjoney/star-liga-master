const express = require("express")
const ResponserController = require("../../controllers/responser_controller");
const router = express.Router();


router.get("/",ResponserController.get,(data,req,res,next)=>{
    res.status(data.statusCode).json(data)
})

router.post("/addResponser",ResponserController.add,(data,req,res,next)=>{
    res.status(data.statusCode).json(data)
})

module.exports = router