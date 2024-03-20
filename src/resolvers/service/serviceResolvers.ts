import { GraphQLError } from "graphql";
import { IContext } from "../../server";
import { IBooking } from "../../types/types";
import { companies } from "../company/companyResolver";

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
    companyId,
  }: {
    name: string;
    estimatedTime: number;
    estimatedPrice: number;
    imageUrl: string;
    companyId: string;
  },
  { dataSources }: IContext
) => {
  const { Services, Companies } = dataSources;

  const company = await Companies.findById(companyId);

  if (!company) {
    throw new GraphQLError("No company found with id: " + companyId);
  }

  const res = await Services.create({
    name,
    estimatedTime,
    estimatedPrice,
    imageUrl,
    company: companyId,
  });

  company.services.push(res._id);
  await company.save();

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
  const { Services, Companies } = dataSources;

  Companies.find ({ services: _id }).then((res) => {
    res.forEach((company) => {
      company.services = company.services.filter((service) => service._id.toString() !== _id);
      company.save();
    });
  });

  const res = await Services.findByIdAndDelete(_id);

  return res;
};
