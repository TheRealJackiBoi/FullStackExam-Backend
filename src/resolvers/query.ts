import { IContext } from "../server"
import { IBooking } from "../types/types"

export const Query = {

  hello: () => "Hello World",

  bookings: async (parent: never, args: never, {  }: IContext) => {
    return "bookings"
  },

  booking: async (parent: never, { _id }: IBooking, {  }: IContext) => {
    console.log(_id)
    return "booking"
  }
}