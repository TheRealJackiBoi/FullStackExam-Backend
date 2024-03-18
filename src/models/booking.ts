import mongoose from "mongoose";
import { IBooking, ICase } from "../types/types";

const caseSchema = new mongoose.Schema<ICase>({
  device: {
    type: String,
    required: true,
    message: "Device is required",
  },
  cost: {
    type: Number,
    required: true,
    message: "Cost is required",
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
    message: "ObjectId of a service is required",
  },
});

const bookingSchema = new mongoose.Schema<IBooking>({
  startTime: {
    type: Date,
    required: true,
    message: "Start time is required",
  },
  endTime: {
    type: Date,
    required: true,
    message: "End time is required",
  },
  status: {
    type: String,
    required: true,
    enum: ["ONGOING", "COMPLETED", "CANCELLED", "ONHOLD"],
    message:
      "Status is required of following values: ONGOING, COMPLETED, CANCELLED, ONHOLD",
  },
  case: caseSchema,
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
});

bookingSchema.pre(/^find/, async function (next) {
  if ((this as any).options._recursed) {
    return next();
  }
  (this as any)
    .populate({
      path: "case.service",
      select: "-__v",
    })
    .populate({
      path: "company",
      select: "-__v",
    });
  next();
});

bookingSchema.pre("save", async function (next) {
  try {
    await this.populate({
      path: "case.service",
      select: "-__v",
    });
    await this.populate({
      path: "company",
      select: "-__v",
    });
    await this.populate({
      path: "company.address",
      select: "-__v",
    });
    await this.populate({
      path: "company.owner",
      select: "-__v",
    });
    next();
  } catch (error: Error | any) {
    next(error);
  }
});

bookingSchema.post(/^delete/, async function (doc, next) {
  try {
    await doc.populate({
      path: "case.service",
      select: "-__v",
    });
    await doc.populate({
      path: "company",
      select: "-__v",
    });
    await doc.populate({
      path: "company.address",
      select: "-__v",
    });
    await doc.populate({
      path: "company.owner",
      select: "-__v",
    });
    next();
  }
  catch (error: Error | any) {
    next(error);
  }
});

const Case = mongoose.model<ICase>("Case", caseSchema);
const Booking = mongoose.model<IBooking>("Booking", bookingSchema);

export { Case, Booking };
