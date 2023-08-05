import User from "../models/user.model.js";
import createError from "../utils/createError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail.js";
// import { sendMail } from "../utils/sendEmail.js";

export const register = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) return next(createError(400, "Email exists"));

    const hash = bcrypt.hashSync(req.body.password, 5);
    const newUser = new User({
      ...req.body,
      password: hash,
    });

    const email = req.body.email;

    await newUser.save();
    const message = {
      from: "<foo@example.com>",
      to: email,
      subject: "Congratulations on Registering!",
      html: `
        <h1>Welcome to Mam Barter!</h1>
        <p>Dear new user,</p>
        <p>Congratulations on registering on Mam Barter! We are excited to have you join our community.</p>
        <p>At Mam Barter, you can connect with others to exchange goods and services, fostering a culture of sharing and collaboration.</p>
        <p>Thank you for choosing Mam Barter. We look forward to seeing you engage and benefit from our platform.</p>
        <p>Best regards,</p>
        <p>The Mam Barter Team</p>
      `,
    };

    const generateEmail = await sendEmail(message);

    res.status(201).send("User has been created.");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return next(createError(404, "User not found!"));

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect) return next(createError(400, "Wrong password or email!"));

    const token = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      process.env.JWT_KEY
    );
    const jwtKey = process.env.JWT_KEY;
    const { password, ...info } = user._doc;

    const data = {
      info,
      jwtKey,
      token,
    };

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .send(data);
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out.");
};
