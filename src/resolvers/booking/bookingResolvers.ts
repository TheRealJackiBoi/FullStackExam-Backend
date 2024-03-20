import { IBooking, IBookingInput } from "../../types/types";
import { IContext } from "../../server";
import { GraphQLError } from "graphql";

export const booking = async (
  parent: never,
  { _id }: IBooking,
  { dataSources }: IContext
) => {
  const { Bookings } = dataSources;

  const res = await Bookings.findById(_id);

  if (!res) {
    throw new GraphQLError("No booking found with id: " + _id);
  }

  return res;
};

export const bookings = async (
  parent: never,
  args: never,
  { dataSources }: IContext
) => {
  const { Bookings } = dataSources;

  const res = await Bookings.find();

  if (!res) {
    throw new GraphQLError("No bookings found");
  }

  return res;
};

export const bookingsByUser = async (
  parent: never,
  { _id }: IBooking,
  { dataSources }: IContext
) => {
  const { Bookings } = dataSources;

  const res = await Bookings.find({ "case.user": _id });

  if (!res) {
    throw new GraphQLError("No bookings found for user with id: " + _id);
  }

  return res;
};

export const createBooking = async (
  parent: never,
  {
    startTime,
    endTime,
    status,
    device,
    cost,
    serviceId,
    companyId,
    userId,
  }: IBookingInput,
  { dataSources }: IContext
) => {
  const { Bookings, Companies, Users } = dataSources;

  // Check if Company, User and Service exists
  const company = await Companies.findById(companyId);

  if (!company) {
    throw new Error("Company not found");
  }

  const user = await Users.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const service = await dataSources.Services.findById(serviceId);

  if (!service) {
    throw new Error("Service not found");
  }

  const res = await Bookings.create({
    startTime,
    endTime,
    status,
    case: { device, cost, service: service._id },
    company: company._id,
    user: user._id,
  });

  company.bookings!.push(res._id);
  company.save();

  user.bookings!.push(res.id);
  user.save();

  return res;
};

export const updateBooking = async (
  parent: never,
  { _id, startTime, endTime, status, device, cost, serviceId }: IBookingInput,
  { dataSources }: IContext
) => {
  const { Bookings } = dataSources;

  const service = await dataSources.Services.findById(serviceId);

  if (!service) {
    throw new Error("Service not found");
  }

  const res = await Bookings.findByIdAndUpdate(
    _id,
    {
      startTime,
      endTime,
      status,
      case: { device, cost, service: service._id },
    },
    { new: true }
  );

  return res;
};

export const deleteBooking = async (
  parent: never,
  { _id }: { _id: string },
  { dataSources }: IContext
) => {
  const { Bookings, Companies, Users } = dataSources;

  const booking = await Bookings.findById(_id);

  if (!booking) {
    throw new GraphQLError("No booking found with id: " + _id);
  }

  const company = await Companies.findById(booking.company._id);

  if (!company) {
    throw new GraphQLError("No company found with id: " + booking.company._id);
  }

  company.bookings = company.bookings!.filter(
    (booking) => booking.toString() !== _id
  );
  company.save();

  const user = await Users.findById(booking.user._id);

  if (!user) {
    throw new GraphQLError("No company found with id: " + booking.user._id);
  }

  user.bookings = user.bookings.filter((booking) => booking.toString() !== _id);
  user.save();

  const res = await Bookings.findByIdAndDelete(_id);

  return res;
};
