const express = require("express");
const { create, getall, update, deletebook,success, booked, getme } = require("../controller/bookcontroller");
const isauth = require("../middleware/isauth");
const router = express.Router();


router.route("/create/:room").post(isauth,create);
router.route("/getall").get(isauth,getall);
router.route("/update/:id").put(isauth,update);
router.route("/delete/:id").delete(isauth,deletebook);
router.route("/success/:id").get(isauth,success);
router.route("/history/:id").get(isauth,booked);
router.route("/getme/:id").get(isauth,getme);


module.exports = router;