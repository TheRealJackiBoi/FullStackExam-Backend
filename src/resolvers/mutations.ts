import { IBookingInput } from '../types/types';
import { IContext } from '../server';



export const Mutation = {
  createBooking: async (parent: never, { startTime, endTime, status, device, cost, serviceId }: IBookingInput, { dataSources }: IContext) => {
    const { Bookings } = dataSources;

    const service = await dataSources.Services.findById(serviceId)

    if (!service) {
      throw new Error("Service not found")
    }

    const res = await Bookings.create({ startTime, endTime, status, case: { device, cost, service: service._id } });

    return res;
  },

  updateBooking: async (parent: never, { _id, startTime, endTime, status, device, cost, serviceId }: IBookingInput, { dataSources }: IContext) => {
    const { Bookings } = dataSources;

    const service = await dataSources.Services.findById(serviceId)

    if (!service) {
      throw new Error("Service not found")
    }

    const res = await Bookings.findByIdAndUpdate(_id, { startTime, endTime, status, case: { device, cost, service: service._id } }, { new: true });

    return res;
  },

  deleteBooking: async (parent: never, { _id }: IBookingInput, { dataSources }: IContext) => {
    const { Bookings } = dataSources;

    const res = await Bookings.findByIdAndDelete(_id);

    return res;
  },

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