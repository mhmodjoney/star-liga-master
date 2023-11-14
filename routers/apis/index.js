const express = require("express")
const router = express.Router();

router.use("/Player", require("./players"))
router.use("/Team", require("./teams"))
router.use("/Responser", require("./responser"))
router.use("/SponserImages", require("./sponser_images"))
router.use("/Notification", require("./notification"))
router.use("/Match", require("./match"))
router.use("/News", require("./news"))
router.use("/Checking", require("./checking"))

module.exports = router;
