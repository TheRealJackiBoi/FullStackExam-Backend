import mongoose, { CallbackError, Document } from "mongoose";
import { ICompany, Bustle, Category } from "../types/types";

const companySchema = new mongoose.Schema<ICompany>({
  name: {
    type: String,
    required: true,
    message: "Name is required",
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
    required: true,
    message: "ObjectId of an address is required",
  },
  admins: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      message: "ObjectId of a user is required",
    },
  ],
  services: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
      message: "ObjectId of a service is required",
    },
  ],
  bookings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },
  ],
  description: {
    type: String,
    required: true,
    message: "Description is required",
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    message: "ObjectId of a user is required",
  },
  openForBooking: {
    type: Boolean,
    default: false,
  },
  categories: {
    type: [String],
    enum: [Category],
    //message: "Category is required of following values: PC, MOBILE, TABLET, CONSOLE, PRINTER, TV, SMARTHOME"
  },
  bustle: {
    type: String,
    enum: Bustle,
    //message: "ObjectId of a bustle is required of following values: LOW, MEDIUM, HIGH"
  },
});

companySchema.pre(/^find/, function (next) {
  if ((this as any).options._recursed) {
    return next();
  }
  (this as any)
    .populate({
      path: "address",
      select: "-__v",
    })
    .populate({
      path: "services",
      select: "-__v",
    })
    .populate({
      path: "admins",
      select: "-__v",
      options: { _recursed: true },
    })
    .populate({
      path: "owner",
      select: "-__v",
      options: { _recursed: true },
    })
    .populate({
      path: "bookings",
      select: "-__v",
      options: { _recursed: true },
      populate: [
        {
          path: "case.service",
          select: "-__v",
        },
        {
          path: "user",
          select: "-__v",
          options: { _recursed: true },
        },
      ],
    });
  next();
});

companySchema.pre("save", async function (next) {
  try {
    this.populate({
      path: "address",
      select: "-__v",
    });
    this.populate({
      path: "owner",
      select: "-__v",
    });
    this.populate({
      path: "services",
      select: "-__v",
    });
    this.populate({
      path: "admins",
      select: "-__v",
    });

    next();
  } catch (error: CallbackError | any) {
    next(error);
  }
});

const Company = mongoose.model<ICompany>("Company", companySchema);
export default Company;
