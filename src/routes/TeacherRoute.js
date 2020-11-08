const TeacherController = require("../controllers/TeacherController");
const express = require("express");

const router = express.Router();

router.get("/", TeacherController.index);
router.post("/", TeacherController.store);
router.get("/:id", TeacherController.show);
router.put("/:id", TeacherController.update);
router.delete("/:id", TeacherController.delete);
router.post("/test", (req, res)=>{
  console.log(req.body)
  return res.json({id: 1})
});


module.exports = router;
