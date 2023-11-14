const express = require("express")
const SponserImagesController = require("../../controllers/sponser_images_controller");
const router = express.Router();


router.get("/:id",SponserImagesController.get,(data,req,res,next)=>{
    res.status(data.statusCode).json(data)
})
// router.post("/AddImage",SponserImagesController.add,(data,req,res,next)=>{
//     res.status(data.statusCode).json(data)
// })

module.exports = router