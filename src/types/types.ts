import { ObjectId } from "mongodb"


export interface IBooking {
  startTime: Date,
  endTime: Date,
  status: Status,
  case: ICase
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