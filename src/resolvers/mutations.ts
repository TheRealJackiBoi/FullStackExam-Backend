import { IAddress, IBookingInput, IUser, IUserInput } from '../types/types';
import { IContext } from '../server';
import { createBooking, deleteBooking, updateBooking } from './bookingResolvers';
import { createService, deleteService, updateService } from './serviceResolvers';



export const Mutation = {
  
  // CRUD FOR BOOKING
  createBooking: createBooking,

  updateBooking: updateBooking,

  deleteBooking: deleteBooking,

  // CRUD FOR SERVICE
  createService: createService,

  updateService: updateService,

  deleteService: deleteService,

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