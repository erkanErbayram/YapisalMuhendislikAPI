const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const CategoryController = require("../controller/categoryController")
router.get("/", CategoryController.CategoryList);

router.get("/:id", CategoryController.CategoryDetail);
router.post("/", auth,CategoryController.CategoryAdd );
router.put("/delete/:id", auth,CategoryController.CategoryDelete );
router.put("/update/:id", auth,CategoryController.CategoryUpdate );
module.exports = router;
