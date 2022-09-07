import express from "express";
import Authenticate from "../middlewares/guards/Authenticate";
import multer from "multer";
const router = express.Router();
const { newRecord, getAllRecords, getSingleRecord, replaceRecord, deleteRecord } = require("../controller/FlowRecorderController");

var upload = multer({
  dest: 'public'
})

router.post("", Authenticate,upload.single("record"), newRecord);
router.get("/", Authenticate, getAllRecords);
router.get("/:id", Authenticate, getSingleRecord);
router.put("/:id", Authenticate,upload.single("record"), replaceRecord);
router.delete("/:id", Authenticate, deleteRecord);

export default router;