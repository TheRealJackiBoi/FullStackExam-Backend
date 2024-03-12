import { GraphQLError } from "graphql";
import { IContext } from "../../server";
import { IUserInput, IUser } from "../../types/types";

export const users = async (parent: never, args: never, { dataSources }: IContext) => {
  const { Users } = dataSources;

  const res = await Users.find();

  if (!res) {
    throw new GraphQLError("No users found");
  }

  return res;
}

export const user = async (parent: never, { _id }: IUser, { dataSources }: IContext) => {
  const { Users } = dataSources;

  const res = await Users.findById(_id);

  if (!res) {
    throw new GraphQLError("No user found with id: " + _id);
  }

  return res;
}

export const updateUser = async (
  parent: never,
  {
    _id,
    firstName,
    lastName,
    role,
    cases,
    zipCode,
    street,
    houseNumber,
  }: IUserInput,
  { dataSources }: IContext
) => {
  const { Users, Addresses } = dataSources;

  let res;

  //checks if the address is already in the database
  const addressExists = await Addresses.findOne({
    zipCode: zipCode,
    street: street,
    houseNumber: houseNumber,
  });

  // if address is already there, use the exsisting address, else add it to the database
  if (addressExists) {
    res = await Users.findByIdAndUpdate(
      _id,
      // the updating fields
      { firstName, lastName, role, cases, address: addressExists._id },
      // returns the updated document
      { new: true }
    );
  } else {
    const newAddress = await Addresses.create({
      zipCode: zipCode,
      street: street,
      houseNumber: houseNumber,
    });
    res = await Users.findByIdAndUpdate(
      _id,
      // the updating fields
      { firstName, lastName, role, cases, address: newAddress._id },
      // returns the updated document, IF WE WANT VALIDATORS RUN WE NEED TO SET {runValidators: true}
      { new: true }
    );
  }

  return res;
};

export const deleteUser = async (
  parent: never,
  { _id }: IUserInput,
  { dataSources }: IContext
) => {
  const { Users } = dataSources;

  const res = await Users.findByIdAndDelete(_id);

  return res;
};
