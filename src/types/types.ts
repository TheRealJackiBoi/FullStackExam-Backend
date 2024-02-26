import { Address } from "cluster"
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
  firstname: string,
  lastname: string,
  role: Role,
  cases: ICase[],
  address: Address
}

export enum Role {
  ADMIN = "admin",
  USER = "user",
  COMPANYOWNER = "companyowner",
  COMPANYADMIN = "companyadmin"
}

export interface IAddress {
  _id: ObjectId,
  zipCode: number,
  street: string,
  houseNumber: number
}