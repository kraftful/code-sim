const { ApolloServer, gql } = require("apollo-server");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Light" type defines the queryable fields for the light in our data source.
  type Light {
    id: ID
    name: String
    on: Boolean
    brightness: Float
    color: Color
  }

  # And every "Light" has a queryable "Color" type.
  type Color {
    hue: Int
    saturation: Float
    lightness: Float
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "light" query returns a representation of our light.
  type Query {
    light: Light
  }

  # The "TurnOnOffLightSuccess" type represents a successful request to turn
  # a light either on or off.
  type TurnOnOffLightSuccess {
    light: Light
  }

  # The "LightUnavailable" type represents an error when the light can't be
  # reached (e.g. it isn't connected to the server).
  type LightUnavailable {
    message: String
  }

  # The "TurnOnOffLightResult" type will therefore be either a success or a
  # failure.
  union TurnOnOffLightResult = TurnOnOffLightSuccess | LightUnavailable

  # Like the "Query" type above, the "Mutation" type is special: it lists all of
  # the available mutations that a client can execute, along with the return type
  # for each. In this case, the "turnOnOffLight" mutation allows us to turn
  # a light on or off.
  type Mutation {
    turnOnOffLight(on: Boolean!): TurnOnOffLightResult!
  }
`;

const light = {
  id: "52783cc8-8857-4e54-9461-8fabfc9812c6",
  name: "Reading Lamp",
  on: true,
  brightness: 0.6,
  color: {
    hue: 67,
    saturation: 0.77,
    lightness: 0.76
  }
};

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    light: () => light
  },
  Mutation: {
    turnOnOffLight: (parent, { on }) => {
      // Randomly simulate a failure ~25% of the time. This is *way* higher
      // than we would expect failures in a normal scenario, but it makes it
      // easier to exercise both code paths.
      const success = Math.random() > 0.25;

      if (success) {
        light.on = on;

        return {
          __typename: "TurnOnOffLightSuccess",
          light
        };
      } else {
        return {
          __typename: "LightUnavailable",
          message: `${light.name} is currently unavailable`
        };
      }
    }
  },
  TurnOnOffLightResult: {
    // The "__resolveType" method is required to disambiguate the type name
    // for the "TurnOnOffLightResult" union. In this case, we can just use our
    // knowledge of the structure of the two types in the union to identify which
    // type it should be.
    __resolveType(obj) {
      if (obj.light) {
        return "TurnOnOffLightSuccess";
      }

      if (obj.message) {
        return "LightUnavailable";
      }

      return null;
    }
  }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
