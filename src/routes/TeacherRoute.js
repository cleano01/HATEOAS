const TeacherController = require("../controllers/TeacherController");
const express = require("express");

const router = express.Router();

router.get("/", TeacherController.index);
router.post("/", TeacherController.store);
router.get("/:id", TeacherController.show);
router.put("/:id", TeacherController.update);
router.delete("/:id", TeacherController.delete);

module.exports = router;
