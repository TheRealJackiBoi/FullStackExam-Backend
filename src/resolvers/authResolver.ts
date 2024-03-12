import { GraphQLError } from "graphql";
import { IContext } from "../server";
import { IAuth, IAuthInput, IUser } from "../types/types";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

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

export const login = async (
  parent: never,
  { email, password }: IAuth,
  { dataSources }: IContext
) => {
  const { Users, Auth } = dataSources;

  const auth = await Auth.findOne({ email: email });

  if (!auth) {
    throw new GraphQLError("Email or password is incorrect");
  }

  const validPassword = await bcrypt.compare(password, auth.password);

  if (!validPassword) {
    throw new GraphQLError("Email or password is incorrect");
  }

  let id = new ObjectId(auth.user);

  const user = await Users.findById(id);

  if (!user) {
    throw new GraphQLError("User not found");
  }

  const token = createToken(user);

  return { user, email, token };
}


const createToken = (user: IUser): string => {
  if (!user._id) throw new GraphQLError("User id is not defined");
  return jwt.sign(
    { id: user._id!, role: user.role! },
    process.env.JWT_SECRET!,
    {
      expiresIn: "7d",
    }
  );
};