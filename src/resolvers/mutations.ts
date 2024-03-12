import {
  createBooking,
  deleteBooking,
  updateBooking,
} from "./bookingResolvers";
import {
  createService,
  deleteService,
  updateService,
} from "./serviceResolvers";
import { deleteUser, updateUser } from "./userResolvers";
import { createUser } from "./authResolver";
import { createAddress, deleteAddress, updateAddress } from "./addressResolver";
import { createAdmin, createCompany, deleteAdmin, deleteCompany, updateCompany } from "./companyResolver";
import { create } from "domain";

export const Mutation = {
  // CRUD FOR BOOKING
  createBooking: createBooking,

  updateBooking: updateBooking,

  deleteBooking: deleteBooking,

  // CRUD FOR SERVICE
  createService: createService,

  updateService: updateService,

  deleteService: deleteService,

  // CRUD FOR USER
  createUser: createUser,

  updateUser: updateUser,

  deleteUser: deleteUser,

  // CRUD FOR ADDRESS
  createAddress: createAddress,

  updateAddress: updateAddress,

  deleteAddress: deleteAddress,

  // CRUD FOR COMPANY
  createCompany: createCompany,

  updateCompany: updateCompany,

  deleteCompany: deleteCompany,

  deleteAdmin: deleteAdmin,

  createAdmin: createAdmin

};
