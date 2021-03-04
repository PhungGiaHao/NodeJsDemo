const express = require("express");
const Category = require("../Models/CatagoryModel");
const router = express.Router();
router.get("/", async (req, res) => {
  let listcategory = await Category.find();
  if (!listcategory)
    return res.status(500).send({
      message: "lỗi",
    });
  res.send(listcategory);
});
router.get("/:id", async (req, res) => {
  let listcategory = await Category.findOne(req.body.id);
  if (!listcategory)
    return res.status(500).send({
      message: "lỗi",
    });
  res.send(listcategory);
});
router.post("/", async (req, res) => {
  let category = new Category({
    name: req.body.name,
    icon: req.body.icon,
  });
  category = await category.save().catch(err => {
    res.status(500).json({
      message: err,
      success: false,
    });
  });
  if (!category)
    return res.status(400).send({
      success: false,
      message: "tạo không thành công",
    });
  res.status(200).send({
    data: category,
    success: true,
  });
});
router.put("/:id", async (req, res) => {
  //localhost:3000/api/v1/category/id
  Category.findOneAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      icon: req.body.icon,
    },
    { new: true }
  )
    .then(CategoryUpdate => {
      res.status(200).send({
        success: true,
        data: CategoryUpdate,
      });
    })
    .catch(err => {
      res.status(500).send({
        success: false,
        message: "update không thành công",
        err: err,
      });
    });
});
module.exports = router;
