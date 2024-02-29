import mongoose from "mongoose";
import { IUser, Role } from "../types/types";

const userSchema = new mongoose.Schema<IUser>({
    firstName: {
        type: String,
        required: true,
        message: "Firstname is required"
    },
    lastName: {
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

userSchema.pre(/^find/, function (next) {
    (this as any).populate({
        path: "cases",
        select: "-__v"
    }).populate({
        path: "address",
        select: "-__v"
    })
    next()
})

userSchema.pre('save', function(){
    (this as any).populate({
        path: "address",
        select: "-__v"
    })
})

const User = mongoose.model<IUser>("User", userSchema)

export default User