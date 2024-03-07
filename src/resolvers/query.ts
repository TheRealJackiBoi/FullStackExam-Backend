import { GraphQLError } from "graphql";
import { IContext } from "../server";
import { IAddress, IBooking, IUser, IAuth } from "../types/types";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

const createToken = (user: IUser): string => {
  if (!user._id) throw new GraphQLError("User id is not defined");
  return jwt.sign({ id: user._id! }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
};

export const Query = {
  hello: () => "Hello World",

  bookings: async (parent: never, args: never, { dataSources }: IContext) => {
    const { Bookings } = dataSources;

    const res = await Bookings.find();

    if (!res) {
      throw new GraphQLError("No bookings found");
    }

    return res;
  },

  booking: async (
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
  },

  services: async (parent: never, args: never, { dataSources }: IContext) => {
    const { Services } = dataSources;

    const res = await Services.find();

    if (!res) {
      throw new GraphQLError("No services found");
    }

    return res;
  },

  service: async (
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
  },

  users: async (parent: never, args: never, { dataSources }: IContext) => {
    const { Users } = dataSources;

    const res = await Users.find();

    if (!res) {
      throw new GraphQLError("No users found");
    }

    return res;
  },

  user: async (parent: never, { _id }: IUser, { dataSources }: IContext) => {
    const { Users } = dataSources;

    const res = await Users.findById(_id);

    if (!res) {
      throw new GraphQLError("No user found with id: " + _id);
    }

    return res;
  },

  login: async (
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
    console.log(token);

    return { user, token };
  },

  addresses: async (parent: never, args: never, { dataSources }: IContext) => {
    const { Addresses } = dataSources;

    const res = await Addresses.find();

    if (!res) {
      throw new GraphQLError("No addresses found");
    }

    return res;
  },

  address: async (
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
  },
};
