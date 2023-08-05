import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    userUid: {
      type: String,
      required: true,
    },
    username: {
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
    img: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    
    },
    desc: {
      type: String,
      required: false,
    },
    balance: {
      type: Number,
      required: true,
    },
    language: {
      type: String,
      required: false,
    },
    memberSince: {
      type: String,
      required: false,
    },
   
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isSeller: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
