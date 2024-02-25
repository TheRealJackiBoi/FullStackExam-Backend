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
`

export { typeDefs }