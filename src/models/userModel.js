import mongoose from "mongoose";
const Schema = mongoose.Schema;
import bcrypt from "bcrypt";

const UserSchema = new Schema({
  fullName: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true,
  },
  hash_password: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.methods.comparePassword = async function(cadidatePassword){
  const result = await bcrypt.compare(cadidatePassword, this.hash_password);
  return result;
};

mongoose.model("user", UserSchema);


