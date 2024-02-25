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