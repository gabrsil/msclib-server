import album from "../resolvers/album";
import artist from "../resolvers/artist";
import auth from "../resolvers/auth";
import genre from "../resolvers/genre";
import reproduction from "../resolvers/reproduction";

export default {
  Query: {
    ...album?.query,
    ...artist?.query,
    ...reproduction?.query,
  },
  Mutation: {
    ...artist?.mutation,
    ...album?.mutation,
    ...genre?.mutation,
    ...auth?.mutation,
    ...reproduction?.mutation,
  },
};
