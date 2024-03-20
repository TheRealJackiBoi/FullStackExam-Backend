import mongoose from "mongoose";
import { IAddress } from "../types/types";

const addressSchema = new mongoose.Schema<IAddress>({
    zipCode: {
        type: Number,
        required: true,
        message: "Zip code is required"
    },
    street: {
        type: String,
        required: true,
        message: "Street is required"
    },
    houseNumber: {
        type: Number,
        required: true,
        message: "House number is required"
    }
})

const Address = mongoose.model<IAddress>("Address", addressSchema)

export default Address