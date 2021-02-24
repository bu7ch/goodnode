import User from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jwt-simple";
const register = async (req, res, next) => {
  try {
    let newUser = new User(req.body);
    const salt = bcrypt.genSaltSync(process.env.salt);
    newUser.hash_password = bcrypt.hashSync(req.body.password, salt);
    newUser = await newUser.save();
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email: email, password: password });
    const token = jwt.encode({ id: user.id }, process.env.secret);
    return res.send({ user, token });
  } catch (err) {
    next(err);
  }
};

export { register, login };
