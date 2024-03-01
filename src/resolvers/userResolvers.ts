import { IContext } from "../server";
import { IUserInput, IUser } from "../types/types";
import bcrypt from "bcrypt";

export const createUser = async (
  parent: never,
  {
    firstName,
    lastName,
    email,
    password,
    role,
    cases,
    zipCode,
    street,
    houseNumber,
  }: IUserInput,
  { dataSources }: IContext
) => {
  const { Users, Addresses } = dataSources;

  const exsistingUser = await Users.findOne({ email: email });
  if (exsistingUser) {
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  password = hash;

  let res;

  //checks if the address is already in the database
  //CHECK BY ZIPCODE, STREET AND HOUSENUMBER NOT BY ID
  const addressExists = await Addresses.findOne({
    zipCode: zipCode,
    street: street,
    houseNumber: houseNumber,
  });

  // if address is already there, use the exsisting address, else add it to the database
  if (addressExists) {
    res = await Users.create({
      firstName,
      lastName,
      email,
      password,
      role,
      cases,
      address: addressExists._id,
    });
  } else {
    const _address = await Addresses.create({
      zipCode: zipCode,
      street: street,
      houseNumber: houseNumber,
    });
    res = await Users.create({
      firstName,
      lastName,
      email,
      password,
      role,
      cases,
      address: _address._id,
    });
  }

  return res;
};

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
