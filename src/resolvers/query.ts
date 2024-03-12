import { Role } from "../types/types";
import { auth } from "./decorator";
import { bookings, booking, bookingsByUser } from "./booking/bookingResolvers";
import { service, services } from "./service/serviceResolvers";
import { user, users } from "./user/userResolvers";
import { login } from "./auth/authResolver";
import { address, addresses } from "./address/addressResolver";
import { companies, company } from "./company/companyResolver";


export const Query = {
  hello: () => "Hello World",

  bookings: auth([Role.USER, Role.ADMIN, Role.COMPANYADMIN, Role.COMPANYOWNER], bookings),

  booking: auth([Role.USER, Role.ADMIN, Role.COMPANYADMIN, Role.COMPANYOWNER], booking),

  bookingsByUser: auth([Role.USER, Role.ADMIN, Role.COMPANYADMIN, Role.COMPANYOWNER], bookingsByUser),

  services: services,

  service: service,

  users: auth([ Role.ADMIN ], users),

  user: auth([ Role.USER, Role.ADMIN, Role.COMPANYADMIN, Role.COMPANYOWNER ], user ),

  login: login,

  addresses: auth([ Role.ADMIN ], addresses),

  address: auth([ Role.USER, Role.ADMIN, Role.COMPANYADMIN, Role.COMPANYOWNER ], address ),

  companies: companies,

  company: company,
};
