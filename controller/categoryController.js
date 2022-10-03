const Category = require("../models/CategoryModel");

const CategoryList = async (req, res) => {
  try {
    let category = await Category.find();
    if (!category && category.isActive) {
      return res.status(400).json({ msg: "Kategoriler bulunamadı" });
    }
    res.json(category);
  } catch (err) {
    console.error(err.message);
  }
};
const CategoryDetail = async (req, res) => {
  try {
    let category = await Category.findById({ _id: req.params.id });
    if (!category && category.isActive) {
      return res.status(400).json({ msg: "Kategoriler bulunamadı" });
    }
    res.json(category);
  } catch (err) {
    console.error(err.message);
  }
};
const CategoryAdd = async (req, res) => {
  const { categoryName } = req.body;
  try {
    let category = new Category({
      categoryName
    });
    category.save();
    res.json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
const CategoryDelete = async (req, res) => {
  try {
    const { isActive } = req.body;
    let category = await Category.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          isActive
        }
      },
      { new: true }
    );
    return res.json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
const CategoryUpdate = async (req, res) => {
  try {
    const { categoryName } = req.body;
    let category = await Category.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          categoryName
        }
      },
      { new: true }
    );
    return res.json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
module.exports = {
  CategoryList,
  CategoryDetail,
  CategoryAdd,
  CategoryDelete,
  CategoryUpdate
};
