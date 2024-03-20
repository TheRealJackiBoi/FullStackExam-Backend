import { GraphQLError } from "graphql";
import { Role } from "../types/types";
import jwt from "jsonwebtoken";

export const auth = (roles: Role[], resolver: any) => {
  return async (parent: any, args: any, context: any, info: any) => {
    const { Users } = context.dataSources;
    const { token } = args;

    if (!token) {
      throw new GraphQLError("Not authenticated");
    }

    const { role: userRole, id } = jwt.decode(token) as {
      role: Role;
      id: string;
    };
    if (!(await Users.findById(id))) {
      throw new GraphQLError("User not found");
    }
    if (!roles.includes(userRole)) {
      throw new GraphQLError("Not authorized");
    }

    return await resolver(parent, args, context, info);
  };
};
