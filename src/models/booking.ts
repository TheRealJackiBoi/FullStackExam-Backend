import mongoose from "mongoose"
import { IBooking, ICase } from "../types/types"


const caseSchema = new mongoose.Schema<ICase>({
  device: {
    type: String,
    required: true,
    message: "Device is required"
  },
  cost: {
    type: Number,
    required: true,
    message: "Cost is required"
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
    message: "ObjectId of a service is required"
  }
})

const bookingSchema = new mongoose.Schema<IBooking>({
  startTime: {
    type: Date,
    required: true,
    message: "Start time is required"
  },
  endTime: {
    type: Date,
    required: true,
    message: "End time is required"
  },
  status: {
    type: String,
    required: true,
    enum: ["ONGOING", "COMPLETED", "CANCELLED", "ONHOLD"],
    message: "Status is required of following values: ONGOING, COMPLETED, CANCELLED, ONHOLD"
  },
  case: caseSchema
})


const Case = mongoose.model<ICase>("Case", caseSchema)
const Booking = mongoose.model<IBooking>("Booking", bookingSchema)

export { Case, Booking }