import mongoose from "mongoose";
import { IService } from "../types/types";


const serviceSchema = new mongoose.Schema<IService>({
  name: {
    type: String,
    required: true,
    message: "Name is required"
  },
  estimatedTime:{
    type: Number,
    required: true,
    message: "Estimated time is required"
  }
})

const Service = mongoose.model<IService>("Service", serviceSchema)
export default Service