import { GraphQLError } from "graphql";
import { IContext } from "../../server";
import { IBooking } from "../../types/types";

export const service = async (
  parent: never,
  { _id }: IBooking,
  { dataSources }: IContext
) => {
  const { Services } = dataSources;

  const res = await Services.findById(_id);

  if (!res) {
    throw new GraphQLError("No service found with id: " + _id);
  }

  return res;
};

export const services = async (
  parent: never,
  args: never,
  { dataSources }: IContext
) => {
  const { Services } = dataSources;

  const res = await Services.find();

  if (!res) {
    throw new GraphQLError("No services found");
  }

  return res;
};

export const createService = async (
  parent: never,
  {
    name,
    estimatedTime,
    estimatedPrice,
    imageUrl,
  }: {
    name: string;
    estimatedTime: number;
    estimatedPrice: number;
    imageUrl: string;
  },
  { dataSources }: IContext
) => {
  const { Services } = dataSources;

  const res = await Services.create({
    name,
    estimatedTime,
    estimatedPrice,
    imageUrl,
  });

  return res;
};

export const updateService = async (
  parent: never,
  {
    _id,
    name,
    estimatedTime,
    estimatedPrice,
    imageUrl,
  }: {
    _id: string;
    name: string;
    estimatedTime: number;
    estimatedPrice: number;
    imageUrl: string;
  },
  { dataSources }: IContext
) => {
  const { Services } = dataSources;

  const res = await Services.findByIdAndUpdate(
    _id,
    { name, estimatedTime, estimatedPrice, imageUrl },
    { new: true }
  );

  return res;
};

export const deleteService = async (
  parent: never,
  { _id }: { _id: string },
  { dataSources }: IContext
) => {
  const { Services } = dataSources;

  const res = await Services.findByIdAndDelete(_id);

  return res;
};
