import { IBookingInput } from '../types/types';
import { IContext } from '../server';
import { createBooking, deleteBooking, updateBooking } from './bookingResolvers';



export const Mutation = {
  createBooking: createBooking,

  updateBooking: updateBooking,

  deleteBooking: deleteBooking,

  createService: async (parent: never, { name, estimatedTime }: { name: string, estimatedTime: number }, { dataSources }: IContext) => {
    const { Services } = dataSources;

    const res = await Services.create({ name, estimatedTime });

    return res;
  },

  updateService: async (parent: never, { _id, name, estimatedTime }: { _id: string, name: string, estimatedTime: number }, { dataSources }: IContext) => {
    const { Services } = dataSources;

    const res = await Services.findByIdAndUpdate(_id, { name, estimatedTime }, { new: true });

    return res;
  },

  deleteService: async (parent: never, { _id }: { _id: string }, { dataSources }: IContext) => {
    const { Services } = dataSources;

    const res = await Services.findByIdAndDelete(_id);

    return res;
  }
}