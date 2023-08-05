import userModel from "../models/user.model.js";
import User from "../models/user.model.js";
import createError from "../utils/createError.js";

export const deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (req.userId !== user._id.toString()) {
    return next(createError(403, "You can delete only your account!"));
  }
  await User.findByIdAndDelete(req.params.id);
  res.status(200).send("deleted.");
};

export const getUser = async (req, res, next) => {
  try {
    let user = {};
    const userId = req.params.id;
    const userbyCustomId = await User.findOne({ userUid: userId });
    if (userbyCustomId) {
      user = userbyCustomId;
      return res.status(200).send(user);
    } else {
      const UserByMongoID = await User.findById(userId);
      user = UserByMongoID;
    }
    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
};

export const verifySeller = async (req, res, next) => {
  const query = { email: req.params.email };
  const user = await User.findOne(query);
  if (!user?.isSeller === true) {
    return res.status(403).send({ message: "Seller Forbiddn Access" });
  }

  res.status(201).send(user);
};

export const checkAdmin = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findOne({ userUid: userId });

    let data = false;
    console.log(user.isAdmin);

    if (user?.isAdmin === true) {
      data = true;
    }

    // console.log(data); // Log the final value of data

    res.send({ data });
  } catch (err) {
    next(err);
  }
};

export const checkSeller = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findOne({ userUid: userId });

    let data = false;
    if (user.isAdmin && user.isAdmin === true) {
      data = true;
    }
    console.log(data);
    res.send({ data });
  } catch (err) {
    next(err);
  }
};

export const getAllUser = async (req, res, next) => {
  const user = await User.find({});

  res.status(200).send(user);
};

export const updateUser = async (req, res, next) => {
  const id = req.body.userUid;

  try {
    const user = await User.findOne({ userUid: id });
    user.img = req.body.img || user.img;

    // Save the updated user
    const updatedUser = await user.save();

    res.status(201).send("User Updated");
  } catch (err) {
    next(err);
  }
};

