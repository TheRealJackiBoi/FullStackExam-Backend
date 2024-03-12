import { GraphQLError } from "graphql";
import { IContext } from "../server";
import { IAddress } from "../types/types";

export const addresses = async (parent: never, args: never, { dataSources }: IContext) => {
  const { Addresses } = dataSources;

  const res = await Addresses.find();

  if (!res) {
    throw new GraphQLError("No addresses found");
  }

  return res;
}

export const address = async (
  parent: never,
  { _id }: IAddress,
  { dataSources }: IContext
) => {
  const { Addresses } = dataSources;

  const res = await Addresses.findById(_id);

  if (!res) {
    throw new GraphQLError("No address found with id: " + _id);
  }

  return res;
}

export const createAddress = async (parent: never, { zipCode, street, houseNumber }: IAddress, { dataSources }: IContext) => {
    const { Addresses } = dataSources;

    const res = await Addresses.create({ zipCode, street, houseNumber });

    return res;
  }  

  export const updateAddress = async (parent: never, { _id, zipCode, street, houseNumber }: IAddress, { dataSources }: IContext) => {
    const { Addresses } = dataSources;

    const res = await Addresses.findByIdAndUpdate(_id, { zipCode, street, houseNumber }, { new: true });

    return res;
  }

  export const deleteAddress = async (parent: never, { _id }: IAddress, { dataSources }: IContext) => {
    const { Addresses } = dataSources;

    const res = await Addresses.findByIdAndDelete(_id);

    return res;
  }