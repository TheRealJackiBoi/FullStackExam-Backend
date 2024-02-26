import mongoose from "mongoose";
import { IUser, Role } from "../types/types";

const userSchema = new mongoose.Schema<IUser>({
    firstname: {
        type: String,
        required: true,
        message: "Firstname is required"
    },
    lastname: {
        type: String,
        required: true,
        message: "Lastname is required"
    },
    role: {
        type: String,
        required: true,
        enum: Role,
        message: "Role is required of following values: ADMIN, USER, COMPANYOWNER, COMPANYADMIN"
    },
    cases: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Case",
        required: true,
        message: "ObjectId of a case is required"
    }],
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
        required: true,
        message: "ObjectId of an address is required"
    }
})

const User = mongoose.model<IUser>("User", userSchema)

export { User }