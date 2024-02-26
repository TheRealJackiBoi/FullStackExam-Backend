import { ObjectId } from "mongodb"
import { DateSchemaDefinition } from "mongoose"


export interface IBooking {
  _id: ObjectId,
  startTime: Date,
  endTime: Date,
  status: Status,
  case: ICase
}

export interface IBookingInput {
  _id?: ObjectId,
  startTime: Date,
  endTime: Date,
  status: Status,
  device: String,
  cost: number,
  serviceId: ObjectId
}

export interface ICase {
  device: string,
  cost: number,
  service: ObjectId,
}

export enum Status {
  ONGOING = "ONGOING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  ONHOLD = "ONHOLD"
}

export interface IService {
  _id: ObjectId,
  name: string,
  estimatedTime: number
}

export interface IUser {
  _id: ObjectId,
  firstName: string,
  lastName: string,
  role: Role,
  cases: ICase[],
  address: IAddress
}

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
  COMPANYOWNER = "COMPANYOWNER",
  COMPANYADMIN = "COMPANYADMIN",
}

export interface IAddress {
  _id: ObjectId,
  zipCode: number,
  street: string,
  houseNumber: number
}