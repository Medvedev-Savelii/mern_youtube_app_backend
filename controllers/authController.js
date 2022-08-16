import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
///////////////////////////////////////////////////////////////

export const signUp = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });

    const user = await newUser.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT, {
      expiresIn: "30d",
    });
    const { password, ...others } = user._doc;

    res.json({ ...others, token });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) return next(createError(404, "User not found!"));

    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) return next(createError(400, "Wrong Credentials!"));

    const token = jwt.sign({ id: user._id }, process.env.JWT, {
      expiresIn: "30d",
    });
    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, token });
  } catch (error) {
    next(error);
  }
};

// export const googleAuth = async (req, res, next) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     if (user) {
//       const token = jwt.sign({ id: user._id }, process.env.JWT);
//       res
//         .cookie("access_token", token, {
//           httpOnly: true,
//         })
//         .status(200)
//         .json(user._doc);
//     } else {
//       const newUser = new User({
//         ...req.body,
//         fromGoogle: true,
//       });
//       const savedUser = await newUser.save();
//       const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
//       res
//         .cookie("access_token", token, {
//           httpOnly: true,
//         })
//         .status(200)
//         .json(savedUser._doc);
//     }
//   } catch (err) {
//     next(err);
//   }
// };
