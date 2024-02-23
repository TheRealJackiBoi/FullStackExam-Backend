import express from 'express'
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from 'http';
import cors from 'cors';
import { typeDefs } from './schema.js'
import mongoose from 'mongoose';
import "dotenv/config";

const uri: string = process.env.MONGODB_URI!;

export interface IContext {
  token?: string
}

const app = express()
const httpServer = http.createServer(app)


const server = new ApolloServer<IContext>({
  typeDefs,
  resolvers: {
    Query: {
      hello: () => 'Hello, world!'
    }
  },
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer })
  ]
})

// connects to the database and starts the apollo server
try {
  await mongoose.connect(uri)
  await server.start()
}
catch (e) {
  console.error(e)
  process.exit(1)
}

// attaches the apollo server to the express app
app.use('/graphql', cors<cors.CorsRequest>(),
express.json(),
expressMiddleware(server, {
  context: async () => {
    return {
      token: '123'
    }
  }
}))


// starts the express server
await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve))
console.log(`🚀 Server ready at http://localhost:4000/`)