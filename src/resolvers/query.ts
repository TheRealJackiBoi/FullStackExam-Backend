import { GraphQLError } from "graphql"
import { IContext } from "../server"
import { IBooking } from "../types/types"

export const Query = {

  hello: () => "Hello World",

  bookings: async (parent: never, args: never, { dataSources }: IContext) => {
    const { Bookings } = dataSources
    
    const res = await Bookings.find()

    if (!res) {
      throw new GraphQLError("No bookings found")
    }

    return res
  },

  booking: async (parent: never, { _id }: IBooking, { dataSources }: IContext) => {
    const { Bookings } = dataSources

    const res = await Bookings.findById(_id)

    if (!res) {
      throw new GraphQLError("No booking found with id: " + _id)
    }

    return res
  },

  services: async (parent: never, args: never, { dataSources }: IContext) => {
    const { Services } = dataSources

    const res = await Services.find()

    if (!res) {
      throw new GraphQLError("No services found")
    }

    return res
  },

  service: async (parent: never, { _id }: IBooking, { dataSources }: IContext) => {
    const { Services } = dataSources

    const res = await Services.findById(_id)

    if (!res) {
      throw new GraphQLError("No service found with id: " + _id)
    }

    return res
  }
}