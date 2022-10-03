const Slide = require("../models/SlideModel");

const SlideList = async (req, res) => {
  try {
    const slide = await Slide.find();
    if (!slide) {
      return res.json({ msg: "Slayt Kaydi Bulunamadi" });
    }
    res.json(slide);
  } catch (err) {
    return res.json(err.message);
  }
};
const SlideAdd = async (req, res) => {
  try {
    const { showMainPage } = req.body;
    let reqFiles = "";
    try {
      const url = req.protocol + "://" + req.get("host");
      reqFiles = url + "/" + req.file.filename;
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }

    const slide = new Slide({
      showMainPage,
      image: reqFiles
    });
    await slide.save();

    res.json(slide);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
const SlideUpdate = async (req, res) => {
  try {
    const { showMainPage } = req.body;
    let reqFiles = "";
    try {
      const url = req.protocol + "://" + req.get("host");

      if (req.file != null) {
        reqFiles = url + "/" + req.file.filename;
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
    if (reqFiles === "") {
      let slide = await Slide.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            showMainPage
          }
        },
        { new: true }
      );
      return res.status(200).json(slide);
    } else {
      let slide = await Slide.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            showMainPage,
            resim: reqFiles
          }
        },
        { new: true }
      );
      return res.status(200).json(slide);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
const SlideDelete = async (req, res) => {
    try {
      const { isActive } = req.body;
    
  
      let slide = await Slide.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            isActive,
          },
        },
        { new: true }
      );
      return res.json(slide);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
module.exports = {
  SlideList,
  SlideAdd,
  SlideUpdate,
  SlideDelete
};
