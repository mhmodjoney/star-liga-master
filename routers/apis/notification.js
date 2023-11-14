const express = require("express")
const NotificationController = require("../../controllers/notification_controller");
const router = express.Router();


router.post("/sendNotification",NotificationController.notfication,(data,req,res,next)=>{
    res.status(200).json("mjad dd")
})


module.exports = router