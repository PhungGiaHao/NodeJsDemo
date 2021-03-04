const express = require("express");
const Users = require("../Models/Usermodel");
const brypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
router.post("/register", async (req, res) => {
  let checkUser = await Users.findOne({ email: req.body.email });
  let hashPassword = await brypt.hash(req.body.password, 10);
  console.log(checkUser, "user");
  if (checkUser) {
    console.log("123");
    return res.status(401).send({
      success: false,
      message: "Tên đăng nhập đã tồn tại",
    });
  }
  let user = new Users({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
    admin: req.body.isAdmin,
  });
  user = await user.save().catch(err => {
    res.status(500).send({
      message: err,
      success: false,
    });
  });
  if (!user)
    return res.status(400).send({
      message: "Tạo không thành công",
      success: false,
    });
  res.status(200).send({
    message: "Tạo thành công",
    data: user,
  });
});
router.post("/login", async (req, res) => {
  const user = await Users.findOne({ email: req.body.email });
  if (!user)
    return res.status(500).send({
      success: false,
      message: "user not found",
    });
  if (user && brypt.compareSync(req.body.password, user.password)) {
    const secret = process.env.secret;
    const token = jwt.sign(
      {
        userId: user.id,
        admin: user.admin,
      },
      secret,
      { expiresIn: "1d" }
    );
    res.status(200).send({
      message: "đăng nhập thành công",
      email: user.email,
      token: token,
    });
  } else {
    res.status(400).send({
      success: false,
      message: "Không đúng mật khẩu",
    });
  }
});
module.exports = router;
