import { GraphQLError } from 'graphql';
import { IContext } from '../../server';
import { IAddress, IBooking, ICompanyInput, Role } from '../../types/types';

export const companies = async (parent: never, args: never, { dataSources }: IContext) => {
    const { Companies } = dataSources;

    const res = await Companies.find();

    if (!res) {
      throw new GraphQLError("No companies found");
    }

    return res;
  }

  export const company = async (parent: never, { _id }: IAddress, { dataSources }: IContext) => {
    const { Companies } = dataSources;

    const res = await Companies.findById(_id);

    if (!res) {
      throw new GraphQLError("No company found with id: " + _id);
    }

    return res;
  }

export const createCompany = async (parent: never, { name, description, zipCode, streetName, houseNumber, companyOwnerId }: ICompanyInput, { dataSources }: IContext) => {
    const { Companies, Users, Addresses } = dataSources;

    let address = await Addresses.findOne({ zipCode: zipCode, streetName: streetName, houseNumber: houseNumber});

    if (!address) {
        address = await Addresses.create({ zipCode: zipCode, streetName: streetName, houseNumber: houseNumber });
    }

    const owner = await Users.findById(companyOwnerId);

    if (!owner) {
        throw new Error('Owner not found');
    }

    if (owner.company) { 
        throw new Error('User is already a company owner');
    }

    const res = await Companies.create({ name, description, address, owner, admins: [], services: [], bookings: []});

    owner.company = res._id;
    owner.role = Role.COMPANYOWNER;
    owner.save();

    return res;
}

export const updateCompany = async (parent: never, {_id, name, description, zipCode, streetName, houseNumber }: ICompanyInput, { dataSources }: IContext) => {
    const { Companies, Addresses} = dataSources;

    let address = await Addresses.findOne({ zipCode, streetName, houseNumber });

    if (!address) {
        const newAddress = await Addresses.create({ zipCode, street: streetName, houseNumber });
        address = newAddress;
    }

    const res = await Companies.findByIdAndUpdate(_id, { name, description, address }, { new: true });

    return res;
}

export const deleteCompany = async (parent: never, { _id }: { _id: string }, { dataSources }: IContext) => {
    const { Companies, Bookings, Users } = dataSources;

    const company = await Companies.findById(_id);

    if (!company) {
        throw new Error('Company not found');
    }

    company.bookings!.forEach(async (bookingId) => {
        
        const booking = await Bookings.findById(bookingId);

        if (!booking) {
            throw new GraphQLError('Booking not found');
        }

        const user = await Users.findById(booking?.user._id);

        if (!user) {
            throw new GraphQLError('User not found');
        }

        user.bookings = user.bookings!.filter((userBooking) => userBooking.toString() !== booking._id.toString());
        await user.save();

        await Bookings.findByIdAndDelete(booking);
    })

    const res = await Companies.findByIdAndDelete(_id);

    return res;
}

export const deleteCompanyAdmin = async (parent: never, { userId, companyId }: { userId: string, companyId: string }, { dataSources }: IContext) => {
    const { Companies, Users } = dataSources;

    const company = await Companies.findById(companyId);
    const user = await Users.findById(userId);

    if (!company || !user) {
        throw new Error('Company or user not found');
    }

    company.admins = company.admins!.filter((admin) => admin.toString() !== userId);

    await company.save();

    await Users.findByIdAndDelete(userId)

    return user;
}

export const createCompanyAdmin = async (parent: never, { firstName, lastName, email, password, role, zipCode, street, houseNumber, companyId }: { firstName: string, lastName: string, email: string, password: string, role: string, zipCode: number, street: string, houseNumber: number, companyId: string }, { dataSources }: IContext) => {
    const { Users, Companies, Addresses } = dataSources;

    let address = await Addresses.findOne({ zipCode, street, houseNumber });

    if (!address) {
        const newAddress = await Addresses.create({ zipCode, street, houseNumber });
        address = newAddress;
    }

    const company = await Companies.findById(companyId);

    if (!company) {
        throw new Error('Company not found');
    }

    let user = await Users.findOne({ email })

    if (user && company.admins!.includes(user!._id)) {
        throw new Error('User is already an admin');
    }

    if (!user) {
      user = await Users.create({ firstName, lastName, email, password, role, address, company });
    }

    company.admins!.push(user._id);

    await company.save();

    return user;
}