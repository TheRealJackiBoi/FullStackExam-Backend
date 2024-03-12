import { IContext } from "../server";
import { IAuthInput } from "../types/types";

import bcrypt from "bcrypt";

export const createUser = async (
  parent: never,
  {
    email,
    password,
    user: { firstName, lastName, role, cases, zipCode, street, houseNumber },
  }: IAuthInput,
  { dataSources }: IContext
) => {
  const { Users, Addresses, Auth } = dataSources;

  const exsistingUser = await Auth.findOne({ email: email });
  if (exsistingUser) {
    throw new Error("User already exists");
  }

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
      role,
      cases,
      address: _address._id,
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  password = hash;

  console.log(res._id);

  const auth = await Auth.create({
    email,
    password,
    user: res._id,
  });

  return res;
};
