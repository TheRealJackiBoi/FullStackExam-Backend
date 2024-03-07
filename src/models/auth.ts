import mongoose from "mongoose";
import { IAuth } from "../types/types";

const userSchema = new mongoose.Schema<IAuth>(
  {
    email: {
      type: String,
      required: true,
      message: "Email is required",
    },
    password: {
      type: String,
      required: true,
      message: "Password is required",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      message: "ObjectId of a user is required",
    },
  },
  {
    timestamps: true,
  }
);

const Auth = mongoose.model<IAuth>("Auth", userSchema);

export default Auth;
