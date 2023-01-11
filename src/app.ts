import { gql, ApolloServer } from "apollo-server";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { TypedQueryDocumentNode } from "graphql";
import {
  constraintDirective,
  constraintDirectiveTypeDefs,
  createApolloQueryValidationPlugin,
} from "graphql-constraint-directive";
import resolvers from "./graphql/resolver";
import typeDefs from "./graphql/typeDefs";

// const requireGQL = (file: string) =>
//   gql`${readFileSync(require.resolve(file)).toString('utf-8')}`
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
let schema = makeExecutableSchema({
  typeDefs: [constraintDirectiveTypeDefs, typeDefs],
});

const server = new ApolloServer({
  typeDefs: [constraintDirectiveTypeDefs, typeDefs],
  resolvers,
  plugins: [
    createApolloQueryValidationPlugin({
      schema,
    }),
  ],
  context: ({ res }) => ({ res }),
  csrfPrevention: true,
  cors: {
    credentials: true,
    // origin: "http://localhost:8080"
  },
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
