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
  },
  estimatedPrice:{
    type: Number,
    required: true,
    message: "Estimated price is required"
  },
  imageUrl:{
    type: String,
    required: true
  },
  company:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
    message: "Company is required"
  }
})

serviceSchema.pre(/^find/, function(next){
  if ((this as any).options._recursed) {
    return next();
  }
  (this as any).populate({
    path: "company",
    select: "-__v",
    options: { _recursed: true }
  })
  next()
})

serviceSchema.post("save", function(doc, next){
  if ((this as any).options._recursed) {
    return next();
  }
  (this as any).populate({
    path: "company",
    select: "-__v",
    options: { _recursed: true }
  })
  next()
})

const Service = mongoose.model<IService>("Service", serviceSchema)
export default Service