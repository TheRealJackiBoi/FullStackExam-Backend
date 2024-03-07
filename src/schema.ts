const typeDefs = `#graphql
  type Query {
    hello: String

    """
    Returns all the bookings
    """
    bookings: [Booking]
    """
    Returns a booking by id 
    """
    booking(_id: ID!): Booking
    """
    Returns all the services
    """
    services: [Service]
    """
    Returns a service by id
    """
    service(_id: ID!): Service

    """
    Returns all the users
    """
    users: [User]
    """
    Returns a user by id
    """
    user(_id: ID!): User
    """
    Returns user if email and password are correct
    """
    login(email: String!, password: String!): Auth
    
    """
    Returns all the addresses
    """
    addresses: [Address]
    """
    Returns an address by id
    """
    address(_id: ID!): Address
  }

  type Mutation {
    """
    Creates a new booking
    """
    createBooking(startTime: String!, endTime: String!, status: Status!, device: String!, cost: Float!, serviceId: ID! ): Booking
    """
    Updates a booking by id
    """
    updateBooking(_id: ID!, startTime: String, endTime: String, status: Status, device: String!, cost: Float!, serviceId: ID! ): Booking
    """
    Deletes a booking by id
    """
    deleteBooking(_id: ID!): Booking


    """
    Creates a new service
    """
    createService(name: String!, estimatedTime: Int!): Service
    """
    Updates a service by id
    """
    updateService(_id: ID!, name: String, estimatedTime: Int): Service
    """
    Deletes a service by id
    """
    deleteService(_id: ID!): Service


    """
    Creates a new user
    """
    createUser(email: String!, password: String!, user: UserInput!): User
    """
    TODO: CRUD operations for user
    """
    updateUser(_id: ID!, firstName: String, lastName: String, role: Role, zipCode: Int, street: String, houseNumber: Int): User
    """
    Deletes a user by id
    """
    deleteUser(_id: ID!): User


    """
    Creates a new address
    """
    createAddress(zipCode: Int!, street: String!, houseNumber: Int!): Address
    """
    Updates an address by id
    """
    updateAddress(_id: ID!, zipCode: Int, street: String, houseNumber: Int): Address
    """
    Deletes an address by id
    """
    deleteAddress(_id: ID!): Address
  }

  type Booking {
    _id: ID!
    startTime: String!
    endTime: String!
    status: Status!
    case: Case!
  }

  type Case {
    device: String!
    cost: Float!
    service: Service!
  }

  enum Status {
    ONGOING,
    COMPLETED,
    CANCELLED,
    ONHOLD
  }

  type Service {
    _id: ID!
    name: String!
    estimatedTime: Int!
  }

  type Auth {
    user: User!
    token: String!
  }

  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    role: Role!
    cases: [Case]!
    address: Address!
  }

  enum Role {
    ADMIN,
    USER,
    COMPANYOWNER,
    COMPANYADMIN
  }

  type Address {
    _id: ID!
    zipCode: Int!
    street: String!
    houseNumber: Int!
  }

  # input types

  input UserInput {
    firstName: String!
    lastName: String!
    role: Role!
    zipCode: Int!
    street: String!
    houseNumber: Int!
  }



  
`;

export { typeDefs };
