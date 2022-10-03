const SubCategory = require("../models/SubCategoryModel");

const SubCategoryList = async (req, res) => {
  try {
    let subCategory = await SubCategory.find().populate("category", [
      "categoryName",
      "isActive"
    ]);
    if (!subCategory) {
      return res.status(400).json({ msg: "AltKategori bulunamadi" });
    }
    res.json(subCategory);
  } catch (err) {
    console.error(err.message);
  }
};

const SubCategoryDetail = async (req, res) => {
  try {
    let subCategory = await SubCategory.find({ category: req.params.id });
    if (!subCategory) {
      return res.status(400).json({ msg: "AltKategori bulunamadı" });
    }
    res.json(subCategory);
  } catch (err) {
    console.error(err.message);
  }
};
const SubCategoryAdd = async (req, res) => {
  const { categoryName, category } = req.body;

  try {
    let subCategory = await SubCategory.findOne({});

    subCategory = new SubCategory({
      categoryName,
      category
    });
    subCategory.save();
    res.json(subCategory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
const SubCategoryUpdate = async (req, res) => {
  const { categoryName, category } = req.body;

  try {
    let subCategory = await SubCategory.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          categoryName,
          category
        }
      },
      { new: true }
    );
    return res.json(subCategory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
const SubCategoryDelete = async (req, res) => {
  const { isActive } = req.body;
  try {
    let subCategory = await SubCategory.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          isActive
        }
      },
      { new: true }
    );
    return res.json(subCategory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
module.exports = {
  SubCategoryList,
  SubCategoryDetail,
  SubCategoryAdd,
  SubCategoryUpdate,
  SubCategoryDelete
};
