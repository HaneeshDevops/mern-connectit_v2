import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

dotenv.config();
const secretKey = process.env.SECRET_KEY;

export const logIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    // If User is Unauthorized one...
    if (!existingUser)
      return res
        .status(400)
        .json({ status: false, message: "Email or Password is incorrect." });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res
        .status(400)
        .json({ status: false, message: "Email or Password is incorrect." });

    // If User is authorized one...
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      secretKey,
      { expiresIn: "2h" }
    );

    let result = {
      id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
      token: token,
    };

    res.status(200).json({ status: true, data: result });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const signUp = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    city,
    country,
  } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "User already exists." });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Password doesn't match." });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      city,
      country,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secretKey, {
      expiresIn: "2h",
    });

    let resultUser = {
      id: result._id,
      name: result.name,
      email: result.email,
      token: token,
    };

    res.status(200).json({ status: true, data: resultUser });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const getSearchUsers = async (req, res) => {
  let keyword = req.query.search;
  try {
    if (!keyword || keyword.trim() === "") {
      res.status(200).json({ status: true, message: "No Users", data: [] });
      return;
    }

    const keywordResults = keyword && {
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { email: { $regex: keyword, $options: "i" } },
      ],
    };

    const loggedInUser = await User.findById(req.userId);
    const followingIds = loggedInUser.following.map((id) =>
      mongoose.Types.ObjectId(id)
    );

    const users = await User.find({
      $and: [
        { _id: { $in: followingIds } }, // only return users whose _id is in followingIds
        keywordResults, // any additional search criteria you have
      ],
    }).select(
      "-password -following -followers -city -country -bio -profileBgWallPicture -createdAt -__v"
    );

    res.status(200).json({ status: true, data: { users: users } });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
