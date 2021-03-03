// import User from "../models/userModel";
// import bcrypt from "bcrypt";
// import jwt from "jwt-simple";
// const register = async function(req, res, next){
//   try {
//     let newUser = new User(req.body);
//     newUser.hash_password = await bcrypt.hashSync(req.body.password, 10);
//     newUser = await newUser.save();
//     const token = jwt.encode({ id: newUser.id }, process.env.secret);
//     return res.send({ newUser, token });
//   } catch (err) {
//     next(err);
//   }
// };

// const login = async function(req, res, next){
//   try {
//     const email = req.body.email;
//     const password = req.body.password;
//     const user = await User.findOne({ email: email }).select("+password");
//     const token = jwt.encode({ id: user.id }, process.env.secret);
//     return res.send({ user, token });
//   } catch (err) {
//     next(err);
//   }
// };

// export { register, login };
