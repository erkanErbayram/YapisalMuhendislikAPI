const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const SubCategoryController = require("../controller/subCategoryController");
router.get("/", SubCategoryController.SubCategoryList);
router.get("/:id", SubCategoryController.SubCategoryDetail);
router.post("/", auth, SubCategoryController.SubCategoryAdd);
router.put("/update/:id", auth, SubCategoryController.SubCategoryUpdate);
router.put("/delete/:id", auth, SubCategoryController.SubCategoryDelete);
module.exports = router;