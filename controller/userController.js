const User = require("../models/UserModel");
const bcyrpt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Register = async (req, res) => {
  const { nameSurname, email, password, userName } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user)
      return res.status(400).json({ errors: "Bu mail hesabı zaten kayitli" });
    user = new User({
      nameSurname,
      email,
      password,
      userName
    });
    const salt = await bcyrpt.genSalt(10);
    user.password = await bcyrpt.hash(password, salt);
    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
const Login = async (req, res) => {
  const { userName, password, email } = req.body;

  try {
    let user = await User.findOne({
      $and: [{ $or: [{ email }, { userName }] }]
    });

    if (!user) {
      return res.status(400).json({ errors: "E-Mail veya Parola yanlış" });
    }

    const isMatch = await bcyrpt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: "E-Mail veya Parola yanlış" });
    }
    const payload = {
      user: {
        id: user.id
      }
    };
    jwt.sign(
      payload,
      process.env.jwtSecret,
      { expiresIn: 36000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
const Me =async (req, res) => {
    try {
      const me = await User.findById(req.user.id).select("-password");
      res.json(me);
    } catch (error) {
      console.error(err.message);
    }
  }
module.exports = {
  Register,
  Login,
  Me
};
