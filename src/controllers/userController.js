import User from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jwt-simple";
const register = async (req, res, next) => {
  try {
    let newUser = new User(req.body);
    const salt = bcrypt.genSaltSync(10);
    newUser.hash_password = await bcrypt.hashSync(req.body.password, salt);
    newUser = await newUser.save();
    const token = jwt.encode({ id: newUser.id }, process.env.secret);
    return res.send({ newUser, token });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email: email }).select("+password");
    const token = jwt.encode({ id: user.id }, process.env.secret);
    return res.send({ user, token });
  } catch (err) {
    next(err);
  }
};

export { register, login };
