const Reference = require("../models/ReferenceModel");
const ReferenceList = async (req, res) => {
  try {
    const reference = await Reference.find();

    if (!reference) {
      return res.json({ msg: "Referans Kaydi Bulunamadi" });
    }
    res.json(reference);
  } catch (err) {
    console.error(err.message);
  }
};
const ReferenceDetail = async (req, res) => {
  try {
    const reference = await Reference.findById(req.params.detail);
    if (!reference) {
      return res.json({ msg: "Referans Kaydi Bulunamadi" });
    }
    res.json(reference);
  } catch (err) {
    console.error(err.messgae);
  }
};
const ReferenceAdd = async (req, res) => {
  try {
    const { companyName } = req.body;
    let reqFiles = "";
    try {
      const url = req.protocol + "://" + req.get("host");
      reqFiles = url + "/" + req.file.filename;
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }

    const reference = new Reference({
      companyName,
      image: reqFiles
    });
    await reference.save();

    res.json(reference);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
const ReferenceUpdate = async (req, res) => {
  try {
    const { companyName } = req.body;
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
      let reference = await Reference.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            companyName
          }
        },
        { new: true }
      );
      return res.json(reference);
    } else {
      let reference = await Reference.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            companyName,
            image: reqFiles
          }
        },
        { new: true }
      );
      return res.json(reference);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
const ReferenceDelete = async (req, res) => {
  try {
    const { isActive } = req.body;

    let reference = await Reference.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          isActive
        }
      },
      { new: true }
    );
    return res.json(reference);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
module.exports = {
  ReferenceList,
  ReferenceDetail,
  ReferenceAdd,
  ReferenceUpdate,
  ReferenceDelete
};
