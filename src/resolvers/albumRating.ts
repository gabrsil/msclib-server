import { PrismaClient } from "@prisma/client";
import { ApolloError } from "apollo-server";

interface AlbumRatingInput {
  input: {
    albumId: string;
    userId: string;
    comment: string;
    rating: number;
  };
}

const prisma = new PrismaClient();

const createNewAlbumRating = async (_: any, { input }: AlbumRatingInput) => {
  const { albumId, comment, rating, userId } = input;

  const existingAlbum = await prisma.album.findUnique({
    where: {
      id: albumId,
    },
  });

  if (!existingAlbum) {
    throw new ApolloError("A artist doesnt exist by the provided id.", "404");
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!existingUser) {
    throw new ApolloError("A artist doesnt exist by the provided id.", "404");
  }

  const albumRating = await prisma.albumRating.create({
    data: {
      comment,
      rating,
      albumId,
      userId,
    },
  });

  return {
    albumRating,
  };
};

export default { query: {}, mutation: { createNewAlbumRating } };
