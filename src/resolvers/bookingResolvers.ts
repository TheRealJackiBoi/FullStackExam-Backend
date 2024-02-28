import { IBookingInput } from "../types/types";
import { IContext } from "../server";

export const createBooking = async (parent: never, { startTime, endTime, status, device, cost, serviceId }: IBookingInput, { dataSources }: IContext) => {
    const { Bookings } = dataSources;

    const service = await dataSources.Services.findById(serviceId)

    if (!service) {
      throw new Error("Service not found")
    }

    const res = await Bookings.create({ startTime, endTime, status, case: { device, cost, service: service._id } });

    return res;
  }

export const updateBooking = async (parent: never, { _id, startTime, endTime, status, device, cost, serviceId }: IBookingInput, { dataSources }: IContext) => {
    const { Bookings } = dataSources;

    const service = await dataSources.Services.findById(serviceId)

    if (!service) {
      throw new Error("Service not found")
    }

    const res = await Bookings.findByIdAndUpdate(_id, { startTime, endTime, status, case: { device, cost, service: service._id } }, { new: true });

    return res;
  }

export const deleteBooking = async (parent: never, { _id }: IBookingInput, { dataSources }: IContext) => {
    const { Bookings } = dataSources;

    const res = await Bookings.findByIdAndDelete(_id);

    return res;
  }