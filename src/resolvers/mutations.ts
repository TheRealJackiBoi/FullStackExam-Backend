import { IAddress, IBookingInput, IUser, IUserInput } from '../types/types';
import { IContext } from '../server';



export const Mutation = {
  createBooking: async (parent: never, { startTime, endTime, status, device, cost, serviceId }: IBookingInput, { dataSources }: IContext) => {
    const { Bookings } = dataSources;

    const service = await dataSources.Services.findById(serviceId)

    if (!service) {
      throw new Error("Service not found")
    }

    const res = await Bookings.create({ startTime, endTime, status, case: { device, cost, service: service._id } });

    return res;
  },

  updateBooking: async (parent: never, { _id, startTime, endTime, status, device, cost, serviceId }: IBookingInput, { dataSources }: IContext) => {
    const { Bookings } = dataSources;

    const service = await dataSources.Services.findById(serviceId)

    if (!service) {
      throw new Error("Service not found")
    }

    const res = await Bookings.findByIdAndUpdate(_id, { startTime, endTime, status, case: { device, cost, service: service._id } }, { new: true });

    return res;
  },

  deleteBooking: async (parent: never, { _id }: IBookingInput, { dataSources }: IContext) => {
    const { Bookings } = dataSources;

    const res = await Bookings.findByIdAndDelete(_id);

    return res;
  },

  createService: async (parent: never, { name, estimatedTime }: { name: string, estimatedTime: number }, { dataSources }: IContext) => {
    const { Services } = dataSources;

    const res = await Services.create({ name, estimatedTime });

    return res;
  },

  updateService: async (parent: never, { _id, name, estimatedTime }: { _id: string, name: string, estimatedTime: number }, { dataSources }: IContext) => {
    const { Services } = dataSources;

    const res = await Services.findByIdAndUpdate(_id, { name, estimatedTime }, { new: true });

    return res;
  },

  deleteService: async (parent: never, { _id }: { _id: string }, { dataSources }: IContext) => {
    const { Services } = dataSources;

    const res = await Services.findByIdAndDelete(_id);

    return res;
  },

  // CRUD FOR USER

  // change address to address fields
  createUser: async (parent: never, { firstName, lastName, role, cases, zipCode, street, houseNumber }: IUserInput, { dataSources }: IContext) => {
    const { Users, Addresses } = dataSources;
    
    let res;
    
    //checks if the address is already in the database
    //CHECK BY ZIPCODE, STREET AND HOUSENUMBER NOT BY ID
    const addressExists = await Addresses.findOne({zipCode: zipCode, street: street, houseNumber: houseNumber});

    // if address is already there, use the exsisting address, else add it to the database
    if(addressExists) {
      res = await Users.create({ firstName, lastName, role, cases, address: addressExists._id });
    } else { 
      const _address = await Addresses.create({ zipCode: zipCode, street: street, houseNumber: houseNumber });
      res = await Users.create({ firstName, lastName, role, cases, address: _address._id });
    }

    return res;
  },

  updateUser: async (parent: never, { _id, firstName, lastName, role, cases, zipCode, street, houseNumber }: IUserInput, { dataSources }: IContext) => {
    const { Users, Addresses } = dataSources;

    let res;

    //checks if the address is already in the database
    const addressExists = await Addresses.findOne({zipCode: zipCode, street: street, houseNumber: houseNumber});

    // if address is already there, use the exsisting address, else add it to the database
    if(addressExists) {
      res = await Users.findByIdAndUpdate(_id, 
        // the updating fields  
        { firstName, lastName, role, cases, address: addressExists._id },
        // returns the updated document
        { new: true });
    } else { 
      const newAddress = await Addresses.create({ zipCode: zipCode, street: street, houseNumber: houseNumber });
      res = await Users.findByIdAndUpdate(_id,
        // the updating fields
        { firstName, lastName, role, cases, address: newAddress._id},
        // returns the updated document, IF WE WANT VALIDATORS RUN WE NEED TO SET {runValidators: true}
        { new: true });
    }

    return res;
  },

  deleteUser: async (parent: never, { _id }: IUser, { dataSources }: IContext) => {
    const { Users } = dataSources;

    const res = await Users.findByIdAndDelete(_id);

    return res;
  },


  // CRUD FOR ADDRESS
  createAddress: async (parent: never, { zipCode, street, houseNumber }: IAddress, { dataSources }: IContext) => {
    const { Addresses } = dataSources;

    const res = await Addresses.create({ zipCode, street, houseNumber });

    return res;
  },  

  updateAddress: async (parent: never, { _id, zipCode, street, houseNumber }: IAddress, { dataSources }: IContext) => {
    const { Addresses } = dataSources;

    const res = await Addresses.findByIdAndUpdate(_id, { zipCode, street, houseNumber }, { new: true });

    return res;
  },

  deleteAddress: async (parent: never, { _id }: IAddress, { dataSources }: IContext) => {
    const { Addresses } = dataSources;

    const res = await Addresses.findByIdAndDelete(_id);

    return res;
  }
  
}