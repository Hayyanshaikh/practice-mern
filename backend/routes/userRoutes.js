const express = require("express");

const {
  create,
  findAll,
  findOne,
  update,
  remove,
} = require("../controllers/userController");

const router = express.Router();

router.post("/", create);
router.get("/", findAll);
router.get("/:id", findOne);
router.get("/:id", update);
router.delete("/:id", remove);

module.exports = router;
