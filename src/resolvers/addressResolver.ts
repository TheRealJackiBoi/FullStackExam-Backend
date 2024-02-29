import { IContext } from "../server";
import { IAddress } from "../types/types";


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