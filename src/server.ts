import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from "http";
import cors from "cors";
import { typeDefs } from "./schema";
import mongoose from "mongoose";
import "dotenv/config";
import resolvers from "./resolvers/resolvers";
import { IAddress, IBooking, ICompany, IService, IUser, IAuth } from "./types/types";
import { Booking } from "./models/booking";
import Service from "./models/service";
import User from "./models/user";
import Auth from "./models/auth";
import Address from "./models/address";
import Company from "./models/company";

const uri: string = process.env.MONGODB_URI!;

export interface IContext {
  dataSources: {
    Bookings: mongoose.Model<IBooking>;
    Services: mongoose.Model<IService>;
    Auth: mongoose.Model<IAuth>;
    Users: mongoose.Model<IUser>;
    Addresses: mongoose.Model<IAddress>;
    Companies: mongoose.Model<ICompany>;
  };
}

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer<IContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

// connects to the database and starts the apollo server
try {
  await mongoose.connect(uri);
  await server.start();
} catch (e) {
  console.error(e);
  process.exit(1);
}

// attaches the apollo server to the express app
app.use(
  "/graphql",
  cors<cors.CorsRequest>(),
  express.json(),
  expressMiddleware(server, {
    context: async () => {
      await mongoose.connect(uri);

      return {
        dataSources: {
          Bookings: Booking,
          Services: Service,
          Auth: Auth,
          Users: User,
          Addresses: Address,
          Companies: Company,
        },
      };
    },
  })
);

// starts the express server
await new Promise<void>((resolve) =>
  httpServer.listen({ port: 4000 }, resolve)
);
console.log(`🚀 Server ready at http://localhost:4000/graphql`);
