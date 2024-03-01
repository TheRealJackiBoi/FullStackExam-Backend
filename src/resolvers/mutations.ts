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
import { createUser, deleteUser, updateUser } from "./userResolvers";
import { createAddress, deleteAddress, updateAddress } from "./addressResolver";

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
};
