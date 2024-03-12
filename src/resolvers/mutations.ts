import {
  createBooking,
  deleteBooking,
  updateBooking,
} from "./booking/bookingResolvers";
import {
  createService,
  deleteService,
  updateService,
} from "./service/serviceResolvers";
import { deleteUser, updateUser } from "./user/userResolvers";
import { createUser } from "./auth/authResolver";
import { createAddress, deleteAddress, updateAddress } from "./address/addressResolver";
import { createAdmin, createCompany, deleteAdmin, deleteCompany, updateCompany } from "./company/companyResolver";
import { create } from "domain";
import { auth } from "./decorator";
import { Role } from "../types/types";

export const Mutation = {
  // CRUD FOR BOOKING
  createBooking: auth([ Role.USER, Role.ADMIN, Role.COMPANYADMIN, Role.COMPANYOWNER ], createBooking ),

  updateBooking: auth([ Role.USER, Role.ADMIN, Role.COMPANYADMIN, Role.COMPANYOWNER ], updateBooking ),

  deleteBooking: auth([ Role.USER, Role.ADMIN, Role.COMPANYADMIN, Role.COMPANYOWNER ], deleteBooking ),

  // CRUD FOR SERVICE
  createService: auth([ Role.COMPANYOWNER, Role.COMPANYADMIN ], createService ),

  updateService: auth([ Role.COMPANYOWNER, Role.COMPANYADMIN ], updateService ),

  deleteService: auth([ Role.COMPANYOWNER, Role.COMPANYADMIN ], deleteService ),

  // CRUD FOR USER
  createUser: createUser,

  updateUser: auth([ Role.USER, Role.ADMIN, Role.COMPANYADMIN, Role.COMPANYOWNER ], updateUser ),

  deleteUser: auth([ Role.USER, Role.ADMIN, Role.COMPANYADMIN, Role.COMPANYOWNER ], deleteUser ),

  // CRUD FOR ADDRESS
  createAddress: createAddress,

  updateAddress: auth([ Role.USER, Role.ADMIN, Role.COMPANYADMIN, Role.COMPANYOWNER ], updateAddress ),

  deleteAddress: auth([ Role.USER, Role.ADMIN, Role.COMPANYADMIN, Role.COMPANYOWNER ], deleteAddress ),

  // CRUD FOR COMPANY
  createCompany: auth([ Role.USER, Role.ADMIN ], createCompany ),

  updateCompany: auth([ Role.COMPANYOWNER, Role.COMPANYADMIN], updateCompany ),

  deleteCompany: auth([ Role.COMPANYOWNER ], deleteCompany ),

  deleteAdmin: auth([ Role.ADMIN, Role.COMPANYOWNER ], deleteAdmin ),

  createAdmin: auth([ Role.ADMIN, Role.COMPANYOWNER ], createAdmin )

};
