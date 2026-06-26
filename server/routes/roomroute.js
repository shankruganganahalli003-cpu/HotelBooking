const express = require("express");
const { createroom, getallrooms, updateroom, deleteroom, getOneRoom, filter } = require("../controller/roomcontroller");
const isauth = require("../middleware/isauth");
const router = express.Router();


router.route("/create").post(isauth,createroom);
router.route("/getall").get(isauth,getallrooms);
router.route("/update/:id").put(isauth,updateroom);
router.route("/delete/:id").delete(isauth,deleteroom);
router.get("/getone/:id", isauth,getOneRoom);
router.route("/filter").get(filter);




module.exports = router;