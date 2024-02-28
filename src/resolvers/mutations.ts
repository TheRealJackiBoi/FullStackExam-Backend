import { IBookingInput } from '../types/types';
import { IContext } from '../server';
import { createBooking, deleteBooking, updateBooking } from './bookingResolvers';
import { createService, deleteService, updateService } from './serviceResolvers';



export const Mutation = {
  createBooking: createBooking,

  updateBooking: updateBooking,

  deleteBooking: deleteBooking,

  createService: createService,

  updateService: updateService,

  deleteService: deleteService 
}