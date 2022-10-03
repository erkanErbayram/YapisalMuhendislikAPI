const express = require("express");
const router = express.Router();
const uuidv4 = require("uuid").v4;
const SlideController = require("../controller/slideController");
const multer = require("multer");
const auth = require("../middleware/auth");
const DIR = "./public";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + fileName);
  }
});

let upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  }
});
router.get("/", SlideController.SlideList);

router.post("/", auth, upload.single("image"), SlideController.SlideAdd);
router.put(
  "/update/:id",
  auth,
  upload.single("image"),
  SlideController.SlideUpdate
);
router.put("/delete/:id", auth, SlideController.SlideDelete);
module.exports = router;
