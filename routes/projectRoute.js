const express = require("express");
const router = express.Router();
const ProjectContoller = require("../controller/projectContoller");
const auth = require("../middleware/auth");
const multer = require("multer");
const uuidv4 = require("uuid").v4;
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

router.get("/", ProjectContoller.ProjectList);
router.get("/:detail", ProjectContoller.ProjectDetail);
router.post("/", auth, upload.array("image", 40), ProjectContoller.ProjectAdd);

router.put(
  "/update/:id",
  auth,
  upload.array("image", 40),
  ProjectContoller.ProjectUpdate
);
router.put("/delete/:id", auth, ProjectContoller.ProjectDelete);
module.exports = router;
