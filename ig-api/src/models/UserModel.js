import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    publications: [
      {
        id: String,
        imgLink: String,
        description: String,
        likes: Array,
        comments: Array,
        date: Date,
        avatar: String,
        username: String,
        name: String,
      },
    ],
    followers: [
      {
        id: String,
        username: String,
        name: String,
        avatar: String,
      },
    ],
    following: [
      {
        id: String,
        username: String,
        name: String,
        avatar: String,
      },
    ],
    avatar: {
      type: String,
    },
    description: {
      type: String,
    },
    recentUsers: [
      {
        id: String,
        username: String,
        name: String,
        avatar: String,
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.methods.comparePassword = async function (password) {
  const validation = await bcrypt.compare(password, this.password);
  return validation;
};

userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

export const UserModel = mongoose.model("users", userSchema);
