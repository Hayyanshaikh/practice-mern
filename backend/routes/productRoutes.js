const express = require("express");
const {
  create,
  findAll,
  findOne,
  update,
  remove,
} = require("../controllers/productController");

const router = express.Router();

router.post("/", create);
router.get("/", findAll);
router.get("/:id", findOne);
router.put("/:id", update);
router.delete("/:id", remove);

module.exports = router;
