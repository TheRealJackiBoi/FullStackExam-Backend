import { ObjectId } from "mongodb";

export interface IBooking {
  _id: ObjectId;
  startTime: Date;
  endTime: Date;
  status: Status;
  case: ICase;
}

export interface IBookingInput {
  _id?: ObjectId;
  startTime: Date;
  endTime: Date;
  status: Status;
  device: String;
  cost: number;
  serviceId: ObjectId;
}

export interface ICase {
  device: string;
  cost: number;
  service: ObjectId;
}

export enum Status {
  ONGOING = "ONGOING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  ONHOLD = "ONHOLD",
}

export interface IService {
  _id: ObjectId;
  name: string;
  estimatedTime: number;
  estimatedPrice: number;
  imageUrl: string;
  
}

export interface IAuth {
  _id: ObjectId;
  email: string;
  password: string;
  user: ObjectId;
}

export interface IAuthInput {
  _id?: ObjectId;
  email: string;
  password: string;
  user: IUserInput;
}

export interface IUser {
  _id?: ObjectId;
  firstName: string;
  lastName: string;
  role: Role;
  cases: ICase[];
  address: IAddress;
  company?: ICompany | ObjectId;
}

export interface IUserInput {
  _id?: ObjectId;
  firstName: string;
  lastName: string;
  role: Role;
  cases: ICase[];
  zipCode: number;
  street: string;
  houseNumber: number;
  companyId?: ObjectId;
}

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
  COMPANYOWNER = "COMPANYOWNER",
  COMPANYADMIN = "COMPANYADMIN",
}

export interface IAddress {
  _id?: ObjectId;
  zipCode: number;
  street: string;
  houseNumber: number;
}

export interface ICompany {
  _id?: ObjectId;
  name: string;
  address: IAddress;
  services: IService[];
  description: string;
  admins?: ObjectId[];
  owner?: ObjectId;
  openForBooking: boolean;
  bustle?: Bustle;
}

export enum Bustle {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH"
}

export interface ICompanyInput { 
  _id?: ObjectId,
  name: string, 
  description: String, 
  zipCode: number, 
  streetName: String, 
  houseNumber: number,
  companyOwnerId: ObjectId
}