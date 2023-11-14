const express = require("express")
const NewsController = require("../../controllers/news_controller")
const router = express.Router();

router.get("/",NewsController.get,(data,req,res,next)=>{
    res.status(data.statusCode).json(data)
})



router.post("/createNews",NewsController.add,(data,req,res,next)=>{
    res.status(data.statusCode).json(data)
})
router.delete("/deleteNews/:id",NewsController.delete,(data,req,res,next)=>{
    res.status(data.statusCode).json(data)
})

module.exports = router