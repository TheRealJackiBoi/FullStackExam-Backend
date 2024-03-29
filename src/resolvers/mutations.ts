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
import { createCompany, createCompanyAdmin, deleteCompany, deleteCompanyAdmin, updateCompany } from "./company/companyResolver";
import { create } from "domain";
import { auth } from "./decorator";
import { Role } from "../types/types";

export const Mutation = {
  // CRUD FOR BOOKING
  createBooking: auth([ Role.USER, Role.ADMIN, Role.COMPANYADMIN, Role.COMPANYOWNER ], createBooking ),

  updateBooking: auth([ Role.USER, Role.ADMIN, Role.COMPANYADMIN, Role.COMPANYOWNER ], updateBooking ),

  deleteBooking: auth([ Role.USER, Role.ADMIN, Role.COMPANYADMIN, Role.COMPANYOWNER ], deleteBooking ),

  // CRUD FOR SERVICE
  createService: auth([ Role.COMPANYOWNER, Role.COMPANYADMIN, Role.ADMIN ], createService ),

  updateService: auth([ Role.COMPANYOWNER, Role.COMPANYADMIN, Role.ADMIN ], updateService ),

  deleteService: auth([ Role.COMPANYOWNER, Role.COMPANYADMIN, Role.ADMIN ], deleteService ),

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

  updateCompany: auth([ Role.COMPANYOWNER, Role.ADMIN, Role.COMPANYADMIN ], updateCompany ),

  deleteCompany: auth([ Role.COMPANYOWNER, Role.ADMIN ], deleteCompany ),

  deleteCompanyAdmin: auth([ Role.ADMIN, Role.COMPANYOWNER ], deleteCompanyAdmin ),

  createCompanyAdmin: auth([ Role.ADMIN, Role.COMPANYOWNER ], createCompanyAdmin )

};
