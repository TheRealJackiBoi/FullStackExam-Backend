import { Role } from "../types/types";
import { auth } from "./decorator";
import { bookings, booking, bookingsByUser } from "./bookingResolvers";
import { service, services } from "./serviceResolvers";
import { user, users } from "./userResolvers";
import { login } from "./authResolver";
import { address, addresses } from "./addressResolver";
import { companies, company } from "./companyResolver";


export const Query = {
  hello: () => "Hello World",

  bookings: auth([Role.USER, Role.ADMIN, Role.COMPANYADMIN, Role.COMPANYOWNER], bookings),

  booking: auth([Role.USER, Role.ADMIN, Role.COMPANYADMIN, Role.COMPANYOWNER], booking),

  bookingsByUser: auth([Role.USER, Role.ADMIN, Role.COMPANYADMIN, Role.COMPANYOWNER], bookingsByUser),

  services: services,

  service: service,

  users: users,

  user: user,

  login: login,

  addresses: addresses,

  address: address,

  companies: companies,

  company: company,
};
