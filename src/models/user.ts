import mongoose from "mongoose";
import { IUser, Role } from "../types/types";

const userSchema = new mongoose.Schema<IUser>(
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
    firstName: {
      type: String,
      required: true,
      message: "Firstname is required",
    },
    lastName: {
      type: String,
      required: true,
      message: "Lastname is required",
    },
    role: {
      type: String,
      required: true,
      enum: Role,
      message:
        "Role is required of following values: ADMIN, USER, COMPANYOWNER, COMPANYADMIN",
    },
    cases: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Case",
        required: true,
        message: "ObjectId of a case is required",
      },
    ],
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
      message: "ObjectId of an address is required",
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre(/^find/, function (next) {
  if ((this as any).options._recursed) {
    return next();
  }
  (this as any)
    .populate({
      path: "cases",
      select: "-__v",
    })
    .populate({
      path: "address",
      select: "-__v",
    })
    .populate({
      path: "company",
      select: "-__v",
      options: { _recursed: true },
    });
  next();
});

userSchema.pre("save", function () {
  (this as any).populate({
    path: "address",
    select: "-__v",
  });
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
